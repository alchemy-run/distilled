/** Compile-only contract checks. The coordinator runs these with noCheck=false. */
import type * as G from "./graphql.ts";
import type * as Stream from "effect/Stream";
import type {
  FixtureSchema,
  ProjectNotFound,
  ServicesUnavailable,
  Unauthorized,
  PageInfoUnavailable,
} from "./graphql.fixture.ts";

type Assert<T extends true> = T;
type Assignable<A, B> = [A] extends [B] ? true : false;
type Equal<A, B> = Assignable<A, B> extends true ? Assignable<B, A> : false;

type IdentitySelection = {
  project: { where: { id: "p1" }; select: { id: true } };
};
type DetailedSelection = {
  project: {
    where: { id: "p1" };
    select: {
      id: true;
      services: { select: { edges: { node: { id: true } } } };
    };
  };
};
type AliasSelection = {
  __alias: {
    production: { project: { where: { id: "p1" }; select: { id: true } } };
  };
};
type SearchSelection = {
  search: {
    where: { text: "prod" };
    select: {
      __typename: true;
      __on: { Project: { name: true }; Service: { status: true } };
    };
  };
};

type Identity = G.Result<FixtureSchema, "Query!", IdentitySelection>;
type _Identity = Assert<Equal<Identity, { project: { id: string } | null }>>;
type _UnselectedFieldsAbsent = Assert<
  Equal<keyof NonNullable<Identity["project"]>, "id">
>;

type Alias = G.Result<FixtureSchema, "Query!", AliasSelection>;
type _Alias = Assert<Equal<Alias, { production: { id: string } | null }>>;

type Search = G.Result<FixtureSchema, "Query!", SearchSelection>;
type _Union = Assert<
  Equal<
    Search["search"][number],
    | { __typename: "Project"; name: string }
    | { __typename: "Service"; status: "ACTIVE" | "ARCHIVED" }
  >
>;

type IdentityErrors = G.Errors<FixtureSchema, "Query", IdentitySelection>;
type DetailedErrors = G.Errors<FixtureSchema, "Query", DetailedSelection>;
type _RootErrorIncluded = Assert<Assignable<ProjectNotFound, IdentityErrors>>;
type _GlobalErrorIncluded = Assert<Assignable<Unauthorized, IdentityErrors>>;
type _NestedErrorIncluded = Assert<
  Assignable<ServicesUnavailable, DetailedErrors>
>;
type _UnselectedErrorExcluded = Assert<
  Equal<Extract<IdentityErrors, { _tag: "ServicesUnavailable" }>, never>
>;

type ConditionalRoot = G.Result<
  FixtureSchema,
  "Query!",
  {
    ping: { $include: boolean; select: true };
  }
>;
type _ConditionalRoot = Assert<Equal<ConditionalRoot, { ping?: boolean }>>;
type ConditionalNested = G.Result<
  FixtureSchema,
  "Query!",
  {
    project: {
      where: { id: string };
      select: {
        id: true;
        name: { $skip: boolean; select: true };
      };
    };
  }
>;
type _ConditionalNested = Assert<
  Equal<
    ConditionalNested,
    {
      project: { id: string; name?: string } | null;
    }
  >
>;
type ConditionalAlias = G.Result<
  FixtureSchema,
  "Query!",
  {
    __alias: { healthy: { ping: { $include: boolean; select: true } } };
  }
>;
type _ConditionalAlias = Assert<Equal<ConditionalAlias, { healthy?: boolean }>>;

type MergedInterface = G.Result<
  FixtureSchema,
  "Node!",
  {
    __typename: true;
    parent: { id: true };
    __on: { Project: { parent: { name: true } } };
  }
>;
type _MergedInterface = Assert<
  Equal<
    Extract<MergedInterface, { __typename: "Project" }>["parent"],
    { id: string; name: string } | null
  >
>;

// These assignments exercise user-facing argument and nested selection validation.
const validSelection: G.Selection<FixtureSchema, "Query"> = {
  project: {
    where: { id: "p1" },
    select: {
      services: {
        where: { first: 10 },
        select: { edges: { node: { id: true } } },
      },
    },
  },
};
const missingArgument: G.Selection<FixtureSchema, "Query"> = {
  // @ts-expect-error Required GraphQL field arguments cannot be omitted.
  project: { select: { id: true } },
};
const wrongArgument: G.Selection<FixtureSchema, "Query"> = {
  // @ts-expect-error GraphQL argument types follow the schema.
  project: { where: { id: 42 }, select: { id: true } },
};
const unknownField: G.Selection<FixtureSchema, "Query"> = {
  // @ts-expect-error Unknown nested fields cannot be selected.
  project: { where: { id: "p1" }, select: { invented: true } },
};
// @ts-expect-error Fields returning objects require a projection.
const noProjection: G.Selection<FixtureSchema, "Query"> = { project: true };

void [
  validSelection,
  missingArgument,
  wrongArgument,
  unknownField,
  noProjection,
];

// Named operations retain projection and pagination constraints during inference.
declare const inferredClient: ReturnType<
  typeof G.makeClient<FixtureSchema, never>
>;

// @ts-expect-error An object-returning operation always requires a projection.
inferredClient.operation("query", "project")({ id: "p1" });
// @ts-expect-error Non-connection object queries do not expose pages.
inferredClient.operation("query", "project").pages;
// @ts-expect-error Scalar queries do not expose connection pagination.
inferredClient.operation("query", "ping").items;
// @ts-expect-error Mutations cannot be paginated.
inferredClient.operation("mutation", "editProject").pages;

const selectivePages = inferredClient
  .operation("query", "services")
  .pages({}, { edges: { node: { id: true } } });
type PageErrors = Stream.Error<typeof selectivePages>;
type PageIssues =
  Extract<PageErrors, G.GraphQLFailure> extends G.GraphQLFailure<infer E>
    ? E
    : never;
type _HiddenPaginationErrorIncluded = Assert<
  Assignable<PageInfoUnavailable, PageIssues>
>;
