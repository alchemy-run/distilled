import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsQueryProtocol } from "../protocols/aws-query.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Elastic Load Balancing v2",
  target: "ElasticLoadBalancing_v10",
  version: "2015-12-01",
  sigv4: "elasticloadbalancing",
  protocol: awsQueryProtocol,
  xmlns: "http://elasticloadbalancing.amazonaws.com/doc/2015-12-01/",
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
                `https://elasticloadbalancing-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                return e(
                  `https://elasticloadbalancing.${Region}.amazonaws.com`,
                );
              }
              return e(
                `https://elasticloadbalancing-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://elasticloadbalancing.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://elasticloadbalancing.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AllocationIdNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "AllocationIdNotFoundException",
    ["BadRequestError"],
    { code: "AllocationIdNotFound", status: 400 },
  )<{ readonly message?: string }> {}
export class ALPNPolicyNotSupportedException
  extends /*@__PURE__*/ TE.TaggedError(
    "ALPNPolicyNotSupportedException",
    ["BadRequestError"],
    { code: "ALPNPolicyNotFound", status: 400 },
  )<{ readonly message?: string }> {}
export class AvailabilityZoneNotSupportedException
  extends /*@__PURE__*/ TE.TaggedError(
    "AvailabilityZoneNotSupportedException",
    ["BadRequestError"],
    { code: "AvailabilityZoneNotSupported", status: 400 },
  )<{ readonly message?: string }> {}
export class CaCertificatesBundleNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "CaCertificatesBundleNotFoundException",
    ["BadRequestError"],
    { code: "CaCertificatesBundleNotFound", status: 400 },
  )<{ readonly message?: string }> {}
export class CapacityDecreaseRequestsLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "CapacityDecreaseRequestsLimitExceededException",
    ["BadRequestError"],
    { code: "CapacityDecreaseRequestLimitExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class CapacityReservationPendingException
  extends /*@__PURE__*/ TE.TaggedError(
    "CapacityReservationPendingException",
    ["BadRequestError"],
    { code: "CapacityReservationPending", status: 400 },
  )<{ readonly message?: string }> {}
export class CapacityUnitsLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "CapacityUnitsLimitExceededException",
    ["BadRequestError"],
    { code: "CapacityUnitsLimitExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class CertificateNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "CertificateNotFoundException",
    ["BadRequestError"],
    { code: "CertificateNotFound", status: 400 },
  )<{ readonly message?: string }> {}
export class DeleteAssociationSameAccountException
  extends /*@__PURE__*/ TE.TaggedError(
    "DeleteAssociationSameAccountException",
    ["BadRequestError"],
    { code: "DeleteAssociationSameAccount", status: 400 },
  )<{ readonly message?: string }> {}
export class DuplicateListenerException
  extends /*@__PURE__*/ TE.TaggedError(
    "DuplicateListenerException",
    ["BadRequestError"],
    { code: "DuplicateListener", status: 400 },
  )<{ readonly message?: string }> {}
export class DuplicateLoadBalancerNameException
  extends /*@__PURE__*/ TE.TaggedError(
    "DuplicateLoadBalancerNameException",
    ["BadRequestError"],
    { code: "DuplicateLoadBalancerName", status: 400 },
  )<{ readonly message?: string }> {}
export class DuplicateTagKeysException
  extends /*@__PURE__*/ TE.TaggedError(
    "DuplicateTagKeysException",
    ["BadRequestError"],
    { code: "DuplicateTagKeys", status: 400 },
  )<{ readonly message?: string }> {}
export class DuplicateTargetGroupNameException
  extends /*@__PURE__*/ TE.TaggedError(
    "DuplicateTargetGroupNameException",
    ["BadRequestError"],
    { code: "DuplicateTargetGroupName", status: 400 },
  )<{ readonly message?: string }> {}
export class DuplicateTrustStoreNameException
  extends /*@__PURE__*/ TE.TaggedError(
    "DuplicateTrustStoreNameException",
    ["BadRequestError"],
    { code: "DuplicateTrustStoreName", status: 400 },
  )<{ readonly message?: string }> {}
export class HealthUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "HealthUnavailableException",
    ["ServerError"],
    { code: "HealthUnavailable", status: 500 },
  )<{ readonly message?: string }> {}
export class IncompatibleProtocolsException
  extends /*@__PURE__*/ TE.TaggedError(
    "IncompatibleProtocolsException",
    ["BadRequestError"],
    { code: "IncompatibleProtocols", status: 400 },
  )<{ readonly message?: string }> {}
export class InsufficientCapacityException
  extends /*@__PURE__*/ TE.TaggedError(
    "InsufficientCapacityException",
    ["ServerError"],
    { code: "InsufficientCapacity", status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidCaCertificatesBundleException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidCaCertificatesBundleException",
    ["BadRequestError"],
    { code: "InvalidCaCertificatesBundle", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidConfigurationRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidConfigurationRequestException",
    ["BadRequestError"],
    { code: "InvalidConfigurationRequest", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidLoadBalancerActionException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidLoadBalancerActionException",
    ["BadRequestError"],
    { code: "InvalidLoadBalancerAction", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidRevocationContentException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRevocationContentException",
    ["BadRequestError"],
    { code: "InvalidRevocationContent", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidSchemeException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidSchemeException",
    ["BadRequestError"],
    { code: "InvalidScheme", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidSecurityGroupException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidSecurityGroupException",
    ["BadRequestError"],
    { code: "InvalidSecurityGroup", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidSubnetException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidSubnetException",
    ["BadRequestError"],
    { code: "InvalidSubnet", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidTargetException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidTargetException",
    ["BadRequestError"],
    { code: "InvalidTarget", status: 400 },
  )<{ readonly message?: string }> {}
export class ListenerNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ListenerNotFoundException",
    ["BadRequestError"],
    { code: "ListenerNotFound", status: 400 },
  )<{ readonly message?: string }> {}
export class LoadBalancerNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "LoadBalancerNotFoundException",
    ["BadRequestError"],
    { code: "LoadBalancerNotFound", status: 400 },
  )<{ readonly message?: string }> {}
export class OperationNotPermittedException
  extends /*@__PURE__*/ TE.TaggedError(
    "OperationNotPermittedException",
    ["BadRequestError"],
    { code: "OperationNotPermitted", status: 400 },
  )<{ readonly message?: string }> {}
export class PriorityInUseException
  extends /*@__PURE__*/ TE.TaggedError(
    "PriorityInUseException",
    ["BadRequestError"],
    { code: "PriorityInUse", status: 400 },
  )<{ readonly message?: string }> {}
export class PriorRequestNotCompleteException
  extends /*@__PURE__*/ TE.TaggedError(
    "PriorRequestNotCompleteException",
    ["ThrottlingError"],
    { code: "PriorRequestNotComplete", status: 429 },
  )<{ readonly message?: string }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceInUseException",
    ["BadRequestError"],
    { code: "ResourceInUse", status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { code: "ResourceNotFound", status: 400 },
  )<{ readonly message?: string }> {}
export class RevocationContentNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "RevocationContentNotFoundException",
    ["BadRequestError"],
    { code: "RevocationContentNotFound", status: 400 },
  )<{ readonly message?: string }> {}
export class RevocationIdNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "RevocationIdNotFoundException",
    ["BadRequestError"],
    { code: "RevocationIdNotFound", status: 400 },
  )<{ readonly message?: string }> {}
export class RuleNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "RuleNotFoundException",
    ["BadRequestError"],
    { code: "RuleNotFound", status: 400 },
  )<{ readonly message?: string }> {}
export class SSLPolicyNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "SSLPolicyNotFoundException",
    ["BadRequestError"],
    { code: "SSLPolicyNotFound", status: 400 },
  )<{ readonly message?: string }> {}
export class SubnetNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "SubnetNotFoundException",
    ["BadRequestError"],
    { code: "SubnetNotFound", status: 400 },
  )<{ readonly message?: string }> {}
export class TargetGroupAssociationLimitException
  extends /*@__PURE__*/ TE.TaggedError(
    "TargetGroupAssociationLimitException",
    ["BadRequestError"],
    { code: "TargetGroupAssociationLimit", status: 400 },
  )<{ readonly message?: string }> {}
export class TargetGroupNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "TargetGroupNotFoundException",
    ["BadRequestError"],
    { code: "TargetGroupNotFound", status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyActionsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyActionsException",
    ["BadRequestError"],
    { code: "TooManyActions", status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyCertificatesException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyCertificatesException",
    ["BadRequestError"],
    { code: "TooManyCertificates", status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyListenersException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyListenersException",
    ["BadRequestError"],
    { code: "TooManyListeners", status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyLoadBalancersException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyLoadBalancersException",
    ["BadRequestError"],
    { code: "TooManyLoadBalancers", status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyRegistrationsForTargetIdException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRegistrationsForTargetIdException",
    ["BadRequestError"],
    { code: "TooManyRegistrationsForTargetId", status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyRulesException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRulesException",
    ["BadRequestError"],
    { code: "TooManyRules", status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { code: "TooManyTags", status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyTargetGroupsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTargetGroupsException",
    ["BadRequestError"],
    { code: "TooManyTargetGroups", status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyTargetsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTargetsException",
    ["BadRequestError"],
    { code: "TooManyTargets", status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyTrustStoreRevocationEntriesException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTrustStoreRevocationEntriesException",
    ["BadRequestError"],
    { code: "TooManyTrustStoreRevocationEntries", status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyTrustStoresException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTrustStoresException",
    ["BadRequestError"],
    { code: "TooManyTrustStores", status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyUniqueTargetGroupsPerLoadBalancerException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyUniqueTargetGroupsPerLoadBalancerException",
    ["BadRequestError"],
    { code: "TooManyUniqueTargetGroupsPerLoadBalancer", status: 400 },
  )<{ readonly message?: string }> {}
export class TrustStoreAssociationNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "TrustStoreAssociationNotFoundException",
    ["BadRequestError"],
    { code: "AssociationNotFound", status: 400 },
  )<{ readonly message?: string }> {}
export class TrustStoreInUseException
  extends /*@__PURE__*/ TE.TaggedError(
    "TrustStoreInUseException",
    ["BadRequestError"],
    { code: "TrustStoreInUse", status: 400 },
  )<{ readonly message?: string }> {}
export class TrustStoreNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "TrustStoreNotFoundException",
    ["BadRequestError"],
    { code: "TrustStoreNotFound", status: 400 },
  )<{ readonly message?: string }> {}
export class TrustStoreNotReadyException
  extends /*@__PURE__*/ TE.TaggedError(
    "TrustStoreNotReadyException",
    ["BadRequestError"],
    { code: "TrustStoreNotReady", status: 400 },
  )<{ readonly message?: string }> {}
export class UnsupportedProtocolException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedProtocolException",
    ["BadRequestError"],
    { code: "UnsupportedProtocol", status: 400 },
  )<{ readonly message?: string }> {}
export type ListenerArn = string;
export type CertificateArn = string;
export type Default = boolean;
export interface Certificate {
  CertificateArn?: string;
  IsDefault?: boolean;
}
export type CertificateList = Certificate[];
export interface AddListenerCertificatesInput {
  ListenerArn?: string;
  Certificates?: Certificate[];
}
export interface AddListenerCertificatesOutput {
  Certificates?: Certificate[];
}
export type ResourceArn = string;
export type ResourceArns = string[];
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export type TagList = Tag[];
export interface AddTagsInput {
  ResourceArns?: string[];
  Tags?: Tag[];
}
export interface AddTagsOutput {}
export type TrustStoreArn = string;
export type S3Bucket = string;
export type S3Key = string;
export type S3ObjectVersion = string;
export type RevocationType = "CRL" | (string & {});
export interface RevocationContent {
  S3Bucket?: string;
  S3Key?: string;
  S3ObjectVersion?: string;
  RevocationType?: RevocationType;
}
export type RevocationContents = RevocationContent[];
export interface AddTrustStoreRevocationsInput {
  TrustStoreArn?: string;
  RevocationContents?: RevocationContent[];
}
export type RevocationId = number;
export type NumberOfRevokedEntries = number;
export interface TrustStoreRevocation {
  TrustStoreArn?: string;
  RevocationId?: number;
  RevocationType?: RevocationType;
  NumberOfRevokedEntries?: number;
}
export type TrustStoreRevocations = TrustStoreRevocation[];
export interface AddTrustStoreRevocationsOutput {
  TrustStoreRevocations?: TrustStoreRevocation[];
}
export type LoadBalancerArn = string;
export type ProtocolEnum =
  | "HTTP"
  | "HTTPS"
  | "TCP"
  | "TLS"
  | "UDP"
  | "TCP_UDP"
  | "GENEVE"
  | "QUIC"
  | "TCP_QUIC"
  | (string & {});
export type Port = number;
export type SslPolicyName = string;
export type ActionTypeEnum =
  | "forward"
  | "authenticate-oidc"
  | "authenticate-cognito"
  | "redirect"
  | "fixed-response"
  | "jwt-validation"
  | (string & {});
export type TargetGroupArn = string;
export type AuthenticateOidcActionIssuer = string;
export type AuthenticateOidcActionAuthorizationEndpoint = string;
export type AuthenticateOidcActionTokenEndpoint = string;
export type AuthenticateOidcActionUserInfoEndpoint = string;
export type AuthenticateOidcActionClientId = string;
export type AuthenticateOidcActionClientSecret = string;
export type AuthenticateOidcActionSessionCookieName = string;
export type AuthenticateOidcActionScope = string;
export type AuthenticateOidcActionSessionTimeout = number;
export type AuthenticateOidcActionAuthenticationRequestParamName = string;
export type AuthenticateOidcActionAuthenticationRequestParamValue = string;
export type AuthenticateOidcActionAuthenticationRequestExtraParams = {
  [key: string]: string | undefined;
};
export type AuthenticateOidcActionConditionalBehaviorEnum =
  | "deny"
  | "allow"
  | "authenticate"
  | (string & {});
export type AuthenticateOidcActionUseExistingClientSecret = boolean;
export interface AuthenticateOidcActionConfig {
  Issuer?: string;
  AuthorizationEndpoint?: string;
  TokenEndpoint?: string;
  UserInfoEndpoint?: string;
  ClientId?: string;
  ClientSecret?: string | redacted.Redacted<string>;
  SessionCookieName?: string;
  Scope?: string;
  SessionTimeout?: number;
  AuthenticationRequestExtraParams?: { [key: string]: string | undefined };
  OnUnauthenticatedRequest?: AuthenticateOidcActionConditionalBehaviorEnum;
  UseExistingClientSecret?: boolean;
}
export type AuthenticateCognitoActionUserPoolArn = string;
export type AuthenticateCognitoActionUserPoolClientId = string;
export type AuthenticateCognitoActionUserPoolDomain = string;
export type AuthenticateCognitoActionSessionCookieName = string;
export type AuthenticateCognitoActionScope = string;
export type AuthenticateCognitoActionSessionTimeout = number;
export type AuthenticateCognitoActionAuthenticationRequestParamName = string;
export type AuthenticateCognitoActionAuthenticationRequestParamValue = string;
export type AuthenticateCognitoActionAuthenticationRequestExtraParams = {
  [key: string]: string | undefined;
};
export type AuthenticateCognitoActionConditionalBehaviorEnum =
  | "deny"
  | "allow"
  | "authenticate"
  | (string & {});
export interface AuthenticateCognitoActionConfig {
  UserPoolArn?: string;
  UserPoolClientId?: string;
  UserPoolDomain?: string;
  SessionCookieName?: string;
  Scope?: string;
  SessionTimeout?: number;
  AuthenticationRequestExtraParams?: { [key: string]: string | undefined };
  OnUnauthenticatedRequest?: AuthenticateCognitoActionConditionalBehaviorEnum;
}
export type ActionOrder = number;
export type RedirectActionProtocol = string;
export type RedirectActionPort = string;
export type RedirectActionHost = string;
export type RedirectActionPath = string;
export type RedirectActionQuery = string;
export type RedirectActionStatusCodeEnum =
  | "HTTP_301"
  | "HTTP_302"
  | (string & {});
export interface RedirectActionConfig {
  Protocol?: string;
  Port?: string;
  Host?: string;
  Path?: string;
  Query?: string;
  StatusCode?: RedirectActionStatusCodeEnum;
}
export type FixedResponseActionMessage = string;
export type FixedResponseActionStatusCode = string;
export type FixedResponseActionContentType = string;
export interface FixedResponseActionConfig {
  MessageBody?: string;
  StatusCode?: string;
  ContentType?: string;
}
export type TargetGroupWeight = number;
export interface TargetGroupTuple {
  TargetGroupArn?: string;
  Weight?: number;
}
export type TargetGroupList = TargetGroupTuple[];
export type TargetGroupStickinessEnabled = boolean;
export type TargetGroupStickinessDurationSeconds = number;
export interface TargetGroupStickinessConfig {
  Enabled?: boolean;
  DurationSeconds?: number;
}
export interface ForwardActionConfig {
  TargetGroups?: TargetGroupTuple[];
  TargetGroupStickinessConfig?: TargetGroupStickinessConfig;
}
export type JwtValidationActionJwksEndpoint = string;
export type JwtValidationActionIssuer = string;
export type JwtValidationActionAdditionalClaimFormatEnum =
  | "single-string"
  | "string-array"
  | "space-separated-values"
  | (string & {});
export type JwtValidationActionAdditionalClaimName = string;
export type JwtValidationActionAdditionalClaimValue = string;
export type JwtValidationActionAdditionalClaimValues = string[];
export interface JwtValidationActionAdditionalClaim {
  Format?: JwtValidationActionAdditionalClaimFormatEnum;
  Name?: string;
  Values?: string[];
}
export type JwtValidationActionAdditionalClaims =
  JwtValidationActionAdditionalClaim[];
export interface JwtValidationActionConfig {
  JwksEndpoint?: string;
  Issuer?: string;
  AdditionalClaims?: JwtValidationActionAdditionalClaim[];
}
export interface Action {
  Type?: ActionTypeEnum;
  TargetGroupArn?: string;
  AuthenticateOidcConfig?: AuthenticateOidcActionConfig;
  AuthenticateCognitoConfig?: AuthenticateCognitoActionConfig;
  Order?: number;
  RedirectConfig?: RedirectActionConfig;
  FixedResponseConfig?: FixedResponseActionConfig;
  ForwardConfig?: ForwardActionConfig;
  JwtValidationConfig?: JwtValidationActionConfig;
}
export type Actions = Action[];
export type AlpnPolicyValue = string;
export type AlpnPolicyName = string[];
export type Mode = string;
export type IgnoreClientCertificateExpiry = boolean;
export type TrustStoreAssociationStatusEnum =
  | "active"
  | "removed"
  | (string & {});
export type AdvertiseTrustStoreCaNamesEnum = "on" | "off" | (string & {});
export interface MutualAuthenticationAttributes {
  Mode?: string;
  TrustStoreArn?: string;
  IgnoreClientCertificateExpiry?: boolean;
  TrustStoreAssociationStatus?: TrustStoreAssociationStatusEnum;
  AdvertiseTrustStoreCaNames?: AdvertiseTrustStoreCaNamesEnum;
}
export interface CreateListenerInput {
  LoadBalancerArn?: string;
  Protocol?: ProtocolEnum;
  Port?: number;
  SslPolicy?: string;
  Certificates?: Certificate[];
  DefaultActions?: Action[];
  AlpnPolicy?: string[];
  Tags?: Tag[];
  MutualAuthentication?: MutualAuthenticationAttributes;
}
export interface Listener {
  ListenerArn?: string;
  LoadBalancerArn?: string;
  Port?: number;
  Protocol?: ProtocolEnum;
  Certificates?: Certificate[];
  SslPolicy?: string;
  DefaultActions?: Action[];
  AlpnPolicy?: string[];
  MutualAuthentication?: MutualAuthenticationAttributes;
}
export type Listeners = Listener[];
export interface CreateListenerOutput {
  Listeners?: (Listener & {
    DefaultActions: (Action & {
      Type: ActionTypeEnum;
      AuthenticateOidcConfig: AuthenticateOidcActionConfig & {
        Issuer: AuthenticateOidcActionIssuer;
        AuthorizationEndpoint: AuthenticateOidcActionAuthorizationEndpoint;
        TokenEndpoint: AuthenticateOidcActionTokenEndpoint;
        UserInfoEndpoint: AuthenticateOidcActionUserInfoEndpoint;
        ClientId: AuthenticateOidcActionClientId;
      };
      AuthenticateCognitoConfig: AuthenticateCognitoActionConfig & {
        UserPoolArn: AuthenticateCognitoActionUserPoolArn;
        UserPoolClientId: AuthenticateCognitoActionUserPoolClientId;
        UserPoolDomain: AuthenticateCognitoActionUserPoolDomain;
      };
      RedirectConfig: RedirectActionConfig & {
        StatusCode: RedirectActionStatusCodeEnum;
      };
      FixedResponseConfig: FixedResponseActionConfig & {
        StatusCode: FixedResponseActionStatusCode;
      };
      JwtValidationConfig: JwtValidationActionConfig & {
        JwksEndpoint: JwtValidationActionJwksEndpoint;
        Issuer: JwtValidationActionIssuer;
        AdditionalClaims: (JwtValidationActionAdditionalClaim & {
          Format: JwtValidationActionAdditionalClaimFormatEnum;
          Name: JwtValidationActionAdditionalClaimName;
          Values: JwtValidationActionAdditionalClaimValues;
        })[];
      };
    })[];
  })[];
}
export type LoadBalancerName = string;
export type SubnetId = string;
export type Subnets = string[];
export type AllocationId = string;
export type PrivateIPv4Address = string;
export type IPv6Address = string;
export type SourceNatIpv6Prefix = string;
export interface SubnetMapping {
  SubnetId?: string;
  AllocationId?: string;
  PrivateIPv4Address?: string;
  IPv6Address?: string;
  SourceNatIpv6Prefix?: string;
}
export type SubnetMappings = SubnetMapping[];
export type SecurityGroupId = string;
export type SecurityGroups = string[];
export type LoadBalancerSchemeEnum =
  | "internet-facing"
  | "internal"
  | (string & {});
export type LoadBalancerTypeEnum =
  | "application"
  | "network"
  | "gateway"
  | (string & {});
export type IpAddressType =
  | "ipv4"
  | "dualstack"
  | "dualstack-without-public-ipv4"
  | (string & {});
export type CustomerOwnedIpv4Pool = string;
export type EnablePrefixForIpv6SourceNatEnum = "on" | "off" | (string & {});
export type IpamPoolId = string;
export interface IpamPools {
  Ipv4IpamPoolId?: string;
}
export interface CreateLoadBalancerInput {
  Name?: string;
  Subnets?: string[];
  SubnetMappings?: SubnetMapping[];
  SecurityGroups?: string[];
  Scheme?: LoadBalancerSchemeEnum;
  Tags?: Tag[];
  Type?: LoadBalancerTypeEnum;
  IpAddressType?: IpAddressType;
  CustomerOwnedIpv4Pool?: string;
  EnablePrefixForIpv6SourceNat?: EnablePrefixForIpv6SourceNatEnum;
  IpamPools?: IpamPools;
}
export type DNSName = string;
export type CanonicalHostedZoneId = string;
export type CreatedTime = Date;
export type VpcId = string;
export type LoadBalancerStateEnum =
  | "active"
  | "provisioning"
  | "active_impaired"
  | "failed"
  | (string & {});
export type StateReason = string;
export interface LoadBalancerState {
  Code?: LoadBalancerStateEnum;
  Reason?: string;
}
export type ZoneName = string;
export type OutpostId = string;
export type IpAddress = string;
export interface LoadBalancerAddress {
  IpAddress?: string;
  AllocationId?: string;
  PrivateIPv4Address?: string;
  IPv6Address?: string;
}
export type LoadBalancerAddresses = LoadBalancerAddress[];
export type SourceNatIpv6Prefixes = string[];
export interface AvailabilityZone {
  ZoneName?: string;
  SubnetId?: string;
  OutpostId?: string;
  LoadBalancerAddresses?: LoadBalancerAddress[];
  SourceNatIpv6Prefixes?: string[];
}
export type AvailabilityZones = AvailabilityZone[];
export type EnforceSecurityGroupInboundRulesOnPrivateLinkTraffic = string;
export interface LoadBalancer {
  LoadBalancerArn?: string;
  DNSName?: string;
  CanonicalHostedZoneId?: string;
  CreatedTime?: Date;
  LoadBalancerName?: string;
  Scheme?: LoadBalancerSchemeEnum;
  VpcId?: string;
  State?: LoadBalancerState;
  Type?: LoadBalancerTypeEnum;
  AvailabilityZones?: AvailabilityZone[];
  SecurityGroups?: string[];
  IpAddressType?: IpAddressType;
  CustomerOwnedIpv4Pool?: string;
  EnforceSecurityGroupInboundRulesOnPrivateLinkTraffic?: string;
  EnablePrefixForIpv6SourceNat?: EnablePrefixForIpv6SourceNatEnum;
  IpamPools?: IpamPools;
}
export type LoadBalancers = LoadBalancer[];
export interface CreateLoadBalancerOutput {
  LoadBalancers?: LoadBalancer[];
}
export type ConditionFieldName = string;
export type StringValue = string;
export type ListOfString = string[];
export interface HostHeaderConditionConfig {
  Values?: string[];
  RegexValues?: string[];
}
export interface PathPatternConditionConfig {
  Values?: string[];
  RegexValues?: string[];
}
export type HttpHeaderConditionName = string;
export interface HttpHeaderConditionConfig {
  HttpHeaderName?: string;
  Values?: string[];
  RegexValues?: string[];
}
export interface QueryStringKeyValuePair {
  Key?: string;
  Value?: string;
}
export type QueryStringKeyValuePairList = QueryStringKeyValuePair[];
export interface QueryStringConditionConfig {
  Values?: QueryStringKeyValuePair[];
}
export interface HttpRequestMethodConditionConfig {
  Values?: string[];
}
export type SourceIpAddressTypeEnum = "ipv4" | "ipv6" | (string & {});
export interface SourceIpConditionConfig {
  Values?: string[];
  IpAddressType?: SourceIpAddressTypeEnum;
}
export interface RuleCondition {
  Field?: string;
  Values?: string[];
  HostHeaderConfig?: HostHeaderConditionConfig;
  PathPatternConfig?: PathPatternConditionConfig;
  HttpHeaderConfig?: HttpHeaderConditionConfig;
  QueryStringConfig?: QueryStringConditionConfig;
  HttpRequestMethodConfig?: HttpRequestMethodConditionConfig;
  SourceIpConfig?: SourceIpConditionConfig;
  RegexValues?: string[];
}
export type RuleConditionList = RuleCondition[];
export type RulePriority = number;
export type TransformTypeEnum =
  | "host-header-rewrite"
  | "url-rewrite"
  | (string & {});
export interface RewriteConfig {
  Regex?: string;
  Replace?: string;
}
export type RewriteConfigList = RewriteConfig[];
export interface HostHeaderRewriteConfig {
  Rewrites?: RewriteConfig[];
}
export interface UrlRewriteConfig {
  Rewrites?: RewriteConfig[];
}
export interface RuleTransform {
  Type?: TransformTypeEnum;
  HostHeaderRewriteConfig?: HostHeaderRewriteConfig;
  UrlRewriteConfig?: UrlRewriteConfig;
}
export type RuleTransformList = RuleTransform[];
export interface CreateRuleInput {
  ListenerArn?: string;
  Conditions?: RuleCondition[];
  Priority?: number;
  Actions?: Action[];
  Tags?: Tag[];
  Transforms?: RuleTransform[];
}
export type RuleArn = string;
export type IsDefault = boolean;
export interface Rule {
  RuleArn?: string;
  Priority?: string;
  Conditions?: RuleCondition[];
  Actions?: Action[];
  IsDefault?: boolean;
  Transforms?: RuleTransform[];
}
export type Rules = Rule[];
export interface CreateRuleOutput {
  Rules?: (Rule & {
    Actions: (Action & {
      Type: ActionTypeEnum;
      AuthenticateOidcConfig: AuthenticateOidcActionConfig & {
        Issuer: AuthenticateOidcActionIssuer;
        AuthorizationEndpoint: AuthenticateOidcActionAuthorizationEndpoint;
        TokenEndpoint: AuthenticateOidcActionTokenEndpoint;
        UserInfoEndpoint: AuthenticateOidcActionUserInfoEndpoint;
        ClientId: AuthenticateOidcActionClientId;
      };
      AuthenticateCognitoConfig: AuthenticateCognitoActionConfig & {
        UserPoolArn: AuthenticateCognitoActionUserPoolArn;
        UserPoolClientId: AuthenticateCognitoActionUserPoolClientId;
        UserPoolDomain: AuthenticateCognitoActionUserPoolDomain;
      };
      RedirectConfig: RedirectActionConfig & {
        StatusCode: RedirectActionStatusCodeEnum;
      };
      FixedResponseConfig: FixedResponseActionConfig & {
        StatusCode: FixedResponseActionStatusCode;
      };
      JwtValidationConfig: JwtValidationActionConfig & {
        JwksEndpoint: JwtValidationActionJwksEndpoint;
        Issuer: JwtValidationActionIssuer;
        AdditionalClaims: (JwtValidationActionAdditionalClaim & {
          Format: JwtValidationActionAdditionalClaimFormatEnum;
          Name: JwtValidationActionAdditionalClaimName;
          Values: JwtValidationActionAdditionalClaimValues;
        })[];
      };
    })[];
    Transforms: (RuleTransform & {
      Type: TransformTypeEnum;
      HostHeaderRewriteConfig: HostHeaderRewriteConfig & {
        Rewrites: (RewriteConfig & {
          Regex: StringValue;
          Replace: StringValue;
        })[];
      };
      UrlRewriteConfig: UrlRewriteConfig & {
        Rewrites: (RewriteConfig & {
          Regex: StringValue;
          Replace: StringValue;
        })[];
      };
    })[];
  })[];
}
export type TargetGroupName = string;
export type ProtocolVersion = string;
export type HealthCheckPort = string;
export type HealthCheckEnabled = boolean;
export type Path = string;
export type HealthCheckIntervalSeconds = number;
export type HealthCheckTimeoutSeconds = number;
export type HealthCheckThresholdCount = number;
export type HttpCode = string;
export type GrpcCode = string;
export interface Matcher {
  HttpCode?: string;
  GrpcCode?: string;
}
export type TargetTypeEnum =
  | "instance"
  | "ip"
  | "lambda"
  | "alb"
  | (string & {});
export type TargetGroupIpAddressTypeEnum = "ipv4" | "ipv6" | (string & {});
export type TargetControlPort = number;
export interface CreateTargetGroupInput {
  Name?: string;
  Protocol?: ProtocolEnum;
  ProtocolVersion?: string;
  Port?: number;
  VpcId?: string;
  HealthCheckProtocol?: ProtocolEnum;
  HealthCheckPort?: string;
  HealthCheckEnabled?: boolean;
  HealthCheckPath?: string;
  HealthCheckIntervalSeconds?: number;
  HealthCheckTimeoutSeconds?: number;
  HealthyThresholdCount?: number;
  UnhealthyThresholdCount?: number;
  Matcher?: Matcher;
  TargetType?: TargetTypeEnum;
  Tags?: Tag[];
  IpAddressType?: TargetGroupIpAddressTypeEnum;
  TargetControlPort?: number;
}
export type LoadBalancerArns = string[];
export interface TargetGroup {
  TargetGroupArn?: string;
  TargetGroupName?: string;
  Protocol?: ProtocolEnum;
  Port?: number;
  VpcId?: string;
  HealthCheckProtocol?: ProtocolEnum;
  HealthCheckPort?: string;
  HealthCheckEnabled?: boolean;
  HealthCheckIntervalSeconds?: number;
  HealthCheckTimeoutSeconds?: number;
  HealthyThresholdCount?: number;
  UnhealthyThresholdCount?: number;
  HealthCheckPath?: string;
  Matcher?: Matcher;
  LoadBalancerArns?: string[];
  TargetType?: TargetTypeEnum;
  ProtocolVersion?: string;
  IpAddressType?: TargetGroupIpAddressTypeEnum;
  TargetControlPort?: number;
}
export type TargetGroups = TargetGroup[];
export interface CreateTargetGroupOutput {
  TargetGroups?: TargetGroup[];
}
export type TrustStoreName = string;
export interface CreateTrustStoreInput {
  Name?: string;
  CaCertificatesBundleS3Bucket?: string;
  CaCertificatesBundleS3Key?: string;
  CaCertificatesBundleS3ObjectVersion?: string;
  Tags?: Tag[];
}
export type TrustStoreStatus = "ACTIVE" | "CREATING" | (string & {});
export type NumberOfCaCertificates = number;
export type TotalRevokedEntries = number;
export interface TrustStore {
  Name?: string;
  TrustStoreArn?: string;
  Status?: TrustStoreStatus;
  NumberOfCaCertificates?: number;
  TotalRevokedEntries?: number;
}
export type TrustStores = TrustStore[];
export interface CreateTrustStoreOutput {
  TrustStores?: TrustStore[];
}
export interface DeleteListenerInput {
  ListenerArn?: string;
}
export interface DeleteListenerOutput {}
export interface DeleteLoadBalancerInput {
  LoadBalancerArn?: string;
}
export interface DeleteLoadBalancerOutput {}
export interface DeleteRuleInput {
  RuleArn?: string;
}
export interface DeleteRuleOutput {}
export interface DeleteSharedTrustStoreAssociationInput {
  TrustStoreArn?: string;
  ResourceArn?: string;
}
export interface DeleteSharedTrustStoreAssociationOutput {}
export interface DeleteTargetGroupInput {
  TargetGroupArn?: string;
}
export interface DeleteTargetGroupOutput {}
export interface DeleteTrustStoreInput {
  TrustStoreArn?: string;
}
export interface DeleteTrustStoreOutput {}
export type TargetId = string;
export type QuicServerId = string;
export interface TargetDescription {
  Id?: string;
  Port?: number;
  AvailabilityZone?: string;
  QuicServerId?: string;
}
export type TargetDescriptions = TargetDescription[];
export interface DeregisterTargetsInput {
  TargetGroupArn?: string;
  Targets?: TargetDescription[];
}
export interface DeregisterTargetsOutput {}
export type Marker = string;
export type PageSize = number;
export interface DescribeAccountLimitsInput {
  Marker?: string;
  PageSize?: number;
}
export type Name = string;
export type Max = string;
export interface Limit {
  Name?: string;
  Max?: string;
}
export type Limits = Limit[];
export interface DescribeAccountLimitsOutput {
  Limits?: Limit[];
  NextMarker?: string;
}
export interface DescribeCapacityReservationInput {
  LoadBalancerArn?: string;
}
export type LastModifiedTime = Date;
export type DecreaseRequestsRemaining = number;
export type CapacityUnits = number;
export interface MinimumLoadBalancerCapacity {
  CapacityUnits?: number;
}
export type CapacityReservationStateEnum =
  | "provisioned"
  | "pending"
  | "rebalancing"
  | "failed"
  | (string & {});
export interface CapacityReservationStatus {
  Code?: CapacityReservationStateEnum;
  Reason?: string;
}
export type CapacityUnitsDouble = number;
export interface ZonalCapacityReservationState {
  State?: CapacityReservationStatus;
  AvailabilityZone?: string;
  EffectiveCapacityUnits?: number;
}
export type ZonalCapacityReservationStates = ZonalCapacityReservationState[];
export interface DescribeCapacityReservationOutput {
  LastModifiedTime?: Date;
  DecreaseRequestsRemaining?: number;
  MinimumLoadBalancerCapacity?: MinimumLoadBalancerCapacity;
  CapacityReservationState?: ZonalCapacityReservationState[];
}
export interface DescribeListenerAttributesInput {
  ListenerArn?: string;
}
export type ListenerAttributeKey = string;
export type ListenerAttributeValue = string;
export interface ListenerAttribute {
  Key?: string;
  Value?: string;
}
export type ListenerAttributes = ListenerAttribute[];
export interface DescribeListenerAttributesOutput {
  Attributes?: ListenerAttribute[];
}
export interface DescribeListenerCertificatesInput {
  ListenerArn?: string;
  Marker?: string;
  PageSize?: number;
}
export interface DescribeListenerCertificatesOutput {
  Certificates?: Certificate[];
  NextMarker?: string;
}
export type ListenerArns = string[];
export interface DescribeListenersInput {
  LoadBalancerArn?: string;
  ListenerArns?: string[];
  Marker?: string;
  PageSize?: number;
}
export interface DescribeListenersOutput {
  Listeners?: (Listener & {
    DefaultActions: (Action & {
      Type: ActionTypeEnum;
      AuthenticateOidcConfig: AuthenticateOidcActionConfig & {
        Issuer: AuthenticateOidcActionIssuer;
        AuthorizationEndpoint: AuthenticateOidcActionAuthorizationEndpoint;
        TokenEndpoint: AuthenticateOidcActionTokenEndpoint;
        UserInfoEndpoint: AuthenticateOidcActionUserInfoEndpoint;
        ClientId: AuthenticateOidcActionClientId;
      };
      AuthenticateCognitoConfig: AuthenticateCognitoActionConfig & {
        UserPoolArn: AuthenticateCognitoActionUserPoolArn;
        UserPoolClientId: AuthenticateCognitoActionUserPoolClientId;
        UserPoolDomain: AuthenticateCognitoActionUserPoolDomain;
      };
      RedirectConfig: RedirectActionConfig & {
        StatusCode: RedirectActionStatusCodeEnum;
      };
      FixedResponseConfig: FixedResponseActionConfig & {
        StatusCode: FixedResponseActionStatusCode;
      };
      JwtValidationConfig: JwtValidationActionConfig & {
        JwksEndpoint: JwtValidationActionJwksEndpoint;
        Issuer: JwtValidationActionIssuer;
        AdditionalClaims: (JwtValidationActionAdditionalClaim & {
          Format: JwtValidationActionAdditionalClaimFormatEnum;
          Name: JwtValidationActionAdditionalClaimName;
          Values: JwtValidationActionAdditionalClaimValues;
        })[];
      };
    })[];
  })[];
  NextMarker?: string;
}
export interface DescribeLoadBalancerAttributesInput {
  LoadBalancerArn?: string;
}
export type LoadBalancerAttributeKey = string;
export type LoadBalancerAttributeValue = string;
export interface LoadBalancerAttribute {
  Key?: string;
  Value?: string;
}
export type LoadBalancerAttributes = LoadBalancerAttribute[];
export interface DescribeLoadBalancerAttributesOutput {
  Attributes?: LoadBalancerAttribute[];
}
export type LoadBalancerNames = string[];
export interface DescribeLoadBalancersInput {
  LoadBalancerArns?: string[];
  Names?: string[];
  Marker?: string;
  PageSize?: number;
}
export interface DescribeLoadBalancersOutput {
  LoadBalancers?: LoadBalancer[];
  NextMarker?: string;
}
export type RuleArns = string[];
export interface DescribeRulesInput {
  ListenerArn?: string;
  RuleArns?: string[];
  Marker?: string;
  PageSize?: number;
}
export interface DescribeRulesOutput {
  Rules?: (Rule & {
    Actions: (Action & {
      Type: ActionTypeEnum;
      AuthenticateOidcConfig: AuthenticateOidcActionConfig & {
        Issuer: AuthenticateOidcActionIssuer;
        AuthorizationEndpoint: AuthenticateOidcActionAuthorizationEndpoint;
        TokenEndpoint: AuthenticateOidcActionTokenEndpoint;
        UserInfoEndpoint: AuthenticateOidcActionUserInfoEndpoint;
        ClientId: AuthenticateOidcActionClientId;
      };
      AuthenticateCognitoConfig: AuthenticateCognitoActionConfig & {
        UserPoolArn: AuthenticateCognitoActionUserPoolArn;
        UserPoolClientId: AuthenticateCognitoActionUserPoolClientId;
        UserPoolDomain: AuthenticateCognitoActionUserPoolDomain;
      };
      RedirectConfig: RedirectActionConfig & {
        StatusCode: RedirectActionStatusCodeEnum;
      };
      FixedResponseConfig: FixedResponseActionConfig & {
        StatusCode: FixedResponseActionStatusCode;
      };
      JwtValidationConfig: JwtValidationActionConfig & {
        JwksEndpoint: JwtValidationActionJwksEndpoint;
        Issuer: JwtValidationActionIssuer;
        AdditionalClaims: (JwtValidationActionAdditionalClaim & {
          Format: JwtValidationActionAdditionalClaimFormatEnum;
          Name: JwtValidationActionAdditionalClaimName;
          Values: JwtValidationActionAdditionalClaimValues;
        })[];
      };
    })[];
    Transforms: (RuleTransform & {
      Type: TransformTypeEnum;
      HostHeaderRewriteConfig: HostHeaderRewriteConfig & {
        Rewrites: (RewriteConfig & {
          Regex: StringValue;
          Replace: StringValue;
        })[];
      };
      UrlRewriteConfig: UrlRewriteConfig & {
        Rewrites: (RewriteConfig & {
          Regex: StringValue;
          Replace: StringValue;
        })[];
      };
    })[];
  })[];
  NextMarker?: string;
}
export type SslPolicyNames = string[];
export interface DescribeSSLPoliciesInput {
  Names?: string[];
  Marker?: string;
  PageSize?: number;
  LoadBalancerType?: LoadBalancerTypeEnum;
}
export type SslProtocol = string;
export type SslProtocols = string[];
export type CipherName = string;
export type CipherPriority = number;
export interface Cipher {
  Name?: string;
  Priority?: number;
}
export type Ciphers = Cipher[];
export interface SslPolicy {
  SslProtocols?: string[];
  Ciphers?: Cipher[];
  Name?: string;
  SupportedLoadBalancerTypes?: string[];
}
export type SslPolicies = SslPolicy[];
export interface DescribeSSLPoliciesOutput {
  SslPolicies?: SslPolicy[];
  NextMarker?: string;
}
export interface DescribeTagsInput {
  ResourceArns?: string[];
}
export interface TagDescription {
  ResourceArn?: string;
  Tags?: Tag[];
}
export type TagDescriptions = TagDescription[];
export interface DescribeTagsOutput {
  TagDescriptions?: (TagDescription & { Tags: (Tag & { Key: TagKey })[] })[];
}
export interface DescribeTargetGroupAttributesInput {
  TargetGroupArn?: string;
}
export type TargetGroupAttributeKey = string;
export type TargetGroupAttributeValue = string;
export interface TargetGroupAttribute {
  Key?: string;
  Value?: string;
}
export type TargetGroupAttributes = TargetGroupAttribute[];
export interface DescribeTargetGroupAttributesOutput {
  Attributes?: TargetGroupAttribute[];
}
export type TargetGroupArns = string[];
export type TargetGroupNames = string[];
export interface DescribeTargetGroupsInput {
  LoadBalancerArn?: string;
  TargetGroupArns?: string[];
  Names?: string[];
  Marker?: string;
  PageSize?: number;
}
export interface DescribeTargetGroupsOutput {
  TargetGroups?: TargetGroup[];
  NextMarker?: string;
}
export type DescribeTargetHealthInputIncludeEnum =
  | "AnomalyDetection"
  | "All"
  | (string & {});
export type ListOfDescribeTargetHealthIncludeOptions =
  DescribeTargetHealthInputIncludeEnum[];
export interface DescribeTargetHealthInput {
  TargetGroupArn?: string;
  Targets?: TargetDescription[];
  Include?: DescribeTargetHealthInputIncludeEnum[];
}
export type TargetHealthStateEnum =
  | "initial"
  | "healthy"
  | "unhealthy"
  | "unhealthy.draining"
  | "unused"
  | "draining"
  | "unavailable"
  | (string & {});
export type TargetHealthReasonEnum =
  | "Elb.RegistrationInProgress"
  | "Elb.InitialHealthChecking"
  | "Target.ResponseCodeMismatch"
  | "Target.Timeout"
  | "Target.FailedHealthChecks"
  | "Target.NotRegistered"
  | "Target.NotInUse"
  | "Target.DeregistrationInProgress"
  | "Target.InvalidState"
  | "Target.IpUnusable"
  | "Target.HealthCheckDisabled"
  | "Elb.InternalError"
  | (string & {});
export type Description = string;
export interface TargetHealth {
  State?: TargetHealthStateEnum;
  Reason?: TargetHealthReasonEnum;
  Description?: string;
}
export type AnomalyResultEnum = "anomalous" | "normal" | (string & {});
export type MitigationInEffectEnum = "yes" | "no" | (string & {});
export interface AnomalyDetection {
  Result?: AnomalyResultEnum;
  MitigationInEffect?: MitigationInEffectEnum;
}
export type TargetAdministrativeOverrideStateEnum =
  | "unknown"
  | "no_override"
  | "zonal_shift_active"
  | "zonal_shift_delegated_to_dns"
  | (string & {});
export type TargetAdministrativeOverrideReasonEnum =
  | "AdministrativeOverride.Unknown"
  | "AdministrativeOverride.NoOverride"
  | "AdministrativeOverride.ZonalShiftActive"
  | "AdministrativeOverride.ZonalShiftDelegatedToDns"
  | (string & {});
export interface AdministrativeOverride {
  State?: TargetAdministrativeOverrideStateEnum;
  Reason?: TargetAdministrativeOverrideReasonEnum;
  Description?: string;
}
export interface TargetHealthDescription {
  Target?: TargetDescription;
  HealthCheckPort?: string;
  TargetHealth?: TargetHealth;
  AnomalyDetection?: AnomalyDetection;
  AdministrativeOverride?: AdministrativeOverride;
}
export type TargetHealthDescriptions = TargetHealthDescription[];
export interface DescribeTargetHealthOutput {
  TargetHealthDescriptions?: (TargetHealthDescription & {
    Target: TargetDescription & { Id: TargetId };
  })[];
}
export interface DescribeTrustStoreAssociationsInput {
  TrustStoreArn?: string;
  Marker?: string;
  PageSize?: number;
}
export type TrustStoreAssociationResourceArn = string;
export interface TrustStoreAssociation {
  ResourceArn?: string;
}
export type TrustStoreAssociations = TrustStoreAssociation[];
export interface DescribeTrustStoreAssociationsOutput {
  TrustStoreAssociations?: TrustStoreAssociation[];
  NextMarker?: string;
}
export type RevocationIds = number[];
export interface DescribeTrustStoreRevocationsInput {
  TrustStoreArn?: string;
  RevocationIds?: number[];
  Marker?: string;
  PageSize?: number;
}
export interface DescribeTrustStoreRevocation {
  TrustStoreArn?: string;
  RevocationId?: number;
  RevocationType?: RevocationType;
  NumberOfRevokedEntries?: number;
}
export type DescribeTrustStoreRevocationResponse =
  DescribeTrustStoreRevocation[];
export interface DescribeTrustStoreRevocationsOutput {
  TrustStoreRevocations?: DescribeTrustStoreRevocation[];
  NextMarker?: string;
}
export type TrustStoreArns = string[];
export type TrustStoreNames = string[];
export interface DescribeTrustStoresInput {
  TrustStoreArns?: string[];
  Names?: string[];
  Marker?: string;
  PageSize?: number;
}
export interface DescribeTrustStoresOutput {
  TrustStores?: TrustStore[];
  NextMarker?: string;
}
export interface GetResourcePolicyInput {
  ResourceArn?: string;
}
export type Policy = string;
export interface GetResourcePolicyOutput {
  Policy?: string;
}
export interface GetTrustStoreCaCertificatesBundleInput {
  TrustStoreArn?: string;
}
export type Location = string;
export interface GetTrustStoreCaCertificatesBundleOutput {
  Location?: string;
}
export interface GetTrustStoreRevocationContentInput {
  TrustStoreArn?: string;
  RevocationId?: number;
}
export interface GetTrustStoreRevocationContentOutput {
  Location?: string;
}
export type ResetCapacityReservation = boolean;
export interface ModifyCapacityReservationInput {
  LoadBalancerArn?: string;
  MinimumLoadBalancerCapacity?: MinimumLoadBalancerCapacity;
  ResetCapacityReservation?: boolean;
}
export interface ModifyCapacityReservationOutput {
  LastModifiedTime?: Date;
  DecreaseRequestsRemaining?: number;
  MinimumLoadBalancerCapacity?: MinimumLoadBalancerCapacity;
  CapacityReservationState?: ZonalCapacityReservationState[];
}
export type RemoveIpamPoolEnum = "ipv4" | (string & {});
export type RemoveIpamPools = RemoveIpamPoolEnum[];
export interface ModifyIpPoolsInput {
  LoadBalancerArn?: string;
  IpamPools?: IpamPools;
  RemoveIpamPools?: RemoveIpamPoolEnum[];
}
export interface ModifyIpPoolsOutput {
  IpamPools?: IpamPools;
}
export interface ModifyListenerInput {
  ListenerArn?: string;
  Port?: number;
  Protocol?: ProtocolEnum;
  SslPolicy?: string;
  Certificates?: Certificate[];
  DefaultActions?: Action[];
  AlpnPolicy?: string[];
  MutualAuthentication?: MutualAuthenticationAttributes;
}
export interface ModifyListenerOutput {
  Listeners?: (Listener & {
    DefaultActions: (Action & {
      Type: ActionTypeEnum;
      AuthenticateOidcConfig: AuthenticateOidcActionConfig & {
        Issuer: AuthenticateOidcActionIssuer;
        AuthorizationEndpoint: AuthenticateOidcActionAuthorizationEndpoint;
        TokenEndpoint: AuthenticateOidcActionTokenEndpoint;
        UserInfoEndpoint: AuthenticateOidcActionUserInfoEndpoint;
        ClientId: AuthenticateOidcActionClientId;
      };
      AuthenticateCognitoConfig: AuthenticateCognitoActionConfig & {
        UserPoolArn: AuthenticateCognitoActionUserPoolArn;
        UserPoolClientId: AuthenticateCognitoActionUserPoolClientId;
        UserPoolDomain: AuthenticateCognitoActionUserPoolDomain;
      };
      RedirectConfig: RedirectActionConfig & {
        StatusCode: RedirectActionStatusCodeEnum;
      };
      FixedResponseConfig: FixedResponseActionConfig & {
        StatusCode: FixedResponseActionStatusCode;
      };
      JwtValidationConfig: JwtValidationActionConfig & {
        JwksEndpoint: JwtValidationActionJwksEndpoint;
        Issuer: JwtValidationActionIssuer;
        AdditionalClaims: (JwtValidationActionAdditionalClaim & {
          Format: JwtValidationActionAdditionalClaimFormatEnum;
          Name: JwtValidationActionAdditionalClaimName;
          Values: JwtValidationActionAdditionalClaimValues;
        })[];
      };
    })[];
  })[];
}
export interface ModifyListenerAttributesInput {
  ListenerArn?: string;
  Attributes?: ListenerAttribute[];
}
export interface ModifyListenerAttributesOutput {
  Attributes?: ListenerAttribute[];
}
export interface ModifyLoadBalancerAttributesInput {
  LoadBalancerArn?: string;
  Attributes?: LoadBalancerAttribute[];
}
export interface ModifyLoadBalancerAttributesOutput {
  Attributes?: LoadBalancerAttribute[];
}
export type ResetTransforms = boolean;
export interface ModifyRuleInput {
  RuleArn?: string;
  Conditions?: RuleCondition[];
  Actions?: Action[];
  Transforms?: RuleTransform[];
  ResetTransforms?: boolean;
}
export interface ModifyRuleOutput {
  Rules?: (Rule & {
    Actions: (Action & {
      Type: ActionTypeEnum;
      AuthenticateOidcConfig: AuthenticateOidcActionConfig & {
        Issuer: AuthenticateOidcActionIssuer;
        AuthorizationEndpoint: AuthenticateOidcActionAuthorizationEndpoint;
        TokenEndpoint: AuthenticateOidcActionTokenEndpoint;
        UserInfoEndpoint: AuthenticateOidcActionUserInfoEndpoint;
        ClientId: AuthenticateOidcActionClientId;
      };
      AuthenticateCognitoConfig: AuthenticateCognitoActionConfig & {
        UserPoolArn: AuthenticateCognitoActionUserPoolArn;
        UserPoolClientId: AuthenticateCognitoActionUserPoolClientId;
        UserPoolDomain: AuthenticateCognitoActionUserPoolDomain;
      };
      RedirectConfig: RedirectActionConfig & {
        StatusCode: RedirectActionStatusCodeEnum;
      };
      FixedResponseConfig: FixedResponseActionConfig & {
        StatusCode: FixedResponseActionStatusCode;
      };
      JwtValidationConfig: JwtValidationActionConfig & {
        JwksEndpoint: JwtValidationActionJwksEndpoint;
        Issuer: JwtValidationActionIssuer;
        AdditionalClaims: (JwtValidationActionAdditionalClaim & {
          Format: JwtValidationActionAdditionalClaimFormatEnum;
          Name: JwtValidationActionAdditionalClaimName;
          Values: JwtValidationActionAdditionalClaimValues;
        })[];
      };
    })[];
    Transforms: (RuleTransform & {
      Type: TransformTypeEnum;
      HostHeaderRewriteConfig: HostHeaderRewriteConfig & {
        Rewrites: (RewriteConfig & {
          Regex: StringValue;
          Replace: StringValue;
        })[];
      };
      UrlRewriteConfig: UrlRewriteConfig & {
        Rewrites: (RewriteConfig & {
          Regex: StringValue;
          Replace: StringValue;
        })[];
      };
    })[];
  })[];
}
export interface ModifyTargetGroupInput {
  TargetGroupArn?: string;
  HealthCheckProtocol?: ProtocolEnum;
  HealthCheckPort?: string;
  HealthCheckPath?: string;
  HealthCheckEnabled?: boolean;
  HealthCheckIntervalSeconds?: number;
  HealthCheckTimeoutSeconds?: number;
  HealthyThresholdCount?: number;
  UnhealthyThresholdCount?: number;
  Matcher?: Matcher;
}
export interface ModifyTargetGroupOutput {
  TargetGroups?: TargetGroup[];
}
export interface ModifyTargetGroupAttributesInput {
  TargetGroupArn?: string;
  Attributes?: TargetGroupAttribute[];
}
export interface ModifyTargetGroupAttributesOutput {
  Attributes?: TargetGroupAttribute[];
}
export interface ModifyTrustStoreInput {
  TrustStoreArn?: string;
  CaCertificatesBundleS3Bucket?: string;
  CaCertificatesBundleS3Key?: string;
  CaCertificatesBundleS3ObjectVersion?: string;
}
export interface ModifyTrustStoreOutput {
  TrustStores?: TrustStore[];
}
export interface RegisterTargetsInput {
  TargetGroupArn?: string;
  Targets?: TargetDescription[];
}
export interface RegisterTargetsOutput {}
export interface RemoveListenerCertificatesInput {
  ListenerArn?: string;
  Certificates?: Certificate[];
}
export interface RemoveListenerCertificatesOutput {}
export type TagKeys = string[];
export interface RemoveTagsInput {
  ResourceArns?: string[];
  TagKeys?: string[];
}
export interface RemoveTagsOutput {}
export interface RemoveTrustStoreRevocationsInput {
  TrustStoreArn?: string;
  RevocationIds?: number[];
}
export interface RemoveTrustStoreRevocationsOutput {}
export interface SetIpAddressTypeInput {
  LoadBalancerArn?: string;
  IpAddressType?: IpAddressType;
}
export interface SetIpAddressTypeOutput {
  IpAddressType?: IpAddressType;
}
export interface RulePriorityPair {
  RuleArn?: string;
  Priority?: number;
}
export type RulePriorityList = RulePriorityPair[];
export interface SetRulePrioritiesInput {
  RulePriorities?: RulePriorityPair[];
}
export interface SetRulePrioritiesOutput {
  Rules?: (Rule & {
    Actions: (Action & {
      Type: ActionTypeEnum;
      AuthenticateOidcConfig: AuthenticateOidcActionConfig & {
        Issuer: AuthenticateOidcActionIssuer;
        AuthorizationEndpoint: AuthenticateOidcActionAuthorizationEndpoint;
        TokenEndpoint: AuthenticateOidcActionTokenEndpoint;
        UserInfoEndpoint: AuthenticateOidcActionUserInfoEndpoint;
        ClientId: AuthenticateOidcActionClientId;
      };
      AuthenticateCognitoConfig: AuthenticateCognitoActionConfig & {
        UserPoolArn: AuthenticateCognitoActionUserPoolArn;
        UserPoolClientId: AuthenticateCognitoActionUserPoolClientId;
        UserPoolDomain: AuthenticateCognitoActionUserPoolDomain;
      };
      RedirectConfig: RedirectActionConfig & {
        StatusCode: RedirectActionStatusCodeEnum;
      };
      FixedResponseConfig: FixedResponseActionConfig & {
        StatusCode: FixedResponseActionStatusCode;
      };
      JwtValidationConfig: JwtValidationActionConfig & {
        JwksEndpoint: JwtValidationActionJwksEndpoint;
        Issuer: JwtValidationActionIssuer;
        AdditionalClaims: (JwtValidationActionAdditionalClaim & {
          Format: JwtValidationActionAdditionalClaimFormatEnum;
          Name: JwtValidationActionAdditionalClaimName;
          Values: JwtValidationActionAdditionalClaimValues;
        })[];
      };
    })[];
    Transforms: (RuleTransform & {
      Type: TransformTypeEnum;
      HostHeaderRewriteConfig: HostHeaderRewriteConfig & {
        Rewrites: (RewriteConfig & {
          Regex: StringValue;
          Replace: StringValue;
        })[];
      };
      UrlRewriteConfig: UrlRewriteConfig & {
        Rewrites: (RewriteConfig & {
          Regex: StringValue;
          Replace: StringValue;
        })[];
      };
    })[];
  })[];
}
export type EnforceSecurityGroupInboundRulesOnPrivateLinkTrafficEnum =
  | "on"
  | "off"
  | (string & {});
export interface SetSecurityGroupsInput {
  LoadBalancerArn?: string;
  SecurityGroups?: string[];
  EnforceSecurityGroupInboundRulesOnPrivateLinkTraffic?: EnforceSecurityGroupInboundRulesOnPrivateLinkTrafficEnum;
}
export interface SetSecurityGroupsOutput {
  SecurityGroupIds?: string[];
  EnforceSecurityGroupInboundRulesOnPrivateLinkTraffic?: EnforceSecurityGroupInboundRulesOnPrivateLinkTrafficEnum;
}
export interface SetSubnetsInput {
  LoadBalancerArn?: string;
  Subnets?: string[];
  SubnetMappings?: SubnetMapping[];
  IpAddressType?: IpAddressType;
  EnablePrefixForIpv6SourceNat?: EnablePrefixForIpv6SourceNatEnum;
}
export interface SetSubnetsOutput {
  AvailabilityZones?: AvailabilityZone[];
  IpAddressType?: IpAddressType;
  EnablePrefixForIpv6SourceNat?: EnablePrefixForIpv6SourceNatEnum;
}
export type ErrorDescription = string;
export type AddListenerCertificatesError =
  | CertificateNotFoundException
  | ListenerNotFoundException
  | TooManyCertificatesException
  | CommonErrors;
/**
 * Adds the specified SSL server certificate to the certificate list for the specified HTTPS
 * or TLS listener.
 *
 * If the certificate in already in the certificate list, the call is successful but the
 * certificate is not added again.
 *
 * For more information, see SSL
 * certificates in the *Application Load Balancers Guide* or Server
 * certificates in the *Network Load Balancers Guide*.
 */
export const addListenerCertificates: API.OperationMethod<
  AddListenerCertificatesInput,
  AddListenerCertificatesOutput,
  AddListenerCertificatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ListenerArn: 0, Certificates: D.list(i_Certificate) },
    output: { Certificates: D.list(o_Certificate) },
  },
  errors: [
    CertificateNotFoundException,
    ListenerNotFoundException,
    TooManyCertificatesException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddListenerCertificates",
})) as any;

export type AddTagsError =
  | DuplicateTagKeysException
  | ListenerNotFoundException
  | LoadBalancerNotFoundException
  | RuleNotFoundException
  | TargetGroupNotFoundException
  | TooManyTagsException
  | TrustStoreNotFoundException
  | CommonErrors;
/**
 * Adds the specified tags to the specified Elastic Load Balancing resource. You can tag your
 * Application Load Balancers, Network Load Balancers, Gateway Load Balancers, target groups,
 * trust stores, listeners, and rules.
 *
 * Each tag consists of a key and an optional value. If a resource already has a tag with the
 * same key, `AddTags` updates its value.
 */
export const addTags: API.OperationMethod<
  AddTagsInput,
  AddTagsOutput,
  AddTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArns: 0, Tags: D.list(i_Tag) } },
  errors: [
    DuplicateTagKeysException,
    ListenerNotFoundException,
    LoadBalancerNotFoundException,
    RuleNotFoundException,
    TargetGroupNotFoundException,
    TooManyTagsException,
    TrustStoreNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTags",
})) as any;

export type AddTrustStoreRevocationsError =
  | InvalidRevocationContentException
  | RevocationContentNotFoundException
  | TooManyTrustStoreRevocationEntriesException
  | TrustStoreNotFoundException
  | CommonErrors;
/**
 * Adds the specified revocation file to the specified trust store.
 */
export const addTrustStoreRevocations: API.OperationMethod<
  AddTrustStoreRevocationsInput,
  AddTrustStoreRevocationsOutput,
  AddTrustStoreRevocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TrustStoreArn: 0,
      RevocationContents: D.list({
        S3Bucket: 0,
        S3Key: 0,
        S3ObjectVersion: 0,
        RevocationType: 0,
      }),
    },
    output: {
      TrustStoreRevocations: D.list({
        RevocationId: D.num,
        NumberOfRevokedEntries: D.num,
      }),
    },
  },
  errors: [
    InvalidRevocationContentException,
    RevocationContentNotFoundException,
    TooManyTrustStoreRevocationEntriesException,
    TrustStoreNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTrustStoreRevocations",
})) as any;

export type CreateListenerError =
  | ALPNPolicyNotSupportedException
  | CertificateNotFoundException
  | DuplicateListenerException
  | IncompatibleProtocolsException
  | InvalidConfigurationRequestException
  | InvalidLoadBalancerActionException
  | LoadBalancerNotFoundException
  | SSLPolicyNotFoundException
  | TargetGroupAssociationLimitException
  | TargetGroupNotFoundException
  | TooManyActionsException
  | TooManyCertificatesException
  | TooManyListenersException
  | TooManyRegistrationsForTargetIdException
  | TooManyTagsException
  | TooManyTargetsException
  | TooManyUniqueTargetGroupsPerLoadBalancerException
  | TrustStoreNotFoundException
  | TrustStoreNotReadyException
  | UnsupportedProtocolException
  | CommonErrors;
/**
 * Creates a listener for the specified Application Load Balancer, Network Load Balancer, or
 * Gateway Load Balancer.
 *
 * For more information, see the following:
 *
 * - Listeners for
 * your Application Load Balancers
 *
 * - Listeners for
 * your Network Load Balancers
 *
 * - Listeners for your
 * Gateway Load Balancers
 *
 * This operation is idempotent, which means that it completes at most one time. If you
 * attempt to create multiple listeners with the same settings, each call succeeds.
 */
export const createListener: API.OperationMethod<
  CreateListenerInput,
  CreateListenerOutput,
  CreateListenerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LoadBalancerArn: 0,
      Protocol: 0,
      Port: 0,
      SslPolicy: 0,
      Certificates: D.list(i_Certificate),
      DefaultActions: D.list(i_Action),
      AlpnPolicy: 0,
      Tags: D.list(i_Tag),
      MutualAuthentication: i_MutualAuthenticationAttributes,
    },
    output: { Listeners: D.list(o_Listener) },
  },
  errors: [
    ALPNPolicyNotSupportedException,
    CertificateNotFoundException,
    DuplicateListenerException,
    IncompatibleProtocolsException,
    InvalidConfigurationRequestException,
    InvalidLoadBalancerActionException,
    LoadBalancerNotFoundException,
    SSLPolicyNotFoundException,
    TargetGroupAssociationLimitException,
    TargetGroupNotFoundException,
    TooManyActionsException,
    TooManyCertificatesException,
    TooManyListenersException,
    TooManyRegistrationsForTargetIdException,
    TooManyTagsException,
    TooManyTargetsException,
    TooManyUniqueTargetGroupsPerLoadBalancerException,
    TrustStoreNotFoundException,
    TrustStoreNotReadyException,
    UnsupportedProtocolException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateListener",
})) as any;

export type CreateLoadBalancerError =
  | AllocationIdNotFoundException
  | AvailabilityZoneNotSupportedException
  | DuplicateLoadBalancerNameException
  | DuplicateTagKeysException
  | InvalidConfigurationRequestException
  | InvalidSchemeException
  | InvalidSecurityGroupException
  | InvalidSubnetException
  | OperationNotPermittedException
  | ResourceInUseException
  | SubnetNotFoundException
  | TooManyLoadBalancersException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates an Application Load Balancer, Network Load Balancer, or Gateway Load
 * Balancer.
 *
 * For more information, see the following:
 *
 * - Application Load Balancers
 *
 * - Network Load
 * Balancers
 *
 * - Gateway Load
 * Balancers
 *
 * This operation is idempotent, which means that it completes at most one time. If you
 * attempt to create multiple load balancers with the same settings, each call succeeds.
 */
export const createLoadBalancer: API.OperationMethod<
  CreateLoadBalancerInput,
  CreateLoadBalancerOutput,
  CreateLoadBalancerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Subnets: 0,
      SubnetMappings: D.list(i_SubnetMapping),
      SecurityGroups: 0,
      Scheme: 0,
      Tags: D.list(i_Tag),
      Type: 0,
      IpAddressType: 0,
      CustomerOwnedIpv4Pool: 0,
      EnablePrefixForIpv6SourceNat: 0,
      IpamPools: i_IpamPools,
    },
    output: { LoadBalancers: D.list(o_LoadBalancer) },
  },
  errors: [
    AllocationIdNotFoundException,
    AvailabilityZoneNotSupportedException,
    DuplicateLoadBalancerNameException,
    DuplicateTagKeysException,
    InvalidConfigurationRequestException,
    InvalidSchemeException,
    InvalidSecurityGroupException,
    InvalidSubnetException,
    OperationNotPermittedException,
    ResourceInUseException,
    SubnetNotFoundException,
    TooManyLoadBalancersException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLoadBalancer",
})) as any;

export type CreateRuleError =
  | IncompatibleProtocolsException
  | InvalidConfigurationRequestException
  | InvalidLoadBalancerActionException
  | ListenerNotFoundException
  | PriorityInUseException
  | TargetGroupAssociationLimitException
  | TargetGroupNotFoundException
  | TooManyActionsException
  | TooManyRegistrationsForTargetIdException
  | TooManyRulesException
  | TooManyTagsException
  | TooManyTargetGroupsException
  | TooManyTargetsException
  | TooManyUniqueTargetGroupsPerLoadBalancerException
  | UnsupportedProtocolException
  | CommonErrors;
/**
 * Creates a rule for the specified listener. The listener must be associated with an
 * Application Load Balancer or a dual-stack Network Load Balancer.
 *
 * Each rule consists of a priority, one or more actions, and one or more conditions. Rules
 * are evaluated in priority order, from the lowest value to the highest value. When the
 * conditions for a rule are met, its actions are performed. If the conditions for no rules are
 * met, the actions for the default rule are performed. For more information, see Listener rules in the *Application Load Balancers Guide* or
 * Listener rules in the *Network Load Balancers Guide*.
 */
export const createRule: API.OperationMethod<
  CreateRuleInput,
  CreateRuleOutput,
  CreateRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ListenerArn: 0,
      Conditions: D.list(i_RuleCondition),
      Priority: 0,
      Actions: D.list(i_Action),
      Tags: D.list(i_Tag),
      Transforms: D.list(i_RuleTransform),
    },
    output: { Rules: D.list(o_Rule) },
  },
  errors: [
    IncompatibleProtocolsException,
    InvalidConfigurationRequestException,
    InvalidLoadBalancerActionException,
    ListenerNotFoundException,
    PriorityInUseException,
    TargetGroupAssociationLimitException,
    TargetGroupNotFoundException,
    TooManyActionsException,
    TooManyRegistrationsForTargetIdException,
    TooManyRulesException,
    TooManyTagsException,
    TooManyTargetGroupsException,
    TooManyTargetsException,
    TooManyUniqueTargetGroupsPerLoadBalancerException,
    UnsupportedProtocolException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRule",
})) as any;

export type CreateTargetGroupError =
  | DuplicateTargetGroupNameException
  | InvalidConfigurationRequestException
  | TooManyTagsException
  | TooManyTargetGroupsException
  | CommonErrors;
/**
 * Creates a target group.
 *
 * For more information, see the following:
 *
 * - Target
 * groups for your Application Load Balancers
 *
 * - Target groups
 * for your Network Load Balancers
 *
 * - Target groups for your
 * Gateway Load Balancers
 *
 * This operation is idempotent, which means that it completes at most one time. If you
 * attempt to create multiple target groups with the same settings, each call succeeds.
 */
export const createTargetGroup: API.OperationMethod<
  CreateTargetGroupInput,
  CreateTargetGroupOutput,
  CreateTargetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Protocol: 0,
      ProtocolVersion: 0,
      Port: 0,
      VpcId: 0,
      HealthCheckProtocol: 0,
      HealthCheckPort: 0,
      HealthCheckEnabled: 0,
      HealthCheckPath: 0,
      HealthCheckIntervalSeconds: 0,
      HealthCheckTimeoutSeconds: 0,
      HealthyThresholdCount: 0,
      UnhealthyThresholdCount: 0,
      Matcher: i_Matcher,
      TargetType: 0,
      Tags: D.list(i_Tag),
      IpAddressType: 0,
      TargetControlPort: 0,
    },
    output: { TargetGroups: D.list(o_TargetGroup) },
  },
  errors: [
    DuplicateTargetGroupNameException,
    InvalidConfigurationRequestException,
    TooManyTagsException,
    TooManyTargetGroupsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTargetGroup",
})) as any;

export type CreateTrustStoreError =
  | CaCertificatesBundleNotFoundException
  | DuplicateTagKeysException
  | DuplicateTrustStoreNameException
  | InvalidCaCertificatesBundleException
  | TooManyTagsException
  | TooManyTrustStoresException
  | CommonErrors;
/**
 * Creates a trust store.
 *
 * For more information, see Mutual TLS for Application Load Balancers.
 */
export const createTrustStore: API.OperationMethod<
  CreateTrustStoreInput,
  CreateTrustStoreOutput,
  CreateTrustStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      CaCertificatesBundleS3Bucket: 0,
      CaCertificatesBundleS3Key: 0,
      CaCertificatesBundleS3ObjectVersion: 0,
      Tags: D.list(i_Tag),
    },
    output: { TrustStores: D.list(o_TrustStore) },
  },
  errors: [
    CaCertificatesBundleNotFoundException,
    DuplicateTagKeysException,
    DuplicateTrustStoreNameException,
    InvalidCaCertificatesBundleException,
    TooManyTagsException,
    TooManyTrustStoresException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrustStore",
})) as any;

export type DeleteListenerError =
  | ListenerNotFoundException
  | ResourceInUseException
  | CommonErrors;
/**
 * Deletes the specified listener.
 *
 * Alternatively, your listener is deleted when you delete the load balancer to which it is
 * attached.
 */
export const deleteListener: API.OperationMethod<
  DeleteListenerInput,
  DeleteListenerOutput,
  DeleteListenerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ListenerArn: 0 } },
  errors: [ListenerNotFoundException, ResourceInUseException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteListener",
})) as any;

export type DeleteLoadBalancerError =
  | LoadBalancerNotFoundException
  | OperationNotPermittedException
  | ResourceInUseException
  | CommonErrors;
/**
 * Deletes the specified Application Load Balancer, Network Load Balancer, or Gateway Load
 * Balancer. Deleting a load balancer also deletes its listeners.
 *
 * You can't delete a load balancer if deletion protection is enabled. If the load balancer
 * does not exist or has already been deleted, the call succeeds.
 *
 * Deleting a load balancer does not affect its registered targets. For example, your EC2
 * instances continue to run and are still registered to their target groups. If you no longer
 * need these EC2 instances, you can stop or terminate them.
 */
export const deleteLoadBalancer: API.OperationMethod<
  DeleteLoadBalancerInput,
  DeleteLoadBalancerOutput,
  DeleteLoadBalancerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { LoadBalancerArn: 0 } },
  errors: [
    LoadBalancerNotFoundException,
    OperationNotPermittedException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLoadBalancer",
})) as any;

export type DeleteRuleError =
  | OperationNotPermittedException
  | RuleNotFoundException
  | CommonErrors;
/**
 * Deletes the specified rule.
 *
 * You can't delete the default rule.
 */
export const deleteRule: API.OperationMethod<
  DeleteRuleInput,
  DeleteRuleOutput,
  DeleteRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RuleArn: 0 } },
  errors: [OperationNotPermittedException, RuleNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRule",
})) as any;

export type DeleteSharedTrustStoreAssociationError =
  | DeleteAssociationSameAccountException
  | TrustStoreAssociationNotFoundException
  | TrustStoreNotFoundException
  | CommonErrors;
/**
 * Deletes a shared trust store association.
 */
export const deleteSharedTrustStoreAssociation: API.OperationMethod<
  DeleteSharedTrustStoreAssociationInput,
  DeleteSharedTrustStoreAssociationOutput,
  DeleteSharedTrustStoreAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TrustStoreArn: 0, ResourceArn: 0 } },
  errors: [
    DeleteAssociationSameAccountException,
    TrustStoreAssociationNotFoundException,
    TrustStoreNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSharedTrustStoreAssociation",
})) as any;

export type DeleteTargetGroupError = ResourceInUseException | CommonErrors;
/**
 * Deletes the specified target group.
 *
 * You can delete a target group if it is not referenced by any actions. Deleting a target
 * group also deletes any associated health checks. Deleting a target group does not affect its
 * registered targets. For example, any EC2 instances continue to run until you stop or terminate
 * them.
 */
export const deleteTargetGroup: API.OperationMethod<
  DeleteTargetGroupInput,
  DeleteTargetGroupOutput,
  DeleteTargetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TargetGroupArn: 0 } },
  errors: [ResourceInUseException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTargetGroup",
})) as any;

export type DeleteTrustStoreError =
  | TrustStoreInUseException
  | TrustStoreNotFoundException
  | CommonErrors;
/**
 * Deletes a trust store.
 */
export const deleteTrustStore: API.OperationMethod<
  DeleteTrustStoreInput,
  DeleteTrustStoreOutput,
  DeleteTrustStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TrustStoreArn: 0 } },
  errors: [TrustStoreInUseException, TrustStoreNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrustStore",
})) as any;

export type DeregisterTargetsError =
  | InvalidTargetException
  | TargetGroupNotFoundException
  | CommonErrors;
/**
 * Deregisters the specified targets from the specified target group. After the targets are
 * deregistered, they no longer receive traffic from the load balancer.
 *
 * The load balancer stops sending requests to targets that are deregistering, but uses
 * connection draining to ensure that in-flight traffic completes on the existing connections.
 * This deregistration delay is configured by default but can be updated for each target group.
 *
 * For more information, see the following:
 *
 * -
 * Deregistration delay in the *Application Load Balancers User Guide*
 *
 * -
 * Deregistration delay in the *Network Load Balancers User Guide*
 *
 * -
 * Deregistration delay in the *Gateway Load Balancers User Guide*
 *
 * Note: If the specified target does not exist, the action returns successfully.
 */
export const deregisterTargets: API.OperationMethod<
  DeregisterTargetsInput,
  DeregisterTargetsOutput,
  DeregisterTargetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TargetGroupArn: 0, Targets: D.list(i_TargetDescription) },
  },
  errors: [InvalidTargetException, TargetGroupNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterTargets",
})) as any;

export type DescribeAccountLimitsError = CommonErrors;
/**
 * Describes the current Elastic Load Balancing resource limits for your Amazon Web Services
 * account.
 *
 * For more information, see the following:
 *
 * - Quotas for your
 * Application Load Balancers
 *
 * - Quotas for your
 * Network Load Balancers
 *
 * - Quotas for your Gateway
 * Load Balancers
 */
export const describeAccountLimits: API.PaginatedOperationMethod<
  DescribeAccountLimitsInput,
  DescribeAccountLimitsOutput,
  DescribeAccountLimitsError,
  Credentials | HttpClient.HttpClient,
  Limit
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Marker: 0, PageSize: 0 },
    output: { Limits: D.list({}) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountLimits",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "Limits",
  } as const,
})) as any;

export type DescribeCapacityReservationError =
  | LoadBalancerNotFoundException
  | CommonErrors;
/**
 * Describes the capacity reservation status for the specified load balancer.
 */
export const describeCapacityReservation: API.OperationMethod<
  DescribeCapacityReservationInput,
  DescribeCapacityReservationOutput,
  DescribeCapacityReservationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { LoadBalancerArn: 0 },
    output: {
      LastModifiedTime: D.ts,
      DecreaseRequestsRemaining: D.num,
      MinimumLoadBalancerCapacity: o_MinimumLoadBalancerCapacity,
      CapacityReservationState: D.list(o_ZonalCapacityReservationState),
    },
  },
  errors: [LoadBalancerNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCapacityReservation",
})) as any;

export type DescribeListenerAttributesError =
  | ListenerNotFoundException
  | CommonErrors;
/**
 * Describes the attributes for the specified listener.
 */
export const describeListenerAttributes: API.OperationMethod<
  DescribeListenerAttributesInput,
  DescribeListenerAttributesOutput,
  DescribeListenerAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ListenerArn: 0 },
    output: { Attributes: D.list({}) },
  },
  errors: [ListenerNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeListenerAttributes",
})) as any;

export type DescribeListenerCertificatesError =
  | ListenerNotFoundException
  | CommonErrors;
/**
 * Describes the default certificate and the certificate list for the specified HTTPS or TLS
 * listener.
 *
 * If the default certificate is also in the certificate list, it appears twice in the
 * results (once with `IsDefault` set to true and once with `IsDefault` set
 * to false).
 *
 * For more information, see SSL certificates in the *Application Load Balancers Guide* or
 * Server certificates in the Network Load Balancers
 * Guide.
 */
export const describeListenerCertificates: API.PaginatedOperationMethod<
  DescribeListenerCertificatesInput,
  DescribeListenerCertificatesOutput,
  DescribeListenerCertificatesError,
  Credentials | HttpClient.HttpClient,
  Certificate
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ListenerArn: 0, Marker: 0, PageSize: 0 },
    output: { Certificates: D.list(o_Certificate) },
  },
  errors: [ListenerNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeListenerCertificates",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "Certificates",
  } as const,
})) as any;

export type DescribeListenersError =
  | ListenerNotFoundException
  | LoadBalancerNotFoundException
  | UnsupportedProtocolException
  | CommonErrors;
/**
 * Describes the specified listeners or the listeners for the specified Application Load
 * Balancer, Network Load Balancer, or Gateway Load Balancer. You must specify either a load
 * balancer or one or more listeners.
 */
export const describeListeners: API.PaginatedOperationMethod<
  DescribeListenersInput,
  DescribeListenersOutput,
  DescribeListenersError,
  Credentials | HttpClient.HttpClient,
  Listener
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { LoadBalancerArn: 0, ListenerArns: 0, Marker: 0, PageSize: 0 },
    output: { Listeners: D.list(o_Listener) },
  },
  errors: [
    ListenerNotFoundException,
    LoadBalancerNotFoundException,
    UnsupportedProtocolException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeListeners",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "Listeners",
  } as const,
})) as any;

export type DescribeLoadBalancerAttributesError =
  | LoadBalancerNotFoundException
  | CommonErrors;
/**
 * Describes the attributes for the specified Application Load Balancer, Network Load
 * Balancer, or Gateway Load Balancer.
 *
 * For more information, see the following:
 *
 * - Load balancer attributes in the Application Load Balancers
 * Guide
 *
 * - Load balancer attributes in the Network Load Balancers
 * Guide
 *
 * - Load balancer attributes in the Gateway Load Balancers
 * Guide
 */
export const describeLoadBalancerAttributes: API.OperationMethod<
  DescribeLoadBalancerAttributesInput,
  DescribeLoadBalancerAttributesOutput,
  DescribeLoadBalancerAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { LoadBalancerArn: 0 },
    output: { Attributes: D.list({}) },
  },
  errors: [LoadBalancerNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLoadBalancerAttributes",
})) as any;

export type DescribeLoadBalancersError =
  | LoadBalancerNotFoundException
  | CommonErrors;
/**
 * Describes the specified load balancers or all of your load balancers.
 */
export const describeLoadBalancers: API.PaginatedOperationMethod<
  DescribeLoadBalancersInput,
  DescribeLoadBalancersOutput,
  DescribeLoadBalancersError,
  Credentials | HttpClient.HttpClient,
  LoadBalancer
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { LoadBalancerArns: 0, Names: 0, Marker: 0, PageSize: 0 },
    output: { LoadBalancers: D.list(o_LoadBalancer) },
  },
  errors: [LoadBalancerNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLoadBalancers",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "LoadBalancers",
  } as const,
})) as any;

export type DescribeRulesError =
  | ListenerNotFoundException
  | RuleNotFoundException
  | UnsupportedProtocolException
  | CommonErrors;
/**
 * Describes the specified rules or the rules for the specified listener. You must specify
 * either a listener or rules.
 */
export const describeRules: API.PaginatedOperationMethod<
  DescribeRulesInput,
  DescribeRulesOutput,
  DescribeRulesError,
  Credentials | HttpClient.HttpClient,
  Rule
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ListenerArn: 0, RuleArns: 0, Marker: 0, PageSize: 0 },
    output: { Rules: D.list(o_Rule) },
  },
  errors: [
    ListenerNotFoundException,
    RuleNotFoundException,
    UnsupportedProtocolException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRules",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "Rules",
  } as const,
})) as any;

export type DescribeSSLPoliciesError =
  | SSLPolicyNotFoundException
  | CommonErrors;
/**
 * Describes the specified policies or all policies used for SSL negotiation.
 *
 * For more information, see Security policies in the *Application Load Balancers Guide* and
 * Security policies in the *Network Load Balancers Guide*.
 */
export const describeSSLPolicies: API.OperationMethod<
  DescribeSSLPoliciesInput,
  DescribeSSLPoliciesOutput,
  DescribeSSLPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Names: 0, Marker: 0, PageSize: 0, LoadBalancerType: 0 },
    output: {
      SslPolicies: D.list({
        SslProtocols: D.list(),
        Ciphers: D.list({ Priority: D.num }),
        SupportedLoadBalancerTypes: D.list(),
      }),
    },
  },
  errors: [SSLPolicyNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSSLPolicies",
})) as any;

export type DescribeTagsError =
  | ListenerNotFoundException
  | LoadBalancerNotFoundException
  | RuleNotFoundException
  | TargetGroupNotFoundException
  | TrustStoreNotFoundException
  | CommonErrors;
/**
 * Describes the tags for the specified Elastic Load Balancing resources. You can describe
 * the tags for one or more Application Load Balancers, Network Load Balancers, Gateway Load
 * Balancers, target groups, listeners, or rules.
 */
export const describeTags: API.OperationMethod<
  DescribeTagsInput,
  DescribeTagsOutput,
  DescribeTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArns: 0 },
    output: { TagDescriptions: D.list({ Tags: D.list({}) }) },
  },
  errors: [
    ListenerNotFoundException,
    LoadBalancerNotFoundException,
    RuleNotFoundException,
    TargetGroupNotFoundException,
    TrustStoreNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTags",
})) as any;

export type DescribeTargetGroupAttributesError =
  | TargetGroupNotFoundException
  | CommonErrors;
/**
 * Describes the attributes for the specified target group.
 *
 * For more information, see the following:
 *
 * - Target group attributes in the Application Load Balancers
 * Guide
 *
 * - Target group attributes in the Network Load Balancers
 * Guide
 *
 * - Target group attributes in the Gateway Load Balancers
 * Guide
 */
export const describeTargetGroupAttributes: API.OperationMethod<
  DescribeTargetGroupAttributesInput,
  DescribeTargetGroupAttributesOutput,
  DescribeTargetGroupAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TargetGroupArn: 0 },
    output: { Attributes: D.list({}) },
  },
  errors: [TargetGroupNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTargetGroupAttributes",
})) as any;

export type DescribeTargetGroupsError =
  | LoadBalancerNotFoundException
  | TargetGroupNotFoundException
  | CommonErrors;
/**
 * Describes the specified target groups or all of your target groups. By default, all target
 * groups are described. Alternatively, you can specify one of the following to filter the
 * results: the ARN of the load balancer, the names of one or more target groups, or the ARNs of
 * one or more target groups.
 */
export const describeTargetGroups: API.PaginatedOperationMethod<
  DescribeTargetGroupsInput,
  DescribeTargetGroupsOutput,
  DescribeTargetGroupsError,
  Credentials | HttpClient.HttpClient,
  TargetGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      LoadBalancerArn: 0,
      TargetGroupArns: 0,
      Names: 0,
      Marker: 0,
      PageSize: 0,
    },
    output: { TargetGroups: D.list(o_TargetGroup) },
  },
  errors: [LoadBalancerNotFoundException, TargetGroupNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTargetGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "TargetGroups",
  } as const,
})) as any;

export type DescribeTargetHealthError =
  | HealthUnavailableException
  | InvalidTargetException
  | TargetGroupNotFoundException
  | CommonErrors;
/**
 * Describes the health of the specified targets or all of your targets.
 */
export const describeTargetHealth: API.OperationMethod<
  DescribeTargetHealthInput,
  DescribeTargetHealthOutput,
  DescribeTargetHealthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TargetGroupArn: 0,
      Targets: D.list(i_TargetDescription),
      Include: 0,
    },
    output: {
      TargetHealthDescriptions: D.list({
        Target: { Port: D.num },
        TargetHealth: {},
        AnomalyDetection: {},
        AdministrativeOverride: {},
      }),
    },
  },
  errors: [
    HealthUnavailableException,
    InvalidTargetException,
    TargetGroupNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTargetHealth",
})) as any;

export type DescribeTrustStoreAssociationsError =
  | TrustStoreNotFoundException
  | CommonErrors;
/**
 * Describes all resources associated with the specified trust store.
 */
export const describeTrustStoreAssociations: API.PaginatedOperationMethod<
  DescribeTrustStoreAssociationsInput,
  DescribeTrustStoreAssociationsOutput,
  DescribeTrustStoreAssociationsError,
  Credentials | HttpClient.HttpClient,
  TrustStoreAssociation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { TrustStoreArn: 0, Marker: 0, PageSize: 0 },
    output: { TrustStoreAssociations: D.list({}) },
  },
  errors: [TrustStoreNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTrustStoreAssociations",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "TrustStoreAssociations",
    pageSize: "PageSize",
  } as const,
})) as any;

export type DescribeTrustStoreRevocationsError =
  | RevocationIdNotFoundException
  | TrustStoreNotFoundException
  | CommonErrors;
/**
 * Describes the revocation files in use by the specified trust store or revocation
 * files.
 */
export const describeTrustStoreRevocations: API.PaginatedOperationMethod<
  DescribeTrustStoreRevocationsInput,
  DescribeTrustStoreRevocationsOutput,
  DescribeTrustStoreRevocationsError,
  Credentials | HttpClient.HttpClient,
  DescribeTrustStoreRevocation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { TrustStoreArn: 0, RevocationIds: 0, Marker: 0, PageSize: 0 },
    output: {
      TrustStoreRevocations: D.list({
        RevocationId: D.num,
        NumberOfRevokedEntries: D.num,
      }),
    },
  },
  errors: [RevocationIdNotFoundException, TrustStoreNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTrustStoreRevocations",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "TrustStoreRevocations",
    pageSize: "PageSize",
  } as const,
})) as any;

export type DescribeTrustStoresError =
  | TrustStoreNotFoundException
  | CommonErrors;
/**
 * Describes all trust stores for the specified account.
 */
export const describeTrustStores: API.PaginatedOperationMethod<
  DescribeTrustStoresInput,
  DescribeTrustStoresOutput,
  DescribeTrustStoresError,
  Credentials | HttpClient.HttpClient,
  TrustStore
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { TrustStoreArns: 0, Names: 0, Marker: 0, PageSize: 0 },
    output: { TrustStores: D.list(o_TrustStore) },
  },
  errors: [TrustStoreNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTrustStores",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "TrustStores",
    pageSize: "PageSize",
  } as const,
})) as any;

export type GetResourcePolicyError = ResourceNotFoundException | CommonErrors;
/**
 * Retrieves the resource policy for a specified resource.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyInput,
  GetResourcePolicyOutput,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
})) as any;

export type GetTrustStoreCaCertificatesBundleError =
  | TrustStoreNotFoundException
  | CommonErrors;
/**
 * Retrieves the ca certificate bundle.
 *
 * This action returns a pre-signed S3 URI which is
 * active for ten minutes.
 */
export const getTrustStoreCaCertificatesBundle: API.OperationMethod<
  GetTrustStoreCaCertificatesBundleInput,
  GetTrustStoreCaCertificatesBundleOutput,
  GetTrustStoreCaCertificatesBundleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TrustStoreArn: 0 } },
  errors: [TrustStoreNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrustStoreCaCertificatesBundle",
})) as any;

export type GetTrustStoreRevocationContentError =
  | RevocationIdNotFoundException
  | TrustStoreNotFoundException
  | CommonErrors;
/**
 * Retrieves the specified revocation file.
 *
 * This action returns a pre-signed S3 URI which is
 * active for ten minutes.
 */
export const getTrustStoreRevocationContent: API.OperationMethod<
  GetTrustStoreRevocationContentInput,
  GetTrustStoreRevocationContentOutput,
  GetTrustStoreRevocationContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TrustStoreArn: 0, RevocationId: 0 } },
  errors: [RevocationIdNotFoundException, TrustStoreNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrustStoreRevocationContent",
})) as any;

export type ModifyCapacityReservationError =
  | CapacityDecreaseRequestsLimitExceededException
  | CapacityReservationPendingException
  | CapacityUnitsLimitExceededException
  | InsufficientCapacityException
  | InvalidConfigurationRequestException
  | LoadBalancerNotFoundException
  | OperationNotPermittedException
  | PriorRequestNotCompleteException
  | CommonErrors;
/**
 * Modifies the capacity reservation of the specified load balancer.
 *
 * When modifying capacity reservation, you must include at least one `MinimumLoadBalancerCapacity`
 * or `ResetCapacityReservation`.
 */
export const modifyCapacityReservation: API.OperationMethod<
  ModifyCapacityReservationInput,
  ModifyCapacityReservationOutput,
  ModifyCapacityReservationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LoadBalancerArn: 0,
      MinimumLoadBalancerCapacity: { CapacityUnits: 0 },
      ResetCapacityReservation: 0,
    },
    output: {
      LastModifiedTime: D.ts,
      DecreaseRequestsRemaining: D.num,
      MinimumLoadBalancerCapacity: o_MinimumLoadBalancerCapacity,
      CapacityReservationState: D.list(o_ZonalCapacityReservationState),
    },
  },
  errors: [
    CapacityDecreaseRequestsLimitExceededException,
    CapacityReservationPendingException,
    CapacityUnitsLimitExceededException,
    InsufficientCapacityException,
    InvalidConfigurationRequestException,
    LoadBalancerNotFoundException,
    OperationNotPermittedException,
    PriorRequestNotCompleteException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyCapacityReservation",
})) as any;

export type ModifyIpPoolsError = LoadBalancerNotFoundException | CommonErrors;
/**
 * [Application Load Balancers] Modify the IP pool associated to a load balancer.
 */
export const modifyIpPools: API.OperationMethod<
  ModifyIpPoolsInput,
  ModifyIpPoolsOutput,
  ModifyIpPoolsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { LoadBalancerArn: 0, IpamPools: i_IpamPools, RemoveIpamPools: 0 },
    output: { IpamPools: {} },
  },
  errors: [LoadBalancerNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyIpPools",
})) as any;

export type ModifyListenerError =
  | ALPNPolicyNotSupportedException
  | CertificateNotFoundException
  | DuplicateListenerException
  | IncompatibleProtocolsException
  | InvalidConfigurationRequestException
  | InvalidLoadBalancerActionException
  | ListenerNotFoundException
  | SSLPolicyNotFoundException
  | TargetGroupAssociationLimitException
  | TargetGroupNotFoundException
  | TooManyActionsException
  | TooManyCertificatesException
  | TooManyListenersException
  | TooManyRegistrationsForTargetIdException
  | TooManyTargetsException
  | TooManyUniqueTargetGroupsPerLoadBalancerException
  | TrustStoreNotFoundException
  | TrustStoreNotReadyException
  | UnsupportedProtocolException
  | CommonErrors;
/**
 * Replaces the specified properties of the specified listener. Any properties that you do
 * not specify remain unchanged.
 *
 * Changing the protocol from HTTPS to HTTP, or from TLS to TCP, removes the security policy
 * and default certificate properties. If you change the protocol from HTTP to HTTPS, or from TCP
 * to TLS, you must add the security policy and default certificate properties.
 *
 * To add an item to a list, remove an item from a list, or update an item in a list, you
 * must provide the entire list. For example, to add an action, specify a list with the current
 * actions plus the new action.
 */
export const modifyListener: API.OperationMethod<
  ModifyListenerInput,
  ModifyListenerOutput,
  ModifyListenerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ListenerArn: 0,
      Port: 0,
      Protocol: 0,
      SslPolicy: 0,
      Certificates: D.list(i_Certificate),
      DefaultActions: D.list(i_Action),
      AlpnPolicy: 0,
      MutualAuthentication: i_MutualAuthenticationAttributes,
    },
    output: { Listeners: D.list(o_Listener) },
  },
  errors: [
    ALPNPolicyNotSupportedException,
    CertificateNotFoundException,
    DuplicateListenerException,
    IncompatibleProtocolsException,
    InvalidConfigurationRequestException,
    InvalidLoadBalancerActionException,
    ListenerNotFoundException,
    SSLPolicyNotFoundException,
    TargetGroupAssociationLimitException,
    TargetGroupNotFoundException,
    TooManyActionsException,
    TooManyCertificatesException,
    TooManyListenersException,
    TooManyRegistrationsForTargetIdException,
    TooManyTargetsException,
    TooManyUniqueTargetGroupsPerLoadBalancerException,
    TrustStoreNotFoundException,
    TrustStoreNotReadyException,
    UnsupportedProtocolException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyListener",
})) as any;

export type ModifyListenerAttributesError =
  | InvalidConfigurationRequestException
  | ListenerNotFoundException
  | CommonErrors;
/**
 * Modifies the specified attributes of the specified listener.
 */
export const modifyListenerAttributes: API.OperationMethod<
  ModifyListenerAttributesInput,
  ModifyListenerAttributesOutput,
  ModifyListenerAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ListenerArn: 0, Attributes: D.list({ Key: 0, Value: 0 }) },
    output: { Attributes: D.list({}) },
  },
  errors: [InvalidConfigurationRequestException, ListenerNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyListenerAttributes",
})) as any;

export type ModifyLoadBalancerAttributesError =
  | InvalidConfigurationRequestException
  | LoadBalancerNotFoundException
  | CommonErrors;
/**
 * Modifies the specified attributes of the specified Application Load Balancer, Network Load
 * Balancer, or Gateway Load Balancer.
 *
 * If any of the specified attributes can't be modified as requested, the call fails. Any
 * existing attributes that you do not modify retain their current values.
 */
export const modifyLoadBalancerAttributes: API.OperationMethod<
  ModifyLoadBalancerAttributesInput,
  ModifyLoadBalancerAttributesOutput,
  ModifyLoadBalancerAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { LoadBalancerArn: 0, Attributes: D.list({ Key: 0, Value: 0 }) },
    output: { Attributes: D.list({}) },
  },
  errors: [InvalidConfigurationRequestException, LoadBalancerNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyLoadBalancerAttributes",
})) as any;

export type ModifyRuleError =
  | IncompatibleProtocolsException
  | InvalidLoadBalancerActionException
  | OperationNotPermittedException
  | RuleNotFoundException
  | TargetGroupAssociationLimitException
  | TargetGroupNotFoundException
  | TooManyActionsException
  | TooManyRegistrationsForTargetIdException
  | TooManyTargetsException
  | TooManyUniqueTargetGroupsPerLoadBalancerException
  | UnsupportedProtocolException
  | CommonErrors;
/**
 * Replaces the specified properties of the specified rule. Any properties that you do not
 * specify are unchanged.
 *
 * To add an item to a list, remove an item from a list, or update an item in a list, you
 * must provide the entire list. For example, to add an action, specify a list with the current
 * actions plus the new action.
 */
export const modifyRule: API.OperationMethod<
  ModifyRuleInput,
  ModifyRuleOutput,
  ModifyRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      RuleArn: 0,
      Conditions: D.list(i_RuleCondition),
      Actions: D.list(i_Action),
      Transforms: D.list(i_RuleTransform),
      ResetTransforms: 0,
    },
    output: { Rules: D.list(o_Rule) },
  },
  errors: [
    IncompatibleProtocolsException,
    InvalidLoadBalancerActionException,
    OperationNotPermittedException,
    RuleNotFoundException,
    TargetGroupAssociationLimitException,
    TargetGroupNotFoundException,
    TooManyActionsException,
    TooManyRegistrationsForTargetIdException,
    TooManyTargetsException,
    TooManyUniqueTargetGroupsPerLoadBalancerException,
    UnsupportedProtocolException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyRule",
})) as any;

export type ModifyTargetGroupError =
  | InvalidConfigurationRequestException
  | TargetGroupNotFoundException
  | CommonErrors;
/**
 * Modifies the health checks used when evaluating the health state of the targets in the
 * specified target group.
 */
export const modifyTargetGroup: API.OperationMethod<
  ModifyTargetGroupInput,
  ModifyTargetGroupOutput,
  ModifyTargetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TargetGroupArn: 0,
      HealthCheckProtocol: 0,
      HealthCheckPort: 0,
      HealthCheckPath: 0,
      HealthCheckEnabled: 0,
      HealthCheckIntervalSeconds: 0,
      HealthCheckTimeoutSeconds: 0,
      HealthyThresholdCount: 0,
      UnhealthyThresholdCount: 0,
      Matcher: i_Matcher,
    },
    output: { TargetGroups: D.list(o_TargetGroup) },
  },
  errors: [InvalidConfigurationRequestException, TargetGroupNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyTargetGroup",
})) as any;

export type ModifyTargetGroupAttributesError =
  | InvalidConfigurationRequestException
  | TargetGroupNotFoundException
  | CommonErrors;
/**
 * Modifies the specified attributes of the specified target group.
 */
export const modifyTargetGroupAttributes: API.OperationMethod<
  ModifyTargetGroupAttributesInput,
  ModifyTargetGroupAttributesOutput,
  ModifyTargetGroupAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TargetGroupArn: 0, Attributes: D.list({ Key: 0, Value: 0 }) },
    output: { Attributes: D.list({}) },
  },
  errors: [InvalidConfigurationRequestException, TargetGroupNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyTargetGroupAttributes",
})) as any;

export type ModifyTrustStoreError =
  | CaCertificatesBundleNotFoundException
  | InvalidCaCertificatesBundleException
  | TrustStoreNotFoundException
  | CommonErrors;
/**
 * Update the ca certificate bundle for the specified trust store.
 */
export const modifyTrustStore: API.OperationMethod<
  ModifyTrustStoreInput,
  ModifyTrustStoreOutput,
  ModifyTrustStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TrustStoreArn: 0,
      CaCertificatesBundleS3Bucket: 0,
      CaCertificatesBundleS3Key: 0,
      CaCertificatesBundleS3ObjectVersion: 0,
    },
    output: { TrustStores: D.list(o_TrustStore) },
  },
  errors: [
    CaCertificatesBundleNotFoundException,
    InvalidCaCertificatesBundleException,
    TrustStoreNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyTrustStore",
})) as any;

export type RegisterTargetsError =
  | InvalidTargetException
  | TargetGroupNotFoundException
  | TooManyRegistrationsForTargetIdException
  | TooManyTargetsException
  | CommonErrors;
/**
 * Registers the specified targets with the specified target group.
 *
 * If the target is an EC2 instance, it must be in the `running` state when you
 * register it.
 *
 * By default, the load balancer routes requests to registered targets using the protocol and
 * port for the target group. Alternatively, you can override the port for a target when you
 * register it. You can register each EC2 instance or IP address with the same target group
 * multiple times using different ports.
 *
 * For more information, see the following:
 *
 * - Register
 * targets for your Application Load Balancer
 *
 * - Register targets
 * for your Network Load Balancer
 *
 * - Register targets for your
 * Gateway Load Balancer
 */
export const registerTargets: API.OperationMethod<
  RegisterTargetsInput,
  RegisterTargetsOutput,
  RegisterTargetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TargetGroupArn: 0, Targets: D.list(i_TargetDescription) },
  },
  errors: [
    InvalidTargetException,
    TargetGroupNotFoundException,
    TooManyRegistrationsForTargetIdException,
    TooManyTargetsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterTargets",
})) as any;

export type RemoveListenerCertificatesError =
  | ListenerNotFoundException
  | OperationNotPermittedException
  | CommonErrors;
/**
 * Removes the specified certificate from the certificate list for the specified HTTPS or TLS
 * listener.
 */
export const removeListenerCertificates: API.OperationMethod<
  RemoveListenerCertificatesInput,
  RemoveListenerCertificatesOutput,
  RemoveListenerCertificatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ListenerArn: 0, Certificates: D.list(i_Certificate) },
  },
  errors: [ListenerNotFoundException, OperationNotPermittedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveListenerCertificates",
})) as any;

export type RemoveTagsError =
  | ListenerNotFoundException
  | LoadBalancerNotFoundException
  | RuleNotFoundException
  | TargetGroupNotFoundException
  | TooManyTagsException
  | TrustStoreNotFoundException
  | CommonErrors;
/**
 * Removes the specified tags from the specified Elastic Load Balancing resources. You can
 * remove the tags for one or more Application Load Balancers, Network Load Balancers, Gateway
 * Load Balancers, target groups, listeners, or rules.
 */
export const removeTags: API.OperationMethod<
  RemoveTagsInput,
  RemoveTagsOutput,
  RemoveTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArns: 0, TagKeys: 0 } },
  errors: [
    ListenerNotFoundException,
    LoadBalancerNotFoundException,
    RuleNotFoundException,
    TargetGroupNotFoundException,
    TooManyTagsException,
    TrustStoreNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTags",
})) as any;

export type RemoveTrustStoreRevocationsError =
  | RevocationIdNotFoundException
  | TrustStoreNotFoundException
  | CommonErrors;
/**
 * Removes the specified revocation file from the specified trust store.
 */
export const removeTrustStoreRevocations: API.OperationMethod<
  RemoveTrustStoreRevocationsInput,
  RemoveTrustStoreRevocationsOutput,
  RemoveTrustStoreRevocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TrustStoreArn: 0, RevocationIds: 0 } },
  errors: [RevocationIdNotFoundException, TrustStoreNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTrustStoreRevocations",
})) as any;

export type SetIpAddressTypeError =
  | InvalidConfigurationRequestException
  | InvalidSubnetException
  | LoadBalancerNotFoundException
  | CommonErrors;
/**
 * Sets the type of IP addresses used by the subnets of the specified load balancer.
 */
export const setIpAddressType: API.OperationMethod<
  SetIpAddressTypeInput,
  SetIpAddressTypeOutput,
  SetIpAddressTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { LoadBalancerArn: 0, IpAddressType: 0 } },
  errors: [
    InvalidConfigurationRequestException,
    InvalidSubnetException,
    LoadBalancerNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetIpAddressType",
})) as any;

export type SetRulePrioritiesError =
  | OperationNotPermittedException
  | PriorityInUseException
  | RuleNotFoundException
  | CommonErrors;
/**
 * Sets the priorities of the specified rules.
 *
 * You can reorder the rules as long as there are no priority conflicts in the new order. Any
 * existing rules that you do not specify retain their current priority.
 */
export const setRulePriorities: API.OperationMethod<
  SetRulePrioritiesInput,
  SetRulePrioritiesOutput,
  SetRulePrioritiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { RulePriorities: D.list({ RuleArn: 0, Priority: 0 }) },
    output: { Rules: D.list(o_Rule) },
  },
  errors: [
    OperationNotPermittedException,
    PriorityInUseException,
    RuleNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetRulePriorities",
})) as any;

export type SetSecurityGroupsError =
  | InvalidConfigurationRequestException
  | InvalidSecurityGroupException
  | LoadBalancerNotFoundException
  | CommonErrors;
/**
 * Associates the specified security groups with the specified Application Load Balancer or
 * Network Load Balancer. The specified security groups override the previously associated
 * security groups.
 *
 * You can't perform this operation on a Network Load Balancer unless you specified a
 * security group for the load balancer when you created it.
 *
 * You can't associate a security group with a Gateway Load Balancer.
 */
export const setSecurityGroups: API.OperationMethod<
  SetSecurityGroupsInput,
  SetSecurityGroupsOutput,
  SetSecurityGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LoadBalancerArn: 0,
      SecurityGroups: 0,
      EnforceSecurityGroupInboundRulesOnPrivateLinkTraffic: 0,
    },
    output: { SecurityGroupIds: D.list() },
  },
  errors: [
    InvalidConfigurationRequestException,
    InvalidSecurityGroupException,
    LoadBalancerNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetSecurityGroups",
})) as any;

export type SetSubnetsError =
  | AllocationIdNotFoundException
  | AvailabilityZoneNotSupportedException
  | CapacityReservationPendingException
  | InvalidConfigurationRequestException
  | InvalidSubnetException
  | LoadBalancerNotFoundException
  | SubnetNotFoundException
  | CommonErrors;
/**
 * Enables the Availability Zones for the specified public subnets for the specified
 * Application Load Balancer, Network Load Balancer or Gateway Load Balancer. The specified subnets
 * replace the previously enabled subnets.
 */
export const setSubnets: API.OperationMethod<
  SetSubnetsInput,
  SetSubnetsOutput,
  SetSubnetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LoadBalancerArn: 0,
      Subnets: 0,
      SubnetMappings: D.list(i_SubnetMapping),
      IpAddressType: 0,
      EnablePrefixForIpv6SourceNat: 0,
    },
    output: { AvailabilityZones: D.list(o_AvailabilityZone) },
  },
  errors: [
    AllocationIdNotFoundException,
    AvailabilityZoneNotSupportedException,
    CapacityReservationPendingException,
    InvalidConfigurationRequestException,
    InvalidSubnetException,
    LoadBalancerNotFoundException,
    SubnetNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetSubnets",
})) as any;

const i_Action: D.LazyStruct = () => ({
  Type: 0,
  TargetGroupArn: 0,
  AuthenticateOidcConfig: {
    Issuer: 0,
    AuthorizationEndpoint: 0,
    TokenEndpoint: 0,
    UserInfoEndpoint: 0,
    ClientId: 0,
    ClientSecret: 0,
    SessionCookieName: 0,
    Scope: 0,
    SessionTimeout: 0,
    AuthenticationRequestExtraParams: D.map(),
    OnUnauthenticatedRequest: 0,
    UseExistingClientSecret: 0,
  },
  AuthenticateCognitoConfig: {
    UserPoolArn: 0,
    UserPoolClientId: 0,
    UserPoolDomain: 0,
    SessionCookieName: 0,
    Scope: 0,
    SessionTimeout: 0,
    AuthenticationRequestExtraParams: D.map(),
    OnUnauthenticatedRequest: 0,
  },
  Order: 0,
  RedirectConfig: {
    Protocol: 0,
    Port: 0,
    Host: 0,
    Path: 0,
    Query: 0,
    StatusCode: 0,
  },
  FixedResponseConfig: { MessageBody: 0, StatusCode: 0, ContentType: 0 },
  ForwardConfig: {
    TargetGroups: D.list({ TargetGroupArn: 0, Weight: 0 }),
    TargetGroupStickinessConfig: { Enabled: 0, DurationSeconds: 0 },
  },
  JwtValidationConfig: {
    JwksEndpoint: 0,
    Issuer: 0,
    AdditionalClaims: D.list({ Format: 0, Name: 0, Values: 0 }),
  },
});
const i_Certificate: D.LazyStruct = () => ({ CertificateArn: 0, IsDefault: 0 });
const i_IpamPools: D.LazyStruct = () => ({ Ipv4IpamPoolId: 0 });
const i_Matcher: D.LazyStruct = () => ({ HttpCode: 0, GrpcCode: 0 });
const i_MutualAuthenticationAttributes: D.LazyStruct = () => ({
  Mode: 0,
  TrustStoreArn: 0,
  IgnoreClientCertificateExpiry: 0,
  TrustStoreAssociationStatus: 0,
  AdvertiseTrustStoreCaNames: 0,
});
const i_RuleCondition: D.LazyStruct = () => ({
  Field: 0,
  Values: 0,
  HostHeaderConfig: { Values: 0, RegexValues: 0 },
  PathPatternConfig: { Values: 0, RegexValues: 0 },
  HttpHeaderConfig: { HttpHeaderName: 0, Values: 0, RegexValues: 0 },
  QueryStringConfig: { Values: D.list({ Key: 0, Value: 0 }) },
  HttpRequestMethodConfig: { Values: 0 },
  SourceIpConfig: { Values: 0, IpAddressType: 0 },
  RegexValues: 0,
});
const i_RuleTransform: D.LazyStruct = () => ({
  Type: 0,
  HostHeaderRewriteConfig: { Rewrites: D.list(i_RewriteConfig) },
  UrlRewriteConfig: { Rewrites: D.list(i_RewriteConfig) },
});
const i_SubnetMapping: D.LazyStruct = () => ({
  SubnetId: 0,
  AllocationId: 0,
  PrivateIPv4Address: 0,
  IPv6Address: 0,
  SourceNatIpv6Prefix: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_TargetDescription: D.LazyStruct = () => ({
  Id: 0,
  Port: 0,
  AvailabilityZone: 0,
  QuicServerId: 0,
});
const o_AvailabilityZone: D.LazyStruct = () => ({
  LoadBalancerAddresses: D.list({}),
  SourceNatIpv6Prefixes: D.list(),
});
const o_Certificate: D.LazyStruct = () => ({ IsDefault: D.bool });
const o_Listener: D.LazyStruct = () => ({
  Port: D.num,
  Certificates: D.list(o_Certificate),
  DefaultActions: D.list(o_Action),
  AlpnPolicy: D.list(),
  MutualAuthentication: { IgnoreClientCertificateExpiry: D.bool },
});
const o_LoadBalancer: D.LazyStruct = () => ({
  CreatedTime: D.ts,
  State: {},
  AvailabilityZones: D.list(o_AvailabilityZone),
  SecurityGroups: D.list(),
  IpamPools: {},
});
const o_MinimumLoadBalancerCapacity: D.LazyStruct = () => ({
  CapacityUnits: D.num,
});
const o_Rule: D.LazyStruct = () => ({
  Conditions: D.list({
    Values: D.list(),
    HostHeaderConfig: { Values: D.list(), RegexValues: D.list() },
    PathPatternConfig: { Values: D.list(), RegexValues: D.list() },
    HttpHeaderConfig: { Values: D.list(), RegexValues: D.list() },
    QueryStringConfig: { Values: D.list({}) },
    HttpRequestMethodConfig: { Values: D.list() },
    SourceIpConfig: { Values: D.list() },
    RegexValues: D.list(),
  }),
  Actions: D.list(o_Action),
  IsDefault: D.bool,
  Transforms: D.list({
    HostHeaderRewriteConfig: { Rewrites: D.list({}) },
    UrlRewriteConfig: { Rewrites: D.list({}) },
  }),
});
const o_TargetGroup: D.LazyStruct = () => ({
  Port: D.num,
  HealthCheckEnabled: D.bool,
  HealthCheckIntervalSeconds: D.num,
  HealthCheckTimeoutSeconds: D.num,
  HealthyThresholdCount: D.num,
  UnhealthyThresholdCount: D.num,
  Matcher: {},
  LoadBalancerArns: D.list(),
  TargetControlPort: D.num,
});
const o_TrustStore: D.LazyStruct = () => ({
  NumberOfCaCertificates: D.num,
  TotalRevokedEntries: D.num,
});
const o_ZonalCapacityReservationState: D.LazyStruct = () => ({
  State: {},
  EffectiveCapacityUnits: D.num,
});
const i_RewriteConfig: D.LazyStruct = () => ({ Regex: 0, Replace: 0 });
const o_Action: D.LazyStruct = () => ({
  AuthenticateOidcConfig: {
    ClientSecret: D.secret,
    SessionTimeout: D.num,
    AuthenticationRequestExtraParams: D.map(),
    UseExistingClientSecret: D.bool,
  },
  AuthenticateCognitoConfig: {
    SessionTimeout: D.num,
    AuthenticationRequestExtraParams: D.map(),
  },
  Order: D.num,
  RedirectConfig: {},
  FixedResponseConfig: {},
  ForwardConfig: {
    TargetGroups: D.list({ Weight: D.num }),
    TargetGroupStickinessConfig: { Enabled: D.bool, DurationSeconds: D.num },
  },
  JwtValidationConfig: { AdditionalClaims: D.list({ Values: D.list() }) },
});
