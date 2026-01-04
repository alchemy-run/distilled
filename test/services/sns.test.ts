import { Effect } from "effect";
import {
  // Permissions
  addPermission,
  // Topic operations
  createTopic,
  deleteTopic,
  getSubscriptionAttributes,
  getTopicAttributes,
  listSubscriptionsByTopic,
  listTagsForResource,
  listTopics,
  // Publishing
  publish,
  publishBatch,
  removePermission,
  setSubscriptionAttributes,
  setTopicAttributes,
  // Subscription operations
  subscribe,
  // Tagging
  tagResource,
  unsubscribe,
  untagResource,
} from "../../src/services/sns.ts";
import { test } from "../test.ts";

// Helper to ensure cleanup happens even on failure
const withTopic = <A, E, R>(
  name: string,
  testFn: (topicArn: string) => Effect.Effect<A, E, R>,
) =>
  Effect.gen(function* () {
    const result = yield* createTopic({ Name: name });
    const topicArn = result.TopicArn!;
    return yield* testFn(topicArn).pipe(
      Effect.ensuring(deleteTopic({ TopicArn: topicArn }).pipe(Effect.ignore)),
    );
  });

// ============================================================================
// Topic Lifecycle Tests
// ============================================================================

test(
  "create topic, get attributes, list topics, and delete",
  withTopic("itty-sns-lifecycle", (topicArn) =>
    Effect.gen(function* () {
      // Get topic attributes
      const attributes = yield* getTopicAttributes({ TopicArn: topicArn });
      if (!attributes.Attributes) {
        return yield* Effect.fail(
          new Error("Expected Attributes to be present"),
        );
      }

      // TopicArn should match
      if (attributes.Attributes.TopicArn !== topicArn) {
        return yield* Effect.fail(
          new Error(
            `TopicArn mismatch: expected ${topicArn}, got ${attributes.Attributes.TopicArn}`,
          ),
        );
      }

      // List topics and verify our topic is in the list
      const listResult = yield* listTopics({});
      const foundTopic = listResult.Topics?.find(
        (t) => t.TopicArn === topicArn,
      );
      if (!foundTopic) {
        return yield* Effect.fail(new Error("Topic not found in list"));
      }
    }),
  ),
);

test(
  "set topic attributes",
  withTopic("itty-sns-attributes", (topicArn) =>
    Effect.gen(function* () {
      // Set DisplayName attribute
      yield* setTopicAttributes({
        TopicArn: topicArn,
        AttributeName: "DisplayName",
        AttributeValue: "My Test Topic",
      });

      // Verify the attribute was set
      const attributes = yield* getTopicAttributes({ TopicArn: topicArn });
      if (attributes.Attributes?.DisplayName !== "My Test Topic") {
        return yield* Effect.fail(
          new Error(
            `Expected DisplayName='My Test Topic', got '${attributes.Attributes?.DisplayName}'`,
          ),
        );
      }

      // Update the attribute
      yield* setTopicAttributes({
        TopicArn: topicArn,
        AttributeName: "DisplayName",
        AttributeValue: "Updated Topic Name",
      });

      // Verify the update
      const updatedAttributes = yield* getTopicAttributes({
        TopicArn: topicArn,
      });
      if (updatedAttributes.Attributes?.DisplayName !== "Updated Topic Name") {
        return yield* Effect.fail(
          new Error(
            `Expected DisplayName='Updated Topic Name', got '${updatedAttributes.Attributes?.DisplayName}'`,
          ),
        );
      }
    }),
  ),
);

// ============================================================================
// Tagging Tests
// ============================================================================

