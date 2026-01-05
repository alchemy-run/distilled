import * as S from "effect/Schema";
import * as API from "../api.ts";
import * as T from "../traits.ts";
import { ERROR_CATEGORIES, withCategory } from "../error-category.ts";
const svc = T.AwsApiService({
  sdkId: "finspace",
  serviceShapeName: "AWSHabaneroManagementService",
});
const auth = T.AwsAuthSigv4({ name: "finspace" });
const ver = T.ServiceVersion("2021-03-12");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointRuleSet({
  version: "1.0",
  parameters: {
    Region: {
      builtIn: "AWS::Region",
      required: false,
      documentation: "The AWS region used to dispatch the request.",
      type: "string",
    },
    UseDualStack: {
      builtIn: "AWS::UseDualStack",
      required: true,
      default: false,
      documentation:
        "When true, use the dual-stack endpoint. If the configured endpoint does not support dual-stack, dispatching the request MAY return an error.",
      type: "boolean",
    },
    UseFIPS: {
      builtIn: "AWS::UseFIPS",
      required: true,
      default: false,
      documentation:
        "When true, send this request to the FIPS-compliant regional endpoint. If the configured endpoint does not have a FIPS compliant endpoint, dispatching the request will return an error.",
      type: "boolean",
    },
    Endpoint: {
      builtIn: "SDK::Endpoint",
      required: false,
      documentation: "Override the endpoint used to send this request",
      type: "string",
    },
  },
  rules: [
    {
      conditions: [{ fn: "isSet", argv: [{ ref: "Endpoint" }] }],
      rules: [
        {
          conditions: [
            { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, true] },
          ],
          error:
            "Invalid Configuration: FIPS and custom endpoint are not supported",
          type: "error",
        },
        {
          conditions: [
            { fn: "booleanEquals", argv: [{ ref: "UseDualStack" }, true] },
          ],
          error:
            "Invalid Configuration: Dualstack and custom endpoint are not supported",
          type: "error",
        },
        {
          conditions: [],
          endpoint: { url: { ref: "Endpoint" }, properties: {}, headers: {} },
          type: "endpoint",
        },
      ],
      type: "tree",
    },
    {
      conditions: [{ fn: "isSet", argv: [{ ref: "Region" }] }],
      rules: [
        {
          conditions: [
            {
              fn: "aws.partition",
              argv: [{ ref: "Region" }],
              assign: "PartitionResult",
            },
          ],
          rules: [
            {
              conditions: [
                { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, true] },
                { fn: "booleanEquals", argv: [{ ref: "UseDualStack" }, true] },
              ],
              rules: [
                {
                  conditions: [
                    {
                      fn: "booleanEquals",
                      argv: [
                        true,
                        {
                          fn: "getAttr",
                          argv: [{ ref: "PartitionResult" }, "supportsFIPS"],
                        },
                      ],
                    },
                    {
                      fn: "booleanEquals",
                      argv: [
                        true,
                        {
                          fn: "getAttr",
                          argv: [
                            { ref: "PartitionResult" },
                            "supportsDualStack",
                          ],
                        },
                      ],
                    },
                  ],
                  rules: [
                    {
                      conditions: [],
                      endpoint: {
                        url: "https://finspace-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                        properties: {},
                        headers: {},
                      },
                      type: "endpoint",
                    },
                  ],
                  type: "tree",
                },
                {
                  conditions: [],
                  error:
                    "FIPS and DualStack are enabled, but this partition does not support one or both",
                  type: "error",
                },
              ],
              type: "tree",
            },
            {
              conditions: [
                { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, true] },
              ],
              rules: [
                {
                  conditions: [
                    {
                      fn: "booleanEquals",
                      argv: [
                        {
                          fn: "getAttr",
                          argv: [{ ref: "PartitionResult" }, "supportsFIPS"],
                        },
                        true,
                      ],
                    },
                  ],
                  rules: [
                    {
                      conditions: [],
                      endpoint: {
                        url: "https://finspace-fips.{Region}.{PartitionResult#dnsSuffix}",
                        properties: {},
                        headers: {},
                      },
                      type: "endpoint",
                    },
                  ],
                  type: "tree",
                },
                {
                  conditions: [],
                  error:
                    "FIPS is enabled but this partition does not support FIPS",
                  type: "error",
                },
              ],
              type: "tree",
            },
            {
              conditions: [
                { fn: "booleanEquals", argv: [{ ref: "UseDualStack" }, true] },
              ],
              rules: [
                {
                  conditions: [
                    {
                      fn: "booleanEquals",
                      argv: [
                        true,
                        {
                          fn: "getAttr",
                          argv: [
                            { ref: "PartitionResult" },
                            "supportsDualStack",
                          ],
                        },
                      ],
                    },
                  ],
                  rules: [
                    {
                      conditions: [],
                      endpoint: {
                        url: "https://finspace.{Region}.{PartitionResult#dualStackDnsSuffix}",
                        properties: {},
                        headers: {},
                      },
                      type: "endpoint",
                    },
                  ],
                  type: "tree",
                },
                {
                  conditions: [],
                  error:
                    "DualStack is enabled but this partition does not support DualStack",
                  type: "error",
                },
              ],
              type: "tree",
            },
            {
              conditions: [],
              endpoint: {
                url: "https://finspace.{Region}.{PartitionResult#dnsSuffix}",
                properties: {},
                headers: {},
              },
              type: "endpoint",
            },
          ],
          type: "tree",
        },
      ],
      type: "tree",
    },
    {
      conditions: [],
      error: "Invalid Configuration: Missing Region",
      type: "error",
    },
  ],
});

