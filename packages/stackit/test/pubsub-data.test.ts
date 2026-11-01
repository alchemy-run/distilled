import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Stream from "effect/Stream";
import { describe, expect, test } from "vitest";
import { Credentials } from "../src/credentials.ts";
import * as pubsub from "../src/services/pubsub.ts";
import * as data from "../src/services/pubsub_data.ts";

const TOPIC = "11111111-2222-3333-4444-555555555555";
const SUBSCRIPTION = "66666666-7777-8888-9999-000000000000";
const PLACE = { topicId: TOPIC, regionId: "eu01" };

interface Captured {
  readonly method: string;
  readonly url: string;
  readonly headers: Record<string, string>;
  readonly body: string | undefined;
}

/** Answers each request with the next answer (the last repeats), and records it. */
const fakeApi = (
  ...answers: ReadonlyArray<{ readonly status: number; readonly body?: unknown }>
) => {
  const calls: Captured[] = [];
  const http = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request, url) =>
      Effect.sync(() => {
        const requestBody = request.body;
        const answer = answers[Math.min(calls.length, answers.length - 1)]!;
        calls.push({
          method: request.method,
          url: url.toString(),
          headers: { ...request.headers },
          body:
            requestBody._tag === "Uint8Array"
              ? new TextDecoder().decode(requestBody.body)
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
    Credentials,
    Effect.succeed({ token: Redacted.make("access-token"), region: "eu01" }),
  );
  return { calls, layer: Layer.mergeAll(http, credentials) };
};

describe("pubsub_data", () => {
  test("publishes on the topic's own host, with the labels only in the host", async () => {
    const api = fakeApi({ status: 204 });
    await Effect.runPromise(
      data
        .publishMessages({ ...PLACE, messages: [{ data: "aGVsbG8=" }] })
        .pipe(Effect.provide(api.layer)),
    );
    expect(api.calls).toHaveLength(1);
    const call = api.calls[0]!;
    expect(call.method).toEqual("POST");
    expect(call.url).toEqual(`https://${TOPIC}.pubsub.eu01.onstackit.cloud/v1alpha/publish`);
    expect(call.headers.authorization).toEqual("Bearer access-token");
    expect(JSON.parse(call.body!)).toEqual({ messages: [{ data: "aGVsbG8=" }] });
  });

  test("takes the region from the request, not the credentials", async () => {
    const api = fakeApi({ status: 204 });
    await Effect.runPromise(
      data.purgeTopic({ topicId: TOPIC, regionId: "eu02" }).pipe(Effect.provide(api.layer)),
    );
    expect(api.calls[0]!.url).toEqual(`https://${TOPIC}.pubsub.eu02.onstackit.cloud/v1alpha/purge`);
  });

  test("pulls with the long-poll headers and decodes the batch", async () => {
    const api = fakeApi({
      status: 200,
      body: {
        messages: [
          {
            ackId: "ack-1",
            data: "aGVsbG8=",
            createTime: "2026-11-01T00:00:00Z",
            deliveryAttempts: 2,
          },
        ],
      },
    });
    const pulled = await Effect.runPromise(
      data
        .pullMessages({
          ...PLACE,
          subscriptionId: SUBSCRIPTION,
          pubSubMaxMessages: 8,
          pubSubLongPullDuration: 2500,
        })
        .pipe(Effect.provide(api.layer)),
    );
    const call = api.calls[0]!;
    expect(call.url).toEqual(
      `https://${TOPIC}.pubsub.eu01.onstackit.cloud/v1alpha/subscriptions/${SUBSCRIPTION}/pull`,
    );
    expect(call.headers["pubsub-max-messages"]).toEqual("8");
    expect(call.headers["pubsub-long-pull-duration"]).toEqual("2500");
    expect(pulled.messages.map((message) => message.ackId)).toEqual(["ack-1"]);
    expect(pulled.messages[0]!.deliveryAttempts).toEqual(2);
  });

  test("sends ack and nack ids as the body", async () => {
    const api = fakeApi({ status: 204 });
    await Effect.runPromise(
      Effect.gen(function* () {
        yield* data.ackMessages({ ...PLACE, subscriptionId: SUBSCRIPTION, ackIds: ["a"] });
        yield* data.nackMessages({ ...PLACE, subscriptionId: SUBSCRIPTION, nackIds: ["b"] });
      }).pipe(Effect.provide(api.layer)),
    );
    expect(api.calls[0]!.url).toMatch(/\/ack$/);
    expect(JSON.parse(api.calls[0]!.body!)).toEqual({ ackIds: ["a"] });
    expect(api.calls[1]!.url).toMatch(/\/nack$/);
    expect(JSON.parse(api.calls[1]!.body!)).toEqual({ nackIds: ["b"] });
  });

  test("refuses a host label that would send the token elsewhere, without calling out", async () => {
    const api = fakeApi({ status: 204 });
    const error = await Effect.runPromise(
      data
        .purgeTopic({ topicId: "evil.example/", regionId: "eu01" })
        .pipe(Effect.flip, Effect.provide(api.layer)),
    );
    expect(error._tag).toEqual("InvalidInput");
    expect(api.calls).toEqual([]);
  });

  test("types an oversized batch and a missing topic", async () => {
    const tooLarge = fakeApi({ status: 413, body: { message: "too large" } });
    const large = await Effect.runPromise(
      data
        .publishMessages({ ...PLACE, messages: [{ data: "aGVsbG8=" }] })
        .pipe(Effect.flip, Effect.provide(tooLarge.layer)),
    );
    expect(large._tag).toEqual("MessagesTooLarge");

    const missing = fakeApi({ status: 404, body: { message: "no such topic" } });
    const gone = await Effect.runPromise(
      data.purgeTopic(PLACE).pipe(Effect.flip, Effect.provide(missing.layer)),
    );
    expect(gone._tag).toEqual("NotFound");
  });
});

describe("pubsub", () => {
  test("listTopics follows nextPageToken through every page", async () => {
    const topic = (id: string) => ({
      id,
      displayName: id,
      state: "active",
      createTime: "2026-11-01T00:00:00Z",
    });
    const api = fakeApi(
      { status: 200, body: { topics: [topic("a")], nextPageToken: "second" } },
      { status: 200, body: { topics: [topic("b")], nextPageToken: "" } },
    );
    const topics = await Effect.runPromise(
      pubsub.listTopics
        .items({ projectId: "p", regionId: "eu01", pageSize: 100 })
        .pipe(Stream.runCollect, Effect.provide(api.layer)),
    );
    expect([...topics].map((item) => item.id)).toEqual(["a", "b"]);
    expect(api.calls).toHaveLength(2);
    expect(api.calls[0]!.url).toContain("https://pubsub.api.stackit.cloud/v1beta/projects/p/");
    expect(api.calls[1]!.url).toContain("pageToken=second");
  });
});
