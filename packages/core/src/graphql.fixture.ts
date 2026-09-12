import * as Schema from "effect/Schema";
import * as G from "./graphql.ts";
import type { GraphQLField, GraphQLModel } from "./codegen/graphql-client.ts";

export class ProjectNotFound extends Schema.TaggedError<ProjectNotFound>()(
  "ProjectNotFound",
  G.errorFields,
) {}
export class ServicesUnavailable extends Schema.TaggedError<ServicesUnavailable>()(
  "ServicesUnavailable",
  G.errorFields,
) {}
export class Unauthorized extends Schema.TaggedError<Unauthorized>()(
  "Unauthorized",
  G.errorFields,
) {}
export class ProjectDescriptionUnavailable extends Schema.TaggedError<ProjectDescriptionUnavailable>()(
  "ProjectDescriptionUnavailable",
  G.errorFields,
) {}
export class ServiceDescriptionUnavailable extends Schema.TaggedError<ServiceDescriptionUnavailable>()(
  "ServiceDescriptionUnavailable",
  G.errorFields,
) {}
export class PageInfoUnavailable extends Schema.TaggedError<PageInfoUnavailable>()(
  "PageInfoUnavailable",
  G.errorFields,
) {}

export const errorClasses = {
  ProjectNotFound,
  ServicesUnavailable,
  Unauthorized,
  ProjectDescriptionUnavailable,
  ServiceDescriptionUnavailable,
  PageInfoUnavailable,
};

export type FixtureSchema = {
  query: "Query";
  mutation: "Mutation";
  subscription: never;
  globalErrors: "Unauthorized";
  errors: {
    ProjectNotFound: ProjectNotFound;
    ServicesUnavailable: ServicesUnavailable;
    Unauthorized: Unauthorized;
    ProjectDescriptionUnavailable: ProjectDescriptionUnavailable;
    ServiceDescriptionUnavailable: ServiceDescriptionUnavailable;
    PageInfoUnavailable: PageInfoUnavailable;
  };
  scalars: {
    ID: string;
    String: string;
    Int: number;
    Boolean: boolean;
    JSON: unknown;
    Status: "ACTIVE" | "ARCHIVED";
  };
  possibleTypes: {
    Node: "Project" | "Service";
    SearchResult: "Project" | "Service";
  };
  types: {
    Query: {
      project: G.Field<{ id: string }, "Project", "ProjectNotFound">;
      projects: G.Field<
        {
          filter?: {
            name?: string | null;
            statuses?: Array<"ACTIVE" | "ARCHIVED"> | null;
            metadata?: unknown;
          } | null;
        },
        "[Project]!"
      >;
      node: G.Field<{ id: string }, "Node">;
      search: G.Field<{ text: string }, "[SearchResult!]!">;
      services: G.Field<
        { first?: number | null; after?: string | null },
        "ServiceConnection!",
        "ServicesUnavailable"
      >;
      ping: G.Field<{}, "Boolean!">;
    };
    Mutation: {
      editProject: G.Field<
        { id: string; name: string },
        "Project!",
        "ProjectNotFound"
      >;
      deleteProject: G.Field<{ id: string }, "Boolean!", "ProjectNotFound">;
    };
    Project: {
      id: G.Field<{}, "ID!">;
      name: G.Field<{}, "String!">;
      description: G.Field<{}, "String", "ProjectDescriptionUnavailable">;
      parent: G.Field<{}, "Project">;
      services: G.Field<
        {
          first?: number | null;
          after?: string | null;
          filter?: { name?: string | null } | null;
        },
        "ServiceConnection",
        "ServicesUnavailable"
      >;
    };
    Service: {
      id: G.Field<{}, "ID!">;
      parent: G.Field<{}, "Project">;
      name: G.Field<{}, "String!">;
      description: G.Field<{}, "String", "ServiceDescriptionUnavailable">;
      project: G.Field<{}, "Project!">;
      status: G.Field<{}, "Status!">;
    };
    ServiceConnection: {
      edges: G.Field<{}, "[ServiceEdge!]!">;
      pageInfo: G.Field<{}, "PageInfo!">;
    };
    ServiceEdge: {
      cursor: G.Field<{}, "String!">;
      node: G.Field<{}, "Service!">;
    };
    PageInfo: {
      endCursor: G.Field<{}, "String">;
      hasNextPage: G.Field<{}, "Boolean!", "PageInfoUnavailable">;
    };
    Node: { id: G.Field<{}, "ID!">; parent: G.Field<{}, "Project"> };
    SearchResult: {};
  };
};

const field = (
  type: string,
  args: Record<string, { type: string; defaultValue?: string }> = {},
  errors: string[] = [],
): GraphQLField => ({ type, args, errors });