//# Schemas
export type DataBundleArns = string[];
export const DataBundleArns = S.Array(S.String);
export type AvailabilityZoneIds = string[];
export const AvailabilityZoneIds = S.Array(S.String);
export type TagKeyList = string[];
export const TagKeyList = S.Array(S.String);
export type TagMap = { [key: string]: string };
export const TagMap = S.Record({ key: S.String, value: S.String });
export interface CreateKxDatabaseRequest {
  environmentId: string;
  databaseName: string;
  description?: string;
  tags?: TagMap;
  clientToken: string;
}
export const CreateKxDatabaseRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    databaseName: S.String,
    description: S.optional(S.String),
    tags: S.optional(TagMap),
    clientToken: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/kx/environments/{environmentId}/databases",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "CreateKxDatabaseRequest",
}) as any as S.Schema<CreateKxDatabaseRequest>;
export interface CreateKxEnvironmentRequest {
  name: string;
  description?: string;
  kmsKeyId: string;
  tags?: TagMap;
  clientToken?: string;
}
export const CreateKxEnvironmentRequest = S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    kmsKeyId: S.String,
    tags: S.optional(TagMap),
    clientToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/kx/environments" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "CreateKxEnvironmentRequest",
}) as any as S.Schema<CreateKxEnvironmentRequest>;
export interface CreateKxScalingGroupRequest {
  clientToken: string;
  environmentId: string;
  scalingGroupName: string;
  hostType: string;
  availabilityZoneId: string;
  tags?: TagMap;
}
export const CreateKxScalingGroupRequest = S.suspend(() =>
  S.Struct({
    clientToken: S.String,
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    scalingGroupName: S.String,
    hostType: S.String,
    availabilityZoneId: S.String,
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/kx/environments/{environmentId}/scalingGroups",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "CreateKxScalingGroupRequest",
}) as any as S.Schema<CreateKxScalingGroupRequest>;
export interface CreateKxUserRequest {
  environmentId: string;
  userName: string;
  iamRole: string;
  tags?: TagMap;
  clientToken?: string;
}
export const CreateKxUserRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    userName: S.String,
    iamRole: S.String,
    tags: S.optional(TagMap),
    clientToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/kx/environments/{environmentId}/users" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "CreateKxUserRequest",
}) as any as S.Schema<CreateKxUserRequest>;
export interface DeleteEnvironmentRequest {
  environmentId: string;
}
export const DeleteEnvironmentRequest = S.suspend(() =>
  S.Struct({ environmentId: S.String.pipe(T.HttpLabel("environmentId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/environment/{environmentId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "DeleteEnvironmentRequest",
}) as any as S.Schema<DeleteEnvironmentRequest>;
export interface DeleteEnvironmentResponse {}
export const DeleteEnvironmentResponse = S.suspend(() =>
  S.Struct({}),
).annotations({
  identifier: "DeleteEnvironmentResponse",
}) as any as S.Schema<DeleteEnvironmentResponse>;
export interface DeleteKxClusterRequest {
  environmentId: string;
  clusterName: string;
  clientToken?: string;
}
export const DeleteKxClusterRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/kx/environments/{environmentId}/clusters/{clusterName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "DeleteKxClusterRequest",
}) as any as S.Schema<DeleteKxClusterRequest>;
export interface DeleteKxClusterResponse {}
export const DeleteKxClusterResponse = S.suspend(() =>
  S.Struct({}),
).annotations({
  identifier: "DeleteKxClusterResponse",
}) as any as S.Schema<DeleteKxClusterResponse>;
export interface DeleteKxClusterNodeRequest {
  environmentId: string;
  clusterName: string;
  nodeId: string;
}
export const DeleteKxClusterNodeRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    nodeId: S.String.pipe(T.HttpLabel("nodeId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/kx/environments/{environmentId}/clusters/{clusterName}/nodes/{nodeId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "DeleteKxClusterNodeRequest",
}) as any as S.Schema<DeleteKxClusterNodeRequest>;
export interface DeleteKxClusterNodeResponse {}
export const DeleteKxClusterNodeResponse = S.suspend(() =>
  S.Struct({}),
).annotations({
  identifier: "DeleteKxClusterNodeResponse",
}) as any as S.Schema<DeleteKxClusterNodeResponse>;
export interface DeleteKxDatabaseRequest {
  environmentId: string;
  databaseName: string;
  clientToken: string;
}
export const DeleteKxDatabaseRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    databaseName: S.String.pipe(T.HttpLabel("databaseName")),
    clientToken: S.String.pipe(T.HttpQuery("clientToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/kx/environments/{environmentId}/databases/{databaseName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "DeleteKxDatabaseRequest",
}) as any as S.Schema<DeleteKxDatabaseRequest>;
export interface DeleteKxDatabaseResponse {}
export const DeleteKxDatabaseResponse = S.suspend(() =>
  S.Struct({}),
).annotations({
  identifier: "DeleteKxDatabaseResponse",
}) as any as S.Schema<DeleteKxDatabaseResponse>;
export interface DeleteKxDataviewRequest {
  environmentId: string;
  databaseName: string;
  dataviewName: string;
  clientToken: string;
}
export const DeleteKxDataviewRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    databaseName: S.String.pipe(T.HttpLabel("databaseName")),
    dataviewName: S.String.pipe(T.HttpLabel("dataviewName")),
    clientToken: S.String.pipe(T.HttpQuery("clientToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/kx/environments/{environmentId}/databases/{databaseName}/dataviews/{dataviewName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "DeleteKxDataviewRequest",
}) as any as S.Schema<DeleteKxDataviewRequest>;
export interface DeleteKxDataviewResponse {}
export const DeleteKxDataviewResponse = S.suspend(() =>
  S.Struct({}),
).annotations({
  identifier: "DeleteKxDataviewResponse",
}) as any as S.Schema<DeleteKxDataviewResponse>;
export interface DeleteKxEnvironmentRequest {
  environmentId: string;
  clientToken?: string;
}
export const DeleteKxEnvironmentRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/kx/environments/{environmentId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "DeleteKxEnvironmentRequest",
}) as any as S.Schema<DeleteKxEnvironmentRequest>;
export interface DeleteKxEnvironmentResponse {}
export const DeleteKxEnvironmentResponse = S.suspend(() =>
  S.Struct({}),
).annotations({
  identifier: "DeleteKxEnvironmentResponse",
}) as any as S.Schema<DeleteKxEnvironmentResponse>;
export interface DeleteKxScalingGroupRequest {
  environmentId: string;
  scalingGroupName: string;
  clientToken?: string;
}
export const DeleteKxScalingGroupRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    scalingGroupName: S.String.pipe(T.HttpLabel("scalingGroupName")),
    clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/kx/environments/{environmentId}/scalingGroups/{scalingGroupName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "DeleteKxScalingGroupRequest",
}) as any as S.Schema<DeleteKxScalingGroupRequest>;
export interface DeleteKxScalingGroupResponse {}
export const DeleteKxScalingGroupResponse = S.suspend(() =>
  S.Struct({}),
).annotations({
  identifier: "DeleteKxScalingGroupResponse",
}) as any as S.Schema<DeleteKxScalingGroupResponse>;
export interface DeleteKxUserRequest {
  userName: string;
  environmentId: string;
  clientToken?: string;
}
export const DeleteKxUserRequest = S.suspend(() =>
  S.Struct({
    userName: S.String.pipe(T.HttpLabel("userName")),
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/kx/environments/{environmentId}/users/{userName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "DeleteKxUserRequest",
}) as any as S.Schema<DeleteKxUserRequest>;
export interface DeleteKxUserResponse {}
export const DeleteKxUserResponse = S.suspend(() => S.Struct({})).annotations({
  identifier: "DeleteKxUserResponse",
}) as any as S.Schema<DeleteKxUserResponse>;
export interface DeleteKxVolumeRequest {
  environmentId: string;
  volumeName: string;
  clientToken?: string;
}
export const DeleteKxVolumeRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    volumeName: S.String.pipe(T.HttpLabel("volumeName")),
    clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/kx/environments/{environmentId}/kxvolumes/{volumeName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "DeleteKxVolumeRequest",
}) as any as S.Schema<DeleteKxVolumeRequest>;
export interface DeleteKxVolumeResponse {}
export const DeleteKxVolumeResponse = S.suspend(() => S.Struct({})).annotations(
  { identifier: "DeleteKxVolumeResponse" },
) as any as S.Schema<DeleteKxVolumeResponse>;
export interface GetEnvironmentRequest {
  environmentId: string;
}
export const GetEnvironmentRequest = S.suspend(() =>
  S.Struct({ environmentId: S.String.pipe(T.HttpLabel("environmentId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/environment/{environmentId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "GetEnvironmentRequest",
}) as any as S.Schema<GetEnvironmentRequest>;
export interface GetKxChangesetRequest {
  environmentId: string;
  databaseName: string;
  changesetId: string;
}
export const GetKxChangesetRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    databaseName: S.String.pipe(T.HttpLabel("databaseName")),
    changesetId: S.String.pipe(T.HttpLabel("changesetId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/kx/environments/{environmentId}/databases/{databaseName}/changesets/{changesetId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "GetKxChangesetRequest",
}) as any as S.Schema<GetKxChangesetRequest>;
export interface GetKxClusterRequest {
  environmentId: string;
  clusterName: string;
}
export const GetKxClusterRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/kx/environments/{environmentId}/clusters/{clusterName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "GetKxClusterRequest",
}) as any as S.Schema<GetKxClusterRequest>;
export interface GetKxConnectionStringRequest {
  userArn: string;
  environmentId: string;
  clusterName: string;
}
export const GetKxConnectionStringRequest = S.suspend(() =>
  S.Struct({
    userArn: S.String.pipe(T.HttpQuery("userArn")),
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    clusterName: S.String.pipe(T.HttpQuery("clusterName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/kx/environments/{environmentId}/connectionString",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "GetKxConnectionStringRequest",
}) as any as S.Schema<GetKxConnectionStringRequest>;
export interface GetKxDatabaseRequest {
  environmentId: string;
  databaseName: string;
}
export const GetKxDatabaseRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    databaseName: S.String.pipe(T.HttpLabel("databaseName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/kx/environments/{environmentId}/databases/{databaseName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "GetKxDatabaseRequest",
}) as any as S.Schema<GetKxDatabaseRequest>;
export interface GetKxDataviewRequest {
  environmentId: string;
  databaseName: string;
  dataviewName: string;
}
export const GetKxDataviewRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    databaseName: S.String.pipe(T.HttpLabel("databaseName")),
    dataviewName: S.String.pipe(T.HttpLabel("dataviewName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/kx/environments/{environmentId}/databases/{databaseName}/dataviews/{dataviewName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "GetKxDataviewRequest",
}) as any as S.Schema<GetKxDataviewRequest>;
export interface GetKxEnvironmentRequest {
  environmentId: string;
}
export const GetKxEnvironmentRequest = S.suspend(() =>
  S.Struct({ environmentId: S.String.pipe(T.HttpLabel("environmentId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/kx/environments/{environmentId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "GetKxEnvironmentRequest",
}) as any as S.Schema<GetKxEnvironmentRequest>;
export interface GetKxScalingGroupRequest {
  environmentId: string;
  scalingGroupName: string;
}
export const GetKxScalingGroupRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    scalingGroupName: S.String.pipe(T.HttpLabel("scalingGroupName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/kx/environments/{environmentId}/scalingGroups/{scalingGroupName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "GetKxScalingGroupRequest",
}) as any as S.Schema<GetKxScalingGroupRequest>;
export interface GetKxUserRequest {
  userName: string;
  environmentId: string;
}
export const GetKxUserRequest = S.suspend(() =>
  S.Struct({
    userName: S.String.pipe(T.HttpLabel("userName")),
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/kx/environments/{environmentId}/users/{userName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "GetKxUserRequest",
}) as any as S.Schema<GetKxUserRequest>;
export interface GetKxVolumeRequest {
  environmentId: string;
  volumeName: string;
}
export const GetKxVolumeRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    volumeName: S.String.pipe(T.HttpLabel("volumeName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/kx/environments/{environmentId}/kxvolumes/{volumeName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "GetKxVolumeRequest",
}) as any as S.Schema<GetKxVolumeRequest>;
export interface ListEnvironmentsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListEnvironmentsRequest = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/environment" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "ListEnvironmentsRequest",
}) as any as S.Schema<ListEnvironmentsRequest>;
export interface ListKxChangesetsRequest {
  environmentId: string;
  databaseName: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListKxChangesetsRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    databaseName: S.String.pipe(T.HttpLabel("databaseName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/kx/environments/{environmentId}/databases/{databaseName}/changesets",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "ListKxChangesetsRequest",
}) as any as S.Schema<ListKxChangesetsRequest>;
export interface ListKxClusterNodesRequest {
  environmentId: string;
  clusterName: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListKxClusterNodesRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/kx/environments/{environmentId}/clusters/{clusterName}/nodes",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "ListKxClusterNodesRequest",
}) as any as S.Schema<ListKxClusterNodesRequest>;
export interface ListKxClustersRequest {
  environmentId: string;
  clusterType?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListKxClustersRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    clusterType: S.optional(S.String).pipe(T.HttpQuery("clusterType")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/kx/environments/{environmentId}/clusters",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "ListKxClustersRequest",
}) as any as S.Schema<ListKxClustersRequest>;
export interface ListKxDatabasesRequest {
  environmentId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListKxDatabasesRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/kx/environments/{environmentId}/databases",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "ListKxDatabasesRequest",
}) as any as S.Schema<ListKxDatabasesRequest>;
export interface ListKxDataviewsRequest {
  environmentId: string;
  databaseName: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListKxDataviewsRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    databaseName: S.String.pipe(T.HttpLabel("databaseName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/kx/environments/{environmentId}/databases/{databaseName}/dataviews",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "ListKxDataviewsRequest",
}) as any as S.Schema<ListKxDataviewsRequest>;
export interface ListKxEnvironmentsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListKxEnvironmentsRequest = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/kx/environments" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "ListKxEnvironmentsRequest",
}) as any as S.Schema<ListKxEnvironmentsRequest>;
export interface ListKxScalingGroupsRequest {
  environmentId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListKxScalingGroupsRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/kx/environments/{environmentId}/scalingGroups",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "ListKxScalingGroupsRequest",
}) as any as S.Schema<ListKxScalingGroupsRequest>;
export interface ListKxUsersRequest {
  environmentId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListKxUsersRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/kx/environments/{environmentId}/users" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "ListKxUsersRequest",
}) as any as S.Schema<ListKxUsersRequest>;
export interface ListKxVolumesRequest {
  environmentId: string;
  maxResults?: number;
  nextToken?: string;
  volumeType?: string;
}
export const ListKxVolumesRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    volumeType: S.optional(S.String).pipe(T.HttpQuery("volumeType")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/kx/environments/{environmentId}/kxvolumes",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "ListKxVolumesRequest",
}) as any as S.Schema<ListKxVolumesRequest>;
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
).annotations({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: TagMap;
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
).annotations({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() => S.Struct({})).annotations({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: TagKeyList;
}
export const UntagResourceRequest = S.suspend(() =>
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
).annotations({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotations({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export type AttributeMap = { [key: string]: string };
export const AttributeMap = S.Record({ key: S.String, value: S.String });
export interface FederationParameters {
  samlMetadataDocument?: string;
  samlMetadataURL?: string;
  applicationCallBackURL?: string;
  federationURN?: string;
  federationProviderName?: string;
  attributeMap?: AttributeMap;
}
export const FederationParameters = S.suspend(() =>
  S.Struct({
    samlMetadataDocument: S.optional(S.String),
    samlMetadataURL: S.optional(S.String),
    applicationCallBackURL: S.optional(S.String),
    federationURN: S.optional(S.String),
    federationProviderName: S.optional(S.String),
    attributeMap: S.optional(AttributeMap),
  }),
).annotations({
  identifier: "FederationParameters",
}) as any as S.Schema<FederationParameters>;
export interface UpdateEnvironmentRequest {
  environmentId: string;
  name?: string;
  description?: string;
  federationMode?: string;
  federationParameters?: FederationParameters;
}
export const UpdateEnvironmentRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    name: S.optional(S.String),
    description: S.optional(S.String),
    federationMode: S.optional(S.String),
    federationParameters: S.optional(FederationParameters),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/environment/{environmentId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "UpdateEnvironmentRequest",
}) as any as S.Schema<UpdateEnvironmentRequest>;
export interface UpdateKxDatabaseRequest {
  environmentId: string;
  databaseName: string;
  description?: string;
  clientToken: string;
}
export const UpdateKxDatabaseRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    databaseName: S.String.pipe(T.HttpLabel("databaseName")),
    description: S.optional(S.String),
    clientToken: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/kx/environments/{environmentId}/databases/{databaseName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "UpdateKxDatabaseRequest",
}) as any as S.Schema<UpdateKxDatabaseRequest>;
export type SegmentConfigurationDbPathList = string[];
export const SegmentConfigurationDbPathList = S.Array(S.String);
export interface KxDataviewSegmentConfiguration {
  dbPaths: SegmentConfigurationDbPathList;
  volumeName: string;
  onDemand?: boolean;
}
export const KxDataviewSegmentConfiguration = S.suspend(() =>
  S.Struct({
    dbPaths: SegmentConfigurationDbPathList,
    volumeName: S.String,
    onDemand: S.optional(S.Boolean),
  }),
).annotations({
  identifier: "KxDataviewSegmentConfiguration",
}) as any as S.Schema<KxDataviewSegmentConfiguration>;
export type KxDataviewSegmentConfigurationList =
  KxDataviewSegmentConfiguration[];
export const KxDataviewSegmentConfigurationList = S.Array(
  KxDataviewSegmentConfiguration,
);
export interface UpdateKxDataviewRequest {
  environmentId: string;
  databaseName: string;
  dataviewName: string;
  description?: string;
  changesetId?: string;
  segmentConfigurations?: KxDataviewSegmentConfigurationList;
  clientToken: string;
}
export const UpdateKxDataviewRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    databaseName: S.String.pipe(T.HttpLabel("databaseName")),
    dataviewName: S.String.pipe(T.HttpLabel("dataviewName")),
    description: S.optional(S.String),
    changesetId: S.optional(S.String),
    segmentConfigurations: S.optional(KxDataviewSegmentConfigurationList),
    clientToken: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/kx/environments/{environmentId}/databases/{databaseName}/dataviews/{dataviewName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "UpdateKxDataviewRequest",
}) as any as S.Schema<UpdateKxDataviewRequest>;
export interface UpdateKxEnvironmentRequest {
  environmentId: string;
  name?: string;
  description?: string;
  clientToken?: string;
}
export const UpdateKxEnvironmentRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    name: S.optional(S.String),
    description: S.optional(S.String),
    clientToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/kx/environments/{environmentId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "UpdateKxEnvironmentRequest",
}) as any as S.Schema<UpdateKxEnvironmentRequest>;
export interface UpdateKxUserRequest {
  environmentId: string;
  userName: string;
  iamRole: string;
  clientToken?: string;
}
export const UpdateKxUserRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    userName: S.String.pipe(T.HttpLabel("userName")),
    iamRole: S.String,
    clientToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/kx/environments/{environmentId}/users/{userName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "UpdateKxUserRequest",
}) as any as S.Schema<UpdateKxUserRequest>;
export interface KxNAS1Configuration {
  type?: string;
  size?: number;
}
export const KxNAS1Configuration = S.suspend(() =>
  S.Struct({ type: S.optional(S.String), size: S.optional(S.Number) }),
).annotations({
  identifier: "KxNAS1Configuration",
}) as any as S.Schema<KxNAS1Configuration>;
export interface UpdateKxVolumeRequest {
  environmentId: string;
  volumeName: string;
  description?: string;
  clientToken?: string;
  nas1Configuration?: KxNAS1Configuration;
}
export const UpdateKxVolumeRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    volumeName: S.String.pipe(T.HttpLabel("volumeName")),
    description: S.optional(S.String),
    clientToken: S.optional(S.String),
    nas1Configuration: S.optional(KxNAS1Configuration),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/kx/environments/{environmentId}/kxvolumes/{volumeName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "UpdateKxVolumeRequest",
}) as any as S.Schema<UpdateKxVolumeRequest>;
export type TickerplantLogVolumes = string[];
export const TickerplantLogVolumes = S.Array(S.String);
export type SecurityGroupIdList = string[];
export const SecurityGroupIdList = S.Array(S.String);
export type SubnetIdList = string[];
export const SubnetIdList = S.Array(S.String);
export interface SuperuserParameters {
  emailAddress: string;
  firstName: string;
  lastName: string;
}
export const SuperuserParameters = S.suspend(() =>
  S.Struct({ emailAddress: S.String, firstName: S.String, lastName: S.String }),
).annotations({
  identifier: "SuperuserParameters",
}) as any as S.Schema<SuperuserParameters>;
export interface ChangeRequest {
  changeType: string;
  s3Path?: string;
  dbPath: string;
}
export const ChangeRequest = S.suspend(() =>
  S.Struct({
    changeType: S.String,
    s3Path: S.optional(S.String),
    dbPath: S.String,
  }),
).annotations({
  identifier: "ChangeRequest",
}) as any as S.Schema<ChangeRequest>;
export type ChangeRequests = ChangeRequest[];
export const ChangeRequests = S.Array(ChangeRequest);
export interface TickerplantLogConfiguration {
  tickerplantLogVolumes?: TickerplantLogVolumes;
}
export const TickerplantLogConfiguration = S.suspend(() =>
  S.Struct({ tickerplantLogVolumes: S.optional(TickerplantLogVolumes) }),
).annotations({
  identifier: "TickerplantLogConfiguration",
}) as any as S.Schema<TickerplantLogConfiguration>;
export interface KxCacheStorageConfiguration {
  type: string;
  size: number;
}
export const KxCacheStorageConfiguration = S.suspend(() =>
  S.Struct({ type: S.String, size: S.Number }),
).annotations({
  identifier: "KxCacheStorageConfiguration",
}) as any as S.Schema<KxCacheStorageConfiguration>;
export type KxCacheStorageConfigurations = KxCacheStorageConfiguration[];
export const KxCacheStorageConfigurations = S.Array(
  KxCacheStorageConfiguration,
);
export interface AutoScalingConfiguration {
  minNodeCount?: number;
  maxNodeCount?: number;
  autoScalingMetric?: string;
  metricTarget?: number;
  scaleInCooldownSeconds?: number;
  scaleOutCooldownSeconds?: number;
}
export const AutoScalingConfiguration = S.suspend(() =>
  S.Struct({
    minNodeCount: S.optional(S.Number),
    maxNodeCount: S.optional(S.Number),
    autoScalingMetric: S.optional(S.String),
    metricTarget: S.optional(S.Number),
    scaleInCooldownSeconds: S.optional(S.Number),
    scaleOutCooldownSeconds: S.optional(S.Number),
  }),
).annotations({
  identifier: "AutoScalingConfiguration",
}) as any as S.Schema<AutoScalingConfiguration>;
export interface CapacityConfiguration {
  nodeType?: string;
  nodeCount?: number;
}
export const CapacityConfiguration = S.suspend(() =>
  S.Struct({ nodeType: S.optional(S.String), nodeCount: S.optional(S.Number) }),
).annotations({
  identifier: "CapacityConfiguration",
}) as any as S.Schema<CapacityConfiguration>;
export interface VpcConfiguration {
  vpcId?: string;
  securityGroupIds?: SecurityGroupIdList;
  subnetIds?: SubnetIdList;
  ipAddressType?: string;
}
export const VpcConfiguration = S.suspend(() =>
  S.Struct({
    vpcId: S.optional(S.String),
    securityGroupIds: S.optional(SecurityGroupIdList),
    subnetIds: S.optional(SubnetIdList),
    ipAddressType: S.optional(S.String),
  }),
).annotations({
  identifier: "VpcConfiguration",
}) as any as S.Schema<VpcConfiguration>;
export interface KxCommandLineArgument {
  key?: string;
  value?: string;
}
export const KxCommandLineArgument = S.suspend(() =>
  S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
).annotations({
  identifier: "KxCommandLineArgument",
}) as any as S.Schema<KxCommandLineArgument>;
export type KxCommandLineArguments = KxCommandLineArgument[];
export const KxCommandLineArguments = S.Array(KxCommandLineArgument);
export interface CodeConfiguration {
  s3Bucket?: string;
  s3Key?: string;
  s3ObjectVersion?: string;
}
export const CodeConfiguration = S.suspend(() =>
  S.Struct({
    s3Bucket: S.optional(S.String),
    s3Key: S.optional(S.String),
    s3ObjectVersion: S.optional(S.String),
  }),
).annotations({
  identifier: "CodeConfiguration",
}) as any as S.Schema<CodeConfiguration>;
export interface KxSavedownStorageConfiguration {
  type?: string;
  size?: number;
  volumeName?: string;
}
export const KxSavedownStorageConfiguration = S.suspend(() =>
  S.Struct({
    type: S.optional(S.String),
    size: S.optional(S.Number),
    volumeName: S.optional(S.String),
  }),
).annotations({
  identifier: "KxSavedownStorageConfiguration",
}) as any as S.Schema<KxSavedownStorageConfiguration>;
export interface KxScalingGroupConfiguration {
  scalingGroupName: string;
  memoryLimit?: number;
  memoryReservation: number;
  nodeCount: number;
  cpu?: number;
}
export const KxScalingGroupConfiguration = S.suspend(() =>
  S.Struct({
    scalingGroupName: S.String,
    memoryLimit: S.optional(S.Number),
    memoryReservation: S.Number,
    nodeCount: S.Number,
    cpu: S.optional(S.Number),
  }),
).annotations({
  identifier: "KxScalingGroupConfiguration",
}) as any as S.Schema<KxScalingGroupConfiguration>;
export type KxClusterNameList = string[];
export const KxClusterNameList = S.Array(S.String);
export interface Environment {
  name?: string;
  environmentId?: string;
  awsAccountId?: string;
  status?: string;
  environmentUrl?: string;
  description?: string;
  environmentArn?: string;
  sageMakerStudioDomainUrl?: string;
  kmsKeyId?: string;
  dedicatedServiceAccountId?: string;
  federationMode?: string;
  federationParameters?: FederationParameters;
}
export const Environment = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    environmentId: S.optional(S.String),
    awsAccountId: S.optional(S.String),
    status: S.optional(S.String),
    environmentUrl: S.optional(S.String),
    description: S.optional(S.String),
    environmentArn: S.optional(S.String),
    sageMakerStudioDomainUrl: S.optional(S.String),
    kmsKeyId: S.optional(S.String),
    dedicatedServiceAccountId: S.optional(S.String),
    federationMode: S.optional(S.String),
    federationParameters: S.optional(FederationParameters),
  }),
).annotations({ identifier: "Environment" }) as any as S.Schema<Environment>;
export type EnvironmentList = Environment[];
export const EnvironmentList = S.Array(Environment);
export interface KxClusterCodeDeploymentConfiguration {
  deploymentStrategy: string;
}
export const KxClusterCodeDeploymentConfiguration = S.suspend(() =>
  S.Struct({ deploymentStrategy: S.String }),
).annotations({
  identifier: "KxClusterCodeDeploymentConfiguration",
}) as any as S.Schema<KxClusterCodeDeploymentConfiguration>;
export interface KxDeploymentConfiguration {
  deploymentStrategy: string;
}
export const KxDeploymentConfiguration = S.suspend(() =>
  S.Struct({ deploymentStrategy: S.String }),
).annotations({
  identifier: "KxDeploymentConfiguration",
}) as any as S.Schema<KxDeploymentConfiguration>;
export interface CustomDNSServer {
  customDNSServerName: string;
  customDNSServerIP: string;
}
export const CustomDNSServer = S.suspend(() =>
  S.Struct({ customDNSServerName: S.String, customDNSServerIP: S.String }),
).annotations({
  identifier: "CustomDNSServer",
}) as any as S.Schema<CustomDNSServer>;
export type CustomDNSConfiguration = CustomDNSServer[];
export const CustomDNSConfiguration = S.Array(CustomDNSServer);
export type DbPaths = string[];
export const DbPaths = S.Array(S.String);
export interface CreateKxChangesetRequest {
  environmentId: string;
  databaseName: string;
  changeRequests: ChangeRequests;
  clientToken: string;
}
export const CreateKxChangesetRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    databaseName: S.String.pipe(T.HttpLabel("databaseName")),
    changeRequests: ChangeRequests,
    clientToken: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/kx/environments/{environmentId}/databases/{databaseName}/changesets",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "CreateKxChangesetRequest",
}) as any as S.Schema<CreateKxChangesetRequest>;
export interface CreateKxDatabaseResponse {
  databaseName?: string;
  databaseArn?: string;
  environmentId?: string;
  description?: string;
  createdTimestamp?: Date;
  lastModifiedTimestamp?: Date;
}
export const CreateKxDatabaseResponse = S.suspend(() =>
  S.Struct({
    databaseName: S.optional(S.String),
    databaseArn: S.optional(S.String),
    environmentId: S.optional(S.String),
    description: S.optional(S.String),
    createdTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastModifiedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotations({
  identifier: "CreateKxDatabaseResponse",
}) as any as S.Schema<CreateKxDatabaseResponse>;
export interface CreateKxDataviewRequest {
  environmentId: string;
  databaseName: string;
  dataviewName: string;
  azMode: string;
  availabilityZoneId?: string;
  changesetId?: string;
  segmentConfigurations?: KxDataviewSegmentConfigurationList;
  autoUpdate?: boolean;
  readWrite?: boolean;
  description?: string;
  tags?: TagMap;
  clientToken: string;
}
export const CreateKxDataviewRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    databaseName: S.String.pipe(T.HttpLabel("databaseName")),
    dataviewName: S.String,
    azMode: S.String,
    availabilityZoneId: S.optional(S.String),
    changesetId: S.optional(S.String),
    segmentConfigurations: S.optional(KxDataviewSegmentConfigurationList),
    autoUpdate: S.optional(S.Boolean),
    readWrite: S.optional(S.Boolean),
    description: S.optional(S.String),
    tags: S.optional(TagMap),
    clientToken: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/kx/environments/{environmentId}/databases/{databaseName}/dataviews",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "CreateKxDataviewRequest",
}) as any as S.Schema<CreateKxDataviewRequest>;
export interface CreateKxEnvironmentResponse {
  name?: string;
  status?: string;
  environmentId?: string;
  description?: string;
  environmentArn?: string;
  kmsKeyId?: string;
  creationTimestamp?: Date;
}
export const CreateKxEnvironmentResponse = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    status: S.optional(S.String),
    environmentId: S.optional(S.String),
    description: S.optional(S.String),
    environmentArn: S.optional(S.String),
    kmsKeyId: S.optional(S.String),
    creationTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotations({
  identifier: "CreateKxEnvironmentResponse",
}) as any as S.Schema<CreateKxEnvironmentResponse>;
export interface CreateKxScalingGroupResponse {
  environmentId?: string;
  scalingGroupName?: string;
  hostType?: string;
  availabilityZoneId?: string;
  status?: string;
  lastModifiedTimestamp?: Date;
  createdTimestamp?: Date;
}
export const CreateKxScalingGroupResponse = S.suspend(() =>
  S.Struct({
    environmentId: S.optional(S.String),
    scalingGroupName: S.optional(S.String),
    hostType: S.optional(S.String),
    availabilityZoneId: S.optional(S.String),
    status: S.optional(S.String),
    lastModifiedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    createdTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotations({
  identifier: "CreateKxScalingGroupResponse",
}) as any as S.Schema<CreateKxScalingGroupResponse>;
export interface CreateKxUserResponse {
  userName?: string;
  userArn?: string;
  environmentId?: string;
  iamRole?: string;
}
export const CreateKxUserResponse = S.suspend(() =>
  S.Struct({
    userName: S.optional(S.String),
    userArn: S.optional(S.String),
    environmentId: S.optional(S.String),
    iamRole: S.optional(S.String),
  }),
).annotations({
  identifier: "CreateKxUserResponse",
}) as any as S.Schema<CreateKxUserResponse>;
export interface CreateKxVolumeRequest {
  clientToken?: string;
  environmentId: string;
  volumeType: string;
  volumeName: string;
  description?: string;
  nas1Configuration?: KxNAS1Configuration;
  azMode: string;
  availabilityZoneIds: AvailabilityZoneIds;
  tags?: TagMap;
}
export const CreateKxVolumeRequest = S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String),
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    volumeType: S.String,
    volumeName: S.String,
    description: S.optional(S.String),
    nas1Configuration: S.optional(KxNAS1Configuration),
    azMode: S.String,
    availabilityZoneIds: AvailabilityZoneIds,
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/kx/environments/{environmentId}/kxvolumes",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "CreateKxVolumeRequest",
}) as any as S.Schema<CreateKxVolumeRequest>;
export interface GetKxConnectionStringResponse {
  signedConnectionString?: string;
}
export const GetKxConnectionStringResponse = S.suspend(() =>
  S.Struct({ signedConnectionString: S.optional(S.String) }),
).annotations({
  identifier: "GetKxConnectionStringResponse",
}) as any as S.Schema<GetKxConnectionStringResponse>;
export interface GetKxDatabaseResponse {
  databaseName?: string;
  databaseArn?: string;
  environmentId?: string;
  description?: string;
  createdTimestamp?: Date;
  lastModifiedTimestamp?: Date;
  lastCompletedChangesetId?: string;
  numBytes?: number;
  numChangesets?: number;
  numFiles?: number;
}
export const GetKxDatabaseResponse = S.suspend(() =>
  S.Struct({
    databaseName: S.optional(S.String),
    databaseArn: S.optional(S.String),
    environmentId: S.optional(S.String),
    description: S.optional(S.String),
    createdTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastModifiedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastCompletedChangesetId: S.optional(S.String),
    numBytes: S.optional(S.Number),
    numChangesets: S.optional(S.Number),
    numFiles: S.optional(S.Number),
  }),
).annotations({
  identifier: "GetKxDatabaseResponse",
}) as any as S.Schema<GetKxDatabaseResponse>;
export interface PortRange {
  from: number;
  to: number;
}
export const PortRange = S.suspend(() =>
  S.Struct({ from: S.Number, to: S.Number }),
).annotations({ identifier: "PortRange" }) as any as S.Schema<PortRange>;
export interface IcmpTypeCode {
  type: number;
  code: number;
}
export const IcmpTypeCode = S.suspend(() =>
  S.Struct({ type: S.Number, code: S.Number }),
).annotations({ identifier: "IcmpTypeCode" }) as any as S.Schema<IcmpTypeCode>;
export interface NetworkACLEntry {
  ruleNumber: number;
  protocol: string;
  ruleAction: string;
  portRange?: PortRange;
  icmpTypeCode?: IcmpTypeCode;
  cidrBlock: string;
}
export const NetworkACLEntry = S.suspend(() =>
  S.Struct({
    ruleNumber: S.Number,
    protocol: S.String,
    ruleAction: S.String,
    portRange: S.optional(PortRange),
    icmpTypeCode: S.optional(IcmpTypeCode),
    cidrBlock: S.String,
  }),
).annotations({
  identifier: "NetworkACLEntry",
}) as any as S.Schema<NetworkACLEntry>;
export type NetworkACLConfiguration = NetworkACLEntry[];
export const NetworkACLConfiguration = S.Array(NetworkACLEntry);
export interface TransitGatewayConfiguration {
  transitGatewayID: string;
  routableCIDRSpace: string;
  attachmentNetworkAclConfiguration?: NetworkACLConfiguration;
}
export const TransitGatewayConfiguration = S.suspend(() =>
  S.Struct({
    transitGatewayID: S.String,
    routableCIDRSpace: S.String,
    attachmentNetworkAclConfiguration: S.optional(NetworkACLConfiguration),
  }),
).annotations({
  identifier: "TransitGatewayConfiguration",
}) as any as S.Schema<TransitGatewayConfiguration>;
export interface GetKxEnvironmentResponse {
  name?: string;
  environmentId?: string;
  awsAccountId?: string;
  status?: string;
  tgwStatus?: string;
  dnsStatus?: string;
  errorMessage?: string;
  description?: string;
  environmentArn?: string;
  kmsKeyId?: string;
  dedicatedServiceAccountId?: string;
  transitGatewayConfiguration?: TransitGatewayConfiguration;
  customDNSConfiguration?: CustomDNSConfiguration;
  creationTimestamp?: Date;
  updateTimestamp?: Date;
  availabilityZoneIds?: AvailabilityZoneIds;
  certificateAuthorityArn?: string;
}
export const GetKxEnvironmentResponse = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    environmentId: S.optional(S.String),
    awsAccountId: S.optional(S.String),
    status: S.optional(S.String),
    tgwStatus: S.optional(S.String),
    dnsStatus: S.optional(S.String),
    errorMessage: S.optional(S.String),
    description: S.optional(S.String),
    environmentArn: S.optional(S.String),
    kmsKeyId: S.optional(S.String),
    dedicatedServiceAccountId: S.optional(S.String),
    transitGatewayConfiguration: S.optional(TransitGatewayConfiguration),
    customDNSConfiguration: S.optional(CustomDNSConfiguration),
    creationTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    updateTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    availabilityZoneIds: S.optional(AvailabilityZoneIds),
    certificateAuthorityArn: S.optional(S.String),
  }),
).annotations({
  identifier: "GetKxEnvironmentResponse",
}) as any as S.Schema<GetKxEnvironmentResponse>;
export interface GetKxScalingGroupResponse {
  scalingGroupName?: string;
  scalingGroupArn?: string;
  hostType?: string;
  clusters?: KxClusterNameList;
  availabilityZoneId?: string;
  status?: string;
  statusReason?: string;
  lastModifiedTimestamp?: Date;
  createdTimestamp?: Date;
}
export const GetKxScalingGroupResponse = S.suspend(() =>
  S.Struct({
    scalingGroupName: S.optional(S.String),
    scalingGroupArn: S.optional(S.String),
    hostType: S.optional(S.String),
    clusters: S.optional(KxClusterNameList),
    availabilityZoneId: S.optional(S.String),
    status: S.optional(S.String),
    statusReason: S.optional(S.String),
    lastModifiedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    createdTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotations({
  identifier: "GetKxScalingGroupResponse",
}) as any as S.Schema<GetKxScalingGroupResponse>;
export interface GetKxUserResponse {
  userName?: string;
  userArn?: string;
  environmentId?: string;
  iamRole?: string;
}
export const GetKxUserResponse = S.suspend(() =>
  S.Struct({
    userName: S.optional(S.String),
    userArn: S.optional(S.String),
    environmentId: S.optional(S.String),
    iamRole: S.optional(S.String),
  }),
).annotations({
  identifier: "GetKxUserResponse",
}) as any as S.Schema<GetKxUserResponse>;
export interface ListEnvironmentsResponse {
  environments?: EnvironmentList;
  nextToken?: string;
}
export const ListEnvironmentsResponse = S.suspend(() =>
  S.Struct({
    environments: S.optional(EnvironmentList),
    nextToken: S.optional(S.String),
  }),
).annotations({
  identifier: "ListEnvironmentsResponse",
}) as any as S.Schema<ListEnvironmentsResponse>;
export interface ListTagsForResourceResponse {
  tags?: TagMap;
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ tags: S.optional(TagMap) }),
).annotations({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface UpdateEnvironmentResponse {
  environment?: Environment;
}
export const UpdateEnvironmentResponse = S.suspend(() =>
  S.Struct({ environment: S.optional(Environment) }),
).annotations({
  identifier: "UpdateEnvironmentResponse",
}) as any as S.Schema<UpdateEnvironmentResponse>;
export interface UpdateKxClusterCodeConfigurationRequest {
  environmentId: string;
  clusterName: string;
  clientToken?: string;
  code: CodeConfiguration;
  initializationScript?: string;
  commandLineArguments?: KxCommandLineArguments;
  deploymentConfiguration?: KxClusterCodeDeploymentConfiguration;
}
export const UpdateKxClusterCodeConfigurationRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    clientToken: S.optional(S.String),
    code: CodeConfiguration,
    initializationScript: S.optional(S.String),
    commandLineArguments: S.optional(KxCommandLineArguments),
    deploymentConfiguration: S.optional(KxClusterCodeDeploymentConfiguration),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/kx/environments/{environmentId}/clusters/{clusterName}/configuration/code",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "UpdateKxClusterCodeConfigurationRequest",
}) as any as S.Schema<UpdateKxClusterCodeConfigurationRequest>;
export interface UpdateKxClusterCodeConfigurationResponse {}
export const UpdateKxClusterCodeConfigurationResponse = S.suspend(() =>
  S.Struct({}),
).annotations({
  identifier: "UpdateKxClusterCodeConfigurationResponse",
}) as any as S.Schema<UpdateKxClusterCodeConfigurationResponse>;
export interface KxDatabaseCacheConfiguration {
  cacheType: string;
  dbPaths: DbPaths;
  dataviewName?: string;
}
export const KxDatabaseCacheConfiguration = S.suspend(() =>
  S.Struct({
    cacheType: S.String,
    dbPaths: DbPaths,
    dataviewName: S.optional(S.String),
  }),
).annotations({
  identifier: "KxDatabaseCacheConfiguration",
}) as any as S.Schema<KxDatabaseCacheConfiguration>;
export type KxDatabaseCacheConfigurations = KxDatabaseCacheConfiguration[];
export const KxDatabaseCacheConfigurations = S.Array(
  KxDatabaseCacheConfiguration,
);
export interface KxDataviewConfiguration {
  dataviewName?: string;
  dataviewVersionId?: string;
  changesetId?: string;
  segmentConfigurations?: KxDataviewSegmentConfigurationList;
}
export const KxDataviewConfiguration = S.suspend(() =>
  S.Struct({
    dataviewName: S.optional(S.String),
    dataviewVersionId: S.optional(S.String),
    changesetId: S.optional(S.String),
    segmentConfigurations: S.optional(KxDataviewSegmentConfigurationList),
  }),
).annotations({
  identifier: "KxDataviewConfiguration",
}) as any as S.Schema<KxDataviewConfiguration>;
export interface KxDatabaseConfiguration {
  databaseName: string;
  cacheConfigurations?: KxDatabaseCacheConfigurations;
  changesetId?: string;
  dataviewName?: string;
  dataviewConfiguration?: KxDataviewConfiguration;
}
export const KxDatabaseConfiguration = S.suspend(() =>
  S.Struct({
    databaseName: S.String,
    cacheConfigurations: S.optional(KxDatabaseCacheConfigurations),
    changesetId: S.optional(S.String),
    dataviewName: S.optional(S.String),
    dataviewConfiguration: S.optional(KxDataviewConfiguration),
  }),
).annotations({
  identifier: "KxDatabaseConfiguration",
}) as any as S.Schema<KxDatabaseConfiguration>;
export type KxDatabaseConfigurations = KxDatabaseConfiguration[];
export const KxDatabaseConfigurations = S.Array(KxDatabaseConfiguration);
export interface UpdateKxClusterDatabasesRequest {
  environmentId: string;
  clusterName: string;
  clientToken?: string;
  databases: KxDatabaseConfigurations;
  deploymentConfiguration?: KxDeploymentConfiguration;
}
export const UpdateKxClusterDatabasesRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    clientToken: S.optional(S.String),
    databases: KxDatabaseConfigurations,
    deploymentConfiguration: S.optional(KxDeploymentConfiguration),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/kx/environments/{environmentId}/clusters/{clusterName}/configuration/databases",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "UpdateKxClusterDatabasesRequest",
}) as any as S.Schema<UpdateKxClusterDatabasesRequest>;
export interface UpdateKxClusterDatabasesResponse {}
export const UpdateKxClusterDatabasesResponse = S.suspend(() =>
  S.Struct({}),
).annotations({
  identifier: "UpdateKxClusterDatabasesResponse",
}) as any as S.Schema<UpdateKxClusterDatabasesResponse>;
export interface UpdateKxDatabaseResponse {
  databaseName?: string;
  environmentId?: string;
  description?: string;
  lastModifiedTimestamp?: Date;
}
export const UpdateKxDatabaseResponse = S.suspend(() =>
  S.Struct({
    databaseName: S.optional(S.String),
    environmentId: S.optional(S.String),
    description: S.optional(S.String),
    lastModifiedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotations({
  identifier: "UpdateKxDatabaseResponse",
}) as any as S.Schema<UpdateKxDatabaseResponse>;
export type AttachedClusterList = string[];
export const AttachedClusterList = S.Array(S.String);
export interface KxDataviewActiveVersion {
  changesetId?: string;
  segmentConfigurations?: KxDataviewSegmentConfigurationList;
  attachedClusters?: AttachedClusterList;
  createdTimestamp?: Date;
  versionId?: string;
}
export const KxDataviewActiveVersion = S.suspend(() =>
  S.Struct({
    changesetId: S.optional(S.String),
    segmentConfigurations: S.optional(KxDataviewSegmentConfigurationList),
    attachedClusters: S.optional(AttachedClusterList),
    createdTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    versionId: S.optional(S.String),
  }),
).annotations({
  identifier: "KxDataviewActiveVersion",
}) as any as S.Schema<KxDataviewActiveVersion>;
export type KxDataviewActiveVersionList = KxDataviewActiveVersion[];
export const KxDataviewActiveVersionList = S.Array(KxDataviewActiveVersion);
export interface UpdateKxDataviewResponse {
  environmentId?: string;
  databaseName?: string;
  dataviewName?: string;
  azMode?: string;
  availabilityZoneId?: string;
  changesetId?: string;
  segmentConfigurations?: KxDataviewSegmentConfigurationList;
  activeVersions?: KxDataviewActiveVersionList;
  status?: string;
  autoUpdate?: boolean;
  readWrite?: boolean;
  description?: string;
  createdTimestamp?: Date;
  lastModifiedTimestamp?: Date;
}
export const UpdateKxDataviewResponse = S.suspend(() =>
  S.Struct({
    environmentId: S.optional(S.String),
    databaseName: S.optional(S.String),
    dataviewName: S.optional(S.String),
    azMode: S.optional(S.String),
    availabilityZoneId: S.optional(S.String),
    changesetId: S.optional(S.String),
    segmentConfigurations: S.optional(KxDataviewSegmentConfigurationList),
    activeVersions: S.optional(KxDataviewActiveVersionList),
    status: S.optional(S.String),
    autoUpdate: S.optional(S.Boolean),
    readWrite: S.optional(S.Boolean),
    description: S.optional(S.String),
    createdTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastModifiedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotations({
  identifier: "UpdateKxDataviewResponse",
}) as any as S.Schema<UpdateKxDataviewResponse>;
export interface UpdateKxEnvironmentResponse {
  name?: string;
  environmentId?: string;
  awsAccountId?: string;
  status?: string;
  tgwStatus?: string;
  dnsStatus?: string;
  errorMessage?: string;
  description?: string;
  environmentArn?: string;
  kmsKeyId?: string;
  dedicatedServiceAccountId?: string;
  transitGatewayConfiguration?: TransitGatewayConfiguration;
  customDNSConfiguration?: CustomDNSConfiguration;
  creationTimestamp?: Date;
  updateTimestamp?: Date;
  availabilityZoneIds?: AvailabilityZoneIds;
}
export const UpdateKxEnvironmentResponse = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    environmentId: S.optional(S.String),
    awsAccountId: S.optional(S.String),
    status: S.optional(S.String),
    tgwStatus: S.optional(S.String),
    dnsStatus: S.optional(S.String),
    errorMessage: S.optional(S.String),
    description: S.optional(S.String),
    environmentArn: S.optional(S.String),
    kmsKeyId: S.optional(S.String),
    dedicatedServiceAccountId: S.optional(S.String),
    transitGatewayConfiguration: S.optional(TransitGatewayConfiguration),
    customDNSConfiguration: S.optional(CustomDNSConfiguration),
    creationTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    updateTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    availabilityZoneIds: S.optional(AvailabilityZoneIds),
  }),
).annotations({
  identifier: "UpdateKxEnvironmentResponse",
}) as any as S.Schema<UpdateKxEnvironmentResponse>;
export interface UpdateKxUserResponse {
  userName?: string;
  userArn?: string;
  environmentId?: string;
  iamRole?: string;
}
export const UpdateKxUserResponse = S.suspend(() =>
  S.Struct({
    userName: S.optional(S.String),
    userArn: S.optional(S.String),
    environmentId: S.optional(S.String),
    iamRole: S.optional(S.String),
  }),
).annotations({
  identifier: "UpdateKxUserResponse",
}) as any as S.Schema<UpdateKxUserResponse>;
export interface KxAttachedCluster {
  clusterName?: string;
  clusterType?: string;
  clusterStatus?: string;
}
export const KxAttachedCluster = S.suspend(() =>
  S.Struct({
    clusterName: S.optional(S.String),
    clusterType: S.optional(S.String),
    clusterStatus: S.optional(S.String),
  }),
).annotations({
  identifier: "KxAttachedCluster",
}) as any as S.Schema<KxAttachedCluster>;
export type KxAttachedClusters = KxAttachedCluster[];
export const KxAttachedClusters = S.Array(KxAttachedCluster);
export interface UpdateKxVolumeResponse {
  environmentId?: string;
  volumeName?: string;
  volumeType?: string;
  volumeArn?: string;
  nas1Configuration?: KxNAS1Configuration;
  status?: string;
  description?: string;
  statusReason?: string;
  createdTimestamp?: Date;
  azMode?: string;
  availabilityZoneIds?: AvailabilityZoneIds;
  lastModifiedTimestamp?: Date;
  attachedClusters?: KxAttachedClusters;
}
export const UpdateKxVolumeResponse = S.suspend(() =>
  S.Struct({
    environmentId: S.optional(S.String),
    volumeName: S.optional(S.String),
    volumeType: S.optional(S.String),
    volumeArn: S.optional(S.String),
    nas1Configuration: S.optional(KxNAS1Configuration),
    status: S.optional(S.String),
    description: S.optional(S.String),
    statusReason: S.optional(S.String),
    createdTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    azMode: S.optional(S.String),
    availabilityZoneIds: S.optional(AvailabilityZoneIds),
    lastModifiedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    attachedClusters: S.optional(KxAttachedClusters),
  }),
).annotations({
  identifier: "UpdateKxVolumeResponse",
}) as any as S.Schema<UpdateKxVolumeResponse>;
export interface ErrorInfo {
  errorMessage?: string;
  errorType?: string;
}
export const ErrorInfo = S.suspend(() =>
  S.Struct({
    errorMessage: S.optional(S.String),
    errorType: S.optional(S.String),
  }),
).annotations({ identifier: "ErrorInfo" }) as any as S.Schema<ErrorInfo>;
export interface Volume {
  volumeName?: string;
  volumeType?: string;
}
export const Volume = S.suspend(() =>
  S.Struct({
    volumeName: S.optional(S.String),
    volumeType: S.optional(S.String),
  }),
).annotations({ identifier: "Volume" }) as any as S.Schema<Volume>;
export type Volumes = Volume[];
export const Volumes = S.Array(Volume);
export interface KxChangesetListEntry {
  changesetId?: string;
  createdTimestamp?: Date;
  activeFromTimestamp?: Date;
  lastModifiedTimestamp?: Date;
  status?: string;
}
export const KxChangesetListEntry = S.suspend(() =>
  S.Struct({
    changesetId: S.optional(S.String),
    createdTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    activeFromTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastModifiedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    status: S.optional(S.String),
  }),
).annotations({
  identifier: "KxChangesetListEntry",
}) as any as S.Schema<KxChangesetListEntry>;
export type KxChangesets = KxChangesetListEntry[];
export const KxChangesets = S.Array(KxChangesetListEntry);
export interface KxNode {
  nodeId?: string;
  availabilityZoneId?: string;
  launchTime?: Date;
  status?: string;
}
export const KxNode = S.suspend(() =>
  S.Struct({
    nodeId: S.optional(S.String),
    availabilityZoneId: S.optional(S.String),
    launchTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    status: S.optional(S.String),
  }),
).annotations({ identifier: "KxNode" }) as any as S.Schema<KxNode>;
export type KxNodeSummaries = KxNode[];
export const KxNodeSummaries = S.Array(KxNode);
export interface KxCluster {
  status?: string;
  statusReason?: string;
  clusterName?: string;
  clusterType?: string;
  clusterDescription?: string;
  releaseLabel?: string;
  volumes?: Volumes;
  initializationScript?: string;
  executionRole?: string;
  azMode?: string;
  availabilityZoneId?: string;
  lastModifiedTimestamp?: Date;
  createdTimestamp?: Date;
}
export const KxCluster = S.suspend(() =>
  S.Struct({
    status: S.optional(S.String),
    statusReason: S.optional(S.String),
    clusterName: S.optional(S.String),
    clusterType: S.optional(S.String),
    clusterDescription: S.optional(S.String),
    releaseLabel: S.optional(S.String),
    volumes: S.optional(Volumes),
    initializationScript: S.optional(S.String),
    executionRole: S.optional(S.String),
    azMode: S.optional(S.String),
    availabilityZoneId: S.optional(S.String),
    lastModifiedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    createdTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotations({ identifier: "KxCluster" }) as any as S.Schema<KxCluster>;
export type KxClusters = KxCluster[];
export const KxClusters = S.Array(KxCluster);
export interface KxDatabaseListEntry {
  databaseName?: string;
  createdTimestamp?: Date;
  lastModifiedTimestamp?: Date;
}
export const KxDatabaseListEntry = S.suspend(() =>
  S.Struct({
    databaseName: S.optional(S.String),
    createdTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastModifiedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotations({
  identifier: "KxDatabaseListEntry",
}) as any as S.Schema<KxDatabaseListEntry>;
export type KxDatabases = KxDatabaseListEntry[];
export const KxDatabases = S.Array(KxDatabaseListEntry);
export interface KxDataviewListEntry {
  environmentId?: string;
  databaseName?: string;
  dataviewName?: string;
  azMode?: string;
  availabilityZoneId?: string;
  changesetId?: string;
  segmentConfigurations?: KxDataviewSegmentConfigurationList;
  activeVersions?: KxDataviewActiveVersionList;
  status?: string;
  description?: string;
  autoUpdate?: boolean;
  readWrite?: boolean;
  createdTimestamp?: Date;
  lastModifiedTimestamp?: Date;
  statusReason?: string;
}
export const KxDataviewListEntry = S.suspend(() =>
  S.Struct({
    environmentId: S.optional(S.String),
    databaseName: S.optional(S.String),
    dataviewName: S.optional(S.String),
    azMode: S.optional(S.String),
    availabilityZoneId: S.optional(S.String),
    changesetId: S.optional(S.String),
    segmentConfigurations: S.optional(KxDataviewSegmentConfigurationList),
    activeVersions: S.optional(KxDataviewActiveVersionList),
    status: S.optional(S.String),
    description: S.optional(S.String),
    autoUpdate: S.optional(S.Boolean),
    readWrite: S.optional(S.Boolean),
    createdTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastModifiedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    statusReason: S.optional(S.String),
  }),
).annotations({
  identifier: "KxDataviewListEntry",
}) as any as S.Schema<KxDataviewListEntry>;
export type KxDataviews = KxDataviewListEntry[];
export const KxDataviews = S.Array(KxDataviewListEntry);
export interface KxEnvironment {
  name?: string;
  environmentId?: string;
  awsAccountId?: string;
  status?: string;
  tgwStatus?: string;
  dnsStatus?: string;
  errorMessage?: string;
  description?: string;
  environmentArn?: string;
  kmsKeyId?: string;
  dedicatedServiceAccountId?: string;
  transitGatewayConfiguration?: TransitGatewayConfiguration;
  customDNSConfiguration?: CustomDNSConfiguration;
  creationTimestamp?: Date;
  updateTimestamp?: Date;
  availabilityZoneIds?: AvailabilityZoneIds;
  certificateAuthorityArn?: string;
}
export const KxEnvironment = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    environmentId: S.optional(S.String),
    awsAccountId: S.optional(S.String),
    status: S.optional(S.String),
    tgwStatus: S.optional(S.String),
    dnsStatus: S.optional(S.String),
    errorMessage: S.optional(S.String),
    description: S.optional(S.String),
    environmentArn: S.optional(S.String),
    kmsKeyId: S.optional(S.String),
    dedicatedServiceAccountId: S.optional(S.String),
    transitGatewayConfiguration: S.optional(TransitGatewayConfiguration),
    customDNSConfiguration: S.optional(CustomDNSConfiguration),
    creationTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    updateTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    availabilityZoneIds: S.optional(AvailabilityZoneIds),
    certificateAuthorityArn: S.optional(S.String),
  }),
).annotations({
  identifier: "KxEnvironment",
}) as any as S.Schema<KxEnvironment>;
export type KxEnvironmentList = KxEnvironment[];
export const KxEnvironmentList = S.Array(KxEnvironment);
export interface KxScalingGroup {
  scalingGroupName?: string;
  hostType?: string;
  clusters?: KxClusterNameList;
  availabilityZoneId?: string;
  status?: string;
  statusReason?: string;
  lastModifiedTimestamp?: Date;
  createdTimestamp?: Date;
}
export const KxScalingGroup = S.suspend(() =>
  S.Struct({
    scalingGroupName: S.optional(S.String),
    hostType: S.optional(S.String),
    clusters: S.optional(KxClusterNameList),
    availabilityZoneId: S.optional(S.String),
    status: S.optional(S.String),
    statusReason: S.optional(S.String),
    lastModifiedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    createdTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotations({
  identifier: "KxScalingGroup",
}) as any as S.Schema<KxScalingGroup>;
export type KxScalingGroupList = KxScalingGroup[];
export const KxScalingGroupList = S.Array(KxScalingGroup);
export interface KxUser {
  userArn?: string;
  userName?: string;
  iamRole?: string;
  createTimestamp?: Date;
  updateTimestamp?: Date;
}
export const KxUser = S.suspend(() =>
  S.Struct({
    userArn: S.optional(S.String),
    userName: S.optional(S.String),
    iamRole: S.optional(S.String),
    createTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    updateTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotations({ identifier: "KxUser" }) as any as S.Schema<KxUser>;
export type KxUserList = KxUser[];
export const KxUserList = S.Array(KxUser);
export interface KxVolume {
  volumeName?: string;
  volumeType?: string;
  status?: string;
  description?: string;
  statusReason?: string;
  azMode?: string;
  availabilityZoneIds?: AvailabilityZoneIds;
  createdTimestamp?: Date;
  lastModifiedTimestamp?: Date;
}
export const KxVolume = S.suspend(() =>
  S.Struct({
    volumeName: S.optional(S.String),
    volumeType: S.optional(S.String),
    status: S.optional(S.String),
    description: S.optional(S.String),
    statusReason: S.optional(S.String),
    azMode: S.optional(S.String),
    availabilityZoneIds: S.optional(AvailabilityZoneIds),
    createdTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastModifiedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotations({ identifier: "KxVolume" }) as any as S.Schema<KxVolume>;
export type KxVolumes = KxVolume[];
export const KxVolumes = S.Array(KxVolume);
export interface CreateEnvironmentRequest {
  name: string;
  description?: string;
  kmsKeyId?: string;
  tags?: TagMap;
  federationMode?: string;
  federationParameters?: FederationParameters;
  superuserParameters?: SuperuserParameters;
  dataBundles?: DataBundleArns;
}
export const CreateEnvironmentRequest = S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    kmsKeyId: S.optional(S.String),
    tags: S.optional(TagMap),
    federationMode: S.optional(S.String),
    federationParameters: S.optional(FederationParameters),
    superuserParameters: S.optional(SuperuserParameters),
    dataBundles: S.optional(DataBundleArns),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/environment" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "CreateEnvironmentRequest",
}) as any as S.Schema<CreateEnvironmentRequest>;
export interface CreateKxChangesetResponse {
  changesetId?: string;
  databaseName?: string;
  environmentId?: string;
  changeRequests?: ChangeRequests;
  createdTimestamp?: Date;
  lastModifiedTimestamp?: Date;
  status?: string;
  errorInfo?: ErrorInfo;
}
export const CreateKxChangesetResponse = S.suspend(() =>
  S.Struct({
    changesetId: S.optional(S.String),
    databaseName: S.optional(S.String),
    environmentId: S.optional(S.String),
    changeRequests: S.optional(ChangeRequests),
    createdTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastModifiedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    status: S.optional(S.String),
    errorInfo: S.optional(ErrorInfo),
  }),
).annotations({
  identifier: "CreateKxChangesetResponse",
}) as any as S.Schema<CreateKxChangesetResponse>;
export interface CreateKxClusterRequest {
  clientToken?: string;
  environmentId: string;
  clusterName: string;
  clusterType: string;
  tickerplantLogConfiguration?: TickerplantLogConfiguration;
  databases?: KxDatabaseConfigurations;
  cacheStorageConfigurations?: KxCacheStorageConfigurations;
  autoScalingConfiguration?: AutoScalingConfiguration;
  clusterDescription?: string;
  capacityConfiguration?: CapacityConfiguration;
  releaseLabel: string;
  vpcConfiguration: VpcConfiguration;
  initializationScript?: string;
  commandLineArguments?: KxCommandLineArguments;
  code?: CodeConfiguration;
  executionRole?: string;
  savedownStorageConfiguration?: KxSavedownStorageConfiguration;
  azMode: string;
  availabilityZoneId?: string;
  tags?: TagMap;
  scalingGroupConfiguration?: KxScalingGroupConfiguration;
}
export const CreateKxClusterRequest = S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String),
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    clusterName: S.String,
    clusterType: S.String,
    tickerplantLogConfiguration: S.optional(TickerplantLogConfiguration),
    databases: S.optional(KxDatabaseConfigurations),
    cacheStorageConfigurations: S.optional(KxCacheStorageConfigurations),
    autoScalingConfiguration: S.optional(AutoScalingConfiguration),
    clusterDescription: S.optional(S.String),
    capacityConfiguration: S.optional(CapacityConfiguration),
    releaseLabel: S.String,
    vpcConfiguration: VpcConfiguration,
    initializationScript: S.optional(S.String),
    commandLineArguments: S.optional(KxCommandLineArguments),
    code: S.optional(CodeConfiguration),
    executionRole: S.optional(S.String),
    savedownStorageConfiguration: S.optional(KxSavedownStorageConfiguration),
    azMode: S.String,
    availabilityZoneId: S.optional(S.String),
    tags: S.optional(TagMap),
    scalingGroupConfiguration: S.optional(KxScalingGroupConfiguration),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/kx/environments/{environmentId}/clusters",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "CreateKxClusterRequest",
}) as any as S.Schema<CreateKxClusterRequest>;
export interface CreateKxDataviewResponse {
  dataviewName?: string;
  databaseName?: string;
  environmentId?: string;
  azMode?: string;
  availabilityZoneId?: string;
  changesetId?: string;
  segmentConfigurations?: KxDataviewSegmentConfigurationList;
  description?: string;
  autoUpdate?: boolean;
  readWrite?: boolean;
  createdTimestamp?: Date;
  lastModifiedTimestamp?: Date;
  status?: string;
}
export const CreateKxDataviewResponse = S.suspend(() =>
  S.Struct({
    dataviewName: S.optional(S.String),
    databaseName: S.optional(S.String),
    environmentId: S.optional(S.String),
    azMode: S.optional(S.String),
    availabilityZoneId: S.optional(S.String),
    changesetId: S.optional(S.String),
    segmentConfigurations: S.optional(KxDataviewSegmentConfigurationList),
    description: S.optional(S.String),
    autoUpdate: S.optional(S.Boolean),
    readWrite: S.optional(S.Boolean),
    createdTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastModifiedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    status: S.optional(S.String),
  }),
).annotations({
  identifier: "CreateKxDataviewResponse",
}) as any as S.Schema<CreateKxDataviewResponse>;
export interface CreateKxVolumeResponse {
  environmentId?: string;
  volumeName?: string;
  volumeType?: string;
  volumeArn?: string;
  nas1Configuration?: KxNAS1Configuration;
  status?: string;
  statusReason?: string;
  azMode?: string;
  description?: string;
  availabilityZoneIds?: AvailabilityZoneIds;
  createdTimestamp?: Date;
}
export const CreateKxVolumeResponse = S.suspend(() =>
  S.Struct({
    environmentId: S.optional(S.String),
    volumeName: S.optional(S.String),
    volumeType: S.optional(S.String),
    volumeArn: S.optional(S.String),
    nas1Configuration: S.optional(KxNAS1Configuration),
    status: S.optional(S.String),
    statusReason: S.optional(S.String),
    azMode: S.optional(S.String),
    description: S.optional(S.String),
    availabilityZoneIds: S.optional(AvailabilityZoneIds),
    createdTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotations({
  identifier: "CreateKxVolumeResponse",
}) as any as S.Schema<CreateKxVolumeResponse>;
export interface GetEnvironmentResponse {
  environment?: Environment;
}
export const GetEnvironmentResponse = S.suspend(() =>
  S.Struct({ environment: S.optional(Environment) }),
).annotations({
  identifier: "GetEnvironmentResponse",
}) as any as S.Schema<GetEnvironmentResponse>;
export interface GetKxChangesetResponse {
  changesetId?: string;
  databaseName?: string;
  environmentId?: string;
  changeRequests?: ChangeRequests;
  createdTimestamp?: Date;
  activeFromTimestamp?: Date;
  lastModifiedTimestamp?: Date;
  status?: string;
  errorInfo?: ErrorInfo;
}
export const GetKxChangesetResponse = S.suspend(() =>
  S.Struct({
    changesetId: S.optional(S.String),
    databaseName: S.optional(S.String),
    environmentId: S.optional(S.String),
    changeRequests: S.optional(ChangeRequests),
    createdTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    activeFromTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastModifiedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    status: S.optional(S.String),
    errorInfo: S.optional(ErrorInfo),
  }),
).annotations({
  identifier: "GetKxChangesetResponse",
}) as any as S.Schema<GetKxChangesetResponse>;
export interface GetKxClusterResponse {
  status?: string;
  statusReason?: string;
  clusterName?: string;
  clusterType?: string;
  tickerplantLogConfiguration?: TickerplantLogConfiguration;
  volumes?: Volumes;
  databases?: KxDatabaseConfigurations;
  cacheStorageConfigurations?: KxCacheStorageConfigurations;
  autoScalingConfiguration?: AutoScalingConfiguration;
  clusterDescription?: string;
  capacityConfiguration?: CapacityConfiguration;
  releaseLabel?: string;
  vpcConfiguration?: VpcConfiguration;
  initializationScript?: string;
  commandLineArguments?: KxCommandLineArguments;
  code?: CodeConfiguration;
  executionRole?: string;
  lastModifiedTimestamp?: Date;
  savedownStorageConfiguration?: KxSavedownStorageConfiguration;
  azMode?: string;
  availabilityZoneId?: string;
  createdTimestamp?: Date;
  scalingGroupConfiguration?: KxScalingGroupConfiguration;
}
export const GetKxClusterResponse = S.suspend(() =>
  S.Struct({
    status: S.optional(S.String),
    statusReason: S.optional(S.String),
    clusterName: S.optional(S.String),
    clusterType: S.optional(S.String),
    tickerplantLogConfiguration: S.optional(TickerplantLogConfiguration),
    volumes: S.optional(Volumes),
    databases: S.optional(KxDatabaseConfigurations),
    cacheStorageConfigurations: S.optional(KxCacheStorageConfigurations),
    autoScalingConfiguration: S.optional(AutoScalingConfiguration),
    clusterDescription: S.optional(S.String),
    capacityConfiguration: S.optional(CapacityConfiguration),
    releaseLabel: S.optional(S.String),
    vpcConfiguration: S.optional(VpcConfiguration),
    initializationScript: S.optional(S.String),
    commandLineArguments: S.optional(KxCommandLineArguments),
    code: S.optional(CodeConfiguration),
    executionRole: S.optional(S.String),
    lastModifiedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    savedownStorageConfiguration: S.optional(KxSavedownStorageConfiguration),
    azMode: S.optional(S.String),
    availabilityZoneId: S.optional(S.String),
    createdTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    scalingGroupConfiguration: S.optional(KxScalingGroupConfiguration),
  }),
).annotations({
  identifier: "GetKxClusterResponse",
}) as any as S.Schema<GetKxClusterResponse>;
export interface GetKxDataviewResponse {
  databaseName?: string;
  dataviewName?: string;
  azMode?: string;
  availabilityZoneId?: string;
  changesetId?: string;
  segmentConfigurations?: KxDataviewSegmentConfigurationList;
  activeVersions?: KxDataviewActiveVersionList;
  description?: string;
  autoUpdate?: boolean;
  readWrite?: boolean;
  environmentId?: string;
  createdTimestamp?: Date;
  lastModifiedTimestamp?: Date;
  status?: string;
  statusReason?: string;
}
export const GetKxDataviewResponse = S.suspend(() =>
  S.Struct({
    databaseName: S.optional(S.String),
    dataviewName: S.optional(S.String),
    azMode: S.optional(S.String),
    availabilityZoneId: S.optional(S.String),
    changesetId: S.optional(S.String),
    segmentConfigurations: S.optional(KxDataviewSegmentConfigurationList),
    activeVersions: S.optional(KxDataviewActiveVersionList),
    description: S.optional(S.String),
    autoUpdate: S.optional(S.Boolean),
    readWrite: S.optional(S.Boolean),
    environmentId: S.optional(S.String),
    createdTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastModifiedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    status: S.optional(S.String),
    statusReason: S.optional(S.String),
  }),
).annotations({
  identifier: "GetKxDataviewResponse",
}) as any as S.Schema<GetKxDataviewResponse>;
export interface GetKxVolumeResponse {
  environmentId?: string;
  volumeName?: string;
  volumeType?: string;
  volumeArn?: string;
  nas1Configuration?: KxNAS1Configuration;
  status?: string;
  statusReason?: string;
  createdTimestamp?: Date;
  description?: string;
  azMode?: string;
  availabilityZoneIds?: AvailabilityZoneIds;
  lastModifiedTimestamp?: Date;
  attachedClusters?: KxAttachedClusters;
}
export const GetKxVolumeResponse = S.suspend(() =>
  S.Struct({
    environmentId: S.optional(S.String),
    volumeName: S.optional(S.String),
    volumeType: S.optional(S.String),
    volumeArn: S.optional(S.String),
    nas1Configuration: S.optional(KxNAS1Configuration),
    status: S.optional(S.String),
    statusReason: S.optional(S.String),
    createdTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    description: S.optional(S.String),
    azMode: S.optional(S.String),
    availabilityZoneIds: S.optional(AvailabilityZoneIds),
    lastModifiedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    attachedClusters: S.optional(KxAttachedClusters),
  }),
).annotations({
  identifier: "GetKxVolumeResponse",
}) as any as S.Schema<GetKxVolumeResponse>;
export interface ListKxChangesetsResponse {
  kxChangesets?: KxChangesets;
  nextToken?: string;
}
export const ListKxChangesetsResponse = S.suspend(() =>
  S.Struct({
    kxChangesets: S.optional(KxChangesets),
    nextToken: S.optional(S.String),
  }),
).annotations({
  identifier: "ListKxChangesetsResponse",
}) as any as S.Schema<ListKxChangesetsResponse>;
export interface ListKxClusterNodesResponse {
  nodes?: KxNodeSummaries;
  nextToken?: string;
}
export const ListKxClusterNodesResponse = S.suspend(() =>
  S.Struct({
    nodes: S.optional(KxNodeSummaries),
    nextToken: S.optional(S.String),
  }),
).annotations({
  identifier: "ListKxClusterNodesResponse",
}) as any as S.Schema<ListKxClusterNodesResponse>;
export interface ListKxClustersResponse {
  kxClusterSummaries?: KxClusters;
  nextToken?: string;
}
export const ListKxClustersResponse = S.suspend(() =>
  S.Struct({
    kxClusterSummaries: S.optional(KxClusters),
    nextToken: S.optional(S.String),
  }),
).annotations({
  identifier: "ListKxClustersResponse",
}) as any as S.Schema<ListKxClustersResponse>;
export interface ListKxDatabasesResponse {
  kxDatabases?: KxDatabases;
  nextToken?: string;
}
export const ListKxDatabasesResponse = S.suspend(() =>
  S.Struct({
    kxDatabases: S.optional(KxDatabases),
    nextToken: S.optional(S.String),
  }),
).annotations({
  identifier: "ListKxDatabasesResponse",
}) as any as S.Schema<ListKxDatabasesResponse>;
export interface ListKxDataviewsResponse {
  kxDataviews?: KxDataviews;
  nextToken?: string;
}
export const ListKxDataviewsResponse = S.suspend(() =>
  S.Struct({
    kxDataviews: S.optional(KxDataviews),
    nextToken: S.optional(S.String),
  }),
).annotations({
  identifier: "ListKxDataviewsResponse",
}) as any as S.Schema<ListKxDataviewsResponse>;
export interface ListKxEnvironmentsResponse {
  environments?: KxEnvironmentList;
  nextToken?: string;
}
export const ListKxEnvironmentsResponse = S.suspend(() =>
  S.Struct({
    environments: S.optional(KxEnvironmentList),
    nextToken: S.optional(S.String),
  }),
).annotations({
  identifier: "ListKxEnvironmentsResponse",
}) as any as S.Schema<ListKxEnvironmentsResponse>;
export interface ListKxScalingGroupsResponse {
  scalingGroups?: KxScalingGroupList;
  nextToken?: string;
}
export const ListKxScalingGroupsResponse = S.suspend(() =>
  S.Struct({
    scalingGroups: S.optional(KxScalingGroupList),
    nextToken: S.optional(S.String),
  }),
).annotations({
  identifier: "ListKxScalingGroupsResponse",
}) as any as S.Schema<ListKxScalingGroupsResponse>;
export interface ListKxUsersResponse {
  users?: KxUserList;
  nextToken?: string;
}
export const ListKxUsersResponse = S.suspend(() =>
  S.Struct({ users: S.optional(KxUserList), nextToken: S.optional(S.String) }),
).annotations({
  identifier: "ListKxUsersResponse",
}) as any as S.Schema<ListKxUsersResponse>;
export interface ListKxVolumesResponse {
  kxVolumeSummaries?: KxVolumes;
  nextToken?: string;
}
export const ListKxVolumesResponse = S.suspend(() =>
  S.Struct({
    kxVolumeSummaries: S.optional(KxVolumes),
    nextToken: S.optional(S.String),
  }),
).annotations({
  identifier: "ListKxVolumesResponse",
}) as any as S.Schema<ListKxVolumesResponse>;
export interface CreateEnvironmentResponse {
  environmentId?: string;
  environmentArn?: string;
  environmentUrl?: string;
}
export const CreateEnvironmentResponse = S.suspend(() =>
  S.Struct({
    environmentId: S.optional(S.String),
    environmentArn: S.optional(S.String),
    environmentUrl: S.optional(S.String),
  }),
).annotations({
  identifier: "CreateEnvironmentResponse",
}) as any as S.Schema<CreateEnvironmentResponse>;
export interface CreateKxClusterResponse {
  environmentId?: string;
  status?: string;
  statusReason?: string;
  clusterName?: string;
  clusterType?: string;
  tickerplantLogConfiguration?: TickerplantLogConfiguration;
  volumes?: Volumes;
  databases?: KxDatabaseConfigurations;
  cacheStorageConfigurations?: KxCacheStorageConfigurations;
  autoScalingConfiguration?: AutoScalingConfiguration;
  clusterDescription?: string;
  capacityConfiguration?: CapacityConfiguration;
  releaseLabel?: string;
  vpcConfiguration?: VpcConfiguration;
  initializationScript?: string;
  commandLineArguments?: KxCommandLineArguments;
  code?: CodeConfiguration;
  executionRole?: string;
  lastModifiedTimestamp?: Date;
  savedownStorageConfiguration?: KxSavedownStorageConfiguration;
  azMode?: string;
  availabilityZoneId?: string;
  createdTimestamp?: Date;
  scalingGroupConfiguration?: KxScalingGroupConfiguration;
}
export const CreateKxClusterResponse = S.suspend(() =>
  S.Struct({
    environmentId: S.optional(S.String),
    status: S.optional(S.String),
    statusReason: S.optional(S.String),
    clusterName: S.optional(S.String),
    clusterType: S.optional(S.String),
    tickerplantLogConfiguration: S.optional(TickerplantLogConfiguration),
    volumes: S.optional(Volumes),
    databases: S.optional(KxDatabaseConfigurations),
    cacheStorageConfigurations: S.optional(KxCacheStorageConfigurations),
    autoScalingConfiguration: S.optional(AutoScalingConfiguration),
    clusterDescription: S.optional(S.String),
    capacityConfiguration: S.optional(CapacityConfiguration),
    releaseLabel: S.optional(S.String),
    vpcConfiguration: S.optional(VpcConfiguration),
    initializationScript: S.optional(S.String),
    commandLineArguments: S.optional(KxCommandLineArguments),
    code: S.optional(CodeConfiguration),
    executionRole: S.optional(S.String),
    lastModifiedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    savedownStorageConfiguration: S.optional(KxSavedownStorageConfiguration),
    azMode: S.optional(S.String),
    availabilityZoneId: S.optional(S.String),
    createdTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    scalingGroupConfiguration: S.optional(KxScalingGroupConfiguration),
  }),
).annotations({
  identifier: "CreateKxClusterResponse",
}) as any as S.Schema<CreateKxClusterResponse>;
export interface UpdateKxEnvironmentNetworkRequest {
  environmentId: string;
  transitGatewayConfiguration?: TransitGatewayConfiguration;
  customDNSConfiguration?: CustomDNSConfiguration;
  clientToken?: string;
}
export const UpdateKxEnvironmentNetworkRequest = S.suspend(() =>
  S.Struct({
    environmentId: S.String.pipe(T.HttpLabel("environmentId")),
    transitGatewayConfiguration: S.optional(TransitGatewayConfiguration),
    customDNSConfiguration: S.optional(CustomDNSConfiguration),
    clientToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/kx/environments/{environmentId}/network",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "UpdateKxEnvironmentNetworkRequest",
}) as any as S.Schema<UpdateKxEnvironmentNetworkRequest>;
export interface UpdateKxEnvironmentNetworkResponse {
  name?: string;
  environmentId?: string;
  awsAccountId?: string;
  status?: string;
  tgwStatus?: string;
  dnsStatus?: string;
  errorMessage?: string;
  description?: string;
  environmentArn?: string;
  kmsKeyId?: string;
  dedicatedServiceAccountId?: string;
  transitGatewayConfiguration?: TransitGatewayConfiguration;
  customDNSConfiguration?: CustomDNSConfiguration;
  creationTimestamp?: Date;
  updateTimestamp?: Date;
  availabilityZoneIds?: AvailabilityZoneIds;
}
export const UpdateKxEnvironmentNetworkResponse = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    environmentId: S.optional(S.String),
    awsAccountId: S.optional(S.String),
    status: S.optional(S.String),
    tgwStatus: S.optional(S.String),
    dnsStatus: S.optional(S.String),
    errorMessage: S.optional(S.String),
    description: S.optional(S.String),
    environmentArn: S.optional(S.String),
    kmsKeyId: S.optional(S.String),
    dedicatedServiceAccountId: S.optional(S.String),
    transitGatewayConfiguration: S.optional(TransitGatewayConfiguration),
    customDNSConfiguration: S.optional(CustomDNSConfiguration),
    creationTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    updateTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    availabilityZoneIds: S.optional(AvailabilityZoneIds),
  }),
).annotations({
  identifier: "UpdateKxEnvironmentNetworkResponse",
}) as any as S.Schema<UpdateKxEnvironmentNetworkResponse>;

//# Errors
export class AccessDeniedException extends S.TaggedError<AccessDeniedException>()(
  "AccessDeniedException",
  { message: S.optional(S.String) },
) {}
export class InternalServerException extends S.TaggedError<InternalServerException>()(
  "InternalServerException",
  { message: S.optional(S.String) },
).pipe(withCategory(ERROR_CATEGORIES.SERVER_ERROR)) {}
export class ConflictException extends S.TaggedError<ConflictException>()(
  "ConflictException",
  { message: S.optional(S.String), reason: S.optional(S.String) },
) {}
export class InvalidRequestException extends S.TaggedError<InvalidRequestException>()(
  "InvalidRequestException",
  { message: S.optional(S.String) },
) {}
export class ResourceNotFoundException extends S.TaggedError<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { message: S.optional(S.String) },
) {}
export class ValidationException extends S.TaggedError<ValidationException>()(
  "ValidationException",
  { message: S.optional(S.String) },
) {}
export class LimitExceededException extends S.TaggedError<LimitExceededException>()(
  "LimitExceededException",
  { message: S.optional(S.String) },
) {}
export class ThrottlingException extends S.TaggedError<ThrottlingException>()(
  "ThrottlingException",
  { message: S.optional(S.String) },
).pipe(withCategory(ERROR_CATEGORIES.THROTTLING_ERROR)) {}
export class ResourceAlreadyExistsException extends S.TaggedError<ResourceAlreadyExistsException>()(
  "ResourceAlreadyExistsException",
  { message: S.optional(S.String) },
) {}
export class ServiceQuotaExceededException extends S.TaggedError<ServiceQuotaExceededException>()(
  "ServiceQuotaExceededException",
  { message: S.optional(S.String) },
) {}

//# Operations
/**
 * A list of all of your FinSpace environments.
 */
export const listEnvironments = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListEnvironmentsRequest,
  output: ListEnvironmentsResponse,
  errors: [AccessDeniedException, InternalServerException, ValidationException],
}));
/**
 * Removes metadata tags from a FinSpace resource.
 */
export const untagResource = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
}));
/**
 * A list of all tags for a resource.
 */
export const listTagsForResource = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
}));
/**
 * Returns the FinSpace environment object.
 */
export const getEnvironment = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetEnvironmentRequest,
  output: GetEnvironmentResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
/**
 * Retrieves all the information for the specified kdb environment.
 */
export const getKxEnvironment = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetKxEnvironmentRequest,
  output: GetKxEnvironmentResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
/**
 * Adds metadata tags to a FinSpace resource.
 */
export const tagResource = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
}));
/**
 * Returns a list of kdb environments created in an account.
 */
