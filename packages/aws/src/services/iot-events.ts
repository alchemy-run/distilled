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
  sdkId: "IoT Events",
  serviceShapeName: "IotColumboService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "iotevents" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-07-27");
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
              `https://iotevents-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://iotevents-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://iotevents.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://iotevents.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
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
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(410),
  ).pipe(C.withBadRequestError) {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceAlreadyExistsException>()(
    "ResourceAlreadyExistsException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceArn: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
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
export class UnsupportedOperationException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperationException>()(
    "UnsupportedOperationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(501),
  ).pipe(C.withServerError) {}
export type AlarmModelName = string;
export type AlarmModelDescription = string;
export type AmazonResourceName = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export type Tags = Tag[];
export type AttributeJsonPath = string;
export type Severity = number;
export type InputProperty = string;
export type ComparisonOperator =
  | "GREATER"
  | "GREATER_OR_EQUAL"
  | "LESS"
  | "LESS_OR_EQUAL"
  | "EQUAL"
  | "NOT_EQUAL"
  | (string & {});
export type Threshold = string;
export interface SimpleRule {
  inputProperty: string;
  comparisonOperator: ComparisonOperator;
  threshold: string;
}
export interface AlarmRule {
  simpleRule?: SimpleRule;
}
export type ContentExpression = string;
export type PayloadType = "STRING" | "JSON" | (string & {});
export interface Payload {
  contentExpression: string;
  type: PayloadType;
}
export interface LambdaAction {
  functionArn: string;
  payload?: Payload;
}
export interface NotificationTargetActions {
  lambdaAction?: LambdaAction;
}
export type SMSSenderId = string;
export type NotificationAdditionalMessage = string;
export type IdentityStoreId = string;
export type SSOReferenceId = string;
export interface SSOIdentity {
  identityStoreId: string;
  userId?: string;
}
export interface RecipientDetail {
  ssoIdentity?: SSOIdentity;
}
export type RecipientDetails = RecipientDetail[];
export interface SMSConfiguration {
  senderId?: string;
  additionalMessage?: string;
  recipients: RecipientDetail[];
}
export type SMSConfigurations = SMSConfiguration[];
export type FromEmail = string;
export type EmailSubject = string;
export interface EmailContent {
  subject?: string;
  additionalMessage?: string;
}
export interface EmailRecipients {
  to?: RecipientDetail[];
}
export interface EmailConfiguration {
  from: string;
  content?: EmailContent;
  recipients: EmailRecipients;
}
export type EmailConfigurations = EmailConfiguration[];
export interface NotificationAction {
  action: NotificationTargetActions;
  smsConfigurations?: SMSConfiguration[];
  emailConfigurations?: EmailConfiguration[];
}
export type NotificationActions = NotificationAction[];
export interface AlarmNotification {
  notificationActions?: NotificationAction[];
}
export interface SNSTopicPublishAction {
  targetArn: string;
  payload?: Payload;
}
export type MQTTTopic = string;
export interface IotTopicPublishAction {
  mqttTopic: string;
  payload?: Payload;
}
export type InputName = string;
export interface IotEventsAction {
  inputName: string;
  payload?: Payload;
}
export type QueueUrl = string;
export type UseBase64 = boolean;
export interface SqsAction {
  queueUrl: string;
  useBase64?: boolean;
  payload?: Payload;
}
export type DeliveryStreamName = string;
export type FirehoseSeparator = string;
export interface FirehoseAction {
  deliveryStreamName: string;
  separator?: string;
  payload?: Payload;
}
export type DynamoKeyType = string;
export type DynamoKeyField = string;
export type DynamoKeyValue = string;
export type DynamoOperation = string;
export type DynamoTableName = string;
export interface DynamoDBAction {
  hashKeyType?: string;
  hashKeyField: string;
  hashKeyValue: string;
  rangeKeyType?: string;
  rangeKeyField?: string;
  rangeKeyValue?: string;
  operation?: string;
  payloadField?: string;
  tableName: string;
  payload?: Payload;
}
export interface DynamoDBv2Action {
  tableName: string;
  payload?: Payload;
}
export type AssetPropertyEntryId = string;
export type AssetId = string;
export type AssetPropertyId = string;
export type AssetPropertyAlias = string;
export type AssetPropertyStringValue = string;
export type AssetPropertyIntegerValue = string;
export type AssetPropertyDoubleValue = string;
export type AssetPropertyBooleanValue = string;
export interface AssetPropertyVariant {
  stringValue?: string;
  integerValue?: string;
  doubleValue?: string;
  booleanValue?: string;
}
export type AssetPropertyTimeInSeconds = string;
export type AssetPropertyOffsetInNanos = string;
export interface AssetPropertyTimestamp {
  timeInSeconds: string;
  offsetInNanos?: string;
}
export type AssetPropertyQuality = string;
export interface AssetPropertyValue {
  value?: AssetPropertyVariant;
  timestamp?: AssetPropertyTimestamp;
  quality?: string;
}
export interface IotSiteWiseAction {
  entryId?: string;
  assetId?: string;
  propertyId?: string;
  propertyAlias?: string;
  propertyValue?: AssetPropertyValue;
}
export interface AlarmAction {
  sns?: SNSTopicPublishAction;
  iotTopicPublish?: IotTopicPublishAction;
  lambda?: LambdaAction;
  iotEvents?: IotEventsAction;
  sqs?: SqsAction;
  firehose?: FirehoseAction;
  dynamoDB?: DynamoDBAction;
  dynamoDBv2?: DynamoDBv2Action;
  iotSiteWise?: IotSiteWiseAction;
}
export type AlarmActions = AlarmAction[];
export interface AlarmEventActions {
  alarmActions?: AlarmAction[];
}
export type DisabledOnInitialization = boolean;
export interface InitializationConfiguration {
  disabledOnInitialization: boolean;
}
export type AcknowledgeFlowEnabled = boolean;
export interface AcknowledgeFlow {
  enabled: boolean;
}
export interface AlarmCapabilities {
  initializationConfiguration?: InitializationConfiguration;
  acknowledgeFlow?: AcknowledgeFlow;
}
export interface CreateAlarmModelRequest {
  alarmModelName: string;
  alarmModelDescription?: string;
  roleArn: string;
  tags?: Tag[];
  key?: string;
  severity?: number;
  alarmRule: AlarmRule;
  alarmNotification?: AlarmNotification;
  alarmEventActions?: AlarmEventActions;
  alarmCapabilities?: AlarmCapabilities;
}
export type AlarmModelArn = string;
export type AlarmModelVersion = string;
export type AlarmModelVersionStatus =
  | "ACTIVE"
  | "ACTIVATING"
  | "INACTIVE"
  | "FAILED"
  | (string & {});
export interface CreateAlarmModelResponse {
  creationTime?: Date;
  alarmModelArn?: string;
  alarmModelVersion?: string;
  lastUpdateTime?: Date;
  status?: AlarmModelVersionStatus;
}
export type DetectorModelName = string;
export type StateName = string;
export type EventName = string;
export type Condition = string;
export type VariableName = string;
export type VariableValue = string;
export interface SetVariableAction {
  variableName: string;
  value: string;
}
export type TimerName = string;
export type Seconds = number;
export interface SetTimerAction {
  timerName: string;
  seconds?: number;
  durationExpression?: string;
}
export interface ClearTimerAction {
  timerName: string;
}
export interface ResetTimerAction {
  timerName: string;
}
export interface Action {
  setVariable?: SetVariableAction;
  sns?: SNSTopicPublishAction;
  iotTopicPublish?: IotTopicPublishAction;
  setTimer?: SetTimerAction;
  clearTimer?: ClearTimerAction;
  resetTimer?: ResetTimerAction;
  lambda?: LambdaAction;
  iotEvents?: IotEventsAction;
  sqs?: SqsAction;
  firehose?: FirehoseAction;
  dynamoDB?: DynamoDBAction;
  dynamoDBv2?: DynamoDBv2Action;
  iotSiteWise?: IotSiteWiseAction;
}
export type Actions = Action[];
export interface Event {
  eventName: string;
  condition?: string;
  actions?: Action[];
}
export type Events = Event[];
export interface TransitionEvent {
  eventName: string;
  condition: string;
  actions?: Action[];
  nextState: string;
}
export type TransitionEvents = TransitionEvent[];
export interface OnInputLifecycle {
  events?: Event[];
  transitionEvents?: TransitionEvent[];
}
export interface OnEnterLifecycle {
  events?: Event[];
}
export interface OnExitLifecycle {
  events?: Event[];
}
export interface State {
  stateName: string;
  onInput?: OnInputLifecycle;
  onEnter?: OnEnterLifecycle;
  onExit?: OnExitLifecycle;
}
export type States = State[];
export interface DetectorModelDefinition {
  states: State[];
  initialStateName: string;
}
export type DetectorModelDescription = string;
export type EvaluationMethod = "BATCH" | "SERIAL" | (string & {});
export interface CreateDetectorModelRequest {
  detectorModelName: string;
  detectorModelDefinition: DetectorModelDefinition;
  detectorModelDescription?: string;
  key?: string;
  roleArn: string;
  tags?: Tag[];
  evaluationMethod?: EvaluationMethod;
}
export type DetectorModelVersion = string;
export type DetectorModelArn = string;
export type DetectorModelVersionStatus =
  | "ACTIVE"
  | "ACTIVATING"
  | "INACTIVE"
  | "DEPRECATED"
  | "DRAFT"
  | "PAUSED"
  | "FAILED"
  | (string & {});
export interface DetectorModelConfiguration {
  detectorModelName?: string;
  detectorModelVersion?: string;
  detectorModelDescription?: string;
  detectorModelArn?: string;
  roleArn?: string;
  creationTime?: Date;
  lastUpdateTime?: Date;
  status?: DetectorModelVersionStatus;
  key?: string;
  evaluationMethod?: EvaluationMethod;
}
export interface CreateDetectorModelResponse {
  detectorModelConfiguration?: DetectorModelConfiguration;
}
export type InputDescription = string;
export interface Attribute {
  jsonPath: string;
}
export type Attributes = Attribute[];
export interface InputDefinition {
  attributes: Attribute[];
}
export interface CreateInputRequest {
  inputName: string;
  inputDescription?: string;
  inputDefinition: InputDefinition;
  tags?: Tag[];
}
export type InputArn = string;
export type InputStatus = "CREATING" | "UPDATING" | "ACTIVE" | "DELETING" | (string & {});
export interface InputConfiguration {
  inputName: string;
  inputDescription?: string;
  inputArn: string;
  creationTime: Date;
  lastUpdateTime: Date;
  status: InputStatus;
}
export interface CreateInputResponse {
  inputConfiguration?: InputConfiguration;
}
export interface DeleteAlarmModelRequest {
  alarmModelName: string;
}
export interface DeleteAlarmModelResponse {}
export interface DeleteDetectorModelRequest {
  detectorModelName: string;
}
export interface DeleteDetectorModelResponse {}
export interface DeleteInputRequest {
  inputName: string;
}
export interface DeleteInputResponse {}
export interface DescribeAlarmModelRequest {
  alarmModelName: string;
  alarmModelVersion?: string;
}
export type StatusMessage = string;
export interface DescribeAlarmModelResponse {
  creationTime?: Date;
  alarmModelArn?: string;
  alarmModelVersion?: string;
  lastUpdateTime?: Date;
  status?: AlarmModelVersionStatus;
  statusMessage?: string;
  alarmModelName?: string;
  alarmModelDescription?: string;
  roleArn?: string;
  key?: string;
  severity?: number;
  alarmRule?: AlarmRule;
  alarmNotification?: AlarmNotification;
  alarmEventActions?: AlarmEventActions;
  alarmCapabilities?: AlarmCapabilities;
}
export interface DescribeDetectorModelRequest {
  detectorModelName: string;
  detectorModelVersion?: string;
}
export interface DetectorModel {
  detectorModelDefinition?: DetectorModelDefinition;
  detectorModelConfiguration?: DetectorModelConfiguration;
}
export interface DescribeDetectorModelResponse {
  detectorModel?: DetectorModel;
}
export type AnalysisId = string;
export interface DescribeDetectorModelAnalysisRequest {
  analysisId: string;
}
export type AnalysisStatus = "RUNNING" | "COMPLETE" | "FAILED" | (string & {});
export interface DescribeDetectorModelAnalysisResponse {
  status?: AnalysisStatus;
}
export interface DescribeInputRequest {
  inputName: string;
}
export interface Input {
  inputConfiguration?: InputConfiguration;
  inputDefinition?: InputDefinition;
}
export interface DescribeInputResponse {
  input?: Input;
}
export interface DescribeLoggingOptionsRequest {}
export type LoggingLevel = "ERROR" | "INFO" | "DEBUG" | (string & {});
export type LoggingEnabled = boolean;
export type KeyValue = string;
export interface DetectorDebugOption {
  detectorModelName: string;
  keyValue?: string;
}
export type DetectorDebugOptions = DetectorDebugOption[];
export interface LoggingOptions {
  roleArn: string;
  level: LoggingLevel;
  enabled: boolean;
  detectorDebugOptions?: DetectorDebugOption[];
}
export interface DescribeLoggingOptionsResponse {
  loggingOptions?: LoggingOptions;
}
export type NextToken = string;
export type MaxAnalysisResults = number;
export interface GetDetectorModelAnalysisResultsRequest {
  analysisId: string;
  nextToken?: string;
  maxResults?: number;
}
export type AnalysisType = string;
export type AnalysisResultLevel = "INFO" | "WARNING" | "ERROR" | (string & {});
export type AnalysisMessage = string;
export type AnalysisResultLocationPath = string;
export interface AnalysisResultLocation {
  path?: string;
}
export type AnalysisResultLocations = AnalysisResultLocation[];
export interface AnalysisResult {
  type?: string;
  level?: AnalysisResultLevel;
  message?: string;
  locations?: AnalysisResultLocation[];
}
export type AnalysisResults = AnalysisResult[];
export interface GetDetectorModelAnalysisResultsResponse {
  analysisResults?: AnalysisResult[];
  nextToken?: string;
}
export type MaxResults = number;
export interface ListAlarmModelsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface AlarmModelSummary {
  creationTime?: Date;
  alarmModelDescription?: string;
  alarmModelName?: string;
}
export type AlarmModelSummaries = AlarmModelSummary[];
export interface ListAlarmModelsResponse {
  alarmModelSummaries?: AlarmModelSummary[];
  nextToken?: string;
}
export interface ListAlarmModelVersionsRequest {
  alarmModelName: string;
  nextToken?: string;
  maxResults?: number;
}
export interface AlarmModelVersionSummary {
  alarmModelName?: string;
  alarmModelArn?: string;
  alarmModelVersion?: string;
  roleArn?: string;
  creationTime?: Date;
  lastUpdateTime?: Date;
  status?: AlarmModelVersionStatus;
  statusMessage?: string;
}
export type AlarmModelVersionSummaries = AlarmModelVersionSummary[];
export interface ListAlarmModelVersionsResponse {
  alarmModelVersionSummaries?: AlarmModelVersionSummary[];
  nextToken?: string;
}
export interface ListDetectorModelsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface DetectorModelSummary {
  detectorModelName?: string;
  detectorModelDescription?: string;
  creationTime?: Date;
}
export type DetectorModelSummaries = DetectorModelSummary[];
export interface ListDetectorModelsResponse {
  detectorModelSummaries?: DetectorModelSummary[];
  nextToken?: string;
}
export interface ListDetectorModelVersionsRequest {
  detectorModelName: string;
  nextToken?: string;
  maxResults?: number;
}
export interface DetectorModelVersionSummary {
  detectorModelName?: string;
  detectorModelVersion?: string;
  detectorModelArn?: string;
  roleArn?: string;
  creationTime?: Date;
  lastUpdateTime?: Date;
  status?: DetectorModelVersionStatus;
  evaluationMethod?: EvaluationMethod;
}
export type DetectorModelVersionSummaries = DetectorModelVersionSummary[];
export interface ListDetectorModelVersionsResponse {
  detectorModelVersionSummaries?: DetectorModelVersionSummary[];
  nextToken?: string;
}
export interface IotEventsInputIdentifier {
  inputName: string;
}
export type AssetModelId = string;
export interface IotSiteWiseAssetModelPropertyIdentifier {
  assetModelId: string;
  propertyId: string;
}
export interface IotSiteWiseInputIdentifier {
  iotSiteWiseAssetModelPropertyIdentifier?: IotSiteWiseAssetModelPropertyIdentifier;
}
export interface InputIdentifier {
  iotEventsInputIdentifier?: IotEventsInputIdentifier;
  iotSiteWiseInputIdentifier?: IotSiteWiseInputIdentifier;
}
export interface ListInputRoutingsRequest {
  inputIdentifier: InputIdentifier;
  maxResults?: number;
  nextToken?: string;
}
export type ResourceName = string;
export interface RoutedResource {
  name?: string;
  arn?: string;
}
export type RoutedResources = RoutedResource[];
export interface ListInputRoutingsResponse {
  routedResources?: RoutedResource[];
  nextToken?: string;
}
export interface ListInputsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface InputSummary {
  inputName?: string;
  inputDescription?: string;
  inputArn?: string;
  creationTime?: Date;
  lastUpdateTime?: Date;
  status?: InputStatus;
}
export type InputSummaries = InputSummary[];
export interface ListInputsResponse {
  inputSummaries?: InputSummary[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: Tag[];
}
export interface PutLoggingOptionsRequest {
  loggingOptions: LoggingOptions;
}
export interface PutLoggingOptionsResponse {}
export interface StartDetectorModelAnalysisRequest {
  detectorModelDefinition: DetectorModelDefinition;
}
export interface StartDetectorModelAnalysisResponse {
  analysisId?: string;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeys = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAlarmModelRequest {
  alarmModelName: string;
  alarmModelDescription?: string;
  roleArn: string;
  severity?: number;
  alarmRule: AlarmRule;
  alarmNotification?: AlarmNotification;
  alarmEventActions?: AlarmEventActions;
  alarmCapabilities?: AlarmCapabilities;
}
export interface UpdateAlarmModelResponse {
  creationTime?: Date;
  alarmModelArn?: string;
  alarmModelVersion?: string;
  lastUpdateTime?: Date;
  status?: AlarmModelVersionStatus;
}
export interface UpdateDetectorModelRequest {
  detectorModelName: string;
  detectorModelDefinition: DetectorModelDefinition;
  detectorModelDescription?: string;
  roleArn: string;
  evaluationMethod?: EvaluationMethod;
}
export interface UpdateDetectorModelResponse {
  detectorModelConfiguration?: DetectorModelConfiguration;
}
export interface UpdateInputRequest {
  inputName: string;
  inputDescription?: string;
  inputDefinition: InputDefinition;
}
export interface UpdateInputResponse {
  inputConfiguration?: InputConfiguration;
}
export type ErrorMessage = string;
export type ResourceId = string;
export type ResourceArn = string;
export type CreateAlarmModelError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an alarm model to monitor an AWS IoT Events input attribute. You can use the alarm to get
 * notified when the value is outside a specified range. For more information, see Create an
 * alarm model in the *AWS IoT Events Developer Guide*.
 */
export const createAlarmModel: API.OperationMethod<
  CreateAlarmModelRequest,
  CreateAlarmModelResponse,
  CreateAlarmModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c32, 0) as any as S.Schema<CreateAlarmModelRequest>,
  output: __S(1152, __c36, 0) as any as S.Schema<CreateAlarmModelResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAlarmModel",
}));

export type CreateDetectorModelError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a detector model.
 */
export const createDetectorModel: API.OperationMethod<
  CreateDetectorModelRequest,
  CreateDetectorModelResponse,
  CreateDetectorModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateDetectorModelRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<CreateDetectorModelResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDetectorModel",
}));

export type CreateInputError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an input.
 */
export const createInput: API.OperationMethod<
  CreateInputRequest,
  CreateInputResponse,
  CreateInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c4, 0) as any as S.Schema<CreateInputRequest>,
  output: __S(192, __c6, 0) as any as S.Schema<CreateInputResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInput",
}));

export type DeleteAlarmModelError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an alarm model. Any alarm instances that were created based on this alarm model
 * are also deleted. This action can't be undone.
 */
export const deleteAlarmModel: API.OperationMethod<
  DeleteAlarmModelRequest,
  DeleteAlarmModelResponse,
  DeleteAlarmModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c7, 0) as any as S.Schema<DeleteAlarmModelRequest>,
  output: __S(256, __c8, 0) as any as S.Schema<DeleteAlarmModelResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAlarmModel",
}));

export type DeleteDetectorModelError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a detector model. Any active instances of the detector model are also
 * deleted.
 */
export const deleteDetectorModel: API.OperationMethod<
  DeleteDetectorModelRequest,
  DeleteDetectorModelResponse,
  DeleteDetectorModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c9, 0) as any as S.Schema<DeleteDetectorModelRequest>,
  output: __S(256, __c8, 0) as any as S.Schema<DeleteDetectorModelResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDetectorModel",
}));

export type DeleteInputError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an input.
 */
export const deleteInput: API.OperationMethod<
  DeleteInputRequest,
  DeleteInputResponse,
  DeleteInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c10, 0) as any as S.Schema<DeleteInputRequest>,
  output: __S(256, __c8, 0) as any as S.Schema<DeleteInputResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInput",
}));

export type DescribeAlarmModelError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about an alarm model. If you don't specify a value for the
 * `alarmModelVersion` parameter, the latest version is returned.
 */
export const describeAlarmModel: API.OperationMethod<
  DescribeAlarmModelRequest,
  DescribeAlarmModelResponse,
  DescribeAlarmModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c11, 0) as any as S.Schema<DescribeAlarmModelRequest>,
  output: __S(353, __c11, 1) as any as S.Schema<DescribeAlarmModelResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAlarmModel",
}));

export type DescribeDetectorModelError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes a detector model. If the `version` parameter is not specified,
 * information about the latest version is returned.
 */
export const describeDetectorModel: API.OperationMethod<
  DescribeDetectorModelRequest,
  DescribeDetectorModelResponse,
  DescribeDetectorModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c12, 0) as any as S.Schema<DescribeDetectorModelRequest>,
  output: __S(386, __c12, 2) as any as S.Schema<DescribeDetectorModelResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDetectorModel",
}));

export type DescribeDetectorModelAnalysisError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves runtime information about a detector model analysis.
 *
 * After AWS IoT Events starts analyzing your detector model, you have up to 24 hours to retrieve the analysis results.
 */
export const describeDetectorModelAnalysis: API.OperationMethod<
  DescribeDetectorModelAnalysisRequest,
  DescribeDetectorModelAnalysisResponse,
  DescribeDetectorModelAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c13, 0) as any as S.Schema<DescribeDetectorModelAnalysisRequest>,
  output: __S(417, __c13, 1) as any as S.Schema<DescribeDetectorModelAnalysisResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDetectorModelAnalysis",
}));

export type DescribeInputError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes an input.
 */
export const describeInput: API.OperationMethod<
  DescribeInputRequest,
  DescribeInputResponse,
  DescribeInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c14, 0) as any as S.Schema<DescribeInputRequest>,
  output: __S(450, __c14, 2) as any as S.Schema<DescribeInputResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInput",
}));

export type DescribeLoggingOptionsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Retrieves the current settings of the AWS IoT Events logging options.
 */
export const describeLoggingOptions: API.OperationMethod<
  DescribeLoggingOptionsRequest,
  DescribeLoggingOptionsResponse,
  DescribeLoggingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c15, 0) as any as S.Schema<DescribeLoggingOptionsRequest>,
  output: __S(481, __c15, 1) as any as S.Schema<DescribeLoggingOptionsResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLoggingOptions",
}));

export type GetDetectorModelAnalysisResultsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves one or more analysis results of the detector model.
 *
 * After AWS IoT Events starts analyzing your detector model, you have up to 24 hours to retrieve the analysis results.
 */
export const getDetectorModelAnalysisResults: API.OperationMethod<
  GetDetectorModelAnalysisResultsRequest,
  GetDetectorModelAnalysisResultsResponse,
  GetDetectorModelAnalysisResultsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c17, 0) as any as S.Schema<GetDetectorModelAnalysisResultsRequest>,
  output: __S(549, __c17, 5) as any as S.Schema<GetDetectorModelAnalysisResultsResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDetectorModelAnalysisResults",
}));

export type ListAlarmModelsError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the alarm models that you created. The operation returns only the metadata
 * associated with each alarm model.
 */
export const listAlarmModels: API.OperationMethod<
  ListAlarmModelsRequest,
  ListAlarmModelsResponse,
  ListAlarmModelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c18, 0) as any as S.Schema<ListAlarmModelsRequest>,
  output: __S(579, __c18, 3) as any as S.Schema<ListAlarmModelsResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAlarmModels",
}));

export type ListAlarmModelVersionsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all the versions of an alarm model. The operation returns only the metadata
 * associated with each alarm model version.
 */
export const listAlarmModelVersions: API.OperationMethod<
  ListAlarmModelVersionsRequest,
  ListAlarmModelVersionsResponse,
  ListAlarmModelVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c19, 0) as any as S.Schema<ListAlarmModelVersionsRequest>,
  output: __S(611, __c19, 3) as any as S.Schema<ListAlarmModelVersionsResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAlarmModelVersions",
}));

export type ListDetectorModelsError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the detector models you have created. Only the metadata associated with each
 * detector model is returned.
 */
export const listDetectorModels: API.OperationMethod<
  ListDetectorModelsRequest,
  ListDetectorModelsResponse,
  ListDetectorModelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c20, 0) as any as S.Schema<ListDetectorModelsRequest>,
  output: __S(643, __c20, 3) as any as S.Schema<ListDetectorModelsResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDetectorModels",
}));

export type ListDetectorModelVersionsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all the versions of a detector model. Only the metadata associated with each
 * detector model version is returned.
 */
export const listDetectorModelVersions: API.OperationMethod<
  ListDetectorModelVersionsRequest,
  ListDetectorModelVersionsResponse,
  ListDetectorModelVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c21, 0) as any as S.Schema<ListDetectorModelVersionsRequest>,
  output: __S(675, __c21, 3) as any as S.Schema<ListDetectorModelVersionsResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDetectorModelVersions",
}));

export type ListInputRoutingsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists one or more input routings.
 */
export const listInputRoutings: API.OperationMethod<
  ListInputRoutingsRequest,
  ListInputRoutingsResponse,
  ListInputRoutingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(708, __c22, 4) as any as S.Schema<ListInputRoutingsRequest>,
  output: __S(711, __c22, 7) as any as S.Schema<ListInputRoutingsResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInputRoutings",
}));

export type ListInputsError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the inputs you have created.
 */
export const listInputs: API.OperationMethod<
  ListInputsRequest,
  ListInputsResponse,
  ListInputsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c23, 0) as any as S.Schema<ListInputsRequest>,
  output: __S(739, __c23, 3) as any as S.Schema<ListInputsResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInputs",
}));

export type ListTagsForResourceError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the tags (metadata) you have assigned to the resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c24, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(769, __c24, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutLoggingOptionsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceInUseException
  | ServiceUnavailableException
  | ThrottlingException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Sets or updates the AWS IoT Events logging options.
 *
 * If you update the value of any `loggingOptions` field, it takes up to one
 * minute for the change to take effect. If you change the policy attached to the role you
 * specified in the `roleArn` field (for example, to correct an invalid policy), it
 * takes up to five minutes for that change to take effect.
 */
export const putLoggingOptions: API.OperationMethod<
  PutLoggingOptionsRequest,
  PutLoggingOptionsResponse,
  PutLoggingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c25, 0) as any as S.Schema<PutLoggingOptionsRequest>,
  output: __S(256, __c8, 0) as any as S.Schema<PutLoggingOptionsResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceInUseException,
    ServiceUnavailableException,
    ThrottlingException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutLoggingOptions",
}));

export type StartDetectorModelAnalysisError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Performs an analysis of your detector model. For more information,
 * see Troubleshooting a detector model
 * in the *AWS IoT Events Developer Guide*.
 */
export const startDetectorModelAnalysis: API.OperationMethod<
  StartDetectorModelAnalysisRequest,
  StartDetectorModelAnalysisResponse,
  StartDetectorModelAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c26, 0) as any as S.Schema<StartDetectorModelAnalysisRequest>,
  output: __S(833, __c26, 1) as any as S.Schema<StartDetectorModelAnalysisResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDetectorModelAnalysis",
}));

export type TagResourceError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds to or modifies the tags of the given resource. Tags are metadata that can be used to
 * manage a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c27, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(256, __c8, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes the given tags (metadata) from the resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(897, __c28, 1) as any as S.Schema<UntagResourceRequest>,
  output: __S(256, __c8, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAlarmModelError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an alarm model. Any alarms that were created based on the previous version are
 * deleted and then created again as new data arrives.
 */
export const updateAlarmModel: API.OperationMethod<
  UpdateAlarmModelRequest,
  UpdateAlarmModelResponse,
  UpdateAlarmModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c29, 0) as any as S.Schema<UpdateAlarmModelRequest>,
  output: __S(1152, __c36, 0) as any as S.Schema<UpdateAlarmModelResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAlarmModel",
}));

export type UpdateDetectorModelError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a detector model. Detectors (instances) spawned by the previous version are
 * deleted and then re-created as new inputs arrive.
 */
export const updateDetectorModel: API.OperationMethod<
  UpdateDetectorModelRequest,
  UpdateDetectorModelResponse,
  UpdateDetectorModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c30, 0) as any as S.Schema<UpdateDetectorModelRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<UpdateDetectorModelResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDetectorModel",
}));

export type UpdateInputError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an input.
 */
export const updateInput: API.OperationMethod<
  UpdateInputRequest,
  UpdateInputResponse,
  UpdateInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c31, 0) as any as S.Schema<UpdateInputRequest>,
  output: __S(192, __c6, 0) as any as S.Schema<UpdateInputResponse>,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateInput",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          detectorModelName: S.String,
          detectorModelDefinition: __S(45, __c1, 13),
          detectorModelDescription: S.optional(S.String),
          key: S.optional(S.String),
          roleArn: S.String,
          tags: S.optional(__S(1057, __c33, 1)),
          evaluationMethod: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/detector-models" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({
        identifier: "CreateDetectorModelRequest",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ variableName: S.String, value: S.String })).annotate({
        identifier: "SetVariableAction",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          timerName: S.String,
          seconds: S.optional(S.Number),
          durationExpression: S.optional(S.String),
        }),
      ).annotate({ identifier: "SetTimerAction" });
    case 2:
      return S.suspend(() => S.Struct({ timerName: S.String })).annotate({
        identifier: "ClearTimerAction",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          setVariable: S.optional(__S(32, __c1, 0)),
          sns: S.optional(__S(1090, __c34, 2)),
          iotTopicPublish: S.optional(__S(1091, __c34, 3)),
          setTimer: S.optional(__S(33, __c1, 1)),
          clearTimer: S.optional(__S(34, __c1, 2)),
          resetTimer: S.optional(__S(34, __c1, 2)),
          lambda: S.optional(__S(1089, __c34, 1)),
          iotEvents: S.optional(__S(1092, __c34, 4)),
          sqs: S.optional(__S(1093, __c34, 5)),
          firehose: S.optional(__S(1094, __c34, 6)),
          dynamoDB: S.optional(__S(1095, __c34, 7)),
          dynamoDBv2: S.optional(__S(1096, __c34, 8)),
          iotSiteWise: S.optional(__S(1100, __c34, 12)),
        }),
      ).annotate({ identifier: "Action" });
    case 4:
      return S.Array(__S(35, __c1, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          eventName: S.String,
          condition: S.optional(S.String),
          actions: S.optional(__S(36, __c1, 4)),
        }),
      ).annotate({ identifier: "Event" });
    case 6:
      return S.Array(__S(37, __c1, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          eventName: S.String,
          condition: S.String,
          actions: S.optional(__S(36, __c1, 4)),
          nextState: S.String,
        }),
      ).annotate({
        identifier: "TransitionEvent",
      });
    case 8:
      return S.Array(__S(39, __c1, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          events: S.optional(__S(38, __c1, 6)),
          transitionEvents: S.optional(__S(40, __c1, 8)),
        }),
      ).annotate({
        identifier: "OnInputLifecycle",
      });
    case 10:
      return S.suspend(() => S.Struct({ events: S.optional(__S(38, __c1, 6)) })).annotate({
        identifier: "OnEnterLifecycle",
      });
    case 11:
      return S.suspend(() =>
        S.Struct({
          stateName: S.String,
          onInput: S.optional(__S(41, __c1, 9)),
          onEnter: S.optional(__S(42, __c1, 10)),
          onExit: S.optional(__S(42, __c1, 10)),
        }),
      ).annotate({ identifier: "State" });
    case 12:
      return S.Array(__S(43, __c1, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({ states: __S(44, __c1, 12), initialStateName: S.String }),
      ).annotate({
        identifier: "DetectorModelDefinition",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          detectorModelName: S.optional(S.String),
          detectorModelVersion: S.optional(S.String),
          detectorModelDescription: S.optional(S.String),
          detectorModelArn: S.optional(S.String),
          roleArn: S.optional(S.String),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          key: S.optional(S.String),
          evaluationMethod: S.optional(S.String),
        }),
      ).annotate({
        identifier: "DetectorModelConfiguration",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          detectorModelConfiguration: S.optional(__S(64, __c2, 0)),
        }),
      ).annotate({
        identifier: "CreateDetectorModelResponse",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          inputName: S.String,
          inputDescription: S.optional(S.String),
          inputDefinition: __S(162, __c5, 2),
          tags: S.optional(__S(1057, __c33, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/inputs" }), svc, auth, proto, ver, rules)),
      ).annotate({
        identifier: "CreateInputRequest",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ jsonPath: S.String })).annotate({
        identifier: "Attribute",
      });
    case 1:
      return S.Array(__S(160, __c5, 0));
    case 2:
      return S.suspend(() => S.Struct({ attributes: __S(161, __c5, 1) })).annotate({
        identifier: "InputDefinition",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          inputName: S.String,
          inputDescription: S.optional(S.String),
          inputArn: S.String,
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastUpdateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          status: S.String,
        }),
      ).annotate({
        identifier: "InputConfiguration",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ inputConfiguration: S.optional(__S(163, __c5, 3)) }),
      ).annotate({
        identifier: "CreateInputResponse",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          alarmModelName: S.String.pipe(T.HttpLabel("alarmModelName")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/alarm-models/{alarmModelName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({
        identifier: "DeleteAlarmModelRequest",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "DeleteAlarmModelResponse",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          detectorModelName: S.String.pipe(T.HttpLabel("detectorModelName")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/detector-models/{detectorModelName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({
        identifier: "DeleteDetectorModelRequest",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ inputName: S.String.pipe(T.HttpLabel("inputName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/inputs/{inputName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({
        identifier: "DeleteInputRequest",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          alarmModelName: S.String.pipe(T.HttpLabel("alarmModelName")),
          alarmModelVersion: S.optional(S.String).pipe(T.HttpQuery("version")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/alarm-models/{alarmModelName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({
        identifier: "DescribeAlarmModelRequest",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          alarmModelArn: S.optional(S.String),
          alarmModelVersion: S.optional(S.String),
          lastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          statusMessage: S.optional(S.String),
          alarmModelName: S.optional(S.String),
          alarmModelDescription: S.optional(S.String),
          roleArn: S.optional(S.String),
          key: S.optional(S.String),
          severity: S.optional(S.Number),
          alarmRule: S.optional(__S(1121, __c35, 1)),
          alarmNotification: S.optional(__S(1134, __c35, 14)),
          alarmEventActions: S.optional(__S(1137, __c35, 17)),
          alarmCapabilities: S.optional(__S(1140, __c35, 20)),
        }),
      ).annotate({
        identifier: "DescribeAlarmModelResponse",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          detectorModelName: S.String.pipe(T.HttpLabel("detectorModelName")),
          detectorModelVersion: S.optional(S.String).pipe(T.HttpQuery("version")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/detector-models/{detectorModelName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({
        identifier: "DescribeDetectorModelRequest",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          detectorModelDefinition: S.optional(__S(45, __c1, 13)),
          detectorModelConfiguration: S.optional(__S(64, __c2, 0)),
        }),
      ).annotate({ identifier: "DetectorModel" });
    case 2:
      return S.suspend(() => S.Struct({ detectorModel: S.optional(__S(385, __c12, 1)) })).annotate({
        identifier: "DescribeDetectorModelResponse",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ analysisId: S.String.pipe(T.HttpLabel("analysisId")) }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/analysis/detector-models/{analysisId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({
        identifier: "DescribeDetectorModelAnalysisRequest",
      });
    case 1:
      return S.suspend(() => S.Struct({ status: S.optional(S.String) })).annotate({
        identifier: "DescribeDetectorModelAnalysisResponse",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ inputName: S.String.pipe(T.HttpLabel("inputName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/inputs/{inputName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({
        identifier: "DescribeInputRequest",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          inputConfiguration: S.optional(__S(163, __c5, 3)),
          inputDefinition: S.optional(__S(162, __c5, 2)),
        }),
      ).annotate({ identifier: "Input" });
    case 2:
      return S.suspend(() => S.Struct({ input: S.optional(__S(449, __c14, 1)) })).annotate({
        identifier: "DescribeInputResponse",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/logging" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({
        identifier: "DescribeLoggingOptionsRequest",
      });
    case 1:
      return S.suspend(() => S.Struct({ loggingOptions: S.optional(__S(514, __c16, 2)) })).annotate(
        {
          identifier: "DescribeLoggingOptionsResponse",
        },
      );
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ detectorModelName: S.String, keyValue: S.optional(S.String) }),
      ).annotate({
        identifier: "DetectorDebugOption",
      });
    case 1:
      return S.Array(__S(512, __c16, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          roleArn: S.String,
          level: S.String,
          enabled: S.Boolean,
          detectorDebugOptions: S.optional(__S(513, __c16, 1)),
        }),
      ).annotate({ identifier: "LoggingOptions" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          analysisId: S.String.pipe(T.HttpLabel("analysisId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/analysis/detector-models/{analysisId}/results",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({
        identifier: "GetDetectorModelAnalysisResultsRequest",
      });
    case 1:
      return S.suspend(() => S.Struct({ path: S.optional(S.String) })).annotate({
        identifier: "AnalysisResultLocation",
      });
    case 2:
      return S.Array(__S(545, __c17, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          level: S.optional(S.String),
          message: S.optional(S.String),
          locations: S.optional(__S(546, __c17, 2)),
        }),
      ).annotate({ identifier: "AnalysisResult" });
    case 4:
      return S.Array(__S(547, __c17, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          analysisResults: S.optional(__S(548, __c17, 4)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({
        identifier: "GetDetectorModelAnalysisResultsResponse",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/alarm-models" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({
        identifier: "ListAlarmModelsRequest",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          alarmModelDescription: S.optional(S.String),
          alarmModelName: S.optional(S.String),
        }),
      ).annotate({
        identifier: "AlarmModelSummary",
      });
    case 2:
      return S.Array(__S(577, __c18, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          alarmModelSummaries: S.optional(__S(578, __c18, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({
        identifier: "ListAlarmModelsResponse",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          alarmModelName: S.String.pipe(T.HttpLabel("alarmModelName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/alarm-models/{alarmModelName}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({
        identifier: "ListAlarmModelVersionsRequest",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          alarmModelName: S.optional(S.String),
          alarmModelArn: S.optional(S.String),
          alarmModelVersion: S.optional(S.String),
          roleArn: S.optional(S.String),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          statusMessage: S.optional(S.String),
        }),
      ).annotate({
        identifier: "AlarmModelVersionSummary",
      });
    case 2:
      return S.Array(__S(609, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          alarmModelVersionSummaries: S.optional(__S(610, __c19, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({
        identifier: "ListAlarmModelVersionsResponse",
      });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/detector-models" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({
        identifier: "ListDetectorModelsRequest",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          detectorModelName: S.optional(S.String),
          detectorModelDescription: S.optional(S.String),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({
        identifier: "DetectorModelSummary",
      });
    case 2:
      return S.Array(__S(641, __c20, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          detectorModelSummaries: S.optional(__S(642, __c20, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({
        identifier: "ListDetectorModelsResponse",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          detectorModelName: S.String.pipe(T.HttpLabel("detectorModelName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/detector-models/{detectorModelName}/versions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({
        identifier: "ListDetectorModelVersionsRequest",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          detectorModelName: S.optional(S.String),
          detectorModelVersion: S.optional(S.String),
          detectorModelArn: S.optional(S.String),
          roleArn: S.optional(S.String),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          evaluationMethod: S.optional(S.String),
        }),
      ).annotate({
        identifier: "DetectorModelVersionSummary",
      });
    case 2:
      return S.Array(__S(673, __c21, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          detectorModelVersionSummaries: S.optional(__S(674, __c21, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({
        identifier: "ListDetectorModelVersionsResponse",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ inputName: S.String })).annotate({
        identifier: "IotEventsInputIdentifier",
      });
    case 1:
      return S.suspend(() => S.Struct({ assetModelId: S.String, propertyId: S.String })).annotate({
        identifier: "IotSiteWiseAssetModelPropertyIdentifier",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          iotSiteWiseAssetModelPropertyIdentifier: S.optional(__S(705, __c22, 1)),
        }),
      ).annotate({
        identifier: "IotSiteWiseInputIdentifier",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          iotEventsInputIdentifier: S.optional(__S(704, __c22, 0)),
          iotSiteWiseInputIdentifier: S.optional(__S(706, __c22, 2)),
        }),
      ).annotate({
        identifier: "InputIdentifier",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          inputIdentifier: __S(707, __c22, 3),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/input-routings" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({
        identifier: "ListInputRoutingsRequest",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), arn: S.optional(S.String) }),
      ).annotate({ identifier: "RoutedResource" });
    case 6:
      return S.Array(__S(709, __c22, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          routedResources: S.optional(__S(710, __c22, 6)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({
        identifier: "ListInputRoutingsResponse",
      });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/inputs" }), svc, auth, proto, ver, rules)),
      ).annotate({
        identifier: "ListInputsRequest",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          inputName: S.optional(S.String),
          inputDescription: S.optional(S.String),
          inputArn: S.optional(S.String),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "InputSummary" });
    case 2:
      return S.Array(__S(737, __c23, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          inputSummaries: S.optional(__S(738, __c23, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({
        identifier: "ListInputsResponse",
      });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpQuery("resourceArn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/tags" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({
        identifier: "ListTagsForResourceRequest",
      });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(1057, __c33, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ loggingOptions: __S(514, __c16, 2) }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/logging" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({
        identifier: "PutLoggingOptionsRequest",
      });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ detectorModelDefinition: __S(45, __c1, 13) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/analysis/detector-models" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({
        identifier: "StartDetectorModelAnalysisRequest",
      });
    case 1:
      return S.suspend(() => S.Struct({ analysisId: S.optional(S.String) })).annotate({
        identifier: "StartDetectorModelAnalysisResponse",
      });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
          tags: __S(1057, __c33, 1),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/tags" }), svc, auth, proto, ver, rules)),
      ).annotate({
        identifier: "TagResourceRequest",
      });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
          tagKeys: __S(896, __c28, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(T.all(T.Http({ method: "DELETE", uri: "/tags" }), svc, auth, proto, ver, rules)),
      ).annotate({
        identifier: "UntagResourceRequest",
      });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          alarmModelName: S.String.pipe(T.HttpLabel("alarmModelName")),
          alarmModelDescription: S.optional(S.String),
          roleArn: S.String,
          severity: S.optional(S.Number),
          alarmRule: __S(1121, __c35, 1),
          alarmNotification: S.optional(__S(1134, __c35, 14)),
          alarmEventActions: S.optional(__S(1137, __c35, 17)),
          alarmCapabilities: S.optional(__S(1140, __c35, 20)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/alarm-models/{alarmModelName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({
        identifier: "UpdateAlarmModelRequest",
      });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          detectorModelName: S.String.pipe(T.HttpLabel("detectorModelName")),
          detectorModelDefinition: __S(45, __c1, 13),
          detectorModelDescription: S.optional(S.String),
          roleArn: S.String,
          evaluationMethod: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/detector-models/{detectorModelName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({
        identifier: "UpdateDetectorModelRequest",
      });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          inputName: S.String.pipe(T.HttpLabel("inputName")),
          inputDescription: S.optional(S.String),
          inputDefinition: __S(162, __c5, 2),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/inputs/{inputName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({
        identifier: "UpdateInputRequest",
      });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          alarmModelName: S.String,
          alarmModelDescription: S.optional(S.String),
          roleArn: S.String,
          tags: S.optional(__S(1057, __c33, 1)),
          key: S.optional(S.String),
          severity: S.optional(S.Number),
          alarmRule: __S(1121, __c35, 1),
          alarmNotification: S.optional(__S(1134, __c35, 14)),
          alarmEventActions: S.optional(__S(1137, __c35, 17)),
          alarmCapabilities: S.optional(__S(1140, __c35, 20)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/alarm-models" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({
        identifier: "CreateAlarmModelRequest",
      });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(1056, __c33, 0));
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ contentExpression: S.String, type: S.String })).annotate({
        identifier: "Payload",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ functionArn: S.String, payload: S.optional(__S(1088, __c34, 0)) }),
      ).annotate({ identifier: "LambdaAction" });
    case 2:
      return S.suspend(() =>
        S.Struct({ targetArn: S.String, payload: S.optional(__S(1088, __c34, 0)) }),
      ).annotate({
        identifier: "SNSTopicPublishAction",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({ mqttTopic: S.String, payload: S.optional(__S(1088, __c34, 0)) }),
      ).annotate({
        identifier: "IotTopicPublishAction",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({ inputName: S.String, payload: S.optional(__S(1088, __c34, 0)) }),
      ).annotate({
        identifier: "IotEventsAction",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          queueUrl: S.String,
          useBase64: S.optional(S.Boolean),
          payload: S.optional(__S(1088, __c34, 0)),
        }),
      ).annotate({ identifier: "SqsAction" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          deliveryStreamName: S.String,
          separator: S.optional(S.String),
          payload: S.optional(__S(1088, __c34, 0)),
        }),
      ).annotate({ identifier: "FirehoseAction" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          hashKeyType: S.optional(S.String),
          hashKeyField: S.String,
          hashKeyValue: S.String,
          rangeKeyType: S.optional(S.String),
          rangeKeyField: S.optional(S.String),
          rangeKeyValue: S.optional(S.String),
          operation: S.optional(S.String),
          payloadField: S.optional(S.String),
          tableName: S.String,
          payload: S.optional(__S(1088, __c34, 0)),
        }),
      ).annotate({ identifier: "DynamoDBAction" });
    case 8:
      return S.suspend(() =>
        S.Struct({ tableName: S.String, payload: S.optional(__S(1088, __c34, 0)) }),
      ).annotate({
        identifier: "DynamoDBv2Action",
      });
    case 9:
      return S.suspend(() =>
        S.Struct({
          stringValue: S.optional(S.String),
          integerValue: S.optional(S.String),
          doubleValue: S.optional(S.String),
          booleanValue: S.optional(S.String),
        }),
      ).annotate({
        identifier: "AssetPropertyVariant",
      });
    case 10:
      return S.suspend(() =>
        S.Struct({ timeInSeconds: S.String, offsetInNanos: S.optional(S.String) }),
      ).annotate({
        identifier: "AssetPropertyTimestamp",
      });
    case 11:
      return S.suspend(() =>
        S.Struct({
          value: S.optional(__S(1097, __c34, 9)),
          timestamp: S.optional(__S(1098, __c34, 10)),
          quality: S.optional(S.String),
        }),
      ).annotate({
        identifier: "AssetPropertyValue",
      });
    case 12:
      return S.suspend(() =>
        S.Struct({
          entryId: S.optional(S.String),
          assetId: S.optional(S.String),
          propertyId: S.optional(S.String),
          propertyAlias: S.optional(S.String),
          propertyValue: S.optional(__S(1099, __c34, 11)),
        }),
      ).annotate({
        identifier: "IotSiteWiseAction",
      });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          inputProperty: S.String,
          comparisonOperator: S.String,
          threshold: S.String,
        }),
      ).annotate({ identifier: "SimpleRule" });
    case 1:
      return S.suspend(() => S.Struct({ simpleRule: S.optional(__S(1120, __c35, 0)) })).annotate({
        identifier: "AlarmRule",
      });
    case 2:
      return S.suspend(() => S.Struct({ lambdaAction: S.optional(__S(1089, __c34, 1)) })).annotate({
        identifier: "NotificationTargetActions",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({ identityStoreId: S.String, userId: S.optional(S.String) }),
      ).annotate({ identifier: "SSOIdentity" });
    case 4:
      return S.suspend(() => S.Struct({ ssoIdentity: S.optional(__S(1123, __c35, 3)) })).annotate({
        identifier: "RecipientDetail",
      });
    case 5:
      return S.Array(__S(1124, __c35, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          senderId: S.optional(S.String),
          additionalMessage: S.optional(S.String),
          recipients: __S(1125, __c35, 5),
        }),
      ).annotate({
        identifier: "SMSConfiguration",
      });
    case 7:
      return S.Array(__S(1126, __c35, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          subject: S.optional(S.String),
          additionalMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "EmailContent" });
    case 9:
      return S.suspend(() => S.Struct({ to: S.optional(__S(1125, __c35, 5)) })).annotate({
        identifier: "EmailRecipients",
      });
    case 10:
      return S.suspend(() =>
        S.Struct({
          from: S.String,
          content: S.optional(__S(1128, __c35, 8)),
          recipients: __S(1129, __c35, 9),
        }),
      ).annotate({
        identifier: "EmailConfiguration",
      });
    case 11:
      return S.Array(__S(1130, __c35, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          action: __S(1122, __c35, 2),
          smsConfigurations: S.optional(__S(1127, __c35, 7)),
          emailConfigurations: S.optional(__S(1131, __c35, 11)),
        }),
      ).annotate({
        identifier: "NotificationAction",
      });
    case 13:
      return S.Array(__S(1132, __c35, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({ notificationActions: S.optional(__S(1133, __c35, 13)) }),
      ).annotate({
        identifier: "AlarmNotification",
      });
    case 15:
      return S.suspend(() =>
        S.Struct({
          sns: S.optional(__S(1090, __c34, 2)),
          iotTopicPublish: S.optional(__S(1091, __c34, 3)),
          lambda: S.optional(__S(1089, __c34, 1)),
          iotEvents: S.optional(__S(1092, __c34, 4)),
          sqs: S.optional(__S(1093, __c34, 5)),
          firehose: S.optional(__S(1094, __c34, 6)),
          dynamoDB: S.optional(__S(1095, __c34, 7)),
          dynamoDBv2: S.optional(__S(1096, __c34, 8)),
          iotSiteWise: S.optional(__S(1100, __c34, 12)),
        }),
      ).annotate({ identifier: "AlarmAction" });
    case 16:
      return S.Array(__S(1135, __c35, 15));
    case 17:
      return S.suspend(() => S.Struct({ alarmActions: S.optional(__S(1136, __c35, 16)) })).annotate(
        {
          identifier: "AlarmEventActions",
        },
      );
    case 18:
      return S.suspend(() => S.Struct({ disabledOnInitialization: S.Boolean })).annotate({
        identifier: "InitializationConfiguration",
      });
    case 19:
      return S.suspend(() => S.Struct({ enabled: S.Boolean })).annotate({
        identifier: "AcknowledgeFlow",
      });
    case 20:
      return S.suspend(() =>
        S.Struct({
          initializationConfiguration: S.optional(__S(1138, __c35, 18)),
          acknowledgeFlow: S.optional(__S(1139, __c35, 19)),
        }),
      ).annotate({
        identifier: "AlarmCapabilities",
      });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          alarmModelArn: S.optional(S.String),
          alarmModelVersion: S.optional(S.String),
          lastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
        }),
      ).annotate({
        identifier: "CreateAlarmModelResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
