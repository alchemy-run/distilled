import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_0Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "SWF",
  target: "SimpleWorkflowService",
  version: "2012-01-25",
  sigv4: "swf",
  protocol: awsJson1_0Protocol,
  xmlns: "http://swf.amazonaws.com/doc/2012-01-25",
  rules: (p, _) => {
    const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
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
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e(
              `https://swf.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              `https://swf-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://swf-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true && UseDualStack === false) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://swf-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://swf.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://swf.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class DefaultUndefinedFault
  extends /*@__PURE__*/ TE.TaggedError("DefaultUndefinedFault")<{
    readonly message?: string;
  }> {}
export class DomainAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError("DomainAlreadyExistsFault", [
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class DomainDeprecatedFault
  extends /*@__PURE__*/ TE.TaggedError("DomainDeprecatedFault")<{
    readonly message?: string;
  }> {}
export class LimitExceededFault
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededFault")<{
    readonly message?: string;
  }> {}
export class OperationNotPermittedFault
  extends /*@__PURE__*/ TE.TaggedError("OperationNotPermittedFault")<{
    readonly message?: string;
  }> {}
export class TooManyTagsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsFault",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TypeAlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError("TypeAlreadyExistsFault", [
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class TypeDeprecatedFault
  extends /*@__PURE__*/ TE.TaggedError("TypeDeprecatedFault")<{
    readonly message?: string;
  }> {}
export class TypeNotDeprecatedFault
  extends /*@__PURE__*/ TE.TaggedError("TypeNotDeprecatedFault")<{
    readonly message?: string;
  }> {}
export class UnknownResourceFault
  extends /*@__PURE__*/ TE.TaggedError("UnknownResourceFault")<{
    readonly message?: string;
  }> {}
export class WorkflowExecutionAlreadyStartedFault
  extends /*@__PURE__*/ TE.TaggedError("WorkflowExecutionAlreadyStartedFault")<{
    readonly message?: string;
  }> {}
export type DomainName = string;
export interface ExecutionTimeFilter {
  oldestDate: Date;
  latestDate?: Date;
}
export type WorkflowId = string;
export interface WorkflowExecutionFilter {
  workflowId: string;
}
export type Name = string;
export type VersionOptional = string;
export interface WorkflowTypeFilter {
  name: string;
  version?: string;
}
export type Tag = string;
export interface TagFilter {
  tag: string;
}
export type CloseStatus =
  | "COMPLETED"
  | "FAILED"
  | "CANCELED"
  | "TERMINATED"
  | "CONTINUED_AS_NEW"
  | "TIMED_OUT"
  | (string & {});
export interface CloseStatusFilter {
  status: CloseStatus;
}
export interface CountClosedWorkflowExecutionsInput {
  domain: string;
  startTimeFilter?: ExecutionTimeFilter;
  closeTimeFilter?: ExecutionTimeFilter;
  executionFilter?: WorkflowExecutionFilter;
  typeFilter?: WorkflowTypeFilter;
  tagFilter?: TagFilter;
  closeStatusFilter?: CloseStatusFilter;
}
export type Count = number;
export type Truncated = boolean;
export interface WorkflowExecutionCount {
  count: number;
  truncated?: boolean;
}
export interface CountOpenWorkflowExecutionsInput {
  domain: string;
  startTimeFilter: ExecutionTimeFilter;
  typeFilter?: WorkflowTypeFilter;
  tagFilter?: TagFilter;
  executionFilter?: WorkflowExecutionFilter;
}
export interface TaskList {
  name: string;
}
export interface CountPendingActivityTasksInput {
  domain: string;
  taskList: TaskList;
}
export interface PendingTaskCount {
  count: number;
  truncated?: boolean;
}
export interface CountPendingDecisionTasksInput {
  domain: string;
  taskList: TaskList;
}
export type Version = string;
export interface ActivityType {
  name: string;
  version: string;
}
export interface DeleteActivityTypeInput {
  domain: string;
  activityType: ActivityType;
}
export interface DeleteActivityTypeResponse {}
export interface WorkflowType {
  name: string;
  version: string;
}
export interface DeleteWorkflowTypeInput {
  domain: string;
  workflowType: WorkflowType;
}
export interface DeleteWorkflowTypeResponse {}
export interface DeprecateActivityTypeInput {
  domain: string;
  activityType: ActivityType;
}
export interface DeprecateActivityTypeResponse {}
export interface DeprecateDomainInput {
  name: string;
}
export interface DeprecateDomainResponse {}
export interface DeprecateWorkflowTypeInput {
  domain: string;
  workflowType: WorkflowType;
}
export interface DeprecateWorkflowTypeResponse {}
export interface DescribeActivityTypeInput {
  domain: string;
  activityType: ActivityType;
}
export type RegistrationStatus = "REGISTERED" | "DEPRECATED" | (string & {});
export type Description = string;
export interface ActivityTypeInfo {
  activityType: ActivityType;
  status: RegistrationStatus;
  description?: string;
  creationDate: Date;
  deprecationDate?: Date;
}
export type DurationInSecondsOptional = string;
export type TaskPriority = string;
export interface ActivityTypeConfiguration {
  defaultTaskStartToCloseTimeout?: string;
  defaultTaskHeartbeatTimeout?: string;
  defaultTaskList?: TaskList;
  defaultTaskPriority?: string;
  defaultTaskScheduleToStartTimeout?: string;
  defaultTaskScheduleToCloseTimeout?: string;
}
export interface ActivityTypeDetail {
  typeInfo: ActivityTypeInfo;
  configuration: ActivityTypeConfiguration;
}
export interface DescribeDomainInput {
  name: string;
}
export type Arn = string;
export interface DomainInfo {
  name: string;
  status: RegistrationStatus;
  description?: string;
  arn?: string;
}
export type DurationInDays = string;
export interface DomainConfiguration {
  workflowExecutionRetentionPeriodInDays: string;
}
export interface DomainDetail {
  domainInfo: DomainInfo;
  configuration: DomainConfiguration;
}
export type WorkflowRunId = string;
export interface WorkflowExecution {
  workflowId: string;
  runId: string;
}
export interface DescribeWorkflowExecutionInput {
  domain: string;
  execution: WorkflowExecution;
}
export type ExecutionStatus = "OPEN" | "CLOSED" | (string & {});
export type TagList = string[];
export type Canceled = boolean;
export interface WorkflowExecutionInfo {
  execution: WorkflowExecution;
  workflowType: WorkflowType;
  startTimestamp: Date;
  closeTimestamp?: Date;
  executionStatus: ExecutionStatus;
  closeStatus?: CloseStatus;
  parent?: WorkflowExecution;
  tagList?: string[];
  cancelRequested?: boolean;
}
export type DurationInSeconds = string;
export type ChildPolicy =
  | "TERMINATE"
  | "REQUEST_CANCEL"
  | "ABANDON"
  | (string & {});
export interface WorkflowExecutionConfiguration {
  taskStartToCloseTimeout: string;
  executionStartToCloseTimeout: string;
  taskList: TaskList;
  taskPriority?: string;
  childPolicy: ChildPolicy;
  lambdaRole?: string;
}
export type OpenDecisionTasksCount = number;
export interface WorkflowExecutionOpenCounts {
  openActivityTasks: number;
  openDecisionTasks: number;
  openTimers: number;
  openChildWorkflowExecutions: number;
  openLambdaFunctions?: number;
}
export type Data = string;
export interface WorkflowExecutionDetail {
  executionInfo: WorkflowExecutionInfo;
  executionConfiguration: WorkflowExecutionConfiguration;
  openCounts: WorkflowExecutionOpenCounts;
  latestActivityTaskTimestamp?: Date;
  latestExecutionContext?: string;
}
export interface DescribeWorkflowTypeInput {
  domain: string;
  workflowType: WorkflowType;
}
export interface WorkflowTypeInfo {
  workflowType: WorkflowType;
  status: RegistrationStatus;
  description?: string;
  creationDate: Date;
  deprecationDate?: Date;
}
export interface WorkflowTypeConfiguration {
  defaultTaskStartToCloseTimeout?: string;
  defaultExecutionStartToCloseTimeout?: string;
  defaultTaskList?: TaskList;
  defaultTaskPriority?: string;
  defaultChildPolicy?: ChildPolicy;
  defaultLambdaRole?: string;
}
export interface WorkflowTypeDetail {
  typeInfo: WorkflowTypeInfo;
  configuration: WorkflowTypeConfiguration;
}
export type PageToken = string;
export type PageSize = number;
export type ReverseOrder = boolean;
export interface GetWorkflowExecutionHistoryInput {
  domain: string;
  execution: WorkflowExecution;
  nextPageToken?: string;
  maximumPageSize?: number;
  reverseOrder?: boolean;
}
export type EventType =
  | "WorkflowExecutionStarted"
  | "WorkflowExecutionCancelRequested"
  | "WorkflowExecutionCompleted"
  | "CompleteWorkflowExecutionFailed"
  | "WorkflowExecutionFailed"
  | "FailWorkflowExecutionFailed"
  | "WorkflowExecutionTimedOut"
  | "WorkflowExecutionCanceled"
  | "CancelWorkflowExecutionFailed"
  | "WorkflowExecutionContinuedAsNew"
  | "ContinueAsNewWorkflowExecutionFailed"
  | "WorkflowExecutionTerminated"
  | "DecisionTaskScheduled"
  | "DecisionTaskStarted"
  | "DecisionTaskCompleted"
  | "DecisionTaskTimedOut"
  | "ActivityTaskScheduled"
  | "ScheduleActivityTaskFailed"
  | "ActivityTaskStarted"
  | "ActivityTaskCompleted"
  | "ActivityTaskFailed"
  | "ActivityTaskTimedOut"
  | "ActivityTaskCanceled"
  | "ActivityTaskCancelRequested"
  | "RequestCancelActivityTaskFailed"
  | "WorkflowExecutionSignaled"
  | "MarkerRecorded"
  | "RecordMarkerFailed"
  | "TimerStarted"
  | "StartTimerFailed"
  | "TimerFired"
  | "TimerCanceled"
  | "CancelTimerFailed"
  | "StartChildWorkflowExecutionInitiated"
  | "StartChildWorkflowExecutionFailed"
  | "ChildWorkflowExecutionStarted"
  | "ChildWorkflowExecutionCompleted"
  | "ChildWorkflowExecutionFailed"
  | "ChildWorkflowExecutionTimedOut"
  | "ChildWorkflowExecutionCanceled"
  | "ChildWorkflowExecutionTerminated"
  | "SignalExternalWorkflowExecutionInitiated"
  | "SignalExternalWorkflowExecutionFailed"
  | "ExternalWorkflowExecutionSignaled"
  | "RequestCancelExternalWorkflowExecutionInitiated"
  | "RequestCancelExternalWorkflowExecutionFailed"
  | "ExternalWorkflowExecutionCancelRequested"
  | "LambdaFunctionScheduled"
  | "LambdaFunctionStarted"
  | "LambdaFunctionCompleted"
  | "LambdaFunctionFailed"
  | "LambdaFunctionTimedOut"
  | "ScheduleLambdaFunctionFailed"
  | "StartLambdaFunctionFailed"
  | (string & {});
export type EventId = number;
export type WorkflowRunIdOptional = string;
export interface WorkflowExecutionStartedEventAttributes {
  input?: string;
  executionStartToCloseTimeout?: string;
  taskStartToCloseTimeout?: string;
  childPolicy: ChildPolicy;
  taskList: TaskList;
  taskPriority?: string;
  workflowType: WorkflowType;
  tagList?: string[];
  continuedExecutionRunId?: string;
  parentWorkflowExecution?: WorkflowExecution;
  parentInitiatedEventId?: number;
  lambdaRole?: string;
}
export interface WorkflowExecutionCompletedEventAttributes {
  result?: string;
  decisionTaskCompletedEventId: number;
}
export type CompleteWorkflowExecutionFailedCause =
  | "UNHANDLED_DECISION"
  | "OPERATION_NOT_PERMITTED"
  | (string & {});
export interface CompleteWorkflowExecutionFailedEventAttributes {
  cause: CompleteWorkflowExecutionFailedCause;
  decisionTaskCompletedEventId: number;
}
export type FailureReason = string;
export interface WorkflowExecutionFailedEventAttributes {
  reason?: string;
  details?: string;
  decisionTaskCompletedEventId: number;
}
export type FailWorkflowExecutionFailedCause =
  | "UNHANDLED_DECISION"
  | "OPERATION_NOT_PERMITTED"
  | (string & {});
export interface FailWorkflowExecutionFailedEventAttributes {
  cause: FailWorkflowExecutionFailedCause;
  decisionTaskCompletedEventId: number;
}
export type WorkflowExecutionTimeoutType = "START_TO_CLOSE" | (string & {});
export interface WorkflowExecutionTimedOutEventAttributes {
  timeoutType: WorkflowExecutionTimeoutType;
  childPolicy: ChildPolicy;
}
export interface WorkflowExecutionCanceledEventAttributes {
  details?: string;
  decisionTaskCompletedEventId: number;
}
export type CancelWorkflowExecutionFailedCause =
  | "UNHANDLED_DECISION"
  | "OPERATION_NOT_PERMITTED"
  | (string & {});
export interface CancelWorkflowExecutionFailedEventAttributes {
  cause: CancelWorkflowExecutionFailedCause;
  decisionTaskCompletedEventId: number;
}
export interface WorkflowExecutionContinuedAsNewEventAttributes {
  input?: string;
  decisionTaskCompletedEventId: number;
  newExecutionRunId: string;
  executionStartToCloseTimeout?: string;
  taskList: TaskList;
  taskPriority?: string;
  taskStartToCloseTimeout?: string;
  childPolicy: ChildPolicy;
  tagList?: string[];
  workflowType: WorkflowType;
  lambdaRole?: string;
}
export type ContinueAsNewWorkflowExecutionFailedCause =
  | "UNHANDLED_DECISION"
  | "WORKFLOW_TYPE_DEPRECATED"
  | "WORKFLOW_TYPE_DOES_NOT_EXIST"
  | "DEFAULT_EXECUTION_START_TO_CLOSE_TIMEOUT_UNDEFINED"
  | "DEFAULT_TASK_START_TO_CLOSE_TIMEOUT_UNDEFINED"
  | "DEFAULT_TASK_LIST_UNDEFINED"
  | "DEFAULT_CHILD_POLICY_UNDEFINED"
  | "CONTINUE_AS_NEW_WORKFLOW_EXECUTION_RATE_EXCEEDED"
  | "OPERATION_NOT_PERMITTED"
  | (string & {});
export interface ContinueAsNewWorkflowExecutionFailedEventAttributes {
  cause: ContinueAsNewWorkflowExecutionFailedCause;
  decisionTaskCompletedEventId: number;
}
export type TerminateReason = string;
export type WorkflowExecutionTerminatedCause =
  | "CHILD_POLICY_APPLIED"
  | "EVENT_LIMIT_EXCEEDED"
  | "OPERATOR_INITIATED"
  | (string & {});
export interface WorkflowExecutionTerminatedEventAttributes {
  reason?: string;
  details?: string;
  childPolicy: ChildPolicy;
  cause?: WorkflowExecutionTerminatedCause;
}
export type WorkflowExecutionCancelRequestedCause =
  | "CHILD_POLICY_APPLIED"
  | (string & {});
export interface WorkflowExecutionCancelRequestedEventAttributes {
  externalWorkflowExecution?: WorkflowExecution;
  externalInitiatedEventId?: number;
  cause?: WorkflowExecutionCancelRequestedCause;
}
export interface DecisionTaskScheduledEventAttributes {
  taskList: TaskList;
  taskPriority?: string;
  startToCloseTimeout?: string;
  scheduleToStartTimeout?: string;
}
export type Identity = string;
export interface DecisionTaskStartedEventAttributes {
  identity?: string;
  scheduledEventId: number;
}
export interface DecisionTaskCompletedEventAttributes {
  executionContext?: string;
  scheduledEventId: number;
  startedEventId: number;
  taskList?: TaskList;
  taskListScheduleToStartTimeout?: string;
}
export type DecisionTaskTimeoutType =
  | "START_TO_CLOSE"
  | "SCHEDULE_TO_START"
  | (string & {});
export interface DecisionTaskTimedOutEventAttributes {
  timeoutType: DecisionTaskTimeoutType;
  scheduledEventId: number;
  startedEventId: number;
}
export type ActivityId = string;
export interface ActivityTaskScheduledEventAttributes {
  activityType: ActivityType;
  activityId: string;
  input?: string;
  control?: string;
  scheduleToStartTimeout?: string;
  scheduleToCloseTimeout?: string;
  startToCloseTimeout?: string;
  taskList: TaskList;
  taskPriority?: string;
  decisionTaskCompletedEventId: number;
  heartbeatTimeout?: string;
}
export interface ActivityTaskStartedEventAttributes {
  identity?: string;
  scheduledEventId: number;
}
export interface ActivityTaskCompletedEventAttributes {
  result?: string;
  scheduledEventId: number;
  startedEventId: number;
}
export interface ActivityTaskFailedEventAttributes {
  reason?: string;
  details?: string;
  scheduledEventId: number;
  startedEventId: number;
}
export type ActivityTaskTimeoutType =
  | "START_TO_CLOSE"
  | "SCHEDULE_TO_START"
  | "SCHEDULE_TO_CLOSE"
  | "HEARTBEAT"
  | (string & {});
export type LimitedData = string;
export interface ActivityTaskTimedOutEventAttributes {
  timeoutType: ActivityTaskTimeoutType;
  scheduledEventId: number;
  startedEventId: number;
  details?: string;
}
export interface ActivityTaskCanceledEventAttributes {
  details?: string;
  scheduledEventId: number;
  startedEventId: number;
  latestCancelRequestedEventId?: number;
}
export interface ActivityTaskCancelRequestedEventAttributes {
  decisionTaskCompletedEventId: number;
  activityId: string;
}
export type SignalName = string;
export interface WorkflowExecutionSignaledEventAttributes {
  signalName: string;
  input?: string;
  externalWorkflowExecution?: WorkflowExecution;
  externalInitiatedEventId?: number;
}
export type MarkerName = string;
export interface MarkerRecordedEventAttributes {
  markerName: string;
  details?: string;
  decisionTaskCompletedEventId: number;
}
export type RecordMarkerFailedCause = "OPERATION_NOT_PERMITTED" | (string & {});
export interface RecordMarkerFailedEventAttributes {
  markerName: string;
  cause: RecordMarkerFailedCause;
  decisionTaskCompletedEventId: number;
}
export type TimerId = string;
export interface TimerStartedEventAttributes {
  timerId: string;
  control?: string;
  startToFireTimeout: string;
  decisionTaskCompletedEventId: number;
}
export interface TimerFiredEventAttributes {
  timerId: string;
  startedEventId: number;
}
export interface TimerCanceledEventAttributes {
  timerId: string;
  startedEventId: number;
  decisionTaskCompletedEventId: number;
}
export interface StartChildWorkflowExecutionInitiatedEventAttributes {
  workflowId: string;
  workflowType: WorkflowType;
  control?: string;
  input?: string;
  executionStartToCloseTimeout?: string;
  taskList: TaskList;
  taskPriority?: string;
  decisionTaskCompletedEventId: number;
  childPolicy: ChildPolicy;
  taskStartToCloseTimeout?: string;
  tagList?: string[];
  lambdaRole?: string;
}
export interface ChildWorkflowExecutionStartedEventAttributes {
  workflowExecution: WorkflowExecution;
  workflowType: WorkflowType;
  initiatedEventId: number;
}
export interface ChildWorkflowExecutionCompletedEventAttributes {
  workflowExecution: WorkflowExecution;
  workflowType: WorkflowType;
  result?: string;
  initiatedEventId: number;
  startedEventId: number;
}
export interface ChildWorkflowExecutionFailedEventAttributes {
  workflowExecution: WorkflowExecution;
  workflowType: WorkflowType;
  reason?: string;
  details?: string;
  initiatedEventId: number;
  startedEventId: number;
}
export interface ChildWorkflowExecutionTimedOutEventAttributes {
  workflowExecution: WorkflowExecution;
  workflowType: WorkflowType;
  timeoutType: WorkflowExecutionTimeoutType;
  initiatedEventId: number;
  startedEventId: number;
}
export interface ChildWorkflowExecutionCanceledEventAttributes {
  workflowExecution: WorkflowExecution;
  workflowType: WorkflowType;
  details?: string;
  initiatedEventId: number;
  startedEventId: number;
}
export interface ChildWorkflowExecutionTerminatedEventAttributes {
  workflowExecution: WorkflowExecution;
  workflowType: WorkflowType;
  initiatedEventId: number;
  startedEventId: number;
}
export interface SignalExternalWorkflowExecutionInitiatedEventAttributes {
  workflowId: string;
  runId?: string;
  signalName: string;
  input?: string;
  decisionTaskCompletedEventId: number;
  control?: string;
}
export interface ExternalWorkflowExecutionSignaledEventAttributes {
  workflowExecution: WorkflowExecution;
  initiatedEventId: number;
}
export type SignalExternalWorkflowExecutionFailedCause =
  | "UNKNOWN_EXTERNAL_WORKFLOW_EXECUTION"
  | "SIGNAL_EXTERNAL_WORKFLOW_EXECUTION_RATE_EXCEEDED"
  | "OPERATION_NOT_PERMITTED"
  | (string & {});
export interface SignalExternalWorkflowExecutionFailedEventAttributes {
  workflowId: string;
  runId?: string;
  cause: SignalExternalWorkflowExecutionFailedCause;
  initiatedEventId: number;
  decisionTaskCompletedEventId: number;
  control?: string;
}
export interface ExternalWorkflowExecutionCancelRequestedEventAttributes {
  workflowExecution: WorkflowExecution;
  initiatedEventId: number;
}
export interface RequestCancelExternalWorkflowExecutionInitiatedEventAttributes {
  workflowId: string;
  runId?: string;
  decisionTaskCompletedEventId: number;
  control?: string;
}
export type RequestCancelExternalWorkflowExecutionFailedCause =
  | "UNKNOWN_EXTERNAL_WORKFLOW_EXECUTION"
  | "REQUEST_CANCEL_EXTERNAL_WORKFLOW_EXECUTION_RATE_EXCEEDED"
  | "OPERATION_NOT_PERMITTED"
  | (string & {});
export interface RequestCancelExternalWorkflowExecutionFailedEventAttributes {
  workflowId: string;
  runId?: string;
  cause: RequestCancelExternalWorkflowExecutionFailedCause;
  initiatedEventId: number;
  decisionTaskCompletedEventId: number;
  control?: string;
}
export type ScheduleActivityTaskFailedCause =
  | "ACTIVITY_TYPE_DEPRECATED"
  | "ACTIVITY_TYPE_DOES_NOT_EXIST"
  | "ACTIVITY_ID_ALREADY_IN_USE"
  | "OPEN_ACTIVITIES_LIMIT_EXCEEDED"
  | "ACTIVITY_CREATION_RATE_EXCEEDED"
  | "DEFAULT_SCHEDULE_TO_CLOSE_TIMEOUT_UNDEFINED"
  | "DEFAULT_TASK_LIST_UNDEFINED"
  | "DEFAULT_SCHEDULE_TO_START_TIMEOUT_UNDEFINED"
  | "DEFAULT_START_TO_CLOSE_TIMEOUT_UNDEFINED"
  | "DEFAULT_HEARTBEAT_TIMEOUT_UNDEFINED"
  | "OPERATION_NOT_PERMITTED"
  | (string & {});
export interface ScheduleActivityTaskFailedEventAttributes {
  activityType: ActivityType;
  activityId: string;
  cause: ScheduleActivityTaskFailedCause;
  decisionTaskCompletedEventId: number;
}
export type RequestCancelActivityTaskFailedCause =
  | "ACTIVITY_ID_UNKNOWN"
  | "OPERATION_NOT_PERMITTED"
  | (string & {});
export interface RequestCancelActivityTaskFailedEventAttributes {
  activityId: string;
  cause: RequestCancelActivityTaskFailedCause;
  decisionTaskCompletedEventId: number;
}
export type StartTimerFailedCause =
  | "TIMER_ID_ALREADY_IN_USE"
  | "OPEN_TIMERS_LIMIT_EXCEEDED"
  | "TIMER_CREATION_RATE_EXCEEDED"
  | "OPERATION_NOT_PERMITTED"
  | (string & {});
export interface StartTimerFailedEventAttributes {
  timerId: string;
  cause: StartTimerFailedCause;
  decisionTaskCompletedEventId: number;
}
export type CancelTimerFailedCause =
  | "TIMER_ID_UNKNOWN"
  | "OPERATION_NOT_PERMITTED"
  | (string & {});
export interface CancelTimerFailedEventAttributes {
  timerId: string;
  cause: CancelTimerFailedCause;
  decisionTaskCompletedEventId: number;
}
export type StartChildWorkflowExecutionFailedCause =
  | "WORKFLOW_TYPE_DOES_NOT_EXIST"
  | "WORKFLOW_TYPE_DEPRECATED"
  | "OPEN_CHILDREN_LIMIT_EXCEEDED"
  | "OPEN_WORKFLOWS_LIMIT_EXCEEDED"
  | "CHILD_CREATION_RATE_EXCEEDED"
  | "WORKFLOW_ALREADY_RUNNING"
  | "DEFAULT_EXECUTION_START_TO_CLOSE_TIMEOUT_UNDEFINED"
  | "DEFAULT_TASK_LIST_UNDEFINED"
  | "DEFAULT_TASK_START_TO_CLOSE_TIMEOUT_UNDEFINED"
  | "DEFAULT_CHILD_POLICY_UNDEFINED"
  | "OPERATION_NOT_PERMITTED"
  | (string & {});
export interface StartChildWorkflowExecutionFailedEventAttributes {
  workflowType: WorkflowType;
  cause: StartChildWorkflowExecutionFailedCause;
  workflowId: string;
  initiatedEventId: number;
  decisionTaskCompletedEventId: number;
  control?: string;
}
export type FunctionId = string;
export type FunctionName = string;
export type FunctionInput = string;
export interface LambdaFunctionScheduledEventAttributes {
  id: string;
  name: string;
  control?: string;
  input?: string;
  startToCloseTimeout?: string;
  decisionTaskCompletedEventId: number;
}
export interface LambdaFunctionStartedEventAttributes {
  scheduledEventId: number;
}
export interface LambdaFunctionCompletedEventAttributes {
  scheduledEventId: number;
  startedEventId: number;
  result?: string;
}
export interface LambdaFunctionFailedEventAttributes {
  scheduledEventId: number;
  startedEventId: number;
  reason?: string;
  details?: string;
}
export type LambdaFunctionTimeoutType = "START_TO_CLOSE" | (string & {});
export interface LambdaFunctionTimedOutEventAttributes {
  scheduledEventId: number;
  startedEventId: number;
  timeoutType?: LambdaFunctionTimeoutType;
}
export type ScheduleLambdaFunctionFailedCause =
  | "ID_ALREADY_IN_USE"
  | "OPEN_LAMBDA_FUNCTIONS_LIMIT_EXCEEDED"
  | "LAMBDA_FUNCTION_CREATION_RATE_EXCEEDED"
  | "LAMBDA_SERVICE_NOT_AVAILABLE_IN_REGION"
  | (string & {});
export interface ScheduleLambdaFunctionFailedEventAttributes {
  id: string;
  name: string;
  cause: ScheduleLambdaFunctionFailedCause;
  decisionTaskCompletedEventId: number;
}
export type StartLambdaFunctionFailedCause =
  | "ASSUME_ROLE_FAILED"
  | (string & {});
export type CauseMessage = string;
export interface StartLambdaFunctionFailedEventAttributes {
  scheduledEventId?: number;
  cause?: StartLambdaFunctionFailedCause;
  message?: string;
}
export interface HistoryEvent {
  eventTimestamp: Date;
  eventType: EventType;
  eventId: number;
  workflowExecutionStartedEventAttributes?: WorkflowExecutionStartedEventAttributes;
  workflowExecutionCompletedEventAttributes?: WorkflowExecutionCompletedEventAttributes;
  completeWorkflowExecutionFailedEventAttributes?: CompleteWorkflowExecutionFailedEventAttributes;
  workflowExecutionFailedEventAttributes?: WorkflowExecutionFailedEventAttributes;
  failWorkflowExecutionFailedEventAttributes?: FailWorkflowExecutionFailedEventAttributes;
  workflowExecutionTimedOutEventAttributes?: WorkflowExecutionTimedOutEventAttributes;
  workflowExecutionCanceledEventAttributes?: WorkflowExecutionCanceledEventAttributes;
  cancelWorkflowExecutionFailedEventAttributes?: CancelWorkflowExecutionFailedEventAttributes;
  workflowExecutionContinuedAsNewEventAttributes?: WorkflowExecutionContinuedAsNewEventAttributes;
  continueAsNewWorkflowExecutionFailedEventAttributes?: ContinueAsNewWorkflowExecutionFailedEventAttributes;
  workflowExecutionTerminatedEventAttributes?: WorkflowExecutionTerminatedEventAttributes;
  workflowExecutionCancelRequestedEventAttributes?: WorkflowExecutionCancelRequestedEventAttributes;
  decisionTaskScheduledEventAttributes?: DecisionTaskScheduledEventAttributes;
  decisionTaskStartedEventAttributes?: DecisionTaskStartedEventAttributes;
  decisionTaskCompletedEventAttributes?: DecisionTaskCompletedEventAttributes;
  decisionTaskTimedOutEventAttributes?: DecisionTaskTimedOutEventAttributes;
  activityTaskScheduledEventAttributes?: ActivityTaskScheduledEventAttributes;
  activityTaskStartedEventAttributes?: ActivityTaskStartedEventAttributes;
  activityTaskCompletedEventAttributes?: ActivityTaskCompletedEventAttributes;
  activityTaskFailedEventAttributes?: ActivityTaskFailedEventAttributes;
  activityTaskTimedOutEventAttributes?: ActivityTaskTimedOutEventAttributes;
  activityTaskCanceledEventAttributes?: ActivityTaskCanceledEventAttributes;
  activityTaskCancelRequestedEventAttributes?: ActivityTaskCancelRequestedEventAttributes;
  workflowExecutionSignaledEventAttributes?: WorkflowExecutionSignaledEventAttributes;
  markerRecordedEventAttributes?: MarkerRecordedEventAttributes;
  recordMarkerFailedEventAttributes?: RecordMarkerFailedEventAttributes;
  timerStartedEventAttributes?: TimerStartedEventAttributes;
  timerFiredEventAttributes?: TimerFiredEventAttributes;
  timerCanceledEventAttributes?: TimerCanceledEventAttributes;
  startChildWorkflowExecutionInitiatedEventAttributes?: StartChildWorkflowExecutionInitiatedEventAttributes;
  childWorkflowExecutionStartedEventAttributes?: ChildWorkflowExecutionStartedEventAttributes;
  childWorkflowExecutionCompletedEventAttributes?: ChildWorkflowExecutionCompletedEventAttributes;
  childWorkflowExecutionFailedEventAttributes?: ChildWorkflowExecutionFailedEventAttributes;
  childWorkflowExecutionTimedOutEventAttributes?: ChildWorkflowExecutionTimedOutEventAttributes;
  childWorkflowExecutionCanceledEventAttributes?: ChildWorkflowExecutionCanceledEventAttributes;
  childWorkflowExecutionTerminatedEventAttributes?: ChildWorkflowExecutionTerminatedEventAttributes;
  signalExternalWorkflowExecutionInitiatedEventAttributes?: SignalExternalWorkflowExecutionInitiatedEventAttributes;
  externalWorkflowExecutionSignaledEventAttributes?: ExternalWorkflowExecutionSignaledEventAttributes;
  signalExternalWorkflowExecutionFailedEventAttributes?: SignalExternalWorkflowExecutionFailedEventAttributes;
  externalWorkflowExecutionCancelRequestedEventAttributes?: ExternalWorkflowExecutionCancelRequestedEventAttributes;
  requestCancelExternalWorkflowExecutionInitiatedEventAttributes?: RequestCancelExternalWorkflowExecutionInitiatedEventAttributes;
  requestCancelExternalWorkflowExecutionFailedEventAttributes?: RequestCancelExternalWorkflowExecutionFailedEventAttributes;
  scheduleActivityTaskFailedEventAttributes?: ScheduleActivityTaskFailedEventAttributes;
  requestCancelActivityTaskFailedEventAttributes?: RequestCancelActivityTaskFailedEventAttributes;
  startTimerFailedEventAttributes?: StartTimerFailedEventAttributes;
  cancelTimerFailedEventAttributes?: CancelTimerFailedEventAttributes;
  startChildWorkflowExecutionFailedEventAttributes?: StartChildWorkflowExecutionFailedEventAttributes;
  lambdaFunctionScheduledEventAttributes?: LambdaFunctionScheduledEventAttributes;
  lambdaFunctionStartedEventAttributes?: LambdaFunctionStartedEventAttributes;
  lambdaFunctionCompletedEventAttributes?: LambdaFunctionCompletedEventAttributes;
  lambdaFunctionFailedEventAttributes?: LambdaFunctionFailedEventAttributes;
  lambdaFunctionTimedOutEventAttributes?: LambdaFunctionTimedOutEventAttributes;
  scheduleLambdaFunctionFailedEventAttributes?: ScheduleLambdaFunctionFailedEventAttributes;
  startLambdaFunctionFailedEventAttributes?: StartLambdaFunctionFailedEventAttributes;
}
export type HistoryEventList = HistoryEvent[];
export interface History {
  events: HistoryEvent[];
  nextPageToken?: string;
}
export interface ListActivityTypesInput {
  domain: string;
  name?: string;
  registrationStatus: RegistrationStatus;
  nextPageToken?: string;
  maximumPageSize?: number;
  reverseOrder?: boolean;
}
export type ActivityTypeInfoList = ActivityTypeInfo[];
export interface ActivityTypeInfos {
  typeInfos: ActivityTypeInfo[];
  nextPageToken?: string;
}
export interface ListClosedWorkflowExecutionsInput {
  domain: string;
  startTimeFilter?: ExecutionTimeFilter;
  closeTimeFilter?: ExecutionTimeFilter;
  executionFilter?: WorkflowExecutionFilter;
  closeStatusFilter?: CloseStatusFilter;
  typeFilter?: WorkflowTypeFilter;
  tagFilter?: TagFilter;
  nextPageToken?: string;
  maximumPageSize?: number;
  reverseOrder?: boolean;
}
export type WorkflowExecutionInfoList = WorkflowExecutionInfo[];
export interface WorkflowExecutionInfos {
  executionInfos: WorkflowExecutionInfo[];
  nextPageToken?: string;
}
export interface ListDomainsInput {
  nextPageToken?: string;
  registrationStatus: RegistrationStatus;
  maximumPageSize?: number;
  reverseOrder?: boolean;
}
export type DomainInfoList = DomainInfo[];
export interface DomainInfos {
  domainInfos: DomainInfo[];
  nextPageToken?: string;
}
export interface ListOpenWorkflowExecutionsInput {
  domain: string;
  startTimeFilter: ExecutionTimeFilter;
  typeFilter?: WorkflowTypeFilter;
  tagFilter?: TagFilter;
  nextPageToken?: string;
  maximumPageSize?: number;
  reverseOrder?: boolean;
  executionFilter?: WorkflowExecutionFilter;
}
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export type ResourceTagKey = string;
export type ResourceTagValue = string;
export interface ResourceTag {
  key: string;
  value?: string;
}
export type ResourceTagList = ResourceTag[];
export interface ListTagsForResourceOutput {
  tags?: ResourceTag[];
}
export interface ListWorkflowTypesInput {
  domain: string;
  name?: string;
  registrationStatus: RegistrationStatus;
  nextPageToken?: string;
  maximumPageSize?: number;
  reverseOrder?: boolean;
}
export type WorkflowTypeInfoList = WorkflowTypeInfo[];
export interface WorkflowTypeInfos {
  typeInfos: WorkflowTypeInfo[];
  nextPageToken?: string;
}
export interface PollForActivityTaskInput {
  domain: string;
  taskList: TaskList;
  identity?: string;
}
export type TaskToken = string;
export interface ActivityTask {
  taskToken: string;
  activityId: string;
  startedEventId: number;
  workflowExecution: WorkflowExecution;
  activityType: ActivityType;
  input?: string;
}
export type StartAtPreviousStartedEvent = boolean;
export interface PollForDecisionTaskInput {
  domain: string;
  taskList: TaskList;
  identity?: string;
  nextPageToken?: string;
  maximumPageSize?: number;
  reverseOrder?: boolean;
  startAtPreviousStartedEvent?: boolean;
}
export interface DecisionTask {
  taskToken: string;
  startedEventId: number;
  workflowExecution: WorkflowExecution;
  workflowType: WorkflowType;
  events: HistoryEvent[];
  nextPageToken?: string;
  previousStartedEventId?: number;
}
export interface RecordActivityTaskHeartbeatInput {
  taskToken: string;
  details?: string;
}
export interface ActivityTaskStatus {
  cancelRequested: boolean;
}
export interface RegisterActivityTypeInput {
  domain: string;
  name: string;
  version: string;
  description?: string;
  defaultTaskStartToCloseTimeout?: string;
  defaultTaskHeartbeatTimeout?: string;
  defaultTaskList?: TaskList;
  defaultTaskPriority?: string;
  defaultTaskScheduleToStartTimeout?: string;
  defaultTaskScheduleToCloseTimeout?: string;
}
export interface RegisterActivityTypeResponse {}
export interface RegisterDomainInput {
  name: string;
  description?: string;
  workflowExecutionRetentionPeriodInDays: string;
  tags?: ResourceTag[];
}
export interface RegisterDomainResponse {}
export interface RegisterWorkflowTypeInput {
  domain: string;
  name: string;
  version: string;
  description?: string;
  defaultTaskStartToCloseTimeout?: string;
  defaultExecutionStartToCloseTimeout?: string;
  defaultTaskList?: TaskList;
  defaultTaskPriority?: string;
  defaultChildPolicy?: ChildPolicy;
  defaultLambdaRole?: string;
}
export interface RegisterWorkflowTypeResponse {}
export interface RequestCancelWorkflowExecutionInput {
  domain: string;
  workflowId: string;
  runId?: string;
}
export interface RequestCancelWorkflowExecutionResponse {}
export interface RespondActivityTaskCanceledInput {
  taskToken: string;
  details?: string;
}
export interface RespondActivityTaskCanceledResponse {}
export interface RespondActivityTaskCompletedInput {
  taskToken: string;
  result?: string;
}
export interface RespondActivityTaskCompletedResponse {}
export interface RespondActivityTaskFailedInput {
  taskToken: string;
  reason?: string;
  details?: string;
}
export interface RespondActivityTaskFailedResponse {}
export type DecisionType =
  | "ScheduleActivityTask"
  | "RequestCancelActivityTask"
  | "CompleteWorkflowExecution"
  | "FailWorkflowExecution"
  | "CancelWorkflowExecution"
  | "ContinueAsNewWorkflowExecution"
  | "RecordMarker"
  | "StartTimer"
  | "CancelTimer"
  | "SignalExternalWorkflowExecution"
  | "RequestCancelExternalWorkflowExecution"
  | "StartChildWorkflowExecution"
  | "ScheduleLambdaFunction"
  | (string & {});
export interface ScheduleActivityTaskDecisionAttributes {
  activityType: ActivityType;
  activityId: string;
  control?: string;
  input?: string;
  scheduleToCloseTimeout?: string;
  taskList?: TaskList;
  taskPriority?: string;
  scheduleToStartTimeout?: string;
  startToCloseTimeout?: string;
  heartbeatTimeout?: string;
}
export interface RequestCancelActivityTaskDecisionAttributes {
  activityId: string;
}
export interface CompleteWorkflowExecutionDecisionAttributes {
  result?: string;
}
export interface FailWorkflowExecutionDecisionAttributes {
  reason?: string;
  details?: string;
}
export interface CancelWorkflowExecutionDecisionAttributes {
  details?: string;
}
export interface ContinueAsNewWorkflowExecutionDecisionAttributes {
  input?: string;
  executionStartToCloseTimeout?: string;
  taskList?: TaskList;
  taskPriority?: string;
  taskStartToCloseTimeout?: string;
  childPolicy?: ChildPolicy;
  tagList?: string[];
  workflowTypeVersion?: string;
  lambdaRole?: string;
}
export interface RecordMarkerDecisionAttributes {
  markerName: string;
  details?: string;
}
export interface StartTimerDecisionAttributes {
  timerId: string;
  control?: string;
  startToFireTimeout: string;
}
export interface CancelTimerDecisionAttributes {
  timerId: string;
}
export interface SignalExternalWorkflowExecutionDecisionAttributes {
  workflowId: string;
  runId?: string;
  signalName: string;
  input?: string;
  control?: string;
}
export interface RequestCancelExternalWorkflowExecutionDecisionAttributes {
  workflowId: string;
  runId?: string;
  control?: string;
}
export interface StartChildWorkflowExecutionDecisionAttributes {
  workflowType: WorkflowType;
  workflowId: string;
  control?: string;
  input?: string;
  executionStartToCloseTimeout?: string;
  taskList?: TaskList;
  taskPriority?: string;
  taskStartToCloseTimeout?: string;
  childPolicy?: ChildPolicy;
  tagList?: string[];
  lambdaRole?: string;
}
export interface ScheduleLambdaFunctionDecisionAttributes {
  id: string;
  name: string;
  control?: string;
  input?: string;
  startToCloseTimeout?: string;
}
export interface Decision {
  decisionType: DecisionType;
  scheduleActivityTaskDecisionAttributes?: ScheduleActivityTaskDecisionAttributes;
  requestCancelActivityTaskDecisionAttributes?: RequestCancelActivityTaskDecisionAttributes;
  completeWorkflowExecutionDecisionAttributes?: CompleteWorkflowExecutionDecisionAttributes;
  failWorkflowExecutionDecisionAttributes?: FailWorkflowExecutionDecisionAttributes;
  cancelWorkflowExecutionDecisionAttributes?: CancelWorkflowExecutionDecisionAttributes;
  continueAsNewWorkflowExecutionDecisionAttributes?: ContinueAsNewWorkflowExecutionDecisionAttributes;
  recordMarkerDecisionAttributes?: RecordMarkerDecisionAttributes;
  startTimerDecisionAttributes?: StartTimerDecisionAttributes;
  cancelTimerDecisionAttributes?: CancelTimerDecisionAttributes;
  signalExternalWorkflowExecutionDecisionAttributes?: SignalExternalWorkflowExecutionDecisionAttributes;
  requestCancelExternalWorkflowExecutionDecisionAttributes?: RequestCancelExternalWorkflowExecutionDecisionAttributes;
  startChildWorkflowExecutionDecisionAttributes?: StartChildWorkflowExecutionDecisionAttributes;
  scheduleLambdaFunctionDecisionAttributes?: ScheduleLambdaFunctionDecisionAttributes;
}
export type DecisionList = Decision[];
export interface RespondDecisionTaskCompletedInput {
  taskToken: string;
  decisions?: Decision[];
  executionContext?: string;
  taskList?: TaskList;
  taskListScheduleToStartTimeout?: string;
}
export interface RespondDecisionTaskCompletedResponse {}
export interface SignalWorkflowExecutionInput {
  domain: string;
  workflowId: string;
  runId?: string;
  signalName: string;
  input?: string;
}
export interface SignalWorkflowExecutionResponse {}
export interface StartWorkflowExecutionInput {
  domain: string;
  workflowId: string;
  workflowType: WorkflowType;
  taskList?: TaskList;
  taskPriority?: string;
  input?: string;
  executionStartToCloseTimeout?: string;
  tagList?: string[];
  taskStartToCloseTimeout?: string;
  childPolicy?: ChildPolicy;
  lambdaRole?: string;
}
export interface Run {
  runId?: string;
}
export interface TagResourceInput {
  resourceArn: string;
  tags: ResourceTag[];
}
export interface TagResourceResponse {}
export interface TerminateWorkflowExecutionInput {
  domain: string;
  workflowId: string;
  runId?: string;
  reason?: string;
  details?: string;
  childPolicy?: ChildPolicy;
}
export interface TerminateWorkflowExecutionResponse {}
export interface UndeprecateActivityTypeInput {
  domain: string;
  activityType: ActivityType;
}
export interface UndeprecateActivityTypeResponse {}
export interface UndeprecateDomainInput {
  name: string;
}
export interface UndeprecateDomainResponse {}
export interface UndeprecateWorkflowTypeInput {
  domain: string;
  workflowType: WorkflowType;
}
export interface UndeprecateWorkflowTypeResponse {}
export type ResourceTagKeyList = string[];
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export type ErrorMessage = string;
export type CountClosedWorkflowExecutionsError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Returns the number of closed workflow executions within the given domain that meet the
 * specified filtering criteria.
 *
 * This operation is eventually consistent. The results are best effort and may not
 * exactly reflect recent updates and changes.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the following parameters by using a `Condition` element with
 * the appropriate keys.
 *
 * - `tagFilter.tag`: String constraint. The key is
 * `swf:tagFilter.tag`.
 *
 * - `typeFilter.name`: String constraint. The key is
 * `swf:typeFilter.name`.
 *
 * - `typeFilter.version`: String constraint. The key is
 * `swf:typeFilter.version`.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const countClosedWorkflowExecutions: API.OperationMethod<
  CountClosedWorkflowExecutionsInput,
  WorkflowExecutionCount,
  CountClosedWorkflowExecutionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      domain: 0,
      startTimeFilter: i_ExecutionTimeFilter,
      closeTimeFilter: i_ExecutionTimeFilter,
      executionFilter: i_WorkflowExecutionFilter,
      typeFilter: i_WorkflowTypeFilter,
      tagFilter: i_TagFilter,
      closeStatusFilter: i_CloseStatusFilter,
    },
  },
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CountClosedWorkflowExecutions",
})) as any;