export const listKxEnvironments = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(
  () => ({
    input: ListKxEnvironmentsRequest,
    output: ListKxEnvironmentsResponse,
    errors: [
      AccessDeniedException,
      InternalServerException,
      ValidationException,
    ],
    pagination: {
      inputToken: "nextToken",
      outputToken: "nextToken",
      items: "environments",
      pageSize: "maxResults",
    } as const,
  }),
);
/**
 * Update your FinSpace environment.
 */
export const updateEnvironment = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateEnvironmentRequest,
  output: UpdateEnvironmentResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates the specified dataview. The dataviews get automatically updated when any new changesets are ingested. Each update of the dataview creates a new version, including changeset details and cache configurations
 */
export const updateKxDataview = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateKxDataviewRequest,
  output: UpdateKxDataviewResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Lists all the nodes in a kdb cluster.
 */
export const listKxClusterNodes = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(
  () => ({
    input: ListKxClusterNodesRequest,
    output: ListKxClusterNodesResponse,
    errors: [
      AccessDeniedException,
      InternalServerException,
      LimitExceededException,
      ResourceNotFoundException,
      ThrottlingException,
      ValidationException,
    ],
    pagination: {
      inputToken: "nextToken",
      outputToken: "nextToken",
      pageSize: "maxResults",
    } as const,
  }),
);
/**
 * Returns a list of clusters.
 */