test(
  "topic tagging: add, list, and remove tags",
  withTopic("itty-sns-tagging", (topicArn) =>
    Effect.gen(function* () {
      // Add tags
      yield* tagResource({
        ResourceArn: topicArn,
        Tags: [
          { Key: "Environment", Value: "Test" },
          { Key: "Project", Value: "itty-aws" },
          { Key: "Team", Value: "Platform" },
        ],
      });

      // List and verify tags
      const tags = yield* listTagsForResource({ ResourceArn: topicArn });
      if (tags.Tags?.length !== 3) {
        return yield* Effect.fail(
          new Error(`Expected 3 tags, got ${tags.Tags?.length}`),
        );
      }

      const envTag = tags.Tags?.find((t) => t.Key === "Environment");
      if (envTag?.Value !== "Test") {
        return yield* Effect.fail(
          new Error(`Expected Environment=Test, got ${envTag?.Value}`),
        );
      }

      // Remove one tag
      yield* untagResource({
        ResourceArn: topicArn,
        TagKeys: ["Team"],
      });

      // Verify removal
      const updatedTags = yield* listTagsForResource({ ResourceArn: topicArn });
      if (updatedTags.Tags?.length !== 2) {
        return yield* Effect.fail(
          new Error(
            `Expected 2 tags after removal, got ${updatedTags.Tags?.length}`,
          ),
        );
      }

      const teamTag = updatedTags.Tags?.find((t) => t.Key === "Team");
      if (teamTag) {
        return yield* Effect.fail(
          new Error("Team tag should have been removed"),
        );
      }

      // Remove remaining tags
      yield* untagResource({
        ResourceArn: topicArn,
        TagKeys: ["Environment", "Project"],
      });

      // Verify all tags removed
      const finalTags = yield* listTagsForResource({ ResourceArn: topicArn });
      if (finalTags.Tags && finalTags.Tags.length > 0) {
        return yield* Effect.fail(
          new Error(`Expected 0 tags, got ${finalTags.Tags?.length}`),
        );
      }
    }),
  ),
);

// ============================================================================
// Subscription Tests
// ============================================================================

test(
  "subscribe, list subscriptions, and unsubscribe",
  withTopic("itty-sns-subscription", (topicArn) =>
    Effect.gen(function* () {
      // Create a subscription using HTTP endpoint - unlike email, this doesn't require confirmation
      const subscribeResult = yield* subscribe({
        TopicArn: topicArn,
        Protocol: "https",
        Endpoint: "https://example.com/sns-endpoint",
        ReturnSubscriptionArn: true,
      });

      // In real AWS with HTTP, we get "pending confirmation" until endpoint confirms
      const subscriptionArn = subscribeResult.SubscriptionArn;

      if (!subscriptionArn) {
        return yield* Effect.fail(
          new Error("Expected SubscriptionArn to be returned"),
        );
      }

      // List subscriptions by topic
      const topicSubs = yield* listSubscriptionsByTopic({ TopicArn: topicArn });
      if (!topicSubs.Subscriptions || topicSubs.Subscriptions.length === 0) {
        return yield* Effect.fail(
          new Error("Expected at least one subscription"),
        );
      }

      // Verify our subscription is in the list
      const foundSub = topicSubs.Subscriptions?.find(
        (s) => s.Endpoint === "https://example.com/sns-endpoint",
      );
      if (!foundSub) {
        return yield* Effect.fail(
          new Error("Subscription not found in topic subscriptions"),
        );
      }

      // listSubscriptions is paginated and eventually consistent - just verify topic-level list works
      // Skip global listSubscriptions check as it may not include new subscriptions immediately

      // Cleanup: only unsubscribe if we have a confirmed subscription (not pending)
      // In real AWS, HTTP subscriptions are pending until the endpoint confirms
      // We don't try to unsubscribe pending subscriptions as that will error
    }),
  ),
);

test(
  "subscription attributes: get and set",
  withTopic("itty-sns-sub-attributes", (topicArn) =>
    Effect.gen(function* () {
      // Create a subscription with HTTPS endpoint
      // Note: In real AWS, HTTPS subscriptions require confirmation so will be pending
      const subscribeResult = yield* subscribe({
        TopicArn: topicArn,
        Protocol: "https",
        Endpoint: "https://example.com/sns-attrs-test",
        ReturnSubscriptionArn: true,
      });

      const subscriptionArn = subscribeResult.SubscriptionArn;
      if (
        !subscriptionArn ||
        subscriptionArn.includes("pending") ||
        subscriptionArn === "pending confirmation"
      ) {
        // Skip attribute tests if subscription is pending (expected in live AWS for HTTPS)
        // We can still verify the subscription was created
        const topicSubs = yield* listSubscriptionsByTopic({
          TopicArn: topicArn,
        });
        const foundSub = topicSubs.Subscriptions?.find(
          (s) => s.Endpoint === "https://example.com/sns-attrs-test",
        );
        if (!foundSub) {
          return yield* Effect.fail(
            new Error("Subscription not found in topic subscriptions"),
          );
        }
        // Test passes - subscription created, just can't test attributes without confirmation
        return;
      }

      // Get subscription attributes (only reached in LocalStack or with confirmed subscriptions)
      const attributes = yield* getSubscriptionAttributes({
        SubscriptionArn: subscriptionArn,
      });

      if (!attributes.Attributes) {
        return yield* Effect.fail(
          new Error("Expected Attributes to be present"),
        );
      }

      // Set RawMessageDelivery attribute (only works on confirmed HTTP/HTTPS/SQS/Lambda)
      yield* setSubscriptionAttributes({
        SubscriptionArn: subscriptionArn,
        AttributeName: "RawMessageDelivery",
        AttributeValue: "true",
      });

      // Verify the attribute was set
      const updatedAttributes = yield* getSubscriptionAttributes({
        SubscriptionArn: subscriptionArn,
      });

      if (updatedAttributes.Attributes?.RawMessageDelivery !== "true") {
        return yield* Effect.fail(
          new Error(
            `Expected RawMessageDelivery=true, got ${updatedAttributes.Attributes?.RawMessageDelivery}`,
          ),
        );
      }

      // Cleanup - ignore errors since pending subscriptions can't be unsubscribed
      yield* unsubscribe({ SubscriptionArn: subscriptionArn }).pipe(
        Effect.ignore,
      );
    }),
  ),
);

