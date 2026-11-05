import { readFileSync } from "node:fs";
import { join } from "node:path";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as Stream from "effect/Stream";
import { describe, expect, test } from "vitest";
import {
  GqlTransport,
  GraphQLFailure,
  GraphQLTransportError,
  UnknownGraphQLError,
  connectionField,
  errorFields,
  errorSpec,
  listField,
  objectField,
  root,
  rootConnection,
  rootLeaf,
  rootList,
  scalarField,
  type GraphQLResponse,
  type TypeMeta,
} from "../src/graphql.ts";
import { Query } from "../src/query.ts";

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
                edges: [{ node: { name: "engine" } }, { node: { name: "bombe" } }],
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
  test("Query.map on an object selects its fields and keeps null", async () => {
    const Deployment: TypeMeta = { name: "Deployment", fields: {} };
    Object.assign(Deployment.fields, {
      id: scalarField("id"),
      status: scalarField("status"),
    });
    const Service: TypeMeta = { name: "Service", fields: {} };
    Object.assign(Service.fields, {
      name: scalarField("name"),
      latestDeployment: objectField("latestDeployment", Deployment),
    });
    const documents: string[] = [];
    const respond = (latestDeployment: unknown) =>
      Layer.succeed(GqlTransport, {
        execute: (request) =>
          Effect.sync(() => {
            documents.push(request.document);
            return {
              data: { service: { name: "web", latestDeployment } },
            };
          }),
      });
    const program = Query.fn(() => {
      const service = root<{
        name: string;
        latestDeployment: { id: string; status: string } | null;
      }>("query", "service", Service);
      return {
        name: service.name,
        deployment: service.latestDeployment.pipe(
          Query.map((deployment) => ({
            id: deployment.id,
            status: deployment.status,
          })),
        ),
      };
    })();
    expect(
      await Effect.runPromise(
        program.pipe(Effect.provide(respond({ id: "d1", status: "SUCCESS" }))),
      ),
    ).toEqual({ name: "web", deployment: { id: "d1", status: "SUCCESS" } });
    expect(documents[0]).toMatch(/latestDeployment \{\s+id\s+status/);
    expect(await Effect.runPromise(program.pipe(Effect.provide(respond(null))))).toEqual({
      name: "web",
      deployment: null,
    });
  });
});

