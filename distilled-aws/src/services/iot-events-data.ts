import * as HttpClient from "effect/unstable/http/HttpClient";
import * as effect from "effect/Effect";
import * as redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as stream from "effect/Stream";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import type { Region } from "../region.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "IoT Events Data",
  serviceShapeName: "IotColumboDataService",
});
const auth = T.AwsAuthSigv4({ name: "ioteventsdata" });
const ver = T.ServiceVersion("2018-10-23");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
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
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://data.iotevents.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://data.iotevents.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

//# Newtypes
export type RequestId = string;
export type AlarmModelName = string;
export type KeyValue = string;
export type Note = string;
export type ErrorMessage = string;
export type MessageId = string;
export type DetectorModelName = string;
export type EphemeralInputName = string;
export type Payload = Uint8Array;
export type EpochMilliTimestamp = number;
export type SnoozeDuration = number;
export type StateName = string;
export type VariableName = string;
export type VariableValue = string;
export type TimerName = string;
export type Seconds = number;
export type AlarmModelVersion = string;
export type InputPropertyValue = string;
export type ThresholdValue = string;
export type Severity = number;
export type DetectorModelVersion = string;
export type NextToken = string;
export type MaxResults = number;

//# Schemas
export interface AcknowledgeAlarmActionRequest {
  requestId: string;
  alarmModelName: string;
  keyValue?: string;
  note?: string;
}
export const AcknowledgeAlarmActionRequest = S.suspend(() =>
  S.Struct({
    requestId: S.String,
    alarmModelName: S.String,
    keyValue: S.optional(S.String),
    note: S.optional(S.String),
  }),
).annotate({
  identifier: "AcknowledgeAlarmActionRequest",
}) as any as S.Schema<AcknowledgeAlarmActionRequest>;
export type AcknowledgeAlarmActionRequests = AcknowledgeAlarmActionRequest[];
export const AcknowledgeAlarmActionRequests = S.Array(
  AcknowledgeAlarmActionRequest,
);
export interface BatchAcknowledgeAlarmRequest {
  acknowledgeActionRequests: AcknowledgeAlarmActionRequest[];
}
export const BatchAcknowledgeAlarmRequest = S.suspend(() =>
  S.Struct({ acknowledgeActionRequests: AcknowledgeAlarmActionRequests }).pipe(
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
}) as any as S.Schema<BatchAcknowledgeAlarmRequest>;
export type ErrorCode =
  | "ResourceNotFoundException"
  | "InvalidRequestException"
  | "InternalFailureException"
  | "ServiceUnavailableException"
  | "ThrottlingException"
  | (string & {});
