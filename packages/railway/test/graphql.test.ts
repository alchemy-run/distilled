/** Credential-free regressions for verified Railway GraphQL response shapes. */
import { describe, expect, test } from "bun:test";
import * as Effect from "effect/Effect";
import * as Result from "effect/Result";
import * as G from "@distilled.cloud/core/graphql";
import * as Railway from "../src/graphql.ts";

const missingProjectId = "00000000-0000-4000-8000-000000000000";
const projectNotFound = {
  message: "Project not found",
  path: ["project"],
  locations: [{ line: 2, column: 3 }],
  extensions: { code: "INTERNAL_SERVER_ERROR" },
  traceId: "sanitized-railway-trace",
};
const notAuthorized = {
  message: "Not Authorized",
  path: ["me"],
  locations: [{ line: 2, column: 3 }],
  extensions: { code: "INTERNAL_SERVER_ERROR" },
};

const harness = (body: unknown) => {
  const requests: G.GraphQLRequest[] = [];
  const client = G.makeClient<Railway.Schema, never>(
    Railway.schema,
    (request) =>
      Effect.sync(() => {
        requests.push(request);
        return { body, status: 200, headers: {} };
      }),
    Railway.errorClasses,
  );
  return { client, requests };
};

const failure = async <A, E>(effect: Effect.Effect<A, E>) => {
  const result = await Effect.runPromise(Effect.result(effect));
  if (Result.isSuccess(result)) throw new Error("Expected a typed failure");
  return result.failure;
};

