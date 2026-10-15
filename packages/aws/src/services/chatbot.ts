import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const ns = /*@__PURE__*/ T.XmlNamespace("http://wheatley.amazonaws.com/orchestration/2017-10-11/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "chatbot",
  serviceShapeName: "WheatleyOrchestration_20171011",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "chatbot" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-10-11");
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
              `https://chatbot-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://chatbot-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://chatbot.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://chatbot.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://chatbot.{R}.{D}","properties":{},"headers":{}}');

export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class CreateChimeWebhookConfigurationException
  extends /*@__PURE__*/ S.TaggedError<CreateChimeWebhookConfigurationException>()(
    "CreateChimeWebhookConfigurationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class CreateSlackChannelConfigurationException
  extends /*@__PURE__*/ S.TaggedError<CreateSlackChannelConfigurationException>()(
    "CreateSlackChannelConfigurationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class CreateTeamsChannelConfigurationException
  extends /*@__PURE__*/ S.TaggedError<CreateTeamsChannelConfigurationException>()(
    "CreateTeamsChannelConfigurationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class DeleteChimeWebhookConfigurationException
  extends /*@__PURE__*/ S.TaggedError<DeleteChimeWebhookConfigurationException>()(
    "DeleteChimeWebhookConfigurationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class DeleteMicrosoftTeamsUserIdentityException
  extends /*@__PURE__*/ S.TaggedError<DeleteMicrosoftTeamsUserIdentityException>()(
    "DeleteMicrosoftTeamsUserIdentityException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class DeleteSlackChannelConfigurationException
  extends /*@__PURE__*/ S.TaggedError<DeleteSlackChannelConfigurationException>()(
    "DeleteSlackChannelConfigurationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class DeleteSlackUserIdentityException
  extends /*@__PURE__*/ S.TaggedError<DeleteSlackUserIdentityException>()(
    "DeleteSlackUserIdentityException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class DeleteSlackWorkspaceAuthorizationFault
  extends /*@__PURE__*/ S.TaggedError<DeleteSlackWorkspaceAuthorizationFault>()(
    "DeleteSlackWorkspaceAuthorizationFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class DeleteTeamsChannelConfigurationException
  extends /*@__PURE__*/ S.TaggedError<DeleteTeamsChannelConfigurationException>()(
    "DeleteTeamsChannelConfigurationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class DeleteTeamsConfiguredTeamException
  extends /*@__PURE__*/ S.TaggedError<DeleteTeamsConfiguredTeamException>()(
    "DeleteTeamsConfiguredTeamException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class DescribeChimeWebhookConfigurationsException
  extends /*@__PURE__*/ S.TaggedError<DescribeChimeWebhookConfigurationsException>()(
    "DescribeChimeWebhookConfigurationsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class DescribeSlackChannelConfigurationsException
  extends /*@__PURE__*/ S.TaggedError<DescribeSlackChannelConfigurationsException>()(
    "DescribeSlackChannelConfigurationsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class DescribeSlackUserIdentitiesException
  extends /*@__PURE__*/ S.TaggedError<DescribeSlackUserIdentitiesException>()(
    "DescribeSlackUserIdentitiesException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class DescribeSlackWorkspacesException
  extends /*@__PURE__*/ S.TaggedError<DescribeSlackWorkspacesException>()(
    "DescribeSlackWorkspacesException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class GetAccountPreferencesException
  extends /*@__PURE__*/ S.TaggedError<GetAccountPreferencesException>()(
    "GetAccountPreferencesException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class GetTeamsChannelConfigurationException
  extends /*@__PURE__*/ S.TaggedError<GetTeamsChannelConfigurationException>()(
    "GetTeamsChannelConfigurationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InternalServiceError
  extends /*@__PURE__*/ S.TaggedError<InternalServiceError>()(
    "InternalServiceError",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ListMicrosoftTeamsConfiguredTeamsException
  extends /*@__PURE__*/ S.TaggedError<ListMicrosoftTeamsConfiguredTeamsException>()(
    "ListMicrosoftTeamsConfiguredTeamsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ListMicrosoftTeamsUserIdentitiesException
  extends /*@__PURE__*/ S.TaggedError<ListMicrosoftTeamsUserIdentitiesException>()(
    "ListMicrosoftTeamsUserIdentitiesException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ListTeamsChannelConfigurationsException
  extends /*@__PURE__*/ S.TaggedError<ListTeamsChannelConfigurationsException>()(
    "ListTeamsChannelConfigurationsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class MicrosoftTeamsTeamNotConfigured
  extends /*@__PURE__*/ S.TaggedError<MicrosoftTeamsTeamNotConfigured>()(
    "MicrosoftTeamsTeamNotConfigured",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidRequestException",
      message: { includes: "team id you are using is not configured" },
    }),
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
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError, C.withServerError) {}
export class SlackWorkspaceNotAuthorized
  extends /*@__PURE__*/ S.TaggedError<SlackWorkspaceNotAuthorized>()(
    "SlackWorkspaceNotAuthorized",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidRequestException",
      message: { includes: "is not authorized with AWS account" },
    }),
  ).pipe(C.withBadRequestError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class UpdateAccountPreferencesException
  extends /*@__PURE__*/ S.TaggedError<UpdateAccountPreferencesException>()(
    "UpdateAccountPreferencesException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class UpdateChimeWebhookConfigurationException
  extends /*@__PURE__*/ S.TaggedError<UpdateChimeWebhookConfigurationException>()(
    "UpdateChimeWebhookConfigurationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class UpdateSlackChannelConfigurationException
  extends /*@__PURE__*/ S.TaggedError<UpdateSlackChannelConfigurationException>()(
    "UpdateSlackChannelConfigurationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class UpdateTeamsChannelConfigurationException
  extends /*@__PURE__*/ S.TaggedError<UpdateTeamsChannelConfigurationException>()(
    "UpdateTeamsChannelConfigurationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export type ResourceIdentifier = string;
export type ChatConfigurationArn = string;
export interface AssociateToConfigurationRequest {
  Resource: string;
  ChatConfiguration: string;
}
export interface AssociateToConfigurationResult {}
export type ChimeWebhookDescription = string | redacted.Redacted<string>;
export type ChimeWebhookUrl = string | redacted.Redacted<string>;
export type Arn = string;
export type SnsTopicArnList = string[];
export type ConfigurationName = string;
export type CustomerCwLogLevel = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  TagKey: string;
  TagValue: string;
}
export type Tags = Tag[];
export interface CreateChimeWebhookConfigurationRequest {
  WebhookDescription: string | redacted.Redacted<string>;
  WebhookUrl: string | redacted.Redacted<string>;
  SnsTopicArns: string[];
  IamRoleArn: string;
  ConfigurationName: string;
  LoggingLevel?: string;
  Tags?: Tag[];
}
export type ResourceState = string;
export interface ChimeWebhookConfiguration {
  WebhookDescription: string | redacted.Redacted<string>;
  ChatConfigurationArn: string;
  IamRoleArn: string;
  SnsTopicArns: string[];
  ConfigurationName?: string;
  LoggingLevel?: string;
  Tags?: Tag[];
  State?: string;
  StateReason?: string;
}
export interface CreateChimeWebhookConfigurationResult {
  WebhookConfiguration?: ChimeWebhookConfiguration;
}
export interface CustomActionDefinition {
  CommandText: string;
}
export type CustomActionAliasName = string;
export type CustomActionAttachmentNotificationType = string;
export type CustomActionButtonText = string;
export type CustomActionAttachmentCriteriaOperator = "HAS_VALUE" | "EQUALS" | (string & {});
export interface CustomActionAttachmentCriteria {
  Operator: CustomActionAttachmentCriteriaOperator;
  VariableName: string;
  Value?: string;
}
export type CustomActionAttachmentCriteriaList = CustomActionAttachmentCriteria[];
export type CustomActionAttachmentVariables = { [key: string]: string | undefined };
export interface CustomActionAttachment {
  NotificationType: string;
  ButtonText?: string;
  Criteria?: CustomActionAttachmentCriteria[];
  Variables?: { [key: string]: string | undefined };
}
export type CustomActionAttachmentList = CustomActionAttachment[];
export type TagList = Tag[];
export type ClientToken = string;
export type CustomActionName = string;
export interface CreateCustomActionRequest {
  Definition: CustomActionDefinition;
  AliasName?: string;
  Attachments?: CustomActionAttachment[];
  Tags?: Tag[];
  ClientToken?: string;
  ActionName: string;
}
export type CustomActionArn = string;
export interface CreateCustomActionResult {
  CustomActionArn: string;
}
export type TeamsChannelId = string;
export type TeamsChannelName = string | redacted.Redacted<string>;
export type UUID = string;
export type TeamName = string | redacted.Redacted<string>;
export type GuardrailPolicyArn = string;
export type GuardrailPolicyArnList = string[];
export type BooleanAccountPreference = boolean;
export interface CreateTeamsChannelConfigurationRequest {
  ChannelId: string;
  ChannelName?: string | redacted.Redacted<string>;
  TeamId: string;
  TeamName?: string | redacted.Redacted<string>;
  TenantId: string;
  SnsTopicArns?: string[];
  IamRoleArn: string;
  ConfigurationName: string;
  LoggingLevel?: string;
  GuardrailPolicyArns?: string[];
  UserAuthorizationRequired?: boolean;
  Tags?: Tag[];
}
export interface TeamsChannelConfiguration {
  ChannelId: string;
  ChannelName?: string | redacted.Redacted<string>;
  TeamId: string;
  TeamName?: string | redacted.Redacted<string>;
  TenantId: string;
  ChatConfigurationArn: string;
  IamRoleArn: string;
  SnsTopicArns: string[];
  ConfigurationName?: string;
  LoggingLevel?: string;
  GuardrailPolicyArns?: string[];
  UserAuthorizationRequired?: boolean;
  Tags?: Tag[];
  State?: string;
  StateReason?: string;
}
export interface CreateTeamsChannelConfigurationResult {
  ChannelConfiguration?: TeamsChannelConfiguration;
}
export type SlackTeamId = string;
export type SlackChannelId = string;
export type SlackChannelDisplayName = string | redacted.Redacted<string>;
export interface CreateSlackChannelConfigurationRequest {
  SlackTeamId: string;
  SlackChannelId: string;
  SlackChannelName?: string | redacted.Redacted<string>;
  SnsTopicArns?: string[];
  IamRoleArn: string;
  ConfigurationName: string;
  LoggingLevel?: string;
  GuardrailPolicyArns?: string[];
  UserAuthorizationRequired?: boolean;
  Tags?: Tag[];
}
export type SlackTeamName = string;
export interface SlackChannelConfiguration {
  SlackTeamName: string;
  SlackTeamId: string;
  SlackChannelId: string;
  SlackChannelName: string | redacted.Redacted<string>;
  ChatConfigurationArn: string;
  IamRoleArn: string;
  SnsTopicArns: string[];
  ConfigurationName?: string;
  LoggingLevel?: string;
  GuardrailPolicyArns?: string[];
  UserAuthorizationRequired?: boolean;
  Tags?: Tag[];
  State?: string;
  StateReason?: string;
}
export interface CreateSlackChannelConfigurationResult {
  ChannelConfiguration?: SlackChannelConfiguration;
}
export interface DeleteChimeWebhookConfigurationRequest {
  ChatConfigurationArn: string;
}
export interface DeleteChimeWebhookConfigurationResult {}
export interface DeleteCustomActionRequest {
  CustomActionArn: string;
}
export interface DeleteCustomActionResult {}
export interface DeleteTeamsChannelConfigurationRequest {
  ChatConfigurationArn: string;
}
export interface DeleteTeamsChannelConfigurationResult {}
export interface DeleteTeamsConfiguredTeamRequest {
  TeamId: string;
}
export interface DeleteTeamsConfiguredTeamResult {}
export interface DeleteMicrosoftTeamsUserIdentityRequest {
  ChatConfigurationArn: string;
  UserId: string;
}
export interface DeleteMicrosoftTeamsUserIdentityResult {}
export interface DeleteSlackChannelConfigurationRequest {
  ChatConfigurationArn: string;
}
export interface DeleteSlackChannelConfigurationResult {}
export type SlackUserId = string;
export interface DeleteSlackUserIdentityRequest {
  ChatConfigurationArn: string;
  SlackTeamId: string;
  SlackUserId: string;
}
export interface DeleteSlackUserIdentityResult {}
export interface DeleteSlackWorkspaceAuthorizationRequest {
  SlackTeamId: string;
}
export interface DeleteSlackWorkspaceAuthorizationResult {}
export type MaxResults = number;
export type PaginationToken = string;
export interface DescribeChimeWebhookConfigurationsRequest {
  MaxResults?: number;
  NextToken?: string;
  ChatConfigurationArn?: string;
}
export type ChimeWebhookConfigurationList = ChimeWebhookConfiguration[];
export interface DescribeChimeWebhookConfigurationsResult {
  NextToken?: string;
  WebhookConfigurations?: ChimeWebhookConfiguration[];
}
export interface DescribeSlackChannelConfigurationsRequest {
  MaxResults?: number;
  NextToken?: string;
  ChatConfigurationArn?: string;
}
export type SlackChannelConfigurationList = SlackChannelConfiguration[];
export interface DescribeSlackChannelConfigurationsResult {
  NextToken?: string;
  SlackChannelConfigurations?: SlackChannelConfiguration[];
}
export interface DescribeSlackUserIdentitiesRequest {
  ChatConfigurationArn?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type AwsUserIdentity = string;
export interface SlackUserIdentity {
  IamRoleArn: string;
  ChatConfigurationArn: string;
  SlackTeamId: string;
  SlackUserId: string;
  AwsUserIdentity?: string;
}
export type SlackUserIdentitiesList = SlackUserIdentity[];
export interface DescribeSlackUserIdentitiesResult {
  SlackUserIdentities?: SlackUserIdentity[];
  NextToken?: string;
}
export interface DescribeSlackWorkspacesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface SlackWorkspace {
  SlackTeamId: string;
  SlackTeamName: string;
  State?: string;
  StateReason?: string;
}
export type SlackWorkspacesList = SlackWorkspace[];
export interface DescribeSlackWorkspacesResult {
  SlackWorkspaces?: SlackWorkspace[];
  NextToken?: string;
}
export interface DisassociateFromConfigurationRequest {
  Resource: string;
  ChatConfiguration: string;
}
export interface DisassociateFromConfigurationResult {}
export interface GetAccountPreferencesRequest {}
export interface AccountPreferences {
  UserAuthorizationRequired?: boolean;
  TrainingDataCollectionEnabled?: boolean;
}
export interface GetAccountPreferencesResult {
  AccountPreferences?: AccountPreferences;
}
export interface GetCustomActionRequest {
  CustomActionArn: string;
}
export interface CustomAction {
  CustomActionArn: string;
  Definition: CustomActionDefinition;
  AliasName?: string;
  Attachments?: CustomActionAttachment[];
  ActionName?: string;
}
export interface GetCustomActionResult {
  CustomAction?: CustomAction;
}
export interface GetTeamsChannelConfigurationRequest {
  ChatConfigurationArn: string;
}
export interface GetTeamsChannelConfigurationResult {
  ChannelConfiguration?: TeamsChannelConfiguration;
}
export interface ListAssociationsRequest {
  ChatConfiguration: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface AssociationListing {
  Resource: string;
}
export type AssociationList = AssociationListing[];
export interface ListAssociationsResult {
  Associations: AssociationListing[];
  NextToken?: string;
}
export interface ListCustomActionsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type CustomActionArnList = string[];
export interface ListCustomActionsResult {
  CustomActions: string[];
  NextToken?: string;
}
export interface ListTeamsChannelConfigurationsRequest {
  MaxResults?: number;
  NextToken?: string;
  TeamId?: string;
}
export type TeamChannelConfigurationsList = TeamsChannelConfiguration[];
export interface ListTeamsChannelConfigurationsResult {
  NextToken?: string;
  TeamChannelConfigurations?: TeamsChannelConfiguration[];
}
export interface ListMicrosoftTeamsConfiguredTeamsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface ConfiguredTeam {
  TenantId: string;
  TeamId: string;
  TeamName?: string;
  State?: string;
  StateReason?: string;
}
export type ConfiguredTeamsList = ConfiguredTeam[];
export interface ListMicrosoftTeamsConfiguredTeamsResult {
  ConfiguredTeams?: ConfiguredTeam[];
  NextToken?: string;
}
export interface ListMicrosoftTeamsUserIdentitiesRequest {
  ChatConfigurationArn?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface TeamsUserIdentity {
  IamRoleArn: string;
  ChatConfigurationArn: string;
  TeamId: string;
  UserId?: string;
  AwsUserIdentity?: string;
  TeamsChannelId?: string;
  TeamsTenantId?: string;
}
export type TeamsUserIdentitiesList = TeamsUserIdentity[];
export interface ListMicrosoftTeamsUserIdentitiesResult {
  TeamsUserIdentities?: TeamsUserIdentity[];
  NextToken?: string;
}
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAccountPreferencesRequest {
  UserAuthorizationRequired?: boolean;
  TrainingDataCollectionEnabled?: boolean;
}
export interface UpdateAccountPreferencesResult {
  AccountPreferences?: AccountPreferences;
}
export interface UpdateChimeWebhookConfigurationRequest {
  ChatConfigurationArn: string;
  WebhookDescription?: string | redacted.Redacted<string>;
  WebhookUrl?: string | redacted.Redacted<string>;
  SnsTopicArns?: string[];
  IamRoleArn?: string;
  LoggingLevel?: string;
}
export interface UpdateChimeWebhookConfigurationResult {
  WebhookConfiguration?: ChimeWebhookConfiguration;
}
export interface UpdateCustomActionRequest {
  CustomActionArn: string;
  Definition: CustomActionDefinition;
  AliasName?: string;
  Attachments?: CustomActionAttachment[];
}
export interface UpdateCustomActionResult {
  CustomActionArn: string;
}
export interface UpdateTeamsChannelConfigurationRequest {
  ChatConfigurationArn: string;
  ChannelId: string;
  ChannelName?: string | redacted.Redacted<string>;
  SnsTopicArns?: string[];
  IamRoleArn?: string;
  LoggingLevel?: string;
  GuardrailPolicyArns?: string[];
  UserAuthorizationRequired?: boolean;
}
export interface UpdateTeamsChannelConfigurationResult {
  ChannelConfiguration?: TeamsChannelConfiguration;
}
export interface UpdateSlackChannelConfigurationRequest {
  ChatConfigurationArn: string;
  SlackChannelId: string;
  SlackChannelName?: string | redacted.Redacted<string>;
  SnsTopicArns?: string[];
  IamRoleArn?: string;
  LoggingLevel?: string;
  GuardrailPolicyArns?: string[];
  UserAuthorizationRequired?: boolean;
}
export interface UpdateSlackChannelConfigurationResult {
  ChannelConfiguration?: SlackChannelConfiguration;
}
export type ErrorMessage = string;
export type AssociateToConfigurationError =
  | InternalServiceError
  | InvalidRequestException
  | UnauthorizedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Links a resource (for example, a custom action) to a channel configuration.
 */
export const associateToConfiguration: API.OperationMethod<
  AssociateToConfigurationRequest,
  AssociateToConfigurationResult,
  AssociateToConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<AssociateToConfigurationRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<AssociateToConfigurationResult>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    UnauthorizedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateToConfiguration",
}));

export type CreateChimeWebhookConfigurationError =
  | ConflictException
  | CreateChimeWebhookConfigurationException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates an AWS Chatbot configuration for Amazon Chime.
 */
export const createChimeWebhookConfiguration: API.OperationMethod<
  CreateChimeWebhookConfigurationRequest,
  CreateChimeWebhookConfigurationResult,
  CreateChimeWebhookConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c2, 0) as any as S.Schema<CreateChimeWebhookConfigurationRequest>,
  output: __S(48, __c6, 0) as any as S.Schema<CreateChimeWebhookConfigurationResult>,
  errors: [
    ConflictException,
    CreateChimeWebhookConfigurationException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChimeWebhookConfiguration",
}));

export type CreateCustomActionError =
  | ConflictException
  | InternalServiceError
  | InvalidRequestException
  | LimitExceededException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a custom action that can be invoked as an alias or as a button on a notification.
 */
export const createCustomAction: API.OperationMethod<
  CreateCustomActionRequest,
  CreateCustomActionResult,
  CreateCustomActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<CreateCustomActionRequest>,
  output: __S(72, __c9, 0) as any as S.Schema<CreateCustomActionResult>,
  errors: [
    ConflictException,
    InternalServiceError,
    InvalidRequestException,
    LimitExceededException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomAction",
}));

export type CreateMicrosoftTeamsChannelConfigurationError =
  | ConflictException
  | CreateTeamsChannelConfigurationException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | MicrosoftTeamsTeamNotConfigured
  | CommonErrors;
/**
 * Creates an AWS Chatbot configuration for Microsoft Teams.
 */
export const createMicrosoftTeamsChannelConfiguration: API.OperationMethod<
  CreateTeamsChannelConfigurationRequest,
  CreateTeamsChannelConfigurationResult,
  CreateMicrosoftTeamsChannelConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<CreateTeamsChannelConfigurationRequest>,
  output: __S(96, __c12, 0) as any as S.Schema<CreateTeamsChannelConfigurationResult>,
  errors: [
    ConflictException,
    CreateTeamsChannelConfigurationException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    MicrosoftTeamsTeamNotConfigured,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMicrosoftTeamsChannelConfiguration",
}));

export type CreateSlackChannelConfigurationError =
  | ConflictException
  | CreateSlackChannelConfigurationException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | SlackWorkspaceNotAuthorized
  | CommonErrors;
/**
 * Creates an AWS Chatbot confugration for Slack.
 */
export const createSlackChannelConfiguration: API.OperationMethod<
  CreateSlackChannelConfigurationRequest,
  CreateSlackChannelConfigurationResult,
  CreateSlackChannelConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<CreateSlackChannelConfigurationRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<CreateSlackChannelConfigurationResult>,
  errors: [
    ConflictException,
    CreateSlackChannelConfigurationException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    SlackWorkspaceNotAuthorized,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSlackChannelConfiguration",
}));

export type DeleteChimeWebhookConfigurationError =
  | DeleteChimeWebhookConfigurationException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a Amazon Chime webhook configuration for AWS Chatbot.
 */
export const deleteChimeWebhookConfiguration: API.OperationMethod<
  DeleteChimeWebhookConfigurationRequest,
  DeleteChimeWebhookConfigurationResult,
  DeleteChimeWebhookConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<DeleteChimeWebhookConfigurationRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteChimeWebhookConfigurationResult>,
  errors: [
    DeleteChimeWebhookConfigurationException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChimeWebhookConfiguration",
}));

export type DeleteCustomActionError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a custom action.
 */
export const deleteCustomAction: API.OperationMethod<
  DeleteCustomActionRequest,
  DeleteCustomActionResult,
  DeleteCustomActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<DeleteCustomActionRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteCustomActionResult>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomAction",
}));

export type DeleteMicrosoftTeamsChannelConfigurationError =
  | DeleteTeamsChannelConfigurationException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a Microsoft Teams channel configuration for AWS Chatbot
 */
export const deleteMicrosoftTeamsChannelConfiguration: API.OperationMethod<
  DeleteTeamsChannelConfigurationRequest,
  DeleteTeamsChannelConfigurationResult,
  DeleteMicrosoftTeamsChannelConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<DeleteTeamsChannelConfigurationRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteTeamsChannelConfigurationResult>,
  errors: [
    DeleteTeamsChannelConfigurationException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMicrosoftTeamsChannelConfiguration",
}));

export type DeleteMicrosoftTeamsConfiguredTeamError =
  | DeleteTeamsConfiguredTeamException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the Microsoft Teams team authorization allowing for channels to be configured in that Microsoft Teams team. Note that the Microsoft Teams team must have no channels configured to remove it.
 */
export const deleteMicrosoftTeamsConfiguredTeam: API.OperationMethod<
  DeleteTeamsConfiguredTeamRequest,
  DeleteTeamsConfiguredTeamResult,
  DeleteMicrosoftTeamsConfiguredTeamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<DeleteTeamsConfiguredTeamRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteTeamsConfiguredTeamResult>,
  errors: [
    DeleteTeamsConfiguredTeamException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMicrosoftTeamsConfiguredTeam",
}));

export type DeleteMicrosoftTeamsUserIdentityError =
  | DeleteMicrosoftTeamsUserIdentityException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Identifes a user level permission for a channel configuration.
 */
export const deleteMicrosoftTeamsUserIdentity: API.OperationMethod<
  DeleteMicrosoftTeamsUserIdentityRequest,
  DeleteMicrosoftTeamsUserIdentityResult,
  DeleteMicrosoftTeamsUserIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<DeleteMicrosoftTeamsUserIdentityRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteMicrosoftTeamsUserIdentityResult>,
  errors: [
    DeleteMicrosoftTeamsUserIdentityException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMicrosoftTeamsUserIdentity",
}));

export type DeleteSlackChannelConfigurationError =
  | DeleteSlackChannelConfigurationException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a Slack channel configuration for AWS Chatbot
 */
export const deleteSlackChannelConfiguration: API.OperationMethod<
  DeleteSlackChannelConfigurationRequest,
  DeleteSlackChannelConfigurationResult,
  DeleteSlackChannelConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<DeleteSlackChannelConfigurationRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteSlackChannelConfigurationResult>,
  errors: [
    DeleteSlackChannelConfigurationException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSlackChannelConfiguration",
}));

export type DeleteSlackUserIdentityError =
  | DeleteSlackUserIdentityException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a user level permission for a Slack channel configuration.
 */
export const deleteSlackUserIdentity: API.OperationMethod<
  DeleteSlackUserIdentityRequest,
  DeleteSlackUserIdentityResult,
  DeleteSlackUserIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<DeleteSlackUserIdentityRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteSlackUserIdentityResult>,
  errors: [DeleteSlackUserIdentityException, InvalidParameterException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSlackUserIdentity",
}));

export type DeleteSlackWorkspaceAuthorizationError =
  | DeleteSlackWorkspaceAuthorizationFault
  | InvalidParameterException
  | CommonErrors;
/**
 * Deletes the Slack workspace authorization that allows channels to be configured in that workspace. This requires all configured channels in the workspace to be deleted.
 */
export const deleteSlackWorkspaceAuthorization: API.OperationMethod<
  DeleteSlackWorkspaceAuthorizationRequest,
  DeleteSlackWorkspaceAuthorizationResult,
  DeleteSlackWorkspaceAuthorizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(184, __c23, 0) as any as S.Schema<DeleteSlackWorkspaceAuthorizationRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteSlackWorkspaceAuthorizationResult>,
  errors: [DeleteSlackWorkspaceAuthorizationFault, InvalidParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSlackWorkspaceAuthorization",
}));

export type DescribeChimeWebhookConfigurationsError =
  | DescribeChimeWebhookConfigurationsException
  | InvalidParameterException
  | InvalidRequestException
  | CommonErrors;
/**
 * Lists Amazon Chime webhook configurations optionally filtered by ChatConfigurationArn
 */
export const describeChimeWebhookConfigurations: API.PaginatedOperationMethod<
  DescribeChimeWebhookConfigurationsRequest,
  DescribeChimeWebhookConfigurationsResult,
  DescribeChimeWebhookConfigurationsError,
  Credentials | HttpClient.HttpClient,
  ChimeWebhookConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<DescribeChimeWebhookConfigurationsRequest>,
  output: __S(194, __c24, 2) as any as S.Schema<DescribeChimeWebhookConfigurationsResult>,
  errors: [
    DescribeChimeWebhookConfigurationsException,
    InvalidParameterException,
    InvalidRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeChimeWebhookConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WebhookConfigurations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeSlackChannelConfigurationsError =
  | DescribeSlackChannelConfigurationsException
  | InvalidParameterException
  | InvalidRequestException
  | CommonErrors;
/**
 * Lists Slack channel configurations optionally filtered by ChatConfigurationArn
 */
export const describeSlackChannelConfigurations: API.PaginatedOperationMethod<
  DescribeSlackChannelConfigurationsRequest,
  DescribeSlackChannelConfigurationsResult,
  DescribeSlackChannelConfigurationsError,
  Credentials | HttpClient.HttpClient,
  SlackChannelConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(200, __c25, 0) as any as S.Schema<DescribeSlackChannelConfigurationsRequest>,
  output: __S(202, __c25, 2) as any as S.Schema<DescribeSlackChannelConfigurationsResult>,
  errors: [
    DescribeSlackChannelConfigurationsException,
    InvalidParameterException,
    InvalidRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSlackChannelConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SlackChannelConfigurations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeSlackUserIdentitiesError =
  | DescribeSlackUserIdentitiesException
  | InvalidParameterException
  | InvalidRequestException
  | CommonErrors;
/**
 * Lists all Slack user identities with a mapped role.
 */
export const describeSlackUserIdentities: API.PaginatedOperationMethod<
  DescribeSlackUserIdentitiesRequest,
  DescribeSlackUserIdentitiesResult,
  DescribeSlackUserIdentitiesError,
  Credentials | HttpClient.HttpClient,
  SlackUserIdentity
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<DescribeSlackUserIdentitiesRequest>,
  output: __S(211, __c26, 3) as any as S.Schema<DescribeSlackUserIdentitiesResult>,
  errors: [
    DescribeSlackUserIdentitiesException,
    InvalidParameterException,
    InvalidRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSlackUserIdentities",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SlackUserIdentities",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeSlackWorkspacesError =
  | DescribeSlackWorkspacesException
  | InvalidParameterException
  | InvalidRequestException
  | CommonErrors;
/**
 * List all authorized Slack workspaces connected to the AWS Account onboarded with AWS Chatbot.
 */
export const describeSlackWorkspaces: API.PaginatedOperationMethod<
  DescribeSlackWorkspacesRequest,
  DescribeSlackWorkspacesResult,
  DescribeSlackWorkspacesError,
  Credentials | HttpClient.HttpClient,
  SlackWorkspace
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(216, __c27, 0) as any as S.Schema<DescribeSlackWorkspacesRequest>,
  output: __S(219, __c27, 3) as any as S.Schema<DescribeSlackWorkspacesResult>,
  errors: [DescribeSlackWorkspacesException, InvalidParameterException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSlackWorkspaces",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SlackWorkspaces",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DisassociateFromConfigurationError =
  | InternalServiceError
  | InvalidRequestException
  | UnauthorizedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Unlink a resource, for example a custom action, from a channel configuration.
 */
export const disassociateFromConfiguration: API.OperationMethod<
  DisassociateFromConfigurationRequest,
  DisassociateFromConfigurationResult,
  DisassociateFromConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c28, 0) as any as S.Schema<DisassociateFromConfigurationRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<DisassociateFromConfigurationResult>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    UnauthorizedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateFromConfiguration",
}));

export type GetAccountPreferencesError =
  | GetAccountPreferencesException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns AWS Chatbot account preferences.
 */
export const getAccountPreferences: API.OperationMethod<
  GetAccountPreferencesRequest,
  GetAccountPreferencesResult,
  GetAccountPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<GetAccountPreferencesRequest>,
  output: __S(241, __c30, 1) as any as S.Schema<GetAccountPreferencesResult>,
  errors: [GetAccountPreferencesException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountPreferences",
}));

export type GetCustomActionError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a custom action.
 */
export const getCustomAction: API.OperationMethod<
  GetCustomActionRequest,
  GetCustomActionResult,
  GetCustomActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(248, __c31, 0) as any as S.Schema<GetCustomActionRequest>,
  output: __S(250, __c31, 2) as any as S.Schema<GetCustomActionResult>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCustomAction",
}));

export type GetMicrosoftTeamsChannelConfigurationError =
  | GetTeamsChannelConfigurationException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a Microsoft Teams channel configuration in an AWS account.
 */
export const getMicrosoftTeamsChannelConfiguration: API.OperationMethod<
  GetTeamsChannelConfigurationRequest,
  GetTeamsChannelConfigurationResult,
  GetMicrosoftTeamsChannelConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c32, 0) as any as S.Schema<GetTeamsChannelConfigurationRequest>,
  output: __S(96, __c12, 0) as any as S.Schema<GetTeamsChannelConfigurationResult>,
  errors: [
    GetTeamsChannelConfigurationException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMicrosoftTeamsChannelConfiguration",
}));

export type ListAssociationsError = InvalidRequestException | CommonErrors;
/**
 * Lists resources associated with a channel configuration.
 */
export const listAssociations: API.PaginatedOperationMethod<
  ListAssociationsRequest,
  ListAssociationsResult,
  ListAssociationsError,
  Credentials | HttpClient.HttpClient,
  AssociationListing
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(264, __c33, 0) as any as S.Schema<ListAssociationsRequest>,
  output: __S(267, __c33, 3) as any as S.Schema<ListAssociationsResult>,
  errors: [InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Associations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCustomActionsError =
  | InternalServiceError
  | InvalidRequestException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists custom actions defined in this account.
 */
export const listCustomActions: API.PaginatedOperationMethod<
  ListCustomActionsRequest,
  ListCustomActionsResult,
  ListCustomActionsError,
  Credentials | HttpClient.HttpClient,
  CustomActionArn
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(272, __c34, 0) as any as S.Schema<ListCustomActionsRequest>,
  output: __S(273, __c34, 1) as any as S.Schema<ListCustomActionsResult>,
  errors: [InternalServiceError, InvalidRequestException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomActions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CustomActions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMicrosoftTeamsChannelConfigurationsError =
  | InvalidParameterException
  | InvalidRequestException
  | ListTeamsChannelConfigurationsException
  | CommonErrors;
/**
 * Lists all AWS Chatbot Microsoft Teams channel configurations in an AWS account.
 */
export const listMicrosoftTeamsChannelConfigurations: API.PaginatedOperationMethod<
  ListTeamsChannelConfigurationsRequest,
  ListTeamsChannelConfigurationsResult,
  ListMicrosoftTeamsChannelConfigurationsError,
  Credentials | HttpClient.HttpClient,
  TeamsChannelConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(280, __c35, 0) as any as S.Schema<ListTeamsChannelConfigurationsRequest>,
  output: __S(282, __c35, 2) as any as S.Schema<ListTeamsChannelConfigurationsResult>,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ListTeamsChannelConfigurationsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMicrosoftTeamsChannelConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TeamChannelConfigurations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMicrosoftTeamsConfiguredTeamsError =
  | InvalidParameterException
  | InvalidRequestException
  | ListMicrosoftTeamsConfiguredTeamsException
  | CommonErrors;
/**
 * Lists all authorized Microsoft Teams for an AWS Account
 */
export const listMicrosoftTeamsConfiguredTeams: API.PaginatedOperationMethod<
  ListMicrosoftTeamsConfiguredTeamsRequest,
  ListMicrosoftTeamsConfiguredTeamsResult,
  ListMicrosoftTeamsConfiguredTeamsError,
  Credentials | HttpClient.HttpClient,
  ConfiguredTeam
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(288, __c36, 0) as any as S.Schema<ListMicrosoftTeamsConfiguredTeamsRequest>,
  output: __S(291, __c36, 3) as any as S.Schema<ListMicrosoftTeamsConfiguredTeamsResult>,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ListMicrosoftTeamsConfiguredTeamsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMicrosoftTeamsConfiguredTeams",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConfiguredTeams",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMicrosoftTeamsUserIdentitiesError =
  | InvalidParameterException
  | InvalidRequestException
  | ListMicrosoftTeamsUserIdentitiesException
  | CommonErrors;
/**
 * A list all Microsoft Teams user identities with a mapped role.
 */
export const listMicrosoftTeamsUserIdentities: API.PaginatedOperationMethod<
  ListMicrosoftTeamsUserIdentitiesRequest,
  ListMicrosoftTeamsUserIdentitiesResult,
  ListMicrosoftTeamsUserIdentitiesError,
  Credentials | HttpClient.HttpClient,
  TeamsUserIdentity
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(296, __c37, 0) as any as S.Schema<ListMicrosoftTeamsUserIdentitiesRequest>,
  output: __S(299, __c37, 3) as any as S.Schema<ListMicrosoftTeamsUserIdentitiesResult>,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ListMicrosoftTeamsUserIdentitiesException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMicrosoftTeamsUserIdentities",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TeamsUserIdentities",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServiceError
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists all of the tags associated with the Amazon Resource Name (ARN) that you specify. The resource can be a user, server, or role.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c38, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(305, __c38, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [InternalServiceError, ResourceNotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type TagResourceError =
  | InternalServiceError
  | ResourceNotFoundException
  | ServiceUnavailableException
  | TooManyTagsException
  | CommonErrors;
/**
 * Attaches a key-value pair to a resource, as identified by its Amazon Resource Name (ARN). Resources are users, servers, roles, and other entities.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(312, __c39, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    InternalServiceError,
    ResourceNotFoundException,
    ServiceUnavailableException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServiceError
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Detaches a key-value pair from a resource, as identified by its Amazon Resource Name (ARN). Resources are users, servers, roles, and other entities.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c40, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(8, __c1, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [InternalServiceError, ResourceNotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAccountPreferencesError =
  | InvalidParameterException
  | InvalidRequestException
  | UpdateAccountPreferencesException
  | CommonErrors;
/**
 * Updates AWS Chatbot account preferences.
 */
export const updateAccountPreferences: API.OperationMethod<
  UpdateAccountPreferencesRequest,
  UpdateAccountPreferencesResult,
  UpdateAccountPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(328, __c41, 0) as any as S.Schema<UpdateAccountPreferencesRequest>,
  output: __S(241, __c30, 1) as any as S.Schema<UpdateAccountPreferencesResult>,
  errors: [InvalidParameterException, InvalidRequestException, UpdateAccountPreferencesException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountPreferences",
}));

export type UpdateChimeWebhookConfigurationError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | UpdateChimeWebhookConfigurationException
  | CommonErrors;
/**
 * Updates a Amazon Chime webhook configuration.
 */
export const updateChimeWebhookConfiguration: API.OperationMethod<
  UpdateChimeWebhookConfigurationRequest,
  UpdateChimeWebhookConfigurationResult,
  UpdateChimeWebhookConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c42, 0) as any as S.Schema<UpdateChimeWebhookConfigurationRequest>,
  output: __S(48, __c6, 0) as any as S.Schema<UpdateChimeWebhookConfigurationResult>,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    UpdateChimeWebhookConfigurationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateChimeWebhookConfiguration",
}));

export type UpdateCustomActionError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a custom action.
 */
export const updateCustomAction: API.OperationMethod<
  UpdateCustomActionRequest,
  UpdateCustomActionResult,
  UpdateCustomActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(344, __c43, 0) as any as S.Schema<UpdateCustomActionRequest>,
  output: __S(72, __c9, 0) as any as S.Schema<UpdateCustomActionResult>,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCustomAction",
}));

export type UpdateMicrosoftTeamsChannelConfigurationError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | UpdateTeamsChannelConfigurationException
  | CommonErrors;
/**
 * Updates an Microsoft Teams channel configuration.
 */
export const updateMicrosoftTeamsChannelConfiguration: API.OperationMethod<
  UpdateTeamsChannelConfigurationRequest,
  UpdateTeamsChannelConfigurationResult,
  UpdateMicrosoftTeamsChannelConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c44, 0) as any as S.Schema<UpdateTeamsChannelConfigurationRequest>,
  output: __S(96, __c12, 0) as any as S.Schema<UpdateTeamsChannelConfigurationResult>,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    UpdateTeamsChannelConfigurationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMicrosoftTeamsChannelConfiguration",
}));

export type UpdateSlackChannelConfigurationError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | UpdateSlackChannelConfigurationException
  | CommonErrors;
/**
 * Updates a Slack channel configuration.
 */
export const updateSlackChannelConfiguration: API.OperationMethod<
  UpdateSlackChannelConfigurationRequest,
  UpdateSlackChannelConfigurationResult,
  UpdateSlackChannelConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(360, __c45, 0) as any as S.Schema<UpdateSlackChannelConfigurationRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<UpdateSlackChannelConfigurationResult>,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    UpdateSlackChannelConfigurationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSlackChannelConfiguration",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Resource: S.String, ChatConfiguration: S.String }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/associate-to-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateToConfigurationRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "AssociateToConfigurationResult",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WebhookDescription: SensitiveString,
          WebhookUrl: SensitiveString,
          SnsTopicArns: __S(32, __c4, 0),
          IamRoleArn: S.String,
          ConfigurationName: S.String,
          LoggingLevel: S.optional(S.String),
          Tags: S.optional(__S(25, __c3, 1)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/create-chime-webhook-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateChimeWebhookConfigurationRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ TagKey: S.String, TagValue: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(24, __c3, 0));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WebhookDescription: SensitiveString,
          ChatConfigurationArn: S.String,
          IamRoleArn: S.String,
          SnsTopicArns: __S(32, __c4, 0),
          ConfigurationName: S.optional(S.String),
          LoggingLevel: S.optional(S.String),
          Tags: S.optional(__S(25, __c3, 1)),
          State: S.optional(S.String),
          StateReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "ChimeWebhookConfiguration" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ WebhookConfiguration: S.optional(__S(40, __c5, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateChimeWebhookConfigurationResult" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Definition: __S(64, __c8, 0),
          AliasName: S.optional(S.String),
          Attachments: S.optional(__S(69, __c8, 5)),
          Tags: S.optional(__S(25, __c3, 1)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          ActionName: S.String,
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/create-custom-action" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCustomActionRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ CommandText: S.String })).annotate({
        identifier: "CustomActionDefinition",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ Operator: S.String, VariableName: S.String, Value: S.optional(S.String) }),
      ).annotate({ identifier: "CustomActionAttachmentCriteria" });
    case 2:
      return S.Array(__S(65, __c8, 1));
    case 3:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 4:
      return S.suspend(() =>
        S.Struct({
          NotificationType: S.String,
          ButtonText: S.optional(S.String),
          Criteria: S.optional(__S(66, __c8, 2)),
          Variables: S.optional(__S(67, __c8, 3)),
        }),
      ).annotate({ identifier: "CustomActionAttachment" });
    case 5:
      return S.Array(__S(68, __c8, 4));
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ CustomActionArn: S.String }).pipe(ns)).annotate({
        identifier: "CreateCustomActionResult",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelId: S.String,
          ChannelName: S.optional(SensitiveString),
          TeamId: S.String,
          TeamName: S.optional(SensitiveString),
          TenantId: S.String,
          SnsTopicArns: S.optional(__S(32, __c4, 0)),
          IamRoleArn: S.String,
          ConfigurationName: S.String,
          LoggingLevel: S.optional(S.String),
          GuardrailPolicyArns: S.optional(__S(32, __c4, 0)),
          UserAuthorizationRequired: S.optional(S.Boolean),
          Tags: S.optional(__S(25, __c3, 1)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/create-ms-teams-channel-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateTeamsChannelConfigurationRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelId: S.String,
          ChannelName: S.optional(SensitiveString),
          TeamId: S.String,
          TeamName: S.optional(SensitiveString),
          TenantId: S.String,
          ChatConfigurationArn: S.String,
          IamRoleArn: S.String,
          SnsTopicArns: __S(32, __c4, 0),
          ConfigurationName: S.optional(S.String),
          LoggingLevel: S.optional(S.String),
          GuardrailPolicyArns: S.optional(__S(32, __c4, 0)),
          UserAuthorizationRequired: S.optional(S.Boolean),
          Tags: S.optional(__S(25, __c3, 1)),
          State: S.optional(S.String),
          StateReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "TeamsChannelConfiguration" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChannelConfiguration: S.optional(__S(88, __c11, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateTeamsChannelConfigurationResult" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SlackTeamId: S.String,
          SlackChannelId: S.String,
          SlackChannelName: S.optional(SensitiveString),
          SnsTopicArns: S.optional(__S(32, __c4, 0)),
          IamRoleArn: S.String,
          ConfigurationName: S.String,
          LoggingLevel: S.optional(S.String),
          GuardrailPolicyArns: S.optional(__S(32, __c4, 0)),
          UserAuthorizationRequired: S.optional(S.Boolean),
          Tags: S.optional(__S(25, __c3, 1)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/create-slack-channel-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSlackChannelConfigurationRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SlackTeamName: S.String,
          SlackTeamId: S.String,
          SlackChannelId: S.String,
          SlackChannelName: SensitiveString,
          ChatConfigurationArn: S.String,
          IamRoleArn: S.String,
          SnsTopicArns: __S(32, __c4, 0),
          ConfigurationName: S.optional(S.String),
          LoggingLevel: S.optional(S.String),
          GuardrailPolicyArns: S.optional(__S(32, __c4, 0)),
          UserAuthorizationRequired: S.optional(S.Boolean),
          Tags: S.optional(__S(25, __c3, 1)),
          State: S.optional(S.String),
          StateReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "SlackChannelConfiguration" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChannelConfiguration: S.optional(__S(112, __c14, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateSlackChannelConfigurationResult" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChatConfigurationArn: S.String }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/delete-chime-webhook-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteChimeWebhookConfigurationRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CustomActionArn: S.String }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/delete-custom-action" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCustomActionRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChatConfigurationArn: S.String }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/delete-ms-teams-channel-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTeamsChannelConfigurationRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TeamId: S.String }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/delete-ms-teams-configured-teams" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTeamsConfiguredTeamRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChatConfigurationArn: S.String, UserId: S.String }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/delete-ms-teams-user-identity" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMicrosoftTeamsUserIdentityRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChatConfigurationArn: S.String }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/delete-slack-channel-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSlackChannelConfigurationRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChatConfigurationArn: S.String,
          SlackTeamId: S.String,
          SlackUserId: S.String,
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/delete-slack-user-identity" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSlackUserIdentityRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SlackTeamId: S.String }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/delete-slack-workspace-authorization" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSlackWorkspaceAuthorizationRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          ChatConfigurationArn: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/describe-chime-webhook-configurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeChimeWebhookConfigurationsRequest" });
    case 1:
      return S.Array(__S(40, __c5, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          WebhookConfigurations: S.optional(__S(193, __c24, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeChimeWebhookConfigurationsResult" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          ChatConfigurationArn: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/describe-slack-channel-configurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeSlackChannelConfigurationsRequest" });
    case 1:
      return S.Array(__S(112, __c14, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          SlackChannelConfigurations: S.optional(__S(201, __c25, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeSlackChannelConfigurationsResult" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChatConfigurationArn: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/describe-slack-user-identities" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeSlackUserIdentitiesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IamRoleArn: S.String,
          ChatConfigurationArn: S.String,
          SlackTeamId: S.String,
          SlackUserId: S.String,
          AwsUserIdentity: S.optional(S.String),
        }),
      ).annotate({ identifier: "SlackUserIdentity" });
    case 2:
      return S.Array(__S(209, __c26, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          SlackUserIdentities: S.optional(__S(210, __c26, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeSlackUserIdentitiesResult" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/describe-slack-workspaces" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeSlackWorkspacesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SlackTeamId: S.String,
          SlackTeamName: S.String,
          State: S.optional(S.String),
          StateReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "SlackWorkspace" });
    case 2:
      return S.Array(__S(217, __c27, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          SlackWorkspaces: S.optional(__S(218, __c27, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeSlackWorkspacesResult" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Resource: S.String, ChatConfiguration: S.String }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/disassociate-from-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateFromConfigurationRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/get-account-preferences" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAccountPreferencesRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserAuthorizationRequired: S.optional(S.Boolean),
          TrainingDataCollectionEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AccountPreferences" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AccountPreferences: S.optional(__S(240, __c30, 0)) }).pipe(ns),
      ).annotate({ identifier: "GetAccountPreferencesResult" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CustomActionArn: S.String }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/get-custom-action" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCustomActionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CustomActionArn: S.String,
          Definition: __S(64, __c8, 0),
          AliasName: S.optional(S.String),
          Attachments: S.optional(__S(69, __c8, 5)),
          ActionName: S.optional(S.String),
        }),
      ).annotate({ identifier: "CustomAction" });
    case 2:
      return S.suspend(() =>
        S.Struct({ CustomAction: S.optional(__S(249, __c31, 1)) }).pipe(ns),
      ).annotate({ identifier: "GetCustomActionResult" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChatConfigurationArn: S.String }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/get-ms-teams-channel-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTeamsChannelConfigurationRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChatConfiguration: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/list-associations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAssociationsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Resource: S.String })).annotate({
        identifier: "AssociationListing",
      });
    case 2:
      return S.Array(__S(265, __c33, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Associations: __S(266, __c33, 2), NextToken: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "ListAssociationsResult" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/list-custom-actions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCustomActionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ CustomActions: __S(32, __c4, 0), NextToken: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "ListCustomActionsResult" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          TeamId: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/list-ms-teams-channel-configurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTeamsChannelConfigurationsRequest" });
    case 1:
      return S.Array(__S(88, __c11, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          TeamChannelConfigurations: S.optional(__S(281, __c35, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "ListTeamsChannelConfigurationsResult" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/list-ms-teams-configured-teams" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMicrosoftTeamsConfiguredTeamsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TenantId: S.String,
          TeamId: S.String,
          TeamName: S.optional(S.String),
          State: S.optional(S.String),
          StateReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConfiguredTeam" });
    case 2:
      return S.Array(__S(289, __c36, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ConfiguredTeams: S.optional(__S(290, __c36, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListMicrosoftTeamsConfiguredTeamsResult" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChatConfigurationArn: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/list-ms-teams-user-identities" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMicrosoftTeamsUserIdentitiesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IamRoleArn: S.String,
          ChatConfigurationArn: S.String,
          TeamId: S.String,
          UserId: S.optional(S.String),
          AwsUserIdentity: S.optional(S.String),
          TeamsChannelId: S.optional(S.String),
          TeamsTenantId: S.optional(S.String),
        }),
      ).annotate({ identifier: "TeamsUserIdentity" });
    case 2:
      return S.Array(__S(297, __c37, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          TeamsUserIdentities: S.optional(__S(298, __c37, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListMicrosoftTeamsUserIdentitiesResult" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/list-tags-for-resource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(25, __c3, 1)) }).pipe(ns)).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, Tags: __S(25, __c3, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/tag-resource" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, TagKeys: __S(32, __c4, 0) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/untag-resource" }),
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
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserAuthorizationRequired: S.optional(S.Boolean),
          TrainingDataCollectionEnabled: S.optional(S.Boolean),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/update-account-preferences" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAccountPreferencesRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChatConfigurationArn: S.String,
          WebhookDescription: S.optional(SensitiveString),
          WebhookUrl: S.optional(SensitiveString),
          SnsTopicArns: S.optional(__S(32, __c4, 0)),
          IamRoleArn: S.optional(S.String),
          LoggingLevel: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/update-chime-webhook-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateChimeWebhookConfigurationRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CustomActionArn: S.String,
          Definition: __S(64, __c8, 0),
          AliasName: S.optional(S.String),
          Attachments: S.optional(__S(69, __c8, 5)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/update-custom-action" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCustomActionRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChatConfigurationArn: S.String,
          ChannelId: S.String,
          ChannelName: S.optional(SensitiveString),
          SnsTopicArns: S.optional(__S(32, __c4, 0)),
          IamRoleArn: S.optional(S.String),
          LoggingLevel: S.optional(S.String),
          GuardrailPolicyArns: S.optional(__S(32, __c4, 0)),
          UserAuthorizationRequired: S.optional(S.Boolean),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/update-ms-teams-channel-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateTeamsChannelConfigurationRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChatConfigurationArn: S.String,
          SlackChannelId: S.String,
          SlackChannelName: S.optional(SensitiveString),
          SnsTopicArns: S.optional(__S(32, __c4, 0)),
          IamRoleArn: S.optional(S.String),
          LoggingLevel: S.optional(S.String),
          GuardrailPolicyArns: S.optional(__S(32, __c4, 0)),
          UserAuthorizationRequired: S.optional(S.Boolean),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/update-slack-channel-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSlackChannelConfigurationRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
