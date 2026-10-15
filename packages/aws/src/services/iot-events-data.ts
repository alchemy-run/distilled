import * as API from "@distilled.cloud/core/api";
import * as __L from "@distilled.cloud/core/chunks";
import * as S from "@distilled.cloud/core/schema";
import * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "IoT Events Data",
  serviceShapeName: "IotColumboDataService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "ioteventsdata" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-10-23");
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
              `https://data.iotevents-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://data.iotevents-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://data.iotevents.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://data.iotevents.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class InternalFailureException
  extends /*@__PURE__*/ S.TaggedError<InternalFailureException>()(
    "InternalFailureException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export type RequestId = string;
export type AlarmModelName = string;
export type KeyValue = string;
export type Note = string;
export interface AcknowledgeAlarmActionRequest {
  requestId: string;
  alarmModelName: string;
  keyValue?: string;
  note?: string;
}
export type AcknowledgeAlarmActionRequests = AcknowledgeAlarmActionRequest[];
export interface BatchAcknowledgeAlarmRequest {
  acknowledgeActionRequests: AcknowledgeAlarmActionRequest[];
}
export type ErrorCode =
  | "ResourceNotFoundException"
  | "InvalidRequestException"
  | "InternalFailureException"
  | "ServiceUnavailableException"
  | "ThrottlingException"
  | (string & {});
export type ErrorMessage = string;
export interface BatchAlarmActionErrorEntry {
  requestId?: string;
  errorCode?: ErrorCode;
  errorMessage?: string;
}
export type BatchAlarmActionErrorEntries = BatchAlarmActionErrorEntry[];
export interface BatchAcknowledgeAlarmResponse {
  errorEntries?: BatchAlarmActionErrorEntry[];
}
export type MessageId = string;
export type DetectorModelName = string;
export interface DeleteDetectorRequest {
  messageId: string;
  detectorModelName: string;
  keyValue?: string;
}
export type DeleteDetectorRequests = DeleteDetectorRequest[];
export interface BatchDeleteDetectorRequest {
  detectors: DeleteDetectorRequest[];
}
export interface BatchDeleteDetectorErrorEntry {
  messageId?: string;
  errorCode?: ErrorCode;
  errorMessage?: string;
}
export type BatchDeleteDetectorErrorEntries = BatchDeleteDetectorErrorEntry[];
export interface BatchDeleteDetectorResponse {
  batchDeleteDetectorErrorEntries?: BatchDeleteDetectorErrorEntry[];
}
export interface DisableAlarmActionRequest {
  requestId: string;
  alarmModelName: string;
  keyValue?: string;
  note?: string;
}
export type DisableAlarmActionRequests = DisableAlarmActionRequest[];
export interface BatchDisableAlarmRequest {
  disableActionRequests: DisableAlarmActionRequest[];
}
export interface BatchDisableAlarmResponse {
  errorEntries?: BatchAlarmActionErrorEntry[];
}
export interface EnableAlarmActionRequest {
  requestId: string;
  alarmModelName: string;
  keyValue?: string;
  note?: string;
}
export type EnableAlarmActionRequests = EnableAlarmActionRequest[];
export interface BatchEnableAlarmRequest {
  enableActionRequests: EnableAlarmActionRequest[];
}
export interface BatchEnableAlarmResponse {
  errorEntries?: BatchAlarmActionErrorEntry[];
}
export type EphemeralInputName = string;
export type Payload = Uint8Array;
export type EpochMilliTimestamp = number;
export interface TimestampValue {
  timeInMillis?: number;
}
export interface Message {
  messageId: string;
  inputName: string;
  payload: Uint8Array;
  timestamp?: TimestampValue;
}
export type Messages = Message[];
export interface BatchPutMessageRequest {
  messages: Message[];
}
export interface BatchPutMessageErrorEntry {
  messageId?: string;
  errorCode?: ErrorCode;
  errorMessage?: string;
}
export type BatchPutMessageErrorEntries = BatchPutMessageErrorEntry[];
export interface BatchPutMessageResponse {
  BatchPutMessageErrorEntries?: BatchPutMessageErrorEntry[];
}
export interface ResetAlarmActionRequest {
  requestId: string;
  alarmModelName: string;
  keyValue?: string;
  note?: string;
}
export type ResetAlarmActionRequests = ResetAlarmActionRequest[];
export interface BatchResetAlarmRequest {
  resetActionRequests: ResetAlarmActionRequest[];
}
export interface BatchResetAlarmResponse {
  errorEntries?: BatchAlarmActionErrorEntry[];
}
export type SnoozeDuration = number;
export interface SnoozeAlarmActionRequest {
  requestId: string;
  alarmModelName: string;
  keyValue?: string;
  note?: string;
  snoozeDuration: number;
}
export type SnoozeAlarmActionRequests = SnoozeAlarmActionRequest[];
export interface BatchSnoozeAlarmRequest {
  snoozeActionRequests: SnoozeAlarmActionRequest[];
}
export interface BatchSnoozeAlarmResponse {
  errorEntries?: BatchAlarmActionErrorEntry[];
}
export type StateName = string;
export type VariableName = string;
export type VariableValue = string;
export interface VariableDefinition {
  name: string;
  value: string;
}
export type VariableDefinitions = VariableDefinition[];
export type TimerName = string;
export type Seconds = number;
export interface TimerDefinition {
  name: string;
  seconds: number;
}
export type TimerDefinitions = TimerDefinition[];
export interface DetectorStateDefinition {
  stateName: string;
  variables: VariableDefinition[];
  timers: TimerDefinition[];
}
export interface UpdateDetectorRequest {
  messageId: string;
  detectorModelName: string;
  keyValue?: string;
  state: DetectorStateDefinition;
}
export type UpdateDetectorRequests = UpdateDetectorRequest[];
export interface BatchUpdateDetectorRequest {
  detectors: UpdateDetectorRequest[];
}
export interface BatchUpdateDetectorErrorEntry {
  messageId?: string;
  errorCode?: ErrorCode;
  errorMessage?: string;
}
export type BatchUpdateDetectorErrorEntries = BatchUpdateDetectorErrorEntry[];
export interface BatchUpdateDetectorResponse {
  batchUpdateDetectorErrorEntries?: BatchUpdateDetectorErrorEntry[];
}
export interface DescribeAlarmRequest {
  alarmModelName: string;
  keyValue?: string;
}
export type AlarmModelVersion = string;
export type AlarmStateName =
  | "DISABLED"
  | "NORMAL"
  | "ACTIVE"
  | "ACKNOWLEDGED"
  | "SNOOZE_DISABLED"
  | "LATCHED"
  | (string & {});
export type InputPropertyValue = string;
export type ComparisonOperator =
  | "GREATER"
  | "GREATER_OR_EQUAL"
  | "LESS"
  | "LESS_OR_EQUAL"
  | "EQUAL"
  | "NOT_EQUAL"
  | (string & {});
export type ThresholdValue = string;
export interface SimpleRuleEvaluation {
  inputPropertyValue?: string;
  operator?: ComparisonOperator;
  thresholdValue?: string;
}
export interface RuleEvaluation {
  simpleRuleEvaluation?: SimpleRuleEvaluation;
}
export type CustomerActionName =
  | "SNOOZE"
  | "ENABLE"
  | "DISABLE"
  | "ACKNOWLEDGE"
  | "RESET"
  | (string & {});
export interface SnoozeActionConfiguration {
  snoozeDuration?: number;
  note?: string;
}
export interface EnableActionConfiguration {
  note?: string;
}
export interface DisableActionConfiguration {
  note?: string;
}
export interface AcknowledgeActionConfiguration {
  note?: string;
}
export interface ResetActionConfiguration {
  note?: string;
}
export interface CustomerAction {
  actionName?: CustomerActionName;
  snoozeActionConfiguration?: SnoozeActionConfiguration;
  enableActionConfiguration?: EnableActionConfiguration;
  disableActionConfiguration?: DisableActionConfiguration;
  acknowledgeActionConfiguration?: AcknowledgeActionConfiguration;
  resetActionConfiguration?: ResetActionConfiguration;
}
export type EventType = "STATE_CHANGE" | (string & {});
export type TriggerType = "SNOOZE_TIMEOUT" | (string & {});
export interface StateChangeConfiguration {
  triggerType?: TriggerType;
}
export interface SystemEvent {
  eventType?: EventType;
  stateChangeConfiguration?: StateChangeConfiguration;
}
export interface AlarmState {
  stateName?: AlarmStateName;
  ruleEvaluation?: RuleEvaluation;
  customerAction?: CustomerAction;
  systemEvent?: SystemEvent;
}
export type Severity = number;
export interface Alarm {
  alarmModelName?: string;
  alarmModelVersion?: string;
  keyValue?: string;
  alarmState?: AlarmState;
  severity?: number;
  creationTime?: Date;
  lastUpdateTime?: Date;
}
export interface DescribeAlarmResponse {
  alarm?: Alarm;
}
export interface DescribeDetectorRequest {
  detectorModelName: string;
  keyValue?: string;
}
export type DetectorModelVersion = string;
export interface Variable {
  name: string;
  value: string;
}
export type Variables = Variable[];
export interface Timer {
  name: string;
  timestamp: Date;
}
export type Timers = Timer[];
export interface DetectorState {
  stateName: string;
  variables: Variable[];
  timers: Timer[];
}
export interface Detector {
  detectorModelName?: string;
  keyValue?: string;
  detectorModelVersion?: string;
  state?: DetectorState;
  creationTime?: Date;
  lastUpdateTime?: Date;
}
export interface DescribeDetectorResponse {
  detector?: Detector;
}
export type NextToken = string;
export type MaxResults = number;
export interface ListAlarmsRequest {
  alarmModelName: string;
  nextToken?: string;
  maxResults?: number;
}
export interface AlarmSummary {
  alarmModelName?: string;
  alarmModelVersion?: string;
  keyValue?: string;
  stateName?: AlarmStateName;
  creationTime?: Date;
  lastUpdateTime?: Date;
}
export type AlarmSummaries = AlarmSummary[];
export interface ListAlarmsResponse {
  alarmSummaries?: AlarmSummary[];
  nextToken?: string;
}
export interface ListDetectorsRequest {
  detectorModelName: string;
  stateName?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface DetectorStateSummary {
  stateName?: string;
}
export interface DetectorSummary {
  detectorModelName?: string;
  keyValue?: string;
  detectorModelVersion?: string;
  state?: DetectorStateSummary;
  creationTime?: Date;
  lastUpdateTime?: Date;
}
export type DetectorSummaries = DetectorSummary[];
export interface ListDetectorsResponse {
  detectorSummaries?: DetectorSummary[];
  nextToken?: string;
}
export type BatchAcknowledgeAlarmError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Acknowledges one or more alarms. The alarms change to the `ACKNOWLEDGED` state
 * after you acknowledge them.
 */
export const batchAcknowledgeAlarm: API.OperationMethod<
  BatchAcknowledgeAlarmRequest,
  BatchAcknowledgeAlarmResponse,
  BatchAcknowledgeAlarmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<BatchAcknowledgeAlarmRequest>,
  output: __S(146, __c9, 2) as any as S.Schema<BatchAcknowledgeAlarmResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchAcknowledgeAlarm",
}));

export type BatchDeleteDetectorError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes one or more detectors that were created. When a detector is deleted, its state will be cleared and the detector will be removed from the list of detectors. The deleted detector will no longer appear if referenced in the ListDetectors API call.
 */
export const batchDeleteDetector: API.OperationMethod<
  BatchDeleteDetectorRequest,
  BatchDeleteDetectorResponse,
  BatchDeleteDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(162, __c10, 2) as any as S.Schema<BatchDeleteDetectorRequest>,
  output: __S(163, __c10, 3) as any as S.Schema<BatchDeleteDetectorResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteDetector",
}));

export type BatchDisableAlarmError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Disables one or more alarms. The alarms change to the `DISABLED` state after
 * you disable them.
 */
export const batchDisableAlarm: API.OperationMethod<
  BatchDisableAlarmRequest,
  BatchDisableAlarmResponse,
  BatchDisableAlarmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<BatchDisableAlarmRequest>,
  output: __S(146, __c9, 2) as any as S.Schema<BatchDisableAlarmResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDisableAlarm",
}));

export type BatchEnableAlarmError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Enables one or more alarms. The alarms change to the `NORMAL` state after you
 * enable them.
 */
export const batchEnableAlarm: API.OperationMethod<
  BatchEnableAlarmRequest,
  BatchEnableAlarmResponse,
  BatchEnableAlarmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<BatchEnableAlarmRequest>,
  output: __S(146, __c9, 2) as any as S.Schema<BatchEnableAlarmResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchEnableAlarm",
}));

export type BatchPutMessageError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Sends a set of messages to the IoT Events system. Each message payload is transformed into
 * the input you specify (`"inputName"`) and ingested into any detectors that monitor
 * that input. If multiple messages are sent, the order in which the messages are processed isn't
 * guaranteed. To guarantee ordering, you must send messages one at a time and wait for a
 * successful response.
 */
export const batchPutMessage: API.OperationMethod<
  BatchPutMessageRequest,
  BatchPutMessageResponse,
  BatchPutMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(227, __c14, 3) as any as S.Schema<BatchPutMessageRequest>,
  output: __S(228, __c14, 4) as any as S.Schema<BatchPutMessageResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchPutMessage",
}));

export type BatchResetAlarmError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Resets one or more alarms. The alarms return to the `NORMAL` state after you
 * reset them.
 */
export const batchResetAlarm: API.OperationMethod<
  BatchResetAlarmRequest,
  BatchResetAlarmResponse,
  BatchResetAlarmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<BatchResetAlarmRequest>,
  output: __S(146, __c9, 2) as any as S.Schema<BatchResetAlarmResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchResetAlarm",
}));

export type BatchSnoozeAlarmError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Changes one or more alarms to the snooze mode. The alarms change to the
 * `SNOOZE_DISABLED` state after you set them to the snooze mode.
 */
export const batchSnoozeAlarm: API.OperationMethod<
  BatchSnoozeAlarmRequest,
  BatchSnoozeAlarmResponse,
  BatchSnoozeAlarmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(18, __c1, 2) as any as S.Schema<BatchSnoozeAlarmRequest>,
  output: __S(146, __c9, 2) as any as S.Schema<BatchSnoozeAlarmResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchSnoozeAlarm",
}));

export type BatchUpdateDetectorError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the state, variable values, and timer settings of one or more detectors
 * (instances) of a specified detector model.
 */
export const batchUpdateDetector: API.OperationMethod<
  BatchUpdateDetectorRequest,
  BatchUpdateDetectorResponse,
  BatchUpdateDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(39, __c2, 7) as any as S.Schema<BatchUpdateDetectorRequest>,
  output: __S(40, __c2, 8) as any as S.Schema<BatchUpdateDetectorResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateDetector",
}));

export type DescribeAlarmError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about an alarm.
 */
export const describeAlarm: API.OperationMethod<
  DescribeAlarmRequest,
  DescribeAlarmResponse,
  DescribeAlarmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<DescribeAlarmRequest>,
  output: __S(58, __c3, 10) as any as S.Schema<DescribeAlarmResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAlarm",
}));

export type DescribeDetectorError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns information about the specified detector (instance).
 */
export const describeDetector: API.OperationMethod<
  DescribeDetectorRequest,
  DescribeDetectorResponse,
  DescribeDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<DescribeDetectorRequest>,
  output: __S(71, __c4, 7) as any as S.Schema<DescribeDetectorResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDetector",
}));

export type ListAlarmsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists one or more alarms. The operation returns only the metadata associated with each
 * alarm.
 */
export const listAlarms: API.OperationMethod<
  ListAlarmsRequest,
  ListAlarmsResponse,
  ListAlarmsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<ListAlarmsRequest>,
  output: __S(83, __c5, 3) as any as S.Schema<ListAlarmsResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAlarms",
}));

export type ListDetectorsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists detectors (the instances of a detector model).
 */
export const listDetectors: API.OperationMethod<
  ListDetectorsRequest,
  ListDetectorsResponse,
  ListDetectorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<ListDetectorsRequest>,
  output: __S(100, __c6, 4) as any as S.Schema<ListDetectorsResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDetectors",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resetActionRequests: __S(129, __c8, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/alarms/reset" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({
        identifier: "BatchResetAlarmRequest",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          requestId: S.String,
          alarmModelName: S.String,
          keyValue: S.optional(S.String),
          note: S.optional(S.String),
          snoozeDuration: S.Number,
        }),
      ).annotate({
        identifier: "SnoozeAlarmActionRequest",
      });
    case 1:
      return S.Array(__S(16, __c1, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ snoozeActionRequests: __S(17, __c1, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/alarms/snooze" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({
        identifier: "BatchSnoozeAlarmRequest",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, value: S.String })).annotate({
        identifier: "VariableDefinition",
      });
    case 1:
      return S.Array(__S(32, __c2, 0));
    case 2:
      return S.suspend(() => S.Struct({ name: S.String, seconds: S.Number })).annotate({
        identifier: "TimerDefinition",
      });
    case 3:
      return S.Array(__S(34, __c2, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          stateName: S.String,
          variables: __S(33, __c2, 1),
          timers: __S(35, __c2, 3),
        }),
      ).annotate({
        identifier: "DetectorStateDefinition",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          messageId: S.String,
          detectorModelName: S.String,
          keyValue: S.optional(S.String),
          state: __S(36, __c2, 4),
        }),
      ).annotate({
        identifier: "UpdateDetectorRequest",
      });
    case 6:
      return S.Array(__S(37, __c2, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ detectors: __S(38, __c2, 6) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/detectors" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({
        identifier: "BatchUpdateDetectorRequest",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          batchUpdateDetectorErrorEntries: S.optional(__S(177, __c11, 1)),
        }),
      ).annotate({
        identifier: "BatchUpdateDetectorResponse",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          alarmModelName: S.String.pipe(T.HttpLabel("alarmModelName")),
          keyValue: S.optional(S.String).pipe(T.HttpQuery("keyValue")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/alarms/{alarmModelName}/keyValues" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({
        identifier: "DescribeAlarmRequest",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          inputPropertyValue: S.optional(S.String),
          operator: S.optional(S.String),
          thresholdValue: S.optional(S.String),
        }),
      ).annotate({
        identifier: "SimpleRuleEvaluation",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ simpleRuleEvaluation: S.optional(__S(49, __c3, 1)) }),
      ).annotate({ identifier: "RuleEvaluation" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          snoozeDuration: S.optional(S.Number),
          note: S.optional(S.String),
        }),
      ).annotate({
        identifier: "SnoozeActionConfiguration",
      });
    case 4:
      return S.suspend(() => S.Struct({ note: S.optional(S.String) })).annotate({
        identifier: "EnableActionConfiguration",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          actionName: S.optional(S.String),
          snoozeActionConfiguration: S.optional(__S(51, __c3, 3)),
          enableActionConfiguration: S.optional(__S(52, __c3, 4)),
          disableActionConfiguration: S.optional(__S(52, __c3, 4)),
          acknowledgeActionConfiguration: S.optional(__S(52, __c3, 4)),
          resetActionConfiguration: S.optional(__S(52, __c3, 4)),
        }),
      ).annotate({ identifier: "CustomerAction" });
    case 6:
      return S.suspend(() => S.Struct({ triggerType: S.optional(S.String) })).annotate({
        identifier: "StateChangeConfiguration",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({
          eventType: S.optional(S.String),
          stateChangeConfiguration: S.optional(__S(54, __c3, 6)),
        }),
      ).annotate({ identifier: "SystemEvent" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          stateName: S.optional(S.String),
          ruleEvaluation: S.optional(__S(50, __c3, 2)),
          customerAction: S.optional(__S(53, __c3, 5)),
          systemEvent: S.optional(__S(55, __c3, 7)),
        }),
      ).annotate({ identifier: "AlarmState" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          alarmModelName: S.optional(S.String),
          alarmModelVersion: S.optional(S.String),
          keyValue: S.optional(S.String),
          alarmState: S.optional(__S(56, __c3, 8)),
          severity: S.optional(S.Number),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Alarm" });
    case 10:
      return S.suspend(() => S.Struct({ alarm: S.optional(__S(57, __c3, 9)) })).annotate({
        identifier: "DescribeAlarmResponse",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          detectorModelName: S.String.pipe(T.HttpLabel("detectorModelName")),
          keyValue: S.optional(S.String).pipe(T.HttpQuery("keyValue")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/detectors/{detectorModelName}/keyValues",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({
        identifier: "DescribeDetectorRequest",
      });
    case 1:
      return S.suspend(() => S.Struct({ name: S.String, value: S.String })).annotate({
        identifier: "Variable",
      });
    case 2:
      return S.Array(__S(65, __c4, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "Timer" });
    case 4:
      return S.Array(__S(67, __c4, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ stateName: S.String, variables: __S(66, __c4, 2), timers: __S(68, __c4, 4) }),
      ).annotate({ identifier: "DetectorState" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          detectorModelName: S.optional(S.String),
          keyValue: S.optional(S.String),
          detectorModelVersion: S.optional(S.String),
          state: S.optional(__S(69, __c4, 5)),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Detector" });
    case 7:
      return S.suspend(() => S.Struct({ detector: S.optional(__S(70, __c4, 6)) })).annotate({
        identifier: "DescribeDetectorResponse",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          alarmModelName: S.String.pipe(T.HttpLabel("alarmModelName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/alarms/{alarmModelName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({
        identifier: "ListAlarmsRequest",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          alarmModelName: S.optional(S.String),
          alarmModelVersion: S.optional(S.String),
          keyValue: S.optional(S.String),
          stateName: S.optional(S.String),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "AlarmSummary" });
    case 2:
      return S.Array(__S(81, __c5, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          alarmSummaries: S.optional(__S(82, __c5, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({
        identifier: "ListAlarmsResponse",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          detectorModelName: S.String.pipe(T.HttpLabel("detectorModelName")),
          stateName: S.optional(S.String).pipe(T.HttpQuery("stateName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/detectors/{detectorModelName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({
        identifier: "ListDetectorsRequest",
      });
    case 1:
      return S.suspend(() => S.Struct({ stateName: S.optional(S.String) })).annotate({
        identifier: "DetectorStateSummary",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          detectorModelName: S.optional(S.String),
          keyValue: S.optional(S.String),
          detectorModelVersion: S.optional(S.String),
          state: S.optional(__S(97, __c6, 1)),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({
        identifier: "DetectorSummary",
      });
    case 3:
      return S.Array(__S(98, __c6, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          detectorSummaries: S.optional(__S(99, __c6, 3)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({
        identifier: "ListDetectorsResponse",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ acknowledgeActionRequests: __S(129, __c8, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/alarms/acknowledge" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({
        identifier: "BatchAcknowledgeAlarmRequest",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          requestId: S.String,
          alarmModelName: S.String,
          keyValue: S.optional(S.String),
          note: S.optional(S.String),
        }),
      ).annotate({
        identifier: "AcknowledgeAlarmActionRequest",
      });
    case 1:
      return S.Array(__S(128, __c8, 0));
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          requestId: S.optional(S.String),
          errorCode: S.optional(S.String),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({
        identifier: "BatchAlarmActionErrorEntry",
      });
    case 1:
      return S.Array(__S(144, __c9, 0));
    case 2:
      return S.suspend(() => S.Struct({ errorEntries: S.optional(__S(145, __c9, 1)) })).annotate({
        identifier: "BatchAcknowledgeAlarmResponse",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          messageId: S.String,
          detectorModelName: S.String,
          keyValue: S.optional(S.String),
        }),
      ).annotate({
        identifier: "DeleteDetectorRequest",
      });
    case 1:
      return S.Array(__S(160, __c10, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ detectors: __S(161, __c10, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/detectors/delete" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({
        identifier: "BatchDeleteDetectorRequest",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          batchDeleteDetectorErrorEntries: S.optional(__S(177, __c11, 1)),
        }),
      ).annotate({
        identifier: "BatchDeleteDetectorResponse",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          messageId: S.optional(S.String),
          errorCode: S.optional(S.String),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({
        identifier: "BatchDeleteDetectorErrorEntry",
      });
    case 1:
      return S.Array(__S(176, __c11, 0));
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ disableActionRequests: __S(129, __c8, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/alarms/disable" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({
        identifier: "BatchDisableAlarmRequest",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ enableActionRequests: __S(129, __c8, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/alarms/enable" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({
        identifier: "BatchEnableAlarmRequest",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ timeInMillis: S.optional(S.Number) })).annotate({
        identifier: "TimestampValue",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          messageId: S.String,
          inputName: S.String,
          payload: T.Blob,
          timestamp: S.optional(__S(224, __c14, 0)),
        }),
      ).annotate({ identifier: "Message" });
    case 2:
      return S.Array(__S(225, __c14, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ messages: __S(226, __c14, 2) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/inputs/messages" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({
        identifier: "BatchPutMessageRequest",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          BatchPutMessageErrorEntries: S.optional(__S(177, __c11, 1)),
        }),
      ).annotate({
        identifier: "BatchPutMessageResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
