import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "chatbot",
  target: "WheatleyOrchestration_20171011",
  version: "2017-10-11",
  sigv4: "chatbot",
  protocol: restJson1Protocol,
  xmlns: "http://wheatley.amazonaws.com/orchestration/2017-10-11/",
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
                `https://chatbot-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://chatbot-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://chatbot.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://chatbot.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class CreateChimeWebhookConfigurationException
  extends /*@__PURE__*/ TE.TaggedError(
    "CreateChimeWebhookConfigurationException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class CreateSlackChannelConfigurationException
  extends /*@__PURE__*/ TE.TaggedError(
    "CreateSlackChannelConfigurationException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class CreateTeamsChannelConfigurationException
  extends /*@__PURE__*/ TE.TaggedError(
    "CreateTeamsChannelConfigurationException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class DeleteChimeWebhookConfigurationException
  extends /*@__PURE__*/ TE.TaggedError(
    "DeleteChimeWebhookConfigurationException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class DeleteMicrosoftTeamsUserIdentityException
  extends /*@__PURE__*/ TE.TaggedError(
    "DeleteMicrosoftTeamsUserIdentityException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class DeleteSlackChannelConfigurationException
  extends /*@__PURE__*/ TE.TaggedError(
    "DeleteSlackChannelConfigurationException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class DeleteSlackUserIdentityException
  extends /*@__PURE__*/ TE.TaggedError(
    "DeleteSlackUserIdentityException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class DeleteSlackWorkspaceAuthorizationFault
  extends /*@__PURE__*/ TE.TaggedError(
    "DeleteSlackWorkspaceAuthorizationFault",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class DeleteTeamsChannelConfigurationException
  extends /*@__PURE__*/ TE.TaggedError(
    "DeleteTeamsChannelConfigurationException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class DeleteTeamsConfiguredTeamException
  extends /*@__PURE__*/ TE.TaggedError(
    "DeleteTeamsConfiguredTeamException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class DescribeChimeWebhookConfigurationsException
  extends /*@__PURE__*/ TE.TaggedError(
    "DescribeChimeWebhookConfigurationsException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class DescribeSlackChannelConfigurationsException
  extends /*@__PURE__*/ TE.TaggedError(
    "DescribeSlackChannelConfigurationsException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class DescribeSlackUserIdentitiesException
  extends /*@__PURE__*/ TE.TaggedError(
    "DescribeSlackUserIdentitiesException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class DescribeSlackWorkspacesException
  extends /*@__PURE__*/ TE.TaggedError(
    "DescribeSlackWorkspacesException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class GetAccountPreferencesException
  extends /*@__PURE__*/ TE.TaggedError(
    "GetAccountPreferencesException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class GetTeamsChannelConfigurationException
  extends /*@__PURE__*/ TE.TaggedError(
    "GetTeamsChannelConfigurationException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InternalServiceError
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServiceError",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["AuthError"],
    { status: 403 },
  )<{ readonly message?: string }> {}
export class ListMicrosoftTeamsConfiguredTeamsException
  extends /*@__PURE__*/ TE.TaggedError(
    "ListMicrosoftTeamsConfiguredTeamsException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ListMicrosoftTeamsUserIdentitiesException
  extends /*@__PURE__*/ TE.TaggedError(
    "ListMicrosoftTeamsUserIdentitiesException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ListTeamsChannelConfigurationsException
  extends /*@__PURE__*/ TE.TaggedError(
    "ListTeamsChannelConfigurationsException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class MicrosoftTeamsTeamNotConfigured
  extends /*@__PURE__*/ TE.TaggedError(
    "MicrosoftTeamsTeamNotConfigured",
    ["BadRequestError"],
    {
      synthetic: {
        from: "InvalidRequestException",
        message: { includes: "team id you are using is not configured" },
      },
    },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ThrottlingError", "ServerError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class SlackWorkspaceNotAuthorized
  extends /*@__PURE__*/ TE.TaggedError(
    "SlackWorkspaceNotAuthorized",
    ["BadRequestError"],
    {
      synthetic: {
        from: "InvalidRequestException",
        message: { includes: "is not authorized with AWS account" },
      },
    },
  )<{ readonly message?: string }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class UnauthorizedException
  extends /*@__PURE__*/ TE.TaggedError("UnauthorizedException", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string }> {}
export class UpdateAccountPreferencesException
  extends /*@__PURE__*/ TE.TaggedError(
    "UpdateAccountPreferencesException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class UpdateChimeWebhookConfigurationException
  extends /*@__PURE__*/ TE.TaggedError(
    "UpdateChimeWebhookConfigurationException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class UpdateSlackChannelConfigurationException
  extends /*@__PURE__*/ TE.TaggedError(
    "UpdateSlackChannelConfigurationException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class UpdateTeamsChannelConfigurationException
  extends /*@__PURE__*/ TE.TaggedError(
    "UpdateTeamsChannelConfigurationException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
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
export type CustomActionAttachmentCriteriaOperator =
  | "HAS_VALUE"
  | "EQUALS"
  | (string & {});
export interface CustomActionAttachmentCriteria {
  Operator: CustomActionAttachmentCriteriaOperator;
  VariableName: string;
  Value?: string;
}
export type CustomActionAttachmentCriteriaList =
  CustomActionAttachmentCriteria[];
export type CustomActionAttachmentVariables = {
  [key: string]: string | undefined;
};
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
  descriptor: {
    service: svc,
    http: "POST /associate-to-configuration",
    input: { Resource: 0, ChatConfiguration: 0 },
    body: true,
  },
  errors: [
    InternalServiceError,
    InvalidRequestException,
    UnauthorizedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateToConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /create-chime-webhook-configuration",
    input: {
      WebhookDescription: 0,
      WebhookUrl: 0,
      SnsTopicArns: 0,
      IamRoleArn: 0,
      ConfigurationName: 0,
      LoggingLevel: 0,
      Tags: D.list(i_Tag),
    },
    output: { WebhookConfiguration: o_ChimeWebhookConfiguration },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /create-custom-action",
    input: {
      Definition: i_CustomActionDefinition,
      AliasName: 0,
      Attachments: D.list(i_CustomActionAttachment),
      Tags: D.list(i_Tag),
      ClientToken: D.m({ idempotency: true }),
      ActionName: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /create-ms-teams-channel-configuration",
    input: {
      ChannelId: 0,
      ChannelName: 0,
      TeamId: 0,
      TeamName: 0,
      TenantId: 0,
      SnsTopicArns: 0,
      IamRoleArn: 0,
      ConfigurationName: 0,
      LoggingLevel: 0,
      GuardrailPolicyArns: 0,
      UserAuthorizationRequired: 0,
      Tags: D.list(i_Tag),
    },
    output: { ChannelConfiguration: o_TeamsChannelConfiguration },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /create-slack-channel-configuration",
    input: {
      SlackTeamId: 0,
      SlackChannelId: 0,
      SlackChannelName: 0,
      SnsTopicArns: 0,
      IamRoleArn: 0,
      ConfigurationName: 0,
      LoggingLevel: 0,
      GuardrailPolicyArns: 0,
      UserAuthorizationRequired: 0,
      Tags: D.list(i_Tag),
    },
    output: { ChannelConfiguration: o_SlackChannelConfiguration },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /delete-chime-webhook-configuration",
    input: { ChatConfigurationArn: 0 },
    body: true,
  },
  errors: [
    DeleteChimeWebhookConfigurationException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChimeWebhookConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /delete-custom-action",
    input: { CustomActionArn: 0 },
    body: true,
  },
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomAction",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /delete-ms-teams-channel-configuration",
    input: { ChatConfigurationArn: 0 },
    body: true,
  },
  errors: [
    DeleteTeamsChannelConfigurationException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMicrosoftTeamsChannelConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /delete-ms-teams-configured-teams",
    input: { TeamId: 0 },
    body: true,
  },
  errors: [
    DeleteTeamsConfiguredTeamException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMicrosoftTeamsConfiguredTeam",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /delete-ms-teams-user-identity",
    input: { ChatConfigurationArn: 0, UserId: 0 },
    body: true,
  },
  errors: [
    DeleteMicrosoftTeamsUserIdentityException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMicrosoftTeamsUserIdentity",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /delete-slack-channel-configuration",
    input: { ChatConfigurationArn: 0 },
    body: true,
  },
  errors: [
    DeleteSlackChannelConfigurationException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSlackChannelConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /delete-slack-user-identity",
    input: { ChatConfigurationArn: 0, SlackTeamId: 0, SlackUserId: 0 },
    body: true,
  },
  errors: [
    DeleteSlackUserIdentityException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSlackUserIdentity",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /delete-slack-workspace-authorization",
    input: { SlackTeamId: 0 },
    body: true,
  },
  errors: [DeleteSlackWorkspaceAuthorizationFault, InvalidParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSlackWorkspaceAuthorization",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /describe-chime-webhook-configurations",
    input: { MaxResults: 0, NextToken: 0, ChatConfigurationArn: 0 },
    output: { WebhookConfigurations: D.list(o_ChimeWebhookConfiguration) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /describe-slack-channel-configurations",
    input: { MaxResults: 0, NextToken: 0, ChatConfigurationArn: 0 },
    output: { SlackChannelConfigurations: D.list(o_SlackChannelConfiguration) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /describe-slack-user-identities",
    input: { ChatConfigurationArn: 0, NextToken: 0, MaxResults: 0 },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /describe-slack-workspaces",
    input: { MaxResults: 0, NextToken: 0 },
    body: true,
  },
  errors: [
    DescribeSlackWorkspacesException,
    InvalidParameterException,
    InvalidRequestException,
  ],
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
  descriptor: {
    service: svc,
    http: "POST /disassociate-from-configuration",
    input: { Resource: 0, ChatConfiguration: 0 },
    body: true,
  },
  errors: [
    InternalServiceError,
    InvalidRequestException,
    UnauthorizedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateFromConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /get-account-preferences",
    input: {},
  },
  errors: [GetAccountPreferencesException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountPreferences",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /get-custom-action",
    input: { CustomActionArn: 0 },
    body: true,
  },
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCustomAction",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /get-ms-teams-channel-configuration",
    input: { ChatConfigurationArn: 0 },
    output: { ChannelConfiguration: o_TeamsChannelConfiguration },
    body: true,
  },
  errors: [
    GetTeamsChannelConfigurationException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMicrosoftTeamsChannelConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /list-associations",
    input: { ChatConfiguration: 0, MaxResults: 0, NextToken: 0 },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /list-custom-actions",
    input: { MaxResults: 0, NextToken: 0 },
    body: true,
  },
  errors: [
    InternalServiceError,
    InvalidRequestException,
    UnauthorizedException,
  ],
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
  descriptor: {
    service: svc,
    http: "POST /list-ms-teams-channel-configurations",
    input: { MaxResults: 0, NextToken: 0, TeamId: 0 },
    output: { TeamChannelConfigurations: D.list(o_TeamsChannelConfiguration) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /list-ms-teams-configured-teams",
    input: { MaxResults: 0, NextToken: 0 },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /list-ms-teams-user-identities",
    input: { ChatConfigurationArn: 0, NextToken: 0, MaxResults: 0 },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /list-tags-for-resource",
    input: { ResourceARN: 0 },
    body: true,
  },
  errors: [
    InternalServiceError,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tag-resource",
    input: { ResourceARN: 0, Tags: D.list(i_Tag) },
    body: true,
  },
  errors: [
    InternalServiceError,
    ResourceNotFoundException,
    ServiceUnavailableException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /untag-resource",
    input: { ResourceARN: 0, TagKeys: 0 },
    body: true,
  },
  errors: [
    InternalServiceError,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /update-account-preferences",
    input: { UserAuthorizationRequired: 0, TrainingDataCollectionEnabled: 0 },
    body: true,
  },
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    UpdateAccountPreferencesException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountPreferences",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /update-chime-webhook-configuration",
    input: {
      ChatConfigurationArn: 0,
      WebhookDescription: 0,
      WebhookUrl: 0,
      SnsTopicArns: 0,
      IamRoleArn: 0,
      LoggingLevel: 0,
    },
    output: { WebhookConfiguration: o_ChimeWebhookConfiguration },
    body: true,
  },
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    UpdateChimeWebhookConfigurationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateChimeWebhookConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /update-custom-action",
    input: {
      CustomActionArn: 0,
      Definition: i_CustomActionDefinition,
      AliasName: 0,
      Attachments: D.list(i_CustomActionAttachment),
    },
    body: true,
  },
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCustomAction",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /update-ms-teams-channel-configuration",
    input: {
      ChatConfigurationArn: 0,
      ChannelId: 0,
      ChannelName: 0,
      SnsTopicArns: 0,
      IamRoleArn: 0,
      LoggingLevel: 0,
      GuardrailPolicyArns: 0,
      UserAuthorizationRequired: 0,
    },
    output: { ChannelConfiguration: o_TeamsChannelConfiguration },
    body: true,
  },
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    UpdateTeamsChannelConfigurationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMicrosoftTeamsChannelConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /update-slack-channel-configuration",
    input: {
      ChatConfigurationArn: 0,
      SlackChannelId: 0,
      SlackChannelName: 0,
      SnsTopicArns: 0,
      IamRoleArn: 0,
      LoggingLevel: 0,
      GuardrailPolicyArns: 0,
      UserAuthorizationRequired: 0,
    },
    output: { ChannelConfiguration: o_SlackChannelConfiguration },
    body: true,
  },
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    UpdateSlackChannelConfigurationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSlackChannelConfiguration",
})) as any;

const i_CustomActionAttachment: D.LazyStruct = () => ({
  NotificationType: 0,
  ButtonText: 0,
  Criteria: D.list({ Operator: 0, VariableName: 0, Value: 0 }),
  Variables: 0,
});
const i_CustomActionDefinition: D.LazyStruct = () => ({ CommandText: 0 });
const i_Tag: D.LazyStruct = () => ({ TagKey: 0, TagValue: 0 });
const o_ChimeWebhookConfiguration: D.LazyStruct = () => ({
  WebhookDescription: D.secret,
});
const o_SlackChannelConfiguration: D.LazyStruct = () => ({
  SlackChannelName: D.secret,
});
const o_TeamsChannelConfiguration: D.LazyStruct = () => ({
  ChannelName: D.secret,
  TeamName: D.secret,
});
