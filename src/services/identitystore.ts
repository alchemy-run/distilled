import * as S from "effect/Schema";
import * as API from "../api.ts";
import * as T from "../traits.ts";
import { ERROR_CATEGORIES, withCategory } from "../error-category.ts";
const svc = T.AwsApiService({
  sdkId: "identitystore",
  serviceShapeName: "AWSIdentityStore",
});
const auth = T.AwsAuthSigv4({ name: "identitystore" });
const ver = T.ServiceVersion("2020-06-15");
const proto = T.AwsProtocolsAwsJson1_1();
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
                        url: "https://identitystore-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
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
                      conditions: [
                        {
                          fn: "stringEquals",
                          argv: [
                            {
                              fn: "getAttr",
                              argv: [{ ref: "PartitionResult" }, "name"],
                            },
                            "aws-us-gov",
                          ],
                        },
                      ],
                      endpoint: {
                        url: "https://identitystore.{Region}.amazonaws.com",
                        properties: {},
                        headers: {},
                      },
                      type: "endpoint",
                    },
                    {
                      conditions: [],
                      endpoint: {
                        url: "https://identitystore-fips.{Region}.{PartitionResult#dnsSuffix}",
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
                        url: "https://identitystore.{Region}.{PartitionResult#dualStackDnsSuffix}",
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
                url: "https://identitystore.{Region}.{PartitionResult#dnsSuffix}",
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
export type GroupIds = string[];
export const GroupIds = S.Array(S.String);
export type ExtensionNames = string[];
export const ExtensionNames = S.Array(S.String);
export interface ExternalId {
  Issuer: string;
  Id: string;
}
export const ExternalId = S.suspend(() =>
  S.Struct({ Issuer: S.String, Id: S.String }),
).annotations({ identifier: "ExternalId" }) as any as S.Schema<ExternalId>;
export interface UniqueAttribute {
  AttributePath: string;
  AttributeValue: any;
}
export const UniqueAttribute = S.suspend(() =>
  S.Struct({ AttributePath: S.String, AttributeValue: S.Any }),
).annotations({
  identifier: "UniqueAttribute",
}) as any as S.Schema<UniqueAttribute>;
export const AlternateIdentifier = S.Union(
  S.Struct({ ExternalId: ExternalId }),
  S.Struct({ UniqueAttribute: UniqueAttribute }),
);
export interface GetUserIdRequest {
  IdentityStoreId: string;
  AlternateIdentifier: (typeof AlternateIdentifier)["Type"];
}
export const GetUserIdRequest = S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    AlternateIdentifier: AlternateIdentifier,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotations({
  identifier: "GetUserIdRequest",
}) as any as S.Schema<GetUserIdRequest>;
export const MemberId = S.Union(S.Struct({ UserId: S.String }));
export interface IsMemberInGroupsRequest {
  IdentityStoreId: string;
  MemberId: (typeof MemberId)["Type"];
  GroupIds: GroupIds;
}
export const IsMemberInGroupsRequest = S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    MemberId: MemberId,
    GroupIds: GroupIds,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotations({
  identifier: "IsMemberInGroupsRequest",
}) as any as S.Schema<IsMemberInGroupsRequest>;
export interface ListGroupMembershipsForMemberRequest {
  IdentityStoreId: string;
  MemberId: (typeof MemberId)["Type"];
  MaxResults?: number;
  NextToken?: string;
}
export const ListGroupMembershipsForMemberRequest = S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    MemberId: MemberId,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotations({
  identifier: "ListGroupMembershipsForMemberRequest",
}) as any as S.Schema<ListGroupMembershipsForMemberRequest>;
export interface CreateGroupMembershipRequest {
  IdentityStoreId: string;
  GroupId: string;
  MemberId: (typeof MemberId)["Type"];
}
export const CreateGroupMembershipRequest = S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    GroupId: S.String,
    MemberId: MemberId,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotations({
  identifier: "CreateGroupMembershipRequest",
}) as any as S.Schema<CreateGroupMembershipRequest>;
export interface DescribeGroupMembershipRequest {
  IdentityStoreId: string;
  MembershipId: string;
}
export const DescribeGroupMembershipRequest = S.suspend(() =>
  S.Struct({ IdentityStoreId: S.String, MembershipId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotations({
  identifier: "DescribeGroupMembershipRequest",
}) as any as S.Schema<DescribeGroupMembershipRequest>;
export interface DeleteGroupMembershipRequest {
  IdentityStoreId: string;
  MembershipId: string;
}
export const DeleteGroupMembershipRequest = S.suspend(() =>
  S.Struct({ IdentityStoreId: S.String, MembershipId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotations({
  identifier: "DeleteGroupMembershipRequest",
}) as any as S.Schema<DeleteGroupMembershipRequest>;
export interface DeleteGroupMembershipResponse {}
export const DeleteGroupMembershipResponse = S.suspend(() =>
  S.Struct({}),
).annotations({
  identifier: "DeleteGroupMembershipResponse",
}) as any as S.Schema<DeleteGroupMembershipResponse>;
export interface ListGroupMembershipsRequest {
  IdentityStoreId: string;
  GroupId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListGroupMembershipsRequest = S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    GroupId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotations({
  identifier: "ListGroupMembershipsRequest",
}) as any as S.Schema<ListGroupMembershipsRequest>;
export interface CreateGroupRequest {
  IdentityStoreId: string;
  DisplayName?: string;
  Description?: string;
}
export const CreateGroupRequest = S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    DisplayName: S.optional(S.String),
    Description: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotations({
  identifier: "CreateGroupRequest",
}) as any as S.Schema<CreateGroupRequest>;
export interface DescribeGroupRequest {
  IdentityStoreId: string;
  GroupId: string;
}
export const DescribeGroupRequest = S.suspend(() =>
  S.Struct({ IdentityStoreId: S.String, GroupId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotations({
  identifier: "DescribeGroupRequest",
}) as any as S.Schema<DescribeGroupRequest>;
export interface DeleteGroupRequest {
  IdentityStoreId: string;
  GroupId: string;
}
export const DeleteGroupRequest = S.suspend(() =>
  S.Struct({ IdentityStoreId: S.String, GroupId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotations({
  identifier: "DeleteGroupRequest",
}) as any as S.Schema<DeleteGroupRequest>;
export interface DeleteGroupResponse {}
export const DeleteGroupResponse = S.suspend(() => S.Struct({})).annotations({
  identifier: "DeleteGroupResponse",
}) as any as S.Schema<DeleteGroupResponse>;
export interface DescribeUserRequest {
  IdentityStoreId: string;
  UserId: string;
  Extensions?: ExtensionNames;
}
export const DescribeUserRequest = S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    UserId: S.String,
    Extensions: S.optional(ExtensionNames),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotations({
  identifier: "DescribeUserRequest",
}) as any as S.Schema<DescribeUserRequest>;
export interface AttributeOperation {
  AttributePath: string;
  AttributeValue?: any;
}
export const AttributeOperation = S.suspend(() =>
  S.Struct({ AttributePath: S.String, AttributeValue: S.optional(S.Any) }),
).annotations({
  identifier: "AttributeOperation",
}) as any as S.Schema<AttributeOperation>;
export type AttributeOperations = AttributeOperation[];
export const AttributeOperations = S.Array(AttributeOperation);
export interface UpdateUserRequest {
  IdentityStoreId: string;
  UserId: string;
  Operations: AttributeOperations;
}
export const UpdateUserRequest = S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    UserId: S.String,
    Operations: AttributeOperations,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotations({
  identifier: "UpdateUserRequest",
}) as any as S.Schema<UpdateUserRequest>;
export interface UpdateUserResponse {}
export const UpdateUserResponse = S.suspend(() => S.Struct({})).annotations({
  identifier: "UpdateUserResponse",
}) as any as S.Schema<UpdateUserResponse>;
export interface DeleteUserRequest {
  IdentityStoreId: string;
  UserId: string;
}
export const DeleteUserRequest = S.suspend(() =>
  S.Struct({ IdentityStoreId: S.String, UserId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotations({
  identifier: "DeleteUserRequest",
}) as any as S.Schema<DeleteUserRequest>;
export interface DeleteUserResponse {}
export const DeleteUserResponse = S.suspend(() => S.Struct({})).annotations({
  identifier: "DeleteUserResponse",
}) as any as S.Schema<DeleteUserResponse>;
export interface Filter {
  AttributePath: string;
  AttributeValue: string;
}
export const Filter = S.suspend(() =>
  S.Struct({ AttributePath: S.String, AttributeValue: S.String }),
).annotations({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type Filters = Filter[];
export const Filters = S.Array(Filter);
export interface ListUsersRequest {
  IdentityStoreId: string;
  Extensions?: ExtensionNames;
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filters;
}
export const ListUsersRequest = S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    Extensions: S.optional(ExtensionNames),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(Filters),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotations({
  identifier: "ListUsersRequest",
}) as any as S.Schema<ListUsersRequest>;
export type ExternalIds = ExternalId[];
export const ExternalIds = S.Array(ExternalId);
export interface Name {
  Formatted?: string;
  FamilyName?: string;
  GivenName?: string;
  MiddleName?: string;
  HonorificPrefix?: string;
  HonorificSuffix?: string;
}
export const Name = S.suspend(() =>
  S.Struct({
    Formatted: S.optional(S.String),
    FamilyName: S.optional(S.String),
    GivenName: S.optional(S.String),
    MiddleName: S.optional(S.String),
    HonorificPrefix: S.optional(S.String),
    HonorificSuffix: S.optional(S.String),
  }),
).annotations({ identifier: "Name" }) as any as S.Schema<Name>;
export interface Email {
  Value?: string;
  Type?: string;
  Primary?: boolean;
}
export const Email = S.suspend(() =>
  S.Struct({
    Value: S.optional(S.String),
    Type: S.optional(S.String),
    Primary: S.optional(S.Boolean),
  }),
).annotations({ identifier: "Email" }) as any as S.Schema<Email>;
export type Emails = Email[];
export const Emails = S.Array(Email);
export interface Address {
  StreetAddress?: string;
  Locality?: string;
  Region?: string;
  PostalCode?: string;
  Country?: string;
  Formatted?: string;
  Type?: string;
  Primary?: boolean;
}
export const Address = S.suspend(() =>
  S.Struct({
    StreetAddress: S.optional(S.String),
    Locality: S.optional(S.String),
    Region: S.optional(S.String),
    PostalCode: S.optional(S.String),
    Country: S.optional(S.String),
    Formatted: S.optional(S.String),
    Type: S.optional(S.String),
    Primary: S.optional(S.Boolean),
  }),
).annotations({ identifier: "Address" }) as any as S.Schema<Address>;
export type Addresses = Address[];
export const Addresses = S.Array(Address);
export interface PhoneNumber {
  Value?: string;
  Type?: string;
  Primary?: boolean;
}
export const PhoneNumber = S.suspend(() =>
  S.Struct({
    Value: S.optional(S.String),
    Type: S.optional(S.String),
    Primary: S.optional(S.Boolean),
  }),
).annotations({ identifier: "PhoneNumber" }) as any as S.Schema<PhoneNumber>;
export type PhoneNumbers = PhoneNumber[];
export const PhoneNumbers = S.Array(PhoneNumber);
export interface Photo {
  Value: string;
  Type?: string;
  Display?: string;
  Primary?: boolean;
}
export const Photo = S.suspend(() =>
  S.Struct({
    Value: S.String,
    Type: S.optional(S.String),
    Display: S.optional(S.String),
    Primary: S.optional(S.Boolean),
  }),
).annotations({ identifier: "Photo" }) as any as S.Schema<Photo>;
export type Photos = Photo[];
export const Photos = S.Array(Photo);
export type Extensions = { [key: string]: any };
export const Extensions = S.Record({ key: S.String, value: S.Any });
export interface GetGroupMembershipIdRequest {
  IdentityStoreId: string;
  GroupId: string;
  MemberId: (typeof MemberId)["Type"];
}
export const GetGroupMembershipIdRequest = S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    GroupId: S.String,
    MemberId: MemberId,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotations({
  identifier: "GetGroupMembershipIdRequest",
}) as any as S.Schema<GetGroupMembershipIdRequest>;
export interface GetUserIdResponse {
  IdentityStoreId: string;
  UserId: string;
}
export const GetUserIdResponse = S.suspend(() =>
  S.Struct({ IdentityStoreId: S.String, UserId: S.String }),
).annotations({
  identifier: "GetUserIdResponse",
}) as any as S.Schema<GetUserIdResponse>;
export interface CreateGroupMembershipResponse {
  MembershipId: string;
  IdentityStoreId: string;
}
export const CreateGroupMembershipResponse = S.suspend(() =>
  S.Struct({ MembershipId: S.String, IdentityStoreId: S.String }),
).annotations({
  identifier: "CreateGroupMembershipResponse",
}) as any as S.Schema<CreateGroupMembershipResponse>;
export interface DescribeGroupMembershipResponse {
  IdentityStoreId: string;
  MembershipId: string;
  GroupId: string;
  MemberId: (typeof MemberId)["Type"];
  CreatedAt?: Date;
  UpdatedAt?: Date;
  CreatedBy?: string;
  UpdatedBy?: string;
}
export const DescribeGroupMembershipResponse = S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    MembershipId: S.String,
    GroupId: S.String,
    MemberId: MemberId,
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedBy: S.optional(S.String),
    UpdatedBy: S.optional(S.String),
  }),
).annotations({
  identifier: "DescribeGroupMembershipResponse",
}) as any as S.Schema<DescribeGroupMembershipResponse>;
export interface GroupMembership {
  IdentityStoreId: string;
  MembershipId?: string;
  GroupId?: string;
  MemberId?: (typeof MemberId)["Type"];
  CreatedAt?: Date;
  UpdatedAt?: Date;
  CreatedBy?: string;
  UpdatedBy?: string;
}
export const GroupMembership = S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    MembershipId: S.optional(S.String),
    GroupId: S.optional(S.String),
    MemberId: S.optional(MemberId),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedBy: S.optional(S.String),
    UpdatedBy: S.optional(S.String),
  }),
).annotations({
  identifier: "GroupMembership",
}) as any as S.Schema<GroupMembership>;
export type GroupMemberships = GroupMembership[];
export const GroupMemberships = S.Array(GroupMembership);
export interface ListGroupMembershipsResponse {
  GroupMemberships: GroupMemberships;
  NextToken?: string;
}
export const ListGroupMembershipsResponse = S.suspend(() =>
  S.Struct({
    GroupMemberships: GroupMemberships,
    NextToken: S.optional(S.String),
  }),
).annotations({
  identifier: "ListGroupMembershipsResponse",
}) as any as S.Schema<ListGroupMembershipsResponse>;
export interface CreateGroupResponse {
  GroupId: string;
  IdentityStoreId: string;
}
export const CreateGroupResponse = S.suspend(() =>
  S.Struct({ GroupId: S.String, IdentityStoreId: S.String }),
).annotations({
  identifier: "CreateGroupResponse",
}) as any as S.Schema<CreateGroupResponse>;
export interface DescribeGroupResponse {
  GroupId: string;
  DisplayName?: string;
  ExternalIds?: ExternalIds;
  Description?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  CreatedBy?: string;
  UpdatedBy?: string;
  IdentityStoreId: string;
}
export const DescribeGroupResponse = S.suspend(() =>
  S.Struct({
    GroupId: S.String,
    DisplayName: S.optional(S.String),
    ExternalIds: S.optional(ExternalIds),
    Description: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedBy: S.optional(S.String),
    UpdatedBy: S.optional(S.String),
    IdentityStoreId: S.String,
  }),
).annotations({
  identifier: "DescribeGroupResponse",
}) as any as S.Schema<DescribeGroupResponse>;
export interface UpdateGroupRequest {
  IdentityStoreId: string;
  GroupId: string;
  Operations: AttributeOperations;
}
export const UpdateGroupRequest = S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    GroupId: S.String,
    Operations: AttributeOperations,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotations({
  identifier: "UpdateGroupRequest",
}) as any as S.Schema<UpdateGroupRequest>;
export interface UpdateGroupResponse {}
export const UpdateGroupResponse = S.suspend(() => S.Struct({})).annotations({
  identifier: "UpdateGroupResponse",
}) as any as S.Schema<UpdateGroupResponse>;
export interface ListGroupsRequest {
  IdentityStoreId: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filters;
}
export const ListGroupsRequest = S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(Filters),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotations({
  identifier: "ListGroupsRequest",
}) as any as S.Schema<ListGroupsRequest>;
export interface CreateUserRequest {
  IdentityStoreId: string;
  UserName?: string;
  Name?: Name;
  DisplayName?: string;
  NickName?: string;
  ProfileUrl?: string;
  Emails?: Emails;
  Addresses?: Addresses;
  PhoneNumbers?: PhoneNumbers;
  UserType?: string;
  Title?: string;
  PreferredLanguage?: string;
  Locale?: string;
  Timezone?: string;
  Photos?: Photos;
  Website?: string;
  Birthdate?: string;
  Extensions?: Extensions;
}
export const CreateUserRequest = S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    UserName: S.optional(S.String),
    Name: S.optional(Name),
    DisplayName: S.optional(S.String),
    NickName: S.optional(S.String),
    ProfileUrl: S.optional(S.String),
    Emails: S.optional(Emails),
    Addresses: S.optional(Addresses),
    PhoneNumbers: S.optional(PhoneNumbers),
    UserType: S.optional(S.String),
    Title: S.optional(S.String),
    PreferredLanguage: S.optional(S.String),
    Locale: S.optional(S.String),
    Timezone: S.optional(S.String),
    Photos: S.optional(Photos),
    Website: S.optional(S.String),
    Birthdate: S.optional(S.String),
    Extensions: S.optional(Extensions),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotations({
  identifier: "CreateUserRequest",
}) as any as S.Schema<CreateUserRequest>;
export interface DescribeUserResponse {
  IdentityStoreId: string;
  UserId: string;
  UserName?: string;
  ExternalIds?: ExternalIds;
  Name?: Name;
  DisplayName?: string;
  NickName?: string;
  ProfileUrl?: string;
  Emails?: Emails;
  Addresses?: Addresses;
  PhoneNumbers?: PhoneNumbers;
  UserType?: string;
  Title?: string;
  PreferredLanguage?: string;
  Locale?: string;
  Timezone?: string;
  UserStatus?: string;
  Photos?: Photos;
  Website?: string;
  Birthdate?: string;
  CreatedAt?: Date;
  CreatedBy?: string;
  UpdatedAt?: Date;
  UpdatedBy?: string;
  Extensions?: Extensions;
}
export const DescribeUserResponse = S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    UserId: S.String,
    UserName: S.optional(S.String),
    ExternalIds: S.optional(ExternalIds),
    Name: S.optional(Name),
    DisplayName: S.optional(S.String),
    NickName: S.optional(S.String),
    ProfileUrl: S.optional(S.String),
    Emails: S.optional(Emails),
    Addresses: S.optional(Addresses),
    PhoneNumbers: S.optional(PhoneNumbers),
    UserType: S.optional(S.String),
    Title: S.optional(S.String),
    PreferredLanguage: S.optional(S.String),
    Locale: S.optional(S.String),
    Timezone: S.optional(S.String),
    UserStatus: S.optional(S.String),
    Photos: S.optional(Photos),
    Website: S.optional(S.String),
    Birthdate: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedBy: S.optional(S.String),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedBy: S.optional(S.String),
    Extensions: S.optional(Extensions),
  }),
).annotations({
  identifier: "DescribeUserResponse",
}) as any as S.Schema<DescribeUserResponse>;
export interface GroupMembershipExistenceResult {
  GroupId?: string;
  MemberId?: (typeof MemberId)["Type"];
  MembershipExists?: boolean;
}
export const GroupMembershipExistenceResult = S.suspend(() =>
  S.Struct({
    GroupId: S.optional(S.String),
    MemberId: S.optional(MemberId),
    MembershipExists: S.optional(S.Boolean),
  }),
).annotations({
  identifier: "GroupMembershipExistenceResult",
}) as any as S.Schema<GroupMembershipExistenceResult>;
export type GroupMembershipExistenceResults = GroupMembershipExistenceResult[];
export const GroupMembershipExistenceResults = S.Array(
  GroupMembershipExistenceResult,
);
export interface User {
  IdentityStoreId: string;
  UserId: string;
  UserName?: string;
  ExternalIds?: ExternalIds;
  Name?: Name;
  DisplayName?: string;
  NickName?: string;
  ProfileUrl?: string;
  Emails?: Emails;
  Addresses?: Addresses;
  PhoneNumbers?: PhoneNumbers;
  UserType?: string;
  Title?: string;
  PreferredLanguage?: string;
  Locale?: string;
  Timezone?: string;
  UserStatus?: string;
  Photos?: Photos;
  Website?: string;
  Birthdate?: string;
  CreatedAt?: Date;
  CreatedBy?: string;
  UpdatedAt?: Date;
  UpdatedBy?: string;
  Extensions?: Extensions;
}
export const User = S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    UserId: S.String,
    UserName: S.optional(S.String),
    ExternalIds: S.optional(ExternalIds),
    Name: S.optional(Name),
    DisplayName: S.optional(S.String),
    NickName: S.optional(S.String),
    ProfileUrl: S.optional(S.String),
    Emails: S.optional(Emails),
    Addresses: S.optional(Addresses),
    PhoneNumbers: S.optional(PhoneNumbers),
    UserType: S.optional(S.String),
    Title: S.optional(S.String),
    PreferredLanguage: S.optional(S.String),
    Locale: S.optional(S.String),
    Timezone: S.optional(S.String),
    UserStatus: S.optional(S.String),
    Photos: S.optional(Photos),
    Website: S.optional(S.String),
    Birthdate: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedBy: S.optional(S.String),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedBy: S.optional(S.String),
    Extensions: S.optional(Extensions),
  }),
).annotations({ identifier: "User" }) as any as S.Schema<User>;
export type Users = User[];
export const Users = S.Array(User);
export interface GetGroupIdRequest {
  IdentityStoreId: string;
  AlternateIdentifier: (typeof AlternateIdentifier)["Type"];
}
export const GetGroupIdRequest = S.suspend(() =>
  S.Struct({
    IdentityStoreId: S.String,
    AlternateIdentifier: AlternateIdentifier,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotations({
  identifier: "GetGroupIdRequest",
}) as any as S.Schema<GetGroupIdRequest>;
export interface GetGroupMembershipIdResponse {
  MembershipId: string;
  IdentityStoreId: string;
}
export const GetGroupMembershipIdResponse = S.suspend(() =>
  S.Struct({ MembershipId: S.String, IdentityStoreId: S.String }),
).annotations({
  identifier: "GetGroupMembershipIdResponse",
}) as any as S.Schema<GetGroupMembershipIdResponse>;
export interface IsMemberInGroupsResponse {
  Results: GroupMembershipExistenceResults;
}
export const IsMemberInGroupsResponse = S.suspend(() =>
  S.Struct({ Results: GroupMembershipExistenceResults }),
).annotations({
  identifier: "IsMemberInGroupsResponse",
}) as any as S.Schema<IsMemberInGroupsResponse>;
export interface ListGroupMembershipsForMemberResponse {
  GroupMemberships: GroupMemberships;
  NextToken?: string;
}
export const ListGroupMembershipsForMemberResponse = S.suspend(() =>
  S.Struct({
    GroupMemberships: GroupMemberships,
    NextToken: S.optional(S.String),
  }),
).annotations({
  identifier: "ListGroupMembershipsForMemberResponse",
}) as any as S.Schema<ListGroupMembershipsForMemberResponse>;
export interface CreateUserResponse {
  IdentityStoreId: string;
  UserId: string;
}
export const CreateUserResponse = S.suspend(() =>
  S.Struct({ IdentityStoreId: S.String, UserId: S.String }),
).annotations({
  identifier: "CreateUserResponse",
}) as any as S.Schema<CreateUserResponse>;
export interface ListUsersResponse {
  Users: Users;
  NextToken?: string;
}
export const ListUsersResponse = S.suspend(() =>
  S.Struct({ Users: Users, NextToken: S.optional(S.String) }),
).annotations({
  identifier: "ListUsersResponse",
}) as any as S.Schema<ListUsersResponse>;
export interface Group {
  GroupId: string;
  DisplayName?: string;
  ExternalIds?: ExternalIds;
  Description?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  CreatedBy?: string;
  UpdatedBy?: string;
  IdentityStoreId: string;
}
export const Group = S.suspend(() =>
  S.Struct({
    GroupId: S.String,
    DisplayName: S.optional(S.String),
    ExternalIds: S.optional(ExternalIds),
    Description: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedBy: S.optional(S.String),
    UpdatedBy: S.optional(S.String),
    IdentityStoreId: S.String,
  }),
).annotations({ identifier: "Group" }) as any as S.Schema<Group>;
export type Groups = Group[];
export const Groups = S.Array(Group);
export interface GetGroupIdResponse {
  GroupId: string;
  IdentityStoreId: string;
}
export const GetGroupIdResponse = S.suspend(() =>
  S.Struct({ GroupId: S.String, IdentityStoreId: S.String }),
).annotations({
  identifier: "GetGroupIdResponse",
}) as any as S.Schema<GetGroupIdResponse>;
export interface ListGroupsResponse {
  Groups: Groups;
  NextToken?: string;
}
export const ListGroupsResponse = S.suspend(() =>
  S.Struct({ Groups: Groups, NextToken: S.optional(S.String) }),
).annotations({
  identifier: "ListGroupsResponse",
}) as any as S.Schema<ListGroupsResponse>;

//# Errors
export class ConflictException extends S.TaggedError<ConflictException>()(
  "ConflictException",
  {
    Message: S.optional(S.String),
    RequestId: S.optional(S.String),
    Reason: S.optional(S.String),
  },
) {}
export class ResourceNotFoundException extends S.TaggedError<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  {
    ResourceType: S.optional(S.String),
    ResourceId: S.optional(S.String),
    Reason: S.optional(S.String),
    Message: S.optional(S.String),
    RequestId: S.optional(S.String),
  },
) {}
export class ValidationException extends S.TaggedError<ValidationException>()(
  "ValidationException",
  {
    Message: S.optional(S.String),
    RequestId: S.optional(S.String),
    Reason: S.optional(S.String),
  },
) {}
export class ServiceQuotaExceededException extends S.TaggedError<ServiceQuotaExceededException>()(
  "ServiceQuotaExceededException",
  { Message: S.optional(S.String), RequestId: S.optional(S.String) },
) {}

//# Operations
/**
 * Retrieves the `UserId` in an identity store.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const getUserId = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetUserIdRequest,
  output: GetUserIdResponse,
  errors: [ResourceNotFoundException, ValidationException],
}));
/**
 * Lists all groups in the identity store. Returns a paginated list of complete `Group` objects. Filtering for a `Group` by the `DisplayName` attribute is deprecated. Instead, use the `GetGroupId` API action.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const listGroups = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListGroupsRequest,
  output: ListGroupsResponse,
  errors: [ResourceNotFoundException, ValidationException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Groups",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Creates a user within the specified identity store.
 */
export const createUser = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateUserRequest,
  output: CreateUserResponse,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
}));
/**
 * Checks the user's membership in all requested groups and returns if the member exists in all queried groups.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const isMemberInGroups = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: IsMemberInGroupsRequest,
  output: IsMemberInGroupsResponse,
  errors: [ResourceNotFoundException, ValidationException],
}));
/**
 * For the specified member in the specified identity store, returns the list of all ` GroupMembership` objects and returns results in paginated form.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const listGroupMembershipsForMember =
  /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
    input: ListGroupMembershipsForMemberRequest,
    output: ListGroupMembershipsForMemberResponse,
    errors: [ResourceNotFoundException, ValidationException],
    pagination: {
      inputToken: "NextToken",
      outputToken: "NextToken",
      items: "GroupMemberships",
      pageSize: "MaxResults",
    } as const,
  }));
/**
 * Lists all users in the identity store. Returns a paginated list of complete `User` objects. Filtering for a `User` by the `UserName` attribute is deprecated. Instead, use the `GetUserId` API action.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const listUsers = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListUsersRequest,
  output: ListUsersResponse,
  errors: [ResourceNotFoundException, ValidationException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Users",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Retrieves membership metadata and attributes from `MembershipId` in an identity store.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const describeGroupMembership = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    input: DescribeGroupMembershipRequest,
    output: DescribeGroupMembershipResponse,
    errors: [ResourceNotFoundException, ValidationException],
  }),
);
/**
 * Delete a membership within a group given `MembershipId`.
 */
export const deleteGroupMembership = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    input: DeleteGroupMembershipRequest,
    output: DeleteGroupMembershipResponse,
    errors: [ConflictException, ResourceNotFoundException, ValidationException],
  }),
);
/**
 * For the specified group in the specified identity store, returns the list of all ` GroupMembership` objects and returns results in paginated form.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const listGroupMemberships =
  /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
    input: ListGroupMembershipsRequest,
    output: ListGroupMembershipsResponse,
    errors: [ResourceNotFoundException, ValidationException],
    pagination: {
      inputToken: "NextToken",
      outputToken: "NextToken",
      items: "GroupMemberships",
      pageSize: "MaxResults",
    } as const,
  }));
/**
 * Retrieves the group metadata and attributes from `GroupId` in an identity store.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const describeGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeGroupRequest,
  output: DescribeGroupResponse,
  errors: [ResourceNotFoundException, ValidationException],
}));
/**
 * Retrieves the user metadata and attributes from the `UserId` in an identity store.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const describeUser = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeUserRequest,
  output: DescribeUserResponse,
  errors: [ResourceNotFoundException, ValidationException],
}));
/**
 * Delete a group within an identity store given `GroupId`.
 */
export const deleteGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteGroupRequest,
  output: DeleteGroupResponse,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
}));
/**
 * Deletes a user within an identity store given `UserId`.
 */
export const deleteUser = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteUserRequest,
  output: DeleteUserResponse,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
}));
/**
 * Retrieves the `MembershipId` in an identity store.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const getGroupMembershipId = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    input: GetGroupMembershipIdRequest,
    output: GetGroupMembershipIdResponse,
    errors: [ResourceNotFoundException, ValidationException],
  }),
);
/**
 * Retrieves `GroupId` in an identity store.
 *
 * If you have access to a member account, you can use this API operation from the member account. For more information, see Limiting access to the identity store from member accounts in the * IAM Identity Center User Guide*.
 */
export const getGroupId = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetGroupIdRequest,
  output: GetGroupIdResponse,
  errors: [ResourceNotFoundException, ValidationException],
}));
/**
 * Creates a group within the specified identity store.
 */
export const createGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateGroupRequest,
  output: CreateGroupResponse,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
}));
/**
 * Updates the specified group metadata and attributes in the specified identity store.
 */
export const updateGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateGroupRequest,
  output: UpdateGroupResponse,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
}));
/**
 * Updates the specified user metadata and attributes in the specified identity store.
 */
export const updateUser = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateUserRequest,
  output: UpdateUserResponse,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
}));
/**
 * Creates a relationship between a member and a group. The following identifiers must be specified: `GroupId`, `IdentityStoreId`, and `MemberId`.
 */
export const createGroupMembership = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    input: CreateGroupMembershipRequest,
    output: CreateGroupMembershipResponse,
    errors: [
      ConflictException,
      ResourceNotFoundException,
      ServiceQuotaExceededException,
      ValidationException,
    ],
  }),
);
