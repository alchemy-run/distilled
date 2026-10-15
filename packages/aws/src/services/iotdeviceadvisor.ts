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
  sdkId: "IotDeviceAdvisor",
  serviceShapeName: "IotSenateService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "iotdeviceadvisor" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-09-18");
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
              `https://api.iotdeviceadvisor-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://api.iotdeviceadvisor-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://api.iotdeviceadvisor.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://api.iotdeviceadvisor.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://api.iotdeviceadvisor.{R}.{D}","properties":{},"headers":{}}');

export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type SuiteDefinitionName = string;
export type AmazonResourceName = string;
export interface DeviceUnderTest {
  thingArn?: string;
  certificateArn?: string;
  deviceRoleArn?: string;
}
export type DeviceUnderTestList = DeviceUnderTest[];
export type IntendedForQualificationBoolean = boolean;
export type IsLongDurationTestBoolean = boolean;
export type RootGroup = string;
export type Protocol =
  | "MqttV3_1_1"
  | "MqttV5"
  | "MqttV3_1_1_OverWebSocket"
  | "MqttV5_OverWebSocket"
  | (string & {});
export interface SuiteDefinitionConfiguration {
  suiteDefinitionName?: string;
  devices?: DeviceUnderTest[];
  intendedForQualification?: boolean;
  isLongDurationTest?: boolean;
  rootGroup?: string;
  devicePermissionRoleArn?: string;
  protocol?: Protocol;
}
export type String128 = string;
export type String256 = string;
export type TagMap = { [key: string]: string | undefined };
export type ClientToken = string;
export interface CreateSuiteDefinitionRequest {
  suiteDefinitionConfiguration?: SuiteDefinitionConfiguration;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export type UUID = string;
export interface CreateSuiteDefinitionResponse {
  suiteDefinitionId?: string;
  suiteDefinitionArn?: string;
  suiteDefinitionName?: string;
  createdAt?: Date;
}
export interface DeleteSuiteDefinitionRequest {
  suiteDefinitionId: string;
}
export interface DeleteSuiteDefinitionResponse {}
export type AuthenticationMethod = "X509ClientCertificate" | "SignatureVersion4" | (string & {});
export interface GetEndpointRequest {
  thingArn?: string;
  certificateArn?: string;
  deviceRoleArn?: string;
  authenticationMethod?: AuthenticationMethod;
}
export type Endpoint = string;
export interface GetEndpointResponse {
  endpoint?: string;
}
export type SuiteDefinitionVersion = string;
export interface GetSuiteDefinitionRequest {
  suiteDefinitionId: string;
  suiteDefinitionVersion?: string;
}
export interface GetSuiteDefinitionResponse {
  suiteDefinitionId?: string;
  suiteDefinitionArn?: string;
  suiteDefinitionVersion?: string;
  latestVersion?: string;
  suiteDefinitionConfiguration?: SuiteDefinitionConfiguration & {
    suiteDefinitionName: SuiteDefinitionName;
    rootGroup: RootGroup;
    devicePermissionRoleArn: AmazonResourceName;
  };
  createdAt?: Date;
  lastModifiedAt?: Date;
  tags?: { [key: string]: string | undefined };
}
export interface GetSuiteRunRequest {
  suiteDefinitionId: string;
  suiteRunId: string;
}
export type SelectedTestList = string[];
export type ParallelRun = boolean;
export interface SuiteRunConfiguration {
  primaryDevice?: DeviceUnderTest;
  selectedTestList?: string[];
  parallelRun?: boolean;
}
export type GroupName = string;
export type TestCaseDefinitionName = string;
export type Status =
  | "PASS"
  | "FAIL"
  | "CANCELED"
  | "PENDING"
  | "RUNNING"
  | "STOPPING"
  | "STOPPED"
  | "PASS_WITH_WARNINGS"
  | "ERROR"
  | (string & {});
export type LogUrl = string;
export type Warnings = string;
export type Failure = string;
export type TestCaseScenarioId = string;
export type TestCaseScenarioType = "Advanced" | "Basic" | (string & {});
export type TestCaseScenarioStatus =
  | "PASS"
  | "FAIL"
  | "CANCELED"
  | "PENDING"
  | "RUNNING"
  | "STOPPING"
  | "STOPPED"
  | "PASS_WITH_WARNINGS"
  | "ERROR"
  | (string & {});
export type SystemMessage = string;
export interface TestCaseScenario {
  testCaseScenarioId?: string;
  testCaseScenarioType?: TestCaseScenarioType;
  status?: TestCaseScenarioStatus;
  failure?: string;
  systemMessage?: string;
}
export type TestCaseScenariosList = TestCaseScenario[];
export interface TestCaseRun {
  testCaseRunId?: string;
  testCaseDefinitionId?: string;
  testCaseDefinitionName?: string;
  status?: Status;
  startTime?: Date;
  endTime?: Date;
  logUrl?: string;
  warnings?: string;
  failure?: string;
  testScenarios?: TestCaseScenario[];
}
export type TestCaseRuns = TestCaseRun[];
export interface GroupResult {
  groupId?: string;
  groupName?: string;
  tests?: TestCaseRun[];
}
export type GroupResultList = GroupResult[];
export interface TestResult {
  groups?: GroupResult[];
}
export type SuiteRunStatus =
  | "PASS"
  | "FAIL"
  | "CANCELED"
  | "PENDING"
  | "RUNNING"
  | "STOPPING"
  | "STOPPED"
  | "PASS_WITH_WARNINGS"
  | "ERROR"
  | (string & {});
export type ErrorReason = string;
export interface GetSuiteRunResponse {
  suiteDefinitionId?: string;
  suiteDefinitionVersion?: string;
  suiteRunId?: string;
  suiteRunArn?: string;
  suiteRunConfiguration?: SuiteRunConfiguration & { primaryDevice: DeviceUnderTest };
  testResult?: TestResult;
  startTime?: Date;
  endTime?: Date;
  status?: SuiteRunStatus;
  errorReason?: string;
  tags?: { [key: string]: string | undefined };
}
export interface GetSuiteRunReportRequest {
  suiteDefinitionId: string;
  suiteRunId: string;
}
export type QualificationReportDownloadUrl = string;
export interface GetSuiteRunReportResponse {
  qualificationReportDownloadUrl?: string;
}
export type MaxResults = number;
export type Token = string;
export interface ListSuiteDefinitionsRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface SuiteDefinitionInformation {
  suiteDefinitionId?: string;
  suiteDefinitionName?: string;
  defaultDevices?: DeviceUnderTest[];
  intendedForQualification?: boolean;
  isLongDurationTest?: boolean;
  protocol?: Protocol;
  createdAt?: Date;
}
export type SuiteDefinitionInformationList = SuiteDefinitionInformation[];
export interface ListSuiteDefinitionsResponse {
  suiteDefinitionInformationList?: SuiteDefinitionInformation[];
  nextToken?: string;
}
export interface ListSuiteRunsRequest {
  suiteDefinitionId?: string;
  suiteDefinitionVersion?: string;
  maxResults?: number;
  nextToken?: string;
}
export type SuiteRunResultCount = number;
export interface SuiteRunInformation {
  suiteDefinitionId?: string;
  suiteDefinitionVersion?: string;
  suiteDefinitionName?: string;
  suiteRunId?: string;
  createdAt?: Date;
  startedAt?: Date;
  endAt?: Date;
  status?: SuiteRunStatus;
  passed?: number;
  failed?: number;
}
export type SuiteRunsList = SuiteRunInformation[];
export interface ListSuiteRunsResponse {
  suiteRunsList?: SuiteRunInformation[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface StartSuiteRunRequest {
  suiteDefinitionId: string;
  suiteDefinitionVersion?: string;
  suiteRunConfiguration?: SuiteRunConfiguration;
  tags?: { [key: string]: string | undefined };
}
export interface StartSuiteRunResponse {
  suiteRunId?: string;
  suiteRunArn?: string;
  createdAt?: Date;
  endpoint?: string;
}
export interface StopSuiteRunRequest {
  suiteDefinitionId: string;
  suiteRunId: string;
}
export interface StopSuiteRunResponse {}
export interface TagResourceRequest {
  resourceArn: string;
  tags?: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys?: string[];
}
export interface UntagResourceResponse {}
export interface UpdateSuiteDefinitionRequest {
  suiteDefinitionId: string;
  suiteDefinitionConfiguration?: SuiteDefinitionConfiguration;
}
export interface UpdateSuiteDefinitionResponse {
  suiteDefinitionId?: string;
  suiteDefinitionArn?: string;
  suiteDefinitionName?: string;
  suiteDefinitionVersion?: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
}
export type Message = string;
export type CreateSuiteDefinitionError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Device Advisor test suite.
 *
 * Requires permission to access the CreateSuiteDefinition action.
 */
export const createSuiteDefinition: API.OperationMethod<
  CreateSuiteDefinitionRequest,
  CreateSuiteDefinitionResponse,
  CreateSuiteDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<CreateSuiteDefinitionRequest>,
  output: __S(129, __c8, 1) as any as S.Schema<CreateSuiteDefinitionResponse>,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSuiteDefinition",
}));

export type DeleteSuiteDefinitionError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Device Advisor test suite.
 *
 * Requires permission to access the DeleteSuiteDefinition action.
 */
export const deleteSuiteDefinition: API.OperationMethod<
  DeleteSuiteDefinitionRequest,
  DeleteSuiteDefinitionResponse,
  DeleteSuiteDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<DeleteSuiteDefinitionRequest>,
  output: __S(224, __c14, 0) as any as S.Schema<DeleteSuiteDefinitionResponse>,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSuiteDefinition",
}));

export type GetEndpointError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about an Device Advisor endpoint.
 */
export const getEndpoint: API.OperationMethod<
  GetEndpointRequest,
  GetEndpointResponse,
  GetEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<GetEndpointRequest>,
  output: __S(241, __c15, 1) as any as S.Schema<GetEndpointResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEndpoint",
}));

export type GetSuiteDefinitionError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a Device Advisor test suite.
 *
 * Requires permission to access the GetSuiteDefinition action.
 */
export const getSuiteDefinition: API.OperationMethod<
  GetSuiteDefinitionRequest,
  GetSuiteDefinitionResponse,
  GetSuiteDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<GetSuiteDefinitionRequest>,
  output: __S(257, __c16, 1) as any as S.Schema<GetSuiteDefinitionResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSuiteDefinition",
}));

export type GetSuiteRunError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a Device Advisor test suite run.
 *
 * Requires permission to access the GetSuiteRun action.
 */
export const getSuiteRun: API.OperationMethod<
  GetSuiteRunRequest,
  GetSuiteRunResponse,
  GetSuiteRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<GetSuiteRunRequest>,
  output: __S(280, __c17, 8) as any as S.Schema<GetSuiteRunResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSuiteRun",
}));

export type GetSuiteRunReportError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets a report download link for a successful Device Advisor qualifying test suite run.
 *
 * Requires permission to access the GetSuiteRunReport action.
 */
export const getSuiteRunReport: API.OperationMethod<
  GetSuiteRunReportRequest,
  GetSuiteRunReportResponse,
  GetSuiteRunReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<GetSuiteRunReportRequest>,
  output: __S(321, __c20, 1) as any as S.Schema<GetSuiteRunReportResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSuiteRunReport",
}));

export type ListSuiteDefinitionsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Device Advisor test suites you have created.
 *
 * Requires permission to access the ListSuiteDefinitions action.
 */
export const listSuiteDefinitions: API.PaginatedOperationMethod<
  ListSuiteDefinitionsRequest,
  ListSuiteDefinitionsResponse,
  ListSuiteDefinitionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<ListSuiteDefinitionsRequest>,
  output: __S(3, __c0, 3) as any as S.Schema<ListSuiteDefinitionsResponse>,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSuiteDefinitions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSuiteRunsError = InternalServerException | ValidationException | CommonErrors;
/**
 * Lists runs of the specified Device Advisor test suite. You can list all runs of the test
 * suite, or the runs of a specific version of the test suite.
 *
 * Requires permission to access the ListSuiteRuns action.
 */
export const listSuiteRuns: API.PaginatedOperationMethod<
  ListSuiteRunsRequest,
  ListSuiteRunsResponse,
  ListSuiteRunsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(16, __c1, 0) as any as S.Schema<ListSuiteRunsRequest>,
  output: __S(19, __c1, 3) as any as S.Schema<ListSuiteRunsResponse>,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSuiteRuns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags attached to an IoT Device Advisor resource.
 *
 * Requires permission to access the ListTagsForResource action.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(33, __c2, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type StartSuiteRunError =
  | ConflictException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Starts a Device Advisor test suite run.
 *
 * Requires permission to access the StartSuiteRun action.
 */
export const startSuiteRun: API.OperationMethod<
  StartSuiteRunRequest,
  StartSuiteRunResponse,
  StartSuiteRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<StartSuiteRunRequest>,
  output: __S(49, __c3, 1) as any as S.Schema<StartSuiteRunResponse>,
  errors: [ConflictException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSuiteRun",
}));

export type StopSuiteRunError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Stops a Device Advisor test suite run that is currently running.
 *
 * Requires permission to access the StopSuiteRun action.
 */
export const stopSuiteRun: API.OperationMethod<
  StopSuiteRunRequest,
  StopSuiteRunResponse,
  StopSuiteRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<StopSuiteRunRequest>,
  output: __S(224, __c14, 0) as any as S.Schema<StopSuiteRunResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopSuiteRun",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds to and modifies existing tags of an IoT Device Advisor resource.
 *
 * Requires permission to access the TagResource action.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(224, __c14, 0) as any as S.Schema<TagResourceResponse>,
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
 * Removes tags from an IoT Device Advisor resource.
 *
 * Requires permission to access the UntagResource action.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(224, __c14, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateSuiteDefinitionError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Updates a Device Advisor test suite.
 *
 * Requires permission to access the UpdateSuiteDefinition action.
 */
export const updateSuiteDefinition: API.OperationMethod<
  UpdateSuiteDefinitionRequest,
  UpdateSuiteDefinitionResponse,
  UpdateSuiteDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<UpdateSuiteDefinitionRequest>,
  output: __S(113, __c7, 1) as any as S.Schema<UpdateSuiteDefinitionResponse>,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSuiteDefinition",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/suiteDefinitions" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListSuiteDefinitionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          suiteDefinitionId: S.optional(S.String),
          suiteDefinitionName: S.optional(S.String),
          defaultDevices: S.optional(__S(144, __c9, 0)),
          intendedForQualification: S.optional(S.Boolean),
          isLongDurationTest: S.optional(S.Boolean),
          protocol: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "SuiteDefinitionInformation" });
    case 2:
      return S.Array(__S(1, __c0, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          suiteDefinitionInformationList: S.optional(__S(2, __c0, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListSuiteDefinitionsResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          suiteDefinitionId: S.optional(S.String).pipe(T.HttpQuery("suiteDefinitionId")),
          suiteDefinitionVersion: S.optional(S.String).pipe(T.HttpQuery("suiteDefinitionVersion")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/suiteRuns" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSuiteRunsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          suiteDefinitionId: S.optional(S.String),
          suiteDefinitionVersion: S.optional(S.String),
          suiteDefinitionName: S.optional(S.String),
          suiteRunId: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          passed: S.optional(S.Number),
          failed: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SuiteRunInformation" });
    case 2:
      return S.Array(__S(17, __c1, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ suiteRunsList: S.optional(__S(18, __c1, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSuiteRunsResponse" });
  }
}
function __c2(j: number): any {
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
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(192, __c12, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          suiteDefinitionId: S.String.pipe(T.HttpLabel("suiteDefinitionId")),
          suiteDefinitionVersion: S.optional(S.String),
          suiteRunConfiguration: S.optional(__S(288, __c18, 0)),
          tags: S.optional(__S(192, __c12, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/suiteDefinitions/{suiteDefinitionId}/suiteRuns" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartSuiteRunRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          suiteRunId: S.optional(S.String),
          suiteRunArn: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endpoint: S.optional(S.String),
        }),
      ).annotate({ identifier: "StartSuiteRunResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          suiteDefinitionId: S.String.pipe(T.HttpLabel("suiteDefinitionId")),
          suiteRunId: S.String.pipe(T.HttpLabel("suiteRunId")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/suiteDefinitions/{suiteDefinitionId}/suiteRuns/{suiteRunId}/stop",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopSuiteRunRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: S.optional(__S(192, __c12, 0)),
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
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: S.optional(__S(304, __c19, 0)).pipe(T.HttpQuery("tagKeys")),
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
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          suiteDefinitionId: S.String.pipe(T.HttpLabel("suiteDefinitionId")),
          suiteDefinitionConfiguration: S.optional(__S(160, __c10, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/suiteDefinitions/{suiteDefinitionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSuiteDefinitionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          suiteDefinitionId: S.optional(S.String),
          suiteDefinitionArn: S.optional(S.String),
          suiteDefinitionName: S.optional(S.String),
          suiteDefinitionVersion: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "UpdateSuiteDefinitionResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          suiteDefinitionConfiguration: S.optional(__S(160, __c10, 0)),
          tags: S.optional(__S(192, __c12, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/suiteDefinitions" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateSuiteDefinitionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          suiteDefinitionId: S.optional(S.String),
          suiteDefinitionArn: S.optional(S.String),
          suiteDefinitionName: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CreateSuiteDefinitionResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(176, __c11, 0));
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          suiteDefinitionName: S.optional(S.String),
          devices: S.optional(__S(144, __c9, 0)),
          intendedForQualification: S.optional(S.Boolean),
          isLongDurationTest: S.optional(S.Boolean),
          rootGroup: S.optional(S.String),
          devicePermissionRoleArn: S.optional(S.String),
          protocol: S.optional(S.String),
        }),
      ).annotate({ identifier: "SuiteDefinitionConfiguration" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thingArn: S.optional(S.String),
          certificateArn: S.optional(S.String),
          deviceRoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeviceUnderTest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ suiteDefinitionId: S.String.pipe(T.HttpLabel("suiteDefinitionId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/suiteDefinitions/{suiteDefinitionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSuiteDefinitionRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "DeleteSuiteDefinitionResponse",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thingArn: S.optional(S.String).pipe(T.HttpQuery("thingArn")),
          certificateArn: S.optional(S.String).pipe(T.HttpQuery("certificateArn")),
          deviceRoleArn: S.optional(S.String).pipe(T.HttpQuery("deviceRoleArn")),
          authenticationMethod: S.optional(S.String).pipe(T.HttpQuery("authenticationMethod")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/endpoint" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetEndpointRequest" });
    case 1:
      return S.suspend(() => S.Struct({ endpoint: S.optional(S.String) })).annotate({
        identifier: "GetEndpointResponse",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          suiteDefinitionId: S.String.pipe(T.HttpLabel("suiteDefinitionId")),
          suiteDefinitionVersion: S.optional(S.String).pipe(T.HttpQuery("suiteDefinitionVersion")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/suiteDefinitions/{suiteDefinitionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSuiteDefinitionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          suiteDefinitionId: S.optional(S.String),
          suiteDefinitionArn: S.optional(S.String),
          suiteDefinitionVersion: S.optional(S.String),
          latestVersion: S.optional(S.String),
          suiteDefinitionConfiguration: S.optional(__S(160, __c10, 0)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tags: S.optional(__S(192, __c12, 0)),
        }),
      ).annotate({ identifier: "GetSuiteDefinitionResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          suiteDefinitionId: S.String.pipe(T.HttpLabel("suiteDefinitionId")),
          suiteRunId: S.String.pipe(T.HttpLabel("suiteRunId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/suiteDefinitions/{suiteDefinitionId}/suiteRuns/{suiteRunId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSuiteRunRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          testCaseScenarioId: S.optional(S.String),
          testCaseScenarioType: S.optional(S.String),
          status: S.optional(S.String),
          failure: S.optional(S.String),
          systemMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "TestCaseScenario" });
    case 2:
      return S.Array(__S(273, __c17, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          testCaseRunId: S.optional(S.String),
          testCaseDefinitionId: S.optional(S.String),
          testCaseDefinitionName: S.optional(S.String),
          status: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          logUrl: S.optional(S.String),
          warnings: S.optional(S.String),
          failure: S.optional(S.String),
          testScenarios: S.optional(__S(274, __c17, 2)),
        }),
      ).annotate({ identifier: "TestCaseRun" });
    case 4:
      return S.Array(__S(275, __c17, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          groupId: S.optional(S.String),
          groupName: S.optional(S.String),
          tests: S.optional(__S(276, __c17, 4)),
        }),
      ).annotate({ identifier: "GroupResult" });
    case 6:
      return S.Array(__S(277, __c17, 5));
    case 7:
      return S.suspend(() => S.Struct({ groups: S.optional(__S(278, __c17, 6)) })).annotate({
        identifier: "TestResult",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          suiteDefinitionId: S.optional(S.String),
          suiteDefinitionVersion: S.optional(S.String),
          suiteRunId: S.optional(S.String),
          suiteRunArn: S.optional(S.String),
          suiteRunConfiguration: S.optional(__S(288, __c18, 0)),
          testResult: S.optional(__S(279, __c17, 7)),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          errorReason: S.optional(S.String),
          tags: S.optional(__S(192, __c12, 0)),
        }),
      ).annotate({ identifier: "GetSuiteRunResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          primaryDevice: S.optional(__S(176, __c11, 0)),
          selectedTestList: S.optional(__S(304, __c19, 0)),
          parallelRun: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "SuiteRunConfiguration" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          suiteDefinitionId: S.String.pipe(T.HttpLabel("suiteDefinitionId")),
          suiteRunId: S.String.pipe(T.HttpLabel("suiteRunId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/suiteDefinitions/{suiteDefinitionId}/suiteRuns/{suiteRunId}/report",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSuiteRunReportRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ qualificationReportDownloadUrl: S.optional(S.String) }),
      ).annotate({ identifier: "GetSuiteRunReportResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
