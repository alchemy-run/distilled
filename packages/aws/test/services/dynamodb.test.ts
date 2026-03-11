import { expect } from "@effect/vitest";
import { Console, Effect, Schedule, Stream } from "effect";
import {
  createTable,
  deleteItem,
  deleteTable,
  describeTable,
  getItem,
  listTagsOfResource,
  listTables,
  putItem,
  query,
  scan,
  tagResource,
  updateItem,
} from "../../src/services/dynamodb.ts";
import { afterAll, beforeAll, test, testRunId } from "../test.ts";

const TEST_TABLE_NAME = `distilled-aws-test-table-${testRunId}`;
type CreateTableInput = Parameters<typeof createTable>[0];
type ManagedTable = {
  TableName: string;
  TableArn: string;
};

const retrySchedule = Schedule.both(
  Schedule.recurs(30),
  Schedule.spaced("1 second"),
);
const eventualRetrySchedule = Schedule.exponential(250).pipe(
  Schedule.both(Schedule.recurs(20)),
);

// Helper to wait for table to become active
const waitForTableActive = (tableName: string) =>
  describeTable({ TableName: tableName }).pipe(
    Effect.flatMap((result) =>
      result.Table?.TableStatus === "ACTIVE"
        ? Effect.succeed(result)
        : Effect.fail(
            new Error(`Table status is ${result.Table?.TableStatus}`),
          ),
    ),
    Effect.retry(retrySchedule),
    Effect.mapError(() => new Error("Table did not become active")),
  );

// Helper to wait for table to be deleted
const waitForTableDeleted = (tableName: string) =>
  describeTable({ TableName: tableName }).pipe(
    Effect.flatMap(() => Effect.fail(new Error("Table still exists"))),
    Effect.catch((error) =>
      error instanceof Error && error.message === "Table still exists"
        ? Effect.fail(error)
        : Effect.void,
    ),
    Effect.retry(retrySchedule),
    Effect.mapError(() => new Error("Table was not deleted")),
  );

const cleanupTable = (tableName: string) =>
  deleteTable({ TableName: tableName }).pipe(
    Effect.ignore,
    Effect.andThen(waitForTableDeleted(tableName)),
  );

const getTableArn = (tableName: string) =>
  describeTable({ TableName: tableName }).pipe(
    Effect.flatMap((result) =>
      result.Table?.TableArn
        ? Effect.succeed(result.Table.TableArn)
        : Effect.fail(new Error("Table ARN not available yet")),
    ),
    Effect.retry(retrySchedule),
    Effect.mapError(() => new Error(`Table ARN not available for ${tableName}`)),
  );

const withTable = <A, E, R>(
  input: CreateTableInput,
  testFn: (table: ManagedTable) => Effect.Effect<A, E, R>,
) =>
  Effect.gen(function* () {
    yield* cleanupTable(input.TableName);
    yield* createTable(input);
    yield* waitForTableActive(input.TableName);

    const tableArn = yield* getTableArn(input.TableName);
    return yield* testFn({
      TableName: input.TableName,
      TableArn: tableArn,
    }).pipe(Effect.ensuring(cleanupTable(input.TableName).pipe(Effect.ignore)));
  });

// Create the table before all tests
beforeAll(
  Effect.gen(function* () {
    // Delete existing table if it exists (cleanup from previous runs)
    yield* deleteTable({ TableName: TEST_TABLE_NAME }).pipe(Effect.ignore);
    yield* waitForTableDeleted(TEST_TABLE_NAME);

    // Create table with simple key schema
    yield* createTable({
      TableName: TEST_TABLE_NAME,
      KeySchema: [
        { AttributeName: "pk", KeyType: "HASH" },
        { AttributeName: "sk", KeyType: "RANGE" },
      ],
      AttributeDefinitions: [
        { AttributeName: "pk", AttributeType: "S" },
        { AttributeName: "sk", AttributeType: "S" },
      ],
      BillingMode: "PAY_PER_REQUEST",
    });

    // Wait for table to become active
    yield* waitForTableActive(TEST_TABLE_NAME);
  }),
);

