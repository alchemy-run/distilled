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
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "RolesAnywhere",
  serviceShapeName: "RolesAnywhere",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "rolesanywhere" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-05-10");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://rolesanywhere.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://rolesanywhere.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://rolesanywhere.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type CreateProfileError = AccessDeniedException | ValidationException | CommonErrors;
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
  input: __S(136, __c17, 0) as any as S.Schema<CreateProfileRequest>,
  output: __S(160, __c20, 0) as any as S.Schema<ProfileDetailResponse>,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProfile",
}));

export type CreateTrustAnchorError = AccessDeniedException | ValidationException | CommonErrors;
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
  input: __S(168, __c21, 0) as any as S.Schema<CreateTrustAnchorRequest>,
  output: __S(192, __c24, 0) as any as S.Schema<TrustAnchorDetailResponse>,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrustAnchor",
}));

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
  input: __S(200, __c25, 0) as any as S.Schema<DeleteAttributeMappingRequest>,
  output: __S(208, __c26, 0) as any as S.Schema<DeleteAttributeMappingResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAttributeMapping",
}));

export type DeleteCrlError = AccessDeniedException | ResourceNotFoundException | CommonErrors;
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
  input: __S(216, __c27, 0) as any as S.Schema<ScalarCrlRequest>,
  output: __S(232, __c29, 0) as any as S.Schema<CrlDetailResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCrl",
}));

export type DeleteProfileError = AccessDeniedException | ResourceNotFoundException | CommonErrors;
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
  input: __S(240, __c30, 0) as any as S.Schema<ScalarProfileRequest>,
  output: __S(160, __c20, 0) as any as S.Schema<ProfileDetailResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProfile",
}));

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
  input: __S(248, __c31, 0) as any as S.Schema<ScalarTrustAnchorRequest>,
  output: __S(192, __c24, 0) as any as S.Schema<TrustAnchorDetailResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrustAnchor",
}));

export interface DisableCrlRequest extends ScalarCrlRequest {}
const DisableCrlRequest = /*@__PURE__*/ __S(216, __c27, 0)
  .pipe(/*@__PURE__*/ T.Http({ method: "POST", uri: "/crl/{crlId}/disable" }))
  .annotate({ identifier: "DisableCrlRequest" }) as any as S.Schema<DisableCrlRequest>;
export type DisableCrlError = AccessDeniedException | ResourceNotFoundException | CommonErrors;
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
  input: DisableCrlRequest,
  output: __S(232, __c29, 0) as any as S.Schema<CrlDetailResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableCrl",
}));

export interface DisableProfileRequest extends ScalarProfileRequest {}
const DisableProfileRequest = /*@__PURE__*/ __S(240, __c30, 0)
  .pipe(/*@__PURE__*/ T.Http({ method: "POST", uri: "/profile/{profileId}/disable" }))
  .annotate({ identifier: "DisableProfileRequest" }) as any as S.Schema<DisableProfileRequest>;
export type DisableProfileError = AccessDeniedException | ResourceNotFoundException | CommonErrors;
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
  input: DisableProfileRequest,
  output: __S(160, __c20, 0) as any as S.Schema<ProfileDetailResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableProfile",
}));

export interface DisableTrustAnchorRequest extends ScalarTrustAnchorRequest {}
const DisableTrustAnchorRequest = /*@__PURE__*/ __S(248, __c31, 0)
  .pipe(/*@__PURE__*/ T.Http({ method: "POST", uri: "/trustanchor/{trustAnchorId}/disable" }))
  .annotate({
    identifier: "DisableTrustAnchorRequest",
  }) as any as S.Schema<DisableTrustAnchorRequest>;
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
  input: DisableTrustAnchorRequest,
  output: __S(192, __c24, 0) as any as S.Schema<TrustAnchorDetailResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableTrustAnchor",
}));

export interface EnableCrlRequest extends ScalarCrlRequest {}
const EnableCrlRequest = /*@__PURE__*/ __S(216, __c27, 0)
  .pipe(/*@__PURE__*/ T.Http({ method: "POST", uri: "/crl/{crlId}/enable" }))
  .annotate({ identifier: "EnableCrlRequest" }) as any as S.Schema<EnableCrlRequest>;