export type CountOpenWorkflowExecutionsError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Returns the number of open workflow executions within the given domain that meet the
 * specified filtering criteria.
 *
 * This operation is eventually consistent. The results are best effort and may not
 * exactly reflect recent updates and changes.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the following parameters by using a `Condition` element with
 * the appropriate keys.
 *
 * - `tagFilter.tag`: String constraint. The key is
 * `swf:tagFilter.tag`.
 *
 * - `typeFilter.name`: String constraint. The key is
 * `swf:typeFilter.name`.
 *
 * - `typeFilter.version`: String constraint. The key is
 * `swf:typeFilter.version`.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const countOpenWorkflowExecutions: API.OperationMethod<
  CountOpenWorkflowExecutionsInput,
  WorkflowExecutionCount,
  CountOpenWorkflowExecutionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      domain: 0,
      startTimeFilter: i_ExecutionTimeFilter,
      typeFilter: i_WorkflowTypeFilter,
      tagFilter: i_TagFilter,
      executionFilter: i_WorkflowExecutionFilter,
    },
  },
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CountOpenWorkflowExecutions",
})) as any;

export type CountPendingActivityTasksError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Returns the estimated number of activity tasks in the specified task list. The count
 * returned is an approximation and isn't guaranteed to be exact. If you specify a task list that
 * no activity task was ever scheduled in then `0` is returned.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the `taskList.name` parameter by using a
 * `Condition` element with the `swf:taskList.name` key to allow the
 * action to access only certain task lists.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const countPendingActivityTasks: API.OperationMethod<
  CountPendingActivityTasksInput,
  PendingTaskCount,
  CountPendingActivityTasksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { domain: 0, taskList: i_TaskList } },
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CountPendingActivityTasks",
})) as any;

