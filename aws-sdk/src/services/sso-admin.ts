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
import type { Region } from "../region.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "SSO Admin",
  serviceShapeName: "SWBExternalService",
});
const auth = T.AwsAuthSigv4({ name: "sso" });
const ver = T.ServiceVersion("2020-07-20");
const proto = T.AwsProtocolsAwsJson1_1();
const rules = T.EndpointResolver((p, _) => {
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
              `https://sso-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://sso.${Region}.amazonaws.com`);
            }
            return e(
              `https://sso-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://sso.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://sso.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

//# Newtypes
export type InstanceArn = string;
export type RegionName = string;
export type AccessDeniedExceptionMessage = string;
export type ConflictExceptionMessage = string;
export type InternalFailureMessage = string;
export type ServiceQuotaExceededMessage = string;
export type ThrottlingExceptionMessage = string;
export type ValidationExceptionMessage = string;
export type PermissionSetArn = string;
export type ManagedPolicyName = string;
export type ManagedPolicyPath = string;
export type ResourceNotFoundMessage = string;
export type ManagedPolicyArn = string;
export type TargetId = string;
export type PrincipalId = string;
export type UUId = string;
export type Reason = string;
export type ApplicationProviderArn = string;
export type ApplicationNameType = string;
export type Description = string;
export type ApplicationUrl = string;
export type TagKey = string;
export type TagValue = string;
export type ClientToken = string;
export type ApplicationArn = string;
export type NameType = string;
export type AccessControlAttributeKey = string;
export type AccessControlAttributeValueSource = string;
export type PermissionSetName = string;
export type PermissionSetDescription = string;
export type Duration = string;
export type RelayState = string;
export type TrustedTokenIssuerName = string;
export type TrustedTokenIssuerUrl = string;
export type ClaimAttributePath = string;
export type JMESPath = string;
export type TrustedTokenIssuerArn = string;
export type AccountId = string;
export type Name = string;
export type IconUrl = string;
export type ResourceServerScope = string;
export type Id = string;
export type KmsKeyArn = string;
export type InstanceAccessControlAttributeConfigurationStatusReason = string;
export type IsPrimaryRegion = boolean;
export type AssignmentRequired = boolean;
export type PermissionSetPolicyDocument = string;
export type MaxResults = number;
export type Token = string;
export type TaggableResourceArn = string;
export type Scope = string;
export type ScopeTarget = string;
export type ActorPolicyDocument = unknown;
export type URI = string;
export type TokenIssuerAudience = string;

//# Schemas
export interface AddRegionRequest {
  InstanceArn: string;
  RegionName: string;
}
export const AddRegionRequest = S.suspend(() =>
  S.Struct({ InstanceArn: S.String, RegionName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AddRegionRequest",
}) as any as S.Schema<AddRegionRequest>;
export type RegionStatus = "ACTIVE" | "ADDING" | "REMOVING" | (string & {});
export const RegionStatus = S.String;
export interface AddRegionResponse {
  Status?: RegionStatus;
}
export const AddRegionResponse = S.suspend(() =>
  S.Struct({ Status: S.optional(RegionStatus) }),
).annotate({
  identifier: "AddRegionResponse",
}) as any as S.Schema<AddRegionResponse>;
export type AccessDeniedExceptionReason =
  | "KMS_AccessDeniedException"
  | (string & {});
export const AccessDeniedExceptionReason = S.String;
export type ThrottlingExceptionReason =
  | "KMS_ThrottlingException"
  | (string & {});
export const ThrottlingExceptionReason = S.String;
export type ValidationExceptionReason =
  | "KMS_InvalidKeyUsageException"
  | "KMS_InvalidStateException"
  | "KMS_DisabledException"
  | (string & {});
export const ValidationExceptionReason = S.String;
export interface CustomerManagedPolicyReference {
  Name: string;
  Path?: string;
}
export const CustomerManagedPolicyReference = S.suspend(() =>
  S.Struct({ Name: S.String, Path: S.optional(S.String) }),
).annotate({
  identifier: "CustomerManagedPolicyReference",
}) as any as S.Schema<CustomerManagedPolicyReference>;
export interface AttachCustomerManagedPolicyReferenceToPermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
  CustomerManagedPolicyReference: CustomerManagedPolicyReference;
}
export const AttachCustomerManagedPolicyReferenceToPermissionSetRequest =
  S.suspend(() =>
    S.Struct({
      InstanceArn: S.String,
      PermissionSetArn: S.String,
      CustomerManagedPolicyReference: CustomerManagedPolicyReference,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "AttachCustomerManagedPolicyReferenceToPermissionSetRequest",
  }) as any as S.Schema<AttachCustomerManagedPolicyReferenceToPermissionSetRequest>;
export interface AttachCustomerManagedPolicyReferenceToPermissionSetResponse {}
export const AttachCustomerManagedPolicyReferenceToPermissionSetResponse =
  S.suspend(() => S.Struct({})).annotate({
    identifier: "AttachCustomerManagedPolicyReferenceToPermissionSetResponse",
  }) as any as S.Schema<AttachCustomerManagedPolicyReferenceToPermissionSetResponse>;
export type ResourceNotFoundExceptionReason =
  | "KMS_NotFoundException"
  | (string & {});
export const ResourceNotFoundExceptionReason = S.String;
export interface AttachManagedPolicyToPermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
  ManagedPolicyArn: string;
}
export const AttachManagedPolicyToPermissionSetRequest = S.suspend(() =>
  S.Struct({
    InstanceArn: S.String,
    PermissionSetArn: S.String,
    ManagedPolicyArn: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AttachManagedPolicyToPermissionSetRequest",
}) as any as S.Schema<AttachManagedPolicyToPermissionSetRequest>;
export interface AttachManagedPolicyToPermissionSetResponse {}
export const AttachManagedPolicyToPermissionSetResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AttachManagedPolicyToPermissionSetResponse",
}) as any as S.Schema<AttachManagedPolicyToPermissionSetResponse>;
export type TargetType = "AWS_ACCOUNT" | (string & {});
export const TargetType = S.String;
export type PrincipalType = "USER" | "GROUP" | (string & {});
export const PrincipalType = S.String;
export interface CreateAccountAssignmentRequest {
  InstanceArn: string;
  TargetId: string;
  TargetType: TargetType;
  PermissionSetArn: string;
  PrincipalType: PrincipalType;
  PrincipalId: string;
}
export const CreateAccountAssignmentRequest = S.suspend(() =>
  S.Struct({
    InstanceArn: S.String,
    TargetId: S.String,
    TargetType: TargetType,
    PermissionSetArn: S.String,
    PrincipalType: PrincipalType,
    PrincipalId: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateAccountAssignmentRequest",
}) as any as S.Schema<CreateAccountAssignmentRequest>;
export type StatusValues =
  | "IN_PROGRESS"
  | "FAILED"
  | "SUCCEEDED"
  | (string & {});
export const StatusValues = S.String;
export interface AccountAssignmentOperationStatus {
  Status?: StatusValues;
  RequestId?: string;
  FailureReason?: string;
  TargetId?: string;
  TargetType?: TargetType;
  PermissionSetArn?: string;
  PrincipalType?: PrincipalType;
  PrincipalId?: string;
  CreatedDate?: Date;
}
export const AccountAssignmentOperationStatus = S.suspend(() =>
  S.Struct({
    Status: S.optional(StatusValues),
    RequestId: S.optional(S.String),
    FailureReason: S.optional(S.String),
    TargetId: S.optional(S.String),
    TargetType: S.optional(TargetType),
    PermissionSetArn: S.optional(S.String),
    PrincipalType: S.optional(PrincipalType),
    PrincipalId: S.optional(S.String),
    CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "AccountAssignmentOperationStatus",
}) as any as S.Schema<AccountAssignmentOperationStatus>;
export interface CreateAccountAssignmentResponse {
  AccountAssignmentCreationStatus?: AccountAssignmentOperationStatus;
}
export const CreateAccountAssignmentResponse = S.suspend(() =>
  S.Struct({
    AccountAssignmentCreationStatus: S.optional(
      AccountAssignmentOperationStatus,
    ),
  }),
).annotate({
  identifier: "CreateAccountAssignmentResponse",
}) as any as S.Schema<CreateAccountAssignmentResponse>;
export type SignInOrigin = "IDENTITY_CENTER" | "APPLICATION" | (string & {});
export const SignInOrigin = S.String;
export interface SignInOptions {
  Origin: SignInOrigin;
  ApplicationUrl?: string;
}
export const SignInOptions = S.suspend(() =>
  S.Struct({ Origin: SignInOrigin, ApplicationUrl: S.optional(S.String) }),
).annotate({ identifier: "SignInOptions" }) as any as S.Schema<SignInOptions>;
export type ApplicationVisibility = "ENABLED" | "DISABLED" | (string & {});
export const ApplicationVisibility = S.String;
export interface PortalOptions {
  SignInOptions?: SignInOptions;
  Visibility?: ApplicationVisibility;
}
export const PortalOptions = S.suspend(() =>
  S.Struct({
    SignInOptions: S.optional(SignInOptions),
    Visibility: S.optional(ApplicationVisibility),
  }),
).annotate({ identifier: "PortalOptions" }) as any as S.Schema<PortalOptions>;
export interface Tag {
  Key: string;
  Value: string;
}
export const Tag = S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = S.Array(Tag);
export type ApplicationStatus = "ENABLED" | "DISABLED" | (string & {});
export const ApplicationStatus = S.String;
export interface CreateApplicationRequest {
  InstanceArn: string;
  ApplicationProviderArn: string;
  Name: string;
  Description?: string;
  PortalOptions?: PortalOptions;
  Tags?: Tag[];
  Status?: ApplicationStatus;
  ClientToken?: string;
}
export const CreateApplicationRequest = S.suspend(() =>
  S.Struct({
    InstanceArn: S.String,
    ApplicationProviderArn: S.String,
    Name: S.String,
    Description: S.optional(S.String),
    PortalOptions: S.optional(PortalOptions),
    Tags: S.optional(TagList),
    Status: S.optional(ApplicationStatus),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateApplicationRequest",
}) as any as S.Schema<CreateApplicationRequest>;
export interface CreateApplicationResponse {
  ApplicationArn?: string;
}
export const CreateApplicationResponse = S.suspend(() =>
  S.Struct({ ApplicationArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateApplicationResponse",
}) as any as S.Schema<CreateApplicationResponse>;
export interface CreateApplicationAssignmentRequest {
  ApplicationArn: string;
  PrincipalId: string;
  PrincipalType: PrincipalType;
}
export const CreateApplicationAssignmentRequest = S.suspend(() =>
  S.Struct({
    ApplicationArn: S.String,
    PrincipalId: S.String,
    PrincipalType: PrincipalType,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateApplicationAssignmentRequest",
}) as any as S.Schema<CreateApplicationAssignmentRequest>;
export interface CreateApplicationAssignmentResponse {}
export const CreateApplicationAssignmentResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateApplicationAssignmentResponse",
}) as any as S.Schema<CreateApplicationAssignmentResponse>;
export interface CreateInstanceRequest {
  Name?: string;
  ClientToken?: string;
  Tags?: Tag[];
}
export const CreateInstanceRequest = S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateInstanceRequest",
}) as any as S.Schema<CreateInstanceRequest>;
export interface CreateInstanceResponse {
  InstanceArn?: string;
}
export const CreateInstanceResponse = S.suspend(() =>
  S.Struct({ InstanceArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateInstanceResponse",
}) as any as S.Schema<CreateInstanceResponse>;
export type AccessControlAttributeValueSourceList = string[];
export const AccessControlAttributeValueSourceList = S.Array(S.String);
export interface AccessControlAttributeValue {
  Source: string[];
}
export const AccessControlAttributeValue = S.suspend(() =>
  S.Struct({ Source: AccessControlAttributeValueSourceList }),
).annotate({
  identifier: "AccessControlAttributeValue",
}) as any as S.Schema<AccessControlAttributeValue>;
export interface AccessControlAttribute {
  Key: string;
  Value: AccessControlAttributeValue;
}
export const AccessControlAttribute = S.suspend(() =>
  S.Struct({ Key: S.String, Value: AccessControlAttributeValue }),
).annotate({
  identifier: "AccessControlAttribute",
}) as any as S.Schema<AccessControlAttribute>;
export type AccessControlAttributeList = AccessControlAttribute[];
export const AccessControlAttributeList = S.Array(AccessControlAttribute);
export interface InstanceAccessControlAttributeConfiguration {
  AccessControlAttributes: AccessControlAttribute[];
}
export const InstanceAccessControlAttributeConfiguration = S.suspend(() =>
  S.Struct({ AccessControlAttributes: AccessControlAttributeList }),
).annotate({
  identifier: "InstanceAccessControlAttributeConfiguration",
}) as any as S.Schema<InstanceAccessControlAttributeConfiguration>;
export interface CreateInstanceAccessControlAttributeConfigurationRequest {
  InstanceArn: string;
  InstanceAccessControlAttributeConfiguration: InstanceAccessControlAttributeConfiguration;
}
export const CreateInstanceAccessControlAttributeConfigurationRequest =
  S.suspend(() =>
    S.Struct({
      InstanceArn: S.String,
      InstanceAccessControlAttributeConfiguration:
        InstanceAccessControlAttributeConfiguration,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "CreateInstanceAccessControlAttributeConfigurationRequest",
  }) as any as S.Schema<CreateInstanceAccessControlAttributeConfigurationRequest>;
export interface CreateInstanceAccessControlAttributeConfigurationResponse {}
export const CreateInstanceAccessControlAttributeConfigurationResponse =
  S.suspend(() => S.Struct({})).annotate({
    identifier: "CreateInstanceAccessControlAttributeConfigurationResponse",
  }) as any as S.Schema<CreateInstanceAccessControlAttributeConfigurationResponse>;
export interface CreatePermissionSetRequest {
  Name: string;
  Description?: string;
  InstanceArn: string;
  SessionDuration?: string;
  RelayState?: string;
  Tags?: Tag[];
}
export const CreatePermissionSetRequest = S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    InstanceArn: S.String,
    SessionDuration: S.optional(S.String),
    RelayState: S.optional(S.String),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreatePermissionSetRequest",
}) as any as S.Schema<CreatePermissionSetRequest>;
export interface PermissionSet {
  Name?: string;
  PermissionSetArn?: string;
  Description?: string;
  CreatedDate?: Date;
  SessionDuration?: string;
  RelayState?: string;
}
export const PermissionSet = S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    PermissionSetArn: S.optional(S.String),
    Description: S.optional(S.String),
    CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    SessionDuration: S.optional(S.String),
    RelayState: S.optional(S.String),
  }),
).annotate({ identifier: "PermissionSet" }) as any as S.Schema<PermissionSet>;
export interface CreatePermissionSetResponse {
  PermissionSet?: PermissionSet;
}
export const CreatePermissionSetResponse = S.suspend(() =>
  S.Struct({ PermissionSet: S.optional(PermissionSet) }),
).annotate({
  identifier: "CreatePermissionSetResponse",
}) as any as S.Schema<CreatePermissionSetResponse>;
export type TrustedTokenIssuerType = "OIDC_JWT" | (string & {});
export const TrustedTokenIssuerType = S.String;
export type JwksRetrievalOption = "OPEN_ID_DISCOVERY" | (string & {});
export const JwksRetrievalOption = S.String;
export interface OidcJwtConfiguration {
  IssuerUrl: string;
  ClaimAttributePath: string;
  IdentityStoreAttributePath: string;
  JwksRetrievalOption: JwksRetrievalOption;
}
export const OidcJwtConfiguration = S.suspend(() =>
  S.Struct({
    IssuerUrl: S.String,
    ClaimAttributePath: S.String,
    IdentityStoreAttributePath: S.String,
    JwksRetrievalOption: JwksRetrievalOption,
  }),
).annotate({
  identifier: "OidcJwtConfiguration",
}) as any as S.Schema<OidcJwtConfiguration>;
export type TrustedTokenIssuerConfiguration = {
  OidcJwtConfiguration: OidcJwtConfiguration;
};
export const TrustedTokenIssuerConfiguration = S.Union([
  S.Struct({ OidcJwtConfiguration: OidcJwtConfiguration }),
]);
export interface CreateTrustedTokenIssuerRequest {
  InstanceArn: string;
  Name: string;
  TrustedTokenIssuerType: TrustedTokenIssuerType;
  TrustedTokenIssuerConfiguration: TrustedTokenIssuerConfiguration;
  ClientToken?: string;
  Tags?: Tag[];
}
export const CreateTrustedTokenIssuerRequest = S.suspend(() =>
  S.Struct({
    InstanceArn: S.String,
    Name: S.String,
    TrustedTokenIssuerType: TrustedTokenIssuerType,
    TrustedTokenIssuerConfiguration: TrustedTokenIssuerConfiguration,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateTrustedTokenIssuerRequest",
}) as any as S.Schema<CreateTrustedTokenIssuerRequest>;
export interface CreateTrustedTokenIssuerResponse {
  TrustedTokenIssuerArn?: string;
}
export const CreateTrustedTokenIssuerResponse = S.suspend(() =>
  S.Struct({ TrustedTokenIssuerArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateTrustedTokenIssuerResponse",
}) as any as S.Schema<CreateTrustedTokenIssuerResponse>;
export interface DeleteAccountAssignmentRequest {
  InstanceArn: string;
  TargetId: string;
  TargetType: TargetType;
  PermissionSetArn: string;
  PrincipalType: PrincipalType;
  PrincipalId: string;
}
export const DeleteAccountAssignmentRequest = S.suspend(() =>
  S.Struct({
    InstanceArn: S.String,
    TargetId: S.String,
    TargetType: TargetType,
    PermissionSetArn: S.String,
    PrincipalType: PrincipalType,
    PrincipalId: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteAccountAssignmentRequest",
}) as any as S.Schema<DeleteAccountAssignmentRequest>;
export interface DeleteAccountAssignmentResponse {
  AccountAssignmentDeletionStatus?: AccountAssignmentOperationStatus;
}
export const DeleteAccountAssignmentResponse = S.suspend(() =>
  S.Struct({
    AccountAssignmentDeletionStatus: S.optional(
      AccountAssignmentOperationStatus,
    ),
  }),
).annotate({
  identifier: "DeleteAccountAssignmentResponse",
}) as any as S.Schema<DeleteAccountAssignmentResponse>;
export interface DeleteApplicationRequest {
  ApplicationArn: string;
}
export const DeleteApplicationRequest = S.suspend(() =>
  S.Struct({ ApplicationArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteApplicationRequest",
}) as any as S.Schema<DeleteApplicationRequest>;
export interface DeleteApplicationResponse {}
export const DeleteApplicationResponse = S.suspend(() => S.Struct({})).annotate(
  { identifier: "DeleteApplicationResponse" },
) as any as S.Schema<DeleteApplicationResponse>;
export interface DeleteApplicationAssignmentRequest {
  ApplicationArn: string;
  PrincipalId: string;
  PrincipalType: PrincipalType;
}
export const DeleteApplicationAssignmentRequest = S.suspend(() =>
  S.Struct({
    ApplicationArn: S.String,
    PrincipalId: S.String,
    PrincipalType: PrincipalType,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteApplicationAssignmentRequest",
}) as any as S.Schema<DeleteApplicationAssignmentRequest>;
export interface DeleteApplicationAssignmentResponse {}
export const DeleteApplicationAssignmentResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteApplicationAssignmentResponse",
}) as any as S.Schema<DeleteApplicationAssignmentResponse>;
export interface DeleteInlinePolicyFromPermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
}
export const DeleteInlinePolicyFromPermissionSetRequest = S.suspend(() =>
  S.Struct({ InstanceArn: S.String, PermissionSetArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteInlinePolicyFromPermissionSetRequest",
}) as any as S.Schema<DeleteInlinePolicyFromPermissionSetRequest>;
export interface DeleteInlinePolicyFromPermissionSetResponse {}
export const DeleteInlinePolicyFromPermissionSetResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteInlinePolicyFromPermissionSetResponse",
}) as any as S.Schema<DeleteInlinePolicyFromPermissionSetResponse>;
export interface DeleteInstanceRequest {
  InstanceArn: string;
}
export const DeleteInstanceRequest = S.suspend(() =>
  S.Struct({ InstanceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteInstanceRequest",
}) as any as S.Schema<DeleteInstanceRequest>;
export interface DeleteInstanceResponse {}
export const DeleteInstanceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteInstanceResponse",
}) as any as S.Schema<DeleteInstanceResponse>;
export interface DeleteInstanceAccessControlAttributeConfigurationRequest {
  InstanceArn: string;
}
export const DeleteInstanceAccessControlAttributeConfigurationRequest =
  S.suspend(() =>
    S.Struct({ InstanceArn: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DeleteInstanceAccessControlAttributeConfigurationRequest",
  }) as any as S.Schema<DeleteInstanceAccessControlAttributeConfigurationRequest>;
export interface DeleteInstanceAccessControlAttributeConfigurationResponse {}
export const DeleteInstanceAccessControlAttributeConfigurationResponse =
  S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteInstanceAccessControlAttributeConfigurationResponse",
  }) as any as S.Schema<DeleteInstanceAccessControlAttributeConfigurationResponse>;
export interface DeletePermissionsBoundaryFromPermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
}
export const DeletePermissionsBoundaryFromPermissionSetRequest = S.suspend(() =>
  S.Struct({ InstanceArn: S.String, PermissionSetArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeletePermissionsBoundaryFromPermissionSetRequest",
}) as any as S.Schema<DeletePermissionsBoundaryFromPermissionSetRequest>;
export interface DeletePermissionsBoundaryFromPermissionSetResponse {}
export const DeletePermissionsBoundaryFromPermissionSetResponse = S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeletePermissionsBoundaryFromPermissionSetResponse",
}) as any as S.Schema<DeletePermissionsBoundaryFromPermissionSetResponse>;
export interface DeletePermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
}
export const DeletePermissionSetRequest = S.suspend(() =>
  S.Struct({ InstanceArn: S.String, PermissionSetArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeletePermissionSetRequest",
}) as any as S.Schema<DeletePermissionSetRequest>;
export interface DeletePermissionSetResponse {}
export const DeletePermissionSetResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePermissionSetResponse",
}) as any as S.Schema<DeletePermissionSetResponse>;
export interface DeleteTrustedTokenIssuerRequest {
  TrustedTokenIssuerArn: string;
}
export const DeleteTrustedTokenIssuerRequest = S.suspend(() =>
  S.Struct({ TrustedTokenIssuerArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteTrustedTokenIssuerRequest",
}) as any as S.Schema<DeleteTrustedTokenIssuerRequest>;
export interface DeleteTrustedTokenIssuerResponse {}
export const DeleteTrustedTokenIssuerResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTrustedTokenIssuerResponse",
}) as any as S.Schema<DeleteTrustedTokenIssuerResponse>;
export interface DescribeAccountAssignmentCreationStatusRequest {
  InstanceArn: string;
  AccountAssignmentCreationRequestId: string;
}
export const DescribeAccountAssignmentCreationStatusRequest = S.suspend(() =>
  S.Struct({
    InstanceArn: S.String,
    AccountAssignmentCreationRequestId: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeAccountAssignmentCreationStatusRequest",
}) as any as S.Schema<DescribeAccountAssignmentCreationStatusRequest>;
export interface DescribeAccountAssignmentCreationStatusResponse {
  AccountAssignmentCreationStatus?: AccountAssignmentOperationStatus;
}
export const DescribeAccountAssignmentCreationStatusResponse = S.suspend(() =>
  S.Struct({
    AccountAssignmentCreationStatus: S.optional(
      AccountAssignmentOperationStatus,
    ),
  }),
).annotate({
  identifier: "DescribeAccountAssignmentCreationStatusResponse",
}) as any as S.Schema<DescribeAccountAssignmentCreationStatusResponse>;
export interface DescribeAccountAssignmentDeletionStatusRequest {
  InstanceArn: string;
  AccountAssignmentDeletionRequestId: string;
}
export const DescribeAccountAssignmentDeletionStatusRequest = S.suspend(() =>
  S.Struct({
    InstanceArn: S.String,
    AccountAssignmentDeletionRequestId: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeAccountAssignmentDeletionStatusRequest",
}) as any as S.Schema<DescribeAccountAssignmentDeletionStatusRequest>;
export interface DescribeAccountAssignmentDeletionStatusResponse {
  AccountAssignmentDeletionStatus?: AccountAssignmentOperationStatus;
}
export const DescribeAccountAssignmentDeletionStatusResponse = S.suspend(() =>
  S.Struct({
    AccountAssignmentDeletionStatus: S.optional(
      AccountAssignmentOperationStatus,
    ),
  }),
).annotate({
  identifier: "DescribeAccountAssignmentDeletionStatusResponse",
}) as any as S.Schema<DescribeAccountAssignmentDeletionStatusResponse>;
export interface DescribeApplicationRequest {
  ApplicationArn: string;
}
export const DescribeApplicationRequest = S.suspend(() =>
  S.Struct({ ApplicationArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeApplicationRequest",
}) as any as S.Schema<DescribeApplicationRequest>;
export interface DescribeApplicationResponse {
  ApplicationArn?: string;
  ApplicationProviderArn?: string;
  Name?: string;
  ApplicationAccount?: string;
  InstanceArn?: string;
  Status?: ApplicationStatus;
  PortalOptions?: PortalOptions;
  Description?: string;
  CreatedDate?: Date;
  CreatedFrom?: string;
}
export const DescribeApplicationResponse = S.suspend(() =>
  S.Struct({
    ApplicationArn: S.optional(S.String),
    ApplicationProviderArn: S.optional(S.String),
    Name: S.optional(S.String),
    ApplicationAccount: S.optional(S.String),
    InstanceArn: S.optional(S.String),
    Status: S.optional(ApplicationStatus),
    PortalOptions: S.optional(PortalOptions),
    Description: S.optional(S.String),
    CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedFrom: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeApplicationResponse",
}) as any as S.Schema<DescribeApplicationResponse>;
export interface DescribeApplicationAssignmentRequest {
  ApplicationArn: string;
  PrincipalId: string;
  PrincipalType: PrincipalType;
}
export const DescribeApplicationAssignmentRequest = S.suspend(() =>
  S.Struct({
    ApplicationArn: S.String,
    PrincipalId: S.String,
    PrincipalType: PrincipalType,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeApplicationAssignmentRequest",
}) as any as S.Schema<DescribeApplicationAssignmentRequest>;
export interface DescribeApplicationAssignmentResponse {
  PrincipalType?: PrincipalType;
  PrincipalId?: string;
  ApplicationArn?: string;
}
export const DescribeApplicationAssignmentResponse = S.suspend(() =>
  S.Struct({
    PrincipalType: S.optional(PrincipalType),
    PrincipalId: S.optional(S.String),
    ApplicationArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeApplicationAssignmentResponse",
}) as any as S.Schema<DescribeApplicationAssignmentResponse>;
export interface DescribeApplicationProviderRequest {
  ApplicationProviderArn: string;
}
export const DescribeApplicationProviderRequest = S.suspend(() =>
  S.Struct({ ApplicationProviderArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeApplicationProviderRequest",
}) as any as S.Schema<DescribeApplicationProviderRequest>;
export type FederationProtocol = "SAML" | "OAUTH" | (string & {});
export const FederationProtocol = S.String;
export interface DisplayData {
  DisplayName?: string;
  IconUrl?: string;
  Description?: string;
}
export const DisplayData = S.suspend(() =>
  S.Struct({
    DisplayName: S.optional(S.String),
    IconUrl: S.optional(S.String),
    Description: S.optional(S.String),
  }),
).annotate({ identifier: "DisplayData" }) as any as S.Schema<DisplayData>;
export interface ResourceServerScopeDetails {
  LongDescription?: string;
  DetailedTitle?: string;
}
export const ResourceServerScopeDetails = S.suspend(() =>
  S.Struct({
    LongDescription: S.optional(S.String),
    DetailedTitle: S.optional(S.String),
  }),
).annotate({
  identifier: "ResourceServerScopeDetails",
}) as any as S.Schema<ResourceServerScopeDetails>;
export type ResourceServerScopes = {
  [key: string]: ResourceServerScopeDetails | undefined;
};
export const ResourceServerScopes = S.Record(
  S.String,
  ResourceServerScopeDetails.pipe(S.optional),
);
export interface ResourceServerConfig {
  Scopes?: { [key: string]: ResourceServerScopeDetails | undefined };
}
export const ResourceServerConfig = S.suspend(() =>
  S.Struct({ Scopes: S.optional(ResourceServerScopes) }),
).annotate({
  identifier: "ResourceServerConfig",
}) as any as S.Schema<ResourceServerConfig>;
export interface DescribeApplicationProviderResponse {
  ApplicationProviderArn: string;
  FederationProtocol?: FederationProtocol;
  DisplayData?: DisplayData;
  ResourceServerConfig?: ResourceServerConfig;
}
export const DescribeApplicationProviderResponse = S.suspend(() =>
  S.Struct({
    ApplicationProviderArn: S.String,
    FederationProtocol: S.optional(FederationProtocol),
    DisplayData: S.optional(DisplayData),
    ResourceServerConfig: S.optional(ResourceServerConfig),
  }),
).annotate({
  identifier: "DescribeApplicationProviderResponse",
}) as any as S.Schema<DescribeApplicationProviderResponse>;
export interface DescribeInstanceRequest {
  InstanceArn: string;
}
export const DescribeInstanceRequest = S.suspend(() =>
  S.Struct({ InstanceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeInstanceRequest",
}) as any as S.Schema<DescribeInstanceRequest>;
export type InstanceStatus =
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "DELETE_IN_PROGRESS"
  | "ACTIVE"
  | (string & {});
export const InstanceStatus = S.String;
export type KmsKeyType =
  | "AWS_OWNED_KMS_KEY"
  | "CUSTOMER_MANAGED_KEY"
  | (string & {});
export const KmsKeyType = S.String;
export type KmsKeyStatus =
  | "UPDATING"
  | "ENABLED"
  | "UPDATE_FAILED"
  | (string & {});
export const KmsKeyStatus = S.String;
export interface EncryptionConfigurationDetails {
  KeyType?: KmsKeyType;
  KmsKeyArn?: string;
  EncryptionStatus?: KmsKeyStatus;
  EncryptionStatusReason?: string;
}
export const EncryptionConfigurationDetails = S.suspend(() =>
  S.Struct({
    KeyType: S.optional(KmsKeyType),
    KmsKeyArn: S.optional(S.String),
    EncryptionStatus: S.optional(KmsKeyStatus),
    EncryptionStatusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "EncryptionConfigurationDetails",
}) as any as S.Schema<EncryptionConfigurationDetails>;
export interface DescribeInstanceResponse {
  InstanceArn?: string;
  IdentityStoreId?: string;
  OwnerAccountId?: string;
  Name?: string;
  CreatedDate?: Date;
  Status?: InstanceStatus;
  StatusReason?: string;
  EncryptionConfigurationDetails?: EncryptionConfigurationDetails;
}
export const DescribeInstanceResponse = S.suspend(() =>
  S.Struct({
    InstanceArn: S.optional(S.String),
    IdentityStoreId: S.optional(S.String),
    OwnerAccountId: S.optional(S.String),
    Name: S.optional(S.String),
    CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(InstanceStatus),
    StatusReason: S.optional(S.String),
    EncryptionConfigurationDetails: S.optional(EncryptionConfigurationDetails),
  }),
).annotate({
  identifier: "DescribeInstanceResponse",
}) as any as S.Schema<DescribeInstanceResponse>;
export interface DescribeInstanceAccessControlAttributeConfigurationRequest {
  InstanceArn: string;
}
export const DescribeInstanceAccessControlAttributeConfigurationRequest =
  S.suspend(() =>
    S.Struct({ InstanceArn: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DescribeInstanceAccessControlAttributeConfigurationRequest",
  }) as any as S.Schema<DescribeInstanceAccessControlAttributeConfigurationRequest>;
export type InstanceAccessControlAttributeConfigurationStatus =
  | "ENABLED"
  | "CREATION_IN_PROGRESS"
  | "CREATION_FAILED"
  | (string & {});
export const InstanceAccessControlAttributeConfigurationStatus = S.String;
export interface DescribeInstanceAccessControlAttributeConfigurationResponse {
  Status?: InstanceAccessControlAttributeConfigurationStatus;
  StatusReason?: string;
  InstanceAccessControlAttributeConfiguration?: InstanceAccessControlAttributeConfiguration;
}
export const DescribeInstanceAccessControlAttributeConfigurationResponse =
  S.suspend(() =>
    S.Struct({
      Status: S.optional(InstanceAccessControlAttributeConfigurationStatus),
      StatusReason: S.optional(S.String),
      InstanceAccessControlAttributeConfiguration: S.optional(
        InstanceAccessControlAttributeConfiguration,
      ),
    }),
  ).annotate({
    identifier: "DescribeInstanceAccessControlAttributeConfigurationResponse",
  }) as any as S.Schema<DescribeInstanceAccessControlAttributeConfigurationResponse>;
export interface DescribePermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
}
export const DescribePermissionSetRequest = S.suspend(() =>
  S.Struct({ InstanceArn: S.String, PermissionSetArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribePermissionSetRequest",
}) as any as S.Schema<DescribePermissionSetRequest>;
export interface DescribePermissionSetResponse {
  PermissionSet?: PermissionSet;
}
export const DescribePermissionSetResponse = S.suspend(() =>
  S.Struct({ PermissionSet: S.optional(PermissionSet) }),
).annotate({
  identifier: "DescribePermissionSetResponse",
}) as any as S.Schema<DescribePermissionSetResponse>;
export interface DescribePermissionSetProvisioningStatusRequest {
  InstanceArn: string;
  ProvisionPermissionSetRequestId: string;
}
export const DescribePermissionSetProvisioningStatusRequest = S.suspend(() =>
  S.Struct({
    InstanceArn: S.String,
    ProvisionPermissionSetRequestId: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribePermissionSetProvisioningStatusRequest",
}) as any as S.Schema<DescribePermissionSetProvisioningStatusRequest>;
export interface PermissionSetProvisioningStatus {
  Status?: StatusValues;
  RequestId?: string;
  AccountId?: string;
  PermissionSetArn?: string;
  FailureReason?: string;
  CreatedDate?: Date;
}
export const PermissionSetProvisioningStatus = S.suspend(() =>
  S.Struct({
    Status: S.optional(StatusValues),
    RequestId: S.optional(S.String),
    AccountId: S.optional(S.String),
    PermissionSetArn: S.optional(S.String),
    FailureReason: S.optional(S.String),
    CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "PermissionSetProvisioningStatus",
}) as any as S.Schema<PermissionSetProvisioningStatus>;
export interface DescribePermissionSetProvisioningStatusResponse {
  PermissionSetProvisioningStatus?: PermissionSetProvisioningStatus;
}
export const DescribePermissionSetProvisioningStatusResponse = S.suspend(() =>
  S.Struct({
    PermissionSetProvisioningStatus: S.optional(
      PermissionSetProvisioningStatus,
    ),
  }),
).annotate({
  identifier: "DescribePermissionSetProvisioningStatusResponse",
}) as any as S.Schema<DescribePermissionSetProvisioningStatusResponse>;
export interface DescribeRegionRequest {
  InstanceArn: string;
  RegionName: string;
}
export const DescribeRegionRequest = S.suspend(() =>
  S.Struct({ InstanceArn: S.String, RegionName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeRegionRequest",
}) as any as S.Schema<DescribeRegionRequest>;
export interface DescribeRegionResponse {
  RegionName?: string;
  Status?: RegionStatus;
  AddedDate?: Date;
  IsPrimaryRegion?: boolean;
}
export const DescribeRegionResponse = S.suspend(() =>
  S.Struct({
    RegionName: S.optional(S.String),
    Status: S.optional(RegionStatus),
    AddedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    IsPrimaryRegion: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DescribeRegionResponse",
}) as any as S.Schema<DescribeRegionResponse>;
export interface DescribeTrustedTokenIssuerRequest {
  TrustedTokenIssuerArn: string;
}
export const DescribeTrustedTokenIssuerRequest = S.suspend(() =>
  S.Struct({ TrustedTokenIssuerArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeTrustedTokenIssuerRequest",
}) as any as S.Schema<DescribeTrustedTokenIssuerRequest>;
export interface DescribeTrustedTokenIssuerResponse {
  TrustedTokenIssuerArn?: string;
  Name?: string;
  TrustedTokenIssuerType?: TrustedTokenIssuerType;
  TrustedTokenIssuerConfiguration?: TrustedTokenIssuerConfiguration;
}
export const DescribeTrustedTokenIssuerResponse = S.suspend(() =>
  S.Struct({
    TrustedTokenIssuerArn: S.optional(S.String),
    Name: S.optional(S.String),
    TrustedTokenIssuerType: S.optional(TrustedTokenIssuerType),
    TrustedTokenIssuerConfiguration: S.optional(
      TrustedTokenIssuerConfiguration,
    ),
  }),
).annotate({
  identifier: "DescribeTrustedTokenIssuerResponse",
}) as any as S.Schema<DescribeTrustedTokenIssuerResponse>;
export interface DetachCustomerManagedPolicyReferenceFromPermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
  CustomerManagedPolicyReference: CustomerManagedPolicyReference;
}
export const DetachCustomerManagedPolicyReferenceFromPermissionSetRequest =
  S.suspend(() =>
    S.Struct({
      InstanceArn: S.String,
      PermissionSetArn: S.String,
      CustomerManagedPolicyReference: CustomerManagedPolicyReference,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DetachCustomerManagedPolicyReferenceFromPermissionSetRequest",
  }) as any as S.Schema<DetachCustomerManagedPolicyReferenceFromPermissionSetRequest>;
export interface DetachCustomerManagedPolicyReferenceFromPermissionSetResponse {}
export const DetachCustomerManagedPolicyReferenceFromPermissionSetResponse =
  S.suspend(() => S.Struct({})).annotate({
    identifier: "DetachCustomerManagedPolicyReferenceFromPermissionSetResponse",
  }) as any as S.Schema<DetachCustomerManagedPolicyReferenceFromPermissionSetResponse>;
export interface DetachManagedPolicyFromPermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
  ManagedPolicyArn: string;
}
export const DetachManagedPolicyFromPermissionSetRequest = S.suspend(() =>
  S.Struct({
    InstanceArn: S.String,
    PermissionSetArn: S.String,
    ManagedPolicyArn: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DetachManagedPolicyFromPermissionSetRequest",
}) as any as S.Schema<DetachManagedPolicyFromPermissionSetRequest>;
export interface DetachManagedPolicyFromPermissionSetResponse {}
export const DetachManagedPolicyFromPermissionSetResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DetachManagedPolicyFromPermissionSetResponse",
}) as any as S.Schema<DetachManagedPolicyFromPermissionSetResponse>;
export interface GetApplicationAssignmentConfigurationRequest {
  ApplicationArn: string;
}
export const GetApplicationAssignmentConfigurationRequest = S.suspend(() =>
  S.Struct({ ApplicationArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetApplicationAssignmentConfigurationRequest",
}) as any as S.Schema<GetApplicationAssignmentConfigurationRequest>;
export interface GetApplicationAssignmentConfigurationResponse {
  AssignmentRequired: boolean;
}
export const GetApplicationAssignmentConfigurationResponse = S.suspend(() =>
  S.Struct({ AssignmentRequired: S.Boolean }),
).annotate({
  identifier: "GetApplicationAssignmentConfigurationResponse",
}) as any as S.Schema<GetApplicationAssignmentConfigurationResponse>;
export interface GetApplicationSessionConfigurationRequest {
  ApplicationArn: string;
}
export const GetApplicationSessionConfigurationRequest = S.suspend(() =>
  S.Struct({ ApplicationArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetApplicationSessionConfigurationRequest",
}) as any as S.Schema<GetApplicationSessionConfigurationRequest>;
export type UserBackgroundSessionApplicationStatus =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const UserBackgroundSessionApplicationStatus = S.String;
export interface GetApplicationSessionConfigurationResponse {
  UserBackgroundSessionApplicationStatus?: UserBackgroundSessionApplicationStatus;
}
export const GetApplicationSessionConfigurationResponse = S.suspend(() =>
  S.Struct({
    UserBackgroundSessionApplicationStatus: S.optional(
      UserBackgroundSessionApplicationStatus,
    ),
  }),
).annotate({
  identifier: "GetApplicationSessionConfigurationResponse",
}) as any as S.Schema<GetApplicationSessionConfigurationResponse>;
export interface GetInlinePolicyForPermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
}
export const GetInlinePolicyForPermissionSetRequest = S.suspend(() =>
  S.Struct({ InstanceArn: S.String, PermissionSetArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetInlinePolicyForPermissionSetRequest",
}) as any as S.Schema<GetInlinePolicyForPermissionSetRequest>;
export interface GetInlinePolicyForPermissionSetResponse {
  InlinePolicy?: string;
}
export const GetInlinePolicyForPermissionSetResponse = S.suspend(() =>
  S.Struct({ InlinePolicy: S.optional(S.String) }),
).annotate({
  identifier: "GetInlinePolicyForPermissionSetResponse",
}) as any as S.Schema<GetInlinePolicyForPermissionSetResponse>;
export interface GetPermissionsBoundaryForPermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
}
export const GetPermissionsBoundaryForPermissionSetRequest = S.suspend(() =>
  S.Struct({ InstanceArn: S.String, PermissionSetArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetPermissionsBoundaryForPermissionSetRequest",
}) as any as S.Schema<GetPermissionsBoundaryForPermissionSetRequest>;
export interface PermissionsBoundary {
  CustomerManagedPolicyReference?: CustomerManagedPolicyReference;
  ManagedPolicyArn?: string;
}
export const PermissionsBoundary = S.suspend(() =>
  S.Struct({
    CustomerManagedPolicyReference: S.optional(CustomerManagedPolicyReference),
    ManagedPolicyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "PermissionsBoundary",
}) as any as S.Schema<PermissionsBoundary>;
export interface GetPermissionsBoundaryForPermissionSetResponse {
  PermissionsBoundary?: PermissionsBoundary;
}
export const GetPermissionsBoundaryForPermissionSetResponse = S.suspend(() =>
  S.Struct({ PermissionsBoundary: S.optional(PermissionsBoundary) }),
).annotate({
  identifier: "GetPermissionsBoundaryForPermissionSetResponse",
}) as any as S.Schema<GetPermissionsBoundaryForPermissionSetResponse>;
export interface OperationStatusFilter {
  Status?: StatusValues;
}
export const OperationStatusFilter = S.suspend(() =>
  S.Struct({ Status: S.optional(StatusValues) }),
).annotate({
  identifier: "OperationStatusFilter",
}) as any as S.Schema<OperationStatusFilter>;
export interface ListAccountAssignmentCreationStatusRequest {
  InstanceArn: string;
  MaxResults?: number;
  NextToken?: string;
  Filter?: OperationStatusFilter;
}
export const ListAccountAssignmentCreationStatusRequest = S.suspend(() =>
  S.Struct({
    InstanceArn: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filter: S.optional(OperationStatusFilter),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAccountAssignmentCreationStatusRequest",
}) as any as S.Schema<ListAccountAssignmentCreationStatusRequest>;
export interface AccountAssignmentOperationStatusMetadata {
  Status?: StatusValues;
  RequestId?: string;
  CreatedDate?: Date;
}
export const AccountAssignmentOperationStatusMetadata = S.suspend(() =>
  S.Struct({
    Status: S.optional(StatusValues),
    RequestId: S.optional(S.String),
    CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "AccountAssignmentOperationStatusMetadata",
}) as any as S.Schema<AccountAssignmentOperationStatusMetadata>;
export type AccountAssignmentOperationStatusList =
  AccountAssignmentOperationStatusMetadata[];
export const AccountAssignmentOperationStatusList = S.Array(
  AccountAssignmentOperationStatusMetadata,
);
export interface ListAccountAssignmentCreationStatusResponse {
  AccountAssignmentsCreationStatus?: AccountAssignmentOperationStatusMetadata[];
  NextToken?: string;
}
export const ListAccountAssignmentCreationStatusResponse = S.suspend(() =>
  S.Struct({
    AccountAssignmentsCreationStatus: S.optional(
      AccountAssignmentOperationStatusList,
    ),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAccountAssignmentCreationStatusResponse",
}) as any as S.Schema<ListAccountAssignmentCreationStatusResponse>;
export interface ListAccountAssignmentDeletionStatusRequest {
  InstanceArn: string;
  MaxResults?: number;
  NextToken?: string;
  Filter?: OperationStatusFilter;
}
export const ListAccountAssignmentDeletionStatusRequest = S.suspend(() =>
  S.Struct({
    InstanceArn: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filter: S.optional(OperationStatusFilter),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAccountAssignmentDeletionStatusRequest",
}) as any as S.Schema<ListAccountAssignmentDeletionStatusRequest>;
export interface ListAccountAssignmentDeletionStatusResponse {
  AccountAssignmentsDeletionStatus?: AccountAssignmentOperationStatusMetadata[];
  NextToken?: string;
}
export const ListAccountAssignmentDeletionStatusResponse = S.suspend(() =>
  S.Struct({
    AccountAssignmentsDeletionStatus: S.optional(
      AccountAssignmentOperationStatusList,
    ),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAccountAssignmentDeletionStatusResponse",
}) as any as S.Schema<ListAccountAssignmentDeletionStatusResponse>;
export interface ListAccountAssignmentsRequest {
  InstanceArn: string;
  AccountId: string;
  PermissionSetArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListAccountAssignmentsRequest = S.suspend(() =>
  S.Struct({
    InstanceArn: S.String,
    AccountId: S.String,
    PermissionSetArn: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAccountAssignmentsRequest",
}) as any as S.Schema<ListAccountAssignmentsRequest>;
export interface AccountAssignment {
  AccountId?: string;
  PermissionSetArn?: string;
  PrincipalType?: PrincipalType;
  PrincipalId?: string;
}
export const AccountAssignment = S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    PermissionSetArn: S.optional(S.String),
    PrincipalType: S.optional(PrincipalType),
    PrincipalId: S.optional(S.String),
  }),
).annotate({
  identifier: "AccountAssignment",
}) as any as S.Schema<AccountAssignment>;
export type AccountAssignmentList = AccountAssignment[];
export const AccountAssignmentList = S.Array(AccountAssignment);
export interface ListAccountAssignmentsResponse {
  AccountAssignments?: AccountAssignment[];
  NextToken?: string;
}
export const ListAccountAssignmentsResponse = S.suspend(() =>
  S.Struct({
    AccountAssignments: S.optional(AccountAssignmentList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAccountAssignmentsResponse",
}) as any as S.Schema<ListAccountAssignmentsResponse>;
export interface ListAccountAssignmentsFilter {
  AccountId?: string;
}
export const ListAccountAssignmentsFilter = S.suspend(() =>
  S.Struct({ AccountId: S.optional(S.String) }),
).annotate({
  identifier: "ListAccountAssignmentsFilter",
}) as any as S.Schema<ListAccountAssignmentsFilter>;
export interface ListAccountAssignmentsForPrincipalRequest {
  InstanceArn: string;
  PrincipalId: string;
  PrincipalType: PrincipalType;
  Filter?: ListAccountAssignmentsFilter;
  NextToken?: string;
  MaxResults?: number;
}
export const ListAccountAssignmentsForPrincipalRequest = S.suspend(() =>
  S.Struct({
    InstanceArn: S.String,
    PrincipalId: S.String,
    PrincipalType: PrincipalType,
    Filter: S.optional(ListAccountAssignmentsFilter),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAccountAssignmentsForPrincipalRequest",
}) as any as S.Schema<ListAccountAssignmentsForPrincipalRequest>;
export interface AccountAssignmentForPrincipal {
  AccountId?: string;
  PermissionSetArn?: string;
  PrincipalId?: string;
  PrincipalType?: PrincipalType;
}
export const AccountAssignmentForPrincipal = S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    PermissionSetArn: S.optional(S.String),
    PrincipalId: S.optional(S.String),
    PrincipalType: S.optional(PrincipalType),
  }),
).annotate({
  identifier: "AccountAssignmentForPrincipal",
}) as any as S.Schema<AccountAssignmentForPrincipal>;
export type AccountAssignmentListForPrincipal = AccountAssignmentForPrincipal[];
export const AccountAssignmentListForPrincipal = S.Array(
  AccountAssignmentForPrincipal,
);
export interface ListAccountAssignmentsForPrincipalResponse {
  AccountAssignments?: AccountAssignmentForPrincipal[];
  NextToken?: string;
}
export const ListAccountAssignmentsForPrincipalResponse = S.suspend(() =>
  S.Struct({
    AccountAssignments: S.optional(AccountAssignmentListForPrincipal),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAccountAssignmentsForPrincipalResponse",
}) as any as S.Schema<ListAccountAssignmentsForPrincipalResponse>;
export type ProvisioningStatus =
  | "LATEST_PERMISSION_SET_PROVISIONED"
  | "LATEST_PERMISSION_SET_NOT_PROVISIONED"
  | (string & {});
export const ProvisioningStatus = S.String;
export interface ListAccountsForProvisionedPermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
  ProvisioningStatus?: ProvisioningStatus;
  MaxResults?: number;
  NextToken?: string;
}
export const ListAccountsForProvisionedPermissionSetRequest = S.suspend(() =>
  S.Struct({
    InstanceArn: S.String,
    PermissionSetArn: S.String,
    ProvisioningStatus: S.optional(ProvisioningStatus),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAccountsForProvisionedPermissionSetRequest",
}) as any as S.Schema<ListAccountsForProvisionedPermissionSetRequest>;
export type AccountList = string[];
export const AccountList = S.Array(S.String);
export interface ListAccountsForProvisionedPermissionSetResponse {
  AccountIds?: string[];
  NextToken?: string;
}
export const ListAccountsForProvisionedPermissionSetResponse = S.suspend(() =>
  S.Struct({
    AccountIds: S.optional(AccountList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAccountsForProvisionedPermissionSetResponse",
}) as any as S.Schema<ListAccountsForProvisionedPermissionSetResponse>;
export interface ListApplicationAssignmentsRequest {
  ApplicationArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListApplicationAssignmentsRequest = S.suspend(() =>
  S.Struct({
    ApplicationArn: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListApplicationAssignmentsRequest",
}) as any as S.Schema<ListApplicationAssignmentsRequest>;
export interface ApplicationAssignment {
  ApplicationArn: string;
  PrincipalId: string;
  PrincipalType: PrincipalType;
}
export const ApplicationAssignment = S.suspend(() =>
  S.Struct({
    ApplicationArn: S.String,
    PrincipalId: S.String,
    PrincipalType: PrincipalType,
  }),
).annotate({
  identifier: "ApplicationAssignment",
}) as any as S.Schema<ApplicationAssignment>;
export type ApplicationAssignmentsList = ApplicationAssignment[];
export const ApplicationAssignmentsList = S.Array(ApplicationAssignment);
export interface ListApplicationAssignmentsResponse {
  ApplicationAssignments?: ApplicationAssignment[];
  NextToken?: string;
}
export const ListApplicationAssignmentsResponse = S.suspend(() =>
  S.Struct({
    ApplicationAssignments: S.optional(ApplicationAssignmentsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListApplicationAssignmentsResponse",
}) as any as S.Schema<ListApplicationAssignmentsResponse>;
export interface ListApplicationAssignmentsFilter {
  ApplicationArn?: string;
}
export const ListApplicationAssignmentsFilter = S.suspend(() =>
  S.Struct({ ApplicationArn: S.optional(S.String) }),
).annotate({
  identifier: "ListApplicationAssignmentsFilter",
}) as any as S.Schema<ListApplicationAssignmentsFilter>;
export interface ListApplicationAssignmentsForPrincipalRequest {
  InstanceArn: string;
  PrincipalId: string;
  PrincipalType: PrincipalType;
  Filter?: ListApplicationAssignmentsFilter;
  NextToken?: string;
  MaxResults?: number;
}
export const ListApplicationAssignmentsForPrincipalRequest = S.suspend(() =>
  S.Struct({
    InstanceArn: S.String,
    PrincipalId: S.String,
    PrincipalType: PrincipalType,
    Filter: S.optional(ListApplicationAssignmentsFilter),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListApplicationAssignmentsForPrincipalRequest",
}) as any as S.Schema<ListApplicationAssignmentsForPrincipalRequest>;
export interface ApplicationAssignmentForPrincipal {
  ApplicationArn?: string;
  PrincipalId?: string;
  PrincipalType?: PrincipalType;
}
export const ApplicationAssignmentForPrincipal = S.suspend(() =>
  S.Struct({
    ApplicationArn: S.optional(S.String),
    PrincipalId: S.optional(S.String),
    PrincipalType: S.optional(PrincipalType),
  }),
).annotate({
  identifier: "ApplicationAssignmentForPrincipal",
}) as any as S.Schema<ApplicationAssignmentForPrincipal>;
export type ApplicationAssignmentListForPrincipal =
  ApplicationAssignmentForPrincipal[];
export const ApplicationAssignmentListForPrincipal = S.Array(
  ApplicationAssignmentForPrincipal,
);
export interface ListApplicationAssignmentsForPrincipalResponse {
  ApplicationAssignments?: ApplicationAssignmentForPrincipal[];
  NextToken?: string;
}
export const ListApplicationAssignmentsForPrincipalResponse = S.suspend(() =>
  S.Struct({
    ApplicationAssignments: S.optional(ApplicationAssignmentListForPrincipal),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListApplicationAssignmentsForPrincipalResponse",
}) as any as S.Schema<ListApplicationAssignmentsForPrincipalResponse>;
export interface ListApplicationProvidersRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListApplicationProvidersRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListApplicationProvidersRequest",
}) as any as S.Schema<ListApplicationProvidersRequest>;
export interface ApplicationProvider {
  ApplicationProviderArn: string;
  FederationProtocol?: FederationProtocol;
  DisplayData?: DisplayData;
  ResourceServerConfig?: ResourceServerConfig;
}
export const ApplicationProvider = S.suspend(() =>
  S.Struct({
    ApplicationProviderArn: S.String,
    FederationProtocol: S.optional(FederationProtocol),
    DisplayData: S.optional(DisplayData),
    ResourceServerConfig: S.optional(ResourceServerConfig),
  }),
).annotate({
  identifier: "ApplicationProvider",
}) as any as S.Schema<ApplicationProvider>;
export type ApplicationProviderList = ApplicationProvider[];
export const ApplicationProviderList = S.Array(ApplicationProvider);
export interface ListApplicationProvidersResponse {
  ApplicationProviders?: ApplicationProvider[];
  NextToken?: string;
}
export const ListApplicationProvidersResponse = S.suspend(() =>
  S.Struct({
    ApplicationProviders: S.optional(ApplicationProviderList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListApplicationProvidersResponse",
}) as any as S.Schema<ListApplicationProvidersResponse>;
export interface ListApplicationsFilter {
  ApplicationAccount?: string;
  ApplicationProvider?: string;
}
export const ListApplicationsFilter = S.suspend(() =>
  S.Struct({
    ApplicationAccount: S.optional(S.String),
    ApplicationProvider: S.optional(S.String),
  }),
).annotate({
  identifier: "ListApplicationsFilter",
}) as any as S.Schema<ListApplicationsFilter>;
export interface ListApplicationsRequest {
  InstanceArn: string;
  MaxResults?: number;
  NextToken?: string;
  Filter?: ListApplicationsFilter;
}
export const ListApplicationsRequest = S.suspend(() =>
  S.Struct({
    InstanceArn: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filter: S.optional(ListApplicationsFilter),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListApplicationsRequest",
}) as any as S.Schema<ListApplicationsRequest>;
export interface Application {
  ApplicationArn?: string;
  ApplicationProviderArn?: string;
  Name?: string;
  ApplicationAccount?: string;
  InstanceArn?: string;
  Status?: ApplicationStatus;
  PortalOptions?: PortalOptions;
  Description?: string;
  CreatedDate?: Date;
  CreatedFrom?: string;
}
export const Application = S.suspend(() =>
  S.Struct({
    ApplicationArn: S.optional(S.String),
    ApplicationProviderArn: S.optional(S.String),
    Name: S.optional(S.String),
    ApplicationAccount: S.optional(S.String),
    InstanceArn: S.optional(S.String),
    Status: S.optional(ApplicationStatus),
    PortalOptions: S.optional(PortalOptions),
    Description: S.optional(S.String),
    CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedFrom: S.optional(S.String),
  }),
).annotate({ identifier: "Application" }) as any as S.Schema<Application>;
export type ApplicationList = Application[];
export const ApplicationList = S.Array(Application);
export interface ListApplicationsResponse {
  Applications?: Application[];
  NextToken?: string;
}
export const ListApplicationsResponse = S.suspend(() =>
  S.Struct({
    Applications: S.optional(ApplicationList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListApplicationsResponse",
}) as any as S.Schema<ListApplicationsResponse>;
export interface ListCustomerManagedPolicyReferencesInPermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListCustomerManagedPolicyReferencesInPermissionSetRequest =
  S.suspend(() =>
    S.Struct({
      InstanceArn: S.String,
      PermissionSetArn: S.String,
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "ListCustomerManagedPolicyReferencesInPermissionSetRequest",
  }) as any as S.Schema<ListCustomerManagedPolicyReferencesInPermissionSetRequest>;
export type CustomerManagedPolicyReferenceList =
  CustomerManagedPolicyReference[];
export const CustomerManagedPolicyReferenceList = S.Array(
  CustomerManagedPolicyReference,
);
export interface ListCustomerManagedPolicyReferencesInPermissionSetResponse {
  CustomerManagedPolicyReferences?: CustomerManagedPolicyReference[];
  NextToken?: string;
}
export const ListCustomerManagedPolicyReferencesInPermissionSetResponse =
  S.suspend(() =>
    S.Struct({
      CustomerManagedPolicyReferences: S.optional(
        CustomerManagedPolicyReferenceList,
      ),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListCustomerManagedPolicyReferencesInPermissionSetResponse",
  }) as any as S.Schema<ListCustomerManagedPolicyReferencesInPermissionSetResponse>;
export interface ListInstancesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListInstancesRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListInstancesRequest",
}) as any as S.Schema<ListInstancesRequest>;
export interface InstanceMetadata {
  InstanceArn?: string;
  IdentityStoreId?: string;
  OwnerAccountId?: string;
  Name?: string;
  CreatedDate?: Date;
  Status?: InstanceStatus;
  StatusReason?: string;
}
export const InstanceMetadata = S.suspend(() =>
  S.Struct({
    InstanceArn: S.optional(S.String),
    IdentityStoreId: S.optional(S.String),
    OwnerAccountId: S.optional(S.String),
    Name: S.optional(S.String),
    CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(InstanceStatus),
    StatusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "InstanceMetadata",
}) as any as S.Schema<InstanceMetadata>;
export type InstanceList = InstanceMetadata[];
export const InstanceList = S.Array(InstanceMetadata);
export interface ListInstancesResponse {
  Instances?: InstanceMetadata[];
  NextToken?: string;
}
export const ListInstancesResponse = S.suspend(() =>
  S.Struct({
    Instances: S.optional(InstanceList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListInstancesResponse",
}) as any as S.Schema<ListInstancesResponse>;
export interface ListManagedPoliciesInPermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListManagedPoliciesInPermissionSetRequest = S.suspend(() =>
  S.Struct({
    InstanceArn: S.String,
    PermissionSetArn: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListManagedPoliciesInPermissionSetRequest",
}) as any as S.Schema<ListManagedPoliciesInPermissionSetRequest>;
export interface AttachedManagedPolicy {
  Name?: string;
  Arn?: string;
}
export const AttachedManagedPolicy = S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Arn: S.optional(S.String) }),
).annotate({
  identifier: "AttachedManagedPolicy",
}) as any as S.Schema<AttachedManagedPolicy>;
export type AttachedManagedPolicyList = AttachedManagedPolicy[];
export const AttachedManagedPolicyList = S.Array(AttachedManagedPolicy);
export interface ListManagedPoliciesInPermissionSetResponse {
  AttachedManagedPolicies?: AttachedManagedPolicy[];
  NextToken?: string;
}
export const ListManagedPoliciesInPermissionSetResponse = S.suspend(() =>
  S.Struct({
    AttachedManagedPolicies: S.optional(AttachedManagedPolicyList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListManagedPoliciesInPermissionSetResponse",
}) as any as S.Schema<ListManagedPoliciesInPermissionSetResponse>;
export interface ListPermissionSetProvisioningStatusRequest {
  InstanceArn: string;
  MaxResults?: number;
  NextToken?: string;
  Filter?: OperationStatusFilter;
}
export const ListPermissionSetProvisioningStatusRequest = S.suspend(() =>
  S.Struct({
    InstanceArn: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filter: S.optional(OperationStatusFilter),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListPermissionSetProvisioningStatusRequest",
}) as any as S.Schema<ListPermissionSetProvisioningStatusRequest>;
export interface PermissionSetProvisioningStatusMetadata {
  Status?: StatusValues;
  RequestId?: string;
  CreatedDate?: Date;
}
export const PermissionSetProvisioningStatusMetadata = S.suspend(() =>
  S.Struct({
    Status: S.optional(StatusValues),
    RequestId: S.optional(S.String),
    CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "PermissionSetProvisioningStatusMetadata",
}) as any as S.Schema<PermissionSetProvisioningStatusMetadata>;
export type PermissionSetProvisioningStatusList =
  PermissionSetProvisioningStatusMetadata[];
export const PermissionSetProvisioningStatusList = S.Array(
  PermissionSetProvisioningStatusMetadata,
);
export interface ListPermissionSetProvisioningStatusResponse {
  PermissionSetsProvisioningStatus?: PermissionSetProvisioningStatusMetadata[];
  NextToken?: string;
}
export const ListPermissionSetProvisioningStatusResponse = S.suspend(() =>
  S.Struct({
    PermissionSetsProvisioningStatus: S.optional(
      PermissionSetProvisioningStatusList,
    ),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPermissionSetProvisioningStatusResponse",
}) as any as S.Schema<ListPermissionSetProvisioningStatusResponse>;
export interface ListPermissionSetsRequest {
  InstanceArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListPermissionSetsRequest = S.suspend(() =>
  S.Struct({
    InstanceArn: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListPermissionSetsRequest",
}) as any as S.Schema<ListPermissionSetsRequest>;
export type PermissionSetList = string[];
export const PermissionSetList = S.Array(S.String);
export interface ListPermissionSetsResponse {
  PermissionSets?: string[];
  NextToken?: string;
}
export const ListPermissionSetsResponse = S.suspend(() =>
  S.Struct({
    PermissionSets: S.optional(PermissionSetList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPermissionSetsResponse",
}) as any as S.Schema<ListPermissionSetsResponse>;
export interface ListPermissionSetsProvisionedToAccountRequest {
  InstanceArn: string;
  AccountId: string;
  ProvisioningStatus?: ProvisioningStatus;
  MaxResults?: number;
  NextToken?: string;
}
export const ListPermissionSetsProvisionedToAccountRequest = S.suspend(() =>
  S.Struct({
    InstanceArn: S.String,
    AccountId: S.String,
    ProvisioningStatus: S.optional(ProvisioningStatus),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListPermissionSetsProvisionedToAccountRequest",
}) as any as S.Schema<ListPermissionSetsProvisionedToAccountRequest>;
export interface ListPermissionSetsProvisionedToAccountResponse {
  NextToken?: string;
  PermissionSets?: string[];
}
export const ListPermissionSetsProvisionedToAccountResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    PermissionSets: S.optional(PermissionSetList),
  }),
).annotate({
  identifier: "ListPermissionSetsProvisionedToAccountResponse",
}) as any as S.Schema<ListPermissionSetsProvisionedToAccountResponse>;
export interface ListRegionsRequest {
  InstanceArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListRegionsRequest = S.suspend(() =>
  S.Struct({
    InstanceArn: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListRegionsRequest",
}) as any as S.Schema<ListRegionsRequest>;
export interface RegionMetadata {
  RegionName?: string;
  Status?: RegionStatus;
  AddedDate?: Date;
  IsPrimaryRegion?: boolean;
}
export const RegionMetadata = S.suspend(() =>
  S.Struct({
    RegionName: S.optional(S.String),
    Status: S.optional(RegionStatus),
    AddedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    IsPrimaryRegion: S.optional(S.Boolean),
  }),
).annotate({ identifier: "RegionMetadata" }) as any as S.Schema<RegionMetadata>;
export type RegionMetadataList = RegionMetadata[];
export const RegionMetadataList = S.Array(RegionMetadata);
export interface ListRegionsResponse {
  Regions?: RegionMetadata[];
  NextToken?: string;
}
export const ListRegionsResponse = S.suspend(() =>
  S.Struct({
    Regions: S.optional(RegionMetadataList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRegionsResponse",
}) as any as S.Schema<ListRegionsResponse>;
export interface ListTagsForResourceRequest {
  InstanceArn?: string;
  ResourceArn: string;
  NextToken?: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
  S.Struct({
    InstanceArn: S.optional(S.String),
    ResourceArn: S.String,
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
  NextToken?: string;
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListTrustedTokenIssuersRequest {
  InstanceArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListTrustedTokenIssuersRequest = S.suspend(() =>
  S.Struct({
    InstanceArn: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTrustedTokenIssuersRequest",
}) as any as S.Schema<ListTrustedTokenIssuersRequest>;
export interface TrustedTokenIssuerMetadata {
  TrustedTokenIssuerArn?: string;
  Name?: string;
  TrustedTokenIssuerType?: TrustedTokenIssuerType;
}
export const TrustedTokenIssuerMetadata = S.suspend(() =>
  S.Struct({
    TrustedTokenIssuerArn: S.optional(S.String),
    Name: S.optional(S.String),
    TrustedTokenIssuerType: S.optional(TrustedTokenIssuerType),
  }),
).annotate({
  identifier: "TrustedTokenIssuerMetadata",
}) as any as S.Schema<TrustedTokenIssuerMetadata>;
export type TrustedTokenIssuerList = TrustedTokenIssuerMetadata[];
export const TrustedTokenIssuerList = S.Array(TrustedTokenIssuerMetadata);
export interface ListTrustedTokenIssuersResponse {
  TrustedTokenIssuers?: TrustedTokenIssuerMetadata[];
  NextToken?: string;
}
export const ListTrustedTokenIssuersResponse = S.suspend(() =>
  S.Struct({
    TrustedTokenIssuers: S.optional(TrustedTokenIssuerList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTrustedTokenIssuersResponse",
}) as any as S.Schema<ListTrustedTokenIssuersResponse>;
export type ProvisionTargetType =
  | "AWS_ACCOUNT"
  | "ALL_PROVISIONED_ACCOUNTS"
  | (string & {});
export const ProvisionTargetType = S.String;
export interface ProvisionPermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
  TargetId?: string;
  TargetType: ProvisionTargetType;
}
export const ProvisionPermissionSetRequest = S.suspend(() =>
  S.Struct({
    InstanceArn: S.String,
    PermissionSetArn: S.String,
    TargetId: S.optional(S.String),
    TargetType: ProvisionTargetType,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ProvisionPermissionSetRequest",
}) as any as S.Schema<ProvisionPermissionSetRequest>;
export interface ProvisionPermissionSetResponse {
  PermissionSetProvisioningStatus?: PermissionSetProvisioningStatus;
}
export const ProvisionPermissionSetResponse = S.suspend(() =>
  S.Struct({
    PermissionSetProvisioningStatus: S.optional(
      PermissionSetProvisioningStatus,
    ),
  }),
).annotate({
  identifier: "ProvisionPermissionSetResponse",
}) as any as S.Schema<ProvisionPermissionSetResponse>;
export interface PutApplicationAssignmentConfigurationRequest {
  ApplicationArn: string;
  AssignmentRequired: boolean;
}
export const PutApplicationAssignmentConfigurationRequest = S.suspend(() =>
  S.Struct({ ApplicationArn: S.String, AssignmentRequired: S.Boolean }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutApplicationAssignmentConfigurationRequest",
}) as any as S.Schema<PutApplicationAssignmentConfigurationRequest>;
export interface PutApplicationAssignmentConfigurationResponse {}
export const PutApplicationAssignmentConfigurationResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutApplicationAssignmentConfigurationResponse",
}) as any as S.Schema<PutApplicationAssignmentConfigurationResponse>;
export interface PutApplicationSessionConfigurationRequest {
  ApplicationArn: string;
  UserBackgroundSessionApplicationStatus?: UserBackgroundSessionApplicationStatus;
}
export const PutApplicationSessionConfigurationRequest = S.suspend(() =>
  S.Struct({
    ApplicationArn: S.String,
    UserBackgroundSessionApplicationStatus: S.optional(
      UserBackgroundSessionApplicationStatus,
    ),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutApplicationSessionConfigurationRequest",
}) as any as S.Schema<PutApplicationSessionConfigurationRequest>;
export interface PutApplicationSessionConfigurationResponse {}
export const PutApplicationSessionConfigurationResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutApplicationSessionConfigurationResponse",
}) as any as S.Schema<PutApplicationSessionConfigurationResponse>;
export interface PutInlinePolicyToPermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
  InlinePolicy: string;
}
export const PutInlinePolicyToPermissionSetRequest = S.suspend(() =>
  S.Struct({
    InstanceArn: S.String,
    PermissionSetArn: S.String,
    InlinePolicy: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutInlinePolicyToPermissionSetRequest",
}) as any as S.Schema<PutInlinePolicyToPermissionSetRequest>;
export interface PutInlinePolicyToPermissionSetResponse {}
export const PutInlinePolicyToPermissionSetResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutInlinePolicyToPermissionSetResponse",
}) as any as S.Schema<PutInlinePolicyToPermissionSetResponse>;
export interface PutPermissionsBoundaryToPermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
  PermissionsBoundary: PermissionsBoundary;
}
export const PutPermissionsBoundaryToPermissionSetRequest = S.suspend(() =>
  S.Struct({
    InstanceArn: S.String,
    PermissionSetArn: S.String,
    PermissionsBoundary: PermissionsBoundary,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutPermissionsBoundaryToPermissionSetRequest",
}) as any as S.Schema<PutPermissionsBoundaryToPermissionSetRequest>;
export interface PutPermissionsBoundaryToPermissionSetResponse {}
export const PutPermissionsBoundaryToPermissionSetResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutPermissionsBoundaryToPermissionSetResponse",
}) as any as S.Schema<PutPermissionsBoundaryToPermissionSetResponse>;
export interface RemoveRegionRequest {
  InstanceArn: string;
  RegionName: string;
}
export const RemoveRegionRequest = S.suspend(() =>
  S.Struct({ InstanceArn: S.String, RegionName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RemoveRegionRequest",
}) as any as S.Schema<RemoveRegionRequest>;
export interface RemoveRegionResponse {
  Status?: RegionStatus;
}
export const RemoveRegionResponse = S.suspend(() =>
  S.Struct({ Status: S.optional(RegionStatus) }),
).annotate({
  identifier: "RemoveRegionResponse",
}) as any as S.Schema<RemoveRegionResponse>;
export interface TagResourceRequest {
  InstanceArn?: string;
  ResourceArn: string;
  Tags: Tag[];
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({
    InstanceArn: S.optional(S.String),
    ResourceArn: S.String,
    Tags: TagList,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeyList = string[];
export const TagKeyList = S.Array(S.String);
export interface UntagResourceRequest {
  InstanceArn?: string;
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({
    InstanceArn: S.optional(S.String),
    ResourceArn: S.String,
    TagKeys: TagKeyList,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateApplicationPortalOptions {
  SignInOptions?: SignInOptions;
}
export const UpdateApplicationPortalOptions = S.suspend(() =>
  S.Struct({ SignInOptions: S.optional(SignInOptions) }),
).annotate({
  identifier: "UpdateApplicationPortalOptions",
}) as any as S.Schema<UpdateApplicationPortalOptions>;
export interface UpdateApplicationRequest {
  ApplicationArn: string;
  Name?: string;
  Description?: string;
  Status?: ApplicationStatus;
  PortalOptions?: UpdateApplicationPortalOptions;
}
export const UpdateApplicationRequest = S.suspend(() =>
  S.Struct({
    ApplicationArn: S.String,
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Status: S.optional(ApplicationStatus),
    PortalOptions: S.optional(UpdateApplicationPortalOptions),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateApplicationRequest",
}) as any as S.Schema<UpdateApplicationRequest>;
export interface UpdateApplicationResponse {}
export const UpdateApplicationResponse = S.suspend(() => S.Struct({})).annotate(
  { identifier: "UpdateApplicationResponse" },
) as any as S.Schema<UpdateApplicationResponse>;
export interface EncryptionConfiguration {
  KeyType: KmsKeyType;
  KmsKeyArn?: string;
}
export const EncryptionConfiguration = S.suspend(() =>
  S.Struct({ KeyType: KmsKeyType, KmsKeyArn: S.optional(S.String) }),
).annotate({
  identifier: "EncryptionConfiguration",
}) as any as S.Schema<EncryptionConfiguration>;
export interface UpdateInstanceRequest {
  Name?: string;
  InstanceArn: string;
  EncryptionConfiguration?: EncryptionConfiguration;
}
export const UpdateInstanceRequest = S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    InstanceArn: S.String,
    EncryptionConfiguration: S.optional(EncryptionConfiguration),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateInstanceRequest",
}) as any as S.Schema<UpdateInstanceRequest>;
export interface UpdateInstanceResponse {}
export const UpdateInstanceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UpdateInstanceResponse",
}) as any as S.Schema<UpdateInstanceResponse>;
export interface UpdateInstanceAccessControlAttributeConfigurationRequest {
  InstanceArn: string;
  InstanceAccessControlAttributeConfiguration: InstanceAccessControlAttributeConfiguration;
}
export const UpdateInstanceAccessControlAttributeConfigurationRequest =
  S.suspend(() =>
    S.Struct({
      InstanceArn: S.String,
      InstanceAccessControlAttributeConfiguration:
        InstanceAccessControlAttributeConfiguration,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "UpdateInstanceAccessControlAttributeConfigurationRequest",
  }) as any as S.Schema<UpdateInstanceAccessControlAttributeConfigurationRequest>;
export interface UpdateInstanceAccessControlAttributeConfigurationResponse {}
export const UpdateInstanceAccessControlAttributeConfigurationResponse =
  S.suspend(() => S.Struct({})).annotate({
    identifier: "UpdateInstanceAccessControlAttributeConfigurationResponse",
  }) as any as S.Schema<UpdateInstanceAccessControlAttributeConfigurationResponse>;
export interface UpdatePermissionSetRequest {
  InstanceArn: string;
  PermissionSetArn: string;
  Description?: string;
  SessionDuration?: string;
  RelayState?: string;
}
export const UpdatePermissionSetRequest = S.suspend(() =>
  S.Struct({
    InstanceArn: S.String,
    PermissionSetArn: S.String,
    Description: S.optional(S.String),
    SessionDuration: S.optional(S.String),
    RelayState: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdatePermissionSetRequest",
}) as any as S.Schema<UpdatePermissionSetRequest>;
export interface UpdatePermissionSetResponse {}
export const UpdatePermissionSetResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdatePermissionSetResponse",
}) as any as S.Schema<UpdatePermissionSetResponse>;
export interface OidcJwtUpdateConfiguration {
  ClaimAttributePath?: string;
  IdentityStoreAttributePath?: string;
  JwksRetrievalOption?: JwksRetrievalOption;
}
export const OidcJwtUpdateConfiguration = S.suspend(() =>
  S.Struct({
    ClaimAttributePath: S.optional(S.String),
    IdentityStoreAttributePath: S.optional(S.String),
    JwksRetrievalOption: S.optional(JwksRetrievalOption),
  }),
).annotate({
  identifier: "OidcJwtUpdateConfiguration",
}) as any as S.Schema<OidcJwtUpdateConfiguration>;
export type TrustedTokenIssuerUpdateConfiguration = {
  OidcJwtConfiguration: OidcJwtUpdateConfiguration;
};
export const TrustedTokenIssuerUpdateConfiguration = S.Union([
  S.Struct({ OidcJwtConfiguration: OidcJwtUpdateConfiguration }),
]);
export interface UpdateTrustedTokenIssuerRequest {
  TrustedTokenIssuerArn: string;
  Name?: string;
  TrustedTokenIssuerConfiguration?: TrustedTokenIssuerUpdateConfiguration;
}
export const UpdateTrustedTokenIssuerRequest = S.suspend(() =>
  S.Struct({
    TrustedTokenIssuerArn: S.String,
    Name: S.optional(S.String),
    TrustedTokenIssuerConfiguration: S.optional(
      TrustedTokenIssuerUpdateConfiguration,
    ),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateTrustedTokenIssuerRequest",
}) as any as S.Schema<UpdateTrustedTokenIssuerRequest>;
export interface UpdateTrustedTokenIssuerResponse {}
export const UpdateTrustedTokenIssuerResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateTrustedTokenIssuerResponse",
}) as any as S.Schema<UpdateTrustedTokenIssuerResponse>;
export type ScopeTargets = string[];
export const ScopeTargets = S.Array(S.String);
export interface PutApplicationAccessScopeRequest {
  Scope: string;
  AuthorizedTargets?: string[];
  ApplicationArn: string;
}
export const PutApplicationAccessScopeRequest = S.suspend(() =>
  S.Struct({
    Scope: S.String,
    AuthorizedTargets: S.optional(ScopeTargets),
    ApplicationArn: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutApplicationAccessScopeRequest",
}) as any as S.Schema<PutApplicationAccessScopeRequest>;
export interface PutApplicationAccessScopeResponse {}
export const PutApplicationAccessScopeResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutApplicationAccessScopeResponse",
}) as any as S.Schema<PutApplicationAccessScopeResponse>;
export interface GetApplicationAccessScopeRequest {
  ApplicationArn: string;
  Scope: string;
}
export const GetApplicationAccessScopeRequest = S.suspend(() =>
  S.Struct({ ApplicationArn: S.String, Scope: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetApplicationAccessScopeRequest",
}) as any as S.Schema<GetApplicationAccessScopeRequest>;
export interface GetApplicationAccessScopeResponse {
  Scope: string;
  AuthorizedTargets?: string[];
}
export const GetApplicationAccessScopeResponse = S.suspend(() =>
  S.Struct({ Scope: S.String, AuthorizedTargets: S.optional(ScopeTargets) }),
).annotate({
  identifier: "GetApplicationAccessScopeResponse",
}) as any as S.Schema<GetApplicationAccessScopeResponse>;
export interface DeleteApplicationAccessScopeRequest {
  ApplicationArn: string;
  Scope: string;
}
export const DeleteApplicationAccessScopeRequest = S.suspend(() =>
  S.Struct({ ApplicationArn: S.String, Scope: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteApplicationAccessScopeRequest",
}) as any as S.Schema<DeleteApplicationAccessScopeRequest>;
export interface DeleteApplicationAccessScopeResponse {}
export const DeleteApplicationAccessScopeResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteApplicationAccessScopeResponse",
}) as any as S.Schema<DeleteApplicationAccessScopeResponse>;
export interface ListApplicationAccessScopesRequest {
  ApplicationArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListApplicationAccessScopesRequest = S.suspend(() =>
  S.Struct({
    ApplicationArn: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListApplicationAccessScopesRequest",
}) as any as S.Schema<ListApplicationAccessScopesRequest>;
export interface ScopeDetails {
  Scope: string;
  AuthorizedTargets?: string[];
}
export const ScopeDetails = S.suspend(() =>
  S.Struct({ Scope: S.String, AuthorizedTargets: S.optional(ScopeTargets) }),
).annotate({ identifier: "ScopeDetails" }) as any as S.Schema<ScopeDetails>;
export type Scopes = ScopeDetails[];
export const Scopes = S.Array(ScopeDetails);
export interface ListApplicationAccessScopesResponse {
  Scopes: ScopeDetails[];
  NextToken?: string;
}
export const ListApplicationAccessScopesResponse = S.suspend(() =>
  S.Struct({ Scopes: Scopes, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListApplicationAccessScopesResponse",
}) as any as S.Schema<ListApplicationAccessScopesResponse>;
export type AuthenticationMethodType = "IAM" | (string & {});
export const AuthenticationMethodType = S.String;
export interface IamAuthenticationMethod {
  ActorPolicy: any;
}
export const IamAuthenticationMethod = S.suspend(() =>
  S.Struct({ ActorPolicy: S.Any }),
).annotate({
  identifier: "IamAuthenticationMethod",
}) as any as S.Schema<IamAuthenticationMethod>;
export type AuthenticationMethod = { Iam: IamAuthenticationMethod };
export const AuthenticationMethod = S.Union([
  S.Struct({ Iam: IamAuthenticationMethod }),
]);
export interface PutApplicationAuthenticationMethodRequest {
  ApplicationArn: string;
  AuthenticationMethodType: AuthenticationMethodType;
  AuthenticationMethod: AuthenticationMethod;
}
export const PutApplicationAuthenticationMethodRequest = S.suspend(() =>
  S.Struct({
    ApplicationArn: S.String,
    AuthenticationMethodType: AuthenticationMethodType,
    AuthenticationMethod: AuthenticationMethod,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutApplicationAuthenticationMethodRequest",
}) as any as S.Schema<PutApplicationAuthenticationMethodRequest>;
export interface PutApplicationAuthenticationMethodResponse {}
export const PutApplicationAuthenticationMethodResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutApplicationAuthenticationMethodResponse",
}) as any as S.Schema<PutApplicationAuthenticationMethodResponse>;
export interface GetApplicationAuthenticationMethodRequest {
  ApplicationArn: string;
  AuthenticationMethodType: AuthenticationMethodType;
}
export const GetApplicationAuthenticationMethodRequest = S.suspend(() =>
  S.Struct({
    ApplicationArn: S.String,
    AuthenticationMethodType: AuthenticationMethodType,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetApplicationAuthenticationMethodRequest",
}) as any as S.Schema<GetApplicationAuthenticationMethodRequest>;
export interface GetApplicationAuthenticationMethodResponse {
  AuthenticationMethod?: AuthenticationMethod;
}
export const GetApplicationAuthenticationMethodResponse = S.suspend(() =>
  S.Struct({ AuthenticationMethod: S.optional(AuthenticationMethod) }),
).annotate({
  identifier: "GetApplicationAuthenticationMethodResponse",
}) as any as S.Schema<GetApplicationAuthenticationMethodResponse>;
export interface DeleteApplicationAuthenticationMethodRequest {
  ApplicationArn: string;
  AuthenticationMethodType: AuthenticationMethodType;
}
export const DeleteApplicationAuthenticationMethodRequest = S.suspend(() =>
  S.Struct({
    ApplicationArn: S.String,
    AuthenticationMethodType: AuthenticationMethodType,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteApplicationAuthenticationMethodRequest",
}) as any as S.Schema<DeleteApplicationAuthenticationMethodRequest>;
export interface DeleteApplicationAuthenticationMethodResponse {}
export const DeleteApplicationAuthenticationMethodResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteApplicationAuthenticationMethodResponse",
}) as any as S.Schema<DeleteApplicationAuthenticationMethodResponse>;
export interface ListApplicationAuthenticationMethodsRequest {
  ApplicationArn: string;
  NextToken?: string;
}
export const ListApplicationAuthenticationMethodsRequest = S.suspend(() =>
  S.Struct({ ApplicationArn: S.String, NextToken: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListApplicationAuthenticationMethodsRequest",
}) as any as S.Schema<ListApplicationAuthenticationMethodsRequest>;
export interface AuthenticationMethodItem {
  AuthenticationMethodType?: AuthenticationMethodType;
  AuthenticationMethod?: AuthenticationMethod;
}
export const AuthenticationMethodItem = S.suspend(() =>
  S.Struct({
    AuthenticationMethodType: S.optional(AuthenticationMethodType),
    AuthenticationMethod: S.optional(AuthenticationMethod),
  }),
).annotate({
  identifier: "AuthenticationMethodItem",
}) as any as S.Schema<AuthenticationMethodItem>;
export type AuthenticationMethods = AuthenticationMethodItem[];
export const AuthenticationMethods = S.Array(AuthenticationMethodItem);
export interface ListApplicationAuthenticationMethodsResponse {
  AuthenticationMethods?: AuthenticationMethodItem[];
  NextToken?: string;
}
export const ListApplicationAuthenticationMethodsResponse = S.suspend(() =>
  S.Struct({
    AuthenticationMethods: S.optional(AuthenticationMethods),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListApplicationAuthenticationMethodsResponse",
}) as any as S.Schema<ListApplicationAuthenticationMethodsResponse>;
export type GrantType =
  | "authorization_code"
  | "refresh_token"
  | "urn:ietf:params:oauth:grant-type:jwt-bearer"
  | "urn:ietf:params:oauth:grant-type:token-exchange"
  | (string & {});
export const GrantType = S.String;
export type RedirectUris = string[];
export const RedirectUris = S.Array(S.String);
export interface AuthorizationCodeGrant {
  RedirectUris?: string[];
}
export const AuthorizationCodeGrant = S.suspend(() =>
  S.Struct({ RedirectUris: S.optional(RedirectUris) }),
).annotate({
  identifier: "AuthorizationCodeGrant",
}) as any as S.Schema<AuthorizationCodeGrant>;
export type TokenIssuerAudiences = string[];
export const TokenIssuerAudiences = S.Array(S.String);
export interface AuthorizedTokenIssuer {
  TrustedTokenIssuerArn?: string;
  AuthorizedAudiences?: string[];
}
export const AuthorizedTokenIssuer = S.suspend(() =>
  S.Struct({
    TrustedTokenIssuerArn: S.optional(S.String),
    AuthorizedAudiences: S.optional(TokenIssuerAudiences),
  }),
).annotate({
  identifier: "AuthorizedTokenIssuer",
}) as any as S.Schema<AuthorizedTokenIssuer>;
export type AuthorizedTokenIssuers = AuthorizedTokenIssuer[];
export const AuthorizedTokenIssuers = S.Array(AuthorizedTokenIssuer);
export interface JwtBearerGrant {
  AuthorizedTokenIssuers?: AuthorizedTokenIssuer[];
}
export const JwtBearerGrant = S.suspend(() =>
  S.Struct({ AuthorizedTokenIssuers: S.optional(AuthorizedTokenIssuers) }),
).annotate({ identifier: "JwtBearerGrant" }) as any as S.Schema<JwtBearerGrant>;
export interface RefreshTokenGrant {}
export const RefreshTokenGrant = S.suspend(() => S.Struct({})).annotate({
  identifier: "RefreshTokenGrant",
}) as any as S.Schema<RefreshTokenGrant>;
export interface TokenExchangeGrant {}
export const TokenExchangeGrant = S.suspend(() => S.Struct({})).annotate({
  identifier: "TokenExchangeGrant",
}) as any as S.Schema<TokenExchangeGrant>;
export type Grant =
  | {
      AuthorizationCode: AuthorizationCodeGrant;
      JwtBearer?: never;
      RefreshToken?: never;
      TokenExchange?: never;
    }
  | {
      AuthorizationCode?: never;
      JwtBearer: JwtBearerGrant;
      RefreshToken?: never;
      TokenExchange?: never;
    }
  | {
      AuthorizationCode?: never;
      JwtBearer?: never;
      RefreshToken: RefreshTokenGrant;
      TokenExchange?: never;
    }
  | {
      AuthorizationCode?: never;
      JwtBearer?: never;
      RefreshToken?: never;
      TokenExchange: TokenExchangeGrant;
    };
export const Grant = S.Union([
  S.Struct({ AuthorizationCode: AuthorizationCodeGrant }),
  S.Struct({ JwtBearer: JwtBearerGrant }),
  S.Struct({ RefreshToken: RefreshTokenGrant }),
  S.Struct({ TokenExchange: TokenExchangeGrant }),
]);
export interface PutApplicationGrantRequest {
  ApplicationArn: string;
  GrantType: GrantType;
  Grant: Grant;
}
export const PutApplicationGrantRequest = S.suspend(() =>
  S.Struct({
    ApplicationArn: S.String,
    GrantType: GrantType,
    Grant: Grant,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutApplicationGrantRequest",
}) as any as S.Schema<PutApplicationGrantRequest>;
export interface PutApplicationGrantResponse {}
export const PutApplicationGrantResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutApplicationGrantResponse",
}) as any as S.Schema<PutApplicationGrantResponse>;
export interface GetApplicationGrantRequest {
  ApplicationArn: string;
  GrantType: GrantType;
}
export const GetApplicationGrantRequest = S.suspend(() =>
  S.Struct({ ApplicationArn: S.String, GrantType: GrantType }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetApplicationGrantRequest",
}) as any as S.Schema<GetApplicationGrantRequest>;
export interface GetApplicationGrantResponse {
  Grant: Grant;
}
export const GetApplicationGrantResponse = S.suspend(() =>
  S.Struct({ Grant: Grant }),
).annotate({
  identifier: "GetApplicationGrantResponse",
}) as any as S.Schema<GetApplicationGrantResponse>;
export interface DeleteApplicationGrantRequest {
  ApplicationArn: string;
  GrantType: GrantType;
}
export const DeleteApplicationGrantRequest = S.suspend(() =>
  S.Struct({ ApplicationArn: S.String, GrantType: GrantType }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteApplicationGrantRequest",
}) as any as S.Schema<DeleteApplicationGrantRequest>;
export interface DeleteApplicationGrantResponse {}
export const DeleteApplicationGrantResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteApplicationGrantResponse",
}) as any as S.Schema<DeleteApplicationGrantResponse>;
export interface ListApplicationGrantsRequest {
  ApplicationArn: string;
  NextToken?: string;
}
export const ListApplicationGrantsRequest = S.suspend(() =>
  S.Struct({ ApplicationArn: S.String, NextToken: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListApplicationGrantsRequest",
}) as any as S.Schema<ListApplicationGrantsRequest>;
export interface GrantItem {
  GrantType: GrantType;
  Grant: Grant;
}
export const GrantItem = S.suspend(() =>
  S.Struct({ GrantType: GrantType, Grant: Grant }),
).annotate({ identifier: "GrantItem" }) as any as S.Schema<GrantItem>;
export type Grants = GrantItem[];
export const Grants = S.Array(GrantItem);
export interface ListApplicationGrantsResponse {
  Grants: GrantItem[];
  NextToken?: string;
}
export const ListApplicationGrantsResponse = S.suspend(() =>
  S.Struct({ Grants: Grants, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListApplicationGrantsResponse",
}) as any as S.Schema<ListApplicationGrantsResponse>;

//# Errors
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  {
    Message: S.optional(S.String),
    Reason: S.optional(AccessDeniedExceptionReason),
  },
).pipe(C.withAuthError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  { Message: S.optional(S.String) },
).pipe(C.withConflictError) {}
export class InternalServerException extends S.TaggedErrorClass<InternalServerException>()(
  "InternalServerException",
  { Message: S.optional(S.String) },
).pipe(C.withServerError) {}
export class ServiceQuotaExceededException extends S.TaggedErrorClass<ServiceQuotaExceededException>()(
  "ServiceQuotaExceededException",
  { Message: S.optional(S.String) },
).pipe(C.withQuotaError) {}
export class ThrottlingException extends S.TaggedErrorClass<ThrottlingException>()(
  "ThrottlingException",
  {
    Message: S.optional(S.String),
    Reason: S.optional(ThrottlingExceptionReason),
  },
).pipe(C.withThrottlingError) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  {
    Message: S.optional(S.String),
    Reason: S.optional(ValidationExceptionReason),
  },
).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  {
    Message: S.optional(S.String),
    Reason: S.optional(ResourceNotFoundExceptionReason),
  },
).pipe(C.withBadRequestError) {}

//# Operations
export type AddRegionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a Region to an IAM Identity Center instance. This operation initiates an asynchronous workflow to replicate the IAM Identity Center instance to the target Region. The Region status is set to ADDING at first and changes to ACTIVE when the workflow completes.
 *
 * To use this operation, your IAM Identity Center instance and the target Region must meet the requirements described in the IAM Identity Center User Guide.
 *
 * The following actions are related to `AddRegion`:
 *
 * - RemoveRegion
 *
 * - DescribeRegion
 *
 * - ListRegions
 */
export const addRegion: API.OperationMethod<
  AddRegionRequest,
  AddRegionResponse,
  AddRegionError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AddRegionRequest,
  output: AddRegionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type AttachCustomerManagedPolicyReferenceToPermissionSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Attaches the specified customer managed policy to the specified PermissionSet.
 */
export const attachCustomerManagedPolicyReferenceToPermissionSet: API.OperationMethod<
  AttachCustomerManagedPolicyReferenceToPermissionSetRequest,
  AttachCustomerManagedPolicyReferenceToPermissionSetResponse,
  AttachCustomerManagedPolicyReferenceToPermissionSetError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AttachCustomerManagedPolicyReferenceToPermissionSetRequest,
  output: AttachCustomerManagedPolicyReferenceToPermissionSetResponse,
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
export type AttachManagedPolicyToPermissionSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Attaches an Amazon Web Services managed policy ARN to a permission set.
 *
 * If the permission set is already referenced by one or more account assignments, you will need to call ` ProvisionPermissionSet ` after this operation. Calling `ProvisionPermissionSet` applies the corresponding IAM policy updates to all assigned accounts.
 */
export const attachManagedPolicyToPermissionSet: API.OperationMethod<
  AttachManagedPolicyToPermissionSetRequest,
  AttachManagedPolicyToPermissionSetResponse,
  AttachManagedPolicyToPermissionSetError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AttachManagedPolicyToPermissionSetRequest,
  output: AttachManagedPolicyToPermissionSetResponse,
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
export type CreateAccountAssignmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Assigns access to a principal for a specified Amazon Web Services account using a specified permission set.
 *
 * The term *principal* here refers to a user or group that is defined in IAM Identity Center.
 *
 * As part of a successful `CreateAccountAssignment` call, the specified permission set will automatically be provisioned to the account in the form of an IAM policy. That policy is attached to the IAM role created in IAM Identity Center. If the permission set is subsequently updated, the corresponding IAM policies attached to roles in your accounts will not be updated automatically. In this case, you must call ` ProvisionPermissionSet ` to make these updates.
 *
 * After a successful response, call `DescribeAccountAssignmentCreationStatus` to describe the status of an assignment creation request.
 */
export const createAccountAssignment: API.OperationMethod<
  CreateAccountAssignmentRequest,
  CreateAccountAssignmentResponse,
  CreateAccountAssignmentError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAccountAssignmentRequest,
  output: CreateAccountAssignmentResponse,
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
export type CreateApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an OAuth 2.0 customer managed application in IAM Identity Center for the given application provider.
 *
 * This API does not support creating SAML 2.0 customer managed applications or Amazon Web Services managed applications. To learn how to create an Amazon Web Services managed application, see the application user guide. You can create a SAML 2.0 customer managed application in the Amazon Web Services Management Console only. See Setting up customer managed SAML 2.0 applications. For more information on these application types, see Amazon Web Services managed applications.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  CreateApplicationResponse,
  CreateApplicationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateApplicationRequest,
  output: CreateApplicationResponse,
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
export type CreateApplicationAssignmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Grant application access to a user or group.
 */
export const createApplicationAssignment: API.OperationMethod<
  CreateApplicationAssignmentRequest,
  CreateApplicationAssignmentResponse,
  CreateApplicationAssignmentError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateApplicationAssignmentRequest,
  output: CreateApplicationAssignmentResponse,
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
export type CreateInstanceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an instance of IAM Identity Center for a standalone Amazon Web Services account that is not managed by Organizations or a member Amazon Web Services account in an organization. You can create only one instance per account and across all Amazon Web Services Regions.
 *
 * The CreateInstance request is rejected if the following apply:
 *
 * - The instance is created within the organization management account.
 *
 * - An instance already exists in the same account.
 */
export const createInstance: API.OperationMethod<
  CreateInstanceRequest,
  CreateInstanceResponse,
  CreateInstanceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateInstanceRequest,
  output: CreateInstanceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type CreateInstanceAccessControlAttributeConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables the attributes-based access control (ABAC) feature for the specified IAM Identity Center instance. You can also specify new attributes to add to your ABAC configuration during the enabling process. For more information about ABAC, see Attribute-Based Access Control in the *IAM Identity Center User Guide*.
 *
 * After a successful response, call `DescribeInstanceAccessControlAttributeConfiguration` to validate that `InstanceAccessControlAttributeConfiguration` was created.
 */
export const createInstanceAccessControlAttributeConfiguration: API.OperationMethod<
  CreateInstanceAccessControlAttributeConfigurationRequest,
  CreateInstanceAccessControlAttributeConfigurationResponse,
  CreateInstanceAccessControlAttributeConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateInstanceAccessControlAttributeConfigurationRequest,
  output: CreateInstanceAccessControlAttributeConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type CreatePermissionSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a permission set within a specified IAM Identity Center instance.
 *
 * To grant users and groups access to Amazon Web Services account resources, use ` CreateAccountAssignment `.
 */
export const createPermissionSet: API.OperationMethod<
  CreatePermissionSetRequest,
  CreatePermissionSetResponse,
  CreatePermissionSetError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreatePermissionSetRequest,
  output: CreatePermissionSetResponse,
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
export type CreateTrustedTokenIssuerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a connection to a trusted token issuer in an instance of IAM Identity Center. A trusted token issuer enables trusted identity propagation to be used with applications that authenticate outside of Amazon Web Services.
 *
 * This trusted token issuer describes an external identity provider (IdP) that can generate claims or assertions in the form of access tokens for a user. Applications enabled for IAM Identity Center can use these tokens for authentication.
 */
export const createTrustedTokenIssuer: API.OperationMethod<
  CreateTrustedTokenIssuerRequest,
  CreateTrustedTokenIssuerResponse,
  CreateTrustedTokenIssuerError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateTrustedTokenIssuerRequest,
  output: CreateTrustedTokenIssuerResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DeleteAccountAssignmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a principal's access from a specified Amazon Web Services account using a specified permission set.
 *
 * After a successful response, call `DescribeAccountAssignmentDeletionStatus` to describe the status of an assignment deletion request.
 */
export const deleteAccountAssignment: API.OperationMethod<
  DeleteAccountAssignmentRequest,
  DeleteAccountAssignmentResponse,
  DeleteAccountAssignmentError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAccountAssignmentRequest,
  output: DeleteAccountAssignmentResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DeleteApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the association with the application. The connected service resource still exists.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationRequest,
  DeleteApplicationResponse,
  DeleteApplicationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteApplicationRequest,
  output: DeleteApplicationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DeleteApplicationAssignmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Revoke application access to an application by deleting application assignments for a user or group.
 */
export const deleteApplicationAssignment: API.OperationMethod<
  DeleteApplicationAssignmentRequest,
  DeleteApplicationAssignmentResponse,
  DeleteApplicationAssignmentError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteApplicationAssignmentRequest,
  output: DeleteApplicationAssignmentResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DeleteInlinePolicyFromPermissionSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the inline policy from a specified permission set.
 */
export const deleteInlinePolicyFromPermissionSet: API.OperationMethod<
  DeleteInlinePolicyFromPermissionSetRequest,
  DeleteInlinePolicyFromPermissionSetResponse,
  DeleteInlinePolicyFromPermissionSetError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteInlinePolicyFromPermissionSetRequest,
  output: DeleteInlinePolicyFromPermissionSetResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DeleteInstanceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the instance of IAM Identity Center. Only the account that owns the instance can call this API. Neither the delegated administrator nor member account can delete the organization instance, but those roles can delete their own instance.
 */
export const deleteInstance: API.OperationMethod<
  DeleteInstanceRequest,
  DeleteInstanceResponse,
  DeleteInstanceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteInstanceRequest,
  output: DeleteInstanceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DeleteInstanceAccessControlAttributeConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disables the attributes-based access control (ABAC) feature for the specified IAM Identity Center instance and deletes all of the attribute mappings that have been configured. Once deleted, any attributes that are received from an identity source and any custom attributes you have previously configured will not be passed. For more information about ABAC, see Attribute-Based Access Control in the *IAM Identity Center User Guide*.
 */
export const deleteInstanceAccessControlAttributeConfiguration: API.OperationMethod<
  DeleteInstanceAccessControlAttributeConfigurationRequest,
  DeleteInstanceAccessControlAttributeConfigurationResponse,
  DeleteInstanceAccessControlAttributeConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteInstanceAccessControlAttributeConfigurationRequest,
  output: DeleteInstanceAccessControlAttributeConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DeletePermissionsBoundaryFromPermissionSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the permissions boundary from a specified PermissionSet.
 */
export const deletePermissionsBoundaryFromPermissionSet: API.OperationMethod<
  DeletePermissionsBoundaryFromPermissionSetRequest,
  DeletePermissionsBoundaryFromPermissionSetResponse,
  DeletePermissionsBoundaryFromPermissionSetError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeletePermissionsBoundaryFromPermissionSetRequest,
  output: DeletePermissionsBoundaryFromPermissionSetResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DeletePermissionSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified permission set.
 */
export const deletePermissionSet: API.OperationMethod<
  DeletePermissionSetRequest,
  DeletePermissionSetResponse,
  DeletePermissionSetError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeletePermissionSetRequest,
  output: DeletePermissionSetResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DeleteTrustedTokenIssuerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a trusted token issuer configuration from an instance of IAM Identity Center.
 *
 * Deleting this trusted token issuer configuration will cause users to lose access to any applications that are configured to use the trusted token issuer.
 */
export const deleteTrustedTokenIssuer: API.OperationMethod<
  DeleteTrustedTokenIssuerRequest,
  DeleteTrustedTokenIssuerResponse,
  DeleteTrustedTokenIssuerError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteTrustedTokenIssuerRequest,
  output: DeleteTrustedTokenIssuerResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DescribeAccountAssignmentCreationStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the status of the assignment creation request.
 */
export const describeAccountAssignmentCreationStatus: API.OperationMethod<
  DescribeAccountAssignmentCreationStatusRequest,
  DescribeAccountAssignmentCreationStatusResponse,
  DescribeAccountAssignmentCreationStatusError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeAccountAssignmentCreationStatusRequest,
  output: DescribeAccountAssignmentCreationStatusResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DescribeAccountAssignmentDeletionStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the status of the assignment deletion request.
 */
export const describeAccountAssignmentDeletionStatus: API.OperationMethod<
  DescribeAccountAssignmentDeletionStatusRequest,
  DescribeAccountAssignmentDeletionStatusResponse,
  DescribeAccountAssignmentDeletionStatusError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeAccountAssignmentDeletionStatusRequest,
  output: DescribeAccountAssignmentDeletionStatusResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DescribeApplicationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of an application associated with an instance of IAM Identity Center.
 */
export const describeApplication: API.OperationMethod<
  DescribeApplicationRequest,
  DescribeApplicationResponse,
  DescribeApplicationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeApplicationRequest,
  output: DescribeApplicationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DescribeApplicationAssignmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a direct assignment of a user or group to an application. If the user doesn’t have a direct assignment to the application, the user may still have access to the application through a group. Therefore, don’t use this API to test access to an application for a user. Instead use ListApplicationAssignmentsForPrincipal.
 */
export const describeApplicationAssignment: API.OperationMethod<
  DescribeApplicationAssignmentRequest,
  DescribeApplicationAssignmentResponse,
  DescribeApplicationAssignmentError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeApplicationAssignmentRequest,
  output: DescribeApplicationAssignmentResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DescribeApplicationProviderError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about a provider that can be used to connect an Amazon Web Services managed application or customer managed application to IAM Identity Center.
 */
export const describeApplicationProvider: API.OperationMethod<
  DescribeApplicationProviderRequest,
  DescribeApplicationProviderResponse,
  DescribeApplicationProviderError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeApplicationProviderRequest,
  output: DescribeApplicationProviderResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DescribeInstanceError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the details of an instance of IAM Identity Center. The status can be one of the following:
 *
 * - `CREATE_IN_PROGRESS` - The instance is in the process of being created. When the instance is ready for use, DescribeInstance returns the status of `ACTIVE`. While the instance is in the `CREATE_IN_PROGRESS` state, you can call only DescribeInstance and DeleteInstance operations.
 *
 * - `DELETE_IN_PROGRESS` - The instance is being deleted. Returns `AccessDeniedException` after the delete operation completes.
 *
 * - `ACTIVE` - The instance is active.
 */
export const describeInstance: API.OperationMethod<
  DescribeInstanceRequest,
  DescribeInstanceResponse,
  DescribeInstanceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeInstanceRequest,
  output: DescribeInstanceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DescribeInstanceAccessControlAttributeConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the list of IAM Identity Center identity store attributes that have been configured to work with attributes-based access control (ABAC) for the specified IAM Identity Center instance. This will not return attributes configured and sent by an external identity provider. For more information about ABAC, see Attribute-Based Access Control in the *IAM Identity Center User Guide*.
 */
export const describeInstanceAccessControlAttributeConfiguration: API.OperationMethod<
  DescribeInstanceAccessControlAttributeConfigurationRequest,
  DescribeInstanceAccessControlAttributeConfigurationResponse,
  DescribeInstanceAccessControlAttributeConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeInstanceAccessControlAttributeConfigurationRequest,
  output: DescribeInstanceAccessControlAttributeConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DescribePermissionSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of the permission set.
 */
export const describePermissionSet: API.OperationMethod<
  DescribePermissionSetRequest,
  DescribePermissionSetResponse,
  DescribePermissionSetError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribePermissionSetRequest,
  output: DescribePermissionSetResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DescribePermissionSetProvisioningStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the status for the given permission set provisioning request.
 */
export const describePermissionSetProvisioningStatus: API.OperationMethod<
  DescribePermissionSetProvisioningStatusRequest,
  DescribePermissionSetProvisioningStatusResponse,
  DescribePermissionSetProvisioningStatusError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribePermissionSetProvisioningStatusRequest,
  output: DescribePermissionSetProvisioningStatusResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DescribeRegionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about a specific Region enabled in an IAM Identity Center instance. Details include the Region name, current status (ACTIVE, ADDING, or REMOVING), the date when the Region was added, and whether it is the primary Region. The request must be made from one of the enabled Regions of the IAM Identity Center instance.
 *
 * The following actions are related to `DescribeRegion`:
 *
 * - AddRegion
 *
 * - RemoveRegion
 *
 * - ListRegions
 */
export const describeRegion: API.OperationMethod<
  DescribeRegionRequest,
  DescribeRegionResponse,
  DescribeRegionError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeRegionRequest,
  output: DescribeRegionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DescribeTrustedTokenIssuerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about a trusted token issuer configuration stored in an instance of IAM Identity Center. Details include the name of the trusted token issuer, the issuer URL, and the path of the source attribute and the destination attribute for a trusted token issuer configuration.
 */
export const describeTrustedTokenIssuer: API.OperationMethod<
  DescribeTrustedTokenIssuerRequest,
  DescribeTrustedTokenIssuerResponse,
  DescribeTrustedTokenIssuerError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeTrustedTokenIssuerRequest,
  output: DescribeTrustedTokenIssuerResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DetachCustomerManagedPolicyReferenceFromPermissionSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Detaches the specified customer managed policy from the specified PermissionSet.
 */
export const detachCustomerManagedPolicyReferenceFromPermissionSet: API.OperationMethod<
  DetachCustomerManagedPolicyReferenceFromPermissionSetRequest,
  DetachCustomerManagedPolicyReferenceFromPermissionSetResponse,
  DetachCustomerManagedPolicyReferenceFromPermissionSetError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DetachCustomerManagedPolicyReferenceFromPermissionSetRequest,
  output: DetachCustomerManagedPolicyReferenceFromPermissionSetResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DetachManagedPolicyFromPermissionSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Detaches the attached Amazon Web Services managed policy ARN from the specified permission set.
 */
export const detachManagedPolicyFromPermissionSet: API.OperationMethod<
  DetachManagedPolicyFromPermissionSetRequest,
  DetachManagedPolicyFromPermissionSetResponse,
  DetachManagedPolicyFromPermissionSetError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DetachManagedPolicyFromPermissionSetRequest,
  output: DetachManagedPolicyFromPermissionSetResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type GetApplicationAssignmentConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the configuration of PutApplicationAssignmentConfiguration.
 */
export const getApplicationAssignmentConfiguration: API.OperationMethod<
  GetApplicationAssignmentConfigurationRequest,
  GetApplicationAssignmentConfigurationResponse,
  GetApplicationAssignmentConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetApplicationAssignmentConfigurationRequest,
  output: GetApplicationAssignmentConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type GetApplicationSessionConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the session configuration for an application in IAM Identity Center.
 *
 * The session configuration determines how users can access an application. This includes whether user background sessions are enabled. User background sessions allow users to start a job on a supported Amazon Web Services managed application without having to remain signed in to an active session while the job runs.
 */
export const getApplicationSessionConfiguration: API.OperationMethod<
  GetApplicationSessionConfigurationRequest,
  GetApplicationSessionConfigurationResponse,
  GetApplicationSessionConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetApplicationSessionConfigurationRequest,
  output: GetApplicationSessionConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type GetInlinePolicyForPermissionSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Obtains the inline policy assigned to the permission set.
 */
export const getInlinePolicyForPermissionSet: API.OperationMethod<
  GetInlinePolicyForPermissionSetRequest,
  GetInlinePolicyForPermissionSetResponse,
  GetInlinePolicyForPermissionSetError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetInlinePolicyForPermissionSetRequest,
  output: GetInlinePolicyForPermissionSetResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type GetPermissionsBoundaryForPermissionSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Obtains the permissions boundary for a specified PermissionSet.
 */
export const getPermissionsBoundaryForPermissionSet: API.OperationMethod<
  GetPermissionsBoundaryForPermissionSetRequest,
  GetPermissionsBoundaryForPermissionSetResponse,
  GetPermissionsBoundaryForPermissionSetError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPermissionsBoundaryForPermissionSetRequest,
  output: GetPermissionsBoundaryForPermissionSetResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type ListAccountAssignmentCreationStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the status of the Amazon Web Services account assignment creation requests for a specified IAM Identity Center instance.
 */
export const listAccountAssignmentCreationStatus: API.OperationMethod<
  ListAccountAssignmentCreationStatusRequest,
  ListAccountAssignmentCreationStatusResponse,
  ListAccountAssignmentCreationStatusError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListAccountAssignmentCreationStatusRequest,
  ) => stream.Stream<
    ListAccountAssignmentCreationStatusResponse,
    ListAccountAssignmentCreationStatusError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListAccountAssignmentCreationStatusRequest,
  ) => stream.Stream<
    AccountAssignmentOperationStatusMetadata,
    ListAccountAssignmentCreationStatusError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAccountAssignmentCreationStatusRequest,
  output: ListAccountAssignmentCreationStatusResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AccountAssignmentsCreationStatus",
    pageSize: "MaxResults",
  } as const,
}));
export type ListAccountAssignmentDeletionStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the status of the Amazon Web Services account assignment deletion requests for a specified IAM Identity Center instance.
 */
export const listAccountAssignmentDeletionStatus: API.OperationMethod<
  ListAccountAssignmentDeletionStatusRequest,
  ListAccountAssignmentDeletionStatusResponse,
  ListAccountAssignmentDeletionStatusError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListAccountAssignmentDeletionStatusRequest,
  ) => stream.Stream<
    ListAccountAssignmentDeletionStatusResponse,
    ListAccountAssignmentDeletionStatusError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListAccountAssignmentDeletionStatusRequest,
  ) => stream.Stream<
    AccountAssignmentOperationStatusMetadata,
    ListAccountAssignmentDeletionStatusError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAccountAssignmentDeletionStatusRequest,
  output: ListAccountAssignmentDeletionStatusResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AccountAssignmentsDeletionStatus",
    pageSize: "MaxResults",
  } as const,
}));
export type ListAccountAssignmentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the assignee of the specified Amazon Web Services account with the specified permission set.
 */
export const listAccountAssignments: API.OperationMethod<
  ListAccountAssignmentsRequest,
  ListAccountAssignmentsResponse,
  ListAccountAssignmentsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListAccountAssignmentsRequest,
  ) => stream.Stream<
    ListAccountAssignmentsResponse,
    ListAccountAssignmentsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListAccountAssignmentsRequest,
  ) => stream.Stream<
    AccountAssignment,
    ListAccountAssignmentsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAccountAssignmentsRequest,
  output: ListAccountAssignmentsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AccountAssignments",
    pageSize: "MaxResults",
  } as const,
}));
export type ListAccountAssignmentsForPrincipalError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of the IAM Identity Center associated Amazon Web Services accounts that the principal has access to. This action must be called from the management account containing your organization instance of IAM Identity Center. This action is not valid for account instances of IAM Identity Center.
 */
export const listAccountAssignmentsForPrincipal: API.OperationMethod<
  ListAccountAssignmentsForPrincipalRequest,
  ListAccountAssignmentsForPrincipalResponse,
  ListAccountAssignmentsForPrincipalError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListAccountAssignmentsForPrincipalRequest,
  ) => stream.Stream<
    ListAccountAssignmentsForPrincipalResponse,
    ListAccountAssignmentsForPrincipalError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListAccountAssignmentsForPrincipalRequest,
  ) => stream.Stream<
    AccountAssignmentForPrincipal,
    ListAccountAssignmentsForPrincipalError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAccountAssignmentsForPrincipalRequest,
  output: ListAccountAssignmentsForPrincipalResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AccountAssignments",
    pageSize: "MaxResults",
  } as const,
}));
export type ListAccountsForProvisionedPermissionSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the Amazon Web Services accounts where the specified permission set is provisioned.
 */
export const listAccountsForProvisionedPermissionSet: API.OperationMethod<
  ListAccountsForProvisionedPermissionSetRequest,
  ListAccountsForProvisionedPermissionSetResponse,
  ListAccountsForProvisionedPermissionSetError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListAccountsForProvisionedPermissionSetRequest,
  ) => stream.Stream<
    ListAccountsForProvisionedPermissionSetResponse,
    ListAccountsForProvisionedPermissionSetError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListAccountsForProvisionedPermissionSetRequest,
  ) => stream.Stream<
    AccountId,
    ListAccountsForProvisionedPermissionSetError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAccountsForProvisionedPermissionSetRequest,
  output: ListAccountsForProvisionedPermissionSetResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AccountIds",
    pageSize: "MaxResults",
  } as const,
}));
export type ListApplicationAssignmentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists Amazon Web Services account users that are assigned to an application.
 */
export const listApplicationAssignments: API.OperationMethod<
  ListApplicationAssignmentsRequest,
  ListApplicationAssignmentsResponse,
  ListApplicationAssignmentsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListApplicationAssignmentsRequest,
  ) => stream.Stream<
    ListApplicationAssignmentsResponse,
    ListApplicationAssignmentsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListApplicationAssignmentsRequest,
  ) => stream.Stream<
    ApplicationAssignment,
    ListApplicationAssignmentsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationAssignmentsRequest,
  output: ListApplicationAssignmentsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ApplicationAssignments",
    pageSize: "MaxResults",
  } as const,
}));
export type ListApplicationAssignmentsForPrincipalError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the applications to which a specified principal is assigned. You must provide a filter when calling this action from a member account against your organization instance of IAM Identity Center. A filter is not required when called from the management account against an organization instance of IAM Identity Center, or from a member account against an account instance of IAM Identity Center in the same account.
 */
export const listApplicationAssignmentsForPrincipal: API.OperationMethod<
  ListApplicationAssignmentsForPrincipalRequest,
  ListApplicationAssignmentsForPrincipalResponse,
  ListApplicationAssignmentsForPrincipalError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListApplicationAssignmentsForPrincipalRequest,
  ) => stream.Stream<
    ListApplicationAssignmentsForPrincipalResponse,
    ListApplicationAssignmentsForPrincipalError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListApplicationAssignmentsForPrincipalRequest,
  ) => stream.Stream<
    ApplicationAssignmentForPrincipal,
    ListApplicationAssignmentsForPrincipalError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationAssignmentsForPrincipalRequest,
  output: ListApplicationAssignmentsForPrincipalResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ApplicationAssignments",
    pageSize: "MaxResults",
  } as const,
}));
export type ListApplicationProvidersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the application providers configured in the IAM Identity Center identity store.
 */
export const listApplicationProviders: API.OperationMethod<
  ListApplicationProvidersRequest,
  ListApplicationProvidersResponse,
  ListApplicationProvidersError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListApplicationProvidersRequest,
  ) => stream.Stream<
    ListApplicationProvidersResponse,
    ListApplicationProvidersError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListApplicationProvidersRequest,
  ) => stream.Stream<
    ApplicationProvider,
    ListApplicationProvidersError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationProvidersRequest,
  output: ListApplicationProvidersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ApplicationProviders",
    pageSize: "MaxResults",
  } as const,
}));
export type ListApplicationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all applications associated with the instance of IAM Identity Center. When listing applications for an organization instance in the management account, member accounts must use the `applicationAccount` parameter to filter the list to only applications created from that account. When listing applications for an account instance in the same member account, a filter is not required.
 */
export const listApplications: API.OperationMethod<
  ListApplicationsRequest,
  ListApplicationsResponse,
  ListApplicationsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListApplicationsRequest,
  ) => stream.Stream<
    ListApplicationsResponse,
    ListApplicationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListApplicationsRequest,
  ) => stream.Stream<
    Application,
    ListApplicationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationsRequest,
  output: ListApplicationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Applications",
    pageSize: "MaxResults",
  } as const,
}));
export type ListCustomerManagedPolicyReferencesInPermissionSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all customer managed policies attached to a specified PermissionSet.
 */
export const listCustomerManagedPolicyReferencesInPermissionSet: API.OperationMethod<
  ListCustomerManagedPolicyReferencesInPermissionSetRequest,
  ListCustomerManagedPolicyReferencesInPermissionSetResponse,
  ListCustomerManagedPolicyReferencesInPermissionSetError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListCustomerManagedPolicyReferencesInPermissionSetRequest,
  ) => stream.Stream<
    ListCustomerManagedPolicyReferencesInPermissionSetResponse,
    ListCustomerManagedPolicyReferencesInPermissionSetError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListCustomerManagedPolicyReferencesInPermissionSetRequest,
  ) => stream.Stream<
    CustomerManagedPolicyReference,
    ListCustomerManagedPolicyReferencesInPermissionSetError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListCustomerManagedPolicyReferencesInPermissionSetRequest,
  output: ListCustomerManagedPolicyReferencesInPermissionSetResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CustomerManagedPolicyReferences",
    pageSize: "MaxResults",
  } as const,
}));
export type ListInstancesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the details of the organization and account instances of IAM Identity Center that were created in or visible to the account calling this API.
 */
export const listInstances: API.OperationMethod<
  ListInstancesRequest,
  ListInstancesResponse,
  ListInstancesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListInstancesRequest,
  ) => stream.Stream<
    ListInstancesResponse,
    ListInstancesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListInstancesRequest,
  ) => stream.Stream<
    InstanceMetadata,
    ListInstancesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListInstancesRequest,
  output: ListInstancesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Instances",
    pageSize: "MaxResults",
  } as const,
}));
export type ListManagedPoliciesInPermissionSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Amazon Web Services managed policy that is attached to a specified permission set.
 */
export const listManagedPoliciesInPermissionSet: API.OperationMethod<
  ListManagedPoliciesInPermissionSetRequest,
  ListManagedPoliciesInPermissionSetResponse,
  ListManagedPoliciesInPermissionSetError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListManagedPoliciesInPermissionSetRequest,
  ) => stream.Stream<
    ListManagedPoliciesInPermissionSetResponse,
    ListManagedPoliciesInPermissionSetError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListManagedPoliciesInPermissionSetRequest,
  ) => stream.Stream<
    AttachedManagedPolicy,
    ListManagedPoliciesInPermissionSetError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListManagedPoliciesInPermissionSetRequest,
  output: ListManagedPoliciesInPermissionSetResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AttachedManagedPolicies",
    pageSize: "MaxResults",
  } as const,
}));
export type ListPermissionSetProvisioningStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the status of the permission set provisioning requests for a specified IAM Identity Center instance.
 */
export const listPermissionSetProvisioningStatus: API.OperationMethod<
  ListPermissionSetProvisioningStatusRequest,
  ListPermissionSetProvisioningStatusResponse,
  ListPermissionSetProvisioningStatusError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListPermissionSetProvisioningStatusRequest,
  ) => stream.Stream<
    ListPermissionSetProvisioningStatusResponse,
    ListPermissionSetProvisioningStatusError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListPermissionSetProvisioningStatusRequest,
  ) => stream.Stream<
    PermissionSetProvisioningStatusMetadata,
    ListPermissionSetProvisioningStatusError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPermissionSetProvisioningStatusRequest,
  output: ListPermissionSetProvisioningStatusResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PermissionSetsProvisioningStatus",
    pageSize: "MaxResults",
  } as const,
}));
export type ListPermissionSetsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the PermissionSets in an IAM Identity Center instance.
 */
export const listPermissionSets: API.OperationMethod<
  ListPermissionSetsRequest,
  ListPermissionSetsResponse,
  ListPermissionSetsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListPermissionSetsRequest,
  ) => stream.Stream<
    ListPermissionSetsResponse,
    ListPermissionSetsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListPermissionSetsRequest,
  ) => stream.Stream<
    PermissionSetArn,
    ListPermissionSetsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPermissionSetsRequest,
  output: ListPermissionSetsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PermissionSets",
    pageSize: "MaxResults",
  } as const,
}));
export type ListPermissionSetsProvisionedToAccountError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the permission sets that are provisioned to a specified Amazon Web Services account.
 */
export const listPermissionSetsProvisionedToAccount: API.OperationMethod<
  ListPermissionSetsProvisionedToAccountRequest,
  ListPermissionSetsProvisionedToAccountResponse,
  ListPermissionSetsProvisionedToAccountError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListPermissionSetsProvisionedToAccountRequest,
  ) => stream.Stream<
    ListPermissionSetsProvisionedToAccountResponse,
    ListPermissionSetsProvisionedToAccountError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListPermissionSetsProvisionedToAccountRequest,
  ) => stream.Stream<
    PermissionSetArn,
    ListPermissionSetsProvisionedToAccountError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPermissionSetsProvisionedToAccountRequest,
  output: ListPermissionSetsProvisionedToAccountResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PermissionSets",
    pageSize: "MaxResults",
  } as const,
}));
export type ListRegionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all enabled Regions of an IAM Identity Center instance, including those that are being added or removed. This operation returns Regions with ACTIVE, ADDING, or REMOVING status.
 *
 * The following actions are related to `ListRegions`:
 *
 * - AddRegion
 *
 * - RemoveRegion
 *
 * - DescribeRegion
 */
export const listRegions: API.OperationMethod<
  ListRegionsRequest,
  ListRegionsResponse,
  ListRegionsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListRegionsRequest,
  ) => stream.Stream<
    ListRegionsResponse,
    ListRegionsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListRegionsRequest,
  ) => stream.Stream<
    RegionMetadata,
    ListRegionsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRegionsRequest,
  output: ListRegionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Regions",
    pageSize: "MaxResults",
  } as const,
}));
export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags that are attached to a specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListTagsForResourceRequest,
  ) => stream.Stream<
    ListTagsForResourceResponse,
    ListTagsForResourceError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListTagsForResourceRequest,
  ) => stream.Stream<
    Tag,
    ListTagsForResourceError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Tags",
  } as const,
}));
export type ListTrustedTokenIssuersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the trusted token issuers configured in an instance of IAM Identity Center.
 */
export const listTrustedTokenIssuers: API.OperationMethod<
  ListTrustedTokenIssuersRequest,
  ListTrustedTokenIssuersResponse,
  ListTrustedTokenIssuersError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListTrustedTokenIssuersRequest,
  ) => stream.Stream<
    ListTrustedTokenIssuersResponse,
    ListTrustedTokenIssuersError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListTrustedTokenIssuersRequest,
  ) => stream.Stream<
    TrustedTokenIssuerMetadata,
    ListTrustedTokenIssuersError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListTrustedTokenIssuersRequest,
  output: ListTrustedTokenIssuersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TrustedTokenIssuers",
    pageSize: "MaxResults",
  } as const,
}));
export type ProvisionPermissionSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The process by which a specified permission set is provisioned to the specified target.
 */
export const provisionPermissionSet: API.OperationMethod<
  ProvisionPermissionSetRequest,
  ProvisionPermissionSetResponse,
  ProvisionPermissionSetError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ProvisionPermissionSetRequest,
  output: ProvisionPermissionSetResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type PutApplicationAssignmentConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Configure how users gain access to an application. If `AssignmentsRequired` is `true` (default value), users don’t have access to the application unless an assignment is created using the CreateApplicationAssignment API. If `false`, all users have access to the application. If an assignment is created using CreateApplicationAssignment., the user retains access if `AssignmentsRequired` is set to `true`.
 */
export const putApplicationAssignmentConfiguration: API.OperationMethod<
  PutApplicationAssignmentConfigurationRequest,
  PutApplicationAssignmentConfigurationResponse,
  PutApplicationAssignmentConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutApplicationAssignmentConfigurationRequest,
  output: PutApplicationAssignmentConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type PutApplicationSessionConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the session configuration for an application in IAM Identity Center.
 *
 * The session configuration determines how users can access an application. This includes whether user background sessions are enabled. User background sessions allow users to start a job on a supported Amazon Web Services managed application without having to remain signed in to an active session while the job runs.
 */
export const putApplicationSessionConfiguration: API.OperationMethod<
  PutApplicationSessionConfigurationRequest,
  PutApplicationSessionConfigurationResponse,
  PutApplicationSessionConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutApplicationSessionConfigurationRequest,
  output: PutApplicationSessionConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type PutInlinePolicyToPermissionSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Attaches an inline policy to a permission set.
 *
 * If the permission set is already referenced by one or more account assignments, you will need to call ` ProvisionPermissionSet ` after this action to apply the corresponding IAM policy updates to all assigned accounts.
 */
export const putInlinePolicyToPermissionSet: API.OperationMethod<
  PutInlinePolicyToPermissionSetRequest,
  PutInlinePolicyToPermissionSetResponse,
  PutInlinePolicyToPermissionSetError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutInlinePolicyToPermissionSetRequest,
  output: PutInlinePolicyToPermissionSetResponse,
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
export type PutPermissionsBoundaryToPermissionSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Attaches an Amazon Web Services managed or customer managed policy to the specified PermissionSet as a permissions boundary.
 */
export const putPermissionsBoundaryToPermissionSet: API.OperationMethod<
  PutPermissionsBoundaryToPermissionSetRequest,
  PutPermissionsBoundaryToPermissionSetResponse,
  PutPermissionsBoundaryToPermissionSetError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutPermissionsBoundaryToPermissionSetRequest,
  output: PutPermissionsBoundaryToPermissionSetResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type RemoveRegionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes an additional Region from an IAM Identity Center instance. This operation initiates an asynchronous workflow to clean up IAM Identity Center resources in the specified additional Region. The Region status is set to REMOVING and the Region record is deleted when the workflow completes. The request must be made from the primary Region. The target Region cannot be the primary Region, and no other add or remove Region workflows can be in progress.
 *
 * The following actions are related to `RemoveRegion`:
 *
 * - AddRegion
 *
 * - DescribeRegion
 *
 * - ListRegions
 */
export const removeRegion: API.OperationMethod<
  RemoveRegionRequest,
  RemoveRegionResponse,
  RemoveRegionError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RemoveRegionRequest,
  output: RemoveRegionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a set of tags with a specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
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
export type UntagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a set of tags from a specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type UpdateApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates application properties.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationRequest,
  UpdateApplicationResponse,
  UpdateApplicationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateApplicationRequest,
  output: UpdateApplicationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type UpdateInstanceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the details for the instance of IAM Identity Center that is owned by the Amazon Web Services account.
 */
export const updateInstance: API.OperationMethod<
  UpdateInstanceRequest,
  UpdateInstanceResponse,
  UpdateInstanceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateInstanceRequest,
  output: UpdateInstanceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type UpdateInstanceAccessControlAttributeConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the IAM Identity Center identity store attributes that you can use with the IAM Identity Center instance for attributes-based access control (ABAC). When using an external identity provider as an identity source, you can pass attributes through the SAML assertion as an alternative to configuring attributes from the IAM Identity Center identity store. If a SAML assertion passes any of these attributes, IAM Identity Center replaces the attribute value with the value from the IAM Identity Center identity store. For more information about ABAC, see Attribute-Based Access Control in the *IAM Identity Center User Guide*.
 */
export const updateInstanceAccessControlAttributeConfiguration: API.OperationMethod<
  UpdateInstanceAccessControlAttributeConfigurationRequest,
  UpdateInstanceAccessControlAttributeConfigurationResponse,
  UpdateInstanceAccessControlAttributeConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateInstanceAccessControlAttributeConfigurationRequest,
  output: UpdateInstanceAccessControlAttributeConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type UpdatePermissionSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing permission set.
 */
export const updatePermissionSet: API.OperationMethod<
  UpdatePermissionSetRequest,
  UpdatePermissionSetResponse,
  UpdatePermissionSetError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatePermissionSetRequest,
  output: UpdatePermissionSetResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type UpdateTrustedTokenIssuerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the name of the trusted token issuer, or the path of a source attribute or destination attribute for a trusted token issuer configuration.
 *
 * Updating this trusted token issuer configuration might cause users to lose access to any applications that are configured to use the trusted token issuer.
 */
export const updateTrustedTokenIssuer: API.OperationMethod<
  UpdateTrustedTokenIssuerRequest,
  UpdateTrustedTokenIssuerResponse,
  UpdateTrustedTokenIssuerError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateTrustedTokenIssuerRequest,
  output: UpdateTrustedTokenIssuerResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type PutApplicationAccessScopeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds or updates the list of authorized targets for an IAM Identity Center access scope for an application.
 */
export const putApplicationAccessScope: API.OperationMethod<
  PutApplicationAccessScopeRequest,
  PutApplicationAccessScopeResponse,
  PutApplicationAccessScopeError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutApplicationAccessScopeRequest,
  output: PutApplicationAccessScopeResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type GetApplicationAccessScopeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the authorized targets for an IAM Identity Center access scope for an application.
 */
export const getApplicationAccessScope: API.OperationMethod<
  GetApplicationAccessScopeRequest,
  GetApplicationAccessScopeResponse,
  GetApplicationAccessScopeError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetApplicationAccessScopeRequest,
  output: GetApplicationAccessScopeResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DeleteApplicationAccessScopeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an IAM Identity Center access scope from an application.
 */
export const deleteApplicationAccessScope: API.OperationMethod<
  DeleteApplicationAccessScopeRequest,
  DeleteApplicationAccessScopeResponse,
  DeleteApplicationAccessScopeError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteApplicationAccessScopeRequest,
  output: DeleteApplicationAccessScopeResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type ListApplicationAccessScopesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the access scopes and authorized targets associated with an application.
 */
export const listApplicationAccessScopes: API.OperationMethod<
  ListApplicationAccessScopesRequest,
  ListApplicationAccessScopesResponse,
  ListApplicationAccessScopesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListApplicationAccessScopesRequest,
  ) => stream.Stream<
    ListApplicationAccessScopesResponse,
    ListApplicationAccessScopesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListApplicationAccessScopesRequest,
  ) => stream.Stream<
    ScopeDetails,
    ListApplicationAccessScopesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationAccessScopesRequest,
  output: ListApplicationAccessScopesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Scopes",
    pageSize: "MaxResults",
  } as const,
}));
export type PutApplicationAuthenticationMethodError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds or updates an authentication method for an application.
 */
export const putApplicationAuthenticationMethod: API.OperationMethod<
  PutApplicationAuthenticationMethodRequest,
  PutApplicationAuthenticationMethodResponse,
  PutApplicationAuthenticationMethodError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutApplicationAuthenticationMethodRequest,
  output: PutApplicationAuthenticationMethodResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type GetApplicationAuthenticationMethodError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about an authentication method used by an application.
 */
export const getApplicationAuthenticationMethod: API.OperationMethod<
  GetApplicationAuthenticationMethodRequest,
  GetApplicationAuthenticationMethodResponse,
  GetApplicationAuthenticationMethodError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetApplicationAuthenticationMethodRequest,
  output: GetApplicationAuthenticationMethodResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DeleteApplicationAuthenticationMethodError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an authentication method from an application.
 */
export const deleteApplicationAuthenticationMethod: API.OperationMethod<
  DeleteApplicationAuthenticationMethodRequest,
  DeleteApplicationAuthenticationMethodResponse,
  DeleteApplicationAuthenticationMethodError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteApplicationAuthenticationMethodRequest,
  output: DeleteApplicationAuthenticationMethodResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type ListApplicationAuthenticationMethodsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all of the authentication methods supported by the specified application.
 */
export const listApplicationAuthenticationMethods: API.OperationMethod<
  ListApplicationAuthenticationMethodsRequest,
  ListApplicationAuthenticationMethodsResponse,
  ListApplicationAuthenticationMethodsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListApplicationAuthenticationMethodsRequest,
  ) => stream.Stream<
    ListApplicationAuthenticationMethodsResponse,
    ListApplicationAuthenticationMethodsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListApplicationAuthenticationMethodsRequest,
  ) => stream.Stream<
    AuthenticationMethodItem,
    ListApplicationAuthenticationMethodsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationAuthenticationMethodsRequest,
  output: ListApplicationAuthenticationMethodsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AuthenticationMethods",
  } as const,
}));
export type PutApplicationGrantError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a configuration for an application to use grants. Conceptually grants are authorization to request actions related to tokens. This configuration will be used when parties are requesting and receiving tokens during the trusted identity propagation process. For more information on the IAM Identity Center supported grant workflows, see SAML 2.0 and OAuth 2.0.
 *
 * A grant is created between your applications and Identity Center instance which enables an application to use specified mechanisms to obtain tokens. These tokens are used by your applications to gain access to Amazon Web Services resources on behalf of users. The following elements are within these exchanges:
 *
 * - **Requester** - The application requesting access to Amazon Web Services resources.
 *
 * - **Subject** - Typically the user that is requesting access to Amazon Web Services resources.
 *
 * - **Grant** - Conceptually, a grant is authorization to access Amazon Web Services resources. These grants authorize token generation for authenticating access to the requester and for the request to make requests on behalf of the subjects. There are four types of grants:
 *
 * - **AuthorizationCode** - Allows an application to request authorization through a series of user-agent redirects.
 *
 * - **JWT bearer ** - Authorizes an application to exchange a JSON Web Token that came from an external identity provider. To learn more, see RFC 6479.
 *
 * - **Refresh token** - Enables application to request new access tokens to replace expiring or expired access tokens.
 *
 * - **Exchange token** - A grant that requests tokens from the authorization server by providing a ‘subject’ token with access scope authorizing trusted identity propagation to this application. To learn more, see RFC 8693.
 *
 * - **Authorization server** - IAM Identity Center requests tokens.
 *
 * User credentials are never shared directly within these exchanges. Instead, applications use grants to request access tokens from IAM Identity Center. For more information, see RFC 6479.
 * **Use cases**
 *
 * - Connecting to custom applications.
 *
 * - Configuring an Amazon Web Services service to make calls to another Amazon Web Services services using JWT tokens.
 */
export const putApplicationGrant: API.OperationMethod<
  PutApplicationGrantRequest,
  PutApplicationGrantResponse,
  PutApplicationGrantError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutApplicationGrantRequest,
  output: PutApplicationGrantResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type GetApplicationGrantError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about an application grant.
 */
export const getApplicationGrant: API.OperationMethod<
  GetApplicationGrantRequest,
  GetApplicationGrantResponse,
  GetApplicationGrantError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetApplicationGrantRequest,
  output: GetApplicationGrantResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DeleteApplicationGrantError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a grant from an application.
 */
export const deleteApplicationGrant: API.OperationMethod<
  DeleteApplicationGrantRequest,
  DeleteApplicationGrantResponse,
  DeleteApplicationGrantError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteApplicationGrantRequest,
  output: DeleteApplicationGrantResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type ListApplicationGrantsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the grants associated with an application.
 */
export const listApplicationGrants: API.OperationMethod<
  ListApplicationGrantsRequest,
  ListApplicationGrantsResponse,
  ListApplicationGrantsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListApplicationGrantsRequest,
  ) => stream.Stream<
    ListApplicationGrantsResponse,
    ListApplicationGrantsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListApplicationGrantsRequest,
  ) => stream.Stream<
    GrantItem,
    ListApplicationGrantsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationGrantsRequest,
  output: ListApplicationGrantsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Grants",
  } as const,
}));
