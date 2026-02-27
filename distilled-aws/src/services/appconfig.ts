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
  sdkId: "AppConfig",
  serviceShapeName: "AmazonAppConfig",
});
const auth = T.AwsAuthSigv4({ name: "appconfig" });
const ver = T.ServiceVersion("2019-10-09");
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
              `https://appconfig-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (Region === "us-gov-east-1") {
              return e("https://appconfig.us-gov-east-1.amazonaws.com");
            }
            if (Region === "us-gov-west-1") {
              return e("https://appconfig.us-gov-west-1.amazonaws.com");
            }
            return e(
              `https://appconfig-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://appconfig.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://appconfig.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

//# Newtypes
export type Name = string;
export type Description = string;
export type TagKey = string;
export type TagValue = string;
export type Id = string;
export type LongName = string;
export type Uri = string;
export type RoleArn = string;
export type StringWithLengthBetween0And32768 =
  | string
  | redacted.Redacted<string>;
export type ConfigurationProfileType = string;
export type KmsKeyIdentifier = string;
export type Arn = string;
export type MinutesBetween0And24Hours = number;
export type GrowthFactor = number;
export type Percentage = number;
export type StringWithLengthBetween1And2048 = string;
export type ExtensionOrParameterName = string;
export type Identifier = string;
export type StringWithLengthBetween1And255 = string;
export type VersionLabel = string;
export type DeploymentStrategyId = string;
export type DeletionProtectionDuration = number;
export type StringWithLengthBetween1And64 = string;
export type Version = string;
export type Iso8601DateTime = Date;
export type MaxResults = number;
export type NextToken = string;
export type QueryName = string;
export type DynamicParameterKey = string;
export type KmsKeyIdentifierOrEmpty = string;

//# Schemas
export type TagMap = { [key: string]: string | undefined };
export const TagMap = S.Record(S.String, S.String.pipe(S.optional));
export interface CreateApplicationRequest {
  Name: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateApplicationRequest = S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    Tags: S.optional(TagMap),
  }).pipe(
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
export interface Application {
  Id?: string;
  Name?: string;
  Description?: string;
}
export const Application = S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
  }),
).annotate({ identifier: "Application" }) as any as S.Schema<Application>;
export type BadRequestReason = "InvalidConfiguration" | (string & {});
export const BadRequestReason = S.String;
export interface InvalidConfigurationDetail {
  Constraint?: string;
  Location?: string;
  Reason?: string;
  Type?: string;
  Value?: string;
}
export const InvalidConfigurationDetail = S.suspend(() =>
  S.Struct({
    Constraint: S.optional(S.String),
    Location: S.optional(S.String),
    Reason: S.optional(S.String),
    Type: S.optional(S.String),
    Value: S.optional(S.String),
  }),
).annotate({
  identifier: "InvalidConfigurationDetail",
}) as any as S.Schema<InvalidConfigurationDetail>;
export type InvalidConfigurationDetailList = InvalidConfigurationDetail[];
export const InvalidConfigurationDetailList = S.Array(
  InvalidConfigurationDetail,
);
export type BadRequestDetails = {
  InvalidConfiguration: InvalidConfigurationDetail[];
};
export const BadRequestDetails = S.Union([
  S.Struct({ InvalidConfiguration: InvalidConfigurationDetailList }),
]);
export type ValidatorType = "JSON_SCHEMA" | "LAMBDA" | (string & {});
export const ValidatorType = S.String;
export interface Validator {
  Type: ValidatorType;
  Content: string | redacted.Redacted<string>;
}
export const Validator = S.suspend(() =>
  S.Struct({ Type: ValidatorType, Content: SensitiveString }),
).annotate({ identifier: "Validator" }) as any as S.Schema<Validator>;
export type ValidatorList = Validator[];
export const ValidatorList = S.Array(Validator);
export interface CreateConfigurationProfileRequest {
  ApplicationId: string;
  Name: string;
  Description?: string;
  LocationUri: string;
  RetrievalRoleArn?: string;
  Validators?: Validator[];
  Tags?: { [key: string]: string | undefined };
  Type?: string;
  KmsKeyIdentifier?: string;
}
export const CreateConfigurationProfileRequest = S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    Name: S.String,
    Description: S.optional(S.String),
    LocationUri: S.String,
    RetrievalRoleArn: S.optional(S.String),
    Validators: S.optional(ValidatorList),
    Tags: S.optional(TagMap),
    Type: S.optional(S.String),
    KmsKeyIdentifier: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/applications/{ApplicationId}/configurationprofiles",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateConfigurationProfileRequest",
}) as any as S.Schema<CreateConfigurationProfileRequest>;
export interface ConfigurationProfile {
  ApplicationId?: string;
  Id?: string;
  Name?: string;
  Description?: string;
  LocationUri?: string;
  RetrievalRoleArn?: string;
  Validators?: Validator[];
  Type?: string;
  KmsKeyArn?: string;
  KmsKeyIdentifier?: string;
}
export const ConfigurationProfile = S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    LocationUri: S.optional(S.String),
    RetrievalRoleArn: S.optional(S.String),
    Validators: S.optional(ValidatorList),
    Type: S.optional(S.String),
    KmsKeyArn: S.optional(S.String),
    KmsKeyIdentifier: S.optional(S.String),
  }),
).annotate({
  identifier: "ConfigurationProfile",
}) as any as S.Schema<ConfigurationProfile>;
export type GrowthType = "LINEAR" | "EXPONENTIAL" | (string & {});
export const GrowthType = S.String;
export type ReplicateTo = "NONE" | "SSM_DOCUMENT" | (string & {});
export const ReplicateTo = S.String;
export interface CreateDeploymentStrategyRequest {
  Name: string;
  Description?: string;
  DeploymentDurationInMinutes: number;
  FinalBakeTimeInMinutes?: number;
  GrowthFactor: number;
  GrowthType?: GrowthType;
  ReplicateTo?: ReplicateTo;
  Tags?: { [key: string]: string | undefined };
}
export const CreateDeploymentStrategyRequest = S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    DeploymentDurationInMinutes: S.Number,
    FinalBakeTimeInMinutes: S.optional(S.Number),
    GrowthFactor: S.Number,
    GrowthType: S.optional(GrowthType),
    ReplicateTo: S.optional(ReplicateTo),
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/deploymentstrategies" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDeploymentStrategyRequest",
}) as any as S.Schema<CreateDeploymentStrategyRequest>;
export interface DeploymentStrategy {
  Id?: string;
  Name?: string;
  Description?: string;
  DeploymentDurationInMinutes?: number;
  GrowthType?: GrowthType;
  GrowthFactor?: number;
  FinalBakeTimeInMinutes?: number;
  ReplicateTo?: ReplicateTo;
}
export const DeploymentStrategy = S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    DeploymentDurationInMinutes: S.optional(S.Number),
    GrowthType: S.optional(GrowthType),
    GrowthFactor: S.optional(S.Number),
    FinalBakeTimeInMinutes: S.optional(S.Number),
    ReplicateTo: S.optional(ReplicateTo),
  }),
).annotate({
  identifier: "DeploymentStrategy",
}) as any as S.Schema<DeploymentStrategy>;
export interface Monitor {
  AlarmArn: string;
  AlarmRoleArn?: string;
}
export const Monitor = S.suspend(() =>
  S.Struct({ AlarmArn: S.String, AlarmRoleArn: S.optional(S.String) }),
).annotate({ identifier: "Monitor" }) as any as S.Schema<Monitor>;
export type MonitorList = Monitor[];
export const MonitorList = S.Array(Monitor);
export interface CreateEnvironmentRequest {
  ApplicationId: string;
  Name: string;
  Description?: string;
  Monitors?: Monitor[];
  Tags?: { [key: string]: string | undefined };
}
export const CreateEnvironmentRequest = S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    Name: S.String,
    Description: S.optional(S.String),
    Monitors: S.optional(MonitorList),
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/applications/{ApplicationId}/environments",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEnvironmentRequest",
}) as any as S.Schema<CreateEnvironmentRequest>;
export type EnvironmentState =
  | "READY_FOR_DEPLOYMENT"
  | "DEPLOYING"
  | "ROLLING_BACK"
  | "ROLLED_BACK"
  | "REVERTED"
  | (string & {});
