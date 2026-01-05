import * as S from "effect/Schema";
import * as API from "../api.ts";
import * as T from "../traits.ts";
import { ERROR_CATEGORIES, withCategory } from "../error-category.ts";
const ns = T.XmlNamespace(
  "http://directoryservicedata.amazonaws.com/doc/2023-05-31/",
);
const svc = T.AwsApiService({
  sdkId: "Directory Service Data",
  serviceShapeName: "DirectoryServiceData",
});
const auth = T.AwsAuthSigv4({ name: "ds-data" });
const ver = T.ServiceVersion("2023-05-31");
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
                                url: "https://ds-data-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
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
                                url: "https://ds-data-fips.{Region}.{PartitionResult#dnsSuffix}",
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
                                url: "https://ds-data.{Region}.{PartitionResult#dualStackDnsSuffix}",
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
                        url: "https://ds-data.{Region}.{PartitionResult#dnsSuffix}",
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
export type LdapDisplayNameList = string[];
export const LdapDisplayNameList = S.Array(S.String);
export interface AddGroupMemberRequest {
  DirectoryId: string;
  GroupName: string;
  MemberName: string;
  MemberRealm?: string;
  ClientToken?: string;
}
export const AddGroupMemberRequest = S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    GroupName: S.String,
    MemberName: S.String,
    MemberRealm: S.optional(S.String),
    ClientToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/GroupMemberships/AddGroupMember" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "AddGroupMemberRequest",
}) as any as S.Schema<AddGroupMemberRequest>;
export interface AddGroupMemberResult {}
export const AddGroupMemberResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotations({
  identifier: "AddGroupMemberResult",
}) as any as S.Schema<AddGroupMemberResult>;
export type StringSetAttributeValue = string[];
export const StringSetAttributeValue = S.Array(S.String);
export const AttributeValue = S.Union(
  S.Struct({ S: S.String }),
  S.Struct({ N: S.Number }),
  S.Struct({ BOOL: S.Boolean }),
  S.Struct({ SS: StringSetAttributeValue }),
);
export type Attributes = { [key: string]: (typeof AttributeValue)["Type"] };
export const Attributes = S.Record({ key: S.String, value: AttributeValue });
export interface CreateUserRequest {
  DirectoryId: string;
  SAMAccountName: string;
  EmailAddress?: string;
  GivenName?: string;
  Surname?: string;
  OtherAttributes?: Attributes;
  ClientToken?: string;
}
export const CreateUserRequest = S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    SAMAccountName: S.String,
    EmailAddress: S.optional(S.String),
    GivenName: S.optional(S.String),
    Surname: S.optional(S.String),
    OtherAttributes: S.optional(Attributes),
    ClientToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/Users/CreateUser" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "CreateUserRequest",
}) as any as S.Schema<CreateUserRequest>;
export interface DeleteGroupRequest {
  DirectoryId: string;
  SAMAccountName: string;
  ClientToken?: string;
}
export const DeleteGroupRequest = S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    SAMAccountName: S.String,
    ClientToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/Groups/DeleteGroup" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "DeleteGroupRequest",
}) as any as S.Schema<DeleteGroupRequest>;
export interface DeleteGroupResult {}
export const DeleteGroupResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotations({
  identifier: "DeleteGroupResult",
}) as any as S.Schema<DeleteGroupResult>;
export interface DeleteUserRequest {
  DirectoryId: string;
  SAMAccountName: string;
  ClientToken?: string;
}
export const DeleteUserRequest = S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    SAMAccountName: S.String,
    ClientToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/Users/DeleteUser" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "DeleteUserRequest",
}) as any as S.Schema<DeleteUserRequest>;
export interface DeleteUserResult {}
export const DeleteUserResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotations({
  identifier: "DeleteUserResult",
}) as any as S.Schema<DeleteUserResult>;
export interface DescribeGroupRequest {
  DirectoryId: string;
  Realm?: string;
  SAMAccountName: string;
  OtherAttributes?: LdapDisplayNameList;
}
export const DescribeGroupRequest = S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    Realm: S.optional(S.String),
    SAMAccountName: S.String,
    OtherAttributes: S.optional(LdapDisplayNameList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/Groups/DescribeGroup" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "DescribeGroupRequest",
}) as any as S.Schema<DescribeGroupRequest>;
export interface DescribeUserRequest {
  DirectoryId: string;
  SAMAccountName: string;
  OtherAttributes?: LdapDisplayNameList;
  Realm?: string;
}
export const DescribeUserRequest = S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    SAMAccountName: S.String,
    OtherAttributes: S.optional(LdapDisplayNameList),
    Realm: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/Users/DescribeUser" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "DescribeUserRequest",
}) as any as S.Schema<DescribeUserRequest>;
export interface DisableUserRequest {
  DirectoryId: string;
  SAMAccountName: string;
  ClientToken?: string;
}
export const DisableUserRequest = S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    SAMAccountName: S.String,
    ClientToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/Users/DisableUser" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "DisableUserRequest",
}) as any as S.Schema<DisableUserRequest>;
export interface DisableUserResult {}
export const DisableUserResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotations({
  identifier: "DisableUserResult",
}) as any as S.Schema<DisableUserResult>;
export interface ListGroupMembersRequest {
  DirectoryId: string;
  Realm?: string;
  MemberRealm?: string;
  SAMAccountName: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListGroupMembersRequest = S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    Realm: S.optional(S.String),
    MemberRealm: S.optional(S.String),
    SAMAccountName: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/GroupMemberships/ListGroupMembers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "ListGroupMembersRequest",
}) as any as S.Schema<ListGroupMembersRequest>;
export interface ListGroupsRequest {
  DirectoryId: string;
  Realm?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListGroupsRequest = S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    Realm: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/Groups/ListGroups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "ListGroupsRequest",
}) as any as S.Schema<ListGroupsRequest>;
export interface ListGroupsForMemberRequest {
  DirectoryId: string;
  Realm?: string;
  MemberRealm?: string;
  SAMAccountName: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListGroupsForMemberRequest = S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    Realm: S.optional(S.String),
    MemberRealm: S.optional(S.String),
    SAMAccountName: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/GroupMemberships/ListGroupsForMember" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "ListGroupsForMemberRequest",
}) as any as S.Schema<ListGroupsForMemberRequest>;
export interface ListUsersRequest {
  DirectoryId: string;
  Realm?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListUsersRequest = S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    Realm: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/Users/ListUsers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "ListUsersRequest",
}) as any as S.Schema<ListUsersRequest>;
export interface RemoveGroupMemberRequest {
  DirectoryId: string;
  GroupName: string;
  MemberName: string;
  MemberRealm?: string;
  ClientToken?: string;
}
export const RemoveGroupMemberRequest = S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    GroupName: S.String,
    MemberName: S.String,
    MemberRealm: S.optional(S.String),
    ClientToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/GroupMemberships/RemoveGroupMember" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "RemoveGroupMemberRequest",
}) as any as S.Schema<RemoveGroupMemberRequest>;
export interface RemoveGroupMemberResult {}
export const RemoveGroupMemberResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotations({
  identifier: "RemoveGroupMemberResult",
}) as any as S.Schema<RemoveGroupMemberResult>;
export interface SearchGroupsRequest {
  DirectoryId: string;
  SearchString: string;
  SearchAttributes: LdapDisplayNameList;
  Realm?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const SearchGroupsRequest = S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    SearchString: S.String,
    SearchAttributes: LdapDisplayNameList,
    Realm: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/Groups/SearchGroups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "SearchGroupsRequest",
}) as any as S.Schema<SearchGroupsRequest>;
export interface SearchUsersRequest {
  DirectoryId: string;
  Realm?: string;
  SearchString: string;
  SearchAttributes: LdapDisplayNameList;
  NextToken?: string;
  MaxResults?: number;
}
export const SearchUsersRequest = S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    Realm: S.optional(S.String),
    SearchString: S.String,
    SearchAttributes: LdapDisplayNameList,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/Users/SearchUsers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "SearchUsersRequest",
}) as any as S.Schema<SearchUsersRequest>;
export interface UpdateGroupRequest {
  DirectoryId: string;
  SAMAccountName: string;
  GroupType?: string;
  GroupScope?: string;
  OtherAttributes?: Attributes;
  UpdateType?: string;
  ClientToken?: string;
}
export const UpdateGroupRequest = S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    SAMAccountName: S.String,
    GroupType: S.optional(S.String),
    GroupScope: S.optional(S.String),
    OtherAttributes: S.optional(Attributes),
    UpdateType: S.optional(S.String),
    ClientToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/Groups/UpdateGroup" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "UpdateGroupRequest",
}) as any as S.Schema<UpdateGroupRequest>;
export interface UpdateGroupResult {}
export const UpdateGroupResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotations({
  identifier: "UpdateGroupResult",
}) as any as S.Schema<UpdateGroupResult>;
export interface UpdateUserRequest {
  DirectoryId: string;
  SAMAccountName: string;
  EmailAddress?: string;
  GivenName?: string;
  Surname?: string;
  OtherAttributes?: Attributes;
  UpdateType?: string;
  ClientToken?: string;
}
export const UpdateUserRequest = S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    SAMAccountName: S.String,
    EmailAddress: S.optional(S.String),
    GivenName: S.optional(S.String),
    Surname: S.optional(S.String),
    OtherAttributes: S.optional(Attributes),
    UpdateType: S.optional(S.String),
    ClientToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/Users/UpdateUser" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "UpdateUserRequest",
}) as any as S.Schema<UpdateUserRequest>;
export interface UpdateUserResult {}
export const UpdateUserResult = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotations({
  identifier: "UpdateUserResult",
}) as any as S.Schema<UpdateUserResult>;
export interface CreateUserResult {
  DirectoryId?: string;
  SID?: string;
  SAMAccountName?: string;
}
export const CreateUserResult = S.suspend(() =>
  S.Struct({
    DirectoryId: S.optional(S.String),
    SID: S.optional(S.String),
    SAMAccountName: S.optional(S.String),
  }).pipe(ns),
).annotations({
  identifier: "CreateUserResult",
}) as any as S.Schema<CreateUserResult>;
export interface DescribeGroupResult {
  DirectoryId?: string;
  Realm?: string;
  SID?: string;
  SAMAccountName?: string;
  DistinguishedName?: string;
  GroupType?: string;
  GroupScope?: string;
  OtherAttributes?: Attributes;
}
export const DescribeGroupResult = S.suspend(() =>
  S.Struct({
    DirectoryId: S.optional(S.String),
    Realm: S.optional(S.String),
    SID: S.optional(S.String),
    SAMAccountName: S.optional(S.String),
    DistinguishedName: S.optional(S.String),
    GroupType: S.optional(S.String),
    GroupScope: S.optional(S.String),
    OtherAttributes: S.optional(Attributes),
  }).pipe(ns),
).annotations({
  identifier: "DescribeGroupResult",
}) as any as S.Schema<DescribeGroupResult>;
export interface DescribeUserResult {
  DirectoryId?: string;
  Realm?: string;
  SID?: string;
  SAMAccountName?: string;
  DistinguishedName?: string;
  UserPrincipalName?: string;
  EmailAddress?: string;
  GivenName?: string;
  Surname?: string;
  Enabled?: boolean;
  OtherAttributes?: Attributes;
}
export const DescribeUserResult = S.suspend(() =>
  S.Struct({
    DirectoryId: S.optional(S.String),
    Realm: S.optional(S.String),
    SID: S.optional(S.String),
    SAMAccountName: S.optional(S.String),
    DistinguishedName: S.optional(S.String),
    UserPrincipalName: S.optional(S.String),
    EmailAddress: S.optional(S.String),
    GivenName: S.optional(S.String),
    Surname: S.optional(S.String),
    Enabled: S.optional(S.Boolean),
    OtherAttributes: S.optional(Attributes),
  }).pipe(ns),
).annotations({
  identifier: "DescribeUserResult",
}) as any as S.Schema<DescribeUserResult>;
export interface GroupSummary {
  SID: string;
  SAMAccountName: string;
  GroupType: string;
  GroupScope: string;
}
export const GroupSummary = S.suspend(() =>
  S.Struct({
    SID: S.String,
    SAMAccountName: S.String,
    GroupType: S.String,
    GroupScope: S.String,
  }),
).annotations({ identifier: "GroupSummary" }) as any as S.Schema<GroupSummary>;
export type GroupSummaryList = GroupSummary[];
export const GroupSummaryList = S.Array(GroupSummary);
export interface ListGroupsForMemberResult {
  DirectoryId?: string;
  Realm?: string;
  MemberRealm?: string;
  Groups?: GroupSummaryList;
  NextToken?: string;
}
export const ListGroupsForMemberResult = S.suspend(() =>
  S.Struct({
    DirectoryId: S.optional(S.String),
    Realm: S.optional(S.String),
    MemberRealm: S.optional(S.String),
    Groups: S.optional(GroupSummaryList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotations({
  identifier: "ListGroupsForMemberResult",
}) as any as S.Schema<ListGroupsForMemberResult>;
export interface Member {
  SID: string;
  SAMAccountName: string;
  MemberType: string;
}
export const Member = S.suspend(() =>
  S.Struct({ SID: S.String, SAMAccountName: S.String, MemberType: S.String }),
).annotations({ identifier: "Member" }) as any as S.Schema<Member>;
export type MemberList = Member[];
export const MemberList = S.Array(Member);
export interface UserSummary {
  SID: string;
  SAMAccountName: string;
  GivenName?: string;
  Surname?: string;
  Enabled: boolean;
}
export const UserSummary = S.suspend(() =>
  S.Struct({
    SID: S.String,
    SAMAccountName: S.String,
    GivenName: S.optional(S.String),
    Surname: S.optional(S.String),
    Enabled: S.Boolean,
  }),
).annotations({ identifier: "UserSummary" }) as any as S.Schema<UserSummary>;
export type UserSummaryList = UserSummary[];
export const UserSummaryList = S.Array(UserSummary);
export interface Group {
  SID?: string;
  SAMAccountName: string;
  DistinguishedName?: string;
  GroupType?: string;
  GroupScope?: string;
  OtherAttributes?: Attributes;
}
export const Group = S.suspend(() =>
  S.Struct({
    SID: S.optional(S.String),
    SAMAccountName: S.String,
    DistinguishedName: S.optional(S.String),
    GroupType: S.optional(S.String),
    GroupScope: S.optional(S.String),
    OtherAttributes: S.optional(Attributes),
  }),
).annotations({ identifier: "Group" }) as any as S.Schema<Group>;
export type GroupList = Group[];
export const GroupList = S.Array(Group);
export interface User {
  SID?: string;
  SAMAccountName: string;
  DistinguishedName?: string;
  UserPrincipalName?: string;
  EmailAddress?: string;
  GivenName?: string;
  Surname?: string;
  Enabled?: boolean;
  OtherAttributes?: Attributes;
}
export const User = S.suspend(() =>
  S.Struct({
    SID: S.optional(S.String),
    SAMAccountName: S.String,
    DistinguishedName: S.optional(S.String),
    UserPrincipalName: S.optional(S.String),
    EmailAddress: S.optional(S.String),
    GivenName: S.optional(S.String),
    Surname: S.optional(S.String),
    Enabled: S.optional(S.Boolean),
    OtherAttributes: S.optional(Attributes),
  }),
).annotations({ identifier: "User" }) as any as S.Schema<User>;
export type UserList = User[];
export const UserList = S.Array(User);
export interface CreateGroupRequest {
  DirectoryId: string;
  SAMAccountName: string;
  GroupType?: string;
  GroupScope?: string;
  OtherAttributes?: Attributes;
  ClientToken?: string;
}
export const CreateGroupRequest = S.suspend(() =>
  S.Struct({
    DirectoryId: S.String.pipe(T.HttpQuery("DirectoryId")),
    SAMAccountName: S.String,
    GroupType: S.optional(S.String),
    GroupScope: S.optional(S.String),
    OtherAttributes: S.optional(Attributes),
    ClientToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/Groups/CreateGroup" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "CreateGroupRequest",
}) as any as S.Schema<CreateGroupRequest>;
export interface ListGroupMembersResult {
  DirectoryId?: string;
  Realm?: string;
  MemberRealm?: string;
  Members?: MemberList;
  NextToken?: string;
}
export const ListGroupMembersResult = S.suspend(() =>
  S.Struct({
    DirectoryId: S.optional(S.String),
    Realm: S.optional(S.String),
    MemberRealm: S.optional(S.String),
    Members: S.optional(MemberList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotations({
  identifier: "ListGroupMembersResult",
}) as any as S.Schema<ListGroupMembersResult>;
export interface ListGroupsResult {
  DirectoryId?: string;
  Realm?: string;
  Groups?: GroupSummaryList;
  NextToken?: string;
}
export const ListGroupsResult = S.suspend(() =>
  S.Struct({
    DirectoryId: S.optional(S.String),
    Realm: S.optional(S.String),
    Groups: S.optional(GroupSummaryList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotations({
  identifier: "ListGroupsResult",
}) as any as S.Schema<ListGroupsResult>;
export interface ListUsersResult {
  DirectoryId?: string;
  Realm?: string;
  Users?: UserSummaryList;
  NextToken?: string;
}
export const ListUsersResult = S.suspend(() =>
  S.Struct({
    DirectoryId: S.optional(S.String),
    Realm: S.optional(S.String),
    Users: S.optional(UserSummaryList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotations({
  identifier: "ListUsersResult",
}) as any as S.Schema<ListUsersResult>;
export interface SearchGroupsResult {
  DirectoryId?: string;
  Realm?: string;
  Groups?: GroupList;
  NextToken?: string;
}
export const SearchGroupsResult = S.suspend(() =>
  S.Struct({
    DirectoryId: S.optional(S.String),
    Realm: S.optional(S.String),
    Groups: S.optional(GroupList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotations({
  identifier: "SearchGroupsResult",
}) as any as S.Schema<SearchGroupsResult>;
export interface SearchUsersResult {
  DirectoryId?: string;
  Realm?: string;
  Users?: UserList;
  NextToken?: string;
}
export const SearchUsersResult = S.suspend(() =>
  S.Struct({
    DirectoryId: S.optional(S.String),
    Realm: S.optional(S.String),
    Users: S.optional(UserList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotations({
  identifier: "SearchUsersResult",
}) as any as S.Schema<SearchUsersResult>;
export interface CreateGroupResult {
  DirectoryId?: string;
  SAMAccountName?: string;
  SID?: string;
}
export const CreateGroupResult = S.suspend(() =>
  S.Struct({
    DirectoryId: S.optional(S.String),
    SAMAccountName: S.optional(S.String),
    SID: S.optional(S.String),
  }).pipe(ns),
).annotations({
  identifier: "CreateGroupResult",
}) as any as S.Schema<CreateGroupResult>;

//# Errors
export class AccessDeniedException extends S.TaggedError<AccessDeniedException>()(
  "AccessDeniedException",
  { Message: S.optional(S.String), Reason: S.optional(S.String) },
) {}
export class ConflictException extends S.TaggedError<ConflictException>()(
  "ConflictException",
  { Message: S.optional(S.String) },
) {}
export class DirectoryUnavailableException extends S.TaggedError<DirectoryUnavailableException>()(
  "DirectoryUnavailableException",
  { Message: S.optional(S.String), Reason: S.optional(S.String) },
  T.Retryable(),
) {}
export class InternalServerException extends S.TaggedError<InternalServerException>()(
  "InternalServerException",
  { Message: S.optional(S.String) },
  T.Retryable(),
).pipe(withCategory(ERROR_CATEGORIES.SERVER_ERROR)) {}
export class ResourceNotFoundException extends S.TaggedError<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { Message: S.optional(S.String) },
) {}
export class ThrottlingException extends S.TaggedError<ThrottlingException>()(
  "ThrottlingException",
  {
    Message: S.String,
    RetryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
  },
  T.Retryable({ throttling: true }),
).pipe(withCategory(ERROR_CATEGORIES.THROTTLING_ERROR)) {}
export class ValidationException extends S.TaggedError<ValidationException>()(
  "ValidationException",
  { Message: S.optional(S.String), Reason: S.optional(S.String) },
) {}

//# Operations
/**
 * Returns group information for the specified directory.
 *
 * This operation supports pagination with the use of the `NextToken` request and
 * response parameters. If more results are available, the `ListGroups.NextToken`
 * member contains a token that you pass in the next call to `ListGroups`. This
 * retrieves the next set of items.
 *
 * You can also specify a maximum number of return results with the `MaxResults`
 * parameter.
 */
export const listGroups = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListGroupsRequest,
  output: ListGroupsResult,
  errors: [
    AccessDeniedException,
    DirectoryUnavailableException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Groups",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns member information for the specified group.
 *
 * This operation supports pagination with the use of the `NextToken` request and
 * response parameters. If more results are available, the
 * `ListGroupMembers.NextToken` member contains a token that you pass in the next
 * call to `ListGroupMembers`. This retrieves the next set of items.
 *
 * You can also specify a maximum number of return results with the `MaxResults`
 * parameter.
 */
export const listGroupMembers = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(
  () => ({
    input: ListGroupMembersRequest,
    output: ListGroupMembersResult,
    errors: [
      AccessDeniedException,
      DirectoryUnavailableException,
      InternalServerException,
      ResourceNotFoundException,
      ThrottlingException,
      ValidationException,
    ],
    pagination: {
      inputToken: "NextToken",
      outputToken: "NextToken",
      items: "Members",
      pageSize: "MaxResults",
    } as const,
  }),
);
/**
 * Deletes a group.
 */
export const deleteGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteGroupRequest,
  output: DeleteGroupResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    DirectoryUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes a user.
 */
export const deleteUser = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteUserRequest,
  output: DeleteUserResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    DirectoryUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deactivates an active user account. For information about how to enable an inactive user
 * account, see ResetUserPassword
 * in the *Directory Service API Reference*.
 */
export const disableUser = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisableUserRequest,
  output: DisableUserResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    DirectoryUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Removes a member from a group.
 */
export const removeGroupMember = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RemoveGroupMemberRequest,
  output: RemoveGroupMemberResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    DirectoryUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates group information.
 */
export const updateGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateGroupRequest,
  output: UpdateGroupResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    DirectoryUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates user information.
 */
export const updateUser = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateUserRequest,
  output: UpdateUserResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    DirectoryUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Returns information about a specific user.
 */
export const describeUser = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeUserRequest,
  output: DescribeUserResult,
  errors: [
    AccessDeniedException,
    DirectoryUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Returns group information for the specified member.
 *
 * This operation supports pagination with the use of the `NextToken` request and
 * response parameters. If more results are available, the
 * `ListGroupsForMember.NextToken` member contains a token that you pass in the next
 * call to `ListGroupsForMember`. This retrieves the next set of items.
 *
 * You can also specify a maximum number of return results with the `MaxResults`
 * parameter.
 */
export const listGroupsForMember =
  /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
    input: ListGroupsForMemberRequest,
    output: ListGroupsForMemberResult,
    errors: [
      AccessDeniedException,
      DirectoryUnavailableException,
      InternalServerException,
      ResourceNotFoundException,
      ThrottlingException,
      ValidationException,
    ],
    pagination: {
      inputToken: "NextToken",
      outputToken: "NextToken",
      items: "Groups",
      pageSize: "MaxResults",
    } as const,
  }));
/**
 * Adds an existing user, group, or computer as a group member.
 */
export const addGroupMember = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AddGroupMemberRequest,
  output: AddGroupMemberResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    DirectoryUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Returns user information for the specified directory.
 *
 * This operation supports pagination with the use of the `NextToken` request and
 * response parameters. If more results are available, the `ListUsers.NextToken`
 * member contains a token that you pass in the next call to `ListUsers`. This
 * retrieves the next set of items.
 *
 * You can also specify a maximum number of return results with the `MaxResults`
 * parameter.
 */
export const listUsers = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListUsersRequest,
  output: ListUsersResult,
  errors: [
    AccessDeniedException,
    DirectoryUnavailableException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Users",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Searches the specified directory for a group. You can find groups that match the
 * `SearchString` parameter with the value of their attributes included in the
 * `SearchString` parameter.
 *
 * This operation supports pagination with the use of the `NextToken` request and
 * response parameters. If more results are available, the `SearchGroups.NextToken`
 * member contains a token that you pass in the next call to `SearchGroups`. This
 * retrieves the next set of items.
 *
 * You can also specify a maximum number of return results with the `MaxResults`
 * parameter.
 */
export const searchGroups = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(
  () => ({
    input: SearchGroupsRequest,
    output: SearchGroupsResult,
    errors: [
      AccessDeniedException,
      DirectoryUnavailableException,
      InternalServerException,
      ThrottlingException,
      ValidationException,
    ],
    pagination: {
      inputToken: "NextToken",
      outputToken: "NextToken",
      items: "Groups",
      pageSize: "MaxResults",
    } as const,
  }),
);
/**
 * Searches the specified directory for a user. You can find users that match the
 * `SearchString` parameter with the value of their attributes included in the
 * `SearchString` parameter.
 *
 * This operation supports pagination with the use of the `NextToken` request and
 * response parameters. If more results are available, the `SearchUsers.NextToken`
 * member contains a token that you pass in the next call to `SearchUsers`. This
 * retrieves the next set of items.
 *
 * You can also specify a maximum number of return results with the `MaxResults`
 * parameter.
 */
export const searchUsers = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(
  () => ({
    input: SearchUsersRequest,
    output: SearchUsersResult,
    errors: [
      AccessDeniedException,
      DirectoryUnavailableException,
      InternalServerException,
      ThrottlingException,
      ValidationException,
    ],
    pagination: {
      inputToken: "NextToken",
      outputToken: "NextToken",
      items: "Users",
      pageSize: "MaxResults",
    } as const,
  }),
);
/**
 * Creates a new user.
 */
export const createUser = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateUserRequest,
  output: CreateUserResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    DirectoryUnavailableException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates a new group.
 */
export const createGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateGroupRequest,
  output: CreateGroupResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    DirectoryUnavailableException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Returns information about a specific group.
 */
export const describeGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeGroupRequest,
  output: DescribeGroupResult,
  errors: [
    AccessDeniedException,
    DirectoryUnavailableException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
