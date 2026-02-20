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
  sdkId: "ServerlessApplicationRepository",
  serviceShapeName: "ServerlessApplicationRepository",
});
const auth = T.AwsAuthSigv4({ name: "serverlessrepo" });
const ver = T.ServiceVersion("2017-09-08");
const proto = T.AwsProtocolsRestJson1();
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
              `https://serverlessrepo-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://serverlessrepo.${Region}.amazonaws.com`);
            }
            return e(
              `https://serverlessrepo-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://serverlessrepo.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://serverlessrepo.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

//# Newtypes
export type MaxItems = number;

//# Schemas
export type __listOf__string = string[];
export const __listOf__string = S.Array(S.String);
export interface CreateApplicationRequest {
  Author?: string;
  Description?: string;
  HomePageUrl?: string;
  Labels?: string[];
  LicenseBody?: string;
  LicenseUrl?: string;
  Name?: string;
  ReadmeBody?: string;
  ReadmeUrl?: string;
  SemanticVersion?: string;
  SourceCodeArchiveUrl?: string;
  SourceCodeUrl?: string;
  SpdxLicenseId?: string;
  TemplateBody?: string;
  TemplateUrl?: string;
}
export const CreateApplicationRequest = S.suspend(() =>
  S.Struct({
    Author: S.optional(S.String),
    Description: S.optional(S.String),
    HomePageUrl: S.optional(S.String),
    Labels: S.optional(__listOf__string),
    LicenseBody: S.optional(S.String),
    LicenseUrl: S.optional(S.String),
    Name: S.optional(S.String),
    ReadmeBody: S.optional(S.String),
    ReadmeUrl: S.optional(S.String),
    SemanticVersion: S.optional(S.String),
    SourceCodeArchiveUrl: S.optional(S.String),
    SourceCodeUrl: S.optional(S.String),
    SpdxLicenseId: S.optional(S.String),
    TemplateBody: S.optional(S.String),
    TemplateUrl: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        Author: "author",
        Description: "description",
        HomePageUrl: "homePageUrl",
        Labels: "labels",
        LicenseBody: "licenseBody",
        LicenseUrl: "licenseUrl",
        Name: "name",
        ReadmeBody: "readmeBody",
        ReadmeUrl: "readmeUrl",
        SemanticVersion: "semanticVersion",
        SourceCodeArchiveUrl: "sourceCodeArchiveUrl",
        SourceCodeUrl: "sourceCodeUrl",
        SpdxLicenseId: "spdxLicenseId",
        TemplateBody: "templateBody",
        TemplateUrl: "templateUrl",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/applications" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateApplicationRequest",
}) as any as S.Schema<CreateApplicationRequest>;
export interface ParameterDefinition {
  AllowedPattern?: string;
  AllowedValues?: string[];
  ConstraintDescription?: string;
  DefaultValue?: string;
  Description?: string;
  MaxLength?: number;
  MaxValue?: number;
  MinLength?: number;
  MinValue?: number;
  Name?: string;
  NoEcho?: boolean;
  ReferencedByResources?: string[];
  Type?: string;
}
export const ParameterDefinition = S.suspend(() =>
  S.Struct({
    AllowedPattern: S.optional(S.String),
    AllowedValues: S.optional(__listOf__string),
    ConstraintDescription: S.optional(S.String),
    DefaultValue: S.optional(S.String),
    Description: S.optional(S.String),
    MaxLength: S.optional(S.Number),
    MaxValue: S.optional(S.Number),
    MinLength: S.optional(S.Number),
    MinValue: S.optional(S.Number),
    Name: S.optional(S.String),
    NoEcho: S.optional(S.Boolean),
    ReferencedByResources: S.optional(__listOf__string),
    Type: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AllowedPattern: "allowedPattern",
      AllowedValues: "allowedValues",
      ConstraintDescription: "constraintDescription",
      DefaultValue: "defaultValue",
      Description: "description",
      MaxLength: "maxLength",
      MaxValue: "maxValue",
      MinLength: "minLength",
      MinValue: "minValue",
      Name: "name",
      NoEcho: "noEcho",
      ReferencedByResources: "referencedByResources",
      Type: "type",
    }),
  ),
).annotate({
  identifier: "ParameterDefinition",
}) as any as S.Schema<ParameterDefinition>;
export type __listOfParameterDefinition = ParameterDefinition[];
export const __listOfParameterDefinition = S.Array(ParameterDefinition);
export type Capability =
  | "CAPABILITY_IAM"
  | "CAPABILITY_NAMED_IAM"
  | "CAPABILITY_AUTO_EXPAND"
  | "CAPABILITY_RESOURCE_POLICY"
  | (string & {});
export const Capability = S.String;
export type __listOfCapability = Capability[];
export const __listOfCapability = S.Array(Capability);
export interface Version {
  ApplicationId?: string;
  CreationTime?: string;
  ParameterDefinitions?: ParameterDefinition[];
  RequiredCapabilities?: Capability[];
  ResourcesSupported?: boolean;
  SemanticVersion?: string;
  SourceCodeArchiveUrl?: string;
  SourceCodeUrl?: string;
  TemplateUrl?: string;
}
export const Version = S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    CreationTime: S.optional(S.String),
    ParameterDefinitions: S.optional(__listOfParameterDefinition),
    RequiredCapabilities: S.optional(__listOfCapability),
    ResourcesSupported: S.optional(S.Boolean),
    SemanticVersion: S.optional(S.String),
    SourceCodeArchiveUrl: S.optional(S.String),
    SourceCodeUrl: S.optional(S.String),
    TemplateUrl: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ApplicationId: "applicationId",
      CreationTime: "creationTime",
      ParameterDefinitions: "parameterDefinitions",
      RequiredCapabilities: "requiredCapabilities",
      ResourcesSupported: "resourcesSupported",
      SemanticVersion: "semanticVersion",
      SourceCodeArchiveUrl: "sourceCodeArchiveUrl",
      SourceCodeUrl: "sourceCodeUrl",
      TemplateUrl: "templateUrl",
    }),
  ),
).annotate({ identifier: "Version" }) as any as S.Schema<Version>;
export interface CreateApplicationResponse {
  ApplicationId?: string;
  Author?: string;
  CreationTime?: string;
  Description?: string;
  HomePageUrl?: string;
  IsVerifiedAuthor?: boolean;
  Labels?: string[];
  LicenseUrl?: string;
  Name?: string;
  ReadmeUrl?: string;
  SpdxLicenseId?: string;
  VerifiedAuthorUrl?: string;
  Version?: Version & {
    ApplicationId: string;
    CreationTime: string;
    ParameterDefinitions: (ParameterDefinition & {
      Name: string;
      ReferencedByResources: __listOf__string;
    })[];
    RequiredCapabilities: __listOfCapability;
    ResourcesSupported: boolean;
    SemanticVersion: string;
    TemplateUrl: string;
  };
}
export const CreateApplicationResponse = S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    Author: S.optional(S.String),
    CreationTime: S.optional(S.String),
    Description: S.optional(S.String),
    HomePageUrl: S.optional(S.String),
    IsVerifiedAuthor: S.optional(S.Boolean),
    Labels: S.optional(__listOf__string),
    LicenseUrl: S.optional(S.String),
    Name: S.optional(S.String),
    ReadmeUrl: S.optional(S.String),
    SpdxLicenseId: S.optional(S.String),
    VerifiedAuthorUrl: S.optional(S.String),
    Version: S.optional(Version),
  }).pipe(
    S.encodeKeys({
      ApplicationId: "applicationId",
      Author: "author",
      CreationTime: "creationTime",
      Description: "description",
      HomePageUrl: "homePageUrl",
      IsVerifiedAuthor: "isVerifiedAuthor",
      Labels: "labels",
      LicenseUrl: "licenseUrl",
      Name: "name",
      ReadmeUrl: "readmeUrl",
      SpdxLicenseId: "spdxLicenseId",
      VerifiedAuthorUrl: "verifiedAuthorUrl",
      Version: "version",
    }),
  ),
).annotate({
  identifier: "CreateApplicationResponse",
}) as any as S.Schema<CreateApplicationResponse>;
export interface CreateApplicationVersionRequest {
  ApplicationId: string;
  SemanticVersion: string;
  SourceCodeArchiveUrl?: string;
  SourceCodeUrl?: string;
  TemplateBody?: string;
  TemplateUrl?: string;
}
export const CreateApplicationVersionRequest = S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    SemanticVersion: S.String.pipe(T.HttpLabel("SemanticVersion")),
    SourceCodeArchiveUrl: S.optional(S.String),
    SourceCodeUrl: S.optional(S.String),
    TemplateBody: S.optional(S.String),
    TemplateUrl: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        SourceCodeArchiveUrl: "sourceCodeArchiveUrl",
        SourceCodeUrl: "sourceCodeUrl",
        TemplateBody: "templateBody",
        TemplateUrl: "templateUrl",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/applications/{ApplicationId}/versions/{SemanticVersion}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateApplicationVersionRequest",
}) as any as S.Schema<CreateApplicationVersionRequest>;
export interface CreateApplicationVersionResponse {
  ApplicationId?: string;
  CreationTime?: string;
  ParameterDefinitions?: (ParameterDefinition & {
    Name: string;
    ReferencedByResources: __listOf__string;
  })[];
  RequiredCapabilities?: Capability[];
  ResourcesSupported?: boolean;
  SemanticVersion?: string;
  SourceCodeArchiveUrl?: string;
  SourceCodeUrl?: string;
  TemplateUrl?: string;
}
export const CreateApplicationVersionResponse = S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    CreationTime: S.optional(S.String),
    ParameterDefinitions: S.optional(__listOfParameterDefinition),
    RequiredCapabilities: S.optional(__listOfCapability),
    ResourcesSupported: S.optional(S.Boolean),
    SemanticVersion: S.optional(S.String),
    SourceCodeArchiveUrl: S.optional(S.String),
    SourceCodeUrl: S.optional(S.String),
    TemplateUrl: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ApplicationId: "applicationId",
      CreationTime: "creationTime",
      ParameterDefinitions: "parameterDefinitions",
      RequiredCapabilities: "requiredCapabilities",
      ResourcesSupported: "resourcesSupported",
      SemanticVersion: "semanticVersion",
      SourceCodeArchiveUrl: "sourceCodeArchiveUrl",
      SourceCodeUrl: "sourceCodeUrl",
      TemplateUrl: "templateUrl",
    }),
  ),
).annotate({
  identifier: "CreateApplicationVersionResponse",
}) as any as S.Schema<CreateApplicationVersionResponse>;
export interface ParameterValue {
  Name?: string;
  Value?: string;
}
export const ParameterValue = S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Value: S.optional(S.String) }).pipe(
    S.encodeKeys({ Name: "name", Value: "value" }),
  ),
).annotate({ identifier: "ParameterValue" }) as any as S.Schema<ParameterValue>;
export type __listOfParameterValue = ParameterValue[];
export const __listOfParameterValue = S.Array(ParameterValue);
export interface RollbackTrigger {
  Arn?: string;
  Type?: string;
}
export const RollbackTrigger = S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String), Type: S.optional(S.String) }).pipe(
    S.encodeKeys({ Arn: "arn", Type: "type" }),
  ),
).annotate({
  identifier: "RollbackTrigger",
}) as any as S.Schema<RollbackTrigger>;
export type __listOfRollbackTrigger = RollbackTrigger[];
export const __listOfRollbackTrigger = S.Array(RollbackTrigger);
export interface RollbackConfiguration {
  MonitoringTimeInMinutes?: number;
  RollbackTriggers?: RollbackTrigger[];
}
export const RollbackConfiguration = S.suspend(() =>
  S.Struct({
    MonitoringTimeInMinutes: S.optional(S.Number),
    RollbackTriggers: S.optional(__listOfRollbackTrigger),
  }).pipe(
    S.encodeKeys({
      MonitoringTimeInMinutes: "monitoringTimeInMinutes",
      RollbackTriggers: "rollbackTriggers",
    }),
  ),
).annotate({
  identifier: "RollbackConfiguration",
}) as any as S.Schema<RollbackConfiguration>;
export interface Tag {
  Key?: string;
  Value?: string;
}
export const Tag = S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }).pipe(
    S.encodeKeys({ Key: "key", Value: "value" }),
  ),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type __listOfTag = Tag[];
export const __listOfTag = S.Array(Tag);
export interface CreateCloudFormationChangeSetRequest {
  ApplicationId: string;
  Capabilities?: string[];
  ChangeSetName?: string;
  ClientToken?: string;
  Description?: string;
  NotificationArns?: string[];
  ParameterOverrides?: ParameterValue[];
  ResourceTypes?: string[];
  RollbackConfiguration?: RollbackConfiguration;
  SemanticVersion?: string;
  StackName?: string;
  Tags?: Tag[];
  TemplateId?: string;
}
export const CreateCloudFormationChangeSetRequest = S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    Capabilities: S.optional(__listOf__string),
    ChangeSetName: S.optional(S.String),
    ClientToken: S.optional(S.String),
    Description: S.optional(S.String),
    NotificationArns: S.optional(__listOf__string),
    ParameterOverrides: S.optional(__listOfParameterValue),
    ResourceTypes: S.optional(__listOf__string),
    RollbackConfiguration: S.optional(RollbackConfiguration),
    SemanticVersion: S.optional(S.String),
    StackName: S.optional(S.String),
    Tags: S.optional(__listOfTag),
    TemplateId: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        Capabilities: "capabilities",
        ChangeSetName: "changeSetName",
        ClientToken: "clientToken",
        Description: "description",
        NotificationArns: "notificationArns",
        ParameterOverrides: "parameterOverrides",
        ResourceTypes: "resourceTypes",
        RollbackConfiguration: "rollbackConfiguration",
        SemanticVersion: "semanticVersion",
        StackName: "stackName",
        Tags: "tags",
        TemplateId: "templateId",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/applications/{ApplicationId}/changesets",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateCloudFormationChangeSetRequest",
}) as any as S.Schema<CreateCloudFormationChangeSetRequest>;
export interface CreateCloudFormationChangeSetResponse {
  ApplicationId?: string;
  ChangeSetId?: string;
  SemanticVersion?: string;
  StackId?: string;
}
export const CreateCloudFormationChangeSetResponse = S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    ChangeSetId: S.optional(S.String),
    SemanticVersion: S.optional(S.String),
    StackId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ApplicationId: "applicationId",
      ChangeSetId: "changeSetId",
      SemanticVersion: "semanticVersion",
      StackId: "stackId",
    }),
  ),
).annotate({
  identifier: "CreateCloudFormationChangeSetResponse",
}) as any as S.Schema<CreateCloudFormationChangeSetResponse>;
export interface CreateCloudFormationTemplateRequest {
  ApplicationId: string;
  SemanticVersion?: string;
}
export const CreateCloudFormationTemplateRequest = S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    SemanticVersion: S.optional(S.String),
  })
    .pipe(S.encodeKeys({ SemanticVersion: "semanticVersion" }))
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/applications/{ApplicationId}/templates",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateCloudFormationTemplateRequest",
}) as any as S.Schema<CreateCloudFormationTemplateRequest>;
export type Status = "PREPARING" | "ACTIVE" | "EXPIRED" | (string & {});
export const Status = S.String;
export interface CreateCloudFormationTemplateResponse {
  ApplicationId?: string;
  CreationTime?: string;
  ExpirationTime?: string;
  SemanticVersion?: string;
  Status?: Status;
  TemplateId?: string;
  TemplateUrl?: string;
}
export const CreateCloudFormationTemplateResponse = S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    CreationTime: S.optional(S.String),
    ExpirationTime: S.optional(S.String),
    SemanticVersion: S.optional(S.String),
    Status: S.optional(Status),
    TemplateId: S.optional(S.String),
    TemplateUrl: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ApplicationId: "applicationId",
      CreationTime: "creationTime",
      ExpirationTime: "expirationTime",
      SemanticVersion: "semanticVersion",
      Status: "status",
      TemplateId: "templateId",
      TemplateUrl: "templateUrl",
    }),
  ),
).annotate({
  identifier: "CreateCloudFormationTemplateResponse",
}) as any as S.Schema<CreateCloudFormationTemplateResponse>;
export interface DeleteApplicationRequest {
  ApplicationId: string;
}
export const DeleteApplicationRequest = S.suspend(() =>
  S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/applications/{ApplicationId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteApplicationRequest",
}) as any as S.Schema<DeleteApplicationRequest>;
export interface DeleteApplicationResponse {}
export const DeleteApplicationResponse = S.suspend(() => S.Struct({})).annotate(
  { identifier: "DeleteApplicationResponse" },
) as any as S.Schema<DeleteApplicationResponse>;
export interface GetApplicationRequest {
  ApplicationId: string;
  SemanticVersion?: string;
}
export const GetApplicationRequest = S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    SemanticVersion: S.optional(S.String).pipe(T.HttpQuery("semanticVersion")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/applications/{ApplicationId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetApplicationRequest",
}) as any as S.Schema<GetApplicationRequest>;
export interface GetApplicationResponse {
  ApplicationId?: string;
  Author?: string;
  CreationTime?: string;
  Description?: string;
  HomePageUrl?: string;
  IsVerifiedAuthor?: boolean;
  Labels?: string[];
  LicenseUrl?: string;
  Name?: string;
  ReadmeUrl?: string;
  SpdxLicenseId?: string;
  VerifiedAuthorUrl?: string;
  Version?: Version & {
    ApplicationId: string;
    CreationTime: string;
    ParameterDefinitions: (ParameterDefinition & {
      Name: string;
      ReferencedByResources: __listOf__string;
    })[];
    RequiredCapabilities: __listOfCapability;
    ResourcesSupported: boolean;
    SemanticVersion: string;
    TemplateUrl: string;
  };
}
export const GetApplicationResponse = S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    Author: S.optional(S.String),
    CreationTime: S.optional(S.String),
    Description: S.optional(S.String),
    HomePageUrl: S.optional(S.String),
    IsVerifiedAuthor: S.optional(S.Boolean),
    Labels: S.optional(__listOf__string),
    LicenseUrl: S.optional(S.String),
    Name: S.optional(S.String),
    ReadmeUrl: S.optional(S.String),
    SpdxLicenseId: S.optional(S.String),
    VerifiedAuthorUrl: S.optional(S.String),
    Version: S.optional(Version),
  }).pipe(
    S.encodeKeys({
      ApplicationId: "applicationId",
      Author: "author",
      CreationTime: "creationTime",
      Description: "description",
      HomePageUrl: "homePageUrl",
      IsVerifiedAuthor: "isVerifiedAuthor",
      Labels: "labels",
      LicenseUrl: "licenseUrl",
      Name: "name",
      ReadmeUrl: "readmeUrl",
      SpdxLicenseId: "spdxLicenseId",
      VerifiedAuthorUrl: "verifiedAuthorUrl",
      Version: "version",
    }),
  ),
).annotate({
  identifier: "GetApplicationResponse",
}) as any as S.Schema<GetApplicationResponse>;
export interface GetApplicationPolicyRequest {
  ApplicationId: string;
}
export const GetApplicationPolicyRequest = S.suspend(() =>
  S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/applications/{ApplicationId}/policy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetApplicationPolicyRequest",
}) as any as S.Schema<GetApplicationPolicyRequest>;
export interface ApplicationPolicyStatement {
  Actions?: string[];
  PrincipalOrgIDs?: string[];
  Principals?: string[];
  StatementId?: string;
}
export const ApplicationPolicyStatement = S.suspend(() =>
  S.Struct({
    Actions: S.optional(__listOf__string),
    PrincipalOrgIDs: S.optional(__listOf__string),
    Principals: S.optional(__listOf__string),
    StatementId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Actions: "actions",
      PrincipalOrgIDs: "principalOrgIDs",
      Principals: "principals",
      StatementId: "statementId",
    }),
  ),
).annotate({
  identifier: "ApplicationPolicyStatement",
}) as any as S.Schema<ApplicationPolicyStatement>;
export type __listOfApplicationPolicyStatement = ApplicationPolicyStatement[];
export const __listOfApplicationPolicyStatement = S.Array(
  ApplicationPolicyStatement,
);
export interface GetApplicationPolicyResponse {
  Statements?: (ApplicationPolicyStatement & {
    Actions: __listOf__string;
    Principals: __listOf__string;
  })[];
}
export const GetApplicationPolicyResponse = S.suspend(() =>
  S.Struct({ Statements: S.optional(__listOfApplicationPolicyStatement) }).pipe(
    S.encodeKeys({ Statements: "statements" }),
  ),
).annotate({
  identifier: "GetApplicationPolicyResponse",
}) as any as S.Schema<GetApplicationPolicyResponse>;
export interface GetCloudFormationTemplateRequest {
  ApplicationId: string;
  TemplateId: string;
}
export const GetCloudFormationTemplateRequest = S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    TemplateId: S.String.pipe(T.HttpLabel("TemplateId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{ApplicationId}/templates/{TemplateId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCloudFormationTemplateRequest",
}) as any as S.Schema<GetCloudFormationTemplateRequest>;
export interface GetCloudFormationTemplateResponse {
  ApplicationId?: string;
  CreationTime?: string;
  ExpirationTime?: string;
  SemanticVersion?: string;
  Status?: Status;
  TemplateId?: string;
  TemplateUrl?: string;
}
export const GetCloudFormationTemplateResponse = S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    CreationTime: S.optional(S.String),
    ExpirationTime: S.optional(S.String),
    SemanticVersion: S.optional(S.String),
    Status: S.optional(Status),
    TemplateId: S.optional(S.String),
    TemplateUrl: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ApplicationId: "applicationId",
      CreationTime: "creationTime",
      ExpirationTime: "expirationTime",
      SemanticVersion: "semanticVersion",
      Status: "status",
      TemplateId: "templateId",
      TemplateUrl: "templateUrl",
    }),
  ),
).annotate({
  identifier: "GetCloudFormationTemplateResponse",
}) as any as S.Schema<GetCloudFormationTemplateResponse>;
export interface ListApplicationDependenciesRequest {
  ApplicationId: string;
  MaxItems?: number;
  NextToken?: string;
  SemanticVersion?: string;
}
export const ListApplicationDependenciesRequest = S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    MaxItems: S.optional(S.Number).pipe(T.HttpQuery("maxItems")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    SemanticVersion: S.optional(S.String).pipe(T.HttpQuery("semanticVersion")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{ApplicationId}/dependencies",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListApplicationDependenciesRequest",
}) as any as S.Schema<ListApplicationDependenciesRequest>;
export interface ApplicationDependencySummary {
  ApplicationId?: string;
  SemanticVersion?: string;
}
export const ApplicationDependencySummary = S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    SemanticVersion: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ApplicationId: "applicationId",
      SemanticVersion: "semanticVersion",
    }),
  ),
).annotate({
  identifier: "ApplicationDependencySummary",
}) as any as S.Schema<ApplicationDependencySummary>;
export type __listOfApplicationDependencySummary =
  ApplicationDependencySummary[];
export const __listOfApplicationDependencySummary = S.Array(
  ApplicationDependencySummary,
);
export interface ListApplicationDependenciesResponse {
  Dependencies?: (ApplicationDependencySummary & {
    ApplicationId: string;
    SemanticVersion: string;
  })[];
  NextToken?: string;
}
export const ListApplicationDependenciesResponse = S.suspend(() =>
  S.Struct({
    Dependencies: S.optional(__listOfApplicationDependencySummary),
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ Dependencies: "dependencies", NextToken: "nextToken" }),
  ),
).annotate({
  identifier: "ListApplicationDependenciesResponse",
}) as any as S.Schema<ListApplicationDependenciesResponse>;
export interface ListApplicationsRequest {
  MaxItems?: number;
  NextToken?: string;
}
export const ListApplicationsRequest = S.suspend(() =>
  S.Struct({
    MaxItems: S.optional(S.Number).pipe(T.HttpQuery("maxItems")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/applications" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListApplicationsRequest",
}) as any as S.Schema<ListApplicationsRequest>;
export interface ApplicationSummary {
  ApplicationId?: string;
  Author?: string;
  CreationTime?: string;
  Description?: string;
  HomePageUrl?: string;
  Labels?: string[];
  Name?: string;
  SpdxLicenseId?: string;
}
export const ApplicationSummary = S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    Author: S.optional(S.String),
    CreationTime: S.optional(S.String),
    Description: S.optional(S.String),
    HomePageUrl: S.optional(S.String),
    Labels: S.optional(__listOf__string),
    Name: S.optional(S.String),
    SpdxLicenseId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ApplicationId: "applicationId",
      Author: "author",
      CreationTime: "creationTime",
      Description: "description",
      HomePageUrl: "homePageUrl",
      Labels: "labels",
      Name: "name",
      SpdxLicenseId: "spdxLicenseId",
    }),
  ),
).annotate({
  identifier: "ApplicationSummary",
}) as any as S.Schema<ApplicationSummary>;
export type __listOfApplicationSummary = ApplicationSummary[];
export const __listOfApplicationSummary = S.Array(ApplicationSummary);
export interface ListApplicationsResponse {
  Applications?: (ApplicationSummary & {
    ApplicationId: string;
    Author: string;
    Description: string;
    Name: string;
  })[];
  NextToken?: string;
}
export const ListApplicationsResponse = S.suspend(() =>
  S.Struct({
    Applications: S.optional(__listOfApplicationSummary),
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ Applications: "applications", NextToken: "nextToken" }),
  ),
).annotate({
  identifier: "ListApplicationsResponse",
}) as any as S.Schema<ListApplicationsResponse>;
export interface ListApplicationVersionsRequest {
  ApplicationId: string;
  MaxItems?: number;
  NextToken?: string;
}
export const ListApplicationVersionsRequest = S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    MaxItems: S.optional(S.Number).pipe(T.HttpQuery("maxItems")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/applications/{ApplicationId}/versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListApplicationVersionsRequest",
}) as any as S.Schema<ListApplicationVersionsRequest>;
export interface VersionSummary {
  ApplicationId?: string;
  CreationTime?: string;
  SemanticVersion?: string;
  SourceCodeUrl?: string;
}
export const VersionSummary = S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    CreationTime: S.optional(S.String),
    SemanticVersion: S.optional(S.String),
    SourceCodeUrl: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ApplicationId: "applicationId",
      CreationTime: "creationTime",
      SemanticVersion: "semanticVersion",
      SourceCodeUrl: "sourceCodeUrl",
    }),
  ),
).annotate({ identifier: "VersionSummary" }) as any as S.Schema<VersionSummary>;
export type __listOfVersionSummary = VersionSummary[];
export const __listOfVersionSummary = S.Array(VersionSummary);
export interface ListApplicationVersionsResponse {
  NextToken?: string;
  Versions?: (VersionSummary & {
    ApplicationId: string;
    CreationTime: string;
    SemanticVersion: string;
  })[];
}
export const ListApplicationVersionsResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Versions: S.optional(__listOfVersionSummary),
  }).pipe(S.encodeKeys({ NextToken: "nextToken", Versions: "versions" })),
).annotate({
  identifier: "ListApplicationVersionsResponse",
}) as any as S.Schema<ListApplicationVersionsResponse>;
export interface PutApplicationPolicyRequest {
  ApplicationId: string;
  Statements?: ApplicationPolicyStatement[];
}
export const PutApplicationPolicyRequest = S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    Statements: S.optional(__listOfApplicationPolicyStatement),
  })
    .pipe(S.encodeKeys({ Statements: "statements" }))
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/applications/{ApplicationId}/policy" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutApplicationPolicyRequest",
}) as any as S.Schema<PutApplicationPolicyRequest>;
export interface PutApplicationPolicyResponse {
  Statements?: (ApplicationPolicyStatement & {
    Actions: __listOf__string;
    Principals: __listOf__string;
  })[];
}
export const PutApplicationPolicyResponse = S.suspend(() =>
  S.Struct({ Statements: S.optional(__listOfApplicationPolicyStatement) }).pipe(
    S.encodeKeys({ Statements: "statements" }),
  ),
).annotate({
  identifier: "PutApplicationPolicyResponse",
}) as any as S.Schema<PutApplicationPolicyResponse>;
export interface UnshareApplicationRequest {
  ApplicationId: string;
  OrganizationId?: string;
}
export const UnshareApplicationRequest = S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    OrganizationId: S.optional(S.String),
  })
    .pipe(S.encodeKeys({ OrganizationId: "organizationId" }))
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/applications/{ApplicationId}/unshare",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UnshareApplicationRequest",
}) as any as S.Schema<UnshareApplicationRequest>;
export interface UnshareApplicationResponse {}
export const UnshareApplicationResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UnshareApplicationResponse",
}) as any as S.Schema<UnshareApplicationResponse>;
export interface UpdateApplicationRequest {
  ApplicationId: string;
  Author?: string;
  Description?: string;
  HomePageUrl?: string;
  Labels?: string[];
  ReadmeBody?: string;
  ReadmeUrl?: string;
}
export const UpdateApplicationRequest = S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    Author: S.optional(S.String),
    Description: S.optional(S.String),
    HomePageUrl: S.optional(S.String),
    Labels: S.optional(__listOf__string),
    ReadmeBody: S.optional(S.String),
    ReadmeUrl: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        Author: "author",
        Description: "description",
        HomePageUrl: "homePageUrl",
        Labels: "labels",
        ReadmeBody: "readmeBody",
        ReadmeUrl: "readmeUrl",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "PATCH", uri: "/applications/{ApplicationId}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateApplicationRequest",
}) as any as S.Schema<UpdateApplicationRequest>;
export interface UpdateApplicationResponse {
  ApplicationId?: string;
  Author?: string;
  CreationTime?: string;
  Description?: string;
  HomePageUrl?: string;
  IsVerifiedAuthor?: boolean;
  Labels?: string[];
  LicenseUrl?: string;
  Name?: string;
  ReadmeUrl?: string;
  SpdxLicenseId?: string;
  VerifiedAuthorUrl?: string;
  Version?: Version & {
    ApplicationId: string;
    CreationTime: string;
    ParameterDefinitions: (ParameterDefinition & {
      Name: string;
      ReferencedByResources: __listOf__string;
    })[];
    RequiredCapabilities: __listOfCapability;
    ResourcesSupported: boolean;
    SemanticVersion: string;
    TemplateUrl: string;
  };
}
export const UpdateApplicationResponse = S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    Author: S.optional(S.String),
    CreationTime: S.optional(S.String),
    Description: S.optional(S.String),
    HomePageUrl: S.optional(S.String),
    IsVerifiedAuthor: S.optional(S.Boolean),
    Labels: S.optional(__listOf__string),
    LicenseUrl: S.optional(S.String),
    Name: S.optional(S.String),
    ReadmeUrl: S.optional(S.String),
    SpdxLicenseId: S.optional(S.String),
    VerifiedAuthorUrl: S.optional(S.String),
    Version: S.optional(Version),
  }).pipe(
    S.encodeKeys({
      ApplicationId: "applicationId",
      Author: "author",
      CreationTime: "creationTime",
      Description: "description",
      HomePageUrl: "homePageUrl",
      IsVerifiedAuthor: "isVerifiedAuthor",
      Labels: "labels",
      LicenseUrl: "licenseUrl",
      Name: "name",
      ReadmeUrl: "readmeUrl",
      SpdxLicenseId: "spdxLicenseId",
      VerifiedAuthorUrl: "verifiedAuthorUrl",
      Version: "version",
    }),
  ),
).annotate({
  identifier: "UpdateApplicationResponse",
}) as any as S.Schema<UpdateApplicationResponse>;

//# Errors
export class BadRequestException extends S.TaggedErrorClass<BadRequestException>()(
  "BadRequestException",
  { ErrorCode: S.optional(S.String), Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  { ErrorCode: S.optional(S.String), Message: S.optional(S.String) },
).pipe(C.withConflictError) {}
export class ForbiddenException extends S.TaggedErrorClass<ForbiddenException>()(
  "ForbiddenException",
  { ErrorCode: S.optional(S.String), Message: S.optional(S.String) },
).pipe(C.withAuthError) {}
export class InternalServerErrorException extends S.TaggedErrorClass<InternalServerErrorException>()(
  "InternalServerErrorException",
  { ErrorCode: S.optional(S.String), Message: S.optional(S.String) },
).pipe(C.withServerError) {}
export class TooManyRequestsException extends S.TaggedErrorClass<TooManyRequestsException>()(
  "TooManyRequestsException",
  { ErrorCode: S.optional(S.String), Message: S.optional(S.String) },
).pipe(C.withThrottlingError) {}
export class NotFoundException extends S.TaggedErrorClass<NotFoundException>()(
  "NotFoundException",
  { ErrorCode: S.optional(S.String), Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}

//# Operations
/**
 * Creates an application, optionally including an AWS SAM file to create the first application version in the same call.
 */
export const createApplication: (
  input: CreateApplicationRequest,
) => effect.Effect<
  CreateApplicationResponse,
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateApplicationRequest,
  output: CreateApplicationResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
}));
/**
 * Creates an application version.
 */
export const createApplicationVersion: (
  input: CreateApplicationVersionRequest,
) => effect.Effect<
  CreateApplicationVersionResponse,
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateApplicationVersionRequest,
  output: CreateApplicationVersionResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
}));
/**
 * Creates an AWS CloudFormation change set for the given application.
 */
export const createCloudFormationChangeSet: (
  input: CreateCloudFormationChangeSetRequest,
) => effect.Effect<
  CreateCloudFormationChangeSetResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCloudFormationChangeSetRequest,
  output: CreateCloudFormationChangeSetResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
}));
/**
 * Creates an AWS CloudFormation template.
 */
export const createCloudFormationTemplate: (
  input: CreateCloudFormationTemplateRequest,
) => effect.Effect<
  CreateCloudFormationTemplateResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCloudFormationTemplateRequest,
  output: CreateCloudFormationTemplateResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Deletes the specified application.
 */
export const deleteApplication: (
  input: DeleteApplicationRequest,
) => effect.Effect<
  DeleteApplicationResponse,
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteApplicationRequest,
  output: DeleteApplicationResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Gets the specified application.
 */
export const getApplication: (
  input: GetApplicationRequest,
) => effect.Effect<
  GetApplicationResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetApplicationRequest,
  output: GetApplicationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Retrieves the policy for the application.
 */
export const getApplicationPolicy: (
  input: GetApplicationPolicyRequest,
) => effect.Effect<
  GetApplicationPolicyResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetApplicationPolicyRequest,
  output: GetApplicationPolicyResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Gets the specified AWS CloudFormation template.
 */
export const getCloudFormationTemplate: (
  input: GetCloudFormationTemplateRequest,
) => effect.Effect<
  GetCloudFormationTemplateResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetCloudFormationTemplateRequest,
  output: GetCloudFormationTemplateResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Retrieves the list of applications nested in the containing application.
 */
export const listApplicationDependencies: {
  (
    input: ListApplicationDependenciesRequest,
  ): effect.Effect<
    ListApplicationDependenciesResponse,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | NotFoundException
    | TooManyRequestsException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListApplicationDependenciesRequest,
  ) => stream.Stream<
    ListApplicationDependenciesResponse,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | NotFoundException
    | TooManyRequestsException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListApplicationDependenciesRequest,
  ) => stream.Stream<
    unknown,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | NotFoundException
    | TooManyRequestsException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationDependenciesRequest,
  output: ListApplicationDependenciesResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxItems",
  } as const,
}));
/**
 * Lists applications owned by the requester.
 */
export const listApplications: {
  (
    input: ListApplicationsRequest,
  ): effect.Effect<
    ListApplicationsResponse,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | NotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListApplicationsRequest,
  ) => stream.Stream<
    ListApplicationsResponse,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | NotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListApplicationsRequest,
  ) => stream.Stream<
    unknown,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | NotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationsRequest,
  output: ListApplicationsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxItems",
  } as const,
}));
/**
 * Lists versions for the specified application.
 */
export const listApplicationVersions: {
  (
    input: ListApplicationVersionsRequest,
  ): effect.Effect<
    ListApplicationVersionsResponse,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | NotFoundException
    | TooManyRequestsException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListApplicationVersionsRequest,
  ) => stream.Stream<
    ListApplicationVersionsResponse,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | NotFoundException
    | TooManyRequestsException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListApplicationVersionsRequest,
  ) => stream.Stream<
    unknown,
    | BadRequestException
    | ForbiddenException
    | InternalServerErrorException
    | NotFoundException
    | TooManyRequestsException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationVersionsRequest,
  output: ListApplicationVersionsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxItems",
  } as const,
}));
/**
 * Sets the permission policy for an application. For the list of actions supported for this operation, see
 * Application
 * Permissions
 * .
 */
export const putApplicationPolicy: (
  input: PutApplicationPolicyRequest,
) => effect.Effect<
  PutApplicationPolicyResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutApplicationPolicyRequest,
  output: PutApplicationPolicyResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Unshares an application from an AWS Organization.
 *
 * This operation can be called only from the organization's master account.
 */
export const unshareApplication: (
  input: UnshareApplicationRequest,
) => effect.Effect<
  UnshareApplicationResponse,
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UnshareApplicationRequest,
  output: UnshareApplicationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
/**
 * Updates the specified application.
 */
export const updateApplication: (
  input: UpdateApplicationRequest,
) => effect.Effect<
  UpdateApplicationResponse,
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateApplicationRequest,
  output: UpdateApplicationResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
}));