export type CountPendingDecisionTasksError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Returns the estimated number of decision tasks in the specified task list. The count
 * returned is an approximation and isn't guaranteed to be exact. If you specify a task list that
 * no decision task was ever scheduled in then `0` is returned.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the `taskList.name` parameter by using a
 * `Condition` element with the `swf:taskList.name` key to allow the
 * action to access only certain task lists.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const countPendingDecisionTasks: API.OperationMethod<
  CountPendingDecisionTasksInput,
  PendingTaskCount,
  CountPendingDecisionTasksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { domain: 0, taskList: i_TaskList } },
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CountPendingDecisionTasks",
})) as any;

export type DeleteActivityTypeError =
  | OperationNotPermittedFault
  | TypeNotDeprecatedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Deletes the specified *activity type*.
 *
 * Note: Prior to deletion, activity types must first be **deprecated**.
 *
 * After an activity type has been deleted, you cannot schedule new activities of that type. Activities that started before the type was deleted will continue to run.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the following parameters by using a `Condition` element with
 * the appropriate keys.
 *
 * - `activityType.name`: String constraint. The key is
 * `swf:activityType.name`.
 *
 * - `activityType.version`: String constraint. The key is
 * `swf:activityType.version`.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const deleteActivityType: API.OperationMethod<
  DeleteActivityTypeInput,
  DeleteActivityTypeResponse,
  DeleteActivityTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { domain: 0, activityType: i_ActivityType },
  },
  errors: [
    OperationNotPermittedFault,
    TypeNotDeprecatedFault,
    UnknownResourceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteActivityType",
})) as any;

