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
  sdkId: "Service Catalog AppRegistry",
  serviceShapeName: "AWS242AppRegistry",
});
const auth = T.AwsAuthSigv4({ name: "servicecatalog" });
const ver = T.ServiceVersion("2020-06-24");
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
              `https://servicecatalog-appregistry-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
                `https://servicecatalog-appregistry.${Region}.amazonaws.com`,
              );
            }
            return e(
              `https://servicecatalog-appregistry-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://servicecatalog-appregistry.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://servicecatalog-appregistry.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

//# Newtypes
export type ApplicationSpecifier = string;
export type AttributeGroupSpecifier = string;
export type ApplicationArn = string;
export type AttributeGroupArn = string;
export type ResourceSpecifier = string;
export type Arn = string;
export type Name = string;
export type Description = string;
export type TagKey = string;
export type TagValue = string;
export type ClientToken = string;
export type ApplicationId = string;
export type Attributes = string;
export type AttributeGroupId = string;
export type CreatedBy = string;
export type AssociationCount = number;
export type NextToken = string;
export type MaxResults = number;
export type ResourcesListItemErrorMessage = string;
export type ResourceItemType = string;
export type TagKeyConfig = string;

//# Schemas
export interface AssociateAttributeGroupRequest {
  application: string;
  attributeGroup: string;
}
export const AssociateAttributeGroupRequest = S.suspend(() =>
  S.Struct({
    application: S.String.pipe(T.HttpLabel("application")),
    attributeGroup: S.String.pipe(T.HttpLabel("attributeGroup")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/applications/{application}/attribute-groups/{attributeGroup}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateAttributeGroupRequest",
}) as any as S.Schema<AssociateAttributeGroupRequest>;
export interface AssociateAttributeGroupResponse {
  applicationArn?: string;
  attributeGroupArn?: string;
}
export const AssociateAttributeGroupResponse = S.suspend(() =>
  S.Struct({
    applicationArn: S.optional(S.String),
    attributeGroupArn: S.optional(S.String),
  }),
).annotate({
  identifier: "AssociateAttributeGroupResponse",
}) as any as S.Schema<AssociateAttributeGroupResponse>;
export type ResourceType = "CFN_STACK" | "RESOURCE_TAG_VALUE" | (string & {});
export const ResourceType = S.String;
export type AssociationOption =
  | "APPLY_APPLICATION_TAG"
  | "SKIP_APPLICATION_TAG"
  | (string & {});
export const AssociationOption = S.String;
export type Options = AssociationOption[];
export const Options = S.Array(AssociationOption);
export interface AssociateResourceRequest {
  application: string;
  resourceType: ResourceType;
  resource: string;
  options?: AssociationOption[];
}
export const AssociateResourceRequest = S.suspend(() =>
  S.Struct({
    application: S.String.pipe(T.HttpLabel("application")),
    resourceType: ResourceType.pipe(T.HttpLabel("resourceType")),
    resource: S.String.pipe(T.HttpLabel("resource")),
    options: S.optional(Options),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/applications/{application}/resources/{resourceType}/{resource}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateResourceRequest",
}) as any as S.Schema<AssociateResourceRequest>;
export interface AssociateResourceResponse {
  applicationArn?: string;
  resourceArn?: string;
  options?: AssociationOption[];
}
export const AssociateResourceResponse = S.suspend(() =>
  S.Struct({
    applicationArn: S.optional(S.String),
    resourceArn: S.optional(S.String),
    options: S.optional(Options),
  }),
).annotate({
  identifier: "AssociateResourceResponse",
}) as any as S.Schema<AssociateResourceResponse>;
export type Tags = { [key: string]: string | undefined };
export const Tags = S.Record(S.String, S.String.pipe(S.optional));
export interface CreateApplicationRequest {
  name: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  clientToken: string;
}
export const CreateApplicationRequest = S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    tags: S.optional(Tags),
    clientToken: S.String.pipe(T.IdempotencyToken()),
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
export type ApplicationTagDefinition = { [key: string]: string | undefined };
export const ApplicationTagDefinition = S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface Application {
  id?: string;
  arn?: string;
  name?: string;
  description?: string;
  creationTime?: Date;
  lastUpdateTime?: Date;
  tags?: { [key: string]: string | undefined };
  applicationTag?: { [key: string]: string | undefined };
}
export const Application = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    tags: S.optional(Tags),
    applicationTag: S.optional(ApplicationTagDefinition),
  }),
).annotate({ identifier: "Application" }) as any as S.Schema<Application>;
export interface CreateApplicationResponse {
  application?: Application;
}
export const CreateApplicationResponse = S.suspend(() =>
  S.Struct({ application: S.optional(Application) }),
).annotate({
  identifier: "CreateApplicationResponse",
}) as any as S.Schema<CreateApplicationResponse>;
export interface CreateAttributeGroupRequest {
  name: string;
  description?: string;
  attributes: string;
  tags?: { [key: string]: string | undefined };
  clientToken: string;
}
export const CreateAttributeGroupRequest = S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    attributes: S.String,
    tags: S.optional(Tags),
    clientToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/attribute-groups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAttributeGroupRequest",
}) as any as S.Schema<CreateAttributeGroupRequest>;
export interface AttributeGroup {
  id?: string;
  arn?: string;
  name?: string;
  description?: string;
  creationTime?: Date;
  lastUpdateTime?: Date;
  tags?: { [key: string]: string | undefined };
}
export const AttributeGroup = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    tags: S.optional(Tags),
  }),
).annotate({ identifier: "AttributeGroup" }) as any as S.Schema<AttributeGroup>;
export interface CreateAttributeGroupResponse {
  attributeGroup?: AttributeGroup;
}
export const CreateAttributeGroupResponse = S.suspend(() =>
  S.Struct({ attributeGroup: S.optional(AttributeGroup) }),
).annotate({
  identifier: "CreateAttributeGroupResponse",
}) as any as S.Schema<CreateAttributeGroupResponse>;
export interface DeleteApplicationRequest {
  application: string;
}
export const DeleteApplicationRequest = S.suspend(() =>
  S.Struct({ application: S.String.pipe(T.HttpLabel("application")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/applications/{application}" }),
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
export interface ApplicationSummary {
  id?: string;
  arn?: string;
  name?: string;
  description?: string;
  creationTime?: Date;
  lastUpdateTime?: Date;
}
export const ApplicationSummary = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ApplicationSummary",
}) as any as S.Schema<ApplicationSummary>;
export interface DeleteApplicationResponse {
  application?: ApplicationSummary;
}
export const DeleteApplicationResponse = S.suspend(() =>
  S.Struct({ application: S.optional(ApplicationSummary) }),
).annotate({
  identifier: "DeleteApplicationResponse",
}) as any as S.Schema<DeleteApplicationResponse>;
export interface DeleteAttributeGroupRequest {
  attributeGroup: string;
}
export const DeleteAttributeGroupRequest = S.suspend(() =>
  S.Struct({
    attributeGroup: S.String.pipe(T.HttpLabel("attributeGroup")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/attribute-groups/{attributeGroup}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAttributeGroupRequest",
}) as any as S.Schema<DeleteAttributeGroupRequest>;
export interface AttributeGroupSummary {
  id?: string;
  arn?: string;
  name?: string;
  description?: string;
  creationTime?: Date;
  lastUpdateTime?: Date;
  createdBy?: string;
}
export const AttributeGroupSummary = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    createdBy: S.optional(S.String),
  }),
).annotate({
  identifier: "AttributeGroupSummary",
}) as any as S.Schema<AttributeGroupSummary>;
export interface DeleteAttributeGroupResponse {
  attributeGroup?: AttributeGroupSummary;
}
export const DeleteAttributeGroupResponse = S.suspend(() =>
  S.Struct({ attributeGroup: S.optional(AttributeGroupSummary) }),
).annotate({
  identifier: "DeleteAttributeGroupResponse",
}) as any as S.Schema<DeleteAttributeGroupResponse>;
export interface DisassociateAttributeGroupRequest {
  application: string;
  attributeGroup: string;
}
export const DisassociateAttributeGroupRequest = S.suspend(() =>
  S.Struct({
    application: S.String.pipe(T.HttpLabel("application")),
    attributeGroup: S.String.pipe(T.HttpLabel("attributeGroup")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/applications/{application}/attribute-groups/{attributeGroup}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateAttributeGroupRequest",
}) as any as S.Schema<DisassociateAttributeGroupRequest>;
export interface DisassociateAttributeGroupResponse {
  applicationArn?: string;
  attributeGroupArn?: string;
}
export const DisassociateAttributeGroupResponse = S.suspend(() =>
  S.Struct({
    applicationArn: S.optional(S.String),
    attributeGroupArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DisassociateAttributeGroupResponse",
}) as any as S.Schema<DisassociateAttributeGroupResponse>;
export interface DisassociateResourceRequest {
  application: string;
  resourceType: ResourceType;
  resource: string;
}
export const DisassociateResourceRequest = S.suspend(() =>
  S.Struct({
    application: S.String.pipe(T.HttpLabel("application")),
    resourceType: ResourceType.pipe(T.HttpLabel("resourceType")),
    resource: S.String.pipe(T.HttpLabel("resource")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/applications/{application}/resources/{resourceType}/{resource}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateResourceRequest",
}) as any as S.Schema<DisassociateResourceRequest>;
export interface DisassociateResourceResponse {
  applicationArn?: string;
  resourceArn?: string;
}
export const DisassociateResourceResponse = S.suspend(() =>
  S.Struct({
    applicationArn: S.optional(S.String),
    resourceArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DisassociateResourceResponse",
}) as any as S.Schema<DisassociateResourceResponse>;
export interface GetApplicationRequest {
  application: string;
}
export const GetApplicationRequest = S.suspend(() =>
  S.Struct({ application: S.String.pipe(T.HttpLabel("application")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/applications/{application}" }),
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
export type ResourceGroupState =
  | "CREATING"
  | "CREATE_COMPLETE"
  | "CREATE_FAILED"
  | "UPDATING"
  | "UPDATE_COMPLETE"
  | "UPDATE_FAILED"
  | (string & {});
export const ResourceGroupState = S.String;
export interface ResourceGroup {
  state?: ResourceGroupState;
  arn?: string;
  errorMessage?: string;
}
export const ResourceGroup = S.suspend(() =>
  S.Struct({
    state: S.optional(ResourceGroupState),
    arn: S.optional(S.String),
    errorMessage: S.optional(S.String),
  }),
).annotate({ identifier: "ResourceGroup" }) as any as S.Schema<ResourceGroup>;
export interface Integrations {
  resourceGroup?: ResourceGroup;
  applicationTagResourceGroup?: ResourceGroup;
}
export const Integrations = S.suspend(() =>
  S.Struct({
    resourceGroup: S.optional(ResourceGroup),
    applicationTagResourceGroup: S.optional(ResourceGroup),
  }),
).annotate({ identifier: "Integrations" }) as any as S.Schema<Integrations>;
export interface GetApplicationResponse {
  id?: string;
  arn?: string;
  name?: string;
  description?: string;
  creationTime?: Date;
  lastUpdateTime?: Date;
  associatedResourceCount?: number;
  tags?: { [key: string]: string | undefined };
  integrations?: Integrations;
  applicationTag?: { [key: string]: string | undefined };
}
export const GetApplicationResponse = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    associatedResourceCount: S.optional(S.Number),
    tags: S.optional(Tags),
    integrations: S.optional(Integrations),
    applicationTag: S.optional(ApplicationTagDefinition),
  }),
).annotate({
  identifier: "GetApplicationResponse",
}) as any as S.Schema<GetApplicationResponse>;
export type ResourceItemStatus =
  | "SUCCESS"
  | "FAILED"
  | "IN_PROGRESS"
  | "SKIPPED"
  | (string & {});
export const ResourceItemStatus = S.String;
export type GetAssociatedResourceFilter = ResourceItemStatus[];
export const GetAssociatedResourceFilter = S.Array(ResourceItemStatus);
export interface GetAssociatedResourceRequest {
  application: string;
  resourceType: ResourceType;
  resource: string;
  nextToken?: string;
  resourceTagStatus?: ResourceItemStatus[];
  maxResults?: number;
}
export const GetAssociatedResourceRequest = S.suspend(() =>
  S.Struct({
    application: S.String.pipe(T.HttpLabel("application")),
    resourceType: ResourceType.pipe(T.HttpLabel("resourceType")),
    resource: S.String.pipe(T.HttpLabel("resource")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    resourceTagStatus: S.optional(GetAssociatedResourceFilter).pipe(
      T.HttpQuery("resourceTagStatus"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{application}/resources/{resourceType}/{resource}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAssociatedResourceRequest",
}) as any as S.Schema<GetAssociatedResourceRequest>;
export interface ResourceIntegrations {
  resourceGroup?: ResourceGroup;
}
export const ResourceIntegrations = S.suspend(() =>
  S.Struct({ resourceGroup: S.optional(ResourceGroup) }),
).annotate({
  identifier: "ResourceIntegrations",
}) as any as S.Schema<ResourceIntegrations>;
export interface Resource {
  name?: string;
  arn?: string;
  associationTime?: Date;
  integrations?: ResourceIntegrations;
}
export const Resource = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    associationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    integrations: S.optional(ResourceIntegrations),
  }),
).annotate({ identifier: "Resource" }) as any as S.Schema<Resource>;
export type ApplicationTagStatus =
  | "IN_PROGRESS"
  | "SUCCESS"
  | "FAILURE"
  | (string & {});
export const ApplicationTagStatus = S.String;
export interface ResourcesListItem {
  resourceArn?: string;
  errorMessage?: string;
  status?: string;
  resourceType?: string;
}
export const ResourcesListItem = S.suspend(() =>
  S.Struct({
    resourceArn: S.optional(S.String),
    errorMessage: S.optional(S.String),
    status: S.optional(S.String),
    resourceType: S.optional(S.String),
  }),
).annotate({
  identifier: "ResourcesListItem",
}) as any as S.Schema<ResourcesListItem>;
export type ResourcesList = ResourcesListItem[];
export const ResourcesList = S.Array(ResourcesListItem);
export interface ApplicationTagResult {
  applicationTagStatus?: ApplicationTagStatus;
  errorMessage?: string;
  resources?: ResourcesListItem[];
  nextToken?: string;
}
export const ApplicationTagResult = S.suspend(() =>
  S.Struct({
    applicationTagStatus: S.optional(ApplicationTagStatus),
    errorMessage: S.optional(S.String),
    resources: S.optional(ResourcesList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ApplicationTagResult",
}) as any as S.Schema<ApplicationTagResult>;
export interface GetAssociatedResourceResponse {
  resource?: Resource;
  options?: AssociationOption[];
  applicationTagResult?: ApplicationTagResult;
}
export const GetAssociatedResourceResponse = S.suspend(() =>
  S.Struct({
    resource: S.optional(Resource),
    options: S.optional(Options),
    applicationTagResult: S.optional(ApplicationTagResult),
  }),
).annotate({
  identifier: "GetAssociatedResourceResponse",
}) as any as S.Schema<GetAssociatedResourceResponse>;
export interface GetAttributeGroupRequest {
  attributeGroup: string;
}
export const GetAttributeGroupRequest = S.suspend(() =>
  S.Struct({
    attributeGroup: S.String.pipe(T.HttpLabel("attributeGroup")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/attribute-groups/{attributeGroup}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAttributeGroupRequest",
}) as any as S.Schema<GetAttributeGroupRequest>;
export interface GetAttributeGroupResponse {
  id?: string;
  arn?: string;
  name?: string;
  description?: string;
  attributes?: string;
  creationTime?: Date;
  lastUpdateTime?: Date;
  tags?: { [key: string]: string | undefined };
  createdBy?: string;
}
export const GetAttributeGroupResponse = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    attributes: S.optional(S.String),
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    tags: S.optional(Tags),
    createdBy: S.optional(S.String),
  }),
).annotate({
  identifier: "GetAttributeGroupResponse",
}) as any as S.Schema<GetAttributeGroupResponse>;
export interface GetConfigurationRequest {}
export const GetConfigurationRequest = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetConfigurationRequest",
}) as any as S.Schema<GetConfigurationRequest>;
export interface TagQueryConfiguration {
  tagKey?: string;
}
export const TagQueryConfiguration = S.suspend(() =>
  S.Struct({ tagKey: S.optional(S.String) }),
).annotate({
  identifier: "TagQueryConfiguration",
}) as any as S.Schema<TagQueryConfiguration>;
export interface AppRegistryConfiguration {
  tagQueryConfiguration?: TagQueryConfiguration;
}
export const AppRegistryConfiguration = S.suspend(() =>
  S.Struct({ tagQueryConfiguration: S.optional(TagQueryConfiguration) }),
).annotate({
  identifier: "AppRegistryConfiguration",
}) as any as S.Schema<AppRegistryConfiguration>;
export interface GetConfigurationResponse {
  configuration?: AppRegistryConfiguration;
}
export const GetConfigurationResponse = S.suspend(() =>
  S.Struct({ configuration: S.optional(AppRegistryConfiguration) }),
).annotate({
  identifier: "GetConfigurationResponse",
}) as any as S.Schema<GetConfigurationResponse>;
export interface ListApplicationsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListApplicationsRequest = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
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
export type ApplicationSummaries = ApplicationSummary[];
export const ApplicationSummaries = S.Array(ApplicationSummary);
export interface ListApplicationsResponse {
  applications?: ApplicationSummary[];
  nextToken?: string;
}
export const ListApplicationsResponse = S.suspend(() =>
  S.Struct({
    applications: S.optional(ApplicationSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListApplicationsResponse",
}) as any as S.Schema<ListApplicationsResponse>;
export interface ListAssociatedAttributeGroupsRequest {
  application: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListAssociatedAttributeGroupsRequest = S.suspend(() =>
  S.Struct({
    application: S.String.pipe(T.HttpLabel("application")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{application}/attribute-groups",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAssociatedAttributeGroupsRequest",
}) as any as S.Schema<ListAssociatedAttributeGroupsRequest>;
export type AttributeGroupIds = string[];
export const AttributeGroupIds = S.Array(S.String);
export interface ListAssociatedAttributeGroupsResponse {
  attributeGroups?: string[];
  nextToken?: string;
}
export const ListAssociatedAttributeGroupsResponse = S.suspend(() =>
  S.Struct({
    attributeGroups: S.optional(AttributeGroupIds),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAssociatedAttributeGroupsResponse",
}) as any as S.Schema<ListAssociatedAttributeGroupsResponse>;
export interface ListAssociatedResourcesRequest {
  application: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListAssociatedResourcesRequest = S.suspend(() =>
  S.Struct({
    application: S.String.pipe(T.HttpLabel("application")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/applications/{application}/resources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAssociatedResourcesRequest",
}) as any as S.Schema<ListAssociatedResourcesRequest>;
export interface ResourceDetails {
  tagValue?: string;
}
export const ResourceDetails = S.suspend(() =>
  S.Struct({ tagValue: S.optional(S.String) }),
).annotate({
  identifier: "ResourceDetails",
}) as any as S.Schema<ResourceDetails>;
export interface ResourceInfo {
  name?: string;
  arn?: string;
  resourceType?: ResourceType;
  resourceDetails?: ResourceDetails;
  options?: AssociationOption[];
}
export const ResourceInfo = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    resourceType: S.optional(ResourceType),
    resourceDetails: S.optional(ResourceDetails),
    options: S.optional(Options),
  }),
).annotate({ identifier: "ResourceInfo" }) as any as S.Schema<ResourceInfo>;
export type Resources = ResourceInfo[];
export const Resources = S.Array(ResourceInfo);
export interface ListAssociatedResourcesResponse {
  resources?: ResourceInfo[];
  nextToken?: string;
}
export const ListAssociatedResourcesResponse = S.suspend(() =>
  S.Struct({
    resources: S.optional(Resources),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAssociatedResourcesResponse",
}) as any as S.Schema<ListAssociatedResourcesResponse>;
export interface ListAttributeGroupsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListAttributeGroupsRequest = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/attribute-groups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAttributeGroupsRequest",
}) as any as S.Schema<ListAttributeGroupsRequest>;
export type AttributeGroupSummaries = AttributeGroupSummary[];
export const AttributeGroupSummaries = S.Array(AttributeGroupSummary);
export interface ListAttributeGroupsResponse {
  attributeGroups?: AttributeGroupSummary[];
  nextToken?: string;
}
export const ListAttributeGroupsResponse = S.suspend(() =>
  S.Struct({
    attributeGroups: S.optional(AttributeGroupSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAttributeGroupsResponse",
}) as any as S.Schema<ListAttributeGroupsResponse>;
export interface ListAttributeGroupsForApplicationRequest {
  application: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListAttributeGroupsForApplicationRequest = S.suspend(() =>
  S.Struct({
    application: S.String.pipe(T.HttpLabel("application")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{application}/attribute-group-details",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAttributeGroupsForApplicationRequest",
}) as any as S.Schema<ListAttributeGroupsForApplicationRequest>;
export interface AttributeGroupDetails {
  id?: string;
  arn?: string;
  name?: string;
  createdBy?: string;
}
export const AttributeGroupDetails = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    name: S.optional(S.String),
    createdBy: S.optional(S.String),
  }),
).annotate({
  identifier: "AttributeGroupDetails",
}) as any as S.Schema<AttributeGroupDetails>;
export type AttributeGroupDetailsList = AttributeGroupDetails[];
export const AttributeGroupDetailsList = S.Array(AttributeGroupDetails);
export interface ListAttributeGroupsForApplicationResponse {
  attributeGroupsDetails?: AttributeGroupDetails[];
  nextToken?: string;
}
export const ListAttributeGroupsForApplicationResponse = S.suspend(() =>
  S.Struct({
    attributeGroupsDetails: S.optional(AttributeGroupDetailsList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAttributeGroupsForApplicationResponse",
}) as any as S.Schema<ListAttributeGroupsForApplicationResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
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
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ tags: S.optional(Tags) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface PutConfigurationRequest {
  configuration: AppRegistryConfiguration;
}
export const PutConfigurationRequest = S.suspend(() =>
  S.Struct({ configuration: AppRegistryConfiguration }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/configuration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutConfigurationRequest",
}) as any as S.Schema<PutConfigurationRequest>;
export interface PutConfigurationResponse {}
export const PutConfigurationResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "PutConfigurationResponse",
}) as any as S.Schema<PutConfigurationResponse>;
export interface SyncResourceRequest {
  resourceType: ResourceType;
  resource: string;
}
export const SyncResourceRequest = S.suspend(() =>
  S.Struct({
    resourceType: ResourceType.pipe(T.HttpLabel("resourceType")),
    resource: S.String.pipe(T.HttpLabel("resource")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/sync/{resourceType}/{resource}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SyncResourceRequest",
}) as any as S.Schema<SyncResourceRequest>;
export type SyncAction = "START_SYNC" | "NO_ACTION" | (string & {});
export const SyncAction = S.String;
export interface SyncResourceResponse {
  applicationArn?: string;
  resourceArn?: string;
  actionTaken?: SyncAction;
}
export const SyncResourceResponse = S.suspend(() =>
  S.Struct({
    applicationArn: S.optional(S.String),
    resourceArn: S.optional(S.String),
    actionTaken: S.optional(SyncAction),
  }),
).annotate({
  identifier: "SyncResourceResponse",
}) as any as S.Schema<SyncResourceResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: Tags,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
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
export type TagKeys = string[];
export const TagKeys = S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeys.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
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
export interface UpdateApplicationRequest {
  application: string;
  name?: string;
  description?: string;
}
export const UpdateApplicationRequest = S.suspend(() =>
  S.Struct({
    application: S.String.pipe(T.HttpLabel("application")),
    name: S.optional(S.String),
    description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/applications/{application}" }),
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
  application?: Application;
}
export const UpdateApplicationResponse = S.suspend(() =>
  S.Struct({ application: S.optional(Application) }),
).annotate({
  identifier: "UpdateApplicationResponse",
}) as any as S.Schema<UpdateApplicationResponse>;
export interface UpdateAttributeGroupRequest {
  attributeGroup: string;
  name?: string;
  description?: string;
  attributes?: string;
}
export const UpdateAttributeGroupRequest = S.suspend(() =>
  S.Struct({
    attributeGroup: S.String.pipe(T.HttpLabel("attributeGroup")),
    name: S.optional(S.String),
    description: S.optional(S.String),
    attributes: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/attribute-groups/{attributeGroup}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAttributeGroupRequest",
}) as any as S.Schema<UpdateAttributeGroupRequest>;
export interface UpdateAttributeGroupResponse {
  attributeGroup?: AttributeGroup;
}
export const UpdateAttributeGroupResponse = S.suspend(() =>
  S.Struct({ attributeGroup: S.optional(AttributeGroup) }),
).annotate({
  identifier: "UpdateAttributeGroupResponse",
}) as any as S.Schema<UpdateAttributeGroupResponse>;

//# Errors
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  { message: S.optional(S.String) },
).pipe(C.withConflictError) {}
export class InternalServerException extends S.TaggedErrorClass<InternalServerException>()(
  "InternalServerException",
  { message: S.optional(S.String) },
).pipe(C.withServerError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException extends S.TaggedErrorClass<ServiceQuotaExceededException>()(
  "ServiceQuotaExceededException",
  { message: S.optional(S.String) },
).pipe(C.withQuotaError) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ThrottlingException extends S.TaggedErrorClass<ThrottlingException>()(
  "ThrottlingException",
  { message: S.String, serviceCode: S.optional(S.String) },
).pipe(C.withThrottlingError) {}

//# Operations
export type AssociateAttributeGroupError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Associates an attribute group with an application to augment the application's metadata
 * with the group's attributes. This feature enables applications to be described with
 * user-defined details that are machine-readable, such as third-party integrations.
 */
export const associateAttributeGroup: API.OperationMethod<
  AssociateAttributeGroupRequest,
  AssociateAttributeGroupResponse,
  AssociateAttributeGroupError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AssociateAttributeGroupRequest,
  output: AssociateAttributeGroupResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
}));
export type AssociateResourceError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a resource with an application.
 * The resource can be specified by its ARN or name.
 * The application can be specified by ARN, ID, or name.
 *
 * **Minimum permissions**
 *
 * You must have the following permissions to associate a resource using the `OPTIONS` parameter set to `APPLY_APPLICATION_TAG`.
 *
 * - `tag:GetResources`
 *
 * - `tag:TagResources`
 *
 * You must also have these additional permissions if you don't use the `AWSServiceCatalogAppRegistryFullAccess` policy.
 * For more information, see AWSServiceCatalogAppRegistryFullAccess in the AppRegistry Administrator Guide.
 *
 * - `resource-groups:AssociateResource`
 *
 * - `cloudformation:UpdateStack`
 *
 * - `cloudformation:DescribeStacks`
 *
 * In addition, you must have the tagging permission defined by the Amazon Web Services service that creates the resource.
 * For more information, see TagResources in the *Resource Groups Tagging API Reference*.
 */
export const associateResource: API.OperationMethod<
  AssociateResourceRequest,
  AssociateResourceResponse,
  AssociateResourceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AssociateResourceRequest,
  output: AssociateResourceResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type CreateApplicationError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new application that is the top-level node in a hierarchy of related cloud resource abstractions.
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
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type CreateAttributeGroupError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new attribute group as a container for user-defined attributes. This feature
 * enables users to have full control over their cloud application's metadata in a rich
 * machine-readable format to facilitate integration with automated workflows and third-party
 * tools.
 */
export const createAttributeGroup: API.OperationMethod<
  CreateAttributeGroupRequest,
  CreateAttributeGroupResponse,
  CreateAttributeGroupError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAttributeGroupRequest,
  output: CreateAttributeGroupResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
}));
export type DeleteApplicationError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an application that is specified either by its application ID, name, or ARN. All associated attribute groups and resources must be disassociated from it before deleting an application.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type DeleteAttributeGroupError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an attribute group, specified either by its attribute group ID, name, or ARN.
 */
export const deleteAttributeGroup: API.OperationMethod<
  DeleteAttributeGroupRequest,
  DeleteAttributeGroupResponse,
  DeleteAttributeGroupError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAttributeGroupRequest,
  output: DeleteAttributeGroupResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type DisassociateAttributeGroupError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates an attribute group from an application to remove the extra attributes contained in the attribute group from the application's metadata. This operation reverts `AssociateAttributeGroup`.
 */
export const disassociateAttributeGroup: API.OperationMethod<
  DisassociateAttributeGroupRequest,
  DisassociateAttributeGroupResponse,
  DisassociateAttributeGroupError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociateAttributeGroupRequest,
  output: DisassociateAttributeGroupResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type DisassociateResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a resource from application.
 * Both the resource and the application can be specified either by ID or name.
 *
 * **Minimum permissions**
 *
 * You must have the following permissions to remove a resource that's been associated with an application using the `APPLY_APPLICATION_TAG` option for AssociateResource.
 *
 * - `tag:GetResources`
 *
 * - `tag:UntagResources`
 *
 * You must also have the following permissions if you don't use the `AWSServiceCatalogAppRegistryFullAccess` policy.
 * For more information, see AWSServiceCatalogAppRegistryFullAccess in the AppRegistry Administrator Guide.
 *
 * - `resource-groups:DisassociateResource`
 *
 * - `cloudformation:UpdateStack`
 *
 * - `cloudformation:DescribeStacks`
 *
 * In addition, you must have the tagging permission defined by the Amazon Web Services service that creates the resource.
 * For more information, see UntagResources in the *Resource Groups Tagging API Reference*.
 */
export const disassociateResource: API.OperationMethod<
  DisassociateResourceRequest,
  DisassociateResourceResponse,
  DisassociateResourceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociateResourceRequest,
  output: DisassociateResourceResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type GetApplicationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves metadata information
 * about one
 * of your applications.
 * The application can be specified
 * by its ARN, ID, or name
 * (which is unique
 * within one account
 * in one region
 * at a given point
 * in time).
 * Specify
 * by ARN or ID
 * in automated workflows
 * if you want
 * to make sure
 * that the exact same application is returned or a `ResourceNotFoundException` is thrown,
 * avoiding the ABA addressing problem.
 */
export const getApplication: API.OperationMethod<
  GetApplicationRequest,
  GetApplicationResponse,
  GetApplicationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetApplicationRequest,
  output: GetApplicationResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type GetAssociatedResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets the resource associated with the application.
 */
export const getAssociatedResource: API.OperationMethod<
  GetAssociatedResourceRequest,
  GetAssociatedResourceResponse,
  GetAssociatedResourceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAssociatedResourceRequest,
  output: GetAssociatedResourceResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type GetAttributeGroupError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves an attribute group
 * by its ARN, ID, or name.
 * The attribute group can be specified
 * by its ARN, ID, or name.
 */
export const getAttributeGroup: API.OperationMethod<
  GetAttributeGroupRequest,
  GetAttributeGroupResponse,
  GetAttributeGroupError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAttributeGroupRequest,
  output: GetAttributeGroupResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type GetConfigurationError = InternalServerException | CommonErrors;
/**
 * Retrieves a `TagKey` configuration
 * from an account.
 */
export const getConfiguration: API.OperationMethod<
  GetConfigurationRequest,
  GetConfigurationResponse,
  GetConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetConfigurationRequest,
  output: GetConfigurationResponse,
  errors: [InternalServerException],
}));
export type ListApplicationsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of all of your applications. Results are paginated.
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
    ApplicationSummary,
    ListApplicationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationsRequest,
  output: ListApplicationsResponse,
  errors: [InternalServerException, ValidationException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "applications",
    pageSize: "maxResults",
  } as const,
}));
export type ListAssociatedAttributeGroupsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all attribute groups that are associated with specified application. Results are paginated.
 */
export const listAssociatedAttributeGroups: API.OperationMethod<
  ListAssociatedAttributeGroupsRequest,
  ListAssociatedAttributeGroupsResponse,
  ListAssociatedAttributeGroupsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListAssociatedAttributeGroupsRequest,
  ) => stream.Stream<
    ListAssociatedAttributeGroupsResponse,
    ListAssociatedAttributeGroupsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListAssociatedAttributeGroupsRequest,
  ) => stream.Stream<
    AttributeGroupId,
    ListAssociatedAttributeGroupsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAssociatedAttributeGroupsRequest,
  output: ListAssociatedAttributeGroupsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "attributeGroups",
    pageSize: "maxResults",
  } as const,
}));
export type ListAssociatedResourcesError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all
 * of the resources
 * that are associated
 * with the specified application.
 * Results are paginated.
 *
 * If you share an application,
 * and a consumer account associates a tag query
 * to the application,
 * all of the users
 * who can access the application
 * can also view the tag values
 * in all accounts
 * that are associated
 * with it
 * using this API.
 */
export const listAssociatedResources: API.OperationMethod<
  ListAssociatedResourcesRequest,
  ListAssociatedResourcesResponse,
  ListAssociatedResourcesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListAssociatedResourcesRequest,
  ) => stream.Stream<
    ListAssociatedResourcesResponse,
    ListAssociatedResourcesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListAssociatedResourcesRequest,
  ) => stream.Stream<
    ResourceInfo,
    ListAssociatedResourcesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAssociatedResourcesRequest,
  output: ListAssociatedResourcesResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "resources",
    pageSize: "maxResults",
  } as const,
}));
export type ListAttributeGroupsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists all attribute groups which you have access to. Results are paginated.
 */
export const listAttributeGroups: API.OperationMethod<
  ListAttributeGroupsRequest,
  ListAttributeGroupsResponse,
  ListAttributeGroupsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListAttributeGroupsRequest,
  ) => stream.Stream<
    ListAttributeGroupsResponse,
    ListAttributeGroupsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListAttributeGroupsRequest,
  ) => stream.Stream<
    AttributeGroupSummary,
    ListAttributeGroupsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAttributeGroupsRequest,
  output: ListAttributeGroupsResponse,
  errors: [InternalServerException, ValidationException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "attributeGroups",
    pageSize: "maxResults",
  } as const,
}));
export type ListAttributeGroupsForApplicationError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the details of all attribute groups associated with a specific application. The results display in pages.
 */
export const listAttributeGroupsForApplication: API.OperationMethod<
  ListAttributeGroupsForApplicationRequest,
  ListAttributeGroupsForApplicationResponse,
  ListAttributeGroupsForApplicationError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListAttributeGroupsForApplicationRequest,
  ) => stream.Stream<
    ListAttributeGroupsForApplicationResponse,
    ListAttributeGroupsForApplicationError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListAttributeGroupsForApplicationRequest,
  ) => stream.Stream<
    AttributeGroupDetails,
    ListAttributeGroupsForApplicationError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAttributeGroupsForApplicationRequest,
  output: ListAttributeGroupsForApplicationResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "attributeGroupsDetails",
    pageSize: "maxResults",
  } as const,
}));
export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all of the tags on the resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type PutConfigurationError =
  | ConflictException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Associates a `TagKey` configuration
 * to an account.
 */
export const putConfiguration: API.OperationMethod<
  PutConfigurationRequest,
  PutConfigurationResponse,
  PutConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutConfigurationRequest,
  output: PutConfigurationResponse,
  errors: [ConflictException, InternalServerException, ValidationException],
}));
export type SyncResourceError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Syncs the resource with current AppRegistry records.
 *
 * Specifically, the resource’s AppRegistry system tags sync with its associated application. We remove the resource's AppRegistry system tags if it does not associate with the application. The caller must have permissions to read and update the resource.
 */
export const syncResource: API.OperationMethod<
  SyncResourceRequest,
  SyncResourceResponse,
  SyncResourceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SyncResourceRequest,
  output: SyncResourceResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Assigns one or more tags (key-value pairs) to the specified resource.
 *
 * Each tag consists of a key and an optional value. If a tag with the same key is already associated with the resource, this action updates its value.
 *
 * This operation returns an empty response if the call was successful.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from a resource.
 *
 * This operation returns an empty response if the call was successful.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type UpdateApplicationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing application with new attributes.
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
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type UpdateAttributeGroupError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing attribute group with new details.
 */
export const updateAttributeGroup: API.OperationMethod<
  UpdateAttributeGroupRequest,
  UpdateAttributeGroupResponse,
  UpdateAttributeGroupError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateAttributeGroupRequest,
  output: UpdateAttributeGroupResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
