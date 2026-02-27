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
  sdkId: "amp",
  serviceShapeName: "AmazonPrometheusService",
});
const auth = T.AwsAuthSigv4({ name: "aps" });
const ver = T.ServiceVersion("2020-08-01");
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
              `https://aps-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://aps-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://aps.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://aps.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

//# Newtypes
export type TagKey = string;
export type TagValue = string;
export type ValidationExceptionReason = string;
export type ScraperAlias = string;
export type ClusterArn = string;
export type SecurityGroupId = string;
export type SubnetId = string;
export type WorkspaceArn = string;
export type IamRoleArn = string;
export type IdempotencyToken = string;
export type ScraperId = string;
export type ScraperArn = string;
export type ScraperStatusCode = string;
export type StatusReason = string;
export type FilterKey = string;
export type FilterValue = string;
export type PaginationToken = string;
export type LogGroupArn = string;
export type ScraperComponentType = string;
export type ScraperLoggingConfigurationStatusCode = string;
export type WorkspaceAlias = string;
export type KmsKeyArn = string;
export type WorkspaceId = string;
export type WorkspaceStatusCode = string;
export type Uri = string;
export type AlertManagerDefinitionData = Uint8Array;
export type AlertManagerDefinitionStatusCode = string;
export type AnomalyDetectorAlias = string;
export type AnomalyDetectorEvaluationInterval = number;
export type RandomCutForestQuery = string;
export type PrometheusMetricLabelKey = string;
export type PrometheusMetricLabelValue = string;
export type AnomalyDetectorId = string;
export type AnomalyDetectorArn = string;
export type LoggingConfigurationStatusCode = string;
export type QueryLoggingConfigurationStatusCode = string;
export type RuleGroupsNamespaceName = string;
export type RuleGroupsNamespaceData = Uint8Array;
export type RuleGroupsNamespaceArn = string;
export type RuleGroupsNamespaceStatusCode = string;
export type WorkspaceConfigurationStatusCode = string;
export type LabelName = string;
export type LabelValue = string;
export type WorkspacePolicyStatusCode = string;

//# Schemas
export interface GetDefaultScraperConfigurationRequest {}
export const GetDefaultScraperConfigurationRequest = S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/scraperconfiguration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDefaultScraperConfigurationRequest",
}) as any as S.Schema<GetDefaultScraperConfigurationRequest>;
export interface GetDefaultScraperConfigurationResponse {
  configuration: Uint8Array;
}
export const GetDefaultScraperConfigurationResponse = S.suspend(() =>
  S.Struct({ configuration: T.Blob }),
).annotate({
  identifier: "GetDefaultScraperConfigurationResponse",
}) as any as S.Schema<GetDefaultScraperConfigurationResponse>;
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
export type TagMap = { [key: string]: string | undefined };
export const TagMap = S.Record(S.String, S.String.pipe(S.optional));
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export const ValidationExceptionField = S.suspend(() =>
  S.Struct({ name: S.String, message: S.String }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = S.Array(ValidationExceptionField);
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: TagMap,
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
export type ScrapeConfiguration = { configurationBlob: Uint8Array };
export const ScrapeConfiguration = S.Union([
  S.Struct({ configurationBlob: T.Blob }),
]);
export type SecurityGroupIds = string[];
export const SecurityGroupIds = S.Array(S.String);
export type SubnetIds = string[];
export const SubnetIds = S.Array(S.String);
export interface EksConfiguration {
  clusterArn: string;
  securityGroupIds?: string[];
  subnetIds: string[];
}
export const EksConfiguration = S.suspend(() =>
  S.Struct({
    clusterArn: S.String,
    securityGroupIds: S.optional(SecurityGroupIds),
    subnetIds: SubnetIds,
  }),
).annotate({
  identifier: "EksConfiguration",
}) as any as S.Schema<EksConfiguration>;
export interface VpcConfiguration {
  securityGroupIds: string[];
  subnetIds: string[];
}
export const VpcConfiguration = S.suspend(() =>
  S.Struct({ securityGroupIds: SecurityGroupIds, subnetIds: SubnetIds }),
).annotate({
  identifier: "VpcConfiguration",
}) as any as S.Schema<VpcConfiguration>;
export type Source =
  | { eksConfiguration: EksConfiguration; vpcConfiguration?: never }
  | { eksConfiguration?: never; vpcConfiguration: VpcConfiguration };
export const Source = S.Union([
  S.Struct({ eksConfiguration: EksConfiguration }),
  S.Struct({ vpcConfiguration: VpcConfiguration }),
]);
export interface AmpConfiguration {
  workspaceArn: string;
}
export const AmpConfiguration = S.suspend(() =>
  S.Struct({ workspaceArn: S.String }),
).annotate({
  identifier: "AmpConfiguration",
}) as any as S.Schema<AmpConfiguration>;
export type Destination = { ampConfiguration: AmpConfiguration };
export const Destination = S.Union([
  S.Struct({ ampConfiguration: AmpConfiguration }),
]);
export interface RoleConfiguration {
  sourceRoleArn?: string;
  targetRoleArn?: string;
}
export const RoleConfiguration = S.suspend(() =>
  S.Struct({
    sourceRoleArn: S.optional(S.String),
    targetRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "RoleConfiguration",
}) as any as S.Schema<RoleConfiguration>;
export interface CreateScraperRequest {
  alias?: string;
  scrapeConfiguration: ScrapeConfiguration;
  source: Source;
  destination: Destination;
  roleConfiguration?: RoleConfiguration;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateScraperRequest = S.suspend(() =>
  S.Struct({
    alias: S.optional(S.String),
    scrapeConfiguration: ScrapeConfiguration,
    source: Source,
    destination: Destination,
    roleConfiguration: S.optional(RoleConfiguration),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/scrapers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateScraperRequest",
}) as any as S.Schema<CreateScraperRequest>;
export interface ScraperStatus {
  statusCode: string;
}
export const ScraperStatus = S.suspend(() =>
  S.Struct({ statusCode: S.String }),
).annotate({ identifier: "ScraperStatus" }) as any as S.Schema<ScraperStatus>;
export interface CreateScraperResponse {
  scraperId: string;
  arn: string;
  status: ScraperStatus;
  tags?: { [key: string]: string | undefined };
}
export const CreateScraperResponse = S.suspend(() =>
  S.Struct({
    scraperId: S.String,
    arn: S.String,
    status: ScraperStatus,
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "CreateScraperResponse",
}) as any as S.Schema<CreateScraperResponse>;
export interface DescribeScraperRequest {
  scraperId: string;
}
export const DescribeScraperRequest = S.suspend(() =>
  S.Struct({ scraperId: S.String.pipe(T.HttpLabel("scraperId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/scrapers/{scraperId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeScraperRequest",
}) as any as S.Schema<DescribeScraperRequest>;
export interface ScraperDescription {
  alias?: string;
  scraperId: string;
  arn: string;
  roleArn: string;
  status: ScraperStatus;
  createdAt: Date;
  lastModifiedAt: Date;
  tags?: { [key: string]: string | undefined };
  statusReason?: string;
  scrapeConfiguration: ScrapeConfiguration;
  source: Source;
  destination: Destination;
  roleConfiguration?: RoleConfiguration;
}
export const ScraperDescription = S.suspend(() =>
  S.Struct({
    alias: S.optional(S.String),
    scraperId: S.String,
    arn: S.String,
    roleArn: S.String,
    status: ScraperStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    tags: S.optional(TagMap),
    statusReason: S.optional(S.String),
    scrapeConfiguration: ScrapeConfiguration,
    source: Source,
    destination: Destination,
    roleConfiguration: S.optional(RoleConfiguration),
  }),
).annotate({
  identifier: "ScraperDescription",
}) as any as S.Schema<ScraperDescription>;
export interface DescribeScraperResponse {
  scraper: ScraperDescription;
}
export const DescribeScraperResponse = S.suspend(() =>
  S.Struct({ scraper: ScraperDescription }),
).annotate({
  identifier: "DescribeScraperResponse",
}) as any as S.Schema<DescribeScraperResponse>;
export interface UpdateScraperRequest {
  scraperId: string;
  alias?: string;
  scrapeConfiguration?: ScrapeConfiguration;
  destination?: Destination;
  roleConfiguration?: RoleConfiguration;
  clientToken?: string;
}
export const UpdateScraperRequest = S.suspend(() =>
  S.Struct({
    scraperId: S.String.pipe(T.HttpLabel("scraperId")),
    alias: S.optional(S.String),
    scrapeConfiguration: S.optional(ScrapeConfiguration),
    destination: S.optional(Destination),
    roleConfiguration: S.optional(RoleConfiguration),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/scrapers/{scraperId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateScraperRequest",
}) as any as S.Schema<UpdateScraperRequest>;
export interface UpdateScraperResponse {
  scraperId: string;
  arn: string;
  status: ScraperStatus;
  tags?: { [key: string]: string | undefined };
}
export const UpdateScraperResponse = S.suspend(() =>
  S.Struct({
    scraperId: S.String,
    arn: S.String,
    status: ScraperStatus,
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "UpdateScraperResponse",
}) as any as S.Schema<UpdateScraperResponse>;
export interface DeleteScraperRequest {
  scraperId: string;
  clientToken?: string;
}
export const DeleteScraperRequest = S.suspend(() =>
  S.Struct({
    scraperId: S.String.pipe(T.HttpLabel("scraperId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/scrapers/{scraperId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteScraperRequest",
}) as any as S.Schema<DeleteScraperRequest>;
export interface DeleteScraperResponse {
  scraperId: string;
  status: ScraperStatus;
}
export const DeleteScraperResponse = S.suspend(() =>
  S.Struct({ scraperId: S.String, status: ScraperStatus }),
).annotate({
  identifier: "DeleteScraperResponse",
}) as any as S.Schema<DeleteScraperResponse>;
export type FilterValues = string[];
export const FilterValues = S.Array(S.String);
export type ScraperFilters = { [key: string]: string[] | undefined };
export const ScraperFilters = S.Record(S.String, FilterValues.pipe(S.optional));
export interface ListScrapersRequest {
  filters?: { [key: string]: string[] | undefined };
  nextToken?: string;
  maxResults?: number;
}
export const ListScrapersRequest = S.suspend(() =>
  S.Struct({
    filters: S.optional(ScraperFilters).pipe(T.HttpQueryParams()),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/scrapers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListScrapersRequest",
}) as any as S.Schema<ListScrapersRequest>;
export interface ScraperSummary {
  alias?: string;
  scraperId: string;
  arn: string;
  roleArn: string;
  status: ScraperStatus;
  createdAt: Date;
  lastModifiedAt: Date;
  tags?: { [key: string]: string | undefined };
  statusReason?: string;
  source: Source;
  destination: Destination;
  roleConfiguration?: RoleConfiguration;
}
export const ScraperSummary = S.suspend(() =>
  S.Struct({
    alias: S.optional(S.String),
    scraperId: S.String,
    arn: S.String,
    roleArn: S.String,
    status: ScraperStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    tags: S.optional(TagMap),
    statusReason: S.optional(S.String),
    source: Source,
    destination: Destination,
    roleConfiguration: S.optional(RoleConfiguration),
  }),
).annotate({ identifier: "ScraperSummary" }) as any as S.Schema<ScraperSummary>;
export type ScraperSummaryList = ScraperSummary[];
export const ScraperSummaryList = S.Array(ScraperSummary);
export interface ListScrapersResponse {
  scrapers: ScraperSummary[];
  nextToken?: string;
}
export const ListScrapersResponse = S.suspend(() =>
  S.Struct({ scrapers: ScraperSummaryList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListScrapersResponse",
}) as any as S.Schema<ListScrapersResponse>;
export interface CloudWatchLogDestination {
  logGroupArn: string;
}
export const CloudWatchLogDestination = S.suspend(() =>
  S.Struct({ logGroupArn: S.String }),
).annotate({
  identifier: "CloudWatchLogDestination",
}) as any as S.Schema<CloudWatchLogDestination>;
export type ScraperLoggingDestination = {
  cloudWatchLogs: CloudWatchLogDestination;
};
export const ScraperLoggingDestination = S.Union([
  S.Struct({ cloudWatchLogs: CloudWatchLogDestination }),
]);
export type StringMap = { [key: string]: string | undefined };
export const StringMap = S.Record(S.String, S.String.pipe(S.optional));
export interface ComponentConfig {
  options?: { [key: string]: string | undefined };
}
export const ComponentConfig = S.suspend(() =>
  S.Struct({ options: S.optional(StringMap) }),
).annotate({
  identifier: "ComponentConfig",
}) as any as S.Schema<ComponentConfig>;
export interface ScraperComponent {
  type: string;
  config?: ComponentConfig;
}
export const ScraperComponent = S.suspend(() =>
  S.Struct({ type: S.String, config: S.optional(ComponentConfig) }),
).annotate({
  identifier: "ScraperComponent",
}) as any as S.Schema<ScraperComponent>;
export type ScraperComponents = ScraperComponent[];
export const ScraperComponents = S.Array(ScraperComponent);
export interface UpdateScraperLoggingConfigurationRequest {
  scraperId: string;
  loggingDestination: ScraperLoggingDestination;
  scraperComponents?: ScraperComponent[];
}
export const UpdateScraperLoggingConfigurationRequest = S.suspend(() =>
  S.Struct({
    scraperId: S.String.pipe(T.HttpLabel("scraperId")),
    loggingDestination: ScraperLoggingDestination,
    scraperComponents: S.optional(ScraperComponents),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/scrapers/{scraperId}/logging-configuration",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateScraperLoggingConfigurationRequest",
}) as any as S.Schema<UpdateScraperLoggingConfigurationRequest>;
export interface ScraperLoggingConfigurationStatus {
  statusCode: string;
  statusReason?: string;
}
export const ScraperLoggingConfigurationStatus = S.suspend(() =>
  S.Struct({ statusCode: S.String, statusReason: S.optional(S.String) }),
).annotate({
  identifier: "ScraperLoggingConfigurationStatus",
}) as any as S.Schema<ScraperLoggingConfigurationStatus>;
export interface UpdateScraperLoggingConfigurationResponse {
  status: ScraperLoggingConfigurationStatus;
}
export const UpdateScraperLoggingConfigurationResponse = S.suspend(() =>
  S.Struct({ status: ScraperLoggingConfigurationStatus }),
).annotate({
  identifier: "UpdateScraperLoggingConfigurationResponse",
}) as any as S.Schema<UpdateScraperLoggingConfigurationResponse>;
export interface DescribeScraperLoggingConfigurationRequest {
  scraperId: string;
}
export const DescribeScraperLoggingConfigurationRequest = S.suspend(() =>
  S.Struct({ scraperId: S.String.pipe(T.HttpLabel("scraperId")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/scrapers/{scraperId}/logging-configuration",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeScraperLoggingConfigurationRequest",
}) as any as S.Schema<DescribeScraperLoggingConfigurationRequest>;
export interface DescribeScraperLoggingConfigurationResponse {
  status: ScraperLoggingConfigurationStatus;
  scraperId: string;
  loggingDestination: ScraperLoggingDestination;
  scraperComponents: ScraperComponent[];
  modifiedAt: Date;
}
export const DescribeScraperLoggingConfigurationResponse = S.suspend(() =>
  S.Struct({
    status: ScraperLoggingConfigurationStatus,
    scraperId: S.String,
    loggingDestination: ScraperLoggingDestination,
    scraperComponents: ScraperComponents,
    modifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "DescribeScraperLoggingConfigurationResponse",
}) as any as S.Schema<DescribeScraperLoggingConfigurationResponse>;
export interface DeleteScraperLoggingConfigurationRequest {
  scraperId: string;
  clientToken?: string;
}
export const DeleteScraperLoggingConfigurationRequest = S.suspend(() =>
  S.Struct({
    scraperId: S.String.pipe(T.HttpLabel("scraperId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/scrapers/{scraperId}/logging-configuration",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteScraperLoggingConfigurationRequest",
}) as any as S.Schema<DeleteScraperLoggingConfigurationRequest>;
export interface DeleteScraperLoggingConfigurationResponse {}
export const DeleteScraperLoggingConfigurationResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteScraperLoggingConfigurationResponse",
}) as any as S.Schema<DeleteScraperLoggingConfigurationResponse>;
export interface CreateWorkspaceRequest {
  alias?: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
}
export const CreateWorkspaceRequest = S.suspend(() =>
  S.Struct({
    alias: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
    kmsKeyArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/workspaces" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateWorkspaceRequest",
}) as any as S.Schema<CreateWorkspaceRequest>;
export interface WorkspaceStatus {
  statusCode: string;
}
export const WorkspaceStatus = S.suspend(() =>
  S.Struct({ statusCode: S.String }),
).annotate({
  identifier: "WorkspaceStatus",
}) as any as S.Schema<WorkspaceStatus>;
export interface CreateWorkspaceResponse {
  workspaceId: string;
  arn: string;
  status: WorkspaceStatus;
  tags?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
}
export const CreateWorkspaceResponse = S.suspend(() =>
  S.Struct({
    workspaceId: S.String,
    arn: S.String,
    status: WorkspaceStatus,
    tags: S.optional(TagMap),
    kmsKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateWorkspaceResponse",
}) as any as S.Schema<CreateWorkspaceResponse>;
export interface DescribeWorkspaceRequest {
  workspaceId: string;
}
export const DescribeWorkspaceRequest = S.suspend(() =>
  S.Struct({ workspaceId: S.String.pipe(T.HttpLabel("workspaceId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/workspaces/{workspaceId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeWorkspaceRequest",
}) as any as S.Schema<DescribeWorkspaceRequest>;
export interface WorkspaceDescription {
  workspaceId: string;
  alias?: string;
  arn: string;
  status: WorkspaceStatus;
  prometheusEndpoint?: string;
  createdAt: Date;
  tags?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
}
export const WorkspaceDescription = S.suspend(() =>
  S.Struct({
    workspaceId: S.String,
    alias: S.optional(S.String),
    arn: S.String,
    status: WorkspaceStatus,
    prometheusEndpoint: S.optional(S.String),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    tags: S.optional(TagMap),
    kmsKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkspaceDescription",
}) as any as S.Schema<WorkspaceDescription>;
export interface DescribeWorkspaceResponse {
  workspace: WorkspaceDescription;
}
export const DescribeWorkspaceResponse = S.suspend(() =>
  S.Struct({ workspace: WorkspaceDescription }),
).annotate({
  identifier: "DescribeWorkspaceResponse",
}) as any as S.Schema<DescribeWorkspaceResponse>;
export interface UpdateWorkspaceAliasRequest {
  workspaceId: string;
  alias?: string;
  clientToken?: string;
}
export const UpdateWorkspaceAliasRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    alias: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/workspaces/{workspaceId}/alias" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateWorkspaceAliasRequest",
}) as any as S.Schema<UpdateWorkspaceAliasRequest>;
export interface UpdateWorkspaceAliasResponse {}
export const UpdateWorkspaceAliasResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateWorkspaceAliasResponse",
}) as any as S.Schema<UpdateWorkspaceAliasResponse>;
export interface DeleteWorkspaceRequest {
  workspaceId: string;
  clientToken?: string;
}
export const DeleteWorkspaceRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/workspaces/{workspaceId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteWorkspaceRequest",
}) as any as S.Schema<DeleteWorkspaceRequest>;
export interface DeleteWorkspaceResponse {}
export const DeleteWorkspaceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteWorkspaceResponse",
}) as any as S.Schema<DeleteWorkspaceResponse>;
export interface ListWorkspacesRequest {
  nextToken?: string;
  alias?: string;
  maxResults?: number;
}
export const ListWorkspacesRequest = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    alias: S.optional(S.String).pipe(T.HttpQuery("alias")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/workspaces" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWorkspacesRequest",
}) as any as S.Schema<ListWorkspacesRequest>;
export interface WorkspaceSummary {
  workspaceId: string;
  alias?: string;
  arn: string;
  status: WorkspaceStatus;
  createdAt: Date;
  tags?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
}
export const WorkspaceSummary = S.suspend(() =>
  S.Struct({
    workspaceId: S.String,
    alias: S.optional(S.String),
    arn: S.String,
    status: WorkspaceStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    tags: S.optional(TagMap),
    kmsKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkspaceSummary",
}) as any as S.Schema<WorkspaceSummary>;
export type WorkspaceSummaryList = WorkspaceSummary[];
export const WorkspaceSummaryList = S.Array(WorkspaceSummary);
export interface ListWorkspacesResponse {
  workspaces: WorkspaceSummary[];
  nextToken?: string;
}
export const ListWorkspacesResponse = S.suspend(() =>
  S.Struct({
    workspaces: WorkspaceSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListWorkspacesResponse",
}) as any as S.Schema<ListWorkspacesResponse>;
export interface CreateAlertManagerDefinitionRequest {
  workspaceId: string;
  data: Uint8Array;
  clientToken?: string;
}
export const CreateAlertManagerDefinitionRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    data: T.Blob,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/workspaces/{workspaceId}/alertmanager/definition",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAlertManagerDefinitionRequest",
}) as any as S.Schema<CreateAlertManagerDefinitionRequest>;
export interface AlertManagerDefinitionStatus {
  statusCode: string;
  statusReason?: string;
}
export const AlertManagerDefinitionStatus = S.suspend(() =>
  S.Struct({ statusCode: S.String, statusReason: S.optional(S.String) }),
).annotate({
  identifier: "AlertManagerDefinitionStatus",
}) as any as S.Schema<AlertManagerDefinitionStatus>;
export interface CreateAlertManagerDefinitionResponse {
  status: AlertManagerDefinitionStatus;
}
export const CreateAlertManagerDefinitionResponse = S.suspend(() =>
  S.Struct({ status: AlertManagerDefinitionStatus }),
).annotate({
  identifier: "CreateAlertManagerDefinitionResponse",
}) as any as S.Schema<CreateAlertManagerDefinitionResponse>;
export interface DescribeAlertManagerDefinitionRequest {
  workspaceId: string;
}
export const DescribeAlertManagerDefinitionRequest = S.suspend(() =>
  S.Struct({ workspaceId: S.String.pipe(T.HttpLabel("workspaceId")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/workspaces/{workspaceId}/alertmanager/definition",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAlertManagerDefinitionRequest",
}) as any as S.Schema<DescribeAlertManagerDefinitionRequest>;
export interface AlertManagerDefinitionDescription {
  status: AlertManagerDefinitionStatus;
  data: Uint8Array;
  createdAt: Date;
  modifiedAt: Date;
}
export const AlertManagerDefinitionDescription = S.suspend(() =>
  S.Struct({
    status: AlertManagerDefinitionStatus,
    data: T.Blob,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    modifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "AlertManagerDefinitionDescription",
}) as any as S.Schema<AlertManagerDefinitionDescription>;
export interface DescribeAlertManagerDefinitionResponse {
  alertManagerDefinition: AlertManagerDefinitionDescription;
}
export const DescribeAlertManagerDefinitionResponse = S.suspend(() =>
  S.Struct({ alertManagerDefinition: AlertManagerDefinitionDescription }),
).annotate({
  identifier: "DescribeAlertManagerDefinitionResponse",
}) as any as S.Schema<DescribeAlertManagerDefinitionResponse>;
export interface PutAlertManagerDefinitionRequest {
  workspaceId: string;
  data: Uint8Array;
  clientToken?: string;
}
export const PutAlertManagerDefinitionRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    data: T.Blob,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/workspaces/{workspaceId}/alertmanager/definition",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutAlertManagerDefinitionRequest",
}) as any as S.Schema<PutAlertManagerDefinitionRequest>;
export interface PutAlertManagerDefinitionResponse {
  status: AlertManagerDefinitionStatus;
}
export const PutAlertManagerDefinitionResponse = S.suspend(() =>
  S.Struct({ status: AlertManagerDefinitionStatus }),
).annotate({
  identifier: "PutAlertManagerDefinitionResponse",
}) as any as S.Schema<PutAlertManagerDefinitionResponse>;
export interface DeleteAlertManagerDefinitionRequest {
  workspaceId: string;
  clientToken?: string;
}
export const DeleteAlertManagerDefinitionRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/workspaces/{workspaceId}/alertmanager/definition",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAlertManagerDefinitionRequest",
}) as any as S.Schema<DeleteAlertManagerDefinitionRequest>;
export interface DeleteAlertManagerDefinitionResponse {}
export const DeleteAlertManagerDefinitionResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAlertManagerDefinitionResponse",
}) as any as S.Schema<DeleteAlertManagerDefinitionResponse>;
export type AnomalyDetectorMissingDataAction =
  | { markAsAnomaly: boolean; skip?: never }
  | { markAsAnomaly?: never; skip: boolean };
export const AnomalyDetectorMissingDataAction = S.Union([
  S.Struct({ markAsAnomaly: S.Boolean }),
  S.Struct({ skip: S.Boolean }),
]);
export type IgnoreNearExpected =
  | { amount: number; ratio?: never }
  | { amount?: never; ratio: number };
export const IgnoreNearExpected = S.Union([
  S.Struct({ amount: S.Number }),
  S.Struct({ ratio: S.Number }),
]);
export interface RandomCutForestConfiguration {
  query: string;
  shingleSize?: number;
  sampleSize?: number;
  ignoreNearExpectedFromAbove?: IgnoreNearExpected;
  ignoreNearExpectedFromBelow?: IgnoreNearExpected;
}
export const RandomCutForestConfiguration = S.suspend(() =>
  S.Struct({
    query: S.String,
    shingleSize: S.optional(S.Number),
    sampleSize: S.optional(S.Number),
    ignoreNearExpectedFromAbove: S.optional(IgnoreNearExpected),
    ignoreNearExpectedFromBelow: S.optional(IgnoreNearExpected),
  }),
).annotate({
  identifier: "RandomCutForestConfiguration",
}) as any as S.Schema<RandomCutForestConfiguration>;
export type AnomalyDetectorConfiguration = {
  randomCutForest: RandomCutForestConfiguration;
};
export const AnomalyDetectorConfiguration = S.Union([
  S.Struct({ randomCutForest: RandomCutForestConfiguration }),
]);
export type PrometheusMetricLabelMap = { [key: string]: string | undefined };
export const PrometheusMetricLabelMap = S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateAnomalyDetectorRequest {
  workspaceId: string;
  alias: string;
  evaluationIntervalInSeconds?: number;
  missingDataAction?: AnomalyDetectorMissingDataAction;
  configuration: AnomalyDetectorConfiguration;
  labels?: { [key: string]: string | undefined };
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateAnomalyDetectorRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    alias: S.String,
    evaluationIntervalInSeconds: S.optional(S.Number),
    missingDataAction: S.optional(AnomalyDetectorMissingDataAction),
    configuration: AnomalyDetectorConfiguration,
    labels: S.optional(PrometheusMetricLabelMap),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/workspaces/{workspaceId}/anomalydetectors",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAnomalyDetectorRequest",
}) as any as S.Schema<CreateAnomalyDetectorRequest>;
export type AnomalyDetectorStatusCode =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "CREATION_FAILED"
  | "UPDATE_FAILED"
  | "DELETION_FAILED"
  | (string & {});
export const AnomalyDetectorStatusCode = S.String;
export interface AnomalyDetectorStatus {
  statusCode: AnomalyDetectorStatusCode;
  statusReason?: string;
}
export const AnomalyDetectorStatus = S.suspend(() =>
  S.Struct({
    statusCode: AnomalyDetectorStatusCode,
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "AnomalyDetectorStatus",
}) as any as S.Schema<AnomalyDetectorStatus>;
export interface CreateAnomalyDetectorResponse {
  anomalyDetectorId: string;
  arn: string;
  status: AnomalyDetectorStatus;
  tags?: { [key: string]: string | undefined };
}
export const CreateAnomalyDetectorResponse = S.suspend(() =>
  S.Struct({
    anomalyDetectorId: S.String,
    arn: S.String,
    status: AnomalyDetectorStatus,
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "CreateAnomalyDetectorResponse",
}) as any as S.Schema<CreateAnomalyDetectorResponse>;
export interface PutAnomalyDetectorRequest {
  workspaceId: string;
  anomalyDetectorId: string;
  evaluationIntervalInSeconds?: number;
  missingDataAction?: AnomalyDetectorMissingDataAction;
  configuration: AnomalyDetectorConfiguration;
  labels?: { [key: string]: string | undefined };
  clientToken?: string;
}
export const PutAnomalyDetectorRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    anomalyDetectorId: S.String.pipe(T.HttpLabel("anomalyDetectorId")),
    evaluationIntervalInSeconds: S.optional(S.Number),
    missingDataAction: S.optional(AnomalyDetectorMissingDataAction),
    configuration: AnomalyDetectorConfiguration,
    labels: S.optional(PrometheusMetricLabelMap),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/workspaces/{workspaceId}/anomalydetectors/{anomalyDetectorId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutAnomalyDetectorRequest",
}) as any as S.Schema<PutAnomalyDetectorRequest>;
export interface PutAnomalyDetectorResponse {
  anomalyDetectorId: string;
  arn: string;
  status: AnomalyDetectorStatus;
  tags?: { [key: string]: string | undefined };
}
export const PutAnomalyDetectorResponse = S.suspend(() =>
  S.Struct({
    anomalyDetectorId: S.String,
    arn: S.String,
    status: AnomalyDetectorStatus,
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "PutAnomalyDetectorResponse",
}) as any as S.Schema<PutAnomalyDetectorResponse>;
export interface DescribeAnomalyDetectorRequest {
  workspaceId: string;
  anomalyDetectorId: string;
}
export const DescribeAnomalyDetectorRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    anomalyDetectorId: S.String.pipe(T.HttpLabel("anomalyDetectorId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/workspaces/{workspaceId}/anomalydetectors/{anomalyDetectorId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAnomalyDetectorRequest",
}) as any as S.Schema<DescribeAnomalyDetectorRequest>;
export interface AnomalyDetectorDescription {
  arn: string;
  anomalyDetectorId: string;
  alias: string;
  evaluationIntervalInSeconds?: number;
  missingDataAction?: AnomalyDetectorMissingDataAction;
  configuration?: AnomalyDetectorConfiguration;
  labels?: { [key: string]: string | undefined };
  status: AnomalyDetectorStatus;
  createdAt: Date;
  modifiedAt: Date;
  tags?: { [key: string]: string | undefined };
}
export const AnomalyDetectorDescription = S.suspend(() =>
  S.Struct({
    arn: S.String,
    anomalyDetectorId: S.String,
    alias: S.String,
    evaluationIntervalInSeconds: S.optional(S.Number),
    missingDataAction: S.optional(AnomalyDetectorMissingDataAction),
    configuration: S.optional(AnomalyDetectorConfiguration),
    labels: S.optional(PrometheusMetricLabelMap),
    status: AnomalyDetectorStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    modifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "AnomalyDetectorDescription",
}) as any as S.Schema<AnomalyDetectorDescription>;
export interface DescribeAnomalyDetectorResponse {
  anomalyDetector: AnomalyDetectorDescription;
}
export const DescribeAnomalyDetectorResponse = S.suspend(() =>
  S.Struct({ anomalyDetector: AnomalyDetectorDescription }),
).annotate({
  identifier: "DescribeAnomalyDetectorResponse",
}) as any as S.Schema<DescribeAnomalyDetectorResponse>;
export interface DeleteAnomalyDetectorRequest {
  workspaceId: string;
  anomalyDetectorId: string;
  clientToken?: string;
}
export const DeleteAnomalyDetectorRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    anomalyDetectorId: S.String.pipe(T.HttpLabel("anomalyDetectorId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/workspaces/{workspaceId}/anomalydetectors/{anomalyDetectorId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAnomalyDetectorRequest",
}) as any as S.Schema<DeleteAnomalyDetectorRequest>;
export interface DeleteAnomalyDetectorResponse {}
export const DeleteAnomalyDetectorResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAnomalyDetectorResponse",
}) as any as S.Schema<DeleteAnomalyDetectorResponse>;
export interface ListAnomalyDetectorsRequest {
  workspaceId: string;
  alias?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListAnomalyDetectorsRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    alias: S.optional(S.String).pipe(T.HttpQuery("alias")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/workspaces/{workspaceId}/anomalydetectors",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAnomalyDetectorsRequest",
}) as any as S.Schema<ListAnomalyDetectorsRequest>;
export interface AnomalyDetectorSummary {
  arn: string;
  anomalyDetectorId: string;
  alias: string;
  status: AnomalyDetectorStatus;
  createdAt: Date;
  modifiedAt: Date;
  tags?: { [key: string]: string | undefined };
}
export const AnomalyDetectorSummary = S.suspend(() =>
  S.Struct({
    arn: S.String,
    anomalyDetectorId: S.String,
    alias: S.String,
    status: AnomalyDetectorStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    modifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "AnomalyDetectorSummary",
}) as any as S.Schema<AnomalyDetectorSummary>;
export type AnomalyDetectorSummaryList = AnomalyDetectorSummary[];
export const AnomalyDetectorSummaryList = S.Array(AnomalyDetectorSummary);
export interface ListAnomalyDetectorsResponse {
  anomalyDetectors: AnomalyDetectorSummary[];
  nextToken?: string;
}
export const ListAnomalyDetectorsResponse = S.suspend(() =>
  S.Struct({
    anomalyDetectors: AnomalyDetectorSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAnomalyDetectorsResponse",
}) as any as S.Schema<ListAnomalyDetectorsResponse>;
export interface CreateLoggingConfigurationRequest {
  workspaceId: string;
  logGroupArn: string;
  clientToken?: string;
}
export const CreateLoggingConfigurationRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    logGroupArn: S.String,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/workspaces/{workspaceId}/logging" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateLoggingConfigurationRequest",
}) as any as S.Schema<CreateLoggingConfigurationRequest>;
export interface LoggingConfigurationStatus {
  statusCode: string;
  statusReason?: string;
}
export const LoggingConfigurationStatus = S.suspend(() =>
  S.Struct({ statusCode: S.String, statusReason: S.optional(S.String) }),
).annotate({
  identifier: "LoggingConfigurationStatus",
}) as any as S.Schema<LoggingConfigurationStatus>;
export interface CreateLoggingConfigurationResponse {
  status: LoggingConfigurationStatus;
}
export const CreateLoggingConfigurationResponse = S.suspend(() =>
  S.Struct({ status: LoggingConfigurationStatus }),
).annotate({
  identifier: "CreateLoggingConfigurationResponse",
}) as any as S.Schema<CreateLoggingConfigurationResponse>;
export interface DescribeLoggingConfigurationRequest {
  workspaceId: string;
}
export const DescribeLoggingConfigurationRequest = S.suspend(() =>
  S.Struct({ workspaceId: S.String.pipe(T.HttpLabel("workspaceId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/workspaces/{workspaceId}/logging" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeLoggingConfigurationRequest",
}) as any as S.Schema<DescribeLoggingConfigurationRequest>;
export interface LoggingConfigurationMetadata {
  status: LoggingConfigurationStatus;
  workspace: string;
  logGroupArn: string;
  createdAt: Date;
  modifiedAt: Date;
}
export const LoggingConfigurationMetadata = S.suspend(() =>
  S.Struct({
    status: LoggingConfigurationStatus,
    workspace: S.String,
    logGroupArn: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    modifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "LoggingConfigurationMetadata",
}) as any as S.Schema<LoggingConfigurationMetadata>;
export interface DescribeLoggingConfigurationResponse {
  loggingConfiguration: LoggingConfigurationMetadata;
}
export const DescribeLoggingConfigurationResponse = S.suspend(() =>
  S.Struct({ loggingConfiguration: LoggingConfigurationMetadata }),
).annotate({
  identifier: "DescribeLoggingConfigurationResponse",
}) as any as S.Schema<DescribeLoggingConfigurationResponse>;
export interface UpdateLoggingConfigurationRequest {
  workspaceId: string;
  logGroupArn: string;
  clientToken?: string;
}
export const UpdateLoggingConfigurationRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    logGroupArn: S.String,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/workspaces/{workspaceId}/logging" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateLoggingConfigurationRequest",
}) as any as S.Schema<UpdateLoggingConfigurationRequest>;
export interface UpdateLoggingConfigurationResponse {
  status: LoggingConfigurationStatus;
}
export const UpdateLoggingConfigurationResponse = S.suspend(() =>
  S.Struct({ status: LoggingConfigurationStatus }),
).annotate({
  identifier: "UpdateLoggingConfigurationResponse",
}) as any as S.Schema<UpdateLoggingConfigurationResponse>;
export interface DeleteLoggingConfigurationRequest {
  workspaceId: string;
  clientToken?: string;
}
export const DeleteLoggingConfigurationRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/workspaces/{workspaceId}/logging" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteLoggingConfigurationRequest",
}) as any as S.Schema<DeleteLoggingConfigurationRequest>;
export interface DeleteLoggingConfigurationResponse {}
export const DeleteLoggingConfigurationResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteLoggingConfigurationResponse",
}) as any as S.Schema<DeleteLoggingConfigurationResponse>;
export interface LoggingFilter {
  qspThreshold: number;
}
export const LoggingFilter = S.suspend(() =>
  S.Struct({ qspThreshold: S.Number }),
).annotate({ identifier: "LoggingFilter" }) as any as S.Schema<LoggingFilter>;
export interface LoggingDestination {
  cloudWatchLogs: CloudWatchLogDestination;
  filters: LoggingFilter;
}
export const LoggingDestination = S.suspend(() =>
  S.Struct({
    cloudWatchLogs: CloudWatchLogDestination,
    filters: LoggingFilter,
  }),
).annotate({
  identifier: "LoggingDestination",
}) as any as S.Schema<LoggingDestination>;
export type LoggingDestinations = LoggingDestination[];
export const LoggingDestinations = S.Array(LoggingDestination);
export interface CreateQueryLoggingConfigurationRequest {
  workspaceId: string;
  destinations: LoggingDestination[];
  clientToken?: string;
}
export const CreateQueryLoggingConfigurationRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    destinations: LoggingDestinations,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/workspaces/{workspaceId}/logging/query",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateQueryLoggingConfigurationRequest",
}) as any as S.Schema<CreateQueryLoggingConfigurationRequest>;
export interface QueryLoggingConfigurationStatus {
  statusCode: string;
  statusReason?: string;
}
export const QueryLoggingConfigurationStatus = S.suspend(() =>
  S.Struct({ statusCode: S.String, statusReason: S.optional(S.String) }),
).annotate({
  identifier: "QueryLoggingConfigurationStatus",
}) as any as S.Schema<QueryLoggingConfigurationStatus>;
export interface CreateQueryLoggingConfigurationResponse {
  status: QueryLoggingConfigurationStatus;
}
export const CreateQueryLoggingConfigurationResponse = S.suspend(() =>
  S.Struct({ status: QueryLoggingConfigurationStatus }),
).annotate({
  identifier: "CreateQueryLoggingConfigurationResponse",
}) as any as S.Schema<CreateQueryLoggingConfigurationResponse>;
export interface DescribeQueryLoggingConfigurationRequest {
  workspaceId: string;
}
export const DescribeQueryLoggingConfigurationRequest = S.suspend(() =>
  S.Struct({ workspaceId: S.String.pipe(T.HttpLabel("workspaceId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/workspaces/{workspaceId}/logging/query" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeQueryLoggingConfigurationRequest",
}) as any as S.Schema<DescribeQueryLoggingConfigurationRequest>;
export interface QueryLoggingConfigurationMetadata {
  status: QueryLoggingConfigurationStatus;
  workspace: string;
  destinations: LoggingDestination[];
  createdAt: Date;
  modifiedAt: Date;
}
export const QueryLoggingConfigurationMetadata = S.suspend(() =>
  S.Struct({
    status: QueryLoggingConfigurationStatus,
    workspace: S.String,
    destinations: LoggingDestinations,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    modifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "QueryLoggingConfigurationMetadata",
}) as any as S.Schema<QueryLoggingConfigurationMetadata>;
export interface DescribeQueryLoggingConfigurationResponse {
  queryLoggingConfiguration: QueryLoggingConfigurationMetadata;
}
export const DescribeQueryLoggingConfigurationResponse = S.suspend(() =>
  S.Struct({ queryLoggingConfiguration: QueryLoggingConfigurationMetadata }),
).annotate({
  identifier: "DescribeQueryLoggingConfigurationResponse",
}) as any as S.Schema<DescribeQueryLoggingConfigurationResponse>;
export interface UpdateQueryLoggingConfigurationRequest {
  workspaceId: string;
  destinations: LoggingDestination[];
  clientToken?: string;
}
export const UpdateQueryLoggingConfigurationRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    destinations: LoggingDestinations,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/workspaces/{workspaceId}/logging/query" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateQueryLoggingConfigurationRequest",
}) as any as S.Schema<UpdateQueryLoggingConfigurationRequest>;
export interface UpdateQueryLoggingConfigurationResponse {
  status: QueryLoggingConfigurationStatus;
}
export const UpdateQueryLoggingConfigurationResponse = S.suspend(() =>
  S.Struct({ status: QueryLoggingConfigurationStatus }),
).annotate({
  identifier: "UpdateQueryLoggingConfigurationResponse",
}) as any as S.Schema<UpdateQueryLoggingConfigurationResponse>;
export interface DeleteQueryLoggingConfigurationRequest {
  workspaceId: string;
  clientToken?: string;
}
export const DeleteQueryLoggingConfigurationRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/workspaces/{workspaceId}/logging/query",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteQueryLoggingConfigurationRequest",
}) as any as S.Schema<DeleteQueryLoggingConfigurationRequest>;
export interface DeleteQueryLoggingConfigurationResponse {}
export const DeleteQueryLoggingConfigurationResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteQueryLoggingConfigurationResponse",
}) as any as S.Schema<DeleteQueryLoggingConfigurationResponse>;
export interface CreateRuleGroupsNamespaceRequest {
  workspaceId: string;
  name: string;
  data: Uint8Array;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateRuleGroupsNamespaceRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    name: S.String,
    data: T.Blob,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/workspaces/{workspaceId}/rulegroupsnamespaces",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateRuleGroupsNamespaceRequest",
}) as any as S.Schema<CreateRuleGroupsNamespaceRequest>;
export interface RuleGroupsNamespaceStatus {
  statusCode: string;
  statusReason?: string;
}
export const RuleGroupsNamespaceStatus = S.suspend(() =>
  S.Struct({ statusCode: S.String, statusReason: S.optional(S.String) }),
).annotate({
  identifier: "RuleGroupsNamespaceStatus",
}) as any as S.Schema<RuleGroupsNamespaceStatus>;
export interface CreateRuleGroupsNamespaceResponse {
  name: string;
  arn: string;
  status: RuleGroupsNamespaceStatus;
  tags?: { [key: string]: string | undefined };
}
export const CreateRuleGroupsNamespaceResponse = S.suspend(() =>
  S.Struct({
    name: S.String,
    arn: S.String,
    status: RuleGroupsNamespaceStatus,
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "CreateRuleGroupsNamespaceResponse",
}) as any as S.Schema<CreateRuleGroupsNamespaceResponse>;
export interface DescribeRuleGroupsNamespaceRequest {
  workspaceId: string;
  name: string;
}
export const DescribeRuleGroupsNamespaceRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    name: S.String.pipe(T.HttpLabel("name")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/workspaces/{workspaceId}/rulegroupsnamespaces/{name}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeRuleGroupsNamespaceRequest",
}) as any as S.Schema<DescribeRuleGroupsNamespaceRequest>;
export interface RuleGroupsNamespaceDescription {
  arn: string;
  name: string;
  status: RuleGroupsNamespaceStatus;
  data: Uint8Array;
  createdAt: Date;
  modifiedAt: Date;
  tags?: { [key: string]: string | undefined };
}
export const RuleGroupsNamespaceDescription = S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.String,
    status: RuleGroupsNamespaceStatus,
    data: T.Blob,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    modifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "RuleGroupsNamespaceDescription",
}) as any as S.Schema<RuleGroupsNamespaceDescription>;
export interface DescribeRuleGroupsNamespaceResponse {
  ruleGroupsNamespace: RuleGroupsNamespaceDescription;
}
export const DescribeRuleGroupsNamespaceResponse = S.suspend(() =>
  S.Struct({ ruleGroupsNamespace: RuleGroupsNamespaceDescription }),
).annotate({
  identifier: "DescribeRuleGroupsNamespaceResponse",
}) as any as S.Schema<DescribeRuleGroupsNamespaceResponse>;
export interface PutRuleGroupsNamespaceRequest {
  workspaceId: string;
  name: string;
  data: Uint8Array;
  clientToken?: string;
}
export const PutRuleGroupsNamespaceRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    name: S.String.pipe(T.HttpLabel("name")),
    data: T.Blob,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/workspaces/{workspaceId}/rulegroupsnamespaces/{name}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutRuleGroupsNamespaceRequest",
}) as any as S.Schema<PutRuleGroupsNamespaceRequest>;
export interface PutRuleGroupsNamespaceResponse {
  name: string;
  arn: string;
  status: RuleGroupsNamespaceStatus;
  tags?: { [key: string]: string | undefined };
}
export const PutRuleGroupsNamespaceResponse = S.suspend(() =>
  S.Struct({
    name: S.String,
    arn: S.String,
    status: RuleGroupsNamespaceStatus,
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "PutRuleGroupsNamespaceResponse",
}) as any as S.Schema<PutRuleGroupsNamespaceResponse>;
export interface DeleteRuleGroupsNamespaceRequest {
  workspaceId: string;
  name: string;
  clientToken?: string;
}
export const DeleteRuleGroupsNamespaceRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    name: S.String.pipe(T.HttpLabel("name")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/workspaces/{workspaceId}/rulegroupsnamespaces/{name}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRuleGroupsNamespaceRequest",
}) as any as S.Schema<DeleteRuleGroupsNamespaceRequest>;
export interface DeleteRuleGroupsNamespaceResponse {}
export const DeleteRuleGroupsNamespaceResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRuleGroupsNamespaceResponse",
}) as any as S.Schema<DeleteRuleGroupsNamespaceResponse>;
export interface ListRuleGroupsNamespacesRequest {
  workspaceId: string;
  name?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListRuleGroupsNamespacesRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    name: S.optional(S.String).pipe(T.HttpQuery("name")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/workspaces/{workspaceId}/rulegroupsnamespaces",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRuleGroupsNamespacesRequest",
}) as any as S.Schema<ListRuleGroupsNamespacesRequest>;
export interface RuleGroupsNamespaceSummary {
  arn: string;
  name: string;
  status: RuleGroupsNamespaceStatus;
  createdAt: Date;
  modifiedAt: Date;
  tags?: { [key: string]: string | undefined };
}
export const RuleGroupsNamespaceSummary = S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.String,
    status: RuleGroupsNamespaceStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    modifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "RuleGroupsNamespaceSummary",
}) as any as S.Schema<RuleGroupsNamespaceSummary>;
export type RuleGroupsNamespaceSummaryList = RuleGroupsNamespaceSummary[];
export const RuleGroupsNamespaceSummaryList = S.Array(
  RuleGroupsNamespaceSummary,
);
export interface ListRuleGroupsNamespacesResponse {
  ruleGroupsNamespaces: RuleGroupsNamespaceSummary[];
  nextToken?: string;
}
export const ListRuleGroupsNamespacesResponse = S.suspend(() =>
  S.Struct({
    ruleGroupsNamespaces: RuleGroupsNamespaceSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRuleGroupsNamespacesResponse",
}) as any as S.Schema<ListRuleGroupsNamespacesResponse>;
export interface DescribeWorkspaceConfigurationRequest {
  workspaceId: string;
}
export const DescribeWorkspaceConfigurationRequest = S.suspend(() =>
  S.Struct({ workspaceId: S.String.pipe(T.HttpLabel("workspaceId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/workspaces/{workspaceId}/configuration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeWorkspaceConfigurationRequest",
}) as any as S.Schema<DescribeWorkspaceConfigurationRequest>;
export interface WorkspaceConfigurationStatus {
  statusCode: string;
  statusReason?: string;
}
export const WorkspaceConfigurationStatus = S.suspend(() =>
  S.Struct({ statusCode: S.String, statusReason: S.optional(S.String) }),
).annotate({
  identifier: "WorkspaceConfigurationStatus",
}) as any as S.Schema<WorkspaceConfigurationStatus>;
export interface LimitsPerLabelSetEntry {
  maxSeries?: number;
}
export const LimitsPerLabelSetEntry = S.suspend(() =>
  S.Struct({ maxSeries: S.optional(S.Number) }),
).annotate({
  identifier: "LimitsPerLabelSetEntry",
}) as any as S.Schema<LimitsPerLabelSetEntry>;
export type LabelSet = { [key: string]: string | undefined };
export const LabelSet = S.Record(S.String, S.String.pipe(S.optional));
export interface LimitsPerLabelSet {
  limits: LimitsPerLabelSetEntry;
  labelSet: { [key: string]: string | undefined };
}
export const LimitsPerLabelSet = S.suspend(() =>
  S.Struct({ limits: LimitsPerLabelSetEntry, labelSet: LabelSet }),
).annotate({
  identifier: "LimitsPerLabelSet",
}) as any as S.Schema<LimitsPerLabelSet>;
export type LimitsPerLabelSetList = LimitsPerLabelSet[];
export const LimitsPerLabelSetList = S.Array(LimitsPerLabelSet);
export interface WorkspaceConfigurationDescription {
  status: WorkspaceConfigurationStatus;
  limitsPerLabelSet?: LimitsPerLabelSet[];
  retentionPeriodInDays?: number;
}
export const WorkspaceConfigurationDescription = S.suspend(() =>
  S.Struct({
    status: WorkspaceConfigurationStatus,
    limitsPerLabelSet: S.optional(LimitsPerLabelSetList),
    retentionPeriodInDays: S.optional(S.Number),
  }),
).annotate({
  identifier: "WorkspaceConfigurationDescription",
}) as any as S.Schema<WorkspaceConfigurationDescription>;
export interface DescribeWorkspaceConfigurationResponse {
  workspaceConfiguration: WorkspaceConfigurationDescription;
}
export const DescribeWorkspaceConfigurationResponse = S.suspend(() =>
  S.Struct({ workspaceConfiguration: WorkspaceConfigurationDescription }),
).annotate({
  identifier: "DescribeWorkspaceConfigurationResponse",
}) as any as S.Schema<DescribeWorkspaceConfigurationResponse>;
export interface UpdateWorkspaceConfigurationRequest {
  workspaceId: string;
  clientToken?: string;
  limitsPerLabelSet?: LimitsPerLabelSet[];
  retentionPeriodInDays?: number;
}
export const UpdateWorkspaceConfigurationRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    limitsPerLabelSet: S.optional(LimitsPerLabelSetList),
    retentionPeriodInDays: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/workspaces/{workspaceId}/configuration",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateWorkspaceConfigurationRequest",
}) as any as S.Schema<UpdateWorkspaceConfigurationRequest>;
export interface UpdateWorkspaceConfigurationResponse {
  status: WorkspaceConfigurationStatus;
}
export const UpdateWorkspaceConfigurationResponse = S.suspend(() =>
  S.Struct({ status: WorkspaceConfigurationStatus }),
).annotate({
  identifier: "UpdateWorkspaceConfigurationResponse",
}) as any as S.Schema<UpdateWorkspaceConfigurationResponse>;
export interface PutResourcePolicyRequest {
  workspaceId: string;
  policyDocument: string;
  clientToken?: string;
  revisionId?: string;
}
export const PutResourcePolicyRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    policyDocument: S.String,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    revisionId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/workspaces/{workspaceId}/policy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutResourcePolicyRequest",
}) as any as S.Schema<PutResourcePolicyRequest>;
export interface PutResourcePolicyResponse {
  policyStatus: string;
  revisionId: string;
}
export const PutResourcePolicyResponse = S.suspend(() =>
  S.Struct({ policyStatus: S.String, revisionId: S.String }),
).annotate({
  identifier: "PutResourcePolicyResponse",
}) as any as S.Schema<PutResourcePolicyResponse>;
export interface DescribeResourcePolicyRequest {
  workspaceId: string;
}
export const DescribeResourcePolicyRequest = S.suspend(() =>
  S.Struct({ workspaceId: S.String.pipe(T.HttpLabel("workspaceId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/workspaces/{workspaceId}/policy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeResourcePolicyRequest",
}) as any as S.Schema<DescribeResourcePolicyRequest>;
export interface DescribeResourcePolicyResponse {
  policyDocument: string;
  policyStatus: string;
  revisionId: string;
}
export const DescribeResourcePolicyResponse = S.suspend(() =>
  S.Struct({
    policyDocument: S.String,
    policyStatus: S.String,
    revisionId: S.String,
  }),
).annotate({
  identifier: "DescribeResourcePolicyResponse",
}) as any as S.Schema<DescribeResourcePolicyResponse>;
export interface DeleteResourcePolicyRequest {
  workspaceId: string;
  clientToken?: string;
  revisionId?: string;
}
export const DeleteResourcePolicyRequest = S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
    revisionId: S.optional(S.String).pipe(T.HttpQuery("revisionId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/workspaces/{workspaceId}/policy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteResourcePolicyRequest",
}) as any as S.Schema<DeleteResourcePolicyRequest>;
export interface DeleteResourcePolicyResponse {}
export const DeleteResourcePolicyResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteResourcePolicyResponse",
}) as any as S.Schema<DeleteResourcePolicyResponse>;

//# Errors
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  { message: S.String },
).pipe(C.withAuthError) {}
export class InternalServerException extends S.TaggedErrorClass<InternalServerException>()(
  "InternalServerException",
  {
    message: S.String,
    retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
  },
  T.Retryable(),
).pipe(C.withServerError, C.withRetryableError) {}
export class ThrottlingException extends S.TaggedErrorClass<ThrottlingException>()(
  "ThrottlingException",
  {
    message: S.String,
    serviceCode: S.optional(S.String),
    quotaCode: S.optional(S.String),
    retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
  },
  T.Retryable(),
).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { message: S.String, resourceId: S.String, resourceType: S.String },
).pipe(C.withBadRequestError) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  {
    message: S.String,
    reason: S.String,
    fieldList: S.optional(ValidationExceptionFieldList),
  },
).pipe(C.withBadRequestError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  { message: S.String, resourceId: S.String, resourceType: S.String },
).pipe(C.withConflictError) {}
export class ServiceQuotaExceededException extends S.TaggedErrorClass<ServiceQuotaExceededException>()(
  "ServiceQuotaExceededException",
  {
    message: S.String,
    resourceId: S.String,
    resourceType: S.String,
    serviceCode: S.String,
    quotaCode: S.String,
  },
).pipe(C.withQuotaError) {}

//# Operations
export type GetDefaultScraperConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * The `GetDefaultScraperConfiguration` operation returns the default scraper configuration used when Amazon EKS creates a scraper for you.
 */
export const getDefaultScraperConfiguration: API.OperationMethod<
  GetDefaultScraperConfigurationRequest,
  GetDefaultScraperConfigurationResponse,
  GetDefaultScraperConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDefaultScraperConfigurationRequest,
  output: GetDefaultScraperConfigurationResponse,
  errors: [AccessDeniedException, InternalServerException, ThrottlingException],
}));
export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The `ListTagsForResource` operation returns the tags that are associated with an Amazon Managed Service for Prometheus resource. Currently, the only resources that can be tagged are scrapers, workspaces, and rule groups namespaces.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The `TagResource` operation associates tags with an Amazon Managed Service for Prometheus resource. The only resources that can be tagged are rule groups namespaces, scrapers, and workspaces.
 *
 * If you specify a new tag key for the resource, this tag is appended to the list of tags associated with the resource. If you specify a tag key that is already associated with the resource, the new tag value that you specify replaces the previous value for that tag. To remove a tag, use `UntagResource`.
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
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified tags from an Amazon Managed Service for Prometheus resource. The only resources that can be tagged are rule groups namespaces, scrapers, and workspaces.
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
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type CreateScraperError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The `CreateScraper` operation creates a scraper to collect metrics. A scraper pulls metrics from Prometheus-compatible sources and sends them to your Amazon Managed Service for Prometheus workspace. You can configure scrapers to collect metrics from Amazon EKS clusters, Amazon MSK clusters, or from VPC-based sources that support DNS-based service discovery. Scrapers are flexible, and can be configured to control what metrics are collected, the frequency of collection, what transformations are applied to the metrics, and more.
 *
 * An IAM role will be created for you that Amazon Managed Service for Prometheus uses to access the metrics in your source. You must configure this role with a policy that allows it to scrape metrics from your source. For Amazon EKS sources, see Configuring your Amazon EKS cluster in the *Amazon Managed Service for Prometheus User Guide*.
 *
 * The `scrapeConfiguration` parameter contains the base-64 encoded YAML configuration for the scraper.
 *
 * When creating a scraper, the service creates a `Network Interface` in each **Availability Zone** that are passed into `CreateScraper` through subnets. These network interfaces are used to connect to your source within the VPC for scraping metrics.
 *
 * For more information about collectors, including what metrics are collected, and how to configure the scraper, see Using an Amazon Web Services managed collector in the *Amazon Managed Service for Prometheus User Guide*.
 */
export const createScraper: API.OperationMethod<
  CreateScraperRequest,
  CreateScraperResponse,
  CreateScraperError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateScraperRequest,
  output: CreateScraperResponse,
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
export type DescribeScraperError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The `DescribeScraper` operation displays information about an existing scraper.
 */
export const describeScraper: API.OperationMethod<
  DescribeScraperRequest,
  DescribeScraperResponse,
  DescribeScraperError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeScraperRequest,
  output: DescribeScraperResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type UpdateScraperError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing scraper.
 *
 * You can't use this function to update the source from which the scraper is collecting metrics. To change the source, delete the scraper and create a new one.
 */
export const updateScraper: API.OperationMethod<
  UpdateScraperRequest,
  UpdateScraperResponse,
  UpdateScraperError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateScraperRequest,
  output: UpdateScraperResponse,
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
export type DeleteScraperError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The `DeleteScraper` operation deletes one scraper, and stops any metrics collection that the scraper performs.
 */
export const deleteScraper: API.OperationMethod<
  DeleteScraperRequest,
  DeleteScraperResponse,
  DeleteScraperError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteScraperRequest,
  output: DeleteScraperResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type ListScrapersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The `ListScrapers` operation lists all of the scrapers in your account. This includes scrapers being created or deleted. You can optionally filter the returned list.
 */
export const listScrapers: API.OperationMethod<
  ListScrapersRequest,
  ListScrapersResponse,
  ListScrapersError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListScrapersRequest,
  ) => stream.Stream<
    ListScrapersResponse,
    ListScrapersError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListScrapersRequest,
  ) => stream.Stream<
    ScraperSummary,
    ListScrapersError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListScrapersRequest,
  output: ListScrapersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "scrapers",
    pageSize: "maxResults",
  } as const,
}));
export type UpdateScraperLoggingConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the logging configuration for a Amazon Managed Service for Prometheus scraper.
 */
export const updateScraperLoggingConfiguration: API.OperationMethod<
  UpdateScraperLoggingConfigurationRequest,
  UpdateScraperLoggingConfigurationResponse,
  UpdateScraperLoggingConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateScraperLoggingConfigurationRequest,
  output: UpdateScraperLoggingConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type DescribeScraperLoggingConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the logging configuration for a Amazon Managed Service for Prometheus scraper.
 */
export const describeScraperLoggingConfiguration: API.OperationMethod<
  DescribeScraperLoggingConfigurationRequest,
  DescribeScraperLoggingConfigurationResponse,
  DescribeScraperLoggingConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeScraperLoggingConfigurationRequest,
  output: DescribeScraperLoggingConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type DeleteScraperLoggingConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the logging configuration for a Amazon Managed Service for Prometheus scraper.
 */
export const deleteScraperLoggingConfiguration: API.OperationMethod<
  DeleteScraperLoggingConfigurationRequest,
  DeleteScraperLoggingConfigurationResponse,
  DeleteScraperLoggingConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteScraperLoggingConfigurationRequest,
  output: DeleteScraperLoggingConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type CreateWorkspaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Prometheus workspace. A workspace is a logical space dedicated to the storage and querying of Prometheus metrics. You can have one or more workspaces in each Region in your account.
 */
export const createWorkspace: API.OperationMethod<
  CreateWorkspaceRequest,
  CreateWorkspaceResponse,
  CreateWorkspaceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateWorkspaceRequest,
  output: CreateWorkspaceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DescribeWorkspaceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about an existing workspace.
 */
export const describeWorkspace: API.OperationMethod<
  DescribeWorkspaceRequest,
  DescribeWorkspaceResponse,
  DescribeWorkspaceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeWorkspaceRequest,
  output: DescribeWorkspaceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type UpdateWorkspaceAliasError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the alias of an existing workspace.
 */
export const updateWorkspaceAlias: API.OperationMethod<
  UpdateWorkspaceAliasRequest,
  UpdateWorkspaceAliasResponse,
  UpdateWorkspaceAliasError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateWorkspaceAliasRequest,
  output: UpdateWorkspaceAliasResponse,
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
export type DeleteWorkspaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing workspace.
 *
 * When you delete a workspace, the data that has been ingested into it is not immediately deleted. It will be permanently deleted within one month.
 */
export const deleteWorkspace: API.OperationMethod<
  DeleteWorkspaceRequest,
  DeleteWorkspaceResponse,
  DeleteWorkspaceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteWorkspaceRequest,
  output: DeleteWorkspaceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type ListWorkspacesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all of the Amazon Managed Service for Prometheus workspaces in your account. This includes workspaces being created or deleted.
 */
export const listWorkspaces: API.OperationMethod<
  ListWorkspacesRequest,
  ListWorkspacesResponse,
  ListWorkspacesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListWorkspacesRequest,
  ) => stream.Stream<
    ListWorkspacesResponse,
    ListWorkspacesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListWorkspacesRequest,
  ) => stream.Stream<
    WorkspaceSummary,
    ListWorkspacesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListWorkspacesRequest,
  output: ListWorkspacesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workspaces",
    pageSize: "maxResults",
  } as const,
}));
export type CreateAlertManagerDefinitionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The `CreateAlertManagerDefinition` operation creates the alert manager definition in a workspace. If a workspace already has an alert manager definition, don't use this operation to update it. Instead, use `PutAlertManagerDefinition`.
 */
export const createAlertManagerDefinition: API.OperationMethod<
  CreateAlertManagerDefinitionRequest,
  CreateAlertManagerDefinitionResponse,
  CreateAlertManagerDefinitionError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAlertManagerDefinitionRequest,
  output: CreateAlertManagerDefinitionResponse,
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
export type DescribeAlertManagerDefinitionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the full information about the alert manager definition for a workspace.
 */
export const describeAlertManagerDefinition: API.OperationMethod<
  DescribeAlertManagerDefinitionRequest,
  DescribeAlertManagerDefinitionResponse,
  DescribeAlertManagerDefinitionError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeAlertManagerDefinitionRequest,
  output: DescribeAlertManagerDefinitionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type PutAlertManagerDefinitionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing alert manager definition in a workspace. If the workspace does not already have an alert manager definition, don't use this operation to create it. Instead, use `CreateAlertManagerDefinition`.
 */
export const putAlertManagerDefinition: API.OperationMethod<
  PutAlertManagerDefinitionRequest,
  PutAlertManagerDefinitionResponse,
  PutAlertManagerDefinitionError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutAlertManagerDefinitionRequest,
  output: PutAlertManagerDefinitionResponse,
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
export type DeleteAlertManagerDefinitionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the alert manager definition from a workspace.
 */
export const deleteAlertManagerDefinition: API.OperationMethod<
  DeleteAlertManagerDefinitionRequest,
  DeleteAlertManagerDefinitionResponse,
  DeleteAlertManagerDefinitionError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAlertManagerDefinitionRequest,
  output: DeleteAlertManagerDefinitionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type CreateAnomalyDetectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an anomaly detector within a workspace using the Random Cut Forest algorithm for time-series analysis. The anomaly detector analyzes Amazon Managed Service for Prometheus metrics to identify unusual patterns and behaviors.
 */
export const createAnomalyDetector: API.OperationMethod<
  CreateAnomalyDetectorRequest,
  CreateAnomalyDetectorResponse,
  CreateAnomalyDetectorError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAnomalyDetectorRequest,
  output: CreateAnomalyDetectorResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type PutAnomalyDetectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * When you call `PutAnomalyDetector`, the operation creates a new anomaly detector if one doesn't exist, or updates an existing one. Each call to this operation triggers a complete retraining of the detector, which includes querying the minimum required samples and backfilling the detector with historical data. This process occurs regardless of whether you're making a minor change like updating the evaluation interval or making more substantial modifications. The operation serves as the single method for creating, updating, and retraining anomaly detectors.
 */
export const putAnomalyDetector: API.OperationMethod<
  PutAnomalyDetectorRequest,
  PutAnomalyDetectorResponse,
  PutAnomalyDetectorError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutAnomalyDetectorRequest,
  output: PutAnomalyDetectorResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DescribeAnomalyDetectorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific anomaly detector, including its status and configuration.
 */
export const describeAnomalyDetector: API.OperationMethod<
  DescribeAnomalyDetectorRequest,
  DescribeAnomalyDetectorResponse,
  DescribeAnomalyDetectorError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeAnomalyDetectorRequest,
  output: DescribeAnomalyDetectorResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DeleteAnomalyDetectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes an anomaly detector from a workspace. This operation is idempotent.
 */
export const deleteAnomalyDetector: API.OperationMethod<
  DeleteAnomalyDetectorRequest,
  DeleteAnomalyDetectorResponse,
  DeleteAnomalyDetectorError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAnomalyDetectorRequest,
  output: DeleteAnomalyDetectorResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type ListAnomalyDetectorsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of anomaly detectors for a workspace with optional filtering by alias.
 */
export const listAnomalyDetectors: API.OperationMethod<
  ListAnomalyDetectorsRequest,
  ListAnomalyDetectorsResponse,
  ListAnomalyDetectorsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListAnomalyDetectorsRequest,
  ) => stream.Stream<
    ListAnomalyDetectorsResponse,
    ListAnomalyDetectorsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListAnomalyDetectorsRequest,
  ) => stream.Stream<
    AnomalyDetectorSummary,
    ListAnomalyDetectorsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAnomalyDetectorsRequest,
  output: ListAnomalyDetectorsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "anomalyDetectors",
    pageSize: "maxResults",
  } as const,
}));
export type CreateLoggingConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * The `CreateLoggingConfiguration` operation creates rules and alerting logging configuration for the workspace. Use this operation to set the CloudWatch log group to which the logs will be published to.
 *
 * These logging configurations are only for rules and alerting logs.
 */
export const createLoggingConfiguration: API.OperationMethod<
  CreateLoggingConfigurationRequest,
  CreateLoggingConfigurationResponse,
  CreateLoggingConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateLoggingConfigurationRequest,
  output: CreateLoggingConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type DescribeLoggingConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns complete information about the current rules and alerting logging configuration of the workspace.
 *
 * These logging configurations are only for rules and alerting logs.
 */
export const describeLoggingConfiguration: API.OperationMethod<
  DescribeLoggingConfigurationRequest,
  DescribeLoggingConfigurationResponse,
  DescribeLoggingConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeLoggingConfigurationRequest,
  output: DescribeLoggingConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type UpdateLoggingConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the log group ARN or the workspace ID of the current rules and alerting logging configuration.
 *
 * These logging configurations are only for rules and alerting logs.
 */
export const updateLoggingConfiguration: API.OperationMethod<
  UpdateLoggingConfigurationRequest,
  UpdateLoggingConfigurationResponse,
  UpdateLoggingConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateLoggingConfigurationRequest,
  output: UpdateLoggingConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type DeleteLoggingConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the rules and alerting logging configuration for a workspace.
 *
 * These logging configurations are only for rules and alerting logs.
 */
export const deleteLoggingConfiguration: API.OperationMethod<
  DeleteLoggingConfigurationRequest,
  DeleteLoggingConfigurationResponse,
  DeleteLoggingConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteLoggingConfigurationRequest,
  output: DeleteLoggingConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type CreateQueryLoggingConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a query logging configuration for the specified workspace. This operation enables logging of queries that exceed the specified QSP threshold.
 */
export const createQueryLoggingConfiguration: API.OperationMethod<
  CreateQueryLoggingConfigurationRequest,
  CreateQueryLoggingConfigurationResponse,
  CreateQueryLoggingConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateQueryLoggingConfigurationRequest,
  output: CreateQueryLoggingConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type DescribeQueryLoggingConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of the query logging configuration for the specified workspace.
 */
export const describeQueryLoggingConfiguration: API.OperationMethod<
  DescribeQueryLoggingConfigurationRequest,
  DescribeQueryLoggingConfigurationResponse,
  DescribeQueryLoggingConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeQueryLoggingConfigurationRequest,
  output: DescribeQueryLoggingConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type UpdateQueryLoggingConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the query logging configuration for the specified workspace.
 */
export const updateQueryLoggingConfiguration: API.OperationMethod<
  UpdateQueryLoggingConfigurationRequest,
  UpdateQueryLoggingConfigurationResponse,
  UpdateQueryLoggingConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateQueryLoggingConfigurationRequest,
  output: UpdateQueryLoggingConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type DeleteQueryLoggingConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the query logging configuration for the specified workspace.
 */
export const deleteQueryLoggingConfiguration: API.OperationMethod<
  DeleteQueryLoggingConfigurationRequest,
  DeleteQueryLoggingConfigurationResponse,
  DeleteQueryLoggingConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteQueryLoggingConfigurationRequest,
  output: DeleteQueryLoggingConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type CreateRuleGroupsNamespaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The `CreateRuleGroupsNamespace` operation creates a rule groups namespace within a workspace. A rule groups namespace is associated with exactly one rules file. A workspace can have multiple rule groups namespaces.
 *
 * The combined length of a rule group namespace and a rule group name cannot exceed 721 UTF-8 bytes.
 *
 * Use this operation only to create new rule groups namespaces. To update an existing rule groups namespace, use `PutRuleGroupsNamespace`.
 */
export const createRuleGroupsNamespace: API.OperationMethod<
  CreateRuleGroupsNamespaceRequest,
  CreateRuleGroupsNamespaceResponse,
  CreateRuleGroupsNamespaceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateRuleGroupsNamespaceRequest,
  output: CreateRuleGroupsNamespaceResponse,
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
export type DescribeRuleGroupsNamespaceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns complete information about one rule groups namespace. To retrieve a list of rule groups namespaces, use `ListRuleGroupsNamespaces`.
 */
export const describeRuleGroupsNamespace: API.OperationMethod<
  DescribeRuleGroupsNamespaceRequest,
  DescribeRuleGroupsNamespaceResponse,
  DescribeRuleGroupsNamespaceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeRuleGroupsNamespaceRequest,
  output: DescribeRuleGroupsNamespaceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type PutRuleGroupsNamespaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing rule groups namespace within a workspace. A rule groups namespace is associated with exactly one rules file. A workspace can have multiple rule groups namespaces.
 *
 * The combined length of a rule group namespace and a rule group name cannot exceed 721 UTF-8 bytes.
 *
 * Use this operation only to update existing rule groups namespaces. To create a new rule groups namespace, use `CreateRuleGroupsNamespace`.
 *
 * You can't use this operation to add tags to an existing rule groups namespace. Instead, use `TagResource`.
 */
export const putRuleGroupsNamespace: API.OperationMethod<
  PutRuleGroupsNamespaceRequest,
  PutRuleGroupsNamespaceResponse,
  PutRuleGroupsNamespaceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutRuleGroupsNamespaceRequest,
  output: PutRuleGroupsNamespaceResponse,
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
export type DeleteRuleGroupsNamespaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes one rule groups namespace and its associated rule groups definition.
 */
export const deleteRuleGroupsNamespace: API.OperationMethod<
  DeleteRuleGroupsNamespaceRequest,
  DeleteRuleGroupsNamespaceResponse,
  DeleteRuleGroupsNamespaceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRuleGroupsNamespaceRequest,
  output: DeleteRuleGroupsNamespaceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type ListRuleGroupsNamespacesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of rule groups namespaces in a workspace.
 */
export const listRuleGroupsNamespaces: API.OperationMethod<
  ListRuleGroupsNamespacesRequest,
  ListRuleGroupsNamespacesResponse,
  ListRuleGroupsNamespacesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListRuleGroupsNamespacesRequest,
  ) => stream.Stream<
    ListRuleGroupsNamespacesResponse,
    ListRuleGroupsNamespacesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListRuleGroupsNamespacesRequest,
  ) => stream.Stream<
    RuleGroupsNamespaceSummary,
    ListRuleGroupsNamespacesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRuleGroupsNamespacesRequest,
  output: ListRuleGroupsNamespacesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "ruleGroupsNamespaces",
    pageSize: "maxResults",
  } as const,
}));
export type DescribeWorkspaceConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to return information about the configuration of a workspace. The configuration details returned include workspace configuration status, label set limits, and retention period.
 */
export const describeWorkspaceConfiguration: API.OperationMethod<
  DescribeWorkspaceConfigurationRequest,
  DescribeWorkspaceConfigurationResponse,
  DescribeWorkspaceConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeWorkspaceConfigurationRequest,
  output: DescribeWorkspaceConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type UpdateWorkspaceConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to create or update the label sets, label set limits, and retention period of a workspace.
 *
 * You must specify at least one of `limitsPerLabelSet` or `retentionPeriodInDays` for the request to be valid.
 */
export const updateWorkspaceConfiguration: API.OperationMethod<
  UpdateWorkspaceConfigurationRequest,
  UpdateWorkspaceConfigurationResponse,
  UpdateWorkspaceConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateWorkspaceConfigurationRequest,
  output: UpdateWorkspaceConfigurationResponse,
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
export type PutResourcePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates a resource-based policy for an Amazon Managed Service for Prometheus workspace. Use resource-based policies to grant permissions to other AWS accounts or services to access your workspace.
 *
 * Only Prometheus-compatible APIs can be used for workspace sharing. You can add non-Prometheus-compatible APIs to the policy, but they will be ignored. For more information, see Prometheus-compatible APIs in the *Amazon Managed Service for Prometheus User Guide*.
 *
 * If your workspace uses customer-managed KMS keys for encryption, you must grant the principals in your resource-based policy access to those KMS keys. You can do this by creating KMS grants. For more information, see CreateGrant in the *AWS Key Management Service API Reference* and Encryption at rest in the *Amazon Managed Service for Prometheus User Guide*.
 *
 * For more information about working with IAM, see Using Amazon Managed Service for Prometheus with IAM in the *Amazon Managed Service for Prometheus User Guide*.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutResourcePolicyRequest,
  output: PutResourcePolicyResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DescribeResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the resource-based policy attached to an Amazon Managed Service for Prometheus workspace.
 */
export const describeResourcePolicy: API.OperationMethod<
  DescribeResourcePolicyRequest,
  DescribeResourcePolicyResponse,
  DescribeResourcePolicyError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeResourcePolicyRequest,
  output: DescribeResourcePolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DeleteResourcePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the resource-based policy attached to an Amazon Managed Service for Prometheus workspace.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteResourcePolicyRequest,
  output: DeleteResourcePolicyResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