export const EnvironmentState = S.String;
export interface Environment {
  ApplicationId?: string;
  Id?: string;
  Name?: string;
  Description?: string;
  State?: EnvironmentState;
  Monitors?: Monitor[];
}
export const Environment = S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    State: S.optional(EnvironmentState),
    Monitors: S.optional(MonitorList),
  }),
).annotate({ identifier: "Environment" }) as any as S.Schema<Environment>;
export type ActionPoint =
  | "PRE_CREATE_HOSTED_CONFIGURATION_VERSION"
  | "PRE_START_DEPLOYMENT"
  | "AT_DEPLOYMENT_TICK"
  | "ON_DEPLOYMENT_START"
  | "ON_DEPLOYMENT_STEP"
  | "ON_DEPLOYMENT_BAKING"
  | "ON_DEPLOYMENT_COMPLETE"
  | "ON_DEPLOYMENT_ROLLED_BACK"
  | (string & {});
export const ActionPoint = S.String;
export interface Action {
  Name?: string;
  Description?: string;
  Uri?: string;
  RoleArn?: string;
}
export const Action = S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Uri: S.optional(S.String),
    RoleArn: S.optional(S.String),
  }),
).annotate({ identifier: "Action" }) as any as S.Schema<Action>;
export type ActionList = Action[];
export const ActionList = S.Array(Action);
export type ActionsMap = { [key in ActionPoint]?: Action[] };
export const ActionsMap = S.Record(ActionPoint, ActionList.pipe(S.optional));
export interface Parameter {
  Description?: string;
  Required?: boolean;
  Dynamic?: boolean;
}
export const Parameter = S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    Required: S.optional(S.Boolean),
    Dynamic: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Parameter" }) as any as S.Schema<Parameter>;
export type ParameterMap = { [key: string]: Parameter | undefined };
export const ParameterMap = S.Record(S.String, Parameter.pipe(S.optional));
export interface CreateExtensionRequest {
  Name: string;
  Description?: string;
  Actions: { [key: string]: Action[] | undefined };
  Parameters?: { [key: string]: Parameter | undefined };
  Tags?: { [key: string]: string | undefined };
  LatestVersionNumber?: number;
}
export const CreateExtensionRequest = S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    Actions: ActionsMap,
    Parameters: S.optional(ParameterMap),
    Tags: S.optional(TagMap),
    LatestVersionNumber: S.optional(S.Number).pipe(
      T.HttpHeader("Latest-Version-Number"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/extensions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateExtensionRequest",
}) as any as S.Schema<CreateExtensionRequest>;
export interface Extension {
  Id?: string;
  Name?: string;
  VersionNumber?: number;
  Arn?: string;
  Description?: string;
  Actions?: { [key: string]: Action[] | undefined };
  Parameters?: { [key: string]: Parameter | undefined };
}
export const Extension = S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    VersionNumber: S.optional(S.Number),
    Arn: S.optional(S.String),
    Description: S.optional(S.String),
    Actions: S.optional(ActionsMap),
    Parameters: S.optional(ParameterMap),
  }),
).annotate({ identifier: "Extension" }) as any as S.Schema<Extension>;
export type ParameterValueMap = { [key: string]: string | undefined };
export const ParameterValueMap = S.Record(S.String, S.String.pipe(S.optional));
export interface CreateExtensionAssociationRequest {
  ExtensionIdentifier: string;
  ExtensionVersionNumber?: number;
  ResourceIdentifier: string;
  Parameters?: { [key: string]: string | undefined };
  Tags?: { [key: string]: string | undefined };
}
export const CreateExtensionAssociationRequest = S.suspend(() =>
  S.Struct({
    ExtensionIdentifier: S.String,
    ExtensionVersionNumber: S.optional(S.Number),
    ResourceIdentifier: S.String,
    Parameters: S.optional(ParameterValueMap),
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/extensionassociations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateExtensionAssociationRequest",
}) as any as S.Schema<CreateExtensionAssociationRequest>;
export interface ExtensionAssociation {
  Id?: string;
  ExtensionArn?: string;
  ResourceArn?: string;
  Arn?: string;
  Parameters?: { [key: string]: string | undefined };
  ExtensionVersionNumber?: number;
}
export const ExtensionAssociation = S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    ExtensionArn: S.optional(S.String),
    ResourceArn: S.optional(S.String),
    Arn: S.optional(S.String),
    Parameters: S.optional(ParameterValueMap),
    ExtensionVersionNumber: S.optional(S.Number),
  }),
).annotate({
  identifier: "ExtensionAssociation",
}) as any as S.Schema<ExtensionAssociation>;
export interface CreateHostedConfigurationVersionRequest {
  ApplicationId: string;
  ConfigurationProfileId: string;
  Description?: string;
  Content: T.StreamingInputBody;
  ContentType: string;
  LatestVersionNumber?: number;
  VersionLabel?: string;
}
export const CreateHostedConfigurationVersionRequest = S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    ConfigurationProfileId: S.String.pipe(
      T.HttpLabel("ConfigurationProfileId"),
    ),
    Description: S.optional(S.String).pipe(T.HttpHeader("Description")),
    Content: T.StreamingInput.pipe(T.HttpPayload()),
    ContentType: S.String.pipe(T.HttpHeader("Content-Type")),
    LatestVersionNumber: S.optional(S.Number).pipe(
      T.HttpHeader("Latest-Version-Number"),
    ),
    VersionLabel: S.optional(S.String).pipe(T.HttpHeader("VersionLabel")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}/hostedconfigurationversions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateHostedConfigurationVersionRequest",
}) as any as S.Schema<CreateHostedConfigurationVersionRequest>;
export interface HostedConfigurationVersion {
  ApplicationId?: string;
  ConfigurationProfileId?: string;
  VersionNumber?: number;
  Description?: string;
  Content?: T.StreamingOutputBody;
  ContentType?: string;
  VersionLabel?: string;
  KmsKeyArn?: string;
}
export const HostedConfigurationVersion = S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String).pipe(T.HttpHeader("Application-Id")),
    ConfigurationProfileId: S.optional(S.String).pipe(
      T.HttpHeader("Configuration-Profile-Id"),
    ),
    VersionNumber: S.optional(S.Number).pipe(T.HttpHeader("Version-Number")),
    Description: S.optional(S.String).pipe(T.HttpHeader("Description")),
    Content: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
    ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
    VersionLabel: S.optional(S.String).pipe(T.HttpHeader("VersionLabel")),
    KmsKeyArn: S.optional(S.String).pipe(T.HttpHeader("KmsKeyArn")),
  }),
).annotate({
  identifier: "HostedConfigurationVersion",
}) as any as S.Schema<HostedConfigurationVersion>;
export type BytesMeasure = "KILOBYTES" | (string & {});
export const BytesMeasure = S.String;
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
export type DeletionProtectionCheck =
  | "ACCOUNT_DEFAULT"
  | "APPLY"
  | "BYPASS"
  | (string & {});
