import * as ResponseValidation from "@distilled.cloud/core/response-validation";
/**
 * The hand-authored models in manual-specs/ (Service Bus and Event Hubs
 * messaging, Cosmos DB for NoSQL, Kudu), no network: each case runs one
 * operation against a fake client, pins the request it sent (URL, method,
 * auth header, headers, body) and decodes a canned response in strict
 * validation. Error bodies are the ones the live services returned.
 */
import * as Cause from "effect/Cause";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { ARM_SCOPE, Credentials, type Config } from "../src/credentials.ts";
import * as Retry from "../src/retry.ts";
import * as cosmos from "../src/services/cosmos-nosql.ts";
import * as eventhubs from "../src/services/eventhubs-messaging.ts";
import * as kudu from "../src/services/kudu.ts";
import * as servicebus from "../src/services/servicebus-messaging.ts";

interface Captured {
  readonly method: string;
  readonly url: string;
  readonly headers: Record<string, string>;
  readonly body: Uint8Array | undefined;
}

interface Canned {
  readonly status?: number;
  readonly body?: string | Uint8Array<ArrayBuffer>;
  readonly headers?: Record<string, string>;
}

const credentials = Layer.succeed(
  Credentials,
  Effect.succeed<Config>({
    token: (scope) =>
      Effect.succeed(Redacted.make(scope === ARM_SCOPE ? "arm-token" : `aad:${scope}`)),
    subscriptionId: "00000000-0000-0000-0000-000000000001",
    apiBaseUrl: "https://management.azure.com",
  }),
);

/** Run one operation against a fake client answering `canned`, in strict response validation. */
const run = async <A, E>(
  operation: Effect.Effect<A, E, Credentials | HttpClient.HttpClient>,
  canned: Canned = {},
): Promise<{ request: Captured; exit: Exit.Exit<A, E> }> => {
  const calls: Captured[] = [];
  const client = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request, url) =>
      Effect.sync(() => {
        calls.push({
          method: request.method,
          url: url.href,
          headers: { ...request.headers },
          body: request.body._tag === "Uint8Array" ? request.body.body : undefined,
        });
        return HttpClientResponse.fromWeb(
          request,
          new Response(canned.body ?? null, {
            status: canned.status ?? 200,
            headers: canned.headers,
          }),
        );
      }),
    ),
  );
  const exit = await Effect.runPromise(
    operation.pipe(
      Retry.none,
      Effect.provide(ResponseValidation.strict),
      Effect.provide(credentials),
      Effect.provide(client),
      Effect.exit,
    ),
  );
  expect(calls).toHaveLength(1);
  return { request: calls[0]!, exit };
};

const ok = <A, E>(exit: Exit.Exit<A, E>): A => {
  if (Exit.isFailure(exit)) throw new Error(`expected success, got ${String(exit.cause)}`);
  return exit.value;
};
const failure = <A, E extends { readonly _tag: string }>(exit: Exit.Exit<A, E>): E => {
  if (Exit.isSuccess(exit)) throw new Error("expected a failure");
  const reason = exit.cause.reasons.find(Cause.isFailReason);
  if (reason === undefined) throw new Error(`expected a typed failure, got ${String(exit.cause)}`);
  return reason.error;
};
const text = (b: Uint8Array | undefined) =>
  b === undefined ? undefined : new TextDecoder().decode(b);
const json = (b: Uint8Array | undefined) => JSON.parse(text(b)!);

const SB = "https://my-ns.servicebus.windows.net";
const SB_TOKEN = "Bearer aad:https://servicebus.azure.net/.default";
const EH_TOKEN = "Bearer aad:https://eventhubs.azure.net/.default";
const sbError = (status: number, detail: string): Canned => ({
  status,
  body: `<Error><Code>${status}</Code><Detail>${detail} TrackingId:0e583de0_G3, SystemTracker:my-ns:Queue:jobs, Timestamp:2026-10-23T22:51:20</Detail></Error>`,
  headers: { "content-type": "application/xml; charset=utf-8" },
});

