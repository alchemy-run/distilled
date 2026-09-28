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
  sdkId: "Route53 Recovery Readiness",
  target: "Route53RecoveryReadiness",
  version: "2019-12-02",
  sigv4: "route53-recovery-readiness",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://route53-recovery-readiness.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://route53-recovery-readiness.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    renames: { Message: "message" },
  })<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
    renames: { Message: "message" },
  })<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500, renames: { Message: "message" } },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404, renames: { Message: "message" } },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429, renames: { Message: "message" } },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400, renames: { Message: "message" } },
  )<{ readonly message?: string }> {}
export type __listOf__string = string[];
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
export type Readiness =
  | "READY"
  | "NOT_READY"
  | "UNKNOWN"
  | "NOT_AUTHORIZED"
  | (string & {});
export interface ReadinessCheckSummary {
  Readiness?: Readiness;
  ReadinessCheckName?: string;
}
export type __listOfReadinessCheckSummary = ReadinessCheckSummary[];
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
export interface RuleResult {
  LastCheckedTimestamp?: Date;
  Messages?: Message[];
  Readiness?: Readiness;
  RuleId?: string;
}
export type __listOfRuleResult = RuleResult[];
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
  descriptor: {
    service: svc,
    http: "POST /cells",
    input: {
      CellName: D.m({ wire: "cellName" }),
      Cells: D.m({ wire: "cells" }),
      Tags: D.m({ wire: "tags" }),
    },
    output: {
      CellArn: D.m({ wire: "cellArn" }),
      CellName: D.m({ wire: "cellName" }),
      Cells: D.m({ wire: "cells" }),
      ParentReadinessScopes: D.m({ wire: "parentReadinessScopes" }),
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /crossaccountauthorizations",
    input: {
      CrossAccountAuthorization: D.m({ wire: "crossAccountAuthorization" }),
    },
    output: {
      CrossAccountAuthorization: D.m({ wire: "crossAccountAuthorization" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /readinesschecks",
    input: {
      ReadinessCheckName: D.m({ wire: "readinessCheckName" }),
      ResourceSetName: D.m({ wire: "resourceSetName" }),
      Tags: D.m({ wire: "tags" }),
    },
    output: {
      ReadinessCheckArn: D.m({ wire: "readinessCheckArn" }),
      ReadinessCheckName: D.m({ wire: "readinessCheckName" }),
      ResourceSet: D.m({ wire: "resourceSet" }),
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /recoverygroups",
    input: {
      Cells: D.m({ wire: "cells" }),
      RecoveryGroupName: D.m({ wire: "recoveryGroupName" }),
      Tags: D.m({ wire: "tags" }),
    },
    output: {
      Cells: D.m({ wire: "cells" }),
      RecoveryGroupArn: D.m({ wire: "recoveryGroupArn" }),
      RecoveryGroupName: D.m({ wire: "recoveryGroupName" }),
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /resourcesets",
    input: {
      ResourceSetName: D.m({ wire: "resourceSetName" }),
      ResourceSetType: D.m({ wire: "resourceSetType" }),
      Resources: D.m({ wire: "resources", shape: D.list(i_Resource) }),
      Tags: D.m({ wire: "tags" }),
    },
    output: {
      ResourceSetArn: D.m({ wire: "resourceSetArn" }),
      ResourceSetName: D.m({ wire: "resourceSetName" }),
      ResourceSetType: D.m({ wire: "resourceSetType" }),
      Resources: D.m({ wire: "resources", shape: D.list(o_Resource) }),
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /cells/{CellName}",
    input: { CellName: 0 },
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
  operationName: "DeleteCell",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /crossaccountauthorizations/{CrossAccountAuthorization}",
    input: { CrossAccountAuthorization: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCrossAccountAuthorization",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /readinesschecks/{ReadinessCheckName}",
    input: { ReadinessCheckName: 0 },
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
  operationName: "DeleteReadinessCheck",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /recoverygroups/{RecoveryGroupName}",
    input: { RecoveryGroupName: 0 },
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
  operationName: "DeleteRecoveryGroup",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /resourcesets/{ResourceSetName}",
    input: { ResourceSetName: 0 },
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
  operationName: "DeleteResourceSet",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /recoverygroups/{RecoveryGroupName}/architectureRecommendations",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      RecoveryGroupName: 0,
    },
    output: {
      LastAuditTimestamp: D.m({ wire: "lastAuditTimestamp", shape: D.ts }),
      NextToken: D.m({ wire: "nextToken" }),
      Recommendations: D.m({
        wire: "recommendations",
        shape: D.list({
          RecommendationText: D.m({ wire: "recommendationText" }),
        }),
      }),
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
  operationName: "GetArchitectureRecommendations",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /cells/{CellName}",
    input: { CellName: 0 },
    output: {
      CellArn: D.m({ wire: "cellArn" }),
      CellName: D.m({ wire: "cellName" }),
      Cells: D.m({ wire: "cells" }),
      ParentReadinessScopes: D.m({ wire: "parentReadinessScopes" }),
      Tags: D.m({ wire: "tags" }),
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
  operationName: "GetCell",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /cellreadiness/{CellName}",
    input: {
      CellName: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      NextToken: D.m({ wire: "nextToken" }),
      Readiness: D.m({ wire: "readiness" }),
      ReadinessChecks: D.m({
        wire: "readinessChecks",
        shape: D.list(o_ReadinessCheckSummary),
      }),
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
  descriptor: {
    service: svc,
    http: "GET /readinesschecks/{ReadinessCheckName}",
    input: { ReadinessCheckName: 0 },
    output: {
      ReadinessCheckArn: D.m({ wire: "readinessCheckArn" }),
      ReadinessCheckName: D.m({ wire: "readinessCheckName" }),
      ResourceSet: D.m({ wire: "resourceSet" }),
      Tags: D.m({ wire: "tags" }),
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
  operationName: "GetReadinessCheck",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /readinesschecks/{ReadinessCheckName}/resource/{ResourceIdentifier}/status",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      ReadinessCheckName: 0,
      ResourceIdentifier: 0,
    },
    output: {
      NextToken: D.m({ wire: "nextToken" }),
      Readiness: D.m({ wire: "readiness" }),
      Rules: D.m({
        wire: "rules",
        shape: D.list({
          LastCheckedTimestamp: D.m({
            wire: "lastCheckedTimestamp",
            shape: D.ts,
          }),
          Messages: D.m({ wire: "messages", shape: D.list(o_Message) }),
          Readiness: D.m({ wire: "readiness" }),
          RuleId: D.m({ wire: "ruleId" }),
        }),
      }),
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
  descriptor: {
    service: svc,
    http: "GET /readinesschecks/{ReadinessCheckName}/status",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      ReadinessCheckName: 0,
    },
    output: {
      Messages: D.m({ wire: "messages", shape: D.list(o_Message) }),
      NextToken: D.m({ wire: "nextToken" }),
      Readiness: D.m({ wire: "readiness" }),
      Resources: D.m({
        wire: "resources",
        shape: D.list({
          ComponentId: D.m({ wire: "componentId" }),
          LastCheckedTimestamp: D.m({
            wire: "lastCheckedTimestamp",
            shape: D.ts,
          }),
          Readiness: D.m({ wire: "readiness" }),
          ResourceArn: D.m({ wire: "resourceArn" }),
        }),
      }),
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
  descriptor: {
    service: svc,
    http: "GET /recoverygroups/{RecoveryGroupName}",
    input: { RecoveryGroupName: 0 },
    output: {
      Cells: D.m({ wire: "cells" }),
      RecoveryGroupArn: D.m({ wire: "recoveryGroupArn" }),
      RecoveryGroupName: D.m({ wire: "recoveryGroupName" }),
      Tags: D.m({ wire: "tags" }),
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
  operationName: "GetRecoveryGroup",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /recoverygroupreadiness/{RecoveryGroupName}",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      RecoveryGroupName: 0,
    },
    output: {
      NextToken: D.m({ wire: "nextToken" }),
      Readiness: D.m({ wire: "readiness" }),
      ReadinessChecks: D.m({
        wire: "readinessChecks",
        shape: D.list(o_ReadinessCheckSummary),
      }),
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
  descriptor: {
    service: svc,
    http: "GET /resourcesets/{ResourceSetName}",
    input: { ResourceSetName: 0 },
    output: {
      ResourceSetArn: D.m({ wire: "resourceSetArn" }),
      ResourceSetName: D.m({ wire: "resourceSetName" }),
      ResourceSetType: D.m({ wire: "resourceSetType" }),
      Resources: D.m({ wire: "resources", shape: D.list(o_Resource) }),
      Tags: D.m({ wire: "tags" }),
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
  operationName: "GetResourceSet",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /cells",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Cells: D.m({
        wire: "cells",
        shape: D.list({
          CellArn: D.m({ wire: "cellArn" }),
          CellName: D.m({ wire: "cellName" }),
          Cells: D.m({ wire: "cells" }),
          ParentReadinessScopes: D.m({ wire: "parentReadinessScopes" }),
          Tags: D.m({ wire: "tags" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
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
  descriptor: {
    service: svc,
    http: "GET /crossaccountauthorizations",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      CrossAccountAuthorizations: D.m({ wire: "crossAccountAuthorizations" }),
      NextToken: D.m({ wire: "nextToken" }),
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
  descriptor: {
    service: svc,
    http: "GET /readinesschecks",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      NextToken: D.m({ wire: "nextToken" }),
      ReadinessChecks: D.m({
        wire: "readinessChecks",
        shape: D.list({
          ReadinessCheckArn: D.m({ wire: "readinessCheckArn" }),
          ReadinessCheckName: D.m({ wire: "readinessCheckName" }),
          ResourceSet: D.m({ wire: "resourceSet" }),
          Tags: D.m({ wire: "tags" }),
        }),
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
  descriptor: {
    service: svc,
    http: "GET /recoverygroups",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      NextToken: D.m({ wire: "nextToken" }),
      RecoveryGroups: D.m({
        wire: "recoveryGroups",
        shape: D.list({
          Cells: D.m({ wire: "cells" }),
          RecoveryGroupArn: D.m({ wire: "recoveryGroupArn" }),
          RecoveryGroupName: D.m({ wire: "recoveryGroupName" }),
          Tags: D.m({ wire: "tags" }),
        }),
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
  descriptor: {
    service: svc,
    http: "GET /resourcesets",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      NextToken: D.m({ wire: "nextToken" }),
      ResourceSets: D.m({
        wire: "resourceSets",
        shape: D.list({
          ResourceSetArn: D.m({ wire: "resourceSetArn" }),
          ResourceSetName: D.m({ wire: "resourceSetName" }),
          ResourceSetType: D.m({ wire: "resourceSetType" }),
          Resources: D.m({ wire: "resources", shape: D.list(o_Resource) }),
          Tags: D.m({ wire: "tags" }),
        }),
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
  descriptor: {
    service: svc,
    http: "GET /rules",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      ResourceType: D.m({ query: "resourceType" }),
    },
    output: {
      NextToken: D.m({ wire: "nextToken" }),
      Rules: D.m({
        wire: "rules",
        shape: D.list({
          ResourceType: D.m({ wire: "resourceType" }),
          RuleDescription: D.m({ wire: "ruleDescription" }),
          RuleId: D.m({ wire: "ruleId" }),
        }),
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
  descriptor: {
    service: svc,
    http: "GET /tags/{ResourceArn}",
    input: { ResourceArn: 0 },
    output: { Tags: D.m({ wire: "tags" }) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResources",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: D.m({ wire: "tags" }) },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /cells/{CellName}",
    input: { CellName: 0, Cells: D.m({ wire: "cells" }) },
    output: {
      CellArn: D.m({ wire: "cellArn" }),
      CellName: D.m({ wire: "cellName" }),
      Cells: D.m({ wire: "cells" }),
      ParentReadinessScopes: D.m({ wire: "parentReadinessScopes" }),
      Tags: D.m({ wire: "tags" }),
    },
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
  operationName: "UpdateCell",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /readinesschecks/{ReadinessCheckName}",
    input: {
      ReadinessCheckName: 0,
      ResourceSetName: D.m({ wire: "resourceSetName" }),
    },
    output: {
      ReadinessCheckArn: D.m({ wire: "readinessCheckArn" }),
      ReadinessCheckName: D.m({ wire: "readinessCheckName" }),
      ResourceSet: D.m({ wire: "resourceSet" }),
      Tags: D.m({ wire: "tags" }),
    },
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
  operationName: "UpdateReadinessCheck",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /recoverygroups/{RecoveryGroupName}",
    input: { Cells: D.m({ wire: "cells" }), RecoveryGroupName: 0 },
    output: {
      Cells: D.m({ wire: "cells" }),
      RecoveryGroupArn: D.m({ wire: "recoveryGroupArn" }),
      RecoveryGroupName: D.m({ wire: "recoveryGroupName" }),
      Tags: D.m({ wire: "tags" }),
    },
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
  operationName: "UpdateRecoveryGroup",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /resourcesets/{ResourceSetName}",
    input: {
      ResourceSetName: 0,
      ResourceSetType: D.m({ wire: "resourceSetType" }),
      Resources: D.m({ wire: "resources", shape: D.list(i_Resource) }),
    },
    output: {
      ResourceSetArn: D.m({ wire: "resourceSetArn" }),
      ResourceSetName: D.m({ wire: "resourceSetName" }),
      ResourceSetType: D.m({ wire: "resourceSetType" }),
      Resources: D.m({ wire: "resources", shape: D.list(o_Resource) }),
      Tags: D.m({ wire: "tags" }),
    },
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
  operationName: "UpdateResourceSet",
})) as any;

const i_Resource: D.LazyStruct = () => ({
  ComponentId: D.m({ wire: "componentId" }),
  DnsTargetResource: D.m({
    wire: "dnsTargetResource",
    shape: {
      DomainName: D.m({ wire: "domainName" }),
      HostedZoneArn: D.m({ wire: "hostedZoneArn" }),
      RecordSetId: D.m({ wire: "recordSetId" }),
      RecordType: D.m({ wire: "recordType" }),
      TargetResource: D.m({
        wire: "targetResource",
        shape: {
          NLBResource: D.m({
            wire: "nLBResource",
            shape: { Arn: D.m({ wire: "arn" }) },
          }),
          R53Resource: D.m({
            wire: "r53Resource",
            shape: {
              DomainName: D.m({ wire: "domainName" }),
              RecordSetId: D.m({ wire: "recordSetId" }),
            },
          }),
        },
      }),
    },
  }),
  ReadinessScopes: D.m({ wire: "readinessScopes" }),
  ResourceArn: D.m({ wire: "resourceArn" }),
});
const o_Message: D.LazyStruct = () => ({
  MessageText: D.m({ wire: "messageText" }),
});
const o_ReadinessCheckSummary: D.LazyStruct = () => ({
  Readiness: D.m({ wire: "readiness" }),
  ReadinessCheckName: D.m({ wire: "readinessCheckName" }),
});
const o_Resource: D.LazyStruct = () => ({
  ComponentId: D.m({ wire: "componentId" }),
  DnsTargetResource: D.m({
    wire: "dnsTargetResource",
    shape: {
      DomainName: D.m({ wire: "domainName" }),
      HostedZoneArn: D.m({ wire: "hostedZoneArn" }),
      RecordSetId: D.m({ wire: "recordSetId" }),
      RecordType: D.m({ wire: "recordType" }),
      TargetResource: D.m({
        wire: "targetResource",
        shape: {
          NLBResource: D.m({
            wire: "nLBResource",
            shape: { Arn: D.m({ wire: "arn" }) },
          }),
          R53Resource: D.m({
            wire: "r53Resource",
            shape: {
              DomainName: D.m({ wire: "domainName" }),
              RecordSetId: D.m({ wire: "recordSetId" }),
            },
          }),
        },
      }),
    },
  }),
  ReadinessScopes: D.m({ wire: "readinessScopes" }),
  ResourceArn: D.m({ wire: "resourceArn" }),
});