export const DeletionProtectionCheck = S.String;
export interface DeleteConfigurationProfileRequest {
  ApplicationId: string;
  ConfigurationProfileId: string;
  DeletionProtectionCheck?: DeletionProtectionCheck;
}
export const DeleteConfigurationProfileRequest = S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    ConfigurationProfileId: S.String.pipe(
      T.HttpLabel("ConfigurationProfileId"),
    ),
    DeletionProtectionCheck: S.optional(DeletionProtectionCheck).pipe(
      T.HttpHeader("x-amzn-deletion-protection-check"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteConfigurationProfileRequest",
}) as any as S.Schema<DeleteConfigurationProfileRequest>;
export interface DeleteConfigurationProfileResponse {}
export const DeleteConfigurationProfileResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteConfigurationProfileResponse",
}) as any as S.Schema<DeleteConfigurationProfileResponse>;
export interface DeleteDeploymentStrategyRequest {
  DeploymentStrategyId: string;
}
export const DeleteDeploymentStrategyRequest = S.suspend(() =>
  S.Struct({
    DeploymentStrategyId: S.String.pipe(T.HttpLabel("DeploymentStrategyId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/deployementstrategies/{DeploymentStrategyId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDeploymentStrategyRequest",
}) as any as S.Schema<DeleteDeploymentStrategyRequest>;
export interface DeleteDeploymentStrategyResponse {}
export const DeleteDeploymentStrategyResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDeploymentStrategyResponse",
}) as any as S.Schema<DeleteDeploymentStrategyResponse>;
export interface DeleteEnvironmentRequest {
  EnvironmentId: string;
  ApplicationId: string;
  DeletionProtectionCheck?: DeletionProtectionCheck;
}
export const DeleteEnvironmentRequest = S.suspend(() =>
  S.Struct({
    EnvironmentId: S.String.pipe(T.HttpLabel("EnvironmentId")),
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    DeletionProtectionCheck: S.optional(DeletionProtectionCheck).pipe(
      T.HttpHeader("x-amzn-deletion-protection-check"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/applications/{ApplicationId}/environments/{EnvironmentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEnvironmentRequest",
}) as any as S.Schema<DeleteEnvironmentRequest>;
export interface DeleteEnvironmentResponse {}
export const DeleteEnvironmentResponse = S.suspend(() => S.Struct({})).annotate(
  { identifier: "DeleteEnvironmentResponse" },
) as any as S.Schema<DeleteEnvironmentResponse>;
export interface DeleteExtensionRequest {
  ExtensionIdentifier: string;
  VersionNumber?: number;
}
export const DeleteExtensionRequest = S.suspend(() =>
  S.Struct({
    ExtensionIdentifier: S.String.pipe(T.HttpLabel("ExtensionIdentifier")),
    VersionNumber: S.optional(S.Number).pipe(T.HttpQuery("version")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/extensions/{ExtensionIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteExtensionRequest",
}) as any as S.Schema<DeleteExtensionRequest>;
export interface DeleteExtensionResponse {}
export const DeleteExtensionResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteExtensionResponse",
}) as any as S.Schema<DeleteExtensionResponse>;
export interface DeleteExtensionAssociationRequest {
  ExtensionAssociationId: string;
}
export const DeleteExtensionAssociationRequest = S.suspend(() =>
  S.Struct({
    ExtensionAssociationId: S.String.pipe(
      T.HttpLabel("ExtensionAssociationId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/extensionassociations/{ExtensionAssociationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteExtensionAssociationRequest",
}) as any as S.Schema<DeleteExtensionAssociationRequest>;
export interface DeleteExtensionAssociationResponse {}
export const DeleteExtensionAssociationResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteExtensionAssociationResponse",
}) as any as S.Schema<DeleteExtensionAssociationResponse>;
export interface DeleteHostedConfigurationVersionRequest {
  ApplicationId: string;
  ConfigurationProfileId: string;
  VersionNumber: number;
}
export const DeleteHostedConfigurationVersionRequest = S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    ConfigurationProfileId: S.String.pipe(
      T.HttpLabel("ConfigurationProfileId"),
    ),
    VersionNumber: S.Number.pipe(T.HttpLabel("VersionNumber")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}/hostedconfigurationversions/{VersionNumber}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteHostedConfigurationVersionRequest",
}) as any as S.Schema<DeleteHostedConfigurationVersionRequest>;
export interface DeleteHostedConfigurationVersionResponse {}
export const DeleteHostedConfigurationVersionResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteHostedConfigurationVersionResponse",
}) as any as S.Schema<DeleteHostedConfigurationVersionResponse>;
export interface GetAccountSettingsRequest {}
export const GetAccountSettingsRequest = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetAccountSettingsRequest",
}) as any as S.Schema<GetAccountSettingsRequest>;
export interface DeletionProtectionSettings {
  Enabled?: boolean;
  ProtectionPeriodInMinutes?: number;
}
export const DeletionProtectionSettings = S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    ProtectionPeriodInMinutes: S.optional(S.Number),
  }),
).annotate({
  identifier: "DeletionProtectionSettings",
}) as any as S.Schema<DeletionProtectionSettings>;
export interface AccountSettings {
  DeletionProtection?: DeletionProtectionSettings;
}
export const AccountSettings = S.suspend(() =>
  S.Struct({ DeletionProtection: S.optional(DeletionProtectionSettings) }),
).annotate({
  identifier: "AccountSettings",
}) as any as S.Schema<AccountSettings>;
export interface GetApplicationRequest {
  ApplicationId: string;
}
export const GetApplicationRequest = S.suspend(() =>
  S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
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
export interface GetConfigurationRequest {
  Application: string;
  Environment: string;
  Configuration: string;
  ClientId: string;
  ClientConfigurationVersion?: string;
}
export const GetConfigurationRequest = S.suspend(() =>
  S.Struct({
    Application: S.String.pipe(T.HttpLabel("Application")),
    Environment: S.String.pipe(T.HttpLabel("Environment")),
    Configuration: S.String.pipe(T.HttpLabel("Configuration")),
    ClientId: S.String.pipe(T.HttpQuery("client_id")),
    ClientConfigurationVersion: S.optional(S.String).pipe(
      T.HttpQuery("client_configuration_version"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{Application}/environments/{Environment}/configurations/{Configuration}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConfigurationRequest",
}) as any as S.Schema<GetConfigurationRequest>;
export interface Configuration {
  Content?: T.StreamingOutputBody;
  ConfigurationVersion?: string;
  ContentType?: string;
}
export const Configuration = S.suspend(() =>
  S.Struct({
    Content: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
    ConfigurationVersion: S.optional(S.String).pipe(
      T.HttpHeader("Configuration-Version"),
    ),
    ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
  }),
).annotate({ identifier: "Configuration" }) as any as S.Schema<Configuration>;
export interface GetConfigurationProfileRequest {
  ApplicationId: string;
  ConfigurationProfileId: string;
}
export const GetConfigurationProfileRequest = S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    ConfigurationProfileId: S.String.pipe(
      T.HttpLabel("ConfigurationProfileId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConfigurationProfileRequest",
}) as any as S.Schema<GetConfigurationProfileRequest>;
export interface GetDeploymentRequest {
  ApplicationId: string;
  EnvironmentId: string;
  DeploymentNumber: number;
}
export const GetDeploymentRequest = S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    EnvironmentId: S.String.pipe(T.HttpLabel("EnvironmentId")),
    DeploymentNumber: S.Number.pipe(T.HttpLabel("DeploymentNumber")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{ApplicationId}/environments/{EnvironmentId}/deployments/{DeploymentNumber}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDeploymentRequest",
}) as any as S.Schema<GetDeploymentRequest>;
export type DeploymentState =
  | "BAKING"
  | "VALIDATING"
  | "DEPLOYING"
  | "COMPLETE"
  | "ROLLING_BACK"
  | "ROLLED_BACK"
  | "REVERTED"
  | (string & {});
export const DeploymentState = S.String;
export type DeploymentEventType =
  | "PERCENTAGE_UPDATED"
  | "ROLLBACK_STARTED"
  | "ROLLBACK_COMPLETED"
  | "BAKE_TIME_STARTED"
  | "DEPLOYMENT_STARTED"
  | "DEPLOYMENT_COMPLETED"
  | "REVERT_COMPLETED"
  | (string & {});
export const DeploymentEventType = S.String;
export type TriggeredBy =
  | "USER"
  | "APPCONFIG"
  | "CLOUDWATCH_ALARM"
  | "INTERNAL_ERROR"
  | (string & {});
export const TriggeredBy = S.String;
export interface ActionInvocation {
  ExtensionIdentifier?: string;
  ActionName?: string;
  Uri?: string;
  RoleArn?: string;
  ErrorMessage?: string;
  ErrorCode?: string;
  InvocationId?: string;
}
export const ActionInvocation = S.suspend(() =>
  S.Struct({
    ExtensionIdentifier: S.optional(S.String),
    ActionName: S.optional(S.String),
    Uri: S.optional(S.String),
    RoleArn: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
    ErrorCode: S.optional(S.String),
    InvocationId: S.optional(S.String),
  }),
).annotate({
  identifier: "ActionInvocation",
}) as any as S.Schema<ActionInvocation>;
export type ActionInvocations = ActionInvocation[];
export const ActionInvocations = S.Array(ActionInvocation);
export interface DeploymentEvent {
  EventType?: DeploymentEventType;
  TriggeredBy?: TriggeredBy;
  Description?: string;
  ActionInvocations?: ActionInvocation[];
  OccurredAt?: Date;
}
export const DeploymentEvent = S.suspend(() =>
  S.Struct({
    EventType: S.optional(DeploymentEventType),
    TriggeredBy: S.optional(TriggeredBy),
    Description: S.optional(S.String),
    ActionInvocations: S.optional(ActionInvocations),
    OccurredAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "DeploymentEvent",
}) as any as S.Schema<DeploymentEvent>;
export type DeploymentEvents = DeploymentEvent[];
export const DeploymentEvents = S.Array(DeploymentEvent);
export interface AppliedExtension {
  ExtensionId?: string;
  ExtensionAssociationId?: string;
  VersionNumber?: number;
  Parameters?: { [key: string]: string | undefined };
}
export const AppliedExtension = S.suspend(() =>
  S.Struct({
    ExtensionId: S.optional(S.String),
    ExtensionAssociationId: S.optional(S.String),
    VersionNumber: S.optional(S.Number),
    Parameters: S.optional(ParameterValueMap),
  }),
).annotate({
  identifier: "AppliedExtension",
}) as any as S.Schema<AppliedExtension>;
export type AppliedExtensions = AppliedExtension[];
export const AppliedExtensions = S.Array(AppliedExtension);
export interface Deployment {
  ApplicationId?: string;
  EnvironmentId?: string;
  DeploymentStrategyId?: string;
  ConfigurationProfileId?: string;
  DeploymentNumber?: number;
  ConfigurationName?: string;
  ConfigurationLocationUri?: string;
  ConfigurationVersion?: string;
  Description?: string;
  DeploymentDurationInMinutes?: number;
  GrowthType?: GrowthType;
  GrowthFactor?: number;
  FinalBakeTimeInMinutes?: number;
  State?: DeploymentState;
  EventLog?: DeploymentEvent[];
  PercentageComplete?: number;
  StartedAt?: Date;
  CompletedAt?: Date;
  AppliedExtensions?: AppliedExtension[];
  KmsKeyArn?: string;
  KmsKeyIdentifier?: string;
  VersionLabel?: string;
}
export const Deployment = S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    EnvironmentId: S.optional(S.String),
    DeploymentStrategyId: S.optional(S.String),
    ConfigurationProfileId: S.optional(S.String),
    DeploymentNumber: S.optional(S.Number),
    ConfigurationName: S.optional(S.String),
    ConfigurationLocationUri: S.optional(S.String),
    ConfigurationVersion: S.optional(S.String),
    Description: S.optional(S.String),
    DeploymentDurationInMinutes: S.optional(S.Number),
    GrowthType: S.optional(GrowthType),
    GrowthFactor: S.optional(S.Number),
    FinalBakeTimeInMinutes: S.optional(S.Number),
    State: S.optional(DeploymentState),
    EventLog: S.optional(DeploymentEvents),
    PercentageComplete: S.optional(S.Number),
    StartedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    CompletedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    AppliedExtensions: S.optional(AppliedExtensions),
    KmsKeyArn: S.optional(S.String),
    KmsKeyIdentifier: S.optional(S.String),
    VersionLabel: S.optional(S.String),
  }),
).annotate({ identifier: "Deployment" }) as any as S.Schema<Deployment>;
export interface GetDeploymentStrategyRequest {
  DeploymentStrategyId: string;
}
export const GetDeploymentStrategyRequest = S.suspend(() =>
  S.Struct({
    DeploymentStrategyId: S.String.pipe(T.HttpLabel("DeploymentStrategyId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/deploymentstrategies/{DeploymentStrategyId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDeploymentStrategyRequest",
}) as any as S.Schema<GetDeploymentStrategyRequest>;
export interface GetEnvironmentRequest {
  ApplicationId: string;
  EnvironmentId: string;
}
export const GetEnvironmentRequest = S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    EnvironmentId: S.String.pipe(T.HttpLabel("EnvironmentId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{ApplicationId}/environments/{EnvironmentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEnvironmentRequest",
}) as any as S.Schema<GetEnvironmentRequest>;
export interface GetExtensionRequest {
  ExtensionIdentifier: string;
  VersionNumber?: number;
}
export const GetExtensionRequest = S.suspend(() =>
  S.Struct({
    ExtensionIdentifier: S.String.pipe(T.HttpLabel("ExtensionIdentifier")),
    VersionNumber: S.optional(S.Number).pipe(T.HttpQuery("version_number")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/extensions/{ExtensionIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetExtensionRequest",
}) as any as S.Schema<GetExtensionRequest>;
export interface GetExtensionAssociationRequest {
  ExtensionAssociationId: string;
}
export const GetExtensionAssociationRequest = S.suspend(() =>
  S.Struct({
    ExtensionAssociationId: S.String.pipe(
      T.HttpLabel("ExtensionAssociationId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/extensionassociations/{ExtensionAssociationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetExtensionAssociationRequest",
}) as any as S.Schema<GetExtensionAssociationRequest>;
export interface GetHostedConfigurationVersionRequest {
  ApplicationId: string;
  ConfigurationProfileId: string;
  VersionNumber: number;
}
export const GetHostedConfigurationVersionRequest = S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    ConfigurationProfileId: S.String.pipe(
      T.HttpLabel("ConfigurationProfileId"),
    ),
    VersionNumber: S.Number.pipe(T.HttpLabel("VersionNumber")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}/hostedconfigurationversions/{VersionNumber}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetHostedConfigurationVersionRequest",
}) as any as S.Schema<GetHostedConfigurationVersionRequest>;
export interface ListApplicationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListApplicationsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
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
export type ApplicationList = Application[];
export const ApplicationList = S.Array(Application);
export interface Applications {
  Items?: Application[];
  NextToken?: string;
}
export const Applications = S.suspend(() =>
  S.Struct({
    Items: S.optional(ApplicationList),
    NextToken: S.optional(S.String),
  }),
).annotate({ identifier: "Applications" }) as any as S.Schema<Applications>;
export interface ListConfigurationProfilesRequest {
  ApplicationId: string;
  MaxResults?: number;
  NextToken?: string;
  Type?: string;
}
export const ListConfigurationProfilesRequest = S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
    Type: S.optional(S.String).pipe(T.HttpQuery("type")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{ApplicationId}/configurationprofiles",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListConfigurationProfilesRequest",
}) as any as S.Schema<ListConfigurationProfilesRequest>;
export type ValidatorTypeList = ValidatorType[];
export const ValidatorTypeList = S.Array(ValidatorType);
export interface ConfigurationProfileSummary {
  ApplicationId?: string;
  Id?: string;
  Name?: string;
  LocationUri?: string;
  ValidatorTypes?: ValidatorType[];
  Type?: string;
}
export const ConfigurationProfileSummary = S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    LocationUri: S.optional(S.String),
    ValidatorTypes: S.optional(ValidatorTypeList),
    Type: S.optional(S.String),
  }),
).annotate({
  identifier: "ConfigurationProfileSummary",
}) as any as S.Schema<ConfigurationProfileSummary>;
export type ConfigurationProfileSummaryList = ConfigurationProfileSummary[];
export const ConfigurationProfileSummaryList = S.Array(
  ConfigurationProfileSummary,
);
export interface ConfigurationProfiles {
  Items?: ConfigurationProfileSummary[];
  NextToken?: string;
}
export const ConfigurationProfiles = S.suspend(() =>
  S.Struct({
    Items: S.optional(ConfigurationProfileSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ConfigurationProfiles",
}) as any as S.Schema<ConfigurationProfiles>;
export interface ListDeploymentsRequest {
  ApplicationId: string;
  EnvironmentId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListDeploymentsRequest = S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    EnvironmentId: S.String.pipe(T.HttpLabel("EnvironmentId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{ApplicationId}/environments/{EnvironmentId}/deployments",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDeploymentsRequest",
}) as any as S.Schema<ListDeploymentsRequest>;
export interface DeploymentSummary {
  DeploymentNumber?: number;
  ConfigurationName?: string;
  ConfigurationVersion?: string;
  DeploymentDurationInMinutes?: number;
  GrowthType?: GrowthType;
  GrowthFactor?: number;
  FinalBakeTimeInMinutes?: number;
  State?: DeploymentState;
  PercentageComplete?: number;
  StartedAt?: Date;
  CompletedAt?: Date;
  VersionLabel?: string;
}
export const DeploymentSummary = S.suspend(() =>
  S.Struct({
    DeploymentNumber: S.optional(S.Number),
    ConfigurationName: S.optional(S.String),
    ConfigurationVersion: S.optional(S.String),
    DeploymentDurationInMinutes: S.optional(S.Number),
    GrowthType: S.optional(GrowthType),
    GrowthFactor: S.optional(S.Number),
    FinalBakeTimeInMinutes: S.optional(S.Number),
    State: S.optional(DeploymentState),
    PercentageComplete: S.optional(S.Number),
    StartedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    CompletedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    VersionLabel: S.optional(S.String),
  }),
).annotate({
  identifier: "DeploymentSummary",
}) as any as S.Schema<DeploymentSummary>;
export type DeploymentList = DeploymentSummary[];
export const DeploymentList = S.Array(DeploymentSummary);
export interface Deployments {
  Items?: DeploymentSummary[];
  NextToken?: string;
}
export const Deployments = S.suspend(() =>
  S.Struct({
    Items: S.optional(DeploymentList),
    NextToken: S.optional(S.String),
  }),
).annotate({ identifier: "Deployments" }) as any as S.Schema<Deployments>;
export interface ListDeploymentStrategiesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListDeploymentStrategiesRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/deploymentstrategies" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDeploymentStrategiesRequest",
}) as any as S.Schema<ListDeploymentStrategiesRequest>;
export type DeploymentStrategyList = DeploymentStrategy[];
export const DeploymentStrategyList = S.Array(DeploymentStrategy);
export interface DeploymentStrategies {
  Items?: DeploymentStrategy[];
  NextToken?: string;
}
export const DeploymentStrategies = S.suspend(() =>
  S.Struct({
    Items: S.optional(DeploymentStrategyList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DeploymentStrategies",
}) as any as S.Schema<DeploymentStrategies>;
export interface ListEnvironmentsRequest {
  ApplicationId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListEnvironmentsRequest = S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{ApplicationId}/environments",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEnvironmentsRequest",
}) as any as S.Schema<ListEnvironmentsRequest>;
export type EnvironmentList = Environment[];
export const EnvironmentList = S.Array(Environment);
export interface Environments {
  Items?: Environment[];
  NextToken?: string;
}
export const Environments = S.suspend(() =>
  S.Struct({
    Items: S.optional(EnvironmentList),
    NextToken: S.optional(S.String),
  }),
).annotate({ identifier: "Environments" }) as any as S.Schema<Environments>;
export interface ListExtensionAssociationsRequest {
  ResourceIdentifier?: string;
  ExtensionIdentifier?: string;
  ExtensionVersionNumber?: number;
  MaxResults?: number;
  NextToken?: string;
}
export const ListExtensionAssociationsRequest = S.suspend(() =>
  S.Struct({
    ResourceIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("resource_identifier"),
    ),
    ExtensionIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("extension_identifier"),
    ),
    ExtensionVersionNumber: S.optional(S.Number).pipe(
      T.HttpQuery("extension_version_number"),
    ),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/extensionassociations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListExtensionAssociationsRequest",
}) as any as S.Schema<ListExtensionAssociationsRequest>;
export interface ExtensionAssociationSummary {
  Id?: string;
  ExtensionArn?: string;
  ResourceArn?: string;
}
export const ExtensionAssociationSummary = S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    ExtensionArn: S.optional(S.String),
    ResourceArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ExtensionAssociationSummary",
}) as any as S.Schema<ExtensionAssociationSummary>;
export type ExtensionAssociationSummaries = ExtensionAssociationSummary[];
export const ExtensionAssociationSummaries = S.Array(
  ExtensionAssociationSummary,
);
export interface ExtensionAssociations {
  Items?: ExtensionAssociationSummary[];
  NextToken?: string;
}
export const ExtensionAssociations = S.suspend(() =>
  S.Struct({
    Items: S.optional(ExtensionAssociationSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ExtensionAssociations",
}) as any as S.Schema<ExtensionAssociations>;
export interface ListExtensionsRequest {
  MaxResults?: number;
  NextToken?: string;
  Name?: string;
}
export const ListExtensionsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
    Name: S.optional(S.String).pipe(T.HttpQuery("name")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/extensions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListExtensionsRequest",
}) as any as S.Schema<ListExtensionsRequest>;
export interface ExtensionSummary {
  Id?: string;
  Name?: string;
  VersionNumber?: number;
  Arn?: string;
  Description?: string;
}
export const ExtensionSummary = S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    VersionNumber: S.optional(S.Number),
    Arn: S.optional(S.String),
    Description: S.optional(S.String),
  }),
).annotate({
  identifier: "ExtensionSummary",
}) as any as S.Schema<ExtensionSummary>;
export type ExtensionSummaries = ExtensionSummary[];
export const ExtensionSummaries = S.Array(ExtensionSummary);
export interface Extensions {
  Items?: ExtensionSummary[];
  NextToken?: string;
}
export const Extensions = S.suspend(() =>
  S.Struct({
    Items: S.optional(ExtensionSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({ identifier: "Extensions" }) as any as S.Schema<Extensions>;
export interface ListHostedConfigurationVersionsRequest {
  ApplicationId: string;
  ConfigurationProfileId: string;
  MaxResults?: number;
  NextToken?: string;
  VersionLabel?: string;
}
export const ListHostedConfigurationVersionsRequest = S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    ConfigurationProfileId: S.String.pipe(
      T.HttpLabel("ConfigurationProfileId"),
    ),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
    VersionLabel: S.optional(S.String).pipe(T.HttpQuery("version_label")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}/hostedconfigurationversions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListHostedConfigurationVersionsRequest",
}) as any as S.Schema<ListHostedConfigurationVersionsRequest>;
export interface HostedConfigurationVersionSummary {
  ApplicationId?: string;
  ConfigurationProfileId?: string;
  VersionNumber?: number;
  Description?: string;
  ContentType?: string;
  VersionLabel?: string;
  KmsKeyArn?: string;
}
export const HostedConfigurationVersionSummary = S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    ConfigurationProfileId: S.optional(S.String),
    VersionNumber: S.optional(S.Number),
    Description: S.optional(S.String),
    ContentType: S.optional(S.String),
    VersionLabel: S.optional(S.String),
    KmsKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "HostedConfigurationVersionSummary",
}) as any as S.Schema<HostedConfigurationVersionSummary>;
export type HostedConfigurationVersionSummaryList =
  HostedConfigurationVersionSummary[];
export const HostedConfigurationVersionSummaryList = S.Array(
  HostedConfigurationVersionSummary,
);
export interface HostedConfigurationVersions {
  Items?: HostedConfigurationVersionSummary[];
  NextToken?: string;
}
export const HostedConfigurationVersions = S.suspend(() =>
  S.Struct({
    Items: S.optional(HostedConfigurationVersionSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "HostedConfigurationVersions",
}) as any as S.Schema<HostedConfigurationVersions>;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ResourceTags {
  Tags?: { [key: string]: string | undefined };
}
export const ResourceTags = S.suspend(() =>
  S.Struct({ Tags: S.optional(TagMap) }),
).annotate({ identifier: "ResourceTags" }) as any as S.Schema<ResourceTags>;
export type DynamicParameterMap = { [key: string]: string | undefined };
export const DynamicParameterMap = S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface StartDeploymentRequest {
  ApplicationId: string;
  EnvironmentId: string;
  DeploymentStrategyId: string;
  ConfigurationProfileId: string;
  ConfigurationVersion: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
  KmsKeyIdentifier?: string;
  DynamicExtensionParameters?: { [key: string]: string | undefined };
}
export const StartDeploymentRequest = S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    EnvironmentId: S.String.pipe(T.HttpLabel("EnvironmentId")),
    DeploymentStrategyId: S.String,
    ConfigurationProfileId: S.String,
    ConfigurationVersion: S.String,
    Description: S.optional(S.String),
    Tags: S.optional(TagMap),
    KmsKeyIdentifier: S.optional(S.String),
    DynamicExtensionParameters: S.optional(DynamicParameterMap),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/applications/{ApplicationId}/environments/{EnvironmentId}/deployments",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartDeploymentRequest",
}) as any as S.Schema<StartDeploymentRequest>;
export interface StopDeploymentRequest {
  ApplicationId: string;
  EnvironmentId: string;
  DeploymentNumber: number;
  AllowRevert?: boolean;
}
export const StopDeploymentRequest = S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    EnvironmentId: S.String.pipe(T.HttpLabel("EnvironmentId")),
    DeploymentNumber: S.Number.pipe(T.HttpLabel("DeploymentNumber")),
    AllowRevert: S.optional(S.Boolean).pipe(T.HttpHeader("Allow-Revert")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/applications/{ApplicationId}/environments/{EnvironmentId}/deployments/{DeploymentNumber}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopDeploymentRequest",
}) as any as S.Schema<StopDeploymentRequest>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: TagMap,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
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
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateAccountSettingsRequest {
  DeletionProtection?: DeletionProtectionSettings;
}
export const UpdateAccountSettingsRequest = S.suspend(() =>
  S.Struct({ DeletionProtection: S.optional(DeletionProtectionSettings) }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/settings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAccountSettingsRequest",
}) as any as S.Schema<UpdateAccountSettingsRequest>;
export interface UpdateApplicationRequest {
  ApplicationId: string;
  Name?: string;
  Description?: string;
}
export const UpdateApplicationRequest = S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
  }).pipe(
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
export interface UpdateConfigurationProfileRequest {
  ApplicationId: string;
  ConfigurationProfileId: string;
  Name?: string;
  Description?: string;
  RetrievalRoleArn?: string;
  Validators?: Validator[];
  KmsKeyIdentifier?: string;
}
export const UpdateConfigurationProfileRequest = S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    ConfigurationProfileId: S.String.pipe(
      T.HttpLabel("ConfigurationProfileId"),
    ),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    RetrievalRoleArn: S.optional(S.String),
    Validators: S.optional(ValidatorList),
    KmsKeyIdentifier: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateConfigurationProfileRequest",
}) as any as S.Schema<UpdateConfigurationProfileRequest>;
export interface UpdateDeploymentStrategyRequest {
  DeploymentStrategyId: string;
  Description?: string;
  DeploymentDurationInMinutes?: number;
  FinalBakeTimeInMinutes?: number;
  GrowthFactor?: number;
  GrowthType?: GrowthType;
}
export const UpdateDeploymentStrategyRequest = S.suspend(() =>
  S.Struct({
    DeploymentStrategyId: S.String.pipe(T.HttpLabel("DeploymentStrategyId")),
    Description: S.optional(S.String),
    DeploymentDurationInMinutes: S.optional(S.Number),
    FinalBakeTimeInMinutes: S.optional(S.Number),
    GrowthFactor: S.optional(S.Number),
    GrowthType: S.optional(GrowthType),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/deploymentstrategies/{DeploymentStrategyId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDeploymentStrategyRequest",
}) as any as S.Schema<UpdateDeploymentStrategyRequest>;
export interface UpdateEnvironmentRequest {
  ApplicationId: string;
  EnvironmentId: string;
  Name?: string;
  Description?: string;
  Monitors?: Monitor[];
}
export const UpdateEnvironmentRequest = S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    EnvironmentId: S.String.pipe(T.HttpLabel("EnvironmentId")),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Monitors: S.optional(MonitorList),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/applications/{ApplicationId}/environments/{EnvironmentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateEnvironmentRequest",
}) as any as S.Schema<UpdateEnvironmentRequest>;
export interface UpdateExtensionRequest {
  ExtensionIdentifier: string;
  Description?: string;
  Actions?: { [key: string]: Action[] | undefined };
  Parameters?: { [key: string]: Parameter | undefined };
  VersionNumber?: number;
}
export const UpdateExtensionRequest = S.suspend(() =>
  S.Struct({
    ExtensionIdentifier: S.String.pipe(T.HttpLabel("ExtensionIdentifier")),
    Description: S.optional(S.String),
    Actions: S.optional(ActionsMap),
    Parameters: S.optional(ParameterMap),
    VersionNumber: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/extensions/{ExtensionIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateExtensionRequest",
}) as any as S.Schema<UpdateExtensionRequest>;
export interface UpdateExtensionAssociationRequest {
  ExtensionAssociationId: string;
  Parameters?: { [key: string]: string | undefined };
}
export const UpdateExtensionAssociationRequest = S.suspend(() =>
  S.Struct({
    ExtensionAssociationId: S.String.pipe(
      T.HttpLabel("ExtensionAssociationId"),
    ),
    Parameters: S.optional(ParameterValueMap),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/extensionassociations/{ExtensionAssociationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateExtensionAssociationRequest",
}) as any as S.Schema<UpdateExtensionAssociationRequest>;
export interface ValidateConfigurationRequest {
  ApplicationId: string;
  ConfigurationProfileId: string;
  ConfigurationVersion: string;
}
export const ValidateConfigurationRequest = S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    ConfigurationProfileId: S.String.pipe(
      T.HttpLabel("ConfigurationProfileId"),
    ),
    ConfigurationVersion: S.String.pipe(T.HttpQuery("configuration_version")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}/validators",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ValidateConfigurationRequest",
}) as any as S.Schema<ValidateConfigurationRequest>;
export interface ValidateConfigurationResponse {}
export const ValidateConfigurationResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ValidateConfigurationResponse",
}) as any as S.Schema<ValidateConfigurationResponse>;

//# Errors
export class BadRequestException extends S.TaggedErrorClass<BadRequestException>()(
  "BadRequestException",
  {
    Message: S.optional(S.String),
    Reason: S.optional(BadRequestReason),
    Details: S.optional(BadRequestDetails),
  },
).pipe(C.withBadRequestError) {}
export class InternalServerException extends S.TaggedErrorClass<InternalServerException>()(
  "InternalServerException",
  { Message: S.optional(S.String) },
).pipe(C.withServerError) {}
export class ServiceQuotaExceededException extends S.TaggedErrorClass<ServiceQuotaExceededException>()(
  "ServiceQuotaExceededException",
  { Message: S.optional(S.String) },
).pipe(C.withQuotaError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { Message: S.optional(S.String), ResourceName: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  { Message: S.optional(S.String) },
).pipe(C.withConflictError) {}
export class PayloadTooLargeException extends S.TaggedErrorClass<PayloadTooLargeException>()(
  "PayloadTooLargeException",
  {
    Message: S.optional(S.String),
    Measure: S.optional(BytesMeasure),
    Limit: S.optional(S.Number),
    Size: S.optional(S.Number),
  },
).pipe(C.withBadRequestError) {}

//# Operations
/**
 * Creates an application. In AppConfig, an application is simply an
 * organizational construct like a folder. This organizational construct has a relationship
 * with some unit of executable code. For example, you could create an application called
 * MyMobileApp to organize and manage configuration data for a mobile application installed by
 * your users.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  Application,
  | BadRequestException
  | InternalServerException
  | ServiceQuotaExceededException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateApplicationRequest,
  output: Application,
  errors: [
    BadRequestException,
    InternalServerException,
    ServiceQuotaExceededException,
  ],
}));
/**
 * Creates a configuration profile, which is information that enables AppConfig
 * to access the configuration source. Valid configuration sources include the
 * following:
 *
 * - Configuration data in YAML, JSON, and other formats stored in the AppConfig hosted configuration store
 *
 * - Configuration data stored as objects in an Amazon Simple Storage Service (Amazon S3)
 * bucket
 *
 * - Pipelines stored in CodePipeline
 *
 * - Secrets stored in Secrets Manager
 *
 * - Standard and secure string parameters stored in Amazon Web Services Systems Manager Parameter Store
 *
 * - Configuration data in SSM documents stored in the Systems Manager document store
 *
 * A configuration profile includes the following information:
 *
 * - The URI location of the configuration data.
 *
 * - The Identity and Access Management (IAM) role that provides access to the configuration data.
 *
 * - A validator for the configuration data. Available validators include either a JSON
 * Schema or an Amazon Web Services Lambda function.
 *
 * For more information, see Create a
 * Configuration and a Configuration Profile in the AppConfig
 * User Guide.
 */
export const createConfigurationProfile: API.OperationMethod<
  CreateConfigurationProfileRequest,
  ConfigurationProfile,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateConfigurationProfileRequest,
  output: ConfigurationProfile,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
}));
/**
 * Creates a deployment strategy that defines important criteria for rolling out your
 * configuration to the designated targets. A deployment strategy includes the overall
 * duration required, a percentage of targets to receive the deployment during each interval,
 * an algorithm that defines how percentage grows, and bake time.
 */
