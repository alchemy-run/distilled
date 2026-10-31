/**
 * AWS telemetry traits (see `packages/dev/src/codegen/telemetry.ts`): span names
 * `<sdkId>.<Operation>`, `rpc.system.name` `aws-api`, the request id
 * headers, X-Ray propagation, and the per-service attributes of the OTel
 * AWS SDK, messaging and GenAI conventions (semconv v1.44), read from
 * input and output members by their Smithy names.
 *
 * Values come from the caller's input (bucket names, object keys, table
 * names, queue URLs) and can hold user data.
 */
import type {
  AttributeRule,
  OperationTrait,
  Scalar,
  TelemetryOptions,
  Transform,
} from "@distilled.cloud/dev/codegen/telemetry";

type Row = readonly [
  member: string,
  attribute: string,
  transform?: Transform,
  more?: {
    /** Dotted path into the member's value. */
    readonly field?: string;
    /** Only these operations (default: every operation with the member). */
    readonly ops?: ReadonlyArray<string>;
  },
];

/** Bedrock's chat operations (GenAI semantic conventions). */
const CHAT = ["Converse", "ConverseStream"];

const MEMBERS: Readonly<Record<string, ReadonlyArray<Row>>> = {
  S3: [
    ["Bucket", "aws.s3.bucket"],
    ["Key", "aws.s3.key"],
    ["CopySource", "aws.s3.copy_source"],
    ["UploadId", "aws.s3.upload_id"],
    ["PartNumber", "aws.s3.part_number"],
  ],
  DynamoDB: [
    ["TableName", "aws.dynamodb.table_names", "list"],
    ["TableName", "db.namespace"],
    ["RequestItems", "aws.dynamodb.table_names", "keys"],
    ["IndexName", "aws.dynamodb.index_name"],
    ["Limit", "aws.dynamodb.limit"],
    ["Select", "aws.dynamodb.select"],
    ["ConsistentRead", "aws.dynamodb.consistent_read"],
    ["ScanIndexForward", "aws.dynamodb.scan_forward"],
    ["ProjectionExpression", "aws.dynamodb.projection"],
    ["AttributesToGet", "aws.dynamodb.attributes_to_get"],
    ["Segment", "aws.dynamodb.segment"],
    ["TotalSegments", "aws.dynamodb.total_segments"],
    ["ExclusiveStartTableName", "aws.dynamodb.exclusive_start_table"],
  ],
  SQS: [
    ["QueueUrl", "aws.sqs.queue.url"],
    ["QueueUrl", "messaging.destination.name", "lastPathSegment"],
    ["Entries", "messaging.batch.message_count", "count"],
  ],
  SNS: [
    ["TopicArn", "aws.sns.topic.arn"],
    ["TopicArn", "messaging.destination.name", "arnResource"],
    ["TargetArn", "messaging.destination.name", "arnResource"],
    ["PublishBatchRequestEntries", "messaging.batch.message_count", "count"],
  ],
  Lambda: [["FunctionName", "faas.invoked_name"]],
  Kinesis: [
    ["StreamName", "aws.kinesis.stream_name"],
    ["StreamARN", "aws.kinesis.stream_name", "arnResource"],
  ],
  SFN: [
    ["stateMachineArn", "aws.step_functions.state_machine.arn"],
    ["activityArn", "aws.step_functions.activity.arn"],
  ],
  SecretsManager: [["SecretId", "aws.secretsmanager.secret.arn", "arn"]],
  BedrockRuntime: [
    ["modelId", "gen_ai.request.model", undefined, { ops: CHAT }],
    ["inferenceConfig", "gen_ai.request.max_tokens", undefined, { field: "maxTokens", ops: CHAT }],
    [
      "inferenceConfig",
      "gen_ai.request.temperature",
      undefined,
      { field: "temperature", ops: CHAT },
    ],
    ["inferenceConfig", "gen_ai.request.top_p", undefined, { field: "topP", ops: CHAT }],
    [
      "inferenceConfig",
      "gen_ai.request.stop_sequences",
      undefined,
      { field: "stopSequences", ops: CHAT },
    ],
    [
      "guardrailConfig",
      "aws.bedrock.guardrail.id",
      undefined,
      { field: "guardrailIdentifier", ops: CHAT },
    ],
  ],
  EventBridge: [["Entries", "messaging.batch.message_count", "count", { ops: ["PutEvents"] }]],
  CloudWatchEvents: [["Entries", "messaging.batch.message_count", "count", { ops: ["PutEvents"] }]],
};

