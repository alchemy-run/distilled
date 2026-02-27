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
  sdkId: "Chime SDK Voice",
  serviceShapeName: "ChimeSDKTelephonyService",
});
const auth = T.AwsAuthSigv4({ name: "chime" });
const ver = T.ServiceVersion("2022-08-03");
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
              `https://voice-chime-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://voice-chime-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://voice-chime.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://voice-chime.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

//# Newtypes
export type NonEmptyString = string;
export type E164PhoneNumber = string | redacted.Redacted<string>;
export type SensitiveNonEmptyString = string | redacted.Redacted<string>;
export type CallingName = string | redacted.Redacted<string>;
export type PhoneNumberName = string | redacted.Redacted<string>;
export type GuidString = string;
export type Iso8601Timestamp = Date;
export type NonEmptyString128 = string;
export type ProxySessionNameString = string | redacted.Redacted<string>;
export type PositiveInteger = number;
export type Country = string;
export type AreaCode = string;
export type String128 = string;
export type SipMediaApplicationName = string;
export type FunctionArn = string | redacted.Redacted<string>;
export type TagKey = string | redacted.Redacted<string>;
export type TagValue = string | redacted.Redacted<string>;
export type SensitiveString = string | redacted.Redacted<string>;
export type SipRuleName = string;
export type SipApplicationPriority = number;
export type VoiceConnectorName = string;
export type VoiceConnectorGroupName = string;
export type VoiceConnectorItemPriority = number;
export type NonEmptyString256 = string;
export type Arn = string | redacted.Redacted<string>;
export type VoiceProfileDomainName = string;
export type VoiceProfileDomainDescription = string;
export type ClientRequestId = string;
export type Alpha2CountryCode = string;
export type AlexaSkillId = string | redacted.Redacted<string>;
export type ConfidenceScore = number;
export type Port = number;
export type OriginationRoutePriority = number;
export type OriginationRouteWeight = number;
export type DataRetentionInHours = number;
export type CpsLimit = number;
export type CallingRegion = string;
export type ResultMax = number;
export type NextTokenString = string;
export type TollFreePrefix = string;
export type PhoneNumberMaxResults = number;
export type ValidationResult = number;

//# Schemas
export type E164PhoneNumberList = string | redacted.Redacted<string>[];
export const E164PhoneNumberList = S.Array(SensitiveString);
export interface AssociatePhoneNumbersWithVoiceConnectorRequest {
  VoiceConnectorId: string;
  E164PhoneNumbers: string | redacted.Redacted<string>[];
  ForceAssociate?: boolean;
}
export const AssociatePhoneNumbersWithVoiceConnectorRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
    E164PhoneNumbers: E164PhoneNumberList,
    ForceAssociate: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/voice-connectors/{VoiceConnectorId}?operation=associate-phone-numbers",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociatePhoneNumbersWithVoiceConnectorRequest",
}) as any as S.Schema<AssociatePhoneNumbersWithVoiceConnectorRequest>;
export type ErrorCode =
  | "BadRequest"
  | "Conflict"
  | "Forbidden"
  | "NotFound"
  | "PreconditionFailed"
  | "ResourceLimitExceeded"
  | "ServiceFailure"
  | "AccessDenied"
  | "ServiceUnavailable"
  | "Throttled"
  | "Throttling"
  | "Unauthorized"
  | "Unprocessable"
  | "VoiceConnectorGroupAssociationsExist"
  | "PhoneNumberAssociationsExist"
  | "Gone"
  | (string & {});
export const ErrorCode = S.String;
export interface PhoneNumberError {
  PhoneNumberId?: string | redacted.Redacted<string>;
  ErrorCode?: ErrorCode;
  ErrorMessage?: string;
}
export const PhoneNumberError = S.suspend(() =>
  S.Struct({
    PhoneNumberId: S.optional(SensitiveString),
    ErrorCode: S.optional(ErrorCode),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "PhoneNumberError",
}) as any as S.Schema<PhoneNumberError>;
export type PhoneNumberErrorList = PhoneNumberError[];
export const PhoneNumberErrorList = S.Array(PhoneNumberError);
export interface AssociatePhoneNumbersWithVoiceConnectorResponse {
  PhoneNumberErrors?: PhoneNumberError[];
}
export const AssociatePhoneNumbersWithVoiceConnectorResponse = S.suspend(() =>
  S.Struct({ PhoneNumberErrors: S.optional(PhoneNumberErrorList) }),
).annotate({
  identifier: "AssociatePhoneNumbersWithVoiceConnectorResponse",
}) as any as S.Schema<AssociatePhoneNumbersWithVoiceConnectorResponse>;
export interface AssociatePhoneNumbersWithVoiceConnectorGroupRequest {
  VoiceConnectorGroupId: string;
  E164PhoneNumbers: string | redacted.Redacted<string>[];
  ForceAssociate?: boolean;
}
export const AssociatePhoneNumbersWithVoiceConnectorGroupRequest = S.suspend(
  () =>
    S.Struct({
      VoiceConnectorGroupId: S.String.pipe(
        T.HttpLabel("VoiceConnectorGroupId"),
      ),
      E164PhoneNumbers: E164PhoneNumberList,
      ForceAssociate: S.optional(S.Boolean),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/voice-connector-groups/{VoiceConnectorGroupId}?operation=associate-phone-numbers",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "AssociatePhoneNumbersWithVoiceConnectorGroupRequest",
}) as any as S.Schema<AssociatePhoneNumbersWithVoiceConnectorGroupRequest>;
export interface AssociatePhoneNumbersWithVoiceConnectorGroupResponse {
  PhoneNumberErrors?: PhoneNumberError[];
}
export const AssociatePhoneNumbersWithVoiceConnectorGroupResponse = S.suspend(
  () => S.Struct({ PhoneNumberErrors: S.optional(PhoneNumberErrorList) }),
).annotate({
  identifier: "AssociatePhoneNumbersWithVoiceConnectorGroupResponse",
}) as any as S.Schema<AssociatePhoneNumbersWithVoiceConnectorGroupResponse>;
export type NonEmptyStringList = string[];
export const NonEmptyStringList = S.Array(S.String);
export interface BatchDeletePhoneNumberRequest {
  PhoneNumberIds: string[];
}
export const BatchDeletePhoneNumberRequest = S.suspend(() =>
  S.Struct({ PhoneNumberIds: NonEmptyStringList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/phone-numbers?operation=batch-delete" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchDeletePhoneNumberRequest",
}) as any as S.Schema<BatchDeletePhoneNumberRequest>;
export interface BatchDeletePhoneNumberResponse {
  PhoneNumberErrors?: PhoneNumberError[];
}
export const BatchDeletePhoneNumberResponse = S.suspend(() =>
  S.Struct({ PhoneNumberErrors: S.optional(PhoneNumberErrorList) }),
).annotate({
  identifier: "BatchDeletePhoneNumberResponse",
}) as any as S.Schema<BatchDeletePhoneNumberResponse>;
export type PhoneNumberProductType =
  | "VoiceConnector"
  | "SipMediaApplicationDialIn"
  | (string & {});
export const PhoneNumberProductType = S.String;
export interface UpdatePhoneNumberRequestItem {
  PhoneNumberId: string | redacted.Redacted<string>;
  ProductType?: PhoneNumberProductType;
  CallingName?: string | redacted.Redacted<string>;
  Name?: string | redacted.Redacted<string>;
}
export const UpdatePhoneNumberRequestItem = S.suspend(() =>
  S.Struct({
    PhoneNumberId: SensitiveString,
    ProductType: S.optional(PhoneNumberProductType),
    CallingName: S.optional(SensitiveString),
    Name: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "UpdatePhoneNumberRequestItem",
}) as any as S.Schema<UpdatePhoneNumberRequestItem>;
export type UpdatePhoneNumberRequestItemList = UpdatePhoneNumberRequestItem[];
export const UpdatePhoneNumberRequestItemList = S.Array(
  UpdatePhoneNumberRequestItem,
);
export interface BatchUpdatePhoneNumberRequest {
  UpdatePhoneNumberRequestItems: UpdatePhoneNumberRequestItem[];
}
export const BatchUpdatePhoneNumberRequest = S.suspend(() =>
  S.Struct({
    UpdatePhoneNumberRequestItems: UpdatePhoneNumberRequestItemList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/phone-numbers?operation=batch-update" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchUpdatePhoneNumberRequest",
}) as any as S.Schema<BatchUpdatePhoneNumberRequest>;
export interface BatchUpdatePhoneNumberResponse {
  PhoneNumberErrors?: PhoneNumberError[];
}
export const BatchUpdatePhoneNumberResponse = S.suspend(() =>
  S.Struct({ PhoneNumberErrors: S.optional(PhoneNumberErrorList) }),
).annotate({
  identifier: "BatchUpdatePhoneNumberResponse",
}) as any as S.Schema<BatchUpdatePhoneNumberResponse>;
export interface CreatePhoneNumberOrderRequest {
  ProductType: PhoneNumberProductType;
  E164PhoneNumbers: string | redacted.Redacted<string>[];
  Name?: string | redacted.Redacted<string>;
}
export const CreatePhoneNumberOrderRequest = S.suspend(() =>
  S.Struct({
    ProductType: PhoneNumberProductType,
    E164PhoneNumbers: E164PhoneNumberList,
    Name: S.optional(SensitiveString),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/phone-number-orders" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePhoneNumberOrderRequest",
}) as any as S.Schema<CreatePhoneNumberOrderRequest>;
export type PhoneNumberOrderStatus =
  | "Processing"
  | "Successful"
  | "Failed"
  | "Partial"
  | "PendingDocuments"
  | "Submitted"
  | "FOC"
  | "ChangeRequested"
  | "Exception"
  | "CancelRequested"
  | "Cancelled"
  | (string & {});
export const PhoneNumberOrderStatus = S.String;
export type PhoneNumberOrderType = "New" | "Porting" | (string & {});
export const PhoneNumberOrderType = S.String;
export type OrderedPhoneNumberStatus =
  | "Processing"
  | "Acquired"
  | "Failed"
  | (string & {});
export const OrderedPhoneNumberStatus = S.String;
export interface OrderedPhoneNumber {
  E164PhoneNumber?: string | redacted.Redacted<string>;
  Status?: OrderedPhoneNumberStatus;
}
export const OrderedPhoneNumber = S.suspend(() =>
  S.Struct({
    E164PhoneNumber: S.optional(SensitiveString),
    Status: S.optional(OrderedPhoneNumberStatus),
  }),
).annotate({
  identifier: "OrderedPhoneNumber",
}) as any as S.Schema<OrderedPhoneNumber>;
export type OrderedPhoneNumberList = OrderedPhoneNumber[];
export const OrderedPhoneNumberList = S.Array(OrderedPhoneNumber);
export interface PhoneNumberOrder {
  PhoneNumberOrderId?: string;
  ProductType?: PhoneNumberProductType;
  Status?: PhoneNumberOrderStatus;
  OrderType?: PhoneNumberOrderType;
  OrderedPhoneNumbers?: OrderedPhoneNumber[];
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  FocDate?: Date;
}
export const PhoneNumberOrder = S.suspend(() =>
  S.Struct({
    PhoneNumberOrderId: S.optional(S.String),
    ProductType: S.optional(PhoneNumberProductType),
    Status: S.optional(PhoneNumberOrderStatus),
    OrderType: S.optional(PhoneNumberOrderType),
    OrderedPhoneNumbers: S.optional(OrderedPhoneNumberList),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    FocDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({
  identifier: "PhoneNumberOrder",
}) as any as S.Schema<PhoneNumberOrder>;
export interface CreatePhoneNumberOrderResponse {
  PhoneNumberOrder?: PhoneNumberOrder;
}
export const CreatePhoneNumberOrderResponse = S.suspend(() =>
  S.Struct({ PhoneNumberOrder: S.optional(PhoneNumberOrder) }),
).annotate({
  identifier: "CreatePhoneNumberOrderResponse",
}) as any as S.Schema<CreatePhoneNumberOrderResponse>;
export type ParticipantPhoneNumberList = string | redacted.Redacted<string>[];
export const ParticipantPhoneNumberList = S.Array(SensitiveString);
export type Capability = "Voice" | "SMS" | (string & {});
export const Capability = S.String;
export type CapabilityList = Capability[];
export const CapabilityList = S.Array(Capability);
export type NumberSelectionBehavior =
  | "PreferSticky"
  | "AvoidSticky"
  | (string & {});
export const NumberSelectionBehavior = S.String;
export type GeoMatchLevel = "Country" | "AreaCode" | (string & {});
export const GeoMatchLevel = S.String;
export interface GeoMatchParams {
  Country: string;
  AreaCode: string;
}
export const GeoMatchParams = S.suspend(() =>
  S.Struct({ Country: S.String, AreaCode: S.String }),
).annotate({ identifier: "GeoMatchParams" }) as any as S.Schema<GeoMatchParams>;
export interface CreateProxySessionRequest {
  VoiceConnectorId: string;
  ParticipantPhoneNumbers: string | redacted.Redacted<string>[];
  Name?: string | redacted.Redacted<string>;
  ExpiryMinutes?: number;
  Capabilities: Capability[];
  NumberSelectionBehavior?: NumberSelectionBehavior;
  GeoMatchLevel?: GeoMatchLevel;
  GeoMatchParams?: GeoMatchParams;
}
export const CreateProxySessionRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
    ParticipantPhoneNumbers: ParticipantPhoneNumberList,
    Name: S.optional(SensitiveString),
    ExpiryMinutes: S.optional(S.Number),
    Capabilities: CapabilityList,
    NumberSelectionBehavior: S.optional(NumberSelectionBehavior),
    GeoMatchLevel: S.optional(GeoMatchLevel),
    GeoMatchParams: S.optional(GeoMatchParams),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/voice-connectors/{VoiceConnectorId}/proxy-sessions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateProxySessionRequest",
}) as any as S.Schema<CreateProxySessionRequest>;
export type ProxySessionStatus =
  | "Open"
  | "InProgress"
  | "Closed"
  | (string & {});
export const ProxySessionStatus = S.String;
export interface Participant {
  PhoneNumber?: string | redacted.Redacted<string>;
  ProxyPhoneNumber?: string | redacted.Redacted<string>;
}
export const Participant = S.suspend(() =>
  S.Struct({
    PhoneNumber: S.optional(SensitiveString),
    ProxyPhoneNumber: S.optional(SensitiveString),
  }),
).annotate({ identifier: "Participant" }) as any as S.Schema<Participant>;
export type Participants = Participant[];
export const Participants = S.Array(Participant);
export interface ProxySession {
  VoiceConnectorId?: string;
  ProxySessionId?: string;
  Name?: string;
  Status?: ProxySessionStatus;
  ExpiryMinutes?: number;
  Capabilities?: Capability[];
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  EndedTimestamp?: Date;
  Participants?: Participant[];
  NumberSelectionBehavior?: NumberSelectionBehavior;
  GeoMatchLevel?: GeoMatchLevel;
  GeoMatchParams?: GeoMatchParams;
}
export const ProxySession = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.optional(S.String),
    ProxySessionId: S.optional(S.String),
    Name: S.optional(S.String),
    Status: S.optional(ProxySessionStatus),
    ExpiryMinutes: S.optional(S.Number),
    Capabilities: S.optional(CapabilityList),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Participants: S.optional(Participants),
    NumberSelectionBehavior: S.optional(NumberSelectionBehavior),
    GeoMatchLevel: S.optional(GeoMatchLevel),
    GeoMatchParams: S.optional(GeoMatchParams),
  }),
).annotate({ identifier: "ProxySession" }) as any as S.Schema<ProxySession>;
export interface CreateProxySessionResponse {
  ProxySession?: ProxySession;
}
export const CreateProxySessionResponse = S.suspend(() =>
  S.Struct({ ProxySession: S.optional(ProxySession) }),
).annotate({
  identifier: "CreateProxySessionResponse",
}) as any as S.Schema<CreateProxySessionResponse>;
export interface SipMediaApplicationEndpoint {
  LambdaArn?: string | redacted.Redacted<string>;
}
export const SipMediaApplicationEndpoint = S.suspend(() =>
  S.Struct({ LambdaArn: S.optional(SensitiveString) }),
).annotate({
  identifier: "SipMediaApplicationEndpoint",
}) as any as S.Schema<SipMediaApplicationEndpoint>;
export type SipMediaApplicationEndpointList = SipMediaApplicationEndpoint[];
export const SipMediaApplicationEndpointList = S.Array(
  SipMediaApplicationEndpoint,
);
export interface Tag {
  Key: string | redacted.Redacted<string>;
  Value: string | redacted.Redacted<string>;
}
export const Tag = S.suspend(() =>
  S.Struct({ Key: SensitiveString, Value: SensitiveString }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = S.Array(Tag);
export interface CreateSipMediaApplicationRequest {
  AwsRegion: string;
  Name: string;
  Endpoints: SipMediaApplicationEndpoint[];
  Tags?: Tag[];
}
export const CreateSipMediaApplicationRequest = S.suspend(() =>
  S.Struct({
    AwsRegion: S.String,
    Name: S.String,
    Endpoints: SipMediaApplicationEndpointList,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/sip-media-applications" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSipMediaApplicationRequest",
}) as any as S.Schema<CreateSipMediaApplicationRequest>;
export interface SipMediaApplication {
  SipMediaApplicationId?: string;
  AwsRegion?: string;
  Name?: string;
  Endpoints?: SipMediaApplicationEndpoint[];
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  SipMediaApplicationArn?: string;
}
export const SipMediaApplication = S.suspend(() =>
  S.Struct({
    SipMediaApplicationId: S.optional(S.String),
    AwsRegion: S.optional(S.String),
    Name: S.optional(S.String),
    Endpoints: S.optional(SipMediaApplicationEndpointList),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    SipMediaApplicationArn: S.optional(S.String),
  }),
).annotate({
  identifier: "SipMediaApplication",
}) as any as S.Schema<SipMediaApplication>;
export interface CreateSipMediaApplicationResponse {
  SipMediaApplication?: SipMediaApplication;
}
export const CreateSipMediaApplicationResponse = S.suspend(() =>
  S.Struct({ SipMediaApplication: S.optional(SipMediaApplication) }),
).annotate({
  identifier: "CreateSipMediaApplicationResponse",
}) as any as S.Schema<CreateSipMediaApplicationResponse>;
export type SipHeadersMap = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export const SipHeadersMap = S.Record(
  S.String,
  SensitiveString.pipe(S.optional),
);
export type SMACreateCallArgumentsMap = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export const SMACreateCallArgumentsMap = S.Record(
  S.String,
  SensitiveString.pipe(S.optional),
);
export interface CreateSipMediaApplicationCallRequest {
  FromPhoneNumber: string | redacted.Redacted<string>;
  ToPhoneNumber: string | redacted.Redacted<string>;
  SipMediaApplicationId: string;
  SipHeaders?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  ArgumentsMap?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
}
export const CreateSipMediaApplicationCallRequest = S.suspend(() =>
  S.Struct({
    FromPhoneNumber: SensitiveString,
    ToPhoneNumber: SensitiveString,
    SipMediaApplicationId: S.String.pipe(T.HttpLabel("SipMediaApplicationId")),
    SipHeaders: S.optional(SipHeadersMap),
    ArgumentsMap: S.optional(SMACreateCallArgumentsMap),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sip-media-applications/{SipMediaApplicationId}/calls",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSipMediaApplicationCallRequest",
}) as any as S.Schema<CreateSipMediaApplicationCallRequest>;
export interface SipMediaApplicationCall {
  TransactionId?: string;
}
export const SipMediaApplicationCall = S.suspend(() =>
  S.Struct({ TransactionId: S.optional(S.String) }),
).annotate({
  identifier: "SipMediaApplicationCall",
}) as any as S.Schema<SipMediaApplicationCall>;
export interface CreateSipMediaApplicationCallResponse {
  SipMediaApplicationCall?: SipMediaApplicationCall;
}
export const CreateSipMediaApplicationCallResponse = S.suspend(() =>
  S.Struct({ SipMediaApplicationCall: S.optional(SipMediaApplicationCall) }),
).annotate({
  identifier: "CreateSipMediaApplicationCallResponse",
}) as any as S.Schema<CreateSipMediaApplicationCallResponse>;
export type SipRuleTriggerType =
  | "ToPhoneNumber"
  | "RequestUriHostname"
  | (string & {});
export const SipRuleTriggerType = S.String;
export interface SipRuleTargetApplication {
  SipMediaApplicationId?: string;
  Priority?: number;
  AwsRegion?: string;
}
export const SipRuleTargetApplication = S.suspend(() =>
  S.Struct({
    SipMediaApplicationId: S.optional(S.String),
    Priority: S.optional(S.Number),
    AwsRegion: S.optional(S.String),
  }),
).annotate({
  identifier: "SipRuleTargetApplication",
}) as any as S.Schema<SipRuleTargetApplication>;
export type SipRuleTargetApplicationList = SipRuleTargetApplication[];
export const SipRuleTargetApplicationList = S.Array(SipRuleTargetApplication);
export interface CreateSipRuleRequest {
  Name: string;
  TriggerType: SipRuleTriggerType;
  TriggerValue: string;
  Disabled?: boolean;
  TargetApplications?: SipRuleTargetApplication[];
}
export const CreateSipRuleRequest = S.suspend(() =>
  S.Struct({
    Name: S.String,
    TriggerType: SipRuleTriggerType,
    TriggerValue: S.String,
    Disabled: S.optional(S.Boolean),
    TargetApplications: S.optional(SipRuleTargetApplicationList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/sip-rules" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSipRuleRequest",
}) as any as S.Schema<CreateSipRuleRequest>;
export interface SipRule {
  SipRuleId?: string;
  Name?: string;
  Disabled?: boolean;
  TriggerType?: SipRuleTriggerType;
  TriggerValue?: string;
  TargetApplications?: SipRuleTargetApplication[];
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export const SipRule = S.suspend(() =>
  S.Struct({
    SipRuleId: S.optional(S.String),
    Name: S.optional(S.String),
    Disabled: S.optional(S.Boolean),
    TriggerType: S.optional(SipRuleTriggerType),
    TriggerValue: S.optional(S.String),
    TargetApplications: S.optional(SipRuleTargetApplicationList),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "SipRule" }) as any as S.Schema<SipRule>;
export interface CreateSipRuleResponse {
  SipRule?: SipRule;
}
export const CreateSipRuleResponse = S.suspend(() =>
  S.Struct({ SipRule: S.optional(SipRule) }),
).annotate({
  identifier: "CreateSipRuleResponse",
}) as any as S.Schema<CreateSipRuleResponse>;
export type VoiceConnectorAwsRegion =
  | "us-east-1"
  | "us-west-2"
  | "ca-central-1"
  | "eu-central-1"
  | "eu-west-1"
  | "eu-west-2"
  | "ap-northeast-2"
  | "ap-northeast-1"
  | "ap-southeast-1"
  | "ap-southeast-2"
  | (string & {});
export const VoiceConnectorAwsRegion = S.String;
export type VoiceConnectorIntegrationType =
  | "CONNECT_CALL_TRANSFER_CONNECTOR"
  | "CONNECT_ANALYTICS_CONNECTOR"
  | (string & {});
export const VoiceConnectorIntegrationType = S.String;
export type NetworkType = "IPV4_ONLY" | "DUAL_STACK" | (string & {});
export const NetworkType = S.String;
export interface CreateVoiceConnectorRequest {
  Name: string;
  AwsRegion?: VoiceConnectorAwsRegion;
  RequireEncryption: boolean;
  Tags?: Tag[];
  IntegrationType?: VoiceConnectorIntegrationType;
  NetworkType?: NetworkType;
}
export const CreateVoiceConnectorRequest = S.suspend(() =>
  S.Struct({
    Name: S.String,
    AwsRegion: S.optional(VoiceConnectorAwsRegion),
    RequireEncryption: S.Boolean,
    Tags: S.optional(TagList),
    IntegrationType: S.optional(VoiceConnectorIntegrationType),
    NetworkType: S.optional(NetworkType),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/voice-connectors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateVoiceConnectorRequest",
}) as any as S.Schema<CreateVoiceConnectorRequest>;
export interface VoiceConnector {
  VoiceConnectorId?: string;
  AwsRegion?: VoiceConnectorAwsRegion;
  Name?: string;
  OutboundHostName?: string;
  RequireEncryption?: boolean;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  VoiceConnectorArn?: string;
  IntegrationType?: VoiceConnectorIntegrationType;
  NetworkType?: NetworkType;
}
export const VoiceConnector = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.optional(S.String),
    AwsRegion: S.optional(VoiceConnectorAwsRegion),
    Name: S.optional(S.String),
    OutboundHostName: S.optional(S.String),
    RequireEncryption: S.optional(S.Boolean),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    VoiceConnectorArn: S.optional(S.String),
    IntegrationType: S.optional(VoiceConnectorIntegrationType),
    NetworkType: S.optional(NetworkType),
  }),
).annotate({ identifier: "VoiceConnector" }) as any as S.Schema<VoiceConnector>;
export interface CreateVoiceConnectorResponse {
  VoiceConnector?: VoiceConnector;
}
export const CreateVoiceConnectorResponse = S.suspend(() =>
  S.Struct({ VoiceConnector: S.optional(VoiceConnector) }),
).annotate({
  identifier: "CreateVoiceConnectorResponse",
}) as any as S.Schema<CreateVoiceConnectorResponse>;
export interface VoiceConnectorItem {
  VoiceConnectorId: string;
  Priority: number;
}
export const VoiceConnectorItem = S.suspend(() =>
  S.Struct({ VoiceConnectorId: S.String, Priority: S.Number }),
).annotate({
  identifier: "VoiceConnectorItem",
}) as any as S.Schema<VoiceConnectorItem>;
export type VoiceConnectorItemList = VoiceConnectorItem[];
export const VoiceConnectorItemList = S.Array(VoiceConnectorItem);
export interface CreateVoiceConnectorGroupRequest {
  Name: string;
  VoiceConnectorItems?: VoiceConnectorItem[];
}
export const CreateVoiceConnectorGroupRequest = S.suspend(() =>
  S.Struct({
    Name: S.String,
    VoiceConnectorItems: S.optional(VoiceConnectorItemList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/voice-connector-groups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateVoiceConnectorGroupRequest",
}) as any as S.Schema<CreateVoiceConnectorGroupRequest>;
export interface VoiceConnectorGroup {
  VoiceConnectorGroupId?: string;
  Name?: string;
  VoiceConnectorItems?: VoiceConnectorItem[];
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  VoiceConnectorGroupArn?: string;
}
export const VoiceConnectorGroup = S.suspend(() =>
  S.Struct({
    VoiceConnectorGroupId: S.optional(S.String),
    Name: S.optional(S.String),
    VoiceConnectorItems: S.optional(VoiceConnectorItemList),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    VoiceConnectorGroupArn: S.optional(S.String),
  }),
).annotate({
  identifier: "VoiceConnectorGroup",
}) as any as S.Schema<VoiceConnectorGroup>;
export interface CreateVoiceConnectorGroupResponse {
  VoiceConnectorGroup?: VoiceConnectorGroup;
}
export const CreateVoiceConnectorGroupResponse = S.suspend(() =>
  S.Struct({ VoiceConnectorGroup: S.optional(VoiceConnectorGroup) }),
).annotate({
  identifier: "CreateVoiceConnectorGroupResponse",
}) as any as S.Schema<CreateVoiceConnectorGroupResponse>;
export interface CreateVoiceProfileRequest {
  SpeakerSearchTaskId: string;
}
export const CreateVoiceProfileRequest = S.suspend(() =>
  S.Struct({ SpeakerSearchTaskId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/voice-profiles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateVoiceProfileRequest",
}) as any as S.Schema<CreateVoiceProfileRequest>;
export interface VoiceProfile {
  VoiceProfileId?: string;
  VoiceProfileArn?: string | redacted.Redacted<string>;
  VoiceProfileDomainId?: string;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  ExpirationTimestamp?: Date;
}
export const VoiceProfile = S.suspend(() =>
  S.Struct({
    VoiceProfileId: S.optional(S.String),
    VoiceProfileArn: S.optional(SensitiveString),
    VoiceProfileDomainId: S.optional(S.String),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ExpirationTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "VoiceProfile" }) as any as S.Schema<VoiceProfile>;
export interface CreateVoiceProfileResponse {
  VoiceProfile?: VoiceProfile;
}
export const CreateVoiceProfileResponse = S.suspend(() =>
  S.Struct({ VoiceProfile: S.optional(VoiceProfile) }),
).annotate({
  identifier: "CreateVoiceProfileResponse",
}) as any as S.Schema<CreateVoiceProfileResponse>;
export interface ServerSideEncryptionConfiguration {
  KmsKeyArn: string | redacted.Redacted<string>;
}
export const ServerSideEncryptionConfiguration = S.suspend(() =>
  S.Struct({ KmsKeyArn: SensitiveString }),
).annotate({
  identifier: "ServerSideEncryptionConfiguration",
}) as any as S.Schema<ServerSideEncryptionConfiguration>;
export interface CreateVoiceProfileDomainRequest {
  Name: string;
  Description?: string;
  ServerSideEncryptionConfiguration: ServerSideEncryptionConfiguration;
  ClientRequestToken?: string;
  Tags?: Tag[];
}
export const CreateVoiceProfileDomainRequest = S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    ServerSideEncryptionConfiguration: ServerSideEncryptionConfiguration,
    ClientRequestToken: S.optional(S.String),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/voice-profile-domains" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateVoiceProfileDomainRequest",
}) as any as S.Schema<CreateVoiceProfileDomainRequest>;
export interface VoiceProfileDomain {
  VoiceProfileDomainId?: string;
  VoiceProfileDomainArn?: string | redacted.Redacted<string>;
  Name?: string;
  Description?: string;
  ServerSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export const VoiceProfileDomain = S.suspend(() =>
  S.Struct({
    VoiceProfileDomainId: S.optional(S.String),
    VoiceProfileDomainArn: S.optional(SensitiveString),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    ServerSideEncryptionConfiguration: S.optional(
      ServerSideEncryptionConfiguration,
    ),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "VoiceProfileDomain",
}) as any as S.Schema<VoiceProfileDomain>;
export interface CreateVoiceProfileDomainResponse {
  VoiceProfileDomain?: VoiceProfileDomain;
}
export const CreateVoiceProfileDomainResponse = S.suspend(() =>
  S.Struct({ VoiceProfileDomain: S.optional(VoiceProfileDomain) }),
).annotate({
  identifier: "CreateVoiceProfileDomainResponse",
}) as any as S.Schema<CreateVoiceProfileDomainResponse>;
export interface DeletePhoneNumberRequest {
  PhoneNumberId: string | redacted.Redacted<string>;
}
export const DeletePhoneNumberRequest = S.suspend(() =>
  S.Struct({
    PhoneNumberId: SensitiveString.pipe(T.HttpLabel("PhoneNumberId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/phone-numbers/{PhoneNumberId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePhoneNumberRequest",
}) as any as S.Schema<DeletePhoneNumberRequest>;
export interface DeletePhoneNumberResponse {}
export const DeletePhoneNumberResponse = S.suspend(() => S.Struct({})).annotate(
  { identifier: "DeletePhoneNumberResponse" },
) as any as S.Schema<DeletePhoneNumberResponse>;
export interface DeleteProxySessionRequest {
  VoiceConnectorId: string;
  ProxySessionId: string;
}
export const DeleteProxySessionRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
    ProxySessionId: S.String.pipe(T.HttpLabel("ProxySessionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/voice-connectors/{VoiceConnectorId}/proxy-sessions/{ProxySessionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteProxySessionRequest",
}) as any as S.Schema<DeleteProxySessionRequest>;
export interface DeleteProxySessionResponse {}
export const DeleteProxySessionResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteProxySessionResponse",
}) as any as S.Schema<DeleteProxySessionResponse>;
export interface DeleteSipMediaApplicationRequest {
  SipMediaApplicationId: string;
}
export const DeleteSipMediaApplicationRequest = S.suspend(() =>
  S.Struct({
    SipMediaApplicationId: S.String.pipe(T.HttpLabel("SipMediaApplicationId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/sip-media-applications/{SipMediaApplicationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSipMediaApplicationRequest",
}) as any as S.Schema<DeleteSipMediaApplicationRequest>;
export interface DeleteSipMediaApplicationResponse {}
export const DeleteSipMediaApplicationResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSipMediaApplicationResponse",
}) as any as S.Schema<DeleteSipMediaApplicationResponse>;
export interface DeleteSipRuleRequest {
  SipRuleId: string;
}
export const DeleteSipRuleRequest = S.suspend(() =>
  S.Struct({ SipRuleId: S.String.pipe(T.HttpLabel("SipRuleId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/sip-rules/{SipRuleId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSipRuleRequest",
}) as any as S.Schema<DeleteSipRuleRequest>;
export interface DeleteSipRuleResponse {}
export const DeleteSipRuleResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteSipRuleResponse",
}) as any as S.Schema<DeleteSipRuleResponse>;
export interface DeleteVoiceConnectorRequest {
  VoiceConnectorId: string;
}
export const DeleteVoiceConnectorRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/voice-connectors/{VoiceConnectorId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVoiceConnectorRequest",
}) as any as S.Schema<DeleteVoiceConnectorRequest>;
export interface DeleteVoiceConnectorResponse {}
export const DeleteVoiceConnectorResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteVoiceConnectorResponse",
}) as any as S.Schema<DeleteVoiceConnectorResponse>;
export interface DeleteVoiceConnectorEmergencyCallingConfigurationRequest {
  VoiceConnectorId: string;
}
export const DeleteVoiceConnectorEmergencyCallingConfigurationRequest =
  S.suspend(() =>
    S.Struct({
      VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/voice-connectors/{VoiceConnectorId}/emergency-calling-configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteVoiceConnectorEmergencyCallingConfigurationRequest",
  }) as any as S.Schema<DeleteVoiceConnectorEmergencyCallingConfigurationRequest>;
export interface DeleteVoiceConnectorEmergencyCallingConfigurationResponse {}
export const DeleteVoiceConnectorEmergencyCallingConfigurationResponse =
  S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteVoiceConnectorEmergencyCallingConfigurationResponse",
  }) as any as S.Schema<DeleteVoiceConnectorEmergencyCallingConfigurationResponse>;
export interface DeleteVoiceConnectorExternalSystemsConfigurationRequest {
  VoiceConnectorId: string;
}
export const DeleteVoiceConnectorExternalSystemsConfigurationRequest =
  S.suspend(() =>
    S.Struct({
      VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/voice-connectors/{VoiceConnectorId}/external-systems-configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteVoiceConnectorExternalSystemsConfigurationRequest",
  }) as any as S.Schema<DeleteVoiceConnectorExternalSystemsConfigurationRequest>;
export interface DeleteVoiceConnectorExternalSystemsConfigurationResponse {}
export const DeleteVoiceConnectorExternalSystemsConfigurationResponse =
  S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteVoiceConnectorExternalSystemsConfigurationResponse",
  }) as any as S.Schema<DeleteVoiceConnectorExternalSystemsConfigurationResponse>;
export interface DeleteVoiceConnectorGroupRequest {
  VoiceConnectorGroupId: string;
}
export const DeleteVoiceConnectorGroupRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorGroupId: S.String.pipe(T.HttpLabel("VoiceConnectorGroupId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/voice-connector-groups/{VoiceConnectorGroupId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVoiceConnectorGroupRequest",
}) as any as S.Schema<DeleteVoiceConnectorGroupRequest>;
export interface DeleteVoiceConnectorGroupResponse {}
export const DeleteVoiceConnectorGroupResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteVoiceConnectorGroupResponse",
}) as any as S.Schema<DeleteVoiceConnectorGroupResponse>;
export interface DeleteVoiceConnectorOriginationRequest {
  VoiceConnectorId: string;
}
export const DeleteVoiceConnectorOriginationRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/voice-connectors/{VoiceConnectorId}/origination",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVoiceConnectorOriginationRequest",
}) as any as S.Schema<DeleteVoiceConnectorOriginationRequest>;
export interface DeleteVoiceConnectorOriginationResponse {}
export const DeleteVoiceConnectorOriginationResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteVoiceConnectorOriginationResponse",
}) as any as S.Schema<DeleteVoiceConnectorOriginationResponse>;
export interface DeleteVoiceConnectorProxyRequest {
  VoiceConnectorId: string;
}
export const DeleteVoiceConnectorProxyRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/voice-connectors/{VoiceConnectorId}/programmable-numbers/proxy",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVoiceConnectorProxyRequest",
}) as any as S.Schema<DeleteVoiceConnectorProxyRequest>;
export interface DeleteVoiceConnectorProxyResponse {}
export const DeleteVoiceConnectorProxyResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteVoiceConnectorProxyResponse",
}) as any as S.Schema<DeleteVoiceConnectorProxyResponse>;
export interface DeleteVoiceConnectorStreamingConfigurationRequest {
  VoiceConnectorId: string;
}
export const DeleteVoiceConnectorStreamingConfigurationRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/voice-connectors/{VoiceConnectorId}/streaming-configuration",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVoiceConnectorStreamingConfigurationRequest",
}) as any as S.Schema<DeleteVoiceConnectorStreamingConfigurationRequest>;
export interface DeleteVoiceConnectorStreamingConfigurationResponse {}
export const DeleteVoiceConnectorStreamingConfigurationResponse = S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteVoiceConnectorStreamingConfigurationResponse",
}) as any as S.Schema<DeleteVoiceConnectorStreamingConfigurationResponse>;
export interface DeleteVoiceConnectorTerminationRequest {
  VoiceConnectorId: string;
}
export const DeleteVoiceConnectorTerminationRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/voice-connectors/{VoiceConnectorId}/termination",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVoiceConnectorTerminationRequest",
}) as any as S.Schema<DeleteVoiceConnectorTerminationRequest>;
export interface DeleteVoiceConnectorTerminationResponse {}
export const DeleteVoiceConnectorTerminationResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteVoiceConnectorTerminationResponse",
}) as any as S.Schema<DeleteVoiceConnectorTerminationResponse>;
export type SensitiveStringList = string | redacted.Redacted<string>[];
export const SensitiveStringList = S.Array(SensitiveString);
export interface DeleteVoiceConnectorTerminationCredentialsRequest {
  VoiceConnectorId: string;
  Usernames: string | redacted.Redacted<string>[];
}
export const DeleteVoiceConnectorTerminationCredentialsRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
    Usernames: SensitiveStringList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/voice-connectors/{VoiceConnectorId}/termination/credentials?operation=delete",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVoiceConnectorTerminationCredentialsRequest",
}) as any as S.Schema<DeleteVoiceConnectorTerminationCredentialsRequest>;
export interface DeleteVoiceConnectorTerminationCredentialsResponse {}
export const DeleteVoiceConnectorTerminationCredentialsResponse = S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteVoiceConnectorTerminationCredentialsResponse",
}) as any as S.Schema<DeleteVoiceConnectorTerminationCredentialsResponse>;
export interface DeleteVoiceProfileRequest {
  VoiceProfileId: string;
}
export const DeleteVoiceProfileRequest = S.suspend(() =>
  S.Struct({
    VoiceProfileId: S.String.pipe(T.HttpLabel("VoiceProfileId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/voice-profiles/{VoiceProfileId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVoiceProfileRequest",
}) as any as S.Schema<DeleteVoiceProfileRequest>;
export interface DeleteVoiceProfileResponse {}
export const DeleteVoiceProfileResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteVoiceProfileResponse",
}) as any as S.Schema<DeleteVoiceProfileResponse>;
export interface DeleteVoiceProfileDomainRequest {
  VoiceProfileDomainId: string;
}
export const DeleteVoiceProfileDomainRequest = S.suspend(() =>
  S.Struct({
    VoiceProfileDomainId: S.String.pipe(T.HttpLabel("VoiceProfileDomainId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/voice-profile-domains/{VoiceProfileDomainId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVoiceProfileDomainRequest",
}) as any as S.Schema<DeleteVoiceProfileDomainRequest>;
export interface DeleteVoiceProfileDomainResponse {}
export const DeleteVoiceProfileDomainResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteVoiceProfileDomainResponse",
}) as any as S.Schema<DeleteVoiceProfileDomainResponse>;
export interface DisassociatePhoneNumbersFromVoiceConnectorRequest {
  VoiceConnectorId: string;
  E164PhoneNumbers: string | redacted.Redacted<string>[];
}
export const DisassociatePhoneNumbersFromVoiceConnectorRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
    E164PhoneNumbers: E164PhoneNumberList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/voice-connectors/{VoiceConnectorId}?operation=disassociate-phone-numbers",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociatePhoneNumbersFromVoiceConnectorRequest",
}) as any as S.Schema<DisassociatePhoneNumbersFromVoiceConnectorRequest>;
export interface DisassociatePhoneNumbersFromVoiceConnectorResponse {
  PhoneNumberErrors?: PhoneNumberError[];
}
export const DisassociatePhoneNumbersFromVoiceConnectorResponse = S.suspend(
  () => S.Struct({ PhoneNumberErrors: S.optional(PhoneNumberErrorList) }),
).annotate({
  identifier: "DisassociatePhoneNumbersFromVoiceConnectorResponse",
}) as any as S.Schema<DisassociatePhoneNumbersFromVoiceConnectorResponse>;
export interface DisassociatePhoneNumbersFromVoiceConnectorGroupRequest {
  VoiceConnectorGroupId: string;
  E164PhoneNumbers: string | redacted.Redacted<string>[];
}
export const DisassociatePhoneNumbersFromVoiceConnectorGroupRequest = S.suspend(
  () =>
    S.Struct({
      VoiceConnectorGroupId: S.String.pipe(
        T.HttpLabel("VoiceConnectorGroupId"),
      ),
      E164PhoneNumbers: E164PhoneNumberList,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/voice-connector-groups/{VoiceConnectorGroupId}?operation=disassociate-phone-numbers",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DisassociatePhoneNumbersFromVoiceConnectorGroupRequest",
}) as any as S.Schema<DisassociatePhoneNumbersFromVoiceConnectorGroupRequest>;
export interface DisassociatePhoneNumbersFromVoiceConnectorGroupResponse {
  PhoneNumberErrors?: PhoneNumberError[];
}
export const DisassociatePhoneNumbersFromVoiceConnectorGroupResponse =
  S.suspend(() =>
    S.Struct({ PhoneNumberErrors: S.optional(PhoneNumberErrorList) }),
  ).annotate({
    identifier: "DisassociatePhoneNumbersFromVoiceConnectorGroupResponse",
  }) as any as S.Schema<DisassociatePhoneNumbersFromVoiceConnectorGroupResponse>;
export interface GetGlobalSettingsRequest {}
export const GetGlobalSettingsRequest = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetGlobalSettingsRequest",
}) as any as S.Schema<GetGlobalSettingsRequest>;
export interface VoiceConnectorSettings {
  CdrBucket?: string;
}
export const VoiceConnectorSettings = S.suspend(() =>
  S.Struct({ CdrBucket: S.optional(S.String) }),
).annotate({
  identifier: "VoiceConnectorSettings",
}) as any as S.Schema<VoiceConnectorSettings>;
export interface GetGlobalSettingsResponse {
  VoiceConnector?: VoiceConnectorSettings;
}
export const GetGlobalSettingsResponse = S.suspend(() =>
  S.Struct({ VoiceConnector: S.optional(VoiceConnectorSettings) }),
).annotate({
  identifier: "GetGlobalSettingsResponse",
}) as any as S.Schema<GetGlobalSettingsResponse>;
export interface GetPhoneNumberRequest {
  PhoneNumberId: string | redacted.Redacted<string>;
}
export const GetPhoneNumberRequest = S.suspend(() =>
  S.Struct({
    PhoneNumberId: SensitiveString.pipe(T.HttpLabel("PhoneNumberId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/phone-numbers/{PhoneNumberId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPhoneNumberRequest",
}) as any as S.Schema<GetPhoneNumberRequest>;
export type PhoneNumberType = "Local" | "TollFree" | (string & {});
export const PhoneNumberType = S.String;
export type PhoneNumberStatus =
  | "Cancelled"
  | "PortinCancelRequested"
  | "PortinInProgress"
  | "AcquireInProgress"
  | "AcquireFailed"
  | "Unassigned"
  | "Assigned"
  | "ReleaseInProgress"
  | "DeleteInProgress"
  | "ReleaseFailed"
  | "DeleteFailed"
  | (string & {});
export const PhoneNumberStatus = S.String;
export interface PhoneNumberCapabilities {
  InboundCall?: boolean;
  OutboundCall?: boolean;
  InboundSMS?: boolean;
  OutboundSMS?: boolean;
  InboundMMS?: boolean;
  OutboundMMS?: boolean;
}
export const PhoneNumberCapabilities = S.suspend(() =>
  S.Struct({
    InboundCall: S.optional(S.Boolean),
    OutboundCall: S.optional(S.Boolean),
    InboundSMS: S.optional(S.Boolean),
    OutboundSMS: S.optional(S.Boolean),
    InboundMMS: S.optional(S.Boolean),
    OutboundMMS: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "PhoneNumberCapabilities",
}) as any as S.Schema<PhoneNumberCapabilities>;
export type PhoneNumberAssociationName =
  | "VoiceConnectorId"
  | "VoiceConnectorGroupId"
  | "SipRuleId"
  | (string & {});
export const PhoneNumberAssociationName = S.String;
export interface PhoneNumberAssociation {
  Value?: string;
  Name?: PhoneNumberAssociationName;
  AssociatedTimestamp?: Date;
}
export const PhoneNumberAssociation = S.suspend(() =>
  S.Struct({
    Value: S.optional(S.String),
    Name: S.optional(PhoneNumberAssociationName),
    AssociatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "PhoneNumberAssociation",
}) as any as S.Schema<PhoneNumberAssociation>;
export type PhoneNumberAssociationList = PhoneNumberAssociation[];
export const PhoneNumberAssociationList = S.Array(PhoneNumberAssociation);
export type CallingNameStatus =
  | "Unassigned"
  | "UpdateInProgress"
  | "UpdateSucceeded"
  | "UpdateFailed"
  | (string & {});
export const CallingNameStatus = S.String;
export interface PhoneNumber {
  PhoneNumberId?: string | redacted.Redacted<string>;
  E164PhoneNumber?: string | redacted.Redacted<string>;
  Country?: string;
  Type?: PhoneNumberType;
  ProductType?: PhoneNumberProductType;
  Status?: PhoneNumberStatus;
  Capabilities?: PhoneNumberCapabilities;
  Associations?: PhoneNumberAssociation[];
  CallingName?: string | redacted.Redacted<string>;
  CallingNameStatus?: CallingNameStatus;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  DeletionTimestamp?: Date;
  OrderId?: string;
  Name?: string | redacted.Redacted<string>;
}
export const PhoneNumber = S.suspend(() =>
  S.Struct({
    PhoneNumberId: S.optional(SensitiveString),
    E164PhoneNumber: S.optional(SensitiveString),
    Country: S.optional(S.String),
    Type: S.optional(PhoneNumberType),
    ProductType: S.optional(PhoneNumberProductType),
    Status: S.optional(PhoneNumberStatus),
    Capabilities: S.optional(PhoneNumberCapabilities),
    Associations: S.optional(PhoneNumberAssociationList),
    CallingName: S.optional(SensitiveString),
    CallingNameStatus: S.optional(CallingNameStatus),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DeletionTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    OrderId: S.optional(S.String),
    Name: S.optional(SensitiveString),
  }),
).annotate({ identifier: "PhoneNumber" }) as any as S.Schema<PhoneNumber>;
export interface GetPhoneNumberResponse {
  PhoneNumber?: PhoneNumber;
}
export const GetPhoneNumberResponse = S.suspend(() =>
  S.Struct({ PhoneNumber: S.optional(PhoneNumber) }),
).annotate({
  identifier: "GetPhoneNumberResponse",
}) as any as S.Schema<GetPhoneNumberResponse>;
export interface GetPhoneNumberOrderRequest {
  PhoneNumberOrderId: string;
}
export const GetPhoneNumberOrderRequest = S.suspend(() =>
  S.Struct({
    PhoneNumberOrderId: S.String.pipe(T.HttpLabel("PhoneNumberOrderId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/phone-number-orders/{PhoneNumberOrderId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPhoneNumberOrderRequest",
}) as any as S.Schema<GetPhoneNumberOrderRequest>;
export interface GetPhoneNumberOrderResponse {
  PhoneNumberOrder?: PhoneNumberOrder;
}
export const GetPhoneNumberOrderResponse = S.suspend(() =>
  S.Struct({ PhoneNumberOrder: S.optional(PhoneNumberOrder) }),
).annotate({
  identifier: "GetPhoneNumberOrderResponse",
}) as any as S.Schema<GetPhoneNumberOrderResponse>;
export interface GetPhoneNumberSettingsRequest {}
export const GetPhoneNumberSettingsRequest = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetPhoneNumberSettingsRequest",
}) as any as S.Schema<GetPhoneNumberSettingsRequest>;
export interface GetPhoneNumberSettingsResponse {
  CallingName?: string | redacted.Redacted<string>;
  CallingNameUpdatedTimestamp?: Date;
}
export const GetPhoneNumberSettingsResponse = S.suspend(() =>
  S.Struct({
    CallingName: S.optional(SensitiveString),
    CallingNameUpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetPhoneNumberSettingsResponse",
}) as any as S.Schema<GetPhoneNumberSettingsResponse>;
export interface GetProxySessionRequest {
  VoiceConnectorId: string;
  ProxySessionId: string;
}
export const GetProxySessionRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
    ProxySessionId: S.String.pipe(T.HttpLabel("ProxySessionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/voice-connectors/{VoiceConnectorId}/proxy-sessions/{ProxySessionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetProxySessionRequest",
}) as any as S.Schema<GetProxySessionRequest>;
export interface GetProxySessionResponse {
  ProxySession?: ProxySession;
}
export const GetProxySessionResponse = S.suspend(() =>
  S.Struct({ ProxySession: S.optional(ProxySession) }),
).annotate({
  identifier: "GetProxySessionResponse",
}) as any as S.Schema<GetProxySessionResponse>;
export interface GetSipMediaApplicationRequest {
  SipMediaApplicationId: string;
}
export const GetSipMediaApplicationRequest = S.suspend(() =>
  S.Struct({
    SipMediaApplicationId: S.String.pipe(T.HttpLabel("SipMediaApplicationId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/sip-media-applications/{SipMediaApplicationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSipMediaApplicationRequest",
}) as any as S.Schema<GetSipMediaApplicationRequest>;
export interface GetSipMediaApplicationResponse {
  SipMediaApplication?: SipMediaApplication;
}
export const GetSipMediaApplicationResponse = S.suspend(() =>
  S.Struct({ SipMediaApplication: S.optional(SipMediaApplication) }),
).annotate({
  identifier: "GetSipMediaApplicationResponse",
}) as any as S.Schema<GetSipMediaApplicationResponse>;
export interface GetSipMediaApplicationAlexaSkillConfigurationRequest {
  SipMediaApplicationId: string;
}
export const GetSipMediaApplicationAlexaSkillConfigurationRequest = S.suspend(
  () =>
    S.Struct({
      SipMediaApplicationId: S.String.pipe(
        T.HttpLabel("SipMediaApplicationId"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/sip-media-applications/{SipMediaApplicationId}/alexa-skill-configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetSipMediaApplicationAlexaSkillConfigurationRequest",
}) as any as S.Schema<GetSipMediaApplicationAlexaSkillConfigurationRequest>;
export type AlexaSkillStatus = "ACTIVE" | "INACTIVE" | (string & {});
export const AlexaSkillStatus = S.String;
export type AlexaSkillIdList = string | redacted.Redacted<string>[];
export const AlexaSkillIdList = S.Array(SensitiveString);
export interface SipMediaApplicationAlexaSkillConfiguration {
  AlexaSkillStatus: AlexaSkillStatus;
  AlexaSkillIds: string | redacted.Redacted<string>[];
}
export const SipMediaApplicationAlexaSkillConfiguration = S.suspend(() =>
  S.Struct({
    AlexaSkillStatus: AlexaSkillStatus,
    AlexaSkillIds: AlexaSkillIdList,
  }),
).annotate({
  identifier: "SipMediaApplicationAlexaSkillConfiguration",
}) as any as S.Schema<SipMediaApplicationAlexaSkillConfiguration>;
export interface GetSipMediaApplicationAlexaSkillConfigurationResponse {
  SipMediaApplicationAlexaSkillConfiguration?: SipMediaApplicationAlexaSkillConfiguration;
}
export const GetSipMediaApplicationAlexaSkillConfigurationResponse = S.suspend(
  () =>
    S.Struct({
      SipMediaApplicationAlexaSkillConfiguration: S.optional(
        SipMediaApplicationAlexaSkillConfiguration,
      ),
    }),
).annotate({
  identifier: "GetSipMediaApplicationAlexaSkillConfigurationResponse",
}) as any as S.Schema<GetSipMediaApplicationAlexaSkillConfigurationResponse>;
export interface GetSipMediaApplicationLoggingConfigurationRequest {
  SipMediaApplicationId: string;
}
export const GetSipMediaApplicationLoggingConfigurationRequest = S.suspend(() =>
  S.Struct({
    SipMediaApplicationId: S.String.pipe(T.HttpLabel("SipMediaApplicationId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/sip-media-applications/{SipMediaApplicationId}/logging-configuration",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSipMediaApplicationLoggingConfigurationRequest",
}) as any as S.Schema<GetSipMediaApplicationLoggingConfigurationRequest>;
export interface SipMediaApplicationLoggingConfiguration {
  EnableSipMediaApplicationMessageLogs?: boolean;
}
export const SipMediaApplicationLoggingConfiguration = S.suspend(() =>
  S.Struct({ EnableSipMediaApplicationMessageLogs: S.optional(S.Boolean) }),
).annotate({
  identifier: "SipMediaApplicationLoggingConfiguration",
}) as any as S.Schema<SipMediaApplicationLoggingConfiguration>;
export interface GetSipMediaApplicationLoggingConfigurationResponse {
  SipMediaApplicationLoggingConfiguration?: SipMediaApplicationLoggingConfiguration;
}
export const GetSipMediaApplicationLoggingConfigurationResponse = S.suspend(
  () =>
    S.Struct({
      SipMediaApplicationLoggingConfiguration: S.optional(
        SipMediaApplicationLoggingConfiguration,
      ),
    }),
).annotate({
  identifier: "GetSipMediaApplicationLoggingConfigurationResponse",
}) as any as S.Schema<GetSipMediaApplicationLoggingConfigurationResponse>;
export interface GetSipRuleRequest {
  SipRuleId: string;
}
export const GetSipRuleRequest = S.suspend(() =>
  S.Struct({ SipRuleId: S.String.pipe(T.HttpLabel("SipRuleId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sip-rules/{SipRuleId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSipRuleRequest",
}) as any as S.Schema<GetSipRuleRequest>;
export interface GetSipRuleResponse {
  SipRule?: SipRule;
}
export const GetSipRuleResponse = S.suspend(() =>
  S.Struct({ SipRule: S.optional(SipRule) }),
).annotate({
  identifier: "GetSipRuleResponse",
}) as any as S.Schema<GetSipRuleResponse>;
export interface GetSpeakerSearchTaskRequest {
  VoiceConnectorId: string;
  SpeakerSearchTaskId: string;
}
export const GetSpeakerSearchTaskRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
    SpeakerSearchTaskId: S.String.pipe(T.HttpLabel("SpeakerSearchTaskId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/voice-connectors/{VoiceConnectorId}/speaker-search-tasks/{SpeakerSearchTaskId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSpeakerSearchTaskRequest",
}) as any as S.Schema<GetSpeakerSearchTaskRequest>;
export interface CallDetails {
  VoiceConnectorId?: string;
  TransactionId?: string;
  IsCaller?: boolean;
}
export const CallDetails = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.optional(S.String),
    TransactionId: S.optional(S.String),
    IsCaller: S.optional(S.Boolean),
  }),
).annotate({ identifier: "CallDetails" }) as any as S.Schema<CallDetails>;
export interface SpeakerSearchResult {
  ConfidenceScore?: number;
  VoiceProfileId?: string;
}
export const SpeakerSearchResult = S.suspend(() =>
  S.Struct({
    ConfidenceScore: S.optional(S.Number),
    VoiceProfileId: S.optional(S.String),
  }),
).annotate({
  identifier: "SpeakerSearchResult",
}) as any as S.Schema<SpeakerSearchResult>;
export type SpeakerSearchResultList = SpeakerSearchResult[];
export const SpeakerSearchResultList = S.Array(SpeakerSearchResult);
export interface SpeakerSearchDetails {
  Results?: SpeakerSearchResult[];
  VoiceprintGenerationStatus?: string;
}
export const SpeakerSearchDetails = S.suspend(() =>
  S.Struct({
    Results: S.optional(SpeakerSearchResultList),
    VoiceprintGenerationStatus: S.optional(S.String),
  }),
).annotate({
  identifier: "SpeakerSearchDetails",
}) as any as S.Schema<SpeakerSearchDetails>;
export interface SpeakerSearchTask {
  SpeakerSearchTaskId?: string;
  SpeakerSearchTaskStatus?: string;
  CallDetails?: CallDetails;
  SpeakerSearchDetails?: SpeakerSearchDetails;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  StartedTimestamp?: Date;
  StatusMessage?: string;
}
export const SpeakerSearchTask = S.suspend(() =>
  S.Struct({
    SpeakerSearchTaskId: S.optional(S.String),
    SpeakerSearchTaskStatus: S.optional(S.String),
    CallDetails: S.optional(CallDetails),
    SpeakerSearchDetails: S.optional(SpeakerSearchDetails),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    StartedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    StatusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "SpeakerSearchTask",
}) as any as S.Schema<SpeakerSearchTask>;
export interface GetSpeakerSearchTaskResponse {
  SpeakerSearchTask?: SpeakerSearchTask;
}
export const GetSpeakerSearchTaskResponse = S.suspend(() =>
  S.Struct({ SpeakerSearchTask: S.optional(SpeakerSearchTask) }),
).annotate({
  identifier: "GetSpeakerSearchTaskResponse",
}) as any as S.Schema<GetSpeakerSearchTaskResponse>;
export interface GetVoiceConnectorRequest {
  VoiceConnectorId: string;
}
export const GetVoiceConnectorRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/voice-connectors/{VoiceConnectorId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVoiceConnectorRequest",
}) as any as S.Schema<GetVoiceConnectorRequest>;
export interface GetVoiceConnectorResponse {
  VoiceConnector?: VoiceConnector;
}
export const GetVoiceConnectorResponse = S.suspend(() =>
  S.Struct({ VoiceConnector: S.optional(VoiceConnector) }),
).annotate({
  identifier: "GetVoiceConnectorResponse",
}) as any as S.Schema<GetVoiceConnectorResponse>;
export interface GetVoiceConnectorEmergencyCallingConfigurationRequest {
  VoiceConnectorId: string;
}
export const GetVoiceConnectorEmergencyCallingConfigurationRequest = S.suspend(
  () =>
    S.Struct({
      VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/voice-connectors/{VoiceConnectorId}/emergency-calling-configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetVoiceConnectorEmergencyCallingConfigurationRequest",
}) as any as S.Schema<GetVoiceConnectorEmergencyCallingConfigurationRequest>;
export interface DNISEmergencyCallingConfiguration {
  EmergencyPhoneNumber: string | redacted.Redacted<string>;
  TestPhoneNumber?: string | redacted.Redacted<string>;
  CallingCountry: string;
}
export const DNISEmergencyCallingConfiguration = S.suspend(() =>
  S.Struct({
    EmergencyPhoneNumber: SensitiveString,
    TestPhoneNumber: S.optional(SensitiveString),
    CallingCountry: S.String,
  }),
).annotate({
  identifier: "DNISEmergencyCallingConfiguration",
}) as any as S.Schema<DNISEmergencyCallingConfiguration>;
export type DNISEmergencyCallingConfigurationList =
  DNISEmergencyCallingConfiguration[];
export const DNISEmergencyCallingConfigurationList = S.Array(
  DNISEmergencyCallingConfiguration,
);
export interface EmergencyCallingConfiguration {
  DNIS?: DNISEmergencyCallingConfiguration[];
}
export const EmergencyCallingConfiguration = S.suspend(() =>
  S.Struct({ DNIS: S.optional(DNISEmergencyCallingConfigurationList) }),
).annotate({
  identifier: "EmergencyCallingConfiguration",
}) as any as S.Schema<EmergencyCallingConfiguration>;
export interface GetVoiceConnectorEmergencyCallingConfigurationResponse {
  EmergencyCallingConfiguration?: EmergencyCallingConfiguration;
}
export const GetVoiceConnectorEmergencyCallingConfigurationResponse = S.suspend(
  () =>
    S.Struct({
      EmergencyCallingConfiguration: S.optional(EmergencyCallingConfiguration),
    }),
).annotate({
  identifier: "GetVoiceConnectorEmergencyCallingConfigurationResponse",
}) as any as S.Schema<GetVoiceConnectorEmergencyCallingConfigurationResponse>;
export interface GetVoiceConnectorExternalSystemsConfigurationRequest {
  VoiceConnectorId: string;
}
export const GetVoiceConnectorExternalSystemsConfigurationRequest = S.suspend(
  () =>
    S.Struct({
      VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/voice-connectors/{VoiceConnectorId}/external-systems-configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetVoiceConnectorExternalSystemsConfigurationRequest",
}) as any as S.Schema<GetVoiceConnectorExternalSystemsConfigurationRequest>;
export type SessionBorderControllerType =
  | "RIBBON_SBC"
  | "ORACLE_ACME_PACKET_SBC"
  | "AVAYA_SBCE"
  | "CISCO_UNIFIED_BORDER_ELEMENT"
  | "AUDIOCODES_MEDIANT_SBC"
  | (string & {});
export const SessionBorderControllerType = S.String;
export type SessionBorderControllerTypeList = SessionBorderControllerType[];
export const SessionBorderControllerTypeList = S.Array(
  SessionBorderControllerType,
);
export type ContactCenterSystemType =
  | "GENESYS_ENGAGE_ON_PREMISES"
  | "AVAYA_AURA_CALL_CENTER_ELITE"
  | "AVAYA_AURA_CONTACT_CENTER"
  | "CISCO_UNIFIED_CONTACT_CENTER_ENTERPRISE"
  | (string & {});
export const ContactCenterSystemType = S.String;
export type ContactCenterSystemTypeList = ContactCenterSystemType[];
export const ContactCenterSystemTypeList = S.Array(ContactCenterSystemType);
export interface ExternalSystemsConfiguration {
  SessionBorderControllerTypes?: SessionBorderControllerType[];
  ContactCenterSystemTypes?: ContactCenterSystemType[];
}
export const ExternalSystemsConfiguration = S.suspend(() =>
  S.Struct({
    SessionBorderControllerTypes: S.optional(SessionBorderControllerTypeList),
    ContactCenterSystemTypes: S.optional(ContactCenterSystemTypeList),
  }),
).annotate({
  identifier: "ExternalSystemsConfiguration",
}) as any as S.Schema<ExternalSystemsConfiguration>;
export interface GetVoiceConnectorExternalSystemsConfigurationResponse {
  ExternalSystemsConfiguration?: ExternalSystemsConfiguration;
}
export const GetVoiceConnectorExternalSystemsConfigurationResponse = S.suspend(
  () =>
    S.Struct({
      ExternalSystemsConfiguration: S.optional(ExternalSystemsConfiguration),
    }),
).annotate({
  identifier: "GetVoiceConnectorExternalSystemsConfigurationResponse",
}) as any as S.Schema<GetVoiceConnectorExternalSystemsConfigurationResponse>;
export interface GetVoiceConnectorGroupRequest {
  VoiceConnectorGroupId: string;
}
export const GetVoiceConnectorGroupRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorGroupId: S.String.pipe(T.HttpLabel("VoiceConnectorGroupId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/voice-connector-groups/{VoiceConnectorGroupId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVoiceConnectorGroupRequest",
}) as any as S.Schema<GetVoiceConnectorGroupRequest>;
export interface GetVoiceConnectorGroupResponse {
  VoiceConnectorGroup?: VoiceConnectorGroup;
}
export const GetVoiceConnectorGroupResponse = S.suspend(() =>
  S.Struct({ VoiceConnectorGroup: S.optional(VoiceConnectorGroup) }),
).annotate({
  identifier: "GetVoiceConnectorGroupResponse",
}) as any as S.Schema<GetVoiceConnectorGroupResponse>;
export interface GetVoiceConnectorLoggingConfigurationRequest {
  VoiceConnectorId: string;
}
export const GetVoiceConnectorLoggingConfigurationRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/voice-connectors/{VoiceConnectorId}/logging-configuration",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVoiceConnectorLoggingConfigurationRequest",
}) as any as S.Schema<GetVoiceConnectorLoggingConfigurationRequest>;
export interface LoggingConfiguration {
  EnableSIPLogs?: boolean;
  EnableMediaMetricLogs?: boolean;
}
export const LoggingConfiguration = S.suspend(() =>
  S.Struct({
    EnableSIPLogs: S.optional(S.Boolean),
    EnableMediaMetricLogs: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "LoggingConfiguration",
}) as any as S.Schema<LoggingConfiguration>;
export interface GetVoiceConnectorLoggingConfigurationResponse {
  LoggingConfiguration?: LoggingConfiguration;
}
export const GetVoiceConnectorLoggingConfigurationResponse = S.suspend(() =>
  S.Struct({ LoggingConfiguration: S.optional(LoggingConfiguration) }),
).annotate({
  identifier: "GetVoiceConnectorLoggingConfigurationResponse",
}) as any as S.Schema<GetVoiceConnectorLoggingConfigurationResponse>;
export interface GetVoiceConnectorOriginationRequest {
  VoiceConnectorId: string;
}
export const GetVoiceConnectorOriginationRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/voice-connectors/{VoiceConnectorId}/origination",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVoiceConnectorOriginationRequest",
}) as any as S.Schema<GetVoiceConnectorOriginationRequest>;
export type OriginationRouteProtocol = "TCP" | "UDP" | (string & {});
export const OriginationRouteProtocol = S.String;
export interface OriginationRoute {
  Host?: string;
  Port?: number;
  Protocol?: OriginationRouteProtocol;
  Priority?: number;
  Weight?: number;
}
export const OriginationRoute = S.suspend(() =>
  S.Struct({
    Host: S.optional(S.String),
    Port: S.optional(S.Number),
    Protocol: S.optional(OriginationRouteProtocol),
    Priority: S.optional(S.Number),
    Weight: S.optional(S.Number),
  }),
).annotate({
  identifier: "OriginationRoute",
}) as any as S.Schema<OriginationRoute>;
export type OriginationRouteList = OriginationRoute[];
export const OriginationRouteList = S.Array(OriginationRoute);
export interface Origination {
  Routes?: OriginationRoute[];
  Disabled?: boolean;
}
export const Origination = S.suspend(() =>
  S.Struct({
    Routes: S.optional(OriginationRouteList),
    Disabled: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Origination" }) as any as S.Schema<Origination>;
export interface GetVoiceConnectorOriginationResponse {
  Origination?: Origination;
}
export const GetVoiceConnectorOriginationResponse = S.suspend(() =>
  S.Struct({ Origination: S.optional(Origination) }),
).annotate({
  identifier: "GetVoiceConnectorOriginationResponse",
}) as any as S.Schema<GetVoiceConnectorOriginationResponse>;
export interface GetVoiceConnectorProxyRequest {
  VoiceConnectorId: string;
}
export const GetVoiceConnectorProxyRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/voice-connectors/{VoiceConnectorId}/programmable-numbers/proxy",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVoiceConnectorProxyRequest",
}) as any as S.Schema<GetVoiceConnectorProxyRequest>;
export type StringList = string[];
export const StringList = S.Array(S.String);
export interface Proxy {
  DefaultSessionExpiryMinutes?: number;
  Disabled?: boolean;
  FallBackPhoneNumber?: string | redacted.Redacted<string>;
  PhoneNumberCountries?: string[];
}
export const Proxy = S.suspend(() =>
  S.Struct({
    DefaultSessionExpiryMinutes: S.optional(S.Number),
    Disabled: S.optional(S.Boolean),
    FallBackPhoneNumber: S.optional(SensitiveString),
    PhoneNumberCountries: S.optional(StringList),
  }),
).annotate({ identifier: "Proxy" }) as any as S.Schema<Proxy>;
export interface GetVoiceConnectorProxyResponse {
  Proxy?: Proxy;
}
export const GetVoiceConnectorProxyResponse = S.suspend(() =>
  S.Struct({ Proxy: S.optional(Proxy) }),
).annotate({
  identifier: "GetVoiceConnectorProxyResponse",
}) as any as S.Schema<GetVoiceConnectorProxyResponse>;
export interface GetVoiceConnectorStreamingConfigurationRequest {
  VoiceConnectorId: string;
}
export const GetVoiceConnectorStreamingConfigurationRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/voice-connectors/{VoiceConnectorId}/streaming-configuration",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVoiceConnectorStreamingConfigurationRequest",
}) as any as S.Schema<GetVoiceConnectorStreamingConfigurationRequest>;
export type NotificationTarget = "EventBridge" | "SNS" | "SQS" | (string & {});
export const NotificationTarget = S.String;
export interface StreamingNotificationTarget {
  NotificationTarget?: NotificationTarget;
}
export const StreamingNotificationTarget = S.suspend(() =>
  S.Struct({ NotificationTarget: S.optional(NotificationTarget) }),
).annotate({
  identifier: "StreamingNotificationTarget",
}) as any as S.Schema<StreamingNotificationTarget>;
export type StreamingNotificationTargetList = StreamingNotificationTarget[];
export const StreamingNotificationTargetList = S.Array(
  StreamingNotificationTarget,
);
export interface MediaInsightsConfiguration {
  Disabled?: boolean;
  ConfigurationArn?: string | redacted.Redacted<string>;
}
export const MediaInsightsConfiguration = S.suspend(() =>
  S.Struct({
    Disabled: S.optional(S.Boolean),
    ConfigurationArn: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "MediaInsightsConfiguration",
}) as any as S.Schema<MediaInsightsConfiguration>;
export interface StreamingConfiguration {
  DataRetentionInHours: number;
  Disabled: boolean;
  StreamingNotificationTargets?: StreamingNotificationTarget[];
  MediaInsightsConfiguration?: MediaInsightsConfiguration;
}
export const StreamingConfiguration = S.suspend(() =>
  S.Struct({
    DataRetentionInHours: S.Number,
    Disabled: S.Boolean,
    StreamingNotificationTargets: S.optional(StreamingNotificationTargetList),
    MediaInsightsConfiguration: S.optional(MediaInsightsConfiguration),
  }),
).annotate({
  identifier: "StreamingConfiguration",
}) as any as S.Schema<StreamingConfiguration>;
export interface GetVoiceConnectorStreamingConfigurationResponse {
  StreamingConfiguration?: StreamingConfiguration;
}
export const GetVoiceConnectorStreamingConfigurationResponse = S.suspend(() =>
  S.Struct({ StreamingConfiguration: S.optional(StreamingConfiguration) }),
).annotate({
  identifier: "GetVoiceConnectorStreamingConfigurationResponse",
}) as any as S.Schema<GetVoiceConnectorStreamingConfigurationResponse>;
export interface GetVoiceConnectorTerminationRequest {
  VoiceConnectorId: string;
}
export const GetVoiceConnectorTerminationRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/voice-connectors/{VoiceConnectorId}/termination",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVoiceConnectorTerminationRequest",
}) as any as S.Schema<GetVoiceConnectorTerminationRequest>;
export type CallingRegionList = string[];
export const CallingRegionList = S.Array(S.String);
export interface Termination {
  CpsLimit?: number;
  DefaultPhoneNumber?: string | redacted.Redacted<string>;
  CallingRegions?: string[];
  CidrAllowedList?: string[];
  Disabled?: boolean;
}
export const Termination = S.suspend(() =>
  S.Struct({
    CpsLimit: S.optional(S.Number),
    DefaultPhoneNumber: S.optional(SensitiveString),
    CallingRegions: S.optional(CallingRegionList),
    CidrAllowedList: S.optional(StringList),
    Disabled: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Termination" }) as any as S.Schema<Termination>;
export interface GetVoiceConnectorTerminationResponse {
  Termination?: Termination;
}
export const GetVoiceConnectorTerminationResponse = S.suspend(() =>
  S.Struct({ Termination: S.optional(Termination) }),
).annotate({
  identifier: "GetVoiceConnectorTerminationResponse",
}) as any as S.Schema<GetVoiceConnectorTerminationResponse>;
export interface GetVoiceConnectorTerminationHealthRequest {
  VoiceConnectorId: string;
}
export const GetVoiceConnectorTerminationHealthRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/voice-connectors/{VoiceConnectorId}/termination/health",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVoiceConnectorTerminationHealthRequest",
}) as any as S.Schema<GetVoiceConnectorTerminationHealthRequest>;
export interface TerminationHealth {
  Timestamp?: Date;
  Source?: string;
}
export const TerminationHealth = S.suspend(() =>
  S.Struct({
    Timestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Source: S.optional(S.String),
  }),
).annotate({
  identifier: "TerminationHealth",
}) as any as S.Schema<TerminationHealth>;
export interface GetVoiceConnectorTerminationHealthResponse {
  TerminationHealth?: TerminationHealth;
}
export const GetVoiceConnectorTerminationHealthResponse = S.suspend(() =>
  S.Struct({ TerminationHealth: S.optional(TerminationHealth) }),
).annotate({
  identifier: "GetVoiceConnectorTerminationHealthResponse",
}) as any as S.Schema<GetVoiceConnectorTerminationHealthResponse>;
export interface GetVoiceProfileRequest {
  VoiceProfileId: string;
}
export const GetVoiceProfileRequest = S.suspend(() =>
  S.Struct({
    VoiceProfileId: S.String.pipe(T.HttpLabel("VoiceProfileId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/voice-profiles/{VoiceProfileId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVoiceProfileRequest",
}) as any as S.Schema<GetVoiceProfileRequest>;
export interface GetVoiceProfileResponse {
  VoiceProfile?: VoiceProfile;
}
export const GetVoiceProfileResponse = S.suspend(() =>
  S.Struct({ VoiceProfile: S.optional(VoiceProfile) }),
).annotate({
  identifier: "GetVoiceProfileResponse",
}) as any as S.Schema<GetVoiceProfileResponse>;
export interface GetVoiceProfileDomainRequest {
  VoiceProfileDomainId: string;
}
export const GetVoiceProfileDomainRequest = S.suspend(() =>
  S.Struct({
    VoiceProfileDomainId: S.String.pipe(T.HttpLabel("VoiceProfileDomainId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/voice-profile-domains/{VoiceProfileDomainId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVoiceProfileDomainRequest",
}) as any as S.Schema<GetVoiceProfileDomainRequest>;
export interface GetVoiceProfileDomainResponse {
  VoiceProfileDomain?: VoiceProfileDomain;
}
export const GetVoiceProfileDomainResponse = S.suspend(() =>
  S.Struct({ VoiceProfileDomain: S.optional(VoiceProfileDomain) }),
).annotate({
  identifier: "GetVoiceProfileDomainResponse",
}) as any as S.Schema<GetVoiceProfileDomainResponse>;
export interface GetVoiceToneAnalysisTaskRequest {
  VoiceConnectorId: string;
  VoiceToneAnalysisTaskId: string;
  IsCaller: boolean;
}
export const GetVoiceToneAnalysisTaskRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
    VoiceToneAnalysisTaskId: S.String.pipe(
      T.HttpLabel("VoiceToneAnalysisTaskId"),
    ),
    IsCaller: S.Boolean.pipe(T.HttpQuery("isCaller")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/voice-connectors/{VoiceConnectorId}/voice-tone-analysis-tasks/{VoiceToneAnalysisTaskId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVoiceToneAnalysisTaskRequest",
}) as any as S.Schema<GetVoiceToneAnalysisTaskRequest>;
export interface VoiceToneAnalysisTask {
  VoiceToneAnalysisTaskId?: string;
  VoiceToneAnalysisTaskStatus?: string;
  CallDetails?: CallDetails;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  StartedTimestamp?: Date;
  StatusMessage?: string;
}
export const VoiceToneAnalysisTask = S.suspend(() =>
  S.Struct({
    VoiceToneAnalysisTaskId: S.optional(S.String),
    VoiceToneAnalysisTaskStatus: S.optional(S.String),
    CallDetails: S.optional(CallDetails),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    StartedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    StatusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "VoiceToneAnalysisTask",
}) as any as S.Schema<VoiceToneAnalysisTask>;
export interface GetVoiceToneAnalysisTaskResponse {
  VoiceToneAnalysisTask?: VoiceToneAnalysisTask;
}
export const GetVoiceToneAnalysisTaskResponse = S.suspend(() =>
  S.Struct({ VoiceToneAnalysisTask: S.optional(VoiceToneAnalysisTask) }),
).annotate({
  identifier: "GetVoiceToneAnalysisTaskResponse",
}) as any as S.Schema<GetVoiceToneAnalysisTaskResponse>;
export interface ListAvailableVoiceConnectorRegionsRequest {}
export const ListAvailableVoiceConnectorRegionsRequest = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAvailableVoiceConnectorRegionsRequest",
}) as any as S.Schema<ListAvailableVoiceConnectorRegionsRequest>;
export type VoiceConnectorAwsRegionList = VoiceConnectorAwsRegion[];
export const VoiceConnectorAwsRegionList = S.Array(VoiceConnectorAwsRegion);
export interface ListAvailableVoiceConnectorRegionsResponse {
  VoiceConnectorRegions?: VoiceConnectorAwsRegion[];
}
export const ListAvailableVoiceConnectorRegionsResponse = S.suspend(() =>
  S.Struct({ VoiceConnectorRegions: S.optional(VoiceConnectorAwsRegionList) }),
).annotate({
  identifier: "ListAvailableVoiceConnectorRegionsResponse",
}) as any as S.Schema<ListAvailableVoiceConnectorRegionsResponse>;
export interface ListPhoneNumberOrdersRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListPhoneNumberOrdersRequest = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/phone-number-orders" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPhoneNumberOrdersRequest",
}) as any as S.Schema<ListPhoneNumberOrdersRequest>;
export type PhoneNumberOrderList = PhoneNumberOrder[];
export const PhoneNumberOrderList = S.Array(PhoneNumberOrder);
export interface ListPhoneNumberOrdersResponse {
  PhoneNumberOrders?: PhoneNumberOrder[];
  NextToken?: string;
}
export const ListPhoneNumberOrdersResponse = S.suspend(() =>
  S.Struct({
    PhoneNumberOrders: S.optional(PhoneNumberOrderList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPhoneNumberOrdersResponse",
}) as any as S.Schema<ListPhoneNumberOrdersResponse>;
export interface ListPhoneNumbersRequest {
  Status?: string;
  ProductType?: PhoneNumberProductType;
  FilterName?: PhoneNumberAssociationName;
  FilterValue?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListPhoneNumbersRequest = S.suspend(() =>
  S.Struct({
    Status: S.optional(S.String).pipe(T.HttpQuery("status")),
    ProductType: S.optional(PhoneNumberProductType).pipe(
      T.HttpQuery("product-type"),
    ),
    FilterName: S.optional(PhoneNumberAssociationName).pipe(
      T.HttpQuery("filter-name"),
    ),
    FilterValue: S.optional(S.String).pipe(T.HttpQuery("filter-value")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/phone-numbers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPhoneNumbersRequest",
}) as any as S.Schema<ListPhoneNumbersRequest>;
export type PhoneNumberList = PhoneNumber[];
export const PhoneNumberList = S.Array(PhoneNumber);
export interface ListPhoneNumbersResponse {
  PhoneNumbers?: PhoneNumber[];
  NextToken?: string;
}
export const ListPhoneNumbersResponse = S.suspend(() =>
  S.Struct({
    PhoneNumbers: S.optional(PhoneNumberList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPhoneNumbersResponse",
}) as any as S.Schema<ListPhoneNumbersResponse>;
export interface ListProxySessionsRequest {
  VoiceConnectorId: string;
  Status?: ProxySessionStatus;
  NextToken?: string;
  MaxResults?: number;
}
export const ListProxySessionsRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
    Status: S.optional(ProxySessionStatus).pipe(T.HttpQuery("status")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/voice-connectors/{VoiceConnectorId}/proxy-sessions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListProxySessionsRequest",
}) as any as S.Schema<ListProxySessionsRequest>;
export type ProxySessions = ProxySession[];
export const ProxySessions = S.Array(ProxySession);
export interface ListProxySessionsResponse {
  ProxySessions?: ProxySession[];
  NextToken?: string;
}
export const ListProxySessionsResponse = S.suspend(() =>
  S.Struct({
    ProxySessions: S.optional(ProxySessions),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListProxySessionsResponse",
}) as any as S.Schema<ListProxySessionsResponse>;
export interface ListSipMediaApplicationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListSipMediaApplicationsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sip-media-applications" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSipMediaApplicationsRequest",
}) as any as S.Schema<ListSipMediaApplicationsRequest>;
export type SipMediaApplicationList = SipMediaApplication[];
export const SipMediaApplicationList = S.Array(SipMediaApplication);
export interface ListSipMediaApplicationsResponse {
  SipMediaApplications?: SipMediaApplication[];
  NextToken?: string;
}
export const ListSipMediaApplicationsResponse = S.suspend(() =>
  S.Struct({
    SipMediaApplications: S.optional(SipMediaApplicationList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSipMediaApplicationsResponse",
}) as any as S.Schema<ListSipMediaApplicationsResponse>;
export interface ListSipRulesRequest {
  SipMediaApplicationId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListSipRulesRequest = S.suspend(() =>
  S.Struct({
    SipMediaApplicationId: S.optional(S.String).pipe(
      T.HttpQuery("sip-media-application"),
    ),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sip-rules" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSipRulesRequest",
}) as any as S.Schema<ListSipRulesRequest>;
export type SipRuleList = SipRule[];
export const SipRuleList = S.Array(SipRule);
export interface ListSipRulesResponse {
  SipRules?: SipRule[];
  NextToken?: string;
}
export const ListSipRulesResponse = S.suspend(() =>
  S.Struct({
    SipRules: S.optional(SipRuleList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSipRulesResponse",
}) as any as S.Schema<ListSipRulesResponse>;
export interface ListSupportedPhoneNumberCountriesRequest {
  ProductType: PhoneNumberProductType;
}
export const ListSupportedPhoneNumberCountriesRequest = S.suspend(() =>
  S.Struct({
    ProductType: PhoneNumberProductType.pipe(T.HttpQuery("product-type")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/phone-number-countries" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSupportedPhoneNumberCountriesRequest",
}) as any as S.Schema<ListSupportedPhoneNumberCountriesRequest>;
export type PhoneNumberTypeList = PhoneNumberType[];
export const PhoneNumberTypeList = S.Array(PhoneNumberType);
export interface PhoneNumberCountry {
  CountryCode?: string;
  SupportedPhoneNumberTypes?: PhoneNumberType[];
}
export const PhoneNumberCountry = S.suspend(() =>
  S.Struct({
    CountryCode: S.optional(S.String),
    SupportedPhoneNumberTypes: S.optional(PhoneNumberTypeList),
  }),
).annotate({
  identifier: "PhoneNumberCountry",
}) as any as S.Schema<PhoneNumberCountry>;
export type PhoneNumberCountriesList = PhoneNumberCountry[];
export const PhoneNumberCountriesList = S.Array(PhoneNumberCountry);
export interface ListSupportedPhoneNumberCountriesResponse {
  PhoneNumberCountries?: PhoneNumberCountry[];
}
export const ListSupportedPhoneNumberCountriesResponse = S.suspend(() =>
  S.Struct({ PhoneNumberCountries: S.optional(PhoneNumberCountriesList) }),
).annotate({
  identifier: "ListSupportedPhoneNumberCountriesResponse",
}) as any as S.Schema<ListSupportedPhoneNumberCountriesResponse>;
export interface ListTagsForResourceRequest {
  ResourceARN: string | redacted.Redacted<string>;
}
export const ListTagsForResourceRequest = S.suspend(() =>
  S.Struct({ ResourceARN: SensitiveString.pipe(T.HttpQuery("arn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListVoiceConnectorGroupsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListVoiceConnectorGroupsRequest = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/voice-connector-groups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVoiceConnectorGroupsRequest",
}) as any as S.Schema<ListVoiceConnectorGroupsRequest>;
export type VoiceConnectorGroupList = VoiceConnectorGroup[];
export const VoiceConnectorGroupList = S.Array(VoiceConnectorGroup);
export interface ListVoiceConnectorGroupsResponse {
  VoiceConnectorGroups?: VoiceConnectorGroup[];
  NextToken?: string;
}
export const ListVoiceConnectorGroupsResponse = S.suspend(() =>
  S.Struct({
    VoiceConnectorGroups: S.optional(VoiceConnectorGroupList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListVoiceConnectorGroupsResponse",
}) as any as S.Schema<ListVoiceConnectorGroupsResponse>;
export interface ListVoiceConnectorsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListVoiceConnectorsRequest = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/voice-connectors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVoiceConnectorsRequest",
}) as any as S.Schema<ListVoiceConnectorsRequest>;
export type VoiceConnectorList = VoiceConnector[];
export const VoiceConnectorList = S.Array(VoiceConnector);
export interface ListVoiceConnectorsResponse {
  VoiceConnectors?: VoiceConnector[];
  NextToken?: string;
}
export const ListVoiceConnectorsResponse = S.suspend(() =>
  S.Struct({
    VoiceConnectors: S.optional(VoiceConnectorList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListVoiceConnectorsResponse",
}) as any as S.Schema<ListVoiceConnectorsResponse>;
export interface ListVoiceConnectorTerminationCredentialsRequest {
  VoiceConnectorId: string;
}
export const ListVoiceConnectorTerminationCredentialsRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/voice-connectors/{VoiceConnectorId}/termination/credentials",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVoiceConnectorTerminationCredentialsRequest",
}) as any as S.Schema<ListVoiceConnectorTerminationCredentialsRequest>;
export interface ListVoiceConnectorTerminationCredentialsResponse {
  Usernames?: string | redacted.Redacted<string>[];
}
export const ListVoiceConnectorTerminationCredentialsResponse = S.suspend(() =>
  S.Struct({ Usernames: S.optional(SensitiveStringList) }),
).annotate({
  identifier: "ListVoiceConnectorTerminationCredentialsResponse",
}) as any as S.Schema<ListVoiceConnectorTerminationCredentialsResponse>;
export interface ListVoiceProfileDomainsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListVoiceProfileDomainsRequest = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/voice-profile-domains" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVoiceProfileDomainsRequest",
}) as any as S.Schema<ListVoiceProfileDomainsRequest>;
export interface VoiceProfileDomainSummary {
  VoiceProfileDomainId?: string;
  VoiceProfileDomainArn?: string | redacted.Redacted<string>;
  Name?: string;
  Description?: string;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export const VoiceProfileDomainSummary = S.suspend(() =>
  S.Struct({
    VoiceProfileDomainId: S.optional(S.String),
    VoiceProfileDomainArn: S.optional(SensitiveString),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "VoiceProfileDomainSummary",
}) as any as S.Schema<VoiceProfileDomainSummary>;
export type VoiceProfileDomainSummaryList = VoiceProfileDomainSummary[];
export const VoiceProfileDomainSummaryList = S.Array(VoiceProfileDomainSummary);
export interface ListVoiceProfileDomainsResponse {
  VoiceProfileDomains?: VoiceProfileDomainSummary[];
  NextToken?: string;
}
export const ListVoiceProfileDomainsResponse = S.suspend(() =>
  S.Struct({
    VoiceProfileDomains: S.optional(VoiceProfileDomainSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListVoiceProfileDomainsResponse",
}) as any as S.Schema<ListVoiceProfileDomainsResponse>;
export interface ListVoiceProfilesRequest {
  VoiceProfileDomainId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListVoiceProfilesRequest = S.suspend(() =>
  S.Struct({
    VoiceProfileDomainId: S.String.pipe(T.HttpQuery("voice-profile-domain-id")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/voice-profiles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVoiceProfilesRequest",
}) as any as S.Schema<ListVoiceProfilesRequest>;
export interface VoiceProfileSummary {
  VoiceProfileId?: string;
  VoiceProfileArn?: string | redacted.Redacted<string>;
  VoiceProfileDomainId?: string;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  ExpirationTimestamp?: Date;
}
export const VoiceProfileSummary = S.suspend(() =>
  S.Struct({
    VoiceProfileId: S.optional(S.String),
    VoiceProfileArn: S.optional(SensitiveString),
    VoiceProfileDomainId: S.optional(S.String),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ExpirationTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "VoiceProfileSummary",
}) as any as S.Schema<VoiceProfileSummary>;
export type VoiceProfileSummaryList = VoiceProfileSummary[];
export const VoiceProfileSummaryList = S.Array(VoiceProfileSummary);
export interface ListVoiceProfilesResponse {
  VoiceProfiles?: VoiceProfileSummary[];
  NextToken?: string;
}
export const ListVoiceProfilesResponse = S.suspend(() =>
  S.Struct({
    VoiceProfiles: S.optional(VoiceProfileSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListVoiceProfilesResponse",
}) as any as S.Schema<ListVoiceProfilesResponse>;
export interface PutSipMediaApplicationAlexaSkillConfigurationRequest {
  SipMediaApplicationId: string;
  SipMediaApplicationAlexaSkillConfiguration?: SipMediaApplicationAlexaSkillConfiguration;
}
export const PutSipMediaApplicationAlexaSkillConfigurationRequest = S.suspend(
  () =>
    S.Struct({
      SipMediaApplicationId: S.String.pipe(
        T.HttpLabel("SipMediaApplicationId"),
      ),
      SipMediaApplicationAlexaSkillConfiguration: S.optional(
        SipMediaApplicationAlexaSkillConfiguration,
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/sip-media-applications/{SipMediaApplicationId}/alexa-skill-configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutSipMediaApplicationAlexaSkillConfigurationRequest",
}) as any as S.Schema<PutSipMediaApplicationAlexaSkillConfigurationRequest>;
export interface PutSipMediaApplicationAlexaSkillConfigurationResponse {
  SipMediaApplicationAlexaSkillConfiguration?: SipMediaApplicationAlexaSkillConfiguration;
}
export const PutSipMediaApplicationAlexaSkillConfigurationResponse = S.suspend(
  () =>
    S.Struct({
      SipMediaApplicationAlexaSkillConfiguration: S.optional(
        SipMediaApplicationAlexaSkillConfiguration,
      ),
    }),
).annotate({
  identifier: "PutSipMediaApplicationAlexaSkillConfigurationResponse",
}) as any as S.Schema<PutSipMediaApplicationAlexaSkillConfigurationResponse>;
export interface PutSipMediaApplicationLoggingConfigurationRequest {
  SipMediaApplicationId: string;
  SipMediaApplicationLoggingConfiguration?: SipMediaApplicationLoggingConfiguration;
}
export const PutSipMediaApplicationLoggingConfigurationRequest = S.suspend(() =>
  S.Struct({
    SipMediaApplicationId: S.String.pipe(T.HttpLabel("SipMediaApplicationId")),
    SipMediaApplicationLoggingConfiguration: S.optional(
      SipMediaApplicationLoggingConfiguration,
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/sip-media-applications/{SipMediaApplicationId}/logging-configuration",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutSipMediaApplicationLoggingConfigurationRequest",
}) as any as S.Schema<PutSipMediaApplicationLoggingConfigurationRequest>;
export interface PutSipMediaApplicationLoggingConfigurationResponse {
  SipMediaApplicationLoggingConfiguration?: SipMediaApplicationLoggingConfiguration;
}
export const PutSipMediaApplicationLoggingConfigurationResponse = S.suspend(
  () =>
    S.Struct({
      SipMediaApplicationLoggingConfiguration: S.optional(
        SipMediaApplicationLoggingConfiguration,
      ),
    }),
).annotate({
  identifier: "PutSipMediaApplicationLoggingConfigurationResponse",
}) as any as S.Schema<PutSipMediaApplicationLoggingConfigurationResponse>;
export interface PutVoiceConnectorEmergencyCallingConfigurationRequest {
  VoiceConnectorId: string;
  EmergencyCallingConfiguration: EmergencyCallingConfiguration;
}
export const PutVoiceConnectorEmergencyCallingConfigurationRequest = S.suspend(
  () =>
    S.Struct({
      VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
      EmergencyCallingConfiguration: EmergencyCallingConfiguration,
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/voice-connectors/{VoiceConnectorId}/emergency-calling-configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutVoiceConnectorEmergencyCallingConfigurationRequest",
}) as any as S.Schema<PutVoiceConnectorEmergencyCallingConfigurationRequest>;
export interface PutVoiceConnectorEmergencyCallingConfigurationResponse {
  EmergencyCallingConfiguration?: EmergencyCallingConfiguration;
}
export const PutVoiceConnectorEmergencyCallingConfigurationResponse = S.suspend(
  () =>
    S.Struct({
      EmergencyCallingConfiguration: S.optional(EmergencyCallingConfiguration),
    }),
).annotate({
  identifier: "PutVoiceConnectorEmergencyCallingConfigurationResponse",
}) as any as S.Schema<PutVoiceConnectorEmergencyCallingConfigurationResponse>;
export interface PutVoiceConnectorExternalSystemsConfigurationRequest {
  VoiceConnectorId: string;
  SessionBorderControllerTypes?: SessionBorderControllerType[];
  ContactCenterSystemTypes?: ContactCenterSystemType[];
}
export const PutVoiceConnectorExternalSystemsConfigurationRequest = S.suspend(
  () =>
    S.Struct({
      VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
      SessionBorderControllerTypes: S.optional(SessionBorderControllerTypeList),
      ContactCenterSystemTypes: S.optional(ContactCenterSystemTypeList),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/voice-connectors/{VoiceConnectorId}/external-systems-configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutVoiceConnectorExternalSystemsConfigurationRequest",
}) as any as S.Schema<PutVoiceConnectorExternalSystemsConfigurationRequest>;
export interface PutVoiceConnectorExternalSystemsConfigurationResponse {
  ExternalSystemsConfiguration?: ExternalSystemsConfiguration;
}
export const PutVoiceConnectorExternalSystemsConfigurationResponse = S.suspend(
  () =>
    S.Struct({
      ExternalSystemsConfiguration: S.optional(ExternalSystemsConfiguration),
    }),
).annotate({
  identifier: "PutVoiceConnectorExternalSystemsConfigurationResponse",
}) as any as S.Schema<PutVoiceConnectorExternalSystemsConfigurationResponse>;
export interface PutVoiceConnectorLoggingConfigurationRequest {
  VoiceConnectorId: string;
  LoggingConfiguration: LoggingConfiguration;
}
export const PutVoiceConnectorLoggingConfigurationRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
    LoggingConfiguration: LoggingConfiguration,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/voice-connectors/{VoiceConnectorId}/logging-configuration",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutVoiceConnectorLoggingConfigurationRequest",
}) as any as S.Schema<PutVoiceConnectorLoggingConfigurationRequest>;
export interface PutVoiceConnectorLoggingConfigurationResponse {
  LoggingConfiguration?: LoggingConfiguration;
}
export const PutVoiceConnectorLoggingConfigurationResponse = S.suspend(() =>
  S.Struct({ LoggingConfiguration: S.optional(LoggingConfiguration) }),
).annotate({
  identifier: "PutVoiceConnectorLoggingConfigurationResponse",
}) as any as S.Schema<PutVoiceConnectorLoggingConfigurationResponse>;
export interface PutVoiceConnectorOriginationRequest {
  VoiceConnectorId: string;
  Origination: Origination;
}
export const PutVoiceConnectorOriginationRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
    Origination: Origination,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/voice-connectors/{VoiceConnectorId}/origination",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutVoiceConnectorOriginationRequest",
}) as any as S.Schema<PutVoiceConnectorOriginationRequest>;
export interface PutVoiceConnectorOriginationResponse {
  Origination?: Origination;
}
export const PutVoiceConnectorOriginationResponse = S.suspend(() =>
  S.Struct({ Origination: S.optional(Origination) }),
).annotate({
  identifier: "PutVoiceConnectorOriginationResponse",
}) as any as S.Schema<PutVoiceConnectorOriginationResponse>;
export type CountryList = string[];
export const CountryList = S.Array(S.String);
export interface PutVoiceConnectorProxyRequest {
  VoiceConnectorId: string;
  DefaultSessionExpiryMinutes: number;
  PhoneNumberPoolCountries: string[];
  FallBackPhoneNumber?: string | redacted.Redacted<string>;
  Disabled?: boolean;
}
export const PutVoiceConnectorProxyRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
    DefaultSessionExpiryMinutes: S.Number,
    PhoneNumberPoolCountries: CountryList,
    FallBackPhoneNumber: S.optional(SensitiveString),
    Disabled: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/voice-connectors/{VoiceConnectorId}/programmable-numbers/proxy",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutVoiceConnectorProxyRequest",
}) as any as S.Schema<PutVoiceConnectorProxyRequest>;
export interface PutVoiceConnectorProxyResponse {
  Proxy?: Proxy;
}
export const PutVoiceConnectorProxyResponse = S.suspend(() =>
  S.Struct({ Proxy: S.optional(Proxy) }),
).annotate({
  identifier: "PutVoiceConnectorProxyResponse",
}) as any as S.Schema<PutVoiceConnectorProxyResponse>;
export interface PutVoiceConnectorStreamingConfigurationRequest {
  VoiceConnectorId: string;
  StreamingConfiguration: StreamingConfiguration;
}
export const PutVoiceConnectorStreamingConfigurationRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
    StreamingConfiguration: StreamingConfiguration,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/voice-connectors/{VoiceConnectorId}/streaming-configuration",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutVoiceConnectorStreamingConfigurationRequest",
}) as any as S.Schema<PutVoiceConnectorStreamingConfigurationRequest>;
export interface PutVoiceConnectorStreamingConfigurationResponse {
  StreamingConfiguration?: StreamingConfiguration;
}
export const PutVoiceConnectorStreamingConfigurationResponse = S.suspend(() =>
  S.Struct({ StreamingConfiguration: S.optional(StreamingConfiguration) }),
).annotate({
  identifier: "PutVoiceConnectorStreamingConfigurationResponse",
}) as any as S.Schema<PutVoiceConnectorStreamingConfigurationResponse>;
export interface PutVoiceConnectorTerminationRequest {
  VoiceConnectorId: string;
  Termination: Termination;
}
export const PutVoiceConnectorTerminationRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
    Termination: Termination,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/voice-connectors/{VoiceConnectorId}/termination",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutVoiceConnectorTerminationRequest",
}) as any as S.Schema<PutVoiceConnectorTerminationRequest>;
export interface PutVoiceConnectorTerminationResponse {
  Termination?: Termination;
}
export const PutVoiceConnectorTerminationResponse = S.suspend(() =>
  S.Struct({ Termination: S.optional(Termination) }),
).annotate({
  identifier: "PutVoiceConnectorTerminationResponse",
}) as any as S.Schema<PutVoiceConnectorTerminationResponse>;
export interface Credential {
  Username?: string | redacted.Redacted<string>;
  Password?: string | redacted.Redacted<string>;
}
export const Credential = S.suspend(() =>
  S.Struct({
    Username: S.optional(SensitiveString),
    Password: S.optional(SensitiveString),
  }),
).annotate({ identifier: "Credential" }) as any as S.Schema<Credential>;
export type CredentialList = Credential[];
export const CredentialList = S.Array(Credential);
export interface PutVoiceConnectorTerminationCredentialsRequest {
  VoiceConnectorId: string;
  Credentials?: Credential[];
}
export const PutVoiceConnectorTerminationCredentialsRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
    Credentials: S.optional(CredentialList),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/voice-connectors/{VoiceConnectorId}/termination/credentials?operation=put",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutVoiceConnectorTerminationCredentialsRequest",
}) as any as S.Schema<PutVoiceConnectorTerminationCredentialsRequest>;
export interface PutVoiceConnectorTerminationCredentialsResponse {}
export const PutVoiceConnectorTerminationCredentialsResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutVoiceConnectorTerminationCredentialsResponse",
}) as any as S.Schema<PutVoiceConnectorTerminationCredentialsResponse>;
export interface RestorePhoneNumberRequest {
  PhoneNumberId: string | redacted.Redacted<string>;
}
export const RestorePhoneNumberRequest = S.suspend(() =>
  S.Struct({
    PhoneNumberId: SensitiveString.pipe(T.HttpLabel("PhoneNumberId")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/phone-numbers/{PhoneNumberId}?operation=restore",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RestorePhoneNumberRequest",
}) as any as S.Schema<RestorePhoneNumberRequest>;
export interface RestorePhoneNumberResponse {
  PhoneNumber?: PhoneNumber;
}
export const RestorePhoneNumberResponse = S.suspend(() =>
  S.Struct({ PhoneNumber: S.optional(PhoneNumber) }),
).annotate({
  identifier: "RestorePhoneNumberResponse",
}) as any as S.Schema<RestorePhoneNumberResponse>;
export interface SearchAvailablePhoneNumbersRequest {
  AreaCode?: string;
  City?: string;
  Country?: string;
  State?: string;
  TollFreePrefix?: string;
  PhoneNumberType?: PhoneNumberType;
  MaxResults?: number;
  NextToken?: string;
}
export const SearchAvailablePhoneNumbersRequest = S.suspend(() =>
  S.Struct({
    AreaCode: S.optional(S.String).pipe(T.HttpQuery("area-code")),
    City: S.optional(S.String).pipe(T.HttpQuery("city")),
    Country: S.optional(S.String).pipe(T.HttpQuery("country")),
    State: S.optional(S.String).pipe(T.HttpQuery("state")),
    TollFreePrefix: S.optional(S.String).pipe(T.HttpQuery("toll-free-prefix")),
    PhoneNumberType: S.optional(PhoneNumberType).pipe(
      T.HttpQuery("phone-number-type"),
    ),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/search?type=phone-numbers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchAvailablePhoneNumbersRequest",
}) as any as S.Schema<SearchAvailablePhoneNumbersRequest>;
export interface SearchAvailablePhoneNumbersResponse {
  E164PhoneNumbers?: string | redacted.Redacted<string>[];
  NextToken?: string;
}
export const SearchAvailablePhoneNumbersResponse = S.suspend(() =>
  S.Struct({
    E164PhoneNumbers: S.optional(E164PhoneNumberList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "SearchAvailablePhoneNumbersResponse",
}) as any as S.Schema<SearchAvailablePhoneNumbersResponse>;
export type CallLegType = "Caller" | "Callee" | (string & {});
export const CallLegType = S.String;
export interface StartSpeakerSearchTaskRequest {
  VoiceConnectorId: string;
  TransactionId: string;
  VoiceProfileDomainId: string;
  ClientRequestToken?: string;
  CallLeg?: CallLegType;
}
export const StartSpeakerSearchTaskRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
    TransactionId: S.String,
    VoiceProfileDomainId: S.String,
    ClientRequestToken: S.optional(S.String),
    CallLeg: S.optional(CallLegType),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/voice-connectors/{VoiceConnectorId}/speaker-search-tasks",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartSpeakerSearchTaskRequest",
}) as any as S.Schema<StartSpeakerSearchTaskRequest>;
export interface StartSpeakerSearchTaskResponse {
  SpeakerSearchTask?: SpeakerSearchTask;
}
export const StartSpeakerSearchTaskResponse = S.suspend(() =>
  S.Struct({ SpeakerSearchTask: S.optional(SpeakerSearchTask) }),
).annotate({
  identifier: "StartSpeakerSearchTaskResponse",
}) as any as S.Schema<StartSpeakerSearchTaskResponse>;
export type LanguageCode = "en-US" | (string & {});
export const LanguageCode = S.String;
export interface StartVoiceToneAnalysisTaskRequest {
  VoiceConnectorId: string;
  TransactionId: string;
  LanguageCode: LanguageCode;
  ClientRequestToken?: string;
}
export const StartVoiceToneAnalysisTaskRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
    TransactionId: S.String,
    LanguageCode: LanguageCode,
    ClientRequestToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/voice-connectors/{VoiceConnectorId}/voice-tone-analysis-tasks",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartVoiceToneAnalysisTaskRequest",
}) as any as S.Schema<StartVoiceToneAnalysisTaskRequest>;
export interface StartVoiceToneAnalysisTaskResponse {
  VoiceToneAnalysisTask?: VoiceToneAnalysisTask;
}
export const StartVoiceToneAnalysisTaskResponse = S.suspend(() =>
  S.Struct({ VoiceToneAnalysisTask: S.optional(VoiceToneAnalysisTask) }),
).annotate({
  identifier: "StartVoiceToneAnalysisTaskResponse",
}) as any as S.Schema<StartVoiceToneAnalysisTaskResponse>;
export interface StopSpeakerSearchTaskRequest {
  VoiceConnectorId: string;
  SpeakerSearchTaskId: string;
}
export const StopSpeakerSearchTaskRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
    SpeakerSearchTaskId: S.String.pipe(T.HttpLabel("SpeakerSearchTaskId")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/voice-connectors/{VoiceConnectorId}/speaker-search-tasks/{SpeakerSearchTaskId}?operation=stop",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopSpeakerSearchTaskRequest",
}) as any as S.Schema<StopSpeakerSearchTaskRequest>;
export interface StopSpeakerSearchTaskResponse {}
export const StopSpeakerSearchTaskResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopSpeakerSearchTaskResponse",
}) as any as S.Schema<StopSpeakerSearchTaskResponse>;
export interface StopVoiceToneAnalysisTaskRequest {
  VoiceConnectorId: string;
  VoiceToneAnalysisTaskId: string;
}
export const StopVoiceToneAnalysisTaskRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
    VoiceToneAnalysisTaskId: S.String.pipe(
      T.HttpLabel("VoiceToneAnalysisTaskId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/voice-connectors/{VoiceConnectorId}/voice-tone-analysis-tasks/{VoiceToneAnalysisTaskId}?operation=stop",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopVoiceToneAnalysisTaskRequest",
}) as any as S.Schema<StopVoiceToneAnalysisTaskRequest>;
export interface StopVoiceToneAnalysisTaskResponse {}
export const StopVoiceToneAnalysisTaskResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopVoiceToneAnalysisTaskResponse",
}) as any as S.Schema<StopVoiceToneAnalysisTaskResponse>;
export interface TagResourceRequest {
  ResourceARN: string | redacted.Redacted<string>;
  Tags: Tag[];
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({ ResourceARN: SensitiveString, Tags: TagList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags?operation=tag-resource" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeyList = string | redacted.Redacted<string>[];
export const TagKeyList = S.Array(SensitiveString);
export interface UntagResourceRequest {
  ResourceARN: string | redacted.Redacted<string>;
  TagKeys: string | redacted.Redacted<string>[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({ ResourceARN: SensitiveString, TagKeys: TagKeyList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags?operation=untag-resource" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateGlobalSettingsRequest {
  VoiceConnector?: VoiceConnectorSettings;
}
export const UpdateGlobalSettingsRequest = S.suspend(() =>
  S.Struct({ VoiceConnector: S.optional(VoiceConnectorSettings) }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/settings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGlobalSettingsRequest",
}) as any as S.Schema<UpdateGlobalSettingsRequest>;
export interface UpdateGlobalSettingsResponse {}
export const UpdateGlobalSettingsResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateGlobalSettingsResponse",
}) as any as S.Schema<UpdateGlobalSettingsResponse>;
export interface UpdatePhoneNumberRequest {
  PhoneNumberId: string | redacted.Redacted<string>;
  ProductType?: PhoneNumberProductType;
  CallingName?: string | redacted.Redacted<string>;
  Name?: string | redacted.Redacted<string>;
}
export const UpdatePhoneNumberRequest = S.suspend(() =>
  S.Struct({
    PhoneNumberId: SensitiveString.pipe(T.HttpLabel("PhoneNumberId")),
    ProductType: S.optional(PhoneNumberProductType),
    CallingName: S.optional(SensitiveString),
    Name: S.optional(SensitiveString),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/phone-numbers/{PhoneNumberId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePhoneNumberRequest",
}) as any as S.Schema<UpdatePhoneNumberRequest>;
export interface UpdatePhoneNumberResponse {
  PhoneNumber?: PhoneNumber;
}
export const UpdatePhoneNumberResponse = S.suspend(() =>
  S.Struct({ PhoneNumber: S.optional(PhoneNumber) }),
).annotate({
  identifier: "UpdatePhoneNumberResponse",
}) as any as S.Schema<UpdatePhoneNumberResponse>;
export interface UpdatePhoneNumberSettingsRequest {
  CallingName: string | redacted.Redacted<string>;
}
export const UpdatePhoneNumberSettingsRequest = S.suspend(() =>
  S.Struct({ CallingName: SensitiveString }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/settings/phone-number" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePhoneNumberSettingsRequest",
}) as any as S.Schema<UpdatePhoneNumberSettingsRequest>;
export interface UpdatePhoneNumberSettingsResponse {}
export const UpdatePhoneNumberSettingsResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdatePhoneNumberSettingsResponse",
}) as any as S.Schema<UpdatePhoneNumberSettingsResponse>;
export interface UpdateProxySessionRequest {
  VoiceConnectorId: string;
  ProxySessionId: string;
  Capabilities: Capability[];
  ExpiryMinutes?: number;
}
export const UpdateProxySessionRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
    ProxySessionId: S.String.pipe(T.HttpLabel("ProxySessionId")),
    Capabilities: CapabilityList,
    ExpiryMinutes: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/voice-connectors/{VoiceConnectorId}/proxy-sessions/{ProxySessionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateProxySessionRequest",
}) as any as S.Schema<UpdateProxySessionRequest>;
export interface UpdateProxySessionResponse {
  ProxySession?: ProxySession;
}
export const UpdateProxySessionResponse = S.suspend(() =>
  S.Struct({ ProxySession: S.optional(ProxySession) }),
).annotate({
  identifier: "UpdateProxySessionResponse",
}) as any as S.Schema<UpdateProxySessionResponse>;
export interface UpdateSipMediaApplicationRequest {
  SipMediaApplicationId: string;
  Name?: string;
  Endpoints?: SipMediaApplicationEndpoint[];
}
export const UpdateSipMediaApplicationRequest = S.suspend(() =>
  S.Struct({
    SipMediaApplicationId: S.String.pipe(T.HttpLabel("SipMediaApplicationId")),
    Name: S.optional(S.String),
    Endpoints: S.optional(SipMediaApplicationEndpointList),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/sip-media-applications/{SipMediaApplicationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSipMediaApplicationRequest",
}) as any as S.Schema<UpdateSipMediaApplicationRequest>;
export interface UpdateSipMediaApplicationResponse {
  SipMediaApplication?: SipMediaApplication;
}
export const UpdateSipMediaApplicationResponse = S.suspend(() =>
  S.Struct({ SipMediaApplication: S.optional(SipMediaApplication) }),
).annotate({
  identifier: "UpdateSipMediaApplicationResponse",
}) as any as S.Schema<UpdateSipMediaApplicationResponse>;
export type SMAUpdateCallArgumentsMap = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export const SMAUpdateCallArgumentsMap = S.Record(
  S.String,
  SensitiveString.pipe(S.optional),
);
export interface UpdateSipMediaApplicationCallRequest {
  SipMediaApplicationId: string;
  TransactionId: string;
  Arguments: { [key: string]: string | redacted.Redacted<string> | undefined };
}
export const UpdateSipMediaApplicationCallRequest = S.suspend(() =>
  S.Struct({
    SipMediaApplicationId: S.String.pipe(T.HttpLabel("SipMediaApplicationId")),
    TransactionId: S.String.pipe(T.HttpLabel("TransactionId")),
    Arguments: SMAUpdateCallArgumentsMap,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sip-media-applications/{SipMediaApplicationId}/calls/{TransactionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSipMediaApplicationCallRequest",
}) as any as S.Schema<UpdateSipMediaApplicationCallRequest>;
export interface UpdateSipMediaApplicationCallResponse {
  SipMediaApplicationCall?: SipMediaApplicationCall;
}
export const UpdateSipMediaApplicationCallResponse = S.suspend(() =>
  S.Struct({ SipMediaApplicationCall: S.optional(SipMediaApplicationCall) }),
).annotate({
  identifier: "UpdateSipMediaApplicationCallResponse",
}) as any as S.Schema<UpdateSipMediaApplicationCallResponse>;
export interface UpdateSipRuleRequest {
  SipRuleId: string;
  Name: string;
  Disabled?: boolean;
  TargetApplications?: SipRuleTargetApplication[];
}
export const UpdateSipRuleRequest = S.suspend(() =>
  S.Struct({
    SipRuleId: S.String.pipe(T.HttpLabel("SipRuleId")),
    Name: S.String,
    Disabled: S.optional(S.Boolean),
    TargetApplications: S.optional(SipRuleTargetApplicationList),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/sip-rules/{SipRuleId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSipRuleRequest",
}) as any as S.Schema<UpdateSipRuleRequest>;
export interface UpdateSipRuleResponse {
  SipRule?: SipRule;
}
export const UpdateSipRuleResponse = S.suspend(() =>
  S.Struct({ SipRule: S.optional(SipRule) }),
).annotate({
  identifier: "UpdateSipRuleResponse",
}) as any as S.Schema<UpdateSipRuleResponse>;
export interface UpdateVoiceConnectorRequest {
  VoiceConnectorId: string;
  Name: string;
  RequireEncryption: boolean;
}
export const UpdateVoiceConnectorRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorId: S.String.pipe(T.HttpLabel("VoiceConnectorId")),
    Name: S.String,
    RequireEncryption: S.Boolean,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/voice-connectors/{VoiceConnectorId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateVoiceConnectorRequest",
}) as any as S.Schema<UpdateVoiceConnectorRequest>;
export interface UpdateVoiceConnectorResponse {
  VoiceConnector?: VoiceConnector;
}
export const UpdateVoiceConnectorResponse = S.suspend(() =>
  S.Struct({ VoiceConnector: S.optional(VoiceConnector) }),
).annotate({
  identifier: "UpdateVoiceConnectorResponse",
}) as any as S.Schema<UpdateVoiceConnectorResponse>;
export interface UpdateVoiceConnectorGroupRequest {
  VoiceConnectorGroupId: string;
  Name: string;
  VoiceConnectorItems: VoiceConnectorItem[];
}
export const UpdateVoiceConnectorGroupRequest = S.suspend(() =>
  S.Struct({
    VoiceConnectorGroupId: S.String.pipe(T.HttpLabel("VoiceConnectorGroupId")),
    Name: S.String,
    VoiceConnectorItems: VoiceConnectorItemList,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/voice-connector-groups/{VoiceConnectorGroupId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateVoiceConnectorGroupRequest",
}) as any as S.Schema<UpdateVoiceConnectorGroupRequest>;
export interface UpdateVoiceConnectorGroupResponse {
  VoiceConnectorGroup?: VoiceConnectorGroup;
}
export const UpdateVoiceConnectorGroupResponse = S.suspend(() =>
  S.Struct({ VoiceConnectorGroup: S.optional(VoiceConnectorGroup) }),
).annotate({
  identifier: "UpdateVoiceConnectorGroupResponse",
}) as any as S.Schema<UpdateVoiceConnectorGroupResponse>;
export interface UpdateVoiceProfileRequest {
  VoiceProfileId: string;
  SpeakerSearchTaskId: string;
}
export const UpdateVoiceProfileRequest = S.suspend(() =>
  S.Struct({
    VoiceProfileId: S.String.pipe(T.HttpLabel("VoiceProfileId")),
    SpeakerSearchTaskId: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/voice-profiles/{VoiceProfileId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateVoiceProfileRequest",
}) as any as S.Schema<UpdateVoiceProfileRequest>;
export interface UpdateVoiceProfileResponse {
  VoiceProfile?: VoiceProfile;
}
export const UpdateVoiceProfileResponse = S.suspend(() =>
  S.Struct({ VoiceProfile: S.optional(VoiceProfile) }),
).annotate({
  identifier: "UpdateVoiceProfileResponse",
}) as any as S.Schema<UpdateVoiceProfileResponse>;
export interface UpdateVoiceProfileDomainRequest {
  VoiceProfileDomainId: string;
  Name?: string;
  Description?: string;
}
export const UpdateVoiceProfileDomainRequest = S.suspend(() =>
  S.Struct({
    VoiceProfileDomainId: S.String.pipe(T.HttpLabel("VoiceProfileDomainId")),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/voice-profile-domains/{VoiceProfileDomainId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateVoiceProfileDomainRequest",
}) as any as S.Schema<UpdateVoiceProfileDomainRequest>;
export interface UpdateVoiceProfileDomainResponse {
  VoiceProfileDomain?: VoiceProfileDomain;
}
export const UpdateVoiceProfileDomainResponse = S.suspend(() =>
  S.Struct({ VoiceProfileDomain: S.optional(VoiceProfileDomain) }),
).annotate({
  identifier: "UpdateVoiceProfileDomainResponse",
}) as any as S.Schema<UpdateVoiceProfileDomainResponse>;
export interface ValidateE911AddressRequest {
  AwsAccountId: string;
  StreetNumber: string | redacted.Redacted<string>;
  StreetInfo: string | redacted.Redacted<string>;
  City: string | redacted.Redacted<string>;
  State: string | redacted.Redacted<string>;
  Country: string | redacted.Redacted<string>;
  PostalCode: string | redacted.Redacted<string>;
}
export const ValidateE911AddressRequest = S.suspend(() =>
  S.Struct({
    AwsAccountId: S.String,
    StreetNumber: SensitiveString,
    StreetInfo: SensitiveString,
    City: SensitiveString,
    State: SensitiveString,
    Country: SensitiveString,
    PostalCode: SensitiveString,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/emergency-calling/address" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ValidateE911AddressRequest",
}) as any as S.Schema<ValidateE911AddressRequest>;
export interface Address {
  streetName?: string | redacted.Redacted<string>;
  streetSuffix?: string | redacted.Redacted<string>;
  postDirectional?: string | redacted.Redacted<string>;
  preDirectional?: string | redacted.Redacted<string>;
  streetNumber?: string | redacted.Redacted<string>;
  city?: string | redacted.Redacted<string>;
  state?: string | redacted.Redacted<string>;
  postalCode?: string | redacted.Redacted<string>;
  postalCodePlus4?: string | redacted.Redacted<string>;
  country?: string | redacted.Redacted<string>;
}
export const Address = S.suspend(() =>
  S.Struct({
    streetName: S.optional(SensitiveString),
    streetSuffix: S.optional(SensitiveString),
    postDirectional: S.optional(SensitiveString),
    preDirectional: S.optional(SensitiveString),
    streetNumber: S.optional(SensitiveString),
    city: S.optional(SensitiveString),
    state: S.optional(SensitiveString),
    postalCode: S.optional(SensitiveString),
    postalCodePlus4: S.optional(SensitiveString),
    country: S.optional(SensitiveString),
  }),
).annotate({ identifier: "Address" }) as any as S.Schema<Address>;
export interface CandidateAddress {
  streetInfo?: string | redacted.Redacted<string>;
  streetNumber?: string | redacted.Redacted<string>;
  city?: string | redacted.Redacted<string>;
  state?: string | redacted.Redacted<string>;
  postalCode?: string | redacted.Redacted<string>;
  postalCodePlus4?: string | redacted.Redacted<string>;
  country?: string | redacted.Redacted<string>;
}
export const CandidateAddress = S.suspend(() =>
  S.Struct({
    streetInfo: S.optional(SensitiveString),
    streetNumber: S.optional(SensitiveString),
    city: S.optional(SensitiveString),
    state: S.optional(SensitiveString),
    postalCode: S.optional(SensitiveString),
    postalCodePlus4: S.optional(SensitiveString),
    country: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "CandidateAddress",
}) as any as S.Schema<CandidateAddress>;
export type CandidateAddressList = CandidateAddress[];
export const CandidateAddressList = S.Array(
  CandidateAddress.pipe(T.XmlName("CandidateAddress")).annotate({
    identifier: "CandidateAddress",
  }),
);
export interface ValidateE911AddressResponse {
  ValidationResult?: number;
  AddressExternalId?: string;
  Address?: Address;
  CandidateAddressList?: CandidateAddress[];
}
export const ValidateE911AddressResponse = S.suspend(() =>
  S.Struct({
    ValidationResult: S.optional(S.Number),
    AddressExternalId: S.optional(S.String),
    Address: S.optional(Address),
    CandidateAddressList: S.optional(CandidateAddressList),
  }),
).annotate({
  identifier: "ValidateE911AddressResponse",
}) as any as S.Schema<ValidateE911AddressResponse>;

//# Errors
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  { Code: S.optional(ErrorCode), Message: S.optional(S.String) },
).pipe(C.withAuthError) {}
export class BadRequestException extends S.TaggedErrorClass<BadRequestException>()(
  "BadRequestException",
  { Code: S.optional(ErrorCode), Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ForbiddenException extends S.TaggedErrorClass<ForbiddenException>()(
  "ForbiddenException",
  { Code: S.optional(ErrorCode), Message: S.optional(S.String) },
).pipe(C.withAuthError) {}
export class NotFoundException extends S.TaggedErrorClass<NotFoundException>()(
  "NotFoundException",
  { Code: S.optional(ErrorCode), Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ServiceFailureException extends S.TaggedErrorClass<ServiceFailureException>()(
  "ServiceFailureException",
  { Code: S.optional(ErrorCode), Message: S.optional(S.String) },
).pipe(C.withServerError) {}
export class ServiceUnavailableException extends S.TaggedErrorClass<ServiceUnavailableException>()(
  "ServiceUnavailableException",
  { Code: S.optional(ErrorCode), Message: S.optional(S.String) },
).pipe(C.withServerError) {}
export class ThrottledClientException extends S.TaggedErrorClass<ThrottledClientException>()(
  "ThrottledClientException",
  { Code: S.optional(ErrorCode), Message: S.optional(S.String) },
).pipe(C.withThrottlingError) {}
export class UnauthorizedClientException extends S.TaggedErrorClass<UnauthorizedClientException>()(
  "UnauthorizedClientException",
  { Code: S.optional(ErrorCode), Message: S.optional(S.String) },
).pipe(C.withAuthError) {}
export class ResourceLimitExceededException extends S.TaggedErrorClass<ResourceLimitExceededException>()(
  "ResourceLimitExceededException",
  { Code: S.optional(ErrorCode), Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  { Code: S.optional(ErrorCode), Message: S.optional(S.String) },
).pipe(C.withConflictError) {}
export class GoneException extends S.TaggedErrorClass<GoneException>()(
  "GoneException",
  { Code: S.optional(ErrorCode), Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class UnprocessableEntityException extends S.TaggedErrorClass<UnprocessableEntityException>()(
  "UnprocessableEntityException",
  { Code: S.optional(ErrorCode), Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}

//# Operations
/**
 * Associates phone numbers with the specified Amazon Chime SDK Voice Connector.
 */
export const associatePhoneNumbersWithVoiceConnector: API.OperationMethod<
  AssociatePhoneNumbersWithVoiceConnectorRequest,
  AssociatePhoneNumbersWithVoiceConnectorResponse,
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AssociatePhoneNumbersWithVoiceConnectorRequest,
  output: AssociatePhoneNumbersWithVoiceConnectorResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Associates phone numbers with the specified Amazon Chime SDK Voice Connector group.
 */
export const associatePhoneNumbersWithVoiceConnectorGroup: API.OperationMethod<
  AssociatePhoneNumbersWithVoiceConnectorGroupRequest,
  AssociatePhoneNumbersWithVoiceConnectorGroupResponse,
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AssociatePhoneNumbersWithVoiceConnectorGroupRequest,
  output: AssociatePhoneNumbersWithVoiceConnectorGroupResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Moves phone numbers into the
 * **Deletion queue**. Phone numbers must be disassociated from any users or Amazon Chime SDK Voice Connectors before they can be deleted.
 *
 * Phone numbers remain in the
 * **Deletion queue** for 7 days before they are deleted permanently.
 */
export const batchDeletePhoneNumber: API.OperationMethod<
  BatchDeletePhoneNumberRequest,
  BatchDeletePhoneNumberResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchDeletePhoneNumberRequest,
  output: BatchDeletePhoneNumberResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Updates phone number product types, calling names, or phone number names. You can update one attribute at a time for each
 * `UpdatePhoneNumberRequestItem`. For example, you can update the product type, the calling name, or phone name.
 *
 * You cannot have a duplicate `phoneNumberId` in a request.
 */
export const batchUpdatePhoneNumber: API.OperationMethod<
  BatchUpdatePhoneNumberRequest,
  BatchUpdatePhoneNumberResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchUpdatePhoneNumberRequest,
  output: BatchUpdatePhoneNumberResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Creates an order for phone numbers to be provisioned. For numbers outside the U.S., you must use the Amazon Chime SDK SIP media application dial-in product type.
 */
export const createPhoneNumberOrder: API.OperationMethod<
  CreatePhoneNumberOrderRequest,
  CreatePhoneNumberOrderResponse,
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreatePhoneNumberOrderRequest,
  output: CreatePhoneNumberOrderResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Creates a proxy session for the specified Amazon Chime SDK Voice Connector for
 * the specified participant phone numbers.
 */
export const createProxySession: API.OperationMethod<
  CreateProxySessionRequest,
  CreateProxySessionResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProxySessionRequest,
  output: CreateProxySessionResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Creates a SIP media application. For more information about SIP media applications, see Managing SIP media applications
 * and rules in the *Amazon Chime SDK Administrator Guide*.
 */
export const createSipMediaApplication: API.OperationMethod<
  CreateSipMediaApplicationRequest,
  CreateSipMediaApplicationResponse,
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateSipMediaApplicationRequest,
  output: CreateSipMediaApplicationResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Creates an outbound call to a phone number from the phone number specified
 * in the request, and it invokes the endpoint of the specified
 * `sipMediaApplicationId`.
 */
export const createSipMediaApplicationCall: API.OperationMethod<
  CreateSipMediaApplicationCallRequest,
  CreateSipMediaApplicationCallResponse,
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateSipMediaApplicationCallRequest,
  output: CreateSipMediaApplicationCallResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Creates a SIP rule, which can be used to run a SIP media application as a target for a specific trigger type. For more information about SIP rules, see Managing SIP media applications
 * and rules in the *Amazon Chime SDK Administrator Guide*.
 */
export const createSipRule: API.OperationMethod<
  CreateSipRuleRequest,
  CreateSipRuleResponse,
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateSipRuleRequest,
  output: CreateSipRuleResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Creates an Amazon Chime SDK Voice Connector. For more information about
 * Voice Connectors,
 * see Managing Amazon Chime SDK Voice Connector groups in the Amazon Chime SDK
 * Administrator Guide.
 */
export const createVoiceConnector: API.OperationMethod<
  CreateVoiceConnectorRequest,
  CreateVoiceConnectorResponse,
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateVoiceConnectorRequest,
  output: CreateVoiceConnectorResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Creates an Amazon Chime SDK Voice Connector group under the administrator's
 * AWS account. You can associate Amazon Chime SDK Voice Connectors with the
 * Voice Connector group by including `VoiceConnectorItems` in the
 * request.
 *
 * You can include Voice Connectors from different AWS Regions in your group.
 * This creates a fault tolerant mechanism for fallback in case of availability events.
 */
export const createVoiceConnectorGroup: API.OperationMethod<
  CreateVoiceConnectorGroupRequest,
  CreateVoiceConnectorGroupResponse,
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateVoiceConnectorGroupRequest,
  output: CreateVoiceConnectorGroupResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Creates a voice profile, which consists of an enrolled user and their latest voice print.
 *
 * Before creating any voice profiles, you must provide all notices and obtain all consents from the speaker as required under applicable privacy and biometrics laws, and as required under the
 * AWS service terms for the Amazon Chime SDK.
 *
 * For more information about voice profiles and voice analytics, see Using Amazon Chime SDK Voice Analytics
 * in the *Amazon Chime SDK Developer Guide*.
 */
export const createVoiceProfile: API.OperationMethod<
  CreateVoiceProfileRequest,
  CreateVoiceProfileResponse,
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GoneException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateVoiceProfileRequest,
  output: CreateVoiceProfileResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GoneException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Creates a voice profile domain, a collection of voice profiles, their voice prints, and encrypted enrollment audio.
 *
 * Before creating any voice profiles, you must provide all notices and obtain all consents from the speaker as required under applicable privacy and biometrics laws, and as required under the
 * AWS service terms for the Amazon Chime SDK.
 *
 * For more information about voice profile domains, see Using Amazon Chime SDK Voice Analytics
 * in the *Amazon Chime SDK Developer Guide*.
 */
export const createVoiceProfileDomain: API.OperationMethod<
  CreateVoiceProfileDomainRequest,
  CreateVoiceProfileDomainResponse,
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateVoiceProfileDomainRequest,
  output: CreateVoiceProfileDomainResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Moves the specified phone number into the
 * **Deletion queue**. A phone number must
 * be disassociated from any users or Amazon Chime SDK Voice Connectors before it can be
 * deleted.
 *
 * Deleted phone numbers remain in the
 * **Deletion queue** queue for 7 days before
 * they are deleted permanently.
 */
export const deletePhoneNumber: API.OperationMethod<
  DeletePhoneNumberRequest,
  DeletePhoneNumberResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeletePhoneNumberRequest,
  output: DeletePhoneNumberResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Deletes the specified proxy session from the specified Amazon Chime SDK Voice
 * Connector.
 */
export const deleteProxySession: API.OperationMethod<
  DeleteProxySessionRequest,
  DeleteProxySessionResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProxySessionRequest,
  output: DeleteProxySessionResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Deletes a SIP media application.
 */
export const deleteSipMediaApplication: API.OperationMethod<
  DeleteSipMediaApplicationRequest,
  DeleteSipMediaApplicationResponse,
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSipMediaApplicationRequest,
  output: DeleteSipMediaApplicationResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Deletes a SIP rule.
 */
export const deleteSipRule: API.OperationMethod<
  DeleteSipRuleRequest,
  DeleteSipRuleResponse,
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSipRuleRequest,
  output: DeleteSipRuleResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Deletes an Amazon Chime SDK Voice Connector. Any phone numbers associated
 * with the Amazon Chime SDK Voice Connector must be disassociated from it before it
 * can be deleted.
 */
export const deleteVoiceConnector: API.OperationMethod<
  DeleteVoiceConnectorRequest,
  DeleteVoiceConnectorResponse,
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteVoiceConnectorRequest,
  output: DeleteVoiceConnectorResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Deletes the emergency calling details from the specified Amazon Chime SDK Voice
 * Connector.
 */
export const deleteVoiceConnectorEmergencyCallingConfiguration: API.OperationMethod<
  DeleteVoiceConnectorEmergencyCallingConfigurationRequest,
  DeleteVoiceConnectorEmergencyCallingConfigurationResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteVoiceConnectorEmergencyCallingConfigurationRequest,
  output: DeleteVoiceConnectorEmergencyCallingConfigurationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Deletes the external systems configuration for a Voice Connector.
 */
export const deleteVoiceConnectorExternalSystemsConfiguration: API.OperationMethod<
  DeleteVoiceConnectorExternalSystemsConfigurationRequest,
  DeleteVoiceConnectorExternalSystemsConfigurationResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteVoiceConnectorExternalSystemsConfigurationRequest,
  output: DeleteVoiceConnectorExternalSystemsConfigurationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Deletes an Amazon Chime SDK Voice Connector group. Any `VoiceConnectorItems`
 * and phone numbers associated with the group must be removed before it can be
 * deleted.
 */
export const deleteVoiceConnectorGroup: API.OperationMethod<
  DeleteVoiceConnectorGroupRequest,
  DeleteVoiceConnectorGroupResponse,
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteVoiceConnectorGroupRequest,
  output: DeleteVoiceConnectorGroupResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Deletes the origination settings for the specified Amazon Chime SDK Voice Connector.
 *
 * If emergency calling is configured for the Voice Connector, it must be
 * deleted prior to deleting the origination settings.
 */
export const deleteVoiceConnectorOrigination: API.OperationMethod<
  DeleteVoiceConnectorOriginationRequest,
  DeleteVoiceConnectorOriginationResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteVoiceConnectorOriginationRequest,
  output: DeleteVoiceConnectorOriginationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Deletes the proxy configuration from the specified Amazon Chime SDK Voice Connector.
 */
export const deleteVoiceConnectorProxy: API.OperationMethod<
  DeleteVoiceConnectorProxyRequest,
  DeleteVoiceConnectorProxyResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteVoiceConnectorProxyRequest,
  output: DeleteVoiceConnectorProxyResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Deletes a Voice Connector's streaming configuration.
 */
export const deleteVoiceConnectorStreamingConfiguration: API.OperationMethod<
  DeleteVoiceConnectorStreamingConfigurationRequest,
  DeleteVoiceConnectorStreamingConfigurationResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteVoiceConnectorStreamingConfigurationRequest,
  output: DeleteVoiceConnectorStreamingConfigurationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Deletes the termination settings for the specified Amazon Chime SDK Voice Connector.
 *
 * If emergency calling is configured for the Voice Connector, it must be
 * deleted prior to deleting the termination settings.
 */
export const deleteVoiceConnectorTermination: API.OperationMethod<
  DeleteVoiceConnectorTerminationRequest,
  DeleteVoiceConnectorTerminationResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteVoiceConnectorTerminationRequest,
  output: DeleteVoiceConnectorTerminationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Deletes the specified SIP credentials used by your equipment to
 * authenticate during call termination.
 */
export const deleteVoiceConnectorTerminationCredentials: API.OperationMethod<
  DeleteVoiceConnectorTerminationCredentialsRequest,
  DeleteVoiceConnectorTerminationCredentialsResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteVoiceConnectorTerminationCredentialsRequest,
  output: DeleteVoiceConnectorTerminationCredentialsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Deletes a voice profile, including its voice print and enrollment data. WARNING: This action is not reversible.
 */
export const deleteVoiceProfile: API.OperationMethod<
  DeleteVoiceProfileRequest,
  DeleteVoiceProfileResponse,
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteVoiceProfileRequest,
  output: DeleteVoiceProfileResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Deletes all voice profiles in the domain. WARNING: This action is not reversible.
 */
export const deleteVoiceProfileDomain: API.OperationMethod<
  DeleteVoiceProfileDomainRequest,
  DeleteVoiceProfileDomainResponse,
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteVoiceProfileDomainRequest,
  output: DeleteVoiceProfileDomainResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Disassociates the specified phone numbers from the specified
 * Amazon Chime SDK Voice Connector.
 */
export const disassociatePhoneNumbersFromVoiceConnector: API.OperationMethod<
  DisassociatePhoneNumbersFromVoiceConnectorRequest,
  DisassociatePhoneNumbersFromVoiceConnectorResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociatePhoneNumbersFromVoiceConnectorRequest,
  output: DisassociatePhoneNumbersFromVoiceConnectorResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Disassociates the specified phone numbers from the specified Amazon Chime SDK Voice
 * Connector group.
 */
export const disassociatePhoneNumbersFromVoiceConnectorGroup: API.OperationMethod<
  DisassociatePhoneNumbersFromVoiceConnectorGroupRequest,
  DisassociatePhoneNumbersFromVoiceConnectorGroupResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociatePhoneNumbersFromVoiceConnectorGroupRequest,
  output: DisassociatePhoneNumbersFromVoiceConnectorGroupResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Retrieves the global settings for the Amazon Chime SDK Voice Connectors in an AWS account.
 */
export const getGlobalSettings: API.OperationMethod<
  GetGlobalSettingsRequest,
  GetGlobalSettingsResponse,
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetGlobalSettingsRequest,
  output: GetGlobalSettingsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Retrieves details for the specified phone number ID, such as associations,
 * capabilities, and product type.
 */
export const getPhoneNumber: API.OperationMethod<
  GetPhoneNumberRequest,
  GetPhoneNumberResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPhoneNumberRequest,
  output: GetPhoneNumberResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Retrieves details for the specified phone number order, such as the order
 * creation timestamp, phone numbers in E.164 format, product type, and
 * order status.
 */
export const getPhoneNumberOrder: API.OperationMethod<
  GetPhoneNumberOrderRequest,
  GetPhoneNumberOrderResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPhoneNumberOrderRequest,
  output: GetPhoneNumberOrderResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Retrieves the phone number settings for the administrator's AWS account,
 * such as the default outbound calling name.
 */
export const getPhoneNumberSettings: API.OperationMethod<
  GetPhoneNumberSettingsRequest,
  GetPhoneNumberSettingsResponse,
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPhoneNumberSettingsRequest,
  output: GetPhoneNumberSettingsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Retrieves the specified proxy session details for the specified Amazon Chime SDK Voice Connector.
 */
export const getProxySession: API.OperationMethod<
  GetProxySessionRequest,
  GetProxySessionResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProxySessionRequest,
  output: GetProxySessionResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Retrieves the information for a SIP media application, including name,
 * AWS Region, and endpoints.
 */
export const getSipMediaApplication: API.OperationMethod<
  GetSipMediaApplicationRequest,
  GetSipMediaApplicationResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSipMediaApplicationRequest,
  output: GetSipMediaApplicationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Gets the Alexa Skill configuration for the SIP media application.
 *
 * Due to changes made by the Amazon Alexa service, this API is no longer available for use. For more information, refer to
 * the Alexa Smart Properties page.
 */
export const getSipMediaApplicationAlexaSkillConfiguration: API.OperationMethod<
  GetSipMediaApplicationAlexaSkillConfigurationRequest,
  GetSipMediaApplicationAlexaSkillConfigurationResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSipMediaApplicationAlexaSkillConfigurationRequest,
  output: GetSipMediaApplicationAlexaSkillConfigurationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Retrieves the logging configuration for the specified SIP media application.
 */
export const getSipMediaApplicationLoggingConfiguration: API.OperationMethod<
  GetSipMediaApplicationLoggingConfigurationRequest,
  GetSipMediaApplicationLoggingConfigurationResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSipMediaApplicationLoggingConfigurationRequest,
  output: GetSipMediaApplicationLoggingConfigurationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Retrieves the details of a SIP rule, such as the rule ID, name, triggers, and
 * target endpoints.
 */
export const getSipRule: API.OperationMethod<
  GetSipRuleRequest,
  GetSipRuleResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSipRuleRequest,
  output: GetSipRuleResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Retrieves the details of the specified speaker search task.
 */
export const getSpeakerSearchTask: API.OperationMethod<
  GetSpeakerSearchTaskRequest,
  GetSpeakerSearchTaskResponse,
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSpeakerSearchTaskRequest,
  output: GetSpeakerSearchTaskResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Retrieves details for the specified Amazon Chime SDK Voice Connector, such as
 * timestamps,name, outbound host, and encryption requirements.
 */
export const getVoiceConnector: API.OperationMethod<
  GetVoiceConnectorRequest,
  GetVoiceConnectorResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetVoiceConnectorRequest,
  output: GetVoiceConnectorResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Retrieves the emergency calling configuration details for the specified Voice Connector.
 */
export const getVoiceConnectorEmergencyCallingConfiguration: API.OperationMethod<
  GetVoiceConnectorEmergencyCallingConfigurationRequest,
  GetVoiceConnectorEmergencyCallingConfigurationResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetVoiceConnectorEmergencyCallingConfigurationRequest,
  output: GetVoiceConnectorEmergencyCallingConfigurationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Gets information about an external systems configuration for a Voice
 * Connector.
 */
export const getVoiceConnectorExternalSystemsConfiguration: API.OperationMethod<
  GetVoiceConnectorExternalSystemsConfigurationRequest,
  GetVoiceConnectorExternalSystemsConfigurationResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetVoiceConnectorExternalSystemsConfigurationRequest,
  output: GetVoiceConnectorExternalSystemsConfigurationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Retrieves details for the specified Amazon Chime SDK Voice Connector group,
 * such as timestamps,name, and associated `VoiceConnectorItems`.
 */
export const getVoiceConnectorGroup: API.OperationMethod<
  GetVoiceConnectorGroupRequest,
  GetVoiceConnectorGroupResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetVoiceConnectorGroupRequest,
  output: GetVoiceConnectorGroupResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Retrieves the logging configuration settings for the specified Voice Connector.
 * Shows whether SIP message logs are enabled for sending to Amazon CloudWatch Logs.
 */
export const getVoiceConnectorLoggingConfiguration: API.OperationMethod<
  GetVoiceConnectorLoggingConfigurationRequest,
  GetVoiceConnectorLoggingConfigurationResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetVoiceConnectorLoggingConfigurationRequest,
  output: GetVoiceConnectorLoggingConfigurationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Retrieves the origination settings for the specified Voice Connector.
 */
export const getVoiceConnectorOrigination: API.OperationMethod<
  GetVoiceConnectorOriginationRequest,
  GetVoiceConnectorOriginationResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetVoiceConnectorOriginationRequest,
  output: GetVoiceConnectorOriginationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Retrieves the proxy configuration details for the specified Amazon Chime SDK Voice
 * Connector.
 */
export const getVoiceConnectorProxy: API.OperationMethod<
  GetVoiceConnectorProxyRequest,
  GetVoiceConnectorProxyResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetVoiceConnectorProxyRequest,
  output: GetVoiceConnectorProxyResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Retrieves the streaming configuration details for the specified Amazon Chime SDK
 * Voice Connector. Shows whether media streaming is enabled for sending to Amazon
 * Kinesis. It also shows the retention period, in hours, for the Amazon Kinesis data.
 */
export const getVoiceConnectorStreamingConfiguration: API.OperationMethod<
  GetVoiceConnectorStreamingConfigurationRequest,
  GetVoiceConnectorStreamingConfigurationResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetVoiceConnectorStreamingConfigurationRequest,
  output: GetVoiceConnectorStreamingConfigurationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Retrieves the termination setting details for the specified Voice Connector.
 */
export const getVoiceConnectorTermination: API.OperationMethod<
  GetVoiceConnectorTerminationRequest,
  GetVoiceConnectorTerminationResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetVoiceConnectorTerminationRequest,
  output: GetVoiceConnectorTerminationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Retrieves information about the last time a `SIP OPTIONS` ping
 * was received from your SIP infrastructure for the specified Amazon Chime SDK Voice
 * Connector.
 */
export const getVoiceConnectorTerminationHealth: API.OperationMethod<
  GetVoiceConnectorTerminationHealthRequest,
  GetVoiceConnectorTerminationHealthResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetVoiceConnectorTerminationHealthRequest,
  output: GetVoiceConnectorTerminationHealthResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Retrieves the details of the specified voice profile.
 */
export const getVoiceProfile: API.OperationMethod<
  GetVoiceProfileRequest,
  GetVoiceProfileResponse,
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetVoiceProfileRequest,
  output: GetVoiceProfileResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Retrieves the details of the specified voice profile domain.
 */
export const getVoiceProfileDomain: API.OperationMethod<
  GetVoiceProfileDomainRequest,
  GetVoiceProfileDomainResponse,
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetVoiceProfileDomainRequest,
  output: GetVoiceProfileDomainResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Retrieves the details of a voice tone analysis task.
 */
export const getVoiceToneAnalysisTask: API.OperationMethod<
  GetVoiceToneAnalysisTaskRequest,
  GetVoiceToneAnalysisTaskResponse,
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetVoiceToneAnalysisTaskRequest,
  output: GetVoiceToneAnalysisTaskResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Lists the available AWS Regions in which you can create an Amazon Chime SDK Voice Connector.
 */
export const listAvailableVoiceConnectorRegions: API.OperationMethod<
  ListAvailableVoiceConnectorRegionsRequest,
  ListAvailableVoiceConnectorRegionsResponse,
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListAvailableVoiceConnectorRegionsRequest,
  output: ListAvailableVoiceConnectorRegionsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Lists the phone numbers for an administrator's Amazon Chime SDK account.
 */
export const listPhoneNumberOrders: API.OperationMethod<
  ListPhoneNumberOrdersRequest,
  ListPhoneNumberOrdersResponse,
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListPhoneNumberOrdersRequest,
  ) => stream.Stream<
    ListPhoneNumberOrdersResponse,
    | BadRequestException
    | ForbiddenException
    | ServiceFailureException
    | ServiceUnavailableException
    | ThrottledClientException
    | UnauthorizedClientException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListPhoneNumberOrdersRequest,
  ) => stream.Stream<
    unknown,
    | BadRequestException
    | ForbiddenException
    | ServiceFailureException
    | ServiceUnavailableException
    | ThrottledClientException
    | UnauthorizedClientException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPhoneNumberOrdersRequest,
  output: ListPhoneNumberOrdersResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Lists the phone numbers for the specified Amazon Chime SDK account,
 * Amazon Chime SDK user, Amazon Chime SDK Voice Connector, or Amazon Chime SDK Voice
 * Connector group.
 */
export const listPhoneNumbers: API.OperationMethod<
  ListPhoneNumbersRequest,
  ListPhoneNumbersResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListPhoneNumbersRequest,
  ) => stream.Stream<
    ListPhoneNumbersResponse,
    | BadRequestException
    | ForbiddenException
    | NotFoundException
    | ServiceFailureException
    | ServiceUnavailableException
    | ThrottledClientException
    | UnauthorizedClientException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListPhoneNumbersRequest,
  ) => stream.Stream<
    unknown,
    | BadRequestException
    | ForbiddenException
    | NotFoundException
    | ServiceFailureException
    | ServiceUnavailableException
    | ThrottledClientException
    | UnauthorizedClientException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPhoneNumbersRequest,
  output: ListPhoneNumbersResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Lists the proxy sessions for the specified Amazon Chime SDK Voice Connector.
 */
export const listProxySessions: API.OperationMethod<
  ListProxySessionsRequest,
  ListProxySessionsResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListProxySessionsRequest,
  ) => stream.Stream<
    ListProxySessionsResponse,
    | BadRequestException
    | ForbiddenException
    | NotFoundException
    | ServiceFailureException
    | ServiceUnavailableException
    | ThrottledClientException
    | UnauthorizedClientException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListProxySessionsRequest,
  ) => stream.Stream<
    unknown,
    | BadRequestException
    | ForbiddenException
    | NotFoundException
    | ServiceFailureException
    | ServiceUnavailableException
    | ThrottledClientException
    | UnauthorizedClientException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProxySessionsRequest,
  output: ListProxySessionsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Lists the SIP media applications under the administrator's AWS account.
 */
export const listSipMediaApplications: API.OperationMethod<
  ListSipMediaApplicationsRequest,
  ListSipMediaApplicationsResponse,
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListSipMediaApplicationsRequest,
  ) => stream.Stream<
    ListSipMediaApplicationsResponse,
    | BadRequestException
    | ForbiddenException
    | ServiceFailureException
    | ServiceUnavailableException
    | ThrottledClientException
    | UnauthorizedClientException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListSipMediaApplicationsRequest,
  ) => stream.Stream<
    SipMediaApplication,
    | BadRequestException
    | ForbiddenException
    | ServiceFailureException
    | ServiceUnavailableException
    | ThrottledClientException
    | UnauthorizedClientException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSipMediaApplicationsRequest,
  output: ListSipMediaApplicationsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SipMediaApplications",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Lists the SIP rules under the administrator's AWS account.
 */
export const listSipRules: API.OperationMethod<
  ListSipRulesRequest,
  ListSipRulesResponse,
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListSipRulesRequest,
  ) => stream.Stream<
    ListSipRulesResponse,
    | BadRequestException
    | ForbiddenException
    | ServiceFailureException
    | ServiceUnavailableException
    | ThrottledClientException
    | UnauthorizedClientException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListSipRulesRequest,
  ) => stream.Stream<
    SipRule,
    | BadRequestException
    | ForbiddenException
    | ServiceFailureException
    | ServiceUnavailableException
    | ThrottledClientException
    | UnauthorizedClientException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSipRulesRequest,
  output: ListSipRulesResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SipRules",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Lists the countries that you can order phone numbers from.
 */
export const listSupportedPhoneNumberCountries: API.OperationMethod<
  ListSupportedPhoneNumberCountriesRequest,
  ListSupportedPhoneNumberCountriesResponse,
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListSupportedPhoneNumberCountriesRequest,
  output: ListSupportedPhoneNumberCountriesResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Returns a list of the tags in a given resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    UnauthorizedClientException,
  ],
}));
/**
 * Lists the Amazon Chime SDK Voice Connector groups in the administrator's AWS
 * account.
 */
export const listVoiceConnectorGroups: API.OperationMethod<
  ListVoiceConnectorGroupsRequest,
  ListVoiceConnectorGroupsResponse,
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListVoiceConnectorGroupsRequest,
  ) => stream.Stream<
    ListVoiceConnectorGroupsResponse,
    | BadRequestException
    | ForbiddenException
    | ServiceFailureException
    | ServiceUnavailableException
    | ThrottledClientException
    | UnauthorizedClientException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListVoiceConnectorGroupsRequest,
  ) => stream.Stream<
    unknown,
    | BadRequestException
    | ForbiddenException
    | ServiceFailureException
    | ServiceUnavailableException
    | ThrottledClientException
    | UnauthorizedClientException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListVoiceConnectorGroupsRequest,
  output: ListVoiceConnectorGroupsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Lists the Amazon Chime SDK Voice Connectors in the administrators
 * AWS account.
 */
export const listVoiceConnectors: API.OperationMethod<
  ListVoiceConnectorsRequest,
  ListVoiceConnectorsResponse,
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListVoiceConnectorsRequest,
  ) => stream.Stream<
    ListVoiceConnectorsResponse,
    | BadRequestException
    | ForbiddenException
    | ServiceFailureException
    | ServiceUnavailableException
    | ThrottledClientException
    | UnauthorizedClientException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListVoiceConnectorsRequest,
  ) => stream.Stream<
    unknown,
    | BadRequestException
    | ForbiddenException
    | ServiceFailureException
    | ServiceUnavailableException
    | ThrottledClientException
    | UnauthorizedClientException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListVoiceConnectorsRequest,
  output: ListVoiceConnectorsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Lists the SIP credentials for the specified Amazon Chime SDK Voice Connector.
 */
export const listVoiceConnectorTerminationCredentials: API.OperationMethod<
  ListVoiceConnectorTerminationCredentialsRequest,
  ListVoiceConnectorTerminationCredentialsResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListVoiceConnectorTerminationCredentialsRequest,
  output: ListVoiceConnectorTerminationCredentialsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Lists the specified voice profile domains in the administrator's AWS account.
 */
export const listVoiceProfileDomains: API.OperationMethod<
  ListVoiceProfileDomainsRequest,
  ListVoiceProfileDomainsResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListVoiceProfileDomainsRequest,
  ) => stream.Stream<
    ListVoiceProfileDomainsResponse,
    | BadRequestException
    | ForbiddenException
    | NotFoundException
    | ServiceFailureException
    | ServiceUnavailableException
    | ThrottledClientException
    | UnauthorizedClientException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListVoiceProfileDomainsRequest,
  ) => stream.Stream<
    unknown,
    | BadRequestException
    | ForbiddenException
    | NotFoundException
    | ServiceFailureException
    | ServiceUnavailableException
    | ThrottledClientException
    | UnauthorizedClientException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListVoiceProfileDomainsRequest,
  output: ListVoiceProfileDomainsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Lists the voice profiles in a voice profile domain.
 */
export const listVoiceProfiles: API.OperationMethod<
  ListVoiceProfilesRequest,
  ListVoiceProfilesResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListVoiceProfilesRequest,
  ) => stream.Stream<
    ListVoiceProfilesResponse,
    | BadRequestException
    | ForbiddenException
    | NotFoundException
    | ServiceFailureException
    | ServiceUnavailableException
    | ThrottledClientException
    | UnauthorizedClientException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListVoiceProfilesRequest,
  ) => stream.Stream<
    unknown,
    | BadRequestException
    | ForbiddenException
    | NotFoundException
    | ServiceFailureException
    | ServiceUnavailableException
    | ThrottledClientException
    | UnauthorizedClientException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListVoiceProfilesRequest,
  output: ListVoiceProfilesResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Updates the Alexa Skill configuration for the SIP media application.
 *
 * Due to changes made by the Amazon Alexa service, this API is no longer available for use. For more information, refer to
 * the Alexa Smart Properties page.
 */
export const putSipMediaApplicationAlexaSkillConfiguration: API.OperationMethod<
  PutSipMediaApplicationAlexaSkillConfigurationRequest,
  PutSipMediaApplicationAlexaSkillConfigurationResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutSipMediaApplicationAlexaSkillConfigurationRequest,
  output: PutSipMediaApplicationAlexaSkillConfigurationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Updates the logging configuration for the specified SIP media application.
 */
export const putSipMediaApplicationLoggingConfiguration: API.OperationMethod<
  PutSipMediaApplicationLoggingConfigurationRequest,
  PutSipMediaApplicationLoggingConfigurationResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutSipMediaApplicationLoggingConfigurationRequest,
  output: PutSipMediaApplicationLoggingConfigurationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Updates a Voice Connector's emergency calling configuration.
 */
export const putVoiceConnectorEmergencyCallingConfiguration: API.OperationMethod<
  PutVoiceConnectorEmergencyCallingConfigurationRequest,
  PutVoiceConnectorEmergencyCallingConfigurationResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutVoiceConnectorEmergencyCallingConfigurationRequest,
  output: PutVoiceConnectorEmergencyCallingConfigurationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Adds an external systems configuration to a Voice Connector.
 */
export const putVoiceConnectorExternalSystemsConfiguration: API.OperationMethod<
  PutVoiceConnectorExternalSystemsConfigurationRequest,
  PutVoiceConnectorExternalSystemsConfigurationResponse,
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutVoiceConnectorExternalSystemsConfigurationRequest,
  output: PutVoiceConnectorExternalSystemsConfigurationResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Updates a Voice Connector's logging configuration.
 */
export const putVoiceConnectorLoggingConfiguration: API.OperationMethod<
  PutVoiceConnectorLoggingConfigurationRequest,
  PutVoiceConnectorLoggingConfigurationResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutVoiceConnectorLoggingConfigurationRequest,
  output: PutVoiceConnectorLoggingConfigurationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Updates a Voice Connector's origination settings.
 */
export const putVoiceConnectorOrigination: API.OperationMethod<
  PutVoiceConnectorOriginationRequest,
  PutVoiceConnectorOriginationResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutVoiceConnectorOriginationRequest,
  output: PutVoiceConnectorOriginationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Puts the specified proxy configuration to the specified Amazon Chime SDK Voice Connector.
 */
export const putVoiceConnectorProxy: API.OperationMethod<
  PutVoiceConnectorProxyRequest,
  PutVoiceConnectorProxyResponse,
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutVoiceConnectorProxyRequest,
  output: PutVoiceConnectorProxyResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Updates a Voice Connector's streaming configuration settings.
 */
export const putVoiceConnectorStreamingConfiguration: API.OperationMethod<
  PutVoiceConnectorStreamingConfigurationRequest,
  PutVoiceConnectorStreamingConfigurationResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutVoiceConnectorStreamingConfigurationRequest,
  output: PutVoiceConnectorStreamingConfigurationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Updates a Voice Connector's termination settings.
 */
export const putVoiceConnectorTermination: API.OperationMethod<
  PutVoiceConnectorTerminationRequest,
  PutVoiceConnectorTerminationResponse,
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutVoiceConnectorTerminationRequest,
  output: PutVoiceConnectorTerminationResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Updates a Voice Connector's termination credentials.
 */
export const putVoiceConnectorTerminationCredentials: API.OperationMethod<
  PutVoiceConnectorTerminationCredentialsRequest,
  PutVoiceConnectorTerminationCredentialsResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutVoiceConnectorTerminationCredentialsRequest,
  output: PutVoiceConnectorTerminationCredentialsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Restores a deleted phone number.
 */
export const restorePhoneNumber: API.OperationMethod<
  RestorePhoneNumberRequest,
  RestorePhoneNumberResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RestorePhoneNumberRequest,
  output: RestorePhoneNumberResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Searches the provisioned phone numbers in an organization.
 */
export const searchAvailablePhoneNumbers: API.OperationMethod<
  SearchAvailablePhoneNumbersRequest,
  SearchAvailablePhoneNumbersResponse,
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: SearchAvailablePhoneNumbersRequest,
  ) => stream.Stream<
    SearchAvailablePhoneNumbersResponse,
    | AccessDeniedException
    | BadRequestException
    | ForbiddenException
    | ServiceFailureException
    | ServiceUnavailableException
    | ThrottledClientException
    | UnauthorizedClientException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: SearchAvailablePhoneNumbersRequest,
  ) => stream.Stream<
    unknown,
    | AccessDeniedException
    | BadRequestException
    | ForbiddenException
    | ServiceFailureException
    | ServiceUnavailableException
    | ThrottledClientException
    | UnauthorizedClientException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: SearchAvailablePhoneNumbersRequest,
  output: SearchAvailablePhoneNumbersResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Starts a speaker search task.
 *
 * Before starting any speaker search tasks, you must provide all notices and obtain all consents from the speaker as required under applicable privacy and biometrics laws, and as required under the
 * AWS service terms for the Amazon Chime SDK.
 */
export const startSpeakerSearchTask: API.OperationMethod<
  StartSpeakerSearchTaskRequest,
  StartSpeakerSearchTaskResponse,
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GoneException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | UnprocessableEntityException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartSpeakerSearchTaskRequest,
  output: StartSpeakerSearchTaskResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GoneException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
    UnprocessableEntityException,
  ],
}));
/**
 * Starts a voice tone analysis task. For more information about voice tone analysis, see
 * Using Amazon Chime SDK voice analytics
 * in the *Amazon Chime SDK Developer Guide*.
 *
 * Before starting any voice tone analysis tasks, you must provide all notices and obtain all consents from the speaker as required under applicable privacy and biometrics laws, and as required under the
 * AWS service terms for the Amazon Chime SDK.
 */
export const startVoiceToneAnalysisTask: API.OperationMethod<
  StartVoiceToneAnalysisTaskRequest,
  StartVoiceToneAnalysisTaskResponse,
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GoneException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | UnprocessableEntityException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartVoiceToneAnalysisTaskRequest,
  output: StartVoiceToneAnalysisTaskResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GoneException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
    UnprocessableEntityException,
  ],
}));
/**
 * Stops a speaker search task.
 */
export const stopSpeakerSearchTask: API.OperationMethod<
  StopSpeakerSearchTaskRequest,
  StopSpeakerSearchTaskResponse,
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | UnprocessableEntityException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StopSpeakerSearchTaskRequest,
  output: StopSpeakerSearchTaskResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
    UnprocessableEntityException,
  ],
}));
/**
 * Stops a voice tone analysis task.
 */
export const stopVoiceToneAnalysisTask: API.OperationMethod<
  StopVoiceToneAnalysisTaskRequest,
  StopVoiceToneAnalysisTaskResponse,
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | UnprocessableEntityException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StopVoiceToneAnalysisTaskRequest,
  output: StopVoiceToneAnalysisTaskResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
    UnprocessableEntityException,
  ],
}));
/**
 * Adds a tag to the specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    UnauthorizedClientException,
  ],
}));
/**
 * Removes tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    UnauthorizedClientException,
  ],
}));
/**
 * Updates global settings for the Amazon Chime SDK Voice Connectors in an AWS account.
 */
export const updateGlobalSettings: API.OperationMethod<
  UpdateGlobalSettingsRequest,
  UpdateGlobalSettingsResponse,
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateGlobalSettingsRequest,
  output: UpdateGlobalSettingsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Updates phone number details, such as product type, calling name, or phone number name for the
 * specified phone number ID. You can update one phone number detail at a time. For
 * example, you can update either the product type, calling name, or phone number name in one action.
 *
 * For numbers outside the U.S., you must use the Amazon Chime SDK SIP Media
 * Application Dial-In product type.
 *
 * Updates to outbound calling names can take 72 hours to complete. Pending
 * updates to outbound calling names must be complete before you can request another
 * update.
 */
export const updatePhoneNumber: API.OperationMethod<
  UpdatePhoneNumberRequest,
  UpdatePhoneNumberResponse,
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatePhoneNumberRequest,
  output: UpdatePhoneNumberResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Updates the phone number settings for the administrator's AWS account, such
 * as the default outbound calling name. You can update the default outbound calling
 * name once every seven days. Outbound calling names can take up to 72 hours to
 * update.
 */
export const updatePhoneNumberSettings: API.OperationMethod<
  UpdatePhoneNumberSettingsRequest,
  UpdatePhoneNumberSettingsResponse,
  | BadRequestException
  | ForbiddenException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatePhoneNumberSettingsRequest,
  output: UpdatePhoneNumberSettingsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Updates the specified proxy session details, such as voice or SMS capabilities.
 */
export const updateProxySession: API.OperationMethod<
  UpdateProxySessionRequest,
  UpdateProxySessionResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateProxySessionRequest,
  output: UpdateProxySessionResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Updates the details of the specified SIP media application.
 */
export const updateSipMediaApplication: API.OperationMethod<
  UpdateSipMediaApplicationRequest,
  UpdateSipMediaApplicationResponse,
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateSipMediaApplicationRequest,
  output: UpdateSipMediaApplicationResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Invokes the AWS Lambda function associated with the SIP media application and
 * transaction ID in an update request. The Lambda function can then return a new set
 * of actions.
 */
export const updateSipMediaApplicationCall: API.OperationMethod<
  UpdateSipMediaApplicationCallRequest,
  UpdateSipMediaApplicationCallResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateSipMediaApplicationCallRequest,
  output: UpdateSipMediaApplicationCallResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Updates the details of the specified SIP rule.
 */
export const updateSipRule: API.OperationMethod<
  UpdateSipRuleRequest,
  UpdateSipRuleResponse,
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateSipRuleRequest,
  output: UpdateSipRuleResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Updates the details for the specified Amazon Chime SDK Voice Connector.
 */
export const updateVoiceConnector: API.OperationMethod<
  UpdateVoiceConnectorRequest,
  UpdateVoiceConnectorResponse,
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateVoiceConnectorRequest,
  output: UpdateVoiceConnectorResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Updates the settings for the specified Amazon Chime SDK Voice Connector group.
 */
export const updateVoiceConnectorGroup: API.OperationMethod<
  UpdateVoiceConnectorGroupRequest,
  UpdateVoiceConnectorGroupResponse,
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateVoiceConnectorGroupRequest,
  output: UpdateVoiceConnectorGroupResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Updates the specified voice profile’s voice print and refreshes its expiration timestamp.
 *
 * As a condition of using this feature, you acknowledge that the collection, use, storage, and retention of
 * your caller’s biometric identifiers and biometric information (“biometric data”) in the form of a digital voiceprint
 * requires the caller’s informed consent via a written release. Such consent is required under various state laws,
 * including biometrics laws in Illinois, Texas, Washington and other state privacy laws.
 *
 * You must provide a written release to each caller through a process that clearly reflects each caller’s informed
 * consent before using Amazon Chime SDK Voice Insights service, as required under the terms of your agreement
 * with AWS governing your use of the service.
 */
export const updateVoiceProfile: API.OperationMethod<
  UpdateVoiceProfileRequest,
  UpdateVoiceProfileResponse,
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GoneException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateVoiceProfileRequest,
  output: UpdateVoiceProfileResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GoneException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Updates the settings for the specified voice profile domain.
 */
export const updateVoiceProfileDomain: API.OperationMethod<
  UpdateVoiceProfileDomainRequest,
  UpdateVoiceProfileDomainResponse,
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateVoiceProfileDomainRequest,
  output: UpdateVoiceProfileDomainResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
/**
 * Validates an address to be used for 911 calls made with Amazon Chime SDK Voice
 * Connectors. You can use validated addresses in a Presence Information Data Format
 * Location Object file that you include in SIP requests. That helps ensure that addresses
 * are routed to the appropriate Public Safety Answering Point.
 */
export const validateE911Address: API.OperationMethod<
  ValidateE911AddressRequest,
  ValidateE911AddressResponse,
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ValidateE911AddressRequest,
  output: ValidateE911AddressResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
}));
