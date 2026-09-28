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
  sdkId: "Pinpoint",
  target: "Pinpoint",
  version: "2016-12-01",
  sigv4: "mobiletargeting",
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
                `https://pinpoint-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://pinpoint-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://pinpoint.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          if (Region === "us-east-1") {
            return e("https://pinpoint.us-east-1.amazonaws.com");
          }
          if (Region === "us-west-2") {
            return e("https://pinpoint.us-west-2.amazonaws.com");
          }
          if (Region === "us-gov-west-1") {
            return e("https://pinpoint.us-gov-west-1.amazonaws.com");
          }
          if ("aws" === _.getAttr(PartitionResult, "name")) {
            return e(`https://pinpoint.${Region}.amazonaws.com`);
          }
          if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
            return e(`https://pinpoint.${Region}.amazonaws.com`);
          }
          return e(
            `https://pinpoint.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly RequestID?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string; readonly RequestID?: string }> {}
export class ForbiddenException
  extends /*@__PURE__*/ TE.TaggedError("ForbiddenException", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string; readonly RequestID?: string }> {}
export class InternalServerErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerErrorException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string; readonly RequestID?: string }> {}
export class MethodNotAllowedException
  extends /*@__PURE__*/ TE.TaggedError(
    "MethodNotAllowedException",
    ["BadRequestError"],
    { status: 405 },
  )<{ readonly message?: string; readonly RequestID?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string; readonly RequestID?: string }> {}
export class PayloadTooLargeException
  extends /*@__PURE__*/ TE.TaggedError(
    "PayloadTooLargeException",
    ["BadRequestError"],
    { status: 413 },
  )<{ readonly message?: string; readonly RequestID?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string; readonly RequestID?: string }> {}
export type MapOf__string = { [key: string]: string | undefined };
export interface CreateApplicationRequest {
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateAppRequest {
  CreateApplicationRequest?: CreateApplicationRequest;
}
export interface ApplicationResponse {
  Arn?: string;
  Id?: string;
  Name?: string;
  tags?: { [key: string]: string | undefined };
  CreationDate?: string;
}
export interface CreateAppResponse {
  ApplicationResponse: ApplicationResponse & {
    Arn: string;
    Id: string;
    Name: string;
  };
}
export type __EndpointTypesElement =
  | "PUSH"
  | "GCM"
  | "APNS"
  | "APNS_SANDBOX"
  | "APNS_VOIP"
  | "APNS_VOIP_SANDBOX"
  | "ADM"
  | "SMS"
  | "VOICE"
  | "EMAIL"
  | "BAIDU"
  | "CUSTOM"
  | "IN_APP"
  | (string & {});
export type ListOf__EndpointTypesElement = __EndpointTypesElement[];
export interface CustomDeliveryConfiguration {
  DeliveryUri?: string;
  EndpointTypes?: __EndpointTypesElement[];
}
export type Action = "OPEN_APP" | "DEEP_LINK" | "URL" | (string & {});
export interface Message {
  Action?: Action;
  Body?: string;
  ImageIconUrl?: string;
  ImageSmallIconUrl?: string;
  ImageUrl?: string;
  JsonBody?: string;
  MediaUrl?: string;
  RawContent?: string;
  SilentPush?: boolean;
  TimeToLive?: number;
  Title?: string;
  Url?: string;
}
export interface CampaignCustomMessage {
  Data?: string;
}
export interface MessageHeader {
  Name?: string;
  Value?: string;
}
export type ListOfMessageHeader = MessageHeader[];
export interface CampaignEmailMessage {
  Body?: string;
  FromAddress?: string;
  Headers?: MessageHeader[];
  HtmlBody?: string;
  Title?: string;
}
export type MessageType = "TRANSACTIONAL" | "PROMOTIONAL" | (string & {});
export interface CampaignSmsMessage {
  Body?: string;
  MessageType?: MessageType;
  OriginationNumber?: string;
  SenderId?: string;
  EntityId?: string;
  TemplateId?: string;
}
export type Alignment = "LEFT" | "CENTER" | "RIGHT" | (string & {});
export interface InAppMessageBodyConfig {
  Alignment?: Alignment;
  Body?: string;
  TextColor?: string;
}
export interface InAppMessageHeaderConfig {
  Alignment?: Alignment;
  Header?: string;
  TextColor?: string;
}
export type ButtonAction = "LINK" | "DEEP_LINK" | "CLOSE" | (string & {});
export interface OverrideButtonConfiguration {
  ButtonAction?: ButtonAction;
  Link?: string;
}
export interface DefaultButtonConfiguration {
  BackgroundColor?: string;
  BorderRadius?: number;
  ButtonAction?: ButtonAction;
  Link?: string;
  Text?: string;
  TextColor?: string;
}
export interface InAppMessageButton {
  Android?: OverrideButtonConfiguration;
  DefaultConfig?: DefaultButtonConfiguration;
  IOS?: OverrideButtonConfiguration;
  Web?: OverrideButtonConfiguration;
}
export interface InAppMessageContent {
  BackgroundColor?: string;
  BodyConfig?: InAppMessageBodyConfig;
  HeaderConfig?: InAppMessageHeaderConfig;
  ImageUrl?: string;
  PrimaryBtn?: InAppMessageButton;
  SecondaryBtn?: InAppMessageButton;
}
export type ListOfInAppMessageContent = InAppMessageContent[];
export type Layout =
  | "BOTTOM_BANNER"
  | "TOP_BANNER"
  | "OVERLAYS"
  | "MOBILE_FEED"
  | "MIDDLE_BANNER"
  | "CAROUSEL"
  | (string & {});
export interface CampaignInAppMessage {
  Body?: string;
  Content?: InAppMessageContent[];
  CustomConfig?: { [key: string]: string | undefined };
  Layout?: Layout;
}
export interface MessageConfiguration {
  ADMMessage?: Message;
  APNSMessage?: Message;
  BaiduMessage?: Message;
  CustomMessage?: CampaignCustomMessage;
  DefaultMessage?: Message;
  EmailMessage?: CampaignEmailMessage;
  GCMMessage?: Message;
  SMSMessage?: CampaignSmsMessage;
  InAppMessage?: CampaignInAppMessage;
}
export type AttributeType =
  | "INCLUSIVE"
  | "EXCLUSIVE"
  | "CONTAINS"
  | "BEFORE"
  | "AFTER"
  | "ON"
  | "BETWEEN"
  | (string & {});
export type ListOf__string = string[];
export interface AttributeDimension {
  AttributeType?: AttributeType;
  Values?: string[];
}
export type MapOfAttributeDimension = {
  [key: string]: AttributeDimension | undefined;
};
export type DimensionType = "INCLUSIVE" | "EXCLUSIVE" | (string & {});
export interface SetDimension {
  DimensionType?: DimensionType;
  Values?: string[];
}
export interface MetricDimension {
  ComparisonOperator?: string;
  Value?: number;
}
export type MapOfMetricDimension = {
  [key: string]: MetricDimension | undefined;
};
export interface EventDimensions {
  Attributes?: { [key: string]: AttributeDimension | undefined };
  EventType?: SetDimension;
  Metrics?: { [key: string]: MetricDimension | undefined };
}
export type FilterType = "SYSTEM" | "ENDPOINT" | (string & {});
export interface CampaignEventFilter {
  Dimensions?: EventDimensions;
  FilterType?: FilterType;
}
export type Frequency =
  | "ONCE"
  | "HOURLY"
  | "DAILY"
  | "WEEKLY"
  | "MONTHLY"
  | "EVENT"
  | "IN_APP_EVENT"
  | (string & {});
export interface QuietTime {
  End?: string;
  Start?: string;
}
export interface Schedule {
  EndTime?: string;
  EventFilter?: CampaignEventFilter;
  Frequency?: Frequency;
  IsLocalTime?: boolean;
  QuietTime?: QuietTime;
  StartTime?: string;
  Timezone?: string;
}
export interface Template {
  Name?: string;
  Version?: string;
}
export interface TemplateConfiguration {
  EmailTemplate?: Template;
  PushTemplate?: Template;
  SMSTemplate?: Template;
  VoiceTemplate?: Template;
  InAppTemplate?: Template;
}
export interface WriteTreatmentResource {
  CustomDeliveryConfiguration?: CustomDeliveryConfiguration;
  MessageConfiguration?: MessageConfiguration;
  Schedule?: Schedule;
  SizePercent?: number;
  TemplateConfiguration?: TemplateConfiguration;
  TreatmentDescription?: string;
  TreatmentName?: string;
}
export type ListOfWriteTreatmentResource = WriteTreatmentResource[];
export type Mode = "DELIVERY" | "FILTER" | (string & {});
export interface CampaignHook {
  LambdaFunctionName?: string;
  Mode?: Mode;
  WebUrl?: string;
}
export interface CampaignLimits {
  Daily?: number;
  MaximumDuration?: number;
  MessagesPerSecond?: number;
  Total?: number;
  Session?: number;
}
export interface WriteCampaignRequest {
  AdditionalTreatments?: WriteTreatmentResource[];
  CustomDeliveryConfiguration?: CustomDeliveryConfiguration;
  Description?: string;
  HoldoutPercent?: number;
  Hook?: CampaignHook;
  IsPaused?: boolean;
  Limits?: CampaignLimits;
  MessageConfiguration?: MessageConfiguration;
  Name?: string;
  Schedule?: Schedule;
  SegmentId?: string;
  SegmentVersion?: number;
  tags?: { [key: string]: string | undefined };
  TemplateConfiguration?: TemplateConfiguration;
  TreatmentDescription?: string;
  TreatmentName?: string;
  Priority?: number;
}
export interface CreateCampaignRequest {
  ApplicationId: string;
  WriteCampaignRequest?: WriteCampaignRequest;
}
export type CampaignStatus =
  | "SCHEDULED"
  | "EXECUTING"
  | "PENDING_NEXT_RUN"
  | "COMPLETED"
  | "PAUSED"
  | "DELETED"
  | "INVALID"
  | (string & {});
export interface CampaignState {
  CampaignStatus?: CampaignStatus;
}
export interface TreatmentResource {
  CustomDeliveryConfiguration?: CustomDeliveryConfiguration;
  Id?: string;
  MessageConfiguration?: MessageConfiguration;
  Schedule?: Schedule;
  SizePercent?: number;
  State?: CampaignState;
  TemplateConfiguration?: TemplateConfiguration;
  TreatmentDescription?: string;
  TreatmentName?: string;
}
export type ListOfTreatmentResource = TreatmentResource[];
export interface CampaignResponse {
  AdditionalTreatments?: TreatmentResource[];
  ApplicationId?: string;
  Arn?: string;
  CreationDate?: string;
  CustomDeliveryConfiguration?: CustomDeliveryConfiguration;
  DefaultState?: CampaignState;
  Description?: string;
  HoldoutPercent?: number;
  Hook?: CampaignHook;
  Id?: string;
  IsPaused?: boolean;
  LastModifiedDate?: string;
  Limits?: CampaignLimits;
  MessageConfiguration?: MessageConfiguration;
  Name?: string;
  Schedule?: Schedule;
  SegmentId?: string;
  SegmentVersion?: number;
  State?: CampaignState;
  tags?: { [key: string]: string | undefined };
  TemplateConfiguration?: TemplateConfiguration;
  TreatmentDescription?: string;
  TreatmentName?: string;
  Version?: number;
  Priority?: number;
}
export interface CreateCampaignResponse {
  CampaignResponse: CampaignResponse & {
    ApplicationId: string;
    Arn: string;
    CreationDate: string;
    Id: string;
    LastModifiedDate: string;
    SegmentId: string;
    SegmentVersion: number;
    AdditionalTreatments: (TreatmentResource & {
      Id: string;
      SizePercent: number;
      CustomDeliveryConfiguration: CustomDeliveryConfiguration & {
        DeliveryUri: string;
      };
      MessageConfiguration: MessageConfiguration & {
        InAppMessage: CampaignInAppMessage & {
          Content: (InAppMessageContent & {
            BodyConfig: InAppMessageBodyConfig & {
              Alignment: Alignment;
              Body: string;
              TextColor: string;
            };
            HeaderConfig: InAppMessageHeaderConfig & {
              Alignment: Alignment;
              Header: string;
              TextColor: string;
            };
            PrimaryBtn: InAppMessageButton & {
              Android: OverrideButtonConfiguration & {
                ButtonAction: ButtonAction;
              };
              DefaultConfig: DefaultButtonConfiguration & {
                ButtonAction: ButtonAction;
                Text: string;
              };
              IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
              Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            };
            SecondaryBtn: InAppMessageButton & {
              Android: OverrideButtonConfiguration & {
                ButtonAction: ButtonAction;
              };
              DefaultConfig: DefaultButtonConfiguration & {
                ButtonAction: ButtonAction;
                Text: string;
              };
              IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
              Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            };
          })[];
        };
      };
      Schedule: Schedule & {
        StartTime: string;
        EventFilter: CampaignEventFilter & {
          Dimensions: EventDimensions & {
            Attributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
            EventType: SetDimension & { Values: ListOf__string };
            Metrics: {
              [key: string]:
                | (MetricDimension & {
                    ComparisonOperator: string;
                    Value: number;
                  })
                | undefined;
            };
          };
          FilterType: FilterType;
        };
      };
    })[];
    CustomDeliveryConfiguration: CustomDeliveryConfiguration & {
      DeliveryUri: string;
    };
    MessageConfiguration: MessageConfiguration & {
      InAppMessage: CampaignInAppMessage & {
        Content: (InAppMessageContent & {
          BodyConfig: InAppMessageBodyConfig & {
            Alignment: Alignment;
            Body: string;
            TextColor: string;
          };
          HeaderConfig: InAppMessageHeaderConfig & {
            Alignment: Alignment;
            Header: string;
            TextColor: string;
          };
          PrimaryBtn: InAppMessageButton & {
            Android: OverrideButtonConfiguration & {
              ButtonAction: ButtonAction;
            };
            DefaultConfig: DefaultButtonConfiguration & {
              ButtonAction: ButtonAction;
              Text: string;
            };
            IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
          };
          SecondaryBtn: InAppMessageButton & {
            Android: OverrideButtonConfiguration & {
              ButtonAction: ButtonAction;
            };
            DefaultConfig: DefaultButtonConfiguration & {
              ButtonAction: ButtonAction;
              Text: string;
            };
            IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
          };
        })[];
      };
    };
    Schedule: Schedule & {
      StartTime: string;
      EventFilter: CampaignEventFilter & {
        Dimensions: EventDimensions & {
          Attributes: {
            [key: string]:
              | (AttributeDimension & { Values: ListOf__string })
              | undefined;
          };
          EventType: SetDimension & { Values: ListOf__string };
          Metrics: {
            [key: string]:
              | (MetricDimension & {
                  ComparisonOperator: string;
                  Value: number;
                })
              | undefined;
          };
        };
        FilterType: FilterType;
      };
    };
  };
}
export interface EmailTemplateRequest {
  DefaultSubstitutions?: string;
  HtmlPart?: string;
  RecommenderId?: string;
  Subject?: string;
  Headers?: MessageHeader[];
  tags?: { [key: string]: string | undefined };
  TemplateDescription?: string;
  TextPart?: string;
}
export interface CreateEmailTemplateRequest {
  EmailTemplateRequest?: EmailTemplateRequest;
  TemplateName: string;
}
export interface CreateTemplateMessageBody {
  Arn?: string;
  Message?: string;
  RequestID?: string;
}
export interface CreateEmailTemplateResponse {
  CreateTemplateMessageBody: CreateTemplateMessageBody;
}
export interface ExportJobRequest {
  RoleArn?: string;
  S3UrlPrefix?: string;
  SegmentId?: string;
  SegmentVersion?: number;
}
export interface CreateExportJobRequest {
  ApplicationId: string;
  ExportJobRequest?: ExportJobRequest;
}
export interface ExportJobResource {
  RoleArn?: string;
  S3UrlPrefix?: string;
  SegmentId?: string;
  SegmentVersion?: number;
}
export type JobStatus =
  | "CREATED"
  | "PREPARING_FOR_INITIALIZATION"
  | "INITIALIZING"
  | "PROCESSING"
  | "PENDING_JOB"
  | "COMPLETING"
  | "COMPLETED"
  | "FAILING"
  | "FAILED"
  | (string & {});
export interface ExportJobResponse {
  ApplicationId?: string;
  CompletedPieces?: number;
  CompletionDate?: string;
  CreationDate?: string;
  Definition?: ExportJobResource;
  FailedPieces?: number;
  Failures?: string[];
  Id?: string;
  JobStatus?: JobStatus;
  TotalFailures?: number;
  TotalPieces?: number;
  TotalProcessed?: number;
  Type?: string;
}
export interface CreateExportJobResponse {
  ExportJobResponse: ExportJobResponse & {
    ApplicationId: string;
    CreationDate: string;
    Definition: ExportJobResource & { RoleArn: string; S3UrlPrefix: string };
    Id: string;
    JobStatus: JobStatus;
    Type: string;
  };
}
export type Format = "CSV" | "JSON" | (string & {});
export interface ImportJobRequest {
  DefineSegment?: boolean;
  ExternalId?: string;
  Format?: Format;
  RegisterEndpoints?: boolean;
  RoleArn?: string;
  S3Url?: string;
  SegmentId?: string;
  SegmentName?: string;
}
export interface CreateImportJobRequest {
  ApplicationId: string;
  ImportJobRequest?: ImportJobRequest;
}
export interface ImportJobResource {
  DefineSegment?: boolean;
  ExternalId?: string;
  Format?: Format;
  RegisterEndpoints?: boolean;
  RoleArn?: string;
  S3Url?: string;
  SegmentId?: string;
  SegmentName?: string;
}
export interface ImportJobResponse {
  ApplicationId?: string;
  CompletedPieces?: number;
  CompletionDate?: string;
  CreationDate?: string;
  Definition?: ImportJobResource;
  FailedPieces?: number;
  Failures?: string[];
  Id?: string;
  JobStatus?: JobStatus;
  TotalFailures?: number;
  TotalPieces?: number;
  TotalProcessed?: number;
  Type?: string;
}
export interface CreateImportJobResponse {
  ImportJobResponse: ImportJobResponse & {
    ApplicationId: string;
    CreationDate: string;
    Definition: ImportJobResource & {
      Format: Format;
      RoleArn: string;
      S3Url: string;
    };
    Id: string;
    JobStatus: JobStatus;
    Type: string;
  };
}
export interface InAppTemplateRequest {
  Content?: InAppMessageContent[];
  CustomConfig?: { [key: string]: string | undefined };
  Layout?: Layout;
  tags?: { [key: string]: string | undefined };
  TemplateDescription?: string;
}
export interface CreateInAppTemplateRequest {
  InAppTemplateRequest?: InAppTemplateRequest;
  TemplateName: string;
}
export interface TemplateCreateMessageBody {
  Arn?: string;
  Message?: string;
  RequestID?: string;
}
export interface CreateInAppTemplateResponse {
  TemplateCreateMessageBody: TemplateCreateMessageBody;
}
export interface JourneyCustomMessage {
  Data?: string;
}
export interface CustomMessageActivity {
  DeliveryUri?: string;
  EndpointTypes?: __EndpointTypesElement[];
  MessageConfig?: JourneyCustomMessage;
  NextActivity?: string;
  TemplateName?: string;
  TemplateVersion?: string;
}
export interface EventCondition {
  Dimensions?: EventDimensions;
  MessageActivity?: string;
}
export interface SegmentCondition {
  SegmentId?: string;
}
export type Duration = "HR_24" | "DAY_7" | "DAY_14" | "DAY_30" | (string & {});
export type RecencyType = "ACTIVE" | "INACTIVE" | (string & {});
export interface RecencyDimension {
  Duration?: Duration;
  RecencyType?: RecencyType;
}
export interface SegmentBehaviors {
  Recency?: RecencyDimension;
}
export interface SegmentDemographics {
  AppVersion?: SetDimension;
  Channel?: SetDimension;
  DeviceType?: SetDimension;
  Make?: SetDimension;
  Model?: SetDimension;
  Platform?: SetDimension;
}
export interface GPSCoordinates {
  Latitude?: number;
  Longitude?: number;
}
export interface GPSPointDimension {
  Coordinates?: GPSCoordinates;
  RangeInKilometers?: number;
}
export interface SegmentLocation {
  Country?: SetDimension;
  GPSPoint?: GPSPointDimension;
}
export interface SegmentDimensions {
  Attributes?: { [key: string]: AttributeDimension | undefined };
  Behavior?: SegmentBehaviors;
  Demographic?: SegmentDemographics;
  Location?: SegmentLocation;
  Metrics?: { [key: string]: MetricDimension | undefined };
  UserAttributes?: { [key: string]: AttributeDimension | undefined };
}
export interface SimpleCondition {
  EventCondition?: EventCondition;
  SegmentCondition?: SegmentCondition;
  SegmentDimensions?: SegmentDimensions;
}
export type ListOfSimpleCondition = SimpleCondition[];
export type Operator = "ALL" | "ANY" | (string & {});
export interface Condition {
  Conditions?: SimpleCondition[];
  Operator?: Operator;
}
export interface WaitTime {
  WaitFor?: string;
  WaitUntil?: string;
}
export interface ConditionalSplitActivity {
  Condition?: Condition;
  EvaluationWaitTime?: WaitTime;
  FalseActivity?: string;
  TrueActivity?: string;
}
export interface JourneyEmailMessage {
  FromAddress?: string;
}
export interface EmailMessageActivity {
  MessageConfig?: JourneyEmailMessage;
  NextActivity?: string;
  TemplateName?: string;
  TemplateVersion?: string;
}
export interface HoldoutActivity {
  NextActivity?: string;
  Percentage?: number;
}
export interface MultiConditionalBranch {
  Condition?: SimpleCondition;
  NextActivity?: string;
}
export type ListOfMultiConditionalBranch = MultiConditionalBranch[];
export interface MultiConditionalSplitActivity {
  Branches?: MultiConditionalBranch[];
  DefaultActivity?: string;
  EvaluationWaitTime?: WaitTime;
}
export interface JourneyPushMessage {
  TimeToLive?: string;
}
export interface PushMessageActivity {
  MessageConfig?: JourneyPushMessage;
  NextActivity?: string;
  TemplateName?: string;
  TemplateVersion?: string;
}
export interface RandomSplitEntry {
  NextActivity?: string;
  Percentage?: number;
}
export type ListOfRandomSplitEntry = RandomSplitEntry[];
export interface RandomSplitActivity {
  Branches?: RandomSplitEntry[];
}
export interface JourneySMSMessage {
  MessageType?: MessageType;
  OriginationNumber?: string;
  SenderId?: string;
  EntityId?: string;
  TemplateId?: string;
}
export interface SMSMessageActivity {
  MessageConfig?: JourneySMSMessage;
  NextActivity?: string;
  TemplateName?: string;
  TemplateVersion?: string;
}
export interface WaitActivity {
  NextActivity?: string;
  WaitTime?: WaitTime;
}
export interface ContactCenterActivity {
  NextActivity?: string;
}
export interface Activity {
  CUSTOM?: CustomMessageActivity;
  ConditionalSplit?: ConditionalSplitActivity;
  Description?: string;
  EMAIL?: EmailMessageActivity;
  Holdout?: HoldoutActivity;
  MultiCondition?: MultiConditionalSplitActivity;
  PUSH?: PushMessageActivity;
  RandomSplit?: RandomSplitActivity;
  SMS?: SMSMessageActivity;
  Wait?: WaitActivity;
  ContactCenter?: ContactCenterActivity;
}
export type MapOfActivity = { [key: string]: Activity | undefined };
export interface JourneyTimeframeCap {
  Cap?: number;
  Days?: number;
}
export interface JourneyLimits {
  DailyCap?: number;
  EndpointReentryCap?: number;
  MessagesPerSecond?: number;
  EndpointReentryInterval?: string;
  TimeframeCap?: JourneyTimeframeCap;
  TotalCap?: number;
}
export type __timestampIso8601 = Date;
export interface JourneySchedule {
  EndTime?: Date;
  StartTime?: Date;
  Timezone?: string;
}
export interface EventFilter {
  Dimensions?: EventDimensions;
  FilterType?: FilterType;
}
export interface EventStartCondition {
  EventFilter?: EventFilter;
  SegmentId?: string;
}
export interface StartCondition {
  Description?: string;
  EventStartCondition?: EventStartCondition;
  SegmentStartCondition?: SegmentCondition;
}
export type State =
  | "DRAFT"
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELLED"
  | "CLOSED"
  | "PAUSED"
  | (string & {});
export interface JourneyChannelSettings {
  ConnectCampaignArn?: string;
  ConnectCampaignExecutionRoleArn?: string;
}
export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY"
  | (string & {});
export interface OpenHoursRule {
  StartTime?: string;
  EndTime?: string;
}
export type ListOfOpenHoursRules = OpenHoursRule[];
export type MapOfListOfOpenHoursRules = {
  [key in DayOfWeek]?: OpenHoursRule[];
};
export interface OpenHours {
  EMAIL?: { [key: string]: OpenHoursRule[] | undefined };
  SMS?: { [key: string]: OpenHoursRule[] | undefined };
  PUSH?: { [key: string]: OpenHoursRule[] | undefined };
  VOICE?: { [key: string]: OpenHoursRule[] | undefined };
  CUSTOM?: { [key: string]: OpenHoursRule[] | undefined };
}
export interface ClosedDaysRule {
  Name?: string;
  StartDateTime?: string;
  EndDateTime?: string;
}
export type ListOfClosedDaysRules = ClosedDaysRule[];
export interface ClosedDays {
  EMAIL?: ClosedDaysRule[];
  SMS?: ClosedDaysRule[];
  PUSH?: ClosedDaysRule[];
  VOICE?: ClosedDaysRule[];
  CUSTOM?: ClosedDaysRule[];
}
export type __TimezoneEstimationMethodsElement =
  | "PHONE_NUMBER"
  | "POSTAL_CODE"
  | (string & {});
export type ListOf__TimezoneEstimationMethodsElement =
  __TimezoneEstimationMethodsElement[];
export interface WriteJourneyRequest {
  Activities?: { [key: string]: Activity | undefined };
  CreationDate?: string;
  LastModifiedDate?: string;
  Limits?: JourneyLimits;
  LocalTime?: boolean;
  Name?: string;
  QuietTime?: QuietTime;
  RefreshFrequency?: string;
  Schedule?: JourneySchedule;
  StartActivity?: string;
  StartCondition?: StartCondition;
  State?: State;
  WaitForQuietTime?: boolean;
  RefreshOnSegmentUpdate?: boolean;
  JourneyChannelSettings?: JourneyChannelSettings;
  SendingSchedule?: boolean;
  OpenHours?: OpenHours;
  ClosedDays?: ClosedDays;
  TimezoneEstimationMethods?: __TimezoneEstimationMethodsElement[];
}
export interface CreateJourneyRequest {
  ApplicationId: string;
  WriteJourneyRequest?: WriteJourneyRequest;
}
export interface JourneyResponse {
  Activities?: { [key: string]: Activity | undefined };
  ApplicationId?: string;
  CreationDate?: string;
  Id?: string;
  LastModifiedDate?: string;
  Limits?: JourneyLimits;
  LocalTime?: boolean;
  Name?: string;
  QuietTime?: QuietTime;
  RefreshFrequency?: string;
  Schedule?: JourneySchedule;
  StartActivity?: string;
  StartCondition?: StartCondition;
  State?: State;
  tags?: { [key: string]: string | undefined };
  WaitForQuietTime?: boolean;
  RefreshOnSegmentUpdate?: boolean;
  JourneyChannelSettings?: JourneyChannelSettings;
  SendingSchedule?: boolean;
  OpenHours?: OpenHours;
  ClosedDays?: ClosedDays;
  TimezoneEstimationMethods?: __TimezoneEstimationMethodsElement[];
}
export interface CreateJourneyResponse {
  JourneyResponse: JourneyResponse & {
    ApplicationId: string;
    Id: string;
    Name: string;
    Activities: {
      [key: string]:
        | (Activity & {
            ConditionalSplit: ConditionalSplitActivity & {
              Condition: Condition & {
                Conditions: (SimpleCondition & {
                  EventCondition: EventCondition & {
                    Dimensions: EventDimensions & {
                      Attributes: {
                        [key: string]:
                          | (AttributeDimension & { Values: ListOf__string })
                          | undefined;
                      };
                      EventType: SetDimension & { Values: ListOf__string };
                      Metrics: {
                        [key: string]:
                          | (MetricDimension & {
                              ComparisonOperator: string;
                              Value: number;
                            })
                          | undefined;
                      };
                    };
                  };
                  SegmentCondition: SegmentCondition & { SegmentId: string };
                  SegmentDimensions: SegmentDimensions & {
                    Attributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                    Behavior: SegmentBehaviors & {
                      Recency: RecencyDimension & {
                        Duration: Duration;
                        RecencyType: RecencyType;
                      };
                    };
                    Demographic: SegmentDemographics & {
                      AppVersion: SetDimension & { Values: ListOf__string };
                      Channel: SetDimension & { Values: ListOf__string };
                      DeviceType: SetDimension & { Values: ListOf__string };
                      Make: SetDimension & { Values: ListOf__string };
                      Model: SetDimension & { Values: ListOf__string };
                      Platform: SetDimension & { Values: ListOf__string };
                    };
                    Location: SegmentLocation & {
                      Country: SetDimension & { Values: ListOf__string };
                      GPSPoint: GPSPointDimension & {
                        Coordinates: GPSCoordinates & {
                          Latitude: number;
                          Longitude: number;
                        };
                      };
                    };
                    Metrics: {
                      [key: string]:
                        | (MetricDimension & {
                            ComparisonOperator: string;
                            Value: number;
                          })
                        | undefined;
                    };
                    UserAttributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                  };
                })[];
              };
            };
            Holdout: HoldoutActivity & { Percentage: number };
            MultiCondition: MultiConditionalSplitActivity & {
              Branches: (MultiConditionalBranch & {
                Condition: SimpleCondition & {
                  EventCondition: EventCondition & {
                    Dimensions: EventDimensions & {
                      Attributes: {
                        [key: string]:
                          | (AttributeDimension & { Values: ListOf__string })
                          | undefined;
                      };
                      EventType: SetDimension & { Values: ListOf__string };
                      Metrics: {
                        [key: string]:
                          | (MetricDimension & {
                              ComparisonOperator: string;
                              Value: number;
                            })
                          | undefined;
                      };
                    };
                  };
                  SegmentCondition: SegmentCondition & { SegmentId: string };
                  SegmentDimensions: SegmentDimensions & {
                    Attributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                    Behavior: SegmentBehaviors & {
                      Recency: RecencyDimension & {
                        Duration: Duration;
                        RecencyType: RecencyType;
                      };
                    };
                    Demographic: SegmentDemographics & {
                      AppVersion: SetDimension & { Values: ListOf__string };
                      Channel: SetDimension & { Values: ListOf__string };
                      DeviceType: SetDimension & { Values: ListOf__string };
                      Make: SetDimension & { Values: ListOf__string };
                      Model: SetDimension & { Values: ListOf__string };
                      Platform: SetDimension & { Values: ListOf__string };
                    };
                    Location: SegmentLocation & {
                      Country: SetDimension & { Values: ListOf__string };
                      GPSPoint: GPSPointDimension & {
                        Coordinates: GPSCoordinates & {
                          Latitude: number;
                          Longitude: number;
                        };
                      };
                    };
                    Metrics: {
                      [key: string]:
                        | (MetricDimension & {
                            ComparisonOperator: string;
                            Value: number;
                          })
                        | undefined;
                    };
                    UserAttributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                  };
                };
              })[];
            };
          })
        | undefined;
    };
    StartCondition: StartCondition & {
      EventStartCondition: EventStartCondition & {
        EventFilter: EventFilter & {
          Dimensions: EventDimensions & {
            Attributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
            EventType: SetDimension & { Values: ListOf__string };
            Metrics: {
              [key: string]:
                | (MetricDimension & {
                    ComparisonOperator: string;
                    Value: number;
                  })
                | undefined;
            };
          };
          FilterType: FilterType;
        };
      };
      SegmentStartCondition: SegmentCondition & { SegmentId: string };
    };
  };
}
export interface AndroidPushNotificationTemplate {
  Action?: Action;
  Body?: string;
  ImageIconUrl?: string;
  ImageUrl?: string;
  RawContent?: string;
  SmallImageIconUrl?: string;
  Sound?: string;
  Title?: string;
  Url?: string;
}
export interface APNSPushNotificationTemplate {
  Action?: Action;
  Body?: string;
  MediaUrl?: string;
  RawContent?: string;
  Sound?: string;
  Title?: string;
  Url?: string;
}
export interface DefaultPushNotificationTemplate {
  Action?: Action;
  Body?: string;
  Sound?: string;
  Title?: string;
  Url?: string;
}
export interface PushNotificationTemplateRequest {
  ADM?: AndroidPushNotificationTemplate;
  APNS?: APNSPushNotificationTemplate;
  Baidu?: AndroidPushNotificationTemplate;
  Default?: DefaultPushNotificationTemplate;
  DefaultSubstitutions?: string;
  GCM?: AndroidPushNotificationTemplate;
  RecommenderId?: string;
  tags?: { [key: string]: string | undefined };
  TemplateDescription?: string;
}
export interface CreatePushTemplateRequest {
  PushNotificationTemplateRequest?: PushNotificationTemplateRequest;
  TemplateName: string;
}
export interface CreatePushTemplateResponse {
  CreateTemplateMessageBody: CreateTemplateMessageBody;
}
export interface CreateRecommenderConfigurationShape {
  Attributes?: { [key: string]: string | undefined };
  Description?: string;
  Name?: string;
  RecommendationProviderIdType?: string;
  RecommendationProviderRoleArn?: string;
  RecommendationProviderUri?: string;
  RecommendationTransformerUri?: string;
  RecommendationsDisplayName?: string;
  RecommendationsPerMessage?: number;
}
export interface CreateRecommenderConfigurationRequest {
  CreateRecommenderConfiguration?: CreateRecommenderConfigurationShape;
}
export interface RecommenderConfigurationResponse {
  Attributes?: { [key: string]: string | undefined };
  CreationDate?: string;
  Description?: string;
  Id?: string;
  LastModifiedDate?: string;
  Name?: string;
  RecommendationProviderIdType?: string;
  RecommendationProviderRoleArn?: string;
  RecommendationProviderUri?: string;
  RecommendationTransformerUri?: string;
  RecommendationsDisplayName?: string;
  RecommendationsPerMessage?: number;
}
export interface CreateRecommenderConfigurationResponse {
  RecommenderConfigurationResponse: RecommenderConfigurationResponse & {
    CreationDate: string;
    Id: string;
    LastModifiedDate: string;
    RecommendationProviderRoleArn: string;
    RecommendationProviderUri: string;
  };
}
export type ListOfSegmentDimensions = SegmentDimensions[];
export interface SegmentReference {
  Id?: string;
  Version?: number;
}
export type ListOfSegmentReference = SegmentReference[];
export type SourceType = "ALL" | "ANY" | "NONE" | (string & {});
export type Type = "ALL" | "ANY" | "NONE" | (string & {});
export interface SegmentGroup {
  Dimensions?: SegmentDimensions[];
  SourceSegments?: SegmentReference[];
  SourceType?: SourceType;
  Type?: Type;
}
export type ListOfSegmentGroup = SegmentGroup[];
export type Include = "ALL" | "ANY" | "NONE" | (string & {});
export interface SegmentGroupList {
  Groups?: SegmentGroup[];
  Include?: Include;
}
export interface WriteSegmentRequest {
  Dimensions?: SegmentDimensions;
  Name?: string;
  SegmentGroups?: SegmentGroupList;
  tags?: { [key: string]: string | undefined };
}
export interface CreateSegmentRequest {
  ApplicationId: string;
  WriteSegmentRequest?: WriteSegmentRequest;
}
export type MapOf__integer = { [key: string]: number | undefined };
export interface SegmentImportResource {
  ChannelCounts?: { [key: string]: number | undefined };
  ExternalId?: string;
  Format?: Format;
  RoleArn?: string;
  S3Url?: string;
  Size?: number;
}
export type SegmentType = "DIMENSIONAL" | "IMPORT" | (string & {});
export interface SegmentResponse {
  ApplicationId?: string;
  Arn?: string;
  CreationDate?: string;
  Dimensions?: SegmentDimensions;
  Id?: string;
  ImportDefinition?: SegmentImportResource;
  LastModifiedDate?: string;
  Name?: string;
  SegmentGroups?: SegmentGroupList;
  SegmentType?: SegmentType;
  tags?: { [key: string]: string | undefined };
  Version?: number;
}
export interface CreateSegmentResponse {
  SegmentResponse: SegmentResponse & {
    ApplicationId: string;
    Arn: string;
    CreationDate: string;
    Id: string;
    SegmentType: SegmentType;
    Dimensions: SegmentDimensions & {
      Attributes: {
        [key: string]:
          | (AttributeDimension & { Values: ListOf__string })
          | undefined;
      };
      Behavior: SegmentBehaviors & {
        Recency: RecencyDimension & {
          Duration: Duration;
          RecencyType: RecencyType;
        };
      };
      Demographic: SegmentDemographics & {
        AppVersion: SetDimension & { Values: ListOf__string };
        Channel: SetDimension & { Values: ListOf__string };
        DeviceType: SetDimension & { Values: ListOf__string };
        Make: SetDimension & { Values: ListOf__string };
        Model: SetDimension & { Values: ListOf__string };
        Platform: SetDimension & { Values: ListOf__string };
      };
      Location: SegmentLocation & {
        Country: SetDimension & { Values: ListOf__string };
        GPSPoint: GPSPointDimension & {
          Coordinates: GPSCoordinates & { Latitude: number; Longitude: number };
        };
      };
      Metrics: {
        [key: string]:
          | (MetricDimension & { ComparisonOperator: string; Value: number })
          | undefined;
      };
      UserAttributes: {
        [key: string]:
          | (AttributeDimension & { Values: ListOf__string })
          | undefined;
      };
    };
    ImportDefinition: SegmentImportResource & {
      ExternalId: string;
      Format: Format;
      RoleArn: string;
      S3Url: string;
      Size: number;
    };
    SegmentGroups: SegmentGroupList & {
      Groups: (SegmentGroup & {
        Dimensions: (SegmentDimensions & {
          Attributes: {
            [key: string]:
              | (AttributeDimension & { Values: ListOf__string })
              | undefined;
          };
          Behavior: SegmentBehaviors & {
            Recency: RecencyDimension & {
              Duration: Duration;
              RecencyType: RecencyType;
            };
          };
          Demographic: SegmentDemographics & {
            AppVersion: SetDimension & { Values: ListOf__string };
            Channel: SetDimension & { Values: ListOf__string };
            DeviceType: SetDimension & { Values: ListOf__string };
            Make: SetDimension & { Values: ListOf__string };
            Model: SetDimension & { Values: ListOf__string };
            Platform: SetDimension & { Values: ListOf__string };
          };
          Location: SegmentLocation & {
            Country: SetDimension & { Values: ListOf__string };
            GPSPoint: GPSPointDimension & {
              Coordinates: GPSCoordinates & {
                Latitude: number;
                Longitude: number;
              };
            };
          };
          Metrics: {
            [key: string]:
              | (MetricDimension & {
                  ComparisonOperator: string;
                  Value: number;
                })
              | undefined;
          };
          UserAttributes: {
            [key: string]:
              | (AttributeDimension & { Values: ListOf__string })
              | undefined;
          };
        })[];
        SourceSegments: (SegmentReference & { Id: string })[];
      })[];
    };
  };
}
export interface SMSTemplateRequest {
  Body?: string;
  DefaultSubstitutions?: string;
  RecommenderId?: string;
  tags?: { [key: string]: string | undefined };
  TemplateDescription?: string;
}
export interface CreateSmsTemplateRequest {
  SMSTemplateRequest?: SMSTemplateRequest;
  TemplateName: string;
}
export interface CreateSmsTemplateResponse {
  CreateTemplateMessageBody: CreateTemplateMessageBody;
}
export interface VoiceTemplateRequest {
  Body?: string;
  DefaultSubstitutions?: string;
  LanguageCode?: string;
  tags?: { [key: string]: string | undefined };
  TemplateDescription?: string;
  VoiceId?: string;
}
export interface CreateVoiceTemplateRequest {
  TemplateName: string;
  VoiceTemplateRequest?: VoiceTemplateRequest;
}
export interface CreateVoiceTemplateResponse {
  CreateTemplateMessageBody: CreateTemplateMessageBody;
}
export interface DeleteAdmChannelRequest {
  ApplicationId: string;
}
export interface ADMChannelResponse {
  ApplicationId?: string;
  CreationDate?: string;
  Enabled?: boolean;
  HasCredential?: boolean;
  Id?: string;
  IsArchived?: boolean;
  LastModifiedBy?: string;
  LastModifiedDate?: string;
  Platform?: string;
  Version?: number;
}
export interface DeleteAdmChannelResponse {
  ADMChannelResponse: ADMChannelResponse & { Platform: string };
}
export interface DeleteApnsChannelRequest {
  ApplicationId: string;
}
export interface APNSChannelResponse {
  ApplicationId?: string;
  CreationDate?: string;
  DefaultAuthenticationMethod?: string;
  Enabled?: boolean;
  HasCredential?: boolean;
  HasTokenKey?: boolean;
  Id?: string;
  IsArchived?: boolean;
  LastModifiedBy?: string;
  LastModifiedDate?: string;
  Platform?: string;
  Version?: number;
}
export interface DeleteApnsChannelResponse {
  APNSChannelResponse: APNSChannelResponse & { Platform: string };
}
export interface DeleteApnsSandboxChannelRequest {
  ApplicationId: string;
}
export interface APNSSandboxChannelResponse {
  ApplicationId?: string;
  CreationDate?: string;
  DefaultAuthenticationMethod?: string;
  Enabled?: boolean;
  HasCredential?: boolean;
  HasTokenKey?: boolean;
  Id?: string;
  IsArchived?: boolean;
  LastModifiedBy?: string;
  LastModifiedDate?: string;
  Platform?: string;
  Version?: number;
}
export interface DeleteApnsSandboxChannelResponse {
  APNSSandboxChannelResponse: APNSSandboxChannelResponse & { Platform: string };
}
export interface DeleteApnsVoipChannelRequest {
  ApplicationId: string;
}
export interface APNSVoipChannelResponse {
  ApplicationId?: string;
  CreationDate?: string;
  DefaultAuthenticationMethod?: string;
  Enabled?: boolean;
  HasCredential?: boolean;
  HasTokenKey?: boolean;
  Id?: string;
  IsArchived?: boolean;
  LastModifiedBy?: string;
  LastModifiedDate?: string;
  Platform?: string;
  Version?: number;
}
export interface DeleteApnsVoipChannelResponse {
  APNSVoipChannelResponse: APNSVoipChannelResponse & { Platform: string };
}
export interface DeleteApnsVoipSandboxChannelRequest {
  ApplicationId: string;
}
export interface APNSVoipSandboxChannelResponse {
  ApplicationId?: string;
  CreationDate?: string;
  DefaultAuthenticationMethod?: string;
  Enabled?: boolean;
  HasCredential?: boolean;
  HasTokenKey?: boolean;
  Id?: string;
  IsArchived?: boolean;
  LastModifiedBy?: string;
  LastModifiedDate?: string;
  Platform?: string;
  Version?: number;
}
export interface DeleteApnsVoipSandboxChannelResponse {
  APNSVoipSandboxChannelResponse: APNSVoipSandboxChannelResponse & {
    Platform: string;
  };
}
export interface DeleteAppRequest {
  ApplicationId: string;
}
export interface DeleteAppResponse {
  ApplicationResponse: ApplicationResponse & {
    Arn: string;
    Id: string;
    Name: string;
  };
}
export interface DeleteBaiduChannelRequest {
  ApplicationId: string;
}
export interface BaiduChannelResponse {
  ApplicationId?: string;
  CreationDate?: string;
  Credential?: string;
  Enabled?: boolean;
  HasCredential?: boolean;
  Id?: string;
  IsArchived?: boolean;
  LastModifiedBy?: string;
  LastModifiedDate?: string;
  Platform?: string;
  Version?: number;
}
export interface DeleteBaiduChannelResponse {
  BaiduChannelResponse: BaiduChannelResponse & {
    Credential: string;
    Platform: string;
  };
}
export interface DeleteCampaignRequest {
  ApplicationId: string;
  CampaignId: string;
}
export interface DeleteCampaignResponse {
  CampaignResponse: CampaignResponse & {
    ApplicationId: string;
    Arn: string;
    CreationDate: string;
    Id: string;
    LastModifiedDate: string;
    SegmentId: string;
    SegmentVersion: number;
    AdditionalTreatments: (TreatmentResource & {
      Id: string;
      SizePercent: number;
      CustomDeliveryConfiguration: CustomDeliveryConfiguration & {
        DeliveryUri: string;
      };
      MessageConfiguration: MessageConfiguration & {
        InAppMessage: CampaignInAppMessage & {
          Content: (InAppMessageContent & {
            BodyConfig: InAppMessageBodyConfig & {
              Alignment: Alignment;
              Body: string;
              TextColor: string;
            };
            HeaderConfig: InAppMessageHeaderConfig & {
              Alignment: Alignment;
              Header: string;
              TextColor: string;
            };
            PrimaryBtn: InAppMessageButton & {
              Android: OverrideButtonConfiguration & {
                ButtonAction: ButtonAction;
              };
              DefaultConfig: DefaultButtonConfiguration & {
                ButtonAction: ButtonAction;
                Text: string;
              };
              IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
              Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            };
            SecondaryBtn: InAppMessageButton & {
              Android: OverrideButtonConfiguration & {
                ButtonAction: ButtonAction;
              };
              DefaultConfig: DefaultButtonConfiguration & {
                ButtonAction: ButtonAction;
                Text: string;
              };
              IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
              Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            };
          })[];
        };
      };
      Schedule: Schedule & {
        StartTime: string;
        EventFilter: CampaignEventFilter & {
          Dimensions: EventDimensions & {
            Attributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
            EventType: SetDimension & { Values: ListOf__string };
            Metrics: {
              [key: string]:
                | (MetricDimension & {
                    ComparisonOperator: string;
                    Value: number;
                  })
                | undefined;
            };
          };
          FilterType: FilterType;
        };
      };
    })[];
    CustomDeliveryConfiguration: CustomDeliveryConfiguration & {
      DeliveryUri: string;
    };
    MessageConfiguration: MessageConfiguration & {
      InAppMessage: CampaignInAppMessage & {
        Content: (InAppMessageContent & {
          BodyConfig: InAppMessageBodyConfig & {
            Alignment: Alignment;
            Body: string;
            TextColor: string;
          };
          HeaderConfig: InAppMessageHeaderConfig & {
            Alignment: Alignment;
            Header: string;
            TextColor: string;
          };
          PrimaryBtn: InAppMessageButton & {
            Android: OverrideButtonConfiguration & {
              ButtonAction: ButtonAction;
            };
            DefaultConfig: DefaultButtonConfiguration & {
              ButtonAction: ButtonAction;
              Text: string;
            };
            IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
          };
          SecondaryBtn: InAppMessageButton & {
            Android: OverrideButtonConfiguration & {
              ButtonAction: ButtonAction;
            };
            DefaultConfig: DefaultButtonConfiguration & {
              ButtonAction: ButtonAction;
              Text: string;
            };
            IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
          };
        })[];
      };
    };
    Schedule: Schedule & {
      StartTime: string;
      EventFilter: CampaignEventFilter & {
        Dimensions: EventDimensions & {
          Attributes: {
            [key: string]:
              | (AttributeDimension & { Values: ListOf__string })
              | undefined;
          };
          EventType: SetDimension & { Values: ListOf__string };
          Metrics: {
            [key: string]:
              | (MetricDimension & {
                  ComparisonOperator: string;
                  Value: number;
                })
              | undefined;
          };
        };
        FilterType: FilterType;
      };
    };
  };
}
export interface DeleteEmailChannelRequest {
  ApplicationId: string;
}
export interface EmailChannelResponse {
  ApplicationId?: string;
  ConfigurationSet?: string;
  CreationDate?: string;
  Enabled?: boolean;
  FromAddress?: string;
  HasCredential?: boolean;
  Id?: string;
  Identity?: string;
  IsArchived?: boolean;
  LastModifiedBy?: string;
  LastModifiedDate?: string;
  MessagesPerSecond?: number;
  Platform?: string;
  RoleArn?: string;
  OrchestrationSendingRoleArn?: string;
  Version?: number;
}
export interface DeleteEmailChannelResponse {
  EmailChannelResponse: EmailChannelResponse & { Platform: string };
}
export interface DeleteEmailTemplateRequest {
  TemplateName: string;
  Version?: string;
}
export interface MessageBody {
  Message?: string;
  RequestID?: string;
}
export interface DeleteEmailTemplateResponse {
  MessageBody: MessageBody;
}
export interface DeleteEndpointRequest {
  ApplicationId: string;
  EndpointId: string;
}
export type MapOfListOf__string = { [key: string]: string[] | undefined };
export type ChannelType =
  | "PUSH"
  | "GCM"
  | "APNS"
  | "APNS_SANDBOX"
  | "APNS_VOIP"
  | "APNS_VOIP_SANDBOX"
  | "ADM"
  | "SMS"
  | "VOICE"
  | "EMAIL"
  | "BAIDU"
  | "CUSTOM"
  | "IN_APP"
  | (string & {});
export interface EndpointDemographic {
  AppVersion?: string;
  Locale?: string;
  Make?: string;
  Model?: string;
  ModelVersion?: string;
  Platform?: string;
  PlatformVersion?: string;
  Timezone?: string;
}
export interface EndpointLocation {
  City?: string;
  Country?: string;
  Latitude?: number;
  Longitude?: number;
  PostalCode?: string;
  Region?: string;
}
export type MapOf__double = { [key: string]: number | undefined };
export interface EndpointUser {
  UserAttributes?: { [key: string]: string[] | undefined };
  UserId?: string;
}
export interface EndpointResponse {
  Address?: string;
  ApplicationId?: string;
  Attributes?: { [key: string]: string[] | undefined };
  ChannelType?: ChannelType;
  CohortId?: string;
  CreationDate?: string;
  Demographic?: EndpointDemographic;
  EffectiveDate?: string;
  EndpointStatus?: string;
  Id?: string;
  Location?: EndpointLocation;
  Metrics?: { [key: string]: number | undefined };
  OptOut?: string;
  RequestId?: string;
  User?: EndpointUser;
}
export interface DeleteEndpointResponse {
  EndpointResponse: EndpointResponse;
}
export interface DeleteEventStreamRequest {
  ApplicationId: string;
}
export interface EventStream {
  ApplicationId?: string;
  DestinationStreamArn?: string;
  ExternalId?: string;
  LastModifiedDate?: string;
  LastUpdatedBy?: string;
  RoleArn?: string;
}
export interface DeleteEventStreamResponse {
  EventStream: EventStream & {
    ApplicationId: string;
    DestinationStreamArn: string;
    RoleArn: string;
  };
}
export interface DeleteGcmChannelRequest {
  ApplicationId: string;
}
export interface GCMChannelResponse {
  ApplicationId?: string;
  CreationDate?: string;
  Credential?: string;
  DefaultAuthenticationMethod?: string;
  Enabled?: boolean;
  HasCredential?: boolean;
  HasFcmServiceCredentials?: boolean;
  Id?: string;
  IsArchived?: boolean;
  LastModifiedBy?: string;
  LastModifiedDate?: string;
  Platform?: string;
  Version?: number;
}
export interface DeleteGcmChannelResponse {
  GCMChannelResponse: GCMChannelResponse & { Platform: string };
}
export interface DeleteInAppTemplateRequest {
  TemplateName: string;
  Version?: string;
}
export interface DeleteInAppTemplateResponse {
  MessageBody: MessageBody;
}
export interface DeleteJourneyRequest {
  ApplicationId: string;
  JourneyId: string;
}
export interface DeleteJourneyResponse {
  JourneyResponse: JourneyResponse & {
    ApplicationId: string;
    Id: string;
    Name: string;
    Activities: {
      [key: string]:
        | (Activity & {
            ConditionalSplit: ConditionalSplitActivity & {
              Condition: Condition & {
                Conditions: (SimpleCondition & {
                  EventCondition: EventCondition & {
                    Dimensions: EventDimensions & {
                      Attributes: {
                        [key: string]:
                          | (AttributeDimension & { Values: ListOf__string })
                          | undefined;
                      };
                      EventType: SetDimension & { Values: ListOf__string };
                      Metrics: {
                        [key: string]:
                          | (MetricDimension & {
                              ComparisonOperator: string;
                              Value: number;
                            })
                          | undefined;
                      };
                    };
                  };
                  SegmentCondition: SegmentCondition & { SegmentId: string };
                  SegmentDimensions: SegmentDimensions & {
                    Attributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                    Behavior: SegmentBehaviors & {
                      Recency: RecencyDimension & {
                        Duration: Duration;
                        RecencyType: RecencyType;
                      };
                    };
                    Demographic: SegmentDemographics & {
                      AppVersion: SetDimension & { Values: ListOf__string };
                      Channel: SetDimension & { Values: ListOf__string };
                      DeviceType: SetDimension & { Values: ListOf__string };
                      Make: SetDimension & { Values: ListOf__string };
                      Model: SetDimension & { Values: ListOf__string };
                      Platform: SetDimension & { Values: ListOf__string };
                    };
                    Location: SegmentLocation & {
                      Country: SetDimension & { Values: ListOf__string };
                      GPSPoint: GPSPointDimension & {
                        Coordinates: GPSCoordinates & {
                          Latitude: number;
                          Longitude: number;
                        };
                      };
                    };
                    Metrics: {
                      [key: string]:
                        | (MetricDimension & {
                            ComparisonOperator: string;
                            Value: number;
                          })
                        | undefined;
                    };
                    UserAttributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                  };
                })[];
              };
            };
            Holdout: HoldoutActivity & { Percentage: number };
            MultiCondition: MultiConditionalSplitActivity & {
              Branches: (MultiConditionalBranch & {
                Condition: SimpleCondition & {
                  EventCondition: EventCondition & {
                    Dimensions: EventDimensions & {
                      Attributes: {
                        [key: string]:
                          | (AttributeDimension & { Values: ListOf__string })
                          | undefined;
                      };
                      EventType: SetDimension & { Values: ListOf__string };
                      Metrics: {
                        [key: string]:
                          | (MetricDimension & {
                              ComparisonOperator: string;
                              Value: number;
                            })
                          | undefined;
                      };
                    };
                  };
                  SegmentCondition: SegmentCondition & { SegmentId: string };
                  SegmentDimensions: SegmentDimensions & {
                    Attributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                    Behavior: SegmentBehaviors & {
                      Recency: RecencyDimension & {
                        Duration: Duration;
                        RecencyType: RecencyType;
                      };
                    };
                    Demographic: SegmentDemographics & {
                      AppVersion: SetDimension & { Values: ListOf__string };
                      Channel: SetDimension & { Values: ListOf__string };
                      DeviceType: SetDimension & { Values: ListOf__string };
                      Make: SetDimension & { Values: ListOf__string };
                      Model: SetDimension & { Values: ListOf__string };
                      Platform: SetDimension & { Values: ListOf__string };
                    };
                    Location: SegmentLocation & {
                      Country: SetDimension & { Values: ListOf__string };
                      GPSPoint: GPSPointDimension & {
                        Coordinates: GPSCoordinates & {
                          Latitude: number;
                          Longitude: number;
                        };
                      };
                    };
                    Metrics: {
                      [key: string]:
                        | (MetricDimension & {
                            ComparisonOperator: string;
                            Value: number;
                          })
                        | undefined;
                    };
                    UserAttributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                  };
                };
              })[];
            };
          })
        | undefined;
    };
    StartCondition: StartCondition & {
      EventStartCondition: EventStartCondition & {
        EventFilter: EventFilter & {
          Dimensions: EventDimensions & {
            Attributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
            EventType: SetDimension & { Values: ListOf__string };
            Metrics: {
              [key: string]:
                | (MetricDimension & {
                    ComparisonOperator: string;
                    Value: number;
                  })
                | undefined;
            };
          };
          FilterType: FilterType;
        };
      };
      SegmentStartCondition: SegmentCondition & { SegmentId: string };
    };
  };
}
export interface DeletePushTemplateRequest {
  TemplateName: string;
  Version?: string;
}
export interface DeletePushTemplateResponse {
  MessageBody: MessageBody;
}
export interface DeleteRecommenderConfigurationRequest {
  RecommenderId: string;
}
export interface DeleteRecommenderConfigurationResponse {
  RecommenderConfigurationResponse: RecommenderConfigurationResponse & {
    CreationDate: string;
    Id: string;
    LastModifiedDate: string;
    RecommendationProviderRoleArn: string;
    RecommendationProviderUri: string;
  };
}
export interface DeleteSegmentRequest {
  ApplicationId: string;
  SegmentId: string;
}
export interface DeleteSegmentResponse {
  SegmentResponse: SegmentResponse & {
    ApplicationId: string;
    Arn: string;
    CreationDate: string;
    Id: string;
    SegmentType: SegmentType;
    Dimensions: SegmentDimensions & {
      Attributes: {
        [key: string]:
          | (AttributeDimension & { Values: ListOf__string })
          | undefined;
      };
      Behavior: SegmentBehaviors & {
        Recency: RecencyDimension & {
          Duration: Duration;
          RecencyType: RecencyType;
        };
      };
      Demographic: SegmentDemographics & {
        AppVersion: SetDimension & { Values: ListOf__string };
        Channel: SetDimension & { Values: ListOf__string };
        DeviceType: SetDimension & { Values: ListOf__string };
        Make: SetDimension & { Values: ListOf__string };
        Model: SetDimension & { Values: ListOf__string };
        Platform: SetDimension & { Values: ListOf__string };
      };
      Location: SegmentLocation & {
        Country: SetDimension & { Values: ListOf__string };
        GPSPoint: GPSPointDimension & {
          Coordinates: GPSCoordinates & { Latitude: number; Longitude: number };
        };
      };
      Metrics: {
        [key: string]:
          | (MetricDimension & { ComparisonOperator: string; Value: number })
          | undefined;
      };
      UserAttributes: {
        [key: string]:
          | (AttributeDimension & { Values: ListOf__string })
          | undefined;
      };
    };
    ImportDefinition: SegmentImportResource & {
      ExternalId: string;
      Format: Format;
      RoleArn: string;
      S3Url: string;
      Size: number;
    };
    SegmentGroups: SegmentGroupList & {
      Groups: (SegmentGroup & {
        Dimensions: (SegmentDimensions & {
          Attributes: {
            [key: string]:
              | (AttributeDimension & { Values: ListOf__string })
              | undefined;
          };
          Behavior: SegmentBehaviors & {
            Recency: RecencyDimension & {
              Duration: Duration;
              RecencyType: RecencyType;
            };
          };
          Demographic: SegmentDemographics & {
            AppVersion: SetDimension & { Values: ListOf__string };
            Channel: SetDimension & { Values: ListOf__string };
            DeviceType: SetDimension & { Values: ListOf__string };
            Make: SetDimension & { Values: ListOf__string };
            Model: SetDimension & { Values: ListOf__string };
            Platform: SetDimension & { Values: ListOf__string };
          };
          Location: SegmentLocation & {
            Country: SetDimension & { Values: ListOf__string };
            GPSPoint: GPSPointDimension & {
              Coordinates: GPSCoordinates & {
                Latitude: number;
                Longitude: number;
              };
            };
          };
          Metrics: {
            [key: string]:
              | (MetricDimension & {
                  ComparisonOperator: string;
                  Value: number;
                })
              | undefined;
          };
          UserAttributes: {
            [key: string]:
              | (AttributeDimension & { Values: ListOf__string })
              | undefined;
          };
        })[];
        SourceSegments: (SegmentReference & { Id: string })[];
      })[];
    };
  };
}
export interface DeleteSmsChannelRequest {
  ApplicationId: string;
}
export interface SMSChannelResponse {
  ApplicationId?: string;
  CreationDate?: string;
  Enabled?: boolean;
  HasCredential?: boolean;
  Id?: string;
  IsArchived?: boolean;
  LastModifiedBy?: string;
  LastModifiedDate?: string;
  Platform?: string;
  PromotionalMessagesPerSecond?: number;
  SenderId?: string;
  ShortCode?: string;
  TransactionalMessagesPerSecond?: number;
  Version?: number;
}
export interface DeleteSmsChannelResponse {
  SMSChannelResponse: SMSChannelResponse & { Platform: string };
}
export interface DeleteSmsTemplateRequest {
  TemplateName: string;
  Version?: string;
}
export interface DeleteSmsTemplateResponse {
  MessageBody: MessageBody;
}
export interface DeleteUserEndpointsRequest {
  ApplicationId: string;
  UserId: string;
}
export type ListOfEndpointResponse = EndpointResponse[];
export interface EndpointsResponse {
  Item?: EndpointResponse[];
}
export interface DeleteUserEndpointsResponse {
  EndpointsResponse: EndpointsResponse & { Item: ListOfEndpointResponse };
}
export interface DeleteVoiceChannelRequest {
  ApplicationId: string;
}
export interface VoiceChannelResponse {
  ApplicationId?: string;
  CreationDate?: string;
  Enabled?: boolean;
  HasCredential?: boolean;
  Id?: string;
  IsArchived?: boolean;
  LastModifiedBy?: string;
  LastModifiedDate?: string;
  Platform?: string;
  Version?: number;
}
export interface DeleteVoiceChannelResponse {
  VoiceChannelResponse: VoiceChannelResponse & { Platform: string };
}
export interface DeleteVoiceTemplateRequest {
  TemplateName: string;
  Version?: string;
}
export interface DeleteVoiceTemplateResponse {
  MessageBody: MessageBody;
}
export interface GetAdmChannelRequest {
  ApplicationId: string;
}
export interface GetAdmChannelResponse {
  ADMChannelResponse: ADMChannelResponse & { Platform: string };
}
export interface GetApnsChannelRequest {
  ApplicationId: string;
}
export interface GetApnsChannelResponse {
  APNSChannelResponse: APNSChannelResponse & { Platform: string };
}
export interface GetApnsSandboxChannelRequest {
  ApplicationId: string;
}
export interface GetApnsSandboxChannelResponse {
  APNSSandboxChannelResponse: APNSSandboxChannelResponse & { Platform: string };
}
export interface GetApnsVoipChannelRequest {
  ApplicationId: string;
}
export interface GetApnsVoipChannelResponse {
  APNSVoipChannelResponse: APNSVoipChannelResponse & { Platform: string };
}
export interface GetApnsVoipSandboxChannelRequest {
  ApplicationId: string;
}
export interface GetApnsVoipSandboxChannelResponse {
  APNSVoipSandboxChannelResponse: APNSVoipSandboxChannelResponse & {
    Platform: string;
  };
}
export interface GetAppRequest {
  ApplicationId: string;
}
export interface GetAppResponse {
  ApplicationResponse: ApplicationResponse & {
    Arn: string;
    Id: string;
    Name: string;
  };
}
export interface GetApplicationDateRangeKpiRequest {
  ApplicationId: string;
  EndTime?: Date;
  KpiName: string;
  NextToken?: string;
  PageSize?: string;
  StartTime?: Date;
}
export interface ResultRowValue {
  Key?: string;
  Type?: string;
  Value?: string;
}
export type ListOfResultRowValue = ResultRowValue[];
export interface ResultRow {
  GroupedBys?: ResultRowValue[];
  Values?: ResultRowValue[];
}
export type ListOfResultRow = ResultRow[];
export interface BaseKpiResult {
  Rows?: ResultRow[];
}
export interface ApplicationDateRangeKpiResponse {
  ApplicationId?: string;
  EndTime?: Date;
  KpiName?: string;
  KpiResult?: BaseKpiResult;
  NextToken?: string;
  StartTime?: Date;
}
export interface GetApplicationDateRangeKpiResponse {
  ApplicationDateRangeKpiResponse: ApplicationDateRangeKpiResponse & {
    ApplicationId: string;
    EndTime: __timestampIso8601;
    KpiName: string;
    KpiResult: BaseKpiResult & {
      Rows: (ResultRow & {
        GroupedBys: (ResultRowValue & {
          Key: string;
          Type: string;
          Value: string;
        })[];
        Values: (ResultRowValue & {
          Key: string;
          Type: string;
          Value: string;
        })[];
      })[];
    };
    StartTime: __timestampIso8601;
  };
}
export interface GetApplicationSettingsRequest {
  ApplicationId: string;
}
export interface ApplicationSettingsJourneyLimits {
  DailyCap?: number;
  TimeframeCap?: JourneyTimeframeCap;
  TotalCap?: number;
}
export interface ApplicationSettingsResource {
  ApplicationId?: string;
  CampaignHook?: CampaignHook;
  LastModifiedDate?: string;
  Limits?: CampaignLimits;
  QuietTime?: QuietTime;
  JourneyLimits?: ApplicationSettingsJourneyLimits;
}
export interface GetApplicationSettingsResponse {
  ApplicationSettingsResource: ApplicationSettingsResource & {
    ApplicationId: string;
  };
}
export interface GetAppsRequest {
  PageSize?: string;
  Token?: string;
}
export type ListOfApplicationResponse = ApplicationResponse[];
export interface ApplicationsResponse {
  Item?: ApplicationResponse[];
  NextToken?: string;
}
export interface GetAppsResponse {
  ApplicationsResponse: ApplicationsResponse & {
    Item: (ApplicationResponse & { Arn: string; Id: string; Name: string })[];
  };
}
export interface GetBaiduChannelRequest {
  ApplicationId: string;
}
export interface GetBaiduChannelResponse {
  BaiduChannelResponse: BaiduChannelResponse & {
    Credential: string;
    Platform: string;
  };
}
export interface GetCampaignRequest {
  ApplicationId: string;
  CampaignId: string;
}
export interface GetCampaignResponse {
  CampaignResponse: CampaignResponse & {
    ApplicationId: string;
    Arn: string;
    CreationDate: string;
    Id: string;
    LastModifiedDate: string;
    SegmentId: string;
    SegmentVersion: number;
    AdditionalTreatments: (TreatmentResource & {
      Id: string;
      SizePercent: number;
      CustomDeliveryConfiguration: CustomDeliveryConfiguration & {
        DeliveryUri: string;
      };
      MessageConfiguration: MessageConfiguration & {
        InAppMessage: CampaignInAppMessage & {
          Content: (InAppMessageContent & {
            BodyConfig: InAppMessageBodyConfig & {
              Alignment: Alignment;
              Body: string;
              TextColor: string;
            };
            HeaderConfig: InAppMessageHeaderConfig & {
              Alignment: Alignment;
              Header: string;
              TextColor: string;
            };
            PrimaryBtn: InAppMessageButton & {
              Android: OverrideButtonConfiguration & {
                ButtonAction: ButtonAction;
              };
              DefaultConfig: DefaultButtonConfiguration & {
                ButtonAction: ButtonAction;
                Text: string;
              };
              IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
              Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            };
            SecondaryBtn: InAppMessageButton & {
              Android: OverrideButtonConfiguration & {
                ButtonAction: ButtonAction;
              };
              DefaultConfig: DefaultButtonConfiguration & {
                ButtonAction: ButtonAction;
                Text: string;
              };
              IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
              Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            };
          })[];
        };
      };
      Schedule: Schedule & {
        StartTime: string;
        EventFilter: CampaignEventFilter & {
          Dimensions: EventDimensions & {
            Attributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
            EventType: SetDimension & { Values: ListOf__string };
            Metrics: {
              [key: string]:
                | (MetricDimension & {
                    ComparisonOperator: string;
                    Value: number;
                  })
                | undefined;
            };
          };
          FilterType: FilterType;
        };
      };
    })[];
    CustomDeliveryConfiguration: CustomDeliveryConfiguration & {
      DeliveryUri: string;
    };
    MessageConfiguration: MessageConfiguration & {
      InAppMessage: CampaignInAppMessage & {
        Content: (InAppMessageContent & {
          BodyConfig: InAppMessageBodyConfig & {
            Alignment: Alignment;
            Body: string;
            TextColor: string;
          };
          HeaderConfig: InAppMessageHeaderConfig & {
            Alignment: Alignment;
            Header: string;
            TextColor: string;
          };
          PrimaryBtn: InAppMessageButton & {
            Android: OverrideButtonConfiguration & {
              ButtonAction: ButtonAction;
            };
            DefaultConfig: DefaultButtonConfiguration & {
              ButtonAction: ButtonAction;
              Text: string;
            };
            IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
          };
          SecondaryBtn: InAppMessageButton & {
            Android: OverrideButtonConfiguration & {
              ButtonAction: ButtonAction;
            };
            DefaultConfig: DefaultButtonConfiguration & {
              ButtonAction: ButtonAction;
              Text: string;
            };
            IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
          };
        })[];
      };
    };
    Schedule: Schedule & {
      StartTime: string;
      EventFilter: CampaignEventFilter & {
        Dimensions: EventDimensions & {
          Attributes: {
            [key: string]:
              | (AttributeDimension & { Values: ListOf__string })
              | undefined;
          };
          EventType: SetDimension & { Values: ListOf__string };
          Metrics: {
            [key: string]:
              | (MetricDimension & {
                  ComparisonOperator: string;
                  Value: number;
                })
              | undefined;
          };
        };
        FilterType: FilterType;
      };
    };
  };
}
export interface GetCampaignActivitiesRequest {
  ApplicationId: string;
  CampaignId: string;
  PageSize?: string;
  Token?: string;
}
export interface ActivityResponse {
  ApplicationId?: string;
  CampaignId?: string;
  End?: string;
  Id?: string;
  Result?: string;
  ScheduledStart?: string;
  Start?: string;
  State?: string;
  SuccessfulEndpointCount?: number;
  TimezonesCompletedCount?: number;
  TimezonesTotalCount?: number;
  TotalEndpointCount?: number;
  TreatmentId?: string;
  ExecutionMetrics?: { [key: string]: string | undefined };
}
export type ListOfActivityResponse = ActivityResponse[];
export interface ActivitiesResponse {
  Item?: ActivityResponse[];
  NextToken?: string;
}
export interface GetCampaignActivitiesResponse {
  ActivitiesResponse: ActivitiesResponse & {
    Item: (ActivityResponse & {
      ApplicationId: string;
      CampaignId: string;
      Id: string;
    })[];
  };
}
export interface GetCampaignDateRangeKpiRequest {
  ApplicationId: string;
  CampaignId: string;
  EndTime?: Date;
  KpiName: string;
  NextToken?: string;
  PageSize?: string;
  StartTime?: Date;
}
export interface CampaignDateRangeKpiResponse {
  ApplicationId?: string;
  CampaignId?: string;
  EndTime?: Date;
  KpiName?: string;
  KpiResult?: BaseKpiResult;
  NextToken?: string;
  StartTime?: Date;
}
export interface GetCampaignDateRangeKpiResponse {
  CampaignDateRangeKpiResponse: CampaignDateRangeKpiResponse & {
    ApplicationId: string;
    CampaignId: string;
    EndTime: __timestampIso8601;
    KpiName: string;
    KpiResult: BaseKpiResult & {
      Rows: (ResultRow & {
        GroupedBys: (ResultRowValue & {
          Key: string;
          Type: string;
          Value: string;
        })[];
        Values: (ResultRowValue & {
          Key: string;
          Type: string;
          Value: string;
        })[];
      })[];
    };
    StartTime: __timestampIso8601;
  };
}
export interface GetCampaignsRequest {
  ApplicationId: string;
  PageSize?: string;
  Token?: string;
}
export type ListOfCampaignResponse = CampaignResponse[];
export interface CampaignsResponse {
  Item?: CampaignResponse[];
  NextToken?: string;
}
export interface GetCampaignsResponse {
  CampaignsResponse: CampaignsResponse & {
    Item: (CampaignResponse & {
      ApplicationId: string;
      Arn: string;
      CreationDate: string;
      Id: string;
      LastModifiedDate: string;
      SegmentId: string;
      SegmentVersion: number;
      AdditionalTreatments: (TreatmentResource & {
        Id: string;
        SizePercent: number;
        CustomDeliveryConfiguration: CustomDeliveryConfiguration & {
          DeliveryUri: string;
        };
        MessageConfiguration: MessageConfiguration & {
          InAppMessage: CampaignInAppMessage & {
            Content: (InAppMessageContent & {
              BodyConfig: InAppMessageBodyConfig & {
                Alignment: Alignment;
                Body: string;
                TextColor: string;
              };
              HeaderConfig: InAppMessageHeaderConfig & {
                Alignment: Alignment;
                Header: string;
                TextColor: string;
              };
              PrimaryBtn: InAppMessageButton & {
                Android: OverrideButtonConfiguration & {
                  ButtonAction: ButtonAction;
                };
                DefaultConfig: DefaultButtonConfiguration & {
                  ButtonAction: ButtonAction;
                  Text: string;
                };
                IOS: OverrideButtonConfiguration & {
                  ButtonAction: ButtonAction;
                };
                Web: OverrideButtonConfiguration & {
                  ButtonAction: ButtonAction;
                };
              };
              SecondaryBtn: InAppMessageButton & {
                Android: OverrideButtonConfiguration & {
                  ButtonAction: ButtonAction;
                };
                DefaultConfig: DefaultButtonConfiguration & {
                  ButtonAction: ButtonAction;
                  Text: string;
                };
                IOS: OverrideButtonConfiguration & {
                  ButtonAction: ButtonAction;
                };
                Web: OverrideButtonConfiguration & {
                  ButtonAction: ButtonAction;
                };
              };
            })[];
          };
        };
        Schedule: Schedule & {
          StartTime: string;
          EventFilter: CampaignEventFilter & {
            Dimensions: EventDimensions & {
              Attributes: {
                [key: string]:
                  | (AttributeDimension & { Values: ListOf__string })
                  | undefined;
              };
              EventType: SetDimension & { Values: ListOf__string };
              Metrics: {
                [key: string]:
                  | (MetricDimension & {
                      ComparisonOperator: string;
                      Value: number;
                    })
                  | undefined;
              };
            };
            FilterType: FilterType;
          };
        };
      })[];
      CustomDeliveryConfiguration: CustomDeliveryConfiguration & {
        DeliveryUri: string;
      };
      MessageConfiguration: MessageConfiguration & {
        InAppMessage: CampaignInAppMessage & {
          Content: (InAppMessageContent & {
            BodyConfig: InAppMessageBodyConfig & {
              Alignment: Alignment;
              Body: string;
              TextColor: string;
            };
            HeaderConfig: InAppMessageHeaderConfig & {
              Alignment: Alignment;
              Header: string;
              TextColor: string;
            };
            PrimaryBtn: InAppMessageButton & {
              Android: OverrideButtonConfiguration & {
                ButtonAction: ButtonAction;
              };
              DefaultConfig: DefaultButtonConfiguration & {
                ButtonAction: ButtonAction;
                Text: string;
              };
              IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
              Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            };
            SecondaryBtn: InAppMessageButton & {
              Android: OverrideButtonConfiguration & {
                ButtonAction: ButtonAction;
              };
              DefaultConfig: DefaultButtonConfiguration & {
                ButtonAction: ButtonAction;
                Text: string;
              };
              IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
              Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            };
          })[];
        };
      };
      Schedule: Schedule & {
        StartTime: string;
        EventFilter: CampaignEventFilter & {
          Dimensions: EventDimensions & {
            Attributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
            EventType: SetDimension & { Values: ListOf__string };
            Metrics: {
              [key: string]:
                | (MetricDimension & {
                    ComparisonOperator: string;
                    Value: number;
                  })
                | undefined;
            };
          };
          FilterType: FilterType;
        };
      };
    })[];
  };
}
export interface GetCampaignVersionRequest {
  ApplicationId: string;
  CampaignId: string;
  Version: string;
}
export interface GetCampaignVersionResponse {
  CampaignResponse: CampaignResponse & {
    ApplicationId: string;
    Arn: string;
    CreationDate: string;
    Id: string;
    LastModifiedDate: string;
    SegmentId: string;
    SegmentVersion: number;
    AdditionalTreatments: (TreatmentResource & {
      Id: string;
      SizePercent: number;
      CustomDeliveryConfiguration: CustomDeliveryConfiguration & {
        DeliveryUri: string;
      };
      MessageConfiguration: MessageConfiguration & {
        InAppMessage: CampaignInAppMessage & {
          Content: (InAppMessageContent & {
            BodyConfig: InAppMessageBodyConfig & {
              Alignment: Alignment;
              Body: string;
              TextColor: string;
            };
            HeaderConfig: InAppMessageHeaderConfig & {
              Alignment: Alignment;
              Header: string;
              TextColor: string;
            };
            PrimaryBtn: InAppMessageButton & {
              Android: OverrideButtonConfiguration & {
                ButtonAction: ButtonAction;
              };
              DefaultConfig: DefaultButtonConfiguration & {
                ButtonAction: ButtonAction;
                Text: string;
              };
              IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
              Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            };
            SecondaryBtn: InAppMessageButton & {
              Android: OverrideButtonConfiguration & {
                ButtonAction: ButtonAction;
              };
              DefaultConfig: DefaultButtonConfiguration & {
                ButtonAction: ButtonAction;
                Text: string;
              };
              IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
              Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            };
          })[];
        };
      };
      Schedule: Schedule & {
        StartTime: string;
        EventFilter: CampaignEventFilter & {
          Dimensions: EventDimensions & {
            Attributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
            EventType: SetDimension & { Values: ListOf__string };
            Metrics: {
              [key: string]:
                | (MetricDimension & {
                    ComparisonOperator: string;
                    Value: number;
                  })
                | undefined;
            };
          };
          FilterType: FilterType;
        };
      };
    })[];
    CustomDeliveryConfiguration: CustomDeliveryConfiguration & {
      DeliveryUri: string;
    };
    MessageConfiguration: MessageConfiguration & {
      InAppMessage: CampaignInAppMessage & {
        Content: (InAppMessageContent & {
          BodyConfig: InAppMessageBodyConfig & {
            Alignment: Alignment;
            Body: string;
            TextColor: string;
          };
          HeaderConfig: InAppMessageHeaderConfig & {
            Alignment: Alignment;
            Header: string;
            TextColor: string;
          };
          PrimaryBtn: InAppMessageButton & {
            Android: OverrideButtonConfiguration & {
              ButtonAction: ButtonAction;
            };
            DefaultConfig: DefaultButtonConfiguration & {
              ButtonAction: ButtonAction;
              Text: string;
            };
            IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
          };
          SecondaryBtn: InAppMessageButton & {
            Android: OverrideButtonConfiguration & {
              ButtonAction: ButtonAction;
            };
            DefaultConfig: DefaultButtonConfiguration & {
              ButtonAction: ButtonAction;
              Text: string;
            };
            IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
          };
        })[];
      };
    };
    Schedule: Schedule & {
      StartTime: string;
      EventFilter: CampaignEventFilter & {
        Dimensions: EventDimensions & {
          Attributes: {
            [key: string]:
              | (AttributeDimension & { Values: ListOf__string })
              | undefined;
          };
          EventType: SetDimension & { Values: ListOf__string };
          Metrics: {
            [key: string]:
              | (MetricDimension & {
                  ComparisonOperator: string;
                  Value: number;
                })
              | undefined;
          };
        };
        FilterType: FilterType;
      };
    };
  };
}
export interface GetCampaignVersionsRequest {
  ApplicationId: string;
  CampaignId: string;
  PageSize?: string;
  Token?: string;
}
export interface GetCampaignVersionsResponse {
  CampaignsResponse: CampaignsResponse & {
    Item: (CampaignResponse & {
      ApplicationId: string;
      Arn: string;
      CreationDate: string;
      Id: string;
      LastModifiedDate: string;
      SegmentId: string;
      SegmentVersion: number;
      AdditionalTreatments: (TreatmentResource & {
        Id: string;
        SizePercent: number;
        CustomDeliveryConfiguration: CustomDeliveryConfiguration & {
          DeliveryUri: string;
        };
        MessageConfiguration: MessageConfiguration & {
          InAppMessage: CampaignInAppMessage & {
            Content: (InAppMessageContent & {
              BodyConfig: InAppMessageBodyConfig & {
                Alignment: Alignment;
                Body: string;
                TextColor: string;
              };
              HeaderConfig: InAppMessageHeaderConfig & {
                Alignment: Alignment;
                Header: string;
                TextColor: string;
              };
              PrimaryBtn: InAppMessageButton & {
                Android: OverrideButtonConfiguration & {
                  ButtonAction: ButtonAction;
                };
                DefaultConfig: DefaultButtonConfiguration & {
                  ButtonAction: ButtonAction;
                  Text: string;
                };
                IOS: OverrideButtonConfiguration & {
                  ButtonAction: ButtonAction;
                };
                Web: OverrideButtonConfiguration & {
                  ButtonAction: ButtonAction;
                };
              };
              SecondaryBtn: InAppMessageButton & {
                Android: OverrideButtonConfiguration & {
                  ButtonAction: ButtonAction;
                };
                DefaultConfig: DefaultButtonConfiguration & {
                  ButtonAction: ButtonAction;
                  Text: string;
                };
                IOS: OverrideButtonConfiguration & {
                  ButtonAction: ButtonAction;
                };
                Web: OverrideButtonConfiguration & {
                  ButtonAction: ButtonAction;
                };
              };
            })[];
          };
        };
        Schedule: Schedule & {
          StartTime: string;
          EventFilter: CampaignEventFilter & {
            Dimensions: EventDimensions & {
              Attributes: {
                [key: string]:
                  | (AttributeDimension & { Values: ListOf__string })
                  | undefined;
              };
              EventType: SetDimension & { Values: ListOf__string };
              Metrics: {
                [key: string]:
                  | (MetricDimension & {
                      ComparisonOperator: string;
                      Value: number;
                    })
                  | undefined;
              };
            };
            FilterType: FilterType;
          };
        };
      })[];
      CustomDeliveryConfiguration: CustomDeliveryConfiguration & {
        DeliveryUri: string;
      };
      MessageConfiguration: MessageConfiguration & {
        InAppMessage: CampaignInAppMessage & {
          Content: (InAppMessageContent & {
            BodyConfig: InAppMessageBodyConfig & {
              Alignment: Alignment;
              Body: string;
              TextColor: string;
            };
            HeaderConfig: InAppMessageHeaderConfig & {
              Alignment: Alignment;
              Header: string;
              TextColor: string;
            };
            PrimaryBtn: InAppMessageButton & {
              Android: OverrideButtonConfiguration & {
                ButtonAction: ButtonAction;
              };
              DefaultConfig: DefaultButtonConfiguration & {
                ButtonAction: ButtonAction;
                Text: string;
              };
              IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
              Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            };
            SecondaryBtn: InAppMessageButton & {
              Android: OverrideButtonConfiguration & {
                ButtonAction: ButtonAction;
              };
              DefaultConfig: DefaultButtonConfiguration & {
                ButtonAction: ButtonAction;
                Text: string;
              };
              IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
              Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            };
          })[];
        };
      };
      Schedule: Schedule & {
        StartTime: string;
        EventFilter: CampaignEventFilter & {
          Dimensions: EventDimensions & {
            Attributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
            EventType: SetDimension & { Values: ListOf__string };
            Metrics: {
              [key: string]:
                | (MetricDimension & {
                    ComparisonOperator: string;
                    Value: number;
                  })
                | undefined;
            };
          };
          FilterType: FilterType;
        };
      };
    })[];
  };
}
export interface GetChannelsRequest {
  ApplicationId: string;
}
export interface ChannelResponse {
  ApplicationId?: string;
  CreationDate?: string;
  Enabled?: boolean;
  HasCredential?: boolean;
  Id?: string;
  IsArchived?: boolean;
  LastModifiedBy?: string;
  LastModifiedDate?: string;
  Version?: number;
}
export type MapOfChannelResponse = {
  [key: string]: ChannelResponse | undefined;
};
export interface ChannelsResponse {
  Channels?: { [key: string]: ChannelResponse | undefined };
}
export interface GetChannelsResponse {
  ChannelsResponse: ChannelsResponse & { Channels: MapOfChannelResponse };
}
export interface GetEmailChannelRequest {
  ApplicationId: string;
}
export interface GetEmailChannelResponse {
  EmailChannelResponse: EmailChannelResponse & { Platform: string };
}
export interface GetEmailTemplateRequest {
  TemplateName: string;
  Version?: string;
}
export type TemplateType =
  | "EMAIL"
  | "SMS"
  | "VOICE"
  | "PUSH"
  | "INAPP"
  | (string & {});
export interface EmailTemplateResponse {
  Arn?: string;
  CreationDate?: string;
  DefaultSubstitutions?: string;
  HtmlPart?: string;
  LastModifiedDate?: string;
  RecommenderId?: string;
  Subject?: string;
  Headers?: MessageHeader[];
  tags?: { [key: string]: string | undefined };
  TemplateDescription?: string;
  TemplateName?: string;
  TemplateType?: TemplateType;
  TextPart?: string;
  Version?: string;
}
export interface GetEmailTemplateResponse {
  EmailTemplateResponse: EmailTemplateResponse & {
    CreationDate: string;
    LastModifiedDate: string;
    TemplateName: string;
    TemplateType: TemplateType;
  };
}
export interface GetEndpointRequest {
  ApplicationId: string;
  EndpointId: string;
}
export interface GetEndpointResponse {
  EndpointResponse: EndpointResponse;
}
export interface GetEventStreamRequest {
  ApplicationId: string;
}
export interface GetEventStreamResponse {
  EventStream: EventStream & {
    ApplicationId: string;
    DestinationStreamArn: string;
    RoleArn: string;
  };
}
export interface GetExportJobRequest {
  ApplicationId: string;
  JobId: string;
}
export interface GetExportJobResponse {
  ExportJobResponse: ExportJobResponse & {
    ApplicationId: string;
    CreationDate: string;
    Definition: ExportJobResource & { RoleArn: string; S3UrlPrefix: string };
    Id: string;
    JobStatus: JobStatus;
    Type: string;
  };
}
export interface GetExportJobsRequest {
  ApplicationId: string;
  PageSize?: string;
  Token?: string;
}
export type ListOfExportJobResponse = ExportJobResponse[];
export interface ExportJobsResponse {
  Item?: ExportJobResponse[];
  NextToken?: string;
}
export interface GetExportJobsResponse {
  ExportJobsResponse: ExportJobsResponse & {
    Item: (ExportJobResponse & {
      ApplicationId: string;
      CreationDate: string;
      Definition: ExportJobResource & { RoleArn: string; S3UrlPrefix: string };
      Id: string;
      JobStatus: JobStatus;
      Type: string;
    })[];
  };
}
export interface GetGcmChannelRequest {
  ApplicationId: string;
}
export interface GetGcmChannelResponse {
  GCMChannelResponse: GCMChannelResponse & { Platform: string };
}
export interface GetImportJobRequest {
  ApplicationId: string;
  JobId: string;
}
export interface GetImportJobResponse {
  ImportJobResponse: ImportJobResponse & {
    ApplicationId: string;
    CreationDate: string;
    Definition: ImportJobResource & {
      Format: Format;
      RoleArn: string;
      S3Url: string;
    };
    Id: string;
    JobStatus: JobStatus;
    Type: string;
  };
}
export interface GetImportJobsRequest {
  ApplicationId: string;
  PageSize?: string;
  Token?: string;
}
export type ListOfImportJobResponse = ImportJobResponse[];
export interface ImportJobsResponse {
  Item?: ImportJobResponse[];
  NextToken?: string;
}
export interface GetImportJobsResponse {
  ImportJobsResponse: ImportJobsResponse & {
    Item: (ImportJobResponse & {
      ApplicationId: string;
      CreationDate: string;
      Definition: ImportJobResource & {
        Format: Format;
        RoleArn: string;
        S3Url: string;
      };
      Id: string;
      JobStatus: JobStatus;
      Type: string;
    })[];
  };
}
export interface GetInAppMessagesRequest {
  ApplicationId: string;
  EndpointId: string;
}
export interface InAppMessage {
  Content?: InAppMessageContent[];
  CustomConfig?: { [key: string]: string | undefined };
  Layout?: Layout;
}
export interface InAppCampaignSchedule {
  EndDate?: string;
  EventFilter?: CampaignEventFilter;
  QuietTime?: QuietTime;
}
export interface InAppMessageCampaign {
  CampaignId?: string;
  DailyCap?: number;
  InAppMessage?: InAppMessage;
  Priority?: number;
  Schedule?: InAppCampaignSchedule;
  SessionCap?: number;
  TotalCap?: number;
  TreatmentId?: string;
}
export type ListOfInAppMessageCampaign = InAppMessageCampaign[];
export interface InAppMessagesResponse {
  InAppMessageCampaigns?: InAppMessageCampaign[];
}
export interface GetInAppMessagesResponse {
  InAppMessagesResponse: InAppMessagesResponse & {
    InAppMessageCampaigns: (InAppMessageCampaign & {
      InAppMessage: InAppMessage & {
        Content: (InAppMessageContent & {
          BodyConfig: InAppMessageBodyConfig & {
            Alignment: Alignment;
            Body: string;
            TextColor: string;
          };
          HeaderConfig: InAppMessageHeaderConfig & {
            Alignment: Alignment;
            Header: string;
            TextColor: string;
          };
          PrimaryBtn: InAppMessageButton & {
            Android: OverrideButtonConfiguration & {
              ButtonAction: ButtonAction;
            };
            DefaultConfig: DefaultButtonConfiguration & {
              ButtonAction: ButtonAction;
              Text: string;
            };
            IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
          };
          SecondaryBtn: InAppMessageButton & {
            Android: OverrideButtonConfiguration & {
              ButtonAction: ButtonAction;
            };
            DefaultConfig: DefaultButtonConfiguration & {
              ButtonAction: ButtonAction;
              Text: string;
            };
            IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
          };
        })[];
      };
      Schedule: InAppCampaignSchedule & {
        EventFilter: CampaignEventFilter & {
          Dimensions: EventDimensions & {
            Attributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
            EventType: SetDimension & { Values: ListOf__string };
            Metrics: {
              [key: string]:
                | (MetricDimension & {
                    ComparisonOperator: string;
                    Value: number;
                  })
                | undefined;
            };
          };
          FilterType: FilterType;
        };
      };
    })[];
  };
}
export interface GetInAppTemplateRequest {
  TemplateName: string;
  Version?: string;
}
export interface InAppTemplateResponse {
  Arn?: string;
  Content?: InAppMessageContent[];
  CreationDate?: string;
  CustomConfig?: { [key: string]: string | undefined };
  LastModifiedDate?: string;
  Layout?: Layout;
  tags?: { [key: string]: string | undefined };
  TemplateDescription?: string;
  TemplateName?: string;
  TemplateType?: TemplateType;
  Version?: string;
}
export interface GetInAppTemplateResponse {
  InAppTemplateResponse: InAppTemplateResponse & {
    CreationDate: string;
    LastModifiedDate: string;
    TemplateName: string;
    TemplateType: TemplateType;
    Content: (InAppMessageContent & {
      BodyConfig: InAppMessageBodyConfig & {
        Alignment: Alignment;
        Body: string;
        TextColor: string;
      };
      HeaderConfig: InAppMessageHeaderConfig & {
        Alignment: Alignment;
        Header: string;
        TextColor: string;
      };
      PrimaryBtn: InAppMessageButton & {
        Android: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
        DefaultConfig: DefaultButtonConfiguration & {
          ButtonAction: ButtonAction;
          Text: string;
        };
        IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
        Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
      };
      SecondaryBtn: InAppMessageButton & {
        Android: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
        DefaultConfig: DefaultButtonConfiguration & {
          ButtonAction: ButtonAction;
          Text: string;
        };
        IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
        Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
      };
    })[];
  };
}
export interface GetJourneyRequest {
  ApplicationId: string;
  JourneyId: string;
}
export interface GetJourneyResponse {
  JourneyResponse: JourneyResponse & {
    ApplicationId: string;
    Id: string;
    Name: string;
    Activities: {
      [key: string]:
        | (Activity & {
            ConditionalSplit: ConditionalSplitActivity & {
              Condition: Condition & {
                Conditions: (SimpleCondition & {
                  EventCondition: EventCondition & {
                    Dimensions: EventDimensions & {
                      Attributes: {
                        [key: string]:
                          | (AttributeDimension & { Values: ListOf__string })
                          | undefined;
                      };
                      EventType: SetDimension & { Values: ListOf__string };
                      Metrics: {
                        [key: string]:
                          | (MetricDimension & {
                              ComparisonOperator: string;
                              Value: number;
                            })
                          | undefined;
                      };
                    };
                  };
                  SegmentCondition: SegmentCondition & { SegmentId: string };
                  SegmentDimensions: SegmentDimensions & {
                    Attributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                    Behavior: SegmentBehaviors & {
                      Recency: RecencyDimension & {
                        Duration: Duration;
                        RecencyType: RecencyType;
                      };
                    };
                    Demographic: SegmentDemographics & {
                      AppVersion: SetDimension & { Values: ListOf__string };
                      Channel: SetDimension & { Values: ListOf__string };
                      DeviceType: SetDimension & { Values: ListOf__string };
                      Make: SetDimension & { Values: ListOf__string };
                      Model: SetDimension & { Values: ListOf__string };
                      Platform: SetDimension & { Values: ListOf__string };
                    };
                    Location: SegmentLocation & {
                      Country: SetDimension & { Values: ListOf__string };
                      GPSPoint: GPSPointDimension & {
                        Coordinates: GPSCoordinates & {
                          Latitude: number;
                          Longitude: number;
                        };
                      };
                    };
                    Metrics: {
                      [key: string]:
                        | (MetricDimension & {
                            ComparisonOperator: string;
                            Value: number;
                          })
                        | undefined;
                    };
                    UserAttributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                  };
                })[];
              };
            };
            Holdout: HoldoutActivity & { Percentage: number };
            MultiCondition: MultiConditionalSplitActivity & {
              Branches: (MultiConditionalBranch & {
                Condition: SimpleCondition & {
                  EventCondition: EventCondition & {
                    Dimensions: EventDimensions & {
                      Attributes: {
                        [key: string]:
                          | (AttributeDimension & { Values: ListOf__string })
                          | undefined;
                      };
                      EventType: SetDimension & { Values: ListOf__string };
                      Metrics: {
                        [key: string]:
                          | (MetricDimension & {
                              ComparisonOperator: string;
                              Value: number;
                            })
                          | undefined;
                      };
                    };
                  };
                  SegmentCondition: SegmentCondition & { SegmentId: string };
                  SegmentDimensions: SegmentDimensions & {
                    Attributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                    Behavior: SegmentBehaviors & {
                      Recency: RecencyDimension & {
                        Duration: Duration;
                        RecencyType: RecencyType;
                      };
                    };
                    Demographic: SegmentDemographics & {
                      AppVersion: SetDimension & { Values: ListOf__string };
                      Channel: SetDimension & { Values: ListOf__string };
                      DeviceType: SetDimension & { Values: ListOf__string };
                      Make: SetDimension & { Values: ListOf__string };
                      Model: SetDimension & { Values: ListOf__string };
                      Platform: SetDimension & { Values: ListOf__string };
                    };
                    Location: SegmentLocation & {
                      Country: SetDimension & { Values: ListOf__string };
                      GPSPoint: GPSPointDimension & {
                        Coordinates: GPSCoordinates & {
                          Latitude: number;
                          Longitude: number;
                        };
                      };
                    };
                    Metrics: {
                      [key: string]:
                        | (MetricDimension & {
                            ComparisonOperator: string;
                            Value: number;
                          })
                        | undefined;
                    };
                    UserAttributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                  };
                };
              })[];
            };
          })
        | undefined;
    };
    StartCondition: StartCondition & {
      EventStartCondition: EventStartCondition & {
        EventFilter: EventFilter & {
          Dimensions: EventDimensions & {
            Attributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
            EventType: SetDimension & { Values: ListOf__string };
            Metrics: {
              [key: string]:
                | (MetricDimension & {
                    ComparisonOperator: string;
                    Value: number;
                  })
                | undefined;
            };
          };
          FilterType: FilterType;
        };
      };
      SegmentStartCondition: SegmentCondition & { SegmentId: string };
    };
  };
}
export interface GetJourneyDateRangeKpiRequest {
  ApplicationId: string;
  EndTime?: Date;
  JourneyId: string;
  KpiName: string;
  NextToken?: string;
  PageSize?: string;
  StartTime?: Date;
}
export interface JourneyDateRangeKpiResponse {
  ApplicationId?: string;
  EndTime?: Date;
  JourneyId?: string;
  KpiName?: string;
  KpiResult?: BaseKpiResult;
  NextToken?: string;
  StartTime?: Date;
}
export interface GetJourneyDateRangeKpiResponse {
  JourneyDateRangeKpiResponse: JourneyDateRangeKpiResponse & {
    ApplicationId: string;
    EndTime: __timestampIso8601;
    JourneyId: string;
    KpiName: string;
    KpiResult: BaseKpiResult & {
      Rows: (ResultRow & {
        GroupedBys: (ResultRowValue & {
          Key: string;
          Type: string;
          Value: string;
        })[];
        Values: (ResultRowValue & {
          Key: string;
          Type: string;
          Value: string;
        })[];
      })[];
    };
    StartTime: __timestampIso8601;
  };
}
export interface GetJourneyExecutionActivityMetricsRequest {
  ApplicationId: string;
  JourneyActivityId: string;
  JourneyId: string;
  NextToken?: string;
  PageSize?: string;
}
export interface JourneyExecutionActivityMetricsResponse {
  ActivityType?: string;
  ApplicationId?: string;
  JourneyActivityId?: string;
  JourneyId?: string;
  LastEvaluatedTime?: string;
  Metrics?: { [key: string]: string | undefined };
}
export interface GetJourneyExecutionActivityMetricsResponse {
  JourneyExecutionActivityMetricsResponse: JourneyExecutionActivityMetricsResponse & {
    ActivityType: string;
    ApplicationId: string;
    JourneyActivityId: string;
    JourneyId: string;
    LastEvaluatedTime: string;
    Metrics: MapOf__string;
  };
}
export interface GetJourneyExecutionMetricsRequest {
  ApplicationId: string;
  JourneyId: string;
  NextToken?: string;
  PageSize?: string;
}
export interface JourneyExecutionMetricsResponse {
  ApplicationId?: string;
  JourneyId?: string;
  LastEvaluatedTime?: string;
  Metrics?: { [key: string]: string | undefined };
}
export interface GetJourneyExecutionMetricsResponse {
  JourneyExecutionMetricsResponse: JourneyExecutionMetricsResponse & {
    ApplicationId: string;
    JourneyId: string;
    LastEvaluatedTime: string;
    Metrics: MapOf__string;
  };
}
export interface GetJourneyRunExecutionActivityMetricsRequest {
  ApplicationId: string;
  JourneyActivityId: string;
  JourneyId: string;
  NextToken?: string;
  PageSize?: string;
  RunId: string;
}
export interface JourneyRunExecutionActivityMetricsResponse {
  ActivityType?: string;
  ApplicationId?: string;
  JourneyActivityId?: string;
  JourneyId?: string;
  LastEvaluatedTime?: string;
  Metrics?: { [key: string]: string | undefined };
  RunId?: string;
}
export interface GetJourneyRunExecutionActivityMetricsResponse {
  JourneyRunExecutionActivityMetricsResponse: JourneyRunExecutionActivityMetricsResponse & {
    ActivityType: string;
    ApplicationId: string;
    JourneyActivityId: string;
    JourneyId: string;
    LastEvaluatedTime: string;
    Metrics: MapOf__string;
    RunId: string;
  };
}
export interface GetJourneyRunExecutionMetricsRequest {
  ApplicationId: string;
  JourneyId: string;
  NextToken?: string;
  PageSize?: string;
  RunId: string;
}
export interface JourneyRunExecutionMetricsResponse {
  ApplicationId?: string;
  JourneyId?: string;
  LastEvaluatedTime?: string;
  Metrics?: { [key: string]: string | undefined };
  RunId?: string;
}
export interface GetJourneyRunExecutionMetricsResponse {
  JourneyRunExecutionMetricsResponse: JourneyRunExecutionMetricsResponse & {
    ApplicationId: string;
    JourneyId: string;
    LastEvaluatedTime: string;
    Metrics: MapOf__string;
    RunId: string;
  };
}
export interface GetJourneyRunsRequest {
  ApplicationId: string;
  JourneyId: string;
  PageSize?: string;
  Token?: string;
}
export type JourneyRunStatus =
  | "SCHEDULED"
  | "RUNNING"
  | "COMPLETED"
  | "CANCELLED"
  | (string & {});
export interface JourneyRunResponse {
  CreationTime?: string;
  LastUpdateTime?: string;
  RunId?: string;
  Status?: JourneyRunStatus;
}
export type ListOfJourneyRunResponse = JourneyRunResponse[];
export interface JourneyRunsResponse {
  Item?: JourneyRunResponse[];
  NextToken?: string;
}
export interface GetJourneyRunsResponse {
  JourneyRunsResponse: JourneyRunsResponse & {
    Item: (JourneyRunResponse & {
      CreationTime: string;
      LastUpdateTime: string;
      RunId: string;
      Status: JourneyRunStatus;
    })[];
  };
}
export interface GetPushTemplateRequest {
  TemplateName: string;
  Version?: string;
}
export interface PushNotificationTemplateResponse {
  ADM?: AndroidPushNotificationTemplate;
  APNS?: APNSPushNotificationTemplate;
  Arn?: string;
  Baidu?: AndroidPushNotificationTemplate;
  CreationDate?: string;
  Default?: DefaultPushNotificationTemplate;
  DefaultSubstitutions?: string;
  GCM?: AndroidPushNotificationTemplate;
  LastModifiedDate?: string;
  RecommenderId?: string;
  tags?: { [key: string]: string | undefined };
  TemplateDescription?: string;
  TemplateName?: string;
  TemplateType?: TemplateType;
  Version?: string;
}
export interface GetPushTemplateResponse {
  PushNotificationTemplateResponse: PushNotificationTemplateResponse & {
    CreationDate: string;
    LastModifiedDate: string;
    TemplateName: string;
    TemplateType: TemplateType;
  };
}
export interface GetRecommenderConfigurationRequest {
  RecommenderId: string;
}
export interface GetRecommenderConfigurationResponse {
  RecommenderConfigurationResponse: RecommenderConfigurationResponse & {
    CreationDate: string;
    Id: string;
    LastModifiedDate: string;
    RecommendationProviderRoleArn: string;
    RecommendationProviderUri: string;
  };
}
export interface GetRecommenderConfigurationsRequest {
  PageSize?: string;
  Token?: string;
}
export type ListOfRecommenderConfigurationResponse =
  RecommenderConfigurationResponse[];
export interface ListRecommenderConfigurationsResponse {
  Item?: RecommenderConfigurationResponse[];
  NextToken?: string;
}
export interface GetRecommenderConfigurationsResponse {
  ListRecommenderConfigurationsResponse: ListRecommenderConfigurationsResponse & {
    Item: (RecommenderConfigurationResponse & {
      CreationDate: string;
      Id: string;
      LastModifiedDate: string;
      RecommendationProviderRoleArn: string;
      RecommendationProviderUri: string;
    })[];
  };
}
export interface GetSegmentRequest {
  ApplicationId: string;
  SegmentId: string;
}
export interface GetSegmentResponse {
  SegmentResponse: SegmentResponse & {
    ApplicationId: string;
    Arn: string;
    CreationDate: string;
    Id: string;
    SegmentType: SegmentType;
    Dimensions: SegmentDimensions & {
      Attributes: {
        [key: string]:
          | (AttributeDimension & { Values: ListOf__string })
          | undefined;
      };
      Behavior: SegmentBehaviors & {
        Recency: RecencyDimension & {
          Duration: Duration;
          RecencyType: RecencyType;
        };
      };
      Demographic: SegmentDemographics & {
        AppVersion: SetDimension & { Values: ListOf__string };
        Channel: SetDimension & { Values: ListOf__string };
        DeviceType: SetDimension & { Values: ListOf__string };
        Make: SetDimension & { Values: ListOf__string };
        Model: SetDimension & { Values: ListOf__string };
        Platform: SetDimension & { Values: ListOf__string };
      };
      Location: SegmentLocation & {
        Country: SetDimension & { Values: ListOf__string };
        GPSPoint: GPSPointDimension & {
          Coordinates: GPSCoordinates & { Latitude: number; Longitude: number };
        };
      };
      Metrics: {
        [key: string]:
          | (MetricDimension & { ComparisonOperator: string; Value: number })
          | undefined;
      };
      UserAttributes: {
        [key: string]:
          | (AttributeDimension & { Values: ListOf__string })
          | undefined;
      };
    };
    ImportDefinition: SegmentImportResource & {
      ExternalId: string;
      Format: Format;
      RoleArn: string;
      S3Url: string;
      Size: number;
    };
    SegmentGroups: SegmentGroupList & {
      Groups: (SegmentGroup & {
        Dimensions: (SegmentDimensions & {
          Attributes: {
            [key: string]:
              | (AttributeDimension & { Values: ListOf__string })
              | undefined;
          };
          Behavior: SegmentBehaviors & {
            Recency: RecencyDimension & {
              Duration: Duration;
              RecencyType: RecencyType;
            };
          };
          Demographic: SegmentDemographics & {
            AppVersion: SetDimension & { Values: ListOf__string };
            Channel: SetDimension & { Values: ListOf__string };
            DeviceType: SetDimension & { Values: ListOf__string };
            Make: SetDimension & { Values: ListOf__string };
            Model: SetDimension & { Values: ListOf__string };
            Platform: SetDimension & { Values: ListOf__string };
          };
          Location: SegmentLocation & {
            Country: SetDimension & { Values: ListOf__string };
            GPSPoint: GPSPointDimension & {
              Coordinates: GPSCoordinates & {
                Latitude: number;
                Longitude: number;
              };
            };
          };
          Metrics: {
            [key: string]:
              | (MetricDimension & {
                  ComparisonOperator: string;
                  Value: number;
                })
              | undefined;
          };
          UserAttributes: {
            [key: string]:
              | (AttributeDimension & { Values: ListOf__string })
              | undefined;
          };
        })[];
        SourceSegments: (SegmentReference & { Id: string })[];
      })[];
    };
  };
}
export interface GetSegmentExportJobsRequest {
  ApplicationId: string;
  PageSize?: string;
  SegmentId: string;
  Token?: string;
}
export interface GetSegmentExportJobsResponse {
  ExportJobsResponse: ExportJobsResponse & {
    Item: (ExportJobResponse & {
      ApplicationId: string;
      CreationDate: string;
      Definition: ExportJobResource & { RoleArn: string; S3UrlPrefix: string };
      Id: string;
      JobStatus: JobStatus;
      Type: string;
    })[];
  };
}
export interface GetSegmentImportJobsRequest {
  ApplicationId: string;
  PageSize?: string;
  SegmentId: string;
  Token?: string;
}
export interface GetSegmentImportJobsResponse {
  ImportJobsResponse: ImportJobsResponse & {
    Item: (ImportJobResponse & {
      ApplicationId: string;
      CreationDate: string;
      Definition: ImportJobResource & {
        Format: Format;
        RoleArn: string;
        S3Url: string;
      };
      Id: string;
      JobStatus: JobStatus;
      Type: string;
    })[];
  };
}
export interface GetSegmentsRequest {
  ApplicationId: string;
  PageSize?: string;
  Token?: string;
}
export type ListOfSegmentResponse = SegmentResponse[];
export interface SegmentsResponse {
  Item?: SegmentResponse[];
  NextToken?: string;
}
export interface GetSegmentsResponse {
  SegmentsResponse: SegmentsResponse & {
    Item: (SegmentResponse & {
      ApplicationId: string;
      Arn: string;
      CreationDate: string;
      Id: string;
      SegmentType: SegmentType;
      Dimensions: SegmentDimensions & {
        Attributes: {
          [key: string]:
            | (AttributeDimension & { Values: ListOf__string })
            | undefined;
        };
        Behavior: SegmentBehaviors & {
          Recency: RecencyDimension & {
            Duration: Duration;
            RecencyType: RecencyType;
          };
        };
        Demographic: SegmentDemographics & {
          AppVersion: SetDimension & { Values: ListOf__string };
          Channel: SetDimension & { Values: ListOf__string };
          DeviceType: SetDimension & { Values: ListOf__string };
          Make: SetDimension & { Values: ListOf__string };
          Model: SetDimension & { Values: ListOf__string };
          Platform: SetDimension & { Values: ListOf__string };
        };
        Location: SegmentLocation & {
          Country: SetDimension & { Values: ListOf__string };
          GPSPoint: GPSPointDimension & {
            Coordinates: GPSCoordinates & {
              Latitude: number;
              Longitude: number;
            };
          };
        };
        Metrics: {
          [key: string]:
            | (MetricDimension & { ComparisonOperator: string; Value: number })
            | undefined;
        };
        UserAttributes: {
          [key: string]:
            | (AttributeDimension & { Values: ListOf__string })
            | undefined;
        };
      };
      ImportDefinition: SegmentImportResource & {
        ExternalId: string;
        Format: Format;
        RoleArn: string;
        S3Url: string;
        Size: number;
      };
      SegmentGroups: SegmentGroupList & {
        Groups: (SegmentGroup & {
          Dimensions: (SegmentDimensions & {
            Attributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
            Behavior: SegmentBehaviors & {
              Recency: RecencyDimension & {
                Duration: Duration;
                RecencyType: RecencyType;
              };
            };
            Demographic: SegmentDemographics & {
              AppVersion: SetDimension & { Values: ListOf__string };
              Channel: SetDimension & { Values: ListOf__string };
              DeviceType: SetDimension & { Values: ListOf__string };
              Make: SetDimension & { Values: ListOf__string };
              Model: SetDimension & { Values: ListOf__string };
              Platform: SetDimension & { Values: ListOf__string };
            };
            Location: SegmentLocation & {
              Country: SetDimension & { Values: ListOf__string };
              GPSPoint: GPSPointDimension & {
                Coordinates: GPSCoordinates & {
                  Latitude: number;
                  Longitude: number;
                };
              };
            };
            Metrics: {
              [key: string]:
                | (MetricDimension & {
                    ComparisonOperator: string;
                    Value: number;
                  })
                | undefined;
            };
            UserAttributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
          })[];
          SourceSegments: (SegmentReference & { Id: string })[];
        })[];
      };
    })[];
  };
}
export interface GetSegmentVersionRequest {
  ApplicationId: string;
  SegmentId: string;
  Version: string;
}
export interface GetSegmentVersionResponse {
  SegmentResponse: SegmentResponse & {
    ApplicationId: string;
    Arn: string;
    CreationDate: string;
    Id: string;
    SegmentType: SegmentType;
    Dimensions: SegmentDimensions & {
      Attributes: {
        [key: string]:
          | (AttributeDimension & { Values: ListOf__string })
          | undefined;
      };
      Behavior: SegmentBehaviors & {
        Recency: RecencyDimension & {
          Duration: Duration;
          RecencyType: RecencyType;
        };
      };
      Demographic: SegmentDemographics & {
        AppVersion: SetDimension & { Values: ListOf__string };
        Channel: SetDimension & { Values: ListOf__string };
        DeviceType: SetDimension & { Values: ListOf__string };
        Make: SetDimension & { Values: ListOf__string };
        Model: SetDimension & { Values: ListOf__string };
        Platform: SetDimension & { Values: ListOf__string };
      };
      Location: SegmentLocation & {
        Country: SetDimension & { Values: ListOf__string };
        GPSPoint: GPSPointDimension & {
          Coordinates: GPSCoordinates & { Latitude: number; Longitude: number };
        };
      };
      Metrics: {
        [key: string]:
          | (MetricDimension & { ComparisonOperator: string; Value: number })
          | undefined;
      };
      UserAttributes: {
        [key: string]:
          | (AttributeDimension & { Values: ListOf__string })
          | undefined;
      };
    };
    ImportDefinition: SegmentImportResource & {
      ExternalId: string;
      Format: Format;
      RoleArn: string;
      S3Url: string;
      Size: number;
    };
    SegmentGroups: SegmentGroupList & {
      Groups: (SegmentGroup & {
        Dimensions: (SegmentDimensions & {
          Attributes: {
            [key: string]:
              | (AttributeDimension & { Values: ListOf__string })
              | undefined;
          };
          Behavior: SegmentBehaviors & {
            Recency: RecencyDimension & {
              Duration: Duration;
              RecencyType: RecencyType;
            };
          };
          Demographic: SegmentDemographics & {
            AppVersion: SetDimension & { Values: ListOf__string };
            Channel: SetDimension & { Values: ListOf__string };
            DeviceType: SetDimension & { Values: ListOf__string };
            Make: SetDimension & { Values: ListOf__string };
            Model: SetDimension & { Values: ListOf__string };
            Platform: SetDimension & { Values: ListOf__string };
          };
          Location: SegmentLocation & {
            Country: SetDimension & { Values: ListOf__string };
            GPSPoint: GPSPointDimension & {
              Coordinates: GPSCoordinates & {
                Latitude: number;
                Longitude: number;
              };
            };
          };
          Metrics: {
            [key: string]:
              | (MetricDimension & {
                  ComparisonOperator: string;
                  Value: number;
                })
              | undefined;
          };
          UserAttributes: {
            [key: string]:
              | (AttributeDimension & { Values: ListOf__string })
              | undefined;
          };
        })[];
        SourceSegments: (SegmentReference & { Id: string })[];
      })[];
    };
  };
}
export interface GetSegmentVersionsRequest {
  ApplicationId: string;
  PageSize?: string;
  SegmentId: string;
  Token?: string;
}
export interface GetSegmentVersionsResponse {
  SegmentsResponse: SegmentsResponse & {
    Item: (SegmentResponse & {
      ApplicationId: string;
      Arn: string;
      CreationDate: string;
      Id: string;
      SegmentType: SegmentType;
      Dimensions: SegmentDimensions & {
        Attributes: {
          [key: string]:
            | (AttributeDimension & { Values: ListOf__string })
            | undefined;
        };
        Behavior: SegmentBehaviors & {
          Recency: RecencyDimension & {
            Duration: Duration;
            RecencyType: RecencyType;
          };
        };
        Demographic: SegmentDemographics & {
          AppVersion: SetDimension & { Values: ListOf__string };
          Channel: SetDimension & { Values: ListOf__string };
          DeviceType: SetDimension & { Values: ListOf__string };
          Make: SetDimension & { Values: ListOf__string };
          Model: SetDimension & { Values: ListOf__string };
          Platform: SetDimension & { Values: ListOf__string };
        };
        Location: SegmentLocation & {
          Country: SetDimension & { Values: ListOf__string };
          GPSPoint: GPSPointDimension & {
            Coordinates: GPSCoordinates & {
              Latitude: number;
              Longitude: number;
            };
          };
        };
        Metrics: {
          [key: string]:
            | (MetricDimension & { ComparisonOperator: string; Value: number })
            | undefined;
        };
        UserAttributes: {
          [key: string]:
            | (AttributeDimension & { Values: ListOf__string })
            | undefined;
        };
      };
      ImportDefinition: SegmentImportResource & {
        ExternalId: string;
        Format: Format;
        RoleArn: string;
        S3Url: string;
        Size: number;
      };
      SegmentGroups: SegmentGroupList & {
        Groups: (SegmentGroup & {
          Dimensions: (SegmentDimensions & {
            Attributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
            Behavior: SegmentBehaviors & {
              Recency: RecencyDimension & {
                Duration: Duration;
                RecencyType: RecencyType;
              };
            };
            Demographic: SegmentDemographics & {
              AppVersion: SetDimension & { Values: ListOf__string };
              Channel: SetDimension & { Values: ListOf__string };
              DeviceType: SetDimension & { Values: ListOf__string };
              Make: SetDimension & { Values: ListOf__string };
              Model: SetDimension & { Values: ListOf__string };
              Platform: SetDimension & { Values: ListOf__string };
            };
            Location: SegmentLocation & {
              Country: SetDimension & { Values: ListOf__string };
              GPSPoint: GPSPointDimension & {
                Coordinates: GPSCoordinates & {
                  Latitude: number;
                  Longitude: number;
                };
              };
            };
            Metrics: {
              [key: string]:
                | (MetricDimension & {
                    ComparisonOperator: string;
                    Value: number;
                  })
                | undefined;
            };
            UserAttributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
          })[];
          SourceSegments: (SegmentReference & { Id: string })[];
        })[];
      };
    })[];
  };
}
export interface GetSmsChannelRequest {
  ApplicationId: string;
}
export interface GetSmsChannelResponse {
  SMSChannelResponse: SMSChannelResponse & { Platform: string };
}
export interface GetSmsTemplateRequest {
  TemplateName: string;
  Version?: string;
}
export interface SMSTemplateResponse {
  Arn?: string;
  Body?: string;
  CreationDate?: string;
  DefaultSubstitutions?: string;
  LastModifiedDate?: string;
  RecommenderId?: string;
  tags?: { [key: string]: string | undefined };
  TemplateDescription?: string;
  TemplateName?: string;
  TemplateType?: TemplateType;
  Version?: string;
}
export interface GetSmsTemplateResponse {
  SMSTemplateResponse: SMSTemplateResponse & {
    CreationDate: string;
    LastModifiedDate: string;
    TemplateName: string;
    TemplateType: TemplateType;
  };
}
export interface GetUserEndpointsRequest {
  ApplicationId: string;
  UserId: string;
}
export interface GetUserEndpointsResponse {
  EndpointsResponse: EndpointsResponse & { Item: ListOfEndpointResponse };
}
export interface GetVoiceChannelRequest {
  ApplicationId: string;
}
export interface GetVoiceChannelResponse {
  VoiceChannelResponse: VoiceChannelResponse & { Platform: string };
}
export interface GetVoiceTemplateRequest {
  TemplateName: string;
  Version?: string;
}
export interface VoiceTemplateResponse {
  Arn?: string;
  Body?: string;
  CreationDate?: string;
  DefaultSubstitutions?: string;
  LanguageCode?: string;
  LastModifiedDate?: string;
  tags?: { [key: string]: string | undefined };
  TemplateDescription?: string;
  TemplateName?: string;
  TemplateType?: TemplateType;
  Version?: string;
  VoiceId?: string;
}
export interface GetVoiceTemplateResponse {
  VoiceTemplateResponse: VoiceTemplateResponse & {
    CreationDate: string;
    LastModifiedDate: string;
    TemplateName: string;
    TemplateType: TemplateType;
  };
}
export interface ListJourneysRequest {
  ApplicationId: string;
  PageSize?: string;
  Token?: string;
}
export type ListOfJourneyResponse = JourneyResponse[];
export interface JourneysResponse {
  Item?: JourneyResponse[];
  NextToken?: string;
}
export interface ListJourneysResponse {
  JourneysResponse: JourneysResponse & {
    Item: (JourneyResponse & {
      ApplicationId: string;
      Id: string;
      Name: string;
      Activities: {
        [key: string]:
          | (Activity & {
              ConditionalSplit: ConditionalSplitActivity & {
                Condition: Condition & {
                  Conditions: (SimpleCondition & {
                    EventCondition: EventCondition & {
                      Dimensions: EventDimensions & {
                        Attributes: {
                          [key: string]:
                            | (AttributeDimension & { Values: ListOf__string })
                            | undefined;
                        };
                        EventType: SetDimension & { Values: ListOf__string };
                        Metrics: {
                          [key: string]:
                            | (MetricDimension & {
                                ComparisonOperator: string;
                                Value: number;
                              })
                            | undefined;
                        };
                      };
                    };
                    SegmentCondition: SegmentCondition & { SegmentId: string };
                    SegmentDimensions: SegmentDimensions & {
                      Attributes: {
                        [key: string]:
                          | (AttributeDimension & { Values: ListOf__string })
                          | undefined;
                      };
                      Behavior: SegmentBehaviors & {
                        Recency: RecencyDimension & {
                          Duration: Duration;
                          RecencyType: RecencyType;
                        };
                      };
                      Demographic: SegmentDemographics & {
                        AppVersion: SetDimension & { Values: ListOf__string };
                        Channel: SetDimension & { Values: ListOf__string };
                        DeviceType: SetDimension & { Values: ListOf__string };
                        Make: SetDimension & { Values: ListOf__string };
                        Model: SetDimension & { Values: ListOf__string };
                        Platform: SetDimension & { Values: ListOf__string };
                      };
                      Location: SegmentLocation & {
                        Country: SetDimension & { Values: ListOf__string };
                        GPSPoint: GPSPointDimension & {
                          Coordinates: GPSCoordinates & {
                            Latitude: number;
                            Longitude: number;
                          };
                        };
                      };
                      Metrics: {
                        [key: string]:
                          | (MetricDimension & {
                              ComparisonOperator: string;
                              Value: number;
                            })
                          | undefined;
                      };
                      UserAttributes: {
                        [key: string]:
                          | (AttributeDimension & { Values: ListOf__string })
                          | undefined;
                      };
                    };
                  })[];
                };
              };
              Holdout: HoldoutActivity & { Percentage: number };
              MultiCondition: MultiConditionalSplitActivity & {
                Branches: (MultiConditionalBranch & {
                  Condition: SimpleCondition & {
                    EventCondition: EventCondition & {
                      Dimensions: EventDimensions & {
                        Attributes: {
                          [key: string]:
                            | (AttributeDimension & { Values: ListOf__string })
                            | undefined;
                        };
                        EventType: SetDimension & { Values: ListOf__string };
                        Metrics: {
                          [key: string]:
                            | (MetricDimension & {
                                ComparisonOperator: string;
                                Value: number;
                              })
                            | undefined;
                        };
                      };
                    };
                    SegmentCondition: SegmentCondition & { SegmentId: string };
                    SegmentDimensions: SegmentDimensions & {
                      Attributes: {
                        [key: string]:
                          | (AttributeDimension & { Values: ListOf__string })
                          | undefined;
                      };
                      Behavior: SegmentBehaviors & {
                        Recency: RecencyDimension & {
                          Duration: Duration;
                          RecencyType: RecencyType;
                        };
                      };
                      Demographic: SegmentDemographics & {
                        AppVersion: SetDimension & { Values: ListOf__string };
                        Channel: SetDimension & { Values: ListOf__string };
                        DeviceType: SetDimension & { Values: ListOf__string };
                        Make: SetDimension & { Values: ListOf__string };
                        Model: SetDimension & { Values: ListOf__string };
                        Platform: SetDimension & { Values: ListOf__string };
                      };
                      Location: SegmentLocation & {
                        Country: SetDimension & { Values: ListOf__string };
                        GPSPoint: GPSPointDimension & {
                          Coordinates: GPSCoordinates & {
                            Latitude: number;
                            Longitude: number;
                          };
                        };
                      };
                      Metrics: {
                        [key: string]:
                          | (MetricDimension & {
                              ComparisonOperator: string;
                              Value: number;
                            })
                          | undefined;
                      };
                      UserAttributes: {
                        [key: string]:
                          | (AttributeDimension & { Values: ListOf__string })
                          | undefined;
                      };
                    };
                  };
                })[];
              };
            })
          | undefined;
      };
      StartCondition: StartCondition & {
        EventStartCondition: EventStartCondition & {
          EventFilter: EventFilter & {
            Dimensions: EventDimensions & {
              Attributes: {
                [key: string]:
                  | (AttributeDimension & { Values: ListOf__string })
                  | undefined;
              };
              EventType: SetDimension & { Values: ListOf__string };
              Metrics: {
                [key: string]:
                  | (MetricDimension & {
                      ComparisonOperator: string;
                      Value: number;
                    })
                  | undefined;
              };
            };
            FilterType: FilterType;
          };
        };
        SegmentStartCondition: SegmentCondition & { SegmentId: string };
      };
    })[];
  };
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface TagsModel {
  tags?: { [key: string]: string | undefined };
}
export interface ListTagsForResourceResponse {
  TagsModel: TagsModel & { tags: MapOf__string };
}
export interface ListTemplatesRequest {
  NextToken?: string;
  PageSize?: string;
  Prefix?: string;
  TemplateType?: string;
}
export interface TemplateResponse {
  Arn?: string;
  CreationDate?: string;
  DefaultSubstitutions?: string;
  LastModifiedDate?: string;
  tags?: { [key: string]: string | undefined };
  TemplateDescription?: string;
  TemplateName?: string;
  TemplateType?: TemplateType;
  Version?: string;
}
export type ListOfTemplateResponse = TemplateResponse[];
export interface TemplatesResponse {
  Item?: TemplateResponse[];
  NextToken?: string;
}
export interface ListTemplatesResponse {
  TemplatesResponse: TemplatesResponse & {
    Item: (TemplateResponse & {
      CreationDate: string;
      LastModifiedDate: string;
      TemplateName: string;
      TemplateType: TemplateType;
    })[];
  };
}
export interface ListTemplateVersionsRequest {
  NextToken?: string;
  PageSize?: string;
  TemplateName: string;
  TemplateType: string;
}
export interface TemplateVersionResponse {
  CreationDate?: string;
  DefaultSubstitutions?: string;
  LastModifiedDate?: string;
  TemplateDescription?: string;
  TemplateName?: string;
  TemplateType?: string;
  Version?: string;
}
export type ListOfTemplateVersionResponse = TemplateVersionResponse[];
export interface TemplateVersionsResponse {
  Item?: TemplateVersionResponse[];
  Message?: string;
  NextToken?: string;
  RequestID?: string;
}
export interface ListTemplateVersionsResponse {
  TemplateVersionsResponse: TemplateVersionsResponse & {
    Item: (TemplateVersionResponse & {
      CreationDate: string;
      LastModifiedDate: string;
      TemplateName: string;
      TemplateType: string;
    })[];
  };
}
export interface NumberValidateRequest {
  IsoCountryCode?: string;
  PhoneNumber?: string;
}
export interface PhoneNumberValidateRequest {
  NumberValidateRequest?: NumberValidateRequest;
}
export interface NumberValidateResponse {
  Carrier?: string;
  City?: string;
  CleansedPhoneNumberE164?: string;
  CleansedPhoneNumberNational?: string;
  Country?: string;
  CountryCodeIso2?: string;
  CountryCodeNumeric?: string;
  County?: string;
  OriginalCountryCodeIso2?: string;
  OriginalPhoneNumber?: string;
  PhoneType?: string;
  PhoneTypeCode?: number;
  Timezone?: string;
  ZipCode?: string;
}
export interface PhoneNumberValidateResponse {
  NumberValidateResponse: NumberValidateResponse;
}
export interface PublicEndpoint {
  Address?: string;
  Attributes?: { [key: string]: string[] | undefined };
  ChannelType?: ChannelType;
  Demographic?: EndpointDemographic;
  EffectiveDate?: string;
  EndpointStatus?: string;
  Location?: EndpointLocation;
  Metrics?: { [key: string]: number | undefined };
  OptOut?: string;
  RequestId?: string;
  User?: EndpointUser;
}
export interface Session {
  Duration?: number;
  Id?: string;
  StartTimestamp?: string;
  StopTimestamp?: string;
}
export interface Event {
  AppPackageName?: string;
  AppTitle?: string;
  AppVersionCode?: string;
  Attributes?: { [key: string]: string | undefined };
  ClientSdkVersion?: string;
  EventType?: string;
  Metrics?: { [key: string]: number | undefined };
  SdkName?: string;
  Session?: Session;
  Timestamp?: string;
}
export type MapOfEvent = { [key: string]: Event | undefined };
export interface EventsBatch {
  Endpoint?: PublicEndpoint;
  Events?: { [key: string]: Event | undefined };
}
export type MapOfEventsBatch = { [key: string]: EventsBatch | undefined };
export interface EventsRequest {
  BatchItem?: { [key: string]: EventsBatch | undefined };
}
export interface PutEventsRequest {
  ApplicationId: string;
  EventsRequest?: EventsRequest;
}
export interface EndpointItemResponse {
  Message?: string;
  StatusCode?: number;
}
export interface EventItemResponse {
  Message?: string;
  StatusCode?: number;
}
export type MapOfEventItemResponse = {
  [key: string]: EventItemResponse | undefined;
};
export interface ItemResponse {
  EndpointItemResponse?: EndpointItemResponse;
  EventsItemResponse?: { [key: string]: EventItemResponse | undefined };
}
export type MapOfItemResponse = { [key: string]: ItemResponse | undefined };
export interface EventsResponse {
  Results?: { [key: string]: ItemResponse | undefined };
}
export interface PutEventsResponse {
  EventsResponse: EventsResponse;
}
export interface WriteEventStream {
  DestinationStreamArn?: string;
  RoleArn?: string;
}
export interface PutEventStreamRequest {
  ApplicationId: string;
  WriteEventStream?: WriteEventStream;
}
export interface PutEventStreamResponse {
  EventStream: EventStream & {
    ApplicationId: string;
    DestinationStreamArn: string;
    RoleArn: string;
  };
}
export interface UpdateAttributesRequest {
  Blacklist?: string[];
}
export interface RemoveAttributesRequest {
  ApplicationId: string;
  AttributeType: string;
  UpdateAttributesRequest?: UpdateAttributesRequest;
}
export interface AttributesResource {
  ApplicationId?: string;
  AttributeType?: string;
  Attributes?: string[];
}
export interface RemoveAttributesResponse {
  AttributesResource: AttributesResource & {
    ApplicationId: string;
    AttributeType: string;
  };
}
export interface AddressConfiguration {
  BodyOverride?: string;
  ChannelType?: ChannelType;
  Context?: { [key: string]: string | undefined };
  RawContent?: string;
  Substitutions?: { [key: string]: string[] | undefined };
  TitleOverride?: string;
}
export type MapOfAddressConfiguration = {
  [key: string]: AddressConfiguration | undefined;
};
export interface EndpointSendConfiguration {
  BodyOverride?: string;
  Context?: { [key: string]: string | undefined };
  RawContent?: string;
  Substitutions?: { [key: string]: string[] | undefined };
  TitleOverride?: string;
}
export type MapOfEndpointSendConfiguration = {
  [key: string]: EndpointSendConfiguration | undefined;
};
export interface ADMMessage {
  Action?: Action;
  Body?: string;
  ConsolidationKey?: string;
  Data?: { [key: string]: string | undefined };
  ExpiresAfter?: string;
  IconReference?: string;
  ImageIconUrl?: string;
  ImageUrl?: string;
  MD5?: string;
  RawContent?: string;
  SilentPush?: boolean;
  SmallImageIconUrl?: string;
  Sound?: string;
  Substitutions?: { [key: string]: string[] | undefined };
  Title?: string;
  Url?: string;
}
export interface APNSMessage {
  APNSPushType?: string;
  Action?: Action;
  Badge?: number;
  Body?: string;
  Category?: string;
  CollapseId?: string;
  Data?: { [key: string]: string | undefined };
  MediaUrl?: string;
  PreferredAuthenticationMethod?: string;
  Priority?: string;
  RawContent?: string;
  SilentPush?: boolean;
  Sound?: string;
  Substitutions?: { [key: string]: string[] | undefined };
  ThreadId?: string;
  TimeToLive?: number;
  Title?: string;
  Url?: string;
}
export interface BaiduMessage {
  Action?: Action;
  Body?: string;
  Data?: { [key: string]: string | undefined };
  IconReference?: string;
  ImageIconUrl?: string;
  ImageUrl?: string;
  RawContent?: string;
  SilentPush?: boolean;
  SmallImageIconUrl?: string;
  Sound?: string;
  Substitutions?: { [key: string]: string[] | undefined };
  TimeToLive?: number;
  Title?: string;
  Url?: string;
}
export interface DefaultMessage {
  Body?: string;
  Substitutions?: { [key: string]: string[] | undefined };
}
export interface DefaultPushNotificationMessage {
  Action?: Action;
  Body?: string;
  Data?: { [key: string]: string | undefined };
  SilentPush?: boolean;
  Substitutions?: { [key: string]: string[] | undefined };
  Title?: string;
  Url?: string;
}
export type __blob = Uint8Array;
export interface RawEmail {
  Data?: Uint8Array;
}
export interface SimpleEmailPart {
  Charset?: string;
  Data?: string;
}
export interface SimpleEmail {
  HtmlPart?: SimpleEmailPart;
  Subject?: SimpleEmailPart;
  TextPart?: SimpleEmailPart;
  Headers?: MessageHeader[];
}
export interface EmailMessage {
  Body?: string;
  FeedbackForwardingAddress?: string;
  FromAddress?: string;
  RawEmail?: RawEmail;
  ReplyToAddresses?: string[];
  SimpleEmail?: SimpleEmail;
  Substitutions?: { [key: string]: string[] | undefined };
}
export interface GCMMessage {
  Action?: Action;
  Body?: string;
  CollapseKey?: string;
  Data?: { [key: string]: string | undefined };
  IconReference?: string;
  ImageIconUrl?: string;
  ImageUrl?: string;
  PreferredAuthenticationMethod?: string;
  Priority?: string;
  RawContent?: string;
  RestrictedPackageName?: string;
  SilentPush?: boolean;
  SmallImageIconUrl?: string;
  Sound?: string;
  Substitutions?: { [key: string]: string[] | undefined };
  TimeToLive?: number;
  Title?: string;
  Url?: string;
}
export interface SMSMessage {
  Body?: string;
  Keyword?: string;
  MediaUrl?: string;
  MessageType?: MessageType;
  OriginationNumber?: string;
  SenderId?: string;
  Substitutions?: { [key: string]: string[] | undefined };
  EntityId?: string;
  TemplateId?: string;
}
export interface VoiceMessage {
  Body?: string;
  LanguageCode?: string;
  OriginationNumber?: string;
  Substitutions?: { [key: string]: string[] | undefined };
  VoiceId?: string;
}
export interface DirectMessageConfiguration {
  ADMMessage?: ADMMessage;
  APNSMessage?: APNSMessage;
  BaiduMessage?: BaiduMessage;
  DefaultMessage?: DefaultMessage;
  DefaultPushNotificationMessage?: DefaultPushNotificationMessage;
  EmailMessage?: EmailMessage;
  GCMMessage?: GCMMessage;
  SMSMessage?: SMSMessage;
  VoiceMessage?: VoiceMessage;
}
export interface MessageRequest {
  Addresses?: { [key: string]: AddressConfiguration | undefined };
  Context?: { [key: string]: string | undefined };
  Endpoints?: { [key: string]: EndpointSendConfiguration | undefined };
  MessageConfiguration?: DirectMessageConfiguration;
  TemplateConfiguration?: TemplateConfiguration;
  TraceId?: string;
}
export interface SendMessagesRequest {
  ApplicationId: string;
  MessageRequest?: MessageRequest;
}
export type DeliveryStatus =
  | "SUCCESSFUL"
  | "THROTTLED"
  | "TEMPORARY_FAILURE"
  | "PERMANENT_FAILURE"
  | "UNKNOWN_FAILURE"
  | "OPT_OUT"
  | "DUPLICATE"
  | (string & {});
export interface EndpointMessageResult {
  Address?: string;
  DeliveryStatus?: DeliveryStatus;
  MessageId?: string;
  StatusCode?: number;
  StatusMessage?: string;
  UpdatedToken?: string;
}
export type MapOfEndpointMessageResult = {
  [key: string]: EndpointMessageResult | undefined;
};
export interface MessageResult {
  DeliveryStatus?: DeliveryStatus;
  MessageId?: string;
  StatusCode?: number;
  StatusMessage?: string;
  UpdatedToken?: string;
}
export type MapOfMessageResult = { [key: string]: MessageResult | undefined };
export interface MessageResponse {
  ApplicationId?: string;
  EndpointResult?: { [key: string]: EndpointMessageResult | undefined };
  RequestId?: string;
  Result?: { [key: string]: MessageResult | undefined };
}
export interface SendMessagesResponse {
  MessageResponse: MessageResponse & {
    ApplicationId: string;
    EndpointResult: {
      [key: string]:
        | (EndpointMessageResult & {
            DeliveryStatus: DeliveryStatus;
            StatusCode: number;
          })
        | undefined;
    };
    Result: {
      [key: string]:
        | (MessageResult & {
            DeliveryStatus: DeliveryStatus;
            StatusCode: number;
          })
        | undefined;
    };
  };
}
export interface SendOTPMessageRequestParameters {
  AllowedAttempts?: number;
  BrandName?: string;
  Channel?: string;
  CodeLength?: number;
  DestinationIdentity?: string;
  EntityId?: string;
  Language?: string;
  OriginationIdentity?: string;
  ReferenceId?: string;
  TemplateId?: string;
  ValidityPeriod?: number;
}
export interface SendOTPMessageRequest {
  ApplicationId: string;
  SendOTPMessageRequestParameters?: SendOTPMessageRequestParameters;
}
export interface SendOTPMessageResponse {
  MessageResponse: MessageResponse & {
    ApplicationId: string;
    EndpointResult: {
      [key: string]:
        | (EndpointMessageResult & {
            DeliveryStatus: DeliveryStatus;
            StatusCode: number;
          })
        | undefined;
    };
    Result: {
      [key: string]:
        | (MessageResult & {
            DeliveryStatus: DeliveryStatus;
            StatusCode: number;
          })
        | undefined;
    };
  };
}
export interface SendUsersMessageRequest {
  Context?: { [key: string]: string | undefined };
  MessageConfiguration?: DirectMessageConfiguration;
  TemplateConfiguration?: TemplateConfiguration;
  TraceId?: string;
  Users?: { [key: string]: EndpointSendConfiguration | undefined };
}
export interface SendUsersMessagesRequest {
  ApplicationId: string;
  SendUsersMessageRequest?: SendUsersMessageRequest;
}
export type MapOfMapOfEndpointMessageResult = {
  [key: string]:
    | { [key: string]: EndpointMessageResult | undefined }
    | undefined;
};
export interface SendUsersMessageResponse {
  ApplicationId?: string;
  RequestId?: string;
  Result?: {
    [key: string]:
      | { [key: string]: EndpointMessageResult | undefined }
      | undefined;
  };
}
export interface SendUsersMessagesResponse {
  SendUsersMessageResponse: SendUsersMessageResponse & {
    ApplicationId: string;
    Result: {
      [key: string]:
        | {
            [key: string]:
              | (EndpointMessageResult & {
                  DeliveryStatus: DeliveryStatus;
                  StatusCode: number;
                })
              | undefined;
          }
        | undefined;
    };
  };
}
export interface TagResourceRequest {
  ResourceArn: string;
  TagsModel?: TagsModel;
}
export interface TagResourceResponse {}
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys?: string[];
}
export interface UntagResourceResponse {}
export interface ADMChannelRequest {
  ClientId?: string;
  ClientSecret?: string;
  Enabled?: boolean;
}
export interface UpdateAdmChannelRequest {
  ADMChannelRequest?: ADMChannelRequest;
  ApplicationId: string;
}
export interface UpdateAdmChannelResponse {
  ADMChannelResponse: ADMChannelResponse & { Platform: string };
}
export interface APNSChannelRequest {
  BundleId?: string;
  Certificate?: string;
  DefaultAuthenticationMethod?: string;
  Enabled?: boolean;
  PrivateKey?: string;
  TeamId?: string;
  TokenKey?: string;
  TokenKeyId?: string;
}
export interface UpdateApnsChannelRequest {
  APNSChannelRequest?: APNSChannelRequest;
  ApplicationId: string;
}
export interface UpdateApnsChannelResponse {
  APNSChannelResponse: APNSChannelResponse & { Platform: string };
}
export interface APNSSandboxChannelRequest {
  BundleId?: string;
  Certificate?: string;
  DefaultAuthenticationMethod?: string;
  Enabled?: boolean;
  PrivateKey?: string;
  TeamId?: string;
  TokenKey?: string;
  TokenKeyId?: string;
}
export interface UpdateApnsSandboxChannelRequest {
  APNSSandboxChannelRequest?: APNSSandboxChannelRequest;
  ApplicationId: string;
}
export interface UpdateApnsSandboxChannelResponse {
  APNSSandboxChannelResponse: APNSSandboxChannelResponse & { Platform: string };
}
export interface APNSVoipChannelRequest {
  BundleId?: string;
  Certificate?: string;
  DefaultAuthenticationMethod?: string;
  Enabled?: boolean;
  PrivateKey?: string;
  TeamId?: string;
  TokenKey?: string;
  TokenKeyId?: string;
}
export interface UpdateApnsVoipChannelRequest {
  APNSVoipChannelRequest?: APNSVoipChannelRequest;
  ApplicationId: string;
}
export interface UpdateApnsVoipChannelResponse {
  APNSVoipChannelResponse: APNSVoipChannelResponse & { Platform: string };
}
export interface APNSVoipSandboxChannelRequest {
  BundleId?: string;
  Certificate?: string;
  DefaultAuthenticationMethod?: string;
  Enabled?: boolean;
  PrivateKey?: string;
  TeamId?: string;
  TokenKey?: string;
  TokenKeyId?: string;
}
export interface UpdateApnsVoipSandboxChannelRequest {
  APNSVoipSandboxChannelRequest?: APNSVoipSandboxChannelRequest;
  ApplicationId: string;
}
export interface UpdateApnsVoipSandboxChannelResponse {
  APNSVoipSandboxChannelResponse: APNSVoipSandboxChannelResponse & {
    Platform: string;
  };
}
export interface WriteApplicationSettingsRequest {
  CampaignHook?: CampaignHook;
  CloudWatchMetricsEnabled?: boolean;
  EventTaggingEnabled?: boolean;
  Limits?: CampaignLimits;
  QuietTime?: QuietTime;
  JourneyLimits?: ApplicationSettingsJourneyLimits;
}
export interface UpdateApplicationSettingsRequest {
  ApplicationId: string;
  WriteApplicationSettingsRequest?: WriteApplicationSettingsRequest;
}
export interface UpdateApplicationSettingsResponse {
  ApplicationSettingsResource: ApplicationSettingsResource & {
    ApplicationId: string;
  };
}
export interface BaiduChannelRequest {
  ApiKey?: string;
  Enabled?: boolean;
  SecretKey?: string;
}
export interface UpdateBaiduChannelRequest {
  ApplicationId: string;
  BaiduChannelRequest?: BaiduChannelRequest;
}
export interface UpdateBaiduChannelResponse {
  BaiduChannelResponse: BaiduChannelResponse & {
    Credential: string;
    Platform: string;
  };
}
export interface UpdateCampaignRequest {
  ApplicationId: string;
  CampaignId: string;
  WriteCampaignRequest?: WriteCampaignRequest;
}
export interface UpdateCampaignResponse {
  CampaignResponse: CampaignResponse & {
    ApplicationId: string;
    Arn: string;
    CreationDate: string;
    Id: string;
    LastModifiedDate: string;
    SegmentId: string;
    SegmentVersion: number;
    AdditionalTreatments: (TreatmentResource & {
      Id: string;
      SizePercent: number;
      CustomDeliveryConfiguration: CustomDeliveryConfiguration & {
        DeliveryUri: string;
      };
      MessageConfiguration: MessageConfiguration & {
        InAppMessage: CampaignInAppMessage & {
          Content: (InAppMessageContent & {
            BodyConfig: InAppMessageBodyConfig & {
              Alignment: Alignment;
              Body: string;
              TextColor: string;
            };
            HeaderConfig: InAppMessageHeaderConfig & {
              Alignment: Alignment;
              Header: string;
              TextColor: string;
            };
            PrimaryBtn: InAppMessageButton & {
              Android: OverrideButtonConfiguration & {
                ButtonAction: ButtonAction;
              };
              DefaultConfig: DefaultButtonConfiguration & {
                ButtonAction: ButtonAction;
                Text: string;
              };
              IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
              Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            };
            SecondaryBtn: InAppMessageButton & {
              Android: OverrideButtonConfiguration & {
                ButtonAction: ButtonAction;
              };
              DefaultConfig: DefaultButtonConfiguration & {
                ButtonAction: ButtonAction;
                Text: string;
              };
              IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
              Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            };
          })[];
        };
      };
      Schedule: Schedule & {
        StartTime: string;
        EventFilter: CampaignEventFilter & {
          Dimensions: EventDimensions & {
            Attributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
            EventType: SetDimension & { Values: ListOf__string };
            Metrics: {
              [key: string]:
                | (MetricDimension & {
                    ComparisonOperator: string;
                    Value: number;
                  })
                | undefined;
            };
          };
          FilterType: FilterType;
        };
      };
    })[];
    CustomDeliveryConfiguration: CustomDeliveryConfiguration & {
      DeliveryUri: string;
    };
    MessageConfiguration: MessageConfiguration & {
      InAppMessage: CampaignInAppMessage & {
        Content: (InAppMessageContent & {
          BodyConfig: InAppMessageBodyConfig & {
            Alignment: Alignment;
            Body: string;
            TextColor: string;
          };
          HeaderConfig: InAppMessageHeaderConfig & {
            Alignment: Alignment;
            Header: string;
            TextColor: string;
          };
          PrimaryBtn: InAppMessageButton & {
            Android: OverrideButtonConfiguration & {
              ButtonAction: ButtonAction;
            };
            DefaultConfig: DefaultButtonConfiguration & {
              ButtonAction: ButtonAction;
              Text: string;
            };
            IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
          };
          SecondaryBtn: InAppMessageButton & {
            Android: OverrideButtonConfiguration & {
              ButtonAction: ButtonAction;
            };
            DefaultConfig: DefaultButtonConfiguration & {
              ButtonAction: ButtonAction;
              Text: string;
            };
            IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
          };
        })[];
      };
    };
    Schedule: Schedule & {
      StartTime: string;
      EventFilter: CampaignEventFilter & {
        Dimensions: EventDimensions & {
          Attributes: {
            [key: string]:
              | (AttributeDimension & { Values: ListOf__string })
              | undefined;
          };
          EventType: SetDimension & { Values: ListOf__string };
          Metrics: {
            [key: string]:
              | (MetricDimension & {
                  ComparisonOperator: string;
                  Value: number;
                })
              | undefined;
          };
        };
        FilterType: FilterType;
      };
    };
  };
}
export interface EmailChannelRequest {
  ConfigurationSet?: string;
  Enabled?: boolean;
  FromAddress?: string;
  Identity?: string;
  RoleArn?: string;
  OrchestrationSendingRoleArn?: string;
}
export interface UpdateEmailChannelRequest {
  ApplicationId: string;
  EmailChannelRequest?: EmailChannelRequest;
}
export interface UpdateEmailChannelResponse {
  EmailChannelResponse: EmailChannelResponse & { Platform: string };
}
export interface UpdateEmailTemplateRequest {
  CreateNewVersion?: boolean;
  EmailTemplateRequest?: EmailTemplateRequest;
  TemplateName: string;
  Version?: string;
}
export interface UpdateEmailTemplateResponse {
  MessageBody: MessageBody;
}
export interface EndpointRequest {
  Address?: string;
  Attributes?: { [key: string]: string[] | undefined };
  ChannelType?: ChannelType;
  Demographic?: EndpointDemographic;
  EffectiveDate?: string;
  EndpointStatus?: string;
  Location?: EndpointLocation;
  Metrics?: { [key: string]: number | undefined };
  OptOut?: string;
  RequestId?: string;
  User?: EndpointUser;
}
export interface UpdateEndpointRequest {
  ApplicationId: string;
  EndpointId: string;
  EndpointRequest?: EndpointRequest;
}
export interface UpdateEndpointResponse {
  MessageBody: MessageBody;
}
export interface EndpointBatchItem {
  Address?: string;
  Attributes?: { [key: string]: string[] | undefined };
  ChannelType?: ChannelType;
  Demographic?: EndpointDemographic;
  EffectiveDate?: string;
  EndpointStatus?: string;
  Id?: string;
  Location?: EndpointLocation;
  Metrics?: { [key: string]: number | undefined };
  OptOut?: string;
  RequestId?: string;
  User?: EndpointUser;
}
export type ListOfEndpointBatchItem = EndpointBatchItem[];
export interface EndpointBatchRequest {
  Item?: EndpointBatchItem[];
}
export interface UpdateEndpointsBatchRequest {
  ApplicationId: string;
  EndpointBatchRequest?: EndpointBatchRequest;
}
export interface UpdateEndpointsBatchResponse {
  MessageBody: MessageBody;
}
export interface GCMChannelRequest {
  ApiKey?: string;
  DefaultAuthenticationMethod?: string;
  Enabled?: boolean;
  ServiceJson?: string;
}
export interface UpdateGcmChannelRequest {
  ApplicationId: string;
  GCMChannelRequest?: GCMChannelRequest;
}
export interface UpdateGcmChannelResponse {
  GCMChannelResponse: GCMChannelResponse & { Platform: string };
}
export interface UpdateInAppTemplateRequest {
  CreateNewVersion?: boolean;
  InAppTemplateRequest?: InAppTemplateRequest;
  TemplateName: string;
  Version?: string;
}
export interface UpdateInAppTemplateResponse {
  MessageBody: MessageBody;
}
export interface UpdateJourneyRequest {
  ApplicationId: string;
  JourneyId: string;
  WriteJourneyRequest?: WriteJourneyRequest;
}
export interface UpdateJourneyResponse {
  JourneyResponse: JourneyResponse & {
    ApplicationId: string;
    Id: string;
    Name: string;
    Activities: {
      [key: string]:
        | (Activity & {
            ConditionalSplit: ConditionalSplitActivity & {
              Condition: Condition & {
                Conditions: (SimpleCondition & {
                  EventCondition: EventCondition & {
                    Dimensions: EventDimensions & {
                      Attributes: {
                        [key: string]:
                          | (AttributeDimension & { Values: ListOf__string })
                          | undefined;
                      };
                      EventType: SetDimension & { Values: ListOf__string };
                      Metrics: {
                        [key: string]:
                          | (MetricDimension & {
                              ComparisonOperator: string;
                              Value: number;
                            })
                          | undefined;
                      };
                    };
                  };
                  SegmentCondition: SegmentCondition & { SegmentId: string };
                  SegmentDimensions: SegmentDimensions & {
                    Attributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                    Behavior: SegmentBehaviors & {
                      Recency: RecencyDimension & {
                        Duration: Duration;
                        RecencyType: RecencyType;
                      };
                    };
                    Demographic: SegmentDemographics & {
                      AppVersion: SetDimension & { Values: ListOf__string };
                      Channel: SetDimension & { Values: ListOf__string };
                      DeviceType: SetDimension & { Values: ListOf__string };
                      Make: SetDimension & { Values: ListOf__string };
                      Model: SetDimension & { Values: ListOf__string };
                      Platform: SetDimension & { Values: ListOf__string };
                    };
                    Location: SegmentLocation & {
                      Country: SetDimension & { Values: ListOf__string };
                      GPSPoint: GPSPointDimension & {
                        Coordinates: GPSCoordinates & {
                          Latitude: number;
                          Longitude: number;
                        };
                      };
                    };
                    Metrics: {
                      [key: string]:
                        | (MetricDimension & {
                            ComparisonOperator: string;
                            Value: number;
                          })
                        | undefined;
                    };
                    UserAttributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                  };
                })[];
              };
            };
            Holdout: HoldoutActivity & { Percentage: number };
            MultiCondition: MultiConditionalSplitActivity & {
              Branches: (MultiConditionalBranch & {
                Condition: SimpleCondition & {
                  EventCondition: EventCondition & {
                    Dimensions: EventDimensions & {
                      Attributes: {
                        [key: string]:
                          | (AttributeDimension & { Values: ListOf__string })
                          | undefined;
                      };
                      EventType: SetDimension & { Values: ListOf__string };
                      Metrics: {
                        [key: string]:
                          | (MetricDimension & {
                              ComparisonOperator: string;
                              Value: number;
                            })
                          | undefined;
                      };
                    };
                  };
                  SegmentCondition: SegmentCondition & { SegmentId: string };
                  SegmentDimensions: SegmentDimensions & {
                    Attributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                    Behavior: SegmentBehaviors & {
                      Recency: RecencyDimension & {
                        Duration: Duration;
                        RecencyType: RecencyType;
                      };
                    };
                    Demographic: SegmentDemographics & {
                      AppVersion: SetDimension & { Values: ListOf__string };
                      Channel: SetDimension & { Values: ListOf__string };
                      DeviceType: SetDimension & { Values: ListOf__string };
                      Make: SetDimension & { Values: ListOf__string };
                      Model: SetDimension & { Values: ListOf__string };
                      Platform: SetDimension & { Values: ListOf__string };
                    };
                    Location: SegmentLocation & {
                      Country: SetDimension & { Values: ListOf__string };
                      GPSPoint: GPSPointDimension & {
                        Coordinates: GPSCoordinates & {
                          Latitude: number;
                          Longitude: number;
                        };
                      };
                    };
                    Metrics: {
                      [key: string]:
                        | (MetricDimension & {
                            ComparisonOperator: string;
                            Value: number;
                          })
                        | undefined;
                    };
                    UserAttributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                  };
                };
              })[];
            };
          })
        | undefined;
    };
    StartCondition: StartCondition & {
      EventStartCondition: EventStartCondition & {
        EventFilter: EventFilter & {
          Dimensions: EventDimensions & {
            Attributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
            EventType: SetDimension & { Values: ListOf__string };
            Metrics: {
              [key: string]:
                | (MetricDimension & {
                    ComparisonOperator: string;
                    Value: number;
                  })
                | undefined;
            };
          };
          FilterType: FilterType;
        };
      };
      SegmentStartCondition: SegmentCondition & { SegmentId: string };
    };
  };
}
export interface JourneyStateRequest {
  State?: State;
}
export interface UpdateJourneyStateRequest {
  ApplicationId: string;
  JourneyId: string;
  JourneyStateRequest?: JourneyStateRequest;
}
export interface UpdateJourneyStateResponse {
  JourneyResponse: JourneyResponse & {
    ApplicationId: string;
    Id: string;
    Name: string;
    Activities: {
      [key: string]:
        | (Activity & {
            ConditionalSplit: ConditionalSplitActivity & {
              Condition: Condition & {
                Conditions: (SimpleCondition & {
                  EventCondition: EventCondition & {
                    Dimensions: EventDimensions & {
                      Attributes: {
                        [key: string]:
                          | (AttributeDimension & { Values: ListOf__string })
                          | undefined;
                      };
                      EventType: SetDimension & { Values: ListOf__string };
                      Metrics: {
                        [key: string]:
                          | (MetricDimension & {
                              ComparisonOperator: string;
                              Value: number;
                            })
                          | undefined;
                      };
                    };
                  };
                  SegmentCondition: SegmentCondition & { SegmentId: string };
                  SegmentDimensions: SegmentDimensions & {
                    Attributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                    Behavior: SegmentBehaviors & {
                      Recency: RecencyDimension & {
                        Duration: Duration;
                        RecencyType: RecencyType;
                      };
                    };
                    Demographic: SegmentDemographics & {
                      AppVersion: SetDimension & { Values: ListOf__string };
                      Channel: SetDimension & { Values: ListOf__string };
                      DeviceType: SetDimension & { Values: ListOf__string };
                      Make: SetDimension & { Values: ListOf__string };
                      Model: SetDimension & { Values: ListOf__string };
                      Platform: SetDimension & { Values: ListOf__string };
                    };
                    Location: SegmentLocation & {
                      Country: SetDimension & { Values: ListOf__string };
                      GPSPoint: GPSPointDimension & {
                        Coordinates: GPSCoordinates & {
                          Latitude: number;
                          Longitude: number;
                        };
                      };
                    };
                    Metrics: {
                      [key: string]:
                        | (MetricDimension & {
                            ComparisonOperator: string;
                            Value: number;
                          })
                        | undefined;
                    };
                    UserAttributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                  };
                })[];
              };
            };
            Holdout: HoldoutActivity & { Percentage: number };
            MultiCondition: MultiConditionalSplitActivity & {
              Branches: (MultiConditionalBranch & {
                Condition: SimpleCondition & {
                  EventCondition: EventCondition & {
                    Dimensions: EventDimensions & {
                      Attributes: {
                        [key: string]:
                          | (AttributeDimension & { Values: ListOf__string })
                          | undefined;
                      };
                      EventType: SetDimension & { Values: ListOf__string };
                      Metrics: {
                        [key: string]:
                          | (MetricDimension & {
                              ComparisonOperator: string;
                              Value: number;
                            })
                          | undefined;
                      };
                    };
                  };
                  SegmentCondition: SegmentCondition & { SegmentId: string };
                  SegmentDimensions: SegmentDimensions & {
                    Attributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                    Behavior: SegmentBehaviors & {
                      Recency: RecencyDimension & {
                        Duration: Duration;
                        RecencyType: RecencyType;
                      };
                    };
                    Demographic: SegmentDemographics & {
                      AppVersion: SetDimension & { Values: ListOf__string };
                      Channel: SetDimension & { Values: ListOf__string };
                      DeviceType: SetDimension & { Values: ListOf__string };
                      Make: SetDimension & { Values: ListOf__string };
                      Model: SetDimension & { Values: ListOf__string };
                      Platform: SetDimension & { Values: ListOf__string };
                    };
                    Location: SegmentLocation & {
                      Country: SetDimension & { Values: ListOf__string };
                      GPSPoint: GPSPointDimension & {
                        Coordinates: GPSCoordinates & {
                          Latitude: number;
                          Longitude: number;
                        };
                      };
                    };
                    Metrics: {
                      [key: string]:
                        | (MetricDimension & {
                            ComparisonOperator: string;
                            Value: number;
                          })
                        | undefined;
                    };
                    UserAttributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                  };
                };
              })[];
            };
          })
        | undefined;
    };
    StartCondition: StartCondition & {
      EventStartCondition: EventStartCondition & {
        EventFilter: EventFilter & {
          Dimensions: EventDimensions & {
            Attributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
            EventType: SetDimension & { Values: ListOf__string };
            Metrics: {
              [key: string]:
                | (MetricDimension & {
                    ComparisonOperator: string;
                    Value: number;
                  })
                | undefined;
            };
          };
          FilterType: FilterType;
        };
      };
      SegmentStartCondition: SegmentCondition & { SegmentId: string };
    };
  };
}
export interface UpdatePushTemplateRequest {
  CreateNewVersion?: boolean;
  PushNotificationTemplateRequest?: PushNotificationTemplateRequest;
  TemplateName: string;
  Version?: string;
}
export interface UpdatePushTemplateResponse {
  MessageBody: MessageBody;
}
export interface UpdateRecommenderConfigurationShape {
  Attributes?: { [key: string]: string | undefined };
  Description?: string;
  Name?: string;
  RecommendationProviderIdType?: string;
  RecommendationProviderRoleArn?: string;
  RecommendationProviderUri?: string;
  RecommendationTransformerUri?: string;
  RecommendationsDisplayName?: string;
  RecommendationsPerMessage?: number;
}
export interface UpdateRecommenderConfigurationRequest {
  RecommenderId: string;
  UpdateRecommenderConfiguration?: UpdateRecommenderConfigurationShape;
}
export interface UpdateRecommenderConfigurationResponse {
  RecommenderConfigurationResponse: RecommenderConfigurationResponse & {
    CreationDate: string;
    Id: string;
    LastModifiedDate: string;
    RecommendationProviderRoleArn: string;
    RecommendationProviderUri: string;
  };
}
export interface UpdateSegmentRequest {
  ApplicationId: string;
  SegmentId: string;
  WriteSegmentRequest?: WriteSegmentRequest;
}
export interface UpdateSegmentResponse {
  SegmentResponse: SegmentResponse & {
    ApplicationId: string;
    Arn: string;
    CreationDate: string;
    Id: string;
    SegmentType: SegmentType;
    Dimensions: SegmentDimensions & {
      Attributes: {
        [key: string]:
          | (AttributeDimension & { Values: ListOf__string })
          | undefined;
      };
      Behavior: SegmentBehaviors & {
        Recency: RecencyDimension & {
          Duration: Duration;
          RecencyType: RecencyType;
        };
      };
      Demographic: SegmentDemographics & {
        AppVersion: SetDimension & { Values: ListOf__string };
        Channel: SetDimension & { Values: ListOf__string };
        DeviceType: SetDimension & { Values: ListOf__string };
        Make: SetDimension & { Values: ListOf__string };
        Model: SetDimension & { Values: ListOf__string };
        Platform: SetDimension & { Values: ListOf__string };
      };
      Location: SegmentLocation & {
        Country: SetDimension & { Values: ListOf__string };
        GPSPoint: GPSPointDimension & {
          Coordinates: GPSCoordinates & { Latitude: number; Longitude: number };
        };
      };
      Metrics: {
        [key: string]:
          | (MetricDimension & { ComparisonOperator: string; Value: number })
          | undefined;
      };
      UserAttributes: {
        [key: string]:
          | (AttributeDimension & { Values: ListOf__string })
          | undefined;
      };
    };
    ImportDefinition: SegmentImportResource & {
      ExternalId: string;
      Format: Format;
      RoleArn: string;
      S3Url: string;
      Size: number;
    };
    SegmentGroups: SegmentGroupList & {
      Groups: (SegmentGroup & {
        Dimensions: (SegmentDimensions & {
          Attributes: {
            [key: string]:
              | (AttributeDimension & { Values: ListOf__string })
              | undefined;
          };
          Behavior: SegmentBehaviors & {
            Recency: RecencyDimension & {
              Duration: Duration;
              RecencyType: RecencyType;
            };
          };
          Demographic: SegmentDemographics & {
            AppVersion: SetDimension & { Values: ListOf__string };
            Channel: SetDimension & { Values: ListOf__string };
            DeviceType: SetDimension & { Values: ListOf__string };
            Make: SetDimension & { Values: ListOf__string };
            Model: SetDimension & { Values: ListOf__string };
            Platform: SetDimension & { Values: ListOf__string };
          };
          Location: SegmentLocation & {
            Country: SetDimension & { Values: ListOf__string };
            GPSPoint: GPSPointDimension & {
              Coordinates: GPSCoordinates & {
                Latitude: number;
                Longitude: number;
              };
            };
          };
          Metrics: {
            [key: string]:
              | (MetricDimension & {
                  ComparisonOperator: string;
                  Value: number;
                })
              | undefined;
          };
          UserAttributes: {
            [key: string]:
              | (AttributeDimension & { Values: ListOf__string })
              | undefined;
          };
        })[];
        SourceSegments: (SegmentReference & { Id: string })[];
      })[];
    };
  };
}
export interface SMSChannelRequest {
  Enabled?: boolean;
  SenderId?: string;
  ShortCode?: string;
}
export interface UpdateSmsChannelRequest {
  ApplicationId: string;
  SMSChannelRequest?: SMSChannelRequest;
}
export interface UpdateSmsChannelResponse {
  SMSChannelResponse: SMSChannelResponse & { Platform: string };
}
export interface UpdateSmsTemplateRequest {
  CreateNewVersion?: boolean;
  SMSTemplateRequest?: SMSTemplateRequest;
  TemplateName: string;
  Version?: string;
}
export interface UpdateSmsTemplateResponse {
  MessageBody: MessageBody;
}
export interface TemplateActiveVersionRequest {
  Version?: string;
}
export interface UpdateTemplateActiveVersionRequest {
  TemplateActiveVersionRequest?: TemplateActiveVersionRequest;
  TemplateName: string;
  TemplateType: string;
}
export interface UpdateTemplateActiveVersionResponse {
  MessageBody: MessageBody;
}
export interface VoiceChannelRequest {
  Enabled?: boolean;
}
export interface UpdateVoiceChannelRequest {
  ApplicationId: string;
  VoiceChannelRequest?: VoiceChannelRequest;
}
export interface UpdateVoiceChannelResponse {
  VoiceChannelResponse: VoiceChannelResponse & { Platform: string };
}
export interface UpdateVoiceTemplateRequest {
  CreateNewVersion?: boolean;
  TemplateName: string;
  Version?: string;
  VoiceTemplateRequest?: VoiceTemplateRequest;
}
export interface UpdateVoiceTemplateResponse {
  MessageBody: MessageBody;
}
export interface VerifyOTPMessageRequestParameters {
  DestinationIdentity?: string;
  Otp?: string;
  ReferenceId?: string;
}
export interface VerifyOTPMessageRequest {
  ApplicationId: string;
  VerifyOTPMessageRequestParameters?: VerifyOTPMessageRequestParameters;
}
export interface VerificationResponse {
  Valid?: boolean;
}
export interface VerifyOTPMessageResponse {
  VerificationResponse: VerificationResponse;
}
export type CreateAppError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an application.
 */
export const createApp: API.OperationMethod<
  CreateAppRequest,
  CreateAppResponse,
  CreateAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/apps",
    input: {
      CreateApplicationRequest: D.m({
        payload: true,
        shape: { Name: 0, tags: 0 },
      }),
    },
    output: { ApplicationResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApp",
})) as any;

export type CreateCampaignError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new campaign for an application or updates the settings of an existing campaign for an application.
 */
export const createCampaign: API.OperationMethod<
  CreateCampaignRequest,
  CreateCampaignResponse,
  CreateCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/apps/{ApplicationId}/campaigns",
    input: {
      ApplicationId: 0,
      WriteCampaignRequest: D.m({
        payload: true,
        shape: i_WriteCampaignRequest,
      }),
    },
    output: { CampaignResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCampaign",
})) as any;

export type CreateEmailTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a message template for messages that are sent through the email channel.
 */
export const createEmailTemplate: API.OperationMethod<
  CreateEmailTemplateRequest,
  CreateEmailTemplateResponse,
  CreateEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/templates/{TemplateName}/email",
    input: {
      EmailTemplateRequest: D.m({
        payload: true,
        shape: i_EmailTemplateRequest,
      }),
      TemplateName: 0,
    },
    output: { CreateTemplateMessageBody: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEmailTemplate",
})) as any;

export type CreateExportJobError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an export job for an application.
 */
export const createExportJob: API.OperationMethod<
  CreateExportJobRequest,
  CreateExportJobResponse,
  CreateExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/apps/{ApplicationId}/jobs/export",
    input: {
      ApplicationId: 0,
      ExportJobRequest: D.m({
        payload: true,
        shape: { RoleArn: 0, S3UrlPrefix: 0, SegmentId: 0, SegmentVersion: 0 },
      }),
    },
    output: { ExportJobResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExportJob",
})) as any;

export type CreateImportJobError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an import job for an application.
 */
export const createImportJob: API.OperationMethod<
  CreateImportJobRequest,
  CreateImportJobResponse,
  CreateImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/apps/{ApplicationId}/jobs/import",
    input: {
      ApplicationId: 0,
      ImportJobRequest: D.m({
        payload: true,
        shape: {
          DefineSegment: 0,
          ExternalId: 0,
          Format: 0,
          RegisterEndpoints: 0,
          RoleArn: 0,
          S3Url: 0,
          SegmentId: 0,
          SegmentName: 0,
        },
      }),
    },
    output: { ImportJobResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateImportJob",
})) as any;

export type CreateInAppTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new message template for messages using the in-app message channel.
 */
export const createInAppTemplate: API.OperationMethod<
  CreateInAppTemplateRequest,
  CreateInAppTemplateResponse,
  CreateInAppTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/templates/{TemplateName}/inapp",
    input: {
      InAppTemplateRequest: D.m({
        payload: true,
        shape: i_InAppTemplateRequest,
      }),
      TemplateName: 0,
    },
    output: { TemplateCreateMessageBody: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInAppTemplate",
})) as any;

export type CreateJourneyError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a journey for an application.
 */
export const createJourney: API.OperationMethod<
  CreateJourneyRequest,
  CreateJourneyResponse,
  CreateJourneyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/apps/{ApplicationId}/journeys",
    input: {
      ApplicationId: 0,
      WriteJourneyRequest: D.m({ payload: true, shape: i_WriteJourneyRequest }),
    },
    output: {
      JourneyResponse: D.m({ payload: true, shape: o_JourneyResponse }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateJourney",
})) as any;

export type CreatePushTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a message template for messages that are sent through a push notification channel.
 */
export const createPushTemplate: API.OperationMethod<
  CreatePushTemplateRequest,
  CreatePushTemplateResponse,
  CreatePushTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/templates/{TemplateName}/push",
    input: {
      PushNotificationTemplateRequest: D.m({
        payload: true,
        shape: i_PushNotificationTemplateRequest,
      }),
      TemplateName: 0,
    },
    output: { CreateTemplateMessageBody: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePushTemplate",
})) as any;

export type CreateRecommenderConfigurationError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an Amazon Pinpoint configuration for a recommender model.
 */
export const createRecommenderConfiguration: API.OperationMethod<
  CreateRecommenderConfigurationRequest,
  CreateRecommenderConfigurationResponse,
  CreateRecommenderConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/recommenders",
    input: {
      CreateRecommenderConfiguration: D.m({
        payload: true,
        shape: {
          Attributes: 0,
          Description: 0,
          Name: 0,
          RecommendationProviderIdType: 0,
          RecommendationProviderRoleArn: 0,
          RecommendationProviderUri: 0,
          RecommendationTransformerUri: 0,
          RecommendationsDisplayName: 0,
          RecommendationsPerMessage: 0,
        },
      }),
    },
    output: { RecommenderConfigurationResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRecommenderConfiguration",
})) as any;

export type CreateSegmentError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new segment for an application or updates the configuration, dimension, and other settings for an existing segment that's associated with an application.
 */
export const createSegment: API.OperationMethod<
  CreateSegmentRequest,
  CreateSegmentResponse,
  CreateSegmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/apps/{ApplicationId}/segments",
    input: {
      ApplicationId: 0,
      WriteSegmentRequest: D.m({ payload: true, shape: i_WriteSegmentRequest }),
    },
    output: { SegmentResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSegment",
})) as any;

export type CreateSmsTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a message template for messages that are sent through the SMS channel.
 */
export const createSmsTemplate: API.OperationMethod<
  CreateSmsTemplateRequest,
  CreateSmsTemplateResponse,
  CreateSmsTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/templates/{TemplateName}/sms",
    input: {
      SMSTemplateRequest: D.m({ payload: true, shape: i_SMSTemplateRequest }),
      TemplateName: 0,
    },
    output: { CreateTemplateMessageBody: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSmsTemplate",
})) as any;

export type CreateVoiceTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a message template for messages that are sent through the voice channel.
 */
export const createVoiceTemplate: API.OperationMethod<
  CreateVoiceTemplateRequest,
  CreateVoiceTemplateResponse,
  CreateVoiceTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/templates/{TemplateName}/voice",
    input: {
      TemplateName: 0,
      VoiceTemplateRequest: D.m({
        payload: true,
        shape: i_VoiceTemplateRequest,
      }),
    },
    output: { CreateTemplateMessageBody: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVoiceTemplate",
})) as any;

export type DeleteAdmChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Disables the ADM channel for an application and deletes any existing settings for the channel.
 */
export const deleteAdmChannel: API.OperationMethod<
  DeleteAdmChannelRequest,
  DeleteAdmChannelResponse,
  DeleteAdmChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/apps/{ApplicationId}/channels/adm",
    input: { ApplicationId: 0 },
    output: { ADMChannelResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAdmChannel",
})) as any;

export type DeleteApnsChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Disables the APNs channel for an application and deletes any existing settings for the channel.
 */
export const deleteApnsChannel: API.OperationMethod<
  DeleteApnsChannelRequest,
  DeleteApnsChannelResponse,
  DeleteApnsChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/apps/{ApplicationId}/channels/apns",
    input: { ApplicationId: 0 },
    output: { APNSChannelResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApnsChannel",
})) as any;

export type DeleteApnsSandboxChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Disables the APNs sandbox channel for an application and deletes any existing settings for the channel.
 */
export const deleteApnsSandboxChannel: API.OperationMethod<
  DeleteApnsSandboxChannelRequest,
  DeleteApnsSandboxChannelResponse,
  DeleteApnsSandboxChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/apps/{ApplicationId}/channels/apns_sandbox",
    input: { ApplicationId: 0 },
    output: { APNSSandboxChannelResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApnsSandboxChannel",
})) as any;

export type DeleteApnsVoipChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Disables the APNs VoIP channel for an application and deletes any existing settings for the channel.
 */
export const deleteApnsVoipChannel: API.OperationMethod<
  DeleteApnsVoipChannelRequest,
  DeleteApnsVoipChannelResponse,
  DeleteApnsVoipChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/apps/{ApplicationId}/channels/apns_voip",
    input: { ApplicationId: 0 },
    output: { APNSVoipChannelResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApnsVoipChannel",
})) as any;

export type DeleteApnsVoipSandboxChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Disables the APNs VoIP sandbox channel for an application and deletes any existing settings for the channel.
 */
export const deleteApnsVoipSandboxChannel: API.OperationMethod<
  DeleteApnsVoipSandboxChannelRequest,
  DeleteApnsVoipSandboxChannelResponse,
  DeleteApnsVoipSandboxChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/apps/{ApplicationId}/channels/apns_voip_sandbox",
    input: { ApplicationId: 0 },
    output: { APNSVoipSandboxChannelResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApnsVoipSandboxChannel",
})) as any;

export type DeleteAppError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an application.
 */
export const deleteApp: API.OperationMethod<
  DeleteAppRequest,
  DeleteAppResponse,
  DeleteAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/apps/{ApplicationId}",
    input: { ApplicationId: 0 },
    output: { ApplicationResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApp",
})) as any;

export type DeleteBaiduChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Disables the Baidu channel for an application and deletes any existing settings for the channel.
 */
export const deleteBaiduChannel: API.OperationMethod<
  DeleteBaiduChannelRequest,
  DeleteBaiduChannelResponse,
  DeleteBaiduChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/apps/{ApplicationId}/channels/baidu",
    input: { ApplicationId: 0 },
    output: { BaiduChannelResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBaiduChannel",
})) as any;

export type DeleteCampaignError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a campaign from an application.
 */
export const deleteCampaign: API.OperationMethod<
  DeleteCampaignRequest,
  DeleteCampaignResponse,
  DeleteCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/apps/{ApplicationId}/campaigns/{CampaignId}",
    input: { ApplicationId: 0, CampaignId: 0 },
    output: { CampaignResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCampaign",
})) as any;

export type DeleteEmailChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Disables the email channel for an application and deletes any existing settings for the channel.
 */
export const deleteEmailChannel: API.OperationMethod<
  DeleteEmailChannelRequest,
  DeleteEmailChannelResponse,
  DeleteEmailChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/apps/{ApplicationId}/channels/email",
    input: { ApplicationId: 0 },
    output: { EmailChannelResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEmailChannel",
})) as any;

export type DeleteEmailTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a message template for messages that were sent through the email channel.
 */
export const deleteEmailTemplate: API.OperationMethod<
  DeleteEmailTemplateRequest,
  DeleteEmailTemplateResponse,
  DeleteEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/templates/{TemplateName}/email",
    input: { TemplateName: 0, Version: D.m({ query: "version" }) },
    output: { MessageBody: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEmailTemplate",
})) as any;

export type DeleteEndpointError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an endpoint from an application.
 */
export const deleteEndpoint: API.OperationMethod<
  DeleteEndpointRequest,
  DeleteEndpointResponse,
  DeleteEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/apps/{ApplicationId}/endpoints/{EndpointId}",
    input: { ApplicationId: 0, EndpointId: 0 },
    output: { EndpointResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEndpoint",
})) as any;

export type DeleteEventStreamError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the event stream for an application.
 */
export const deleteEventStream: API.OperationMethod<
  DeleteEventStreamRequest,
  DeleteEventStreamResponse,
  DeleteEventStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/apps/{ApplicationId}/eventstream",
    input: { ApplicationId: 0 },
    output: { EventStream: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventStream",
})) as any;

export type DeleteGcmChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Disables the GCM channel for an application and deletes any existing settings for the channel.
 */
export const deleteGcmChannel: API.OperationMethod<
  DeleteGcmChannelRequest,
  DeleteGcmChannelResponse,
  DeleteGcmChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/apps/{ApplicationId}/channels/gcm",
    input: { ApplicationId: 0 },
    output: { GCMChannelResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGcmChannel",
})) as any;

export type DeleteInAppTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a message template for messages sent using the in-app message channel.
 */
export const deleteInAppTemplate: API.OperationMethod<
  DeleteInAppTemplateRequest,
  DeleteInAppTemplateResponse,
  DeleteInAppTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/templates/{TemplateName}/inapp",
    input: { TemplateName: 0, Version: D.m({ query: "version" }) },
    output: { MessageBody: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInAppTemplate",
})) as any;

export type DeleteJourneyError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a journey from an application.
 */
export const deleteJourney: API.OperationMethod<
  DeleteJourneyRequest,
  DeleteJourneyResponse,
  DeleteJourneyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/apps/{ApplicationId}/journeys/{JourneyId}",
    input: { ApplicationId: 0, JourneyId: 0 },
    output: {
      JourneyResponse: D.m({ payload: true, shape: o_JourneyResponse }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJourney",
})) as any;

export type DeletePushTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a message template for messages that were sent through a push notification channel.
 */
export const deletePushTemplate: API.OperationMethod<
  DeletePushTemplateRequest,
  DeletePushTemplateResponse,
  DeletePushTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/templates/{TemplateName}/push",
    input: { TemplateName: 0, Version: D.m({ query: "version" }) },
    output: { MessageBody: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePushTemplate",
})) as any;

export type DeleteRecommenderConfigurationError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an Amazon Pinpoint configuration for a recommender model.
 */
export const deleteRecommenderConfiguration: API.OperationMethod<
  DeleteRecommenderConfigurationRequest,
  DeleteRecommenderConfigurationResponse,
  DeleteRecommenderConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/recommenders/{RecommenderId}",
    input: { RecommenderId: 0 },
    output: { RecommenderConfigurationResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRecommenderConfiguration",
})) as any;

export type DeleteSegmentError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a segment from an application.
 */
export const deleteSegment: API.OperationMethod<
  DeleteSegmentRequest,
  DeleteSegmentResponse,
  DeleteSegmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/apps/{ApplicationId}/segments/{SegmentId}",
    input: { ApplicationId: 0, SegmentId: 0 },
    output: { SegmentResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSegment",
})) as any;

export type DeleteSmsChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Disables the SMS channel for an application and deletes any existing settings for the channel.
 */
export const deleteSmsChannel: API.OperationMethod<
  DeleteSmsChannelRequest,
  DeleteSmsChannelResponse,
  DeleteSmsChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/apps/{ApplicationId}/channels/sms",
    input: { ApplicationId: 0 },
    output: { SMSChannelResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSmsChannel",
})) as any;

export type DeleteSmsTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a message template for messages that were sent through the SMS channel.
 */
export const deleteSmsTemplate: API.OperationMethod<
  DeleteSmsTemplateRequest,
  DeleteSmsTemplateResponse,
  DeleteSmsTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/templates/{TemplateName}/sms",
    input: { TemplateName: 0, Version: D.m({ query: "version" }) },
    output: { MessageBody: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSmsTemplate",
})) as any;

export type DeleteUserEndpointsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes all the endpoints that are associated with a specific user ID.
 */
export const deleteUserEndpoints: API.OperationMethod<
  DeleteUserEndpointsRequest,
  DeleteUserEndpointsResponse,
  DeleteUserEndpointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/apps/{ApplicationId}/users/{UserId}",
    input: { ApplicationId: 0, UserId: 0 },
    output: { EndpointsResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserEndpoints",
})) as any;

export type DeleteVoiceChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Disables the voice channel for an application and deletes any existing settings for the channel.
 */
export const deleteVoiceChannel: API.OperationMethod<
  DeleteVoiceChannelRequest,
  DeleteVoiceChannelResponse,
  DeleteVoiceChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/apps/{ApplicationId}/channels/voice",
    input: { ApplicationId: 0 },
    output: { VoiceChannelResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVoiceChannel",
})) as any;

export type DeleteVoiceTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a message template for messages that were sent through the voice channel.
 */
export const deleteVoiceTemplate: API.OperationMethod<
  DeleteVoiceTemplateRequest,
  DeleteVoiceTemplateResponse,
  DeleteVoiceTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/templates/{TemplateName}/voice",
    input: { TemplateName: 0, Version: D.m({ query: "version" }) },
    output: { MessageBody: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVoiceTemplate",
})) as any;

export type GetAdmChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of the ADM channel for an application.
 */
export const getAdmChannel: API.OperationMethod<
  GetAdmChannelRequest,
  GetAdmChannelResponse,
  GetAdmChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/channels/adm",
    input: { ApplicationId: 0 },
    output: { ADMChannelResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAdmChannel",
})) as any;

export type GetApnsChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of the APNs channel for an application.
 */
export const getApnsChannel: API.OperationMethod<
  GetApnsChannelRequest,
  GetApnsChannelResponse,
  GetApnsChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/channels/apns",
    input: { ApplicationId: 0 },
    output: { APNSChannelResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApnsChannel",
})) as any;

export type GetApnsSandboxChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of the APNs sandbox channel for an application.
 */
export const getApnsSandboxChannel: API.OperationMethod<
  GetApnsSandboxChannelRequest,
  GetApnsSandboxChannelResponse,
  GetApnsSandboxChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/channels/apns_sandbox",
    input: { ApplicationId: 0 },
    output: { APNSSandboxChannelResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApnsSandboxChannel",
})) as any;

export type GetApnsVoipChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of the APNs VoIP channel for an application.
 */
export const getApnsVoipChannel: API.OperationMethod<
  GetApnsVoipChannelRequest,
  GetApnsVoipChannelResponse,
  GetApnsVoipChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/channels/apns_voip",
    input: { ApplicationId: 0 },
    output: { APNSVoipChannelResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApnsVoipChannel",
})) as any;

export type GetApnsVoipSandboxChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of the APNs VoIP sandbox channel for an application.
 */
export const getApnsVoipSandboxChannel: API.OperationMethod<
  GetApnsVoipSandboxChannelRequest,
  GetApnsVoipSandboxChannelResponse,
  GetApnsVoipSandboxChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/channels/apns_voip_sandbox",
    input: { ApplicationId: 0 },
    output: { APNSVoipSandboxChannelResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApnsVoipSandboxChannel",
})) as any;

export type GetAppError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about an application.
 */
export const getApp: API.OperationMethod<
  GetAppRequest,
  GetAppResponse,
  GetAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}",
    input: { ApplicationId: 0 },
    output: { ApplicationResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApp",
})) as any;

export type GetApplicationDateRangeKpiError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves (queries) pre-aggregated data for a standard metric that applies to an application.
 */
export const getApplicationDateRangeKpi: API.OperationMethod<
  GetApplicationDateRangeKpiRequest,
  GetApplicationDateRangeKpiResponse,
  GetApplicationDateRangeKpiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/kpis/daterange/{KpiName}",
    input: {
      ApplicationId: 0,
      EndTime: D.m({ query: "end-time" }),
      KpiName: 0,
      NextToken: D.m({ query: "next-token" }),
      PageSize: D.m({ query: "page-size" }),
      StartTime: D.m({ query: "start-time" }),
    },
    output: {
      ApplicationDateRangeKpiResponse: D.m({
        payload: true,
        shape: { EndTime: D.ts, StartTime: D.ts },
      }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplicationDateRangeKpi",
})) as any;

export type GetApplicationSettingsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the settings for an application.
 */
export const getApplicationSettings: API.OperationMethod<
  GetApplicationSettingsRequest,
  GetApplicationSettingsResponse,
  GetApplicationSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/settings",
    input: { ApplicationId: 0 },
    output: { ApplicationSettingsResource: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplicationSettings",
})) as any;

export type GetAppsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about all the applications that are associated with your Amazon Pinpoint account.
 */
export const getApps: API.OperationMethod<
  GetAppsRequest,
  GetAppsResponse,
  GetAppsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps",
    input: {
      PageSize: D.m({ query: "page-size" }),
      Token: D.m({ query: "token" }),
    },
    output: { ApplicationsResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApps",
})) as any;

export type GetBaiduChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of the Baidu channel for an application.
 */
export const getBaiduChannel: API.OperationMethod<
  GetBaiduChannelRequest,
  GetBaiduChannelResponse,
  GetBaiduChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/channels/baidu",
    input: { ApplicationId: 0 },
    output: { BaiduChannelResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBaiduChannel",
})) as any;

export type GetCampaignError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status, configuration, and other settings for a campaign.
 */
export const getCampaign: API.OperationMethod<
  GetCampaignRequest,
  GetCampaignResponse,
  GetCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/campaigns/{CampaignId}",
    input: { ApplicationId: 0, CampaignId: 0 },
    output: { CampaignResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCampaign",
})) as any;

export type GetCampaignActivitiesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about all the activities for a campaign.
 */
export const getCampaignActivities: API.OperationMethod<
  GetCampaignActivitiesRequest,
  GetCampaignActivitiesResponse,
  GetCampaignActivitiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/campaigns/{CampaignId}/activities",
    input: {
      ApplicationId: 0,
      CampaignId: 0,
      PageSize: D.m({ query: "page-size" }),
      Token: D.m({ query: "token" }),
    },
    output: { ActivitiesResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCampaignActivities",
})) as any;

export type GetCampaignDateRangeKpiError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves (queries) pre-aggregated data for a standard metric that applies to a campaign.
 */
export const getCampaignDateRangeKpi: API.OperationMethod<
  GetCampaignDateRangeKpiRequest,
  GetCampaignDateRangeKpiResponse,
  GetCampaignDateRangeKpiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/campaigns/{CampaignId}/kpis/daterange/{KpiName}",
    input: {
      ApplicationId: 0,
      CampaignId: 0,
      EndTime: D.m({ query: "end-time" }),
      KpiName: 0,
      NextToken: D.m({ query: "next-token" }),
      PageSize: D.m({ query: "page-size" }),
      StartTime: D.m({ query: "start-time" }),
    },
    output: {
      CampaignDateRangeKpiResponse: D.m({
        payload: true,
        shape: { EndTime: D.ts, StartTime: D.ts },
      }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCampaignDateRangeKpi",
})) as any;

export type GetCampaignsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status, configuration, and other settings for all the campaigns that are associated with an application.
 */
export const getCampaigns: API.OperationMethod<
  GetCampaignsRequest,
  GetCampaignsResponse,
  GetCampaignsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/campaigns",
    input: {
      ApplicationId: 0,
      PageSize: D.m({ query: "page-size" }),
      Token: D.m({ query: "token" }),
    },
    output: { CampaignsResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCampaigns",
})) as any;

export type GetCampaignVersionError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status, configuration, and other settings for a specific version of a campaign.
 */
export const getCampaignVersion: API.OperationMethod<
  GetCampaignVersionRequest,
  GetCampaignVersionResponse,
  GetCampaignVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/campaigns/{CampaignId}/versions/{Version}",
    input: { ApplicationId: 0, CampaignId: 0, Version: 0 },
    output: { CampaignResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCampaignVersion",
})) as any;

export type GetCampaignVersionsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status, configuration, and other settings for all versions of a campaign.
 */
export const getCampaignVersions: API.OperationMethod<
  GetCampaignVersionsRequest,
  GetCampaignVersionsResponse,
  GetCampaignVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/campaigns/{CampaignId}/versions",
    input: {
      ApplicationId: 0,
      CampaignId: 0,
      PageSize: D.m({ query: "page-size" }),
      Token: D.m({ query: "token" }),
    },
    output: { CampaignsResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCampaignVersions",
})) as any;

export type GetChannelsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the history and status of each channel for an application.
 */
export const getChannels: API.OperationMethod<
  GetChannelsRequest,
  GetChannelsResponse,
  GetChannelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/channels",
    input: { ApplicationId: 0 },
    output: { ChannelsResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChannels",
})) as any;

export type GetEmailChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of the email channel for an application.
 */
export const getEmailChannel: API.OperationMethod<
  GetEmailChannelRequest,
  GetEmailChannelResponse,
  GetEmailChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/channels/email",
    input: { ApplicationId: 0 },
    output: { EmailChannelResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEmailChannel",
})) as any;

export type GetEmailTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the content and settings of a message template for messages that are sent through the email channel.
 */
export const getEmailTemplate: API.OperationMethod<
  GetEmailTemplateRequest,
  GetEmailTemplateResponse,
  GetEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/templates/{TemplateName}/email",
    input: { TemplateName: 0, Version: D.m({ query: "version" }) },
    output: { EmailTemplateResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEmailTemplate",
})) as any;

export type GetEndpointError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the settings and attributes of a specific endpoint for an application.
 */
export const getEndpoint: API.OperationMethod<
  GetEndpointRequest,
  GetEndpointResponse,
  GetEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/endpoints/{EndpointId}",
    input: { ApplicationId: 0, EndpointId: 0 },
    output: { EndpointResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEndpoint",
})) as any;

export type GetEventStreamError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the event stream settings for an application.
 */
export const getEventStream: API.OperationMethod<
  GetEventStreamRequest,
  GetEventStreamResponse,
  GetEventStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/eventstream",
    input: { ApplicationId: 0 },
    output: { EventStream: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventStream",
})) as any;

export type GetExportJobError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of a specific export job for an application.
 */
export const getExportJob: API.OperationMethod<
  GetExportJobRequest,
  GetExportJobResponse,
  GetExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/jobs/export/{JobId}",
    input: { ApplicationId: 0, JobId: 0 },
    output: { ExportJobResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExportJob",
})) as any;

export type GetExportJobsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of all the export jobs for an application.
 */
export const getExportJobs: API.OperationMethod<
  GetExportJobsRequest,
  GetExportJobsResponse,
  GetExportJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/jobs/export",
    input: {
      ApplicationId: 0,
      PageSize: D.m({ query: "page-size" }),
      Token: D.m({ query: "token" }),
    },
    output: { ExportJobsResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExportJobs",
})) as any;

export type GetGcmChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of the GCM channel for an application.
 */
export const getGcmChannel: API.OperationMethod<
  GetGcmChannelRequest,
  GetGcmChannelResponse,
  GetGcmChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/channels/gcm",
    input: { ApplicationId: 0 },
    output: { GCMChannelResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGcmChannel",
})) as any;

export type GetImportJobError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of a specific import job for an application.
 */
export const getImportJob: API.OperationMethod<
  GetImportJobRequest,
  GetImportJobResponse,
  GetImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/jobs/import/{JobId}",
    input: { ApplicationId: 0, JobId: 0 },
    output: { ImportJobResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImportJob",
})) as any;

export type GetImportJobsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of all the import jobs for an application.
 */
export const getImportJobs: API.OperationMethod<
  GetImportJobsRequest,
  GetImportJobsResponse,
  GetImportJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/jobs/import",
    input: {
      ApplicationId: 0,
      PageSize: D.m({ query: "page-size" }),
      Token: D.m({ query: "token" }),
    },
    output: { ImportJobsResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImportJobs",
})) as any;

export type GetInAppMessagesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the in-app messages targeted for the provided endpoint ID.
 */
export const getInAppMessages: API.OperationMethod<
  GetInAppMessagesRequest,
  GetInAppMessagesResponse,
  GetInAppMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/endpoints/{EndpointId}/inappmessages",
    input: { ApplicationId: 0, EndpointId: 0 },
    output: { InAppMessagesResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInAppMessages",
})) as any;

export type GetInAppTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the content and settings of a message template for messages sent through the in-app channel.
 */
export const getInAppTemplate: API.OperationMethod<
  GetInAppTemplateRequest,
  GetInAppTemplateResponse,
  GetInAppTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/templates/{TemplateName}/inapp",
    input: { TemplateName: 0, Version: D.m({ query: "version" }) },
    output: { InAppTemplateResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInAppTemplate",
})) as any;

export type GetJourneyError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status, configuration, and other settings for a journey.
 */
export const getJourney: API.OperationMethod<
  GetJourneyRequest,
  GetJourneyResponse,
  GetJourneyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/journeys/{JourneyId}",
    input: { ApplicationId: 0, JourneyId: 0 },
    output: {
      JourneyResponse: D.m({ payload: true, shape: o_JourneyResponse }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJourney",
})) as any;

export type GetJourneyDateRangeKpiError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves (queries) pre-aggregated data for a standard engagement metric that applies to a journey.
 */
export const getJourneyDateRangeKpi: API.OperationMethod<
  GetJourneyDateRangeKpiRequest,
  GetJourneyDateRangeKpiResponse,
  GetJourneyDateRangeKpiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/journeys/{JourneyId}/kpis/daterange/{KpiName}",
    input: {
      ApplicationId: 0,
      EndTime: D.m({ query: "end-time" }),
      JourneyId: 0,
      KpiName: 0,
      NextToken: D.m({ query: "next-token" }),
      PageSize: D.m({ query: "page-size" }),
      StartTime: D.m({ query: "start-time" }),
    },
    output: {
      JourneyDateRangeKpiResponse: D.m({
        payload: true,
        shape: { EndTime: D.ts, StartTime: D.ts },
      }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJourneyDateRangeKpi",
})) as any;

export type GetJourneyExecutionActivityMetricsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves (queries) pre-aggregated data for a standard execution metric that applies to a journey activity.
 */
export const getJourneyExecutionActivityMetrics: API.OperationMethod<
  GetJourneyExecutionActivityMetricsRequest,
  GetJourneyExecutionActivityMetricsResponse,
  GetJourneyExecutionActivityMetricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/journeys/{JourneyId}/activities/{JourneyActivityId}/execution-metrics",
    input: {
      ApplicationId: 0,
      JourneyActivityId: 0,
      JourneyId: 0,
      NextToken: D.m({ query: "next-token" }),
      PageSize: D.m({ query: "page-size" }),
    },
    output: { JourneyExecutionActivityMetricsResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJourneyExecutionActivityMetrics",
})) as any;

export type GetJourneyExecutionMetricsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves (queries) pre-aggregated data for a standard execution metric that applies to a journey.
 */
export const getJourneyExecutionMetrics: API.OperationMethod<
  GetJourneyExecutionMetricsRequest,
  GetJourneyExecutionMetricsResponse,
  GetJourneyExecutionMetricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/journeys/{JourneyId}/execution-metrics",
    input: {
      ApplicationId: 0,
      JourneyId: 0,
      NextToken: D.m({ query: "next-token" }),
      PageSize: D.m({ query: "page-size" }),
    },
    output: { JourneyExecutionMetricsResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJourneyExecutionMetrics",
})) as any;

export type GetJourneyRunExecutionActivityMetricsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves (queries) pre-aggregated data for a standard run execution metric that applies to a journey activity.
 */
export const getJourneyRunExecutionActivityMetrics: API.OperationMethod<
  GetJourneyRunExecutionActivityMetricsRequest,
  GetJourneyRunExecutionActivityMetricsResponse,
  GetJourneyRunExecutionActivityMetricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/journeys/{JourneyId}/runs/{RunId}/activities/{JourneyActivityId}/execution-metrics",
    input: {
      ApplicationId: 0,
      JourneyActivityId: 0,
      JourneyId: 0,
      NextToken: D.m({ query: "next-token" }),
      PageSize: D.m({ query: "page-size" }),
      RunId: 0,
    },
    output: {
      JourneyRunExecutionActivityMetricsResponse: D.m({ payload: true }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJourneyRunExecutionActivityMetrics",
})) as any;

export type GetJourneyRunExecutionMetricsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves (queries) pre-aggregated data for a standard run execution metric that applies to a journey.
 */
export const getJourneyRunExecutionMetrics: API.OperationMethod<
  GetJourneyRunExecutionMetricsRequest,
  GetJourneyRunExecutionMetricsResponse,
  GetJourneyRunExecutionMetricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/journeys/{JourneyId}/runs/{RunId}/execution-metrics",
    input: {
      ApplicationId: 0,
      JourneyId: 0,
      NextToken: D.m({ query: "next-token" }),
      PageSize: D.m({ query: "page-size" }),
      RunId: 0,
    },
    output: { JourneyRunExecutionMetricsResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJourneyRunExecutionMetrics",
})) as any;

export type GetJourneyRunsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Provides information about the runs of a journey.
 */
export const getJourneyRuns: API.OperationMethod<
  GetJourneyRunsRequest,
  GetJourneyRunsResponse,
  GetJourneyRunsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/journeys/{JourneyId}/runs",
    input: {
      ApplicationId: 0,
      JourneyId: 0,
      PageSize: D.m({ query: "page-size" }),
      Token: D.m({ query: "token" }),
    },
    output: { JourneyRunsResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJourneyRuns",
})) as any;

export type GetPushTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the content and settings of a message template for messages that are sent through a push notification channel.
 */
export const getPushTemplate: API.OperationMethod<
  GetPushTemplateRequest,
  GetPushTemplateResponse,
  GetPushTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/templates/{TemplateName}/push",
    input: { TemplateName: 0, Version: D.m({ query: "version" }) },
    output: { PushNotificationTemplateResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPushTemplate",
})) as any;

export type GetRecommenderConfigurationError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about an Amazon Pinpoint configuration for a recommender model.
 */
export const getRecommenderConfiguration: API.OperationMethod<
  GetRecommenderConfigurationRequest,
  GetRecommenderConfigurationResponse,
  GetRecommenderConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/recommenders/{RecommenderId}",
    input: { RecommenderId: 0 },
    output: { RecommenderConfigurationResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecommenderConfiguration",
})) as any;

export type GetRecommenderConfigurationsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about all the recommender model configurations that are associated with your Amazon Pinpoint account.
 */
export const getRecommenderConfigurations: API.OperationMethod<
  GetRecommenderConfigurationsRequest,
  GetRecommenderConfigurationsResponse,
  GetRecommenderConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/recommenders",
    input: {
      PageSize: D.m({ query: "page-size" }),
      Token: D.m({ query: "token" }),
    },
    output: { ListRecommenderConfigurationsResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecommenderConfigurations",
})) as any;

export type GetSegmentError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the configuration, dimension, and other settings for a specific segment that's associated with an application.
 */
export const getSegment: API.OperationMethod<
  GetSegmentRequest,
  GetSegmentResponse,
  GetSegmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/segments/{SegmentId}",
    input: { ApplicationId: 0, SegmentId: 0 },
    output: { SegmentResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSegment",
})) as any;

export type GetSegmentExportJobsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of the export jobs for a segment.
 */
export const getSegmentExportJobs: API.OperationMethod<
  GetSegmentExportJobsRequest,
  GetSegmentExportJobsResponse,
  GetSegmentExportJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/segments/{SegmentId}/jobs/export",
    input: {
      ApplicationId: 0,
      PageSize: D.m({ query: "page-size" }),
      SegmentId: 0,
      Token: D.m({ query: "token" }),
    },
    output: { ExportJobsResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSegmentExportJobs",
})) as any;

export type GetSegmentImportJobsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of the import jobs for a segment.
 */
export const getSegmentImportJobs: API.OperationMethod<
  GetSegmentImportJobsRequest,
  GetSegmentImportJobsResponse,
  GetSegmentImportJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/segments/{SegmentId}/jobs/import",
    input: {
      ApplicationId: 0,
      PageSize: D.m({ query: "page-size" }),
      SegmentId: 0,
      Token: D.m({ query: "token" }),
    },
    output: { ImportJobsResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSegmentImportJobs",
})) as any;

export type GetSegmentsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the configuration, dimension, and other settings for all the segments that are associated with an application.
 */
export const getSegments: API.OperationMethod<
  GetSegmentsRequest,
  GetSegmentsResponse,
  GetSegmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/segments",
    input: {
      ApplicationId: 0,
      PageSize: D.m({ query: "page-size" }),
      Token: D.m({ query: "token" }),
    },
    output: { SegmentsResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSegments",
})) as any;

export type GetSegmentVersionError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the configuration, dimension, and other settings for a specific version of a segment that's associated with an application.
 */
export const getSegmentVersion: API.OperationMethod<
  GetSegmentVersionRequest,
  GetSegmentVersionResponse,
  GetSegmentVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/segments/{SegmentId}/versions/{Version}",
    input: { ApplicationId: 0, SegmentId: 0, Version: 0 },
    output: { SegmentResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSegmentVersion",
})) as any;

export type GetSegmentVersionsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the configuration, dimension, and other settings for all the versions of a specific segment that's associated with an application.
 */
export const getSegmentVersions: API.OperationMethod<
  GetSegmentVersionsRequest,
  GetSegmentVersionsResponse,
  GetSegmentVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/segments/{SegmentId}/versions",
    input: {
      ApplicationId: 0,
      PageSize: D.m({ query: "page-size" }),
      SegmentId: 0,
      Token: D.m({ query: "token" }),
    },
    output: { SegmentsResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSegmentVersions",
})) as any;

export type GetSmsChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of the SMS channel for an application.
 */
export const getSmsChannel: API.OperationMethod<
  GetSmsChannelRequest,
  GetSmsChannelResponse,
  GetSmsChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/channels/sms",
    input: { ApplicationId: 0 },
    output: { SMSChannelResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSmsChannel",
})) as any;

export type GetSmsTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the content and settings of a message template for messages that are sent through the SMS channel.
 */
export const getSmsTemplate: API.OperationMethod<
  GetSmsTemplateRequest,
  GetSmsTemplateResponse,
  GetSmsTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/templates/{TemplateName}/sms",
    input: { TemplateName: 0, Version: D.m({ query: "version" }) },
    output: { SMSTemplateResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSmsTemplate",
})) as any;

export type GetUserEndpointsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about all the endpoints that are associated with a specific user ID.
 */
export const getUserEndpoints: API.OperationMethod<
  GetUserEndpointsRequest,
  GetUserEndpointsResponse,
  GetUserEndpointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/users/{UserId}",
    input: { ApplicationId: 0, UserId: 0 },
    output: { EndpointsResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserEndpoints",
})) as any;

export type GetVoiceChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of the voice channel for an application.
 */
export const getVoiceChannel: API.OperationMethod<
  GetVoiceChannelRequest,
  GetVoiceChannelResponse,
  GetVoiceChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/channels/voice",
    input: { ApplicationId: 0 },
    output: { VoiceChannelResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVoiceChannel",
})) as any;

export type GetVoiceTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the content and settings of a message template for messages that are sent through the voice channel.
 */
export const getVoiceTemplate: API.OperationMethod<
  GetVoiceTemplateRequest,
  GetVoiceTemplateResponse,
  GetVoiceTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/templates/{TemplateName}/voice",
    input: { TemplateName: 0, Version: D.m({ query: "version" }) },
    output: { VoiceTemplateResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVoiceTemplate",
})) as any;

export type ListJourneysError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status, configuration, and other settings for all the journeys that are associated with an application.
 */
export const listJourneys: API.OperationMethod<
  ListJourneysRequest,
  ListJourneysResponse,
  ListJourneysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/apps/{ApplicationId}/journeys",
    input: {
      ApplicationId: 0,
      PageSize: D.m({ query: "page-size" }),
      Token: D.m({ query: "token" }),
    },
    output: {
      JourneysResponse: D.m({
        payload: true,
        shape: { Item: D.list(o_JourneyResponse) },
      }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJourneys",
})) as any;

export type ListTagsForResourceError = CommonErrors;
/**
 * Retrieves all the tags (keys and values) that are associated with an application, campaign, message template, or segment.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/tags/{ResourceArn}",
    input: { ResourceArn: 0 },
    output: { TagsModel: D.m({ payload: true }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListTemplatesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about all the message templates that are associated with your Amazon Pinpoint account.
 */
export const listTemplates: API.OperationMethod<
  ListTemplatesRequest,
  ListTemplatesResponse,
  ListTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/templates",
    input: {
      NextToken: D.m({ query: "next-token" }),
      PageSize: D.m({ query: "page-size" }),
      Prefix: D.m({ query: "prefix" }),
      TemplateType: D.m({ query: "template-type" }),
    },
    output: { TemplatesResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTemplates",
})) as any;

export type ListTemplateVersionsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about all the versions of a specific message template.
 */
export const listTemplateVersions: API.OperationMethod<
  ListTemplateVersionsRequest,
  ListTemplateVersionsResponse,
  ListTemplateVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/templates/{TemplateName}/{TemplateType}/versions",
    input: {
      NextToken: D.m({ query: "next-token" }),
      PageSize: D.m({ query: "page-size" }),
      TemplateName: 0,
      TemplateType: 0,
    },
    output: { TemplateVersionsResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTemplateVersions",
})) as any;

export type PhoneNumberValidateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about a phone number.
 */
export const phoneNumberValidate: API.OperationMethod<
  PhoneNumberValidateRequest,
  PhoneNumberValidateResponse,
  PhoneNumberValidateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/phone/number/validate",
    input: {
      NumberValidateRequest: D.m({
        payload: true,
        shape: { IsoCountryCode: 0, PhoneNumber: 0 },
      }),
    },
    output: { NumberValidateResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PhoneNumberValidate",
})) as any;

export type PutEventsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new event to record for endpoints, or creates or updates endpoint data that existing events are associated with.
 */
export const putEvents: API.OperationMethod<
  PutEventsRequest,
  PutEventsResponse,
  PutEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/apps/{ApplicationId}/events",
    input: {
      ApplicationId: 0,
      EventsRequest: D.m({
        payload: true,
        shape: {
          BatchItem: D.map({
            Endpoint: {
              Address: 0,
              Attributes: 0,
              ChannelType: 0,
              Demographic: i_EndpointDemographic,
              EffectiveDate: 0,
              EndpointStatus: 0,
              Location: i_EndpointLocation,
              Metrics: 0,
              OptOut: 0,
              RequestId: 0,
              User: i_EndpointUser,
            },
            Events: D.map({
              AppPackageName: 0,
              AppTitle: 0,
              AppVersionCode: 0,
              Attributes: 0,
              ClientSdkVersion: 0,
              EventType: 0,
              Metrics: 0,
              SdkName: 0,
              Session: {
                Duration: 0,
                Id: 0,
                StartTimestamp: 0,
                StopTimestamp: 0,
              },
              Timestamp: 0,
            }),
          }),
        },
      }),
    },
    output: { EventsResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEvents",
})) as any;

export type PutEventStreamError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new event stream for an application or updates the settings of an existing event stream for an application.
 */
export const putEventStream: API.OperationMethod<
  PutEventStreamRequest,
  PutEventStreamResponse,
  PutEventStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/apps/{ApplicationId}/eventstream",
    input: {
      ApplicationId: 0,
      WriteEventStream: D.m({
        payload: true,
        shape: { DestinationStreamArn: 0, RoleArn: 0 },
      }),
    },
    output: { EventStream: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEventStream",
})) as any;

export type RemoveAttributesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes one or more custom attributes, of the same attribute type, from the application. Existing endpoints still have the attributes but Amazon Pinpoint will stop capturing new or changed values for these attributes.
 */
export const removeAttributes: API.OperationMethod<
  RemoveAttributesRequest,
  RemoveAttributesResponse,
  RemoveAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/apps/{ApplicationId}/attributes/{AttributeType}",
    input: {
      ApplicationId: 0,
      AttributeType: 0,
      UpdateAttributesRequest: D.m({ payload: true, shape: { Blacklist: 0 } }),
    },
    output: { AttributesResource: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveAttributes",
})) as any;

export type SendMessagesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates and sends a direct message.
 */
export const sendMessages: API.OperationMethod<
  SendMessagesRequest,
  SendMessagesResponse,
  SendMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/apps/{ApplicationId}/messages",
    input: {
      ApplicationId: 0,
      MessageRequest: D.m({
        payload: true,
        shape: {
          Addresses: D.map({
            BodyOverride: 0,
            ChannelType: 0,
            Context: 0,
            RawContent: 0,
            Substitutions: 0,
            TitleOverride: 0,
          }),
          Context: 0,
          Endpoints: D.map(i_EndpointSendConfiguration),
          MessageConfiguration: i_DirectMessageConfiguration,
          TemplateConfiguration: i_TemplateConfiguration,
          TraceId: 0,
        },
      }),
    },
    output: { MessageResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendMessages",
})) as any;

export type SendOTPMessageError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Send an OTP message
 */
export const sendOTPMessage: API.OperationMethod<
  SendOTPMessageRequest,
  SendOTPMessageResponse,
  SendOTPMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/apps/{ApplicationId}/otp",
    input: {
      ApplicationId: 0,
      SendOTPMessageRequestParameters: D.m({
        payload: true,
        shape: {
          AllowedAttempts: 0,
          BrandName: 0,
          Channel: 0,
          CodeLength: 0,
          DestinationIdentity: 0,
          EntityId: 0,
          Language: 0,
          OriginationIdentity: 0,
          ReferenceId: 0,
          TemplateId: 0,
          ValidityPeriod: 0,
        },
      }),
    },
    output: { MessageResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendOTPMessage",
})) as any;

export type SendUsersMessagesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates and sends a message to a list of users.
 */
export const sendUsersMessages: API.OperationMethod<
  SendUsersMessagesRequest,
  SendUsersMessagesResponse,
  SendUsersMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/apps/{ApplicationId}/users-messages",
    input: {
      ApplicationId: 0,
      SendUsersMessageRequest: D.m({
        payload: true,
        shape: {
          Context: 0,
          MessageConfiguration: i_DirectMessageConfiguration,
          TemplateConfiguration: i_TemplateConfiguration,
          TraceId: 0,
          Users: D.map(i_EndpointSendConfiguration),
        },
      }),
    },
    output: { SendUsersMessageResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendUsersMessages",
})) as any;

export type TagResourceError = CommonErrors;
/**
 * Adds one or more tags (keys and values) to an application, campaign, message template, or segment.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/tags/{ResourceArn}",
    input: {
      ResourceArn: 0,
      TagsModel: D.m({ payload: true, shape: { tags: 0 } }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError = CommonErrors;
/**
 * Removes one or more tags (keys and values) from an application, campaign, message template, or segment.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAdmChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enables the ADM channel for an application or updates the status and settings of the ADM channel for an application.
 */
export const updateAdmChannel: API.OperationMethod<
  UpdateAdmChannelRequest,
  UpdateAdmChannelResponse,
  UpdateAdmChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/apps/{ApplicationId}/channels/adm",
    input: {
      ADMChannelRequest: D.m({
        payload: true,
        shape: { ClientId: 0, ClientSecret: 0, Enabled: 0 },
      }),
      ApplicationId: 0,
    },
    output: { ADMChannelResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAdmChannel",
})) as any;

export type UpdateApnsChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enables the APNs channel for an application or updates the status and settings of the APNs channel for an application.
 */
export const updateApnsChannel: API.OperationMethod<
  UpdateApnsChannelRequest,
  UpdateApnsChannelResponse,
  UpdateApnsChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/apps/{ApplicationId}/channels/apns",
    input: {
      APNSChannelRequest: D.m({
        payload: true,
        shape: {
          BundleId: 0,
          Certificate: 0,
          DefaultAuthenticationMethod: 0,
          Enabled: 0,
          PrivateKey: 0,
          TeamId: 0,
          TokenKey: 0,
          TokenKeyId: 0,
        },
      }),
      ApplicationId: 0,
    },
    output: { APNSChannelResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApnsChannel",
})) as any;

export type UpdateApnsSandboxChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enables the APNs sandbox channel for an application or updates the status and settings of the APNs sandbox channel for an application.
 */
export const updateApnsSandboxChannel: API.OperationMethod<
  UpdateApnsSandboxChannelRequest,
  UpdateApnsSandboxChannelResponse,
  UpdateApnsSandboxChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/apps/{ApplicationId}/channels/apns_sandbox",
    input: {
      APNSSandboxChannelRequest: D.m({
        payload: true,
        shape: {
          BundleId: 0,
          Certificate: 0,
          DefaultAuthenticationMethod: 0,
          Enabled: 0,
          PrivateKey: 0,
          TeamId: 0,
          TokenKey: 0,
          TokenKeyId: 0,
        },
      }),
      ApplicationId: 0,
    },
    output: { APNSSandboxChannelResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApnsSandboxChannel",
})) as any;

export type UpdateApnsVoipChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enables the APNs VoIP channel for an application or updates the status and settings of the APNs VoIP channel for an application.
 */
export const updateApnsVoipChannel: API.OperationMethod<
  UpdateApnsVoipChannelRequest,
  UpdateApnsVoipChannelResponse,
  UpdateApnsVoipChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/apps/{ApplicationId}/channels/apns_voip",
    input: {
      APNSVoipChannelRequest: D.m({
        payload: true,
        shape: {
          BundleId: 0,
          Certificate: 0,
          DefaultAuthenticationMethod: 0,
          Enabled: 0,
          PrivateKey: 0,
          TeamId: 0,
          TokenKey: 0,
          TokenKeyId: 0,
        },
      }),
      ApplicationId: 0,
    },
    output: { APNSVoipChannelResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApnsVoipChannel",
})) as any;

export type UpdateApnsVoipSandboxChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enables the APNs VoIP sandbox channel for an application or updates the status and settings of the APNs VoIP sandbox channel for an application.
 */
export const updateApnsVoipSandboxChannel: API.OperationMethod<
  UpdateApnsVoipSandboxChannelRequest,
  UpdateApnsVoipSandboxChannelResponse,
  UpdateApnsVoipSandboxChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/apps/{ApplicationId}/channels/apns_voip_sandbox",
    input: {
      APNSVoipSandboxChannelRequest: D.m({
        payload: true,
        shape: {
          BundleId: 0,
          Certificate: 0,
          DefaultAuthenticationMethod: 0,
          Enabled: 0,
          PrivateKey: 0,
          TeamId: 0,
          TokenKey: 0,
          TokenKeyId: 0,
        },
      }),
      ApplicationId: 0,
    },
    output: { APNSVoipSandboxChannelResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApnsVoipSandboxChannel",
})) as any;

export type UpdateApplicationSettingsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the settings for an application.
 */
export const updateApplicationSettings: API.OperationMethod<
  UpdateApplicationSettingsRequest,
  UpdateApplicationSettingsResponse,
  UpdateApplicationSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/apps/{ApplicationId}/settings",
    input: {
      ApplicationId: 0,
      WriteApplicationSettingsRequest: D.m({
        payload: true,
        shape: {
          CampaignHook: i_CampaignHook,
          CloudWatchMetricsEnabled: 0,
          EventTaggingEnabled: 0,
          Limits: i_CampaignLimits,
          QuietTime: i_QuietTime,
          JourneyLimits: {
            DailyCap: 0,
            TimeframeCap: i_JourneyTimeframeCap,
            TotalCap: 0,
          },
        },
      }),
    },
    output: { ApplicationSettingsResource: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplicationSettings",
})) as any;

export type UpdateBaiduChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enables the Baidu channel for an application or updates the status and settings of the Baidu channel for an application.
 */
export const updateBaiduChannel: API.OperationMethod<
  UpdateBaiduChannelRequest,
  UpdateBaiduChannelResponse,
  UpdateBaiduChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/apps/{ApplicationId}/channels/baidu",
    input: {
      ApplicationId: 0,
      BaiduChannelRequest: D.m({
        payload: true,
        shape: { ApiKey: 0, Enabled: 0, SecretKey: 0 },
      }),
    },
    output: { BaiduChannelResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBaiduChannel",
})) as any;

export type UpdateCampaignError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the configuration and other settings for a campaign.
 */
export const updateCampaign: API.OperationMethod<
  UpdateCampaignRequest,
  UpdateCampaignResponse,
  UpdateCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/apps/{ApplicationId}/campaigns/{CampaignId}",
    input: {
      ApplicationId: 0,
      CampaignId: 0,
      WriteCampaignRequest: D.m({
        payload: true,
        shape: i_WriteCampaignRequest,
      }),
    },
    output: { CampaignResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCampaign",
})) as any;

export type UpdateEmailChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enables the email channel for an application or updates the status and settings of the email channel for an application.
 */
export const updateEmailChannel: API.OperationMethod<
  UpdateEmailChannelRequest,
  UpdateEmailChannelResponse,
  UpdateEmailChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/apps/{ApplicationId}/channels/email",
    input: {
      ApplicationId: 0,
      EmailChannelRequest: D.m({
        payload: true,
        shape: {
          ConfigurationSet: 0,
          Enabled: 0,
          FromAddress: 0,
          Identity: 0,
          RoleArn: 0,
          OrchestrationSendingRoleArn: 0,
        },
      }),
    },
    output: { EmailChannelResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEmailChannel",
})) as any;

export type UpdateEmailTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing message template for messages that are sent through the email channel.
 */
export const updateEmailTemplate: API.OperationMethod<
  UpdateEmailTemplateRequest,
  UpdateEmailTemplateResponse,
  UpdateEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/templates/{TemplateName}/email",
    input: {
      CreateNewVersion: D.m({ query: "create-new-version" }),
      EmailTemplateRequest: D.m({
        payload: true,
        shape: i_EmailTemplateRequest,
      }),
      TemplateName: 0,
      Version: D.m({ query: "version" }),
    },
    output: { MessageBody: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEmailTemplate",
})) as any;

export type UpdateEndpointError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new endpoint for an application or updates the settings and attributes of an existing endpoint for an application. You can also use this operation to define custom attributes for an endpoint. If an update includes one or more values for a custom attribute, Amazon Pinpoint replaces (overwrites) any existing values with the new values.
 */
export const updateEndpoint: API.OperationMethod<
  UpdateEndpointRequest,
  UpdateEndpointResponse,
  UpdateEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/apps/{ApplicationId}/endpoints/{EndpointId}",
    input: {
      ApplicationId: 0,
      EndpointId: 0,
      EndpointRequest: D.m({
        payload: true,
        shape: {
          Address: 0,
          Attributes: 0,
          ChannelType: 0,
          Demographic: i_EndpointDemographic,
          EffectiveDate: 0,
          EndpointStatus: 0,
          Location: i_EndpointLocation,
          Metrics: 0,
          OptOut: 0,
          RequestId: 0,
          User: i_EndpointUser,
        },
      }),
    },
    output: { MessageBody: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEndpoint",
})) as any;

export type UpdateEndpointsBatchError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new batch of endpoints for an application or updates the settings and attributes of a batch of existing endpoints for an application. You can also use this operation to define custom attributes for a batch of endpoints. If an update includes one or more values for a custom attribute, Amazon Pinpoint replaces (overwrites) any existing values with the new values.
 */
export const updateEndpointsBatch: API.OperationMethod<
  UpdateEndpointsBatchRequest,
  UpdateEndpointsBatchResponse,
  UpdateEndpointsBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/apps/{ApplicationId}/endpoints",
    input: {
      ApplicationId: 0,
      EndpointBatchRequest: D.m({
        payload: true,
        shape: {
          Item: D.list({
            Address: 0,
            Attributes: 0,
            ChannelType: 0,
            Demographic: i_EndpointDemographic,
            EffectiveDate: 0,
            EndpointStatus: 0,
            Id: 0,
            Location: i_EndpointLocation,
            Metrics: 0,
            OptOut: 0,
            RequestId: 0,
            User: i_EndpointUser,
          }),
        },
      }),
    },
    output: { MessageBody: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEndpointsBatch",
})) as any;

export type UpdateGcmChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enables the GCM channel for an application or updates the status and settings of the GCM channel for an application.
 */
export const updateGcmChannel: API.OperationMethod<
  UpdateGcmChannelRequest,
  UpdateGcmChannelResponse,
  UpdateGcmChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/apps/{ApplicationId}/channels/gcm",
    input: {
      ApplicationId: 0,
      GCMChannelRequest: D.m({
        payload: true,
        shape: {
          ApiKey: 0,
          DefaultAuthenticationMethod: 0,
          Enabled: 0,
          ServiceJson: 0,
        },
      }),
    },
    output: { GCMChannelResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGcmChannel",
})) as any;

export type UpdateInAppTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing message template for messages sent through the in-app message channel.
 */
export const updateInAppTemplate: API.OperationMethod<
  UpdateInAppTemplateRequest,
  UpdateInAppTemplateResponse,
  UpdateInAppTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/templates/{TemplateName}/inapp",
    input: {
      CreateNewVersion: D.m({ query: "create-new-version" }),
      InAppTemplateRequest: D.m({
        payload: true,
        shape: i_InAppTemplateRequest,
      }),
      TemplateName: 0,
      Version: D.m({ query: "version" }),
    },
    output: { MessageBody: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateInAppTemplate",
})) as any;

export type UpdateJourneyError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the configuration and other settings for a journey.
 */
export const updateJourney: API.OperationMethod<
  UpdateJourneyRequest,
  UpdateJourneyResponse,
  UpdateJourneyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/apps/{ApplicationId}/journeys/{JourneyId}",
    input: {
      ApplicationId: 0,
      JourneyId: 0,
      WriteJourneyRequest: D.m({ payload: true, shape: i_WriteJourneyRequest }),
    },
    output: {
      JourneyResponse: D.m({ payload: true, shape: o_JourneyResponse }),
    },
  },
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateJourney",
})) as any;

export type UpdateJourneyStateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Cancels (stops) an active journey.
 */
export const updateJourneyState: API.OperationMethod<
  UpdateJourneyStateRequest,
  UpdateJourneyStateResponse,
  UpdateJourneyStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/apps/{ApplicationId}/journeys/{JourneyId}/state",
    input: {
      ApplicationId: 0,
      JourneyId: 0,
      JourneyStateRequest: D.m({ payload: true, shape: { State: 0 } }),
    },
    output: {
      JourneyResponse: D.m({ payload: true, shape: o_JourneyResponse }),
    },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateJourneyState",
})) as any;

export type UpdatePushTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing message template for messages that are sent through a push notification channel.
 */
export const updatePushTemplate: API.OperationMethod<
  UpdatePushTemplateRequest,
  UpdatePushTemplateResponse,
  UpdatePushTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/templates/{TemplateName}/push",
    input: {
      CreateNewVersion: D.m({ query: "create-new-version" }),
      PushNotificationTemplateRequest: D.m({
        payload: true,
        shape: i_PushNotificationTemplateRequest,
      }),
      TemplateName: 0,
      Version: D.m({ query: "version" }),
    },
    output: { MessageBody: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePushTemplate",
})) as any;

export type UpdateRecommenderConfigurationError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an Amazon Pinpoint configuration for a recommender model.
 */
export const updateRecommenderConfiguration: API.OperationMethod<
  UpdateRecommenderConfigurationRequest,
  UpdateRecommenderConfigurationResponse,
  UpdateRecommenderConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/recommenders/{RecommenderId}",
    input: {
      RecommenderId: 0,
      UpdateRecommenderConfiguration: D.m({
        payload: true,
        shape: {
          Attributes: 0,
          Description: 0,
          Name: 0,
          RecommendationProviderIdType: 0,
          RecommendationProviderRoleArn: 0,
          RecommendationProviderUri: 0,
          RecommendationTransformerUri: 0,
          RecommendationsDisplayName: 0,
          RecommendationsPerMessage: 0,
        },
      }),
    },
    output: { RecommenderConfigurationResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRecommenderConfiguration",
})) as any;

export type UpdateSegmentError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new segment for an application or updates the configuration, dimension, and other settings for an existing segment that's associated with an application.
 */
export const updateSegment: API.OperationMethod<
  UpdateSegmentRequest,
  UpdateSegmentResponse,
  UpdateSegmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/apps/{ApplicationId}/segments/{SegmentId}",
    input: {
      ApplicationId: 0,
      SegmentId: 0,
      WriteSegmentRequest: D.m({ payload: true, shape: i_WriteSegmentRequest }),
    },
    output: { SegmentResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSegment",
})) as any;

export type UpdateSmsChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enables the SMS channel for an application or updates the status and settings of the SMS channel for an application.
 */
export const updateSmsChannel: API.OperationMethod<
  UpdateSmsChannelRequest,
  UpdateSmsChannelResponse,
  UpdateSmsChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/apps/{ApplicationId}/channels/sms",
    input: {
      ApplicationId: 0,
      SMSChannelRequest: D.m({
        payload: true,
        shape: { Enabled: 0, SenderId: 0, ShortCode: 0 },
      }),
    },
    output: { SMSChannelResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSmsChannel",
})) as any;

export type UpdateSmsTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing message template for messages that are sent through the SMS channel.
 */
export const updateSmsTemplate: API.OperationMethod<
  UpdateSmsTemplateRequest,
  UpdateSmsTemplateResponse,
  UpdateSmsTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/templates/{TemplateName}/sms",
    input: {
      CreateNewVersion: D.m({ query: "create-new-version" }),
      SMSTemplateRequest: D.m({ payload: true, shape: i_SMSTemplateRequest }),
      TemplateName: 0,
      Version: D.m({ query: "version" }),
    },
    output: { MessageBody: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSmsTemplate",
})) as any;

export type UpdateTemplateActiveVersionError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Changes the status of a specific version of a message template to *active*.
 */
export const updateTemplateActiveVersion: API.OperationMethod<
  UpdateTemplateActiveVersionRequest,
  UpdateTemplateActiveVersionResponse,
  UpdateTemplateActiveVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/templates/{TemplateName}/{TemplateType}/active-version",
    input: {
      TemplateActiveVersionRequest: D.m({
        payload: true,
        shape: { Version: 0 },
      }),
      TemplateName: 0,
      TemplateType: 0,
    },
    output: { MessageBody: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTemplateActiveVersion",
})) as any;

export type UpdateVoiceChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enables the voice channel for an application or updates the status and settings of the voice channel for an application.
 */
export const updateVoiceChannel: API.OperationMethod<
  UpdateVoiceChannelRequest,
  UpdateVoiceChannelResponse,
  UpdateVoiceChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/apps/{ApplicationId}/channels/voice",
    input: {
      ApplicationId: 0,
      VoiceChannelRequest: D.m({ payload: true, shape: { Enabled: 0 } }),
    },
    output: { VoiceChannelResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVoiceChannel",
})) as any;

export type UpdateVoiceTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing message template for messages that are sent through the voice channel.
 */
export const updateVoiceTemplate: API.OperationMethod<
  UpdateVoiceTemplateRequest,
  UpdateVoiceTemplateResponse,
  UpdateVoiceTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/templates/{TemplateName}/voice",
    input: {
      CreateNewVersion: D.m({ query: "create-new-version" }),
      TemplateName: 0,
      Version: D.m({ query: "version" }),
      VoiceTemplateRequest: D.m({
        payload: true,
        shape: i_VoiceTemplateRequest,
      }),
    },
    output: { MessageBody: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVoiceTemplate",
})) as any;

export type VerifyOTPMessageError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Verify an OTP
 */
export const verifyOTPMessage: API.OperationMethod<
  VerifyOTPMessageRequest,
  VerifyOTPMessageResponse,
  VerifyOTPMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/apps/{ApplicationId}/verify-otp",
    input: {
      ApplicationId: 0,
      VerifyOTPMessageRequestParameters: D.m({
        payload: true,
        shape: { DestinationIdentity: 0, Otp: 0, ReferenceId: 0 },
      }),
    },
    output: { VerificationResponse: D.m({ payload: true }) },
  },
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifyOTPMessage",
})) as any;

const i_CampaignHook: D.LazyStruct = () => ({
  LambdaFunctionName: 0,
  Mode: 0,
  WebUrl: 0,
});
const i_CampaignLimits: D.LazyStruct = () => ({
  Daily: 0,
  MaximumDuration: 0,
  MessagesPerSecond: 0,
  Total: 0,
  Session: 0,
});
const i_DirectMessageConfiguration: D.LazyStruct = () => ({
  ADMMessage: {
    Action: 0,
    Body: 0,
    ConsolidationKey: 0,
    Data: 0,
    ExpiresAfter: 0,
    IconReference: 0,
    ImageIconUrl: 0,
    ImageUrl: 0,
    MD5: 0,
    RawContent: 0,
    SilentPush: 0,
    SmallImageIconUrl: 0,
    Sound: 0,
    Substitutions: 0,
    Title: 0,
    Url: 0,
  },
  APNSMessage: {
    APNSPushType: 0,
    Action: 0,
    Badge: 0,
    Body: 0,
    Category: 0,
    CollapseId: 0,
    Data: 0,
    MediaUrl: 0,
    PreferredAuthenticationMethod: 0,
    Priority: 0,
    RawContent: 0,
    SilentPush: 0,
    Sound: 0,
    Substitutions: 0,
    ThreadId: 0,
    TimeToLive: 0,
    Title: 0,
    Url: 0,
  },
  BaiduMessage: {
    Action: 0,
    Body: 0,
    Data: 0,
    IconReference: 0,
    ImageIconUrl: 0,
    ImageUrl: 0,
    RawContent: 0,
    SilentPush: 0,
    SmallImageIconUrl: 0,
    Sound: 0,
    Substitutions: 0,
    TimeToLive: 0,
    Title: 0,
    Url: 0,
  },
  DefaultMessage: { Body: 0, Substitutions: 0 },
  DefaultPushNotificationMessage: {
    Action: 0,
    Body: 0,
    Data: 0,
    SilentPush: 0,
    Substitutions: 0,
    Title: 0,
    Url: 0,
  },
  EmailMessage: {
    Body: 0,
    FeedbackForwardingAddress: 0,
    FromAddress: 0,
    RawEmail: { Data: 0 },
    ReplyToAddresses: 0,
    SimpleEmail: {
      HtmlPart: i_SimpleEmailPart,
      Subject: i_SimpleEmailPart,
      TextPart: i_SimpleEmailPart,
      Headers: D.list(i_MessageHeader),
    },
    Substitutions: 0,
  },
  GCMMessage: {
    Action: 0,
    Body: 0,
    CollapseKey: 0,
    Data: 0,
    IconReference: 0,
    ImageIconUrl: 0,
    ImageUrl: 0,
    PreferredAuthenticationMethod: 0,
    Priority: 0,
    RawContent: 0,
    RestrictedPackageName: 0,
    SilentPush: 0,
    SmallImageIconUrl: 0,
    Sound: 0,
    Substitutions: 0,
    TimeToLive: 0,
    Title: 0,
    Url: 0,
  },
  SMSMessage: {
    Body: 0,
    Keyword: 0,
    MediaUrl: 0,
    MessageType: 0,
    OriginationNumber: 0,
    SenderId: 0,
    Substitutions: 0,
    EntityId: 0,
    TemplateId: 0,
  },
  VoiceMessage: {
    Body: 0,
    LanguageCode: 0,
    OriginationNumber: 0,
    Substitutions: 0,
    VoiceId: 0,
  },
});
const i_EmailTemplateRequest: D.LazyStruct = () => ({
  DefaultSubstitutions: 0,
  HtmlPart: 0,
  RecommenderId: 0,
  Subject: 0,
  Headers: D.list(i_MessageHeader),
  tags: 0,
  TemplateDescription: 0,
  TextPart: 0,
});
const i_EndpointDemographic: D.LazyStruct = () => ({
  AppVersion: 0,
  Locale: 0,
  Make: 0,
  Model: 0,
  ModelVersion: 0,
  Platform: 0,
  PlatformVersion: 0,
  Timezone: 0,
});
const i_EndpointLocation: D.LazyStruct = () => ({
  City: 0,
  Country: 0,
  Latitude: 0,
  Longitude: 0,
  PostalCode: 0,
  Region: 0,
});
const i_EndpointSendConfiguration: D.LazyStruct = () => ({
  BodyOverride: 0,
  Context: 0,
  RawContent: 0,
  Substitutions: 0,
  TitleOverride: 0,
});
const i_EndpointUser: D.LazyStruct = () => ({ UserAttributes: 0, UserId: 0 });
const i_InAppTemplateRequest: D.LazyStruct = () => ({
  Content: D.list(i_InAppMessageContent),
  CustomConfig: 0,
  Layout: 0,
  tags: 0,
  TemplateDescription: 0,
});
const i_JourneyTimeframeCap: D.LazyStruct = () => ({ Cap: 0, Days: 0 });
const i_PushNotificationTemplateRequest: D.LazyStruct = () => ({
  ADM: i_AndroidPushNotificationTemplate,
  APNS: {
    Action: 0,
    Body: 0,
    MediaUrl: 0,
    RawContent: 0,
    Sound: 0,
    Title: 0,
    Url: 0,
  },
  Baidu: i_AndroidPushNotificationTemplate,
  Default: { Action: 0, Body: 0, Sound: 0, Title: 0, Url: 0 },
  DefaultSubstitutions: 0,
  GCM: i_AndroidPushNotificationTemplate,
  RecommenderId: 0,
  tags: 0,
  TemplateDescription: 0,
});
const i_QuietTime: D.LazyStruct = () => ({ End: 0, Start: 0 });
const i_SMSTemplateRequest: D.LazyStruct = () => ({
  Body: 0,
  DefaultSubstitutions: 0,
  RecommenderId: 0,
  tags: 0,
  TemplateDescription: 0,
});
const i_TemplateConfiguration: D.LazyStruct = () => ({
  EmailTemplate: i_Template,
  PushTemplate: i_Template,
  SMSTemplate: i_Template,
  VoiceTemplate: i_Template,
  InAppTemplate: i_Template,
});
const i_VoiceTemplateRequest: D.LazyStruct = () => ({
  Body: 0,
  DefaultSubstitutions: 0,
  LanguageCode: 0,
  tags: 0,
  TemplateDescription: 0,
  VoiceId: 0,
});
const i_WriteCampaignRequest: D.LazyStruct = () => ({
  AdditionalTreatments: D.list({
    CustomDeliveryConfiguration: i_CustomDeliveryConfiguration,
    MessageConfiguration: i_MessageConfiguration,
    Schedule: i_Schedule,
    SizePercent: 0,
    TemplateConfiguration: i_TemplateConfiguration,
    TreatmentDescription: 0,
    TreatmentName: 0,
  }),
  CustomDeliveryConfiguration: i_CustomDeliveryConfiguration,
  Description: 0,
  HoldoutPercent: 0,
  Hook: i_CampaignHook,
  IsPaused: 0,
  Limits: i_CampaignLimits,
  MessageConfiguration: i_MessageConfiguration,
  Name: 0,
  Schedule: i_Schedule,
  SegmentId: 0,
  SegmentVersion: 0,
  tags: 0,
  TemplateConfiguration: i_TemplateConfiguration,
  TreatmentDescription: 0,
  TreatmentName: 0,
  Priority: 0,
});
const i_WriteJourneyRequest: D.LazyStruct = () => ({
  Activities: D.map({
    CUSTOM: {
      DeliveryUri: 0,
      EndpointTypes: 0,
      MessageConfig: { Data: 0 },
      NextActivity: 0,
      TemplateName: 0,
      TemplateVersion: 0,
    },
    ConditionalSplit: {
      Condition: { Conditions: D.list(i_SimpleCondition), Operator: 0 },
      EvaluationWaitTime: i_WaitTime,
      FalseActivity: 0,
      TrueActivity: 0,
    },
    Description: 0,
    EMAIL: {
      MessageConfig: { FromAddress: 0 },
      NextActivity: 0,
      TemplateName: 0,
      TemplateVersion: 0,
    },
    Holdout: { NextActivity: 0, Percentage: 0 },
    MultiCondition: {
      Branches: D.list({ Condition: i_SimpleCondition, NextActivity: 0 }),
      DefaultActivity: 0,
      EvaluationWaitTime: i_WaitTime,
    },
    PUSH: {
      MessageConfig: { TimeToLive: 0 },
      NextActivity: 0,
      TemplateName: 0,
      TemplateVersion: 0,
    },
    RandomSplit: { Branches: D.list({ NextActivity: 0, Percentage: 0 }) },
    SMS: {
      MessageConfig: {
        MessageType: 0,
        OriginationNumber: 0,
        SenderId: 0,
        EntityId: 0,
        TemplateId: 0,
      },
      NextActivity: 0,
      TemplateName: 0,
      TemplateVersion: 0,
    },
    Wait: { NextActivity: 0, WaitTime: i_WaitTime },
    ContactCenter: { NextActivity: 0 },
  }),
  CreationDate: 0,
  LastModifiedDate: 0,
  Limits: {
    DailyCap: 0,
    EndpointReentryCap: 0,
    MessagesPerSecond: 0,
    EndpointReentryInterval: 0,
    TimeframeCap: i_JourneyTimeframeCap,
    TotalCap: 0,
  },
  LocalTime: 0,
  Name: 0,
  QuietTime: i_QuietTime,
  RefreshFrequency: 0,
  Schedule: {
    EndTime: D.tsAs("date-time"),
    StartTime: D.tsAs("date-time"),
    Timezone: 0,
  },
  StartActivity: 0,
  StartCondition: {
    Description: 0,
    EventStartCondition: {
      EventFilter: { Dimensions: i_EventDimensions, FilterType: 0 },
      SegmentId: 0,
    },
    SegmentStartCondition: i_SegmentCondition,
  },
  State: 0,
  WaitForQuietTime: 0,
  RefreshOnSegmentUpdate: 0,
  JourneyChannelSettings: {
    ConnectCampaignArn: 0,
    ConnectCampaignExecutionRoleArn: 0,
  },
  SendingSchedule: 0,
  OpenHours: {
    EMAIL: D.map(D.list(i_OpenHoursRule)),
    SMS: D.map(D.list(i_OpenHoursRule)),
    PUSH: D.map(D.list(i_OpenHoursRule)),
    VOICE: D.map(D.list(i_OpenHoursRule)),
    CUSTOM: D.map(D.list(i_OpenHoursRule)),
  },
  ClosedDays: {
    EMAIL: D.list(i_ClosedDaysRule),
    SMS: D.list(i_ClosedDaysRule),
    PUSH: D.list(i_ClosedDaysRule),
    VOICE: D.list(i_ClosedDaysRule),
    CUSTOM: D.list(i_ClosedDaysRule),
  },
  TimezoneEstimationMethods: 0,
});
const i_WriteSegmentRequest: D.LazyStruct = () => ({
  Dimensions: i_SegmentDimensions,
  Name: 0,
  SegmentGroups: {
    Groups: D.list({
      Dimensions: D.list(i_SegmentDimensions),
      SourceSegments: D.list({ Id: 0, Version: 0 }),
      SourceType: 0,
      Type: 0,
    }),
    Include: 0,
  },
  tags: 0,
});
const o_JourneyResponse: D.LazyStruct = () => ({
  Activities: D.map({
    ConditionalSplit: { Condition: { Conditions: D.list(o_SimpleCondition) } },
    MultiCondition: { Branches: D.list({ Condition: o_SimpleCondition }) },
  }),
  Schedule: { EndTime: D.ts, StartTime: D.ts },
});
const i_AndroidPushNotificationTemplate: D.LazyStruct = () => ({
  Action: 0,
  Body: 0,
  ImageIconUrl: 0,
  ImageUrl: 0,
  RawContent: 0,
  SmallImageIconUrl: 0,
  Sound: 0,
  Title: 0,
  Url: 0,
});
const i_ClosedDaysRule: D.LazyStruct = () => ({
  Name: 0,
  StartDateTime: 0,
  EndDateTime: 0,
});
const i_CustomDeliveryConfiguration: D.LazyStruct = () => ({
  DeliveryUri: 0,
  EndpointTypes: 0,
});
const i_EventDimensions: D.LazyStruct = () => ({
  Attributes: D.map(i_AttributeDimension),
  EventType: i_SetDimension,
  Metrics: D.map(i_MetricDimension),
});
const i_InAppMessageContent: D.LazyStruct = () => ({
  BackgroundColor: 0,
  BodyConfig: { Alignment: 0, Body: 0, TextColor: 0 },
  HeaderConfig: { Alignment: 0, Header: 0, TextColor: 0 },
  ImageUrl: 0,
  PrimaryBtn: i_InAppMessageButton,
  SecondaryBtn: i_InAppMessageButton,
});
const i_MessageConfiguration: D.LazyStruct = () => ({
  ADMMessage: i_Message,
  APNSMessage: i_Message,
  BaiduMessage: i_Message,
  CustomMessage: { Data: 0 },
  DefaultMessage: i_Message,
  EmailMessage: {
    Body: 0,
    FromAddress: 0,
    Headers: D.list(i_MessageHeader),
    HtmlBody: 0,
    Title: 0,
  },
  GCMMessage: i_Message,
  SMSMessage: {
    Body: 0,
    MessageType: 0,
    OriginationNumber: 0,
    SenderId: 0,
    EntityId: 0,
    TemplateId: 0,
  },
  InAppMessage: {
    Body: 0,
    Content: D.list(i_InAppMessageContent),
    CustomConfig: 0,
    Layout: 0,
  },
});
const i_MessageHeader: D.LazyStruct = () => ({ Name: 0, Value: 0 });
const i_OpenHoursRule: D.LazyStruct = () => ({ StartTime: 0, EndTime: 0 });
const i_Schedule: D.LazyStruct = () => ({
  EndTime: 0,
  EventFilter: { Dimensions: i_EventDimensions, FilterType: 0 },
  Frequency: 0,
  IsLocalTime: 0,
  QuietTime: i_QuietTime,
  StartTime: 0,
  Timezone: 0,
});
const i_SegmentCondition: D.LazyStruct = () => ({ SegmentId: 0 });
const i_SegmentDimensions: D.LazyStruct = () => ({
  Attributes: D.map(i_AttributeDimension),
  Behavior: { Recency: { Duration: 0, RecencyType: 0 } },
  Demographic: {
    AppVersion: i_SetDimension,
    Channel: i_SetDimension,
    DeviceType: i_SetDimension,
    Make: i_SetDimension,
    Model: i_SetDimension,
    Platform: i_SetDimension,
  },
  Location: {
    Country: i_SetDimension,
    GPSPoint: {
      Coordinates: { Latitude: 0, Longitude: 0 },
      RangeInKilometers: 0,
    },
  },
  Metrics: D.map(i_MetricDimension),
  UserAttributes: D.map(i_AttributeDimension),
});
const i_SimpleCondition: D.LazyStruct = () => ({
  EventCondition: { Dimensions: i_EventDimensions, MessageActivity: 0 },
  SegmentCondition: i_SegmentCondition,
  SegmentDimensions: D.m({
    wire: "segmentDimensions",
    shape: i_SegmentDimensions,
  }),
});
const i_SimpleEmailPart: D.LazyStruct = () => ({ Charset: 0, Data: 0 });
const i_Template: D.LazyStruct = () => ({ Name: 0, Version: 0 });
const i_WaitTime: D.LazyStruct = () => ({ WaitFor: 0, WaitUntil: 0 });
const o_SimpleCondition: D.LazyStruct = () => ({
  SegmentDimensions: D.m({ wire: "segmentDimensions" }),
});
const i_AttributeDimension: D.LazyStruct = () => ({
  AttributeType: 0,
  Values: 0,
});
const i_InAppMessageButton: D.LazyStruct = () => ({
  Android: i_OverrideButtonConfiguration,
  DefaultConfig: {
    BackgroundColor: 0,
    BorderRadius: 0,
    ButtonAction: 0,
    Link: 0,
    Text: 0,
    TextColor: 0,
  },
  IOS: i_OverrideButtonConfiguration,
  Web: i_OverrideButtonConfiguration,
});
const i_Message: D.LazyStruct = () => ({
  Action: 0,
  Body: 0,
  ImageIconUrl: 0,
  ImageSmallIconUrl: 0,
  ImageUrl: 0,
  JsonBody: 0,
  MediaUrl: 0,
  RawContent: 0,
  SilentPush: 0,
  TimeToLive: 0,
  Title: 0,
  Url: 0,
});
const i_MetricDimension: D.LazyStruct = () => ({
  ComparisonOperator: 0,
  Value: 0,
});
const i_SetDimension: D.LazyStruct = () => ({ DimensionType: 0, Values: 0 });
const i_OverrideButtonConfiguration: D.LazyStruct = () => ({
  ButtonAction: 0,
  Link: 0,
});