export const listKxClusters = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListKxClustersRequest,
  output: ListKxClustersResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Returns a list of scaling groups in a kdb environment.
 */
export const listKxScalingGroups =
  /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
    input: ListKxScalingGroupsRequest,
    output: ListKxScalingGroupsResponse,
    errors: [
      AccessDeniedException,
      ConflictException,
      InternalServerException,
      LimitExceededException,
      ResourceNotFoundException,
      ThrottlingException,
      ValidationException,
    ],
    pagination: {
      inputToken: "nextToken",
      outputToken: "nextToken",
      pageSize: "maxResults",
    } as const,
  }));
/**
 * Lists all the volumes in a kdb environment.
 */
export const listKxVolumes = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListKxVolumesRequest,
  output: ListKxVolumesResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves details of a scaling group.
 */
export const getKxScalingGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetKxScalingGroupRequest,
  output: GetKxScalingGroupResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Allows you to update code configuration on a running cluster. By using this API you can update the code, the initialization script path, and the command line arguments for a specific cluster.
 * The configuration that you want to update will override any existing configurations on the cluster.
 */
export const updateKxClusterCodeConfiguration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    input: UpdateKxClusterCodeConfigurationRequest,
    output: UpdateKxClusterCodeConfigurationResponse,
    errors: [
      AccessDeniedException,
      ConflictException,
      InternalServerException,
      LimitExceededException,
      ResourceNotFoundException,
      ThrottlingException,
      ValidationException,
    ],
  }));
