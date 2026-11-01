import { ConfigError } from "@distilled.cloud/core/errors";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Stream from "effect/Stream";
import { describe, expect, test } from "vitest";
import { type Credentials, fromDeployment, fromToken } from "../src/credentials.ts";
import type { ConvexOpContext } from "../src/protocol.ts";
import * as Retry from "../src/retry.ts";
import {
  createDeployKey,
  createProject,
  getProject,
  listProjects,
} from "../src/services/convex.ts";
import { getDeploymentInfo } from "../src/services/deployment.ts";
import { query } from "../src/services/functions.ts";

const TOKEN = "sentinel-token-7f3a";
const DEPLOYMENT_URL = "https://happy-otter-123.convex.cloud";

interface Recorded {
  readonly url: string;
  readonly headers: Record<string, string>;
}

const makeClient = (respond: (request: Recorded) => Response) => {
  const requests: Recorded[] = [];
  const client = HttpClient.make((request) =>
    Effect.sync(() => {
      const recorded: Recorded = { url: request.url, headers: { ...request.headers } };
      requests.push(recorded);
      return HttpClientResponse.fromWeb(request, respond(recorded));
    }),
  );
  return { client, requests };
};

const json = (value: unknown, status = 200) =>
  new Response(JSON.stringify(value), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const run = <A, E>(
  operation: Effect.Effect<A, E, ConvexOpContext>,
  respond: (request: Recorded) => Response,
  credentials: Layer.Layer<Credentials> = fromToken(Redacted.make(TOKEN)),
) => {
  const { client, requests } = makeClient(respond);
  const result = Effect.runPromise(
    operation.pipe(
      Retry.none,
      Effect.provide(Layer.mergeAll(Layer.succeed(HttpClient.HttpClient, client), credentials)),
    ),
  );
  return { result, requests };
};

const runError = <A, E>(
  operation: Effect.Effect<A, E, ConvexOpContext>,
  respond: (request: Recorded) => Response,
  credentials?: Layer.Layer<Credentials>,
) => run(Effect.flip(operation), respond, credentials);

describe("each API's URL and auth scheme", () => {
  test("the Management API takes Bearer at the default base URL", async () => {
    const { result, requests } = run(getProject({ project_id: 7 }), () =>
      json({ id: 7, name: "app", slug: "app", teamId: 1 }),
    );
    await result;

    expect(requests[0]?.url).toBe("https://api.convex.dev/v1/projects/7");
    expect(requests[0]?.headers.authorization).toBe(`Bearer ${TOKEN}`);
  });

  test("the Deployment API takes Convex at <deployment url>/api/v1", async () => {
    const { result, requests } = run(
      getDeploymentInfo({}),
      () => json({ kind: "cloud" }),
      fromDeployment({ url: `${DEPLOYMENT_URL}/`, token: Redacted.make(TOKEN) }),
    );
    await result;

    expect(requests[0]?.url).toBe(`${DEPLOYMENT_URL}/api/v1/deployment_info`);
    expect(requests[0]?.headers.authorization).toBe(`Convex ${TOKEN}`);
  });

  test("the public API sends no token, even when the credentials hold one", async () => {
    const { result, requests } = run(
      query({ path: "messages:list", args: {}, format: "json" }),
      () => json({ status: "success", value: [] }),
      fromDeployment({ url: DEPLOYMENT_URL, token: Redacted.make(TOKEN) }),
    );
    await result;

    expect(requests[0]?.url).toBe(`${DEPLOYMENT_URL}/api/query`);
    expect(requests[0]?.headers.authorization).toBeUndefined();
  });

  test("the public API needs only the deployment URL", async () => {
    const { result } = run(
      query({ path: "messages:list", args: {}, format: "json" }),
      () => json({ status: "success", value: ["hello"] }),
      fromDeployment({ url: DEPLOYMENT_URL }),
    );

    expect(await result).toEqual({ status: "success", value: ["hello"] });
  });
});

describe("configuration errors", () => {
  test("deployment fails without a deployment URL, before any request", async () => {
    const { result, requests } = runError(getDeploymentInfo({}), () => json({}));

    expect(await result).toBeInstanceOf(ConfigError);
    expect(requests).toHaveLength(0);
  });

  test("functions fails without a deployment URL, before any request", async () => {
    const { result, requests } = runError(query({ path: "messages:list", args: {} }), () =>
      json({}),
    );

    expect(await result).toBeInstanceOf(ConfigError);
    expect(requests).toHaveLength(0);
  });

  test("the Deployment API fails without a token, before any request", async () => {
    const { result, requests } = runError(
      getDeploymentInfo({}),
      () => json({}),
      fromDeployment({ url: DEPLOYMENT_URL }),
    );

    expect(await result).toBeInstanceOf(ConfigError);
    expect(requests).toHaveLength(0);
  });
});

describe("errors", () => {
  test("a string code in the body selects the typed error", async () => {
    const { result } = runError(getProject({ project_id: 7 }), () =>
      json({ code: "ProjectNotFound", message: "no such project" }, 404),
    );

    expect(await result).toMatchObject({ _tag: "ProjectNotFound", message: "no such project" });
  });

  test("the code tells apart errors that share a status", async () => {
    const { result } = runError(createProject({ team_id: 1, projectName: "app" }), () =>
      json({ code: "InvalidProjectTag", message: "bad tag" }, 400),
    );

    expect(await result).toMatchObject({ _tag: "InvalidProjectTag" });
  });

  test("a code the operation doesn't declare falls back to its status class", async () => {
    const { result } = runError(getProject({ project_id: 7 }), () =>
      json({ code: "SomethingNew", message: "new failure" }, 400),
    );

    expect(await result).toMatchObject({ _tag: "BadRequest", message: "new failure" });
  });
});

describe("responses", () => {
  test("a minted deploy key decodes as Redacted", async () => {
    const { result } = run(
      createDeployKey({ deployment_name: "happy-otter-123", name: "ci" }),
      () => json({ deployKey: "prod:happy-otter-123|secret" }),
    );

    const { deployKey } = await result;
    expect(Redacted.isRedacted(deployKey)).toBe(true);
    expect(Redacted.value(deployKey)).toBe("prod:happy-otter-123|secret");
  });

  test("items follows pagination.nextCursor until it comes back null", async () => {
    const items = listProjects.items({ team_id: 1 }).pipe(Stream.runCollect);
    const { result, requests } = run(items, ({ url }) =>
      new URL(url).searchParams.get("cursor") === null
        ? json({
            items: [{ id: 1 }],
            pagination: { hasMore: true, nextCursor: "page-2" },
          })
        : json({
            items: [{ id: 2 }],
            pagination: { hasMore: false, nextCursor: null },
          }),
    );

    expect(Array.from(await result)).toEqual([{ id: 1 }, { id: 2 }]);
    expect(requests).toHaveLength(2);
    expect(new URL(requests[1]!.url).searchParams.get("cursor")).toBe("page-2");
  });
});