export const fixtureModel: GraphQLModel = {
  version: 1,
  queryType: "Query",
  mutationType: "Mutation",
  errors: {
    ProjectNotFound: { matchers: [{ code: "NOT_FOUND" }] },
    ServicesUnavailable: { matchers: [{ code: "UNAVAILABLE" }] },
    ProjectDescriptionUnavailable: {
      matchers: [{ code: "DESCRIPTION_UNAVAILABLE" }],
    },
    ServiceDescriptionUnavailable: {
      matchers: [{ code: "DESCRIPTION_UNAVAILABLE" }],
    },
    PageInfoUnavailable: { matchers: [{ code: "PAGE_INFO_UNAVAILABLE" }] },
    Unauthorized: {
      matchers: [
        { code: "UNAUTHENTICATED" },
        { code: "INTERNAL_SERVER_ERROR", message: "Not Authorized" },
      ],
    },
  },
  globalErrors: ["Unauthorized"],
  types: {
    ID: { kind: "SCALAR", scalar: "string" },
    String: { kind: "SCALAR", scalar: "string" },
    Int: { kind: "SCALAR", scalar: "number" },
    Boolean: { kind: "SCALAR", scalar: "boolean" },
    JSON: { kind: "SCALAR", scalar: "unknown" },
    Status: { kind: "ENUM", enumValues: ["ACTIVE", "ARCHIVED"] },
    ProjectFilter: {
      kind: "INPUT_OBJECT",
      inputFields: {
        name: { type: "String" },
        statuses: { type: "[Status!]", defaultValue: "[ACTIVE]" },
        metadata: { type: "JSON" },
      },
    },
    Query: {
      kind: "OBJECT",
      fields: {
        project: field("Project", { id: { type: "ID!" } }, ["ProjectNotFound"]),
        projects: field("[Project]!", { filter: { type: "ProjectFilter" } }),
        node: field("Node", { id: { type: "ID!" } }),
        search: field("[SearchResult!]!", { text: { type: "String!" } }),
        services: field(
          "ServiceConnection!",
          {
            first: { type: "Int", defaultValue: "20" },
            after: { type: "String" },
          },
          ["ServicesUnavailable"],
        ),
        ping: field("Boolean!"),
      },
    },
    Mutation: {
      kind: "OBJECT",
      fields: {
        editProject: field(
          "Project!",
          { id: { type: "ID!" }, name: { type: "String!" } },
          ["ProjectNotFound"],
        ),
        deleteProject: field("Boolean!", { id: { type: "ID!" } }, [
          "ProjectNotFound",
        ]),
      },
    },
    Project: {
      kind: "OBJECT",
      interfaces: ["Node"],
      fields: {
        id: field("ID!"),
        name: field("String!"),
        description: field("String", {}, ["ProjectDescriptionUnavailable"]),
        parent: field("Project"),
        services: field(
          "ServiceConnection",
          {
            first: { type: "Int", defaultValue: "20" },
            after: { type: "String" },
            filter: { type: "ProjectFilter" },
          },
          ["ServicesUnavailable"],
        ),
      },
    },
    Service: {
      kind: "OBJECT",
      interfaces: ["Node"],
      fields: {
        id: field("ID!"),
        parent: field("Project"),
        name: field("String!"),
        description: field("String", {}, ["ServiceDescriptionUnavailable"]),
        project: field("Project!"),
        status: field("Status!"),
      },
    },
    ServiceConnection: {
      kind: "OBJECT",
      fields: { edges: field("[ServiceEdge!]!"), pageInfo: field("PageInfo!") },
    },
    ServiceEdge: {
      kind: "OBJECT",
      fields: { cursor: field("String!"), node: field("Service!") },
    },
    PageInfo: {
      kind: "OBJECT",
      fields: {
        endCursor: field("String"),
        hasNextPage: field("Boolean!", {}, ["PageInfoUnavailable"]),
      },
    },
    Node: {
      kind: "INTERFACE",
      fields: { id: field("ID!"), parent: field("Project") },
      possibleTypes: ["Project", "Service"],
    },
    SearchResult: { kind: "UNION", possibleTypes: ["Project", "Service"] },
  },
};

/** A deliberately small recursive schema for GraphQL compiler/runtime tests. */
export const fixtureSDL = /* GraphQL */ `
  scalar JSON

  enum Status {
    ACTIVE
    ARCHIVED
  }

  input ProjectFilter {
    name: String
    statuses: [Status!] = [ACTIVE]
    metadata: JSON
  }

  interface Node {
    id: ID!
    parent: Project
  }

  type Project implements Node {
    id: ID!
    name: String!
    description: String
    parent: Project
    services(
      first: Int = 20
      after: String
      filter: ProjectFilter
    ): ServiceConnection
  }

  type Service implements Node {
    id: ID!
    parent: Project
    name: String!
    description: String
    project: Project!
    status: Status!
  }

  type ServiceConnection {
    edges: [ServiceEdge!]!
    pageInfo: PageInfo!
  }

  type ServiceEdge {
    cursor: String!
    node: Service!
  }

  type PageInfo {
    endCursor: String
    hasNextPage: Boolean!
  }

  union SearchResult = Project | Service

  type Query {
    project(id: ID!): Project
    projects(filter: ProjectFilter): [Project]!
    node(id: ID!): Node
    search(text: String!): [SearchResult!]!
    services(first: Int = 20, after: String): ServiceConnection!
    ping: Boolean!
  }

  type Mutation {
    editProject(id: ID!, name: String!): Project!
    deleteProject(id: ID!): Boolean!
  }
`;

/** Includes characters that must travel in variables, never in GraphQL text. */
export const adversarialArgument = 'quoted "value" \\ path\nline\t\u0000 😀';

export const partialProjectEnvelope = {
  data: {
    project: { id: "p1", services: null },
    ping: true,
  },
  errors: [
    {
      message: "Services temporarily unavailable",
      path: ["project", "services"],
      locations: [{ line: 1, column: 25 }],
      extensions: { code: "UNAVAILABLE", incident: "incident-1" },
    },
  ],
} as const;

export const multipleErrorEnvelope = {
  data: {
    production: null,
    staging: { id: "p2", services: null },
  },
  errors: [
    {
      message: "Project not found",
      path: ["production"],
      extensions: { code: "NOT_FOUND" },
    },
    {
      message: "Services temporarily unavailable",
      path: ["staging", "services"],
      extensions: { code: "UNAVAILABLE" },
    },
  ],
} as const;
