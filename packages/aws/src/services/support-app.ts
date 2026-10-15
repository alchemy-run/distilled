import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "Support App", serviceShapeName: "SupportApp" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "supportapp" });
const ver = /*@__PURE__*/ T.ServiceVersion("2021-08-20");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://supportapp.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://supportapp.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://supportapp.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
  input: __S(24, __c6, 0) as any as S.Schema<CreateSlackChannelConfigurationRequest>,
  output: __S(28, __c7, 0) as any as S.Schema<CreateSlackChannelConfigurationResult>,
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
}));

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
  input: __S(32, __c8, 0) as any as S.Schema<DeleteAccountAliasRequest>,
  output: __S(28, __c7, 0) as any as S.Schema<DeleteAccountAliasResult>,
  errors: [AccessDeniedException, InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccountAlias",
}));

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
  input: __S(36, __c9, 0) as any as S.Schema<DeleteSlackChannelConfigurationRequest>,
  output: __S(28, __c7, 0) as any as S.Schema<DeleteSlackChannelConfigurationResult>,
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
}));

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
  input: __S(40, __c10, 0) as any as S.Schema<DeleteSlackWorkspaceConfigurationRequest>,
  output: __S(28, __c7, 0) as any as S.Schema<DeleteSlackWorkspaceConfigurationResult>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<GetAccountAliasRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<GetAccountAliasResult>,
  errors: [InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountAlias",
}));

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
  input: __S(4, __c1, 0) as any as S.Schema<ListSlackChannelConfigurationsRequest>,
  output: __S(7, __c1, 3) as any as S.Schema<ListSlackChannelConfigurationsResult>,
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
  input: __S(8, __c2, 0) as any as S.Schema<ListSlackWorkspaceConfigurationsRequest>,
  output: __S(11, __c2, 3) as any as S.Schema<ListSlackWorkspaceConfigurationsResult>,
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
  input: __S(12, __c3, 0) as any as S.Schema<PutAccountAliasRequest>,
  output: __S(28, __c7, 0) as any as S.Schema<PutAccountAliasResult>,
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountAlias",
}));

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
  input: __S(16, __c4, 0) as any as S.Schema<RegisterSlackWorkspaceForOrganizationRequest>,
  output: __S(17, __c4, 1) as any as S.Schema<RegisterSlackWorkspaceForOrganizationResult>,
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
}));

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
  input: __S(20, __c5, 0) as any as S.Schema<UpdateSlackChannelConfigurationRequest>,
  output: __S(21, __c5, 1) as any as S.Schema<UpdateSlackChannelConfigurationResult>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/control/get-account-alias" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAccountAliasRequest" });
    case 1:
      return S.suspend(() => S.Struct({ accountAlias: S.optional(S.String) })).annotate({
        identifier: "GetAccountAliasResult",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/control/list-slack-channel-configurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSlackChannelConfigurationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          teamId: S.String,
          channelId: S.String,
          channelName: S.optional(S.String),
          notifyOnCreateOrReopenCase: S.optional(S.Boolean),
          notifyOnAddCorrespondenceToCase: S.optional(S.Boolean),
          notifyOnResolveCase: S.optional(S.Boolean),
          notifyOnCaseSeverity: S.optional(S.String),
          channelRoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "SlackChannelConfiguration" });
    case 2:
      return S.Array(__S(5, __c1, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), slackChannelConfigurations: __S(6, __c1, 2) }),
      ).annotate({ identifier: "ListSlackChannelConfigurationsResult" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/control/list-slack-workspace-configurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSlackWorkspaceConfigurationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          teamId: S.String,
          teamName: S.optional(S.String),
          allowOrganizationMemberAccount: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "SlackWorkspaceConfiguration" });
    case 2:
      return S.Array(__S(9, __c2, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          slackWorkspaceConfigurations: S.optional(__S(10, __c2, 2)),
        }),
      ).annotate({ identifier: "ListSlackWorkspaceConfigurationsResult" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ accountAlias: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/control/put-account-alias" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutAccountAliasRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ teamId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/control/register-slack-workspace-for-organization" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RegisterSlackWorkspaceForOrganizationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          teamId: S.optional(S.String),
          teamName: S.optional(S.String),
          accountType: S.optional(S.String),
        }),
      ).annotate({ identifier: "RegisterSlackWorkspaceForOrganizationResult" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          teamId: S.String,
          channelId: S.String,
          channelName: S.optional(S.String),
          notifyOnCreateOrReopenCase: S.optional(S.Boolean),
          notifyOnAddCorrespondenceToCase: S.optional(S.Boolean),
          notifyOnResolveCase: S.optional(S.Boolean),
          notifyOnCaseSeverity: S.optional(S.String),
          channelRoleArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/control/update-slack-channel-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSlackChannelConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          teamId: S.optional(S.String),
          channelId: S.optional(S.String),
          channelName: S.optional(S.String),
          notifyOnCreateOrReopenCase: S.optional(S.Boolean),
          notifyOnAddCorrespondenceToCase: S.optional(S.Boolean),
          notifyOnResolveCase: S.optional(S.Boolean),
          notifyOnCaseSeverity: S.optional(S.String),
          channelRoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateSlackChannelConfigurationResult" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          teamId: S.String,
          channelId: S.String,
          channelName: S.optional(S.String),
          notifyOnCreateOrReopenCase: S.optional(S.Boolean),
          notifyOnAddCorrespondenceToCase: S.optional(S.Boolean),
          notifyOnResolveCase: S.optional(S.Boolean),
          notifyOnCaseSeverity: S.String,
          channelRoleArn: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/control/create-slack-channel-configuration" }),
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
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "CreateSlackChannelConfigurationResult",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/control/delete-account-alias" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAccountAliasRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ teamId: S.String, channelId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/control/delete-slack-channel-configuration" }),
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
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ teamId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/control/delete-slack-workspace-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSlackWorkspaceConfigurationRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
