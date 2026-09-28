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
  sdkId: "WorkSpaces Web",
  target: "AWSErmineControlPlaneService",
  version: "2020-07-08",
  sigv4: "workspaces-web",
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
                `https://workspaces-web-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://workspaces-web-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://workspaces-web.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://workspaces-web.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{
    readonly message?: string;
    readonly resourceId?: string;
    readonly resourceType?: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message?: string; readonly retryAfterSeconds?: number }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message?: string;
    readonly resourceId?: string;
    readonly resourceType?: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message?: string;
    readonly resourceId?: string;
    readonly resourceType?: string;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{
    readonly message?: string;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
    readonly retryAfterSeconds?: number;
  }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly resourceName?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message?: string;
    readonly reason?: string;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
export type ARN = string;
export interface AssociateBrowserSettingsRequest {
  portalArn: string;
  browserSettingsArn: string;
}
export interface AssociateBrowserSettingsResponse {
  portalArn: string;
  browserSettingsArn: string;
}
export interface AssociateDataProtectionSettingsRequest {
  portalArn: string;
  dataProtectionSettingsArn: string;
}
export interface AssociateDataProtectionSettingsResponse {
  portalArn: string;
  dataProtectionSettingsArn: string;
}
export interface AssociateIpAccessSettingsRequest {
  portalArn: string;
  ipAccessSettingsArn: string;
}
export interface AssociateIpAccessSettingsResponse {
  portalArn: string;
  ipAccessSettingsArn: string;
}
export interface AssociateNetworkSettingsRequest {
  portalArn: string;
  networkSettingsArn: string;
}
export interface AssociateNetworkSettingsResponse {
  portalArn: string;
  networkSettingsArn: string;
}
export interface AssociateSessionLoggerRequest {
  portalArn: string;
  sessionLoggerArn: string;
}
export interface AssociateSessionLoggerResponse {
  portalArn: string;
  sessionLoggerArn: string;
}
export interface AssociateTrustStoreRequest {
  portalArn: string;
  trustStoreArn: string;
}
export interface AssociateTrustStoreResponse {
  portalArn: string;
  trustStoreArn: string;
}
export interface AssociateUserAccessLoggingSettingsRequest {
  portalArn: string;
  userAccessLoggingSettingsArn: string;
}
export interface AssociateUserAccessLoggingSettingsResponse {
  portalArn: string;
  userAccessLoggingSettingsArn: string;
}
export interface AssociateUserSettingsRequest {
  portalArn: string;
  userSettingsArn: string;
}
export interface AssociateUserSettingsResponse {
  portalArn: string;
  userSettingsArn: string;
}
export type TagKey = string | redacted.Redacted<string>;
export type TagValue = string | redacted.Redacted<string>;
export interface Tag {
  Key: string | redacted.Redacted<string>;
  Value: string | redacted.Redacted<string>;
}
export type TagList = Tag[];
export type KeyArn = string;
export type StringType = string;
export type EncryptionContextMap = { [key: string]: string | undefined };
export type BrowserPolicy = string | redacted.Redacted<string>;
export type ClientToken = string;
export type Category =
  | "Cults"
  | "Gambling"
  | "Nudity"
  | "Pornography"
  | "SexEducation"
  | "Tasteless"
  | "Violence"
  | "DownloadSites"
  | "ImageSharing"
  | "PeerToPeer"
  | "StreamingMediaAndDownloads"
  | "GenerativeAI"
  | "CriminalActivity"
  | "Hacking"
  | "HateAndIntolerance"
  | "IllegalDrug"
  | "IllegalSoftware"
  | "SchoolCheating"
  | "SelfHarm"
  | "Weapons"
  | "Chat"
  | "Games"
  | "InstantMessaging"
  | "ProfessionalNetwork"
  | "SocialNetworking"
  | "WebBasedEmail"
  | "ParkedDomains"
  | (string & {});
export type BlockedCategories = Category[];
export type UrlPattern = string | redacted.Redacted<string>;
export type UrlPatternList = (string | redacted.Redacted<string>)[];
export interface WebContentFilteringPolicy {
  blockedCategories?: Category[];
  allowedUrls?: (string | redacted.Redacted<string>)[];
  blockedUrls?: (string | redacted.Redacted<string>)[];
}
export interface CreateBrowserSettingsRequest {
  tags?: Tag[];
  customerManagedKey?: string;
  additionalEncryptionContext?: { [key: string]: string | undefined };
  browserPolicy?: string | redacted.Redacted<string>;
  clientToken?: string;
  webContentFilteringPolicy?: WebContentFilteringPolicy;
}
export interface CreateBrowserSettingsResponse {
  browserSettingsArn: string;
}
export type DisplayNameSafe = string | redacted.Redacted<string>;
export type DescriptionSafe = string | redacted.Redacted<string>;
export type BuiltInPatternId = string | redacted.Redacted<string>;
export type PatternName = string | redacted.Redacted<string>;
export type Regex = string | redacted.Redacted<string>;
export interface CustomPattern {
  patternName: string | redacted.Redacted<string>;
  patternRegex: string | redacted.Redacted<string>;
  patternDescription?: string | redacted.Redacted<string>;
  keywordRegex?: string | redacted.Redacted<string>;
}
export type RedactionPlaceHolderType = string;
export type RedactionPlaceHolderText = string | redacted.Redacted<string>;
export interface RedactionPlaceHolder {
  redactionPlaceHolderType: string;
  redactionPlaceHolderText?: string | redacted.Redacted<string>;
}
export type InlineRedactionUrl = string | redacted.Redacted<string>;
export type InlineRedactionUrls = (string | redacted.Redacted<string>)[];
export type ConfidenceLevel = number;
export interface InlineRedactionPattern {
  builtInPatternId?: string | redacted.Redacted<string>;
  customPattern?: CustomPattern;
  redactionPlaceHolder: RedactionPlaceHolder;
  enforcedUrls?: (string | redacted.Redacted<string>)[];
  exemptUrls?: (string | redacted.Redacted<string>)[];
  confidenceLevel?: number;
}
export type InlineRedactionPatterns = InlineRedactionPattern[];
export type GlobalInlineRedactionUrls = (string | redacted.Redacted<string>)[];
export interface InlineRedactionConfiguration {
  inlineRedactionPatterns: InlineRedactionPattern[];
  globalEnforcedUrls?: (string | redacted.Redacted<string>)[];
  globalExemptUrls?: (string | redacted.Redacted<string>)[];
  globalConfidenceLevel?: number;
}
export interface CreateDataProtectionSettingsRequest {
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  tags?: Tag[];
  customerManagedKey?: string;
  additionalEncryptionContext?: { [key: string]: string | undefined };
  inlineRedactionConfiguration?: InlineRedactionConfiguration;
  clientToken?: string;
}
export interface CreateDataProtectionSettingsResponse {
  dataProtectionSettingsArn: string;
}
export type IdentityProviderName = string | redacted.Redacted<string>;
export type IdentityProviderType = string;
export type IdentityProviderDetails = { [key: string]: string | undefined };
export interface CreateIdentityProviderRequest {
  portalArn: string;
  identityProviderName: string | redacted.Redacted<string>;
  identityProviderType: string;
  identityProviderDetails: { [key: string]: string | undefined };
  clientToken?: string;
  tags?: Tag[];
}
export type SubresourceARN = string;
export interface CreateIdentityProviderResponse {
  identityProviderArn: string;
}
export type DisplayName = string | redacted.Redacted<string>;
export type Description = string | redacted.Redacted<string>;
export type IpRange = string | redacted.Redacted<string>;
export interface IpRule {
  ipRange: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
}
export type IpRuleList = IpRule[];
export interface CreateIpAccessSettingsRequest {
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  tags?: Tag[];
  customerManagedKey?: string;
  additionalEncryptionContext?: { [key: string]: string | undefined };
  ipRules: IpRule[];
  clientToken?: string;
}
export interface CreateIpAccessSettingsResponse {
  ipAccessSettingsArn: string;
}
export type VpcId = string;
export type SubnetId = string;
export type SubnetIdList = string[];
export type SecurityGroupId = string;
export type SecurityGroupIdList = string[];
export interface CreateNetworkSettingsRequest {
  vpcId: string;
  subnetIds: string[];
  securityGroupIds: string[];
  tags?: Tag[];
  clientToken?: string;
}
export interface CreateNetworkSettingsResponse {
  networkSettingsArn: string;
}
export type AuthenticationType = string;
export type InstanceType = string;
export type MaxConcurrentSessions = number;
export type PortalCustomDomain = string;
export interface CreatePortalRequest {
  displayName?: string | redacted.Redacted<string>;
  tags?: Tag[];
  customerManagedKey?: string;
  additionalEncryptionContext?: { [key: string]: string | undefined };
  clientToken?: string;
  authenticationType?: string;
  instanceType?: string;
  maxConcurrentSessions?: number;
  portalCustomDomain?: string;
}
export type PortalEndpoint = string;
export interface CreatePortalResponse {
  portalArn: string;
  portalEndpoint: string;
}
export type Event =
  | "WebsiteInteract"
  | "FileDownloadFromSecureBrowserToRemoteDisk"
  | "FileTransferFromRemoteToLocalDisk"
  | "FileTransferFromLocalToRemoteDisk"
  | "FileUploadFromRemoteDiskToSecureBrowser"
  | "ContentPasteToWebsite"
  | "ContentTransferFromLocalToRemoteClipboard"
  | "ContentCopyFromWebsite"
  | "UrlLoad"
  | "TabOpen"
  | "TabClose"
  | "PrintJobSubmit"
  | "SessionConnect"
  | "SessionStart"
  | "SessionDisconnect"
  | "SessionEnd"
  | "UrlBlockByContentFilter"
  | (string & {});
export type Events = Event[];
export type EventFilter =
  | { all: Record<string, never>; include?: never }
  | { all?: never; include: Event[] };
export type S3Bucket = string | redacted.Redacted<string>;
export type S3KeyPrefix = string | redacted.Redacted<string>;
export type S3BucketOwner = string;
export type LogFileFormat = "JSONLines" | "Json" | (string & {});
export type FolderStructure = "Flat" | "NestedByDate" | (string & {});
export interface S3LogConfiguration {
  bucket: string | redacted.Redacted<string>;
  keyPrefix?: string | redacted.Redacted<string>;
  bucketOwner?: string;
  logFileFormat: LogFileFormat;
  folderStructure: FolderStructure;
}
export interface LogConfiguration {
  s3?: S3LogConfiguration;
}
export interface CreateSessionLoggerRequest {
  eventFilter: EventFilter;
  logConfiguration: LogConfiguration;
  displayName?: string | redacted.Redacted<string>;
  customerManagedKey?: string;
  additionalEncryptionContext?: { [key: string]: string | undefined };
  tags?: Tag[];
  clientToken?: string;
}
export interface CreateSessionLoggerResponse {
  sessionLoggerArn: string;
}
export type CertificateAuthorityBody = Uint8Array;
export type CertificateList = Uint8Array[];
export interface CreateTrustStoreRequest {
  certificateList: Uint8Array[];
  tags?: Tag[];
  clientToken?: string;
}
export interface CreateTrustStoreResponse {
  trustStoreArn: string;
}
export type KinesisStreamArn = string;
export interface CreateUserAccessLoggingSettingsRequest {
  kinesisStreamArn: string;
  tags?: Tag[];
  clientToken?: string;
}
export interface CreateUserAccessLoggingSettingsResponse {
  userAccessLoggingSettingsArn: string;
}
export type EnabledType = string;
export type DisconnectTimeoutInMinutes = number;
export type IdleDisconnectTimeoutInMinutes = number;
export type CookieDomain = string | redacted.Redacted<string>;
export type CookieName = string | redacted.Redacted<string>;
export type CookiePath = string | redacted.Redacted<string>;
export interface CookieSpecification {
  domain: string | redacted.Redacted<string>;
  name?: string | redacted.Redacted<string>;
  path?: string | redacted.Redacted<string>;
}
export type CookieSpecifications = CookieSpecification[];
export interface CookieSynchronizationConfiguration {
  allowlist: CookieSpecification[];
  blocklist?: CookieSpecification[];
}
export type ToolbarType = string;
export type VisualMode = string;
export type ToolbarItem = string;
export type HiddenToolbarItemList = string[];
export type MaxDisplayResolution = string;
export interface ToolbarConfiguration {
  toolbarType?: string;
  visualMode?: string;
  hiddenToolbarItems?: string[];
  maxDisplayResolution?: string;
}
export type IconImage = Uint8Array;
export type S3Uri = string;
export type IconImageInput =
  | { blob: Uint8Array; s3Uri?: never }
  | { blob?: never; s3Uri: string };
export type WallpaperImage = Uint8Array;
export type WallpaperImageInput =
  | { blob: Uint8Array; s3Uri?: never }
  | { blob?: never; s3Uri: string };
export type Locale =
  | "de-DE"
  | "en-US"
  | "es-ES"
  | "fr-FR"
  | "id-ID"
  | "it-IT"
  | "ja-JP"
  | "ko-KR"
  | "pt-BR"
  | "zh-CN"
  | "zh-TW"
  | (string & {});
export type BrandingSafeStringType = string;
export type ContactLinkUrl = string;
export interface LocalizedBrandingStrings {
  browserTabTitle: string;
  welcomeText: string;
  loginTitle?: string;
  loginDescription?: string;
  loginButtonText?: string;
  contactLink?: string;
  contactButtonText?: string;
  loadingText?: string;
}
export type LocalizedBrandingStringMap = {
  [key in Locale]?: LocalizedBrandingStrings;
};
export type ColorTheme = "Light" | "Dark" | (string & {});
export type Markdown = string | redacted.Redacted<string>;
export interface BrandingConfigurationCreateInput {
  logo: IconImageInput;
  wallpaper?: WallpaperImageInput;
  favicon: IconImageInput;
  localizedStrings: { [key: string]: LocalizedBrandingStrings | undefined };
  colorTheme: ColorTheme;
  termsOfService?: string | redacted.Redacted<string>;
}
export interface CreateUserSettingsRequest {
  copyAllowed: string;
  pasteAllowed: string;
  downloadAllowed: string;
  uploadAllowed: string;
  printAllowed: string;
  tags?: Tag[];
  disconnectTimeoutInMinutes?: number;
  idleDisconnectTimeoutInMinutes?: number;
  clientToken?: string;
  cookieSynchronizationConfiguration?: CookieSynchronizationConfiguration;
  customerManagedKey?: string;
  additionalEncryptionContext?: { [key: string]: string | undefined };
  deepLinkAllowed?: string;
  toolbarConfiguration?: ToolbarConfiguration;
  brandingConfigurationInput?: BrandingConfigurationCreateInput;
  webAuthnAllowed?: string;
}
export interface CreateUserSettingsResponse {
  userSettingsArn: string;
}
export interface DeleteBrowserSettingsRequest {
  browserSettingsArn: string;
}
export interface DeleteBrowserSettingsResponse {}
export interface DeleteDataProtectionSettingsRequest {
  dataProtectionSettingsArn: string;
}
export interface DeleteDataProtectionSettingsResponse {}
export interface DeleteIdentityProviderRequest {
  identityProviderArn: string;
}
export interface DeleteIdentityProviderResponse {}
export interface DeleteIpAccessSettingsRequest {
  ipAccessSettingsArn: string;
}
export interface DeleteIpAccessSettingsResponse {}
export interface DeleteNetworkSettingsRequest {
  networkSettingsArn: string;
}
export interface DeleteNetworkSettingsResponse {}
export interface DeletePortalRequest {
  portalArn: string;
}
export interface DeletePortalResponse {}
export interface DeleteSessionLoggerRequest {
  sessionLoggerArn: string;
}
export interface DeleteSessionLoggerResponse {}
export interface DeleteTrustStoreRequest {
  trustStoreArn: string;
}
export interface DeleteTrustStoreResponse {}
export interface DeleteUserAccessLoggingSettingsRequest {
  userAccessLoggingSettingsArn: string;
}
export interface DeleteUserAccessLoggingSettingsResponse {}
export interface DeleteUserSettingsRequest {
  userSettingsArn: string;
}
export interface DeleteUserSettingsResponse {}
export interface DisassociateBrowserSettingsRequest {
  portalArn: string;
}
export interface DisassociateBrowserSettingsResponse {}
export interface DisassociateDataProtectionSettingsRequest {
  portalArn: string;
}
export interface DisassociateDataProtectionSettingsResponse {}
export interface DisassociateIpAccessSettingsRequest {
  portalArn: string;
}
export interface DisassociateIpAccessSettingsResponse {}
export interface DisassociateNetworkSettingsRequest {
  portalArn: string;
}
export interface DisassociateNetworkSettingsResponse {}
export interface DisassociateSessionLoggerRequest {
  portalArn: string;
}
export interface DisassociateSessionLoggerResponse {}
export interface DisassociateTrustStoreRequest {
  portalArn: string;
}
export interface DisassociateTrustStoreResponse {}
export interface DisassociateUserAccessLoggingSettingsRequest {
  portalArn: string;
}
export interface DisassociateUserAccessLoggingSettingsResponse {}
export interface DisassociateUserSettingsRequest {
  portalArn: string;
}
export interface DisassociateUserSettingsResponse {}
export type PortalId = string;
export type SessionId = string;
export interface ExpireSessionRequest {
  portalId: string;
  sessionId: string;
}
export interface ExpireSessionResponse {}
export interface GetBrowserSettingsRequest {
  browserSettingsArn: string;
}
export type ArnList = string[];
export interface BrowserSettings {
  browserSettingsArn: string;
  associatedPortalArns?: string[];
  browserPolicy?: string | redacted.Redacted<string>;
  customerManagedKey?: string;
  additionalEncryptionContext?: { [key: string]: string | undefined };
  webContentFilteringPolicy?: WebContentFilteringPolicy;
}
export interface GetBrowserSettingsResponse {
  browserSettings?: BrowserSettings;
}
export interface GetDataProtectionSettingsRequest {
  dataProtectionSettingsArn: string;
}
export interface DataProtectionSettings {
  dataProtectionSettingsArn: string;
  inlineRedactionConfiguration?: InlineRedactionConfiguration;
  associatedPortalArns?: string[];
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  creationDate?: Date;
  customerManagedKey?: string;
  additionalEncryptionContext?: { [key: string]: string | undefined };
}
export interface GetDataProtectionSettingsResponse {
  dataProtectionSettings?: DataProtectionSettings;
}
export interface GetIdentityProviderRequest {
  identityProviderArn: string;
}
export interface IdentityProvider {
  identityProviderArn: string;
  identityProviderName?: string | redacted.Redacted<string>;
  identityProviderType?: string;
  identityProviderDetails?: { [key: string]: string | undefined };
}
export interface GetIdentityProviderResponse {
  identityProvider?: IdentityProvider;
}
export interface GetIpAccessSettingsRequest {
  ipAccessSettingsArn: string;
}
export interface IpAccessSettings {
  ipAccessSettingsArn: string;
  associatedPortalArns?: string[];
  ipRules?: IpRule[];
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  creationDate?: Date;
  customerManagedKey?: string;
  additionalEncryptionContext?: { [key: string]: string | undefined };
}
export interface GetIpAccessSettingsResponse {
  ipAccessSettings?: IpAccessSettings;
}
export interface GetNetworkSettingsRequest {
  networkSettingsArn: string;
}
export interface NetworkSettings {
  networkSettingsArn: string;
  associatedPortalArns?: string[];
  vpcId?: string;
  subnetIds?: string[];
  securityGroupIds?: string[];
}
export interface GetNetworkSettingsResponse {
  networkSettings?: NetworkSettings;
}
export interface GetPortalRequest {
  portalArn: string;
}
export type RendererType = string;
export type BrowserType = string;
export type PortalStatus = string;
export type StatusReason = string;
export interface Portal {
  portalArn: string;
  rendererType?: string;
  browserType?: string;
  portalStatus?: string;
  portalEndpoint?: string;
  displayName?: string | redacted.Redacted<string>;
  creationDate?: Date;
  browserSettingsArn?: string;
  dataProtectionSettingsArn?: string;
  userSettingsArn?: string;
  networkSettingsArn?: string;
  sessionLoggerArn?: string;
  trustStoreArn?: string;
  statusReason?: string;
  userAccessLoggingSettingsArn?: string;
  authenticationType?: string;
  ipAccessSettingsArn?: string;
  customerManagedKey?: string;
  additionalEncryptionContext?: { [key: string]: string | undefined };
  instanceType?: string;
  maxConcurrentSessions?: number;
  portalCustomDomain?: string;
}
export interface GetPortalResponse {
  portal?: Portal;
}
export interface GetPortalServiceProviderMetadataRequest {
  portalArn: string;
}
export type SamlMetadata = string;
export interface GetPortalServiceProviderMetadataResponse {
  portalArn: string;
  serviceProviderSamlMetadata?: string;
}
export interface GetSessionRequest {
  portalId: string;
  sessionId: string;
}
export type Username = string | redacted.Redacted<string>;
export type IpAddress = string | redacted.Redacted<string>;
export type IpAddressList = (string | redacted.Redacted<string>)[];
export type SessionStatus = "Active" | "Terminated" | (string & {});
export interface Session {
  portalArn?: string;
  sessionId?: string;
  username?: string | redacted.Redacted<string>;
  clientIpAddresses?: (string | redacted.Redacted<string>)[];
  status?: SessionStatus;
  startTime?: Date;
  endTime?: Date;
}
export interface GetSessionResponse {
  session?: Session;
}
export interface GetSessionLoggerRequest {
  sessionLoggerArn: string;
}
export interface SessionLogger {
  sessionLoggerArn: string;
  eventFilter?: EventFilter;
  logConfiguration?: LogConfiguration;
  customerManagedKey?: string;
  additionalEncryptionContext?: { [key: string]: string | undefined };
  associatedPortalArns?: string[];
  displayName?: string | redacted.Redacted<string>;
  creationDate?: Date;
}
export interface GetSessionLoggerResponse {
  sessionLogger?: SessionLogger;
}
export interface GetTrustStoreRequest {
  trustStoreArn: string;
}
export interface TrustStore {
  associatedPortalArns?: string[];
  trustStoreArn: string;
}
export interface GetTrustStoreResponse {
  trustStore?: TrustStore;
}
export type CertificateThumbprint = string;
export interface GetTrustStoreCertificateRequest {
  trustStoreArn: string;
  thumbprint: string;
}
export type CertificatePrincipal = string;
export interface Certificate {
  thumbprint?: string;
  subject?: string;
  issuer?: string;
  notValidBefore?: Date;
  notValidAfter?: Date;
  body?: Uint8Array;
}
export interface GetTrustStoreCertificateResponse {
  trustStoreArn: string;
  certificate?: Certificate;
}
export interface GetUserAccessLoggingSettingsRequest {
  userAccessLoggingSettingsArn: string;
}
export interface UserAccessLoggingSettings {
  userAccessLoggingSettingsArn: string;
  associatedPortalArns?: string[];
  kinesisStreamArn?: string;
}
export interface GetUserAccessLoggingSettingsResponse {
  userAccessLoggingSettings?: UserAccessLoggingSettings;
}
export interface GetUserSettingsRequest {
  userSettingsArn: string;
}
export type MimeType =
  | "image/png"
  | "image/jpeg"
  | "image/x-icon"
  | (string & {});
export interface ImageMetadata {
  mimeType: MimeType;
  fileExtension: string;
  lastUploadTimestamp: Date;
}
export interface BrandingConfiguration {
  logo: ImageMetadata;
  wallpaper?: ImageMetadata;
  favicon: ImageMetadata;
  localizedStrings: { [key: string]: LocalizedBrandingStrings | undefined };
  colorTheme: ColorTheme;
  termsOfService?: string | redacted.Redacted<string>;
}
export interface UserSettings {
  userSettingsArn: string;
  associatedPortalArns?: string[];
  copyAllowed?: string;
  pasteAllowed?: string;
  downloadAllowed?: string;
  uploadAllowed?: string;
  printAllowed?: string;
  disconnectTimeoutInMinutes?: number;
  idleDisconnectTimeoutInMinutes?: number;
  cookieSynchronizationConfiguration?: CookieSynchronizationConfiguration;
  customerManagedKey?: string;
  additionalEncryptionContext?: { [key: string]: string | undefined };
  deepLinkAllowed?: string;
  toolbarConfiguration?: ToolbarConfiguration;
  brandingConfiguration?: BrandingConfiguration;
  webAuthnAllowed?: string;
}
export interface GetUserSettingsResponse {
  userSettings?: UserSettings;
}
export type PaginationToken = string;
export type MaxResults = number;
export interface ListBrowserSettingsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface BrowserSettingsSummary {
  browserSettingsArn: string;
}
export type BrowserSettingsList = BrowserSettingsSummary[];
export interface ListBrowserSettingsResponse {
  browserSettings?: BrowserSettingsSummary[];
  nextToken?: string;
}
export interface ListDataProtectionSettingsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface DataProtectionSettingsSummary {
  dataProtectionSettingsArn: string;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  creationDate?: Date;
}
export type DataProtectionSettingsList = DataProtectionSettingsSummary[];
export interface ListDataProtectionSettingsResponse {
  dataProtectionSettings?: DataProtectionSettingsSummary[];
  nextToken?: string;
}
export interface ListIdentityProvidersRequest {
  nextToken?: string;
  maxResults?: number;
  portalArn: string;
}
export interface IdentityProviderSummary {
  identityProviderArn: string;
  identityProviderName?: string | redacted.Redacted<string>;
  identityProviderType?: string;
}
export type IdentityProviderList = IdentityProviderSummary[];
export interface ListIdentityProvidersResponse {
  nextToken?: string;
  identityProviders?: IdentityProviderSummary[];
}
export interface ListIpAccessSettingsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface IpAccessSettingsSummary {
  ipAccessSettingsArn: string;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  creationDate?: Date;
}
export type IpAccessSettingsList = IpAccessSettingsSummary[];
export interface ListIpAccessSettingsResponse {
  ipAccessSettings?: IpAccessSettingsSummary[];
  nextToken?: string;
}
export interface ListNetworkSettingsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface NetworkSettingsSummary {
  networkSettingsArn: string;
  vpcId?: string;
}
export type NetworkSettingsList = NetworkSettingsSummary[];
export interface ListNetworkSettingsResponse {
  networkSettings?: NetworkSettingsSummary[];
  nextToken?: string;
}
export interface ListPortalsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface PortalSummary {
  portalArn: string;
  rendererType?: string;
  browserType?: string;
  portalStatus?: string;
  portalEndpoint?: string;
  displayName?: string | redacted.Redacted<string>;
  creationDate?: Date;
  browserSettingsArn?: string;
  dataProtectionSettingsArn?: string;
  userSettingsArn?: string;
  networkSettingsArn?: string;
  sessionLoggerArn?: string;
  trustStoreArn?: string;
  userAccessLoggingSettingsArn?: string;
  authenticationType?: string;
  ipAccessSettingsArn?: string;
  instanceType?: string;
  maxConcurrentSessions?: number;
  portalCustomDomain?: string;
}
export type PortalList = PortalSummary[];
export interface ListPortalsResponse {
  portals?: PortalSummary[];
  nextToken?: string;
}
export interface ListSessionLoggersRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface SessionLoggerSummary {
  sessionLoggerArn: string;
  logConfiguration?: LogConfiguration;
  displayName?: string | redacted.Redacted<string>;
  creationDate?: Date;
}
export type SessionLoggerList = SessionLoggerSummary[];
export interface ListSessionLoggersResponse {
  sessionLoggers?: SessionLoggerSummary[];
  nextToken?: string;
}
export type SessionSortBy =
  | "StartTimeAscending"
  | "StartTimeDescending"
  | (string & {});
export interface ListSessionsRequest {
  portalId: string;
  username?: string | redacted.Redacted<string>;
  sessionId?: string;
  sortBy?: SessionSortBy;
  status?: SessionStatus;
  maxResults?: number;
  nextToken?: string;
}
export interface SessionSummary {
  portalArn?: string;
  sessionId?: string;
  username?: string | redacted.Redacted<string>;
  status?: SessionStatus;
  startTime?: Date;
  endTime?: Date;
}
export type SessionSummaryList = SessionSummary[];
export interface ListSessionsResponse {
  sessions: SessionSummary[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: Tag[];
}
export interface ListTrustStoreCertificatesRequest {
  trustStoreArn: string;
  nextToken?: string;
  maxResults?: number;
}
export interface CertificateSummary {
  thumbprint?: string;
  subject?: string;
  issuer?: string;
  notValidBefore?: Date;
  notValidAfter?: Date;
}
export type CertificateSummaryList = CertificateSummary[];
export interface ListTrustStoreCertificatesResponse {
  certificateList?: CertificateSummary[];
  trustStoreArn: string;
  nextToken?: string;
}
export interface ListTrustStoresRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface TrustStoreSummary {
  trustStoreArn?: string;
}
export type TrustStoreSummaryList = TrustStoreSummary[];
export interface ListTrustStoresResponse {
  trustStores?: TrustStoreSummary[];
  nextToken?: string;
}
export interface ListUserAccessLoggingSettingsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface UserAccessLoggingSettingsSummary {
  userAccessLoggingSettingsArn: string;
  kinesisStreamArn?: string;
}
export type UserAccessLoggingSettingsList = UserAccessLoggingSettingsSummary[];
export interface ListUserAccessLoggingSettingsResponse {
  userAccessLoggingSettings?: UserAccessLoggingSettingsSummary[];
  nextToken?: string;
}
export interface ListUserSettingsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface UserSettingsSummary {
  userSettingsArn: string;
  copyAllowed?: string;
  pasteAllowed?: string;
  downloadAllowed?: string;
  uploadAllowed?: string;
  printAllowed?: string;
  disconnectTimeoutInMinutes?: number;
  idleDisconnectTimeoutInMinutes?: number;
  cookieSynchronizationConfiguration?: CookieSynchronizationConfiguration;
  deepLinkAllowed?: string;
  toolbarConfiguration?: ToolbarConfiguration;
  brandingConfiguration?: BrandingConfiguration;
  webAuthnAllowed?: string;
}
export type UserSettingsList = UserSettingsSummary[];
export interface ListUserSettingsResponse {
  userSettings?: UserSettingsSummary[];
  nextToken?: string;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
  clientToken?: string;
}
export interface TagResourceResponse {}
export type TagKeyList = (string | redacted.Redacted<string>)[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: (string | redacted.Redacted<string>)[];
}
export interface UntagResourceResponse {}
export interface UpdateBrowserSettingsRequest {
  browserSettingsArn: string;
  browserPolicy?: string | redacted.Redacted<string>;
  clientToken?: string;
  webContentFilteringPolicy?: WebContentFilteringPolicy;
}
export interface UpdateBrowserSettingsResponse {
  browserSettings: BrowserSettings;
}
export interface UpdateDataProtectionSettingsRequest {
  dataProtectionSettingsArn: string;
  inlineRedactionConfiguration?: InlineRedactionConfiguration;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  clientToken?: string;
}
export interface UpdateDataProtectionSettingsResponse {
  dataProtectionSettings: DataProtectionSettings;
}
export interface UpdateIdentityProviderRequest {
  identityProviderArn: string;
  identityProviderName?: string | redacted.Redacted<string>;
  identityProviderType?: string;
  identityProviderDetails?: { [key: string]: string | undefined };
  clientToken?: string;
}
export interface UpdateIdentityProviderResponse {
  identityProvider: IdentityProvider;
}
export interface UpdateIpAccessSettingsRequest {
  ipAccessSettingsArn: string;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  ipRules?: IpRule[];
  clientToken?: string;
}
export interface UpdateIpAccessSettingsResponse {
  ipAccessSettings: IpAccessSettings;
}
export interface UpdateNetworkSettingsRequest {
  networkSettingsArn: string;
  vpcId?: string;
  subnetIds?: string[];
  securityGroupIds?: string[];
  clientToken?: string;
}
export interface UpdateNetworkSettingsResponse {
  networkSettings: NetworkSettings;
}
export interface UpdatePortalRequest {
  portalArn: string;
  displayName?: string | redacted.Redacted<string>;
  authenticationType?: string;
  instanceType?: string;
  maxConcurrentSessions?: number;
  portalCustomDomain?: string;
}
export interface UpdatePortalResponse {
  portal?: Portal;
}
export interface UpdateSessionLoggerRequest {
  sessionLoggerArn: string;
  eventFilter?: EventFilter;
  logConfiguration?: LogConfiguration;
  displayName?: string | redacted.Redacted<string>;
}
export interface UpdateSessionLoggerResponse {
  sessionLogger: SessionLogger;
}
export type CertificateThumbprintList = string[];
export interface UpdateTrustStoreRequest {
  trustStoreArn: string;
  certificatesToAdd?: Uint8Array[];
  certificatesToDelete?: string[];
  clientToken?: string;
}
export interface UpdateTrustStoreResponse {
  trustStoreArn: string;
}
export interface UpdateUserAccessLoggingSettingsRequest {
  userAccessLoggingSettingsArn: string;
  kinesisStreamArn?: string;
  clientToken?: string;
}
export interface UpdateUserAccessLoggingSettingsResponse {
  userAccessLoggingSettings: UserAccessLoggingSettings;
}
export interface BrandingConfigurationUpdateInput {
  logo?: IconImageInput;
  wallpaper?: WallpaperImageInput;
  favicon?: IconImageInput;
  localizedStrings?: { [key: string]: LocalizedBrandingStrings | undefined };
  colorTheme?: ColorTheme;
  termsOfService?: string | redacted.Redacted<string>;
}
export interface UpdateUserSettingsRequest {
  userSettingsArn: string;
  copyAllowed?: string;
  pasteAllowed?: string;
  downloadAllowed?: string;
  uploadAllowed?: string;
  printAllowed?: string;
  disconnectTimeoutInMinutes?: number;
  idleDisconnectTimeoutInMinutes?: number;
  clientToken?: string;
  cookieSynchronizationConfiguration?: CookieSynchronizationConfiguration;
  deepLinkAllowed?: string;
  toolbarConfiguration?: ToolbarConfiguration;
  brandingConfigurationInput?: BrandingConfigurationUpdateInput;
  webAuthnAllowed?: string;
}
export interface UpdateUserSettingsResponse {
  userSettings: UserSettings;
}
export type ExceptionMessage = string;
export type ResourceId = string;
export type ResourceType = string;
export type RetryAfterSeconds = number;
export type ServiceCode = string;
export type QuotaCode = string;
export type ValidationExceptionReason = string;
export type FieldName = string;
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type TagExceptionMessage = string;
export type AssociateBrowserSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a browser settings resource with a web portal.
 */
export const associateBrowserSettings: API.OperationMethod<
  AssociateBrowserSettingsRequest,
  AssociateBrowserSettingsResponse,
  AssociateBrowserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /portals/{portalArn+}/browserSettings",
    input: {
      portalArn: 0,
      browserSettingsArn: D.m({ query: "browserSettingsArn" }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateBrowserSettings",
})) as any;

export type AssociateDataProtectionSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a data protection settings resource with a web portal.
 */
export const associateDataProtectionSettings: API.OperationMethod<
  AssociateDataProtectionSettingsRequest,
  AssociateDataProtectionSettingsResponse,
  AssociateDataProtectionSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /portals/{portalArn+}/dataProtectionSettings",
    input: {
      portalArn: 0,
      dataProtectionSettingsArn: D.m({ query: "dataProtectionSettingsArn" }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateDataProtectionSettings",
})) as any;

export type AssociateIpAccessSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates an IP access settings resource with a web portal.
 */
export const associateIpAccessSettings: API.OperationMethod<
  AssociateIpAccessSettingsRequest,
  AssociateIpAccessSettingsResponse,
  AssociateIpAccessSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /portals/{portalArn+}/ipAccessSettings",
    input: {
      portalArn: 0,
      ipAccessSettingsArn: D.m({ query: "ipAccessSettingsArn" }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateIpAccessSettings",
})) as any;

export type AssociateNetworkSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a network settings resource with a web portal.
 */
export const associateNetworkSettings: API.OperationMethod<
  AssociateNetworkSettingsRequest,
  AssociateNetworkSettingsResponse,
  AssociateNetworkSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /portals/{portalArn+}/networkSettings",
    input: {
      portalArn: 0,
      networkSettingsArn: D.m({ query: "networkSettingsArn" }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateNetworkSettings",
})) as any;

export type AssociateSessionLoggerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a session logger with a portal.
 */
export const associateSessionLogger: API.OperationMethod<
  AssociateSessionLoggerRequest,
  AssociateSessionLoggerResponse,
  AssociateSessionLoggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /portals/{portalArn+}/sessionLogger",
    input: {
      portalArn: 0,
      sessionLoggerArn: D.m({ query: "sessionLoggerArn" }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateSessionLogger",
})) as any;

export type AssociateTrustStoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a trust store with a web portal.
 */
export const associateTrustStore: API.OperationMethod<
  AssociateTrustStoreRequest,
  AssociateTrustStoreResponse,
  AssociateTrustStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /portals/{portalArn+}/trustStores",
    input: { portalArn: 0, trustStoreArn: D.m({ query: "trustStoreArn" }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateTrustStore",
})) as any;

export type AssociateUserAccessLoggingSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a user access logging settings resource with a web portal.
 */
export const associateUserAccessLoggingSettings: API.OperationMethod<
  AssociateUserAccessLoggingSettingsRequest,
  AssociateUserAccessLoggingSettingsResponse,
  AssociateUserAccessLoggingSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /portals/{portalArn+}/userAccessLoggingSettings",
    input: {
      portalArn: 0,
      userAccessLoggingSettingsArn: D.m({
        query: "userAccessLoggingSettingsArn",
      }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateUserAccessLoggingSettings",
})) as any;

export type AssociateUserSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a user settings resource with a web portal.
 */
export const associateUserSettings: API.OperationMethod<
  AssociateUserSettingsRequest,
  AssociateUserSettingsResponse,
  AssociateUserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /portals/{portalArn+}/userSettings",
    input: { portalArn: 0, userSettingsArn: D.m({ query: "userSettingsArn" }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateUserSettings",
})) as any;

export type CreateBrowserSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a browser settings resource that can be associated with a web portal. Once associated with a web portal, browser settings control how the browser will behave once a user starts a streaming session for the web portal.
 */
export const createBrowserSettings: API.OperationMethod<
  CreateBrowserSettingsRequest,
  CreateBrowserSettingsResponse,
  CreateBrowserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /browserSettings",
    input: {
      tags: D.list(i_Tag),
      customerManagedKey: 0,
      additionalEncryptionContext: 0,
      browserPolicy: 0,
      clientToken: D.m({ idempotency: true }),
      webContentFilteringPolicy: i_WebContentFilteringPolicy,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBrowserSettings",
})) as any;

export type CreateDataProtectionSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a data protection settings resource that can be associated with a web portal.
 */
export const createDataProtectionSettings: API.OperationMethod<
  CreateDataProtectionSettingsRequest,
  CreateDataProtectionSettingsResponse,
  CreateDataProtectionSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /dataProtectionSettings",
    input: {
      displayName: 0,
      description: 0,
      tags: D.list(i_Tag),
      customerManagedKey: 0,
      additionalEncryptionContext: 0,
      inlineRedactionConfiguration: i_InlineRedactionConfiguration,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataProtectionSettings",
})) as any;

export type CreateIdentityProviderError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an identity provider resource that is then associated with a web portal.
 */
export const createIdentityProvider: API.OperationMethod<
  CreateIdentityProviderRequest,
  CreateIdentityProviderResponse,
  CreateIdentityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /identityProviders",
    input: {
      portalArn: 0,
      identityProviderName: 0,
      identityProviderType: 0,
      identityProviderDetails: 0,
      clientToken: D.m({ idempotency: true }),
      tags: D.list(i_Tag),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIdentityProvider",
})) as any;

export type CreateIpAccessSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an IP access settings resource that can be associated with a web portal.
 */
export const createIpAccessSettings: API.OperationMethod<
  CreateIpAccessSettingsRequest,
  CreateIpAccessSettingsResponse,
  CreateIpAccessSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /ipAccessSettings",
    input: {
      displayName: 0,
      description: 0,
      tags: D.list(i_Tag),
      customerManagedKey: 0,
      additionalEncryptionContext: 0,
      ipRules: D.list(i_IpRule),
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIpAccessSettings",
})) as any;

export type CreateNetworkSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a network settings resource that can be associated with a web portal. Once associated with a web portal, network settings define how streaming instances will connect with your specified VPC.
 */
export const createNetworkSettings: API.OperationMethod<
  CreateNetworkSettingsRequest,
  CreateNetworkSettingsResponse,
  CreateNetworkSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /networkSettings",
    input: {
      vpcId: 0,
      subnetIds: 0,
      securityGroupIds: 0,
      tags: D.list(i_Tag),
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNetworkSettings",
})) as any;

export type CreatePortalError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a web portal.
 */
export const createPortal: API.OperationMethod<
  CreatePortalRequest,
  CreatePortalResponse,
  CreatePortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /portals",
    input: {
      displayName: 0,
      tags: D.list(i_Tag),
      customerManagedKey: 0,
      additionalEncryptionContext: 0,
      clientToken: D.m({ idempotency: true }),
      authenticationType: 0,
      instanceType: 0,
      maxConcurrentSessions: 0,
      portalCustomDomain: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePortal",
})) as any;

export type CreateSessionLoggerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a session logger.
 */
export const createSessionLogger: API.OperationMethod<
  CreateSessionLoggerRequest,
  CreateSessionLoggerResponse,
  CreateSessionLoggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sessionLoggers",
    input: {
      eventFilter: i_EventFilter,
      logConfiguration: i_LogConfiguration,
      displayName: 0,
      customerManagedKey: 0,
      additionalEncryptionContext: 0,
      tags: D.list(i_Tag),
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSessionLogger",
})) as any;

export type CreateTrustStoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a trust store that can be associated with a web portal. A trust store contains certificate authority (CA) certificates. Once associated with a web portal, the browser in a streaming session will recognize certificates that have been issued using any of the CAs in the trust store. If your organization has internal websites that use certificates issued by private CAs, you should add the private CA certificate to the trust store.
 */
export const createTrustStore: API.OperationMethod<
  CreateTrustStoreRequest,
  CreateTrustStoreResponse,
  CreateTrustStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /trustStores",
    input: {
      certificateList: 0,
      tags: D.list(i_Tag),
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrustStore",
})) as any;

export type CreateUserAccessLoggingSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a user access logging settings resource that can be associated with a web portal.
 */
export const createUserAccessLoggingSettings: API.OperationMethod<
  CreateUserAccessLoggingSettingsRequest,
  CreateUserAccessLoggingSettingsResponse,
  CreateUserAccessLoggingSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /userAccessLoggingSettings",
    input: {
      kinesisStreamArn: 0,
      tags: D.list(i_Tag),
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUserAccessLoggingSettings",
})) as any;

export type CreateUserSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a user settings resource that can be associated with a web portal. Once associated with a web portal, user settings control how users can transfer data between a streaming session and the their local devices.
 */
export const createUserSettings: API.OperationMethod<
  CreateUserSettingsRequest,
  CreateUserSettingsResponse,
  CreateUserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /userSettings",
    input: {
      copyAllowed: 0,
      pasteAllowed: 0,
      downloadAllowed: 0,
      uploadAllowed: 0,
      printAllowed: 0,
      tags: D.list(i_Tag),
      disconnectTimeoutInMinutes: 0,
      idleDisconnectTimeoutInMinutes: 0,
      clientToken: D.m({ idempotency: true }),
      cookieSynchronizationConfiguration: i_CookieSynchronizationConfiguration,
      customerManagedKey: 0,
      additionalEncryptionContext: 0,
      deepLinkAllowed: 0,
      toolbarConfiguration: i_ToolbarConfiguration,
      brandingConfigurationInput: {
        logo: i_IconImageInput,
        wallpaper: i_WallpaperImageInput,
        favicon: i_IconImageInput,
        localizedStrings: D.map(i_LocalizedBrandingStrings),
        colorTheme: 0,
        termsOfService: 0,
      },
      webAuthnAllowed: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUserSettings",
})) as any;

export type DeleteBrowserSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes browser settings.
 */
export const deleteBrowserSettings: API.OperationMethod<
  DeleteBrowserSettingsRequest,
  DeleteBrowserSettingsResponse,
  DeleteBrowserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /browserSettings/{browserSettingsArn+}",
    input: { browserSettingsArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBrowserSettings",
})) as any;

export type DeleteDataProtectionSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes data protection settings.
 */
export const deleteDataProtectionSettings: API.OperationMethod<
  DeleteDataProtectionSettingsRequest,
  DeleteDataProtectionSettingsResponse,
  DeleteDataProtectionSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /dataProtectionSettings/{dataProtectionSettingsArn+}",
    input: { dataProtectionSettingsArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataProtectionSettings",
})) as any;

export type DeleteIdentityProviderError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the identity provider.
 */
export const deleteIdentityProvider: API.OperationMethod<
  DeleteIdentityProviderRequest,
  DeleteIdentityProviderResponse,
  DeleteIdentityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /identityProviders/{identityProviderArn+}",
    input: { identityProviderArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIdentityProvider",
})) as any;

export type DeleteIpAccessSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes IP access settings.
 */
export const deleteIpAccessSettings: API.OperationMethod<
  DeleteIpAccessSettingsRequest,
  DeleteIpAccessSettingsResponse,
  DeleteIpAccessSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /ipAccessSettings/{ipAccessSettingsArn+}",
    input: { ipAccessSettingsArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIpAccessSettings",
})) as any;

export type DeleteNetworkSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes network settings.
 */
export const deleteNetworkSettings: API.OperationMethod<
  DeleteNetworkSettingsRequest,
  DeleteNetworkSettingsResponse,
  DeleteNetworkSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /networkSettings/{networkSettingsArn+}",
    input: { networkSettingsArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNetworkSettings",
})) as any;

export type DeletePortalError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a web portal.
 */
export const deletePortal: API.OperationMethod<
  DeletePortalRequest,
  DeletePortalResponse,
  DeletePortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /portals/{portalArn+}",
    input: { portalArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePortal",
})) as any;

export type DeleteSessionLoggerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a session logger resource.
 */
export const deleteSessionLogger: API.OperationMethod<
  DeleteSessionLoggerRequest,
  DeleteSessionLoggerResponse,
  DeleteSessionLoggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /sessionLoggers/{sessionLoggerArn+}",
    input: { sessionLoggerArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSessionLogger",
})) as any;

export type DeleteTrustStoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the trust store.
 */
export const deleteTrustStore: API.OperationMethod<
  DeleteTrustStoreRequest,
  DeleteTrustStoreResponse,
  DeleteTrustStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /trustStores/{trustStoreArn+}",
    input: { trustStoreArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrustStore",
})) as any;

export type DeleteUserAccessLoggingSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes user access logging settings.
 */
export const deleteUserAccessLoggingSettings: API.OperationMethod<
  DeleteUserAccessLoggingSettingsRequest,
  DeleteUserAccessLoggingSettingsResponse,
  DeleteUserAccessLoggingSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /userAccessLoggingSettings/{userAccessLoggingSettingsArn+}",
    input: { userAccessLoggingSettingsArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserAccessLoggingSettings",
})) as any;

export type DeleteUserSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes user settings.
 */
export const deleteUserSettings: API.OperationMethod<
  DeleteUserSettingsRequest,
  DeleteUserSettingsResponse,
  DeleteUserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /userSettings/{userSettingsArn+}",
    input: { userSettingsArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserSettings",
})) as any;

export type DisassociateBrowserSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates browser settings from a web portal.
 */
export const disassociateBrowserSettings: API.OperationMethod<
  DisassociateBrowserSettingsRequest,
  DisassociateBrowserSettingsResponse,
  DisassociateBrowserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /portals/{portalArn+}/browserSettings",
    input: { portalArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateBrowserSettings",
})) as any;

export type DisassociateDataProtectionSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates data protection settings from a web portal.
 */
export const disassociateDataProtectionSettings: API.OperationMethod<
  DisassociateDataProtectionSettingsRequest,
  DisassociateDataProtectionSettingsResponse,
  DisassociateDataProtectionSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /portals/{portalArn+}/dataProtectionSettings",
    input: { portalArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateDataProtectionSettings",
})) as any;

export type DisassociateIpAccessSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates IP access settings from a web portal.
 */
export const disassociateIpAccessSettings: API.OperationMethod<
  DisassociateIpAccessSettingsRequest,
  DisassociateIpAccessSettingsResponse,
  DisassociateIpAccessSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /portals/{portalArn+}/ipAccessSettings",
    input: { portalArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateIpAccessSettings",
})) as any;

export type DisassociateNetworkSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates network settings from a web portal.
 */
export const disassociateNetworkSettings: API.OperationMethod<
  DisassociateNetworkSettingsRequest,
  DisassociateNetworkSettingsResponse,
  DisassociateNetworkSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /portals/{portalArn+}/networkSettings",
    input: { portalArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateNetworkSettings",
})) as any;

export type DisassociateSessionLoggerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a session logger from a portal.
 */
export const disassociateSessionLogger: API.OperationMethod<
  DisassociateSessionLoggerRequest,
  DisassociateSessionLoggerResponse,
  DisassociateSessionLoggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /portals/{portalArn+}/sessionLogger",
    input: { portalArn: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateSessionLogger",
})) as any;

export type DisassociateTrustStoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a trust store from a web portal.
 */
export const disassociateTrustStore: API.OperationMethod<
  DisassociateTrustStoreRequest,
  DisassociateTrustStoreResponse,
  DisassociateTrustStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /portals/{portalArn+}/trustStores",
    input: { portalArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateTrustStore",
})) as any;

export type DisassociateUserAccessLoggingSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates user access logging settings from a web portal.
 */
export const disassociateUserAccessLoggingSettings: API.OperationMethod<
  DisassociateUserAccessLoggingSettingsRequest,
  DisassociateUserAccessLoggingSettingsResponse,
  DisassociateUserAccessLoggingSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /portals/{portalArn+}/userAccessLoggingSettings",
    input: { portalArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateUserAccessLoggingSettings",
})) as any;

export type DisassociateUserSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates user settings from a web portal.
 */
export const disassociateUserSettings: API.OperationMethod<
  DisassociateUserSettingsRequest,
  DisassociateUserSettingsResponse,
  DisassociateUserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /portals/{portalArn+}/userSettings",
    input: { portalArn: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateUserSettings",
})) as any;

export type ExpireSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Expires an active secure browser session.
 */
export const expireSession: API.OperationMethod<
  ExpireSessionRequest,
  ExpireSessionResponse,
  ExpireSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /portals/{portalId}/sessions/{sessionId}",
    input: { portalId: 0, sessionId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExpireSession",
})) as any;

export type GetBrowserSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets browser settings.
 */
export const getBrowserSettings: API.OperationMethod<
  GetBrowserSettingsRequest,
  GetBrowserSettingsResponse,
  GetBrowserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /browserSettings/{browserSettingsArn+}",
    input: { browserSettingsArn: 0 },
    output: { browserSettings: o_BrowserSettings },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBrowserSettings",
})) as any;

export type GetDataProtectionSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the data protection settings.
 */
export const getDataProtectionSettings: API.OperationMethod<
  GetDataProtectionSettingsRequest,
  GetDataProtectionSettingsResponse,
  GetDataProtectionSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /dataProtectionSettings/{dataProtectionSettingsArn+}",
    input: { dataProtectionSettingsArn: 0 },
    output: { dataProtectionSettings: o_DataProtectionSettings },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataProtectionSettings",
})) as any;

export type GetIdentityProviderError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the identity provider.
 */
export const getIdentityProvider: API.OperationMethod<
  GetIdentityProviderRequest,
  GetIdentityProviderResponse,
  GetIdentityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /identityProviders/{identityProviderArn+}",
    input: { identityProviderArn: 0 },
    output: { identityProvider: o_IdentityProvider },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentityProvider",
})) as any;

export type GetIpAccessSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the IP access settings.
 */
export const getIpAccessSettings: API.OperationMethod<
  GetIpAccessSettingsRequest,
  GetIpAccessSettingsResponse,
  GetIpAccessSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /ipAccessSettings/{ipAccessSettingsArn+}",
    input: { ipAccessSettingsArn: 0 },
    output: { ipAccessSettings: o_IpAccessSettings },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIpAccessSettings",
})) as any;

export type GetNetworkSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the network settings.
 */
export const getNetworkSettings: API.OperationMethod<
  GetNetworkSettingsRequest,
  GetNetworkSettingsResponse,
  GetNetworkSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /networkSettings/{networkSettingsArn+}",
    input: { networkSettingsArn: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNetworkSettings",
})) as any;

export type GetPortalError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the web portal.
 */
export const getPortal: API.OperationMethod<
  GetPortalRequest,
  GetPortalResponse,
  GetPortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /portals/{portalArn+}",
    input: { portalArn: 0 },
    output: { portal: o_Portal },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPortal",
})) as any;

export type GetPortalServiceProviderMetadataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the service provider metadata.
 */
export const getPortalServiceProviderMetadata: API.OperationMethod<
  GetPortalServiceProviderMetadataRequest,
  GetPortalServiceProviderMetadataResponse,
  GetPortalServiceProviderMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /portalIdp/{portalArn+}",
    input: { portalArn: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPortalServiceProviderMetadata",
})) as any;

export type GetSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information for a secure browser session.
 */
export const getSession: API.OperationMethod<
  GetSessionRequest,
  GetSessionResponse,
  GetSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /portals/{portalId}/sessions/{sessionId}",
    input: { portalId: 0, sessionId: 0 },
    output: {
      session: {
        username: D.secret,
        clientIpAddresses: D.list(D.secret),
        startTime: D.ts,
        endTime: D.ts,
      },
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSession",
})) as any;

export type GetSessionLoggerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets details about a specific session logger resource.
 */
export const getSessionLogger: API.OperationMethod<
  GetSessionLoggerRequest,
  GetSessionLoggerResponse,
  GetSessionLoggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /sessionLoggers/{sessionLoggerArn+}",
    input: { sessionLoggerArn: 0 },
    output: { sessionLogger: o_SessionLogger },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSessionLogger",
})) as any;

export type GetTrustStoreError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the trust store.
 */
export const getTrustStore: API.OperationMethod<
  GetTrustStoreRequest,
  GetTrustStoreResponse,
  GetTrustStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /trustStores/{trustStoreArn+}",
    input: { trustStoreArn: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrustStore",
})) as any;

export type GetTrustStoreCertificateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the trust store certificate.
 */
export const getTrustStoreCertificate: API.OperationMethod<
  GetTrustStoreCertificateRequest,
  GetTrustStoreCertificateResponse,
  GetTrustStoreCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /trustStores/{trustStoreArn+}/certificate",
    input: { trustStoreArn: 0, thumbprint: D.m({ query: "thumbprint" }) },
    output: {
      certificate: { notValidBefore: D.ts, notValidAfter: D.ts, body: D.blob },
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrustStoreCertificate",
})) as any;

export type GetUserAccessLoggingSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets user access logging settings.
 */
export const getUserAccessLoggingSettings: API.OperationMethod<
  GetUserAccessLoggingSettingsRequest,
  GetUserAccessLoggingSettingsResponse,
  GetUserAccessLoggingSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /userAccessLoggingSettings/{userAccessLoggingSettingsArn+}",
    input: { userAccessLoggingSettingsArn: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserAccessLoggingSettings",
})) as any;

export type GetUserSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets user settings.
 */
export const getUserSettings: API.OperationMethod<
  GetUserSettingsRequest,
  GetUserSettingsResponse,
  GetUserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /userSettings/{userSettingsArn+}",
    input: { userSettingsArn: 0 },
    output: { userSettings: o_UserSettings },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserSettings",
})) as any;

export type ListBrowserSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of browser settings.
 */
export const listBrowserSettings: API.PaginatedOperationMethod<
  ListBrowserSettingsRequest,
  ListBrowserSettingsResponse,
  ListBrowserSettingsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /browserSettings",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBrowserSettings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataProtectionSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of data protection settings.
 */
export const listDataProtectionSettings: API.PaginatedOperationMethod<
  ListDataProtectionSettingsRequest,
  ListDataProtectionSettingsResponse,
  ListDataProtectionSettingsError,
  Credentials | HttpClient.HttpClient,
  DataProtectionSettingsSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /dataProtectionSettings",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      dataProtectionSettings: D.list({
        displayName: D.secret,
        description: D.secret,
        creationDate: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataProtectionSettings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dataProtectionSettings",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIdentityProvidersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of identity providers for a specific web portal.
 */
export const listIdentityProviders: API.PaginatedOperationMethod<
  ListIdentityProvidersRequest,
  ListIdentityProvidersResponse,
  ListIdentityProvidersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /portals/{portalArn+}/identityProviders",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      portalArn: 0,
    },
    output: { identityProviders: D.list({ identityProviderName: D.secret }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIdentityProviders",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIpAccessSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of IP access settings.
 */
export const listIpAccessSettings: API.PaginatedOperationMethod<
  ListIpAccessSettingsRequest,
  ListIpAccessSettingsResponse,
  ListIpAccessSettingsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /ipAccessSettings",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      ipAccessSettings: D.list({
        displayName: D.secret,
        description: D.secret,
        creationDate: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIpAccessSettings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNetworkSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of network settings.
 */
export const listNetworkSettings: API.PaginatedOperationMethod<
  ListNetworkSettingsRequest,
  ListNetworkSettingsResponse,
  ListNetworkSettingsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /networkSettings",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkSettings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPortalsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list or web portals.
 */
export const listPortals: API.PaginatedOperationMethod<
  ListPortalsRequest,
  ListPortalsResponse,
  ListPortalsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /portals",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { portals: D.list({ displayName: D.secret, creationDate: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPortals",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSessionLoggersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all available session logger resources.
 */
export const listSessionLoggers: API.PaginatedOperationMethod<
  ListSessionLoggersRequest,
  ListSessionLoggersResponse,
  ListSessionLoggersError,
  Credentials | HttpClient.HttpClient,
  SessionLoggerSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /sessionLoggers",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      sessionLoggers: D.list({
        logConfiguration: o_LogConfiguration,
        displayName: D.secret,
        creationDate: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSessionLoggers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sessionLoggers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSessionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists information for multiple secure browser sessions from a specific portal.
 */
export const listSessions: API.PaginatedOperationMethod<
  ListSessionsRequest,
  ListSessionsResponse,
  ListSessionsError,
  Credentials | HttpClient.HttpClient,
  SessionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /portals/{portalId}/sessions",
    input: {
      portalId: 0,
      username: D.m({ query: "username" }),
      sessionId: D.m({ query: "sessionId" }),
      sortBy: D.m({ query: "sortBy" }),
      status: D.m({ query: "status" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      sessions: D.list({ username: D.secret, startTime: D.ts, endTime: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSessions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sessions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of tags for a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn+}",
    input: { resourceArn: 0 },
    output: { tags: D.list({ Key: D.secret, Value: D.secret }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListTrustStoreCertificatesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of trust store certificates.
 */
export const listTrustStoreCertificates: API.PaginatedOperationMethod<
  ListTrustStoreCertificatesRequest,
  ListTrustStoreCertificatesResponse,
  ListTrustStoreCertificatesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /trustStores/{trustStoreArn+}/certificates",
    input: {
      trustStoreArn: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      certificateList: D.list({ notValidBefore: D.ts, notValidAfter: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrustStoreCertificates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTrustStoresError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of trust stores.
 */
export const listTrustStores: API.PaginatedOperationMethod<
  ListTrustStoresRequest,
  ListTrustStoresResponse,
  ListTrustStoresError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /trustStores",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrustStores",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListUserAccessLoggingSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of user access logging settings.
 */
export const listUserAccessLoggingSettings: API.PaginatedOperationMethod<
  ListUserAccessLoggingSettingsRequest,
  ListUserAccessLoggingSettingsResponse,
  ListUserAccessLoggingSettingsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /userAccessLoggingSettings",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUserAccessLoggingSettings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListUserSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of user settings.
 */
export const listUserSettings: API.PaginatedOperationMethod<
  ListUserSettingsRequest,
  ListUserSettingsResponse,
  ListUserSettingsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /userSettings",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      userSettings: D.list({
        cookieSynchronizationConfiguration:
          o_CookieSynchronizationConfiguration,
        brandingConfiguration: o_BrandingConfiguration,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUserSettings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Adds or overwrites one or more tags for the specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn+}",
    input: {
      resourceArn: 0,
      tags: D.list(i_Tag),
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes one or more tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn+}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateBrowserSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates browser settings.
 */
export const updateBrowserSettings: API.OperationMethod<
  UpdateBrowserSettingsRequest,
  UpdateBrowserSettingsResponse,
  UpdateBrowserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /browserSettings/{browserSettingsArn+}",
    input: {
      browserSettingsArn: 0,
      browserPolicy: 0,
      clientToken: D.m({ idempotency: true }),
      webContentFilteringPolicy: i_WebContentFilteringPolicy,
    },
    output: { browserSettings: o_BrowserSettings },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBrowserSettings",
})) as any;

export type UpdateDataProtectionSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates data protection settings.
 */
export const updateDataProtectionSettings: API.OperationMethod<
  UpdateDataProtectionSettingsRequest,
  UpdateDataProtectionSettingsResponse,
  UpdateDataProtectionSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /dataProtectionSettings/{dataProtectionSettingsArn+}",
    input: {
      dataProtectionSettingsArn: 0,
      inlineRedactionConfiguration: i_InlineRedactionConfiguration,
      displayName: 0,
      description: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { dataProtectionSettings: o_DataProtectionSettings },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataProtectionSettings",
})) as any;

export type UpdateIdentityProviderError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the identity provider.
 */
export const updateIdentityProvider: API.OperationMethod<
  UpdateIdentityProviderRequest,
  UpdateIdentityProviderResponse,
  UpdateIdentityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /identityProviders/{identityProviderArn+}",
    input: {
      identityProviderArn: 0,
      identityProviderName: 0,
      identityProviderType: 0,
      identityProviderDetails: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { identityProvider: o_IdentityProvider },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIdentityProvider",
})) as any;

export type UpdateIpAccessSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates IP access settings.
 */
export const updateIpAccessSettings: API.OperationMethod<
  UpdateIpAccessSettingsRequest,
  UpdateIpAccessSettingsResponse,
  UpdateIpAccessSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /ipAccessSettings/{ipAccessSettingsArn+}",
    input: {
      ipAccessSettingsArn: 0,
      displayName: 0,
      description: 0,
      ipRules: D.list(i_IpRule),
      clientToken: D.m({ idempotency: true }),
    },
    output: { ipAccessSettings: o_IpAccessSettings },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIpAccessSettings",
})) as any;

export type UpdateNetworkSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates network settings.
 */
export const updateNetworkSettings: API.OperationMethod<
  UpdateNetworkSettingsRequest,
  UpdateNetworkSettingsResponse,
  UpdateNetworkSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /networkSettings/{networkSettingsArn+}",
    input: {
      networkSettingsArn: 0,
      vpcId: 0,
      subnetIds: 0,
      securityGroupIds: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNetworkSettings",
})) as any;

export type UpdatePortalError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a web portal.
 */
export const updatePortal: API.OperationMethod<
  UpdatePortalRequest,
  UpdatePortalResponse,
  UpdatePortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /portals/{portalArn+}",
    input: {
      portalArn: 0,
      displayName: 0,
      authenticationType: 0,
      instanceType: 0,
      maxConcurrentSessions: 0,
      portalCustomDomain: 0,
    },
    output: { portal: o_Portal },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePortal",
})) as any;

export type UpdateSessionLoggerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the details of a session logger.
 */
export const updateSessionLogger: API.OperationMethod<
  UpdateSessionLoggerRequest,
  UpdateSessionLoggerResponse,
  UpdateSessionLoggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sessionLoggers/{sessionLoggerArn+}",
    input: {
      sessionLoggerArn: 0,
      eventFilter: i_EventFilter,
      logConfiguration: i_LogConfiguration,
      displayName: 0,
    },
    output: { sessionLogger: o_SessionLogger },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSessionLogger",
})) as any;

export type UpdateTrustStoreError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the trust store.
 */
export const updateTrustStore: API.OperationMethod<
  UpdateTrustStoreRequest,
  UpdateTrustStoreResponse,
  UpdateTrustStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /trustStores/{trustStoreArn+}",
    input: {
      trustStoreArn: 0,
      certificatesToAdd: 0,
      certificatesToDelete: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTrustStore",
})) as any;

export type UpdateUserAccessLoggingSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the user access logging settings.
 */
export const updateUserAccessLoggingSettings: API.OperationMethod<
  UpdateUserAccessLoggingSettingsRequest,
  UpdateUserAccessLoggingSettingsResponse,
  UpdateUserAccessLoggingSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /userAccessLoggingSettings/{userAccessLoggingSettingsArn+}",
    input: {
      userAccessLoggingSettingsArn: 0,
      kinesisStreamArn: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserAccessLoggingSettings",
})) as any;

export type UpdateUserSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the user settings.
 */
export const updateUserSettings: API.OperationMethod<
  UpdateUserSettingsRequest,
  UpdateUserSettingsResponse,
  UpdateUserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /userSettings/{userSettingsArn+}",
    input: {
      userSettingsArn: 0,
      copyAllowed: 0,
      pasteAllowed: 0,
      downloadAllowed: 0,
      uploadAllowed: 0,
      printAllowed: 0,
      disconnectTimeoutInMinutes: 0,
      idleDisconnectTimeoutInMinutes: 0,
      clientToken: D.m({ idempotency: true }),
      cookieSynchronizationConfiguration: i_CookieSynchronizationConfiguration,
      deepLinkAllowed: 0,
      toolbarConfiguration: i_ToolbarConfiguration,
      brandingConfigurationInput: {
        logo: i_IconImageInput,
        wallpaper: i_WallpaperImageInput,
        favicon: i_IconImageInput,
        localizedStrings: D.map(i_LocalizedBrandingStrings),
        colorTheme: 0,
        termsOfService: 0,
      },
      webAuthnAllowed: 0,
    },
    output: { userSettings: o_UserSettings },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserSettings",
})) as any;

const i_CookieSynchronizationConfiguration: D.LazyStruct = () => ({
  allowlist: D.list(i_CookieSpecification),
  blocklist: D.list(i_CookieSpecification),
});
const i_EventFilter: D.LazyStruct = () => ({ all: {}, include: 0 });
const i_IconImageInput: D.LazyStruct = () => ({ blob: 0, s3Uri: 0 });
const i_InlineRedactionConfiguration: D.LazyStruct = () => ({
  inlineRedactionPatterns: D.list({
    builtInPatternId: 0,
    customPattern: {
      patternName: 0,
      patternRegex: 0,
      patternDescription: 0,
      keywordRegex: 0,
    },
    redactionPlaceHolder: {
      redactionPlaceHolderType: 0,
      redactionPlaceHolderText: 0,
    },
    enforcedUrls: 0,
    exemptUrls: 0,
    confidenceLevel: 0,
  }),
  globalEnforcedUrls: 0,
  globalExemptUrls: 0,
  globalConfidenceLevel: 0,
});
const i_IpRule: D.LazyStruct = () => ({ ipRange: 0, description: 0 });
const i_LocalizedBrandingStrings: D.LazyStruct = () => ({
  browserTabTitle: 0,
  welcomeText: 0,
  loginTitle: 0,
  loginDescription: 0,
  loginButtonText: 0,
  contactLink: 0,
  contactButtonText: 0,
  loadingText: 0,
});
const i_LogConfiguration: D.LazyStruct = () => ({
  s3: {
    bucket: 0,
    keyPrefix: 0,
    bucketOwner: 0,
    logFileFormat: 0,
    folderStructure: 0,
  },
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_ToolbarConfiguration: D.LazyStruct = () => ({
  toolbarType: 0,
  visualMode: 0,
  hiddenToolbarItems: 0,
  maxDisplayResolution: 0,
});
const i_WallpaperImageInput: D.LazyStruct = () => ({ blob: 0, s3Uri: 0 });
const i_WebContentFilteringPolicy: D.LazyStruct = () => ({
  blockedCategories: 0,
  allowedUrls: 0,
  blockedUrls: 0,
});
const o_BrandingConfiguration: D.LazyStruct = () => ({
  logo: o_ImageMetadata,
  wallpaper: o_ImageMetadata,
  favicon: o_ImageMetadata,
  termsOfService: D.secret,
});
const o_BrowserSettings: D.LazyStruct = () => ({
  browserPolicy: D.secret,
  webContentFilteringPolicy: {
    allowedUrls: D.list(D.secret),
    blockedUrls: D.list(D.secret),
  },
});
const o_CookieSynchronizationConfiguration: D.LazyStruct = () => ({
  allowlist: D.list(o_CookieSpecification),
  blocklist: D.list(o_CookieSpecification),
});
const o_DataProtectionSettings: D.LazyStruct = () => ({
  inlineRedactionConfiguration: {
    inlineRedactionPatterns: D.list({
      builtInPatternId: D.secret,
      customPattern: {
        patternName: D.secret,
        patternRegex: D.secret,
        patternDescription: D.secret,
        keywordRegex: D.secret,
      },
      redactionPlaceHolder: { redactionPlaceHolderText: D.secret },
      enforcedUrls: D.list(D.secret),
      exemptUrls: D.list(D.secret),
    }),
    globalEnforcedUrls: D.list(D.secret),
    globalExemptUrls: D.list(D.secret),
  },
  displayName: D.secret,
  description: D.secret,
  creationDate: D.ts,
});
const o_IdentityProvider: D.LazyStruct = () => ({
  identityProviderName: D.secret,
});
const o_IpAccessSettings: D.LazyStruct = () => ({
  ipRules: D.list({ ipRange: D.secret, description: D.secret }),
  displayName: D.secret,
  description: D.secret,
  creationDate: D.ts,
});
const o_LogConfiguration: D.LazyStruct = () => ({
  s3: { bucket: D.secret, keyPrefix: D.secret },
});
const o_Portal: D.LazyStruct = () => ({
  displayName: D.secret,
  creationDate: D.ts,
});
const o_SessionLogger: D.LazyStruct = () => ({
  logConfiguration: o_LogConfiguration,
  displayName: D.secret,
  creationDate: D.ts,
});
const o_UserSettings: D.LazyStruct = () => ({
  cookieSynchronizationConfiguration: o_CookieSynchronizationConfiguration,
  brandingConfiguration: o_BrandingConfiguration,
});
const i_CookieSpecification: D.LazyStruct = () => ({
  domain: 0,
  name: 0,
  path: 0,
});
const o_CookieSpecification: D.LazyStruct = () => ({
  domain: D.secret,
  name: D.secret,
  path: D.secret,
});
const o_ImageMetadata: D.LazyStruct = () => ({ lastUploadTimestamp: D.ts });
