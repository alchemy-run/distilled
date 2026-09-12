import { describe, expect, test } from "bun:test";
import * as Effect from "effect/Effect";
import * as Result from "effect/Result";
import * as Stream from "effect/Stream";
import { Kind, parse } from "graphql";
import * as G from "./graphql.ts";
import {
  adversarialArgument,
  errorClasses,
  fixtureModel,
  multipleErrorEnvelope,
  partialProjectEnvelope,
  type FixtureSchema,
} from "./graphql.fixture.ts";

const harness = (body: unknown, status = 200) => {
  const requests: Array<{ query: string; variables: Record<string, unknown> }> =
    [];
  const client = G.makeClient<FixtureSchema, never>(
    fixtureModel,
    (request) =>
      Effect.sync(() => {
        requests.push(request);
        return { body, status, headers: {} };
      }),
    errorClasses,
  );
  return { client, requests };
};

const failure = async <A, E>(effect: Effect.Effect<A, E>) => {
  const result = await Effect.runPromise(Effect.result(effect));
  if (Result.isSuccess(result)) throw new Error("Expected a typed failure");
  return result.failure;
};

const projectIdentity = {
  project: { where: { id: "p1" }, select: { id: true } },
} as const;
const servicesSelection = {
  project: {
    where: { id: "p1" },
    select: {
      id: true,
      services: { select: { edges: { node: { id: true } } } },
    },
  },
} as const;

