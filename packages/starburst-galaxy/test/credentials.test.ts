// The hand-written credentials: where the client secret and every token are sent.
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as TestClock from "effect/testing/TestClock";
import { describe, expect, it } from "vitest";
import * as StarburstGalaxy from "../src/index.ts";

const resolveFor = (domain: string) =>
  Effect.runPromiseExit(
    Effect.flatMap(StarburstGalaxy.Credentials, (resolve) => resolve).pipe(
      Effect.map(({ accessToken, apiBaseUrl }) => ({
        accessToken: Redacted.value(accessToken),
        apiBaseUrl,
      })),
      Effect.provide(
        StarburstGalaxy.fromAccessToken({ domain, accessToken: Redacted.make("held-token") }),
      ),
    ),
  );

const failureMessage = (exit: Exit.Exit<unknown, StarburstGalaxy.ConfigError>) =>
  Exit.isFailure(exit) ? String(exit.cause) : undefined;

describe("the account domain", () => {
  it("is a host or an HTTPS origin, resolved to the origin", async () => {
    const origin = { accessToken: "held-token", apiBaseUrl: "https://yourco.galaxy.starburst.io" };
    expect(await resolveFor("yourco.galaxy.starburst.io")).toEqual(Exit.succeed(origin));
    expect(await resolveFor("https://yourco.galaxy.starburst.io/")).toEqual(Exit.succeed(origin));
  });

  it("accepts plain HTTP on loopback only", async () => {
    expect(await resolveFor("http://localhost:8080")).toEqual(
      Exit.succeed({ accessToken: "held-token", apiBaseUrl: "http://localhost:8080" }),
    );
    expect(failureMessage(await resolveFor("http://yourco.galaxy.starburst.io"))).toContain(
      "must use HTTPS",
    );
  });

  it("refuses a path, query or user info the secret could be sent along", async () => {
    for (const domain of [
      "https://yourco.galaxy.starburst.io/public/api",
      "https://yourco.galaxy.starburst.io/?x=1",
      "https://user:pass@yourco.galaxy.starburst.io",
    ]) {
      expect(failureMessage(await resolveFor(domain))).toContain("without a path");
    }
    expect(failureMessage(await resolveFor("https://"))).toContain("is not a host name or URL");
  });
});

describe("the access token", () => {
  it("is reused for half the lifetime of a token that lives under a minute", async () => {
    let exchanges = 0;
    const http = Layer.succeed(
      HttpClient.HttpClient,
      HttpClient.make((request) => {
        exchanges++;
        return Effect.succeed(
          HttpClientResponse.fromWeb(
            request,
            Response.json({ access_token: `token-${exchanges}`, expires_in: 30 }),
          ),
        );
      }),
    );
    const tokens = await Effect.runPromise(
      Effect.gen(function* () {
        const resolve = yield* StarburstGalaxy.Credentials;
        const read = Effect.flatMap(resolve, (c) => Effect.succeed(Redacted.value(c.accessToken)));
        const first = yield* read;
        yield* TestClock.adjust(Duration.seconds(14));
        const reused = yield* read;
        yield* TestClock.adjust(Duration.seconds(1));
        return [first, reused, yield* read];
      }).pipe(
        Effect.provide(
          StarburstGalaxy.fromClientCredentials({
            domain: "yourco.galaxy.starburst.io",
            clientId: "client-id",
            clientSecret: Redacted.make("client-secret"),
          }).pipe(Layer.provide(http)),
        ),
        Effect.provide(TestClock.layer()),
      ),
    );
    expect(tokens).toEqual(["token-1", "token-1", "token-2"]);
  });
});