// Delete the table after all tests
afterAll(
  Effect.gen(function* () {
    yield* deleteTable({ TableName: TEST_TABLE_NAME }).pipe(Effect.ignore);
    yield* Console.log(`Deleted table ${TEST_TABLE_NAME}`);
  }),
);

// ============================================================================
// Table Management Tests
// ============================================================================

test(
  "create table, describe table, list tables, and delete table",
  Effect.gen(function* () {
    const tableName = TEST_TABLE_NAME;

    // Describe table
    const describeResult = yield* describeTable({ TableName: tableName });

    expect(describeResult.Table?.TableName).toEqual(tableName);
    expect(describeResult.Table?.TableStatus).toEqual("ACTIVE");

    // Verify key schema
    const keySchema = describeResult.Table?.KeySchema;
    expect(keySchema).toBeDefined();
    expect(keySchema!.length).toEqual(2);

    const hashKey = keySchema!.find((k) => k.KeyType === "HASH");
    expect(hashKey?.AttributeName).toEqual("pk");

    // List tables and verify our table is in the list
    const listResult = yield* listTables({});
    const foundTable = listResult.TableNames?.find((t) => t === tableName);
    expect(foundTable).toBeDefined();
  }),
);

// ============================================================================
// Item CRUD Tests
// ============================================================================

test(
  "putItem and getItem",
  Effect.gen(function* () {
    const tableName = TEST_TABLE_NAME;

    // DynamoDB uses AttributeValue tagged union - { S: string }, { N: string }, { BOOL: boolean }, etc.
    const item = {
      pk: { S: "user#123" },
      sk: { S: "profile" },
      name: { S: "John Doe" },
      email: { S: "john@example.com" },
      age: { N: "30" }, // Numbers are sent as strings in DynamoDB
      active: { BOOL: true },
    };

    // Put item
    yield* putItem({
      TableName: tableName,
      Item: item,
    });

    // Get item
    const getResult = yield* getItem({
      TableName: tableName,
      Key: {
        pk: { S: "user#123" },
        sk: { S: "profile" },
      },
    });

    expect(getResult.Item).toBeDefined();

    // Verify item attributes - DynamoDB returns AttributeValue tagged union
    const resultPk = getResult.Item!.pk as { S: string };
    const resultSk = getResult.Item!.sk as { S: string };
    const resultName = getResult.Item!.name as { S: string };
    const resultEmail = getResult.Item!.email as { S: string };

    expect(resultPk.S).toEqual("user#123");
    expect(resultSk.S).toEqual("profile");
    expect(resultName.S).toEqual("John Doe");
    expect(resultEmail.S).toEqual("john@example.com");
  }),
);

test(
  "putItem with condition expression",
  Effect.gen(function* () {
    const tableName = TEST_TABLE_NAME;

    const item = {
      pk: { S: "user#456" },
      sk: { S: "profile" },
      name: { S: "Jane Doe" },
      version: { N: "1" },
    };

    // Put item
    yield* putItem({
      TableName: tableName,
      Item: item,
    });

    // Try to put with condition that item doesn't exist (should fail)
    const conditionalPutResult = yield* putItem({
      TableName: tableName,
      Item: {
        ...item,
        version: { N: "2" },
      },
      ConditionExpression: "attribute_not_exists(pk)",
    }).pipe(
      Effect.map(() => "success" as const),
      Effect.catch(() => Effect.succeed("error" as const)),
    );

    expect(conditionalPutResult).toEqual("error");

    // Conditional put with correct condition should succeed
    yield* putItem({
      TableName: tableName,
      Item: { ...item, version: { N: "2" } },
      ConditionExpression: "attribute_exists(pk)",
    });

    // Verify update
    const getResult = yield* getItem({
      TableName: tableName,
      Key: { pk: { S: "user#456" }, sk: { S: "profile" } },
    });

    const version = getResult.Item?.version as { N: string } | undefined;
    expect(version?.N).toEqual("2");
  }),
);

