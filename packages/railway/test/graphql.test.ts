import {
  GqlTransport,
  type CompiledOperation,
  type GraphQLResponse,
  type RawGraphQLError,
} from "@distilled.cloud/core/graphql";
import { Query } from "@distilled.cloud/core/query";
import {
  CredentialsFromToken,
  GraphQLFailure,
  GraphQLLive,
  GraphQLPaginationError,
  GraphQLTransportError,
  Railway,
  UnknownGraphQLError,
} from "@distilled.cloud/railway";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Result from "effect/Result";
import * as Stream from "effect/Stream";
/** Mock-transport regressions for the Railway Query SDK. */
import { describe, expect, test } from "vitest";

/** Answers each request with the next response; the last one repeats. */
const sequence = (...responses: GraphQLResponse[]) => {
  const requests: CompiledOperation[] = [];
  const layer = Layer.succeed(GqlTransport, {
    execute: (request) =>
      Effect.sync(() => {
        requests.push(request);
        return responses[Math.min(requests.length, responses.length) - 1]!;
      }),
  });
  return { layer, requests };
};

const harness = (data: unknown, errors?: RawGraphQLError[]) => sequence({ data, errors });

const run = <A, E>(effect: Effect.Effect<A, E, GqlTransport>, layer: Layer.Layer<GqlTransport>) =>
  Effect.runPromise(effect.pipe(Effect.provide(layer)));

const failure = async <A, E>(
  effect: Effect.Effect<A, E, GqlTransport>,
  layer: Layer.Layer<GqlTransport>,
): Promise<E> => {
  const result = await Effect.runPromise(Effect.result(effect.pipe(Effect.provide(layer))));
  if (Result.isSuccess(result)) throw new Error("expected a failure");
  return result.failure;
};

const internal = (message: string, path?: ReadonlyArray<string | number>): RawGraphQLError => ({
  message,
  ...(path ? { path } : {}),
  extensions: { code: "INTERNAL_SERVER_ERROR" },
});

const getProject = Query.fn((id: string) => {
  const project = Railway.project({ id });
  return { id: project.id };
});

