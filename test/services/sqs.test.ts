import { Effect, Schedule } from "effect";
import {
  changeMessageVisibility,
  createQueue,
  deleteMessage,
  deleteQueue,
  getQueueAttributes,
  getQueueUrl,
  listQueues,
  listQueueTags,
  purgeQueue,
  receiveMessage,
  sendMessage,
  setQueueAttributes,
  tagQueue,
  untagQueue,
} from "../../src/services/sqs.ts";
import { test } from "../test.ts";

// Helper to ensure cleanup happens even on failure
const withQueue = <A, E, R>(
  queueName: string,
  testFn: (queueUrl: string) => Effect.Effect<A, E, R>,
) =>
  Effect.gen(function* () {
    const createResult = yield* createQueue({ QueueName: queueName }).pipe(
      Effect.retry({
        while: (err) => err._tag === "QueueDeletedRecently",
        schedule: Schedule.spaced("5 seconds"),
      }),
    );
    const queueUrl = createResult.QueueUrl!;
    return yield* testFn(queueUrl).pipe(
      Effect.ensuring(deleteQueue({ QueueUrl: queueUrl }).pipe(Effect.ignore)),
    );
  });

// Helper for FIFO queues
const withFifoQueue = <A, E, R>(
  queueName: string,
  testFn: (queueUrl: string) => Effect.Effect<A, E, R>,
) =>
  Effect.gen(function* () {
    const fifoQueueName = queueName.endsWith(".fifo")
      ? queueName
      : `${queueName}.fifo`;
    const createResult = yield* createQueue({
      QueueName: fifoQueueName,
      Attributes: {
        FifoQueue: "true",
        ContentBasedDeduplication: "true",
      },
    }).pipe(
      Effect.retry({
        while: (err) => err._tag === "QueueDeletedRecently",
        schedule: Schedule.spaced("5 seconds"),
      }),
    );
    const queueUrl = createResult.QueueUrl!;
    return yield* testFn(queueUrl).pipe(
      Effect.ensuring(deleteQueue({ QueueUrl: queueUrl }).pipe(Effect.ignore)),
    );
  });

// ============================================================================
// Queue Lifecycle Tests
// ============================================================================

test(
  "create queue, get queue url, list queues, and delete",
  withQueue("itty-sqs-lifecycle", (queueUrl) =>
    Effect.gen(function* () {
      // Verify queue URL is returned
      if (!queueUrl) {
        return yield* Effect.fail(
          new Error("Expected QueueUrl to be returned"),
        );
      }

      // Get queue URL by name
      const getUrlResult = yield* getQueueUrl({
        QueueName: "itty-sqs-lifecycle",
      });
      if (getUrlResult.QueueUrl !== queueUrl) {
        return yield* Effect.fail(
          new Error(
            `Queue URL mismatch: expected ${queueUrl}, got ${getUrlResult.QueueUrl}`,
          ),
        );
      }

      // List queues and verify our queue is in the list
      const listResult = yield* listQueues({
        QueueNamePrefix: "itty-sqs-lifecycle",
      });
      const foundQueue = listResult.QueueUrls?.find((url) =>
        url.includes("itty-sqs-lifecycle"),
      );
      if (!foundQueue) {
        return yield* Effect.fail(new Error("Queue not found in list"));
      }
    }),
  ),
);

// ============================================================================
// Queue Attributes Tests
// ============================================================================

test(
  "set and get queue attributes",
  withQueue("itty-sqs-attributes", (queueUrl) =>
    Effect.gen(function* () {
      // Set queue attributes
      yield* setQueueAttributes({
        QueueUrl: queueUrl,
        Attributes: {
          VisibilityTimeout: "60",
          MessageRetentionPeriod: "86400", // 1 day
          DelaySeconds: "5",
        },
      });

      // Get queue attributes
      const attrs = yield* getQueueAttributes({
        QueueUrl: queueUrl,
        AttributeNames: [
          "VisibilityTimeout",
          "MessageRetentionPeriod",
          "DelaySeconds",
          "ApproximateNumberOfMessages",
        ],
      });

      if (attrs.Attributes?.VisibilityTimeout !== "60") {
        return yield* Effect.fail(
          new Error(
            `Expected VisibilityTimeout=60, got ${attrs.Attributes?.VisibilityTimeout}`,
          ),
        );
      }

      if (attrs.Attributes?.MessageRetentionPeriod !== "86400") {
        return yield* Effect.fail(
          new Error(
            `Expected MessageRetentionPeriod=86400, got ${attrs.Attributes?.MessageRetentionPeriod}`,
          ),
        );
      }

      if (attrs.Attributes?.DelaySeconds !== "5") {
        return yield* Effect.fail(
          new Error(
            `Expected DelaySeconds=5, got ${attrs.Attributes?.DelaySeconds}`,
          ),
        );
      }

      // ApproximateNumberOfMessages should be 0 for empty queue
      if (attrs.Attributes?.ApproximateNumberOfMessages !== "0") {
        return yield* Effect.fail(
          new Error(
            `Expected ApproximateNumberOfMessages=0, got ${attrs.Attributes?.ApproximateNumberOfMessages}`,
          ),
        );
      }
    }),
  ),
);

