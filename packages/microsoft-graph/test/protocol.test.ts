/**
 * The Microsoft Graph protocol and credentials, no network: a fake
 * HttpClient answers the token endpoint and Graph.
 */
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Stream from "effect/Stream";
import { describe, expect, test } from "vitest";
import { fromClientSecret, GRAPH_SCOPE } from "../src/credentials.ts";
import * as Retry from "../src/retry.ts";
import { listApplication } from "../src/services/applications.ts";

interface Captured {
  readonly url: URL;
  readonly headers: Record<string, string>;
  readonly body: string | undefined;
}

const GRAPH = "https://graph.microsoft.com/v1.0";
const LOGIN = "https://login.microsoftonline.com/tenant-1/oauth2/v2.0/token";

/** Entra ID issues one token; Graph answers `pages` in turn. */
const fakeHttp = (pages: ReadonlyArray<unknown>) => {
  const calls: Captured[] = [];
  let page = 0;
  const layer = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request, url) =>
      Effect.sync(() => {
        calls.push({
          url,
          headers: { ...request.headers },
          body:
            request.body._tag === "Uint8Array"
              ? new TextDecoder().decode(request.body.body)
              : undefined,
        });
        const json =
          url.toString() === LOGIN
            ? { token_type: "Bearer", expires_in: 3599, access_token: "graph-token" }
            : pages[page++];
        return HttpClientResponse.fromWeb(request, new Response(JSON.stringify(json)));
      }),
    ),
  );
  return { calls, layer };
};

const credentials = fromClientSecret({
  tenantId: "tenant-1",
  clientId: "client-1",
  clientSecret: Redacted.make("s3cret"),
});

const run = <A, E>(effect: Effect.Effect<A, E, any>, http: Layer.Layer<HttpClient.HttpClient>) =>
  Effect.runPromise(
    effect.pipe(Retry.none, Effect.provide(Layer.merge(credentials, http))) as Effect.Effect<A, E>,
  );

describe("MicrosoftGraphProtocol", () => {
  test("sends $select as one comma-joined value with the minted token", async () => {
    const { calls, layer } = fakeHttp([{ value: [] }]);
    await run(listApplication({ select: ["id", "appId"], top: 5 }), layer);
    const [token, list] = calls;
    expect(new URLSearchParams(token!.body).get("scope")).toBe(GRAPH_SCOPE);
    expect(`${list!.url.origin}${list!.url.pathname}`).toBe(`${GRAPH}/applications`);
    expect(list!.url.searchParams.getAll("$select")).toEqual(["id,appId"]);
    expect(list!.url.searchParams.get("$top")).toBe("5");
    expect(list!.headers.authorization).toBe("Bearer graph-token");
  });

  test(".items follows @odata.nextLink; the layer's cached token serves both pages", async () => {
    const next = `${GRAPH}/applications?$skiptoken=abc`;
    const { calls, layer } = fakeHttp([
      { value: [{ id: "a" }], "@odata.nextLink": next },
      { value: [{ id: "b" }] },
    ]);
    const items = await run(Stream.runCollect(listApplication.items({})), layer);
    expect(Array.from(items).map((a) => a.id)).toEqual(["a", "b"]);
    // The first test minted the token; this run reuses the same layer value's cache.
    expect(calls.map((c) => c.url.toString())).toEqual([`${GRAPH}/applications`, next]);
    expect(calls[1]!.headers.authorization).toBe("Bearer graph-token");
  });

  test("a nextLink off the Graph origin fails with InvalidInput and is never requested", async () => {
    const { calls, layer } = fakeHttp([]);
    const error = await run(
      Effect.flip(listApplication({ nextLink: "https://evil.example/applications" })),
      layer,
    );
    expect(error._tag).toBe("InvalidInput");
    expect(calls.some((c) => c.url.host === "evil.example")).toBe(false);
  });
});