test(
  "updateItem",
  Effect.gen(function* () {
    const tableName = TEST_TABLE_NAME;

    const item = {
      pk: { S: "user#789" },
      sk: { S: "profile" },
      name: { S: "Bob Smith" },
      count: { N: "0" },
    };

    // Put initial item
    yield* putItem({
      TableName: tableName,
      Item: item,
    });

    // Update item
    yield* updateItem({
      TableName: tableName,
      Key: { pk: { S: "user#789" }, sk: { S: "profile" } },
      UpdateExpression: "SET #name = :newName, #count = #count + :inc",
      ExpressionAttributeNames: {
        "#name": "name",
        "#count": "count",
      },
      ExpressionAttributeValues: {
        ":newName": { S: "Robert Smith" },
        ":inc": { N: "1" },
      },
    });

    // Verify update
    const getResult = yield* getItem({
      TableName: tableName,
      Key: { pk: { S: "user#789" }, sk: { S: "profile" } },
    });

    const name = getResult.Item?.name as { S: string } | undefined;
    expect(name?.S).toEqual("Robert Smith");

    // DynamoDB returns numbers as strings in the N field
    const count = getResult.Item?.count as { N: string } | undefined;
    expect(count?.N).toEqual("1");
  }),
);

test(
  "getItem drops undefined values in ExpressionAttributeNames map",
  Effect.gen(function* () {
    const tableName = TEST_TABLE_NAME;

    // Put an item
    yield* putItem({
      TableName: tableName,
      Item: {
        pk: { S: "user#undefined-test" },
        sk: { S: "profile" },
        name: { S: "Test User" },
      },
    });

    // Get with ExpressionAttributeNames containing undefined - should not fail
    const result = yield* getItem({
      TableName: tableName,
      Key: {
        pk: { S: "user#undefined-test" },
        sk: { S: "profile" },
      },
      ProjectionExpression: "#name",
      ExpressionAttributeNames: {
        "#name": "name",
        "#unused": undefined,
      } as { [key: string]: string | undefined },
    });

    expect(result.Item).toBeDefined();
    const name = result.Item?.name as { S: string } | undefined;
    expect(name?.S).toEqual("Test User");

    // Cleanup
    yield* deleteItem({
      TableName: tableName,
      Key: {
        pk: { S: "user#undefined-test" },
        sk: { S: "profile" },
      },
    });
  }),
);

test(
  "deleteItem",
  Effect.gen(function* () {
    const tableName = TEST_TABLE_NAME;

    const item = {
      pk: { S: "user#delete" },
      sk: { S: "profile" },
      name: { S: "Delete Me" },
    };

    // Put item
    yield* putItem({
      TableName: tableName,
      Item: item,
    });

    // Verify item exists
    const getBeforeDelete = yield* getItem({
      TableName: tableName,
      Key: { pk: { S: "user#delete" }, sk: { S: "profile" } },
    });

    expect(getBeforeDelete.Item).toBeDefined();

    // Delete item
    yield* deleteItem({
      TableName: tableName,
      Key: { pk: { S: "user#delete" }, sk: { S: "profile" } },
    });

    // Verify item is gone
    const getAfterDelete = yield* getItem({
      TableName: tableName,
      Key: { pk: { S: "user#delete" }, sk: { S: "profile" } },
    });

    expect(getAfterDelete.Item).toBeUndefined();
  }),
);

// ============================================================================
// Query and Scan Tests
// ============================================================================

test(
  "query items by partition key",
  Effect.gen(function* () {
    const tableName = TEST_TABLE_NAME;

    // Insert multiple items with same partition key
    const items = [
      {
        pk: { S: "order#100" },
        sk: { S: "item#1" },
        product: { S: "Widget" },
        quantity: { N: "2" },
      },
      {
        pk: { S: "order#100" },
        sk: { S: "item#2" },
        product: { S: "Gadget" },
        quantity: { N: "1" },
      },
      {
        pk: { S: "order#100" },
        sk: { S: "item#3" },
        product: { S: "Gizmo" },
        quantity: { N: "5" },
      },
      {
        pk: { S: "order#101" },
        sk: { S: "item#1" },
        product: { S: "Other" },
        quantity: { N: "1" },
      },
    ];

    for (const item of items) {
      yield* putItem({
        TableName: tableName,
        Item: item,
      });
    }

    // Query by partition key
    const queryResult = yield* query({
      TableName: tableName,
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: {
        ":pk": { S: "order#100" },
      },
    });

    expect(queryResult.Count).toEqual(3);
    expect(queryResult.Items).toBeDefined();
    expect(queryResult.Items!.length).toEqual(3);

    // Verify items are sorted by sort key
    const sortKeys = queryResult.Items!.map(
      (item) => (item.sk as { S: string }).S,
    );
    const expectedSortKeys = ["item#1", "item#2", "item#3"];
    for (let i = 0; i < expectedSortKeys.length; i++) {
      expect(sortKeys[i]).toEqual(expectedSortKeys[i]);
    }
  }),
);

