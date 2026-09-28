import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { restJson1Protocol } from "../protocols/rest-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Support App",
  target: "SupportApp",
  version: "2021-08-20",
  sigv4: "supportapp",
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
                `https://supportapp-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://supportapp-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://supportapp.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://supportapp.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
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
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type TeamId = string;
export type ChannelId = string;
export type ChannelName = string;
export type NotificationSeverityLevel = string;
export type RoleArn = string;
export interface CreateSlackChannelConfigurationRequest {
  teamId: string;
  channelId: string;
  channelName?: string;
  notifyOnCreateOrReopenCase?: boolean;
  notifyOnAddCorrespondenceToCase?: boolean;
  notifyOnResolveCase?: boolean;
  notifyOnCaseSeverity: string;
  channelRoleArn: string;
}
export interface CreateSlackChannelConfigurationResult {}
export interface DeleteAccountAliasRequest {}
export interface DeleteAccountAliasResult {}
export interface DeleteSlackChannelConfigurationRequest {
  teamId: string;
  channelId: string;
}
export interface DeleteSlackChannelConfigurationResult {}
export interface DeleteSlackWorkspaceConfigurationRequest {
  teamId: string;
}
export interface DeleteSlackWorkspaceConfigurationResult {}
export interface GetAccountAliasRequest {}
export type AwsAccountAlias = string;
export interface GetAccountAliasResult {
  accountAlias?: string;
}
export type PaginationToken = string;
export interface ListSlackChannelConfigurationsRequest {
  nextToken?: string;
}
export interface SlackChannelConfiguration {
  teamId: string;
  channelId: string;
  channelName?: string;
  notifyOnCreateOrReopenCase?: boolean;
  notifyOnAddCorrespondenceToCase?: boolean;
  notifyOnResolveCase?: boolean;
  notifyOnCaseSeverity?: string;
  channelRoleArn?: string;
}
export type SlackChannelConfigurationList = SlackChannelConfiguration[];
export interface ListSlackChannelConfigurationsResult {
  nextToken?: string;
  slackChannelConfigurations: SlackChannelConfiguration[];
}
export interface ListSlackWorkspaceConfigurationsRequest {
  nextToken?: string;
}
export type TeamName = string;
export interface SlackWorkspaceConfiguration {
  teamId: string;
  teamName?: string;
  allowOrganizationMemberAccount?: boolean;
}
export type SlackWorkspaceConfigurationList = SlackWorkspaceConfiguration[];
export interface ListSlackWorkspaceConfigurationsResult {
  nextToken?: string;
  slackWorkspaceConfigurations?: SlackWorkspaceConfiguration[];
}
export interface PutAccountAliasRequest {
  accountAlias: string;
}
export interface PutAccountAliasResult {}
export interface RegisterSlackWorkspaceForOrganizationRequest {
  teamId: string;
}
export type AccountType = string;
export interface RegisterSlackWorkspaceForOrganizationResult {
  teamId?: string;
  teamName?: string;
  accountType?: string;
}
export interface UpdateSlackChannelConfigurationRequest {
  teamId: string;
  channelId: string;
  channelName?: string;
  notifyOnCreateOrReopenCase?: boolean;
  notifyOnAddCorrespondenceToCase?: boolean;
  notifyOnResolveCase?: boolean;
  notifyOnCaseSeverity?: string;
  channelRoleArn?: string;
}
export interface UpdateSlackChannelConfigurationResult {
  teamId?: string;
  channelId?: string;
  channelName?: string;
  notifyOnCreateOrReopenCase?: boolean;
  notifyOnAddCorrespondenceToCase?: boolean;
  notifyOnResolveCase?: boolean;
  notifyOnCaseSeverity?: string;
  channelRoleArn?: string;
}
export type ErrorMessage = string;
export type CreateSlackChannelConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Slack channel configuration for your Amazon Web Services account.
 *
 * - You can add up to 5 Slack workspaces for your account.
 *
 * - You can add up to 20 Slack channels for your account.
 *
 * A Slack channel can have up to 100 Amazon Web Services accounts. This means that only 100 accounts can
 * add the same Slack channel to the Amazon Web Services Support App. We recommend that you only add the accounts that
 * you need to manage support cases for your organization. This can reduce the notifications
 * about case updates that you receive in the Slack channel.
 *
 * We recommend that you choose a private Slack channel so that only members in that
 * channel have read and write access to your support cases. Anyone in your Slack channel can
 * create, update, or resolve support cases for your account. Users require an invitation to
 * join private channels.
 */
export const createSlackChannelConfiguration: API.OperationMethod<
  CreateSlackChannelConfigurationRequest,
  CreateSlackChannelConfigurationResult,
  CreateSlackChannelConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /control/create-slack-channel-configuration",
    input: {
      teamId: 0,
      channelId: 0,
      channelName: 0,
      notifyOnCreateOrReopenCase: 0,
      notifyOnAddCorrespondenceToCase: 0,
      notifyOnResolveCase: 0,
      notifyOnCaseSeverity: 0,
      channelRoleArn: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSlackChannelConfiguration",
})) as any;

export type DeleteAccountAliasError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an alias for an Amazon Web Services account ID. The alias appears in the Amazon Web Services Support App page of the
 * Amazon Web Services Support Center. The alias also appears in Slack messages from the Amazon Web Services Support App.
 */
export const deleteAccountAlias: API.OperationMethod<
  DeleteAccountAliasRequest,
  DeleteAccountAliasResult,
  DeleteAccountAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /control/delete-account-alias",
    input: {},
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccountAlias",
})) as any;

export type DeleteSlackChannelConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Slack channel configuration from your Amazon Web Services account. This operation doesn't
 * delete your Slack channel.
 */
export const deleteSlackChannelConfiguration: API.OperationMethod<
  DeleteSlackChannelConfigurationRequest,
  DeleteSlackChannelConfigurationResult,
  DeleteSlackChannelConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /control/delete-slack-channel-configuration",
    input: { teamId: 0, channelId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSlackChannelConfiguration",
})) as any;

export type DeleteSlackWorkspaceConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Slack workspace configuration from your Amazon Web Services account. This operation doesn't
 * delete your Slack workspace.
 */
export const deleteSlackWorkspaceConfiguration: API.OperationMethod<
  DeleteSlackWorkspaceConfigurationRequest,
  DeleteSlackWorkspaceConfigurationResult,
  DeleteSlackWorkspaceConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /control/delete-slack-workspace-configuration",
    input: { teamId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSlackWorkspaceConfiguration",
})) as any;

export type GetAccountAliasError = InternalServerException | CommonErrors;
/**
 * Retrieves the alias from an Amazon Web Services account ID. The alias appears in the Amazon Web Services Support App page of
 * the Amazon Web Services Support Center. The alias also appears in Slack messages from the Amazon Web Services Support App.
 */
export const getAccountAlias: API.OperationMethod<
  GetAccountAliasRequest,
  GetAccountAliasResult,
  GetAccountAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /control/get-account-alias",
    input: {},
  },
  errors: [InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountAlias",
})) as any;

export type ListSlackChannelConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | CommonErrors;
/**
 * Lists the Slack channel configurations for an Amazon Web Services account.
 */
export const listSlackChannelConfigurations: API.PaginatedOperationMethod<
  ListSlackChannelConfigurationsRequest,
  ListSlackChannelConfigurationsResult,
  ListSlackChannelConfigurationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /control/list-slack-channel-configurations",
    input: { nextToken: 0 },
    body: true,
  },
  errors: [AccessDeniedException, InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSlackChannelConfigurations",
  pagination: { inputToken: "nextToken", outputToken: "nextToken" } as const,
})) as any;

export type ListSlackWorkspaceConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | CommonErrors;
/**
 * Lists the Slack workspace configurations for an Amazon Web Services account.
 */
export const listSlackWorkspaceConfigurations: API.PaginatedOperationMethod<
  ListSlackWorkspaceConfigurationsRequest,
  ListSlackWorkspaceConfigurationsResult,
  ListSlackWorkspaceConfigurationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /control/list-slack-workspace-configurations",
    input: { nextToken: 0 },
    body: true,
  },
  errors: [AccessDeniedException, InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSlackWorkspaceConfigurations",
  pagination: { inputToken: "nextToken", outputToken: "nextToken" } as const,
})) as any;

export type PutAccountAliasError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates an individual alias for each Amazon Web Services account ID. The alias appears in the
 * Amazon Web Services Support App page of the Amazon Web Services Support Center. The alias also appears in Slack messages from the
 * Amazon Web Services Support App.
 */
export const putAccountAlias: API.OperationMethod<
  PutAccountAliasRequest,
  PutAccountAliasResult,
  PutAccountAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /control/put-account-alias",
    input: { accountAlias: 0 },
    body: true,
  },
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountAlias",
})) as any;

export type RegisterSlackWorkspaceForOrganizationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Registers a Slack workspace for your Amazon Web Services account. To call this API, your account must be
 * part of an organization in Organizations.
 *
 * If you're the *management account* and you want to register Slack
 * workspaces for your organization, you must complete the following tasks:
 *
 * - Sign in to the Amazon Web Services Support Center and
 * authorize the Slack workspaces where you want your organization to have access to. See
 * Authorize a Slack workspace in the Amazon Web Services Support User
 * Guide.
 *
 * - Call the `RegisterSlackWorkspaceForOrganization` API to authorize each
 * Slack workspace for the organization.
 *
 * After the management account authorizes the Slack workspace, member accounts can call this
 * API to authorize the same Slack workspace for their individual accounts. Member accounts don't
 * need to authorize the Slack workspace manually through the Amazon Web Services Support Center.
 *
 * To use the Amazon Web Services Support App, each account must then complete the following tasks:
 *
 * - Create an Identity and Access Management (IAM) role with the required permission. For more information,
 * see Managing access to the Amazon Web Services Support App.
 *
 * - Configure a Slack channel to use the Amazon Web Services Support App for support cases for that account. For
 * more information, see Configuring a Slack channel.
 */
export const registerSlackWorkspaceForOrganization: API.OperationMethod<
  RegisterSlackWorkspaceForOrganizationRequest,
  RegisterSlackWorkspaceForOrganizationResult,
  RegisterSlackWorkspaceForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /control/register-slack-workspace-for-organization",
    input: { teamId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterSlackWorkspaceForOrganization",
})) as any;

export type UpdateSlackChannelConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration for a Slack channel, such as case update notifications.
 */
export const updateSlackChannelConfiguration: API.OperationMethod<
  UpdateSlackChannelConfigurationRequest,
  UpdateSlackChannelConfigurationResult,
  UpdateSlackChannelConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /control/update-slack-channel-configuration",
    input: {
      teamId: 0,
      channelId: 0,
      channelName: 0,
      notifyOnCreateOrReopenCase: 0,
      notifyOnAddCorrespondenceToCase: 0,
      notifyOnResolveCase: 0,
      notifyOnCaseSeverity: 0,
      channelRoleArn: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSlackChannelConfiguration",
})) as any;
