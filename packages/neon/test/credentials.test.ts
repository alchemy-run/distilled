import * as Cause from "effect/Cause";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { CredentialsFromEnv } from "../src/credentials.ts";
import * as Neon from "../src/index.ts";

describe("CredentialsFromEnv", () => {
  let saved: string | undefined;
  beforeEach(() => {
    saved = process.env.NEON_API_KEY;
    delete process.env.NEON_API_KEY;
  });
  afterEach(() => {
    if (saved !== undefined) process.env.NEON_API_KEY = saved;
  });

  test("a missing NEON_API_KEY fails the call with ConfigError and sends nothing", async () => {
    let sent = 0;
    const client = Layer.succeed(
      HttpClient.HttpClient,
      HttpClient.make((request) => {
        sent++;
        return Effect.succeed(HttpClientResponse.fromWeb(request, Response.json({})));
      }),
    );
    const exit = await Effect.runPromiseExit(
      Neon.deleteProject({ project_id: "p1" }).pipe(
        Effect.provide(Layer.mergeAll(client, CredentialsFromEnv)),
      ),
    );
    expect(Exit.isFailure(exit) && Cause.hasDies(exit.cause)).toBe(false);
    const error = Exit.isFailure(exit) ? Cause.findErrorOption(exit.cause) : undefined;
    expect(error?._tag).toBe("Some");
    expect(error?._tag === "Some" && error.value._tag).toBe("ConfigError");
    expect(sent).toBe(0);
  });
});