test(
  "query with sort key condition",
  Effect.gen(function* () {
    const tableName = TEST_TABLE_NAME;

    // Insert items
    const items = [
      {
        pk: { S: "user#1" },
        sk: { S: "order#2023-01-01" },
        total: { N: "100" },
      },
      {
        pk: { S: "user#1" },
        sk: { S: "order#2023-06-15" },
        total: { N: "250" },
      },
      {
        pk: { S: "user#1" },
        sk: { S: "order#2024-01-01" },
        total: { N: "175" },
      },
      { pk: { S: "user#1" }, sk: { S: "profile" }, name: { S: "User One" } },
    ] as const;

    for (const item of items) {
      yield* putItem({
        TableName: tableName,
        Item: item,
      });
    }

    // Query orders in 2023 using begins_with
    const queryResult = yield* query({
      TableName: tableName,
      KeyConditionExpression: "pk = :pk AND begins_with(sk, :skPrefix)",
      ExpressionAttributeValues: {
        ":pk": { S: "user#1" },
        ":skPrefix": { S: "order#2023" },
      },
    });

    expect(queryResult.Count).toEqual(2);

    // Query with ScanIndexForward = false (descending order)
    const queryDescResult = yield* query({
      TableName: tableName,
      KeyConditionExpression: "pk = :pk AND begins_with(sk, :skPrefix)",
      ExpressionAttributeValues: {
        ":pk": { S: "user#1" },
        ":skPrefix": { S: "order#" },
      },
      ScanIndexForward: false,
    });

    expect(queryDescResult.Items).toBeDefined();
    expect(queryDescResult.Items!.length).toEqual(3);

    // First item should be the latest order
    const firstSk = (queryDescResult.Items![0].sk as { S: string }).S;
    expect(firstSk).toEqual("order#2024-01-01");
  }),
);

// ============================================================================
// Secondary Index Tests
// ============================================================================

test(
  "query local secondary index by alternate sort key",
  withTable(
    {
      TableName: `distilled-aws-test-table-lsi-${testRunId}`,
      KeySchema: [
        { AttributeName: "pk", KeyType: "HASH" },
        { AttributeName: "sk", KeyType: "RANGE" },
      ],
      AttributeDefinitions: [
        { AttributeName: "pk", AttributeType: "S" },
        { AttributeName: "sk", AttributeType: "S" },
        { AttributeName: "lsiSk", AttributeType: "S" },
      ],
      LocalSecondaryIndexes: [
        {
          IndexName: "lsi-by-priority",
          KeySchema: [
            { AttributeName: "pk", KeyType: "HASH" },
            { AttributeName: "lsiSk", KeyType: "RANGE" },
          ],
          Projection: { ProjectionType: "ALL" },
        },
      ],
      BillingMode: "PAY_PER_REQUEST",
    },
    (table) =>
      Effect.gen(function* () {
        const items = [
          {
            pk: { S: "customer#1" },
            sk: { S: "order#1" },
            lsiSk: { S: "priority#002" },
            status: { S: "open" },
          },
          {
            pk: { S: "customer#1" },
            sk: { S: "order#2" },
            lsiSk: { S: "priority#001" },
            status: { S: "open" },
          },
          {
            pk: { S: "customer#1" },
            sk: { S: "order#3" },
            lsiSk: { S: "archived#001" },
            status: { S: "archived" },
          },
          {
            pk: { S: "customer#2" },
            sk: { S: "order#1" },
            lsiSk: { S: "priority#001" },
            status: { S: "open" },
          },
        ];

        yield* Effect.all(
          items.map((item) =>
            putItem({ TableName: table.TableName, Item: item }),
          ),
          { concurrency: 4 },
        );

        const queryResult = yield* query({
          TableName: table.TableName,
          IndexName: "lsi-by-priority",
          ConsistentRead: true,
          KeyConditionExpression: "pk = :pk AND begins_with(lsiSk, :prefix)",
          ExpressionAttributeValues: {
            ":pk": { S: "customer#1" },
            ":prefix": { S: "priority#" },
          },
        });

        expect(queryResult.Count).toEqual(2);
        expect(queryResult.Items).toBeDefined();

        const orderIds = queryResult.Items!.map(
          (item) => (item.sk as { S: string }).S,
        );
        expect(orderIds).toEqual(["order#2", "order#1"]);
      }),
  ),
);