/** Attributes read from the response when the call succeeds. */
const OUTPUT_MEMBERS: Readonly<Record<string, ReadonlyArray<Row>>> = {
  DynamoDB: [
    ["ConsumedCapacity", "aws.dynamodb.consumed_capacity", "jsonList"],
    ["Count", "aws.dynamodb.count"],
    ["ScannedCount", "aws.dynamodb.scanned_count"],
  ],
  SecretsManager: [["ARN", "aws.secretsmanager.secret.arn", "arn"]],
  // Single-message sends carry the id; batches get the count instead.
  SQS: [
    ["MessageId", "messaging.message.id", undefined, { ops: ["SendMessage"] }],
    ["Messages", "messaging.batch.message_count", "count", { ops: ["ReceiveMessage"] }],
  ],
  SNS: [["MessageId", "messaging.message.id", undefined, { ops: ["Publish"] }]],
  BedrockRuntime: [
    ["usage", "gen_ai.usage.input_tokens", undefined, { field: "inputTokens", ops: CHAT }],
    ["usage", "gen_ai.usage.output_tokens", undefined, { field: "outputTokens", ops: CHAT }],
    [
      "usage",
      "gen_ai.usage.cache_read.input_tokens",
      "nonZero",
      { field: "cacheReadInputTokens", ops: CHAT },
    ],
    [
      "usage",
      "gen_ai.usage.cache_write.input_tokens",
      "nonZero",
      { field: "cacheWriteInputTokens", ops: CHAT },
    ],
    ["stopReason", "gen_ai.response.finish_reasons", "list", { ops: CHAT }],
  ],
};

const rulesFor =
  (rows: ReadonlyArray<Row> | undefined) =>
  ({ member, name: op }: { readonly member: string; readonly name: string }) =>
    (rows ?? [])
      .filter(([m, , , more]) => m === member && (more?.ops === undefined || more.ops.includes(op)))
      .map(([, name, transform, more]): AttributeRule => ({
        name,
        ...(more?.field !== undefined ? { field: more.field } : {}),
        ...(transform !== undefined ? { transform } : {}),
      }));

const SERVICE_ATTRIBUTES: Readonly<Record<string, Readonly<Record<string, Scalar>>>> = {
  DynamoDB: { "db.system.name": "aws.dynamodb" },
  SQS: { "messaging.system": "aws_sqs" },
  SNS: { "messaging.system": "aws.sns" },
};

/**
 * Messaging operations (semconv messaging spans): `messaging.operation.*`,
 * span name `{operation} {destination}`, PRODUCER for sends, and where the
 * messages carry W3C trace context (the `traceparent` message attribute,
 * as `@opentelemetry/instrumentation-aws-sdk` writes it).
 */
const MESSAGING: Readonly<Record<string, Partial<OperationTrait> & { readonly op: string }>> = {
  SendMessage: {
    op: "send",
    inject: { format: "awsMessageAttributes", member: "MessageAttributes" },
  },
  SendMessageBatch: {
    op: "send",
    inject: { format: "awsMessageAttributes", list: "Entries", member: "MessageAttributes" },
  },
  Publish: {
    op: "send",
    inject: { format: "awsMessageAttributes", member: "MessageAttributes" },
  },
  PublishBatch: {
    op: "send",
    inject: {
      format: "awsMessageAttributes",
      list: "PublishBatchRequestEntries",
      member: "MessageAttributes",
    },
  },
  ReceiveMessage: {
    op: "receive",
    extract: {
      format: "awsMessageAttributes",
      list: "Messages",
      member: "MessageAttributes",
      request: "MessageAttributeNames",
      // SNS -> SQS without raw delivery, and X-Ray producers.
      envelope: "Body",
      system: "Attributes",
      systemRequest: "MessageSystemAttributeNames",
      messageId: "MessageId",
    },
  },
  DeleteMessage: { op: "settle" },
  DeleteMessageBatch: { op: "settle" },
};