/**
 * Updates the databases mounted on a kdb cluster, which includes the `changesetId` and all the dbPaths to be cached. This API does not allow you to change a database name or add a database if you created a cluster without one.
 *
 * Using this API you can point a cluster to a different changeset and modify a list of partitions being cached.
 */
export const updateKxClusterDatabases = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    input: UpdateKxClusterDatabasesRequest,
    output: UpdateKxClusterDatabasesResponse,
    errors: [
      AccessDeniedException,
      ConflictException,
      InternalServerException,
      LimitExceededException,
      ResourceNotFoundException,
      ThrottlingException,
      ValidationException,
    ],
  }),
);
/**
 * Updates the user details. You can only update the IAM role associated with a user.
 */
export const updateKxUser = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateKxUserRequest,
  output: UpdateKxUserResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates the throughput or capacity of a volume. During the update process, the filesystem
 * might be unavailable for a few minutes. You can retry any operations after the update is complete.
 */
export const updateKxVolume = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateKxVolumeRequest,
  output: UpdateKxVolumeResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes a kdb cluster.
 */
export const deleteKxCluster = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteKxClusterRequest,
  output: DeleteKxClusterResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes the specified scaling group. This action is irreversible. You cannot delete a scaling group until all the clusters running on it have been deleted.
 */