test(
  "query global secondary index after index propagation",
  withTable(
    {
      TableName: `distilled-aws-test-table-gsi-${testRunId}`,
      KeySchema: [
        { AttributeName: "pk", KeyType: "HASH" },
        { AttributeName: "sk", KeyType: "RANGE" },
      ],
      AttributeDefinitions: [
        { AttributeName: "pk", AttributeType: "S" },
        { AttributeName: "sk", AttributeType: "S" },
        { AttributeName: "gsiPk", AttributeType: "S" },
        { AttributeName: "gsiSk", AttributeType: "S" },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: "gsi-by-status",
          KeySchema: [
            { AttributeName: "gsiPk", KeyType: "HASH" },
            { AttributeName: "gsiSk", KeyType: "RANGE" },
          ],
          Projection: { ProjectionType: "ALL" },
        },
      ],
      BillingMode: "PAY_PER_REQUEST",
    },
    (table) =>
      Effect.gen(function* () {
        const items = [
          {
            pk: { S: "order#1" },
            sk: { S: "meta" },
            gsiPk: { S: "status#pending" },
            gsiSk: { S: "tenant#1#2024-01-02" },
          },
          {
            pk: { S: "order#2" },
            sk: { S: "meta" },
            gsiPk: { S: "status#pending" },
            gsiSk: { S: "tenant#1#2024-01-01" },
          },
          {
            pk: { S: "order#3" },
            sk: { S: "meta" },
            gsiPk: { S: "status#complete" },
            gsiSk: { S: "tenant#1#2024-01-03" },
          },
          {
            pk: { S: "order#4" },
            sk: { S: "meta" },
            gsiPk: { S: "status#pending" },
            gsiSk: { S: "tenant#2#2024-01-04" },
          },
        ];

        yield* Effect.all(
          items.map((item) =>
            putItem({ TableName: table.TableName, Item: item }),
          ),
          { concurrency: 4 },
        );

        const queryResult = yield* Effect.gen(function* () {
          const result = yield* query({
            TableName: table.TableName,
            IndexName: "gsi-by-status",
            KeyConditionExpression:
              "gsiPk = :gsiPk AND begins_with(gsiSk, :prefix)",
            ExpressionAttributeValues: {
              ":gsiPk": { S: "status#pending" },
              ":prefix": { S: "tenant#1#" },
            },
          });

          if ((result.Count ?? 0) !== 2) {
            return yield* Effect.fail("gsi items not visible yet" as const);
          }

          return result;
        }).pipe(
          Effect.retry({
            while: (error) => error === "gsi items not visible yet",
            schedule: eventualRetrySchedule,
          }),
        );

        expect(queryResult.Items).toBeDefined();

        const gsiSortKeys = queryResult.Items!.map(
          (item) => (item.gsiSk as { S: string }).S,
        );
        expect(gsiSortKeys).toEqual([
          "tenant#1#2024-01-01",
          "tenant#1#2024-01-02",
        ]);
      }),
  ),
);