describe("servicebus-messaging", () => {
  test("SendMessage sends the payload with BrokerProperties and custom property headers", async () => {
    const { request, exit } = await run(
      servicebus.SendMessage({
        namespaceName: "my-ns",
        entityPath: "jobs",
        body: "This is a message.",
        contentType: "text/plain",
        brokerProperties: { label: "M1", timeToLive: 10, messageId: "m-1" },
        customProperties: { Priority: "High" },
        timeout: 60,
      }),
      { status: 201, headers: { "content-type": "application/xml; charset=utf-8" } },
    );
    ok(exit);
    expect(request.method).toBe("POST");
    expect(request.url).toBe(`${SB}/jobs/messages?timeout=60`);
    expect(request.headers.authorization).toBe(SB_TOKEN);
    expect(JSON.parse(request.headers.brokerproperties!)).toEqual({
      Label: "M1",
      TimeToLive: 10,
      MessageId: "m-1",
    });
    expect(request.headers.priority).toBe("High");
    expect(request.headers["content-type"]).toBe("text/plain");
    expect(text(request.body)).toBe("This is a message.");
  });

  test("SendMessage sends bytes as they are under the default media type", async () => {
    const { request } = await run(
      servicebus.SendMessage({
        namespaceName: "my-ns",
        entityPath: "orders/eu",
        body: new Uint8Array([0, 1, 2, 255]),
      }),
      { status: 201 },
    );
    expect(request.url).toBe(`${SB}/orders/eu/messages`);
    expect(request.headers["content-type"]).toBe("application/atom+xml;type=entry;charset=utf-8");
    expect([...request.body!]).toEqual([0, 1, 2, 255]);
    expect(request.headers.brokerproperties).toBeUndefined();
  });

  test("SendMessageBatch posts a JSON array under the exact batch media type", async () => {
    const { request } = await run(
      servicebus.SendMessageBatch({
        namespaceName: "my-ns",
        entityPath: "jobs",
        messages: [
          { body: "first", brokerProperties: { label: "M1", timeToLiveTimeSpan: "0.00:00:40" } },
          { body: "second", userProperties: { Priority: "Low", Count: 2 } },
        ],
      }),
      { status: 201 },
    );
    expect(request.method).toBe("POST");
    expect(request.url).toBe(`${SB}/jobs/messages`);
    expect(request.headers["content-type"]).toBe("application/vnd.microsoft.servicebus.json");
    expect(json(request.body)).toEqual([
      { Body: "first", BrokerProperties: { Label: "M1", TimeToLiveTimeSpan: "0.00:00:40" } },
      { Body: "second", UserProperties: { Priority: "Low", Count: 2 } },
    ]);
  });

  test("PeekLockMessage sends an empty body and decodes the locked message", async () => {
    const broker = {
      DeliveryCount: 1,
      EnqueuedTimeUtc: "Fri, 23 Oct 2026 22:51:18 GMT",
      Label: "M1",
      LockToken: "281e6f7b-5fcf-4548-9c1f-4a587e98092f",
      LockedUntilUtc: "Fri, 23 Oct 2026 22:52:18 GMT",
      MessageId: "3e1b02886d2d44a18b5f9a284cb2bdb8",
      SequenceNumber: 1,
      State: "Active",
      TimeToLive: 922337203685.47754,
    };
    const { request, exit } = await run(
      servicebus.PeekLockMessage({ namespaceName: "my-ns", queueName: "jobs", timeout: 5 }),
      {
        status: 201,
        body: "hello",
        headers: {
          brokerproperties: JSON.stringify(broker),
          "content-type": "text/plain",
          location: `${SB}/jobs/messages/1/281e6f7b-5fcf-4548-9c1f-4a587e98092f`,
          priority: '"High"',
        },
      },
    );
    expect(request.method).toBe("POST");
    expect(request.url).toBe(`${SB}/jobs/messages/head?timeout=5`);
    expect(request.body).toEqual(new Uint8Array(0));
    const message = ok(exit);
    expect(text(message.body)).toBe("hello");
    expect(message.contentType).toBe("text/plain");
    expect(message.location).toBe(`${SB}/jobs/messages/1/281e6f7b-5fcf-4548-9c1f-4a587e98092f`);
    expect(message.brokerProperties).toEqual({
      deliveryCount: 1,
      enqueuedTimeUtc: "Fri, 23 Oct 2026 22:51:18 GMT",
      label: "M1",
      lockToken: "281e6f7b-5fcf-4548-9c1f-4a587e98092f",
      lockedUntilUtc: "Fri, 23 Oct 2026 22:52:18 GMT",
      messageId: "3e1b02886d2d44a18b5f9a284cb2bdb8",
      sequenceNumber: 1,
      state: "Active",
      timeToLive: 922337203685.47754,
    });
    expect(message.headers?.priority).toBe('"High"');
  });

  test("a 204 (no message within the timeout) has no body and no broker properties", async () => {
    const { exit } = await run(
      servicebus.PeekLockSubscriptionMessage({
        namespaceName: "my-ns",
        topicName: "events",
        subscriptionName: "audit",
        timeout: 1,
      }),
      { status: 204, headers: { "content-type": "application/xml; charset=utf-8" } },
    );
    const empty = ok(exit);
    expect(empty.body).toBeUndefined();
    expect(empty.brokerProperties).toBeUndefined();
  });

  test("ReceiveAndDeleteMessage is a DELETE on the queue head", async () => {
    const { request, exit } = await run(
      servicebus.ReceiveAndDeleteMessage({ namespaceName: "my-ns", queueName: "jobs" }),
      { status: 200, body: "x", headers: { brokerproperties: '{"SequenceNumber":7}' } },
    );
    expect(request.method).toBe("DELETE");
    expect(request.url).toBe(`${SB}/jobs/messages/head`);
    expect(ok(exit).brokerProperties?.sequenceNumber).toBe(7);
  });

  test("settle operations address the lock URI", async () => {
    const lock = { namespaceName: "my-ns", queueName: "jobs", messageId: "1", lockToken: "lt" };
    const complete = await run(servicebus.CompleteMessage(lock));
    const unlock = await run(servicebus.UnlockMessage(lock));
    const renew = await run(
      servicebus.RenewSubscriptionMessageLock({
        namespaceName: "my-ns",
        topicName: "events",
        subscriptionName: "audit",
        messageId: "4",
        lockToken: "lt",
      }),
    );
    expect([complete.request.method, complete.request.url]).toEqual([
      "DELETE",
      `${SB}/jobs/messages/1/lt`,
    ]);
    expect([unlock.request.method, unlock.request.url]).toEqual([
      "PUT",
      `${SB}/jobs/messages/1/lt`,
    ]);
    expect(unlock.request.body).toEqual(new Uint8Array(0));
    expect([renew.request.method, renew.request.url]).toEqual([
      "POST",
      `${SB}/events/subscriptions/audit/messages/4/lt`,
    ]);
  });

  test("an invalid lock is MessageLockLost", async () => {
    const { exit } = await run(
      servicebus.CompleteMessage({
        namespaceName: "my-ns",
        queueName: "jobs",
        messageId: "1",
        lockToken: "00000000-0000-0000-0000-000000000000",
      }),
      sbError(
        404,
        "The lock supplied is invalid. Either the lock expired, or the message has already been removed from the queue.",
      ),
    );
    const error = failure(exit);
    expect(error._tag).toBe("MessageLockLost");
    expect(error.message).toContain("The lock supplied is invalid");
  });

  test("a missing queue is MessagingEntityNotFound (404 and 410)", async () => {
    const missing = await run(
      servicebus.SendMessage({ namespaceName: "my-ns", entityPath: "nope", body: "x" }),
      sbError(404, "No service is hosted at the specified address."),
    );
    const gone = await run(
      servicebus.CompleteMessage({
        namespaceName: "my-ns",
        queueName: "nope",
        messageId: "1",
        lockToken: "lt",
      }),
      sbError(410, "The messaging entity could not be found."),
    );
    expect(failure(missing.exit)._tag).toBe("MessagingEntityNotFound");
    expect(failure(gone.exit)._tag).toBe("MessagingEntityNotFound");
  });

  test("an oversized message is MessageTooLarge; 401 is MessagingUnauthorized; 403 is QuotaExceeded", async () => {
    const large = await run(
      servicebus.SendMessage({ namespaceName: "my-ns", entityPath: "jobs", body: "x" }),
      sbError(
        400,
        "The body of the message is too large. The message body was 307200 bytes and the maximum body size is 262144 bytes.",
      ),
    );
    const unauthorized = await run(
      servicebus.SendMessage({ namespaceName: "my-ns", entityPath: "jobs", body: "x" }),
      { status: 401 },
    );
    const quota = await run(
      servicebus.SendMessage({ namespaceName: "my-ns", entityPath: "jobs", body: "x" }),
      sbError(403, "The maximum entity size has been reached or exceeded for Queue: 'jobs'."),
    );
    expect(failure(large.exit)._tag).toBe("MessageTooLarge");
    expect(failure(unauthorized.exit)._tag).toBe("MessagingUnauthorized");
    expect(failure(quota.exit)._tag).toBe("QuotaExceeded");
  });
});

