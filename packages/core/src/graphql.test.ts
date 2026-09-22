import { describe, expect, test } from "bun:test";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import {
  GqlTransport,
  connectionField,
  listField,
  root,
  rootConnection,
  scalarField,
  type TypeMeta,
} from "./graphql.ts";
import { Query } from "./query.ts";

type UserRow = {
  email: string;
  name: string;
  projects: ReadonlyArray<{ name: string; stars: number }>;
};

const User: TypeMeta = { name: "User", fields: {} };
const Project: TypeMeta = { name: "Project", fields: {} };
Object.assign(User.fields, {
  email: scalarField("email"),
  name: scalarField("name"),
  projects: listField("projects", Project, { first: "Int" }),
});
Object.assign(Project.fields, {
  name: scalarField("name"),
  stars: scalarField("stars"),
});

const Mock = Layer.succeed(GqlTransport, {
  execute: (request) =>
    Effect.sync(() => {
      expect(request.document).toContain("email");
      expect(request.document).toContain("stars");
      expect(request.document).toContain("name");
      return {
        data: {
          me: {
            email: "ada@railway.app",
            projects: [
              { name: "engine", stars: 12 },
              { name: "bombe", stars: 3 },
            ],
          },
        },
      };
    }),
});

describe("Query.fn", () => {
  test("builds one document from a returned plan and maps/filters after fetch", async () => {
    const program = Query.fn(() => {
      const me = root<UserRow>("query", "me", User);
      return {
        email: me.email,
        projects: me.projects({ first: 5 }).pipe(
          Query.filter((project: Query<{ stars: number; name: string }>) =>
            project.stars.pipe(Query.map((stars: number) => stars > 5)),
          ),
          Query.map((project: Query<{ stars: number; name: string }>) => ({
            name: project.name,
            stars: project.stars,
          })),
        ),
      };
    })();
    const result = await Effect.runPromise(program.pipe(Effect.provide(Mock)));
    expect(result).toEqual({
      email: "ada@railway.app",
      projects: [{ name: "engine", stars: 12 }],
    });
  });

  test("Relay connections map as a list of nodes, one POST", async () => {
    const Workspace: TypeMeta = { name: "Workspace", fields: {} };
    Object.assign(Workspace.fields, { name: scalarField("name") });
    const layer = Layer.succeed(GqlTransport, {
      execute: (request) =>
        Effect.sync(() => {
          expect(request.document).toContain("edges");
          expect(request.document).toContain("node");
          expect(request.document).toContain("name");
          expect(request.document).not.toContain("pageInfo");
          return {
            data: {
              projects: {
                edges: [
                  { node: { name: "engine" } },
                  { node: { name: "bombe" } },
                ],
              },
            },
          };
        }),
    });
    const program = Query.fn(() => {
      const page = rootConnection<{ name: string }>(
        "query",
        "projects",
        Workspace,
        { first: 20 },
        { first: "Int" },
      );
      return page.pipe(Query.map((project) => project.name));
    })();
    const names = await Effect.runPromise(program.pipe(Effect.provide(layer)));
    expect(names).toEqual(["engine", "bombe"]);
  });

  test("nested connection fields unwrap edges.node", async () => {
    const Service: TypeMeta = { name: "Service", fields: {} };
    Object.assign(Service.fields, { name: scalarField("name") });
    const Project: TypeMeta = { name: "Project", fields: {} };
    Object.assign(Project.fields, {
      name: scalarField("name"),
      services: connectionField("services", Service, { first: "Int" }),
    });
    const layer = Layer.succeed(GqlTransport, {
      execute: (request) =>
        Effect.sync(() => {
          expect(request.document).toMatch(/services[\s\S]*edges[\s\S]*node/);
          return {
            data: {
              project: {
                name: "engine",
                services: {
                  edges: [{ node: { name: "web" } }, { node: { name: "db" } }],
                },
              },
            },
          };
        }),
    });
    const program = Query.fn(() => {
      const project = root<{
        name: string;
        services: ReadonlyArray<{ name: string }>;
      }>("query", "project", Project, { id: "p1" }, { id: "String!" });
      return {
        name: project.name,
        services: project
          .services({ first: 20 })
          .pipe(Query.map((service: Query<{ name: string }>) => service.name)),
      };
    })();
    const result = await Effect.runPromise(program.pipe(Effect.provide(layer)));
    expect(result).toEqual({ name: "engine", services: ["web", "db"] });
  });
});