test(
  "list tags retries while new index table ARN is still propagating",
  withTable(
    {
      TableName: `distilled-aws-test-table-tagging-${testRunId}`,
      KeySchema: [
        { AttributeName: "pk", KeyType: "HASH" },
        { AttributeName: "sk", KeyType: "RANGE" },
      ],
      AttributeDefinitions: [
        { AttributeName: "pk", AttributeType: "S" },
        { AttributeName: "sk", AttributeType: "S" },
        { AttributeName: "gsiPk", AttributeType: "S" },
        { AttributeName: "gsiSk", AttributeType: "S" },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: "gsi-by-tagging-state",
          KeySchema: [
            { AttributeName: "gsiPk", KeyType: "HASH" },
            { AttributeName: "gsiSk", KeyType: "RANGE" },
          ],
          Projection: { ProjectionType: "KEYS_ONLY" },
        },
      ],
      BillingMode: "PAY_PER_REQUEST",
    },
    (table) =>
      Effect.gen(function* () {
        yield* tagResource({
          ResourceArn: table.TableArn,
          Tags: [
            { Key: "Environment", Value: "test" },
            { Key: "Project", Value: "distilled-aws" },
          ],
        });

        const tagsResult = yield* Effect.gen(function* () {
          const result = yield* listTagsOfResource({
            ResourceArn: table.TableArn,
          }).pipe(
            Effect.retry({
              while: (e) =>
                e._tag === "InternalServerError" ||
                e._tag === "ResourceNotFoundException",
              schedule: Schedule.exponential(250).pipe(
                Schedule.both(Schedule.recurs(20)),
              ),
            }),
          );

          const environmentTag = result.Tags?.find(
            (tag) => tag.Key === "Environment",
          );
          if (!environmentTag) {
            return yield* Effect.fail("tags not visible yet" as const);
          }

          return result;
        }).pipe(
          Effect.retry({
            while: (error) => error === "tags not visible yet",
            schedule: eventualRetrySchedule,
          }),
        );

        const environmentTag = tagsResult.Tags?.find(
          (tag) => tag.Key === "Environment",
        );
        const projectTag = tagsResult.Tags?.find(
          (tag) => tag.Key === "Project",
        );

        expect(environmentTag?.Value).toEqual("test");
        expect(projectTag?.Value).toEqual("distilled-aws");
      }),
  ),
);

test(
  "scan with filter expression",
  Effect.gen(function* () {
    const tableName = TEST_TABLE_NAME;

    // Insert items
    const items = [
      {
        pk: { S: "product#1" },
        sk: { S: "info" },
        name: { S: "Widget" },
        price: { N: "10" },
        inStock: { BOOL: true },
      },
      {
        pk: { S: "product#2" },
        sk: { S: "info" },
        name: { S: "Gadget" },
        price: { N: "25" },
        inStock: { BOOL: false },
      },
      {
        pk: { S: "product#3" },
        sk: { S: "info" },
        name: { S: "Gizmo" },
        price: { N: "15" },
        inStock: { BOOL: true },
      },
      {
        pk: { S: "product#4" },
        sk: { S: "info" },
        name: { S: "Thing" },
        price: { N: "50" },
        inStock: { BOOL: true },
      },
    ];

    for (const item of items) {
      yield* putItem({
        TableName: tableName,
        Item: item,
      });
    }

    // Scan all product items (filter to avoid items from other tests)
    const scanAllResult = yield* scan({
      TableName: tableName,
      FilterExpression: "begins_with(pk, :prefix)",
      ExpressionAttributeValues: {
        ":prefix": { S: "product#" },
      },
    });

    expect(scanAllResult.Count).toEqual(4);

    // Scan with filter for inStock = true
    const scanFilteredResult = yield* scan({
      TableName: tableName,
      FilterExpression: "inStock = :inStock",
      ExpressionAttributeValues: {
        ":inStock": { BOOL: true },
      },
    });

    expect(scanFilteredResult.Count).toEqual(3);

    // Scan with filter for price > 20
    const scanPriceResult = yield* scan({
      TableName: tableName,
      FilterExpression: "price > :minPrice",
      ExpressionAttributeValues: {
        ":minPrice": { N: "20" },
      },
    });

    expect(scanPriceResult.Count).toEqual(2);
  }),
);

// ============================================================================
// Projection Expression Tests
// ============================================================================