export type EnableCrlError = AccessDeniedException | ResourceNotFoundException | CommonErrors;
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
  input: EnableCrlRequest,
  output: __S(232, __c29, 0) as any as S.Schema<CrlDetailResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableCrl",
}));

export interface EnableProfileRequest extends ScalarProfileRequest {}
const EnableProfileRequest = /*@__PURE__*/ __S(240, __c30, 0)
  .pipe(/*@__PURE__*/ T.Http({ method: "POST", uri: "/profile/{profileId}/enable" }))
  .annotate({ identifier: "EnableProfileRequest" }) as any as S.Schema<EnableProfileRequest>;
export type EnableProfileError = AccessDeniedException | ResourceNotFoundException | CommonErrors;
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
  input: EnableProfileRequest,
  output: __S(160, __c20, 0) as any as S.Schema<ProfileDetailResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableProfile",
}));

export interface EnableTrustAnchorRequest extends ScalarTrustAnchorRequest {}
const EnableTrustAnchorRequest = /*@__PURE__*/ __S(248, __c31, 0)
  .pipe(/*@__PURE__*/ T.Http({ method: "POST", uri: "/trustanchor/{trustAnchorId}/enable" }))
  .annotate({
    identifier: "EnableTrustAnchorRequest",
  }) as any as S.Schema<EnableTrustAnchorRequest>;
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
  input: EnableTrustAnchorRequest,
  output: __S(192, __c24, 0) as any as S.Schema<TrustAnchorDetailResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableTrustAnchor",
}));

export interface GetCrlRequest extends ScalarCrlRequest {}
const GetCrlRequest = /*@__PURE__*/ __S(216, __c27, 0)
  .pipe(/*@__PURE__*/ T.Http({ method: "GET", uri: "/crl/{crlId}" }))
  .annotate({ identifier: "GetCrlRequest" }) as any as S.Schema<GetCrlRequest>;
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
  input: GetCrlRequest,
  output: __S(232, __c29, 0) as any as S.Schema<CrlDetailResponse>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCrl",
}));

export interface GetProfileRequest extends ScalarProfileRequest {}
const GetProfileRequest = /*@__PURE__*/ __S(240, __c30, 0)
  .pipe(/*@__PURE__*/ T.Http({ method: "GET", uri: "/profile/{profileId}" }))
  .annotate({ identifier: "GetProfileRequest" }) as any as S.Schema<GetProfileRequest>;
export type GetProfileError = AccessDeniedException | ResourceNotFoundException | CommonErrors;
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
  input: GetProfileRequest,
  output: __S(160, __c20, 0) as any as S.Schema<ProfileDetailResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProfile",
}));

export type GetSubjectError = AccessDeniedException | ResourceNotFoundException | CommonErrors;
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
  input: __S(0, __c0, 0) as any as S.Schema<ScalarSubjectRequest>,
  output: __S(7, __c0, 7) as any as S.Schema<SubjectDetailResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSubject",
}));

export interface GetTrustAnchorRequest extends ScalarTrustAnchorRequest {}
const GetTrustAnchorRequest = /*@__PURE__*/ __S(248, __c31, 0)
  .pipe(/*@__PURE__*/ T.Http({ method: "GET", uri: "/trustanchor/{trustAnchorId}" }))
  .annotate({ identifier: "GetTrustAnchorRequest" }) as any as S.Schema<GetTrustAnchorRequest>;
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
  input: GetTrustAnchorRequest,
  output: __S(192, __c24, 0) as any as S.Schema<TrustAnchorDetailResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrustAnchor",
}));

export type ImportCrlError = AccessDeniedException | ValidationException | CommonErrors;
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
  input: __S(8, __c1, 0) as any as S.Schema<ImportCrlRequest>,
  output: __S(232, __c29, 0) as any as S.Schema<CrlDetailResponse>,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportCrl",
}));

