/** Mock-transport regressions for the Railway Query SDK. */
import { describe, expect, test } from "bun:test";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Result from "effect/Result";
import {
  GqlError,
  GqlTransport,
  type CompiledOperation,
} from "@distilled.cloud/core/graphql";
import { Query } from "@distilled.cloud/core/query";
import { Railway } from "@distilled.cloud/railway";

const harness = (data: unknown, errors?: Array<{ message: string }>) => {
  const requests: CompiledOperation[] = [];
  const layer = Layer.succeed(GqlTransport, {
    execute: (request) =>
      Effect.gen(function* () {
        requests.push(request);
        if (errors && errors.length > 0) {
          return yield* Effect.fail(
            new GqlError(errors.map((error) => error.message).join("; ")),
          );
        }
        return { data };
      }),
  });
  return { layer, requests };
};

const run = <A>(
  effect: Effect.Effect<A, unknown, GqlTransport>,
  layer: Layer.Layer<GqlTransport>,
) => Effect.runPromise(effect.pipe(Effect.provide(layer)));

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
    expect(Object.values(requests[0]!.variables)).toEqual([
      { name: "example" },
    ]);
  });

  test("GraphQL errors surface as GqlError", async () => {
    const { layer } = harness(undefined, [{ message: "Project not found" }]);
    const result = await Effect.runPromise(
      Effect.result(
        Query.fn(() => {
          const project = Railway.project({ id: "missing" });
          return { id: project.id };
        })().pipe(Effect.provide(layer)),
      ),
    );
    expect(Result.isFailure(result)).toBe(true);
    if (Result.isFailure(result)) {
      expect(result.failure).toBeInstanceOf(GqlError);
      expect((result.failure as GqlError).message).toBe("Project not found");
    }
  });
});
