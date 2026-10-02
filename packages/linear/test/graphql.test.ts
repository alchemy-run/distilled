/** Mock-transport regressions for the Linear Query SDK, using captured Linear error envelopes. */
import { describe, expect, test } from "bun:test";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Result from "effect/Result";
import * as Stream from "effect/Stream";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import {
  GqlTransport,
  GraphQLFailure,
  GraphQLTransportError,
  UnknownGraphQLError,
  type CompiledOperation,
  type GraphQLResponse,
  type RawGraphQLError,
} from "@distilled.cloud/core/graphql";
import { Query } from "@distilled.cloud/core/query";
import {
  CredentialsFromToken,
  GraphQLLive,
  Linear,
  type TokenKind,
} from "@distilled.cloud/linear";

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

const run = <A, E>(
  effect: Effect.Effect<A, E, GqlTransport>,
  layer: Layer.Layer<GqlTransport>,
) => Effect.runPromise(effect.pipe(Effect.provide(layer)));

const failure = async <A, E>(
  effect: Effect.Effect<A, E, GqlTransport>,
  layer: Layer.Layer<GqlTransport>,
): Promise<E> => {
  const result = await Effect.runPromise(
    Effect.result(effect.pipe(Effect.provide(layer))),
  );
  if (Result.isSuccess(result)) throw new Error("expected a failure");
  return result.failure;
};

const notFound = (root: string, entity: string): RawGraphQLError => ({
  message: `Entity not found: ${entity}`,
  path: [root],
  extensions: {
    type: "invalid input",
    code: "INPUT_ERROR",
    statusCode: 400,
    userError: true,
    userPresentableMessage: `Could not find referenced ${entity}.`,
  },
});

const getTeam = Query.fn((id: string) => {
  const team = Linear.team({ id });
  return { id: team.id, key: team.key };
});

const deleteLabel = Query.fn((id: string) =>
  Linear.issueLabelDelete({ id }).pipe(Query.map((payload) => payload.success)),
);