describe("sensitive fields", () => {
  type Secret = Redacted.Redacted<string>;
  type CredentialsRow = { accessKeyId: string; secretAccessKey: Secret };
  const Credentials: TypeMeta = { name: "Credentials", fields: {} };
  Object.assign(Credentials.fields, {
    accessKeyId: scalarField("accessKeyId"),
    secretAccessKey: scalarField("secretAccessKey", { sensitive: true }),
  });
  class NotFound extends S.TaggedError<NotFound>()("NotFound", errorFields) {}
  class Forbidden extends S.TaggedError<Forbidden>()("Forbidden", errorFields) {}
  const errors = [
    errorSpec(NotFound, "NotFound", [{ code: "NOT_FOUND" }]),
    errorSpec(Forbidden, "Forbidden", [{ code: "FORBIDDEN" }]),
  ];
  const credentials = () => rootList<CredentialsRow>("query", "credentials", Credentials);
  const respond = (response: GraphQLResponse) =>
    Layer.succeed(GqlTransport, { execute: () => Effect.succeed(response) });
  const rows = [{ accessKeyId: "AKID", secretAccessKey: "secret-value" }];

  test("a marked field decodes as Redacted and other fields stay plain", async () => {
    const program = Query.fn(() => ({
      rows: credentials().pipe(
        Query.map((row) => ({
          accessKeyId: row.accessKeyId,
          secretAccessKey: row.secretAccessKey,
        })),
      ),
    }))();
    const result = await Effect.runPromise(
      program.pipe(Effect.provide(respond({ data: { credentials: rows } }))),
    );
    const [row] = result.rows;
    expect(row!.accessKeyId).toBe("AKID");
    expect(Redacted.isRedacted(row!.secretAccessKey)).toBe(true);
    expect(Redacted.value(row!.secretAccessKey)).toBe("secret-value");
    expect(JSON.stringify(result)).not.toContain("secret-value");
  });

  test("rows returned whole keep a marked field as Redacted", async () => {
    const program = Query.fn(() => ({
      filtered: credentials().pipe(
        Query.filter((row) =>
          row.secretAccessKey.pipe(Query.map((secret) => Redacted.isRedacted(secret))),
        ),
      ),
      whole: credentials().pipe(Query.map((row) => ({ id: row.accessKeyId, row }))),
    }))();
    const result = await Effect.runPromise(
      program.pipe(Effect.provide(respond({ data: { credentials: rows } }))),
    );
    expect(result.filtered).toHaveLength(1);
    expect(Redacted.isRedacted(result.filtered[0]!.secretAccessKey)).toBe(true);
    expect(Redacted.isRedacted(result.whole[0]!.row.secretAccessKey)).toBe(true);
    expect(JSON.stringify(result)).not.toContain("secret-value");
  });

  test("a marked field under a nested object, an alias and a connection decodes as Redacted", async () => {
    type BucketRow = { name: string; credentials: CredentialsRow };
    const Bucket: TypeMeta = { name: "Bucket", fields: {} };
    Object.assign(Bucket.fields, {
      name: scalarField("name"),
      credentials: objectField("credentials", Credentials),
    });
    const node = (name: string, secret: string) => ({
      name,
      credentials: { accessKeyId: `${name}-key`, secretAccessKey: secret },
    });
    const requests: Array<Record<string, unknown>> = [];
    const layer = Layer.succeed(GqlTransport, {
      execute: (request) =>
        Effect.sync(() => {
          requests.push(request.variables);
          if (!request.document.includes("buckets")) {
            return {
              data: { bucket: node("one", "secret-one"), bucket_0: node("two", "secret-two") },
            };
          }
          const first = requests.length === 2;
          return {
            data: {
              buckets: {
                edges: [{ node: first ? node("a", "secret-a") : node("b", "secret-b") }],
                pageInfo: { hasNextPage: first, endCursor: first ? "c1" : null },
              },
            },
          };
        }),
    });
    const bucket = (token: string) =>
      root<BucketRow>(
        "query",
        "bucket",
        Bucket,
        { token: Redacted.make(token) },
        { token: "String!" },
      );
    const secrets = await Effect.runPromise(
      Query.fn(() => ({
        one: bucket("t-one").pipe(
          Query.map((row) => ({ name: row.name, secret: row.credentials.secretAccessKey })),
        ),
        two: bucket("t-two").credentials.secretAccessKey,
      }))().pipe(Effect.provide(layer)),
    );
    expect(requests[0]).toEqual({ v0: "t-one", v1: "t-two" });
    expect(secrets.one.name).toBe("one");
    expect(Redacted.value(secrets.one.secret)).toBe("secret-one");
    expect(Redacted.value(secrets.two)).toBe("secret-two");
    const items = await Effect.runPromise(
      Stream.runCollect(
        Query.items(
          rootConnection<BucketRow>(
            "query",
            "buckets",
            Bucket,
            { first: 1 },
            { first: "Int", after: "String" },
          ).pipe(Query.map((row) => row.credentials.secretAccessKey)),
        ),
      ).pipe(Effect.provide(layer)),
    );
    expect(requests).toHaveLength(3);
    expect(Array.from(items, (secret) => Redacted.value(secret))).toEqual(["secret-a", "secret-b"]);
  });

  test("a marked leaf root decodes each string as Redacted and keeps null", async () => {
    const token = (list: boolean) =>
      Query.fn(() =>
        rootLeaf<Secret | ReadonlyArray<Secret> | null>(
          "mutation",
          "tokenCreate",
          list,
          undefined,
          undefined,
          [],
          { sensitive: true },
        ),
      )();
    const one = await Effect.runPromise(
      token(false).pipe(Effect.provide(respond({ data: { tokenCreate: "token-value" } }))),
    );
    expect(Redacted.value(one as Redacted.Redacted<string>)).toBe("token-value");
    const many = await Effect.runPromise(
      token(true).pipe(Effect.provide(respond({ data: { tokenCreate: ["a-code", "b-code"] } }))),
    );
    expect((many as ReadonlyArray<Secret>).map((code) => Redacted.isRedacted(code))).toEqual([
      true,
      true,
    ]);
    const none = await Effect.runPromise(
      token(false).pipe(Effect.provide(respond({ data: { tokenCreate: null } }))),
    );
    expect(none).toBeNull();
  });

  test("a failure keeps the response data with marked fields as Redacted", async () => {
    const response: GraphQLResponse = {
      data: { credentials: rows },
      errors: [
        { message: "missing", path: ["credentials", 1], extensions: { code: "NOT_FOUND" } },
        { message: "denied", path: ["credentials", 2], extensions: { code: "FORBIDDEN" } },
      ],
    };
    const failure = await Effect.runPromise(
      Query.fn(() =>
        rootList<CredentialsRow>("query", "credentials", Credentials, {}, {}, errors).pipe(
          Query.map((row) => row.secretAccessKey),
        ),
      )().pipe(Effect.flip, Effect.provide(respond(response))),
    );
    expect(failure).toBeInstanceOf(GraphQLFailure);
    const data = (failure as GraphQLFailure).data as { credentials: Array<CredentialsRow> };
    expect(data.credentials[0]!.accessKeyId).toBe("AKID");
    expect(Redacted.isRedacted(data.credentials[0]!.secretAccessKey)).toBe(true);
    expect(JSON.stringify(data)).not.toContain("secret-value");
  });
});

