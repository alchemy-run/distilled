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
  sdkId: "RolesAnywhere",
  target: "RolesAnywhere",
  version: "2018-05-10",
  sigv4: "rolesanywhere",
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
                `https://rolesanywhere-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://rolesanywhere-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://rolesanywhere.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://rolesanywhere.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type ResourceName = string;
export type RoleArn = string;
export type RoleArnList = string[];
export type ManagedPolicyList = string[];
export type TagKey = string | redacted.Redacted<string>;
export type TagValue = string | redacted.Redacted<string>;
export interface Tag {
  key: string | redacted.Redacted<string>;
  value: string | redacted.Redacted<string>;
}
export type TagList = Tag[];
export interface CreateProfileRequest {
  name: string;
  requireInstanceProperties?: boolean;
  sessionPolicy?: string;
  roleArns: string[];
  managedPolicyArns?: string[];
  durationSeconds?: number;
  enabled?: boolean;
  tags?: Tag[];
  acceptRoleSessionName?: boolean;
}
export type Uuid = string;
export type ProfileArn = string;
export type CertificateField = string;
export interface MappingRule {
  specifier: string;
}
export type MappingRules = MappingRule[];
export interface AttributeMapping {
  certificateField?: string;
  mappingRules?: MappingRule[];
}
export type AttributeMappings = AttributeMapping[];
export interface ProfileDetail {
  profileId?: string;
  profileArn?: string;
  name?: string;
  requireInstanceProperties?: boolean;
  enabled?: boolean;
  createdBy?: string;
  sessionPolicy?: string;
  roleArns?: string[];
  managedPolicyArns?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  durationSeconds?: number;
  acceptRoleSessionName?: boolean;
  attributeMappings?: AttributeMapping[];
}
export interface ProfileDetailResponse {
  profile?: ProfileDetail;
}
export type TrustAnchorType = string;
export type SourceData =
  | { x509CertificateData: string; acmPcaArn?: never }
  | { x509CertificateData?: never; acmPcaArn: string };
export interface Source {
  sourceType?: string;
  sourceData?: SourceData;
}
export type NotificationEvent = string;
export type NotificationChannel = string;
export interface NotificationSetting {
  enabled: boolean;
  event: string;
  threshold?: number;
  channel?: string;
}
export type NotificationSettings = NotificationSetting[];
export interface CreateTrustAnchorRequest {
  name: string;
  source: Source;
  enabled?: boolean;
  tags?: Tag[];
  notificationSettings?: NotificationSetting[];
}
export interface NotificationSettingDetail {
  enabled: boolean;
  event: string;
  threshold?: number;
  channel?: string;
  configuredBy?: string;
}
export type NotificationSettingDetails = NotificationSettingDetail[];
export interface TrustAnchorDetail {
  trustAnchorId?: string;
  trustAnchorArn?: string;
  name?: string;
  source?: Source;
  enabled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  notificationSettings?: NotificationSettingDetail[];
}
export interface TrustAnchorDetailResponse {
  trustAnchor: TrustAnchorDetail;
}
export type SpecifierList = string[];
export interface DeleteAttributeMappingRequest {
  profileId: string;
  certificateField: string;
  specifiers?: string[];
}
export interface DeleteAttributeMappingResponse {
  profile: ProfileDetail;
}
export interface ScalarCrlRequest {
  crlId: string;
}
export interface CrlDetail {
  crlId?: string;
  crlArn?: string;
  name?: string;
  enabled?: boolean;
  crlData?: Uint8Array;
  trustAnchorArn?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface CrlDetailResponse {
  crl: CrlDetail;
}
export interface ScalarProfileRequest {
  profileId: string;
}
export interface ScalarTrustAnchorRequest {
  trustAnchorId: string;
}
export interface ScalarSubjectRequest {
  subjectId: string;
}
export interface CredentialSummary {
  seenAt?: Date;
  serialNumber?: string;
  issuer?: string;
  enabled?: boolean;
  x509CertificateData?: string;
  failed?: boolean;
}
export type CredentialSummaries = CredentialSummary[];
export type InstancePropertyMap = { [key: string]: string | undefined };
export interface InstanceProperty {
  seenAt?: Date;
  properties?: { [key: string]: string | undefined };
  failed?: boolean;
}
export type InstanceProperties = InstanceProperty[];
export interface SubjectDetail {
  subjectArn?: string;
  subjectId?: string;
  enabled?: boolean;
  x509Subject?: string;
  lastSeenAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  credentials?: CredentialSummary[];
  instanceProperties?: InstanceProperty[];
}
export interface SubjectDetailResponse {
  subject?: SubjectDetail;
}
export type TrustAnchorArn = string;
export interface ImportCrlRequest {
  name: string;
  crlData: Uint8Array;
  enabled?: boolean;
  tags?: Tag[];
  trustAnchorArn: string;
}
export interface ListRequest {
  nextToken?: string;
  pageSize?: number;
}
export type CrlDetails = CrlDetail[];
export interface ListCrlsResponse {
  nextToken?: string;
  crls?: CrlDetail[];
}
export type ProfileDetails = ProfileDetail[];
export interface ListProfilesResponse {
  nextToken?: string;
  profiles?: ProfileDetail[];
}
export interface SubjectSummary {
  subjectArn?: string;
  subjectId?: string;
  enabled?: boolean;
  x509Subject?: string;
  lastSeenAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
export type SubjectSummaries = SubjectSummary[];
export interface ListSubjectsResponse {
  subjects?: SubjectSummary[];
  nextToken?: string;
}
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: Tag[];
}
export type TrustAnchorDetails = TrustAnchorDetail[];
export interface ListTrustAnchorsResponse {
  nextToken?: string;
  trustAnchors?: TrustAnchorDetail[];
}
export interface PutAttributeMappingRequest {
  profileId: string;
  certificateField: string;
  mappingRules: MappingRule[];
}
export interface PutAttributeMappingResponse {
  profile: ProfileDetail;
}
export interface PutNotificationSettingsRequest {
  trustAnchorId: string;
  notificationSettings: NotificationSetting[];
}
export interface PutNotificationSettingsResponse {
  trustAnchor: TrustAnchorDetail;
}
export interface NotificationSettingKey {
  event: string;
  channel?: string;
}
export type NotificationSettingKeys = NotificationSettingKey[];
export interface ResetNotificationSettingsRequest {
  trustAnchorId: string;
  notificationSettingKeys: NotificationSettingKey[];
}
export interface ResetNotificationSettingsResponse {
  trustAnchor: TrustAnchorDetail;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = (string | redacted.Redacted<string>)[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: (string | redacted.Redacted<string>)[];
}
export interface UntagResourceResponse {}
export interface UpdateCrlRequest {
  crlId: string;
  name?: string;
  crlData?: Uint8Array;
}
export interface UpdateProfileRequest {
  profileId: string;
  name?: string;
  sessionPolicy?: string;
  roleArns?: string[];
  managedPolicyArns?: string[];
  durationSeconds?: number;
  acceptRoleSessionName?: boolean;
}
export interface UpdateTrustAnchorRequest {
  trustAnchorId: string;
  name?: string;
  source?: Source;
}
export type CreateProfileError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Creates a *profile*, a list of the roles that Roles Anywhere service is trusted to assume. You use profiles to intersect permissions with IAM managed policies.
 *
 * **Required permissions: ** `rolesanywhere:CreateProfile`.
 */
export const createProfile: API.OperationMethod<
  CreateProfileRequest,
  ProfileDetailResponse,
  CreateProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /profiles",
    input: {
      name: 0,
      requireInstanceProperties: 0,
      sessionPolicy: 0,
      roleArns: 0,
      managedPolicyArns: 0,
      durationSeconds: 0,
      enabled: 0,
      tags: D.list(i_Tag),
      acceptRoleSessionName: 0,
    },
    output: { profile: o_ProfileDetail },
    body: true,
  },
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProfile",
})) as any;

export type CreateTrustAnchorError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Creates a trust anchor to establish trust between IAM Roles Anywhere and your certificate authority (CA). You can define a trust anchor as a reference to an Private Certificate Authority (Private CA) or by uploading a CA certificate. Your Amazon Web Services workloads can authenticate with the trust anchor using certificates issued by the CA in exchange for temporary Amazon Web Services credentials.
 *
 * **Required permissions: ** `rolesanywhere:CreateTrustAnchor`.
 */
export const createTrustAnchor: API.OperationMethod<
  CreateTrustAnchorRequest,
  TrustAnchorDetailResponse,
  CreateTrustAnchorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /trustanchors",
    input: {
      name: 0,
      source: i_Source,
      enabled: 0,
      tags: D.list(i_Tag),
      notificationSettings: D.list(i_NotificationSetting),
    },
    output: { trustAnchor: o_TrustAnchorDetail },
    body: true,
  },
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrustAnchor",
})) as any;

export type DeleteAttributeMappingError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Delete an entry from the attribute mapping rules enforced by a given profile.
 */
export const deleteAttributeMapping: API.OperationMethod<
  DeleteAttributeMappingRequest,
  DeleteAttributeMappingResponse,
  DeleteAttributeMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /profiles/{profileId}/mappings",
    input: {
      profileId: 0,
      certificateField: D.m({ query: "certificateField" }),
      specifiers: D.m({ query: "specifiers" }),
    },
    output: { profile: o_ProfileDetail },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAttributeMapping",
})) as any;

export type DeleteCrlError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a certificate revocation list (CRL).
 *
 * **Required permissions: ** `rolesanywhere:DeleteCrl`.
 */
export const deleteCrl: API.OperationMethod<
  ScalarCrlRequest,
  CrlDetailResponse,
  DeleteCrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /crl/{crlId}",
    input: { crlId: 0 },
    output: { crl: o_CrlDetail },
  },
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCrl",
})) as any;

export type DeleteProfileError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a profile.
 *
 * **Required permissions: ** `rolesanywhere:DeleteProfile`.
 */
export const deleteProfile: API.OperationMethod<
  ScalarProfileRequest,
  ProfileDetailResponse,
  DeleteProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /profile/{profileId}",
    input: { profileId: 0 },
    output: { profile: o_ProfileDetail },
  },
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProfile",
})) as any;

export type DeleteTrustAnchorError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a trust anchor.
 *
 * **Required permissions: ** `rolesanywhere:DeleteTrustAnchor`.
 */
export const deleteTrustAnchor: API.OperationMethod<
  ScalarTrustAnchorRequest,
  TrustAnchorDetailResponse,
  DeleteTrustAnchorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /trustanchor/{trustAnchorId}",
    input: { trustAnchorId: 0 },
    output: { trustAnchor: o_TrustAnchorDetail },
  },
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrustAnchor",
})) as any;

export interface DisableCrlRequest extends ScalarCrlRequest {}
export type DisableCrlError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disables a certificate revocation list (CRL).
 *
 * **Required permissions: ** `rolesanywhere:DisableCrl`.
 */
export const disableCrl: API.OperationMethod<
  DisableCrlRequest,
  CrlDetailResponse,
  DisableCrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /crl/{crlId}/disable",
    input: { crlId: 0 },
    output: { crl: o_CrlDetail },
  },
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableCrl",
})) as any;

export interface DisableProfileRequest extends ScalarProfileRequest {}
export type DisableProfileError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disables a profile. When disabled, temporary credential requests with this profile fail.
 *
 * **Required permissions: ** `rolesanywhere:DisableProfile`.
 */
export const disableProfile: API.OperationMethod<
  DisableProfileRequest,
  ProfileDetailResponse,
  DisableProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /profile/{profileId}/disable",
    input: { profileId: 0 },
    output: { profile: o_ProfileDetail },
  },
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableProfile",
})) as any;

export interface DisableTrustAnchorRequest extends ScalarTrustAnchorRequest {}
export type DisableTrustAnchorError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disables a trust anchor. When disabled, temporary credential requests specifying this trust anchor are unauthorized.
 *
 * **Required permissions: ** `rolesanywhere:DisableTrustAnchor`.
 */
export const disableTrustAnchor: API.OperationMethod<
  DisableTrustAnchorRequest,
  TrustAnchorDetailResponse,
  DisableTrustAnchorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /trustanchor/{trustAnchorId}/disable",
    input: { trustAnchorId: 0 },
    output: { trustAnchor: o_TrustAnchorDetail },
  },
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableTrustAnchor",
})) as any;

export interface EnableCrlRequest extends ScalarCrlRequest {}
export type EnableCrlError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Enables a certificate revocation list (CRL). When enabled, certificates stored in the CRL are unauthorized to receive session credentials.
 *
 * **Required permissions: ** `rolesanywhere:EnableCrl`.
 */
export const enableCrl: API.OperationMethod<
  EnableCrlRequest,
  CrlDetailResponse,
  EnableCrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /crl/{crlId}/enable",
    input: { crlId: 0 },
    output: { crl: o_CrlDetail },
  },
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableCrl",
})) as any;

export interface EnableProfileRequest extends ScalarProfileRequest {}
export type EnableProfileError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Enables temporary credential requests for a profile.
 *
 * **Required permissions: ** `rolesanywhere:EnableProfile`.
 */
export const enableProfile: API.OperationMethod<
  EnableProfileRequest,
  ProfileDetailResponse,
  EnableProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /profile/{profileId}/enable",
    input: { profileId: 0 },
    output: { profile: o_ProfileDetail },
  },
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableProfile",
})) as any;

export interface EnableTrustAnchorRequest extends ScalarTrustAnchorRequest {}
export type EnableTrustAnchorError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Enables a trust anchor. When enabled, certificates in the trust anchor chain are authorized for trust validation.
 *
 * **Required permissions: ** `rolesanywhere:EnableTrustAnchor`.
 */
export const enableTrustAnchor: API.OperationMethod<
  EnableTrustAnchorRequest,
  TrustAnchorDetailResponse,
  EnableTrustAnchorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /trustanchor/{trustAnchorId}/enable",
    input: { trustAnchorId: 0 },
    output: { trustAnchor: o_TrustAnchorDetail },
  },
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableTrustAnchor",
})) as any;

export interface GetCrlRequest extends ScalarCrlRequest {}
export type GetCrlError = ResourceNotFoundException | CommonErrors;
/**
 * Gets a certificate revocation list (CRL).
 *
 * **Required permissions: ** `rolesanywhere:GetCrl`.
 */
export const getCrl: API.OperationMethod<
  GetCrlRequest,
  CrlDetailResponse,
  GetCrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /crl/{crlId}",
    input: { crlId: 0 },
    output: { crl: o_CrlDetail },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCrl",
})) as any;

export interface GetProfileRequest extends ScalarProfileRequest {}
export type GetProfileError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets a profile.
 *
 * **Required permissions: ** `rolesanywhere:GetProfile`.
 */
export const getProfile: API.OperationMethod<
  GetProfileRequest,
  ProfileDetailResponse,
  GetProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /profile/{profileId}",
    input: { profileId: 0 },
    output: { profile: o_ProfileDetail },
  },
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProfile",
})) as any;

export type GetSubjectError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets a *subject*, which associates a certificate identity with authentication attempts. The subject stores auditing information such as the status of the last authentication attempt, the certificate data used in the attempt, and the last time the associated identity attempted authentication.
 *
 * **Required permissions: ** `rolesanywhere:GetSubject`.
 */
export const getSubject: API.OperationMethod<
  ScalarSubjectRequest,
  SubjectDetailResponse,
  GetSubjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /subject/{subjectId}",
    input: { subjectId: 0 },
    output: {
      subject: {
        lastSeenAt: D.ts,
        createdAt: D.ts,
        updatedAt: D.ts,
        credentials: D.list({ seenAt: D.ts }),
        instanceProperties: D.list({ seenAt: D.ts }),
      },
    },
  },
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSubject",
})) as any;

export interface GetTrustAnchorRequest extends ScalarTrustAnchorRequest {}
export type GetTrustAnchorError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets a trust anchor.
 *
 * **Required permissions: ** `rolesanywhere:GetTrustAnchor`.
 */
export const getTrustAnchor: API.OperationMethod<
  GetTrustAnchorRequest,
  TrustAnchorDetailResponse,
  GetTrustAnchorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /trustanchor/{trustAnchorId}",
    input: { trustAnchorId: 0 },
    output: { trustAnchor: o_TrustAnchorDetail },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrustAnchor",
})) as any;

export type ImportCrlError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Imports the certificate revocation list (CRL). A CRL is a list of certificates that have been revoked by the issuing certificate Authority (CA).In order to be properly imported, a CRL must be in PEM format. IAM Roles Anywhere validates against the CRL before issuing credentials.
 *
 * **Required permissions: ** `rolesanywhere:ImportCrl`.
 */
export const importCrl: API.OperationMethod<
  ImportCrlRequest,
  CrlDetailResponse,
  ImportCrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /crls",
    input: {
      name: 0,
      crlData: 0,
      enabled: 0,
      tags: D.list(i_Tag),
      trustAnchorArn: 0,
    },
    output: { crl: o_CrlDetail },
    body: true,
  },
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportCrl",
})) as any;

export type ListCrlsError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Lists all certificate revocation lists (CRL) in the authenticated account and Amazon Web Services Region.
 *
 * **Required permissions: ** `rolesanywhere:ListCrls`.
 */
export const listCrls: API.PaginatedOperationMethod<
  ListRequest,
  ListCrlsResponse,
  ListCrlsError,
  Credentials | HttpClient.HttpClient,
  CrlDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /crls",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      pageSize: D.m({ query: "pageSize" }),
    },
    output: { crls: D.list(o_CrlDetail) },
  },
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCrls",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "crls",
  } as const,
})) as any;

export interface ListProfilesRequest extends ListRequest {}
export type ListProfilesError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Lists all profiles in the authenticated account and Amazon Web Services Region.
 *
 * **Required permissions: ** `rolesanywhere:ListProfiles`.
 */
export const listProfiles: API.PaginatedOperationMethod<
  ListProfilesRequest,
  ListProfilesResponse,
  ListProfilesError,
  Credentials | HttpClient.HttpClient,
  ProfileDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /profiles",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      pageSize: D.m({ query: "pageSize" }),
    },
    output: { profiles: D.list(o_ProfileDetail) },
  },
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProfiles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "profiles",
  } as const,
})) as any;

export interface ListSubjectsRequest extends ListRequest {}
export type ListSubjectsError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Lists the subjects in the authenticated account and Amazon Web Services Region.
 *
 * **Required permissions: ** `rolesanywhere:ListSubjects`.
 */
export const listSubjects: API.PaginatedOperationMethod<
  ListSubjectsRequest,
  ListSubjectsResponse,
  ListSubjectsError,
  Credentials | HttpClient.HttpClient,
  SubjectSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /subjects",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      pageSize: D.m({ query: "pageSize" }),
    },
    output: {
      subjects: D.list({ lastSeenAt: D.ts, createdAt: D.ts, updatedAt: D.ts }),
    },
  },
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSubjects",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "subjects",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags attached to the resource.
 *
 * **Required permissions: ** `rolesanywhere:ListTagsForResource`.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /ListTagsForResource",
    input: { resourceArn: D.m({ query: "resourceArn" }) },
    output: { tags: D.list({ key: D.secret, value: D.secret }) },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export interface ListTrustAnchorsRequest extends ListRequest {}
export type ListTrustAnchorsError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Lists the trust anchors in the authenticated account and Amazon Web Services Region.
 *
 * **Required permissions: ** `rolesanywhere:ListTrustAnchors`.
 */
export const listTrustAnchors: API.PaginatedOperationMethod<
  ListTrustAnchorsRequest,
  ListTrustAnchorsResponse,
  ListTrustAnchorsError,
  Credentials | HttpClient.HttpClient,
  TrustAnchorDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /trustanchors",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      pageSize: D.m({ query: "pageSize" }),
    },
    output: { trustAnchors: D.list(o_TrustAnchorDetail) },
  },
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrustAnchors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "trustAnchors",
  } as const,
})) as any;

export type PutAttributeMappingError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Put an entry in the attribute mapping rules that will be enforced by a given profile. A mapping specifies a certificate field and one or more specifiers that have contextual meanings.
 */
export const putAttributeMapping: API.OperationMethod<
  PutAttributeMappingRequest,
  PutAttributeMappingResponse,
  PutAttributeMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /profiles/{profileId}/mappings",
    input: {
      profileId: 0,
      certificateField: 0,
      mappingRules: D.list({ specifier: 0 }),
    },
    output: { profile: o_ProfileDetail },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAttributeMapping",
})) as any;

export type PutNotificationSettingsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Attaches a list of *notification settings* to a trust anchor.
 *
 * A notification setting includes information such as event name, threshold, status of the notification setting, and the channel to notify.
 *
 * **Required permissions: ** `rolesanywhere:PutNotificationSettings`.
 */
export const putNotificationSettings: API.OperationMethod<
  PutNotificationSettingsRequest,
  PutNotificationSettingsResponse,
  PutNotificationSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /put-notifications-settings",
    input: {
      trustAnchorId: 0,
      notificationSettings: D.list(i_NotificationSetting),
    },
    output: { trustAnchor: o_TrustAnchorDetail },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutNotificationSettings",
})) as any;

export type ResetNotificationSettingsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Resets the *custom notification setting* to IAM Roles Anywhere default setting.
 *
 * **Required permissions: ** `rolesanywhere:ResetNotificationSettings`.
 */
export const resetNotificationSettings: API.OperationMethod<
  ResetNotificationSettingsRequest,
  ResetNotificationSettingsResponse,
  ResetNotificationSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /reset-notifications-settings",
    input: {
      trustAnchorId: 0,
      notificationSettingKeys: D.list({ event: 0, channel: 0 }),
    },
    output: { trustAnchor: o_TrustAnchorDetail },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetNotificationSettings",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Attaches tags to a resource.
 *
 * **Required permissions: ** `rolesanywhere:TagResource`.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /TagResource",
    input: { resourceArn: 0, tags: D.list(i_Tag) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from the resource.
 *
 * **Required permissions: ** `rolesanywhere:UntagResource`.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UntagResource",
    input: { resourceArn: 0, tagKeys: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateCrlError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the certificate revocation list (CRL). A CRL is a list of certificates that have been revoked by the issuing certificate authority (CA). IAM Roles Anywhere validates against the CRL before issuing credentials.
 *
 * **Required permissions: ** `rolesanywhere:UpdateCrl`.
 */
export const updateCrl: API.OperationMethod<
  UpdateCrlRequest,
  CrlDetailResponse,
  UpdateCrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /crl/{crlId}",
    input: { crlId: 0, name: 0, crlData: 0 },
    output: { crl: o_CrlDetail },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCrl",
})) as any;

export type UpdateProfileError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a *profile*, a list of the roles that IAM Roles Anywhere service is trusted to assume. You use profiles to intersect permissions with IAM managed policies.
 *
 * **Required permissions: ** `rolesanywhere:UpdateProfile`.
 */
export const updateProfile: API.OperationMethod<
  UpdateProfileRequest,
  ProfileDetailResponse,
  UpdateProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /profile/{profileId}",
    input: {
      profileId: 0,
      name: 0,
      sessionPolicy: 0,
      roleArns: 0,
      managedPolicyArns: 0,
      durationSeconds: 0,
      acceptRoleSessionName: 0,
    },
    output: { profile: o_ProfileDetail },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProfile",
})) as any;

export type UpdateTrustAnchorError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a trust anchor. You establish trust between IAM Roles Anywhere and your certificate authority (CA) by configuring a trust anchor. You can define a trust anchor as a reference to an Private Certificate Authority (Private CA) or by uploading a CA certificate. Your Amazon Web Services workloads can authenticate with the trust anchor using certificates issued by the CA in exchange for temporary Amazon Web Services credentials.
 *
 * **Required permissions: ** `rolesanywhere:UpdateTrustAnchor`.
 */
export const updateTrustAnchor: API.OperationMethod<
  UpdateTrustAnchorRequest,
  TrustAnchorDetailResponse,
  UpdateTrustAnchorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /trustanchor/{trustAnchorId}",
    input: { trustAnchorId: 0, name: 0, source: i_Source },
    output: { trustAnchor: o_TrustAnchorDetail },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTrustAnchor",
})) as any;

const i_NotificationSetting: D.LazyStruct = () => ({
  enabled: 0,
  event: 0,
  threshold: 0,
  channel: 0,
});
const i_Source: D.LazyStruct = () => ({
  sourceType: 0,
  sourceData: { x509CertificateData: 0, acmPcaArn: 0 },
});
const i_Tag: D.LazyStruct = () => ({ key: 0, value: 0 });
const o_CrlDetail: D.LazyStruct = () => ({
  crlData: D.blob,
  createdAt: D.ts,
  updatedAt: D.ts,
});
const o_ProfileDetail: D.LazyStruct = () => ({
  createdAt: D.ts,
  updatedAt: D.ts,
});
const o_TrustAnchorDetail: D.LazyStruct = () => ({
  createdAt: D.ts,
  updatedAt: D.ts,
});