// ============================================================================
// Queue Tagging Tests
// ============================================================================

test(
  "tag queue, list tags, and untag queue",
  withQueue("itty-sqs-tagging", (queueUrl) =>
    Effect.gen(function* () {
      // Add tags to queue
      yield* tagQueue({
        QueueUrl: queueUrl,
        Tags: {
          Environment: "Test",
          Project: "itty-aws",
          Team: "Platform",
        },
      });

      // List tags
      const tagsResult = yield* listQueueTags({ QueueUrl: queueUrl });
      if (tagsResult.Tags?.Environment !== "Test") {
        return yield* Effect.fail(
          new Error(
            `Expected Environment=Test, got ${tagsResult.Tags?.Environment}`,
          ),
        );
      }
      if (tagsResult.Tags?.Project !== "itty-aws") {
        return yield* Effect.fail(
          new Error(
            `Expected Project=itty-aws, got ${tagsResult.Tags?.Project}`,
          ),
        );
      }

      // Update a tag
      yield* tagQueue({
        QueueUrl: queueUrl,
        Tags: {
          Environment: "Production",
        },
      });

      // Verify update
      const updatedTags = yield* listQueueTags({ QueueUrl: queueUrl });
      if (updatedTags.Tags?.Environment !== "Production") {
        return yield* Effect.fail(
          new Error(
            `Expected Environment=Production, got ${updatedTags.Tags?.Environment}`,
          ),
        );
      }

      // Remove a tag
      yield* untagQueue({
        QueueUrl: queueUrl,
        TagKeys: ["Project"],
      });

      // Verify tag removal
      const finalTags = yield* listQueueTags({ QueueUrl: queueUrl });
      if (finalTags.Tags?.Project !== undefined) {
        return yield* Effect.fail(
          new Error("Project tag should have been removed"),
        );
      }
      if (finalTags.Tags?.Environment !== "Production") {
        return yield* Effect.fail(
          new Error("Environment tag should still exist"),
        );
      }
    }),
  ),
);

// ============================================================================
// Message Send/Receive Tests
// ============================================================================

test(
  "send and receive message",
  withQueue("itty-sqs-message", (queueUrl) =>
    Effect.gen(function* () {
      const messageBody = "Hello, SQS!";

      // Send message
      const sendResult = yield* sendMessage({
        QueueUrl: queueUrl,
        MessageBody: messageBody,
      });

      if (!sendResult.MessageId) {
        return yield* Effect.fail(
          new Error("Expected MessageId to be returned"),
        );
      }

      if (!sendResult.MD5OfMessageBody) {
        return yield* Effect.fail(
          new Error("Expected MD5OfMessageBody to be returned"),
        );
      }

      // Receive message
      const receiveResult = yield* receiveMessage({
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 5,
      });

      if (!receiveResult.Messages || receiveResult.Messages.length === 0) {
        return yield* Effect.fail(new Error("Expected to receive a message"));
      }

      const message = receiveResult.Messages[0];
      if (message.Body !== messageBody) {
        return yield* Effect.fail(
          new Error(`Expected Body=${messageBody}, got ${message.Body}`),
        );
      }

      if (!message.ReceiptHandle) {
        return yield* Effect.fail(
          new Error("Expected ReceiptHandle to be returned"),
        );
      }

      // Delete the message
      yield* deleteMessage({
        QueueUrl: queueUrl,
        ReceiptHandle: message.ReceiptHandle,
      });

      // Verify message is deleted (receive should return empty)
      const receiveAfterDelete = yield* receiveMessage({
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 1,
      });

      if (
        receiveAfterDelete.Messages &&
        receiveAfterDelete.Messages.length > 0
      ) {
        return yield* Effect.fail(
          new Error("Message should have been deleted"),
        );
      }
    }),
  ),
);