export type ListCrlsError = AccessDeniedException | ValidationException | CommonErrors;
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
  input: __S(24, __c3, 0) as any as S.Schema<ListRequest>,
  output: __S(17, __c2, 1) as any as S.Schema<ListCrlsResponse>,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCrls",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "crls" } as const,
})) as any;

export interface ListProfilesRequest extends ListRequest {}
const ListProfilesRequest = /*@__PURE__*/ __S(24, __c3, 0)
  .pipe(/*@__PURE__*/ T.Http({ method: "GET", uri: "/profiles" }))
  .annotate({ identifier: "ListProfilesRequest" }) as any as S.Schema<ListProfilesRequest>;
export type ListProfilesError = AccessDeniedException | ValidationException | CommonErrors;
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
  input: ListProfilesRequest,
  output: __S(33, __c4, 1) as any as S.Schema<ListProfilesResponse>,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProfiles",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "profiles" } as const,
})) as any;

export interface ListSubjectsRequest extends ListRequest {}
const ListSubjectsRequest = /*@__PURE__*/ __S(24, __c3, 0)
  .pipe(/*@__PURE__*/ T.Http({ method: "GET", uri: "/subjects" }))
  .annotate({ identifier: "ListSubjectsRequest" }) as any as S.Schema<ListSubjectsRequest>;