export type DeleteWorkflowTypeError =
  | OperationNotPermittedFault
  | TypeNotDeprecatedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Deletes the specified *workflow type*.
 *
 * Note: Prior to deletion, workflow types must first be **deprecated**.
 *
 * After a workflow type has been deleted, you cannot create new executions of that type. Executions that
 * started before the type was deleted will continue to run.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the following parameters by using a `Condition` element with
 * the appropriate keys.
 *
 * - `workflowType.name`: String constraint. The key is
 * `swf:workflowType.name`.
 *
 * - `workflowType.version`: String constraint. The key is
 * `swf:workflowType.version`.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const deleteWorkflowType: API.OperationMethod<
  DeleteWorkflowTypeInput,
  DeleteWorkflowTypeResponse,
  DeleteWorkflowTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { domain: 0, workflowType: i_WorkflowType },
  },
  errors: [
    OperationNotPermittedFault,
    TypeNotDeprecatedFault,
    UnknownResourceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkflowType",
})) as any;

export type DeprecateActivityTypeError =
  | OperationNotPermittedFault
  | TypeDeprecatedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Deprecates the specified *activity type*. After an activity type has
 * been deprecated, you cannot create new tasks of that activity type. Tasks of this type that
 * were scheduled before the type was deprecated continue to run.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the following parameters by using a `Condition` element with
 * the appropriate keys.
 *
 * - `activityType.name`: String constraint. The key is
 * `swf:activityType.name`.
 *
 * - `activityType.version`: String constraint. The key is
 * `swf:activityType.version`.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const deprecateActivityType: API.OperationMethod<
  DeprecateActivityTypeInput,
  DeprecateActivityTypeResponse,
  DeprecateActivityTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { domain: 0, activityType: i_ActivityType },
  },
  errors: [
    OperationNotPermittedFault,
    TypeDeprecatedFault,
    UnknownResourceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeprecateActivityType",
})) as any;

