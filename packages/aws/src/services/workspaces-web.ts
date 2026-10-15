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
  sdkId: "WorkSpaces Web",
  serviceShapeName: "AWSErmineControlPlaneService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "workspaces-web" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-07-08");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://workspaces-web.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://workspaces-web.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://workspaces-web.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.optional(S.String),
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(681, __c85, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type IconImageInput = { blob: Uint8Array; s3Uri?: never } | { blob?: never; s3Uri: string };
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
export type LocalizedBrandingStringMap = { [key in Locale]?: LocalizedBrandingStrings };
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
export type MimeType = "image/png" | "image/jpeg" | "image/x-icon" | (string & {});
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
export type SessionSortBy = "StartTimeAscending" | "StartTimeDescending" | (string & {});
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
  input: __S(768, __c96, 0) as any as S.Schema<AssociateBrowserSettingsRequest>,
  output: __S(769, __c96, 1) as any as S.Schema<AssociateBrowserSettingsResponse>,
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
}));

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
  input: __S(800, __c100, 0) as any as S.Schema<AssociateDataProtectionSettingsRequest>,
  output: __S(801, __c100, 1) as any as S.Schema<AssociateDataProtectionSettingsResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<AssociateIpAccessSettingsRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<AssociateIpAccessSettingsResponse>,
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
}));

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
  input: __S(8, __c1, 0) as any as S.Schema<AssociateNetworkSettingsRequest>,
  output: __S(9, __c1, 1) as any as S.Schema<AssociateNetworkSettingsResponse>,
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
}));

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
  input: __S(16, __c2, 0) as any as S.Schema<AssociateSessionLoggerRequest>,
  output: __S(17, __c2, 1) as any as S.Schema<AssociateSessionLoggerResponse>,
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
}));

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
  input: __S(24, __c3, 0) as any as S.Schema<AssociateTrustStoreRequest>,
  output: __S(25, __c3, 1) as any as S.Schema<AssociateTrustStoreResponse>,
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
}));

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
  input: __S(32, __c4, 0) as any as S.Schema<AssociateUserAccessLoggingSettingsRequest>,
  output: __S(33, __c4, 1) as any as S.Schema<AssociateUserAccessLoggingSettingsResponse>,
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
}));

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
  input: __S(40, __c5, 0) as any as S.Schema<AssociateUserSettingsRequest>,
  output: __S(41, __c5, 1) as any as S.Schema<AssociateUserSettingsResponse>,
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
}));

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
  input: __S(48, __c6, 0) as any as S.Schema<CreateBrowserSettingsRequest>,
  output: __S(96, __c12, 0) as any as S.Schema<CreateBrowserSettingsResponse>,
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
}));

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
  input: __S(104, __c13, 0) as any as S.Schema<CreateDataProtectionSettingsRequest>,
  output: __S(105, __c13, 1) as any as S.Schema<CreateDataProtectionSettingsResponse>,
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
}));

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
  input: __S(120, __c15, 0) as any as S.Schema<CreateIdentityProviderRequest>,
  output: __S(121, __c15, 1) as any as S.Schema<CreateIdentityProviderResponse>,
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
}));

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
  input: __S(128, __c16, 0) as any as S.Schema<CreateIpAccessSettingsRequest>,
  output: __S(129, __c16, 1) as any as S.Schema<CreateIpAccessSettingsResponse>,
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
}));

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
  input: __S(144, __c18, 0) as any as S.Schema<CreateNetworkSettingsRequest>,
  output: __S(145, __c18, 1) as any as S.Schema<CreateNetworkSettingsResponse>,
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
}));

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
  input: __S(160, __c20, 0) as any as S.Schema<CreatePortalRequest>,
  output: __S(161, __c20, 1) as any as S.Schema<CreatePortalResponse>,
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
}));

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
  input: __S(168, __c21, 0) as any as S.Schema<CreateSessionLoggerRequest>,
  output: __S(169, __c21, 1) as any as S.Schema<CreateSessionLoggerResponse>,
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
}));

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
  input: __S(192, __c24, 0) as any as S.Schema<CreateTrustStoreRequest>,
  output: __S(201, __c25, 1) as any as S.Schema<CreateTrustStoreResponse>,
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
}));

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
  input: __S(208, __c26, 0) as any as S.Schema<CreateUserAccessLoggingSettingsRequest>,
  output: __S(209, __c26, 1) as any as S.Schema<CreateUserAccessLoggingSettingsResponse>,
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
}));

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
  input: __S(217, __c27, 1) as any as S.Schema<CreateUserSettingsRequest>,
  output: __S(218, __c27, 2) as any as S.Schema<CreateUserSettingsResponse>,
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
}));

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
  input: __S(240, __c30, 0) as any as S.Schema<DeleteBrowserSettingsRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<DeleteBrowserSettingsResponse>,
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
}));

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
  input: __S(256, __c32, 0) as any as S.Schema<DeleteDataProtectionSettingsRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<DeleteDataProtectionSettingsResponse>,
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
}));

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
  input: __S(264, __c33, 0) as any as S.Schema<DeleteIdentityProviderRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<DeleteIdentityProviderResponse>,
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
}));

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
  input: __S(272, __c34, 0) as any as S.Schema<DeleteIpAccessSettingsRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<DeleteIpAccessSettingsResponse>,
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
}));

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
  input: __S(280, __c35, 0) as any as S.Schema<DeleteNetworkSettingsRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<DeleteNetworkSettingsResponse>,
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
}));

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
  input: __S(288, __c36, 0) as any as S.Schema<DeletePortalRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<DeletePortalResponse>,
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
}));

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
  input: __S(296, __c37, 0) as any as S.Schema<DeleteSessionLoggerRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<DeleteSessionLoggerResponse>,
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
}));

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
  input: __S(304, __c38, 0) as any as S.Schema<DeleteTrustStoreRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<DeleteTrustStoreResponse>,
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
}));

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
  input: __S(312, __c39, 0) as any as S.Schema<DeleteUserAccessLoggingSettingsRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<DeleteUserAccessLoggingSettingsResponse>,
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
}));

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
  input: __S(320, __c40, 0) as any as S.Schema<DeleteUserSettingsRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<DeleteUserSettingsResponse>,
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
}));

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
  input: __S(328, __c41, 0) as any as S.Schema<DisassociateBrowserSettingsRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<DisassociateBrowserSettingsResponse>,
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
}));

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
  input: __S(336, __c42, 0) as any as S.Schema<DisassociateDataProtectionSettingsRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<DisassociateDataProtectionSettingsResponse>,
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
}));

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
  input: __S(344, __c43, 0) as any as S.Schema<DisassociateIpAccessSettingsRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<DisassociateIpAccessSettingsResponse>,
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
}));

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
  input: __S(352, __c44, 0) as any as S.Schema<DisassociateNetworkSettingsRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<DisassociateNetworkSettingsResponse>,
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
}));

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
  input: __S(360, __c45, 0) as any as S.Schema<DisassociateSessionLoggerRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<DisassociateSessionLoggerResponse>,
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
}));

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
  input: __S(368, __c46, 0) as any as S.Schema<DisassociateTrustStoreRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<DisassociateTrustStoreResponse>,
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
}));

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
  input: __S(376, __c47, 0) as any as S.Schema<DisassociateUserAccessLoggingSettingsRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<DisassociateUserAccessLoggingSettingsResponse>,
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
}));

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
  input: __S(384, __c48, 0) as any as S.Schema<DisassociateUserSettingsRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<DisassociateUserSettingsResponse>,
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
}));

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
  input: __S(392, __c49, 0) as any as S.Schema<ExpireSessionRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<ExpireSessionResponse>,
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
}));

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
  input: __S(400, __c50, 0) as any as S.Schema<GetBrowserSettingsRequest>,
  output: __S(401, __c50, 1) as any as S.Schema<GetBrowserSettingsResponse>,
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
}));

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
  input: __S(416, __c52, 0) as any as S.Schema<GetDataProtectionSettingsRequest>,
  output: __S(417, __c52, 1) as any as S.Schema<GetDataProtectionSettingsResponse>,
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
}));

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
  input: __S(432, __c54, 0) as any as S.Schema<GetIdentityProviderRequest>,
  output: __S(433, __c54, 1) as any as S.Schema<GetIdentityProviderResponse>,
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
}));

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
  input: __S(448, __c56, 0) as any as S.Schema<GetIpAccessSettingsRequest>,
  output: __S(449, __c56, 1) as any as S.Schema<GetIpAccessSettingsResponse>,
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
}));

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
  input: __S(464, __c58, 0) as any as S.Schema<GetNetworkSettingsRequest>,
  output: __S(465, __c58, 1) as any as S.Schema<GetNetworkSettingsResponse>,
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
}));

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
  input: __S(480, __c60, 0) as any as S.Schema<GetPortalRequest>,
  output: __S(489, __c61, 1) as any as S.Schema<GetPortalResponse>,
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
}));

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
  input: __S(496, __c62, 0) as any as S.Schema<GetPortalServiceProviderMetadataRequest>,
  output: __S(497, __c62, 1) as any as S.Schema<GetPortalServiceProviderMetadataResponse>,
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
}));

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
  input: __S(504, __c63, 0) as any as S.Schema<GetSessionRequest>,
  output: __S(506, __c63, 2) as any as S.Schema<GetSessionResponse>,
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
}));

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
  input: __S(512, __c64, 0) as any as S.Schema<GetSessionLoggerRequest>,
  output: __S(513, __c64, 1) as any as S.Schema<GetSessionLoggerResponse>,
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
}));

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
  input: __S(528, __c66, 0) as any as S.Schema<GetTrustStoreRequest>,
  output: __S(530, __c66, 2) as any as S.Schema<GetTrustStoreResponse>,
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
}));

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
  input: __S(536, __c67, 0) as any as S.Schema<GetTrustStoreCertificateRequest>,
  output: __S(538, __c67, 2) as any as S.Schema<GetTrustStoreCertificateResponse>,
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
}));

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
  input: __S(544, __c68, 0) as any as S.Schema<GetUserAccessLoggingSettingsRequest>,
  output: __S(545, __c68, 1) as any as S.Schema<GetUserAccessLoggingSettingsResponse>,
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
}));

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
  input: __S(560, __c70, 0) as any as S.Schema<GetUserSettingsRequest>,
  output: __S(561, __c70, 1) as any as S.Schema<GetUserSettingsResponse>,
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
}));

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
  input: __S(584, __c73, 0) as any as S.Schema<ListBrowserSettingsRequest>,
  output: __S(586, __c73, 2) as any as S.Schema<ListBrowserSettingsResponse>,
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
  input: __S(592, __c74, 0) as any as S.Schema<ListDataProtectionSettingsRequest>,
  output: __S(595, __c74, 3) as any as S.Schema<ListDataProtectionSettingsResponse>,
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
  input: __S(600, __c75, 0) as any as S.Schema<ListIdentityProvidersRequest>,
  output: __S(603, __c75, 3) as any as S.Schema<ListIdentityProvidersResponse>,
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
  input: __S(608, __c76, 0) as any as S.Schema<ListIpAccessSettingsRequest>,
  output: __S(611, __c76, 3) as any as S.Schema<ListIpAccessSettingsResponse>,
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
  input: __S(616, __c77, 0) as any as S.Schema<ListNetworkSettingsRequest>,
  output: __S(619, __c77, 3) as any as S.Schema<ListNetworkSettingsResponse>,
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
  input: __S(624, __c78, 0) as any as S.Schema<ListPortalsRequest>,
  output: __S(627, __c78, 3) as any as S.Schema<ListPortalsResponse>,
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
  input: __S(632, __c79, 0) as any as S.Schema<ListSessionLoggersRequest>,
  output: __S(635, __c79, 3) as any as S.Schema<ListSessionLoggersResponse>,
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
  input: __S(640, __c80, 0) as any as S.Schema<ListSessionsRequest>,
  output: __S(643, __c80, 3) as any as S.Schema<ListSessionsResponse>,
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
  input: __S(648, __c81, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(649, __c81, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

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
  input: __S(656, __c82, 0) as any as S.Schema<ListTrustStoreCertificatesRequest>,
  output: __S(659, __c82, 3) as any as S.Schema<ListTrustStoreCertificatesResponse>,
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
  input: __S(664, __c83, 0) as any as S.Schema<ListTrustStoresRequest>,
  output: __S(667, __c83, 3) as any as S.Schema<ListTrustStoresResponse>,
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
  input: __S(672, __c84, 0) as any as S.Schema<ListUserAccessLoggingSettingsRequest>,
  output: __S(675, __c84, 3) as any as S.Schema<ListUserAccessLoggingSettingsResponse>,
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
  input: __S(688, __c86, 0) as any as S.Schema<ListUserSettingsRequest>,
  output: __S(691, __c86, 3) as any as S.Schema<ListUserSettingsResponse>,
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
  input: __S(696, __c87, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(704, __c88, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(712, __c89, 0) as any as S.Schema<UpdateBrowserSettingsRequest>,
  output: __S(713, __c89, 1) as any as S.Schema<UpdateBrowserSettingsResponse>,
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
}));

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
  input: __S(720, __c90, 0) as any as S.Schema<UpdateDataProtectionSettingsRequest>,
  output: __S(721, __c90, 1) as any as S.Schema<UpdateDataProtectionSettingsResponse>,
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
}));

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
  input: __S(728, __c91, 0) as any as S.Schema<UpdateIdentityProviderRequest>,
  output: __S(729, __c91, 1) as any as S.Schema<UpdateIdentityProviderResponse>,
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
}));

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
  input: __S(736, __c92, 0) as any as S.Schema<UpdateIpAccessSettingsRequest>,
  output: __S(737, __c92, 1) as any as S.Schema<UpdateIpAccessSettingsResponse>,
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
}));

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
  input: __S(744, __c93, 0) as any as S.Schema<UpdateNetworkSettingsRequest>,
  output: __S(745, __c93, 1) as any as S.Schema<UpdateNetworkSettingsResponse>,
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
}));

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
  input: __S(752, __c94, 0) as any as S.Schema<UpdatePortalRequest>,
  output: __S(489, __c61, 1) as any as S.Schema<UpdatePortalResponse>,
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
}));

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
  input: __S(760, __c95, 0) as any as S.Schema<UpdateSessionLoggerRequest>,
  output: __S(761, __c95, 1) as any as S.Schema<UpdateSessionLoggerResponse>,
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
}));

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
  input: __S(776, __c97, 0) as any as S.Schema<UpdateTrustStoreRequest>,
  output: __S(201, __c25, 1) as any as S.Schema<UpdateTrustStoreResponse>,
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
}));

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
  input: __S(784, __c98, 0) as any as S.Schema<UpdateUserAccessLoggingSettingsRequest>,
  output: __S(785, __c98, 1) as any as S.Schema<UpdateUserAccessLoggingSettingsResponse>,
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
}));

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
  input: __S(793, __c99, 1) as any as S.Schema<UpdateUserSettingsRequest>,
  output: __S(794, __c99, 2) as any as S.Schema<UpdateUserSettingsResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          portalArn: S.String.pipe(T.HttpLabel("portalArn")),
          ipAccessSettingsArn: S.String.pipe(T.HttpQuery("ipAccessSettingsArn")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/portals/{portalArn+}/ipAccessSettings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateIpAccessSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ portalArn: S.String, ipAccessSettingsArn: S.String }),
      ).annotate({ identifier: "AssociateIpAccessSettingsResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          portalArn: S.String.pipe(T.HttpLabel("portalArn")),
          networkSettingsArn: S.String.pipe(T.HttpQuery("networkSettingsArn")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/portals/{portalArn+}/networkSettings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateNetworkSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ portalArn: S.String, networkSettingsArn: S.String }),
      ).annotate({ identifier: "AssociateNetworkSettingsResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          portalArn: S.String.pipe(T.HttpLabel("portalArn")),
          sessionLoggerArn: S.String.pipe(T.HttpQuery("sessionLoggerArn")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/portals/{portalArn+}/sessionLogger" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateSessionLoggerRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ portalArn: S.String, sessionLoggerArn: S.String }),
      ).annotate({ identifier: "AssociateSessionLoggerResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          portalArn: S.String.pipe(T.HttpLabel("portalArn")),
          trustStoreArn: S.String.pipe(T.HttpQuery("trustStoreArn")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/portals/{portalArn+}/trustStores" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateTrustStoreRequest" });
    case 1:
      return S.suspend(() => S.Struct({ portalArn: S.String, trustStoreArn: S.String })).annotate({
        identifier: "AssociateTrustStoreResponse",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          portalArn: S.String.pipe(T.HttpLabel("portalArn")),
          userAccessLoggingSettingsArn: S.String.pipe(T.HttpQuery("userAccessLoggingSettingsArn")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/portals/{portalArn+}/userAccessLoggingSettings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateUserAccessLoggingSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ portalArn: S.String, userAccessLoggingSettingsArn: S.String }),
      ).annotate({ identifier: "AssociateUserAccessLoggingSettingsResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          portalArn: S.String.pipe(T.HttpLabel("portalArn")),
          userSettingsArn: S.String.pipe(T.HttpQuery("userSettingsArn")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/portals/{portalArn+}/userSettings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateUserSettingsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ portalArn: S.String, userSettingsArn: S.String })).annotate(
        { identifier: "AssociateUserSettingsResponse" },
      );
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tags: S.optional(__S(57, __c7, 1)),
          customerManagedKey: S.optional(S.String),
          additionalEncryptionContext: S.optional(__S(64, __c8, 0)),
          browserPolicy: S.optional(SensitiveString),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          webContentFilteringPolicy: S.optional(__S(88, __c11, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/browserSettings" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateBrowserSettingsRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: SensitiveString, Value: SensitiveString })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(56, __c7, 0));
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.Array(SensitiveString);
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          blockedCategories: S.optional(__S(80, __c10, 0)),
          allowedUrls: S.optional(__S(72, __c9, 0)),
          blockedUrls: S.optional(__S(72, __c9, 0)),
        }),
      ).annotate({ identifier: "WebContentFilteringPolicy" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ browserSettingsArn: S.String })).annotate({
        identifier: "CreateBrowserSettingsResponse",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          displayName: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          tags: S.optional(__S(57, __c7, 1)),
          customerManagedKey: S.optional(S.String),
          additionalEncryptionContext: S.optional(__S(64, __c8, 0)),
          inlineRedactionConfiguration: S.optional(__S(116, __c14, 4)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/dataProtectionSettings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDataProtectionSettingsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ dataProtectionSettingsArn: S.String })).annotate({
        identifier: "CreateDataProtectionSettingsResponse",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          patternName: SensitiveString,
          patternRegex: SensitiveString,
          patternDescription: S.optional(SensitiveString),
          keywordRegex: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "CustomPattern" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          redactionPlaceHolderType: S.String,
          redactionPlaceHolderText: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "RedactionPlaceHolder" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          builtInPatternId: S.optional(SensitiveString),
          customPattern: S.optional(__S(112, __c14, 0)),
          redactionPlaceHolder: __S(113, __c14, 1),
          enforcedUrls: S.optional(__S(72, __c9, 0)),
          exemptUrls: S.optional(__S(72, __c9, 0)),
          confidenceLevel: S.optional(S.Number),
        }),
      ).annotate({ identifier: "InlineRedactionPattern" });
    case 3:
      return S.Array(__S(114, __c14, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          inlineRedactionPatterns: __S(115, __c14, 3),
          globalEnforcedUrls: S.optional(__S(72, __c9, 0)),
          globalExemptUrls: S.optional(__S(72, __c9, 0)),
          globalConfidenceLevel: S.optional(S.Number),
        }),
      ).annotate({ identifier: "InlineRedactionConfiguration" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          portalArn: S.String,
          identityProviderName: SensitiveString,
          identityProviderType: S.String,
          identityProviderDetails: __S(64, __c8, 0),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(57, __c7, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/identityProviders" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateIdentityProviderRequest" });
    case 1:
      return S.suspend(() => S.Struct({ identityProviderArn: S.String })).annotate({
        identifier: "CreateIdentityProviderResponse",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          displayName: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          tags: S.optional(__S(57, __c7, 1)),
          customerManagedKey: S.optional(S.String),
          additionalEncryptionContext: S.optional(__S(64, __c8, 0)),
          ipRules: __S(137, __c17, 1),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ipAccessSettings" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateIpAccessSettingsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ipAccessSettingsArn: S.String })).annotate({
        identifier: "CreateIpAccessSettingsResponse",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ipRange: SensitiveString, description: S.optional(SensitiveString) }),
      ).annotate({ identifier: "IpRule" });
    case 1:
      return S.Array(__S(136, __c17, 0));
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vpcId: S.String,
          subnetIds: __S(152, __c19, 0),
          securityGroupIds: __S(152, __c19, 0),
          tags: S.optional(__S(57, __c7, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/networkSettings" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateNetworkSettingsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ networkSettingsArn: S.String })).annotate({
        identifier: "CreateNetworkSettingsResponse",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          displayName: S.optional(SensitiveString),
          tags: S.optional(__S(57, __c7, 1)),
          customerManagedKey: S.optional(S.String),
          additionalEncryptionContext: S.optional(__S(64, __c8, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          authenticationType: S.optional(S.String),
          instanceType: S.optional(S.String),
          maxConcurrentSessions: S.optional(S.Number),
          portalCustomDomain: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/portals" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreatePortalRequest" });
    case 1:
      return S.suspend(() => S.Struct({ portalArn: S.String, portalEndpoint: S.String })).annotate({
        identifier: "CreatePortalResponse",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          eventFilter: __S(184, __c23, 0),
          logConfiguration: __S(177, __c22, 1),
          displayName: S.optional(SensitiveString),
          customerManagedKey: S.optional(S.String),
          additionalEncryptionContext: S.optional(__S(64, __c8, 0)),
          tags: S.optional(__S(57, __c7, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/sessionLoggers" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateSessionLoggerRequest" });
    case 1:
      return S.suspend(() => S.Struct({ sessionLoggerArn: S.String })).annotate({
        identifier: "CreateSessionLoggerResponse",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          bucket: SensitiveString,
          keyPrefix: S.optional(SensitiveString),
          bucketOwner: S.optional(S.String),
          logFileFormat: S.String,
          folderStructure: S.String,
        }),
      ).annotate({ identifier: "S3LogConfiguration" });
    case 1:
      return S.suspend(() => S.Struct({ s3: S.optional(__S(176, __c22, 0)) })).annotate({
        identifier: "LogConfiguration",
      });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ all: /*@__PURE__*/ S.Struct({}) }),
        /*@__PURE__*/ S.Struct({ include: __S(80, __c10, 0) }),
      ]);
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          certificateList: __S(200, __c25, 0),
          tags: S.optional(__S(57, __c7, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/trustStores" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateTrustStoreRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.Array(T.Blob);
    case 1:
      return S.suspend(() => S.Struct({ trustStoreArn: S.String })).annotate({
        identifier: "CreateTrustStoreResponse",
      });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          kinesisStreamArn: S.String,
          tags: S.optional(__S(57, __c7, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/userAccessLoggingSettings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateUserAccessLoggingSettingsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ userAccessLoggingSettingsArn: S.String })).annotate({
        identifier: "CreateUserAccessLoggingSettingsResponse",
      });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          logo: __S(232, __c29, 0),
          wallpaper: S.optional(__S(232, __c29, 0)),
          favicon: __S(232, __c29, 0),
          localizedStrings: __S(229, __c28, 5),
          colorTheme: S.String,
          termsOfService: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "BrandingConfigurationCreateInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          copyAllowed: S.String,
          pasteAllowed: S.String,
          downloadAllowed: S.String,
          uploadAllowed: S.String,
          printAllowed: S.String,
          tags: S.optional(__S(57, __c7, 1)),
          disconnectTimeoutInMinutes: S.optional(S.Number),
          idleDisconnectTimeoutInMinutes: S.optional(S.Number),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          cookieSynchronizationConfiguration: S.optional(__S(226, __c28, 2)),
          customerManagedKey: S.optional(S.String),
          additionalEncryptionContext: S.optional(__S(64, __c8, 0)),
          deepLinkAllowed: S.optional(S.String),
          toolbarConfiguration: S.optional(__S(227, __c28, 3)),
          brandingConfigurationInput: S.optional(__S(216, __c27, 0)),
          webAuthnAllowed: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/userSettings" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateUserSettingsRequest" });
    case 2:
      return S.suspend(() => S.Struct({ userSettingsArn: S.String })).annotate({
        identifier: "CreateUserSettingsResponse",
      });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domain: SensitiveString,
          name: S.optional(SensitiveString),
          path: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "CookieSpecification" });
    case 1:
      return S.Array(__S(224, __c28, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ allowlist: __S(225, __c28, 1), blocklist: S.optional(__S(225, __c28, 1)) }),
      ).annotate({ identifier: "CookieSynchronizationConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          toolbarType: S.optional(S.String),
          visualMode: S.optional(S.String),
          hiddenToolbarItems: S.optional(__S(152, __c19, 0)),
          maxDisplayResolution: S.optional(S.String),
        }),
      ).annotate({ identifier: "ToolbarConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          browserTabTitle: S.String,
          welcomeText: S.String,
          loginTitle: S.optional(S.String),
          loginDescription: S.optional(S.String),
          loginButtonText: S.optional(S.String),
          contactLink: S.optional(S.String),
          contactButtonText: S.optional(S.String),
          loadingText: S.optional(S.String),
        }),
      ).annotate({ identifier: "LocalizedBrandingStrings" });
    case 5:
      return S.Record(S.String, /*@__PURE__*/ __S(228, __c28, 4).pipe(S.optional));
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ blob: T.Blob }),
        /*@__PURE__*/ S.Struct({ s3Uri: S.String }),
      ]);
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ browserSettingsArn: S.String.pipe(T.HttpLabel("browserSettingsArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/browserSettings/{browserSettingsArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteBrowserSettingsRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "DeleteBrowserSettingsResponse",
      });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dataProtectionSettingsArn: S.String.pipe(T.HttpLabel("dataProtectionSettingsArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/dataProtectionSettings/{dataProtectionSettingsArn+}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDataProtectionSettingsRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ identityProviderArn: S.String.pipe(T.HttpLabel("identityProviderArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/identityProviders/{identityProviderArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteIdentityProviderRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ipAccessSettingsArn: S.String.pipe(T.HttpLabel("ipAccessSettingsArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/ipAccessSettings/{ipAccessSettingsArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteIpAccessSettingsRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ networkSettingsArn: S.String.pipe(T.HttpLabel("networkSettingsArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/networkSettings/{networkSettingsArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteNetworkSettingsRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ portalArn: S.String.pipe(T.HttpLabel("portalArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/portals/{portalArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePortalRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ sessionLoggerArn: S.String.pipe(T.HttpLabel("sessionLoggerArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/sessionLoggers/{sessionLoggerArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSessionLoggerRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ trustStoreArn: S.String.pipe(T.HttpLabel("trustStoreArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/trustStores/{trustStoreArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTrustStoreRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          userAccessLoggingSettingsArn: S.String.pipe(T.HttpLabel("userAccessLoggingSettingsArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/userAccessLoggingSettings/{userAccessLoggingSettingsArn+}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteUserAccessLoggingSettingsRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ userSettingsArn: S.String.pipe(T.HttpLabel("userSettingsArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/userSettings/{userSettingsArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteUserSettingsRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ portalArn: S.String.pipe(T.HttpLabel("portalArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/portals/{portalArn+}/browserSettings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateBrowserSettingsRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ portalArn: S.String.pipe(T.HttpLabel("portalArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/portals/{portalArn+}/dataProtectionSettings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateDataProtectionSettingsRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ portalArn: S.String.pipe(T.HttpLabel("portalArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/portals/{portalArn+}/ipAccessSettings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateIpAccessSettingsRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ portalArn: S.String.pipe(T.HttpLabel("portalArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/portals/{portalArn+}/networkSettings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateNetworkSettingsRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ portalArn: S.String.pipe(T.HttpLabel("portalArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/portals/{portalArn+}/sessionLogger" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateSessionLoggerRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ portalArn: S.String.pipe(T.HttpLabel("portalArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/portals/{portalArn+}/trustStores" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateTrustStoreRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ portalArn: S.String.pipe(T.HttpLabel("portalArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/portals/{portalArn+}/userAccessLoggingSettings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateUserAccessLoggingSettingsRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ portalArn: S.String.pipe(T.HttpLabel("portalArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/portals/{portalArn+}/userSettings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateUserSettingsRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          portalId: S.String.pipe(T.HttpLabel("portalId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/portals/{portalId}/sessions/{sessionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ExpireSessionRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ browserSettingsArn: S.String.pipe(T.HttpLabel("browserSettingsArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/browserSettings/{browserSettingsArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBrowserSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ browserSettings: S.optional(__S(408, __c51, 0)) }),
      ).annotate({ identifier: "GetBrowserSettingsResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          browserSettingsArn: S.String,
          associatedPortalArns: S.optional(__S(152, __c19, 0)),
          browserPolicy: S.optional(SensitiveString),
          customerManagedKey: S.optional(S.String),
          additionalEncryptionContext: S.optional(__S(64, __c8, 0)),
          webContentFilteringPolicy: S.optional(__S(88, __c11, 0)),
        }),
      ).annotate({ identifier: "BrowserSettings" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dataProtectionSettingsArn: S.String.pipe(T.HttpLabel("dataProtectionSettingsArn")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/dataProtectionSettings/{dataProtectionSettingsArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataProtectionSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ dataProtectionSettings: S.optional(__S(424, __c53, 0)) }),
      ).annotate({ identifier: "GetDataProtectionSettingsResponse" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dataProtectionSettingsArn: S.String,
          inlineRedactionConfiguration: S.optional(__S(116, __c14, 4)),
          associatedPortalArns: S.optional(__S(152, __c19, 0)),
          displayName: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          customerManagedKey: S.optional(S.String),
          additionalEncryptionContext: S.optional(__S(64, __c8, 0)),
        }),
      ).annotate({ identifier: "DataProtectionSettings" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ identityProviderArn: S.String.pipe(T.HttpLabel("identityProviderArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/identityProviders/{identityProviderArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetIdentityProviderRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ identityProvider: S.optional(__S(440, __c55, 0)) }),
      ).annotate({ identifier: "GetIdentityProviderResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          identityProviderArn: S.String,
          identityProviderName: S.optional(SensitiveString),
          identityProviderType: S.optional(S.String),
          identityProviderDetails: S.optional(__S(64, __c8, 0)),
        }),
      ).annotate({ identifier: "IdentityProvider" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ipAccessSettingsArn: S.String.pipe(T.HttpLabel("ipAccessSettingsArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/ipAccessSettings/{ipAccessSettingsArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetIpAccessSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ipAccessSettings: S.optional(__S(456, __c57, 0)) }),
      ).annotate({ identifier: "GetIpAccessSettingsResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ipAccessSettingsArn: S.String,
          associatedPortalArns: S.optional(__S(152, __c19, 0)),
          ipRules: S.optional(__S(137, __c17, 1)),
          displayName: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          customerManagedKey: S.optional(S.String),
          additionalEncryptionContext: S.optional(__S(64, __c8, 0)),
        }),
      ).annotate({ identifier: "IpAccessSettings" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ networkSettingsArn: S.String.pipe(T.HttpLabel("networkSettingsArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/networkSettings/{networkSettingsArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetNetworkSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ networkSettings: S.optional(__S(472, __c59, 0)) }),
      ).annotate({ identifier: "GetNetworkSettingsResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkSettingsArn: S.String,
          associatedPortalArns: S.optional(__S(152, __c19, 0)),
          vpcId: S.optional(S.String),
          subnetIds: S.optional(__S(152, __c19, 0)),
          securityGroupIds: S.optional(__S(152, __c19, 0)),
        }),
      ).annotate({ identifier: "NetworkSettings" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ portalArn: S.String.pipe(T.HttpLabel("portalArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/portals/{portalArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPortalRequest" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          portalArn: S.String,
          rendererType: S.optional(S.String),
          browserType: S.optional(S.String),
          portalStatus: S.optional(S.String),
          portalEndpoint: S.optional(S.String),
          displayName: S.optional(SensitiveString),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          browserSettingsArn: S.optional(S.String),
          dataProtectionSettingsArn: S.optional(S.String),
          userSettingsArn: S.optional(S.String),
          networkSettingsArn: S.optional(S.String),
          sessionLoggerArn: S.optional(S.String),
          trustStoreArn: S.optional(S.String),
          statusReason: S.optional(S.String),
          userAccessLoggingSettingsArn: S.optional(S.String),
          authenticationType: S.optional(S.String),
          ipAccessSettingsArn: S.optional(S.String),
          customerManagedKey: S.optional(S.String),
          additionalEncryptionContext: S.optional(__S(64, __c8, 0)),
          instanceType: S.optional(S.String),
          maxConcurrentSessions: S.optional(S.Number),
          portalCustomDomain: S.optional(S.String),
        }),
      ).annotate({ identifier: "Portal" });
    case 1:
      return S.suspend(() => S.Struct({ portal: S.optional(__S(488, __c61, 0)) })).annotate({
        identifier: "GetPortalResponse",
      });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ portalArn: S.String.pipe(T.HttpLabel("portalArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/portalIdp/{portalArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPortalServiceProviderMetadataRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ portalArn: S.String, serviceProviderSamlMetadata: S.optional(S.String) }),
      ).annotate({ identifier: "GetPortalServiceProviderMetadataResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          portalId: S.String.pipe(T.HttpLabel("portalId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/portals/{portalId}/sessions/{sessionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSessionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          portalArn: S.optional(S.String),
          sessionId: S.optional(S.String),
          username: S.optional(SensitiveString),
          clientIpAddresses: S.optional(__S(72, __c9, 0)),
          status: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Session" });
    case 2:
      return S.suspend(() => S.Struct({ session: S.optional(__S(505, __c63, 1)) })).annotate({
        identifier: "GetSessionResponse",
      });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ sessionLoggerArn: S.String.pipe(T.HttpLabel("sessionLoggerArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/sessionLoggers/{sessionLoggerArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSessionLoggerRequest" });
    case 1:
      return S.suspend(() => S.Struct({ sessionLogger: S.optional(__S(520, __c65, 0)) })).annotate({
        identifier: "GetSessionLoggerResponse",
      });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sessionLoggerArn: S.String,
          eventFilter: S.optional(__S(184, __c23, 0)),
          logConfiguration: S.optional(__S(177, __c22, 1)),
          customerManagedKey: S.optional(S.String),
          additionalEncryptionContext: S.optional(__S(64, __c8, 0)),
          associatedPortalArns: S.optional(__S(152, __c19, 0)),
          displayName: S.optional(SensitiveString),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "SessionLogger" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ trustStoreArn: S.String.pipe(T.HttpLabel("trustStoreArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/trustStores/{trustStoreArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTrustStoreRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ associatedPortalArns: S.optional(__S(152, __c19, 0)), trustStoreArn: S.String }),
      ).annotate({ identifier: "TrustStore" });
    case 2:
      return S.suspend(() => S.Struct({ trustStore: S.optional(__S(529, __c66, 1)) })).annotate({
        identifier: "GetTrustStoreResponse",
      });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          trustStoreArn: S.String.pipe(T.HttpLabel("trustStoreArn")),
          thumbprint: S.String.pipe(T.HttpQuery("thumbprint")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/trustStores/{trustStoreArn+}/certificate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTrustStoreCertificateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          thumbprint: S.optional(S.String),
          subject: S.optional(S.String),
          issuer: S.optional(S.String),
          notValidBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          notValidAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          body: S.optional(T.Blob),
        }),
      ).annotate({ identifier: "Certificate" });
    case 2:
      return S.suspend(() =>
        S.Struct({ trustStoreArn: S.String, certificate: S.optional(__S(537, __c67, 1)) }),
      ).annotate({ identifier: "GetTrustStoreCertificateResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          userAccessLoggingSettingsArn: S.String.pipe(T.HttpLabel("userAccessLoggingSettingsArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/userAccessLoggingSettings/{userAccessLoggingSettingsArn+}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetUserAccessLoggingSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ userAccessLoggingSettings: S.optional(__S(552, __c69, 0)) }),
      ).annotate({ identifier: "GetUserAccessLoggingSettingsResponse" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          userAccessLoggingSettingsArn: S.String,
          associatedPortalArns: S.optional(__S(152, __c19, 0)),
          kinesisStreamArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "UserAccessLoggingSettings" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ userSettingsArn: S.String.pipe(T.HttpLabel("userSettingsArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/userSettings/{userSettingsArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetUserSettingsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ userSettings: S.optional(__S(576, __c72, 0)) })).annotate({
        identifier: "GetUserSettingsResponse",
      });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          mimeType: S.String,
          fileExtension: S.String,
          lastUploadTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "ImageMetadata" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          logo: __S(568, __c71, 0),
          wallpaper: S.optional(__S(568, __c71, 0)),
          favicon: __S(568, __c71, 0),
          localizedStrings: __S(229, __c28, 5),
          colorTheme: S.String,
          termsOfService: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "BrandingConfiguration" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          userSettingsArn: S.String,
          associatedPortalArns: S.optional(__S(152, __c19, 0)),
          copyAllowed: S.optional(S.String),
          pasteAllowed: S.optional(S.String),
          downloadAllowed: S.optional(S.String),
          uploadAllowed: S.optional(S.String),
          printAllowed: S.optional(S.String),
          disconnectTimeoutInMinutes: S.optional(S.Number),
          idleDisconnectTimeoutInMinutes: S.optional(S.Number),
          cookieSynchronizationConfiguration: S.optional(__S(226, __c28, 2)),
          customerManagedKey: S.optional(S.String),
          additionalEncryptionContext: S.optional(__S(64, __c8, 0)),
          deepLinkAllowed: S.optional(S.String),
          toolbarConfiguration: S.optional(__S(227, __c28, 3)),
          brandingConfiguration: S.optional(__S(569, __c71, 1)),
          webAuthnAllowed: S.optional(S.String),
        }),
      ).annotate({ identifier: "UserSettings" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/browserSettings" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListBrowserSettingsRequest" });
    case 1:
      return S.Array(__S(96, __c12, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          browserSettings: S.optional(__S(585, __c73, 1)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListBrowserSettingsResponse" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/dataProtectionSettings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDataProtectionSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          dataProtectionSettingsArn: S.String,
          displayName: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DataProtectionSettingsSummary" });
    case 2:
      return S.Array(__S(593, __c74, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          dataProtectionSettings: S.optional(__S(594, __c74, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDataProtectionSettingsResponse" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          portalArn: S.String.pipe(T.HttpLabel("portalArn")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/portals/{portalArn+}/identityProviders" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListIdentityProvidersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          identityProviderArn: S.String,
          identityProviderName: S.optional(SensitiveString),
          identityProviderType: S.optional(S.String),
        }),
      ).annotate({ identifier: "IdentityProviderSummary" });
    case 2:
      return S.Array(__S(601, __c75, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          identityProviders: S.optional(__S(602, __c75, 2)),
        }),
      ).annotate({ identifier: "ListIdentityProvidersResponse" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/ipAccessSettings" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListIpAccessSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ipAccessSettingsArn: S.String,
          displayName: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "IpAccessSettingsSummary" });
    case 2:
      return S.Array(__S(609, __c76, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ipAccessSettings: S.optional(__S(610, __c76, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListIpAccessSettingsResponse" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/networkSettings" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListNetworkSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ networkSettingsArn: S.String, vpcId: S.optional(S.String) }),
      ).annotate({ identifier: "NetworkSettingsSummary" });
    case 2:
      return S.Array(__S(617, __c77, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          networkSettings: S.optional(__S(618, __c77, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListNetworkSettingsResponse" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/portals" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPortalsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          portalArn: S.String,
          rendererType: S.optional(S.String),
          browserType: S.optional(S.String),
          portalStatus: S.optional(S.String),
          portalEndpoint: S.optional(S.String),
          displayName: S.optional(SensitiveString),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          browserSettingsArn: S.optional(S.String),
          dataProtectionSettingsArn: S.optional(S.String),
          userSettingsArn: S.optional(S.String),
          networkSettingsArn: S.optional(S.String),
          sessionLoggerArn: S.optional(S.String),
          trustStoreArn: S.optional(S.String),
          userAccessLoggingSettingsArn: S.optional(S.String),
          authenticationType: S.optional(S.String),
          ipAccessSettingsArn: S.optional(S.String),
          instanceType: S.optional(S.String),
          maxConcurrentSessions: S.optional(S.Number),
          portalCustomDomain: S.optional(S.String),
        }),
      ).annotate({ identifier: "PortalSummary" });
    case 2:
      return S.Array(__S(625, __c78, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ portals: S.optional(__S(626, __c78, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPortalsResponse" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/sessionLoggers" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListSessionLoggersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          sessionLoggerArn: S.String,
          logConfiguration: S.optional(__S(177, __c22, 1)),
          displayName: S.optional(SensitiveString),
          creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "SessionLoggerSummary" });
    case 2:
      return S.Array(__S(633, __c79, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          sessionLoggers: S.optional(__S(634, __c79, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListSessionLoggersResponse" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          portalId: S.String.pipe(T.HttpLabel("portalId")),
          username: S.optional(SensitiveString).pipe(T.HttpQuery("username")),
          sessionId: S.optional(S.String).pipe(T.HttpQuery("sessionId")),
          sortBy: S.optional(S.String).pipe(T.HttpQuery("sortBy")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/portals/{portalId}/sessions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSessionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          portalArn: S.optional(S.String),
          sessionId: S.optional(S.String),
          username: S.optional(SensitiveString),
          status: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "SessionSummary" });
    case 2:
      return S.Array(__S(641, __c80, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ sessions: __S(642, __c80, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSessionsResponse" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{resourceArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(57, __c7, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          trustStoreArn: S.String.pipe(T.HttpLabel("trustStoreArn")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/trustStores/{trustStoreArn+}/certificates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTrustStoreCertificatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          thumbprint: S.optional(S.String),
          subject: S.optional(S.String),
          issuer: S.optional(S.String),
          notValidBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          notValidAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CertificateSummary" });
    case 2:
      return S.Array(__S(657, __c82, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          certificateList: S.optional(__S(658, __c82, 2)),
          trustStoreArn: S.String,
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListTrustStoreCertificatesResponse" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/trustStores" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTrustStoresRequest" });
    case 1:
      return S.suspend(() => S.Struct({ trustStoreArn: S.optional(S.String) })).annotate({
        identifier: "TrustStoreSummary",
      });
    case 2:
      return S.Array(__S(665, __c83, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ trustStores: S.optional(__S(666, __c83, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTrustStoresResponse" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/userAccessLoggingSettings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListUserAccessLoggingSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          userAccessLoggingSettingsArn: S.String,
          kinesisStreamArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "UserAccessLoggingSettingsSummary" });
    case 2:
      return S.Array(__S(673, __c84, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          userAccessLoggingSettings: S.optional(__S(674, __c84, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListUserAccessLoggingSettingsResponse" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(680, __c85, 0));
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/userSettings" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListUserSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          userSettingsArn: S.String,
          copyAllowed: S.optional(S.String),
          pasteAllowed: S.optional(S.String),
          downloadAllowed: S.optional(S.String),
          uploadAllowed: S.optional(S.String),
          printAllowed: S.optional(S.String),
          disconnectTimeoutInMinutes: S.optional(S.Number),
          idleDisconnectTimeoutInMinutes: S.optional(S.Number),
          cookieSynchronizationConfiguration: S.optional(__S(226, __c28, 2)),
          deepLinkAllowed: S.optional(S.String),
          toolbarConfiguration: S.optional(__S(227, __c28, 3)),
          brandingConfiguration: S.optional(__S(569, __c71, 1)),
          webAuthnAllowed: S.optional(S.String),
        }),
      ).annotate({ identifier: "UserSettingsSummary" });
    case 2:
      return S.Array(__S(689, __c86, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ userSettings: S.optional(__S(690, __c86, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListUserSettingsResponse" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(57, __c7, 1),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{resourceArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(72, __c9, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{resourceArn+}" }),
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
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          browserSettingsArn: S.String.pipe(T.HttpLabel("browserSettingsArn")),
          browserPolicy: S.optional(SensitiveString),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          webContentFilteringPolicy: S.optional(__S(88, __c11, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/browserSettings/{browserSettingsArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateBrowserSettingsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ browserSettings: __S(408, __c51, 0) })).annotate({
        identifier: "UpdateBrowserSettingsResponse",
      });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dataProtectionSettingsArn: S.String.pipe(T.HttpLabel("dataProtectionSettingsArn")),
          inlineRedactionConfiguration: S.optional(__S(116, __c14, 4)),
          displayName: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/dataProtectionSettings/{dataProtectionSettingsArn+}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDataProtectionSettingsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ dataProtectionSettings: __S(424, __c53, 0) })).annotate({
        identifier: "UpdateDataProtectionSettingsResponse",
      });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          identityProviderArn: S.String.pipe(T.HttpLabel("identityProviderArn")),
          identityProviderName: S.optional(SensitiveString),
          identityProviderType: S.optional(S.String),
          identityProviderDetails: S.optional(__S(64, __c8, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/identityProviders/{identityProviderArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateIdentityProviderRequest" });
    case 1:
      return S.suspend(() => S.Struct({ identityProvider: __S(440, __c55, 0) })).annotate({
        identifier: "UpdateIdentityProviderResponse",
      });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ipAccessSettingsArn: S.String.pipe(T.HttpLabel("ipAccessSettingsArn")),
          displayName: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          ipRules: S.optional(__S(137, __c17, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/ipAccessSettings/{ipAccessSettingsArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateIpAccessSettingsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ipAccessSettings: __S(456, __c57, 0) })).annotate({
        identifier: "UpdateIpAccessSettingsResponse",
      });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkSettingsArn: S.String.pipe(T.HttpLabel("networkSettingsArn")),
          vpcId: S.optional(S.String),
          subnetIds: S.optional(__S(152, __c19, 0)),
          securityGroupIds: S.optional(__S(152, __c19, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/networkSettings/{networkSettingsArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateNetworkSettingsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ networkSettings: __S(472, __c59, 0) })).annotate({
        identifier: "UpdateNetworkSettingsResponse",
      });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          portalArn: S.String.pipe(T.HttpLabel("portalArn")),
          displayName: S.optional(SensitiveString),
          authenticationType: S.optional(S.String),
          instanceType: S.optional(S.String),
          maxConcurrentSessions: S.optional(S.Number),
          portalCustomDomain: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/portals/{portalArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdatePortalRequest" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sessionLoggerArn: S.String.pipe(T.HttpLabel("sessionLoggerArn")),
          eventFilter: S.optional(__S(184, __c23, 0)),
          logConfiguration: S.optional(__S(177, __c22, 1)),
          displayName: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/sessionLoggers/{sessionLoggerArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSessionLoggerRequest" });
    case 1:
      return S.suspend(() => S.Struct({ sessionLogger: __S(520, __c65, 0) })).annotate({
        identifier: "UpdateSessionLoggerResponse",
      });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          portalArn: S.String.pipe(T.HttpLabel("portalArn")),
          browserSettingsArn: S.String.pipe(T.HttpQuery("browserSettingsArn")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/portals/{portalArn+}/browserSettings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateBrowserSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ portalArn: S.String, browserSettingsArn: S.String }),
      ).annotate({ identifier: "AssociateBrowserSettingsResponse" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          trustStoreArn: S.String.pipe(T.HttpLabel("trustStoreArn")),
          certificatesToAdd: S.optional(__S(200, __c25, 0)),
          certificatesToDelete: S.optional(__S(152, __c19, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/trustStores/{trustStoreArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateTrustStoreRequest" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          userAccessLoggingSettingsArn: S.String.pipe(T.HttpLabel("userAccessLoggingSettingsArn")),
          kinesisStreamArn: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/userAccessLoggingSettings/{userAccessLoggingSettingsArn+}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateUserAccessLoggingSettingsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ userAccessLoggingSettings: __S(552, __c69, 0) })).annotate({
        identifier: "UpdateUserAccessLoggingSettingsResponse",
      });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          logo: S.optional(__S(232, __c29, 0)),
          wallpaper: S.optional(__S(232, __c29, 0)),
          favicon: S.optional(__S(232, __c29, 0)),
          localizedStrings: S.optional(__S(229, __c28, 5)),
          colorTheme: S.optional(S.String),
          termsOfService: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "BrandingConfigurationUpdateInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          userSettingsArn: S.String.pipe(T.HttpLabel("userSettingsArn")),
          copyAllowed: S.optional(S.String),
          pasteAllowed: S.optional(S.String),
          downloadAllowed: S.optional(S.String),
          uploadAllowed: S.optional(S.String),
          printAllowed: S.optional(S.String),
          disconnectTimeoutInMinutes: S.optional(S.Number),
          idleDisconnectTimeoutInMinutes: S.optional(S.Number),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          cookieSynchronizationConfiguration: S.optional(__S(226, __c28, 2)),
          deepLinkAllowed: S.optional(S.String),
          toolbarConfiguration: S.optional(__S(227, __c28, 3)),
          brandingConfigurationInput: S.optional(__S(792, __c99, 0)),
          webAuthnAllowed: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/userSettings/{userSettingsArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateUserSettingsRequest" });
    case 2:
      return S.suspend(() => S.Struct({ userSettings: __S(576, __c72, 0) })).annotate({
        identifier: "UpdateUserSettingsResponse",
      });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          portalArn: S.String.pipe(T.HttpLabel("portalArn")),
          dataProtectionSettingsArn: S.String.pipe(T.HttpQuery("dataProtectionSettingsArn")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/portals/{portalArn+}/dataProtectionSettings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateDataProtectionSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ portalArn: S.String, dataProtectionSettingsArn: S.String }),
      ).annotate({ identifier: "AssociateDataProtectionSettingsResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