describe("Railway Query SDK", () => {
  test("me() selects only fields the plan reads, one POST", async () => {
    const { layer, requests } = harness({
      me: {
        email: "ada@railway.app",
        workspaces: [{ name: "Analytical Engines" }],
      },
    });
    const result = await run(
      Query.fn(() => {
        const me = Railway.me();
        return {
          email: me.email,
          workspaces: me.workspaces.pipe(Query.map((w) => w.name)),
        };
      })(),
      layer,
    );
    expect(result).toEqual({
      email: "ada@railway.app",
      workspaces: ["Analytical Engines"],
    });
    expect(requests).toHaveLength(1);
    expect(requests[0]!.kind).toBe("query");
    expect(requests[0]!.document).toContain("email");
    expect(requests[0]!.document).toContain("workspaces");
    expect(requests[0]!.document).toContain("name");
    expect(requests[0]!.document).not.toContain("githubUsername");
  });

  test("projects({ first }) maps nodes, not edges", async () => {
    const { layer, requests } = harness({
      me: { email: "ada@railway.app" },
      projects: {
        edges: [{ node: { name: "engine" } }, { node: { name: "bombe" } }],
      },
    });
    const result = await run(
      Query.fn(() => {
        const me = Railway.me();
        const page = Railway.projects({ first: 20 });
        return {
          email: me.email,
          names: page.pipe(Query.map((project) => project.name)),
        };
      })(),
      layer,
    );
    expect(result).toEqual({
      email: "ada@railway.app",
      names: ["engine", "bombe"],
    });
    expect(requests).toHaveLength(1);
    expect(requests[0]!.document).toContain("edges");
    expect(requests[0]!.document).toContain("node");
    expect(requests[0]!.document).not.toContain("pageInfo");
  });

  test("two project roots alias into one document", async () => {
    const { layer, requests } = harness({
      project: { id: "prod", name: "production" },
      project_0: { id: "stg", name: "staging" },
    });
    const result = await run(
      Query.fn(() => {
        const production = Railway.project({ id: "prod" });
        const staging = Railway.project({ id: "stg" });
        return {
          production: { id: production.id, name: production.name },
          staging: { id: staging.id, name: staging.name },
        };
      })(),
      layer,
    );
    expect(result.production).toEqual({ id: "prod", name: "production" });
    expect(result.staging).toEqual({ id: "stg", name: "staging" });
    expect(requests).toHaveLength(1);
    expect(requests[0]!.document).toContain("project_0:");
    expect(Object.values(requests[0]!.variables)).toEqual(["prod", "stg"]);
  });

  test("projectCreate is a mutation with input variables", async () => {
    const { layer, requests } = harness({
      projectCreate: { id: "p-new", name: "example" },
    });
    const result = await run(
      Query.fn(() => {
        const project = Railway.projectCreate({
          input: { name: "example" },
        });
        return { id: project.id, name: project.name };
      })(),
      layer,
    );
    expect(result).toEqual({ id: "p-new", name: "example" });
    expect(requests[0]!.kind).toBe("mutation");
    expect(requests[0]!.document).toContain("projectCreate");
    expect(Object.values(requests[0]!.variables)).toEqual([{ name: "example" }]);
  });

  test("a declared root error is a typed tag", async () => {
    const { layer } = harness(null, [internal("Project not found", ["project"])]);
    const error = await failure(getProject("missing"), layer);
    expect(error._tag).toBe("RailwayNotFound");
    expect(error.message).toBe("Project not found");
    expect(error).toMatchObject({
      code: "INTERNAL_SERVER_ERROR",
      path: ["project"],
    });

    const recovered = await run(
      getProject("missing").pipe(
        Effect.catchTag("RailwayNotFound", () => Effect.succeed(undefined)),
      ),
      layer,
    );
    expect(recovered).toBeUndefined();
  });

  test("errors are scoped to the root the path points at", async () => {
    const message = "Cannot delete TCP proxy: an operation is already in progress";
    const tcpProxyDelete = Query.fn(() => Railway.tcpProxyDelete({ id: "proxy" }));
    const projectDelete = Query.fn(() => Railway.projectDelete({ id: "project" }));
    const onProxy = await failure(
      tcpProxyDelete(),
      harness(null, [internal(message, ["tcpProxyDelete"])]).layer,
    );
    expect(onProxy._tag).toBe("RailwayOperationInProgress");
    // projectDelete does not declare it; the global code matcher applies.
    const onProject = await failure(
      projectDelete(),
      harness(null, [internal(message, ["projectDelete"])]).layer,
    );
    expect(onProject._tag).toBe("RailwayInternalError");
  });

  test("path-less errors match only global errors", async () => {
    const { layer } = harness(null, [{ message: "Problem processing request" }]);
    const error = await failure(getProject("p"), layer);
    expect(error._tag).toBe("RailwayRequestProcessingError");
  });

  test("unmatched errors are UnknownGraphQLError with the root", async () => {
    const { layer } = harness(null, [{ message: "something new", path: ["project"] }]);
    const error = await failure(getProject("p"), layer);
    expect(error).toBeInstanceOf(UnknownGraphQLError);
    expect(error).toMatchObject({ coordinate: "project" });
  });

  test("errors with different tags fail together", async () => {
    const { layer } = harness({ project: null, project_0: null }, [
      internal("Project not found", ["project"]),
      {
        message: "nope",
        path: ["project_0"],
        extensions: { code: "FORBIDDEN" },
      },
    ]);
    const error = await failure(
      Query.fn(() => ({
        a: Railway.project({ id: "a" }).id,
        b: Railway.project({ id: "b" }).id,
      }))(),
      layer,
    );
    expect(error).toBeInstanceOf(GraphQLFailure);
    expect((error as GraphQLFailure).errors.map((issue) => issue._tag)).toEqual([
      "RailwayNotFound",
      "RailwayForbidden",
    ]);
  });

  test("queries retry retryable errors; mutations do not", async () => {
    const limited: GraphQLResponse = {
      data: null,
      errors: [{ message: "slow down", extensions: { code: "RATE_LIMITED" } }],
    };
    const query = sequence(limited, { data: { project: { id: "p" } } });
    expect(await run(getProject("p"), query.layer)).toEqual({ id: "p" });
    expect(query.requests).toHaveLength(2);

    const mutation = sequence(limited, {
      data: { projectCreate: { id: "p" } },
    });
    const error = await failure(
      Query.fn(() => ({
        id: Railway.projectCreate({ input: { name: "example" } }).id,
      }))(),
      mutation.layer,
    );
    expect(error._tag).toBe("RailwayRateLimited");
    expect(mutation.requests).toHaveLength(1);
  });

  test("GraphQLLive passes GraphQL errors through and types HTTP failures", async () => {
    const respond = (status: number, body: string) =>
      Layer.succeed(
        HttpClient.HttpClient,
        HttpClient.make((request) =>
          Effect.succeed(
            HttpClientResponse.fromWeb(
              request,
              new Response(body, {
                status,
                headers: { "retry-after": "3" },
              }),
            ),
          ),
        ),
      );
    const live = (status: number, body: string) =>
      GraphQLLive.pipe(
        Layer.provideMerge(respond(status, body)),
        Layer.provideMerge(CredentialsFromToken({ token: Redacted.make("t") })),
      );
    const createProject = Query.fn(() => ({
      id: Railway.projectCreate({ input: { name: "example" } }).id,
    }));

    const graphql = await failure(
      createProject(),
      live(
        200,
        JSON.stringify({
          data: null,
          errors: [internal("Project not found", ["projectCreate"])],
        }),
      ),
    );
    expect(graphql._tag).toBe("RailwayNotFound");
    expect(graphql).toMatchObject({ status: 200, retryAfter: 3 });

    const http = await failure(createProject(), live(502, "<html>"));
    expect(http).toBeInstanceOf(GraphQLTransportError);
    expect(http).toMatchObject({ status: 502, retryAfter: 3 });
  });
  describe("pagination", () => {
    const page = (
      nodes: ReadonlyArray<object>,
      hasNextPage: boolean,
      endCursor: string | null,
    ) => ({
      edges: nodes.map((node) => ({ node })),
      pageInfo: { hasNextPage, endCursor },
    });

    test("Query.items walks a root connection until hasNextPage is false", async () => {
      const { layer, requests } = sequence(
        {
          data: { projects: page([{ name: "a" }, { name: "b" }], true, "c1") },
        },
        { data: { projects: page([{ name: "c" }], false, "c2") } },
      );
      const names = await run(
        Stream.runCollect(
          Query.items(Railway.projects({ first: 2 }).pipe(Query.map((project) => project.name))),
        ),
        layer,
      );
      expect([...names]).toEqual(["a", "b", "c"]);
      expect(requests).toHaveLength(2);
      expect(requests[0]!.document).toContain("pageInfo");
      expect(requests[0]!.document).toContain("hasNextPage");
      expect(Object.values(requests[0]!.variables)).toEqual([2]);
      expect(Object.values(requests[1]!.variables)).toContain("c1");
    });

    test("Query.pages pages a connection nested under a root", async () => {
      const { layer, requests } = sequence(
        {
          data: {
            project: { services: page([{ id: "s1" }], true, "c1") },
          },
        },
        {
          data: {
            project: { services: page([{ id: "s2" }], false, null) },
          },
        },
      );
      const pages = await run(
        Stream.runCollect(
          Query.pages(
            Railway.project({ id: "p" })
              .services({ first: 1 })
              .pipe(Query.map((service) => service.id)),
          ),
        ),
        layer,
      );
      expect([...pages]).toEqual([["s1"], ["s2"]]);
      expect(requests[1]!.document).toMatch(/services\(.*after/);
    });

    test("a repeated cursor fails instead of looping", async () => {
      const { layer } = sequence({
        data: { projects: page([{ name: "a" }], true, "same") },
      });
      const error = await failure(
        Stream.runCollect(
          Query.items(Railway.projects({ first: 1 }).pipe(Query.map((p) => p.name))),
        ),
        layer,
      );
      expect(error).toBeInstanceOf(GraphQLPaginationError);
    });

    test("page errors keep the root's typed errors", async () => {
      const { layer } = harness(null, [internal("Project not found", ["project"])]);
      const recovered = await run(
        Stream.runCollect(
          Query.items(
            Railway.project({ id: "gone" })
              .services({ first: 10 })
              .pipe(Query.map((service) => service.id)),
          ).pipe(Stream.catchTag("RailwayNotFound", () => Stream.empty)),
        ),
        layer,
      );
      expect([...recovered]).toEqual([]);
    });
  });
});