export const createDeploymentStrategy: API.OperationMethod<
  CreateDeploymentStrategyRequest,
  DeploymentStrategy,
  | BadRequestException
  | InternalServerException
  | ServiceQuotaExceededException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateDeploymentStrategyRequest,
  output: DeploymentStrategy,
  errors: [
    BadRequestException,
    InternalServerException,
    ServiceQuotaExceededException,
  ],
}));
/**
 * Creates an environment. For each application, you define one or more environments. An
 * environment is a deployment group of AppConfig targets, such as applications in a
 * `Beta` or `Production` environment. You can also define
 * environments for application subcomponents such as the `Web`,
 * `Mobile` and `Back-end` components for your application. You can
 * configure Amazon CloudWatch alarms for each environment. The system monitors alarms during a
 * configuration deployment. If an alarm is triggered, the system rolls back the
 * configuration.
 */
export const createEnvironment: API.OperationMethod<
  CreateEnvironmentRequest,
  Environment,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateEnvironmentRequest,
  output: Environment,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
}));
/**
 * Creates an AppConfig extension. An extension augments your ability to inject
 * logic or behavior at different points during the AppConfig workflow of creating
 * or deploying a configuration.
 *
 * You can create your own extensions or use the Amazon Web Services authored extensions provided by
 * AppConfig. For an AppConfig extension that uses Lambda, you must create a Lambda function to perform any computation and processing
 * defined in the extension. If you plan to create custom versions of the Amazon Web Services
 * authored notification extensions, you only need to specify an Amazon Resource Name (ARN) in
 * the `Uri` field for the new extension version.
 *
 * - For a custom EventBridge notification extension, enter the ARN of the EventBridge
 * default events in the `Uri` field.
 *
 * - For a custom Amazon SNS notification extension, enter the ARN of an Amazon SNS
 * topic in the `Uri` field.
 *
 * - For a custom Amazon SQS notification extension, enter the ARN of an Amazon SQS
 * message queue in the `Uri` field.
 *
 * For more information about extensions, see Extending
 * workflows in the *AppConfig User Guide*.
 */
