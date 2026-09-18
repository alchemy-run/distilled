/** Credential-free regressions for verified Railway GraphQL response shapes. */
import { describe, expect, test } from "bun:test";
import * as G from "@distilled.cloud/core/graphql";
import * as Railway from "@distilled.cloud/railway";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Result from "effect/Result";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";

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

describe("Railway sandbox contracts", () => {
  const environmentId = "environment-fixture";
  const sandboxSelection = {
    id: true,
    environmentId: true,
    status: true,
    networkIsolation: true,
    region: true,
    idleTimeoutMinutes: true,
    domains: { prefix: true, port: true, domain: true },
  } as const;
  const checkpointSelection = {
    id: true,
    key: true,
    environmentId: true,
    createdAt: true,
  } as const;
  const checkpoint = {
    id: "after-deps",
    key: "after-deps",
    environmentId,
    createdAt: "2026-09-16T00:00:00.000Z",
  };
  const sandboxError = (field: string, message: string) => ({
    data: null,
    errors: [
      {
        message,
        path: [field],
        extensions: { code: "INTERNAL_SERVER_ERROR" },
        traceId: "sanitized-sandbox-trace",
      },
    ],
  });

  test("create preserves domains, fractional resources, variables and each source input", async () => {
    const sources: ReadonlyArray<Partial<Railway.Inputs["SandboxCreateInput"]>> = [
      {},
      { sourceSandboxId: "source-fixture" },
      { template: { name: "after-deps" } },
      {
        template: {
          instructions: ["npm install"],
          region: "us-west2",
          variables: { CI: "true" },
        },
      },
    ];
    for (const source of sources) {
      const input = {
        environmentId,
        networkIsolation: "PRIVATE",
        publicDomains: [{ port: 8080 }, { port: 3000, prefix: "api" }],
        resources: { cpu: 0.5, memoryGB: 1.25 },
        idleTimeoutMinutes: 0,
        variables: { NODE_ENV: "production" },
        ...source,
      } satisfies Railway.Inputs["SandboxCreateInput"];
      const sandbox = {
        id: "sandbox-fixture",
        environmentId,
        status: "RUNNING",
        networkIsolation: "PRIVATE",
        region: "us-west2",
        idleTimeoutMinutes: 0,
        domains: [{ prefix: "api", port: 3000, domain: "api-fixture.up.railway.app" }],
      };
      const { client, requests } = harness({
        data: { sandboxCreate: sandbox },
      });
      const result = await Effect.runPromise(
        client.mutation({
          sandboxCreate: { where: { input }, select: sandboxSelection },
        }),
      );
      expect(result.sandboxCreate).toEqual(sandbox);
      expect(Object.values(requests[0]!.variables)).toEqual([input]);
      expect(requests[0]!.query).toContain("SandboxCreateInput!");
      expect(requests[0]!.query).toContain("domains");
      expect(requests[0]!.query).not.toContain("source-fixture");
      expect(requests).toHaveLength(1);
    }
  });

  test("resource defaults preserve omitted and null Float values", async () => {
    const resources: ReadonlyArray<Railway.Inputs["SandboxCreateInput"]["resources"]> = [
      undefined,
      null,
      {},
      { cpu: null, memoryGB: null },
      { cpu: 0.25 },
    ];
    for (const value of resources) {
      const input = {
        environmentId,
        ...(value !== undefined && { resources: value }),
      };
      const { client, requests } = harness({
        data: { sandboxCreate: { id: "sandbox-fixture", domains: [] } },
      });
      const result = await Effect.runPromise(
        client.mutation({
          sandboxCreate: {
            where: { input },
            select: { id: true, domains: { domain: true } },
          },
        }),
      );
      expect(result.sandboxCreate.domains).toEqual([]);
      expect(Object.values(requests[0]!.variables)).toEqual([input]);
    }
    expect(Railway.schema.types.SandboxResourcesInput!.inputFields).toMatchObject({
      cpu: { type: "Float" },
      memoryGB: { type: "Float" },
    });
    expect(Railway.schema.types.SandboxCreateInput!.inputFields).not.toHaveProperty(
      "checkpointName",
    );
    expect(Railway.schema.types.SandboxCreateInput!.inputFields).not.toHaveProperty("snapshotId");
  });

  test("checkpoint list, capture, rename and deletion retain their exact contracts", async () => {
    const listed = harness({ data: { sandboxCheckpoints: [checkpoint] } });
    expect(
      await Effect.runPromise(
        listed.client.query({
          sandboxCheckpoints: {
            where: { environmentId },
            select: checkpointSelection,
          },
        }),
      ),
    ).toEqual({ sandboxCheckpoints: [checkpoint] });

    const captured = harness({ data: { sandboxCheckpointCreate: checkpoint } });
    expect(
      await Effect.runPromise(
        captured.client.mutation({
          sandboxCheckpointCreate: {
            where: {
              environmentId,
              sandboxId: "sandbox-fixture",
              name: "after-deps",
            },
            select: checkpointSelection,
          },
        }),
      ),
    ).toEqual({ sandboxCheckpointCreate: checkpoint });
    expect(Object.values(captured.requests[0]!.variables)).toEqual([
      environmentId,
      "after-deps",
      "sandbox-fixture",
    ]);

    const renamedCheckpoint = {
      ...checkpoint,
      id: "node-base",
      key: "node-base",
    };
    const renamed = harness({
      data: { sandboxCheckpointRename: renamedCheckpoint },
    });
    expect(
      await Effect.runPromise(
        renamed.client.mutation({
          sandboxCheckpointRename: {
            where: { environmentId, id: checkpoint.key, name: "node-base" },
            select: checkpointSelection,
          },
        }),
      ),
    ).toEqual({ sandboxCheckpointRename: renamedCheckpoint });
    expect(renamed.requests[0]!.query).toContain("ID!");

    const deleted = harness({ data: { sandboxCheckpointDelete: false } });
    expect(
      await Effect.runPromise(
        deleted.client.mutation({
          sandboxCheckpointDelete: {
            where: { environmentId, id: checkpoint.key },
          },
        }),
      ),
    ).toEqual({ sandboxCheckpointDelete: false });
  });

  test("missing sandbox lookup, destroy and heartbeat return null without invented errors", async () => {
    const where = { environmentId, id: missingProjectId };
    const read = harness({ data: { sandbox: null } });
    expect(
      await Effect.runPromise(
        read.client.query({
          sandbox: { where, select: { id: true } },
        }),
      ),
    ).toEqual({ sandbox: null });
    const mutations = harness({
      data: { sandboxDestroy: null, sandboxHeartbeat: null },
    });
    expect(
      await Effect.runPromise(
        mutations.client.mutation({
          sandboxDestroy: { where, select: { id: true } },
          sandboxHeartbeat: { where, select: { id: true } },
        }),
      ),
    ).toEqual({ sandboxDestroy: null, sandboxHeartbeat: null });
  });

  test.each([
    ["Sandbox not found", "RailwaySandboxNotFound"],
    [
      "Sandbox checkpoint not found. Build or capture it before creating a sandbox from it.",
      "RailwaySandboxCheckpointNotFound",
    ],
    [
      "Provide at most one of checkpointName, template, or sourceSandboxId",
      "RailwaySandboxValidationError",
    ],
    [
      "Provide either template.name or template.instructions, not both",
      "RailwaySandboxValidationError",
    ],
    ["cpu must be greater than 0 and at most 24 vCPU", "RailwaySandboxValidationError"],
    [
      "memoryGB must be at least 0.000000001 GB (1 byte) and at most 24 GB",
      "RailwaySandboxValidationError",
    ],
    ["idleTimeoutMinutes must be between 1 and 120 minutes", "RailwaySandboxValidationError"],
    ["Public domains require PRIVATE network isolation", "RailwaySandboxValidationError"],
    ["publicDomains ports must be between 1 and 65535", "RailwaySandboxValidationError"],
    [
      "publicDomains prefixes must be lowercase DNS label fragments of at most 46 characters",
      "RailwaySandboxValidationError",
    ],
    ["publicDomains ports must be unique", "RailwaySandboxValidationError"],
    ["publicDomains prefixes must be unique", "RailwaySandboxValidationError"],
    ["publicDomains supports at most 10 domains", "RailwaySandboxValidationError"],
  ] as const)("classifies live create error without retry: %s", async (message, tag) => {
    const { client, requests } = harness(sandboxError("sandboxCreate", message));
    const result = await Effect.runPromise(
      client.report.mutation({
        sandboxCreate: {
          where: { input: { environmentId } },
          select: { id: true },
        },
      }),
    );
    const inferredTag: G.Errors<
      Railway.Schema,
      "Mutation",
      {
        sandboxCreate: { select: { id: true } };
      }
    >["_tag"] = tag;
    expect(result.errors[0]).toMatchObject({
      _tag: inferredTag,
      message,
      path: ["sandboxCreate"],
      code: "INTERNAL_SERVER_ERROR",
      traceId: "sanitized-sandbox-trace",
    });
    expect(requests).toHaveLength(1);
    expect(Railway.schema.errors[tag]!.retryable).toBe(false);
  });

  test("missing sandbox errors apply to exec and checkpoint capture", async () => {
    const exec = harness(sandboxError("sandboxExec", "Sandbox not found"));
    const executed = await Effect.runPromise(
      exec.client.report.mutation({
        sandboxExec: {
          where: { environmentId, id: missingProjectId, command: "true" },
          select: { exitCode: true },
        },
      }),
    );
    expect(executed.errors[0]).toBeInstanceOf(Railway.RailwaySandboxNotFound);
    const capture = harness(sandboxError("sandboxCheckpointCreate", "Sandbox not found"));
    const captured = await Effect.runPromise(
      capture.client.report.mutation({
        sandboxCheckpointCreate: {
          where: {
            environmentId,
            sandboxId: missingProjectId,
            name: "after-deps",
          },
          select: { id: true },
        },
      }),
    );
    expect(captured.errors[0]).toBeInstanceOf(Railway.RailwaySandboxNotFound);
    expect(exec.requests).toHaveLength(1);
    expect(capture.requests).toHaveLength(1);
  });

  test("checkpoint rename exposes its observed not-found tag in strict failures", async () => {
    const { client } = harness(
      sandboxError("sandboxCheckpointRename", "Sandbox checkpoint not found"),
    );
    const result = await failure(
      client.mutation({
        sandboxCheckpointRename: {
          where: { environmentId, id: "missing-checkpoint", name: "node-base" },
          select: { id: true },
        },
      }),
    );
    expect(result).toBeInstanceOf(G.GraphQLFailure);
    if (!(result instanceof G.GraphQLFailure)) throw new Error("Expected GraphQLFailure");
    expect(result.errors[0]).toBeInstanceOf(Railway.RailwaySandboxCheckpointNotFound);
  });

  test("sandbox error contracts never classify unrelated fields or unknown messages", async () => {
    const unrelated = harness(sandboxError("sandboxDestroy", "Sandbox not found"));
    const destroyed = await Effect.runPromise(
      unrelated.client.report.mutation({
        sandboxDestroy: {
          where: { environmentId, id: missingProjectId },
          select: { id: true },
        },
      }),
    );
    expect(destroyed.errors[0]).toBeInstanceOf(Railway.RailwayInternalError);
    const unexpected = harness(
      sandboxError("sandboxCreate", "Unexpected sandbox provisioning failure"),
    );
    const created = await Effect.runPromise(
      unexpected.client.report.mutation({
        sandboxCreate: {
          where: { input: { environmentId } },
          select: { id: true },
        },
      }),
    );
    expect(created.errors[0]).toBeInstanceOf(Railway.RailwayInternalError);
  });
});

