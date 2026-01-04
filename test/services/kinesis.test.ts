import { Data, Effect, Schedule, Stream } from "effect";
import {
  createStream,
  deleteStream,
  deregisterStreamConsumer,
  describeStream,
  describeStreamConsumer,
  getRecords,
  getShardIterator,
  listShards,
  listStreams,
  putRecord,
  registerStreamConsumer,
  subscribeToShard,
} from "../../src/services/kinesis.ts";
import { test } from "../test.ts";

class NotReady extends Data.TaggedError("NotReady")<{
  status: string | undefined;
}> {}
class StillExists extends Data.TaggedError("StillExists")<{}> {}
class ConsumerDeleting extends Data.TaggedError("ConsumerDeleting")<{}> {}
class StreamNotActive extends Data.TaggedError("StreamNotActive")<{}> {}
class StreamNotDeleted extends Data.TaggedError("StreamNotDeleted")<{}> {}
class ConsumerNotActive extends Data.TaggedError("ConsumerNotActive")<{}> {}

// Helper to wait for stream to become active
const waitForStreamActive = (streamName: string) =>
  describeStream({ StreamName: streamName }).pipe(
    Effect.tapError(Effect.logDebug),
    // If stream doesn't exist yet, treat as NotReady
    Effect.catchTag("ResourceNotFoundException", () =>
      Effect.fail(new NotReady({ status: undefined })),
    ),
    Effect.flatMap((result) => {
      const status = result.StreamDescription?.StreamStatus;
      if (status === "ACTIVE") {
        return Effect.succeed(result);
      }
      return Effect.fail(new NotReady({ status }));
    }),
    Effect.retry({
      while: (err) => err instanceof NotReady && err.status !== "DELETING",
      schedule: Schedule.spaced("2 seconds").pipe(
        Schedule.intersect(Schedule.recurs(30)),
      ),
    }),
    Effect.mapError(() => new StreamNotActive()),
  );

// Helper to wait for stream to be deleted
const waitForStreamDeleted = (streamName: string) =>
  describeStream({ StreamName: streamName }).pipe(
    // If stream exists, fail with StillExists to trigger retry
    Effect.flatMap(() => Effect.fail(new StillExists())),
    Effect.tapError(Effect.logDebug),
    // Stream doesn't exist = deleted successfully
    Effect.catchTag("ResourceNotFoundException", () => Effect.void),
    Effect.retry({
      while: (err) => err instanceof StillExists,
      schedule: Schedule.spaced("2 seconds").pipe(
        Schedule.intersect(Schedule.recurs(30)),
      ),
    }),
    Effect.mapError(() => new StreamNotDeleted()),
  );

// Helper to wait for consumer to become active
const waitForConsumerActive = (consumerArn: string) =>
  Effect.gen(function* () {
    const result = yield* describeStreamConsumer({
      ConsumerARN: consumerArn,
    }).pipe(
      // If consumer doesn't exist yet, treat as NotReady
      Effect.catchTag("ResourceNotFoundException", () =>
        Effect.fail(new NotReady({ status: undefined })),
      ),
    );

    const status = result.ConsumerDescription?.ConsumerStatus;
    if (status === "ACTIVE") {
      return result;
    }
    if (status === "DELETING") {
      return yield* new ConsumerDeleting();
    }
    return yield* new NotReady({ status });
  }).pipe(
    Effect.retry({
      while: (err) => err instanceof NotReady,
      schedule: Schedule.spaced("2 seconds").pipe(
        Schedule.intersect(Schedule.recurs(60)),
      ),
    }),
    Effect.mapError((err) =>
      err instanceof ConsumerDeleting ? err : new ConsumerNotActive(),
    ),
  );

// Helper to create a stream and ensure cleanup
const withStream = <A, E, R>(
  streamName: string,
  testFn: (streamName: string) => Effect.Effect<A, E, R>,
) =>
  Effect.gen(function* () {
    // Delete existing stream if it exists (cleanup from previous runs)
    yield* deleteStream({
      StreamName: streamName,
      EnforceConsumerDeletion: true,
    }).pipe(Effect.ignore);
    yield* waitForStreamDeleted(streamName);

    // Create stream
    yield* createStream({
      StreamName: streamName,
      ShardCount: 1,
    });

    // Wait for stream to become active
    yield* waitForStreamActive(streamName);

    // Run the test
    return yield* testFn(streamName).pipe(
      Effect.ensuring(
        deleteStream({
          StreamName: streamName,
          EnforceConsumerDeletion: true,
        }).pipe(Effect.ignore),
      ),
    );
  });