describe("Linear Query SDK", () => {
  test("teams({ filter, first }) is one POST with typed variables", async () => {
    const { layer, requests } = sequence({
      data: {
        teams: { edges: [{ node: { id: "t1", key: "ENG", name: "Eng" } }] },
      },
    });
    const result = await run(
      Query.fn(() =>
        Linear.teams({ filter: { key: { eq: "ENG" } }, first: 1 }).pipe(
          Query.map((team) => ({ id: team.id, key: team.key })),
        ),
      )(),
      layer,
    );
    expect(result).toEqual([{ id: "t1", key: "ENG" }]);
    expect(requests).toHaveLength(1);
    expect(requests[0]!.document).toContain("TeamFilter");
    expect(requests[0]!.document).toContain("edges");
    expect(requests[0]!.document).not.toContain("name");
  });

  test("issueLabelCreate selects through the payload to the label", async () => {
    const { layer, requests } = sequence({
      data: {
        issueLabelCreate: {
          success: true,
          issueLabel: { id: "l1", parent: { id: "g1" } },
        },
      },
    });
    const result = await run(
      Query.fn(() => {
        const payload = Linear.issueLabelCreate({
          input: { name: "bug", teamId: "t1", parentId: "g1" },
        });
        return {
          success: payload.success,
          id: payload.issueLabel.id,
          parentId: payload.issueLabel.parent.pipe(
            Query.map((parent) => parent?.id),
          ),
        };
      })(),
      layer,
    );
    expect(result).toEqual({ success: true, id: "l1", parentId: "g1" });
    expect(requests[0]!.kind).toBe("mutation");
    expect(requests[0]!.document).toContain("IssueLabelCreateInput!");
    expect(Object.values(requests[0]!.variables)).toEqual([
      { name: "bug", teamId: "t1", parentId: "g1" },
    ]);
  });

  test("entity-not-found is LinearNotFound, other input errors LinearInvalidInput", async () => {
    const missing = await failure(
      deleteLabel("missing"),
      sequence({
        data: null,
        errors: [notFound("issueLabelDelete", "IssueLabel")],
      }).layer,
    );
    expect(missing._tag).toBe("LinearNotFound");
    expect(missing).toMatchObject({ code: "INPUT_ERROR" });

    const recovered = await run(
      getTeam("missing").pipe(
        Effect.catchTag("LinearNotFound", () => Effect.succeed(undefined)),
      ),
      sequence({ data: null, errors: [notFound("team", "Team")] }).layer,
    );
    expect(recovered).toBeUndefined();

    const invalid = await failure(
      Query.fn(() =>
        Linear.workflowStateCreate({
          input: { name: "x", color: "nope", type: "bogus", teamId: "t1" },
        }).pipe(Query.map((payload) => payload.success)),
      )(),
      sequence({
        data: null,
        errors: [
          {
            message: "Argument Validation Error",
            path: ["workflowStateCreate"],
            extensions: { code: "INVALID_INPUT", type: "invalid input" },
          },
        ],
      }).layer,
    );
    expect(invalid._tag).toBe("LinearInvalidInput");
  });

  test("an unobserved code is UnknownGraphQLError with the root", async () => {
    const error = await failure(
      getTeam("t1"),
      sequence({
        data: null,
        errors: [
          {
            message: "Forbidden",
            path: ["team"],
            extensions: { code: "FORBIDDEN", type: "forbidden" },
          },
        ],
      }).layer,
    );
    expect(error).toBeInstanceOf(UnknownGraphQLError);
    expect(error).toMatchObject({ code: "FORBIDDEN", coordinate: "team" });
  });

  test("errors with different tags fail together", async () => {
    const error = await failure(
      Query.fn(() => ({
        a: Linear.team({ id: "a" }).id,
        b: Linear.team({ id: "b" }).id,
      }))(),
      sequence({
        data: { team: null, team_0: null },
        errors: [
          notFound("team", "Team"),
          {
            message: "Argument Validation Error",
            path: ["team_0"],
            extensions: { code: "INVALID_INPUT", type: "invalid input" },
          },
        ],
      }).layer,
    );
    expect(error).toBeInstanceOf(GraphQLFailure);
    expect((error as GraphQLFailure).errors.map((issue) => issue._tag)).toEqual(
      ["LinearNotFound", "LinearInvalidInput"],
    );
  });

  test("Query.items follows endCursor until hasNextPage is false", async () => {
    const page = (
      nodes: ReadonlyArray<object>,
      hasNextPage: boolean,
      endCursor: string | null,
    ) => ({
      edges: nodes.map((node) => ({ node })),
      pageInfo: { hasNextPage, endCursor },
    });
    const { layer, requests } = sequence(
      {
        data: { issueLabels: page([{ name: "a" }, { name: "b" }], true, "c1") },
      },
      { data: { issueLabels: page([{ name: "c" }], false, null) } },
    );
    const names = await run(
      Stream.runCollect(
        Query.items(
          Linear.issueLabels({ first: 2 }).pipe(
            Query.map((label) => label.name),
          ),
        ),
      ),
      layer,
    );
    expect([...names]).toEqual(["a", "b", "c"]);
    expect(requests).toHaveLength(2);
    expect(requests[0]!.document).toContain("hasNextPage");
    expect(Object.values(requests[1]!.variables)).toContain("c1");
  });

  test("rate limits retry queries but not mutations", async () => {
    const limited: GraphQLResponse = {
      data: null,
      status: 400,
      errors: [
        {
          message: "Rate limit exceeded",
          extensions: { code: "RATELIMITED", type: "ratelimited" },
        },
      ],
    };
    const query = sequence(limited, {
      data: { team: { id: "t1", key: "ENG" } },
    });
    expect(await run(getTeam("t1"), query.layer)).toEqual({
      id: "t1",
      key: "ENG",
    });
    expect(query.requests).toHaveLength(2);

    const mutation = sequence(limited, {
      data: { issueLabelDelete: { success: true } },
    });
    const error = await failure(deleteLabel("l1"), mutation.layer);
    expect(error._tag).toBe("LinearRateLimited");
    expect(mutation.requests).toHaveLength(1);
  });

  test("GraphQLLive sends API keys bare and OAuth tokens as Bearer", async () => {
    const seen: Array<{ url: string; authorization: string | undefined }> = [];
    const http = Layer.succeed(
      HttpClient.HttpClient,
      HttpClient.make((request) =>
        Effect.sync(() => {
          seen.push({
            url: request.url,
            authorization: request.headers["authorization"],
          });
          return HttpClientResponse.fromWeb(
            request,
            new Response(
              JSON.stringify({
                errors: [
                  {
                    message: "Authentication required, not authenticated",
                    extensions: {
                      code: "AUTHENTICATION_ERROR",
                      type: "authentication error",
                    },
                  },
                ],
              }),
              { status: 401 },
            ),
          );
        }),
      ),
    );
    const live = (tokenKind: TokenKind) =>
      GraphQLLive.pipe(
        Layer.provideMerge(http),
        Layer.provideMerge(CredentialsFromToken({ token: "k", tokenKind })),
      );

    const apiKey = await failure(getTeam("t1"), live("apiKey"));
    expect(apiKey._tag).toBe("LinearAuthenticationError");
    expect(apiKey).toMatchObject({ status: 401 });
    await failure(getTeam("t1"), live("oauth"));

    expect(seen).toEqual([
      { url: "https://api.linear.app/graphql", authorization: "k" },
      { url: "https://api.linear.app/graphql", authorization: "Bearer k" },
    ]);
  });

  test("a non-GraphQL HTTP response is GraphQLTransportError", async () => {
    const http = Layer.succeed(
      HttpClient.HttpClient,
      HttpClient.make((request) =>
        Effect.succeed(
          HttpClientResponse.fromWeb(
            request,
            new Response("<html>", { status: 502 }),
          ),
        ),
      ),
    );
    const error = await failure(
      deleteLabel("l1"),
      GraphQLLive.pipe(
        Layer.provideMerge(http),
        Layer.provideMerge(
          CredentialsFromToken({ token: "k", tokenKind: "apiKey" }),
        ),
      ),
    );
    expect(error).toBeInstanceOf(GraphQLTransportError);
    expect(error).toMatchObject({ status: 502 });
  });
});