export const createExtension: API.OperationMethod<
  CreateExtensionRequest,
  Extension,
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateExtensionRequest,
  output: Extension,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
  ],
}));
/**
 * When you create an extension or configure an Amazon Web Services authored extension, you
 * associate the extension with an AppConfig application, environment, or
 * configuration profile. For example, you can choose to run the AppConfig
 * deployment events to Amazon SNS
 * Amazon Web Services authored extension and receive notifications on an Amazon SNS
 * topic anytime a configuration deployment is started for a specific application. Defining
 * which extension to associate with an AppConfig resource is called an
 * *extension association*. An extension association is a specified
 * relationship between an extension and an AppConfig resource, such as an
 * application or a configuration profile. For more information about extensions and
 * associations, see Extending
 * workflows in the *AppConfig User Guide*.
 */
export const createExtensionAssociation: API.OperationMethod<
  CreateExtensionAssociationRequest,
  ExtensionAssociation,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateExtensionAssociationRequest,
  output: ExtensionAssociation,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
}));
/**
 * Creates a new configuration in the AppConfig hosted configuration store. If
 * you're creating a feature flag, we recommend you familiarize yourself with the JSON schema
 * for feature flag data. For more information, see Type reference for AWS.AppConfig.FeatureFlags in the
 * *AppConfig User Guide*.
 */