export const deleteKxScalingGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    input: DeleteKxScalingGroupRequest,
    output: DeleteKxScalingGroupResponse,
    errors: [
      AccessDeniedException,
      ConflictException,
      InternalServerException,
      LimitExceededException,
      ResourceNotFoundException,
      ThrottlingException,
      ValidationException,
    ],
  }),
);
/**
 * Deletes a volume. You can only delete a volume if it's not attached to a cluster or a dataview. When a volume is deleted, any data on the volume is lost. This action is irreversible.
 */
export const deleteKxVolume = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteKxVolumeRequest,
  output: DeleteKxVolumeResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates a new kdb database in the environment.
 */
export const createKxDatabase = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateKxDatabaseRequest,
  output: CreateKxDatabaseResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates a new scaling group.
 */
export const createKxScalingGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    input: CreateKxScalingGroupRequest,
    output: CreateKxScalingGroupResponse,
    errors: [
      AccessDeniedException,
      ConflictException,
      InternalServerException,
      LimitExceededException,
      ResourceNotFoundException,
      ThrottlingException,
      ValidationException,
    ],
  }),
);
/**
 * Creates a user in FinSpace kdb environment with an associated IAM role.
 */
export const createKxUser = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateKxUserRequest,
  output: CreateKxUserResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates a changeset for a kdb database. A changeset allows you to add and delete existing files by using an ordered list of change requests.
 */