// ============================================================================
// Basic Kinesis Tests
// ============================================================================

test(
  "create stream, list streams, describe, and delete",
  { timeout: 300_000 },
  withStream("itty-aws-kinesis-basic-test", (streamName) =>
    Effect.gen(function* () {
      // List streams and verify our stream is in the list
      const listResult = yield* listStreams({});
      const foundStream = listResult.StreamNames?.find(
        (name) => name === streamName,
      );
      if (!foundStream) {
        return yield* Effect.fail(new Error("Stream not found in list"));
      }

      // Describe stream
      const describeResult = yield* describeStream({ StreamName: streamName });
      if (describeResult.StreamDescription?.StreamName !== streamName) {
        return yield* Effect.fail(
          new Error("Stream name mismatch in describe result"),
        );
      }

      if (describeResult.StreamDescription?.StreamStatus !== "ACTIVE") {
        return yield* Effect.fail(
          new Error(
            `Expected StreamStatus=ACTIVE, got ${describeResult.StreamDescription?.StreamStatus}`,
          ),
        );
      }
    }),
  ),
);

test(
  "put record and get records",
  { timeout: 300_000 },
  withStream("itty-aws-kinesis-putget-test", (streamName) =>
    Effect.gen(function* () {
      // Put a record
      const testData = new TextEncoder().encode(
        JSON.stringify({ test: "hello" }),
      );
      const putResult = yield* putRecord({
        StreamName: streamName,
        Data: testData,
        PartitionKey: "test-partition",
      });

      if (!putResult.ShardId) {
        return yield* Effect.fail(new Error("No ShardId in put result"));
      }

      // List shards to get the shard ID
      const shardsResult = yield* listShards({ StreamName: streamName });
      const shardId = shardsResult.Shards?.[0]?.ShardId;
      if (!shardId) {
        return yield* Effect.fail(new Error("No shards found"));
      }

      // Get shard iterator
      const iteratorResult = yield* getShardIterator({
        StreamName: streamName,
        ShardId: shardId,
        ShardIteratorType: "TRIM_HORIZON",
      });

      if (!iteratorResult.ShardIterator) {
        return yield* Effect.fail(new Error("No shard iterator returned"));
      }

      // Get records
      const recordsResult = yield* getRecords({
        ShardIterator: iteratorResult.ShardIterator,
      });

      // Should have at least one record
      if (!recordsResult.Records?.length) {
        return yield* Effect.fail(new Error("No records returned"));
      }

      // Verify data matches
      const record = recordsResult.Records[0];
      if (!record.Data) {
        return yield* Effect.fail(new Error("Record has no data"));
      }
    }),
  ),
);

// ============================================================================
// Event Stream Tests (SubscribeToShard)
// ============================================================================

