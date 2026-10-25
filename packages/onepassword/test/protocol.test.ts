import * as ConfigProvider from "effect/ConfigProvider";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as UrlParams from "effect/http/UrlParams";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Stream from "effect/Stream";
import { describe, expect, test } from "vitest";
import {
  ConnectCredentialsFromEnv,
  connectCredentials,
  eventsCredentials,
  oauthCredentials,
  partnershipCredentials,
  usersCredentials,
  type OAuthConfig,
} from "../src/credentials.ts";
import { UnknownOnepasswordError } from "../src/errors.ts";
import * as Retry from "../src/retry.ts";
import { getVaults } from "../src/services/connect.ts";
import { getAuditEventsV2 } from "../src/services/events.ts";
import { requestAccessToken } from "../src/services/oauth.ts";
import { Gone, getAccount } from "../src/services/partnership.ts";
import { listUsers, suspendUser } from "../src/services/users.ts";

interface Seen {
  readonly method: string;
  readonly url: string;
  readonly headers: Record<string, string>;
  readonly body: string | undefined;
}

const bodyText = (request: HttpClientRequest.HttpClientRequest): string | undefined => {
  const body = request.body;
  if (body._tag === "Uint8Array") return new TextDecoder().decode(body.body);
  if (body._tag === "Raw") return String(body.body);
  return undefined;
};

/** An HttpClient that records each request and answers from `reply`. */
const recordingClient = (
  reply: (seen: Seen, index: number) => { status: number; body: unknown },
) => {
  const seen: Seen[] = [];
  const layer = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request) =>
      Effect.sync(() => {
        const entry: Seen = {
          method: request.method,
          url:
            request.url +
            (UrlParams.toString(request.urlParams)
              ? `?${UrlParams.toString(request.urlParams)}`
              : ""),
          headers: request.headers as Record<string, string>,
          body: bodyText(request),
        };
        seen.push(entry);
        const { status, body } = reply(entry, seen.length - 1);
        return HttpClientResponse.fromWeb(
          request,
          new Response(body === undefined ? null : JSON.stringify(body), {
            status,
            headers: { "content-type": "application/json" },
          }),
        );
      }),
    ),
  );
  return { seen, layer };
};

const run = <A, E, R>(effect: Effect.Effect<A, E, R>, layer: Layer.Layer<any>) =>
  Effect.runPromise(effect.pipe(Retry.none, Effect.provide(layer)) as Effect.Effect<A, E, never>);

describe("ConnectProtocol", () => {
  test("sends the Connect token to the configured server", async () => {
    const { seen, layer } = recordingClient(() => ({ status: 200, body: [] }));
    await run(
      getVaults({}),
      Layer.merge(
        layer,
        connectCredentials({
          token: Redacted.make("connect-token"),
          apiBaseUrl: "https://connect.example.com/v1",
        }),
      ),
    );
    expect(seen[0]!.url).toBe("https://connect.example.com/v1/vaults");
    expect(seen[0]!.headers.authorization).toBe("Bearer connect-token");
  });

  test("ConnectCredentialsFromEnv appends /v1 to OP_CONNECT_HOST", async () => {
    const { seen, layer } = recordingClient(() => ({ status: 200, body: [] }));
    await run(
      getVaults({}).pipe(
        Effect.provide(
          ConfigProvider.layer(
            ConfigProvider.fromUnknown({
              OP_CONNECT_TOKEN: "env-token",
              OP_CONNECT_HOST: "https://connect.example.com/",
            }),
          ),
        ),
      ),
      Layer.merge(layer, ConnectCredentialsFromEnv),
    );
    expect(seen[0]!.url).toBe("https://connect.example.com/v1/vaults");
    expect(seen[0]!.headers.authorization).toBe("Bearer env-token");
  });
});

describe("EventsProtocol", () => {
  const creds = eventsCredentials({
    token: Redacted.make("events-token"),
    apiBaseUrl: "https://events.1password.eu/",
  });

  test("sends the bearer token and the cursor body to the regional host", async () => {
    const { seen, layer } = recordingClient(() => ({
      status: 200,
      body: { cursor: "next", has_more: false, items: [] },
    }));
    const result = await run(
      getAuditEventsV2({ body: { limit: 10, start_time: "2026-10-01T00:00:00Z" } }),
      Layer.merge(layer, creds),
    );
    expect(result).toMatchObject({ cursor: "next", has_more: false, items: [] });
    expect(seen).toHaveLength(1);
    expect(seen[0]!.method).toBe("POST");
    expect(seen[0]!.url).toBe("https://events.1password.eu/api/v2/auditevents");
    expect(seen[0]!.headers.authorization).toBe("Bearer events-token");
    expect(JSON.parse(seen[0]!.body!)).toEqual({
      limit: 10,
      start_time: "2026-10-01T00:00:00Z",
    });
  });

  test("reads the message from the { Error: { Message } } envelope", async () => {
    const { layer } = recordingClient(() => ({
      status: 418,
      body: { Error: { Message: "token has no auditevents feature" } },
    }));
    const error = await run(
      Effect.flip(getAuditEventsV2({ body: { cursor: "c" } })),
      Layer.merge(layer, creds),
    );
    expect(error).toBeInstanceOf(UnknownOnepasswordError);
    expect(error).toMatchObject({ message: "token has no auditevents feature" });
  });
});