export type DeprecateDomainError =
  | DomainDeprecatedFault
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Deprecates the specified domain. After a domain has been deprecated it cannot be used
 * to create new workflow executions or register new types. However, you can still use visibility
 * actions on this domain. Deprecating a domain also deprecates all activity and workflow types
 * registered in the domain. Executions that were started before the domain was deprecated
 * continues to run.
 *
 * This operation is eventually consistent. The results are best effort and may not
 * exactly reflect recent updates and changes.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const deprecateDomain: API.OperationMethod<
  DeprecateDomainInput,
  DeprecateDomainResponse,
  DeprecateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { name: 0 } },
  errors: [
    DomainDeprecatedFault,
    OperationNotPermittedFault,
    UnknownResourceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeprecateDomain",
})) as any;

export type DeprecateWorkflowTypeError =
  | OperationNotPermittedFault
  | TypeDeprecatedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Deprecates the specified *workflow type*. After a workflow type has
 * been deprecated, you cannot create new executions of that type. Executions that were started
 * before the type was deprecated continues to run. A deprecated workflow type may still be used
 * when calling visibility actions.
 *
 * This operation is eventually consistent. The results are best effort and may not
 * exactly reflect recent updates and changes.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the following parameters by using a `Condition` element with
 * the appropriate keys.
 *
 * - `workflowType.name`: String constraint. The key is
 * `swf:workflowType.name`.
 *
 * - `workflowType.version`: String constraint. The key is
 * `swf:workflowType.version`.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const deprecateWorkflowType: API.OperationMethod<
  DeprecateWorkflowTypeInput,
  DeprecateWorkflowTypeResponse,
  DeprecateWorkflowTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { domain: 0, workflowType: i_WorkflowType },
  },
  errors: [
    OperationNotPermittedFault,
    TypeDeprecatedFault,
    UnknownResourceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeprecateWorkflowType",
})) as any;

export type DescribeActivityTypeError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Returns information about the specified activity type. This includes configuration
 * settings provided when the type was registered and other general information about the
 * type.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the following parameters by using a `Condition` element with
 * the appropriate keys.
 *
 * - `activityType.name`: String constraint. The key is
 * `swf:activityType.name`.
 *
 * - `activityType.version`: String constraint. The key is
 * `swf:activityType.version`.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const describeActivityType: API.OperationMethod<
  DescribeActivityTypeInput,
  ActivityTypeDetail,
  DescribeActivityTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { domain: 0, activityType: i_ActivityType },
    output: { typeInfo: o_ActivityTypeInfo },
  },
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeActivityType",
})) as any;

export type DescribeDomainError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Returns information about the specified domain, including description and
 * status.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const describeDomain: API.OperationMethod<
  DescribeDomainInput,
  DomainDetail,
  DescribeDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { name: 0 } },
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDomain",
})) as any;

export type DescribeWorkflowExecutionError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Returns information about the specified workflow execution including its type and some
 * statistics.
 *
 * This operation is eventually consistent. The results are best effort and may not
 * exactly reflect recent updates and changes.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const describeWorkflowExecution: API.OperationMethod<
  DescribeWorkflowExecutionInput,
  WorkflowExecutionDetail,
  DescribeWorkflowExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { domain: 0, execution: i_WorkflowExecution },
    output: {
      executionInfo: o_WorkflowExecutionInfo,
      latestActivityTaskTimestamp: D.ts,
    },
  },
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkflowExecution",
})) as any;