describe("Railway native GraphQL verified responses", () => {
  test("pathless gateway processing failure retains trace and never retries a mutation", async () => {
    const { client, requests } = harness({
      data: null,
      errors: [
        {
          message: "Problem processing request",
          traceId: "5527782523421805956",
        },
      ],
    });
    const result = await failure(
      client.mutation({
        enableServiceCdn: {
          where: {
            input: {
              environmentId: "environment-fixture",
              serviceId: "service-fixture",
            },
          },
          select: { id: true },
        },
      }),
    );
    expect(result).toBeInstanceOf(G.GraphQLFailure);
    if (!(result instanceof G.GraphQLFailure))
      throw new Error("Expected GraphQLFailure");
    expect(result.errors[0]).toBeInstanceOf(
      Railway.RailwayRequestProcessingError,
    );
    expect(result.errors[0]).toMatchObject({
      message: "Problem processing request",
      traceId: "5527782523421805956",
    });
    expect(result.errors[0]!.path).toBeUndefined();
    expect(result.errors[0]!.code).toBeUndefined();
    expect(requests).toHaveLength(1);
    expect(Railway.schema.errors.RailwayRequestProcessingError!.retryable).toBe(
      false,
    );
  });

  test("new bucket credentials readiness error is limited to its read-only field", async () => {
    const missing = {
      message: "BucketInstanceCredential not found",
      path: ["bucketS3Credentials"],
    };
    const { client, requests } = harness({ data: null, errors: [missing] });
    const result = await Effect.runPromise(
      client.report.query({
        bucketS3Credentials: {
          where: {
            bucketId: "bucket-fixture",
            environmentId: "environment-fixture",
            projectId: "project-fixture",
          },
          select: { accessKeyId: true },
        },
      }),
    );
    expect(result.errors[0]).toBeInstanceOf(
      Railway.RailwayBucketCredentialsNotReady,
    );
    expect(requests).toHaveLength(1);
    expect(requests[0]!.kind).toBe("query");
    expect(
      Railway.schema.types.Query!.fields!.bucketS3Credentials!.errors,
    ).toContain("RailwayBucketCredentialsNotReady");
    for (const field of Object.values(Railway.schema.types.Mutation!.fields!)) {
      expect(field.errors).not.toContain("RailwayBucketCredentialsNotReady");
    }
    const elsewhere = harness({
      data: null,
      errors: [{ ...missing, path: ["project"] }],
    });
    const unrelated = await Effect.runPromise(
      elsewhere.client.report.query({
        project: { where: { id: "project-fixture" }, select: { id: true } },
      }),
    );
    expect(unrelated.errors[0]).toBeInstanceOf(G.UnknownGraphQLError);
  });

  test("private-network BigInt IDs preserve observed numbers and large integer strings", async () => {
    const rows = [
      {
        networkId: 1538483960,
        createdAt: "2026-08-28T09:50:39.285Z",
        deletedAt: null,
      },
      {
        networkId: 3234591130,
        createdAt: "2026-08-28T09:50:39.285Z",
        deletedAt: null,
      },
      // String representation preserves integers beyond JavaScript's safe range.
      {
        networkId: "9007199254740993",
        createdAt: "2026-08-28T09:50:39.285Z",
        deletedAt: null,
      },
    ];
    const { client } = harness({ data: { privateNetworks: rows } });
    const result = await Effect.runPromise(
      client.query({
        privateNetworks: {
          where: { environmentId: "environment-fixture" },
          select: { networkId: true, createdAt: true, deletedAt: true },
        },
      }),
    );
    expect(result.privateNetworks).toEqual(rows);
    expect(typeof result.privateNetworks[0]!.networkId).toBe("number");
    expect(result.privateNetworks[2]!.networkId).toBe("9007199254740993");
  });

  test("BigInt primitive-union decoder rejects unrelated wire types", async () => {
    const { client } = harness({
      data: { privateNetworks: [{ networkId: true }] },
    });
    const result = await failure(
      client.query({
        privateNetworks: {
          where: { environmentId: "environment-fixture" },
          select: { networkId: true },
        },
      }),
    );
    expect(result).toBeInstanceOf(G.GraphQLDecodeError);
  });

  test("live custom-domain create failure is scoped and never automatically retried", async () => {
    // The live aggregate log retained this exact message, not the full envelope.
    const { client, requests } = harness({
      data: null,
      errors: [
        {
          message: "Failed to create custom domain, please try again",
          path: ["customDomainCreate"],
        },
      ],
    });
    const result = await Effect.runPromise(
      client.report.mutation({
        customDomainCreate: {
          where: {
            input: {
              domain: "fixture.example.com",
              projectId: "project-fixture",
              environmentId: "environment-fixture",
              serviceId: "service-fixture",
            },
          },
          select: { id: true },
        },
      }),
    );
    expect(result.errors[0]).toBeInstanceOf(
      Railway.RailwayCustomDomainCreateFailed,
    );
    expect(requests).toHaveLength(1);
    expect(requests[0]!.kind).toBe("mutation");
    const unrelated = harness({
      data: null,
      errors: [
        {
          message: "Failed to create custom domain, please try again",
          path: ["serviceDomainCreate"],
        },
      ],
    });
    const unrelatedResult = await Effect.runPromise(
      unrelated.client.report.mutation({
        serviceDomainCreate: {
          where: {
            input: {
              environmentId: "environment-fixture",
              serviceId: "service-fixture",
            },
          },
          select: { id: true },
        },
      }),
    );
    expect(unrelatedResult.errors[0]).toBeInstanceOf(G.UnknownGraphQLError);
  });

  test("projects first:1 id-only report succeeds without selecting related resources", async () => {
    const { client, requests } = harness({
      data: { projects: { edges: [{ node: { id: "project-fixture" } }] } },
    });
    const result = await Effect.runPromise(
      client.report.query({
        projects: {
          where: { first: 1 },
          select: { edges: { node: { id: true } } },
        },
      }),
    );
    expect(result.data).toEqual({
      projects: { edges: [{ node: { id: "project-fixture" } }] },
    });
    expect(result.errors).toEqual([]);
    expect(result.status).toBe(200);
    expect(requests).toHaveLength(1);
    expect(Object.values(requests[0]!.variables)).toEqual([1]);
    expect(requests[0]!.query).not.toMatch(
      /workspace|services|members|environments/,
    );
  });

  test("HTTP200 Project not found becomes a typed aggregate retaining diagnostics", async () => {
    const { client } = harness({ data: null, errors: [projectNotFound] });
    const result = await failure(
      client.query({
        project: { where: { id: missingProjectId }, select: { id: true } },
      }),
    );
    expect(result).toBeInstanceOf(G.GraphQLFailure);
    if (!(result instanceof G.GraphQLFailure))
      throw new Error("Expected GraphQLFailure");
    expect(result.data).toBeNull();
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toBeInstanceOf(Railway.RailwayNotFound);
    expect(result.errors[0]).toMatchObject({
      _tag: "RailwayNotFound",
      message: "Project not found",
      path: ["project"],
      locations: [{ line: 2, column: 3 }],
      code: "INTERNAL_SERVER_ERROR",
      status: 200,
      traceId: "sanitized-railway-trace",
    });
  });

  test("native entrypoint exports aggregate recovery utilities", async () => {
    const { client } = harness({ data: null, errors: [projectNotFound] });
    const result = await Effect.runPromise(
      client
        .query({
          project: { where: { id: missingProjectId }, select: { id: true } },
        })
        .pipe(
          Railway.catchTags("RailwayNotFound", (_issue, aggregate) => {
            expect(Railway.isErrorTag(aggregate, "RailwayNotFound")).toBe(true);
            return Effect.succeed(undefined);
          }),
        ),
    );
    expect(result).toBeUndefined();
  });

  test("account-token scope rejection on me matches Forbidden before InternalError", async () => {
    const { client } = harness({ data: null, errors: [notAuthorized] });
    const result = await Effect.runPromise(
      client.report.query({ me: { select: { id: true } } }),
    );
    expect(result.data).toBeNull();
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toBeInstanceOf(Railway.RailwayForbidden);
    expect(result.errors[0]).toMatchObject({
      message: "Not Authorized",
      path: ["me"],
      code: "INTERNAL_SERVER_ERROR",
    });
  });

  test("response aliases resolve to the original schema coordinate for classification", async () => {
    const { client, requests } = harness({
      data: null,
      errors: [{ ...projectNotFound, path: ["production"] }],
    });
    const result = await Effect.runPromise(
      client.report.query({
        __alias: {
          production: {
            project: { where: { id: missingProjectId }, select: { id: true } },
          },
        },
      }),
    );
    expect(result.errors[0]).toBeInstanceOf(Railway.RailwayNotFound);
    expect(result.errors[0]!.path).toEqual(["production"]);
    expect(requests[0]!.query).toMatch(/production:\s*project/);
  });

  test("nested aliased paths never borrow an ancestor's not-found contract", async () => {
    const { client } = harness({
      data: { production: { id: "project-fixture", description: null } },
      errors: [
        {
          message: "Description not found",
          path: ["production", "description"],
          extensions: { code: "NOT_FOUND" },
        },
      ],
    });
    const result = await Effect.runPromise(
      client.report.query({
        __alias: {
          production: {
            project: {
              where: { id: "project-fixture" },
              select: { id: true, description: true },
            },
          },
        },
      }),
    );
    expect(result.data).toEqual({
      production: { id: "project-fixture", description: null },
    });
    expect(result.errors[0]).toBeInstanceOf(G.UnknownGraphQLError);
    expect(result.errors[0]).toMatchObject({
      coordinate: "Project.description",
      path: ["production", "description"],
      code: "NOT_FOUND",
    });
  });

  test("unscoped INTERNAL_SERVER_ERROR stays a global InternalError rather than borrowing NotFound", async () => {
    const { client } = harness({
      data: { production: { description: null } },
      errors: [{ ...projectNotFound, path: ["production", "description"] }],
    });
    const result = await Effect.runPromise(
      client.report.query({
        __alias: {
          production: {
            project: {
              where: { id: "project-fixture" },
              select: { description: true },
            },
          },
        },
      }),
    );
    expect(result.errors[0]).toBeInstanceOf(Railway.RailwayInternalError);
    expect(result.errors[0]).not.toBeInstanceOf(Railway.RailwayNotFound);
  });
});
