import { describe, expect, test } from "bun:test";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import {
  GqlTransport,
  listField,
  root,
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
});