export const createHostedConfigurationVersion: API.OperationMethod<
  CreateHostedConfigurationVersionRequest,
  HostedConfigurationVersion,
  | BadRequestException
  | ConflictException
  | InternalServerException
  | PayloadTooLargeException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateHostedConfigurationVersionRequest,
  output: HostedConfigurationVersion,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    PayloadTooLargeException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
}));
/**
 * Deletes an application.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationRequest,
  DeleteApplicationResponse,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteApplicationRequest,
  output: DeleteApplicationResponse,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
}));
/**
 * Deletes a configuration profile.
 *
 * To prevent users from unintentionally deleting actively-used configuration profiles,
 * enable deletion
 * protection.
 */
export const deleteConfigurationProfile: API.OperationMethod<
  DeleteConfigurationProfileRequest,
  DeleteConfigurationProfileResponse,
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteConfigurationProfileRequest,
  output: DeleteConfigurationProfileResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
}));
/**
 * Deletes a deployment strategy.
 */
export const deleteDeploymentStrategy: API.OperationMethod<
  DeleteDeploymentStrategyRequest,
  DeleteDeploymentStrategyResponse,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteDeploymentStrategyRequest,
  output: DeleteDeploymentStrategyResponse,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
}));
/**
 * Deletes an environment.
 *
 * To prevent users from unintentionally deleting actively-used environments, enable deletion
 * protection.
 */