export const ErrorCode = S.String;
export interface BatchAlarmActionErrorEntry {
  requestId?: string;
  errorCode?: ErrorCode;
  errorMessage?: string;
}
export const BatchAlarmActionErrorEntry = S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    errorCode: S.optional(ErrorCode),
    errorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchAlarmActionErrorEntry",
}) as any as S.Schema<BatchAlarmActionErrorEntry>;
export type BatchAlarmActionErrorEntries = BatchAlarmActionErrorEntry[];
export const BatchAlarmActionErrorEntries = S.Array(BatchAlarmActionErrorEntry);
export interface BatchAcknowledgeAlarmResponse {
  errorEntries?: BatchAlarmActionErrorEntry[];
}
export const BatchAcknowledgeAlarmResponse = S.suspend(() =>
  S.Struct({ errorEntries: S.optional(BatchAlarmActionErrorEntries) }),
).annotate({
  identifier: "BatchAcknowledgeAlarmResponse",
}) as any as S.Schema<BatchAcknowledgeAlarmResponse>;
export interface DeleteDetectorRequest {
  messageId: string;
  detectorModelName: string;
  keyValue?: string;
}
export const DeleteDetectorRequest = S.suspend(() =>
  S.Struct({
    messageId: S.String,
    detectorModelName: S.String,
    keyValue: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteDetectorRequest",
}) as any as S.Schema<DeleteDetectorRequest>;
export type DeleteDetectorRequests = DeleteDetectorRequest[];
export const DeleteDetectorRequests = S.Array(DeleteDetectorRequest);
export interface BatchDeleteDetectorRequest {
  detectors: DeleteDetectorRequest[];
}
export const BatchDeleteDetectorRequest = S.suspend(() =>
  S.Struct({ detectors: DeleteDetectorRequests }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/detectors/delete" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchDeleteDetectorRequest",
}) as any as S.Schema<BatchDeleteDetectorRequest>;
export interface BatchDeleteDetectorErrorEntry {
  messageId?: string;
  errorCode?: ErrorCode;
  errorMessage?: string;
}
export const BatchDeleteDetectorErrorEntry = S.suspend(() =>
  S.Struct({
    messageId: S.optional(S.String),
    errorCode: S.optional(ErrorCode),
    errorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchDeleteDetectorErrorEntry",
}) as any as S.Schema<BatchDeleteDetectorErrorEntry>;
export type BatchDeleteDetectorErrorEntries = BatchDeleteDetectorErrorEntry[];
export const BatchDeleteDetectorErrorEntries = S.Array(
  BatchDeleteDetectorErrorEntry,
);
export interface BatchDeleteDetectorResponse {
  batchDeleteDetectorErrorEntries?: BatchDeleteDetectorErrorEntry[];
}
export const BatchDeleteDetectorResponse = S.suspend(() =>
  S.Struct({
    batchDeleteDetectorErrorEntries: S.optional(
      BatchDeleteDetectorErrorEntries,
    ),
  }),
).annotate({
  identifier: "BatchDeleteDetectorResponse",
}) as any as S.Schema<BatchDeleteDetectorResponse>;
export interface DisableAlarmActionRequest {
  requestId: string;
  alarmModelName: string;
  keyValue?: string;
  note?: string;
}
export const DisableAlarmActionRequest = S.suspend(() =>
  S.Struct({
    requestId: S.String,
    alarmModelName: S.String,
    keyValue: S.optional(S.String),
    note: S.optional(S.String),
  }),
).annotate({
  identifier: "DisableAlarmActionRequest",
}) as any as S.Schema<DisableAlarmActionRequest>;
export type DisableAlarmActionRequests = DisableAlarmActionRequest[];
export const DisableAlarmActionRequests = S.Array(DisableAlarmActionRequest);
export interface BatchDisableAlarmRequest {
  disableActionRequests: DisableAlarmActionRequest[];
}
export const BatchDisableAlarmRequest = S.suspend(() =>
  S.Struct({ disableActionRequests: DisableAlarmActionRequests }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/alarms/disable" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchDisableAlarmRequest",
}) as any as S.Schema<BatchDisableAlarmRequest>;
export interface BatchDisableAlarmResponse {
  errorEntries?: BatchAlarmActionErrorEntry[];
}
export const BatchDisableAlarmResponse = S.suspend(() =>
  S.Struct({ errorEntries: S.optional(BatchAlarmActionErrorEntries) }),
).annotate({
  identifier: "BatchDisableAlarmResponse",
}) as any as S.Schema<BatchDisableAlarmResponse>;
export interface EnableAlarmActionRequest {
  requestId: string;
  alarmModelName: string;
  keyValue?: string;
  note?: string;
}
export const EnableAlarmActionRequest = S.suspend(() =>
  S.Struct({
    requestId: S.String,
    alarmModelName: S.String,
    keyValue: S.optional(S.String),
    note: S.optional(S.String),
  }),
).annotate({
  identifier: "EnableAlarmActionRequest",
}) as any as S.Schema<EnableAlarmActionRequest>;
export type EnableAlarmActionRequests = EnableAlarmActionRequest[];
export const EnableAlarmActionRequests = S.Array(EnableAlarmActionRequest);
export interface BatchEnableAlarmRequest {
  enableActionRequests: EnableAlarmActionRequest[];
}
export const BatchEnableAlarmRequest = S.suspend(() =>
  S.Struct({ enableActionRequests: EnableAlarmActionRequests }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/alarms/enable" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchEnableAlarmRequest",
}) as any as S.Schema<BatchEnableAlarmRequest>;
export interface BatchEnableAlarmResponse {
  errorEntries?: BatchAlarmActionErrorEntry[];
}
export const BatchEnableAlarmResponse = S.suspend(() =>
  S.Struct({ errorEntries: S.optional(BatchAlarmActionErrorEntries) }),
).annotate({
  identifier: "BatchEnableAlarmResponse",
}) as any as S.Schema<BatchEnableAlarmResponse>;
export interface TimestampValue {
  timeInMillis?: number;
}
export const TimestampValue = S.suspend(() =>
  S.Struct({ timeInMillis: S.optional(S.Number) }),
).annotate({ identifier: "TimestampValue" }) as any as S.Schema<TimestampValue>;
export interface Message {
  messageId: string;
  inputName: string;
  payload: Uint8Array;
  timestamp?: TimestampValue;
}
export const Message = S.suspend(() =>
  S.Struct({
    messageId: S.String,
    inputName: S.String,
    payload: T.Blob,
    timestamp: S.optional(TimestampValue),
  }),
).annotate({ identifier: "Message" }) as any as S.Schema<Message>;
export type Messages = Message[];
export const Messages = S.Array(Message);
export interface BatchPutMessageRequest {
  messages: Message[];
}
export const BatchPutMessageRequest = S.suspend(() =>
  S.Struct({ messages: Messages }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/inputs/messages" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchPutMessageRequest",
}) as any as S.Schema<BatchPutMessageRequest>;
export interface BatchPutMessageErrorEntry {
  messageId?: string;
  errorCode?: ErrorCode;
  errorMessage?: string;
}
export const BatchPutMessageErrorEntry = S.suspend(() =>
  S.Struct({
    messageId: S.optional(S.String),
    errorCode: S.optional(ErrorCode),
    errorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchPutMessageErrorEntry",
}) as any as S.Schema<BatchPutMessageErrorEntry>;
export type BatchPutMessageErrorEntries = BatchPutMessageErrorEntry[];
export const BatchPutMessageErrorEntries = S.Array(BatchPutMessageErrorEntry);
export interface BatchPutMessageResponse {
  BatchPutMessageErrorEntries?: BatchPutMessageErrorEntry[];
}
export const BatchPutMessageResponse = S.suspend(() =>
  S.Struct({
    BatchPutMessageErrorEntries: S.optional(BatchPutMessageErrorEntries),
  }),
).annotate({
  identifier: "BatchPutMessageResponse",
}) as any as S.Schema<BatchPutMessageResponse>;
export interface ResetAlarmActionRequest {
  requestId: string;
  alarmModelName: string;
  keyValue?: string;
  note?: string;
}
export const ResetAlarmActionRequest = S.suspend(() =>
  S.Struct({
    requestId: S.String,
    alarmModelName: S.String,
    keyValue: S.optional(S.String),
    note: S.optional(S.String),
  }),
).annotate({
  identifier: "ResetAlarmActionRequest",
}) as any as S.Schema<ResetAlarmActionRequest>;
export type ResetAlarmActionRequests = ResetAlarmActionRequest[];
export const ResetAlarmActionRequests = S.Array(ResetAlarmActionRequest);
export interface BatchResetAlarmRequest {
  resetActionRequests: ResetAlarmActionRequest[];
}
export const BatchResetAlarmRequest = S.suspend(() =>
  S.Struct({ resetActionRequests: ResetAlarmActionRequests }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/alarms/reset" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchResetAlarmRequest",
}) as any as S.Schema<BatchResetAlarmRequest>;
export interface BatchResetAlarmResponse {
  errorEntries?: BatchAlarmActionErrorEntry[];
}
export const BatchResetAlarmResponse = S.suspend(() =>
  S.Struct({ errorEntries: S.optional(BatchAlarmActionErrorEntries) }),
).annotate({
  identifier: "BatchResetAlarmResponse",
}) as any as S.Schema<BatchResetAlarmResponse>;
export interface SnoozeAlarmActionRequest {
  requestId: string;
  alarmModelName: string;
  keyValue?: string;
  note?: string;
  snoozeDuration: number;
}
export const SnoozeAlarmActionRequest = S.suspend(() =>
  S.Struct({
    requestId: S.String,
    alarmModelName: S.String,
    keyValue: S.optional(S.String),
    note: S.optional(S.String),
    snoozeDuration: S.Number,
  }),
).annotate({
  identifier: "SnoozeAlarmActionRequest",
}) as any as S.Schema<SnoozeAlarmActionRequest>;
export type SnoozeAlarmActionRequests = SnoozeAlarmActionRequest[];
export const SnoozeAlarmActionRequests = S.Array(SnoozeAlarmActionRequest);
export interface BatchSnoozeAlarmRequest {
  snoozeActionRequests: SnoozeAlarmActionRequest[];
}
export const BatchSnoozeAlarmRequest = S.suspend(() =>
  S.Struct({ snoozeActionRequests: SnoozeAlarmActionRequests }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/alarms/snooze" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchSnoozeAlarmRequest",
}) as any as S.Schema<BatchSnoozeAlarmRequest>;
export interface BatchSnoozeAlarmResponse {
  errorEntries?: BatchAlarmActionErrorEntry[];
}
export const BatchSnoozeAlarmResponse = S.suspend(() =>
  S.Struct({ errorEntries: S.optional(BatchAlarmActionErrorEntries) }),
).annotate({
  identifier: "BatchSnoozeAlarmResponse",
}) as any as S.Schema<BatchSnoozeAlarmResponse>;
export interface VariableDefinition {
  name: string;
  value: string;
}
export const VariableDefinition = S.suspend(() =>
  S.Struct({ name: S.String, value: S.String }),
).annotate({
  identifier: "VariableDefinition",
}) as any as S.Schema<VariableDefinition>;
export type VariableDefinitions = VariableDefinition[];
export const VariableDefinitions = S.Array(VariableDefinition);
export interface TimerDefinition {
  name: string;
  seconds: number;
}
export const TimerDefinition = S.suspend(() =>
  S.Struct({ name: S.String, seconds: S.Number }),
).annotate({
  identifier: "TimerDefinition",
}) as any as S.Schema<TimerDefinition>;
export type TimerDefinitions = TimerDefinition[];
export const TimerDefinitions = S.Array(TimerDefinition);
export interface DetectorStateDefinition {
  stateName: string;
  variables: VariableDefinition[];
  timers: TimerDefinition[];
}
export const DetectorStateDefinition = S.suspend(() =>
  S.Struct({
    stateName: S.String,
    variables: VariableDefinitions,
    timers: TimerDefinitions,
  }),
).annotate({
  identifier: "DetectorStateDefinition",
}) as any as S.Schema<DetectorStateDefinition>;
export interface UpdateDetectorRequest {
  messageId: string;
  detectorModelName: string;
  keyValue?: string;
  state: DetectorStateDefinition;
}
export const UpdateDetectorRequest = S.suspend(() =>
  S.Struct({
    messageId: S.String,
    detectorModelName: S.String,
    keyValue: S.optional(S.String),
    state: DetectorStateDefinition,
  }),
).annotate({
  identifier: "UpdateDetectorRequest",
}) as any as S.Schema<UpdateDetectorRequest>;
export type UpdateDetectorRequests = UpdateDetectorRequest[];
export const UpdateDetectorRequests = S.Array(UpdateDetectorRequest);
export interface BatchUpdateDetectorRequest {
  detectors: UpdateDetectorRequest[];
}
export const BatchUpdateDetectorRequest = S.suspend(() =>
  S.Struct({ detectors: UpdateDetectorRequests }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/detectors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchUpdateDetectorRequest",
}) as any as S.Schema<BatchUpdateDetectorRequest>;
export interface BatchUpdateDetectorErrorEntry {
  messageId?: string;
  errorCode?: ErrorCode;
  errorMessage?: string;
}
export const BatchUpdateDetectorErrorEntry = S.suspend(() =>
  S.Struct({
    messageId: S.optional(S.String),
    errorCode: S.optional(ErrorCode),
    errorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchUpdateDetectorErrorEntry",
}) as any as S.Schema<BatchUpdateDetectorErrorEntry>;
export type BatchUpdateDetectorErrorEntries = BatchUpdateDetectorErrorEntry[];
export const BatchUpdateDetectorErrorEntries = S.Array(
  BatchUpdateDetectorErrorEntry,
);
export interface BatchUpdateDetectorResponse {
  batchUpdateDetectorErrorEntries?: BatchUpdateDetectorErrorEntry[];
}
export const BatchUpdateDetectorResponse = S.suspend(() =>
  S.Struct({
    batchUpdateDetectorErrorEntries: S.optional(
      BatchUpdateDetectorErrorEntries,
    ),
  }),
).annotate({
  identifier: "BatchUpdateDetectorResponse",
}) as any as S.Schema<BatchUpdateDetectorResponse>;
export interface DescribeAlarmRequest {
  alarmModelName: string;
  keyValue?: string;
}
export const DescribeAlarmRequest = S.suspend(() =>
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
}) as any as S.Schema<DescribeAlarmRequest>;
export type AlarmStateName =
  | "DISABLED"
  | "NORMAL"
  | "ACTIVE"
  | "ACKNOWLEDGED"
  | "SNOOZE_DISABLED"
  | "LATCHED"
  | (string & {});
export const AlarmStateName = S.String;
export type ComparisonOperator =
  | "GREATER"
  | "GREATER_OR_EQUAL"
  | "LESS"
  | "LESS_OR_EQUAL"
  | "EQUAL"
  | "NOT_EQUAL"
  | (string & {});
export const ComparisonOperator = S.String;
export interface SimpleRuleEvaluation {
  inputPropertyValue?: string;
  operator?: ComparisonOperator;
  thresholdValue?: string;
}
export const SimpleRuleEvaluation = S.suspend(() =>
  S.Struct({
    inputPropertyValue: S.optional(S.String),
    operator: S.optional(ComparisonOperator),
    thresholdValue: S.optional(S.String),
  }),
).annotate({
  identifier: "SimpleRuleEvaluation",
}) as any as S.Schema<SimpleRuleEvaluation>;
export interface RuleEvaluation {
  simpleRuleEvaluation?: SimpleRuleEvaluation;
}
export const RuleEvaluation = S.suspend(() =>
  S.Struct({ simpleRuleEvaluation: S.optional(SimpleRuleEvaluation) }),
).annotate({ identifier: "RuleEvaluation" }) as any as S.Schema<RuleEvaluation>;
export type CustomerActionName =
  | "SNOOZE"
  | "ENABLE"
  | "DISABLE"
  | "ACKNOWLEDGE"
  | "RESET"
  | (string & {});
export const CustomerActionName = S.String;
export interface SnoozeActionConfiguration {
  snoozeDuration?: number;
  note?: string;
}
export const SnoozeActionConfiguration = S.suspend(() =>
  S.Struct({
    snoozeDuration: S.optional(S.Number),
    note: S.optional(S.String),
  }),
).annotate({
  identifier: "SnoozeActionConfiguration",
}) as any as S.Schema<SnoozeActionConfiguration>;
export interface EnableActionConfiguration {
  note?: string;
}
export const EnableActionConfiguration = S.suspend(() =>
  S.Struct({ note: S.optional(S.String) }),
).annotate({
  identifier: "EnableActionConfiguration",
}) as any as S.Schema<EnableActionConfiguration>;
export interface DisableActionConfiguration {
  note?: string;
}
export const DisableActionConfiguration = S.suspend(() =>
  S.Struct({ note: S.optional(S.String) }),
).annotate({
  identifier: "DisableActionConfiguration",
}) as any as S.Schema<DisableActionConfiguration>;
export interface AcknowledgeActionConfiguration {
  note?: string;
}
export const AcknowledgeActionConfiguration = S.suspend(() =>
  S.Struct({ note: S.optional(S.String) }),
).annotate({
  identifier: "AcknowledgeActionConfiguration",
}) as any as S.Schema<AcknowledgeActionConfiguration>;
export interface ResetActionConfiguration {
  note?: string;
}
export const ResetActionConfiguration = S.suspend(() =>
  S.Struct({ note: S.optional(S.String) }),
).annotate({
  identifier: "ResetActionConfiguration",
}) as any as S.Schema<ResetActionConfiguration>;
export interface CustomerAction {
  actionName?: CustomerActionName;
  snoozeActionConfiguration?: SnoozeActionConfiguration;
  enableActionConfiguration?: EnableActionConfiguration;
  disableActionConfiguration?: DisableActionConfiguration;
  acknowledgeActionConfiguration?: AcknowledgeActionConfiguration;
  resetActionConfiguration?: ResetActionConfiguration;
}
export const CustomerAction = S.suspend(() =>
  S.Struct({
    actionName: S.optional(CustomerActionName),
    snoozeActionConfiguration: S.optional(SnoozeActionConfiguration),
    enableActionConfiguration: S.optional(EnableActionConfiguration),
    disableActionConfiguration: S.optional(DisableActionConfiguration),
    acknowledgeActionConfiguration: S.optional(AcknowledgeActionConfiguration),
    resetActionConfiguration: S.optional(ResetActionConfiguration),
  }),
).annotate({ identifier: "CustomerAction" }) as any as S.Schema<CustomerAction>;
export type EventType = "STATE_CHANGE" | (string & {});
export const EventType = S.String;
export type TriggerType = "SNOOZE_TIMEOUT" | (string & {});
export const TriggerType = S.String;
export interface StateChangeConfiguration {
  triggerType?: TriggerType;
}
export const StateChangeConfiguration = S.suspend(() =>
  S.Struct({ triggerType: S.optional(TriggerType) }),
).annotate({
  identifier: "StateChangeConfiguration",
}) as any as S.Schema<StateChangeConfiguration>;
export interface SystemEvent {
  eventType?: EventType;
  stateChangeConfiguration?: StateChangeConfiguration;
}
export const SystemEvent = S.suspend(() =>
  S.Struct({
    eventType: S.optional(EventType),
    stateChangeConfiguration: S.optional(StateChangeConfiguration),
  }),
).annotate({ identifier: "SystemEvent" }) as any as S.Schema<SystemEvent>;
export interface AlarmState {
  stateName?: AlarmStateName;
  ruleEvaluation?: RuleEvaluation;
  customerAction?: CustomerAction;
  systemEvent?: SystemEvent;
}
export const AlarmState = S.suspend(() =>
  S.Struct({
    stateName: S.optional(AlarmStateName),
    ruleEvaluation: S.optional(RuleEvaluation),
    customerAction: S.optional(CustomerAction),
    systemEvent: S.optional(SystemEvent),
  }),
).annotate({ identifier: "AlarmState" }) as any as S.Schema<AlarmState>;
export interface Alarm {
  alarmModelName?: string;
  alarmModelVersion?: string;
  keyValue?: string;
  alarmState?: AlarmState;
  severity?: number;
  creationTime?: Date;
  lastUpdateTime?: Date;
}
export const Alarm = S.suspend(() =>
  S.Struct({
    alarmModelName: S.optional(S.String),
    alarmModelVersion: S.optional(S.String),
    keyValue: S.optional(S.String),
    alarmState: S.optional(AlarmState),
    severity: S.optional(S.Number),
    creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Alarm" }) as any as S.Schema<Alarm>;
export interface DescribeAlarmResponse {
  alarm?: Alarm;
}
export const DescribeAlarmResponse = S.suspend(() =>
  S.Struct({ alarm: S.optional(Alarm) }),
).annotate({
  identifier: "DescribeAlarmResponse",
}) as any as S.Schema<DescribeAlarmResponse>;
export interface DescribeDetectorRequest {
  detectorModelName: string;
  keyValue?: string;
}
export const DescribeDetectorRequest = S.suspend(() =>
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
}) as any as S.Schema<DescribeDetectorRequest>;
export interface Variable {
  name: string;
  value: string;
}
export const Variable = S.suspend(() =>
  S.Struct({ name: S.String, value: S.String }),
).annotate({ identifier: "Variable" }) as any as S.Schema<Variable>;
export type Variables = Variable[];
export const Variables = S.Array(Variable);
export interface Timer {
  name: string;
  timestamp: Date;
}
export const Timer = S.suspend(() =>
  S.Struct({
    name: S.String,
    timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "Timer" }) as any as S.Schema<Timer>;
export type Timers = Timer[];
export const Timers = S.Array(Timer);
export interface DetectorState {
  stateName: string;
  variables: Variable[];
  timers: Timer[];
}
export const DetectorState = S.suspend(() =>
  S.Struct({ stateName: S.String, variables: Variables, timers: Timers }),
).annotate({ identifier: "DetectorState" }) as any as S.Schema<DetectorState>;
export interface Detector {
  detectorModelName?: string;
  keyValue?: string;
  detectorModelVersion?: string;
  state?: DetectorState;
  creationTime?: Date;
  lastUpdateTime?: Date;
}
export const Detector = S.suspend(() =>
  S.Struct({
    detectorModelName: S.optional(S.String),
    keyValue: S.optional(S.String),
    detectorModelVersion: S.optional(S.String),
    state: S.optional(DetectorState),
    creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Detector" }) as any as S.Schema<Detector>;
export interface DescribeDetectorResponse {
  detector?: Detector;
}
export const DescribeDetectorResponse = S.suspend(() =>
  S.Struct({ detector: S.optional(Detector) }),
).annotate({
  identifier: "DescribeDetectorResponse",
}) as any as S.Schema<DescribeDetectorResponse>;
export interface ListAlarmsRequest {
  alarmModelName: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListAlarmsRequest = S.suspend(() =>
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
}) as any as S.Schema<ListAlarmsRequest>;
export interface AlarmSummary {
  alarmModelName?: string;
  alarmModelVersion?: string;
  keyValue?: string;
  stateName?: AlarmStateName;
  creationTime?: Date;
  lastUpdateTime?: Date;
}
export const AlarmSummary = S.suspend(() =>
  S.Struct({
    alarmModelName: S.optional(S.String),
    alarmModelVersion: S.optional(S.String),
    keyValue: S.optional(S.String),
    stateName: S.optional(AlarmStateName),
    creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "AlarmSummary" }) as any as S.Schema<AlarmSummary>;
export type AlarmSummaries = AlarmSummary[];
export const AlarmSummaries = S.Array(AlarmSummary);
export interface ListAlarmsResponse {
  alarmSummaries?: AlarmSummary[];
  nextToken?: string;
}
export const ListAlarmsResponse = S.suspend(() =>
  S.Struct({
    alarmSummaries: S.optional(AlarmSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAlarmsResponse",
}) as any as S.Schema<ListAlarmsResponse>;
export interface ListDetectorsRequest {
  detectorModelName: string;
  stateName?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListDetectorsRequest = S.suspend(() =>
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
}) as any as S.Schema<ListDetectorsRequest>;
export interface DetectorStateSummary {
  stateName?: string;
}
export const DetectorStateSummary = S.suspend(() =>
  S.Struct({ stateName: S.optional(S.String) }),
).annotate({
  identifier: "DetectorStateSummary",
}) as any as S.Schema<DetectorStateSummary>;
export interface DetectorSummary {
  detectorModelName?: string;
  keyValue?: string;
  detectorModelVersion?: string;
  state?: DetectorStateSummary;
  creationTime?: Date;
  lastUpdateTime?: Date;
}
export const DetectorSummary = S.suspend(() =>
  S.Struct({
    detectorModelName: S.optional(S.String),
    keyValue: S.optional(S.String),
    detectorModelVersion: S.optional(S.String),
    state: S.optional(DetectorStateSummary),
    creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DetectorSummary",
}) as any as S.Schema<DetectorSummary>;
export type DetectorSummaries = DetectorSummary[];
export const DetectorSummaries = S.Array(DetectorSummary);
export interface ListDetectorsResponse {
  detectorSummaries?: DetectorSummary[];
  nextToken?: string;
}
export const ListDetectorsResponse = S.suspend(() =>
  S.Struct({
    detectorSummaries: S.optional(DetectorSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDetectorsResponse",
}) as any as S.Schema<ListDetectorsResponse>;

//# Errors
export class InternalFailureException extends S.TaggedErrorClass<InternalFailureException>()(
  "InternalFailureException",
  { message: S.optional(S.String) },
).pipe(C.withServerError) {}
export class InvalidRequestException extends S.TaggedErrorClass<InvalidRequestException>()(
  "InvalidRequestException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ServiceUnavailableException extends S.TaggedErrorClass<ServiceUnavailableException>()(
  "ServiceUnavailableException",
  { message: S.optional(S.String) },
).pipe(C.withServerError) {}
export class ThrottlingException extends S.TaggedErrorClass<ThrottlingException>()(
  "ThrottlingException",
  { message: S.optional(S.String) },
).pipe(C.withThrottlingError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}

//# Operations
/**
 * Acknowledges one or more alarms. The alarms change to the `ACKNOWLEDGED` state
 * after you acknowledge them.
 */
export const batchAcknowledgeAlarm: API.OperationMethod<
  BatchAcknowledgeAlarmRequest,
  BatchAcknowledgeAlarmResponse,
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchAcknowledgeAlarmRequest,
  output: BatchAcknowledgeAlarmResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
}));
/**
 * Deletes one or more detectors that were created. When a detector is deleted, its state will be cleared and the detector will be removed from the list of detectors. The deleted detector will no longer appear if referenced in the ListDetectors API call.
 */
export const batchDeleteDetector: API.OperationMethod<
  BatchDeleteDetectorRequest,
  BatchDeleteDetectorResponse,
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchDeleteDetectorRequest,
  output: BatchDeleteDetectorResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
}));
/**
 * Disables one or more alarms. The alarms change to the `DISABLED` state after
 * you disable them.
 */
export const batchDisableAlarm: API.OperationMethod<
  BatchDisableAlarmRequest,
  BatchDisableAlarmResponse,
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchDisableAlarmRequest,
  output: BatchDisableAlarmResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
}));
/**
 * Enables one or more alarms. The alarms change to the `NORMAL` state after you
 * enable them.
 */
export const batchEnableAlarm: API.OperationMethod<
  BatchEnableAlarmRequest,
  BatchEnableAlarmResponse,
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchEnableAlarmRequest,
  output: BatchEnableAlarmResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
}));
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
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchPutMessageRequest,
  output: BatchPutMessageResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
}));
/**
 * Resets one or more alarms. The alarms return to the `NORMAL` state after you
 * reset them.
 */
