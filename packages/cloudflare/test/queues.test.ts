import { describe, expect } from "vitest";
import * as Effect from "effect/Effect";
import { test, getAccountId } from "./test.ts";
import * as Queues from "~/services/queues.ts";

const accountId = () => getAccountId();

// ============================================================================
// Helpers
// ============================================================================

/**
 * Deterministic queue name for tests.
 * Follows the convention: distilled-cf-queues-{testname}
 */
const queueName = (name: string) => `distilled-cf-queues-${name}`;

/**
 * Delete a queue by name. Looks it up by listing, then deletes by ID.
 * Silently succeeds if the queue doesn't exist.
 */
const deleteQueueByName = (name: string) =>
  Effect.gen(function* () {
    const queues = yield* Queues.listQueues({
      accountId: accountId(),
    });
    const found = queues.find((q) => q.queueName === name);
    if (found && found.queueId) {
      yield* Queues.deleteQueue({
        accountId: accountId(),
        queueId: found.queueId,
      }).pipe(Effect.catch(() => Effect.void));
    }
  }).pipe(Effect.catch(() => Effect.void));

/**
 * Create a queue, run `fn`, then delete the queue.
 * Cleanup-first pattern for idempotency.
 */
const withQueue = <A, E, R>(
  name: string,
  fn: (queueId: string) => Effect.Effect<A, E, R>,
): Effect.Effect<A, E | any, R | any> =>
  Effect.gen(function* () {
    // Attempt cleanup first in case of previous failed run
    yield* deleteQueueByName(name);

    // Create queue
    const queue = yield* Queues.createQueue({
      accountId: accountId(),
      queueName: name,
    });

    const queueId = queue.queueId!;

    // Run the test function, ensuring cleanup
    return yield* fn(queueId).pipe(
      Effect.ensuring(
        Queues.deleteQueue({
          accountId: accountId(),
          queueId,
        }).pipe(Effect.catch(() => Effect.void)),
      ),
    );
  });

// ============================================================================
// Queues Tests
// ============================================================================