describe("eventhubs-messaging", () => {
  test("SendEvent posts the body with api-version 2014-01 and the Event Hubs audience", async () => {
    const { request } = await run(
      eventhubs.SendEvent({
        namespaceName: "my-eh",
        eventHubName: "events",
        body: '{"DeviceId":"dev-01"}',
        brokerProperties: { partitionKey: "dev-01" },
        userProperties: { Alert: "Strong Wind" },
      }),
      { status: 201 },
    );
    expect(request.url).toBe(
      "https://my-eh.servicebus.windows.net/events/messages?api-version=2014-01",
    );
    expect(request.headers.authorization).toBe(EH_TOKEN);
    expect(request.headers["content-type"]).toBe("application/atom+xml;type=entry;charset=utf-8");
    expect(JSON.parse(request.headers.brokerproperties!)).toEqual({ PartitionKey: "dev-01" });
    expect(request.headers.alert).toBe("Strong Wind");
    expect(text(request.body)).toBe('{"DeviceId":"dev-01"}');
  });

  test("SendEventBatch posts the events under the batch media type", async () => {
    const { request } = await run(
      eventhubs.SendEventBatch({
        namespaceName: "my-eh",
        eventHubName: "events",
        events: [
          { body: "Message1", userProperties: { Alert: "Strong Wind" } },
          { body: "Message2", brokerProperties: { partitionKey: "k" } },
        ],
      }),
      { status: 201 },
    );
    expect(request.url).toBe(
      "https://my-eh.servicebus.windows.net/events/messages?api-version=2014-01",
    );
    expect(request.headers["content-type"]).toBe("application/vnd.microsoft.servicebus.json");
    expect(json(request.body)).toEqual([
      { Body: "Message1", UserProperties: { Alert: "Strong Wind" } },
      { Body: "Message2", BrokerProperties: { PartitionKey: "k" } },
    ]);
  });

  test("SendPartitionEvent and SendPublisherEvent address the partition and publisher", async () => {
    const partition = await run(
      eventhubs.SendPartitionEvent({
        namespaceName: "my-eh",
        eventHubName: "events",
        partitionId: "1",
        body: "p",
      }),
      { status: 201 },
    );
    const publisher = await run(
      eventhubs.SendPublisherEvent({
        namespaceName: "my-eh",
        eventHubName: "events",
        publisherId: "device-7",
        body: "p",
      }),
      { status: 201 },
    );
    expect(partition.request.url).toBe(
      "https://my-eh.servicebus.windows.net/events/partitions/1/messages?api-version=2014-01",
    );
    expect(publisher.request.url).toBe(
      "https://my-eh.servicebus.windows.net/events/publishers/device-7/messages?api-version=2014-01",
    );
  });

  test("typed errors: unknown partition, missing hub, oversized event", async () => {
    const send = eventhubs.SendPartitionEvent({
      namespaceName: "my-eh",
      eventHubName: "events",
      partitionId: "9",
      body: "p",
    });
    const partition = await run(
      send,
      sbError(
        400,
        "BR0012The specified partition is invalid for an EventHub partition sender or receiver. It should be between 0 and 1.",
      ),
    );
    const missing = await run(send, sbError(404, "No service is hosted at the specified address."));
    const large = await run(
      send,
      sbError(
        413,
        "The maximum message size quota for outgoing messages (1048576) has been exceeded.",
      ),
    );
    const mixed = await run(
      eventhubs.SendEventBatch({
        namespaceName: "my-eh",
        eventHubName: "events",
        events: [{ body: "a" }, { body: "b", brokerProperties: { partitionKey: "k" } }],
      }),
      sbError(
        405,
        "All event data in a SendBatch operation must have the same partition key. Expected key is '(null)' but encountered another key of 'k'.",
      ),
    );
    expect(failure(mixed.exit)._tag).toBe("BatchPartitionKeyMismatch");
    expect(failure(partition.exit)._tag).toBe("InvalidPartition");
    expect(failure(missing.exit)._tag).toBe("MessagingEntityNotFound");
    expect(failure(large.exit)._tag).toBe("MessageTooLarge");
  });
});