export const batchResetAlarm: API.OperationMethod<
  BatchResetAlarmRequest,
  BatchResetAlarmResponse,
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchResetAlarmRequest,
  output: BatchResetAlarmResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
}));
/**
 * Changes one or more alarms to the snooze mode. The alarms change to the
 * `SNOOZE_DISABLED` state after you set them to the snooze mode.
 */
export const batchSnoozeAlarm: API.OperationMethod<
  BatchSnoozeAlarmRequest,
  BatchSnoozeAlarmResponse,
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchSnoozeAlarmRequest,
  output: BatchSnoozeAlarmResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
}));
/**
 * Updates the state, variable values, and timer settings of one or more detectors
 * (instances) of a specified detector model.
 */
export const batchUpdateDetector: API.OperationMethod<
  BatchUpdateDetectorRequest,
  BatchUpdateDetectorResponse,
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchUpdateDetectorRequest,
  output: BatchUpdateDetectorResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
}));
/**
 * Retrieves information about an alarm.
 */
export const describeAlarm: API.OperationMethod<
  DescribeAlarmRequest,
  DescribeAlarmResponse,
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeAlarmRequest,
  output: DescribeAlarmResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
}));
/**
 * Returns information about the specified detector (instance).
 */
export const describeDetector: API.OperationMethod<
  DescribeDetectorRequest,
  DescribeDetectorResponse,
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeDetectorRequest,
  output: DescribeDetectorResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
}));
/**
 * Lists one or more alarms. The operation returns only the metadata associated with each
 * alarm.
 */
export const listAlarms: API.OperationMethod<
  ListAlarmsRequest,
  ListAlarmsResponse,
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListAlarmsRequest,
  output: ListAlarmsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
}));
/**
 * Lists detectors (the instances of a detector model).
 */
export const listDetectors: API.OperationMethod<
  ListDetectorsRequest,
  ListDetectorsResponse,
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListDetectorsRequest,
  output: ListDetectorsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
}));