export type DescribeWorkflowTypeError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Returns information about the specified *workflow type*. This
 * includes configuration settings specified when the type was registered and other information
 * such as creation date, current status, etc.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the following parameters by using a `Condition` element with
 * the appropriate keys.
 *
 * - `workflowType.name`: String constraint. The key is
 * `swf:workflowType.name`.
 *
 * - `workflowType.version`: String constraint. The key is
 * `swf:workflowType.version`.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const describeWorkflowType: API.OperationMethod<
  DescribeWorkflowTypeInput,
  WorkflowTypeDetail,
  DescribeWorkflowTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { domain: 0, workflowType: i_WorkflowType },
    output: { typeInfo: o_WorkflowTypeInfo },
  },
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkflowType",
})) as any;

export type GetWorkflowExecutionHistoryError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Returns the history of the specified workflow execution. The results may be split into
 * multiple pages. To retrieve subsequent pages, make the call again using the
 * `nextPageToken` returned by the initial call.
 *
 * This operation is eventually consistent. The results are best effort and may not
 * exactly reflect recent updates and changes.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const getWorkflowExecutionHistory: API.PaginatedOperationMethod<
  GetWorkflowExecutionHistoryInput,
  History,
  GetWorkflowExecutionHistoryError,
  Credentials | HttpClient.HttpClient,
  HistoryEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      domain: 0,
      execution: i_WorkflowExecution,
      nextPageToken: 0,
      maximumPageSize: 0,
      reverseOrder: 0,
    },
    output: { events: D.list(o_HistoryEvent) },
  },
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflowExecutionHistory",
  pagination: {
    inputToken: "nextPageToken",
    outputToken: "nextPageToken",
    items: "events",
    pageSize: "maximumPageSize",
  } as const,
})) as any;

export type ListActivityTypesError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Returns information about all activities registered in the specified domain that match
 * the specified name and registration status. The result includes information like creation
 * date, current status of the activity, etc. The results may be split into multiple pages. To
 * retrieve subsequent pages, make the call again using the `nextPageToken` returned
 * by the initial call.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const listActivityTypes: API.PaginatedOperationMethod<
  ListActivityTypesInput,
  ActivityTypeInfos,
  ListActivityTypesError,
  Credentials | HttpClient.HttpClient,
  ActivityTypeInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      domain: 0,
      name: 0,
      registrationStatus: 0,
      nextPageToken: 0,
      maximumPageSize: 0,
      reverseOrder: 0,
    },
    output: { typeInfos: D.list(o_ActivityTypeInfo) },
  },
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListActivityTypes",
  pagination: {
    inputToken: "nextPageToken",
    outputToken: "nextPageToken",
    items: "typeInfos",
    pageSize: "maximumPageSize",
  } as const,
})) as any;

export type ListClosedWorkflowExecutionsError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Returns a list of closed workflow executions in the specified domain that meet the
 * filtering criteria. The results may be split into multiple pages. To retrieve subsequent
 * pages, make the call again using the nextPageToken returned by the initial call.
 *
 * This operation is eventually consistent. The results are best effort and may not
 * exactly reflect recent updates and changes.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the following parameters by using a `Condition` element with
 * the appropriate keys.
 *
 * - `tagFilter.tag`: String constraint. The key is
 * `swf:tagFilter.tag`.
 *
 * - `typeFilter.name`: String constraint. The key is
 * `swf:typeFilter.name`.
 *
 * - `typeFilter.version`: String constraint. The key is
 * `swf:typeFilter.version`.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const listClosedWorkflowExecutions: API.PaginatedOperationMethod<
  ListClosedWorkflowExecutionsInput,
  WorkflowExecutionInfos,
  ListClosedWorkflowExecutionsError,
  Credentials | HttpClient.HttpClient,
  WorkflowExecutionInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      domain: 0,
      startTimeFilter: i_ExecutionTimeFilter,
      closeTimeFilter: i_ExecutionTimeFilter,
      executionFilter: i_WorkflowExecutionFilter,
      closeStatusFilter: i_CloseStatusFilter,
      typeFilter: i_WorkflowTypeFilter,
      tagFilter: i_TagFilter,
      nextPageToken: 0,
      maximumPageSize: 0,
      reverseOrder: 0,
    },
    output: { executionInfos: D.list(o_WorkflowExecutionInfo) },
  },
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClosedWorkflowExecutions",
  pagination: {
    inputToken: "nextPageToken",
    outputToken: "nextPageToken",
    items: "executionInfos",
    pageSize: "maximumPageSize",
  } as const,
})) as any;