const COSMOS = "https://my-acct.documents.azure.com";
const COSMOS_AUTH = encodeURIComponent(
  "type=aad&ver=1.0&sig=aad:https://cosmos.azure.com/.default",
);
const coll = { accountName: "my-acct", databaseId: "app", collectionId: "users" };
const cosmosError = (status: number, code: string, substatus?: string): Canned => ({
  status,
  body: JSON.stringify({ code, message: `Message: {"Errors":["${code}"]}` }),
  headers: {
    "content-type": "application/json",
    ...(substatus ? { "x-ms-substatus": substatus } : {}),
    "x-ms-activity-id": "act-1",
  },
});

describe("cosmos-nosql", () => {
  test("CreateDocument sends the Entra auth form, version, date and partition key", async () => {
    const { request, exit } = await run(
      cosmos.CreateDocument({
        ...coll,
        document: { id: "u1", tenant: "t1", n: 1 },
        partitionKey: ["t1"],
      }),
      {
        status: 201,
        body: JSON.stringify({
          id: "u1",
          tenant: "t1",
          n: 1,
          _etag: '"0000"',
          _rid: "r==",
          _ts: 1,
        }),
        headers: {
          "content-type": "application/json",
          etag: '"0000"',
          "x-ms-request-charge": "6.29",
          "x-ms-session-token": "0:-1#1",
        },
      },
    );
    expect(request.method).toBe("POST");
    expect(request.url).toBe(`${COSMOS}/dbs/app/colls/users/docs`);
    expect(request.headers.authorization).toBe(COSMOS_AUTH);
    expect(request.headers["x-ms-version"]).toBe("2018-12-31");
    expect(new Date(request.headers["x-ms-date"]!).toUTCString()).toBe(
      request.headers["x-ms-date"],
    );
    expect(request.headers["x-ms-documentdb-partitionkey"]).toBe('["t1"]');
    expect(request.headers["content-type"]).toBe("application/json");
    expect(json(request.body)).toEqual({ id: "u1", tenant: "t1", n: 1 });
    const created = ok(exit);
    expect(created.document).toEqual({
      id: "u1",
      tenant: "t1",
      n: 1,
      _etag: '"0000"',
      _rid: "r==",
      _ts: 1,
    });
    expect(created.etag).toBe('"0000"');
    expect(created.requestCharge).toBe(6.29);
    expect(created.sessionToken).toBe("0:-1#1");
  });

  test("UpsertDocument adds the upsert header; GetDocument and DeleteDocument address the id", async () => {
    const upsert = await run(
      cosmos.UpsertDocument({ ...coll, document: { id: "u1" }, partitionKey: ["t1"] }),
      { status: 200, body: "{}" },
    );
    const get = await run(
      cosmos.GetDocument({ ...coll, documentId: "u 1", partitionKey: ["t1"] }),
      { status: 200, body: '{"id":"u 1"}' },
    );
    const del = await run(
      cosmos.DeleteDocument({ ...coll, documentId: "u1", partitionKey: ["t1"], ifMatch: '"e"' }),
      { status: 204, headers: { "x-ms-request-charge": "5.71" } },
    );
    expect(upsert.request.headers["x-ms-documentdb-is-upsert"]).toBe("True");
    expect([get.request.method, get.request.url]).toEqual([
      "GET",
      `${COSMOS}/dbs/app/colls/users/docs/u%201`,
    ]);
    expect(get.request.body).toBeUndefined();
    expect(ok(get.exit).document).toEqual({ id: "u 1" });
    expect([del.request.method, del.request.url]).toEqual([
      "DELETE",
      `${COSMOS}/dbs/app/colls/users/docs/u1`,
    ]);
    expect(del.request.headers["if-match"]).toBe('"e"');
    expect(ok(del.exit).requestCharge).toBe(5.71);
  });

  test("ReplaceDocument PUTs the document; PatchDocument sends json_patch+json", async () => {
    const replace = await run(
      cosmos.ReplaceDocument({ ...coll, documentId: "u1", document: { id: "u1", n: 2 } }),
      { status: 200, body: '{"id":"u1","n":2}' },
    );
    const patch = await run(
      cosmos.PatchDocument({
        ...coll,
        documentId: "u1",
        partitionKey: ["t1"],
        operations: [
          { op: "set", path: "/n", value: 3 },
          { op: "move", from: "/a", path: "/b" },
        ],
        condition: "from c where c.n = 2",
      }),
      { status: 200, body: '{"id":"u1","n":3}' },
    );
    expect(replace.request.method).toBe("PUT");
    expect(json(replace.request.body)).toEqual({ id: "u1", n: 2 });
    expect(patch.request.method).toBe("PATCH");
    expect(patch.request.headers["content-type"]).toBe("application/json_patch+json");
    expect(json(patch.request.body)).toEqual({
      operations: [
        { op: "set", path: "/n", value: 3 },
        { op: "move", from: "/a", path: "/b" },
      ],
      condition: "from c where c.n = 2",
    });
    expect(ok(patch.exit).document).toEqual({ id: "u1", n: 3 });
  });

  test("QueryDocuments posts application/query+json and reads the continuation", async () => {
    const { request, exit } = await run(
      cosmos.QueryDocuments({
        ...coll,
        query: "SELECT * FROM c WHERE c.tenant = @t",
        parameters: [{ name: "@t", value: "t1" }],
        enableCrossPartition: true,
        maxItemCount: 10,
      }),
      {
        status: 200,
        body: JSON.stringify({ _rid: "r==", Documents: [{ id: "u1" }], _count: 1 }),
        headers: { "x-ms-continuation": "next-page", "x-ms-request-charge": "2.9" },
      },
    );
    expect(request.method).toBe("POST");
    expect(request.url).toBe(`${COSMOS}/dbs/app/colls/users/docs`);
    expect(request.headers["content-type"]).toBe("application/query+json");
    expect(request.headers["x-ms-documentdb-isquery"]).toBe("True");
    expect(request.headers["x-ms-documentdb-query-enablecrosspartition"]).toBe("true");
    expect(request.headers["x-ms-max-item-count"]).toBe("10");
    expect(json(request.body)).toEqual({
      query: "SELECT * FROM c WHERE c.tenant = @t",
      parameters: [{ name: "@t", value: "t1" }],
    });
    const page = ok(exit);
    expect(page.Documents).toEqual([{ id: "u1" }]);
    expect(page._count).toBe(1);
    expect(page.continuation).toBe("next-page");
    expect(page.requestCharge).toBe(2.9);
  });

  test("ListDocuments reads a page and sends the continuation back", async () => {
    const { request, exit } = await run(
      cosmos.ListDocuments({ ...coll, continuation: "next-page", maxItemCount: -1 }),
      { status: 200, body: JSON.stringify({ _rid: "r==", Documents: [], _count: 0 }) },
    );
    expect(request.method).toBe("GET");
    expect(request.headers["x-ms-continuation"]).toBe("next-page");
    expect(ok(exit).continuation).toBeUndefined();
  });

  test("not found, conflict, precondition and throttling are typed, with the substatus", async () => {
    const notFound = await run(
      cosmos.GetDocument({ ...coll, documentId: "nope", partitionKey: ["t1"] }),
      cosmosError(404, "NotFound", "1002"),
    );
    const conflict = await run(
      cosmos.CreateDocument({ ...coll, document: { id: "u1" } }),
      cosmosError(409, "Conflict"),
    );
    const precondition = await run(
      cosmos.ReplaceDocument({ ...coll, documentId: "u1", document: { id: "u1" }, ifMatch: '"x"' }),
      cosmosError(412, "PreconditionFailed"),
    );
    const throttled = await run(
      cosmos.QueryDocuments({ ...coll, query: "SELECT * FROM c" }),
      cosmosError(429, "TooManyRequests", "3200"),
    );
    expect(failure(notFound.exit)).toMatchObject({
      _tag: "CosmosNotFound",
      headers: { "x-ms-substatus": "1002", "x-ms-activity-id": "act-1" },
    });
    expect(failure(conflict.exit)._tag).toBe("CosmosConflict");
    expect(failure(precondition.exit)._tag).toBe("CosmosPreconditionFailed");
    expect(failure(throttled.exit)).toMatchObject({
      _tag: "CosmosTooManyRequests",
      headers: { "x-ms-substatus": "3200" },
    });
  });
});

