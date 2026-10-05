import * as CoreErrors from "@distilled.cloud/core/errors";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { type Credentials, credentials } from "./credentials.ts";
import { FreeProjectLimitReached, UnknownSupabaseError } from "./errors.ts";
import * as Retry from "./retry.ts";
import {
  BadRequest,
  NotFound,
  v1CreateAProject,
  v1ExchangeOauthToken,
  v1GetASnippet,
  v1ListAllSnippets,
} from "./services/supabase.ts";

interface Captured {
  readonly method: string;
  readonly url: URL;
  readonly headers: Record<string, string>;
  readonly body: string | undefined;
}

const fakeSupabase = (
  status = 200,
  body: string | null = "{}",
  headers: Record<string, string> = {},
) => {
  const calls: Captured[] = [];
  const layer = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request, url) =>
      Effect.sync(() => {
        calls.push({
          method: request.method,
          url,
          headers: { ...request.headers },
          body:
            request.body._tag === "Uint8Array"
              ? new TextDecoder().decode(request.body.body)
              : undefined,
        });
        return HttpClientResponse.fromWeb(request, new Response(body, { status, headers }));
      }),
    ),
  );
  return { calls, layer };
};

const creds = credentials({ accessToken: Redacted.make("sbp_test") });

const run = <A, E>(
  operation: Effect.Effect<A, E, Credentials | HttpClient.HttpClient>,
  http: Layer.Layer<HttpClient.HttpClient>,
) => Effect.runPromise(operation.pipe(Retry.none, Effect.provide(creds), Effect.provide(http)));

const runFlip = <A, E>(
  operation: Effect.Effect<A, E, Credentials | HttpClient.HttpClient>,
  http: Layer.Layer<HttpClient.HttpClient>,
) =>
  Effect.runPromise(
    operation.pipe(Retry.none, Effect.provide(creds), Effect.provide(http), Effect.flip),
  );

const createProject = v1CreateAProject({
  db_pass: "pw",
  name: "demo",
  organization_slug: "acme",
});

const freeLimitMessage =
  "The following organization members have reached their maximum limits for the number of active free projects within organizations where they are an administrator or owner: x (2 project limit).";

describe("free-project limit quirk", () => {
  test("'active free projects' in the message becomes FreeProjectLimitReached", async () => {
    const { layer } = fakeSupabase(400, JSON.stringify({ message: freeLimitMessage }));
    const error = await runFlip(createProject, layer);
    expect(error).toBeInstanceOf(FreeProjectLimitReached);
    expect(error).toMatchObject({ message: freeLimitMessage });
  });

  test("it wins over status mapping at any status, and over plain-text bodies", async () => {
    for (const status of [402, 403, 429, 500]) {
      const { layer } = fakeSupabase(status, JSON.stringify({ message: freeLimitMessage }));
      expect(await runFlip(createProject, layer)).toBeInstanceOf(FreeProjectLimitReached);
    }
    const { layer } = fakeSupabase(400, `  ${freeLimitMessage}  `);
    const error = await runFlip(createProject, layer);
    expect(error).toBeInstanceOf(FreeProjectLimitReached);
    expect(error).toMatchObject({ message: freeLimitMessage });
  });

  test("other 400 messages stay BadRequest", async () => {
    const { layer } = fakeSupabase(400, JSON.stringify({ message: "name is invalid" }));
    const error = await runFlip(createProject, layer);
    expect(error).toBeInstanceOf(BadRequest);
    expect(error).toMatchObject({ message: "name is invalid" });
  });
});

describe("406 → NotFound quirk", () => {
  test("406 matches the operation's declared NotFound", async () => {
    const { layer } = fakeSupabase(406, JSON.stringify({ message: "Snippet not found" }));
    const error = await runFlip(v1GetASnippet({ id: "s1" }), layer);
    expect(error).toBeInstanceOf(NotFound);
    expect(error).toMatchObject({ message: "Snippet not found" });
  });

  test("406 maps to core NotFound when the operation declares none", async () => {
    const { layer } = fakeSupabase(406, "");
    const error = await runFlip(v1ListAllSnippets({}), layer);
    expect(error).toBeInstanceOf(CoreErrors.NotFound);
    expect(error).toMatchObject({ message: "HTTP 406" });
  });
});

describe("REST behaviour", () => {
  test("sends Bearer auth to the default base URL", async () => {
    const { calls, layer } = fakeSupabase(200, JSON.stringify({ id: "s1" }));
    await run(v1GetASnippet({ id: "a/b" }), layer);
    expect(calls[0].headers.authorization).toBe("Bearer sbp_test");
    expect(calls[0].url.href).toBe("https://api.supabase.com/v1/snippets/a%2Fb");
  });

  test("the OAuth token exchange is sent form-urlencoded with Redacted inputs unwrapped", async () => {
    const { calls, layer } = fakeSupabase(
      200,
      JSON.stringify({
        access_token: "at",
        refresh_token: "rt",
        expires_in: 3600,
        token_type: "Bearer",
      }),
    );
    const token = await run(
      v1ExchangeOauthToken({
        grant_type: "refresh_token",
        client_id: "cid",
        client_secret: Redacted.make("cs"),
        refresh_token: Redacted.make("old-rt"),
      }),
      layer,
    );
    expect(calls[0].headers["content-type"]).toBe("application/x-www-form-urlencoded");
    expect(Object.fromEntries(new URLSearchParams(calls[0].body))).toEqual({
      grant_type: "refresh_token",
      client_id: "cid",
      client_secret: "cs",
      refresh_token: "old-rt",
    });
    // Sensitive response members are delivered as Redacted.
    expect(Redacted.isRedacted(token.access_token)).toBe(true);
    expect(Redacted.value(token.access_token as Redacted.Redacted<string>)).toBe("at");
    expect(token.expires_in).toBe(3600);
  });

  test("ordinary operations send a JSON body", async () => {
    const { calls, layer } = fakeSupabase(200, JSON.stringify({}));
    await run(createProject, layer);
    expect(calls[0].headers["content-type"]).toBe("application/json");
    expect(JSON.parse(calls[0].body!)).toEqual({
      db_pass: "pw",
      name: "demo",
      organization_slug: "acme",
    });
  });

  test("retryable statuses carry Retry-After", async () => {
    const { layer } = fakeSupabase(429, JSON.stringify({ message: "rate limited" }), {
      "retry-after": "2",
    });
    const error = await runFlip(createProject, layer);
    expect(error).toBeInstanceOf(CoreErrors.TooManyRequests);
    expect((error as CoreErrors.TooManyRequests).retryAfter).toBeDefined();
  });

  test("unmapped 5xx becomes InternalServerError; unmapped 4xx UnknownSupabaseError", async () => {
    const server = fakeSupabase(507, "disk full");
    const serverError = await runFlip(createProject, server.layer);
    expect(serverError).toBeInstanceOf(CoreErrors.InternalServerError);
    expect(serverError).toMatchObject({ message: "disk full" });

    const body = { message: "payment required" };
    const client = fakeSupabase(402, JSON.stringify(body));
    const clientError = await runFlip(createProject, client.layer);
    expect(clientError).toBeInstanceOf(UnknownSupabaseError);
    expect(clientError).toMatchObject({ message: "payment required", body });
  });
});