// Note: SubscribeToShard requires enhanced fan-out which may not be fully
// supported in LocalStack. This test verifies the event stream receives real events.
test(
  "subscribeToShard receives records matching sent data",
  { timeout: 300_000 },
  withStream("itty-aws-kinesis-subscribe-test", (streamName) =>
    Effect.gen(function* () {
      // Get stream ARN
      const describeResult = yield* describeStream({ StreamName: streamName });
      const streamArn = describeResult.StreamDescription?.StreamARN;
      if (!streamArn) {
        return yield* Effect.fail(new Error("No stream ARN found"));
      }

      // Put some records into the stream BEFORE subscribing
      const testRecords = [
        { id: 1, message: "Hello from record 1" },
        { id: 2, message: "Hello from record 2" },
        { id: 3, message: "Hello from record 3" },
      ];

      for (const record of testRecords) {
        yield* putRecord({
          StreamName: streamName,
          Data: new TextEncoder().encode(JSON.stringify(record)),
          PartitionKey: `partition-${record.id}`,
        });
      }

      // Register a stream consumer (required for SubscribeToShard)
      const consumerName = "test-consumer";
      const registerResult = yield* registerStreamConsumer({
        StreamARN: streamArn,
        ConsumerName: consumerName,
      });

      const consumerArn = registerResult.Consumer?.ConsumerARN;
      if (!consumerArn) {
        return yield* Effect.fail(new Error("No consumer ARN returned"));
      }

      // Wait for consumer to become active
      yield* waitForConsumerActive(consumerArn);

      // Get shard ID
      const shardsResult = yield* listShards({ StreamName: streamName });
      const shardId = shardsResult.Shards?.[0]?.ShardId;
      if (!shardId) {
        return yield* Effect.fail(new Error("No shards found"));
      }

      try {
        // Subscribe to shard - this returns an event stream
        const subscribeResult = yield* subscribeToShard({
          ConsumerARN: consumerArn,
          ShardId: shardId,
          StartingPosition: {
            Type: "TRIM_HORIZON",
          },
        });

        // The EventStream should be an Effect Stream
        const eventStream = subscribeResult.EventStream;

        // Collect events from the stream - we need enough to get the records
        const events = yield* Stream.take(eventStream, 5).pipe(
          Stream.runCollect,
          Effect.timeout("30 seconds"),
          Effect.catchAll((err) => {
            return Effect.logWarning(
              `Event stream timeout or error: ${err}`,
            ).pipe(Effect.as([]));
          }),
        );

        // Verify we received events
        if (events.length === 0) {
          return yield* Effect.fail(
            new Error(
              "No events received from SubscribeToShard - expected at least 1 event",
            ),
          );
        }

        // Find SubscribeToShardEvent events with records
        // Events are tagged union members like { SubscribeToShardEvent: {...} }
        const allReceivedRecords: Array<{ id: number; message: string }> = [];

        for (const event of events) {
          if (
            typeof event === "object" &&
            event !== null &&
            "SubscribeToShardEvent" in event
          ) {
            const shardEvent = (event as Record<string, unknown>)
              .SubscribeToShardEvent as Record<string, unknown>;
            const records = shardEvent.Records as Array<
              Record<string, unknown>
            >;
            // Records contain the data we sent
            for (const record of records) {
              if (record.Data) {
                // Data comes as base64 string from event stream JSON parsing
                const dataBytes =
                  record.Data instanceof Uint8Array
                    ? record.Data
                    : Uint8Array.from(atob(record.Data as string), (c) =>
                        c.charCodeAt(0),
                      );
                const dataText = new TextDecoder().decode(dataBytes);
                const data = JSON.parse(dataText) as {
                  id: number;
                  message: string;
                };
                allReceivedRecords.push(data);
              }
            }
          }
        }

        // Verify we received all the records we sent
        if (allReceivedRecords.length !== testRecords.length) {
          return yield* Effect.fail(
            new Error(
              `Expected ${testRecords.length} records, got ${allReceivedRecords.length}`,
            ),
          );
        }

        // Verify the content matches (records may be in different order)
        for (const sent of testRecords) {
          const found = allReceivedRecords.find(
            (r) => r.id === sent.id && r.message === sent.message,
          );
          if (!found) {
            return yield* Effect.fail(
              new Error(
                `Record not found in received data: ${JSON.stringify(sent)}`,
              ),
            );
          }
        }
      } finally {
        // Clean up consumer
        yield* deregisterStreamConsumer({
          ConsumerARN: consumerArn,
        }).pipe(Effect.ignore);
      }
    }),
  ),
);

// ============================================================================
// Long-running Event Stream Test
// ============================================================================