test(
  "getItem with projection expression",
  Effect.gen(function* () {
    const tableName = TEST_TABLE_NAME;

    const item = {
      pk: { S: "user#proj" },
      sk: { S: "profile" },
      name: { S: "Projection Test" },
      email: { S: "proj@test.com" },
      password: { S: "secret" },
      age: { N: "25" },
    };

    yield* putItem({
      TableName: tableName,
      Item: item,
    });

    // Get with projection - only retrieve specific attributes
    const getResult = yield* getItem({
      TableName: tableName,
      Key: { pk: { S: "user#proj" }, sk: { S: "profile" } },
      ProjectionExpression: "#name, email",
      ExpressionAttributeNames: {
        "#name": "name",
      },
    });

    expect(getResult.Item).toBeDefined();

    // Should have name and email
    const name = getResult.Item!.name as { S: string } | undefined;
    const email = getResult.Item!.email as { S: string } | undefined;
    expect(name?.S).toEqual("Projection Test");
    expect(email?.S).toEqual("proj@test.com");

    // Should NOT have password (not in projection)
    expect(getResult.Item!.password).toBeUndefined();
  }),
);

// ============================================================================
// Pagination Stream Tests
// ============================================================================

test(
  "listTables.items() streams table names directly",
  Effect.gen(function* () {
    // listTables has items: "TableNames" in its paginated trait
    // so .items() should yield string table names directly

    // Collect all table names using .items()
    const tableNames = yield* listTables
      .items({ Limit: 1 })
      .pipe(Stream.runCollect);

    const tableNamesArray = Array.from(tableNames);

    // Should contain our test table
    expect(tableNamesArray.includes(TEST_TABLE_NAME)).toBe(true);
  }),
);

test(
  "listTables.pages() streams full ListTablesOutput responses",
  Effect.gen(function* () {
    // listTables.pages() should yield full response objects
    const pages = yield* listTables.pages({ Limit: 1 }).pipe(Stream.runCollect);

    const pagesArray = Array.from(pages);
    expect(pagesArray.length).toBeGreaterThanOrEqual(1);

    // Each page should have TableNames property
    const firstPage = pagesArray[0];
    expect(firstPage.TableNames).toBeDefined();

    // Flatten all table names from pages
    const allTableNames = pagesArray.flatMap((page) => page.TableNames ?? []);
    expect(allTableNames.includes(TEST_TABLE_NAME)).toBe(true);
  }),
);

test(
  "query.items() streams DynamoDB items directly",
  Effect.gen(function* () {
    const tableName = TEST_TABLE_NAME;

    // Insert multiple items with same partition key
    const itemCount = 5;
    const items = Array.from({ length: itemCount }, (_, i) => ({
      pk: { S: "pagination#query" },
      sk: { S: `item#${i.toString().padStart(3, "0")}` },
      data: { S: `Data ${i}` },
    }));

    yield* Effect.all(
      items.map((item) => putItem({ TableName: tableName, Item: item })),
      { concurrency: 5 },
    );

    // Use query.items() to stream items directly
    // query has items: "Items" in its paginated trait
    const collectedItems = yield* query
      .items({
        TableName: tableName,
        KeyConditionExpression: "pk = :pk",
        ExpressionAttributeValues: {
          ":pk": { S: "pagination#query" },
        },
        Limit: 2, // Force pagination
      })
      .pipe(Stream.runCollect);

    const itemsArray = Array.from(collectedItems);
    expect(itemsArray.length).toEqual(itemCount);

    // Each item should be a DynamoDB AttributeValue map
    for (const item of itemsArray) {
      expect((item.pk as { S: string }).S).toEqual("pagination#query");
    }

    // Cleanup
    yield* Effect.all(
      items.map((item) =>
        deleteItem({
          TableName: tableName,
          Key: { pk: item.pk, sk: item.sk },
        }),
      ),
      { concurrency: 5 },
    );
  }),
);

