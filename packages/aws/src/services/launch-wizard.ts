import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "effect/Schema";
import * as stream from "effect/Stream";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import type { Region } from "../region.ts";
const svc = T.AwsApiService({
  sdkId: "Launch Wizard",
  serviceShapeName: "LaunchWizard",
});
const auth = T.AwsAuthSigv4({ name: "launchwizard" });
const ver = T.ServiceVersion("2018-05-10");
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
              `https://launchwizard-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://launchwizard-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://launchwizard.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://launchwizard.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

//# Newtypes
export type TagKey = string;
export type TagValue = string;
export type WorkloadName = string;
export type DeploymentPatternName = string;
export type DeploymentName = string;
export type KeyString = string;
export type ValueString = string;
export type DeploymentId = string;
export type WorkloadVersionName = string;
export type DeploymentPatternVersionName = string;
export type DeploymentFilterValue = string;
export type MaxDeploymentResults = number;
export type NextToken = string;
export type MaxDeploymentEventResults = number;
export type MaxWorkloadResults = number;
export type MaxWorkloadDeploymentPatternResults = number;
export type DeploymentPatternVersionFilterValue = string;

//# Schemas
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export const ListTagsForResourceInput = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
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
  identifier: "ListTagsForResourceInput",
}) as any as S.Schema<ListTagsForResourceInput>;
export type Tags = { [key: string]: string | undefined };
export const Tags = /*@__PURE__*/ /*#__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ListTagsForResourceOutput {
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceOutput = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () => S.Struct({ tags: S.optional(Tags) }),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceInput = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
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
  identifier: "TagResourceInput",
}) as any as S.Schema<TagResourceInput>;
export interface TagResourceOutput {}
export const TagResourceOutput = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TagResourceOutput",
}) as any as S.Schema<TagResourceOutput>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ /*#__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceInput = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
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
  identifier: "UntagResourceInput",
}) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceOutput {}
export const UntagResourceOutput = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceOutput",
}) as any as S.Schema<UntagResourceOutput>;
export type DeploymentSpecifications = { [key: string]: string | undefined };
export const DeploymentSpecifications = /*@__PURE__*/ /*#__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateDeploymentInput {
  workloadName: string;
  deploymentPatternName: string;
  name: string;
  specifications: { [key: string]: string | undefined };
  dryRun?: boolean;
  tags?: { [key: string]: string | undefined };
}
export const CreateDeploymentInput = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    workloadName: S.String,
    deploymentPatternName: S.String,
    name: S.String,
    specifications: DeploymentSpecifications,
    dryRun: S.optional(S.Boolean),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/createDeployment" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDeploymentInput",
}) as any as S.Schema<CreateDeploymentInput>;
export interface CreateDeploymentOutput {
  deploymentId?: string;
}
export const CreateDeploymentOutput = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () => S.Struct({ deploymentId: S.optional(S.String) }),
).annotate({
  identifier: "CreateDeploymentOutput",
}) as any as S.Schema<CreateDeploymentOutput>;
export interface GetDeploymentInput {
  deploymentId: string;
}
export const GetDeploymentInput = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({ deploymentId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/getDeployment" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDeploymentInput",
}) as any as S.Schema<GetDeploymentInput>;
export type DeploymentStatus =
  | "COMPLETED"
  | "CREATING"
  | "DELETE_IN_PROGRESS"
  | "DELETE_INITIATING"
  | "DELETE_FAILED"
  | "DELETED"
  | "FAILED"
  | "IN_PROGRESS"
  | "VALIDATING"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_COMPLETED"
  | "UPDATE_FAILED"
  | "UPDATE_ROLLBACK_COMPLETED"
  | "UPDATE_ROLLBACK_FAILED"
  | (string & {});
export const DeploymentStatus = /*@__PURE__*/ /*#__PURE__*/ S.String;
export interface DeploymentData {
  name?: string;
  id?: string;
  workloadName?: string;
  patternName?: string;
  status?: DeploymentStatus;
  createdAt?: Date;
  modifiedAt?: Date;
  specifications?: { [key: string]: string | undefined };
  resourceGroup?: string;
  deletedAt?: Date;
  tags?: { [key: string]: string | undefined };
  deploymentArn?: string;
}
export const DeploymentData = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    id: S.optional(S.String),
    workloadName: S.optional(S.String),
    patternName: S.optional(S.String),
    status: S.optional(DeploymentStatus),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    specifications: S.optional(DeploymentSpecifications),
    resourceGroup: S.optional(S.String),
    deletedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    tags: S.optional(Tags),
    deploymentArn: S.optional(S.String),
  }),
).annotate({ identifier: "DeploymentData" }) as any as S.Schema<DeploymentData>;
export interface GetDeploymentOutput {
  deployment?: DeploymentData;
}
export const GetDeploymentOutput = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({ deployment: S.optional(DeploymentData) }),
).annotate({
  identifier: "GetDeploymentOutput",
}) as any as S.Schema<GetDeploymentOutput>;
export interface UpdateDeploymentInput {
  deploymentId: string;
  specifications: { [key: string]: string | undefined };
  workloadVersionName?: string;
  deploymentPatternVersionName?: string;
  dryRun?: boolean;
  force?: boolean;
}
export const UpdateDeploymentInput = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentId: S.String,
    specifications: DeploymentSpecifications,
    workloadVersionName: S.optional(S.String),
    deploymentPatternVersionName: S.optional(S.String),
    dryRun: S.optional(S.Boolean),
    force: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/updateDeployment" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDeploymentInput",
}) as any as S.Schema<UpdateDeploymentInput>;
export interface DeploymentDataSummary {
  name?: string;
  id?: string;
  workloadName?: string;
  patternName?: string;
  status?: DeploymentStatus;
  createdAt?: Date;
  modifiedAt?: Date;
}
export const DeploymentDataSummary = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    id: S.optional(S.String),
    workloadName: S.optional(S.String),
    patternName: S.optional(S.String),
    status: S.optional(DeploymentStatus),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DeploymentDataSummary",
}) as any as S.Schema<DeploymentDataSummary>;
export interface UpdateDeploymentOutput {
  deployment?: DeploymentDataSummary;
}
export const UpdateDeploymentOutput = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () => S.Struct({ deployment: S.optional(DeploymentDataSummary) }),
).annotate({
  identifier: "UpdateDeploymentOutput",
}) as any as S.Schema<UpdateDeploymentOutput>;
export interface DeleteDeploymentInput {
  deploymentId: string;
}
export const DeleteDeploymentInput = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({ deploymentId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/deleteDeployment" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDeploymentInput",
}) as any as S.Schema<DeleteDeploymentInput>;
export interface DeleteDeploymentOutput {
  status?: DeploymentStatus;
  statusReason?: string;
}
export const DeleteDeploymentOutput = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      status: S.optional(DeploymentStatus),
      statusReason: S.optional(S.String),
    }),
).annotate({
  identifier: "DeleteDeploymentOutput",
}) as any as S.Schema<DeleteDeploymentOutput>;
export type DeploymentFilterKey =
  | "WORKLOAD_NAME"
  | "DEPLOYMENT_STATUS"
  | (string & {});
export const DeploymentFilterKey = /*@__PURE__*/ /*#__PURE__*/ S.String;
export type DeploymentFilterValues = string[];
export const DeploymentFilterValues = /*@__PURE__*/ /*#__PURE__*/ S.Array(
  S.String,
);
export interface DeploymentFilter {
  name?: DeploymentFilterKey;
  values?: string[];
}
export const DeploymentFilter = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(DeploymentFilterKey),
    values: S.optional(DeploymentFilterValues),
  }),
).annotate({
  identifier: "DeploymentFilter",
}) as any as S.Schema<DeploymentFilter>;
export type DeploymentFilterList = DeploymentFilter[];
export const DeploymentFilterList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(DeploymentFilter);
export interface ListDeploymentsInput {
  filters?: DeploymentFilter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListDeploymentsInput = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    filters: S.optional(DeploymentFilterList),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/listDeployments" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDeploymentsInput",
}) as any as S.Schema<ListDeploymentsInput>;
export type DeploymentDataSummaryList = DeploymentDataSummary[];
export const DeploymentDataSummaryList = /*@__PURE__*/ /*#__PURE__*/ S.Array(
  DeploymentDataSummary,
);
export interface ListDeploymentsOutput {
  deployments?: DeploymentDataSummary[];
  nextToken?: string;
}
export const ListDeploymentsOutput = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    deployments: S.optional(DeploymentDataSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDeploymentsOutput",
}) as any as S.Schema<ListDeploymentsOutput>;
export interface ListDeploymentEventsInput {
  deploymentId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListDeploymentEventsInput = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      deploymentId: S.String,
      maxResults: S.optional(S.Number),
      nextToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/listDeploymentEvents" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListDeploymentEventsInput",
}) as any as S.Schema<ListDeploymentEventsInput>;
export type EventStatus =
  | "CANCELED"
  | "CANCELING"
  | "COMPLETED"
  | "CREATED"
  | "FAILED"
  | "IN_PROGRESS"
  | "PENDING"
  | "TIMED_OUT"
  | (string & {});
export const EventStatus = /*@__PURE__*/ /*#__PURE__*/ S.String;
export interface DeploymentEventDataSummary {
  name?: string;
  description?: string;
  status?: EventStatus;
  statusReason?: string;
  timestamp?: Date;
}
export const DeploymentEventDataSummary = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      name: S.optional(S.String),
      description: S.optional(S.String),
      status: S.optional(EventStatus),
      statusReason: S.optional(S.String),
      timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    }),
).annotate({
  identifier: "DeploymentEventDataSummary",
}) as any as S.Schema<DeploymentEventDataSummary>;
export type DeploymentEventDataSummaryList = DeploymentEventDataSummary[];
export const DeploymentEventDataSummaryList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(DeploymentEventDataSummary);
export interface ListDeploymentEventsOutput {
  deploymentEvents?: DeploymentEventDataSummary[];
  nextToken?: string;
}
export const ListDeploymentEventsOutput = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      deploymentEvents: S.optional(DeploymentEventDataSummaryList),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListDeploymentEventsOutput",
}) as any as S.Schema<ListDeploymentEventsOutput>;
export interface GetWorkloadInput {
  workloadName: string;
}
export const GetWorkloadInput = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({ workloadName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/getWorkload" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetWorkloadInput",
}) as any as S.Schema<GetWorkloadInput>;
export type WorkloadStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "DISABLED"
  | "DELETED"
  | (string & {});
export const WorkloadStatus = /*@__PURE__*/ /*#__PURE__*/ S.String;
export interface WorkloadData {
  workloadName?: string;
  displayName?: string;
  status?: WorkloadStatus;
  description?: string;
  documentationUrl?: string;
  iconUrl?: string;
  statusMessage?: string;
}
export const WorkloadData = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    workloadName: S.optional(S.String),
    displayName: S.optional(S.String),
    status: S.optional(WorkloadStatus),
    description: S.optional(S.String),
    documentationUrl: S.optional(S.String),
    iconUrl: S.optional(S.String),
    statusMessage: S.optional(S.String),
  }),
).annotate({ identifier: "WorkloadData" }) as any as S.Schema<WorkloadData>;
export interface GetWorkloadOutput {
  workload?: WorkloadData;
}
export const GetWorkloadOutput = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({ workload: S.optional(WorkloadData) }),
).annotate({
  identifier: "GetWorkloadOutput",
}) as any as S.Schema<GetWorkloadOutput>;
export interface ListWorkloadsInput {
  maxResults?: number;
  nextToken?: string;
}
export const ListWorkloadsInput = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/listWorkloads" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWorkloadsInput",
}) as any as S.Schema<ListWorkloadsInput>;
export interface WorkloadDataSummary {
  workloadName?: string;
  displayName?: string;
  status?: WorkloadStatus;
}
export const WorkloadDataSummary = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    workloadName: S.optional(S.String),
    displayName: S.optional(S.String),
    status: S.optional(WorkloadStatus),
  }),
).annotate({
  identifier: "WorkloadDataSummary",
}) as any as S.Schema<WorkloadDataSummary>;
export type WorkloadDataSummaryList = WorkloadDataSummary[];
export const WorkloadDataSummaryList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(WorkloadDataSummary);
export interface ListWorkloadsOutput {
  workloads?: WorkloadDataSummary[];
  nextToken?: string;
}
export const ListWorkloadsOutput = /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
  S.Struct({
    workloads: S.optional(WorkloadDataSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListWorkloadsOutput",
}) as any as S.Schema<ListWorkloadsOutput>;
export interface GetWorkloadDeploymentPatternInput {
  workloadName: string;
  deploymentPatternName: string;
}
export const GetWorkloadDeploymentPatternInput =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({ workloadName: S.String, deploymentPatternName: S.String }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/getWorkloadDeploymentPattern" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetWorkloadDeploymentPatternInput",
  }) as any as S.Schema<GetWorkloadDeploymentPatternInput>;
export type WorkloadDeploymentPatternStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "DISABLED"
  | "DELETED"
  | (string & {});
export const WorkloadDeploymentPatternStatus =
  /*@__PURE__*/ /*#__PURE__*/ S.String;
export type AllowedValues = string[];
export const AllowedValues = /*@__PURE__*/ /*#__PURE__*/ S.Array(S.String);
export interface DeploymentConditionalField {
  name?: string;
  value?: string;
  comparator?: string;
}
export const DeploymentConditionalField = /*@__PURE__*/ /*#__PURE__*/ S.suspend(
  () =>
    S.Struct({
      name: S.optional(S.String),
      value: S.optional(S.String),
      comparator: S.optional(S.String),
    }),
).annotate({
  identifier: "DeploymentConditionalField",
}) as any as S.Schema<DeploymentConditionalField>;
export type SpecificationsConditionalData = DeploymentConditionalField[];
export const SpecificationsConditionalData =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(DeploymentConditionalField);
export interface DeploymentSpecificationsField {
  name?: string;
  description?: string;
  allowedValues?: string[];
  required?: string;
  conditionals?: DeploymentConditionalField[];
}
export const DeploymentSpecificationsField =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      name: S.optional(S.String),
      description: S.optional(S.String),
      allowedValues: S.optional(AllowedValues),
      required: S.optional(S.String),
      conditionals: S.optional(SpecificationsConditionalData),
    }),
  ).annotate({
    identifier: "DeploymentSpecificationsField",
  }) as any as S.Schema<DeploymentSpecificationsField>;
export type DeploymentSpecificationsData = DeploymentSpecificationsField[];
export const DeploymentSpecificationsData = /*@__PURE__*/ /*#__PURE__*/ S.Array(
  DeploymentSpecificationsField,
);
export interface WorkloadDeploymentPatternData {
  workloadName?: string;
  deploymentPatternName?: string;
  workloadVersionName?: string;
  deploymentPatternVersionName?: string;
  displayName?: string;
  description?: string;
  status?: WorkloadDeploymentPatternStatus;
  statusMessage?: string;
  specifications?: DeploymentSpecificationsField[];
}
export const WorkloadDeploymentPatternData =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      workloadName: S.optional(S.String),
      deploymentPatternName: S.optional(S.String),
      workloadVersionName: S.optional(S.String),
      deploymentPatternVersionName: S.optional(S.String),
      displayName: S.optional(S.String),
      description: S.optional(S.String),
      status: S.optional(WorkloadDeploymentPatternStatus),
      statusMessage: S.optional(S.String),
      specifications: S.optional(DeploymentSpecificationsData),
    }),
  ).annotate({
    identifier: "WorkloadDeploymentPatternData",
  }) as any as S.Schema<WorkloadDeploymentPatternData>;
export interface GetWorkloadDeploymentPatternOutput {
  workloadDeploymentPattern?: WorkloadDeploymentPatternData;
}
export const GetWorkloadDeploymentPatternOutput =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      workloadDeploymentPattern: S.optional(WorkloadDeploymentPatternData),
    }),
  ).annotate({
    identifier: "GetWorkloadDeploymentPatternOutput",
  }) as any as S.Schema<GetWorkloadDeploymentPatternOutput>;
export interface ListWorkloadDeploymentPatternsInput {
  workloadName: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListWorkloadDeploymentPatternsInput =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      workloadName: S.String,
      maxResults: S.optional(S.Number),
      nextToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/listWorkloadDeploymentPatterns" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListWorkloadDeploymentPatternsInput",
  }) as any as S.Schema<ListWorkloadDeploymentPatternsInput>;
export interface WorkloadDeploymentPatternDataSummary {
  workloadName?: string;
  deploymentPatternName?: string;
  workloadVersionName?: string;
  deploymentPatternVersionName?: string;
  displayName?: string;
  description?: string;
  status?: WorkloadDeploymentPatternStatus;
  statusMessage?: string;
}
export const WorkloadDeploymentPatternDataSummary =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      workloadName: S.optional(S.String),
      deploymentPatternName: S.optional(S.String),
      workloadVersionName: S.optional(S.String),
      deploymentPatternVersionName: S.optional(S.String),
      displayName: S.optional(S.String),
      description: S.optional(S.String),
      status: S.optional(WorkloadDeploymentPatternStatus),
      statusMessage: S.optional(S.String),
    }),
  ).annotate({
    identifier: "WorkloadDeploymentPatternDataSummary",
  }) as any as S.Schema<WorkloadDeploymentPatternDataSummary>;
export type WorkloadDeploymentPatternDataSummaryList =
  WorkloadDeploymentPatternDataSummary[];
export const WorkloadDeploymentPatternDataSummaryList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(WorkloadDeploymentPatternDataSummary);
export interface ListWorkloadDeploymentPatternsOutput {
  workloadDeploymentPatterns?: WorkloadDeploymentPatternDataSummary[];
  nextToken?: string;
}
export const ListWorkloadDeploymentPatternsOutput =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      workloadDeploymentPatterns: S.optional(
        WorkloadDeploymentPatternDataSummaryList,
      ),
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListWorkloadDeploymentPatternsOutput",
  }) as any as S.Schema<ListWorkloadDeploymentPatternsOutput>;
export interface GetDeploymentPatternVersionInput {
  workloadName: string;
  deploymentPatternName: string;
  deploymentPatternVersionName: string;
}
export const GetDeploymentPatternVersionInput =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      workloadName: S.String,
      deploymentPatternName: S.String,
      deploymentPatternVersionName: S.String,
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/getDeploymentPatternVersion" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetDeploymentPatternVersionInput",
  }) as any as S.Schema<GetDeploymentPatternVersionInput>;
export interface DeploymentPatternVersionDataSummary {
  deploymentPatternVersionName?: string;
  description?: string;
  documentationUrl?: string;
  workloadName?: string;
  deploymentPatternName?: string;
}
export const DeploymentPatternVersionDataSummary =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      deploymentPatternVersionName: S.optional(S.String),
      description: S.optional(S.String),
      documentationUrl: S.optional(S.String),
      workloadName: S.optional(S.String),
      deploymentPatternName: S.optional(S.String),
    }),
  ).annotate({
    identifier: "DeploymentPatternVersionDataSummary",
  }) as any as S.Schema<DeploymentPatternVersionDataSummary>;
export interface GetDeploymentPatternVersionOutput {
  deploymentPatternVersion?: DeploymentPatternVersionDataSummary;
}
export const GetDeploymentPatternVersionOutput =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      deploymentPatternVersion: S.optional(DeploymentPatternVersionDataSummary),
    }),
  ).annotate({
    identifier: "GetDeploymentPatternVersionOutput",
  }) as any as S.Schema<GetDeploymentPatternVersionOutput>;
export type DeploymentPatternVersionFilterKey =
  | "updateFromVersion"
  | (string & {});
export const DeploymentPatternVersionFilterKey =
  /*@__PURE__*/ /*#__PURE__*/ S.String;
export type DeploymentPatternVersionFilterValues = string[];
export const DeploymentPatternVersionFilterValues =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(S.String);
export interface DeploymentPatternVersionFilter {
  name: DeploymentPatternVersionFilterKey;
  values: string[];
}
export const DeploymentPatternVersionFilter =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      name: DeploymentPatternVersionFilterKey,
      values: DeploymentPatternVersionFilterValues,
    }),
  ).annotate({
    identifier: "DeploymentPatternVersionFilter",
  }) as any as S.Schema<DeploymentPatternVersionFilter>;
export type FilterList = DeploymentPatternVersionFilter[];
export const FilterList = /*@__PURE__*/ /*#__PURE__*/ S.Array(
  DeploymentPatternVersionFilter,
);
export interface ListDeploymentPatternVersionsInput {
  workloadName: string;
  deploymentPatternName: string;
  maxResults?: number;
  nextToken?: string;
  filters?: DeploymentPatternVersionFilter[];
}
export const ListDeploymentPatternVersionsInput =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      workloadName: S.String,
      deploymentPatternName: S.String,
      maxResults: S.optional(S.Number),
      nextToken: S.optional(S.String),
      filters: S.optional(FilterList),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/listDeploymentPatternVersions" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListDeploymentPatternVersionsInput",
  }) as any as S.Schema<ListDeploymentPatternVersionsInput>;
export type DeploymentPatternVersionDataSummaryList =
  DeploymentPatternVersionDataSummary[];
export const DeploymentPatternVersionDataSummaryList =
  /*@__PURE__*/ /*#__PURE__*/ S.Array(DeploymentPatternVersionDataSummary);
export interface ListDeploymentPatternVersionsOutput {
  deploymentPatternVersions?: DeploymentPatternVersionDataSummary[];
  nextToken?: string;
}
export const ListDeploymentPatternVersionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ S.suspend(() =>
    S.Struct({
      deploymentPatternVersions: S.optional(
        DeploymentPatternVersionDataSummaryList,
      ),
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListDeploymentPatternVersionsOutput",
  }) as any as S.Schema<ListDeploymentPatternVersionsOutput>;

//# Errors
export class InternalServerException extends S.TaggedErrorClass<InternalServerException>()(
  "InternalServerException",
  { message: S.optional(S.String) },
).pipe(C.withServerError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ResourceLimitException extends S.TaggedErrorClass<ResourceLimitException>()(
  "ResourceLimitException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}

//# Operations
export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags associated with a specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceInput,
  output: ListTagsForResourceOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds the specified tags to the given resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceOutput,
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
 * Removes the specified tags from the given resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type CreateDeploymentError =
  | InternalServerException
  | ResourceLimitException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a deployment for the given workload. Deployments created by this operation are not available in the Launch Wizard console to use the `Clone deployment` action on.
 */
export const createDeployment: API.OperationMethod<
  CreateDeploymentInput,
  CreateDeploymentOutput,
  CreateDeploymentError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateDeploymentInput,
  output: CreateDeploymentOutput,
  errors: [
    InternalServerException,
    ResourceLimitException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type GetDeploymentError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the deployment.
 */
export const getDeployment: API.OperationMethod<
  GetDeploymentInput,
  GetDeploymentOutput,
  GetDeploymentError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDeploymentInput,
  output: GetDeploymentOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type UpdateDeploymentError =
  | InternalServerException
  | ResourceLimitException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a deployment.
 */
export const updateDeployment: API.OperationMethod<
  UpdateDeploymentInput,
  UpdateDeploymentOutput,
  UpdateDeploymentError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateDeploymentInput,
  output: UpdateDeploymentOutput,
  errors: [
    InternalServerException,
    ResourceLimitException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type DeleteDeploymentError =
  | InternalServerException
  | ResourceLimitException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a deployment.
 */
export const deleteDeployment: API.OperationMethod<
  DeleteDeploymentInput,
  DeleteDeploymentOutput,
  DeleteDeploymentError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteDeploymentInput,
  output: DeleteDeploymentOutput,
  errors: [
    InternalServerException,
    ResourceLimitException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type ListDeploymentsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists the deployments that have been created.
 */
export const listDeployments: API.OperationMethod<
  ListDeploymentsInput,
  ListDeploymentsOutput,
  ListDeploymentsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListDeploymentsInput,
  ) => stream.Stream<
    ListDeploymentsOutput,
    ListDeploymentsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListDeploymentsInput,
  ) => stream.Stream<
    DeploymentDataSummary,
    ListDeploymentsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDeploymentsInput,
  output: ListDeploymentsOutput,
  errors: [InternalServerException, ValidationException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "deployments",
    pageSize: "maxResults",
  } as const,
}));
export type ListDeploymentEventsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the events of a deployment.
 */
export const listDeploymentEvents: API.OperationMethod<
  ListDeploymentEventsInput,
  ListDeploymentEventsOutput,
  ListDeploymentEventsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListDeploymentEventsInput,
  ) => stream.Stream<
    ListDeploymentEventsOutput,
    ListDeploymentEventsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListDeploymentEventsInput,
  ) => stream.Stream<
    DeploymentEventDataSummary,
    ListDeploymentEventsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDeploymentEventsInput,
  output: ListDeploymentEventsOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "deploymentEvents",
    pageSize: "maxResults",
  } as const,
}));
export type GetWorkloadError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a workload.
 */
export const getWorkload: API.OperationMethod<
  GetWorkloadInput,
  GetWorkloadOutput,
  GetWorkloadError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetWorkloadInput,
  output: GetWorkloadOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type ListWorkloadsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists the available workload names. You can use the ListWorkloadDeploymentPatterns operation to discover the available deployment patterns for a given workload.
 */
export const listWorkloads: API.OperationMethod<
  ListWorkloadsInput,
  ListWorkloadsOutput,
  ListWorkloadsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListWorkloadsInput,
  ) => stream.Stream<
    ListWorkloadsOutput,
    ListWorkloadsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListWorkloadsInput,
  ) => stream.Stream<
    WorkloadDataSummary,
    ListWorkloadsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListWorkloadsInput,
  output: ListWorkloadsOutput,
  errors: [InternalServerException, ValidationException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workloads",
    pageSize: "maxResults",
  } as const,
}));
export type GetWorkloadDeploymentPatternError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns details for a given workload and deployment pattern, including the available specifications. You can use the ListWorkloads operation to discover the available workload names and the ListWorkloadDeploymentPatterns operation to discover the available deployment pattern names of a given workload.
 */
export const getWorkloadDeploymentPattern: API.OperationMethod<
  GetWorkloadDeploymentPatternInput,
  GetWorkloadDeploymentPatternOutput,
  GetWorkloadDeploymentPatternError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetWorkloadDeploymentPatternInput,
  output: GetWorkloadDeploymentPatternOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type ListWorkloadDeploymentPatternsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the workload deployment patterns for a given workload name. You can use the ListWorkloads operation to discover the available workload names.
 */
export const listWorkloadDeploymentPatterns: API.OperationMethod<
  ListWorkloadDeploymentPatternsInput,
  ListWorkloadDeploymentPatternsOutput,
  ListWorkloadDeploymentPatternsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListWorkloadDeploymentPatternsInput,
  ) => stream.Stream<
    ListWorkloadDeploymentPatternsOutput,
    ListWorkloadDeploymentPatternsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListWorkloadDeploymentPatternsInput,
  ) => stream.Stream<
    WorkloadDeploymentPatternDataSummary,
    ListWorkloadDeploymentPatternsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListWorkloadDeploymentPatternsInput,
  output: ListWorkloadDeploymentPatternsOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workloadDeploymentPatterns",
    pageSize: "maxResults",
  } as const,
}));
export type GetDeploymentPatternVersionError =
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns information about a deployment pattern version.
 */
export const getDeploymentPatternVersion: API.OperationMethod<
  GetDeploymentPatternVersionInput,
  GetDeploymentPatternVersionOutput,
  GetDeploymentPatternVersionError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDeploymentPatternVersionInput,
  output: GetDeploymentPatternVersionOutput,
  errors: [InternalServerException, ResourceNotFoundException],
}));
export type ListDeploymentPatternVersionsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the deployment pattern versions.
 */
export const listDeploymentPatternVersions: API.OperationMethod<
  ListDeploymentPatternVersionsInput,
  ListDeploymentPatternVersionsOutput,
  ListDeploymentPatternVersionsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListDeploymentPatternVersionsInput,
  ) => stream.Stream<
    ListDeploymentPatternVersionsOutput,
    ListDeploymentPatternVersionsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListDeploymentPatternVersionsInput,
  ) => stream.Stream<
    DeploymentPatternVersionDataSummary,
    ListDeploymentPatternVersionsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDeploymentPatternVersionsInput,
  output: ListDeploymentPatternVersionsOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "deploymentPatternVersions",
    pageSize: "maxResults",
  } as const,
}));