describe("Queues", () => {
  // ==========================================================================
  // Queue Operations
  // ==========================================================================

  // --------------------------------------------------------------------------
  // createQueue
  // --------------------------------------------------------------------------
  describe("createQueue", () => {
    test("happy path - creates a new queue", () =>
      Effect.gen(function* () {
        const name = queueName("create-happy");

        // Cleanup first
        yield* deleteQueueByName(name);

        const result = yield* Queues.createQueue({
          accountId: accountId(),
          queueName: name,
        });

        expect(result).toBeDefined();
        expect(result.queueName).toBe(name);
        expect(result.queueId).toBeDefined();
        expect(typeof result.queueId).toBe("string");
        if (result.createdOn) {
          expect(typeof result.createdOn).toBe("string");
        }
        if (result.modifiedOn) {
          expect(typeof result.modifiedOn).toBe("string");
        }

        // Cleanup
        yield* Queues.deleteQueue({
          accountId: accountId(),
          queueId: result.queueId!,
        }).pipe(Effect.catch(() => Effect.void));
      }));

    test("error - duplicate queue name", () =>
      withQueue(queueName("create-dup"), (_queueId) =>
        Queues.createQueue({
          accountId: accountId(),
          queueName: queueName("create-dup"),
        }).pipe(
          Effect.flip,
          Effect.map((e) =>
            expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
          ),
        ),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Queues.createQueue({
        accountId: "invalid-account-id-000",
        queueName: queueName("create-bad-acct"),
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));

    test("error - empty queue name", () =>
      Queues.createQueue({
        accountId: accountId(),
        queueName: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));

    test("error - queue name with special characters", () =>
      Queues.createQueue({
        accountId: accountId(),
        queueName: "invalid queue name!@#$%",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // getQueue
  // --------------------------------------------------------------------------
  describe("getQueue", () => {
    test("happy path - retrieves an existing queue", () =>
      withQueue(queueName("get-happy"), (queueId) =>
        Effect.gen(function* () {
          const result = yield* Queues.getQueue({
            accountId: accountId(),
            queueId,
          });

          expect(result).toBeDefined();
          expect(result.queueId).toBe(queueId);
          expect(result.queueName).toBe(queueName("get-happy"));
          if (result.createdOn) {
            expect(typeof result.createdOn).toBe("string");
          }
          if (result.modifiedOn) {
            expect(typeof result.modifiedOn).toBe("string");
          }
          if (result.consumers) {
            expect(Array.isArray(result.consumers)).toBe(true);
          }
          if (result.consumersTotalCount !== undefined) {
            expect(typeof result.consumersTotalCount).toBe("number");
          }
          if (result.producers) {
            expect(Array.isArray(result.producers)).toBe(true);
          }
          if (result.producersTotalCount !== undefined) {
            expect(typeof result.producersTotalCount).toBe("number");
          }
        }),
      ));

    test("error - not found for non-existent queueId", () =>
      Queues.getQueue({
        accountId: accountId(),
        queueId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Queues.getQueue({
        accountId: "invalid-account-id-000",
        queueId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));

    test("error - empty queueId", () =>
      Queues.getQueue({
        accountId: accountId(),
        queueId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // listQueues
  // --------------------------------------------------------------------------
  describe("listQueues", () => {
    test("happy path - lists queues in account", () =>
      Effect.gen(function* () {
        const result = yield* Queues.listQueues({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        for (const queue of result) {
          if (queue.queueName) {
            expect(typeof queue.queueName).toBe("string");
          }
          if (queue.queueId) {
            expect(typeof queue.queueId).toBe("string");
          }
        }
      }));

    test("happy path - lists queues includes a created queue", () =>
      withQueue(queueName("list-find"), (queueId) =>
        Effect.gen(function* () {
          const result = yield* Queues.listQueues({
            accountId: accountId(),
          });

          expect(result).toBeDefined();
          expect(Array.isArray(result)).toBe(true);
          const found = result.some((q) => q.queueId === queueId);
          expect(found).toBe(true);
        }),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Queues.listQueues({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // updateQueue
  // --------------------------------------------------------------------------
  describe("updateQueue", () => {
    test("happy path - updates queue name", () =>
      withQueue(queueName("update-happy"), (queueId) =>
        Effect.gen(function* () {
          const newName = queueName("update-happy-renamed");

          // Ensure no leftover queue with the new name
          yield* deleteQueueByName(newName);

          const result = yield* Queues.updateQueue({
            accountId: accountId(),
            queueId,
            queueName: newName,
          });

          expect(result).toBeDefined();
          expect(result.queueName).toBe(newName);
          expect(result.queueId).toBe(queueId);
        }),
      ));

    test("happy path - updates queue settings", () =>
      withQueue(queueName("update-settings"), (queueId) =>
        Effect.gen(function* () {
          const result = yield* Queues.updateQueue({
            accountId: accountId(),
            queueId,
            queueName: queueName("update-settings"),
            settings: {
              deliveryDelay: 5,
              messageRetentionPeriod: 86400,
            },
          });

          expect(result).toBeDefined();
          expect(result.queueId).toBe(queueId);
          if (result.settings) {
            expect(typeof result.settings).toBe("object");
          }
        }),
      ));

    test("error - InvalidQueueName for empty queue name", () =>
      withQueue(queueName("update-empty-name"), (queueId) =>
        Queues.updateQueue({
          accountId: accountId(),
          queueId,
          queueName: "",
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("InvalidQueueName")),
        ),
      ));

    test("error - not found for non-existent queueId", () =>
      Queues.updateQueue({
        accountId: accountId(),
        queueId: "00000000-0000-0000-0000-000000000000",
        queueName: queueName("update-nonexistent"),
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Queues.updateQueue({
        accountId: "invalid-account-id-000",
        queueId: "00000000-0000-0000-0000-000000000000",
        queueName: "test",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // patchQueue
  // --------------------------------------------------------------------------
  describe("patchQueue", () => {
    test("happy path - patches queue settings with delivery delay", () =>
      withQueue(queueName("patch-settings"), (queueId) =>
        Effect.gen(function* () {
          const result = yield* Queues.patchQueue({
            accountId: accountId(),
            queueId,
            settings: {
              deliveryDelay: 10,
            },
          });

          expect(result).toBeDefined();
          expect(result.queueId).toBe(queueId);
          if (result.settings) {
            expect(typeof result.settings).toBe("object");
          }
        }),
      ));

    test("happy path - patches queue to pause delivery", () =>
      withQueue(queueName("patch-pause"), (queueId) =>
        Effect.gen(function* () {
          const result = yield* Queues.patchQueue({
            accountId: accountId(),
            queueId,
            settings: {
              deliveryPaused: true,
            },
          });

          expect(result).toBeDefined();
          expect(result.queueId).toBe(queueId);
        }),
      ));

    test("error - not found for non-existent queueId", () =>
      Queues.patchQueue({
        accountId: accountId(),
        queueId: "00000000-0000-0000-0000-000000000000",
        settings: { deliveryDelay: 5 },
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Queues.patchQueue({
        accountId: "invalid-account-id-000",
        queueId: "00000000-0000-0000-0000-000000000000",
        settings: { deliveryDelay: 5 },
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // deleteQueue
  // --------------------------------------------------------------------------
  describe("deleteQueue", () => {
    test("happy path - deletes an existing queue", () =>
      Effect.gen(function* () {
        const name = queueName("delete-happy");

        yield* deleteQueueByName(name);

        const created = yield* Queues.createQueue({
          accountId: accountId(),
          queueName: name,
        });

        const result = yield* Queues.deleteQueue({
          accountId: accountId(),
          queueId: created.queueId!,
        });

        expect(result).toBeDefined();
        if (result.success !== undefined) {
          expect(result.success).toBe(true);
        }
      }));

    test("error - not found for non-existent queueId", () =>
      Queues.deleteQueue({
        accountId: accountId(),
        queueId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Queues.deleteQueue({
        accountId: "invalid-account-id-000",
        queueId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));

    test("error - empty queueId", () =>
      Queues.deleteQueue({
        accountId: accountId(),
        queueId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));
  });

  // ==========================================================================
  // Consumer Operations
  // ==========================================================================

  // --------------------------------------------------------------------------
  // createConsumer
  // --------------------------------------------------------------------------
  describe("createConsumer", () => {
    test("error - InvalidRequestBody when no consumer type provided", () =>
      withQueue(queueName("create-consumer-no-type"), (queueId) =>
        Queues.createConsumer({
          accountId: accountId(),
          queueId,
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("InvalidRequestBody")),
        ),
      ));

    test("error - not found for non-existent queueId", () =>
      Queues.createConsumer({
        accountId: accountId(),
        queueId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError", "InvalidRequestBody"]).toContain(e._tag),
        ),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Queues.createConsumer({
        accountId: "invalid-account-id-000",
        queueId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // getConsumer
  // --------------------------------------------------------------------------
  describe("getConsumer", () => {
    test("error - InvalidRequestBody when createConsumer has no type", () =>
      withQueue(queueName("get-consumer-create-err"), (queueId) =>
        Queues.createConsumer({
          accountId: accountId(),
          queueId,
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("InvalidRequestBody")),
        ),
      ));

    test("error - not found for non-existent consumerId", () =>
      withQueue(queueName("get-consumer-404"), (queueId) =>
        Queues.getConsumer({
          accountId: accountId(),
          queueId,
          consumerId: "00000000-0000-0000-0000-000000000000",
        }).pipe(
          Effect.flip,
          Effect.map((e) =>
            expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
          ),
        ),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Queues.getConsumer({
        accountId: "invalid-account-id-000",
        queueId: "00000000-0000-0000-0000-000000000000",
        consumerId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));

    test("error - not found for non-existent queueId", () =>
      Queues.getConsumer({
        accountId: accountId(),
        queueId: "00000000-0000-0000-0000-000000000000",
        consumerId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // listConsumers
  // --------------------------------------------------------------------------
  describe("listConsumers", () => {
    test("happy path - lists consumers on a queue", () =>
      withQueue(queueName("list-consumers-happy"), (queueId) =>
        Effect.gen(function* () {
          const result = yield* Queues.listConsumers({
            accountId: accountId(),
            queueId,
          });

          expect(result).toBeDefined();
          expect(Array.isArray(result)).toBe(true);
        }),
      ));

    test("error - InvalidRequestBody when createConsumer has no type", () =>
      withQueue(queueName("list-consumers-create-err"), (queueId) =>
        Queues.createConsumer({
          accountId: accountId(),
          queueId,
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("InvalidRequestBody")),
        ),
      ));

    test("error - not found for non-existent queueId", () =>
      Queues.listConsumers({
        accountId: accountId(),
        queueId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Queues.listConsumers({
        accountId: "invalid-account-id-000",
        queueId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // updateConsumer
  // --------------------------------------------------------------------------
  describe("updateConsumer", () => {
    test("error - InvalidRequestBody when createConsumer has no type", () =>
      withQueue(queueName("update-consumer-create-err"), (queueId) =>
        Queues.createConsumer({
          accountId: accountId(),
          queueId,
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("InvalidRequestBody")),
        ),
      ));

    test("error - not found for non-existent consumerId", () =>
      withQueue(queueName("update-consumer-404"), (queueId) =>
        Queues.updateConsumer({
          accountId: accountId(),
          queueId,
          consumerId: "00000000-0000-0000-0000-000000000000",
          settings: { batchSize: 5 },
        }).pipe(
          Effect.flip,
          Effect.map((e) =>
            expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
          ),
        ),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Queues.updateConsumer({
        accountId: "invalid-account-id-000",
        queueId: "00000000-0000-0000-0000-000000000000",
        consumerId: "00000000-0000-0000-0000-000000000000",
        settings: { batchSize: 5 },
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // deleteConsumer
  // --------------------------------------------------------------------------
  describe("deleteConsumer", () => {
    test("error - InvalidRequestBody when createConsumer has no type", () =>
      withQueue(queueName("delete-consumer-create-err"), (queueId) =>
        Queues.createConsumer({
          accountId: accountId(),
          queueId,
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("InvalidRequestBody")),
        ),
      ));

    test("error - not found for non-existent consumerId", () =>
      withQueue(queueName("delete-consumer-404"), (queueId) =>
        Queues.deleteConsumer({
          accountId: accountId(),
          queueId,
          consumerId: "00000000-0000-0000-0000-000000000000",
        }).pipe(
          Effect.flip,
          Effect.map((e) =>
            expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
          ),
        ),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Queues.deleteConsumer({
        accountId: "invalid-account-id-000",
        queueId: "00000000-0000-0000-0000-000000000000",
        consumerId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));

    test("error - not found for non-existent queueId", () =>
      Queues.deleteConsumer({
        accountId: accountId(),
        queueId: "00000000-0000-0000-0000-000000000000",
        consumerId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));
  });

  // ==========================================================================
  // Message Operations
  // ==========================================================================

  // --------------------------------------------------------------------------
  // pushMessage
  // --------------------------------------------------------------------------
  describe("pushMessage", () => {
    test("error - InvalidMessageBody when body is sent as raw string", () =>
      withQueue(queueName("push-msg-raw-body"), (queueId) =>
        Queues.pushMessage({
          accountId: accountId(),
          queueId,
          body: "Hello, World!",
          contentType: "text",
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("InvalidMessageBody")),
        ),
      ));

    test("error - InvalidMessageBody when body with delay is sent as raw string", () =>
      withQueue(queueName("push-msg-delay-err"), (queueId) =>
        Queues.pushMessage({
          accountId: accountId(),
          queueId,
          body: "Delayed message",
          contentType: "text",
          delaySeconds: 5,
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("InvalidMessageBody")),
        ),
      ));

    test("error - not found for non-existent queueId", () =>
      Queues.pushMessage({
        accountId: accountId(),
        queueId: "00000000-0000-0000-0000-000000000000",
        body: "test",
        contentType: "text",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Queues.pushMessage({
        accountId: "invalid-account-id-000",
        queueId: "00000000-0000-0000-0000-000000000000",
        body: "test",
        contentType: "text",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // bulkPushMessages
  // --------------------------------------------------------------------------
  describe("bulkPushMessages", () => {
    test("happy path - bulk pushes text messages", () =>
      withQueue(queueName("bulk-push-happy"), (queueId) =>
        Effect.gen(function* () {
          const result = yield* Queues.bulkPushMessages({
            accountId: accountId(),
            queueId,
            messages: [
              { body: "Message 1", contentType: "text" },
              { body: "Message 2", contentType: "text" },
              { body: "Message 3", contentType: "text" },
            ],
          });

          expect(result).toBeDefined();
          if (result.success !== undefined) {
            expect(result.success).toBe(true);
          }
        }),
      ));

    test("happy path - bulk pushes JSON messages", () =>
      withQueue(queueName("bulk-push-json"), (queueId) =>
        Effect.gen(function* () {
          const result = yield* Queues.bulkPushMessages({
            accountId: accountId(),
            queueId,
            messages: [
              { body: { key: "value1" }, contentType: "json" },
              { body: { key: "value2" }, contentType: "json" },
            ],
          });

          expect(result).toBeDefined();
          if (result.success !== undefined) {
            expect(result.success).toBe(true);
          }
        }),
      ));

    test("happy path - bulk pushes with batch delay", () =>
      withQueue(queueName("bulk-push-delay"), (queueId) =>
        Effect.gen(function* () {
          const result = yield* Queues.bulkPushMessages({
            accountId: accountId(),
            queueId,
            delaySeconds: 5,
            messages: [{ body: "delayed batch", contentType: "text" }],
          });

          expect(result).toBeDefined();
          if (result.success !== undefined) {
            expect(result.success).toBe(true);
          }
        }),
      ));

    test("error - not found for non-existent queueId", () =>
      Queues.bulkPushMessages({
        accountId: accountId(),
        queueId: "00000000-0000-0000-0000-000000000000",
        messages: [{ body: "test", contentType: "text" }],
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Queues.bulkPushMessages({
        accountId: "invalid-account-id-000",
        queueId: "00000000-0000-0000-0000-000000000000",
        messages: [{ body: "test", contentType: "text" }],
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));

    test("error - InvalidMessageBody for empty messages array", () =>
      withQueue(queueName("bulk-push-empty"), (queueId) =>
        Queues.bulkPushMessages({
          accountId: accountId(),
          queueId,
          messages: [],
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("InvalidMessageBody")),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // pullMessage
  // --------------------------------------------------------------------------
  describe("pullMessage", () => {
    test("error - InvalidRequestBody when consumer has no type", () =>
      withQueue(queueName("pull-msg-no-type"), (queueId) =>
        Queues.createConsumer({
          accountId: accountId(),
          queueId,
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("InvalidRequestBody")),
        ),
      ));

    test("error - not found for non-existent queueId", () =>
      Queues.pullMessage({
        accountId: accountId(),
        queueId: "00000000-0000-0000-0000-000000000000",
        batchSize: 10,
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Queues.pullMessage({
        accountId: "invalid-account-id-000",
        queueId: "00000000-0000-0000-0000-000000000000",
        batchSize: 10,
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // ackMessage
  // --------------------------------------------------------------------------
  describe("ackMessage", () => {
    test("error - InvalidRequestBody when consumer has no type", () =>
      withQueue(queueName("ack-msg-no-type"), (queueId) =>
        Queues.createConsumer({
          accountId: accountId(),
          queueId,
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("InvalidRequestBody")),
        ),
      ));

    test("error - InvalidRequestBody when consumer has no type (ack empty)", () =>
      withQueue(queueName("ack-msg-empty"), (queueId) =>
        Queues.createConsumer({
          accountId: accountId(),
          queueId,
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("InvalidRequestBody")),
        ),
      ));

    test("error - not found for non-existent queueId", () =>
      Queues.ackMessage({
        accountId: accountId(),
        queueId: "00000000-0000-0000-0000-000000000000",
        acks: [{ leaseId: "fake-lease-id" }],
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Queues.ackMessage({
        accountId: "invalid-account-id-000",
        queueId: "00000000-0000-0000-0000-000000000000",
        acks: [{ leaseId: "fake-lease-id" }],
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));
  });

  // ==========================================================================
  // Purge Operations
  // ==========================================================================

  // --------------------------------------------------------------------------
  // startPurge
  // --------------------------------------------------------------------------
  describe("startPurge", () => {
    test("happy path - starts a purge on a queue", () =>
      withQueue(queueName("start-purge-happy"), (queueId) =>
        Effect.gen(function* () {
          const result = yield* Queues.startPurge({
            accountId: accountId(),
            queueId,
            deleteMessagesPermanently: true,
          });

          expect(result).toBeDefined();
        }),
      ));

    test("error - not found for non-existent queueId", () =>
      Queues.startPurge({
        accountId: accountId(),
        queueId: "00000000-0000-0000-0000-000000000000",
        deleteMessagesPermanently: true,
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Queues.startPurge({
        accountId: "invalid-account-id-000",
        queueId: "00000000-0000-0000-0000-000000000000",
        deleteMessagesPermanently: true,
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // statusPurge
  // --------------------------------------------------------------------------
  describe("statusPurge", () => {
    test("happy path - gets purge status for a queue", () =>
      withQueue(queueName("status-purge-happy"), (queueId) =>
        Effect.gen(function* () {
          const result = yield* Queues.statusPurge({
            accountId: accountId(),
            queueId,
          });

          expect(result).toBeDefined();
          // Fresh queue may have no purge history
          if (result.completed) {
            expect(typeof result.completed).toBe("string");
          }
          if (result.startedAt) {
            expect(typeof result.startedAt).toBe("string");
          }
        }),
      ));

    test("happy path - gets purge status after starting a purge", () =>
      withQueue(queueName("status-purge-after"), (queueId) =>
        Effect.gen(function* () {
          // Start a purge
          yield* Queues.startPurge({
            accountId: accountId(),
            queueId,
            deleteMessagesPermanently: true,
          });

          // Check status
          const result = yield* Queues.statusPurge({
            accountId: accountId(),
            queueId,
          });

          expect(result).toBeDefined();
        }),
      ));

    test("error - not found for non-existent queueId", () =>
      Queues.statusPurge({
        accountId: accountId(),
        queueId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Queues.statusPurge({
        accountId: "invalid-account-id-000",
        queueId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));
  });

  // ==========================================================================
  // Subscription Operations
  // ==========================================================================

  // --------------------------------------------------------------------------
  // listSubscriptions
  // --------------------------------------------------------------------------
  describe("listSubscriptions", () => {
    test("happy path - lists subscriptions in account", () =>
      Effect.gen(function* () {
        const result = yield* Queues.listSubscriptions({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        for (const sub of result) {
          if (sub.id) {
            expect(typeof sub.id).toBe("string");
          }
          if (sub.name) {
            expect(typeof sub.name).toBe("string");
          }
          if (sub.enabled !== undefined) {
            expect(typeof sub.enabled).toBe("boolean");
          }
          if (sub.events) {
            expect(Array.isArray(sub.events)).toBe(true);
          }
        }
      }));

    test("happy path - lists subscriptions with direction ascending", () =>
      Effect.gen(function* () {
        const result = yield* Queues.listSubscriptions({
          accountId: accountId(),
          direction: "asc",
          order: "name",
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
      }));

    test("happy path - lists subscriptions with direction descending", () =>
      Effect.gen(function* () {
        const result = yield* Queues.listSubscriptions({
          accountId: accountId(),
          direction: "desc",
          order: "created_at",
        });

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
      }));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Queues.listSubscriptions({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // createSubscription
  // --------------------------------------------------------------------------
  describe("createSubscription", () => {
    test("error - UnrecognizedEventType for invalid R2 event type", () =>
      withQueue(queueName("create-sub-bad-event"), (queueId) =>
        Queues.createSubscription({
          accountId: accountId(),
          name: "distilled-cf-queues-sub-test",
          enabled: true,
          source: { type: "r2" },
          destination: { queueId, type: "queues.queue" },
          events: ["r2:object:create"],
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("UnrecognizedEventType")),
        ),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Queues.createSubscription({
        accountId: "invalid-account-id-000",
        name: "test-sub",
        enabled: true,
        source: { type: "r2" },
        destination: {
          queueId: "00000000-0000-0000-0000-000000000000",
          type: "queues.queue",
        },
        events: ["r2:object:create"],
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));

    test("error - invalid destination queueId", () =>
      Queues.createSubscription({
        accountId: accountId(),
        name: "distilled-cf-queues-sub-bad-dest",
        enabled: true,
        source: { type: "r2" },
        destination: {
          queueId: "00000000-0000-0000-0000-000000000000",
          type: "queues.queue",
        },
        events: ["r2:object:create"],
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError", "UnrecognizedEventType"]).toContain(e._tag),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // getSubscription
  // --------------------------------------------------------------------------
  describe("getSubscription", () => {
    test("error - UnrecognizedEventType when creating subscription with invalid event type", () =>
      withQueue(queueName("get-sub-bad-event"), (queueId) =>
        Queues.createSubscription({
          accountId: accountId(),
          name: "distilled-cf-queues-get-sub",
          enabled: true,
          source: { type: "r2" },
          destination: { queueId, type: "queues.queue" },
          events: ["r2:object:create"],
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("UnrecognizedEventType")),
        ),
      ));

    test("error - not found for non-existent subscriptionId", () =>
      Queues.getSubscription({
        accountId: accountId(),
        subscriptionId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Queues.getSubscription({
        accountId: "invalid-account-id-000",
        subscriptionId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));

    test("error - empty subscriptionId", () =>
      Queues.getSubscription({
        accountId: accountId(),
        subscriptionId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // patchSubscription
  // --------------------------------------------------------------------------
  describe("patchSubscription", () => {
    test("error - UnrecognizedEventType when creating subscription with invalid event type", () =>
      withQueue(queueName("patch-sub-bad-event"), (queueId) =>
        Queues.createSubscription({
          accountId: accountId(),
          name: "distilled-cf-queues-patch-sub",
          enabled: true,
          source: { type: "r2" },
          destination: { queueId, type: "queues.queue" },
          events: ["r2:object:create"],
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("UnrecognizedEventType")),
        ),
      ));

    test("error - not found for non-existent subscriptionId", () =>
      Queues.patchSubscription({
        accountId: accountId(),
        subscriptionId: "00000000-0000-0000-0000-000000000000",
        name: "should-fail",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Queues.patchSubscription({
        accountId: "invalid-account-id-000",
        subscriptionId: "00000000-0000-0000-0000-000000000000",
        name: "should-fail",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));
  });

  // --------------------------------------------------------------------------
  // deleteSubscription
  // --------------------------------------------------------------------------
  describe("deleteSubscription", () => {
    test("error - UnrecognizedEventType when creating subscription with invalid event type", () =>
      withQueue(queueName("delete-sub-bad-event"), (queueId) =>
        Queues.createSubscription({
          accountId: accountId(),
          name: "distilled-cf-queues-delete-sub",
          enabled: true,
          source: { type: "r2" },
          destination: { queueId, type: "queues.queue" },
          events: ["r2:object:create"],
        }).pipe(
          Effect.flip,
          Effect.map((e) => expect(e._tag).toBe("UnrecognizedEventType")),
        ),
      ));

    test("error - not found for non-existent subscriptionId", () =>
      Queues.deleteSubscription({
        accountId: accountId(),
        subscriptionId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));

    test("error - CloudflareHttpError for invalid accountId", () =>
      Queues.deleteSubscription({
        accountId: "invalid-account-id-000",
        subscriptionId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));

    test("error - empty subscriptionId", () =>
      Queues.deleteSubscription({
        accountId: accountId(),
        subscriptionId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["UnknownCloudflareError", "CloudflareHttpError"]).toContain(e._tag),
        ),
      ));
  });
});