describe("Railway native GraphQL verified responses", () => {
  test("package root executes selective operations with its credential layer", async () => {
    for (const tokenKind of ["account", "project"] as const) {
      const requests: Array<{ query: string; variables: unknown }> = [];
      const http = HttpClient.make((request) =>
        Effect.sync(() => {
          expect(request.url).toBe("https://backboard.railway.com/graphql/v2?source=alchemy");
          expect(
            request.headers[tokenKind === "project" ? "project-access-token" : "authorization"],
          ).toBe(tokenKind === "project" ? "fixture-token" : "Bearer fixture-token");
          if (request.body._tag !== "Uint8Array") throw new Error("Expected JSON body");
          requests.push(JSON.parse(new TextDecoder().decode(request.body.body)));
          return HttpClientResponse.fromWeb(
            request,
            Response.json({ data: { project: { id: "project-fixture" } } }),
          );
        }),
      );
      const project = await Effect.runPromise(
        Railway.project({ id: "project-fixture" }, { id: true }).pipe(
          Effect.provide(
            Layer.mergeAll(
              Railway.CredentialsFromToken({
                token: "fixture-token",
                tokenKind,
              }),
              Layer.succeed(HttpClient.HttpClient, http),
            ),
          ),
        ),
      );
      expect(project).toEqual({ id: "project-fixture" });
      expect(requests).toHaveLength(1);
      expect(Object.values(requests[0]!.variables as object)).toContain("project-fixture");
      expect(requests[0]!.query).toContain("project(");
      expect(requests[0]!.query).not.toContain("services");
      expect(requests[0]!.query).not.toContain("name");
    }
  });

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
    if (!(result instanceof G.GraphQLFailure)) throw new Error("Expected GraphQLFailure");
    expect(result.errors[0]).toBeInstanceOf(Railway.RailwayRequestProcessingError);
    expect(result.errors[0]).toMatchObject({
      message: "Problem processing request",
      traceId: "5527782523421805956",
    });
    expect(result.errors[0]!.path).toBeUndefined();
    expect(result.errors[0]!.code).toBeUndefined();
    expect(requests).toHaveLength(1);
    expect(Railway.schema.errors.RailwayRequestProcessingError!.retryable).toBe(false);
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
    expect(result.errors[0]).toBeInstanceOf(Railway.RailwayBucketCredentialsNotReady);
    expect(requests).toHaveLength(1);
    expect(requests[0]!.kind).toBe("query");
    expect(Railway.schema.types.Query!.fields!.bucketS3Credentials!.errors).toContain(
      "RailwayBucketCredentialsNotReady",
    );
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
    expect(result.errors[0]).toBeInstanceOf(Railway.RailwayCustomDomainCreateFailed);
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
    expect(requests[0]!.query).not.toMatch(/workspace|services|members|environments/);
  });

  test("HTTP200 Project not found becomes a typed aggregate retaining diagnostics", async () => {
    const { client } = harness({ data: null, errors: [projectNotFound] });
    const result = await failure(
      client.query({
        project: { where: { id: missingProjectId }, select: { id: true } },
      }),
    );
    expect(result).toBeInstanceOf(G.GraphQLFailure);
    if (!(result instanceof G.GraphQLFailure)) throw new Error("Expected GraphQLFailure");
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
    const result = await Effect.runPromise(client.report.query({ me: { select: { id: true } } }));
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