export const deleteEnvironment: API.OperationMethod<
  DeleteEnvironmentRequest,
  DeleteEnvironmentResponse,
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteEnvironmentRequest,
  output: DeleteEnvironmentResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
}));
/**
 * Deletes an AppConfig extension. You must delete all associations to an
 * extension before you delete the extension.
 */
export const deleteExtension: API.OperationMethod<
  DeleteExtensionRequest,
  DeleteExtensionResponse,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteExtensionRequest,
  output: DeleteExtensionResponse,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
}));
/**
 * Deletes an extension association. This action doesn't delete extensions defined in the
 * association.
 */
export const deleteExtensionAssociation: API.OperationMethod<
  DeleteExtensionAssociationRequest,
  DeleteExtensionAssociationResponse,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteExtensionAssociationRequest,
  output: DeleteExtensionAssociationResponse,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
}));
/**
 * Deletes a version of a configuration from the AppConfig hosted configuration
 * store.
 */
export const deleteHostedConfigurationVersion: API.OperationMethod<
  DeleteHostedConfigurationVersionRequest,
  DeleteHostedConfigurationVersionResponse,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteHostedConfigurationVersionRequest,
  output: DeleteHostedConfigurationVersionResponse,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
}));
/**
 * Returns information about the status of the `DeletionProtection`
 * parameter.
 */
export const getAccountSettings: API.OperationMethod<
  GetAccountSettingsRequest,
  AccountSettings,
  BadRequestException | InternalServerException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAccountSettingsRequest,
  output: AccountSettings,
  errors: [BadRequestException, InternalServerException],
}));
/**
 * Retrieves information about an application.
 */
export const getApplication: API.OperationMethod<
  GetApplicationRequest,
  Application,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetApplicationRequest,
  output: Application,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
}));
/**
 * (Deprecated) Retrieves the latest deployed configuration.
 *
 * Note the following important information.
 *
 * - This API action is deprecated. Calls to receive configuration data should use
 * the StartConfigurationSession and GetLatestConfiguration APIs instead.
 *
 * - GetConfiguration is a priced call. For more information, see
 * Pricing.
 */
export const getConfiguration: API.OperationMethod<
  GetConfigurationRequest,
  Configuration,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetConfigurationRequest,
  output: Configuration,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
}));
/**
 * Retrieves information about a configuration profile.
 */
export const getConfigurationProfile: API.OperationMethod<
  GetConfigurationProfileRequest,
  ConfigurationProfile,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetConfigurationProfileRequest,
  output: ConfigurationProfile,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
}));
/**
 * Retrieves information about a configuration deployment.
 */
export const getDeployment: API.OperationMethod<
  GetDeploymentRequest,
  Deployment,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDeploymentRequest,
  output: Deployment,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
}));
/**
 * Retrieves information about a deployment strategy. A deployment strategy defines
 * important criteria for rolling out your configuration to the designated targets. A
 * deployment strategy includes the overall duration required, a percentage of targets to
 * receive the deployment during each interval, an algorithm that defines how percentage
 * grows, and bake time.
 */
export const getDeploymentStrategy: API.OperationMethod<
  GetDeploymentStrategyRequest,
  DeploymentStrategy,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDeploymentStrategyRequest,
  output: DeploymentStrategy,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
}));
/**
 * Retrieves information about an environment. An environment is a deployment group of
 * AppConfig applications, such as applications in a `Production`
 * environment or in an `EU_Region` environment. Each configuration deployment
 * targets an environment. You can enable one or more Amazon CloudWatch alarms for an environment. If
 * an alarm is triggered during a deployment, AppConfig roles back the
 * configuration.
 */
export const getEnvironment: API.OperationMethod<
  GetEnvironmentRequest,
  Environment,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetEnvironmentRequest,
  output: Environment,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
}));
/**
 * Returns information about an AppConfig extension.
 */
export const getExtension: API.OperationMethod<
  GetExtensionRequest,
  Extension,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetExtensionRequest,
  output: Extension,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
}));
/**
 * Returns information about an AppConfig extension association. For more
 * information about extensions and associations, see Extending
 * workflows in the *AppConfig User Guide*.
 */
