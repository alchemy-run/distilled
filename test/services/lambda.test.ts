import { expect } from "@effect/vitest";
import archiver from "archiver";
import { Effect, Schedule, Stream } from "effect";
import { createWriteStream, readFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { afterAll, beforeAll } from "vitest";
import {
  attachRolePolicy,
  createRole,
  deleteRole,
  detachRolePolicy,
} from "../../src/services/iam.ts";
import {
  createEventSourceMapping,
  createFunction,
  deleteEventSourceMapping,
  deleteFunction,
  getEventSourceMapping,
  getFunction,
  getFunctionConfiguration,
  invoke,
  listEventSourceMappings,
  listFunctions,
  listTags,
  tagResource,
  untagResource,
  updateFunctionConfiguration,
} from "../../src/services/lambda.ts";
import {
  createQueue,
  deleteQueue,
  getQueueAttributes,
  sendMessage,
} from "../../src/services/sqs.ts";
import { run, test } from "../test.ts";

const retrySchedule = Schedule.intersect(
  Schedule.recurs(10),
  Schedule.spaced("1 second"),
);

const TEST_FUNCTION_NAME = "itty-aws-test-function";
const TEST_ROLE_NAME = "itty-aws-test-lambda-role";

// Trust policy that allows Lambda to assume the role
const LAMBDA_TRUST_POLICY = JSON.stringify({
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Principal: {
        Service: "lambda.amazonaws.com",
      },
      Action: "sts:AssumeRole",
    },
  ],
});

// Role ARN will be set by beforeAll (or use fake for LocalStack)
let TEST_ROLE_ARN = "arn:aws:iam::000000000000:role/lambda-execution-role";

/**
 * Create a ZIP file from ./lambda-handler/index.js using archiver
 *
 * Example usage:
 *   const zipBuffer = await createHandlerZip();
 *   await createFunction({ Code: { ZipFile: zipBuffer }, ... });
 */
const createHandlerZip = async (): Promise<Uint8Array> => {
  const zipPath = join(tmpdir(), `lambda-handler-${Date.now()}.zip`);
  const handlerDir = join(import.meta.dirname, "lambda-handler");

  return new Promise((resolve, reject) => {
    const output = createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => {
      const buffer = readFileSync(zipPath);
      resolve(new Uint8Array(buffer));
    });

    archive.on("error", reject);
    archive.pipe(output);

    // Add the handler directory contents to the zip root
    archive.directory(handlerDir, false);
    archive.finalize();
  });
};

// Cached zip file to avoid recreating for each test
let cachedZipFile: Uint8Array | null = null;

const getZipFile = async (): Promise<Uint8Array> => {
  if (!cachedZipFile) {
    cachedZipFile = await createHandlerZip();
  }
  return cachedZipFile;
};

// Helper to wait for function to be in Active state (or undefined state in LocalStack)
const waitForFunctionActive = (functionName: string) =>
  getFunctionConfiguration({ FunctionName: functionName }).pipe(
    Effect.flatMap((config) => {
      // LocalStack may not return State, or it may be undefined
      // AWS returns "Active" or "Pending" - we accept undefined (LocalStack) or "Active"
      const state = config.State;
      if (state === undefined || state === "Active") {
        return Effect.succeed(config);
      }
      if (state === "Pending" || state === "InProgress") {
        return Effect.fail(new Error(`Function state is ${state}`));
      }
      // For other states (like Failed), don't retry
      return Effect.succeed(config);
    }),
    Effect.retry(retrySchedule),
    Effect.mapError(() => new Error("Function did not become active")),
  );

