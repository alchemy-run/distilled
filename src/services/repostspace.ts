import * as S from "effect/Schema";
import * as API from "../api.ts";
import * as T from "../traits.ts";
import { ERROR_CATEGORIES, withCategory } from "../error-category.ts";
const svc = T.AwsApiService({
  sdkId: "repostspace",
  serviceShapeName: "RepostSpace",
});
const auth = T.AwsAuthSigv4({ name: "repostspace" });
const ver = T.ServiceVersion("2022-05-13");
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
          conditions: [],
          rules: [
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
              endpoint: {
                url: { ref: "Endpoint" },
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
      rules: [
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
                    {
                      fn: "booleanEquals",
                      argv: [{ ref: "UseDualStack" }, true],
                    },
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
                                "supportsFIPS",
                              ],
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
                          rules: [
                            {
                              conditions: [],
                              endpoint: {
                                url: "https://repostspace-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
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
                              argv: [
                                { ref: "PartitionResult" },
                                "supportsFIPS",
                              ],
                            },
                            true,
                          ],
                        },
                      ],
                      rules: [
                        {
                          conditions: [],
                          rules: [
                            {
                              conditions: [],
                              endpoint: {
                                url: "https://repostspace-fips.{Region}.{PartitionResult#dnsSuffix}",
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
                      error:
                        "FIPS is enabled but this partition does not support FIPS",
                      type: "error",
                    },
                  ],
                  type: "tree",
                },
                {
                  conditions: [
                    {
                      fn: "booleanEquals",
                      argv: [{ ref: "UseDualStack" }, true],
                    },
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
                          rules: [
                            {
                              conditions: [],
                              endpoint: {
                                url: "https://repostspace.{Region}.{PartitionResult#dualStackDnsSuffix}",
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
                      error:
                        "DualStack is enabled but this partition does not support DualStack",
                      type: "error",
                    },
                  ],
                  type: "tree",
                },
                {
                  conditions: [],
                  rules: [
                    {
                      conditions: [],
                      endpoint: {
                        url: "https://repostspace.{Region}.{PartitionResult#dnsSuffix}",
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
          ],
          type: "tree",
        },
        {
          conditions: [],
          error: "Invalid Configuration: Missing Region",
          type: "error",
        },
      ],
      type: "tree",
    },
  ],
});

//# Schemas
export type AccessorIdList = string[];
export const AccessorIdList = S.Array(S.String);
export type TagKeyList = string[];
export const TagKeyList = S.Array(S.String);
export interface BatchAddChannelRoleToAccessorsInput {
  spaceId: string;
  channelId: string;
  accessorIds: AccessorIdList;
  channelRole: string;
}
export const BatchAddChannelRoleToAccessorsInput = S.suspend(() =>
  S.Struct({
    spaceId: S.String.pipe(T.HttpLabel("spaceId")),
    channelId: S.String.pipe(T.HttpLabel("channelId")),
    accessorIds: AccessorIdList,
    channelRole: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/spaces/{spaceId}/channels/{channelId}/roles",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "BatchAddChannelRoleToAccessorsInput",
}) as any as S.Schema<BatchAddChannelRoleToAccessorsInput>;
export interface BatchAddRoleInput {
  spaceId: string;
  accessorIds: AccessorIdList;
  role: string;
}
export const BatchAddRoleInput = S.suspend(() =>
  S.Struct({
    spaceId: S.String.pipe(T.HttpLabel("spaceId")),
    accessorIds: AccessorIdList,
    role: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/spaces/{spaceId}/roles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "BatchAddRoleInput",
}) as any as S.Schema<BatchAddRoleInput>;
export interface BatchRemoveChannelRoleFromAccessorsInput {
  spaceId: string;
  channelId: string;
  accessorIds: AccessorIdList;
  channelRole: string;
}
export const BatchRemoveChannelRoleFromAccessorsInput = S.suspend(() =>
  S.Struct({
    spaceId: S.String.pipe(T.HttpLabel("spaceId")),
    channelId: S.String.pipe(T.HttpLabel("channelId")),
    accessorIds: AccessorIdList,
    channelRole: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/spaces/{spaceId}/channels/{channelId}/roles",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "BatchRemoveChannelRoleFromAccessorsInput",
}) as any as S.Schema<BatchRemoveChannelRoleFromAccessorsInput>;
export interface BatchRemoveRoleInput {
  spaceId: string;
  accessorIds: AccessorIdList;
  role: string;
}
export const BatchRemoveRoleInput = S.suspend(() =>
  S.Struct({
    spaceId: S.String.pipe(T.HttpLabel("spaceId")),
    accessorIds: AccessorIdList,
    role: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/spaces/{spaceId}/roles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "BatchRemoveRoleInput",
}) as any as S.Schema<BatchRemoveRoleInput>;
export interface CreateChannelInput {
  spaceId: string;
  channelName: string;
  channelDescription?: string;
}
export const CreateChannelInput = S.suspend(() =>
  S.Struct({
    spaceId: S.String.pipe(T.HttpLabel("spaceId")),
    channelName: S.String,
    channelDescription: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/spaces/{spaceId}/channels" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "CreateChannelInput",
}) as any as S.Schema<CreateChannelInput>;
export interface DeleteSpaceInput {
  spaceId: string;
}
export const DeleteSpaceInput = S.suspend(() =>
  S.Struct({ spaceId: S.String.pipe(T.HttpLabel("spaceId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/spaces/{spaceId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "DeleteSpaceInput",
}) as any as S.Schema<DeleteSpaceInput>;
export interface DeleteSpaceResponse {}
export const DeleteSpaceResponse = S.suspend(() => S.Struct({})).annotations({
  identifier: "DeleteSpaceResponse",
}) as any as S.Schema<DeleteSpaceResponse>;
export interface DeregisterAdminInput {
  spaceId: string;
  adminId: string;
}
export const DeregisterAdminInput = S.suspend(() =>
  S.Struct({
    spaceId: S.String.pipe(T.HttpLabel("spaceId")),
    adminId: S.String.pipe(T.HttpLabel("adminId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/spaces/{spaceId}/admins/{adminId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "DeregisterAdminInput",
}) as any as S.Schema<DeregisterAdminInput>;
export interface DeregisterAdminResponse {}
export const DeregisterAdminResponse = S.suspend(() =>
  S.Struct({}),
).annotations({
  identifier: "DeregisterAdminResponse",
}) as any as S.Schema<DeregisterAdminResponse>;
export interface GetChannelInput {
  spaceId: string;
  channelId: string;
}
export const GetChannelInput = S.suspend(() =>
  S.Struct({
    spaceId: S.String.pipe(T.HttpLabel("spaceId")),
    channelId: S.String.pipe(T.HttpLabel("channelId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/spaces/{spaceId}/channels/{channelId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "GetChannelInput",
}) as any as S.Schema<GetChannelInput>;
export interface GetSpaceInput {
  spaceId: string;
}
export const GetSpaceInput = S.suspend(() =>
  S.Struct({ spaceId: S.String.pipe(T.HttpLabel("spaceId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/spaces/{spaceId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "GetSpaceInput",
}) as any as S.Schema<GetSpaceInput>;
export interface ListChannelsInput {
  spaceId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListChannelsInput = S.suspend(() =>
  S.Struct({
    spaceId: S.String.pipe(T.HttpLabel("spaceId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/spaces/{spaceId}/channels" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "ListChannelsInput",
}) as any as S.Schema<ListChannelsInput>;
export interface ListSpacesInput {
  nextToken?: string;
  maxResults?: number;
}
export const ListSpacesInput = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/spaces" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "ListSpacesInput",
}) as any as S.Schema<ListSpacesInput>;
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
export interface RegisterAdminInput {
  spaceId: string;
  adminId: string;
}
export const RegisterAdminInput = S.suspend(() =>
  S.Struct({
    spaceId: S.String.pipe(T.HttpLabel("spaceId")),
    adminId: S.String.pipe(T.HttpLabel("adminId")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/spaces/{spaceId}/admins/{adminId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "RegisterAdminInput",
}) as any as S.Schema<RegisterAdminInput>;
export interface RegisterAdminResponse {}
export const RegisterAdminResponse = S.suspend(() => S.Struct({})).annotations({
  identifier: "RegisterAdminResponse",
}) as any as S.Schema<RegisterAdminResponse>;
export interface SendInvitesInput {
  spaceId: string;
  accessorIds: AccessorIdList;
  title: string;
  body: string;
}
export const SendInvitesInput = S.suspend(() =>
  S.Struct({
    spaceId: S.String.pipe(T.HttpLabel("spaceId")),
    accessorIds: AccessorIdList,
    title: S.String,
    body: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/spaces/{spaceId}/invite" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "SendInvitesInput",
}) as any as S.Schema<SendInvitesInput>;
export interface SendInvitesResponse {}
export const SendInvitesResponse = S.suspend(() => S.Struct({})).annotations({
  identifier: "SendInvitesResponse",
}) as any as S.Schema<SendInvitesResponse>;
export type Tags = { [key: string]: string };
export const Tags = S.Record({ key: S.String, value: S.String });
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tags;
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
export interface UpdateChannelInput {
  spaceId: string;
  channelId: string;
  channelName: string;
  channelDescription?: string;
}
export const UpdateChannelInput = S.suspend(() =>
  S.Struct({
    spaceId: S.String.pipe(T.HttpLabel("spaceId")),
    channelId: S.String.pipe(T.HttpLabel("channelId")),
    channelName: S.String,
    channelDescription: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/spaces/{spaceId}/channels/{channelId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "UpdateChannelInput",
}) as any as S.Schema<UpdateChannelInput>;
export interface UpdateChannelOutput {}
export const UpdateChannelOutput = S.suspend(() => S.Struct({})).annotations({
  identifier: "UpdateChannelOutput",
}) as any as S.Schema<UpdateChannelOutput>;
export type AllowedDomainsList = string[];
export const AllowedDomainsList = S.Array(S.String);
export interface SupportedEmailDomainsParameters {
  enabled?: string;
  allowedDomains?: AllowedDomainsList;
}
export const SupportedEmailDomainsParameters = S.suspend(() =>
  S.Struct({
    enabled: S.optional(S.String),
    allowedDomains: S.optional(AllowedDomainsList),
  }),
).annotations({
  identifier: "SupportedEmailDomainsParameters",
}) as any as S.Schema<SupportedEmailDomainsParameters>;
export interface UpdateSpaceInput {
  spaceId: string;
  description?: string;
  tier?: string;
  roleArn?: string;
  supportedEmailDomains?: SupportedEmailDomainsParameters;
}
export const UpdateSpaceInput = S.suspend(() =>
  S.Struct({
    spaceId: S.String.pipe(T.HttpLabel("spaceId")),
    description: S.optional(S.String),
    tier: S.optional(S.String),
    roleArn: S.optional(S.String),
    supportedEmailDomains: S.optional(SupportedEmailDomainsParameters),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/spaces/{spaceId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "UpdateSpaceInput",
}) as any as S.Schema<UpdateSpaceInput>;
export interface UpdateSpaceResponse {}
export const UpdateSpaceResponse = S.suspend(() => S.Struct({})).annotations({
  identifier: "UpdateSpaceResponse",
}) as any as S.Schema<UpdateSpaceResponse>;
export type UserAdmins = string[];
export const UserAdmins = S.Array(S.String);
export type GroupAdmins = string[];
export const GroupAdmins = S.Array(S.String);
export interface BatchError {
  accessorId: string;
  error: number;
  message: string;
}
export const BatchError = S.suspend(() =>
  S.Struct({ accessorId: S.String, error: S.Number, message: S.String }),
).annotations({ identifier: "BatchError" }) as any as S.Schema<BatchError>;
export type BatchErrorList = BatchError[];
export const BatchErrorList = S.Array(BatchError);
export interface BatchAddRoleOutput {
  addedAccessorIds: AccessorIdList;
  errors: BatchErrorList;
}
export const BatchAddRoleOutput = S.suspend(() =>
  S.Struct({ addedAccessorIds: AccessorIdList, errors: BatchErrorList }),
).annotations({
  identifier: "BatchAddRoleOutput",
}) as any as S.Schema<BatchAddRoleOutput>;
export interface BatchRemoveChannelRoleFromAccessorsOutput {
  removedAccessorIds: AccessorIdList;
  errors: BatchErrorList;
}
export const BatchRemoveChannelRoleFromAccessorsOutput = S.suspend(() =>
  S.Struct({ removedAccessorIds: AccessorIdList, errors: BatchErrorList }),
).annotations({
  identifier: "BatchRemoveChannelRoleFromAccessorsOutput",
}) as any as S.Schema<BatchRemoveChannelRoleFromAccessorsOutput>;
export interface BatchRemoveRoleOutput {
  removedAccessorIds: AccessorIdList;
  errors: BatchErrorList;
}
export const BatchRemoveRoleOutput = S.suspend(() =>
  S.Struct({ removedAccessorIds: AccessorIdList, errors: BatchErrorList }),
).annotations({
  identifier: "BatchRemoveRoleOutput",
}) as any as S.Schema<BatchRemoveRoleOutput>;
export interface CreateChannelOutput {
  channelId: string;
}
export const CreateChannelOutput = S.suspend(() =>
  S.Struct({ channelId: S.String }),
).annotations({
  identifier: "CreateChannelOutput",
}) as any as S.Schema<CreateChannelOutput>;
export interface CreateSpaceInput {
  name: string;
  subdomain: string;
  tier: string;
  description?: string;
  userKMSKey?: string;
  tags?: Tags;
  roleArn?: string;
  supportedEmailDomains?: SupportedEmailDomainsParameters;
}
export const CreateSpaceInput = S.suspend(() =>
  S.Struct({
    name: S.String,
    subdomain: S.String,
    tier: S.String,
    description: S.optional(S.String),
    userKMSKey: S.optional(S.String),
    tags: S.optional(Tags),
    roleArn: S.optional(S.String),
    supportedEmailDomains: S.optional(SupportedEmailDomainsParameters),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/spaces" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "CreateSpaceInput",
}) as any as S.Schema<CreateSpaceInput>;
export interface ListTagsForResourceResponse {
  tags?: Tags;
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ tags: S.optional(Tags) }),
).annotations({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export type ChannelRoleList = string[];
export const ChannelRoleList = S.Array(S.String);
export type RoleList = string[];
export const RoleList = S.Array(S.String);
export type ChannelRoles = { [key: string]: ChannelRoleList };
export const ChannelRoles = S.Record({ key: S.String, value: ChannelRoleList });
export type Roles = { [key: string]: RoleList };
export const Roles = S.Record({ key: S.String, value: RoleList });
export interface SupportedEmailDomainsStatus {
  enabled?: string;
  allowedDomains?: AllowedDomainsList;
}
export const SupportedEmailDomainsStatus = S.suspend(() =>
  S.Struct({
    enabled: S.optional(S.String),
    allowedDomains: S.optional(AllowedDomainsList),
  }),
).annotations({
  identifier: "SupportedEmailDomainsStatus",
}) as any as S.Schema<SupportedEmailDomainsStatus>;
export interface ChannelData {
  spaceId: string;
  channelId: string;
  channelName: string;
  channelDescription?: string;
  createDateTime: Date;
  deleteDateTime?: Date;
  channelStatus: string;
  userCount: number;
  groupCount: number;
}
export const ChannelData = S.suspend(() =>
  S.Struct({
    spaceId: S.String,
    channelId: S.String,
    channelName: S.String,
    channelDescription: S.optional(S.String),
    createDateTime: S.Date.pipe(T.TimestampFormat("date-time")),
    deleteDateTime: S.optional(S.Date.pipe(T.TimestampFormat("date-time"))),
    channelStatus: S.String,
    userCount: S.Number,
    groupCount: S.Number,
  }),
).annotations({ identifier: "ChannelData" }) as any as S.Schema<ChannelData>;
export type ChannelsList = ChannelData[];
export const ChannelsList = S.Array(ChannelData);
export interface SpaceData {
  spaceId: string;
  arn: string;
  name: string;
  description?: string;
  status: string;
  configurationStatus: string;
  vanityDomainStatus: string;
  vanityDomain: string;
  randomDomain: string;
  tier: string;
  storageLimit: number;
  createDateTime: Date;
  deleteDateTime?: Date;
  userKMSKey?: string;
  userCount?: number;
  contentSize?: number;
  supportedEmailDomains?: SupportedEmailDomainsStatus;
}
export const SpaceData = S.suspend(() =>
  S.Struct({
    spaceId: S.String,
    arn: S.String,
    name: S.String,
    description: S.optional(S.String),
    status: S.String,
    configurationStatus: S.String,
    vanityDomainStatus: S.String,
    vanityDomain: S.String,
    randomDomain: S.String,
    tier: S.String,
    storageLimit: S.Number,
    createDateTime: S.Date.pipe(T.TimestampFormat("date-time")),
    deleteDateTime: S.optional(S.Date.pipe(T.TimestampFormat("date-time"))),
    userKMSKey: S.optional(S.String),
    userCount: S.optional(S.Number),
    contentSize: S.optional(S.Number),
    supportedEmailDomains: S.optional(SupportedEmailDomainsStatus),
  }),
).annotations({ identifier: "SpaceData" }) as any as S.Schema<SpaceData>;
export type SpacesList = SpaceData[];
export const SpacesList = S.Array(SpaceData);
export interface BatchAddChannelRoleToAccessorsOutput {
  addedAccessorIds: AccessorIdList;
  errors: BatchErrorList;
}
export const BatchAddChannelRoleToAccessorsOutput = S.suspend(() =>
  S.Struct({ addedAccessorIds: AccessorIdList, errors: BatchErrorList }),
).annotations({
  identifier: "BatchAddChannelRoleToAccessorsOutput",
}) as any as S.Schema<BatchAddChannelRoleToAccessorsOutput>;
export interface CreateSpaceOutput {
  spaceId: string;
}
export const CreateSpaceOutput = S.suspend(() =>
  S.Struct({ spaceId: S.String }),
).annotations({
  identifier: "CreateSpaceOutput",
}) as any as S.Schema<CreateSpaceOutput>;
export interface GetChannelOutput {
  spaceId: string;
  channelId: string;
  channelName: string;
  channelDescription?: string;
  createDateTime: Date;
  deleteDateTime?: Date;
  channelRoles?: ChannelRoles;
  channelStatus: string;
}
export const GetChannelOutput = S.suspend(() =>
  S.Struct({
    spaceId: S.String,
    channelId: S.String,
    channelName: S.String,
    channelDescription: S.optional(S.String),
    createDateTime: S.Date.pipe(T.TimestampFormat("date-time")),
    deleteDateTime: S.optional(S.Date.pipe(T.TimestampFormat("date-time"))),
    channelRoles: S.optional(ChannelRoles),
    channelStatus: S.String,
  }),
).annotations({
  identifier: "GetChannelOutput",
}) as any as S.Schema<GetChannelOutput>;
export interface GetSpaceOutput {
  spaceId: string;
  arn: string;
  name: string;
  status: string;
  configurationStatus: string;
  clientId: string;
  identityStoreId?: string;
  applicationArn?: string;
  description?: string;
  vanityDomainStatus: string;
  vanityDomain: string;
  randomDomain: string;
  customerRoleArn?: string;
  createDateTime: Date;
  deleteDateTime?: Date;
  tier: string;
  storageLimit: number;
  userAdmins?: UserAdmins;
  groupAdmins?: GroupAdmins;
  roles?: Roles;
  userKMSKey?: string;
  userCount?: number;
  contentSize?: number;
  supportedEmailDomains?: SupportedEmailDomainsStatus;
}
export const GetSpaceOutput = S.suspend(() =>
  S.Struct({
    spaceId: S.String,
    arn: S.String,
    name: S.String,
    status: S.String,
    configurationStatus: S.String,
    clientId: S.String,
    identityStoreId: S.optional(S.String),
    applicationArn: S.optional(S.String),
    description: S.optional(S.String),
    vanityDomainStatus: S.String,
    vanityDomain: S.String,
    randomDomain: S.String,
    customerRoleArn: S.optional(S.String),
    createDateTime: S.Date.pipe(T.TimestampFormat("date-time")),
    deleteDateTime: S.optional(S.Date.pipe(T.TimestampFormat("date-time"))),
    tier: S.String,
    storageLimit: S.Number,
    userAdmins: S.optional(UserAdmins),
    groupAdmins: S.optional(GroupAdmins),
    roles: S.optional(Roles),
    userKMSKey: S.optional(S.String),
    userCount: S.optional(S.Number),
    contentSize: S.optional(S.Number),
    supportedEmailDomains: S.optional(SupportedEmailDomainsStatus),
  }),
).annotations({
  identifier: "GetSpaceOutput",
}) as any as S.Schema<GetSpaceOutput>;
export interface ListChannelsOutput {
  channels: ChannelsList;
  nextToken?: string;
}
export const ListChannelsOutput = S.suspend(() =>
  S.Struct({ channels: ChannelsList, nextToken: S.optional(S.String) }),
).annotations({
  identifier: "ListChannelsOutput",
}) as any as S.Schema<ListChannelsOutput>;
export interface ListSpacesOutput {
  spaces: SpacesList;
  nextToken?: string;
}
export const ListSpacesOutput = S.suspend(() =>
  S.Struct({ spaces: SpacesList, nextToken: S.optional(S.String) }),
).annotations({
  identifier: "ListSpacesOutput",
}) as any as S.Schema<ListSpacesOutput>;
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export const ValidationExceptionField = S.suspend(() =>
  S.Struct({ name: S.String, message: S.String }),
).annotations({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = S.Array(ValidationExceptionField);

//# Errors
export class AccessDeniedException extends S.TaggedError<AccessDeniedException>()(
  "AccessDeniedException",
  { message: S.String },
) {}
export class InternalServerException extends S.TaggedError<InternalServerException>()(
  "InternalServerException",
  {
    message: S.String,
    retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
  },
  T.Retryable(),
).pipe(withCategory(ERROR_CATEGORIES.SERVER_ERROR)) {}
export class ConflictException extends S.TaggedError<ConflictException>()(
  "ConflictException",
  { message: S.String, resourceId: S.String, resourceType: S.String },
) {}
export class ResourceNotFoundException extends S.TaggedError<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { message: S.String, resourceId: S.String, resourceType: S.String },
) {}
export class ThrottlingException extends S.TaggedError<ThrottlingException>()(
  "ThrottlingException",
  {
    message: S.String,
    serviceCode: S.optional(S.String),
    quotaCode: S.optional(S.String),
    retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
  },
  T.Retryable({ throttling: true }),
).pipe(withCategory(ERROR_CATEGORIES.THROTTLING_ERROR)) {}
export class ServiceQuotaExceededException extends S.TaggedError<ServiceQuotaExceededException>()(
  "ServiceQuotaExceededException",
  {
    message: S.String,
    resourceId: S.String,
    resourceType: S.String,
    serviceCode: S.String,
    quotaCode: S.String,
  },
) {}
export class ValidationException extends S.TaggedError<ValidationException>()(
  "ValidationException",
  {
    message: S.String,
    reason: S.String,
    fieldList: S.optional(ValidationExceptionFieldList),
  },
) {}

//# Operations
/**
 * Returns the list of channel within a private re:Post with some information about each channel.
 */
export const listChannels = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(
  () => ({
    input: ListChannelsInput,
    output: ListChannelsOutput,
    errors: [
      AccessDeniedException,
      InternalServerException,
      ThrottlingException,
      ValidationException,
    ],
    pagination: {
      inputToken: "nextToken",
      outputToken: "nextToken",
      items: "channels",
      pageSize: "maxResults",
    } as const,
  }),
);
/**
 * Displays information about a channel in a private re:Post.
 */
export const getChannel = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetChannelInput,
  output: GetChannelOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Displays information about the AWS re:Post Private private re:Post.
 */
export const getSpace = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSpaceInput,
  output: GetSpaceOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Modifies an existing channel.
 */
export const updateChannel = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateChannelInput,
  output: UpdateChannelOutput,
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
 * Returns the tags that are associated with the AWS re:Post Private resource specified by the resourceArn. The only resource that can be tagged is a private re:Post.
 */
export const listTagsForResource = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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
/**
 * Removes the user or group from the list of administrators of the private re:Post.
 */
export const deregisterAdmin = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeregisterAdminInput,
  output: DeregisterAdminResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Adds a user or group to the list of administrators of the private re:Post.
 */
export const registerAdmin = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RegisterAdminInput,
  output: RegisterAdminResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Sends an invitation email to selected users and groups.
 */
export const sendInvites = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SendInvitesInput,
  output: SendInvitesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Associates tags with an AWS re:Post Private resource. Currently, the only resource that can be tagged is the private re:Post. If you specify a new tag key for the resource, the tag is appended to the list of tags that are associated with the resource. If you specify a tag key that’s already associated with the resource, the new tag value that you specify replaces the previous value for that tag.
 */
export const tagResource = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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
/**
 * Removes the association of the tag with the AWS re:Post Private resource.
 */
export const untagResource = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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
/**
 * Add a role to multiple users or groups in a private re:Post.
 */
export const batchAddRole = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchAddRoleInput,
  output: BatchAddRoleOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Remove a role from multiple users or groups in a private re:Post channel.
 */
export const batchRemoveChannelRoleFromAccessors =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    input: BatchRemoveChannelRoleFromAccessorsInput,
    output: BatchRemoveChannelRoleFromAccessorsOutput,
    errors: [
      AccessDeniedException,
      InternalServerException,
      ResourceNotFoundException,
      ThrottlingException,
      ValidationException,
    ],
  }));
/**
 * Remove a role from multiple users or groups in a private re:Post.
 */
export const batchRemoveRole = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchRemoveRoleInput,
  output: BatchRemoveRoleOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Add role to multiple users or groups in a private re:Post channel.
 */
export const batchAddChannelRoleToAccessors =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    input: BatchAddChannelRoleToAccessorsInput,
    output: BatchAddChannelRoleToAccessorsOutput,
    errors: [
      AccessDeniedException,
      InternalServerException,
      ResourceNotFoundException,
      ThrottlingException,
      ValidationException,
    ],
  }));
/**
 * Modifies an existing AWS re:Post Private private re:Post.
 */
export const updateSpace = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateSpaceInput,
  output: UpdateSpaceResponse,
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
 * Returns a list of AWS re:Post Private private re:Posts in the account with some information about each private re:Post.
 */
export const listSpaces = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSpacesInput,
  output: ListSpacesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "spaces",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Deletes an AWS re:Post Private private re:Post.
 */
export const deleteSpace = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSpaceInput,
  output: DeleteSpaceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates a channel in an AWS re:Post Private private re:Post.
 */
export const createChannel = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateChannelInput,
  output: CreateChannelOutput,
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
/**
 * Creates an AWS re:Post Private private re:Post.
 */
export const createSpace = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateSpaceInput,
  output: CreateSpaceOutput,
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
