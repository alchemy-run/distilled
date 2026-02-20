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
import type { Region as Rgn } from "../region.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "Notifications",
  serviceShapeName: "Notifications",
});
const auth = T.AwsAuthSigv4({ name: "notifications" });
const ver = T.ServiceVersion("2018-05-10");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
  const { UseFIPS = false, Endpoint, Region } = p;
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
    return e(Endpoint);
  }
  if (Region != null) {
    {
      const PartitionResult = _.partition(Region);
      if (PartitionResult != null && PartitionResult !== false) {
        if (UseFIPS === true) {
          return e(
            `https://notifications-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return e(
          `https://notifications.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

//# Newtypes
export type ManagedNotificationConfigurationOsArn = string;
export type NextToken = string;
export type ChannelType = string;
export type ChannelAssociationOverrideOption = string;
export type ErrorMessage = string;
export type ResourceId = string;
export type ServiceCode = string;
export type QuotaCode = string;
export type ValidationExceptionReason = string;
export type NotificationConfigurationArn = string;
export type AccountId = string;
export type MemberAccountNotificationConfigurationStatus = string;
export type OrganizationalUnitId = string;
export type TagKey = string;
export type TagValue = string;
export type ChannelArn = string;
export type ResourceType = string;
export type Source = string;
export type EventType = string;
export type EventRuleEventPattern = string;
export type Region = string;
export type EventRuleArn = string;
export type EventRuleStatus = string;
export type EventRuleStatusReason = string;
export type CreationTime = Date;
export type ManagedRuleArn = string;
export type AccountContactType = string;
export type ManagedNotificationChildEventArn = string;
export type LocaleCode = string;
export type SchemaVersion = string;
export type NotificationEventId = string;
export type TextPartReference = string;
export type Url = string;
export type NotificationType = string;
export type EventStatus = string;
export type ManagedNotificationEventArn = string;
export type TextPartId = string;
export type TextPartType = string;
export type ManagedNotificationConfigurationName = string;
export type ManagedNotificationConfigurationDescription = string;
export type ChannelIdentifier = string;
export type AggregationEventType = string;
export type NotificationConfigurationName = string;
export type NotificationConfigurationDescription = string;
export type AggregationDuration = string;
export type NotificationConfigurationStatus = string;
export type NotificationConfigurationSubtype = string;
export type NotificationEventArn = string;
export type Arn = string;
export type MediaId = string;
export type MediaElementType = string;
export type NotificationHubStatus = string;
export type NotificationHubStatusReason = string;
export type LastActivationTime = Date;

//# Schemas
export interface ListManagedNotificationChannelAssociationsRequest {
  managedNotificationConfigurationArn: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListManagedNotificationChannelAssociationsRequest = S.suspend(() =>
  S.Struct({
    managedNotificationConfigurationArn: S.String.pipe(
      T.HttpQuery("managedNotificationConfigurationArn"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/channels/list-managed-notification-channel-associations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListManagedNotificationChannelAssociationsRequest",
}) as any as S.Schema<ListManagedNotificationChannelAssociationsRequest>;
export interface ManagedNotificationChannelAssociationSummary {
  channelIdentifier: string;
  channelType: string;
  overrideOption?: string;
}
export const ManagedNotificationChannelAssociationSummary = S.suspend(() =>
  S.Struct({
    channelIdentifier: S.String,
    channelType: S.String,
    overrideOption: S.optional(S.String),
  }),
).annotate({
  identifier: "ManagedNotificationChannelAssociationSummary",
}) as any as S.Schema<ManagedNotificationChannelAssociationSummary>;
export type ManagedNotificationChannelAssociations =
  ManagedNotificationChannelAssociationSummary[];
export const ManagedNotificationChannelAssociations = S.Array(
  ManagedNotificationChannelAssociationSummary,
);
export interface ListManagedNotificationChannelAssociationsResponse {
  nextToken?: string;
  channelAssociations: ManagedNotificationChannelAssociationSummary[];
}
export const ListManagedNotificationChannelAssociationsResponse = S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      channelAssociations: ManagedNotificationChannelAssociations,
    }),
).annotate({
  identifier: "ListManagedNotificationChannelAssociationsResponse",
}) as any as S.Schema<ListManagedNotificationChannelAssociationsResponse>;
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export const ValidationExceptionField = S.suspend(() =>
  S.Struct({ name: S.String, message: S.String }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = S.Array(ValidationExceptionField);
export interface ListMemberAccountsRequest {
  notificationConfigurationArn: string;
  maxResults?: number;
  nextToken?: string;
  memberAccount?: string;
  status?: string;
  organizationalUnitId?: string;
}
export const ListMemberAccountsRequest = S.suspend(() =>
  S.Struct({
    notificationConfigurationArn: S.String.pipe(
      T.HttpQuery("notificationConfigurationArn"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    memberAccount: S.optional(S.String).pipe(T.HttpQuery("memberAccount")),
    status: S.optional(S.String).pipe(T.HttpQuery("status")),
    organizationalUnitId: S.optional(S.String).pipe(
      T.HttpQuery("organizationalUnitId"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/list-member-accounts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMemberAccountsRequest",
}) as any as S.Schema<ListMemberAccountsRequest>;
export interface MemberAccount {
  notificationConfigurationArn?: string;
  accountId: string;
  status: string;
  statusReason: string;
  organizationalUnitId: string;
}
export const MemberAccount = S.suspend(() =>
  S.Struct({
    notificationConfigurationArn: S.optional(S.String),
    accountId: S.String,
    status: S.String,
    statusReason: S.String,
    organizationalUnitId: S.String,
  }),
).annotate({ identifier: "MemberAccount" }) as any as S.Schema<MemberAccount>;
export type MemberAccounts = MemberAccount[];
export const MemberAccounts = S.Array(MemberAccount);
export interface ListMemberAccountsResponse {
  memberAccounts: MemberAccount[];
  nextToken?: string;
}
export const ListMemberAccountsResponse = S.suspend(() =>
  S.Struct({ memberAccounts: MemberAccounts, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListMemberAccountsResponse",
}) as any as S.Schema<ListMemberAccountsResponse>;
export interface ListTagsForResourceRequest {
  arn: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
  S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{arn}" }),
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
export type TagMap = { [key: string]: string | undefined };
export const TagMap = S.Record(S.String, S.String.pipe(S.optional));
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface TagResourceRequest {
  arn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")), tags: TagMap }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{arn}" }),
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
export type TagKeys = string[];
export const TagKeys = S.Array(S.String);
export interface UntagResourceRequest {
  arn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({
    arn: S.String.pipe(T.HttpLabel("arn")),
    tagKeys: TagKeys.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{arn}" }),
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
export interface AssociateChannelRequest {
  arn: string;
  notificationConfigurationArn: string;
}
export const AssociateChannelRequest = S.suspend(() =>
  S.Struct({
    arn: S.String.pipe(T.HttpLabel("arn")),
    notificationConfigurationArn: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/channels/associate/{arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateChannelRequest",
}) as any as S.Schema<AssociateChannelRequest>;
export interface AssociateChannelResponse {}
export const AssociateChannelResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "AssociateChannelResponse",
}) as any as S.Schema<AssociateChannelResponse>;
export interface DisassociateChannelRequest {
  arn: string;
  notificationConfigurationArn: string;
}
export const DisassociateChannelRequest = S.suspend(() =>
  S.Struct({
    arn: S.String.pipe(T.HttpLabel("arn")),
    notificationConfigurationArn: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/channels/disassociate/{arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateChannelRequest",
}) as any as S.Schema<DisassociateChannelRequest>;
export interface DisassociateChannelResponse {}
export const DisassociateChannelResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateChannelResponse",
}) as any as S.Schema<DisassociateChannelResponse>;
export interface ListChannelsRequest {
  notificationConfigurationArn: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListChannelsRequest = S.suspend(() =>
  S.Struct({
    notificationConfigurationArn: S.String.pipe(
      T.HttpQuery("notificationConfigurationArn"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/channels" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListChannelsRequest",
}) as any as S.Schema<ListChannelsRequest>;
export type Channels = string[];
export const Channels = S.Array(S.String);
export interface ListChannelsResponse {
  nextToken?: string;
  channels: string[];
}
export const ListChannelsResponse = S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), channels: Channels }),
).annotate({
  identifier: "ListChannelsResponse",
}) as any as S.Schema<ListChannelsResponse>;
export type Regions = string[];
export const Regions = S.Array(S.String);
export interface CreateEventRuleRequest {
  notificationConfigurationArn: string;
  source: string;
  eventType: string;
  eventPattern?: string;
  regions: string[];
}
export const CreateEventRuleRequest = S.suspend(() =>
  S.Struct({
    notificationConfigurationArn: S.String,
    source: S.String,
    eventType: S.String,
    eventPattern: S.optional(S.String),
    regions: Regions,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/event-rules" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEventRuleRequest",
}) as any as S.Schema<CreateEventRuleRequest>;
export interface EventRuleStatusSummary {
  status: string;
  reason: string;
}
export const EventRuleStatusSummary = S.suspend(() =>
  S.Struct({ status: S.String, reason: S.String }),
).annotate({
  identifier: "EventRuleStatusSummary",
}) as any as S.Schema<EventRuleStatusSummary>;
export type StatusSummaryByRegion = {
  [key: string]: EventRuleStatusSummary | undefined;
};
export const StatusSummaryByRegion = S.Record(
  S.String,
  EventRuleStatusSummary.pipe(S.optional),
);
export interface CreateEventRuleResponse {
  arn: string;
  notificationConfigurationArn: string;
  statusSummaryByRegion: { [key: string]: EventRuleStatusSummary | undefined };
}
export const CreateEventRuleResponse = S.suspend(() =>
  S.Struct({
    arn: S.String,
    notificationConfigurationArn: S.String,
    statusSummaryByRegion: StatusSummaryByRegion,
  }),
).annotate({
  identifier: "CreateEventRuleResponse",
}) as any as S.Schema<CreateEventRuleResponse>;
export interface UpdateEventRuleRequest {
  arn: string;
  eventPattern?: string;
  regions?: string[];
}
export const UpdateEventRuleRequest = S.suspend(() =>
  S.Struct({
    arn: S.String.pipe(T.HttpLabel("arn")),
    eventPattern: S.optional(S.String),
    regions: S.optional(Regions),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/event-rules/{arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateEventRuleRequest",
}) as any as S.Schema<UpdateEventRuleRequest>;
export interface UpdateEventRuleResponse {
  arn: string;
  notificationConfigurationArn: string;
  statusSummaryByRegion: { [key: string]: EventRuleStatusSummary | undefined };
}
export const UpdateEventRuleResponse = S.suspend(() =>
  S.Struct({
    arn: S.String,
    notificationConfigurationArn: S.String,
    statusSummaryByRegion: StatusSummaryByRegion,
  }),
).annotate({
  identifier: "UpdateEventRuleResponse",
}) as any as S.Schema<UpdateEventRuleResponse>;
export interface GetEventRuleRequest {
  arn: string;
}
export const GetEventRuleRequest = S.suspend(() =>
  S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/event-rules/{arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEventRuleRequest",
}) as any as S.Schema<GetEventRuleRequest>;
export type ManagedRuleArns = string[];
export const ManagedRuleArns = S.Array(S.String);
export interface GetEventRuleResponse {
  arn: string;
  notificationConfigurationArn: string;
  creationTime: Date;
  source: string;
  eventType: string;
  eventPattern: string;
  regions: string[];
  managedRules: string[];
  statusSummaryByRegion: { [key: string]: EventRuleStatusSummary | undefined };
}
export const GetEventRuleResponse = S.suspend(() =>
  S.Struct({
    arn: S.String,
    notificationConfigurationArn: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    source: S.String,
    eventType: S.String,
    eventPattern: S.String,
    regions: Regions,
    managedRules: ManagedRuleArns,
    statusSummaryByRegion: StatusSummaryByRegion,
  }),
).annotate({
  identifier: "GetEventRuleResponse",
}) as any as S.Schema<GetEventRuleResponse>;
export interface DeleteEventRuleRequest {
  arn: string;
}
export const DeleteEventRuleRequest = S.suspend(() =>
  S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/event-rules/{arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEventRuleRequest",
}) as any as S.Schema<DeleteEventRuleRequest>;
export interface DeleteEventRuleResponse {}
export const DeleteEventRuleResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteEventRuleResponse",
}) as any as S.Schema<DeleteEventRuleResponse>;
export interface ListEventRulesRequest {
  notificationConfigurationArn: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListEventRulesRequest = S.suspend(() =>
  S.Struct({
    notificationConfigurationArn: S.String.pipe(
      T.HttpQuery("notificationConfigurationArn"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/event-rules" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEventRulesRequest",
}) as any as S.Schema<ListEventRulesRequest>;
export interface EventRuleStructure {
  arn: string;
  notificationConfigurationArn: string;
  creationTime: Date;
  source: string;
  eventType: string;
  eventPattern: string;
  regions: string[];
  managedRules: string[];
  statusSummaryByRegion: { [key: string]: EventRuleStatusSummary | undefined };
}
export const EventRuleStructure = S.suspend(() =>
  S.Struct({
    arn: S.String,
    notificationConfigurationArn: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    source: S.String,
    eventType: S.String,
    eventPattern: S.String,
    regions: Regions,
    managedRules: ManagedRuleArns,
    statusSummaryByRegion: StatusSummaryByRegion,
  }),
).annotate({
  identifier: "EventRuleStructure",
}) as any as S.Schema<EventRuleStructure>;
export type EventRules = EventRuleStructure[];
export const EventRules = S.Array(EventRuleStructure);
export interface ListEventRulesResponse {
  nextToken?: string;
  eventRules: EventRuleStructure[];
}
export const ListEventRulesResponse = S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), eventRules: EventRules }),
).annotate({
  identifier: "ListEventRulesResponse",
}) as any as S.Schema<ListEventRulesResponse>;
export interface AssociateManagedNotificationAccountContactRequest {
  contactIdentifier: string;
  managedNotificationConfigurationArn: string;
}
export const AssociateManagedNotificationAccountContactRequest = S.suspend(() =>
  S.Struct({
    contactIdentifier: S.String.pipe(T.HttpLabel("contactIdentifier")),
    managedNotificationConfigurationArn: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/contacts/associate-managed-notification/{contactIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateManagedNotificationAccountContactRequest",
}) as any as S.Schema<AssociateManagedNotificationAccountContactRequest>;
export interface AssociateManagedNotificationAccountContactResponse {}
export const AssociateManagedNotificationAccountContactResponse = S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "AssociateManagedNotificationAccountContactResponse",
}) as any as S.Schema<AssociateManagedNotificationAccountContactResponse>;
export interface DisassociateManagedNotificationAccountContactRequest {
  contactIdentifier: string;
  managedNotificationConfigurationArn: string;
}
export const DisassociateManagedNotificationAccountContactRequest = S.suspend(
  () =>
    S.Struct({
      contactIdentifier: S.String.pipe(T.HttpLabel("contactIdentifier")),
      managedNotificationConfigurationArn: S.String,
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/contacts/disassociate-managed-notification/{contactIdentifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DisassociateManagedNotificationAccountContactRequest",
}) as any as S.Schema<DisassociateManagedNotificationAccountContactRequest>;
export interface DisassociateManagedNotificationAccountContactResponse {}
export const DisassociateManagedNotificationAccountContactResponse = S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DisassociateManagedNotificationAccountContactResponse",
}) as any as S.Schema<DisassociateManagedNotificationAccountContactResponse>;
export interface AssociateManagedNotificationAdditionalChannelRequest {
  channelArn: string;
  managedNotificationConfigurationArn: string;
}
export const AssociateManagedNotificationAdditionalChannelRequest = S.suspend(
  () =>
    S.Struct({
      channelArn: S.String.pipe(T.HttpLabel("channelArn")),
      managedNotificationConfigurationArn: S.String,
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/channels/associate-managed-notification/{channelArn}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "AssociateManagedNotificationAdditionalChannelRequest",
}) as any as S.Schema<AssociateManagedNotificationAdditionalChannelRequest>;
export interface AssociateManagedNotificationAdditionalChannelResponse {}
export const AssociateManagedNotificationAdditionalChannelResponse = S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "AssociateManagedNotificationAdditionalChannelResponse",
}) as any as S.Schema<AssociateManagedNotificationAdditionalChannelResponse>;
export interface DisassociateManagedNotificationAdditionalChannelRequest {
  channelArn: string;
  managedNotificationConfigurationArn: string;
}
export const DisassociateManagedNotificationAdditionalChannelRequest =
  S.suspend(() =>
    S.Struct({
      channelArn: S.String.pipe(T.HttpLabel("channelArn")),
      managedNotificationConfigurationArn: S.String,
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/channels/disassociate-managed-notification/{channelArn}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DisassociateManagedNotificationAdditionalChannelRequest",
  }) as any as S.Schema<DisassociateManagedNotificationAdditionalChannelRequest>;
export interface DisassociateManagedNotificationAdditionalChannelResponse {}
export const DisassociateManagedNotificationAdditionalChannelResponse =
  S.suspend(() => S.Struct({})).annotate({
    identifier: "DisassociateManagedNotificationAdditionalChannelResponse",
  }) as any as S.Schema<DisassociateManagedNotificationAdditionalChannelResponse>;
export interface GetManagedNotificationChildEventRequest {
  arn: string;
  locale?: string;
}
export const GetManagedNotificationChildEventRequest = S.suspend(() =>
  S.Struct({
    arn: S.String.pipe(T.HttpLabel("arn")),
    locale: S.optional(S.String).pipe(T.HttpQuery("locale")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/managed-notification-child-events/{arn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetManagedNotificationChildEventRequest",
}) as any as S.Schema<GetManagedNotificationChildEventRequest>;
export interface Dimension {
  name: string;
  value: string;
}
export const Dimension = S.suspend(() =>
  S.Struct({ name: S.String, value: S.String }),
).annotate({ identifier: "Dimension" }) as any as S.Schema<Dimension>;
export type Dimensions = Dimension[];
export const Dimensions = S.Array(Dimension);
export interface MessageComponents {
  headline?: string;
  paragraphSummary?: string;
  completeDescription?: string;
  dimensions?: Dimension[];
}
export const MessageComponents = S.suspend(() =>
  S.Struct({
    headline: S.optional(S.String),
    paragraphSummary: S.optional(S.String),
    completeDescription: S.optional(S.String),
    dimensions: S.optional(Dimensions),
  }),
).annotate({
  identifier: "MessageComponents",
}) as any as S.Schema<MessageComponents>;
export type TextByLocale = { [key: string]: string | undefined };
export const TextByLocale = S.Record(S.String, S.String.pipe(S.optional));
export interface TextPartValue {
  type: string;
  displayText?: string;
  textByLocale?: { [key: string]: string | undefined };
  url?: string;
}
export const TextPartValue = S.suspend(() =>
  S.Struct({
    type: S.String,
    displayText: S.optional(S.String),
    textByLocale: S.optional(TextByLocale),
    url: S.optional(S.String),
  }),
).annotate({ identifier: "TextPartValue" }) as any as S.Schema<TextPartValue>;
export type TextParts = { [key: string]: TextPartValue | undefined };
export const TextParts = S.Record(S.String, TextPartValue.pipe(S.optional));
export interface SummarizationDimensionDetail {
  name: string;
  value: string;
}
export const SummarizationDimensionDetail = S.suspend(() =>
  S.Struct({ name: S.String, value: S.String }),
).annotate({
  identifier: "SummarizationDimensionDetail",
}) as any as S.Schema<SummarizationDimensionDetail>;
export type SummarizationDimensionDetails = SummarizationDimensionDetail[];
export const SummarizationDimensionDetails = S.Array(
  SummarizationDimensionDetail,
);
export interface AggregationDetail {
  summarizationDimensions?: SummarizationDimensionDetail[];
}
export const AggregationDetail = S.suspend(() =>
  S.Struct({
    summarizationDimensions: S.optional(SummarizationDimensionDetails),
  }),
).annotate({
  identifier: "AggregationDetail",
}) as any as S.Schema<AggregationDetail>;
export interface ManagedNotificationChildEvent {
  schemaVersion: string;
  id: string;
  messageComponents: MessageComponents;
  sourceEventDetailUrl?: string;
  sourceEventDetailUrlDisplayText?: string;
  notificationType: string;
  eventStatus?: string;
  aggregateManagedNotificationEventArn: string;
  startTime?: Date;
  endTime?: Date;
  textParts: { [key: string]: TextPartValue | undefined };
  organizationalUnitId?: string;
  aggregationDetail?: AggregationDetail;
}
export const ManagedNotificationChildEvent = S.suspend(() =>
  S.Struct({
    schemaVersion: S.String,
    id: S.String,
    messageComponents: MessageComponents,
    sourceEventDetailUrl: S.optional(S.String),
    sourceEventDetailUrlDisplayText: S.optional(S.String),
    notificationType: S.String,
    eventStatus: S.optional(S.String),
    aggregateManagedNotificationEventArn: S.String,
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    textParts: TextParts,
    organizationalUnitId: S.optional(S.String),
    aggregationDetail: S.optional(AggregationDetail),
  }),
).annotate({
  identifier: "ManagedNotificationChildEvent",
}) as any as S.Schema<ManagedNotificationChildEvent>;
export interface GetManagedNotificationChildEventResponse {
  arn: string;
  managedNotificationConfigurationArn: string;
  creationTime: Date;
  content: ManagedNotificationChildEvent;
}
export const GetManagedNotificationChildEventResponse = S.suspend(() =>
  S.Struct({
    arn: S.String,
    managedNotificationConfigurationArn: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    content: ManagedNotificationChildEvent,
  }),
).annotate({
  identifier: "GetManagedNotificationChildEventResponse",
}) as any as S.Schema<GetManagedNotificationChildEventResponse>;
export interface ListManagedNotificationChildEventsRequest {
  aggregateManagedNotificationEventArn: string;
  startTime?: Date;
  endTime?: Date;
  locale?: string;
  maxResults?: number;
  relatedAccount?: string;
  organizationalUnitId?: string;
  nextToken?: string;
}
export const ListManagedNotificationChildEventsRequest = S.suspend(() =>
  S.Struct({
    aggregateManagedNotificationEventArn: S.String.pipe(
      T.HttpLabel("aggregateManagedNotificationEventArn"),
    ),
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("startTime")),
    endTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("endTime")),
    locale: S.optional(S.String).pipe(T.HttpQuery("locale")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    relatedAccount: S.optional(S.String).pipe(T.HttpQuery("relatedAccount")),
    organizationalUnitId: S.optional(S.String).pipe(
      T.HttpQuery("organizationalUnitId"),
    ),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/list-managed-notification-child-events/{aggregateManagedNotificationEventArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListManagedNotificationChildEventsRequest",
}) as any as S.Schema<ListManagedNotificationChildEventsRequest>;
export interface ManagedSourceEventMetadataSummary {
  eventOriginRegion?: string;
  source: string;
  eventType: string;
}
export const ManagedSourceEventMetadataSummary = S.suspend(() =>
  S.Struct({
    eventOriginRegion: S.optional(S.String),
    source: S.String,
    eventType: S.String,
  }),
).annotate({
  identifier: "ManagedSourceEventMetadataSummary",
}) as any as S.Schema<ManagedSourceEventMetadataSummary>;
export interface MessageComponentsSummary {
  headline: string;
}
export const MessageComponentsSummary = S.suspend(() =>
  S.Struct({ headline: S.String }),
).annotate({
  identifier: "MessageComponentsSummary",
}) as any as S.Schema<MessageComponentsSummary>;
export interface ManagedNotificationChildEventSummary {
  schemaVersion: string;
  sourceEventMetadata: ManagedSourceEventMetadataSummary;
  messageComponents: MessageComponentsSummary;
  aggregationDetail: AggregationDetail;
  eventStatus: string;
  notificationType: string;
}
export const ManagedNotificationChildEventSummary = S.suspend(() =>
  S.Struct({
    schemaVersion: S.String,
    sourceEventMetadata: ManagedSourceEventMetadataSummary,
    messageComponents: MessageComponentsSummary,
    aggregationDetail: AggregationDetail,
    eventStatus: S.String,
    notificationType: S.String,
  }),
).annotate({
  identifier: "ManagedNotificationChildEventSummary",
}) as any as S.Schema<ManagedNotificationChildEventSummary>;
export interface ManagedNotificationChildEventOverview {
  arn: string;
  managedNotificationConfigurationArn: string;
  relatedAccount: string;
  creationTime: Date;
  childEvent: ManagedNotificationChildEventSummary;
  aggregateManagedNotificationEventArn: string;
  organizationalUnitId?: string;
}
export const ManagedNotificationChildEventOverview = S.suspend(() =>
  S.Struct({
    arn: S.String,
    managedNotificationConfigurationArn: S.String,
    relatedAccount: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    childEvent: ManagedNotificationChildEventSummary,
    aggregateManagedNotificationEventArn: S.String,
    organizationalUnitId: S.optional(S.String),
  }),
).annotate({
  identifier: "ManagedNotificationChildEventOverview",
}) as any as S.Schema<ManagedNotificationChildEventOverview>;
export type ManagedNotificationChildEvents =
  ManagedNotificationChildEventOverview[];
export const ManagedNotificationChildEvents = S.Array(
  ManagedNotificationChildEventOverview,
);
export interface ListManagedNotificationChildEventsResponse {
  nextToken?: string;
  managedNotificationChildEvents: ManagedNotificationChildEventOverview[];
}
export const ListManagedNotificationChildEventsResponse = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    managedNotificationChildEvents: ManagedNotificationChildEvents,
  }),
).annotate({
  identifier: "ListManagedNotificationChildEventsResponse",
}) as any as S.Schema<ListManagedNotificationChildEventsResponse>;
export interface GetManagedNotificationConfigurationRequest {
  arn: string;
}
export const GetManagedNotificationConfigurationRequest = S.suspend(() =>
  S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/managed-notification-configurations/{arn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetManagedNotificationConfigurationRequest",
}) as any as S.Schema<GetManagedNotificationConfigurationRequest>;
export interface GetManagedNotificationConfigurationResponse {
  arn: string;
  name: string;
  description: string;
  category: string;
  subCategory: string;
}
export const GetManagedNotificationConfigurationResponse = S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.String,
    description: S.String,
    category: S.String,
    subCategory: S.String,
  }),
).annotate({
  identifier: "GetManagedNotificationConfigurationResponse",
}) as any as S.Schema<GetManagedNotificationConfigurationResponse>;
export interface ListManagedNotificationConfigurationsRequest {
  channelIdentifier?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListManagedNotificationConfigurationsRequest = S.suspend(() =>
  S.Struct({
    channelIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("channelIdentifier"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/managed-notification-configurations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListManagedNotificationConfigurationsRequest",
}) as any as S.Schema<ListManagedNotificationConfigurationsRequest>;
export interface ManagedNotificationConfigurationStructure {
  arn: string;
  name: string;
  description: string;
}
export const ManagedNotificationConfigurationStructure = S.suspend(() =>
  S.Struct({ arn: S.String, name: S.String, description: S.String }),
).annotate({
  identifier: "ManagedNotificationConfigurationStructure",
}) as any as S.Schema<ManagedNotificationConfigurationStructure>;
export type ManagedNotificationConfigurations =
  ManagedNotificationConfigurationStructure[];
export const ManagedNotificationConfigurations = S.Array(
  ManagedNotificationConfigurationStructure,
);
export interface ListManagedNotificationConfigurationsResponse {
  nextToken?: string;
  managedNotificationConfigurations: ManagedNotificationConfigurationStructure[];
}
export const ListManagedNotificationConfigurationsResponse = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    managedNotificationConfigurations: ManagedNotificationConfigurations,
  }),
).annotate({
  identifier: "ListManagedNotificationConfigurationsResponse",
}) as any as S.Schema<ListManagedNotificationConfigurationsResponse>;
export interface GetManagedNotificationEventRequest {
  arn: string;
  locale?: string;
}
export const GetManagedNotificationEventRequest = S.suspend(() =>
  S.Struct({
    arn: S.String.pipe(T.HttpLabel("arn")),
    locale: S.optional(S.String).pipe(T.HttpQuery("locale")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/managed-notification-events/{arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetManagedNotificationEventRequest",
}) as any as S.Schema<GetManagedNotificationEventRequest>;
export interface AggregationKey {
  name: string;
  value: string;
}
export const AggregationKey = S.suspend(() =>
  S.Struct({ name: S.String, value: S.String }),
).annotate({ identifier: "AggregationKey" }) as any as S.Schema<AggregationKey>;
export type AggregationKeys = AggregationKey[];
export const AggregationKeys = S.Array(AggregationKey);
export type SampleAggregationDimensionValues = string[];
export const SampleAggregationDimensionValues = S.Array(S.String);
export interface SummarizationDimensionOverview {
  name: string;
  count: number;
  sampleValues?: string[];
}
export const SummarizationDimensionOverview = S.suspend(() =>
  S.Struct({
    name: S.String,
    count: S.Number,
    sampleValues: S.optional(SampleAggregationDimensionValues),
  }),
).annotate({
  identifier: "SummarizationDimensionOverview",
}) as any as S.Schema<SummarizationDimensionOverview>;
export type SummarizationDimensionOverviews = SummarizationDimensionOverview[];
export const SummarizationDimensionOverviews = S.Array(
  SummarizationDimensionOverview,
);
export interface AggregationSummary {
  eventCount: number;
  aggregatedBy: AggregationKey[];
  aggregatedAccounts: SummarizationDimensionOverview;
  aggregatedRegions: SummarizationDimensionOverview;
  aggregatedOrganizationalUnits?: SummarizationDimensionOverview;
  additionalSummarizationDimensions?: SummarizationDimensionOverview[];
}
export const AggregationSummary = S.suspend(() =>
  S.Struct({
    eventCount: S.Number,
    aggregatedBy: AggregationKeys,
    aggregatedAccounts: SummarizationDimensionOverview,
    aggregatedRegions: SummarizationDimensionOverview,
    aggregatedOrganizationalUnits: S.optional(SummarizationDimensionOverview),
    additionalSummarizationDimensions: S.optional(
      SummarizationDimensionOverviews,
    ),
  }),
).annotate({
  identifier: "AggregationSummary",
}) as any as S.Schema<AggregationSummary>;
export interface ManagedNotificationEvent {
  schemaVersion: string;
  id: string;
  messageComponents: MessageComponents;
  sourceEventDetailUrl?: string;
  sourceEventDetailUrlDisplayText?: string;
  notificationType: string;
  eventStatus?: string;
  aggregationEventType?: string;
  aggregationSummary?: AggregationSummary;
  startTime?: Date;
  endTime?: Date;
  textParts: { [key: string]: TextPartValue | undefined };
  organizationalUnitId?: string;
}
export const ManagedNotificationEvent = S.suspend(() =>
  S.Struct({
    schemaVersion: S.String,
    id: S.String,
    messageComponents: MessageComponents,
    sourceEventDetailUrl: S.optional(S.String),
    sourceEventDetailUrlDisplayText: S.optional(S.String),
    notificationType: S.String,
    eventStatus: S.optional(S.String),
    aggregationEventType: S.optional(S.String),
    aggregationSummary: S.optional(AggregationSummary),
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    textParts: TextParts,
    organizationalUnitId: S.optional(S.String),
  }),
).annotate({
  identifier: "ManagedNotificationEvent",
}) as any as S.Schema<ManagedNotificationEvent>;
export interface GetManagedNotificationEventResponse {
  arn: string;
  managedNotificationConfigurationArn: string;
  creationTime: Date;
  content: ManagedNotificationEvent;
}
export const GetManagedNotificationEventResponse = S.suspend(() =>
  S.Struct({
    arn: S.String,
    managedNotificationConfigurationArn: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    content: ManagedNotificationEvent,
  }),
).annotate({
  identifier: "GetManagedNotificationEventResponse",
}) as any as S.Schema<GetManagedNotificationEventResponse>;
export interface ListManagedNotificationEventsRequest {
  startTime?: Date;
  endTime?: Date;
  locale?: string;
  source?: string;
  maxResults?: number;
  nextToken?: string;
  organizationalUnitId?: string;
  relatedAccount?: string;
}
export const ListManagedNotificationEventsRequest = S.suspend(() =>
  S.Struct({
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("startTime")),
    endTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("endTime")),
    locale: S.optional(S.String).pipe(T.HttpQuery("locale")),
    source: S.optional(S.String).pipe(T.HttpQuery("source")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    organizationalUnitId: S.optional(S.String).pipe(
      T.HttpQuery("organizationalUnitId"),
    ),
    relatedAccount: S.optional(S.String).pipe(T.HttpQuery("relatedAccount")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/managed-notification-events" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListManagedNotificationEventsRequest",
}) as any as S.Schema<ListManagedNotificationEventsRequest>;
export interface ManagedNotificationEventSummary {
  schemaVersion: string;
  sourceEventMetadata: ManagedSourceEventMetadataSummary;
  messageComponents: MessageComponentsSummary;
  eventStatus: string;
  notificationType: string;
}
export const ManagedNotificationEventSummary = S.suspend(() =>
  S.Struct({
    schemaVersion: S.String,
    sourceEventMetadata: ManagedSourceEventMetadataSummary,
    messageComponents: MessageComponentsSummary,
    eventStatus: S.String,
    notificationType: S.String,
  }),
).annotate({
  identifier: "ManagedNotificationEventSummary",
}) as any as S.Schema<ManagedNotificationEventSummary>;
export type AggregatedNotificationRegions = string[];
export const AggregatedNotificationRegions = S.Array(S.String);
export interface ManagedNotificationEventOverview {
  arn: string;
  managedNotificationConfigurationArn: string;
  relatedAccount: string;
  creationTime: Date;
  notificationEvent: ManagedNotificationEventSummary;
  aggregationEventType?: string;
  organizationalUnitId?: string;
  aggregationSummary?: AggregationSummary;
  aggregatedNotificationRegions?: string[];
}
export const ManagedNotificationEventOverview = S.suspend(() =>
  S.Struct({
    arn: S.String,
    managedNotificationConfigurationArn: S.String,
    relatedAccount: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    notificationEvent: ManagedNotificationEventSummary,
    aggregationEventType: S.optional(S.String),
    organizationalUnitId: S.optional(S.String),
    aggregationSummary: S.optional(AggregationSummary),
    aggregatedNotificationRegions: S.optional(AggregatedNotificationRegions),
  }),
).annotate({
  identifier: "ManagedNotificationEventOverview",
}) as any as S.Schema<ManagedNotificationEventOverview>;
export type ManagedNotificationEvents = ManagedNotificationEventOverview[];
export const ManagedNotificationEvents = S.Array(
  ManagedNotificationEventOverview,
);
export interface ListManagedNotificationEventsResponse {
  nextToken?: string;
  managedNotificationEvents: ManagedNotificationEventOverview[];
}
export const ListManagedNotificationEventsResponse = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    managedNotificationEvents: ManagedNotificationEvents,
  }),
).annotate({
  identifier: "ListManagedNotificationEventsResponse",
}) as any as S.Schema<ListManagedNotificationEventsResponse>;
export interface CreateNotificationConfigurationRequest {
  name: string;
  description: string;
  aggregationDuration?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateNotificationConfigurationRequest = S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.String,
    aggregationDuration: S.optional(S.String),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/notification-configurations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateNotificationConfigurationRequest",
}) as any as S.Schema<CreateNotificationConfigurationRequest>;
export interface CreateNotificationConfigurationResponse {
  arn: string;
  status: string;
}
export const CreateNotificationConfigurationResponse = S.suspend(() =>
  S.Struct({ arn: S.String, status: S.String }),
).annotate({
  identifier: "CreateNotificationConfigurationResponse",
}) as any as S.Schema<CreateNotificationConfigurationResponse>;
export interface UpdateNotificationConfigurationRequest {
  arn: string;
  name?: string;
  description?: string;
  aggregationDuration?: string;
}
export const UpdateNotificationConfigurationRequest = S.suspend(() =>
  S.Struct({
    arn: S.String.pipe(T.HttpLabel("arn")),
    name: S.optional(S.String),
    description: S.optional(S.String),
    aggregationDuration: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/notification-configurations/{arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateNotificationConfigurationRequest",
}) as any as S.Schema<UpdateNotificationConfigurationRequest>;
export interface UpdateNotificationConfigurationResponse {
  arn: string;
}
export const UpdateNotificationConfigurationResponse = S.suspend(() =>
  S.Struct({ arn: S.String }),
).annotate({
  identifier: "UpdateNotificationConfigurationResponse",
}) as any as S.Schema<UpdateNotificationConfigurationResponse>;
export interface GetNotificationConfigurationRequest {
  arn: string;
}
export const GetNotificationConfigurationRequest = S.suspend(() =>
  S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/notification-configurations/{arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetNotificationConfigurationRequest",
}) as any as S.Schema<GetNotificationConfigurationRequest>;
export interface GetNotificationConfigurationResponse {
  arn: string;
  name: string;
  description: string;
  status: string;
  creationTime: Date;
  aggregationDuration?: string;
  subtype?: string;
}
export const GetNotificationConfigurationResponse = S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.String,
    description: S.String,
    status: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    aggregationDuration: S.optional(S.String),
    subtype: S.optional(S.String),
  }),
).annotate({
  identifier: "GetNotificationConfigurationResponse",
}) as any as S.Schema<GetNotificationConfigurationResponse>;
export interface DeleteNotificationConfigurationRequest {
  arn: string;
}
export const DeleteNotificationConfigurationRequest = S.suspend(() =>
  S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/notification-configurations/{arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteNotificationConfigurationRequest",
}) as any as S.Schema<DeleteNotificationConfigurationRequest>;
export interface DeleteNotificationConfigurationResponse {}
export const DeleteNotificationConfigurationResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteNotificationConfigurationResponse",
}) as any as S.Schema<DeleteNotificationConfigurationResponse>;
export interface ListNotificationConfigurationsRequest {
  eventRuleSource?: string;
  channelArn?: string;
  status?: string;
  subtype?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListNotificationConfigurationsRequest = S.suspend(() =>
  S.Struct({
    eventRuleSource: S.optional(S.String).pipe(T.HttpQuery("eventRuleSource")),
    channelArn: S.optional(S.String).pipe(T.HttpQuery("channelArn")),
    status: S.optional(S.String).pipe(T.HttpQuery("status")),
    subtype: S.optional(S.String).pipe(T.HttpQuery("subtype")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/notification-configurations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListNotificationConfigurationsRequest",
}) as any as S.Schema<ListNotificationConfigurationsRequest>;
export interface NotificationConfigurationStructure {
  arn: string;
  name: string;
  description: string;
  status: string;
  creationTime: Date;
  aggregationDuration?: string;
  subtype?: string;
}
export const NotificationConfigurationStructure = S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.String,
    description: S.String,
    status: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    aggregationDuration: S.optional(S.String),
    subtype: S.optional(S.String),
  }),
).annotate({
  identifier: "NotificationConfigurationStructure",
}) as any as S.Schema<NotificationConfigurationStructure>;
export type NotificationConfigurations = NotificationConfigurationStructure[];
export const NotificationConfigurations = S.Array(
  NotificationConfigurationStructure,
);
export interface ListNotificationConfigurationsResponse {
  nextToken?: string;
  notificationConfigurations: NotificationConfigurationStructure[];
}
export const ListNotificationConfigurationsResponse = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    notificationConfigurations: NotificationConfigurations,
  }),
).annotate({
  identifier: "ListNotificationConfigurationsResponse",
}) as any as S.Schema<ListNotificationConfigurationsResponse>;
export interface GetNotificationEventRequest {
  arn: string;
  locale?: string;
}
export const GetNotificationEventRequest = S.suspend(() =>
  S.Struct({
    arn: S.String.pipe(T.HttpLabel("arn")),
    locale: S.optional(S.String).pipe(T.HttpQuery("locale")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/notification-events/{arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetNotificationEventRequest",
}) as any as S.Schema<GetNotificationEventRequest>;
export type Tags = string[];
export const Tags = S.Array(S.String);
export interface Resource {
  id?: string;
  arn?: string;
  detailUrl?: string;
  tags?: string[];
}
export const Resource = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    detailUrl: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({ identifier: "Resource" }) as any as S.Schema<Resource>;
export type Resources = Resource[];
export const Resources = S.Array(Resource);
export interface SourceEventMetadata {
  eventTypeVersion: string;
  sourceEventId: string;
  eventOriginRegion?: string;
  relatedAccount: string;
  source: string;
  eventOccurrenceTime: Date;
  eventType: string;
  relatedResources: Resource[];
}
export const SourceEventMetadata = S.suspend(() =>
  S.Struct({
    eventTypeVersion: S.String,
    sourceEventId: S.String,
    eventOriginRegion: S.optional(S.String),
    relatedAccount: S.String,
    source: S.String,
    eventOccurrenceTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    eventType: S.String,
    relatedResources: Resources,
  }),
).annotate({
  identifier: "SourceEventMetadata",
}) as any as S.Schema<SourceEventMetadata>;
export interface MediaElement {
  mediaId: string;
  type: string;
  url: string;
  caption: string;
}
export const MediaElement = S.suspend(() =>
  S.Struct({
    mediaId: S.String,
    type: S.String,
    url: S.String,
    caption: S.String,
  }),
).annotate({ identifier: "MediaElement" }) as any as S.Schema<MediaElement>;
export type Media = MediaElement[];
export const Media = S.Array(MediaElement);
export interface NotificationEventSchema {
  schemaVersion: string;
  id: string;
  sourceEventMetadata: SourceEventMetadata;
  messageComponents: MessageComponents;
  sourceEventDetailUrl?: string;
  sourceEventDetailUrlDisplayText?: string;
  notificationType: string;
  eventStatus?: string;
  aggregationEventType?: string;
  aggregateNotificationEventArn?: string;
  aggregationSummary?: AggregationSummary;
  startTime?: Date;
  endTime?: Date;
  textParts: { [key: string]: TextPartValue | undefined };
  media: MediaElement[];
  organizationalUnitId?: string;
}
export const NotificationEventSchema = S.suspend(() =>
  S.Struct({
    schemaVersion: S.String,
    id: S.String,
    sourceEventMetadata: SourceEventMetadata,
    messageComponents: MessageComponents,
    sourceEventDetailUrl: S.optional(S.String),
    sourceEventDetailUrlDisplayText: S.optional(S.String),
    notificationType: S.String,
    eventStatus: S.optional(S.String),
    aggregationEventType: S.optional(S.String),
    aggregateNotificationEventArn: S.optional(S.String),
    aggregationSummary: S.optional(AggregationSummary),
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    textParts: TextParts,
    media: Media,
    organizationalUnitId: S.optional(S.String),
  }),
).annotate({
  identifier: "NotificationEventSchema",
}) as any as S.Schema<NotificationEventSchema>;
export interface GetNotificationEventResponse {
  arn: string;
  notificationConfigurationArn: string;
  creationTime: Date;
  content: NotificationEventSchema;
}
export const GetNotificationEventResponse = S.suspend(() =>
  S.Struct({
    arn: S.String,
    notificationConfigurationArn: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    content: NotificationEventSchema,
  }),
).annotate({
  identifier: "GetNotificationEventResponse",
}) as any as S.Schema<GetNotificationEventResponse>;
export interface ListNotificationEventsRequest {
  startTime?: Date;
  endTime?: Date;
  locale?: string;
  source?: string;
  includeChildEvents?: boolean;
  aggregateNotificationEventArn?: string;
  maxResults?: number;
  nextToken?: string;
  organizationalUnitId?: string;
}
export const ListNotificationEventsRequest = S.suspend(() =>
  S.Struct({
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("startTime")),
    endTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("endTime")),
    locale: S.optional(S.String).pipe(T.HttpQuery("locale")),
    source: S.optional(S.String).pipe(T.HttpQuery("source")),
    includeChildEvents: S.optional(S.Boolean).pipe(
      T.HttpQuery("includeChildEvents"),
    ),
    aggregateNotificationEventArn: S.optional(S.String).pipe(
      T.HttpQuery("aggregateNotificationEventArn"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    organizationalUnitId: S.optional(S.String).pipe(
      T.HttpQuery("organizationalUnitId"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/notification-events" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListNotificationEventsRequest",
}) as any as S.Schema<ListNotificationEventsRequest>;
export interface SourceEventMetadataSummary {
  eventOriginRegion?: string;
  source: string;
  eventType: string;
}
export const SourceEventMetadataSummary = S.suspend(() =>
  S.Struct({
    eventOriginRegion: S.optional(S.String),
    source: S.String,
    eventType: S.String,
  }),
).annotate({
  identifier: "SourceEventMetadataSummary",
}) as any as S.Schema<SourceEventMetadataSummary>;
export interface NotificationEventSummary {
  schemaVersion: string;
  sourceEventMetadata: SourceEventMetadataSummary;
  messageComponents: MessageComponentsSummary;
  eventStatus: string;
  notificationType: string;
}
export const NotificationEventSummary = S.suspend(() =>
  S.Struct({
    schemaVersion: S.String,
    sourceEventMetadata: SourceEventMetadataSummary,
    messageComponents: MessageComponentsSummary,
    eventStatus: S.String,
    notificationType: S.String,
  }),
).annotate({
  identifier: "NotificationEventSummary",
}) as any as S.Schema<NotificationEventSummary>;
export interface NotificationEventOverview {
  arn: string;
  notificationConfigurationArn: string;
  relatedAccount: string;
  creationTime: Date;
  notificationEvent: NotificationEventSummary;
  aggregationEventType?: string;
  aggregateNotificationEventArn?: string;
  aggregationSummary?: AggregationSummary;
  organizationalUnitId?: string;
}
export const NotificationEventOverview = S.suspend(() =>
  S.Struct({
    arn: S.String,
    notificationConfigurationArn: S.String,
    relatedAccount: S.String,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    notificationEvent: NotificationEventSummary,
    aggregationEventType: S.optional(S.String),
    aggregateNotificationEventArn: S.optional(S.String),
    aggregationSummary: S.optional(AggregationSummary),
    organizationalUnitId: S.optional(S.String),
  }),
).annotate({
  identifier: "NotificationEventOverview",
}) as any as S.Schema<NotificationEventOverview>;
export type NotificationEvents = NotificationEventOverview[];
export const NotificationEvents = S.Array(NotificationEventOverview);
export interface ListNotificationEventsResponse {
  nextToken?: string;
  notificationEvents: NotificationEventOverview[];
}
export const ListNotificationEventsResponse = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    notificationEvents: NotificationEvents,
  }),
).annotate({
  identifier: "ListNotificationEventsResponse",
}) as any as S.Schema<ListNotificationEventsResponse>;
export interface RegisterNotificationHubRequest {
  notificationHubRegion: string;
}
export const RegisterNotificationHubRequest = S.suspend(() =>
  S.Struct({ notificationHubRegion: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/notification-hubs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterNotificationHubRequest",
}) as any as S.Schema<RegisterNotificationHubRequest>;
export interface NotificationHubStatusSummary {
  status: string;
  reason: string;
}
export const NotificationHubStatusSummary = S.suspend(() =>
  S.Struct({ status: S.String, reason: S.String }),
).annotate({
  identifier: "NotificationHubStatusSummary",
}) as any as S.Schema<NotificationHubStatusSummary>;
export interface RegisterNotificationHubResponse {
  notificationHubRegion: string;
  statusSummary: NotificationHubStatusSummary;
  creationTime: Date;
  lastActivationTime?: Date;
}
export const RegisterNotificationHubResponse = S.suspend(() =>
  S.Struct({
    notificationHubRegion: S.String,
    statusSummary: NotificationHubStatusSummary,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastActivationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "RegisterNotificationHubResponse",
}) as any as S.Schema<RegisterNotificationHubResponse>;
export interface DeregisterNotificationHubRequest {
  notificationHubRegion: string;
}
export const DeregisterNotificationHubRequest = S.suspend(() =>
  S.Struct({
    notificationHubRegion: S.String.pipe(T.HttpLabel("notificationHubRegion")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/notification-hubs/{notificationHubRegion}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeregisterNotificationHubRequest",
}) as any as S.Schema<DeregisterNotificationHubRequest>;
export interface DeregisterNotificationHubResponse {
  notificationHubRegion: string;
  statusSummary: NotificationHubStatusSummary;
}
export const DeregisterNotificationHubResponse = S.suspend(() =>
  S.Struct({
    notificationHubRegion: S.String,
    statusSummary: NotificationHubStatusSummary,
  }),
).annotate({
  identifier: "DeregisterNotificationHubResponse",
}) as any as S.Schema<DeregisterNotificationHubResponse>;
export interface ListNotificationHubsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListNotificationHubsRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/notification-hubs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListNotificationHubsRequest",
}) as any as S.Schema<ListNotificationHubsRequest>;
export interface NotificationHubOverview {
  notificationHubRegion: string;
  statusSummary: NotificationHubStatusSummary;
  creationTime: Date;
  lastActivationTime?: Date;
}
export const NotificationHubOverview = S.suspend(() =>
  S.Struct({
    notificationHubRegion: S.String,
    statusSummary: NotificationHubStatusSummary,
    creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastActivationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "NotificationHubOverview",
}) as any as S.Schema<NotificationHubOverview>;
export type NotificationHubs = NotificationHubOverview[];
export const NotificationHubs = S.Array(NotificationHubOverview);
export interface ListNotificationHubsResponse {
  notificationHubs: NotificationHubOverview[];
  nextToken?: string;
}
export const ListNotificationHubsResponse = S.suspend(() =>
  S.Struct({
    notificationHubs: NotificationHubs,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListNotificationHubsResponse",
}) as any as S.Schema<ListNotificationHubsResponse>;
export interface EnableNotificationsAccessForOrganizationRequest {}
export const EnableNotificationsAccessForOrganizationRequest = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/organization/access" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "EnableNotificationsAccessForOrganizationRequest",
}) as any as S.Schema<EnableNotificationsAccessForOrganizationRequest>;
export interface EnableNotificationsAccessForOrganizationResponse {}
export const EnableNotificationsAccessForOrganizationResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "EnableNotificationsAccessForOrganizationResponse",
}) as any as S.Schema<EnableNotificationsAccessForOrganizationResponse>;
export interface GetNotificationsAccessForOrganizationRequest {}
export const GetNotificationsAccessForOrganizationRequest = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/organization/access" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetNotificationsAccessForOrganizationRequest",
}) as any as S.Schema<GetNotificationsAccessForOrganizationRequest>;
export type AccessStatus =
  | "ENABLED"
  | "DISABLED"
  | "PENDING"
  | "FAILED"
  | (string & {});
export const AccessStatus = S.String;
export interface NotificationsAccessForOrganization {
  accessStatus: AccessStatus;
}
export const NotificationsAccessForOrganization = S.suspend(() =>
  S.Struct({ accessStatus: AccessStatus }),
).annotate({
  identifier: "NotificationsAccessForOrganization",
}) as any as S.Schema<NotificationsAccessForOrganization>;
export interface GetNotificationsAccessForOrganizationResponse {
  notificationsAccessForOrganization: NotificationsAccessForOrganization;
}
export const GetNotificationsAccessForOrganizationResponse = S.suspend(() =>
  S.Struct({
    notificationsAccessForOrganization: NotificationsAccessForOrganization,
  }),
).annotate({
  identifier: "GetNotificationsAccessForOrganizationResponse",
}) as any as S.Schema<GetNotificationsAccessForOrganizationResponse>;
export interface DisableNotificationsAccessForOrganizationRequest {}
export const DisableNotificationsAccessForOrganizationRequest = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/organization/access" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisableNotificationsAccessForOrganizationRequest",
}) as any as S.Schema<DisableNotificationsAccessForOrganizationRequest>;
export interface DisableNotificationsAccessForOrganizationResponse {}
export const DisableNotificationsAccessForOrganizationResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisableNotificationsAccessForOrganizationResponse",
}) as any as S.Schema<DisableNotificationsAccessForOrganizationResponse>;
export interface AssociateOrganizationalUnitRequest {
  organizationalUnitId: string;
  notificationConfigurationArn: string;
}
export const AssociateOrganizationalUnitRequest = S.suspend(() =>
  S.Struct({
    organizationalUnitId: S.String.pipe(T.HttpLabel("organizationalUnitId")),
    notificationConfigurationArn: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/organizational-units/associate/{organizationalUnitId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateOrganizationalUnitRequest",
}) as any as S.Schema<AssociateOrganizationalUnitRequest>;
export interface AssociateOrganizationalUnitResponse {}
export const AssociateOrganizationalUnitResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateOrganizationalUnitResponse",
}) as any as S.Schema<AssociateOrganizationalUnitResponse>;
export interface DisassociateOrganizationalUnitRequest {
  organizationalUnitId: string;
  notificationConfigurationArn: string;
}
export const DisassociateOrganizationalUnitRequest = S.suspend(() =>
  S.Struct({
    organizationalUnitId: S.String.pipe(T.HttpLabel("organizationalUnitId")),
    notificationConfigurationArn: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/organizational-units/disassociate/{organizationalUnitId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateOrganizationalUnitRequest",
}) as any as S.Schema<DisassociateOrganizationalUnitRequest>;
export interface DisassociateOrganizationalUnitResponse {}
export const DisassociateOrganizationalUnitResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateOrganizationalUnitResponse",
}) as any as S.Schema<DisassociateOrganizationalUnitResponse>;
export interface ListOrganizationalUnitsRequest {
  notificationConfigurationArn: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListOrganizationalUnitsRequest = S.suspend(() =>
  S.Struct({
    notificationConfigurationArn: S.String.pipe(
      T.HttpQuery("notificationConfigurationArn"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/organizational-units" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListOrganizationalUnitsRequest",
}) as any as S.Schema<ListOrganizationalUnitsRequest>;
export type OrganizationalUnits = string[];
export const OrganizationalUnits = S.Array(S.String);
export interface ListOrganizationalUnitsResponse {
  organizationalUnits: string[];
  nextToken?: string;
}
export const ListOrganizationalUnitsResponse = S.suspend(() =>
  S.Struct({
    organizationalUnits: OrganizationalUnits,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListOrganizationalUnitsResponse",
}) as any as S.Schema<ListOrganizationalUnitsResponse>;

//# Errors
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  { message: S.String },
).pipe(C.withAuthError) {}
export class InternalServerException extends S.TaggedErrorClass<InternalServerException>()(
  "InternalServerException",
  { message: S.String },
  T.Retryable(),
).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { message: S.String, resourceId: S.String },
).pipe(C.withBadRequestError) {}
export class ThrottlingException extends S.TaggedErrorClass<ThrottlingException>()(
  "ThrottlingException",
  {
    message: S.String,
    serviceCode: S.optional(S.String),
    quotaCode: S.optional(S.String),
    retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
  },
  T.Retryable({ throttling: true }),
).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  {
    message: S.String,
    reason: S.optional(S.String),
    fieldList: S.optional(ValidationExceptionFieldList),
  },
).pipe(C.withBadRequestError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  { message: S.String, resourceId: S.String },
).pipe(C.withConflictError) {}
export class ServiceQuotaExceededException extends S.TaggedErrorClass<ServiceQuotaExceededException>()(
  "ServiceQuotaExceededException",
  {
    message: S.String,
    resourceType: S.String,
    resourceId: S.optional(S.String),
    serviceCode: S.optional(S.String),
    quotaCode: S.optional(S.String),
  },
).pipe(C.withQuotaError) {}

//# Operations
/**
 * Returns a list of Account contacts and Channels associated with a `ManagedNotificationConfiguration`, in paginated format.
 */
export const listManagedNotificationChannelAssociations: {
  (
    input: ListManagedNotificationChannelAssociationsRequest,
  ): effect.Effect<
    ListManagedNotificationChannelAssociationsResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  pages: (
    input: ListManagedNotificationChannelAssociationsRequest,
  ) => stream.Stream<
    ListManagedNotificationChannelAssociationsResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListManagedNotificationChannelAssociationsRequest,
  ) => stream.Stream<
    ManagedNotificationChannelAssociationSummary,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListManagedNotificationChannelAssociationsRequest,
  output: ListManagedNotificationChannelAssociationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "channelAssociations",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Returns a list of member accounts associated with a notification configuration.
 */
export const listMemberAccounts: {
  (
    input: ListMemberAccountsRequest,
  ): effect.Effect<
    ListMemberAccountsResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  pages: (
    input: ListMemberAccountsRequest,
  ) => stream.Stream<
    ListMemberAccountsResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListMemberAccountsRequest,
  ) => stream.Stream<
    MemberAccount,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListMemberAccountsRequest,
  output: ListMemberAccountsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "memberAccounts",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Returns a list of tags for a specified Amazon Resource Name (ARN).
 *
 * For more information, see Tagging your Amazon Web Services resources in the *Tagging Amazon Web Services Resources User Guide*.
 *
 * This is only supported for `NotificationConfigurations`.
 */
export const listTagsForResource: (
  input: ListTagsForResourceRequest,
) => effect.Effect<
  ListTagsForResourceResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Tags the resource with a tag key and value.
 *
 * For more information, see Tagging your Amazon Web Services resources in the *Tagging Amazon Web Services Resources User Guide*.
 *
 * This is only supported for `NotificationConfigurations`.
 */
export const tagResource: (
  input: TagResourceRequest,
) => effect.Effect<
  TagResourceResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Untags a resource with a specified Amazon Resource Name (ARN).
 *
 * For more information, see Tagging your Amazon Web Services resources in the *Tagging Amazon Web Services Resources User Guide*.
 */
export const untagResource: (
  input: UntagResourceRequest,
) => effect.Effect<
  UntagResourceResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Associates a delivery Channel with a particular `NotificationConfiguration`. Supported Channels include Amazon Q Developer in chat applications, the Console Mobile Application, and emails (notifications-contacts).
 */
export const associateChannel: (
  input: AssociateChannelRequest,
) => effect.Effect<
  AssociateChannelResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AssociateChannelRequest,
  output: AssociateChannelResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Disassociates a Channel from a specified `NotificationConfiguration`. Supported Channels include Amazon Q Developer in chat applications, the Console Mobile Application, and emails (notifications-contacts).
 */
export const disassociateChannel: (
  input: DisassociateChannelRequest,
) => effect.Effect<
  DisassociateChannelResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociateChannelRequest,
  output: DisassociateChannelResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Returns a list of Channels for a `NotificationConfiguration`.
 */
export const listChannels: {
  (
    input: ListChannelsRequest,
  ): effect.Effect<
    ListChannelsResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  pages: (
    input: ListChannelsRequest,
  ) => stream.Stream<
    ListChannelsResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListChannelsRequest,
  ) => stream.Stream<
    ChannelArn,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListChannelsRequest,
  output: ListChannelsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "channels",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Creates an `EventRule` that is associated with a specified `NotificationConfiguration`.
 */
export const createEventRule: (
  input: CreateEventRuleRequest,
) => effect.Effect<
  CreateEventRuleResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateEventRuleRequest,
  output: CreateEventRuleResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates an existing `EventRule`.
 */
export const updateEventRule: (
  input: UpdateEventRuleRequest,
) => effect.Effect<
  UpdateEventRuleResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateEventRuleRequest,
  output: UpdateEventRuleResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Returns a specified `EventRule`.
 */
export const getEventRule: (
  input: GetEventRuleRequest,
) => effect.Effect<
  GetEventRuleResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetEventRuleRequest,
  output: GetEventRuleResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes an `EventRule`.
 */
export const deleteEventRule: (
  input: DeleteEventRuleRequest,
) => effect.Effect<
  DeleteEventRuleResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteEventRuleRequest,
  output: DeleteEventRuleResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Returns a list of `EventRules` according to specified filters, in reverse chronological order (newest first).
 */
export const listEventRules: {
  (
    input: ListEventRulesRequest,
  ): effect.Effect<
    ListEventRulesResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  pages: (
    input: ListEventRulesRequest,
  ) => stream.Stream<
    ListEventRulesResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListEventRulesRequest,
  ) => stream.Stream<
    EventRuleStructure,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListEventRulesRequest,
  output: ListEventRulesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "eventRules",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Associates an Account Contact with a particular `ManagedNotificationConfiguration`.
 */
export const associateManagedNotificationAccountContact: (
  input: AssociateManagedNotificationAccountContactRequest,
) => effect.Effect<
  AssociateManagedNotificationAccountContactResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AssociateManagedNotificationAccountContactRequest,
  output: AssociateManagedNotificationAccountContactResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Disassociates an Account Contact with a particular `ManagedNotificationConfiguration`.
 */
export const disassociateManagedNotificationAccountContact: (
  input: DisassociateManagedNotificationAccountContactRequest,
) => effect.Effect<
  DisassociateManagedNotificationAccountContactResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociateManagedNotificationAccountContactRequest,
  output: DisassociateManagedNotificationAccountContactResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Associates an additional Channel with a particular `ManagedNotificationConfiguration`.
 *
 * Supported Channels include Amazon Q Developer in chat applications, the Console Mobile Application, and emails (notifications-contacts).
 */
export const associateManagedNotificationAdditionalChannel: (
  input: AssociateManagedNotificationAdditionalChannelRequest,
) => effect.Effect<
  AssociateManagedNotificationAdditionalChannelResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AssociateManagedNotificationAdditionalChannelRequest,
  output: AssociateManagedNotificationAdditionalChannelResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Disassociates an additional Channel from a particular `ManagedNotificationConfiguration`.
 *
 * Supported Channels include Amazon Q Developer in chat applications, the Console Mobile Application, and emails (notifications-contacts).
 */
export const disassociateManagedNotificationAdditionalChannel: (
  input: DisassociateManagedNotificationAdditionalChannelRequest,
) => effect.Effect<
  DisassociateManagedNotificationAdditionalChannelResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociateManagedNotificationAdditionalChannelRequest,
  output: DisassociateManagedNotificationAdditionalChannelResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Returns the child event of a specific given `ManagedNotificationEvent`.
 */
export const getManagedNotificationChildEvent: (
  input: GetManagedNotificationChildEventRequest,
) => effect.Effect<
  GetManagedNotificationChildEventResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetManagedNotificationChildEventRequest,
  output: GetManagedNotificationChildEventResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Returns a list of `ManagedNotificationChildEvents` for a specified aggregate `ManagedNotificationEvent`, ordered by creation time in reverse chronological order (newest first).
 */
export const listManagedNotificationChildEvents: {
  (
    input: ListManagedNotificationChildEventsRequest,
  ): effect.Effect<
    ListManagedNotificationChildEventsResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  pages: (
    input: ListManagedNotificationChildEventsRequest,
  ) => stream.Stream<
    ListManagedNotificationChildEventsResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListManagedNotificationChildEventsRequest,
  ) => stream.Stream<
    ManagedNotificationChildEventOverview,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListManagedNotificationChildEventsRequest,
  output: ListManagedNotificationChildEventsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "managedNotificationChildEvents",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Returns a specified `ManagedNotificationConfiguration`.
 */
export const getManagedNotificationConfiguration: (
  input: GetManagedNotificationConfigurationRequest,
) => effect.Effect<
  GetManagedNotificationConfigurationResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetManagedNotificationConfigurationRequest,
  output: GetManagedNotificationConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Returns a list of Managed Notification Configurations according to specified filters, ordered by creation time in reverse chronological order (newest first).
 */
export const listManagedNotificationConfigurations: {
  (
    input: ListManagedNotificationConfigurationsRequest,
  ): effect.Effect<
    ListManagedNotificationConfigurationsResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  pages: (
    input: ListManagedNotificationConfigurationsRequest,
  ) => stream.Stream<
    ListManagedNotificationConfigurationsResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListManagedNotificationConfigurationsRequest,
  ) => stream.Stream<
    ManagedNotificationConfigurationStructure,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListManagedNotificationConfigurationsRequest,
  output: ListManagedNotificationConfigurationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "managedNotificationConfigurations",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Returns a specified `ManagedNotificationEvent`.
 */
export const getManagedNotificationEvent: (
  input: GetManagedNotificationEventRequest,
) => effect.Effect<
  GetManagedNotificationEventResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetManagedNotificationEventRequest,
  output: GetManagedNotificationEventResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Returns a list of Managed Notification Events according to specified filters, ordered by creation time in reverse chronological order (newest first).
 */
export const listManagedNotificationEvents: {
  (
    input: ListManagedNotificationEventsRequest,
  ): effect.Effect<
    ListManagedNotificationEventsResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  pages: (
    input: ListManagedNotificationEventsRequest,
  ) => stream.Stream<
    ListManagedNotificationEventsResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListManagedNotificationEventsRequest,
  ) => stream.Stream<
    ManagedNotificationEventOverview,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListManagedNotificationEventsRequest,
  output: ListManagedNotificationEventsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "managedNotificationEvents",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Creates a new `NotificationConfiguration`.
 */
export const createNotificationConfiguration: (
  input: CreateNotificationConfigurationRequest,
) => effect.Effect<
  CreateNotificationConfigurationResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateNotificationConfigurationRequest,
  output: CreateNotificationConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates a `NotificationConfiguration`.
 */
export const updateNotificationConfiguration: (
  input: UpdateNotificationConfigurationRequest,
) => effect.Effect<
  UpdateNotificationConfigurationResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateNotificationConfigurationRequest,
  output: UpdateNotificationConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Returns a specified `NotificationConfiguration`.
 */
export const getNotificationConfiguration: (
  input: GetNotificationConfigurationRequest,
) => effect.Effect<
  GetNotificationConfigurationResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetNotificationConfigurationRequest,
  output: GetNotificationConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes a `NotificationConfiguration`.
 */
export const deleteNotificationConfiguration: (
  input: DeleteNotificationConfigurationRequest,
) => effect.Effect<
  DeleteNotificationConfigurationResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteNotificationConfigurationRequest,
  output: DeleteNotificationConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Returns a list of abbreviated `NotificationConfigurations` according to specified filters, in reverse chronological order (newest first).
 */
export const listNotificationConfigurations: {
  (
    input: ListNotificationConfigurationsRequest,
  ): effect.Effect<
    ListNotificationConfigurationsResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  pages: (
    input: ListNotificationConfigurationsRequest,
  ) => stream.Stream<
    ListNotificationConfigurationsResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListNotificationConfigurationsRequest,
  ) => stream.Stream<
    NotificationConfigurationStructure,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListNotificationConfigurationsRequest,
  output: ListNotificationConfigurationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "notificationConfigurations",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Returns a specified `NotificationEvent`.
 *
 * User Notifications stores notifications in the individual Regions you register as notification hubs and the Region of the source event rule. `GetNotificationEvent` only returns notifications stored in the same Region in which the action is called. User Notifications doesn't backfill notifications to new Regions selected as notification hubs. For this reason, we recommend that you make calls in your oldest registered notification hub. For more information, see Notification hubs in the *Amazon Web Services User Notifications User Guide*.
 */
export const getNotificationEvent: (
  input: GetNotificationEventRequest,
) => effect.Effect<
  GetNotificationEventResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetNotificationEventRequest,
  output: GetNotificationEventResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Returns a list of `NotificationEvents` according to specified filters, in reverse chronological order (newest first).
 *
 * User Notifications stores notifications in the individual Regions you register as notification hubs and the Region of the source event rule. ListNotificationEvents only returns notifications stored in the same Region in which the action is called. User Notifications doesn't backfill notifications to new Regions selected as notification hubs. For this reason, we recommend that you make calls in your oldest registered notification hub. For more information, see Notification hubs in the *Amazon Web Services User Notifications User Guide*.
 */
export const listNotificationEvents: {
  (
    input: ListNotificationEventsRequest,
  ): effect.Effect<
    ListNotificationEventsResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  pages: (
    input: ListNotificationEventsRequest,
  ) => stream.Stream<
    ListNotificationEventsResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListNotificationEventsRequest,
  ) => stream.Stream<
    NotificationEventOverview,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListNotificationEventsRequest,
  output: ListNotificationEventsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "notificationEvents",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Registers a `NotificationConfiguration` in the specified Region.
 *
 * There is a maximum of one `NotificationConfiguration` per Region. You can have a maximum of 3 `NotificationHub` resources at a time.
 */
export const registerNotificationHub: (
  input: RegisterNotificationHubRequest,
) => effect.Effect<
  RegisterNotificationHubResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RegisterNotificationHubRequest,
  output: RegisterNotificationHubResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deregisters a `NotificationConfiguration` in the specified Region.
 *
 * You can't deregister the last `NotificationHub` in the account. `NotificationEvents` stored in the deregistered `NotificationConfiguration` are no longer be visible. Recreating a new `NotificationConfiguration` in the same Region restores access to those `NotificationEvents`.
 */
export const deregisterNotificationHub: (
  input: DeregisterNotificationHubRequest,
) => effect.Effect<
  DeregisterNotificationHubResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeregisterNotificationHubRequest,
  output: DeregisterNotificationHubResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Returns a list of `NotificationHubs`.
 */
export const listNotificationHubs: {
  (
    input: ListNotificationHubsRequest,
  ): effect.Effect<
    ListNotificationHubsResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  pages: (
    input: ListNotificationHubsRequest,
  ) => stream.Stream<
    ListNotificationHubsResponse,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListNotificationHubsRequest,
  ) => stream.Stream<
    NotificationHubOverview,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListNotificationHubsRequest,
  output: ListNotificationHubsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "notificationHubs",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Enables service trust between User Notifications and Amazon Web Services Organizations.
 */
export const enableNotificationsAccessForOrganization: (
  input: EnableNotificationsAccessForOrganizationRequest,
) => effect.Effect<
  EnableNotificationsAccessForOrganizationResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: EnableNotificationsAccessForOrganizationRequest,
  output: EnableNotificationsAccessForOrganizationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Returns the AccessStatus of Service Trust Enablement for User Notifications and Amazon Web Services Organizations.
 */
export const getNotificationsAccessForOrganization: (
  input: GetNotificationsAccessForOrganizationRequest,
) => effect.Effect<
  GetNotificationsAccessForOrganizationResponse,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetNotificationsAccessForOrganizationRequest,
  output: GetNotificationsAccessForOrganizationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Disables service trust between User Notifications and Amazon Web Services Organizations.
 */
export const disableNotificationsAccessForOrganization: (
  input: DisableNotificationsAccessForOrganizationRequest,
) => effect.Effect<
  DisableNotificationsAccessForOrganizationResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisableNotificationsAccessForOrganizationRequest,
  output: DisableNotificationsAccessForOrganizationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Associates an organizational unit with a notification configuration.
 */
export const associateOrganizationalUnit: (
  input: AssociateOrganizationalUnitRequest,
) => effect.Effect<
  AssociateOrganizationalUnitResponse,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AssociateOrganizationalUnitRequest,
  output: AssociateOrganizationalUnitResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Removes the association between an organizational unit and a notification configuration.
 */
export const disassociateOrganizationalUnit: (
  input: DisassociateOrganizationalUnitRequest,
) => effect.Effect<
  DisassociateOrganizationalUnitResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociateOrganizationalUnitRequest,
  output: DisassociateOrganizationalUnitResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Returns a list of organizational units associated with a notification configuration.
 */
export const listOrganizationalUnits: {
  (
    input: ListOrganizationalUnitsRequest,
  ): effect.Effect<
    ListOrganizationalUnitsResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  pages: (
    input: ListOrganizationalUnitsRequest,
  ) => stream.Stream<
    ListOrganizationalUnitsResponse,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListOrganizationalUnitsRequest,
  ) => stream.Stream<
    OrganizationalUnitId,
    | AccessDeniedException
    | InternalServerException
    | ResourceNotFoundException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListOrganizationalUnitsRequest,
  output: ListOrganizationalUnitsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "organizationalUnits",
    pageSize: "maxResults",
  } as const,
}));
