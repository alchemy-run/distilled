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
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Route53 Recovery Readiness",
  serviceShapeName: "Route53RecoveryReadiness",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "route53-recovery-readiness" });
const ver = /*@__PURE__*/ T.ServiceVersion("2019-12-02");
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
              `https://route53-recovery-readiness-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://route53-recovery-readiness-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://route53-recovery-readiness.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://route53-recovery-readiness.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://route53-recovery-readiness.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type __listOf__string = string[];
const __listOf__string = /*@__PURE__*/ __L.at(__c35, 0);
export type Tags = { [key: string]: string | undefined };
export interface CreateCellRequest {
  CellName?: string;
  Cells?: string[];
  Tags?: { [key: string]: string | undefined };
}
export type __stringMax256 = string;
export type __stringMax64PatternAAZAZ09Z = string;
export interface CreateCellResponse {
  CellArn?: string;
  CellName?: string;
  Cells?: string[];
  ParentReadinessScopes?: string[];
  Tags?: { [key: string]: string | undefined };
}
export type CrossAccountAuthorization = string;
export interface CreateCrossAccountAuthorizationRequest {
  CrossAccountAuthorization?: string;
}
export interface CreateCrossAccountAuthorizationResponse {
  CrossAccountAuthorization?: string;
}
export interface CreateReadinessCheckRequest {
  ReadinessCheckName?: string;
  ResourceSetName?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateReadinessCheckResponse {
  ReadinessCheckArn?: string;
  ReadinessCheckName?: string;
  ResourceSet?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateRecoveryGroupRequest {
  Cells?: string[];
  RecoveryGroupName?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateRecoveryGroupResponse {
  Cells?: string[];
  RecoveryGroupArn?: string;
  RecoveryGroupName?: string;
  Tags?: { [key: string]: string | undefined };
}
export type __stringPatternAWSAZaZ09AZaZ09 = string;
export interface NLBResource {
  Arn?: string;
}
export interface R53ResourceRecord {
  DomainName?: string;
  RecordSetId?: string;
}
export interface TargetResource {
  NLBResource?: NLBResource;
  R53Resource?: R53ResourceRecord;
}
export interface DNSTargetResource {
  DomainName?: string;
  HostedZoneArn?: string;
  RecordSetId?: string;
  RecordType?: string;
  TargetResource?: TargetResource;
}
export interface Resource {
  ComponentId?: string;
  DnsTargetResource?: DNSTargetResource;
  ReadinessScopes?: string[];
  ResourceArn?: string;
}
export type __listOfResource = Resource[];
const __listOfResource = /*@__PURE__*/ __L.at(__c1, 5);
export interface CreateResourceSetRequest {
  ResourceSetName?: string;
  ResourceSetType?: string;
  Resources?: Resource[];
  Tags?: { [key: string]: string | undefined };
}
export interface CreateResourceSetResponse {
  ResourceSetArn?: string;
  ResourceSetName?: string;
  ResourceSetType?: string;
  Resources?: Resource[];
  Tags?: { [key: string]: string | undefined };
}
export interface DeleteCellRequest {
  CellName: string;
}
export interface DeleteCellResponse {}
export interface DeleteCrossAccountAuthorizationRequest {
  CrossAccountAuthorization: string;
}
export interface DeleteCrossAccountAuthorizationResponse {}
export interface DeleteReadinessCheckRequest {
  ReadinessCheckName: string;
}
export interface DeleteReadinessCheckResponse {}
export interface DeleteRecoveryGroupRequest {
  RecoveryGroupName: string;
}
export interface DeleteRecoveryGroupResponse {}
export interface DeleteResourceSetRequest {
  ResourceSetName: string;
}
export interface DeleteResourceSetResponse {}
export type MaxResults = number;
export interface GetArchitectureRecommendationsRequest {
  MaxResults?: number;
  NextToken?: string;
  RecoveryGroupName: string;
}
export type LastAuditTimestamp = Date;
export interface Recommendation {
  RecommendationText?: string;
}
export type __listOfRecommendation = Recommendation[];
const __listOfRecommendation = /*@__PURE__*/ __L.at(__c8, 2);
export interface GetArchitectureRecommendationsResponse {
  LastAuditTimestamp?: Date;
  NextToken?: string;
  Recommendations?: (Recommendation & { RecommendationText: string })[];
}
export interface GetCellRequest {
  CellName: string;
}
export interface GetCellResponse {
  CellArn?: string;
  CellName?: string;
  Cells?: string[];
  ParentReadinessScopes?: string[];
  Tags?: { [key: string]: string | undefined };
}
export interface GetCellReadinessSummaryRequest {
  CellName: string;
  MaxResults?: number;
  NextToken?: string;
}
export type Readiness = "READY" | "NOT_READY" | "UNKNOWN" | "NOT_AUTHORIZED" | (string & {});
export interface ReadinessCheckSummary {
  Readiness?: Readiness;
  ReadinessCheckName?: string;
}
export type __listOfReadinessCheckSummary = ReadinessCheckSummary[];
const __listOfReadinessCheckSummary = /*@__PURE__*/ __L.at(__c11, 1);
export interface GetCellReadinessSummaryResponse {
  NextToken?: string;
  Readiness?: Readiness;
  ReadinessChecks?: ReadinessCheckSummary[];
}
export interface GetReadinessCheckRequest {
  ReadinessCheckName: string;
}
export interface GetReadinessCheckResponse {
  ReadinessCheckArn?: string;
  ReadinessCheckName?: string;
  ResourceSet?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface GetReadinessCheckResourceStatusRequest {
  MaxResults?: number;
  NextToken?: string;
  ReadinessCheckName: string;
  ResourceIdentifier: string;
}
export type ReadinessCheckTimestamp = Date;
export interface Message {
  MessageText?: string;
}
export type __listOfMessage = Message[];
const __listOfMessage = /*@__PURE__*/ __L.at(__c14, 1);
export interface RuleResult {
  LastCheckedTimestamp?: Date;
  Messages?: Message[];
  Readiness?: Readiness;
  RuleId?: string;
}
export type __listOfRuleResult = RuleResult[];
const __listOfRuleResult = /*@__PURE__*/ __L.at(__c13, 2);
export interface GetReadinessCheckResourceStatusResponse {
  NextToken?: string;
  Readiness?: Readiness;
  Rules?: (RuleResult & {
    LastCheckedTimestamp: ReadinessCheckTimestamp;
    Messages: __listOfMessage;
    Readiness: Readiness;
    RuleId: string;
  })[];
}
export interface GetReadinessCheckStatusRequest {
  MaxResults?: number;
  NextToken?: string;
  ReadinessCheckName: string;
}
export interface ResourceResult {
  ComponentId?: string;
  LastCheckedTimestamp?: Date;
  Readiness?: Readiness;
  ResourceArn?: string;
}
export type __listOfResourceResult = ResourceResult[];
const __listOfResourceResult = /*@__PURE__*/ __L.at(__c15, 2);
export interface GetReadinessCheckStatusResponse {
  Messages?: Message[];
  NextToken?: string;
  Readiness?: Readiness;
  Resources?: (ResourceResult & {
    LastCheckedTimestamp: ReadinessCheckTimestamp;
    Readiness: Readiness;
  })[];
}
export interface GetRecoveryGroupRequest {
  RecoveryGroupName: string;
}
export interface GetRecoveryGroupResponse {
  Cells?: string[];
  RecoveryGroupArn?: string;
  RecoveryGroupName?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface GetRecoveryGroupReadinessSummaryRequest {
  MaxResults?: number;
  NextToken?: string;
  RecoveryGroupName: string;
}
export interface GetRecoveryGroupReadinessSummaryResponse {
  NextToken?: string;
  Readiness?: Readiness;
  ReadinessChecks?: ReadinessCheckSummary[];
}
export interface GetResourceSetRequest {
  ResourceSetName: string;
}
export interface GetResourceSetResponse {
  ResourceSetArn?: string;
  ResourceSetName?: string;
  ResourceSetType?: string;
  Resources?: Resource[];
  Tags?: { [key: string]: string | undefined };
}
export interface ListCellsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface CellOutput {
  CellArn?: string;
  CellName?: string;
  Cells?: string[];
  ParentReadinessScopes?: string[];
  Tags?: { [key: string]: string | undefined };
}
export type __listOfCellOutput = CellOutput[];
const __listOfCellOutput = /*@__PURE__*/ __L.at(__c19, 1);
export interface ListCellsResponse {
  Cells?: (CellOutput & {
    CellArn: __stringMax256;
    CellName: __stringMax64PatternAAZAZ09Z;
    Cells: __listOf__string;
    ParentReadinessScopes: __listOf__string;
  })[];
  NextToken?: string;
}
export interface ListCrossAccountAuthorizationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type __listOfCrossAccountAuthorization = string[];
const __listOfCrossAccountAuthorization =
  __listOf__string as any as S.Schema<__listOfCrossAccountAuthorization>;
export interface ListCrossAccountAuthorizationsResponse {
  CrossAccountAuthorizations?: string[];
  NextToken?: string;
}
export interface ListReadinessChecksRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface ReadinessCheckOutput {
  ReadinessCheckArn?: string;
  ReadinessCheckName?: string;
  ResourceSet?: string;
  Tags?: { [key: string]: string | undefined };
}
export type __listOfReadinessCheckOutput = ReadinessCheckOutput[];
const __listOfReadinessCheckOutput = /*@__PURE__*/ __L.at(__c21, 1);
export interface ListReadinessChecksResponse {
  NextToken?: string;
  ReadinessChecks?: (ReadinessCheckOutput & {
    ReadinessCheckArn: __stringMax256;
    ResourceSet: __stringMax64PatternAAZAZ09Z;
  })[];
}
export interface ListRecoveryGroupsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface RecoveryGroupOutput {
  Cells?: string[];
  RecoveryGroupArn?: string;
  RecoveryGroupName?: string;
  Tags?: { [key: string]: string | undefined };
}
export type __listOfRecoveryGroupOutput = RecoveryGroupOutput[];
const __listOfRecoveryGroupOutput = /*@__PURE__*/ __L.at(__c22, 1);
export interface ListRecoveryGroupsResponse {
  NextToken?: string;
  RecoveryGroups?: (RecoveryGroupOutput & {
    Cells: __listOf__string;
    RecoveryGroupArn: __stringMax256;
    RecoveryGroupName: __stringMax64PatternAAZAZ09Z;
  })[];
}
export interface ListResourceSetsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface ResourceSetOutput {
  ResourceSetArn?: string;
  ResourceSetName?: string;
  ResourceSetType?: string;
  Resources?: Resource[];
  Tags?: { [key: string]: string | undefined };
}
export type __listOfResourceSetOutput = ResourceSetOutput[];
const __listOfResourceSetOutput = /*@__PURE__*/ __L.at(__c23, 1);
export interface ListResourceSetsResponse {
  NextToken?: string;
  ResourceSets?: (ResourceSetOutput & {
    ResourceSetArn: __stringMax256;
    ResourceSetName: __stringMax64PatternAAZAZ09Z;
    ResourceSetType: __stringPatternAWSAZaZ09AZaZ09;
    Resources: __listOfResource;
  })[];
}
export interface ListRulesRequest {
  MaxResults?: number;
  NextToken?: string;
  ResourceType?: string;
}
export type __stringMax64 = string;
export interface ListRulesOutput {
  ResourceType?: string;
  RuleDescription?: string;
  RuleId?: string;
}
export type __listOfListRulesOutput = ListRulesOutput[];
const __listOfListRulesOutput = /*@__PURE__*/ __L.at(__c24, 2);
export interface ListRulesResponse {
  NextToken?: string;
  Rules?: (ListRulesOutput & {
    ResourceType: __stringMax64;
    RuleDescription: __stringMax256;
    RuleId: __stringMax64;
  })[];
}
export interface ListTagsForResourcesRequest {
  ResourceArn: string;
}
export interface ListTagsForResourcesResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags?: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys?: string[];
}
export interface UntagResourceResponse {}
export interface UpdateCellRequest {
  CellName: string;
  Cells?: string[];
}
export interface UpdateCellResponse {
  CellArn?: string;
  CellName?: string;
  Cells?: string[];
  ParentReadinessScopes?: string[];
  Tags?: { [key: string]: string | undefined };
}
export interface UpdateReadinessCheckRequest {
  ReadinessCheckName: string;
  ResourceSetName?: string;
}
export interface UpdateReadinessCheckResponse {
  ReadinessCheckArn?: string;
  ReadinessCheckName?: string;
  ResourceSet?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface UpdateRecoveryGroupRequest {
  Cells?: string[];
  RecoveryGroupName: string;
}
export interface UpdateRecoveryGroupResponse {
  Cells?: string[];
  RecoveryGroupArn?: string;
  RecoveryGroupName?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface UpdateResourceSetRequest {
  ResourceSetName: string;
  ResourceSetType?: string;
  Resources?: Resource[];
}
export interface UpdateResourceSetResponse {
  ResourceSetArn?: string;
  ResourceSetName?: string;
  ResourceSetType?: string;
  Resources?: Resource[];
  Tags?: { [key: string]: string | undefined };
}
export type CreateCellError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a cell in an account.
 */
export const createCell: API.OperationMethod<
  CreateCellRequest,
  CreateCellResponse,
  CreateCellError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c32, 0) as any as S.Schema<CreateCellRequest>,
  output: __S(264, __c33, 0) as any as S.Schema<CreateCellResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCell",
}));

export type CreateCrossAccountAuthorizationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a cross-account readiness authorization. This lets you authorize another account to work with Route 53 Application Recovery Controller, for example, to check the readiness status of resources in a separate account.
 */
export const createCrossAccountAuthorization: API.OperationMethod<
  CreateCrossAccountAuthorizationRequest,
  CreateCrossAccountAuthorizationResponse,
  CreateCrossAccountAuthorizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c36, 0) as any as S.Schema<CreateCrossAccountAuthorizationRequest>,
  output: __S(289, __c36, 1) as any as S.Schema<CreateCrossAccountAuthorizationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCrossAccountAuthorization",
}));

export type CreateReadinessCheckError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a readiness check in an account. A readiness check monitors a resource set in your application, such as a set of Amazon Aurora instances, that Application Recovery Controller is auditing recovery readiness for. The audits run once every minute on every resource that's associated with a readiness check.
 */
export const createReadinessCheck: API.OperationMethod<
  CreateReadinessCheckRequest,
  CreateReadinessCheckResponse,
  CreateReadinessCheckError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(296, __c37, 0) as any as S.Schema<CreateReadinessCheckRequest>,
  output: __S(304, __c38, 0) as any as S.Schema<CreateReadinessCheckResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReadinessCheck",
}));

export type CreateRecoveryGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a recovery group in an account. A recovery group corresponds to an application and includes a list of the cells that make up the application.
 */
export const createRecoveryGroup: API.OperationMethod<
  CreateRecoveryGroupRequest,
  CreateRecoveryGroupResponse,
  CreateRecoveryGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(312, __c39, 0) as any as S.Schema<CreateRecoveryGroupRequest>,
  output: __S(320, __c40, 0) as any as S.Schema<CreateRecoveryGroupResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRecoveryGroup",
}));

export type CreateResourceSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a resource set. A resource set is a set of resources of one type that span multiple cells. You can associate a resource set with a readiness check to monitor the resources for failover readiness.
 */
export const createResourceSet: API.OperationMethod<
  CreateResourceSetRequest,
  CreateResourceSetResponse,
  CreateResourceSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateResourceSetRequest>,
  output: __S(14, __c1, 6) as any as S.Schema<CreateResourceSetResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResourceSet",
}));

export type DeleteCellError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a cell. When successful, the response code is 204, with no response body.
 */
export const deleteCell: API.OperationMethod<
  DeleteCellRequest,
  DeleteCellResponse,
  DeleteCellError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c2, 0) as any as S.Schema<DeleteCellRequest>,
  output: __S(24, __c3, 0) as any as S.Schema<DeleteCellResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCell",
}));

export type DeleteCrossAccountAuthorizationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes cross account readiness authorization.
 */
export const deleteCrossAccountAuthorization: API.OperationMethod<
  DeleteCrossAccountAuthorizationRequest,
  DeleteCrossAccountAuthorizationResponse,
  DeleteCrossAccountAuthorizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<DeleteCrossAccountAuthorizationRequest>,
  output: __S(24, __c3, 0) as any as S.Schema<DeleteCrossAccountAuthorizationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCrossAccountAuthorization",
}));

export type DeleteReadinessCheckError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a readiness check.
 */
export const deleteReadinessCheck: API.OperationMethod<
  DeleteReadinessCheckRequest,
  DeleteReadinessCheckResponse,
  DeleteReadinessCheckError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<DeleteReadinessCheckRequest>,
  output: __S(24, __c3, 0) as any as S.Schema<DeleteReadinessCheckResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReadinessCheck",
}));

export type DeleteRecoveryGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a recovery group.
 */
export const deleteRecoveryGroup: API.OperationMethod<
  DeleteRecoveryGroupRequest,
  DeleteRecoveryGroupResponse,
  DeleteRecoveryGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<DeleteRecoveryGroupRequest>,
  output: __S(24, __c3, 0) as any as S.Schema<DeleteRecoveryGroupResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRecoveryGroup",
}));

export type DeleteResourceSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a resource set.
 */
export const deleteResourceSet: API.OperationMethod<
  DeleteResourceSetRequest,
  DeleteResourceSetResponse,
  DeleteResourceSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<DeleteResourceSetRequest>,
  output: __S(24, __c3, 0) as any as S.Schema<DeleteResourceSetResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourceSet",
}));

export type GetArchitectureRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets recommendations about architecture designs for improving resiliency for an application, based on a recovery group.
 */
export const getArchitectureRecommendations: API.OperationMethod<
  GetArchitectureRecommendationsRequest,
  GetArchitectureRecommendationsResponse,
  GetArchitectureRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<GetArchitectureRecommendationsRequest>,
  output: __S(67, __c8, 3) as any as S.Schema<GetArchitectureRecommendationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetArchitectureRecommendations",
}));

export type GetCellError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a cell including cell name, cell Amazon Resource Name (ARN), ARNs of nested cells for this cell, and a list of those cell ARNs with their associated recovery group ARNs.
 */
export const getCell: API.OperationMethod<
  GetCellRequest,
  GetCellResponse,
  GetCellError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(72, __c9, 0) as any as S.Schema<GetCellRequest>,
  output: __S(264, __c33, 0) as any as S.Schema<GetCellResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCell",
}));

export type GetCellReadinessSummaryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets readiness for a cell. Aggregates the readiness of all the resources that are associated with the cell into a single value.
 */
export const getCellReadinessSummary: API.PaginatedOperationMethod<
  GetCellReadinessSummaryRequest,
  GetCellReadinessSummaryResponse,
  GetCellReadinessSummaryError,
  Credentials | HttpClient.HttpClient,
  ReadinessCheckSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<GetCellReadinessSummaryRequest>,
  output: __S(90, __c11, 2) as any as S.Schema<GetCellReadinessSummaryResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCellReadinessSummary",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ReadinessChecks",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetReadinessCheckError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets details about a readiness check.
 */
export const getReadinessCheck: API.OperationMethod<
  GetReadinessCheckRequest,
  GetReadinessCheckResponse,
  GetReadinessCheckError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<GetReadinessCheckRequest>,
  output: __S(304, __c38, 0) as any as S.Schema<GetReadinessCheckResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReadinessCheck",
}));

export type GetReadinessCheckResourceStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets individual readiness status for a readiness check. To see the overall readiness status for a recovery group, that considers the readiness status for all the readiness checks in the recovery group, use GetRecoveryGroupReadinessSummary.
 */
export const getReadinessCheckResourceStatus: API.PaginatedOperationMethod<
  GetReadinessCheckResourceStatusRequest,
  GetReadinessCheckResourceStatusResponse,
  GetReadinessCheckResourceStatusError,
  Credentials | HttpClient.HttpClient,
  RuleResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<GetReadinessCheckResourceStatusRequest>,
  output: __S(107, __c13, 3) as any as S.Schema<GetReadinessCheckResourceStatusResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReadinessCheckResourceStatus",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Rules",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetReadinessCheckStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the readiness status for an individual readiness check. To see the overall readiness status for a recovery group, that considers the readiness status for all the readiness checks in a recovery group, use GetRecoveryGroupReadinessSummary.
 */
export const getReadinessCheckStatus: API.PaginatedOperationMethod<
  GetReadinessCheckStatusRequest,
  GetReadinessCheckStatusResponse,
  GetReadinessCheckStatusError,
  Credentials | HttpClient.HttpClient,
  ResourceResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<GetReadinessCheckStatusRequest>,
  output: __S(123, __c15, 3) as any as S.Schema<GetReadinessCheckStatusResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReadinessCheckStatus",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Resources",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetRecoveryGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets details about a recovery group, including a list of the cells that are included in it.
 */
export const getRecoveryGroup: API.OperationMethod<
  GetRecoveryGroupRequest,
  GetRecoveryGroupResponse,
  GetRecoveryGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<GetRecoveryGroupRequest>,
  output: __S(320, __c40, 0) as any as S.Schema<GetRecoveryGroupResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecoveryGroup",
}));

export type GetRecoveryGroupReadinessSummaryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Displays a summary of information about a recovery group's readiness status. Includes the readiness checks for resources in the recovery group and the readiness status of each one.
 */
export const getRecoveryGroupReadinessSummary: API.PaginatedOperationMethod<
  GetRecoveryGroupReadinessSummaryRequest,
  GetRecoveryGroupReadinessSummaryResponse,
  GetRecoveryGroupReadinessSummaryError,
  Credentials | HttpClient.HttpClient,
  ReadinessCheckSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<GetRecoveryGroupReadinessSummaryRequest>,
  output: __S(90, __c11, 2) as any as S.Schema<GetRecoveryGroupReadinessSummaryResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecoveryGroupReadinessSummary",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ReadinessChecks",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetResourceSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Displays the details about a resource set, including a list of the resources in the set.
 */
export const getResourceSet: API.OperationMethod<
  GetResourceSetRequest,
  GetResourceSetResponse,
  GetResourceSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<GetResourceSetRequest>,
  output: __S(14, __c1, 6) as any as S.Schema<GetResourceSetResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceSet",
}));

export type ListCellsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the cells for an account.
 */
export const listCells: API.PaginatedOperationMethod<
  ListCellsRequest,
  ListCellsResponse,
  ListCellsError,
  Credentials | HttpClient.HttpClient,
  CellOutput
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<ListCellsRequest>,
  output: __S(154, __c19, 2) as any as S.Schema<ListCellsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCells",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Cells",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCrossAccountAuthorizationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the cross-account readiness authorizations that are in place for an account.
 */
export const listCrossAccountAuthorizations: API.PaginatedOperationMethod<
  ListCrossAccountAuthorizationsRequest,
  ListCrossAccountAuthorizationsResponse,
  ListCrossAccountAuthorizationsError,
  Credentials | HttpClient.HttpClient,
  CrossAccountAuthorization
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<ListCrossAccountAuthorizationsRequest>,
  output: __S(161, __c20, 1) as any as S.Schema<ListCrossAccountAuthorizationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCrossAccountAuthorizations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CrossAccountAuthorizations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListReadinessChecksError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the readiness checks for an account.
 */
export const listReadinessChecks: API.PaginatedOperationMethod<
  ListReadinessChecksRequest,
  ListReadinessChecksResponse,
  ListReadinessChecksError,
  Credentials | HttpClient.HttpClient,
  ReadinessCheckOutput
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<ListReadinessChecksRequest>,
  output: __S(170, __c21, 2) as any as S.Schema<ListReadinessChecksResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReadinessChecks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ReadinessChecks",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRecoveryGroupsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the recovery groups in an account.
 */
export const listRecoveryGroups: API.PaginatedOperationMethod<
  ListRecoveryGroupsRequest,
  ListRecoveryGroupsResponse,
  ListRecoveryGroupsError,
  Credentials | HttpClient.HttpClient,
  RecoveryGroupOutput
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<ListRecoveryGroupsRequest>,
  output: __S(178, __c22, 2) as any as S.Schema<ListRecoveryGroupsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecoveryGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RecoveryGroups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourceSetsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the resource sets in an account.
 */
export const listResourceSets: API.PaginatedOperationMethod<
  ListResourceSetsRequest,
  ListResourceSetsResponse,
  ListResourceSetsError,
  Credentials | HttpClient.HttpClient,
  ResourceSetOutput
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(184, __c23, 0) as any as S.Schema<ListResourceSetsRequest>,
  output: __S(186, __c23, 2) as any as S.Schema<ListResourceSetsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceSets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceSets",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRulesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all readiness rules, or lists the readiness rules for a specific resource type.
 */
export const listRules: API.PaginatedOperationMethod<
  ListRulesRequest,
  ListRulesResponse,
  ListRulesError,
  Credentials | HttpClient.HttpClient,
  ListRulesOutput
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<ListRulesRequest>,
  output: __S(195, __c24, 3) as any as S.Schema<ListRulesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Rules",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourcesError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags for a resource.
 */
export const listTagsForResources: API.OperationMethod<
  ListTagsForResourcesRequest,
  ListTagsForResourcesResponse,
  ListTagsForResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(200, __c25, 0) as any as S.Schema<ListTagsForResourcesRequest>,
  output: __S(201, __c25, 1) as any as S.Schema<ListTagsForResourcesResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResources",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds a tag to a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(24, __c3, 0) as any as S.Schema<TagResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes a tag from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(216, __c27, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(24, __c3, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateCellError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a cell to replace the list of nested cells with a new list of nested cells.
 */
export const updateCell: API.OperationMethod<
  UpdateCellRequest,
  UpdateCellResponse,
  UpdateCellError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c28, 0) as any as S.Schema<UpdateCellRequest>,
  output: __S(264, __c33, 0) as any as S.Schema<UpdateCellResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCell",
}));

export type UpdateReadinessCheckError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a readiness check.
 */
export const updateReadinessCheck: API.OperationMethod<
  UpdateReadinessCheckRequest,
  UpdateReadinessCheckResponse,
  UpdateReadinessCheckError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<UpdateReadinessCheckRequest>,
  output: __S(304, __c38, 0) as any as S.Schema<UpdateReadinessCheckResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateReadinessCheck",
}));

export type UpdateRecoveryGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a recovery group.
 */
export const updateRecoveryGroup: API.OperationMethod<
  UpdateRecoveryGroupRequest,
  UpdateRecoveryGroupResponse,
  UpdateRecoveryGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c30, 0) as any as S.Schema<UpdateRecoveryGroupRequest>,
  output: __S(320, __c40, 0) as any as S.Schema<UpdateRecoveryGroupResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRecoveryGroup",
}));

export type UpdateResourceSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a resource set.
 */
export const updateResourceSet: API.OperationMethod<
  UpdateResourceSetRequest,
  UpdateResourceSetResponse,
  UpdateResourceSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(248, __c31, 0) as any as S.Schema<UpdateResourceSetRequest>,
  output: __S(14, __c1, 6) as any as S.Schema<UpdateResourceSetResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResourceSet",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceSetName: S.optional(S.String),
          ResourceSetType: S.optional(S.String),
          Resources: S.optional(__listOfResource),
          Tags: S.optional(__S(272, __c34, 0)),
        })
          .pipe(
            S.encodeKeys({
              ResourceSetName: "resourceSetName",
              ResourceSetType: "resourceSetType",
              Resources: "resources",
              Tags: "tags",
            }),
          )
          .pipe(
            T.all(T.Http({ method: "POST", uri: "/resourcesets" }), svc, auth, proto, ver, rules),
          ),
      ).annotate({ identifier: "CreateResourceSetRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.optional(S.String) }).pipe(S.encodeKeys({ Arn: "arn" })),
      ).annotate({ identifier: "NLBResource" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DomainName: S.optional(S.String), RecordSetId: S.optional(S.String) }).pipe(
          S.encodeKeys({ DomainName: "domainName", RecordSetId: "recordSetId" }),
        ),
      ).annotate({ identifier: "R53ResourceRecord" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          NLBResource: S.optional(__S(8, __c1, 0)),
          R53Resource: S.optional(__S(9, __c1, 1)),
        }).pipe(S.encodeKeys({ NLBResource: "nLBResource", R53Resource: "r53Resource" })),
      ).annotate({ identifier: "TargetResource" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.optional(S.String),
          HostedZoneArn: S.optional(S.String),
          RecordSetId: S.optional(S.String),
          RecordType: S.optional(S.String),
          TargetResource: S.optional(__S(10, __c1, 2)),
        }).pipe(
          S.encodeKeys({
            DomainName: "domainName",
            HostedZoneArn: "hostedZoneArn",
            RecordSetId: "recordSetId",
            RecordType: "recordType",
            TargetResource: "targetResource",
          }),
        ),
      ).annotate({ identifier: "DNSTargetResource" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          ComponentId: S.optional(S.String),
          DnsTargetResource: S.optional(__S(11, __c1, 3)),
          ReadinessScopes: S.optional(__listOf__string),
          ResourceArn: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ComponentId: "componentId",
            DnsTargetResource: "dnsTargetResource",
            ReadinessScopes: "readinessScopes",
            ResourceArn: "resourceArn",
          }),
        ),
      ).annotate({ identifier: "Resource" });
    case 5:
      return S.Array(__S(12, __c1, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          ResourceSetArn: S.optional(S.String),
          ResourceSetName: S.optional(S.String),
          ResourceSetType: S.optional(S.String),
          Resources: S.optional(__listOfResource),
          Tags: S.optional(__S(272, __c34, 0)),
        }).pipe(
          S.encodeKeys({
            ResourceSetArn: "resourceSetArn",
            ResourceSetName: "resourceSetName",
            ResourceSetType: "resourceSetType",
            Resources: "resources",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "CreateResourceSetResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CellName: S.String.pipe(T.HttpLabel("CellName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/cells/{CellName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCellRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteCellResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CrossAccountAuthorization: S.String.pipe(T.HttpLabel("CrossAccountAuthorization")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/crossaccountauthorizations/{CrossAccountAuthorization}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCrossAccountAuthorizationRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ReadinessCheckName: S.String.pipe(T.HttpLabel("ReadinessCheckName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/readinesschecks/{ReadinessCheckName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteReadinessCheckRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RecoveryGroupName: S.String.pipe(T.HttpLabel("RecoveryGroupName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/recoverygroups/{RecoveryGroupName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRecoveryGroupRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceSetName: S.String.pipe(T.HttpLabel("ResourceSetName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/resourcesets/{ResourceSetName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteResourceSetRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          RecoveryGroupName: S.String.pipe(T.HttpLabel("RecoveryGroupName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/recoverygroups/{RecoveryGroupName}/architectureRecommendations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetArchitectureRecommendationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ RecommendationText: S.optional(S.String) }).pipe(
          S.encodeKeys({ RecommendationText: "recommendationText" }),
        ),
      ).annotate({ identifier: "Recommendation" });
    case 2:
      return S.Array(__S(65, __c8, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          LastAuditTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          NextToken: S.optional(S.String),
          Recommendations: S.optional(__listOfRecommendation),
        }).pipe(
          S.encodeKeys({
            LastAuditTimestamp: "lastAuditTimestamp",
            NextToken: "nextToken",
            Recommendations: "recommendations",
          }),
        ),
      ).annotate({ identifier: "GetArchitectureRecommendationsResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CellName: S.String.pipe(T.HttpLabel("CellName")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/cells/{CellName}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetCellRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CellName: S.String.pipe(T.HttpLabel("CellName")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/cellreadiness/{CellName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCellReadinessSummaryRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Readiness: S.optional(S.String),
          ReadinessCheckName: S.optional(S.String),
        }).pipe(S.encodeKeys({ Readiness: "readiness", ReadinessCheckName: "readinessCheckName" })),
      ).annotate({ identifier: "ReadinessCheckSummary" });
    case 1:
      return S.Array(__S(88, __c11, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          Readiness: S.optional(S.String),
          ReadinessChecks: S.optional(__listOfReadinessCheckSummary),
        }).pipe(
          S.encodeKeys({
            NextToken: "nextToken",
            Readiness: "readiness",
            ReadinessChecks: "readinessChecks",
          }),
        ),
      ).annotate({ identifier: "GetCellReadinessSummaryResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ReadinessCheckName: S.String.pipe(T.HttpLabel("ReadinessCheckName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/readinesschecks/{ReadinessCheckName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetReadinessCheckRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          ReadinessCheckName: S.String.pipe(T.HttpLabel("ReadinessCheckName")),
          ResourceIdentifier: S.String.pipe(T.HttpLabel("ResourceIdentifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/readinesschecks/{ReadinessCheckName}/resource/{ResourceIdentifier}/status",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetReadinessCheckResourceStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LastCheckedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Messages: S.optional(__listOfMessage),
          Readiness: S.optional(S.String),
          RuleId: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            LastCheckedTimestamp: "lastCheckedTimestamp",
            Messages: "messages",
            Readiness: "readiness",
            RuleId: "ruleId",
          }),
        ),
      ).annotate({ identifier: "RuleResult" });
    case 2:
      return S.Array(__S(105, __c13, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          Readiness: S.optional(S.String),
          Rules: S.optional(__listOfRuleResult),
        }).pipe(S.encodeKeys({ NextToken: "nextToken", Readiness: "readiness", Rules: "rules" })),
      ).annotate({ identifier: "GetReadinessCheckResourceStatusResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MessageText: S.optional(S.String) }).pipe(
          S.encodeKeys({ MessageText: "messageText" }),
        ),
      ).annotate({ identifier: "Message" });
    case 1:
      return S.Array(__S(112, __c14, 0));
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          ReadinessCheckName: S.String.pipe(T.HttpLabel("ReadinessCheckName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/readinesschecks/{ReadinessCheckName}/status" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetReadinessCheckStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ComponentId: S.optional(S.String),
          LastCheckedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Readiness: S.optional(S.String),
          ResourceArn: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ComponentId: "componentId",
            LastCheckedTimestamp: "lastCheckedTimestamp",
            Readiness: "readiness",
            ResourceArn: "resourceArn",
          }),
        ),
      ).annotate({ identifier: "ResourceResult" });
    case 2:
      return S.Array(__S(121, __c15, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Messages: S.optional(__listOfMessage),
          NextToken: S.optional(S.String),
          Readiness: S.optional(S.String),
          Resources: S.optional(__listOfResourceResult),
        }).pipe(
          S.encodeKeys({
            Messages: "messages",
            NextToken: "nextToken",
            Readiness: "readiness",
            Resources: "resources",
          }),
        ),
      ).annotate({ identifier: "GetReadinessCheckStatusResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RecoveryGroupName: S.String.pipe(T.HttpLabel("RecoveryGroupName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/recoverygroups/{RecoveryGroupName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRecoveryGroupRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          RecoveryGroupName: S.String.pipe(T.HttpLabel("RecoveryGroupName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/recoverygroupreadiness/{RecoveryGroupName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRecoveryGroupReadinessSummaryRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceSetName: S.String.pipe(T.HttpLabel("ResourceSetName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/resourcesets/{ResourceSetName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourceSetRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/cells" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListCellsRequest" });
    case 1:
      return S.Array(__S(264, __c33, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Cells: S.optional(__listOfCellOutput), NextToken: S.optional(S.String) }).pipe(
          S.encodeKeys({ Cells: "cells", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "ListCellsResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/crossaccountauthorizations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCrossAccountAuthorizationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CrossAccountAuthorizations: S.optional(__listOfCrossAccountAuthorization),
          NextToken: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            CrossAccountAuthorizations: "crossAccountAuthorizations",
            NextToken: "nextToken",
          }),
        ),
      ).annotate({ identifier: "ListCrossAccountAuthorizationsResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/readinesschecks" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListReadinessChecksRequest" });
    case 1:
      return S.Array(__S(304, __c38, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          ReadinessChecks: S.optional(__listOfReadinessCheckOutput),
        }).pipe(S.encodeKeys({ NextToken: "nextToken", ReadinessChecks: "readinessChecks" })),
      ).annotate({ identifier: "ListReadinessChecksResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/recoverygroups" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListRecoveryGroupsRequest" });
    case 1:
      return S.Array(__S(320, __c40, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          RecoveryGroups: S.optional(__listOfRecoveryGroupOutput),
        }).pipe(S.encodeKeys({ NextToken: "nextToken", RecoveryGroups: "recoveryGroups" })),
      ).annotate({ identifier: "ListRecoveryGroupsResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/resourcesets" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListResourceSetsRequest" });
    case 1:
      return S.Array(__S(14, __c1, 6));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          ResourceSets: S.optional(__listOfResourceSetOutput),
        }).pipe(S.encodeKeys({ NextToken: "nextToken", ResourceSets: "resourceSets" })),
      ).annotate({ identifier: "ListResourceSetsResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          ResourceType: S.optional(S.String).pipe(T.HttpQuery("resourceType")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/rules" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListRulesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceType: S.optional(S.String),
          RuleDescription: S.optional(S.String),
          RuleId: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            ResourceType: "resourceType",
            RuleDescription: "ruleDescription",
            RuleId: "ruleId",
          }),
        ),
      ).annotate({ identifier: "ListRulesOutput" });
    case 2:
      return S.Array(__S(193, __c24, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          Rules: S.optional(__listOfListRulesOutput),
        }).pipe(S.encodeKeys({ NextToken: "nextToken", Rules: "rules" })),
      ).annotate({ identifier: "ListRulesResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "ListTagsForResourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Tags: S.optional(__S(272, __c34, 0)) }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "ListTagsForResourcesResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: S.optional(__S(272, __c34, 0)),
        })
          .pipe(S.encodeKeys({ Tags: "tags" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: S.optional(__listOf__string).pipe(T.HttpQuery("tagKeys")),
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
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CellName: S.String.pipe(T.HttpLabel("CellName")),
          Cells: S.optional(__listOf__string),
        })
          .pipe(S.encodeKeys({ Cells: "cells" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/cells/{CellName}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateCellRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReadinessCheckName: S.String.pipe(T.HttpLabel("ReadinessCheckName")),
          ResourceSetName: S.optional(S.String),
        })
          .pipe(S.encodeKeys({ ResourceSetName: "resourceSetName" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/readinesschecks/{ReadinessCheckName}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateReadinessCheckRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Cells: S.optional(__listOf__string),
          RecoveryGroupName: S.String.pipe(T.HttpLabel("RecoveryGroupName")),
        })
          .pipe(S.encodeKeys({ Cells: "cells" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/recoverygroups/{RecoveryGroupName}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateRecoveryGroupRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceSetName: S.String.pipe(T.HttpLabel("ResourceSetName")),
          ResourceSetType: S.optional(S.String),
          Resources: S.optional(__listOfResource),
        })
          .pipe(S.encodeKeys({ ResourceSetType: "resourceSetType", Resources: "resources" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/resourcesets/{ResourceSetName}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateResourceSetRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CellName: S.optional(S.String),
          Cells: S.optional(__listOf__string),
          Tags: S.optional(__S(272, __c34, 0)),
        })
          .pipe(S.encodeKeys({ CellName: "cellName", Cells: "cells", Tags: "tags" }))
          .pipe(T.all(T.Http({ method: "POST", uri: "/cells" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateCellRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CellArn: S.optional(S.String),
          CellName: S.optional(S.String),
          Cells: S.optional(__listOf__string),
          ParentReadinessScopes: S.optional(__listOf__string),
          Tags: S.optional(__S(272, __c34, 0)),
        }).pipe(
          S.encodeKeys({
            CellArn: "cellArn",
            CellName: "cellName",
            Cells: "cells",
            ParentReadinessScopes: "parentReadinessScopes",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "CreateCellResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CrossAccountAuthorization: S.optional(S.String) })
          .pipe(S.encodeKeys({ CrossAccountAuthorization: "crossAccountAuthorization" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/crossaccountauthorizations" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateCrossAccountAuthorizationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ CrossAccountAuthorization: S.optional(S.String) }).pipe(
          S.encodeKeys({ CrossAccountAuthorization: "crossAccountAuthorization" }),
        ),
      ).annotate({ identifier: "CreateCrossAccountAuthorizationResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReadinessCheckName: S.optional(S.String),
          ResourceSetName: S.optional(S.String),
          Tags: S.optional(__S(272, __c34, 0)),
        })
          .pipe(
            S.encodeKeys({
              ReadinessCheckName: "readinessCheckName",
              ResourceSetName: "resourceSetName",
              Tags: "tags",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/readinesschecks" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateReadinessCheckRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReadinessCheckArn: S.optional(S.String),
          ReadinessCheckName: S.optional(S.String),
          ResourceSet: S.optional(S.String),
          Tags: S.optional(__S(272, __c34, 0)),
        }).pipe(
          S.encodeKeys({
            ReadinessCheckArn: "readinessCheckArn",
            ReadinessCheckName: "readinessCheckName",
            ResourceSet: "resourceSet",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "CreateReadinessCheckResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Cells: S.optional(__listOf__string),
          RecoveryGroupName: S.optional(S.String),
          Tags: S.optional(__S(272, __c34, 0)),
        })
          .pipe(
            S.encodeKeys({ Cells: "cells", RecoveryGroupName: "recoveryGroupName", Tags: "tags" }),
          )
          .pipe(
            T.all(T.Http({ method: "POST", uri: "/recoverygroups" }), svc, auth, proto, ver, rules),
          ),
      ).annotate({ identifier: "CreateRecoveryGroupRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Cells: S.optional(__listOf__string),
          RecoveryGroupArn: S.optional(S.String),
          RecoveryGroupName: S.optional(S.String),
          Tags: S.optional(__S(272, __c34, 0)),
        }).pipe(
          S.encodeKeys({
            Cells: "cells",
            RecoveryGroupArn: "recoveryGroupArn",
            RecoveryGroupName: "recoveryGroupName",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "CreateRecoveryGroupResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