export type ListDomainsError = OperationNotPermittedFault | CommonErrors;
/**
 * Returns the list of domains registered in the account. The results may be split into
 * multiple pages. To retrieve subsequent pages, make the call again using the nextPageToken
 * returned by the initial call.
 *
 * This operation is eventually consistent. The results are best effort and may not
 * exactly reflect recent updates and changes.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains. The element must be set to
 * `arn:aws:swf::AccountID:domain/*`, where *AccountID* is
 * the account ID, with no dashes.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const listDomains: API.PaginatedOperationMethod<
  ListDomainsInput,
  DomainInfos,
  ListDomainsError,
  Credentials | HttpClient.HttpClient,
  DomainInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      nextPageToken: 0,
      registrationStatus: 0,
      maximumPageSize: 0,
      reverseOrder: 0,
    },
  },
  errors: [OperationNotPermittedFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomains",
  pagination: {
    inputToken: "nextPageToken",
    outputToken: "nextPageToken",
    items: "domainInfos",
    pageSize: "maximumPageSize",
  } as const,
})) as any;

export type ListOpenWorkflowExecutionsError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Returns a list of open workflow executions in the specified domain that meet the
 * filtering criteria. The results may be split into multiple pages. To retrieve subsequent
 * pages, make the call again using the nextPageToken returned by the initial call.
 *
 * This operation is eventually consistent. The results are best effort and may not
 * exactly reflect recent updates and changes.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the following parameters by using a `Condition` element with
 * the appropriate keys.
 *
 * - `tagFilter.tag`: String constraint. The key is
 * `swf:tagFilter.tag`.
 *
 * - `typeFilter.name`: String constraint. The key is
 * `swf:typeFilter.name`.
 *
 * - `typeFilter.version`: String constraint. The key is
 * `swf:typeFilter.version`.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const listOpenWorkflowExecutions: API.PaginatedOperationMethod<
  ListOpenWorkflowExecutionsInput,
  WorkflowExecutionInfos,
  ListOpenWorkflowExecutionsError,
  Credentials | HttpClient.HttpClient,
  WorkflowExecutionInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      domain: 0,
      startTimeFilter: i_ExecutionTimeFilter,
      typeFilter: i_WorkflowTypeFilter,
      tagFilter: i_TagFilter,
      nextPageToken: 0,
      maximumPageSize: 0,
      reverseOrder: 0,
      executionFilter: i_WorkflowExecutionFilter,
    },
    output: { executionInfos: D.list(o_WorkflowExecutionInfo) },
  },
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOpenWorkflowExecutions",
  pagination: {
    inputToken: "nextPageToken",
    outputToken: "nextPageToken",
    items: "executionInfos",
    pageSize: "maximumPageSize",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | LimitExceededFault
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * List tags for a given domain.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0 } },
  errors: [
    LimitExceededFault,
    OperationNotPermittedFault,
    UnknownResourceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListWorkflowTypesError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Returns information about workflow types in the specified domain. The results may be
 * split into multiple pages that can be retrieved by making the call repeatedly.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const listWorkflowTypes: API.PaginatedOperationMethod<
  ListWorkflowTypesInput,
  WorkflowTypeInfos,
  ListWorkflowTypesError,
  Credentials | HttpClient.HttpClient,
  WorkflowTypeInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      domain: 0,
      name: 0,
      registrationStatus: 0,
      nextPageToken: 0,
      maximumPageSize: 0,
      reverseOrder: 0,
    },
    output: { typeInfos: D.list(o_WorkflowTypeInfo) },
  },
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkflowTypes",
  pagination: {
    inputToken: "nextPageToken",
    outputToken: "nextPageToken",
    items: "typeInfos",
    pageSize: "maximumPageSize",
  } as const,
})) as any;

export type PollForActivityTaskError =
  | LimitExceededFault
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Used by workers to get an ActivityTask from the specified activity
 * `taskList`. This initiates a long poll, where the service holds the HTTP
 * connection open and responds as soon as a task becomes available. The maximum time the service
 * holds on to the request before responding is 60 seconds. If no task is available within 60
 * seconds, the poll returns an empty result. An empty result, in this context, means that an
 * ActivityTask is returned, but that the value of taskToken is an empty string. If a task is
 * returned, the worker should use its type to identify and process it correctly.
 *
 * Workers should set their client side socket timeout to at least 70 seconds (10
 * seconds higher than the maximum time service may hold the poll request).
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the `taskList.name` parameter by using a
 * `Condition` element with the `swf:taskList.name` key to allow the
 * action to access only certain task lists.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const pollForActivityTask: API.OperationMethod<
  PollForActivityTaskInput,
  ActivityTask,
  PollForActivityTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { domain: 0, taskList: i_TaskList, identity: 0 },
  },
  errors: [
    LimitExceededFault,
    OperationNotPermittedFault,
    UnknownResourceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PollForActivityTask",
})) as any;

export type PollForDecisionTaskError =
  | LimitExceededFault
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Used by deciders to get a DecisionTask from the specified decision
 * `taskList`. A decision task may be returned for any open workflow execution that
 * is using the specified task list. The task includes a paginated view of the history of the
 * workflow execution. The decider should use the workflow type and the history to determine how
 * to properly handle the task.
 *
 * This action initiates a long poll, where the service holds the HTTP connection open and
 * responds as soon a task becomes available. If no decision task is available in the specified
 * task list before the timeout of 60 seconds expires, an empty result is returned. An empty
 * result, in this context, means that a DecisionTask is returned, but that the value of
 * taskToken is an empty string.
 *
 * Deciders should set their client side socket timeout to at least 70 seconds (10
 * seconds higher than the timeout).
 *
 * Because the number of workflow history events for a single workflow execution might
 * be very large, the result returned might be split up across a number of pages. To retrieve
 * subsequent pages, make additional calls to `PollForDecisionTask` using the
 * `nextPageToken` returned by the initial call. Note that you do
 * *not* call `GetWorkflowExecutionHistory` with this
 * `nextPageToken`. Instead, call `PollForDecisionTask`
 * again.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the `taskList.name` parameter by using a
 * `Condition` element with the `swf:taskList.name` key to allow the
 * action to access only certain task lists.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const pollForDecisionTask: API.PaginatedOperationMethod<
  PollForDecisionTaskInput,
  DecisionTask,
  PollForDecisionTaskError,
  Credentials | HttpClient.HttpClient,
  HistoryEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      domain: 0,
      taskList: i_TaskList,
      identity: 0,
      nextPageToken: 0,
      maximumPageSize: 0,
      reverseOrder: 0,
      startAtPreviousStartedEvent: 0,
    },
    output: { events: D.list(o_HistoryEvent) },
  },
  errors: [
    LimitExceededFault,
    OperationNotPermittedFault,
    UnknownResourceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PollForDecisionTask",
  pagination: {
    inputToken: "nextPageToken",
    outputToken: "nextPageToken",
    items: "events",
    pageSize: "maximumPageSize",
  } as const,
})) as any;

export type RecordActivityTaskHeartbeatError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Used by activity workers to report to the service that the ActivityTask represented by the specified `taskToken` is still making progress. The worker
 * can also specify details of the progress, for example percent complete, using the
 * `details` parameter. This action can also be used by the worker as a mechanism to
 * check if cancellation is being requested for the activity task. If a cancellation is being
 * attempted for the specified task, then the boolean `cancelRequested` flag returned
 * by the service is set to `true`.
 *
 * This action resets the `taskHeartbeatTimeout` clock. The
 * `taskHeartbeatTimeout` is specified in RegisterActivityType.
 *
 * This action doesn't in itself create an event in the workflow execution history.
 * However, if the task times out, the workflow execution history contains a
 * `ActivityTaskTimedOut` event that contains the information from the last
 * heartbeat generated by the activity worker.
 *
 * The `taskStartToCloseTimeout` of an activity type is the maximum duration
 * of an activity task, regardless of the number of RecordActivityTaskHeartbeat requests received. The `taskStartToCloseTimeout` is also specified in RegisterActivityType.
 *
 * This operation is only useful for long-lived activities to report liveliness of the
 * task and to determine if a cancellation is being attempted.
 *
 * If the `cancelRequested` flag returns `true`, a cancellation is
 * being attempted. If the worker can cancel the activity, it should respond with RespondActivityTaskCanceled. Otherwise, it should ignore the cancellation
 * request.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const recordActivityTaskHeartbeat: API.OperationMethod<
  RecordActivityTaskHeartbeatInput,
  ActivityTaskStatus,
  RecordActivityTaskHeartbeatError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { taskToken: 0, details: 0 } },
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RecordActivityTaskHeartbeat",
})) as any;

export type RegisterActivityTypeError =
  | LimitExceededFault
  | OperationNotPermittedFault
  | TypeAlreadyExistsFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Registers a new *activity type* along with its configuration
 * settings in the specified domain.
 *
 * A `TypeAlreadyExists` fault is returned if the type already exists in the
 * domain. You cannot change any configuration settings of the type after its registration, and
 * it must be registered as a new version.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the following parameters by using a `Condition` element with
 * the appropriate keys.
 *
 * - `defaultTaskList.name`: String constraint. The key is
 * `swf:defaultTaskList.name`.
 *
 * - `name`: String constraint. The key is `swf:name`.
 *
 * - `version`: String constraint. The key is
 * `swf:version`.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const registerActivityType: API.OperationMethod<
  RegisterActivityTypeInput,
  RegisterActivityTypeResponse,
  RegisterActivityTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      domain: 0,
      name: 0,
      version: 0,
      description: 0,
      defaultTaskStartToCloseTimeout: 0,
      defaultTaskHeartbeatTimeout: 0,
      defaultTaskList: i_TaskList,
      defaultTaskPriority: 0,
      defaultTaskScheduleToStartTimeout: 0,
      defaultTaskScheduleToCloseTimeout: 0,
    },
  },
  errors: [
    LimitExceededFault,
    OperationNotPermittedFault,
    TypeAlreadyExistsFault,
    UnknownResourceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterActivityType",
})) as any;

export type RegisterDomainError =
  | DomainAlreadyExistsFault
  | LimitExceededFault
  | OperationNotPermittedFault
  | TooManyTagsFault
  | CommonErrors;
/**
 * Registers a new domain.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - You cannot use an IAM policy to control domain access for this action. The name of
 * the domain being registered is available as the resource of this action.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const registerDomain: API.OperationMethod<
  RegisterDomainInput,
  RegisterDomainResponse,
  RegisterDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      description: 0,
      workflowExecutionRetentionPeriodInDays: 0,
      tags: D.list(i_ResourceTag),
    },
  },
  errors: [
    DomainAlreadyExistsFault,
    LimitExceededFault,
    OperationNotPermittedFault,
    TooManyTagsFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterDomain",
})) as any;

export type RegisterWorkflowTypeError =
  | LimitExceededFault
  | OperationNotPermittedFault
  | TypeAlreadyExistsFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Registers a new *workflow type* and its configuration settings in
 * the specified domain.
 *
 * The retention period for the workflow history is set by the RegisterDomain action.
 *
 * If the type already exists, then a `TypeAlreadyExists` fault is returned.
 * You cannot change the configuration settings of a workflow type once it is registered and it
 * must be registered as a new version.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the following parameters by using a `Condition` element with
 * the appropriate keys.
 *
 * - `defaultTaskList.name`: String constraint. The key is
 * `swf:defaultTaskList.name`.
 *
 * - `name`: String constraint. The key is `swf:name`.
 *
 * - `version`: String constraint. The key is
 * `swf:version`.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const registerWorkflowType: API.OperationMethod<
  RegisterWorkflowTypeInput,
  RegisterWorkflowTypeResponse,
  RegisterWorkflowTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      domain: 0,
      name: 0,
      version: 0,
      description: 0,
      defaultTaskStartToCloseTimeout: 0,
      defaultExecutionStartToCloseTimeout: 0,
      defaultTaskList: i_TaskList,
      defaultTaskPriority: 0,
      defaultChildPolicy: 0,
      defaultLambdaRole: 0,
    },
  },
  errors: [
    LimitExceededFault,
    OperationNotPermittedFault,
    TypeAlreadyExistsFault,
    UnknownResourceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterWorkflowType",
})) as any;

export type RequestCancelWorkflowExecutionError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Records a `WorkflowExecutionCancelRequested` event in the currently running
 * workflow execution identified by the given domain, workflowId, and runId. This logically
 * requests the cancellation of the workflow execution as a whole. It is up to the decider to
 * take appropriate actions when it receives an execution history with this event.
 *
 * If the runId isn't specified, the `WorkflowExecutionCancelRequested` event
 * is recorded in the history of the current open workflow execution with the specified
 * workflowId in the domain.
 *
 * Because this action allows the workflow to properly clean up and gracefully close, it
 * should be used instead of TerminateWorkflowExecution when
 * possible.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const requestCancelWorkflowExecution: API.OperationMethod<
  RequestCancelWorkflowExecutionInput,
  RequestCancelWorkflowExecutionResponse,
  RequestCancelWorkflowExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { domain: 0, workflowId: 0, runId: 0 } },
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RequestCancelWorkflowExecution",
})) as any;

export type RespondActivityTaskCanceledError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Used by workers to tell the service that the ActivityTask identified
 * by the `taskToken` was successfully canceled. Additional `details` can
 * be provided using the `details` argument.
 *
 * These `details` (if provided) appear in the
 * `ActivityTaskCanceled` event added to the workflow history.
 *
 * Only use this operation if the `canceled` flag of a RecordActivityTaskHeartbeat request returns `true` and if the
 * activity can be safely undone or abandoned.
 *
 * A task is considered open from the time that it is scheduled until it is closed.
 * Therefore a task is reported as open while a worker is processing it. A task is closed after
 * it has been specified in a call to RespondActivityTaskCompleted,
 * RespondActivityTaskCanceled, RespondActivityTaskFailed, or the task has
 * timed
 * out.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const respondActivityTaskCanceled: API.OperationMethod<
  RespondActivityTaskCanceledInput,
  RespondActivityTaskCanceledResponse,
  RespondActivityTaskCanceledError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { taskToken: 0, details: 0 } },
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RespondActivityTaskCanceled",
})) as any;

export type RespondActivityTaskCompletedError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Used by workers to tell the service that the ActivityTask identified
 * by the `taskToken` completed successfully with a `result` (if provided).
 * The `result` appears in the `ActivityTaskCompleted` event in the
 * workflow history.
 *
 * If the requested task doesn't complete successfully, use RespondActivityTaskFailed instead. If the worker finds that the task is
 * canceled through the `canceled` flag returned by RecordActivityTaskHeartbeat, it should cancel the task, clean up and then call
 * RespondActivityTaskCanceled.
 *
 * A task is considered open from the time that it is scheduled until it is closed.
 * Therefore a task is reported as open while a worker is processing it. A task is closed after
 * it has been specified in a call to RespondActivityTaskCompleted, RespondActivityTaskCanceled, RespondActivityTaskFailed, or the
 * task has timed
 * out.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const respondActivityTaskCompleted: API.OperationMethod<
  RespondActivityTaskCompletedInput,
  RespondActivityTaskCompletedResponse,
  RespondActivityTaskCompletedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { taskToken: 0, result: 0 } },
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RespondActivityTaskCompleted",
})) as any;

export type RespondActivityTaskFailedError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Used by workers to tell the service that the ActivityTask identified
 * by the `taskToken` has failed with `reason` (if specified). The
 * `reason` and `details` appear in the `ActivityTaskFailed`
 * event added to the workflow history.
 *
 * A task is considered open from the time that it is scheduled until it is closed.
 * Therefore a task is reported as open while a worker is processing it. A task is closed after
 * it has been specified in a call to RespondActivityTaskCompleted, RespondActivityTaskCanceled, RespondActivityTaskFailed, or the task has timed
 * out.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const respondActivityTaskFailed: API.OperationMethod<
  RespondActivityTaskFailedInput,
  RespondActivityTaskFailedResponse,
  RespondActivityTaskFailedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { taskToken: 0, reason: 0, details: 0 } },
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RespondActivityTaskFailed",
})) as any;

export type RespondDecisionTaskCompletedError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Used by deciders to tell the service that the DecisionTask identified
 * by the `taskToken` has successfully completed. The `decisions` argument
 * specifies the list of decisions made while processing the task.
 *
 * A `DecisionTaskCompleted` event is added to the workflow history. The
 * `executionContext` specified is attached to the event in the workflow execution
 * history.
 *
 * **Access Control**
 *
 * If an IAM policy grants permission to use `RespondDecisionTaskCompleted`, it
 * can express permissions for the list of decisions in the `decisions` parameter.
 * Each of the decisions has one or more parameters, much like a regular API call. To allow for
 * policies to be as readable as possible, you can express permissions on decisions as if they
 * were actual API calls, including applying conditions to some parameters. For more information,
 * see Using
 * IAM to Manage Access to Amazon SWF Workflows in the
 * *Amazon SWF Developer Guide*.
 */