export const getExtensionAssociation: API.OperationMethod<
  GetExtensionAssociationRequest,
  ExtensionAssociation,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetExtensionAssociationRequest,
  output: ExtensionAssociation,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
}));
/**
 * Retrieves information about a specific configuration version.
 */
export const getHostedConfigurationVersion: API.OperationMethod<
  GetHostedConfigurationVersionRequest,
  HostedConfigurationVersion,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetHostedConfigurationVersionRequest,
  output: HostedConfigurationVersion,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
}));
/**
 * Lists all applications in your Amazon Web Services account.
 */
export const listApplications: API.OperationMethod<
  ListApplicationsRequest,
  Applications,
  BadRequestException | InternalServerException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListApplicationsRequest,
  ) => stream.Stream<
    Applications,
    BadRequestException | InternalServerException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListApplicationsRequest,
  ) => stream.Stream<
    Application,
    BadRequestException | InternalServerException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationsRequest,
  output: Applications,
  errors: [BadRequestException, InternalServerException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Lists the configuration profiles for an application.
 */
export const listConfigurationProfiles: API.OperationMethod<
  ListConfigurationProfilesRequest,
  ConfigurationProfiles,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListConfigurationProfilesRequest,
  ) => stream.Stream<
    ConfigurationProfiles,
    | BadRequestException
    | InternalServerException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListConfigurationProfilesRequest,
  ) => stream.Stream<
    ConfigurationProfileSummary,
    | BadRequestException
    | InternalServerException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListConfigurationProfilesRequest,
  output: ConfigurationProfiles,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Lists the deployments for an environment in descending deployment number order.
 */
export const listDeployments: API.OperationMethod<
  ListDeploymentsRequest,
  Deployments,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListDeploymentsRequest,
  ) => stream.Stream<
    Deployments,
    | BadRequestException
    | InternalServerException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListDeploymentsRequest,
  ) => stream.Stream<
    DeploymentSummary,
    | BadRequestException
    | InternalServerException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDeploymentsRequest,
  output: Deployments,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Lists deployment strategies.
 */
export const listDeploymentStrategies: API.OperationMethod<
  ListDeploymentStrategiesRequest,
  DeploymentStrategies,
  BadRequestException | InternalServerException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListDeploymentStrategiesRequest,
  ) => stream.Stream<
    DeploymentStrategies,
    BadRequestException | InternalServerException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListDeploymentStrategiesRequest,
  ) => stream.Stream<
    DeploymentStrategy,
    BadRequestException | InternalServerException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDeploymentStrategiesRequest,
  output: DeploymentStrategies,
  errors: [BadRequestException, InternalServerException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Lists the environments for an application.
 */
export const listEnvironments: API.OperationMethod<
  ListEnvironmentsRequest,
  Environments,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListEnvironmentsRequest,
  ) => stream.Stream<
    Environments,
    | BadRequestException
    | InternalServerException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListEnvironmentsRequest,
  ) => stream.Stream<
    Environment,
    | BadRequestException
    | InternalServerException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListEnvironmentsRequest,
  output: Environments,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Lists all AppConfig extension associations in the account. For more
 * information about extensions and associations, see Extending
 * workflows in the *AppConfig User Guide*.
 */
export const listExtensionAssociations: API.OperationMethod<
  ListExtensionAssociationsRequest,
  ExtensionAssociations,
  BadRequestException | InternalServerException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListExtensionAssociationsRequest,
  ) => stream.Stream<
    ExtensionAssociations,
    BadRequestException | InternalServerException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListExtensionAssociationsRequest,
  ) => stream.Stream<
    ExtensionAssociationSummary,
    BadRequestException | InternalServerException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListExtensionAssociationsRequest,
  output: ExtensionAssociations,
  errors: [BadRequestException, InternalServerException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Lists all custom and Amazon Web Services authored AppConfig extensions in the
 * account. For more information about extensions, see Extending
 * workflows in the *AppConfig User Guide*.
 */
export const listExtensions: API.OperationMethod<
  ListExtensionsRequest,
  Extensions,
  BadRequestException | InternalServerException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListExtensionsRequest,
  ) => stream.Stream<
    Extensions,
    BadRequestException | InternalServerException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListExtensionsRequest,
  ) => stream.Stream<
    ExtensionSummary,
    BadRequestException | InternalServerException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListExtensionsRequest,
  output: Extensions,
  errors: [BadRequestException, InternalServerException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Lists configurations stored in the AppConfig hosted configuration store by
 * version.
 */
export const listHostedConfigurationVersions: API.OperationMethod<
  ListHostedConfigurationVersionsRequest,
  HostedConfigurationVersions,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListHostedConfigurationVersionsRequest,
  ) => stream.Stream<
    HostedConfigurationVersions,
    | BadRequestException
    | InternalServerException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListHostedConfigurationVersionsRequest,
  ) => stream.Stream<
    HostedConfigurationVersionSummary,
    | BadRequestException
    | InternalServerException
    | ResourceNotFoundException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListHostedConfigurationVersionsRequest,
  output: HostedConfigurationVersions,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Retrieves the list of key-value tags assigned to the resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ResourceTags,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ResourceTags,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
}));
/**
 * Starts a deployment.
 */
export const startDeployment: API.OperationMethod<
  StartDeploymentRequest,
  Deployment,
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartDeploymentRequest,
  output: Deployment,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
}));
/**
 * Stops a deployment. This API action works only on deployments that have a status of
 * `DEPLOYING`, unless an `AllowRevert` parameter is supplied. If the
 * `AllowRevert` parameter is supplied, the status of an in-progress deployment
 * will be `ROLLED_BACK`. The status of a completed deployment will be
 * `REVERTED`. AppConfig only allows a revert within 72 hours of
 * deployment completion.
 */
export const stopDeployment: API.OperationMethod<
  StopDeploymentRequest,
  Deployment,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StopDeploymentRequest,
  output: Deployment,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
}));
/**
 * Assigns metadata to an AppConfig resource. Tags help organize and categorize
 * your AppConfig resources. Each tag consists of a key and an optional value, both
 * of which you define. You can specify a maximum of 50 tags for a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
}));
/**
 * Deletes a tag key and value from an AppConfig resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
}));
/**
 * Updates the value of the `DeletionProtection` parameter.
 */
export const updateAccountSettings: API.OperationMethod<
  UpdateAccountSettingsRequest,
  AccountSettings,
  BadRequestException | InternalServerException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateAccountSettingsRequest,
  output: AccountSettings,
  errors: [BadRequestException, InternalServerException],
}));
/**
 * Updates an application.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationRequest,
  Application,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateApplicationRequest,
  output: Application,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
}));
/**
 * Updates a configuration profile.
 */
export const updateConfigurationProfile: API.OperationMethod<
  UpdateConfigurationProfileRequest,
  ConfigurationProfile,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateConfigurationProfileRequest,
  output: ConfigurationProfile,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
}));
/**
 * Updates a deployment strategy.
 */
export const updateDeploymentStrategy: API.OperationMethod<
  UpdateDeploymentStrategyRequest,
  DeploymentStrategy,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateDeploymentStrategyRequest,
  output: DeploymentStrategy,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
}));
/**
 * Updates an environment.
 */
export const updateEnvironment: API.OperationMethod<
  UpdateEnvironmentRequest,
  Environment,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateEnvironmentRequest,
  output: Environment,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
}));
/**
 * Updates an AppConfig extension. For more information about extensions, see
 * Extending
 * workflows in the *AppConfig User Guide*.
 */
export const updateExtension: API.OperationMethod<
  UpdateExtensionRequest,
  Extension,
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateExtensionRequest,
  output: Extension,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
}));
/**
 * Updates an association. For more information about extensions and associations, see
 * Extending
 * workflows in the *AppConfig User Guide*.
 */
export const updateExtensionAssociation: API.OperationMethod<
  UpdateExtensionAssociationRequest,
  ExtensionAssociation,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateExtensionAssociationRequest,
  output: ExtensionAssociation,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
}));
/**
 * Uses the validators in a configuration profile to validate a configuration.
 */
export const validateConfiguration: API.OperationMethod<
  ValidateConfigurationRequest,
  ValidateConfigurationResponse,
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ValidateConfigurationRequest,
  output: ValidateConfigurationResponse,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
}));