/**
 * S3-compatible services reached through the S3 SDK, by host. Cloudflare R2
 * gets the attributes the Cloudflare SDK's R2 operations carry, so both
 * paths to one bucket line up.
 */
const S3_HOSTS: TelemetryOptions["hosts"] = [
  {
    suffix: ".r2.cloudflarestorage.com",
    hostLabel: "cloudflare.account_id",
    copy: { "aws.s3.bucket": "cloudflare.r2.bucket", "aws.s3.key": "cloudflare.r2.object_key" },
  },
];

const REQUEST_ID = "aws.request_id";

/** Options for one AWS model, keyed by its sdkId (`S3`, `Secrets Manager`). */
export const awsTelemetry = (sdkId: string): TelemetryOptions => {
  const service = sdkId.replaceAll(" ", "");
  return {
    // AWS services read and pass on X-Ray trace context.
    propagation: "xray",
    system: "aws-api",
    service,
    prefix: service,
    labelNamespace: false,
    attributes: SERVICE_ATTRIBUTES[service],
    responseHeaders: [
      { header: "x-amzn-requestid", name: REQUEST_ID },
      { header: "x-amz-request-id", name: REQUEST_ID },
      { header: "x-amzn-request-id", name: REQUEST_ID },
      { header: "x-amz-id-2", name: "aws.extended_request_id" },
      // S3-compatible services send their own request id (R2: cf-ray).
      ...(service === "S3"
        ? [{ header: "cf-ray", name: "http.response.header.cf-ray", transform: "list" as const }]
        : []),
    ],
    ...(service === "S3" ? { hosts: S3_HOSTS } : {}),
    operation: ({ name }): Partial<OperationTrait> | undefined => {
      if (service === "DynamoDB") return { attributes: { "db.operation.name": name } };
      if (service === "Lambda" && (name === "Invoke" || name === "InvokeWithResponseStream")) {
        return {
          attributes: { "faas.invoked_provider": "aws" },
          copy: { "cloud.region": "faas.invoked_region" },
          inject: { format: "lambdaClientContext", member: "ClientContext" },
        };
      }
      if (service === "BedrockRuntime" && CHAT.includes(name)) {
        // GenAI client spans: `{operation} {model}`.
        return {
          nameTemplate: "chat {gen_ai.request.model}",
          attributes: {
            "gen_ai.provider.name": "aws.bedrock",
            "gen_ai.operation.name": "chat",
            ...(name === "ConverseStream" ? { "gen_ai.request.stream": true } : {}),
          },
          // A GenAI span ends when the response is fully received.
          ...(name === "ConverseStream"
            ? { stream: { member: "stream", firstChunk: "gen_ai.response.time_to_first_chunk" } }
            : {}),
        };
      }
      if ((service === "EventBridge" || service === "CloudWatchEvents") && name === "PutEvents") {
        // No messaging conventions cover EventBridge: an AWS SDK span named
        // `EventBridge.PutEvents`, a producer, X-Ray context per entry.
        return {
          kind: "producer",
          attributes: { "messaging.operation.name": "send", "messaging.operation.type": "send" },
          inject: { format: "xrayTraceHeader", list: "Entries", member: "TraceHeader" },
        };
      }
      const messaging = service === "SQS" || service === "SNS" ? MESSAGING[name] : undefined;
      if (messaging === undefined) return undefined;
      const { op, ...trait } = messaging;
      return {
        ...trait,
        ...(op === "send" ? { kind: "producer" as const } : {}),
        nameTemplate: `${op} {messaging.destination.name}`,
        attributes: { "messaging.operation.name": op, "messaging.operation.type": op },
      };
    },
    member: rulesFor(MEMBERS[service]),
    outputMember: rulesFor(OUTPUT_MEMBERS[service]),
  };
};