export type ListSubjectsError = AccessDeniedException | ValidationException | CommonErrors;
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
  input: ListSubjectsRequest,
  output: __S(42, __c5, 2) as any as S.Schema<ListSubjectsResponse>,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSubjects",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "subjects" } as const,
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
  input: __S(48, __c6, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(49, __c6, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export interface ListTrustAnchorsRequest extends ListRequest {}
const ListTrustAnchorsRequest = /*@__PURE__*/ __S(24, __c3, 0)
  .pipe(/*@__PURE__*/ T.Http({ method: "GET", uri: "/trustanchors" }))
  .annotate({ identifier: "ListTrustAnchorsRequest" }) as any as S.Schema<ListTrustAnchorsRequest>;
export type ListTrustAnchorsError = AccessDeniedException | ValidationException | CommonErrors;
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
  input: ListTrustAnchorsRequest,
  output: __S(57, __c7, 1) as any as S.Schema<ListTrustAnchorsResponse>,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrustAnchors",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "trustAnchors" } as const,
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
  input: __S(64, __c8, 0) as any as S.Schema<PutAttributeMappingRequest>,
  output: __S(208, __c26, 0) as any as S.Schema<PutAttributeMappingResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAttributeMapping",
}));

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
  input: __S(72, __c9, 0) as any as S.Schema<PutNotificationSettingsRequest>,
  output: __S(192, __c24, 0) as any as S.Schema<PutNotificationSettingsResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutNotificationSettings",
}));

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
  input: __S(82, __c10, 2) as any as S.Schema<ResetNotificationSettingsRequest>,
  output: __S(192, __c24, 0) as any as S.Schema<ResetNotificationSettingsResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetNotificationSettings",
}));

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
  input: __S(88, __c11, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(96, __c12, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

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
  input: __S(105, __c13, 1) as any as S.Schema<UntagResourceRequest>,
  output: __S(96, __c12, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(112, __c14, 0) as any as S.Schema<UpdateCrlRequest>,
  output: __S(232, __c29, 0) as any as S.Schema<CrlDetailResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCrl",
}));

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
  input: __S(120, __c15, 0) as any as S.Schema<UpdateProfileRequest>,
  output: __S(160, __c20, 0) as any as S.Schema<ProfileDetailResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProfile",
}));

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
  input: __S(128, __c16, 0) as any as S.Schema<UpdateTrustAnchorRequest>,
  output: __S(192, __c24, 0) as any as S.Schema<TrustAnchorDetailResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTrustAnchor",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ subjectId: S.String.pipe(T.HttpLabel("subjectId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/subject/{subjectId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ScalarSubjectRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          seenAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          serialNumber: S.optional(S.String),
          issuer: S.optional(S.String),
          enabled: S.optional(S.Boolean),
          x509CertificateData: S.optional(S.String),
          failed: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "CredentialSummary" });
    case 2:
      return S.Array(__S(1, __c0, 1));
    case 3:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 4:
      return S.suspend(() =>
        S.Struct({
          seenAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          properties: S.optional(__S(3, __c0, 3)),
          failed: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "InstanceProperty" });
    case 5:
      return S.Array(__S(4, __c0, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          subjectArn: S.optional(S.String),
          subjectId: S.optional(S.String),
          enabled: S.optional(S.Boolean),
          x509Subject: S.optional(S.String),
          lastSeenAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          credentials: S.optional(__S(2, __c0, 2)),
          instanceProperties: S.optional(__S(5, __c0, 5)),
        }),
      ).annotate({ identifier: "SubjectDetail" });
    case 7:
      return S.suspend(() => S.Struct({ subject: S.optional(__S(6, __c0, 6)) })).annotate({
        identifier: "SubjectDetailResponse",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          crlData: T.Blob,
          enabled: S.optional(S.Boolean),
          tags: S.optional(__S(145, __c18, 1)),
          trustAnchorArn: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/crls" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ImportCrlRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(224, __c28, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), crls: S.optional(__S(16, __c2, 0)) }),
      ).annotate({ identifier: "ListCrlsResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          pageSize: S.optional(S.Number).pipe(T.HttpQuery("pageSize")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/crls" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(157, __c19, 5));
    case 1:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), profiles: S.optional(__S(32, __c4, 0)) }),
      ).annotate({ identifier: "ListProfilesResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          subjectArn: S.optional(S.String),
          subjectId: S.optional(S.String),
          enabled: S.optional(S.Boolean),
          x509Subject: S.optional(S.String),
          lastSeenAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "SubjectSummary" });
    case 1:
      return S.Array(__S(40, __c5, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ subjects: S.optional(__S(41, __c5, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSubjectsResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpQuery("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/ListTagsForResource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(145, __c18, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(188, __c23, 4));
    case 1:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), trustAnchors: S.optional(__S(56, __c7, 0)) }),
      ).annotate({ identifier: "ListTrustAnchorsResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          profileId: S.String.pipe(T.HttpLabel("profileId")),
          certificateField: S.String,
          mappingRules: __S(154, __c19, 2),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/profiles/{profileId}/mappings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutAttributeMappingRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ trustAnchorId: S.String, notificationSettings: __S(177, __c22, 1) }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/put-notifications-settings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutNotificationSettingsRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ event: S.String, channel: S.optional(S.String) })).annotate(
        { identifier: "NotificationSettingKey" },
      );
    case 1:
      return S.Array(__S(80, __c10, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ trustAnchorId: S.String, notificationSettingKeys: __S(81, __c10, 1) }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/reset-notifications-settings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ResetNotificationSettingsRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tags: __S(145, __c18, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/TagResource" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.Array(SensitiveString);
    case 1:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tagKeys: __S(104, __c13, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/UntagResource" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          crlId: S.String.pipe(T.HttpLabel("crlId")),
          name: S.optional(S.String),
          crlData: S.optional(T.Blob),
        }).pipe(
          T.all(T.Http({ method: "PATCH", uri: "/crl/{crlId}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateCrlRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          profileId: S.String.pipe(T.HttpLabel("profileId")),
          name: S.optional(S.String),
          sessionPolicy: S.optional(S.String),
          roleArns: S.optional(__S(152, __c19, 0)),
          managedPolicyArns: S.optional(__S(152, __c19, 0)),
          durationSeconds: S.optional(S.Number),
          acceptRoleSessionName: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/profile/{profileId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateProfileRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          trustAnchorId: S.String.pipe(T.HttpLabel("trustAnchorId")),
          name: S.optional(S.String),
          source: S.optional(__S(185, __c23, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/trustanchor/{trustAnchorId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateTrustAnchorRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          requireInstanceProperties: S.optional(S.Boolean),
          sessionPolicy: S.optional(S.String),
          roleArns: __S(152, __c19, 0),
          managedPolicyArns: S.optional(__S(152, __c19, 0)),
          durationSeconds: S.optional(S.Number),
          enabled: S.optional(S.Boolean),
          tags: S.optional(__S(145, __c18, 1)),
          acceptRoleSessionName: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/profiles" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateProfileRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: SensitiveString, value: SensitiveString })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(144, __c18, 0));
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() => S.Struct({ specifier: S.String })).annotate({
        identifier: "MappingRule",
      });
    case 2:
      return S.Array(__S(153, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          certificateField: S.optional(S.String),
          mappingRules: S.optional(__S(154, __c19, 2)),
        }),
      ).annotate({ identifier: "AttributeMapping" });
    case 4:
      return S.Array(__S(155, __c19, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          profileId: S.optional(S.String),
          profileArn: S.optional(S.String),
          name: S.optional(S.String),
          requireInstanceProperties: S.optional(S.Boolean),
          enabled: S.optional(S.Boolean),
          createdBy: S.optional(S.String),
          sessionPolicy: S.optional(S.String),
          roleArns: S.optional(__S(152, __c19, 0)),
          managedPolicyArns: S.optional(__S(152, __c19, 0)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          durationSeconds: S.optional(S.Number),
          acceptRoleSessionName: S.optional(S.Boolean),
          attributeMappings: S.optional(__S(156, __c19, 4)),
        }),
      ).annotate({ identifier: "ProfileDetail" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ profile: S.optional(__S(157, __c19, 5)) })).annotate({
        identifier: "ProfileDetailResponse",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          source: __S(185, __c23, 1),
          enabled: S.optional(S.Boolean),
          tags: S.optional(__S(145, __c18, 1)),
          notificationSettings: S.optional(__S(177, __c22, 1)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/trustanchors" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateTrustAnchorRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          enabled: S.Boolean,
          event: S.String,
          threshold: S.optional(S.Number),
          channel: S.optional(S.String),
        }),
      ).annotate({ identifier: "NotificationSetting" });
    case 1:
      return S.Array(__S(176, __c22, 0));
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ x509CertificateData: S.String }),
        /*@__PURE__*/ S.Struct({ acmPcaArn: S.String }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({ sourceType: S.optional(S.String), sourceData: S.optional(__S(184, __c23, 0)) }),
      ).annotate({ identifier: "Source" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          enabled: S.Boolean,
          event: S.String,
          threshold: S.optional(S.Number),
          channel: S.optional(S.String),
          configuredBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "NotificationSettingDetail" });
    case 3:
      return S.Array(__S(186, __c23, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          trustAnchorId: S.optional(S.String),
          trustAnchorArn: S.optional(S.String),
          name: S.optional(S.String),
          source: S.optional(__S(185, __c23, 1)),
          enabled: S.optional(S.Boolean),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          notificationSettings: S.optional(__S(187, __c23, 3)),
        }),
      ).annotate({ identifier: "TrustAnchorDetail" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ trustAnchor: __S(188, __c23, 4) })).annotate({
        identifier: "TrustAnchorDetailResponse",
      });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          profileId: S.String.pipe(T.HttpLabel("profileId")),
          certificateField: S.String.pipe(T.HttpQuery("certificateField")),
          specifiers: S.optional(__S(152, __c19, 0)).pipe(T.HttpQuery("specifiers")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/profiles/{profileId}/mappings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAttributeMappingRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ profile: __S(157, __c19, 5) })).annotate({
        identifier: "DeleteAttributeMappingResponse",
      });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ crlId: S.String.pipe(T.HttpLabel("crlId")) }).pipe(
          T.all(T.Http({ method: "DELETE", uri: "/crl/{crlId}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ScalarCrlRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          crlId: S.optional(S.String),
          crlArn: S.optional(S.String),
          name: S.optional(S.String),
          enabled: S.optional(S.Boolean),
          crlData: S.optional(T.Blob),
          trustAnchorArn: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CrlDetail" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ crl: __S(224, __c28, 0) })).annotate({
        identifier: "CrlDetailResponse",
      });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ profileId: S.String.pipe(T.HttpLabel("profileId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/profile/{profileId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ScalarProfileRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ trustAnchorId: S.String.pipe(T.HttpLabel("trustAnchorId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/trustanchor/{trustAnchorId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ScalarTrustAnchorRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