export const createKxChangeset = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateKxChangesetRequest,
  output: CreateKxChangesetResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates a snapshot of kdb database with tiered storage capabilities and a pre-warmed cache, ready for mounting on kdb clusters. Dataviews are only available for clusters running on a scaling group. They are not supported on dedicated clusters.
 */
export const createKxDataview = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateKxDataviewRequest,
  output: CreateKxDataviewResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates a new volume with a specific amount of throughput and storage capacity.
 */
export const createKxVolume = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateKxVolumeRequest,
  output: CreateKxVolumeResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves information about a kdb cluster.
 */
export const getKxCluster = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetKxClusterRequest,
  output: GetKxClusterResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates a new kdb cluster.
 */
export const createKxCluster = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateKxClusterRequest,
  output: CreateKxClusterResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates information for the given kdb database.
 */
export const updateKxDatabase = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateKxDatabaseRequest,
  output: UpdateKxDatabaseResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates information for the given kdb environment.
 */
export const updateKxEnvironment = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateKxEnvironmentRequest,
  output: UpdateKxEnvironmentResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes the specified database and all of its associated data. This action is irreversible. You must copy any data out of the database before deleting it if the data is to be retained.
 */
export const deleteKxDatabase = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteKxDatabaseRequest,
  output: DeleteKxDatabaseResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes the specified dataview. Before deleting a dataview, make sure that it is not in use by any cluster.
 */