describe("Redacted arguments", () => {
  test("a Redacted value in a request argument is sent as its plain value", async () => {
    let variables: Record<string, unknown> = {};
    const layer = Layer.succeed(GqlTransport, {
      execute: (request) =>
        Effect.sync(() => {
          variables = request.variables;
          return { data: { a: true, b: true } };
        }),
    });
    const upsert = (secret: Redacted.Redacted<string>) =>
      rootLeaf<boolean>(
        "mutation",
        "variableCollectionUpsert",
        false,
        { input: { variables: { S3_SECRET: secret } } },
        { input: "VariableCollectionUpsertInput!" },
      );
    await Effect.runPromise(
      Query.fn(() => ({
        a: upsert(Redacted.make("first-secret")),
        b: upsert(Redacted.make("second-secret")),
      }))().pipe(Effect.provide(layer)),
    );
    expect(Object.values(variables)).toEqual([
      { variables: { S3_SECRET: "first-secret" } },
      { variables: { S3_SECRET: "second-secret" } },
    ]);
  });
});

describe("malformed responses fail with typed errors", () => {
  class NotFound extends S.TaggedError<NotFound>()("NotFound", errorFields) {}
  const errors = [errorSpec(NotFound, "NotFound", [{ code: "NOT_FOUND" }])];
  // A mutation, so a transport failure is not retried.
  const ping = (response: unknown) =>
    Effect.runPromise(
      Query.fn(() => rootLeaf<boolean>("mutation", "ping", false, {}, {}, errors))().pipe(
        Effect.flip,
        Effect.provide(
          Layer.succeed(GqlTransport, {
            execute: () => Effect.succeed(response as GraphQLResponse),
          }),
        ),
      ),
    );

  test.each([{}, { data: null }, { data: null, errors: [] }])(
    "%j without errors is a GraphQLTransportError",
    async (response) => {
      expect(await ping(response)).toBeInstanceOf(GraphQLTransportError);
    },
  );

  test.each([
    [null, "malformed GraphQL error entry (null)"],
    [42, "malformed GraphQL error entry (number)"],
    ["boom", "boom"],
  ])("an errors entry %j is an UnknownGraphQLError", async (entry, message) => {
    const error = await ping({ data: null, errors: [entry] });
    expect(error).toBeInstanceOf(UnknownGraphQLError);
    expect((error as UnknownGraphQLError).message).toBe(message);
  });

  test("a path with a non-string, non-number element is left out; its root still classifies", async () => {
    const error = await ping({
      data: null,
      errors: [{ message: "gone", path: ["ping", null], extensions: { code: "NOT_FOUND" } }],
    });
    expect(error).toBeInstanceOf(NotFound);
    expect((error as { path?: unknown }).path).toBeUndefined();
  });

  test.each([[[{ line: "1", column: 2 }]], [[null]], ["1:2"]])(
    "malformed locations %j are left out",
    async (locations) => {
      const error = await ping({ data: null, errors: [{ message: "bad", locations }] });
      expect(error).toBeInstanceOf(UnknownGraphQLError);
      expect((error as UnknownGraphQLError).locations).toBeUndefined();
    },
  );

  test("well-formed path and locations are kept", async () => {
    const error = await ping({
      data: null,
      errors: [{ message: "bad", path: ["ping", 0], locations: [{ line: 1, column: 2 }] }],
    });
    expect(error).toBeInstanceOf(UnknownGraphQLError);
    expect((error as UnknownGraphQLError).path).toEqual(["ping", 0]);
    expect((error as UnknownGraphQLError).locations).toEqual([{ line: 1, column: 2 }]);
  });
});

test("the GraphQL client does not load the REST or HTTP protocol modules", () => {
  const source = readFileSync(join(import.meta.dirname, "..", "src", "graphql.ts"), "utf8");
  expect(source).not.toMatch(/from "\.\/protocol-(rest|http)\.ts"/);
});