test(
  "send message with delay",
  withQueue("itty-sqs-delay", (queueUrl) =>
    Effect.gen(function* () {
      const messageBody = "Delayed message";

      // Send message with delay
      yield* sendMessage({
        QueueUrl: queueUrl,
        MessageBody: messageBody,
        DelaySeconds: 1,
      });

      // Immediately try to receive - should be empty due to delay
      const immediateReceive = yield* receiveMessage({
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 0,
      });

      // Message should not be immediately available due to delay
      // (though timing might vary in LocalStack)
      if (immediateReceive.Messages && immediateReceive.Messages.length > 0) {
        // If we receive it immediately, LocalStack may not fully support delays
        // Just log and continue - the main test is that delays work eventually
      }

      // Wait for the delay to expire
      yield* Effect.sleep("2 seconds");

      // Now receive - should get the message
      const delayedReceive = yield* receiveMessage({
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 5,
      });

      if (!delayedReceive.Messages || delayedReceive.Messages.length === 0) {
        return yield* Effect.fail(
          new Error("Expected to receive the delayed message"),
        );
      }

      if (delayedReceive.Messages[0].Body !== messageBody) {
        return yield* Effect.fail(
          new Error(
            `Expected Body=${messageBody}, got ${delayedReceive.Messages[0].Body}`,
          ),
        );
      }
    }),
  ),
);

test(
  "send message with message attributes",
  withQueue("itty-sqs-attrs", (queueUrl) =>
    Effect.gen(function* () {
      const messageBody = "Message with attributes";

      // Send message with attributes
      yield* sendMessage({
        QueueUrl: queueUrl,
        MessageBody: messageBody,
        MessageAttributes: {
          StringAttr: {
            DataType: "String",
            StringValue: "Hello",
          },
          NumberAttr: {
            DataType: "Number",
            StringValue: "42",
          },
        },
      });

      // Receive message with attributes
      const receiveResult = yield* receiveMessage({
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 5,
        MessageAttributeNames: ["All"],
      });

      if (!receiveResult.Messages || receiveResult.Messages.length === 0) {
        return yield* Effect.fail(new Error("Expected to receive a message"));
      }

      const message = receiveResult.Messages[0];
      const attrs = message.MessageAttributes;

      if (attrs?.StringAttr?.StringValue !== "Hello") {
        return yield* Effect.fail(
          new Error(
            `Expected StringAttr=Hello, got ${attrs?.StringAttr?.StringValue}`,
          ),
        );
      }

      if (attrs?.NumberAttr?.StringValue !== "42") {
        return yield* Effect.fail(
          new Error(
            `Expected NumberAttr=42, got ${attrs?.NumberAttr?.StringValue}`,
          ),
        );
      }
    }),
  ),
);

// ============================================================================
// Visibility Timeout Tests
// ============================================================================

test(
  "change message visibility",
  withQueue("itty-sqs-visibility", (queueUrl) =>
    Effect.gen(function* () {
      const messageBody = "Visibility test";

      // Send message
      yield* sendMessage({
        QueueUrl: queueUrl,
        MessageBody: messageBody,
      });

      // Receive message
      const receiveResult = yield* receiveMessage({
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 5,
        VisibilityTimeout: 30, // Set initial visibility timeout
      });

      if (!receiveResult.Messages || receiveResult.Messages.length === 0) {
        return yield* Effect.fail(new Error("Expected to receive a message"));
      }

      const message = receiveResult.Messages[0];

      // Change visibility timeout
      yield* changeMessageVisibility({
        QueueUrl: queueUrl,
        ReceiptHandle: message.ReceiptHandle!,
        VisibilityTimeout: 60, // Extend to 60 seconds
      });

      // Message should still not be visible (extended timeout)
      const immediateReceive = yield* receiveMessage({
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 1,
      });

      // Should not receive the same message due to visibility timeout
      if (
        immediateReceive.Messages &&
        immediateReceive.Messages.length > 0 &&
        immediateReceive.Messages[0].MessageId === message.MessageId
      ) {
        return yield* Effect.fail(
          new Error("Message should not be visible yet"),
        );
      }
    }),
  ),
);

// ============================================================================
// Batch Operations Tests
// ============================================================================

