import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "tnb", serviceShapeName: "TNB" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "tnb" });
const ver = /*@__PURE__*/ T.ServiceVersion("2008-10-21");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
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
              `https://tnb-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://tnb-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://tnb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://tnb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://tnb.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type NsdOnboardingState = "CREATED" | "ONBOARDED" | "ERROR" | (string & {});
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
export type VnfInstantiationState = "INSTANTIATED" | "NOT_INSTANTIATED" | (string & {});
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
export type LcmOperationType = "INSTANTIATE" | "UPDATE" | "TERMINATE" | (string & {});
export type UpdateSolNetworkType = "MODIFY_VNF_INFORMATION" | "UPDATE_NS" | (string & {});
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
export type GetSolNetworkOperationTasksList = GetSolNetworkOperationTaskDetails[];
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
  input: __S(296, __c37, 0) as any as S.Schema<CancelSolNetworkOperationInput>,
  output: __S(304, __c38, 0) as any as S.Schema<CancelSolNetworkOperationResponse>,
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
}));

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
  input: __S(312, __c39, 0) as any as S.Schema<CreateSolFunctionPackageInput>,
  output: __S(313, __c39, 1) as any as S.Schema<CreateSolFunctionPackageOutput>,
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
}));

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
  input: __S(328, __c41, 0) as any as S.Schema<CreateSolNetworkInstanceInput>,
  output: __S(329, __c41, 1) as any as S.Schema<CreateSolNetworkInstanceOutput>,
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
}));

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
  input: __S(336, __c42, 0) as any as S.Schema<CreateSolNetworkPackageInput>,
  output: __S(337, __c42, 1) as any as S.Schema<CreateSolNetworkPackageOutput>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<DeleteSolFunctionPackageInput>,
  output: __S(304, __c38, 0) as any as S.Schema<DeleteSolFunctionPackageResponse>,
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
}));

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
  input: __S(8, __c1, 0) as any as S.Schema<DeleteSolNetworkInstanceInput>,
  output: __S(304, __c38, 0) as any as S.Schema<DeleteSolNetworkInstanceResponse>,
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
}));

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
  input: __S(16, __c2, 0) as any as S.Schema<DeleteSolNetworkPackageInput>,
  output: __S(304, __c38, 0) as any as S.Schema<DeleteSolNetworkPackageResponse>,
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
}));

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
  input: __S(24, __c3, 0) as any as S.Schema<GetSolFunctionInstanceInput>,
  output: __S(29, __c3, 5) as any as S.Schema<GetSolFunctionInstanceOutput>,
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
}));

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
  input: __S(40, __c5, 0) as any as S.Schema<GetSolFunctionPackageInput>,
  output: __S(42, __c5, 2) as any as S.Schema<GetSolFunctionPackageOutput>,
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
}));

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
  input: __S(56, __c7, 0) as any as S.Schema<GetSolFunctionPackageContentInput>,
  output: __S(57, __c7, 1) as any as S.Schema<GetSolFunctionPackageContentOutput>,
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
}));

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
  input: __S(64, __c8, 0) as any as S.Schema<GetSolFunctionPackageDescriptorInput>,
  output: __S(65, __c8, 1) as any as S.Schema<GetSolFunctionPackageDescriptorOutput>,
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
}));

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
  input: __S(72, __c9, 0) as any as S.Schema<GetSolNetworkInstanceInput>,
  output: __S(74, __c9, 2) as any as S.Schema<GetSolNetworkInstanceOutput>,
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
}));

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
  input: __S(80, __c10, 0) as any as S.Schema<GetSolNetworkOperationInput>,
  output: __S(85, __c10, 5) as any as S.Schema<GetSolNetworkOperationOutput>,
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
}));

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
  input: __S(104, __c13, 0) as any as S.Schema<GetSolNetworkPackageInput>,
  output: __S(106, __c13, 2) as any as S.Schema<GetSolNetworkPackageOutput>,
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
}));

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
  input: __S(120, __c15, 0) as any as S.Schema<GetSolNetworkPackageContentInput>,
  output: __S(121, __c15, 1) as any as S.Schema<GetSolNetworkPackageContentOutput>,
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
}));

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
  input: __S(128, __c16, 0) as any as S.Schema<GetSolNetworkPackageDescriptorInput>,
  output: __S(129, __c16, 1) as any as S.Schema<GetSolNetworkPackageDescriptorOutput>,
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
}));

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
  input: __S(136, __c17, 0) as any as S.Schema<InstantiateSolNetworkInstanceInput>,
  output: __S(137, __c17, 1) as any as S.Schema<InstantiateSolNetworkInstanceOutput>,
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
}));

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
  input: __S(144, __c18, 0) as any as S.Schema<ListSolFunctionInstancesInput>,
  output: __S(148, __c18, 4) as any as S.Schema<ListSolFunctionInstancesOutput>,
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
  input: __S(152, __c19, 0) as any as S.Schema<ListSolFunctionPackagesInput>,
  output: __S(155, __c19, 3) as any as S.Schema<ListSolFunctionPackagesOutput>,
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
  input: __S(160, __c20, 0) as any as S.Schema<ListSolNetworkInstancesInput>,
  output: __S(163, __c20, 3) as any as S.Schema<ListSolNetworkInstancesOutput>,
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
  input: __S(168, __c21, 0) as any as S.Schema<ListSolNetworkOperationsInput>,
  output: __S(172, __c21, 4) as any as S.Schema<ListSolNetworkOperationsOutput>,
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
  input: __S(176, __c22, 0) as any as S.Schema<ListSolNetworkPackagesInput>,
  output: __S(179, __c22, 3) as any as S.Schema<ListSolNetworkPackagesOutput>,
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
  input: __S(184, __c23, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(185, __c23, 1) as any as S.Schema<ListTagsForResourceOutput>,
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
}));

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
  input: __S(192, __c24, 0) as any as S.Schema<PutSolFunctionPackageContentInput>,
  output: __S(201, __c25, 1) as any as S.Schema<PutSolFunctionPackageContentOutput>,
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
}));

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
  input: __S(208, __c26, 0) as any as S.Schema<PutSolNetworkPackageContentInput>,
  output: __S(217, __c27, 1) as any as S.Schema<PutSolNetworkPackageContentOutput>,
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
}));

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
  input: __S(224, __c28, 0) as any as S.Schema<TagResourceInput>,
  output: __S(304, __c38, 0) as any as S.Schema<TagResourceOutput>,
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
}));

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
  input: __S(232, __c29, 0) as any as S.Schema<TerminateSolNetworkInstanceInput>,
  output: __S(240, __c30, 0) as any as S.Schema<TerminateSolNetworkInstanceOutput>,
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
}));

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
  input: __S(248, __c31, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(304, __c38, 0) as any as S.Schema<UntagResourceOutput>,
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
}));

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
  input: __S(256, __c32, 0) as any as S.Schema<UpdateSolFunctionPackageInput>,
  output: __S(257, __c32, 1) as any as S.Schema<UpdateSolFunctionPackageOutput>,
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
}));

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
  input: __S(264, __c33, 0) as any as S.Schema<UpdateSolNetworkInstanceInput>,
  output: __S(240, __c30, 0) as any as S.Schema<UpdateSolNetworkInstanceOutput>,
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
}));

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
  input: __S(272, __c34, 0) as any as S.Schema<UpdateSolNetworkPackageInput>,
  output: __S(273, __c34, 1) as any as S.Schema<UpdateSolNetworkPackageOutput>,
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
}));

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
  input: __S(280, __c35, 0) as any as S.Schema<ValidateSolFunctionPackageContentInput>,
  output: __S(201, __c25, 1) as any as S.Schema<ValidateSolFunctionPackageContentOutput>,
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
}));

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
  input: __S(288, __c36, 0) as any as S.Schema<ValidateSolNetworkPackageContentInput>,
  output: __S(217, __c27, 1) as any as S.Schema<ValidateSolNetworkPackageContentOutput>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ vnfPkgId: S.String.pipe(T.HttpLabel("vnfPkgId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/sol/vnfpkgm/v1/vnf_packages/{vnfPkgId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSolFunctionPackageInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nsInstanceId: S.String.pipe(T.HttpLabel("nsInstanceId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/sol/nslcm/v1/ns_instances/{nsInstanceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSolNetworkInstanceInput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nsdInfoId: S.String.pipe(T.HttpLabel("nsdInfoId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/sol/nsd/v1/ns_descriptors/{nsdInfoId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSolNetworkPackageInput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ vnfInstanceId: S.String.pipe(T.HttpLabel("vnfInstanceId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/sol/vnflcm/v1/vnf_instances/{vnfInstanceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSolFunctionInstanceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          nodeGroup: S.optional(S.String),
          cluster: S.optional(S.String),
          helmChart: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetSolVnfcResourceInfoMetadata" });
    case 2:
      return S.suspend(() => S.Struct({ metadata: S.optional(__S(25, __c3, 1)) })).annotate({
        identifier: "GetSolVnfcResourceInfo",
      });
    case 3:
      return S.Array(__S(26, __c3, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          vnfState: S.optional(S.String),
          vnfcResourceInfo: S.optional(__S(27, __c3, 3)),
        }),
      ).annotate({ identifier: "GetSolVnfInfo" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          nsInstanceId: S.String,
          vnfPkgId: S.String,
          vnfdId: S.String,
          vnfProvider: S.optional(S.String),
          vnfProductName: S.optional(S.String),
          vnfdVersion: S.optional(S.String),
          instantiationState: S.String,
          instantiatedVnfInfo: S.optional(__S(28, __c3, 4)),
          metadata: __S(32, __c4, 0),
          tags: S.optional(__S(320, __c40, 0)),
        }),
      ).annotate({ identifier: "GetSolFunctionInstanceOutput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastModified: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "GetSolFunctionInstanceMetadata" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ vnfPkgId: S.String.pipe(T.HttpLabel("vnfPkgId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/sol/vnfpkgm/v1/vnf_packages/{vnfPkgId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSolFunctionPackageInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          vnfd: S.optional(__S(50, __c6, 2)),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastModified: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "GetSolFunctionPackageMetadata" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          onboardingState: S.String,
          operationalState: S.String,
          usageState: S.String,
          vnfdId: S.optional(S.String),
          vnfProvider: S.optional(S.String),
          vnfProductName: S.optional(S.String),
          vnfdVersion: S.optional(S.String),
          metadata: S.optional(__S(41, __c5, 1)),
          tags: S.optional(__S(320, __c40, 0)),
        }),
      ).annotate({ identifier: "GetSolFunctionPackageOutput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), defaultValue: S.optional(S.String) }),
      ).annotate({ identifier: "ToscaOverride" });
    case 1:
      return S.Array(__S(48, __c6, 0));
    case 2:
      return S.suspend(() => S.Struct({ overrides: S.optional(__S(49, __c6, 1)) })).annotate({
        identifier: "FunctionArtifactMeta",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vnfPkgId: S.String.pipe(T.HttpLabel("vnfPkgId")),
          accept: S.String.pipe(T.HttpHeader("Accept")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/sol/vnfpkgm/v1/vnf_packages/{vnfPkgId}/package_content",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSolFunctionPackageContentInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          packageContent: S.optional(T.Blob).pipe(T.HttpPayload()),
        }),
      ).annotate({ identifier: "GetSolFunctionPackageContentOutput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vnfPkgId: S.String.pipe(T.HttpLabel("vnfPkgId")),
          accept: S.String.pipe(T.HttpHeader("Accept")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/sol/vnfpkgm/v1/vnf_packages/{vnfPkgId}/vnfd" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSolFunctionPackageDescriptorInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          vnfd: S.optional(T.Blob).pipe(T.HttpPayload()),
        }),
      ).annotate({ identifier: "GetSolFunctionPackageDescriptorOutput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nsInstanceId: S.String.pipe(T.HttpLabel("nsInstanceId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/sol/nslcm/v1/ns_instances/{nsInstanceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSolNetworkInstanceInput" });
    case 1:
      return S.suspend(() => S.Struct({ nsLcmOpOccId: S.String })).annotate({
        identifier: "LcmOperationInfo",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          nsInstanceName: S.String,
          nsInstanceDescription: S.String,
          nsdId: S.String,
          nsdInfoId: S.String,
          nsState: S.optional(S.String),
          lcmOpInfo: S.optional(__S(73, __c9, 1)),
          metadata: __S(32, __c4, 0),
          tags: S.optional(__S(320, __c40, 0)),
        }),
      ).annotate({ identifier: "GetSolNetworkInstanceOutput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nsLcmOpOccId: S.String.pipe(T.HttpLabel("nsLcmOpOccId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/sol/nslcm/v1/ns_lcm_op_occs/{nsLcmOpOccId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSolNetworkOperationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          updateNsMetadata: S.optional(__S(96, __c12, 0)),
          modifyVnfInfoMetadata: S.optional(__S(97, __c12, 1)),
          instantiateMetadata: S.optional(__S(96, __c12, 0)),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastModified: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "GetSolNetworkOperationMetadata" });
    case 2:
      return S.suspend(() =>
        S.Struct({ cause: S.optional(S.String), details: S.optional(S.String) }),
      ).annotate({ identifier: "ErrorInfo" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          taskName: S.optional(S.String),
          taskContext: S.optional(__S(320, __c40, 0)),
          taskErrorDetails: S.optional(__S(82, __c10, 2)),
          taskStatus: S.optional(S.String),
          taskStartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          taskEndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "GetSolNetworkOperationTaskDetails" });
    case 4:
      return S.Array(__S(83, __c10, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.String,
          operationState: S.optional(S.String),
          nsInstanceId: S.optional(S.String),
          lcmOperationType: S.optional(S.String),
          updateType: S.optional(S.String),
          error: S.optional(__S(88, __c11, 0)),
          metadata: S.optional(__S(81, __c10, 1)),
          tasks: S.optional(__S(84, __c10, 4)),
          tags: S.optional(__S(320, __c40, 0)),
        }),
      ).annotate({ identifier: "GetSolNetworkOperationOutput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ detail: S.String, title: S.optional(S.String) })).annotate({
        identifier: "ProblemDetails",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nsdInfoId: S.String, additionalParamsForNs: S.optional(S.Any) }),
      ).annotate({ identifier: "UpdateNsMetadata" });
    case 1:
      return S.suspend(() =>
        S.Struct({ vnfInstanceId: S.String, vnfConfigurableProperties: S.Any }),
      ).annotate({ identifier: "ModifyVnfInfoMetadata" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nsdInfoId: S.String.pipe(T.HttpLabel("nsdInfoId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/sol/nsd/v1/ns_descriptors/{nsdInfoId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSolNetworkPackageInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          nsd: S.optional(__S(50, __c6, 2)),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastModified: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "GetSolNetworkPackageMetadata" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          nsdOnboardingState: S.String,
          nsdOperationalState: S.String,
          nsdUsageState: S.String,
          nsdId: S.String,
          nsdName: S.String,
          nsdVersion: S.String,
          vnfPkgIds: __S(112, __c14, 0),
          metadata: __S(105, __c13, 1),
          tags: S.optional(__S(320, __c40, 0)),
        }),
      ).annotate({ identifier: "GetSolNetworkPackageOutput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nsdInfoId: S.String.pipe(T.HttpLabel("nsdInfoId")),
          accept: S.String.pipe(T.HttpHeader("Accept")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/sol/nsd/v1/ns_descriptors/{nsdInfoId}/nsd_content" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSolNetworkPackageContentInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          nsdContent: S.optional(T.Blob).pipe(T.HttpPayload()),
        }),
      ).annotate({ identifier: "GetSolNetworkPackageContentOutput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nsdInfoId: S.String.pipe(T.HttpLabel("nsdInfoId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/sol/nsd/v1/ns_descriptors/{nsdInfoId}/nsd" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSolNetworkPackageDescriptorInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          nsd: S.optional(T.Blob).pipe(T.HttpPayload()),
        }),
      ).annotate({ identifier: "GetSolNetworkPackageDescriptorOutput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nsInstanceId: S.String.pipe(T.HttpLabel("nsInstanceId")),
          dryRun: S.optional(S.Boolean).pipe(T.HttpQuery("dry_run")),
          additionalParamsForNs: S.optional(S.Any),
          tags: S.optional(__S(320, __c40, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/sol/nslcm/v1/ns_instances/{nsInstanceId}/instantiate",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "InstantiateSolNetworkInstanceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ nsLcmOpOccId: S.String, tags: S.optional(__S(320, __c40, 0)) }),
      ).annotate({ identifier: "InstantiateSolNetworkInstanceOutput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextpage_opaque_marker")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/sol/vnflcm/v1/vnf_instances" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSolFunctionInstancesInput" });
    case 1:
      return S.suspend(() => S.Struct({ vnfState: S.optional(S.String) })).annotate({
        identifier: "GetSolInstantiatedVnfInfo",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          nsInstanceId: S.String,
          vnfPkgId: S.String,
          vnfPkgName: S.optional(S.String),
          instantiationState: S.String,
          instantiatedVnfInfo: S.optional(__S(145, __c18, 1)),
          metadata: __S(32, __c4, 0),
        }),
      ).annotate({ identifier: "ListSolFunctionInstanceInfo" });
    case 3:
      return S.Array(__S(146, __c18, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          functionInstances: S.optional(__S(147, __c18, 3)),
        }),
      ).annotate({ identifier: "ListSolFunctionInstancesOutput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextpage_opaque_marker")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/sol/vnfpkgm/v1/vnf_packages" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSolFunctionPackagesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          onboardingState: S.String,
          operationalState: S.String,
          usageState: S.String,
          vnfdId: S.optional(S.String),
          vnfProvider: S.optional(S.String),
          vnfProductName: S.optional(S.String),
          vnfdVersion: S.optional(S.String),
          metadata: S.optional(__S(32, __c4, 0)),
        }),
      ).annotate({ identifier: "ListSolFunctionPackageInfo" });
    case 2:
      return S.Array(__S(153, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), functionPackages: __S(154, __c19, 2) }),
      ).annotate({ identifier: "ListSolFunctionPackagesOutput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextpage_opaque_marker")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/sol/nslcm/v1/ns_instances" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSolNetworkInstancesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          nsInstanceName: S.String,
          nsInstanceDescription: S.String,
          nsdId: S.String,
          nsdInfoId: S.String,
          nsState: S.String,
          metadata: __S(32, __c4, 0),
        }),
      ).annotate({ identifier: "ListSolNetworkInstanceInfo" });
    case 2:
      return S.Array(__S(161, __c20, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          networkInstances: S.optional(__S(162, __c20, 2)),
        }),
      ).annotate({ identifier: "ListSolNetworkInstancesOutput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nsInstanceId: S.optional(S.String).pipe(T.HttpQuery("nsInstanceId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextpage_opaque_marker")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/sol/nslcm/v1/ns_lcm_op_occs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSolNetworkOperationsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          nsdInfoId: S.optional(S.String),
          vnfInstanceId: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastModified: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "ListSolNetworkOperationsMetadata" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          operationState: S.String,
          nsInstanceId: S.String,
          lcmOperationType: S.String,
          updateType: S.optional(S.String),
          error: S.optional(__S(88, __c11, 0)),
          metadata: S.optional(__S(169, __c21, 1)),
        }),
      ).annotate({ identifier: "ListSolNetworkOperationsInfo" });
    case 3:
      return S.Array(__S(170, __c21, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          networkOperations: S.optional(__S(171, __c21, 3)),
        }),
      ).annotate({ identifier: "ListSolNetworkOperationsOutput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextpage_opaque_marker")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/sol/nsd/v1/ns_descriptors" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSolNetworkPackagesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          nsdOnboardingState: S.String,
          nsdOperationalState: S.String,
          nsdUsageState: S.String,
          nsdId: S.optional(S.String),
          nsdName: S.optional(S.String),
          nsdVersion: S.optional(S.String),
          nsdDesigner: S.optional(S.String),
          nsdInvariantId: S.optional(S.String),
          vnfPkgIds: S.optional(__S(112, __c14, 0)),
          metadata: __S(32, __c4, 0),
        }),
      ).annotate({ identifier: "ListSolNetworkPackageInfo" });
    case 2:
      return S.Array(__S(177, __c22, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), networkPackages: __S(178, __c22, 2) }),
      ).annotate({ identifier: "ListSolNetworkPackagesOutput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() => S.Struct({ tags: __S(320, __c40, 0) })).annotate({
        identifier: "ListTagsForResourceOutput",
      });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vnfPkgId: S.String.pipe(T.HttpLabel("vnfPkgId")),
          contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          file: T.StreamingInput.pipe(T.HttpPayload()),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/sol/vnfpkgm/v1/vnf_packages/{vnfPkgId}/package_content",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutSolFunctionPackageContentInput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ vnfd: S.optional(__S(50, __c6, 2)) })).annotate({
        identifier: "PutSolFunctionPackageContentMetadata",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          vnfdId: S.String,
          vnfProductName: S.String,
          vnfProvider: S.String,
          vnfdVersion: S.String,
          metadata: __S(200, __c25, 0),
        }),
      ).annotate({ identifier: "PutSolFunctionPackageContentOutput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nsdInfoId: S.String.pipe(T.HttpLabel("nsdInfoId")),
          contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          file: T.StreamingInput.pipe(T.HttpPayload()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/sol/nsd/v1/ns_descriptors/{nsdInfoId}/nsd_content" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutSolNetworkPackageContentInput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ nsd: S.optional(__S(50, __c6, 2)) })).annotate({
        identifier: "PutSolNetworkPackageContentMetadata",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          nsdId: S.String,
          nsdName: S.String,
          nsdVersion: S.String,
          vnfPkgIds: __S(112, __c14, 0),
          metadata: __S(216, __c27, 0),
        }),
      ).annotate({ identifier: "PutSolNetworkPackageContentOutput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(320, __c40, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nsInstanceId: S.String.pipe(T.HttpLabel("nsInstanceId")),
          tags: S.optional(__S(320, __c40, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/sol/nslcm/v1/ns_instances/{nsInstanceId}/terminate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TerminateSolNetworkInstanceInput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nsLcmOpOccId: S.optional(S.String), tags: S.optional(__S(320, __c40, 0)) }),
      ).annotate({ identifier: "TerminateSolNetworkInstanceOutput" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(112, __c14, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vnfPkgId: S.String.pipe(T.HttpLabel("vnfPkgId")),
          operationalState: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/sol/vnfpkgm/v1/vnf_packages/{vnfPkgId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSolFunctionPackageInput" });
    case 1:
      return S.suspend(() => S.Struct({ operationalState: S.String })).annotate({
        identifier: "UpdateSolFunctionPackageOutput",
      });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nsInstanceId: S.String.pipe(T.HttpLabel("nsInstanceId")),
          updateType: S.String,
          modifyVnfInfoData: S.optional(__S(97, __c12, 1)),
          updateNs: S.optional(__S(96, __c12, 0)),
          tags: S.optional(__S(320, __c40, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/sol/nslcm/v1/ns_instances/{nsInstanceId}/update" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSolNetworkInstanceInput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nsdInfoId: S.String.pipe(T.HttpLabel("nsdInfoId")),
          nsdOperationalState: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/sol/nsd/v1/ns_descriptors/{nsdInfoId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSolNetworkPackageInput" });
    case 1:
      return S.suspend(() => S.Struct({ nsdOperationalState: S.String })).annotate({
        identifier: "UpdateSolNetworkPackageOutput",
      });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vnfPkgId: S.String.pipe(T.HttpLabel("vnfPkgId")),
          contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          file: T.StreamingInput.pipe(T.HttpPayload()),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/sol/vnfpkgm/v1/vnf_packages/{vnfPkgId}/package_content/validate",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ValidateSolFunctionPackageContentInput" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nsdInfoId: S.String.pipe(T.HttpLabel("nsdInfoId")),
          contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          file: T.StreamingInput.pipe(T.HttpPayload()),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/sol/nsd/v1/ns_descriptors/{nsdInfoId}/nsd_content/validate",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ValidateSolNetworkPackageContentInput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nsLcmOpOccId: S.String.pipe(T.HttpLabel("nsLcmOpOccId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/sol/nslcm/v1/ns_lcm_op_occs/{nsLcmOpOccId}/cancel" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelSolNetworkOperationInput" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "CancelSolNetworkOperationResponse",
      });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tags: S.optional(__S(320, __c40, 0)) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/sol/vnfpkgm/v1/vnf_packages" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSolFunctionPackageInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          onboardingState: S.String,
          operationalState: S.String,
          usageState: S.String,
          tags: S.optional(__S(320, __c40, 0)),
        }),
      ).annotate({ identifier: "CreateSolFunctionPackageOutput" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nsdInfoId: S.String,
          nsName: S.String,
          nsDescription: S.optional(S.String),
          tags: S.optional(__S(320, __c40, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/sol/nslcm/v1/ns_instances" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSolNetworkInstanceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          nsdInfoId: S.String,
          nsInstanceName: S.String,
          tags: S.optional(__S(320, __c40, 0)),
        }),
      ).annotate({ identifier: "CreateSolNetworkInstanceOutput" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tags: S.optional(__S(320, __c40, 0)) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/sol/nsd/v1/ns_descriptors" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSolNetworkPackageInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          nsdOnboardingState: S.String,
          nsdOperationalState: S.String,
          nsdUsageState: S.String,
          tags: S.optional(__S(320, __c40, 0)),
        }),
      ).annotate({ identifier: "CreateSolNetworkPackageOutput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