describe("GraphQL selection compilation", () => {
  test("only requests chosen fields and serializes arguments as variables", () => {
    const compiled = G.compile(fixtureModel, "query", {
      project: { where: { id: adversarialArgument }, select: { id: true } },
    });
    expect(compiled.query).toMatch(/project\s*\(\s*id\s*:\s*\$/);
    expect(compiled.query).toMatch(/\{\s*id\s*\}/);
    expect(compiled.query).not.toContain("services");
    expect(compiled.query).not.toContain(adversarialArgument);
    expect(Object.values(compiled.variables)).toEqual([adversarialArgument]);
    expect(JSON.parse(JSON.stringify(compiled.variables))).toEqual(
      compiled.variables,
    );
  });

  test("nested arguments keep null, omit undefined, and let server defaults apply", () => {
    const compiled = G.compile(fixtureModel, "query", {
      project: {
        where: { id: "p1" },
        select: {
          services: {
            where: { first: undefined, after: null },
            select: { edges: { node: { id: true } } },
          },
        },
      },
    });
    expect(compiled.query).not.toContain("first:");
    expect(compiled.query).toMatch(/services\s*\(\s*after\s*:\s*\$/);
    expect(Object.values(compiled.variables)).toEqual(["p1", null]);
  });

  test("input objects preserve explicit null and omit optional members", () => {
    const compiled = G.compile(fixtureModel, "query", {
      projects: {
        where: {
          filter: {
            name: null,
            statuses: undefined,
            metadata: { text: adversarialArgument, absent: undefined },
          },
        },
        select: { id: true },
      },
    });
    expect(
      JSON.parse(JSON.stringify(Object.values(compiled.variables)[0])),
    ).toEqual({ name: null, metadata: { text: adversarialArgument } });
    expect(compiled.query).toContain("ProjectFilter");
  });

  test("aliases give repeated roots independent variables", () => {
    const compiled = G.compile(fixtureModel, "query", {
      __alias: {
        production: { project: { where: { id: "p1" }, select: { id: true } } },
        staging: { project: { where: { id: "p2" }, select: { name: true } } },
      },
    });
    expect(compiled.query).toMatch(/production\s*:\s*project/);
    expect(compiled.query).toMatch(/staging\s*:\s*project/);
    expect(Object.values(compiled.variables)).toEqual(["p1", "p2"]);
  });

  test("supports finite selections through recursive schema relationships", () => {
    const compiled = G.compile(fixtureModel, "query", {
      project: {
        where: { id: "p1" },
        select: { parent: { parent: { parent: { name: true } } } },
      },
    });
    expect(compiled.query.match(/parent/g)).toHaveLength(3);
    expect(compiled.query).not.toContain("services");
  });

  test("rejects invalid selections before transport execution", () => {
    expect(() =>
      G.compile(fixtureModel, "query", {
        project: { where: { id: "p1" }, select: { unknownField: true } },
      }),
    ).toThrow();
    expect(() =>
      G.compile(fixtureModel, "query", {
        project: { where: {}, select: { id: true } },
      }),
    ).toThrow();
    expect(() =>
      G.compile(fixtureModel, "query", {
        project: { where: { id: "p1" }, select: {} },
      }),
    ).toThrow();
    expect(() =>
      G.compile(fixtureModel, "query", { "bad alias": true }),
    ).toThrow();
  });
});

describe("GraphQL query execution", () => {
  test("structurally wider selections fail in the typed channel before transport", async () => {
    const { client, requests } = harness({ data: { ping: true } });
    const invalidRoot = { ping: true, invented: true } as const;
    const invalidProjection = { id: true, invented: true } as const;
    const invalidNested = {
      project: { where: { id: "p1" }, select: invalidProjection },
    } as const;
    const invalidMutation = {
      editProject: {
        where: { id: "p1", name: "Updated" },
        select: invalidProjection,
      },
    } as const;

    expect((await failure(client.query(invalidRoot)))._tag).toBe(
      "GraphQLRequestError",
    );
    expect((await failure(client.query(invalidNested)))._tag).toBe(
      "GraphQLRequestError",
    );
    expect(
      (
        await failure(
          client.operation("query", "project")({ id: "p1" }, invalidProjection),
        )
      )._tag,
    ).toBe("GraphQLRequestError");
    expect((await failure(client.mutation(invalidMutation)))._tag).toBe(
      "GraphQLRequestError",
    );
    expect(requests).toHaveLength(0);
  });

  test("sends multiple roots in one HTTP request", async () => {
    const { client, requests } = harness({
      data: { project: { id: "p1" }, ping: true },
    });
    const value = await Effect.runPromise(
      client.query({ ...projectIdentity, ping: true }),
    );
    expect(value).toEqual({ project: { id: "p1" }, ping: true });
    expect(requests).toHaveLength(1);
  });

  test("__proto__ aliases are own properties without changing result prototypes", async () => {
    const { client } = harness({ data: { ["__proto__"]: { id: "p1" } } });
    const value = await Effect.runPromise(
      client.query({
        __alias: {
          ["__proto__"]: {
            project: { where: { id: "p1" }, select: { id: true } },
          },
        },
      }),
    );
    expect(Object.hasOwn(value, "__proto__")).toBe(true);
    expect(Object.getPrototypeOf(value)).toBe(Object.prototype);
    expect(value["__proto__"]).toEqual({ id: "p1" });
  });

  test("decodes null field and nullable list items without inventing missing fields", async () => {
    const { client } = harness({
      data: { projects: [null, { id: "p1", description: null }] },
    });
    const value = await Effect.runPromise(
      client.query({ projects: { select: { id: true, description: true } } }),
    );
    expect(value).toEqual({
      projects: [null, { id: "p1", description: null }],
    });
  });

  test("decodes union fragments into the selected concrete branch", async () => {
    const { client, requests } = harness({
      data: {
        search: [
          { __typename: "Project", name: "Production" },
          { __typename: "Service", status: "ACTIVE" },
        ],
      },
    });
    const value = await Effect.runPromise(
      client.query({
        search: {
          where: { text: "prod" },
          select: {
            __typename: true,
            __on: { Project: { name: true }, Service: { status: true } },
          },
        },
      }),
    );
    expect(value.search).toEqual([
      { __typename: "Project", name: "Production" },
      { __typename: "Service", status: "ACTIVE" },
    ]);
    expect(requests[0]!.query).toMatch(/\.\.\.\s*on\s+Project/);
    expect(requests[0]!.query).toMatch(/\.\.\.\s*on\s+Service/);
  });

  test("interface selections include shared fields and concrete fragments", async () => {
    const { client } = harness({
      data: { node: { __typename: "Project", id: "p1", name: "Production" } },
    });
    const value = await Effect.runPromise(
      client.query({
        node: {
          where: { id: "p1" },
          select: {
            __typename: true,
            id: true,
            __on: { Project: { name: true } },
          },
        },
      }),
    );
    expect(value.node).toEqual({
      __typename: "Project",
      id: "p1",
      name: "Production",
    });
  });

  test("interface and concrete selections merge nested fields at the same response path", async () => {
    const { client } = harness({
      data: {
        node: {
          __typename: "Project",
          parent: { id: "parent-1", name: "Parent" },
        },
      },
    });
    const value = await Effect.runPromise(
      client.query({
        node: {
          where: { id: "p1" },
          select: {
            __typename: true,
            parent: { id: true },
            __on: { Project: { parent: { name: true } } },
          },
        },
      }),
    );
    expect(value.node).toEqual({
      __typename: "Project",
      parent: { id: "parent-1", name: "Parent" },
    });
  });

  test("include and skip directives allow omitted fields without false decode failures", async () => {
    const { client, requests } = harness({ data: { project: { id: "p1" } } });
    const include: boolean = false;
    const skip: boolean = true;
    const value = await Effect.runPromise(
      client.query({
        project: {
          where: { id: "p1" },
          select: { id: true, name: { $skip: skip, select: true } },
        },
        ping: { $include: include, select: true },
      }),
    );
    expect(value).toEqual({ project: { id: "p1" } });
    expect(requests[0]!.query).toContain("@include");
    expect(requests[0]!.query).toContain("@skip");
    expect(Object.values(requests[0]!.variables)).toContain(false);
    expect(Object.values(requests[0]!.variables)).toContain(true);
  });

  test("bad selected scalar types produce a decode error", async () => {
    const { client } = harness({
      data: { project: { id: { invalid: true } } },
    });
    expect((await failure(client.query(projectIdentity)))._tag).toBe(
      "GraphQLDecodeError",
    );
  });

  test("missing non-null selected fields produce a decode error", async () => {
    const { client } = harness({ data: { project: {} } });
    expect((await failure(client.query(projectIdentity)))._tag).toBe(
      "GraphQLDecodeError",
    );
  });

  test("malformed errors envelopes never masquerade as success", async () => {
    const { client } = harness({
      data: { ping: true },
      errors: [{ path: ["ping"] }],
    });
    expect((await failure(client.query({ ping: true })))._tag).toBe(
      "GraphQLDecodeError",
    );
  });
});

describe("GraphQL typed failures", () => {
  const descriptionSelection = {
    search: {
      where: { text: "all" },
      select: {
        __typename: true,
        __on: {
          Project: { __alias: { label: { description: true } } },
          Service: { __alias: { label: { description: true } } },
        },
      },
    },
  } as const;

  test("list indexes and concrete typenames disambiguate identical branch error paths", async () => {
    const { client } = harness({
      data: {
        search: [
          { __typename: "Service", label: null },
          { __typename: "Project", label: null },
        ],
      },
      errors: [
        {
          message: "Description unavailable",
          path: ["search", 0, "label"],
          extensions: { code: "DESCRIPTION_UNAVAILABLE" },
        },
        {
          message: "Description unavailable",
          path: ["search", 1, "label"],
          extensions: { code: "DESCRIPTION_UNAVAILABLE" },
        },
      ],
    });
    const report = await Effect.runPromise(
      client.report.query(descriptionSelection),
    );
    expect(report.errors.map((error) => error._tag)).toEqual([
      "ServiceDescriptionUnavailable",
      "ProjectDescriptionUnavailable",
    ]);
  });

  test("erased concrete-type data leaves conflicting equal-rank error matches unknown", async () => {
    const { client } = harness({
      data: null,
      errors: [
        {
          message: "Description unavailable",
          path: ["search", 0, "label"],
          extensions: { code: "DESCRIPTION_UNAVAILABLE" },
        },
      ],
    });
    const report = await Effect.runPromise(
      client.report.query(descriptionSelection),
    );
    expect(report.errors[0]!._tag).toBe("UnknownGraphQLError");
    expect(report.errors[0]!.path).toEqual(["search", 0, "label"]);
  });
  test("strict execution aggregates a single field issue and preserves diagnostics", async () => {
    const { client } = harness(partialProjectEnvelope);
    const error = await failure(
      client.query({ ...servicesSelection, ping: true }),
    );
    expect(error._tag).toBe("GraphQLFailure");
    if (error._tag !== "GraphQLFailure")
      throw new Error("Expected GraphQLFailure");
    expect(error.errors).toHaveLength(1);
    expect(error.errors[0]!._tag).toBe("ServicesUnavailable");
    expect(error.errors[0]!.path).toEqual(["project", "services"]);
    expect(error.errors[0]!.extensions).toEqual({
      code: "UNAVAILABLE",
      incident: "incident-1",
    });
    expect(error.data).toEqual(partialProjectEnvelope.data);
  });

  test("report mode preserves partial data and typed issues as a success", async () => {
    const { client } = harness(partialProjectEnvelope);
    const report = await Effect.runPromise(
      client.report.query({ ...servicesSelection, ping: true }),
    );
    expect(report.data).toEqual(partialProjectEnvelope.data);
    expect(report.errors.map((error) => error._tag)).toEqual([
      "ServicesUnavailable",
    ]);
  });

  test("multiple errors retain aliases, tags, and all unaffected data", async () => {
    const { client } = harness(multipleErrorEnvelope);
    const error = await failure(
      client.query({
        __alias: {
          production: {
            project: { where: { id: "p1" }, select: { id: true } },
          },
          staging: {
            project: {
              where: { id: "p2" },
              select: servicesSelection.project.select,
            },
          },
        },
      }),
    );
    expect(error._tag).toBe("GraphQLFailure");
    if (error._tag !== "GraphQLFailure")
      throw new Error("Expected GraphQLFailure");
    expect(error.errors.map((issue) => issue._tag)).toEqual([
      "ProjectNotFound",
      "ServicesUnavailable",
    ]);
    expect(error.errors.map((issue) => issue.path)).toEqual([
      ["production"],
      ["staging", "services"],
    ]);
    expect(error.data).toEqual(multipleErrorEnvelope.data);
  });

  test("null bubbling and list indexes do not prevent schema-coordinate matching", async () => {
    const { client } = harness({
      data: { projects: [null] },
      errors: [
        {
          message: "Services unavailable",
          path: ["projects", 0, "services"],
          extensions: { code: "UNAVAILABLE" },
        },
      ],
    });
    const report = await Effect.runPromise(
      client.report.query({
        projects: { select: servicesSelection.project.select },
      }),
    );
    expect(report.errors[0]!._tag).toBe("ServicesUnavailable");
    expect(report.errors[0]!.path).toEqual(["projects", 0, "services"]);
    expect(report.data).toEqual({ projects: [null] });
  });

  test("overlapping interface and concrete selections retain nested error contracts", async () => {
    const { client } = harness({
      data: {
        node: {
          __typename: "Project",
          parent: { id: "parent-1", services: null },
        },
      },
      errors: [
        {
          message: "Services unavailable",
          path: ["node", "parent", "services"],
          extensions: { code: "UNAVAILABLE" },
        },
      ],
    });
    const report = await Effect.runPromise(
      client.report.query({
        node: {
          where: { id: "p1" },
          select: {
            __typename: true,
            parent: { id: true },
            __on: {
              Project: {
                parent: {
                  services: { select: { edges: { node: { id: true } } } },
                },
              },
            },
          },
        },
      }),
    );
    expect(report.errors[0]!._tag).toBe("ServicesUnavailable");
  });

  test("known codes at undeclared fields fall back to unknown", async () => {
    const { client } = harness({
      data: { project: null },
      errors: [
        {
          message: "Unavailable",
          path: ["project"],
          extensions: { code: "UNAVAILABLE" },
        },
      ],
    });
    const report = await Effect.runPromise(
      client.report.query(projectIdentity),
    );
    expect(report.errors[0]!._tag).toBe("UnknownGraphQLError");
  });

  test("unrecognized and unselected error paths fall back to unknown", async () => {
    const { client } = harness({
      data: { project: null },
      errors: [
        {
          message: "New provider error",
          path: ["project"],
          extensions: { code: "NEW_CODE" },
        },
        {
          message: "Unknown field path",
          path: ["neverSelected"],
          extensions: { code: "NOT_FOUND" },
        },
      ],
    });
    const report = await Effect.runPromise(
      client.report.query(projectIdentity),
    );
    expect(report.errors.map((error) => error._tag)).toEqual([
      "UnknownGraphQLError",
      "UnknownGraphQLError",
    ]);
  });

  test("global request errors without paths are decoded even on HTTP 400", async () => {
    const { client } = harness(
      {
        errors: [
          {
            message: "Authentication required",
            extensions: { code: "UNAUTHENTICATED" },
          },
        ],
      },
      400,
    );
    const report = await Effect.runPromise(
      client.report.query(projectIdentity),
    );
    expect(report.errors[0]!._tag).toBe("Unauthorized");
    expect(report.status).toBe(400);
  });

  test("code and message matchers require both constraints", async () => {
    const { client } = harness({
      errors: [
        {
          message: "Not Authorized",
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        },
        {
          message: "Resolver crashed",
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        },
      ],
    });
    const report = await Effect.runPromise(
      client.report.query(projectIdentity),
    );
    expect(report.errors.map((error) => error._tag)).toEqual([
      "Unauthorized",
      "UnknownGraphQLError",
    ]);
  });

  test("a mutation with response errors is never automatically retried", async () => {
    const { client, requests } = harness({
      data: null,
      errors: [
        {
          message: "Not found",
          path: ["editProject"],
          extensions: { code: "NOT_FOUND" },
        },
      ],
    });
    const error = await failure(
      client.mutation({
        editProject: {
          where: { id: "p1", name: "Changed" },
          select: { id: true },
        },
      }),
    );
    expect(error._tag).toBe("GraphQLFailure");
    expect(requests).toHaveLength(1);
    expect(requests[0]!.query).toMatch(/^mutation/);
  });

  test("catchTags recovers only when every issue has an allowed tag", async () => {
    const { client } = harness({
      data: { project: null },
      errors: [
        {
          message: "Gone",
          path: ["project"],
          extensions: { code: "NOT_FOUND" },
        },
      ],
    });
    const value = await Effect.runPromise(
      client
        .query(projectIdentity)
        .pipe(G.catchTags("ProjectNotFound", () => Effect.succeed("absent"))),
    );
    expect(value).toBe("absent");
  });

  test("catchTags never hides another issue in a mixed aggregate", async () => {
    const { client } = harness({
      data: { project: null },
      errors: [
        {
          message: "Gone",
          path: ["project"],
          extensions: { code: "NOT_FOUND" },
        },
        {
          message: "Authentication required",
          extensions: { code: "UNAUTHENTICATED" },
        },
      ],
    });
    let recovered = false;
    const error = await failure(
      client.query(projectIdentity).pipe(
        G.catchTags("ProjectNotFound", () =>
          Effect.sync(() => {
            recovered = true;
            return "absent";
          }),
        ),
      ),
    );
    expect(recovered).toBe(false);
    expect(error._tag).toBe("GraphQLFailure");
    if (error._tag !== "GraphQLFailure")
      throw new Error("Expected GraphQLFailure");
    expect(error.errors.map((issue) => issue._tag)).toEqual([
      "ProjectNotFound",
      "Unauthorized",
    ]);
  });
});

describe("GraphQL connection pagination", () => {
  const paginated = (
    responses: Array<{
      edges: Array<{ node: { id: string } }>;
      pageInfo: { endCursor: string | null; hasNextPage: boolean };
    }>,
  ) => {
    const requests: Array<G.GraphQLRequest> = [];
    const client = G.makeClient<FixtureSchema, never>(
      fixtureModel,
      (request) =>
        Effect.sync(() => {
          const page = responses[requests.length];
          requests.push(request);
          if (!page)
            throw new Error("Paginator made an unexpected extra request");
          // Respect response aliases, including cursor fields added by the client.
          const document = parse(request.query);
          const operation = document.definitions.find(
            (node) => node.kind === Kind.OPERATION_DEFINITION,
          )!;
          if (operation.kind !== Kind.OPERATION_DEFINITION)
            throw new Error("Expected an operation");
          const root = operation.selectionSet.selections[0]!;
          if (root.kind !== Kind.FIELD)
            throw new Error("Expected a connection field");
          const selected: Record<string, unknown> = {};
          for (const child of root.selectionSet!.selections) {
            if (child.kind !== Kind.FIELD) continue;
            selected[child.alias?.value ?? child.name.value] =
              page[child.name.value as keyof typeof page];
          }
          return {
            body: { data: { services: selected } },
            status: 200,
            headers: {},
          };
        }),
      errorClasses,
    );
    return { requests, services: client.operation("query", "services") };
  };

  test("items advances cursors and stops on hasNextPage=false", async () => {
    const { services, requests } = paginated([
      {
        edges: [{ node: { id: "s1" } }],
        pageInfo: { endCursor: "c1", hasNextPage: true },
      },
      {
        edges: [{ node: { id: "s2" } }],
        pageInfo: { endCursor: "c2", hasNextPage: false },
      },
    ]);
    const values = await Effect.runPromise(
      Stream.runCollect(services.items({ first: 1 }, { id: true })),
    );
    expect(Array.from(values)).toEqual([{ id: "s1" }, { id: "s2" }]);
    expect(requests).toHaveLength(2);
    expect(Object.values(requests[0]!.variables)).toEqual([1]);
    expect(Object.values(requests[1]!.variables)).toEqual([1, "c1"]);
    expect(requests[0]!.query).not.toContain("name");
  });

  test("empty terminal pages do not cause another request", async () => {
    const { services, requests } = paginated([
      { edges: [], pageInfo: { endCursor: null, hasNextPage: false } },
    ]);
    const values = await Effect.runPromise(
      Stream.runCollect(services.items({}, { id: true })),
    );
    expect(Array.from(values)).toEqual([]);
    expect(requests).toHaveLength(1);
  });

  test("pages omits internally selected pageInfo from the requested projection", async () => {
    const { services, requests } = paginated([
      {
        edges: [{ node: { id: "s1" } }],
        pageInfo: { endCursor: null, hasNextPage: false },
      },
    ]);
    const pages = await Effect.runPromise(
      Stream.runCollect(services.pages({}, { edges: { node: { id: true } } })),
    );
    expect(Array.from(pages)).toEqual([{ edges: [{ node: { id: "s1" } }] }]);
    expect(requests[0]!.query).toContain("pageInfo");
  });

  test("a user alias named pageInfo cannot collide with hidden pagination fields", async () => {
    const { services, requests } = paginated([
      {
        edges: [{ node: { id: "s1" } }],
        pageInfo: { endCursor: null, hasNextPage: false },
      },
    ]);
    const pages = await Effect.runPromise(
      Stream.runCollect(
        services.pages(
          {},
          {
            __alias: { pageInfo: { edges: { node: { id: true } } } },
          },
        ),
      ),
    );
    expect(Array.from(pages)).toEqual([{ pageInfo: [{ node: { id: "s1" } }] }]);
    expect(requests).toHaveLength(1);
  });

  test("wrapped pageInfo selections still fetch the internal pagination cursor", async () => {
    const { services, requests } = paginated([
      { edges: [], pageInfo: { endCursor: "c1", hasNextPage: true } },
      { edges: [], pageInfo: { endCursor: null, hasNextPage: false } },
    ]);
    const pages = await Effect.runPromise(
      Stream.runCollect(
        services.pages({}, { pageInfo: { select: { hasNextPage: true } } }),
      ),
    );
    expect(Array.from(pages)).toEqual([
      { pageInfo: { hasNextPage: true } },
      { pageInfo: { hasNextPage: false } },
    ]);
    expect(requests).toHaveLength(2);
  });

  test("conditional pageInfo projection cannot skip internal cursor fetching", async () => {
    const { services, requests } = paginated([
      {
        edges: [{ node: { id: "s1" } }],
        pageInfo: { endCursor: "c1", hasNextPage: true },
      },
      {
        edges: [{ node: { id: "s2" } }],
        pageInfo: { endCursor: null, hasNextPage: false },
      },
    ]);
    const pages = await Effect.runPromise(
      Stream.runCollect(
        services.pages(
          {},
          {
            edges: { node: { id: true } },
            pageInfo: { $skip: true, select: { hasNextPage: true } },
          },
        ),
      ),
    );
    expect(Array.from(pages)).toEqual([
      { edges: [{ node: { id: "s1" } }] },
      { edges: [{ node: { id: "s2" } }] },
    ]);
    expect(requests).toHaveLength(2);
  });

  test("non-advancing cursors fail without hanging", async () => {
    const { services, requests } = paginated([
      {
        edges: [{ node: { id: "s1" } }],
        pageInfo: { endCursor: "c1", hasNextPage: true },
      },
      {
        edges: [{ node: { id: "s1" } }],
        pageInfo: { endCursor: "c1", hasNextPage: true },
      },
    ]);
    const error = await failure(
      Stream.runCollect(services.items({}, { id: true })),
    );
    expect(error._tag).toBe("GraphQLDecodeError");
    expect(requests).toHaveLength(2);
  });

  test("invalid pagination input fails in the typed channel without making a request", async () => {
    const { services, requests } = paginated([]);
    const stream = services.items(
      { first: "bad" as unknown as number },
      { id: true },
    );
    const error = await failure(Stream.runCollect(stream));
    expect(error._tag).toBe("GraphQLRequestError");
    expect(requests).toHaveLength(0);
  });
});

describe("GraphQL safe query retries", () => {
  const retryableModel = {
    ...fixtureModel,
    errors: {
      ...fixtureModel.errors,
      ServicesUnavailable: {
        ...fixtureModel.errors.ServicesUnavailable!,
        retryable: true,
      },
    },
  };
  const unavailable = (root = "services") => ({
    data: null,
    errors: [
      {
        message: "Services unavailable",
        path: [root],
        extensions: { code: "UNAVAILABLE" },
      },
    ],
  });
  const retried = (response: (attempt: number) => unknown) => {
    const requests: G.GraphQLRequest[] = [];
    const client = G.makeClient<FixtureSchema, never>(
      retryableModel,
      (request) =>
        Effect.sync(() => {
          requests.push(request);
          return { body: response(requests.length), status: 200, headers: {} };
        }),
      errorClasses,
    );
    return { client, requests };
  };

  test("a safely retryable query reuses the document and variables", async () => {
    const { client, requests } = retried((attempt) =>
      attempt === 1 ? unavailable() : { data: { services: { edges: [] } } },
    );
    const result = await Effect.runPromise(
      client.query({
        services: {
          where: { first: 1 },
          select: { edges: { node: { id: true } } },
        },
      }),
    );
    expect(result).toEqual({ services: { edges: [] } });
    expect(requests).toHaveLength(2);
    expect(requests[0]!.query).toBe(requests[1]!.query);
    expect(requests[0]!.variables).toEqual(requests[1]!.variables);
  });

  test("retryable query failures stop after five retries", async () => {
    const { client, requests } = retried(() => unavailable());
    const error = await failure(
      client.query({ services: { select: { edges: { node: { id: true } } } } }),
    );
    expect(error._tag).toBe("GraphQLFailure");
    expect(requests).toHaveLength(6);
  }, 15_000);

  test("an aggregate containing a nonretryable issue is never retried", async () => {
    const { client, requests } = retried(() => ({
      data: null,
      errors: [
        ...unavailable().errors,
        { message: "Unauthorized", extensions: { code: "UNAUTHENTICATED" } },
      ],
    }));
    const error = await failure(
      client.query({ services: { select: { edges: { node: { id: true } } } } }),
    );
    expect(error._tag).toBe("GraphQLFailure");
    expect(requests).toHaveLength(1);
  });

  test("mutations never retry even when the field failure is marked retryable", async () => {
    const { client, requests } = retried(() => ({
      data: null,
      errors: [
        {
          message: "Services unavailable",
          path: ["editProject", "services"],
          extensions: { code: "UNAVAILABLE" },
        },
      ],
    }));
    const error = await failure(
      client.mutation({
        editProject: {
          where: { id: "p1", name: "Updated" },
          select: { services: { select: { edges: { node: { id: true } } } } },
        },
      }),
    );
    expect(error._tag).toBe("GraphQLFailure");
    if (error._tag !== "GraphQLFailure")
      throw new Error("Expected GraphQLFailure");
    expect(error.errors[0]!._tag).toBe("ServicesUnavailable");
    expect(requests).toHaveLength(1);
  });
});