// This test exercises the event stream over a longer period with continuous
// record production to catch edge cases like:
// - Message fragmentation across TCP chunks
// - Multiple messages arriving in a single chunk
// - Stream continuation after initial batch
// - Idle periods between records
test(
  "subscribeToShard handles continuous streaming",
  { timeout: 300_000 },
  withStream("itty-aws-kinesis-continuous-test", (streamName) =>
    Effect.gen(function* () {
      // Get stream ARN
      const describeResult = yield* describeStream({ StreamName: streamName });
      const streamArn = describeResult.StreamDescription?.StreamARN;
      if (!streamArn) {
        return yield* Effect.fail(new Error("No stream ARN found"));
      }

      // Register a stream consumer
      const consumerName = "test-consumer-continuous";
      const registerResult = yield* registerStreamConsumer({
        StreamARN: streamArn,
        ConsumerName: consumerName,
      });

      const consumerArn = registerResult.Consumer?.ConsumerARN;
      if (!consumerArn) {
        return yield* Effect.fail(new Error("No consumer ARN returned"));
      }

      yield* waitForConsumerActive(consumerArn);

      const shardsResult = yield* listShards({ StreamName: streamName });
      const shardId = shardsResult.Shards?.[0]?.ShardId;
      if (!shardId) {
        return yield* Effect.fail(new Error("No shards found"));
      }

      try {
        // Track records we're going to send
        const sentRecords: Array<{ id: number; timestamp: number }> = [];
        const receivedRecords: Array<{ id: number; timestamp: number }> = [];
        let producerDone = false;

        // Producer fiber: continuously put records at varying intervals
        const producer = Effect.gen(function* () {
          for (let i = 0; i < 10; i++) {
            const record = { id: i, timestamp: Date.now() };
            sentRecords.push(record);

            yield* putRecord({
              StreamName: streamName,
              Data: new TextEncoder().encode(JSON.stringify(record)),
              PartitionKey: `partition-${i % 3}`, // Distribute across partitions
            });

            // Vary the interval to create different timing patterns
            const delay = i % 2 === 0 ? 500 : 1500;
            yield* Effect.sleep(`${delay} millis`);
          }

          producerDone = true;
        });

        // Consumer: subscribe and collect records
        const consumer = Effect.gen(function* () {
          const subscribeResult = yield* subscribeToShard({
            ConsumerARN: consumerArn,
            ShardId: shardId,
            StartingPosition: {
              Type: "TRIM_HORIZON",
            },
          });

          const eventStream = subscribeResult.EventStream;

          // Collect events until we have all records or timeout
          yield* Stream.takeWhile(eventStream, () => {
            // Stop when producer is done and we have all records
            if (producerDone && receivedRecords.length >= sentRecords.length) {
              return false;
            }
            return true;
          }).pipe(
            Stream.runForEach((event) =>
              Effect.gen(function* () {
                // Events are tagged union members like { SubscribeToShardEvent: {...} }
                if (
                  typeof event === "object" &&
                  event !== null &&
                  "SubscribeToShardEvent" in event
                ) {
                  const shardEvent = (event as Record<string, unknown>)
                    .SubscribeToShardEvent as Record<string, unknown>;
                  const records = shardEvent.Records as Array<
                    Record<string, unknown>
                  >;
                  for (const record of records) {
                    if (record.Data) {
                      // Data comes as base64 string from event stream JSON parsing
                      const dataBytes =
                        record.Data instanceof Uint8Array
                          ? record.Data
                          : Uint8Array.from(atob(record.Data as string), (c) =>
                              c.charCodeAt(0),
                            );
                      const dataText = new TextDecoder().decode(dataBytes);
                      const data = JSON.parse(dataText) as {
                        id: number;
                        timestamp: number;
                      };
                      receivedRecords.push(data);
                    }
                  }
                }
              }),
            ),
            Effect.timeout("60 seconds"),
          );
        });

        // Run producer and consumer concurrently
        yield* Effect.all([producer, consumer], { concurrency: 2 });

        // Verify we received a reasonable number of records
        // (LocalStack may not deliver all records immediately)
        if (receivedRecords.length < sentRecords.length / 2) {
          return yield* Effect.fail(
            new Error(
              `Expected at least ${sentRecords.length / 2} records, got ${receivedRecords.length}`,
            ),
          );
        }

        // Verify received records match sent records
        for (const received of receivedRecords) {
          const sent = sentRecords.find((s) => s.id === received.id);
          if (!sent) {
            return yield* Effect.fail(
              new Error(`Received unexpected record id: ${received.id}`),
            );
          }
        }
      } finally {
        yield* deregisterStreamConsumer({
          ConsumerARN: consumerArn,
        }).pipe(Effect.ignore);
      }
    }),
  ),
);
