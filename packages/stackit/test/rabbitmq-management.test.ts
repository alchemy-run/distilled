import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import {
  RabbitMQManagementCredentials,
  rabbitmqManagementApiUrl,
  rabbitmqManagementCredentialsOf,
} from "../src/credentials.ts";
import * as management from "../src/services/rabbitmq_management.ts";

interface Captured {
  readonly method: string;
  readonly url: string;
  readonly authorization: string | undefined;
  readonly body: unknown;
}

const PASSWORD = "s3cret-password";

/** Answers every request with `answer`, and records it. */
const fakeBroker = (answer: { readonly status: number; readonly body?: unknown }) => {
  const calls: Captured[] = [];
  const http = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request, url) =>
      Effect.sync(() => {
        calls.push({
          method: request.method,
          url: url.toString(),
          authorization: request.headers.authorization,
          body:
            request.body._tag === "Uint8Array"
              ? JSON.parse(new TextDecoder().decode(request.body.body))
              : undefined,
        });
        return HttpClientResponse.fromWeb(
          request,
          new Response(answer.body === undefined ? null : JSON.stringify(answer.body), {
            status: answer.status,
          }),
        );
      }),
    ),
  );
  const credentials = Layer.succeed(
    RabbitMQManagementCredentials,
    rabbitmqManagementCredentialsOf({
      httpApiUri: `https://user:${PASSWORD}@broker.example:15671/api/`,
      username: "user",
      password: Redacted.make(PASSWORD),
    }),
  );
  return { calls, layer: Layer.mergeAll(http, credentials) };
};

describe("rabbitmqManagementApiUrl", () => {
  test("drops the user, the password and a trailing /api", () => {
    expect(rabbitmqManagementApiUrl("https://user:pw@broker.example:15671/api")).toEqual(
      "https://broker.example:15671",
    );
    expect(rabbitmqManagementApiUrl("https://user:pw@broker.example/api/")).toEqual(
      "https://broker.example",
    );
  });

  test("keeps a path prefix and gives a bare host https", () => {
    expect(rabbitmqManagementApiUrl("https://broker.example/rabbit/api")).toEqual(
      "https://broker.example/rabbit",
    );
    expect(rabbitmqManagementApiUrl("broker.example")).toEqual("https://broker.example");
  });

  test("refuses what isn't a URL, without quoting it", async () => {
    expect(rabbitmqManagementApiUrl("https://user:pw@")).toBeUndefined();
    const error = await Effect.runPromise(
      rabbitmqManagementCredentialsOf({
        httpApiUri: `https://user:${PASSWORD}@`,
        username: "user",
        password: Redacted.make(PASSWORD),
      }).pipe(Effect.flip),
    );
    expect(error._tag).toEqual("ConfigError");
    expect(error.message).not.toContain(PASSWORD);
  });
});

describe("RabbitMQManagementProtocol", () => {
  test("signs with Basic auth and encodes the default virtual host", async () => {
    const { calls, layer } = fakeBroker({ status: 200, body: { routed: true } });
    const result = await Effect.runPromise(
      management
        .publishMessage({
          vhost: "/",
          exchange: "amq.default",
          properties: {},
          routing_key: "jobs",
          payload: "hello",
          payload_encoding: "string",
        })
        .pipe(Effect.provide(layer)),
    );
    expect(result).toEqual({ routed: true });
    expect(calls).toEqual([
      {
        method: "POST",
        url: "https://broker.example:15671/api/exchanges/%2F/amq.default/publish",
        authorization: `Basic ${btoa(`user:${PASSWORD}`)}`,
        body: {
          properties: {},
          routing_key: "jobs",
          payload: "hello",
          payload_encoding: "string",
        },
      },
    ]);
  });

  test("returns a bare array body", async () => {
    const { layer } = fakeBroker({
      status: 200,
      body: [{ name: "jobs", vhost: "/", durable: true }],
    });
    const queues = await Effect.runPromise(
      management.listQueues({ vhost: "/" }).pipe(Effect.provide(layer)),
    );
    expect(queues).toEqual([{ name: "jobs", vhost: "/", durable: true }]);
  });

  test("a declare answers with no body", async () => {
    const { layer } = fakeBroker({ status: 201 });
    await Effect.runPromise(
      management.putQueue({ vhost: "/", queue: "jobs", durable: true }).pipe(Effect.provide(layer)),
    );
  });

  test("types a missing queue", async () => {
    const { layer } = fakeBroker({
      status: 404,
      body: { error: "not_found", reason: "queue_not_found" },
    });
    const error = await Effect.runPromise(
      management.getQueue({ vhost: "/", queue: "gone" }).pipe(Effect.flip, Effect.provide(layer)),
    );
    expect(error._tag).toEqual("NotFound");
    expect(error.message).toEqual("queue_not_found");
  });

  test("tells a settings clash from a malformed declare", async () => {
    const clash = fakeBroker({
      status: 400,
      body: {
        error: "bad_request",
        reason: "inequivalent arg 'durable' for queue 'q1' in vhost '/'",
      },
    });
    const malformed = fakeBroker({
      status: 400,
      body: { error: "bad_request", reason: "unknown exchange type 'bogus'" },
    });
    const clashError = await Effect.runPromise(
      management
        .putQueue({ vhost: "/", queue: "q1", durable: false })
        .pipe(Effect.flip, Effect.provide(clash.layer)),
    );
    const malformedError = await Effect.runPromise(
      management
        .putExchange({ vhost: "/", exchange: "e", type: "bogus" })
        .pipe(Effect.flip, Effect.provide(malformed.layer)),
    );
    expect(clashError._tag).toEqual("InequivalentArguments");
    expect(malformedError._tag).toEqual("BadRequest");
  });
});
