import { expect, test } from "bun:test";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import { credentials } from "./credentials.ts";
import * as Retry from "./retry.ts";
import { getChannel, getGuild, NotFound } from "./services/discord.ts";

const respond = (status: number, body: unknown) =>
  Layer.mergeAll(
    credentials({ token: "test" }),
    Layer.succeed(
      HttpClient.HttpClient,
      HttpClient.make((request) =>
        Effect.succeed(
          HttpClientResponse.fromWeb(request, Response.json(body, { status })),
        ),
      ),
    ),
  );

test("getGuild decodes HTTP 404 with its generated NotFound class", () =>
  Effect.runPromise(
    getGuild({ guild_id: "1" }).pipe(
      Retry.none,
      Effect.map(() => "found"),
      Effect.catchTag("NotFound", (error) =>
        Effect.sync(() => {
          expect(error).toBeInstanceOf(NotFound);
          expect(error.code).toBe(10004);
          return error.message;
        }),
      ),
      Effect.provide(respond(404, { message: "Unknown Guild", code: 10004 })),
      Effect.map((result) => expect(result).toBe("Unknown Guild")),
    ),
  ));

test("getChannel decodes HTTP 404 with its generated NotFound class", () =>
  Effect.runPromise(
    getChannel({ channel_id: "1" }).pipe(
      Retry.none,
      Effect.map(() => "found"),
      Effect.catchTag("NotFound", (error) =>
        Effect.sync(() => {
          expect(error).toBeInstanceOf(NotFound);
          expect(error.code).toBe(10003);
          return error.message;
        }),
      ),
      Effect.provide(respond(404, { message: "Unknown Channel", code: 10003 })),
      Effect.map((result) => expect(result).toBe("Unknown Channel")),
    ),
  ));