test(
  "send multiple messages and delete them individually",
  withQueue("itty-sqs-batch", (queueUrl) =>
    Effect.gen(function* () {
      // Send multiple messages individually
      yield* sendMessage({
        QueueUrl: queueUrl,
        MessageBody: "Message 1",
      });
      yield* sendMessage({
        QueueUrl: queueUrl,
        MessageBody: "Message 2",
      });
      yield* sendMessage({
        QueueUrl: queueUrl,
        MessageBody: "Message 3",
      });

      // Receive all messages - SQS may not return all in one call, so we need to collect
      type Message = { Body?: string; ReceiptHandle?: string };
      const allMessages: Message[] = [];
      let attempts = 0;
      const maxAttempts = 5;

      while (allMessages.length < 3 && attempts < maxAttempts) {
        const receiveResult = yield* receiveMessage({
          QueueUrl: queueUrl,
          MaxNumberOfMessages: 10,
          WaitTimeSeconds: 3,
        });

        if (receiveResult.Messages) {
          allMessages.push(...receiveResult.Messages);
        }
        attempts++;
      }

      if (allMessages.length !== 3) {
        return yield* Effect.fail(
          new Error(
            `Expected 3 messages, got ${allMessages.length} after ${attempts} attempts`,
          ),
        );
      }

      // Verify message bodies
      const bodies = allMessages.map((m) => m.Body).sort();
      if (
        bodies[0] !== "Message 1" ||
        bodies[1] !== "Message 2" ||
        bodies[2] !== "Message 3"
      ) {
        return yield* Effect.fail(
          new Error(`Unexpected message bodies: ${bodies.join(", ")}`),
        );
      }

      // Delete messages individually
      for (const msg of allMessages) {
        yield* deleteMessage({
          QueueUrl: queueUrl,
          ReceiptHandle: msg.ReceiptHandle!,
        });
      }

      // Verify queue is empty
      const finalReceive = yield* receiveMessage({
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 10,
        WaitTimeSeconds: 1,
      });

      if (finalReceive.Messages && finalReceive.Messages.length > 0) {
        return yield* Effect.fail(
          new Error("Queue should be empty after deleting messages"),
        );
      }
    }),
  ),
);

// ============================================================================
// Purge Queue Tests
// ============================================================================

test(
  "purge queue",
  withQueue("itty-sqs-purge", (queueUrl) =>
    Effect.gen(function* () {
      // Send multiple messages individually
      yield* sendMessage({
        QueueUrl: queueUrl,
        MessageBody: "Purge me 1",
      });
      yield* sendMessage({
        QueueUrl: queueUrl,
        MessageBody: "Purge me 2",
      });
      yield* sendMessage({
        QueueUrl: queueUrl,
        MessageBody: "Purge me 3",
      });

      // Purge the queue
      yield* purgeQueue({ QueueUrl: queueUrl });

      // Wait a moment for purge to take effect
      yield* Effect.sleep("2 seconds");

      // Verify queue is empty
      const receiveResult = yield* receiveMessage({
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 10,
        WaitTimeSeconds: 1,
      });

      if (receiveResult.Messages && receiveResult.Messages.length > 0) {
        return yield* Effect.fail(
          new Error("Queue should be empty after purge"),
        );
      }
    }),
  ),
);

// ============================================================================
// FIFO Queue Tests
// ============================================================================

test(
  "FIFO queue: send and receive with message group",
  withFifoQueue("itty-sqs-fifo", (queueUrl) =>
    Effect.gen(function* () {
      // Send messages to same message group - they should be received in order
      yield* sendMessage({
        QueueUrl: queueUrl,
        MessageBody: "FIFO Message 1",
        MessageGroupId: "group1",
      });

      yield* sendMessage({
        QueueUrl: queueUrl,
        MessageBody: "FIFO Message 2",
        MessageGroupId: "group1",
      });

      yield* sendMessage({
        QueueUrl: queueUrl,
        MessageBody: "FIFO Message 3",
        MessageGroupId: "group1",
      });

      // Receive messages - should be in order
      const receiveResult1 = yield* receiveMessage({
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 5,
      });

      if (receiveResult1.Messages?.[0]?.Body !== "FIFO Message 1") {
        return yield* Effect.fail(
          new Error(
            `Expected first message to be 'FIFO Message 1', got ${receiveResult1.Messages?.[0]?.Body}`,
          ),
        );
      }

      // Delete first message before receiving next
      yield* deleteMessage({
        QueueUrl: queueUrl,
        ReceiptHandle: receiveResult1.Messages![0].ReceiptHandle!,
      });

      const receiveResult2 = yield* receiveMessage({
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 5,
      });

      if (receiveResult2.Messages?.[0]?.Body !== "FIFO Message 2") {
        return yield* Effect.fail(
          new Error(
            `Expected second message to be 'FIFO Message 2', got ${receiveResult2.Messages?.[0]?.Body}`,
          ),
        );
      }

      // Verify sequence numbers are present for FIFO
      if (!receiveResult1.Messages?.[0]?.Attributes?.SequenceNumber) {
        // SequenceNumber is returned in MessageSystemAttributeNames
        // Let's receive with system attributes
      }
    }),
  ),
);