// Create the IAM role and function before all tests
beforeAll(async () => {
  const zipFile = await getZipFile();

  await run(
    Effect.gen(function* () {
      // For real AWS (not LocalStack), create an actual IAM role
      if (!process.env.LOCAL) {
        // Delete existing role if it exists (cleanup from previous runs)
        // First detach policies, then delete the role
        yield* detachRolePolicy({
          RoleName: TEST_ROLE_NAME,
          PolicyArn:
            "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        }).pipe(Effect.ignore);
        yield* detachRolePolicy({
          RoleName: TEST_ROLE_NAME,
          PolicyArn:
            "arn:aws:iam::aws:policy/service-role/AWSLambdaSQSQueueExecutionRole",
        }).pipe(Effect.ignore);
        yield* deleteRole({ RoleName: TEST_ROLE_NAME }).pipe(Effect.ignore);

        // Create the role
        const result = yield* createRole({
          RoleName: TEST_ROLE_NAME,
          AssumeRolePolicyDocument: LAMBDA_TRUST_POLICY,
          Description: "Test role for itty-aws Lambda tests",
        });

        TEST_ROLE_ARN = result.Role?.Arn ?? "";

        // Attach policies for Lambda execution and SQS access
        yield* attachRolePolicy({
          RoleName: TEST_ROLE_NAME,
          PolicyArn:
            "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        });
        yield* attachRolePolicy({
          RoleName: TEST_ROLE_NAME,
          PolicyArn:
            "arn:aws:iam::aws:policy/service-role/AWSLambdaSQSQueueExecutionRole",
        });

        // Wait for IAM to propagate (AWS eventually consistent)
        yield* Effect.sleep("5 seconds");
      }

      // Delete existing function if it exists (cleanup from previous runs)
      yield* deleteFunction({
        FunctionName: TEST_FUNCTION_NAME,
      }).pipe(Effect.ignore);

      // Create the test function with retry for IAM propagation
      yield* createFunction({
        FunctionName: TEST_FUNCTION_NAME,
        Runtime: "nodejs18.x",
        Role: TEST_ROLE_ARN,
        Handler: "index.handler",
        Code: { ZipFile: zipFile },
        Description: "Test function for itty-aws",
        Timeout: 30,
        MemorySize: 128,
      }).pipe(
        Effect.retry({
          while: (err) =>
            "_tag" in err && err._tag === "InvalidParameterValueException",
          schedule: Schedule.intersect(
            Schedule.recurs(10),
            Schedule.spaced("2 seconds"),
          ),
        }),
      );

      // Wait for the function to be in Active state
      yield* waitForFunctionActive(TEST_FUNCTION_NAME);
    }),
  );
}, 60_000);

// Delete the function and IAM role after all tests
afterAll(async () => {
  await run(
    Effect.gen(function* () {
      yield* deleteFunction({
        FunctionName: TEST_FUNCTION_NAME,
      }).pipe(Effect.ignore);

      // Delete the IAM role for real AWS
      if (!process.env.LOCAL) {
        // Detach policies before deleting the role
        yield* detachRolePolicy({
          RoleName: TEST_ROLE_NAME,
          PolicyArn:
            "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        }).pipe(Effect.ignore);
        yield* detachRolePolicy({
          RoleName: TEST_ROLE_NAME,
          PolicyArn:
            "arn:aws:iam::aws:policy/service-role/AWSLambdaSQSQueueExecutionRole",
        }).pipe(Effect.ignore);
        yield* deleteRole({ RoleName: TEST_ROLE_NAME }).pipe(Effect.ignore);
      }
    }),
  );
});

// ============================================================================
// Function Management Tests
// ============================================================================

test(
  "getFunction returns function details",
  Effect.gen(function* () {
    const result = yield* getFunction({
      FunctionName: TEST_FUNCTION_NAME,
    });

    expect(result.Configuration).toBeDefined();
    expect(result.Configuration?.FunctionName).toEqual(TEST_FUNCTION_NAME);
    expect(result.Configuration?.Runtime).toEqual("nodejs18.x");
    expect(result.Configuration?.Handler).toEqual("index.handler");
  }),
);

test(
  "getFunctionConfiguration returns configuration",
  Effect.gen(function* () {
    const config = yield* getFunctionConfiguration({
      FunctionName: TEST_FUNCTION_NAME,
    });

    expect(config.FunctionName).toEqual(TEST_FUNCTION_NAME);
    expect(config.MemorySize).toEqual(128);
    expect(config.Timeout).toEqual(30);
  }),
);

test(
  "listFunctions includes our test function",
  Effect.gen(function* () {
    const result = yield* listFunctions({});

    expect(result.Functions).toBeDefined();

    const found = result.Functions?.find(
      (f) => f.FunctionName === TEST_FUNCTION_NAME,
    );
    expect(found).toBeDefined();
    expect(found?.FunctionName).toEqual(TEST_FUNCTION_NAME);
  }),
);

// ============================================================================
// Function Invocation Tests
// ============================================================================

test(
  "invoke function with RequestResponse",
  Effect.gen(function* () {
    yield* waitForFunctionActive(TEST_FUNCTION_NAME);

    const payload = JSON.stringify({ name: "World" });

    const result = yield* invoke({
      FunctionName: TEST_FUNCTION_NAME,
      InvocationType: "RequestResponse",
      Payload: new TextEncoder().encode(payload),
    }).pipe(Effect.retry(retrySchedule));

    expect(result.StatusCode).toEqual(200);
    expect(result.Payload).toBeDefined();

    // Read the response payload stream
    const responsePayload = yield* result.Payload!.pipe(
      Stream.decodeText(),
      Stream.mkString,
    );

    const parsed = JSON.parse(responsePayload);
    expect(parsed.statusCode).toEqual(200);

    const body = JSON.parse(parsed.body);
    expect(body.message).toEqual("Hello from Lambda!");
    expect(body.input.name).toEqual("World");
  }),
);

test(
  "invoke function with Event (async)",
  Effect.gen(function* () {
    yield* waitForFunctionActive(TEST_FUNCTION_NAME);

    const payload = JSON.stringify({ async: true });

    const result = yield* invoke({
      FunctionName: TEST_FUNCTION_NAME,
      InvocationType: "Event",
      Payload: new TextEncoder().encode(payload),
    }).pipe(Effect.retry(retrySchedule));

    // Event invocation returns 202 Accepted
    expect(result.StatusCode).toEqual(202);
  }),
);

test(
  "invoke function with DryRun",
  Effect.gen(function* () {
    yield* waitForFunctionActive(TEST_FUNCTION_NAME);

    const result = yield* invoke({
      FunctionName: TEST_FUNCTION_NAME,
      InvocationType: "DryRun",
    }).pipe(Effect.retry(retrySchedule));

    // DryRun returns 204 No Content
    expect(result.StatusCode).toEqual(204);
  }),
);

// ============================================================================
// Function Configuration Update Tests
// ============================================================================

test(
  "updateFunctionConfiguration changes settings",
  Effect.gen(function* () {
    yield* waitForFunctionActive(TEST_FUNCTION_NAME);

    // Update the function configuration (with retry for LocalStack timing)
    const updated = yield* updateFunctionConfiguration({
      FunctionName: TEST_FUNCTION_NAME,
      Description: "Updated description",
      Timeout: 60,
      MemorySize: 256,
    }).pipe(Effect.retry(retrySchedule));

    expect(updated.Description).toEqual("Updated description");
    expect(updated.Timeout).toEqual(60);
    expect(updated.MemorySize).toEqual(256);

    // Wait for update to take effect
    yield* waitForFunctionActive(TEST_FUNCTION_NAME);

    // Verify with getFunction
    const config = yield* getFunctionConfiguration({
      FunctionName: TEST_FUNCTION_NAME,
    });

    expect(config.MemorySize).toEqual(256);

    // Reset back to original values
    yield* updateFunctionConfiguration({
      FunctionName: TEST_FUNCTION_NAME,
      Description: "Test function for itty-aws",
      Timeout: 30,
      MemorySize: 128,
    }).pipe(Effect.retry(retrySchedule));

    yield* waitForFunctionActive(TEST_FUNCTION_NAME);
  }),
);

// ============================================================================
// Tagging Tests
// ============================================================================

test(
  "tag and untag function",
  Effect.gen(function* () {
    const funcInfo = yield* getFunction({
      FunctionName: TEST_FUNCTION_NAME,
    });

    const functionArn = funcInfo.Configuration?.FunctionArn;
    expect(functionArn).toBeDefined();

    // Tag the function
    yield* tagResource({
      Resource: functionArn!,
      Tags: {
        Environment: "test",
        Project: "itty-aws",
        Team: "Platform",
      },
    });

    // List tags
    const tags = yield* listTags({
      Resource: functionArn!,
    });

    expect(tags.Tags).toBeDefined();
    expect(tags.Tags?.["Environment"]).toEqual("test");
    expect(tags.Tags?.["Project"]).toEqual("itty-aws");
    expect(tags.Tags?.["Team"]).toEqual("Platform");

    // Remove one tag
    yield* untagResource({
      Resource: functionArn!,
      TagKeys: ["Team"],
    });

    // Verify tag was removed
    const updatedTags = yield* listTags({
      Resource: functionArn!,
    });

    expect(updatedTags.Tags?.["Team"]).toBeUndefined();
    expect(updatedTags.Tags?.["Environment"]).toEqual("test");
    expect(updatedTags.Tags?.["Project"]).toEqual("itty-aws");

    // Clean up remaining tags
    yield* untagResource({
      Resource: functionArn!,
      TagKeys: ["Environment", "Project"],
    });
  }),
);

// ============================================================================
// Create and Delete Function Test
// ============================================================================

test(
  "create and delete a function",
  Effect.gen(function* () {
    const tempFunctionName = "itty-aws-temp-function";
    const zipFile = yield* Effect.promise(() => getZipFile());

    // Create a temporary function
    const created = yield* createFunction({
      FunctionName: tempFunctionName,
      Runtime: "nodejs18.x",
      Role: TEST_ROLE_ARN,
      Handler: "index.handler",
      Code: { ZipFile: zipFile },
      Description: "Temporary function",
    });

    expect(created.FunctionName).toEqual(tempFunctionName);

    // Verify it exists
    const getResult = yield* getFunction({
      FunctionName: tempFunctionName,
    });

    expect(getResult.Configuration?.FunctionName).toEqual(tempFunctionName);

    // Delete the function
    yield* deleteFunction({
      FunctionName: tempFunctionName,
    });

    // Verify it's gone
    const exists = yield* getFunction({
      FunctionName: tempFunctionName,
    }).pipe(
      Effect.map(() => true),
      Effect.catchAll(() => Effect.succeed(false)),
    );

    expect(exists).toEqual(false);
  }),
);

// ============================================================================
// Event Source Mapping Tests (SQS -> Lambda)
// ============================================================================

test(
  "create, get, list, and delete SQS event source mapping",
  Effect.gen(function* () {
    const queueName = "itty-lambda-event-source-queue";

    // Clean up any existing event source mappings from previous runs
    const existingMappings = yield* listEventSourceMappings({
      FunctionName: TEST_FUNCTION_NAME,
    }).pipe(Effect.catchTag("ResourceNotFoundException", () => Effect.void));
    for (const m of existingMappings?.EventSourceMappings ?? []) {
      if (m.UUID) {
        yield* deleteEventSourceMapping({ UUID: m.UUID }).pipe(
          Effect.retry({
            while: (err) =>
              "_tag" in err && err._tag === "ResourceInUseException",
            schedule: Schedule.intersect(
              Schedule.recurs(10),
              Schedule.spaced("2 seconds"),
            ),
          }),
          Effect.ignore,
        );
      }
    }

    // Wait for mappings to be fully deleted
    if ((existingMappings?.EventSourceMappings?.length ?? 0) > 0) {
      yield* Effect.sleep("5 seconds");
    }

    // Delete existing queue if it exists
    yield* deleteQueue({
      QueueUrl: `https://sqs.us-east-1.amazonaws.com/${process.env.AWS_ACCOUNT_ID ?? "000000000000"}/${queueName}`,
    }).pipe(Effect.ignore);

    // Create an SQS queue
    const queueResult = yield* createQueue({ QueueName: queueName });
    const queueUrl = queueResult.QueueUrl!;

    try {
      // Get the queue ARN
      const queueAttrs = yield* getQueueAttributes({
        QueueUrl: queueUrl,
        AttributeNames: ["QueueArn"],
      });
      const queueArn = queueAttrs.Attributes?.QueueArn;
      expect(queueArn).toBeDefined();

      // Create event source mapping with retry for IAM propagation
      const mapping = yield* createEventSourceMapping({
        FunctionName: TEST_FUNCTION_NAME,
        EventSourceArn: queueArn!,
        BatchSize: 10,
        Enabled: true,
      }).pipe(
        Effect.retry({
          while: (err) =>
            "_tag" in err && err._tag === "InvalidParameterValueException",
          schedule: Schedule.intersect(
            Schedule.recurs(5),
            Schedule.spaced("2 seconds"),
          ),
        }),
      );

      expect(mapping.UUID).toBeDefined();
      expect(mapping.EventSourceArn).toEqual(queueArn);
      expect(mapping.FunctionArn).toContain(TEST_FUNCTION_NAME);
      expect(mapping.BatchSize).toEqual(10);

      const mappingUuid = mapping.UUID!;

      try {
        // Get the event source mapping
        const getResult = yield* getEventSourceMapping({
          UUID: mappingUuid,
        });

        expect(getResult.UUID).toEqual(mappingUuid);
        expect(getResult.EventSourceArn).toEqual(queueArn);

        // List event source mappings for the function
        const listResult = yield* listEventSourceMappings({
          FunctionName: TEST_FUNCTION_NAME,
        });

        expect(listResult.EventSourceMappings).toBeDefined();
        const found = listResult.EventSourceMappings?.find(
          (m) => m.UUID === mappingUuid,
        );
        expect(found).toBeDefined();
      } finally {
        // Delete the event source mapping with retry for ResourceInUseException
        yield* deleteEventSourceMapping({
          UUID: mappingUuid,
        }).pipe(
          Effect.retry({
            while: (err) =>
              "_tag" in err && err._tag === "ResourceInUseException",
            schedule: Schedule.intersect(
              Schedule.recurs(10),
              Schedule.spaced("2 seconds"),
            ),
          }),
        );
      }

      // Verify it's deleted (poll until it's gone)
      yield* Effect.gen(function* () {
        const stillExists = yield* getEventSourceMapping({
          UUID: mappingUuid,
        }).pipe(
          Effect.map(() => true),
          Effect.catchAll(() => Effect.succeed(false)),
        );
        if (stillExists) {
          return yield* Effect.fail("still exists" as const);
        }
      }).pipe(
        Effect.retry({
          while: (err) => err === "still exists",
          schedule: Schedule.intersect(
            Schedule.recurs(10),
            Schedule.spaced("2 seconds"),
          ),
        }),
      );
    } finally {
      // Clean up the queue
      yield* deleteQueue({ QueueUrl: queueUrl }).pipe(Effect.ignore);
    }
  }),
);

test(
  "send message to SQS queue with Lambda event source",
  Effect.gen(function* () {
    const queueName = "itty-lambda-trigger-queue";

    // Delete existing queue if it exists
    yield* deleteQueue({
      QueueUrl: `https://sqs.us-east-1.amazonaws.com/${process.env.AWS_ACCOUNT_ID ?? "000000000000"}/${queueName}`,
    }).pipe(Effect.ignore);

    // Create an SQS queue (with retry for QueueDeletedRecently)
    const queueResult = yield* createQueue({ QueueName: queueName }).pipe(
      Effect.retry({
        while: (err) => "_tag" in err && err._tag === "QueueDeletedRecently",
        schedule: Schedule.intersect(
          Schedule.recurs(30),
          Schedule.spaced("2 seconds"),
        ),
      }),
    );
    const queueUrl = queueResult.QueueUrl!;

    try {
      // Get the queue ARN
      const queueAttrs = yield* getQueueAttributes({
        QueueUrl: queueUrl,
        AttributeNames: ["QueueArn"],
      });
      const queueArn = queueAttrs.Attributes?.QueueArn;

      // Create event source mapping with retry for IAM propagation and conflict resolution
      const mapping = yield* createEventSourceMapping({
        FunctionName: TEST_FUNCTION_NAME,
        EventSourceArn: queueArn!,
        BatchSize: 1,
        Enabled: true,
      }).pipe(
        Effect.retry({
          while: (err) =>
            "_tag" in err &&
            (err._tag === "InvalidParameterValueException" ||
              err._tag === "ResourceConflictException" ||
              err._tag === "ResourceInUseException"),
          schedule: Schedule.intersect(
            Schedule.recurs(10),
            Schedule.spaced("3 seconds"),
          ),
        }),
      );

      const mappingUuid = mapping.UUID!;

      try {
        // Send a message to the queue
        const sendResult = yield* sendMessage({
          QueueUrl: queueUrl,
          MessageBody: JSON.stringify({ test: "event-source-trigger" }),
        });

        expect(sendResult.MessageId).toBeDefined();

        // Note: In a real test we would verify the Lambda was invoked,
        // but that requires checking Lambda logs or having the function
        // write to an external store. For now, we just verify the
        // event source mapping is set up correctly.

        // Give LocalStack a moment to process
        yield* Effect.sleep("1 second");
      } finally {
        // Delete the event source mapping with retry for ResourceInUseException
        yield* deleteEventSourceMapping({
          UUID: mappingUuid,
        }).pipe(
          Effect.retry({
            while: (err) =>
              "_tag" in err && err._tag === "ResourceInUseException",
            schedule: Schedule.intersect(
              Schedule.recurs(10),
              Schedule.spaced("2 seconds"),
            ),
          }),
        );
      }
    } finally {
      // Clean up the queue
      yield* deleteQueue({ QueueUrl: queueUrl }).pipe(Effect.ignore);
    }
  }),
);