export const respondDecisionTaskCompleted: API.OperationMethod<
  RespondDecisionTaskCompletedInput,
  RespondDecisionTaskCompletedResponse,
  RespondDecisionTaskCompletedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      taskToken: 0,
      decisions: D.list({
        decisionType: 0,
        scheduleActivityTaskDecisionAttributes: {
          activityType: i_ActivityType,
          activityId: 0,
          control: 0,
          input: 0,
          scheduleToCloseTimeout: 0,
          taskList: i_TaskList,
          taskPriority: 0,
          scheduleToStartTimeout: 0,
          startToCloseTimeout: 0,
          heartbeatTimeout: 0,
        },
        requestCancelActivityTaskDecisionAttributes: { activityId: 0 },
        completeWorkflowExecutionDecisionAttributes: { result: 0 },
        failWorkflowExecutionDecisionAttributes: { reason: 0, details: 0 },
        cancelWorkflowExecutionDecisionAttributes: { details: 0 },
        continueAsNewWorkflowExecutionDecisionAttributes: {
          input: 0,
          executionStartToCloseTimeout: 0,
          taskList: i_TaskList,
          taskPriority: 0,
          taskStartToCloseTimeout: 0,
          childPolicy: 0,
          tagList: 0,
          workflowTypeVersion: 0,
          lambdaRole: 0,
        },
        recordMarkerDecisionAttributes: { markerName: 0, details: 0 },
        startTimerDecisionAttributes: {
          timerId: 0,
          control: 0,
          startToFireTimeout: 0,
        },
        cancelTimerDecisionAttributes: { timerId: 0 },
        signalExternalWorkflowExecutionDecisionAttributes: {
          workflowId: 0,
          runId: 0,
          signalName: 0,
          input: 0,
          control: 0,
        },
        requestCancelExternalWorkflowExecutionDecisionAttributes: {
          workflowId: 0,
          runId: 0,
          control: 0,
        },
        startChildWorkflowExecutionDecisionAttributes: {
          workflowType: i_WorkflowType,
          workflowId: 0,
          control: 0,
          input: 0,
          executionStartToCloseTimeout: 0,
          taskList: i_TaskList,
          taskPriority: 0,
          taskStartToCloseTimeout: 0,
          childPolicy: 0,
          tagList: 0,
          lambdaRole: 0,
        },
        scheduleLambdaFunctionDecisionAttributes: {
          id: 0,
          name: 0,
          control: 0,
          input: 0,
          startToCloseTimeout: 0,
        },
      }),
      executionContext: 0,
      taskList: i_TaskList,
      taskListScheduleToStartTimeout: 0,
    },
  },
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RespondDecisionTaskCompleted",
})) as any;

export type SignalWorkflowExecutionError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Records a `WorkflowExecutionSignaled` event in the workflow execution
 * history and creates a decision task for the workflow execution identified by the given domain,
 * workflowId and runId. The event is recorded with the specified user defined signalName and
 * input (if provided).
 *
 * If a runId isn't specified, then the `WorkflowExecutionSignaled` event is
 * recorded in the history of the current open workflow with the matching workflowId in the
 * domain.
 *
 * If the specified workflow execution isn't open, this method fails with
 * `UnknownResource`.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const signalWorkflowExecution: API.OperationMethod<
  SignalWorkflowExecutionInput,
  SignalWorkflowExecutionResponse,
  SignalWorkflowExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { domain: 0, workflowId: 0, runId: 0, signalName: 0, input: 0 },
  },
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SignalWorkflowExecution",
})) as any;

export type StartWorkflowExecutionError =
  | DefaultUndefinedFault
  | LimitExceededFault
  | OperationNotPermittedFault
  | TypeDeprecatedFault
  | UnknownResourceFault
  | WorkflowExecutionAlreadyStartedFault
  | CommonErrors;
/**
 * Starts an execution of the workflow type in the specified domain using the provided
 * `workflowId` and input data.
 *
 * This action returns the newly started workflow execution.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the following parameters by using a `Condition` element with
 * the appropriate keys.
 *
 * - `tagList.member.0`: The key is `swf:tagList.member.0`.
 *
 * - `tagList.member.1`: The key is `swf:tagList.member.1`.
 *
 * - `tagList.member.2`: The key is `swf:tagList.member.2`.
 *
 * - `tagList.member.3`: The key is `swf:tagList.member.3`.
 *
 * - `tagList.member.4`: The key is `swf:tagList.member.4`.
 *
 * - `taskList`: String constraint. The key is
 * `swf:taskList.name`.
 *
 * - `workflowType.name`: String constraint. The key is
 * `swf:workflowType.name`.
 *
 * - `workflowType.version`: String constraint. The key is
 * `swf:workflowType.version`.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const startWorkflowExecution: API.OperationMethod<
  StartWorkflowExecutionInput,
  Run,
  StartWorkflowExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      domain: 0,
      workflowId: 0,
      workflowType: i_WorkflowType,
      taskList: i_TaskList,
      taskPriority: 0,
      input: 0,
      executionStartToCloseTimeout: 0,
      tagList: 0,
      taskStartToCloseTimeout: 0,
      childPolicy: 0,
      lambdaRole: 0,
    },
  },
  errors: [
    DefaultUndefinedFault,
    LimitExceededFault,
    OperationNotPermittedFault,
    TypeDeprecatedFault,
    UnknownResourceFault,
    WorkflowExecutionAlreadyStartedFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartWorkflowExecution",
})) as any;

export type TagResourceError =
  | LimitExceededFault
  | OperationNotPermittedFault
  | TooManyTagsFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Add a tag to a Amazon SWF domain.
 *
 * Amazon SWF supports a maximum of 50 tags per resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { resourceArn: 0, tags: D.list(i_ResourceTag) },
  },
  errors: [
    LimitExceededFault,
    OperationNotPermittedFault,
    TooManyTagsFault,
    UnknownResourceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type TerminateWorkflowExecutionError =
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Records a `WorkflowExecutionTerminated` event and forces closure of the
 * workflow execution identified by the given domain, runId, and workflowId. The child policy,
 * registered with the workflow type or specified when starting this execution, is applied to any
 * open child workflow executions of this workflow execution.
 *
 * If the identified workflow execution was in progress, it is terminated
 * immediately.
 *
 * If a runId isn't specified, then the `WorkflowExecutionTerminated` event
 * is recorded in the history of the current open workflow with the matching workflowId in the
 * domain.
 *
 * You should consider using RequestCancelWorkflowExecution action
 * instead because it allows the workflow to gracefully close while TerminateWorkflowExecution doesn't.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const terminateWorkflowExecution: API.OperationMethod<
  TerminateWorkflowExecutionInput,
  TerminateWorkflowExecutionResponse,
  TerminateWorkflowExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      domain: 0,
      workflowId: 0,
      runId: 0,
      reason: 0,
      details: 0,
      childPolicy: 0,
    },
  },
  errors: [OperationNotPermittedFault, UnknownResourceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateWorkflowExecution",
})) as any;

export type UndeprecateActivityTypeError =
  | OperationNotPermittedFault
  | TypeAlreadyExistsFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Undeprecates a previously deprecated *activity type*. After an activity type has
 * been undeprecated, you can create new tasks of that activity type.
 *
 * This operation is eventually consistent. The results are best effort and may not
 * exactly reflect recent updates and changes.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the following parameters by using a `Condition` element with
 * the appropriate keys.
 *
 * - `activityType.name`: String constraint. The key is
 * `swf:activityType.name`.
 *
 * - `activityType.version`: String constraint. The key is
 * `swf:activityType.version`.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const undeprecateActivityType: API.OperationMethod<
  UndeprecateActivityTypeInput,
  UndeprecateActivityTypeResponse,
  UndeprecateActivityTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { domain: 0, activityType: i_ActivityType },
  },
  errors: [
    OperationNotPermittedFault,
    TypeAlreadyExistsFault,
    UnknownResourceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UndeprecateActivityType",
})) as any;

export type UndeprecateDomainError =
  | DomainAlreadyExistsFault
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Undeprecates a previously deprecated domain. After a domain has been undeprecated it can be used
 * to create new workflow executions or register new types.
 *
 * This operation is eventually consistent. The results are best effort and may not
 * exactly reflect recent updates and changes.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - You cannot use an IAM policy to constrain this action's parameters.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const undeprecateDomain: API.OperationMethod<
  UndeprecateDomainInput,
  UndeprecateDomainResponse,
  UndeprecateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { name: 0 } },
  errors: [
    DomainAlreadyExistsFault,
    OperationNotPermittedFault,
    UnknownResourceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UndeprecateDomain",
})) as any;

export type UndeprecateWorkflowTypeError =
  | OperationNotPermittedFault
  | TypeAlreadyExistsFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Undeprecates a previously deprecated *workflow type*. After a workflow type has
 * been undeprecated, you can create new executions of that type.
 *
 * This operation is eventually consistent. The results are best effort and may not
 * exactly reflect recent updates and changes.
 *
 * **Access Control**
 *
 * You can use IAM policies to control this action's access to Amazon SWF resources as
 * follows:
 *
 * - Use a `Resource` element with the domain name to limit the action to
 * only specified domains.
 *
 * - Use an `Action` element to allow or deny permission to call this
 * action.
 *
 * - Constrain the following parameters by using a `Condition` element with
 * the appropriate keys.
 *
 * - `workflowType.name`: String constraint. The key is
 * `swf:workflowType.name`.
 *
 * - `workflowType.version`: String constraint. The key is
 * `swf:workflowType.version`.
 *
 * If the caller doesn't have sufficient permissions to invoke the action, or the
 * parameter values fall outside the specified constraints, the action fails. The associated
 * event attribute's `cause` parameter is set to `OPERATION_NOT_PERMITTED`.
 * For details and example IAM policies, see Using IAM to Manage Access to Amazon SWF
 * Workflows in the *Amazon SWF Developer Guide*.
 */
export const undeprecateWorkflowType: API.OperationMethod<
  UndeprecateWorkflowTypeInput,
  UndeprecateWorkflowTypeResponse,
  UndeprecateWorkflowTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { domain: 0, workflowType: i_WorkflowType },
  },
  errors: [
    OperationNotPermittedFault,
    TypeAlreadyExistsFault,
    UnknownResourceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UndeprecateWorkflowType",
})) as any;

export type UntagResourceError =
  | LimitExceededFault
  | OperationNotPermittedFault
  | UnknownResourceFault
  | CommonErrors;
/**
 * Remove a tag from a Amazon SWF domain.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0, tagKeys: 0 } },
  errors: [
    LimitExceededFault,
    OperationNotPermittedFault,
    UnknownResourceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

const i_ActivityType: D.LazyStruct = () => ({ name: 0, version: 0 });
const i_CloseStatusFilter: D.LazyStruct = () => ({ status: 0 });
const i_ExecutionTimeFilter: D.LazyStruct = () => ({
  oldestDate: 0,
  latestDate: 0,
});
const i_ResourceTag: D.LazyStruct = () => ({ key: 0, value: 0 });
const i_TagFilter: D.LazyStruct = () => ({ tag: 0 });
const i_TaskList: D.LazyStruct = () => ({ name: 0 });
const i_WorkflowExecution: D.LazyStruct = () => ({ workflowId: 0, runId: 0 });
const i_WorkflowExecutionFilter: D.LazyStruct = () => ({ workflowId: 0 });
const i_WorkflowType: D.LazyStruct = () => ({ name: 0, version: 0 });
const i_WorkflowTypeFilter: D.LazyStruct = () => ({ name: 0, version: 0 });
const o_ActivityTypeInfo: D.LazyStruct = () => ({
  creationDate: D.ts,
  deprecationDate: D.ts,
});
const o_HistoryEvent: D.LazyStruct = () => ({ eventTimestamp: D.ts });
const o_WorkflowExecutionInfo: D.LazyStruct = () => ({
  startTimestamp: D.ts,
  closeTimestamp: D.ts,
});
const o_WorkflowTypeInfo: D.LazyStruct = () => ({
  creationDate: D.ts,
  deprecationDate: D.ts,
});