// ============================================================================
// Publishing Tests
// ============================================================================

test(
  "publish message to topic",
  withTopic("itty-sns-publish", (topicArn) =>
    Effect.gen(function* () {
      // Publish a simple message
      const result = yield* publish({
        TopicArn: topicArn,
        Message: "Hello from itty-aws!",
        Subject: "Test Subject",
      });

      if (!result.MessageId) {
        return yield* Effect.fail(
          new Error("Expected MessageId to be returned"),
        );
      }
    }),
  ),
);

test(
  "publish message with message attributes",
  withTopic("itty-sns-publish-attributes", (topicArn) =>
    Effect.gen(function* () {
      // Publish a message with attributes
      const result = yield* publish({
        TopicArn: topicArn,
        Message: "Message with attributes",
        MessageAttributes: {
          "custom-attribute": {
            DataType: "String",
            StringValue: "custom-value",
          },
          "number-attribute": {
            DataType: "Number",
            StringValue: "42",
          },
        },
      });

      if (!result.MessageId) {
        return yield* Effect.fail(
          new Error("Expected MessageId to be returned"),
        );
      }
    }),
  ),
);

test(
  "publish batch messages",
  withTopic("itty-sns-publish-batch", (topicArn) =>
    Effect.gen(function* () {
      // Publish multiple messages in a batch
      const result = yield* publishBatch({
        TopicArn: topicArn,
        PublishBatchRequestEntries: [
          { Id: "msg-1", Message: "First batch message" },
          { Id: "msg-2", Message: "Second batch message" },
          { Id: "msg-3", Message: "Third batch message" },
        ],
      });

      // Check for successful entries
      if (!result.Successful || result.Successful.length !== 3) {
        return yield* Effect.fail(
          new Error(
            `Expected 3 successful messages, got ${result.Successful?.length}`,
          ),
        );
      }

      // Verify each message has a MessageId
      for (const entry of result.Successful) {
        if (!entry.MessageId) {
          return yield* Effect.fail(
            new Error(`Message ${entry.Id} missing MessageId`),
          );
        }
      }

      // Should have no failed entries
      if (result.Failed && result.Failed.length > 0) {
        return yield* Effect.fail(
          new Error(`Expected no failures, got ${result.Failed.length}`),
        );
      }
    }),
  ),
);

test(
  "publish structured message (JSON)",
  withTopic("itty-sns-publish-structured", (topicArn) =>
    Effect.gen(function* () {
      // Publish a structured message for different protocols
      const messageStructure = JSON.stringify({
        default: "Default message for all protocols",
        email: "Message specifically for email subscribers",
        sqs: "Message specifically for SQS subscribers",
      });

      const result = yield* publish({
        TopicArn: topicArn,
        Message: messageStructure,
        MessageStructure: "json",
      });

      if (!result.MessageId) {
        return yield* Effect.fail(
          new Error("Expected MessageId to be returned"),
        );
      }
    }),
  ),
);

// ============================================================================
// Permission Tests
// ============================================================================