test(
  "query.pages() streams full QueryOutput responses",
  Effect.gen(function* () {
    const tableName = TEST_TABLE_NAME;

    // Insert items for pagination
    const itemCount = 5;
    const items = Array.from({ length: itemCount }, (_, i) => ({
      pk: { S: "pagination#query-pages" },
      sk: { S: `item#${i.toString().padStart(3, "0")}` },
      data: { S: `Page data ${i}` },
    }));

    yield* Effect.all(
      items.map((item) => putItem({ TableName: tableName, Item: item })),
      { concurrency: 5 },
    );

    // Use query.pages() to stream full response pages
    const pages = yield* query
      .pages({
        TableName: tableName,
        KeyConditionExpression: "pk = :pk",
        ExpressionAttributeValues: {
          ":pk": { S: "pagination#query-pages" },
        },
        Limit: 2, // 5 items with limit 2 = 3 pages
      })
      .pipe(Stream.runCollect);

    const pagesArray = Array.from(pages);
    expect(pagesArray.length).toEqual(3);

    // Each page should have metadata like Count, ScannedCount
    for (const page of pagesArray) {
      expect(page.Items).toBeDefined();
      expect(page.Count).toBeDefined();
    }

    // Total items across all pages
    const totalItems = pagesArray.reduce(
      (sum, page) => sum + (page.Items?.length ?? 0),
      0,
    );
    expect(totalItems).toEqual(itemCount);

    // Cleanup
    yield* Effect.all(
      items.map((item) =>
        deleteItem({
          TableName: tableName,
          Key: { pk: item.pk, sk: item.sk },
        }),
      ),
      { concurrency: 5 },
    );
  }),
);

test(
  "scan.items() streams items from table scan",
  Effect.gen(function* () {
    const tableName = TEST_TABLE_NAME;

    // Insert items with unique prefix
    const itemCount = 6;
    const items = Array.from({ length: itemCount }, (_, i) => ({
      pk: { S: `pagination#scan#${i.toString().padStart(3, "0")}` },
      sk: { S: "data" },
      index: { N: String(i) },
    }));

    yield* Effect.all(
      items.map((item) => putItem({ TableName: tableName, Item: item })),
      { concurrency: 6 },
    );

    // Use scan.items() with filter to get our items
    const collectedItems = yield* scan
      .items({
        TableName: tableName,
        FilterExpression: "begins_with(pk, :prefix)",
        ExpressionAttributeValues: {
          ":prefix": { S: "pagination#scan#" },
        },
        Limit: 2,
      })
      .pipe(Stream.runCollect);

    const itemsArray = Array.from(collectedItems);
    expect(itemsArray.length).toEqual(itemCount);

    // Cleanup
    yield* Effect.all(
      items.map((item) =>
        deleteItem({
          TableName: tableName,
          Key: { pk: item.pk, sk: item.sk },
        }),
      ),
      { concurrency: 6 },
    );
  }),
);

test(
  "scan.pages() streams full ScanOutput pages",
  Effect.gen(function* () {
    const tableName = TEST_TABLE_NAME;

    // Insert items
    const itemCount = 4;
    const items = Array.from({ length: itemCount }, (_, i) => ({
      pk: { S: `pagination#scan-pages#${i.toString().padStart(3, "0")}` },
      sk: { S: "info" },
      value: { N: String(i * 10) },
    }));

    yield* Effect.all(
      items.map((item) => putItem({ TableName: tableName, Item: item })),
      { concurrency: 4 },
    );

    // Use scan.pages() to get full response pages
    const pages = yield* scan
      .pages({
        TableName: tableName,
        FilterExpression: "begins_with(pk, :prefix)",
        ExpressionAttributeValues: {
          ":prefix": { S: "pagination#scan-pages#" },
        },
        Limit: 2,
      })
      .pipe(Stream.runCollect);

    const pagesArray = Array.from(pages);
    expect(pagesArray.length).toBeGreaterThanOrEqual(1);

    // Each page has ScannedCount (items read before filter)
    for (const page of pagesArray) {
      expect(page.ScannedCount).toBeDefined();
    }

    // Cleanup
    yield* Effect.all(
      items.map((item) =>
        deleteItem({
          TableName: tableName,
          Key: { pk: item.pk, sk: item.sk },
        }),
      ),
      { concurrency: 4 },
    );
  }),
);