const SCM = "my-app-abc123.scm.eastus-01.azurewebsites.net";
const ARM_TOKEN = "Bearer arm-token";

describe("kudu", () => {
  test("DeployArtifact posts the zip with the query alchemy sends", async () => {
    const zip = new Uint8Array([0x50, 0x4b, 0x03, 0x04]);
    const { request, exit } = await run(
      kudu.DeployArtifact({
        scmHostName: SCM,
        body: zip,
        contentType: "application/zip",
        type: "zip",
        RemoteBuild: false,
        Deployer: "alchemy",
      }),
      { status: 200 },
    );
    ok(exit);
    expect(request.method).toBe("POST");
    expect(request.url).toBe(
      `https://${SCM}/api/publish?type=zip&RemoteBuild=false&Deployer=alchemy`,
    );
    expect(request.headers.authorization).toBe(ARM_TOKEN);
    expect(request.headers["content-type"]).toBe("application/zip");
    expect([...request.body!]).toEqual([...zip]);
  });

  test("DeployArtifact with static type, path, restart and clean", async () => {
    const { request } = await run(
      kudu.DeployArtifact({
        scmHostName: SCM,
        body: new TextEncoder().encode("<h1>hi</h1>"),
        type: "static",
        path: "/home/site/wwwroot/index.html",
        restart: false,
        clean: true,
      }),
      { status: 200 },
    );
    expect(request.url).toBe(
      `https://${SCM}/api/publish?type=static&path=%2Fhome%2Fsite%2Fwwwroot%2Findex.html&restart=false&clean=true`,
    );
    expect(request.headers["content-type"]).toBe("application/octet-stream");
  });

  test("DeployZip async returns the status location", async () => {
    const { request, exit } = await run(
      kudu.DeployZip({ scmHostName: SCM, body: new Uint8Array([1]), isAsync: true }),
      { status: 202, headers: { location: `https://${SCM}/api/deployments/latest` } },
    );
    expect(request.url).toBe(`https://${SCM}/api/zipdeploy?isAsync=true`);
    expect(request.headers["content-type"]).toBe("application/zip");
    expect(ok(exit).location).toBe(`https://${SCM}/api/deployments/latest`);
  });

  test("GetDeployment and GetLatestDeployment decode the deployment status", async () => {
    const result = {
      id: "abc",
      status: 4,
      status_text: "",
      author: "N/A",
      deployer: "alchemy",
      message: "Created via a push deployment",
      progress: "",
      received_time: "2026-10-23T22:00:00Z",
      start_time: "2026-10-23T22:00:01Z",
      end_time: "2026-10-23T22:00:30Z",
      complete: true,
      active: true,
      is_temp: false,
      is_readonly: true,
      site_name: "my-app",
    };
    const one = await run(kudu.GetDeployment({ scmHostName: SCM, id: "abc" }), {
      status: 200,
      body: JSON.stringify(result),
    });
    const latest = await run(kudu.GetLatestDeployment({ scmHostName: SCM }), {
      status: 202,
      body: JSON.stringify({ ...result, status: 1, complete: false }),
    });
    const list = await run(kudu.ListDeployments({ scmHostName: SCM }), {
      status: 200,
      body: JSON.stringify([result]),
    });
    expect(one.request.url).toBe(`https://${SCM}/api/deployments/abc`);
    const d = ok(one.exit);
    expect(d.status).toBe(4);
    expect(d.complete).toBe(true);
    expect(d.siteName).toBe("my-app");
    expect(d.isReadonly).toBe(true);
    expect(latest.request.url).toBe(`https://${SCM}/api/deployments/latest`);
    expect(ok(latest.exit).complete).toBe(false);
    expect(ok(list.exit).map((x) => x.id)).toEqual(["abc"]);
  });

  test("a deployment in progress (409) is KuduDeploymentInProgress", async () => {
    const { exit } = await run(
      kudu.DeployArtifact({ scmHostName: SCM, body: new Uint8Array([1]), type: "zip" }),
      {
        status: 409,
        body: "There is a deployment currently in progress. Please try again when it completes.",
      },
    );
    const error = failure(exit);
    expect(error._tag).toBe("KuduDeploymentInProgress");
    expect(error.message).toContain("deployment currently in progress");
  });
});