test(
  "topic permissions: add and remove",
  withTopic("itty-sns-permissions", (topicArn) =>
    Effect.gen(function* () {
      // Extract account ID from the topic ARN (format: arn:aws:sns:region:account-id:topic-name)
      const arnParts = topicArn.split(":");
      const accountId = arnParts[4]; // Account ID is the 5th element

      // Add permission using the actual account ID from the topic ARN
      yield* addPermission({
        TopicArn: topicArn,
        Label: "TestPermission",
        AWSAccountId: [accountId],
        ActionName: ["Publish", "Subscribe"],
      });

      // Verify permission was added by checking topic attributes
      const attributes = yield* getTopicAttributes({ TopicArn: topicArn });
      const policy = attributes.Attributes?.Policy;
      if (!policy) {
        return yield* Effect.fail(new Error("Expected Policy to be present"));
      }

      const parsedPolicy = JSON.parse(policy);
      const statement = parsedPolicy.Statement?.find(
        (s: { Sid?: string }) => s.Sid === "TestPermission",
      );
      if (!statement) {
        return yield* Effect.fail(
          new Error("TestPermission statement not found in policy"),
        );
      }

      // Remove permission
      yield* removePermission({
        TopicArn: topicArn,
        Label: "TestPermission",
      });

      // Verify permission was removed
      const updatedAttributes = yield* getTopicAttributes({
        TopicArn: topicArn,
      });
      const updatedPolicy = updatedAttributes.Attributes?.Policy;
      if (updatedPolicy) {
        const parsedUpdatedPolicy = JSON.parse(updatedPolicy);
        const removedStatement = parsedUpdatedPolicy.Statement?.find(
          (s: { Sid?: string }) => s.Sid === "TestPermission",
        );
        if (removedStatement) {
          return yield* Effect.fail(
            new Error("TestPermission statement should have been removed"),
          );
        }
      }
    }),
  ),
);

// ============================================================================
// Lambda Event Source Tests
// ============================================================================

test(
  "subscribe Lambda function to SNS topic (event source)",
  withTopic("itty-sns-lambda-source", (topicArn) =>
    Effect.gen(function* () {
      // Extract account ID and region from the topic ARN
      const arnParts = topicArn.split(":");
      const region = arnParts[3];
      const accountId = arnParts[4];

      // Use an ARN that matches our account (will still be pending without Lambda permissions)
      const lambdaArn = `arn:aws:lambda:${region}:${accountId}:function:itty-sns-test-lambda`;

      // Subscribe the Lambda function to the SNS topic
      const subscribeResult = yield* subscribe({
        TopicArn: topicArn,
        Protocol: "lambda",
        Endpoint: lambdaArn,
        ReturnSubscriptionArn: true,
      });

      if (!subscribeResult.SubscriptionArn) {
        return yield* Effect.fail(
          new Error("Expected SubscriptionArn to be returned"),
        );
      }

      const subscriptionArn = subscribeResult.SubscriptionArn;

      // Verify subscription was created (it may be pending confirmation)
      const subs = yield* listSubscriptionsByTopic({ TopicArn: topicArn });
      const lambdaSub = subs.Subscriptions?.find(
        (s) => s.Protocol === "lambda" && s.Endpoint === lambdaArn,
      );

      if (!lambdaSub) {
        return yield* Effect.fail(
          new Error("Lambda subscription not found in topic subscriptions"),
        );
      }

      // Publish a message to the topic (would trigger Lambda if subscription was confirmed)
      const publishResult = yield* publish({
        TopicArn: topicArn,
        Message: JSON.stringify({ action: "test", data: "Hello Lambda!" }),
        MessageAttributes: {
          eventType: {
            DataType: "String",
            StringValue: "test-event",
          },
        },
      });

      if (!publishResult.MessageId) {
        return yield* Effect.fail(new Error("Expected MessageId from publish"));
      }

      // Cleanup: only unsubscribe if confirmed (not pending)
      // In real AWS without actual Lambda permissions, subscriptions will be pending
      if (
        subscriptionArn &&
        !subscriptionArn.includes("pending") &&
        subscriptionArn !== "pending confirmation"
      ) {
        yield* unsubscribe({ SubscriptionArn: subscriptionArn }).pipe(
          Effect.ignore, // Ignore errors in cleanup - pending subscriptions can't be unsubscribed
        );
      }
      // Note: Pending subscriptions will be cleaned up when the topic is deleted
    }),
  ),
);