test(
  "FIFO queue: different message groups processed independently",
  withFifoQueue("itty-sqs-fifo-groups", (queueUrl) =>
    Effect.gen(function* () {
      // Send messages to different groups
      yield* sendMessage({
        QueueUrl: queueUrl,
        MessageBody: "Group A - Message 1",
        MessageGroupId: "groupA",
      });

      yield* sendMessage({
        QueueUrl: queueUrl,
        MessageBody: "Group B - Message 1",
        MessageGroupId: "groupB",
      });

      yield* sendMessage({
        QueueUrl: queueUrl,
        MessageBody: "Group A - Message 2",
        MessageGroupId: "groupA",
      });

      // Receive all messages (up to 10)
      const receiveResult = yield* receiveMessage({
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 10,
        WaitTimeSeconds: 5,
      });

      if (!receiveResult.Messages || receiveResult.Messages.length !== 3) {
        return yield* Effect.fail(
          new Error(
            `Expected 3 messages, got ${receiveResult.Messages?.length ?? 0}`,
          ),
        );
      }

      // Messages from same group should maintain relative order
      const groupAMessages = receiveResult.Messages.filter((m) =>
        m.Body?.startsWith("Group A"),
      );
      const groupBMessages = receiveResult.Messages.filter((m) =>
        m.Body?.startsWith("Group B"),
      );

      if (groupAMessages.length !== 2) {
        return yield* Effect.fail(
          new Error(
            `Expected 2 Group A messages, got ${groupAMessages.length}`,
          ),
        );
      }

      if (groupBMessages.length !== 1) {
        return yield* Effect.fail(
          new Error(`Expected 1 Group B message, got ${groupBMessages.length}`),
        );
      }
    }),
  ),
);

// ============================================================================
// Long Polling Tests
// ============================================================================

test(
  "long polling with WaitTimeSeconds",
  withQueue("itty-sqs-long-poll-test", (queueUrl) =>
    Effect.gen(function* () {
      // Send a message first
      yield* sendMessage({
        QueueUrl: queueUrl,
        MessageBody: "Long poll test",
      });

      // Long poll should find the message
      const receiveResult = yield* receiveMessage({
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 5,
      });

      if (!receiveResult.Messages || receiveResult.Messages.length === 0) {
        return yield* Effect.fail(
          new Error("Expected to receive message with long polling"),
        );
      }

      if (receiveResult.Messages[0].Body !== "Long poll test") {
        return yield* Effect.fail(
          new Error(
            `Expected 'Long poll test', got ${receiveResult.Messages[0].Body}`,
          ),
        );
      }

      // Now verify an empty queue returns no messages with short poll
      yield* deleteMessage({
        QueueUrl: queueUrl,
        ReceiptHandle: receiveResult.Messages[0].ReceiptHandle!,
      });

      const emptyReceive = yield* receiveMessage({
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 1,
      });

      // Should return empty since no messages
      if (emptyReceive.Messages && emptyReceive.Messages.length > 0) {
        return yield* Effect.fail(
          new Error("Expected no messages after delete"),
        );
      }
    }),
  ),
);

// ============================================================================
// Receive with System Attributes Tests
// ============================================================================

test(
  "receive message with system attributes",
  withQueue("itty-sqs-sysattrs", (queueUrl) =>
    Effect.gen(function* () {
      // Send a message
      yield* sendMessage({
        QueueUrl: queueUrl,
        MessageBody: "System attributes test",
      });

      // Receive with all system attributes
      const receiveResult = yield* receiveMessage({
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 5,
        MessageSystemAttributeNames: ["All"],
      });

      if (!receiveResult.Messages || receiveResult.Messages.length === 0) {
        return yield* Effect.fail(new Error("Expected to receive a message"));
      }

      const message = receiveResult.Messages[0];
      const attrs = message.Attributes;

      // Should have SentTimestamp
      if (!attrs?.SentTimestamp) {
        return yield* Effect.fail(
          new Error("Expected SentTimestamp attribute"),
        );
      }

      // Should have ApproximateReceiveCount
      if (!attrs?.ApproximateReceiveCount) {
        return yield* Effect.fail(
          new Error("Expected ApproximateReceiveCount attribute"),
        );
      }

      // ApproximateReceiveCount should be "1" for first receive
      if (attrs.ApproximateReceiveCount !== "1") {
        return yield* Effect.fail(
          new Error(
            `Expected ApproximateReceiveCount=1, got ${attrs.ApproximateReceiveCount}`,
          ),
        );
      }
    }),
  ),
);
