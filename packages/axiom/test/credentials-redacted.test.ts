import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { Credentials } from "../src/credentials.ts";
import * as Retry from "../src/retry.ts";
import { createAPIToken, getNotifier } from "../src/services/v2.ts";

const respondWith = (body: unknown) =>
  Layer.mergeAll(
    Layer.succeed(
      HttpClient.HttpClient,
      HttpClient.make((request) =>
        Effect.succeed(
          HttpClientResponse.fromWeb(
            request,
            new Response(JSON.stringify(body), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            }),
          ),
        ),
      ),
    ),
    Layer.succeed(
      Credentials,
      Effect.succeed({
        apiKey: Redacted.make("xaat-test"),
        apiBaseUrl: "https://api.axiom.test",
      }),
    ),
  );

const expectRedacted = (value: unknown, secret: string) => {
  expect(Redacted.isRedacted(value)).toBe(true);
  expect(Redacted.value(value as Redacted.Redacted<string>)).toBe(secret);
};

describe("getNotifier", () => {
  test("notifier credentials come back Redacted", async () => {
    const result = await Effect.runPromise(
      getNotifier({ id: "notify_1" }).pipe(
        Retry.none,
        Effect.provide(
          respondWith({
            id: "notify_1",
            name: "alerts",
            properties: {
              discord: { discordChannel: "c1", discordToken: "fixture-discord-token" },
              discordWebhook: { discordWebhookUrl: "https://discord.test/fixture-discord-hook" },
              slack: { slackUrl: "https://hooks.slack.test/fixture-slack-hook" },
              microsoftTeams: { microsoftTeamsUrl: "https://teams.test/fixture-teams-hook" },
              pagerduty: { routingKey: "fixture-pd-key", token: "fixture-pd-token" },
            },
          }),
        ),
      ),
    );

    const { discord, discordWebhook, slack, microsoftTeams, pagerduty } = result.properties;
    expect(discord?.discordChannel).toBe("c1");
    expectRedacted(discord?.discordToken, "fixture-discord-token");
    expectRedacted(discordWebhook?.discordWebhookUrl, "https://discord.test/fixture-discord-hook");
    expectRedacted(slack?.slackUrl, "https://hooks.slack.test/fixture-slack-hook");
    expectRedacted(microsoftTeams?.microsoftTeamsUrl, "https://teams.test/fixture-teams-hook");
    expectRedacted(pagerduty?.routingKey, "fixture-pd-key");
    expectRedacted(pagerduty?.token, "fixture-pd-token");
    expect(JSON.stringify(result)).not.toContain("fixture-");
  });
});

describe("createAPIToken", () => {
  test("the new token comes back Redacted", async () => {
    const result = await Effect.runPromise(
      createAPIToken({ name: "ci" }).pipe(
        Retry.none,
        Effect.provide(
          respondWith({
            id: "tok_1",
            name: "ci",
            datasetCapabilities: {},
            orgCapabilities: {},
            token: "xaat-fixture-new-token",
          }),
        ),
      ),
    );

    expectRedacted(result.token, "xaat-fixture-new-token");
    expect(JSON.stringify(result)).not.toContain("xaat-fixture-new-token");
  });
});
