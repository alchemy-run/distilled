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
  sdkId: "IotDeviceAdvisor",
  target: "IotSenateService",
  version: "2020-09-18",
  sigv4: "iotdeviceadvisor",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://api.iotdeviceadvisor.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://api.iotdeviceadvisor.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConflictException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
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
export type AuthenticationMethod =
  | "X509ClientCertificate"
  | "SignatureVersion4"
  | (string & {});
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
  suiteRunConfiguration?: SuiteRunConfiguration & {
    primaryDevice: DeviceUnderTest;
  };
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
  descriptor: {
    service: svc,
    http: "POST /suiteDefinitions",
    input: {
      suiteDefinitionConfiguration: i_SuiteDefinitionConfiguration,
      tags: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { createdAt: D.ts },
    body: true,
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSuiteDefinition",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /suiteDefinitions/{suiteDefinitionId}",
    input: { suiteDefinitionId: 0 },
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSuiteDefinition",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /endpoint",
    input: {
      thingArn: D.m({ query: "thingArn" }),
      certificateArn: D.m({ query: "certificateArn" }),
      deviceRoleArn: D.m({ query: "deviceRoleArn" }),
      authenticationMethod: D.m({ query: "authenticationMethod" }),
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEndpoint",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /suiteDefinitions/{suiteDefinitionId}",
    input: {
      suiteDefinitionId: 0,
      suiteDefinitionVersion: D.m({ query: "suiteDefinitionVersion" }),
    },
    output: { createdAt: D.ts, lastModifiedAt: D.ts },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSuiteDefinition",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /suiteDefinitions/{suiteDefinitionId}/suiteRuns/{suiteRunId}",
    input: { suiteDefinitionId: 0, suiteRunId: 0 },
    output: {
      testResult: {
        groups: D.list({ tests: D.list({ startTime: D.ts, endTime: D.ts }) }),
      },
      startTime: D.ts,
      endTime: D.ts,
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSuiteRun",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /suiteDefinitions/{suiteDefinitionId}/suiteRuns/{suiteRunId}/report",
    input: { suiteDefinitionId: 0, suiteRunId: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSuiteRunReport",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /suiteDefinitions",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { suiteDefinitionInformationList: D.list({ createdAt: D.ts }) },
  },
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

export type ListSuiteRunsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /suiteRuns",
    input: {
      suiteDefinitionId: D.m({ query: "suiteDefinitionId" }),
      suiteDefinitionVersion: D.m({ query: "suiteDefinitionVersion" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      suiteRunsList: D.list({ createdAt: D.ts, startedAt: D.ts, endAt: D.ts }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /suiteDefinitions/{suiteDefinitionId}/suiteRuns",
    input: {
      suiteDefinitionId: 0,
      suiteDefinitionVersion: 0,
      suiteRunConfiguration: {
        primaryDevice: i_DeviceUnderTest,
        selectedTestList: 0,
        parallelRun: 0,
      },
      tags: 0,
    },
    output: { createdAt: D.ts },
    body: true,
  },
  errors: [ConflictException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSuiteRun",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /suiteDefinitions/{suiteDefinitionId}/suiteRuns/{suiteRunId}/stop",
    input: { suiteDefinitionId: 0, suiteRunId: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopSuiteRun",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
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
  descriptor: {
    service: svc,
    http: "PATCH /suiteDefinitions/{suiteDefinitionId}",
    input: {
      suiteDefinitionId: 0,
      suiteDefinitionConfiguration: i_SuiteDefinitionConfiguration,
    },
    output: { createdAt: D.ts, lastUpdatedAt: D.ts },
    body: true,
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSuiteDefinition",
})) as any;

const i_DeviceUnderTest: D.LazyStruct = () => ({
  thingArn: 0,
  certificateArn: 0,
  deviceRoleArn: 0,
});
const i_SuiteDefinitionConfiguration: D.LazyStruct = () => ({
  suiteDefinitionName: 0,
  devices: D.list(i_DeviceUnderTest),
  intendedForQualification: 0,
  isLongDurationTest: 0,
  rootGroup: 0,
  devicePermissionRoleArn: 0,
  protocol: 0,
});