test(
  "subscribe SQS queue to SNS topic (fanout pattern)",
  withTopic("itty-sns-sqs-fanout", (topicArn) =>
    Effect.gen(function* () {
      // Extract account ID and region from the topic ARN
      const arnParts = topicArn.split(":");
      const region = arnParts[3];
      const accountId = arnParts[4];

      // Use an ARN that matches our account
      const sqsArn = `arn:aws:sqs:${region}:${accountId}:itty-sns-test-queue`;

      // Subscribe the SQS queue to the SNS topic
      // Note: In real AWS without proper permissions, subscription will be pending
      const subscribeResult = yield* subscribe({
        TopicArn: topicArn,
        Protocol: "sqs",
        Endpoint: sqsArn,
        ReturnSubscriptionArn: true,
        // Common attributes for SQS subscriptions
        Attributes: {
          RawMessageDelivery: "true",
        },
      });

      if (!subscribeResult.SubscriptionArn) {
        return yield* Effect.fail(
          new Error("Expected SubscriptionArn to be returned"),
        );
      }

      const subscriptionArn = subscribeResult.SubscriptionArn;

      // Verify subscription was created (it may be pending confirmation)
      const subs = yield* listSubscriptionsByTopic({ TopicArn: topicArn });
      const sqsSub = subs.Subscriptions?.find(
        (s) => s.Protocol === "sqs" && s.Endpoint === sqsArn,
      );

      if (!sqsSub) {
        return yield* Effect.fail(
          new Error("SQS subscription not found in topic subscriptions"),
        );
      }

      // If we got a valid subscription ARN (not pending), check attributes
      if (
        subscriptionArn &&
        !subscriptionArn.includes("pending") &&
        subscriptionArn !== "pending confirmation"
      ) {
        const attrs = yield* getSubscriptionAttributes({
          SubscriptionArn: subscriptionArn,
        });

        // RawMessageDelivery should be set
        if (attrs.Attributes?.RawMessageDelivery !== "true") {
          return yield* Effect.fail(
            new Error(
              `Expected RawMessageDelivery=true, got ${attrs.Attributes?.RawMessageDelivery}`,
            ),
          );
        }

        // Cleanup - ignore errors since pending subscriptions can't be unsubscribed
        yield* unsubscribe({ SubscriptionArn: subscriptionArn }).pipe(
          Effect.ignore,
        );
      }
      // Note: Pending subscriptions will be cleaned up when the topic is deleted
    }),
  ),
);

// ============================================================================
// Multiple Operations Combined Test
// ============================================================================

test(
  "combined topic operations workflow",
  withTopic("itty-sns-combined", (topicArn) =>
    Effect.gen(function* () {
      // 1. Set topic attributes
      yield* setTopicAttributes({
        TopicArn: topicArn,
        AttributeName: "DisplayName",
        AttributeValue: "Combined Test Topic",
      });

      // 2. Add tags
      yield* tagResource({
        ResourceArn: topicArn,
        Tags: [
          { Key: "Environment", Value: "Integration" },
          { Key: "CostCenter", Value: "12345" },
        ],
      });

      // 3. Create a subscription using HTTPS (email requires confirmation in real AWS)
      const subscribeResult = yield* subscribe({
        TopicArn: topicArn,
        Protocol: "https",
        Endpoint: "https://example.com/sns-combined-test",
        ReturnSubscriptionArn: true,
      });

      // 4. Publish a message
      const publishResult = yield* publish({
        TopicArn: topicArn,
        Message: "Test message for combined workflow",
      });

      // 5. Verify all operations
      const [attributes, tags, subscriptions] = yield* Effect.all([
        getTopicAttributes({ TopicArn: topicArn }),
        listTagsForResource({ ResourceArn: topicArn }),
        listSubscriptionsByTopic({ TopicArn: topicArn }),
      ]);

      // Verify attributes
      if (attributes.Attributes?.DisplayName !== "Combined Test Topic") {
        return yield* Effect.fail(new Error("DisplayName not set correctly"));
      }

      // Verify tags
      if (tags.Tags?.length !== 2) {
        return yield* Effect.fail(
          new Error(`Expected 2 tags, got ${tags.Tags?.length}`),
        );
      }

      // Verify subscription exists (may be pending in real AWS)
      if (
        !subscriptions.Subscriptions ||
        subscriptions.Subscriptions.length === 0
      ) {
        return yield* Effect.fail(
          new Error("Expected at least one subscription"),
        );
      }

      // Verify publish result
      if (!publishResult.MessageId) {
        return yield* Effect.fail(
          new Error("Publish should have returned MessageId"),
        );
      }

      // Cleanup subscription if possible - ignore errors for pending subscriptions
      const subscriptionArn = subscribeResult.SubscriptionArn;
      if (
        subscriptionArn &&
        !subscriptionArn.includes("pending") &&
        subscriptionArn !== "pending confirmation"
      ) {
        yield* unsubscribe({ SubscriptionArn: subscriptionArn }).pipe(
          Effect.ignore,
        );
      }
      // Pending subscriptions will be cleaned up when the topic is deleted
    }),
  ),
);