describe("UsersProtocol", () => {
  const fakeExchange = () => {
    const calls: OAuthConfig[] = [];
    const exchange = (config: OAuthConfig) =>
      Effect.sync(() => {
        calls.push(config);
        return {
          accessToken: Redacted.make(`op_o_c_${calls.length}`),
          expiresInSeconds: 900,
        };
      });
    return { calls, exchange };
  };

  test("exchanges client credentials once and reuses the access token", async () => {
    const { calls, exchange } = fakeExchange();
    const creds = usersCredentials(
      {
        clientId: "client",
        clientSecret: Redacted.make("secret"),
        apiBaseUrl: "https://api.1password.ca",
      },
      exchange,
    );
    const { seen, layer } = recordingClient(() => ({
      status: 200,
      body: { name: "accounts/A/users/U", state: "SUSPENDED" },
    }));
    const live = Layer.merge(layer, creds);
    await run(suspendUser({ account: "A", user: "U" }), live);
    await run(suspendUser({ account: "A", user: "U" }), live);

    expect(calls).toHaveLength(1);
    expect(calls[0]).toMatchObject({ clientId: "client", apiBaseUrl: "https://api.1password.ca" });
    expect(seen.map((s) => s.url)).toEqual([
      "https://api.1password.ca/v1/accounts/A/users/U:suspend",
      "https://api.1password.ca/v1/accounts/A/users/U:suspend",
    ]);
    expect(seen.every((s) => s.headers.authorization === "Bearer op_o_c_1")).toBe(true);
  });

  test("listUsers.pages follows next_page_token until it is omitted", async () => {
    const { exchange } = fakeExchange();
    const creds = usersCredentials({ clientId: "c", clientSecret: Redacted.make("s") }, exchange);
    const { seen, layer } = recordingClient((_, index) =>
      index === 0
        ? { status: 200, body: { results: [{ name: "u1" }], next_page_token: "p2" } }
        : { status: 200, body: { results: [{ name: "u2" }] } },
    );
    const items = await run(
      Stream.runCollect(listUsers.items({ account: "A" })),
      Layer.merge(layer, creds),
    );
    expect(Array.from(items).map((u: any) => u.name)).toEqual(["u1", "u2"]);
    expect(seen.map((s) => s.url)).toEqual([
      "https://api.1password.com/v1/accounts/A/users",
      "https://api.1password.com/v1/accounts/A/users?page_token=p2",
    ]);
  });
});

describe("OAuthProtocol", () => {
  test("sends Basic client credentials and a form body", async () => {
    const { seen, layer } = recordingClient(() => ({
      status: 200,
      body: { access_token: "op_o_c_x", token_type: "Bearer", expires_in: 900 },
    }));
    const result = await run(
      requestAccessToken({ grant_type: "client_credentials" }),
      Layer.merge(
        layer,
        oauthCredentials({ clientId: "client", clientSecret: Redacted.make("secret") }),
      ),
    );
    expect(Redacted.isRedacted(result.access_token)).toBe(true);
    expect(seen[0]!.url).toBe("https://api.1password.com/v1/oauth/token");
    expect(seen[0]!.headers.authorization).toBe(`Basic ${btoa("client:secret")}`);
    expect(seen[0]!.body).toBe("grant_type=client_credentials");
  });
});

describe("PartnershipProtocol", () => {
  test("maps 410 to Gone with the envelope's description", async () => {
    const { seen, layer } = recordingClient(() => ({
      status: 410,
      body: { code: 410, error: "gone", description: "The requested account is gone." },
    }));
    const error = await run(
      Effect.flip(getAccount({ customer_account_uid: "cust-1" })),
      Layer.merge(layer, partnershipCredentials({ token: Redacted.make("partner-token") })),
    );
    expect(error).toBeInstanceOf(Gone);
    expect(seen[0]!.url).toBe("https://billing.1password.com/api/v1/partners/accounts/cust-1");
    expect(seen[0]!.headers.authorization).toBe("Bearer partner-token");
  });
});