export const deleteKxDataview = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteKxDataviewRequest,
  output: DeleteKxDataviewResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes the kdb environment. This action is irreversible. Deleting a kdb environment will remove all the associated data and any services running in it.
 */
export const deleteKxEnvironment = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteKxEnvironmentRequest,
  output: DeleteKxEnvironmentResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes a user in the specified kdb environment.
 */
export const deleteKxUser = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteKxUserRequest,
  output: DeleteKxUserResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes the specified nodes from a cluster.
 */
export const deleteKxClusterNode = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteKxClusterNodeRequest,
  output: DeleteKxClusterNodeResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Delete an FinSpace environment.
 */
export const deleteEnvironment = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteEnvironmentRequest,
  output: DeleteEnvironmentResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves a connection string for a user to connect to a kdb cluster. You must call this API using the same role that you have defined while creating a user.
 */
export const getKxConnectionString = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    input: GetKxConnectionStringRequest,
    output: GetKxConnectionStringResponse,
    errors: [
      AccessDeniedException,
      InternalServerException,
      ResourceNotFoundException,
      ThrottlingException,
      ValidationException,
    ],
  }),
);
/**
 * Returns database information for the specified environment ID.
 */
export const getKxDatabase = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetKxDatabaseRequest,
  output: GetKxDatabaseResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves information about the specified kdb user.
 */
export const getKxUser = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetKxUserRequest,
  output: GetKxUserResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Returns information about a kdb changeset.
 */
export const getKxChangeset = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetKxChangesetRequest,
  output: GetKxChangesetResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves details of the dataview.
 */
export const getKxDataview = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetKxDataviewRequest,
  output: GetKxDataviewResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Returns a list of all the changesets for a database.
 */
export const listKxChangesets = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(
  () => ({
    input: ListKxChangesetsRequest,
    output: ListKxChangesetsResponse,
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
      pageSize: "maxResults",
    } as const,
  }),
);
/**
 * Returns a list of all the databases in the kdb environment.
 */
export const listKxDatabases = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(
  () => ({
    input: ListKxDatabasesRequest,
    output: ListKxDatabasesResponse,
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
      pageSize: "maxResults",
    } as const,
  }),
);
/**
 * Returns a list of all the dataviews in the database.
 */
export const listKxDataviews = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(
  () => ({
    input: ListKxDataviewsRequest,
    output: ListKxDataviewsResponse,
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
      pageSize: "maxResults",
    } as const,
  }),
);
/**
 * Lists all the users in a kdb environment.
 */
export const listKxUsers = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListKxUsersRequest,
  output: ListKxUsersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Retrieves the information about the volume.
 */
export const getKxVolume = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetKxVolumeRequest,
  output: GetKxVolumeResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates environment network to connect to your internal network by using a transit gateway. This API supports request to create a transit gateway attachment from FinSpace VPC to your transit gateway ID and create a custom Route-53 outbound resolvers.
 *
 * Once you send a request to update a network, you cannot change it again. Network update might require termination of any clusters that are running in the existing network.
 */
export const updateKxEnvironmentNetwork = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    input: UpdateKxEnvironmentNetworkRequest,
    output: UpdateKxEnvironmentNetworkResponse,
    errors: [
      AccessDeniedException,
      ConflictException,
      InternalServerException,
      ResourceNotFoundException,
      ThrottlingException,
      ValidationException,
    ],
  }),
);
/**
 * Creates a managed kdb environment for the account.
 */
export const createKxEnvironment = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateKxEnvironmentRequest,
  output: CreateKxEnvironmentResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Create a new FinSpace environment.
 */
export const createEnvironment = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateEnvironmentRequest,
  output: CreateEnvironmentResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    LimitExceededException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
