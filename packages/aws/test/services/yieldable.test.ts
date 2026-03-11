import { expect } from "@effect/vitest";
import { describe } from "vitest";
import { Effect, Layer, Stream } from "effect";
import { getCallerIdentity } from "../../src/services/sts.ts";
import { listQueues } from "../../src/services/sqs.ts";
import { test } from "../test.ts";

describe("OperationMethod yieldable", () => {
  test(
    "direct call - yield* operation(input) works with services in context",
    Effect.gen(function* () {
      const result = yield* getCallerIdentity({});
      expect(result).toBeDefined();
      expect(result.Account).toBeDefined();
      expect(result.Arn).toBeDefined();
      expect(result.UserId).toBeDefined();
    }),
  );

  test(
    "yield first - yield* operation captures services and returns requirement-free function",
    Effect.gen(function* () {
      const callerId = yield* getCallerIdentity;

      const result = yield* callerId({});
      expect(result).toBeDefined();
      expect(result.Account).toBeDefined();
      expect(result.Arn).toBeDefined();
    }),
  );

  test(
    "yield first function works without service context",
    Effect.gen(function* () {
      const callerId = yield* getCallerIdentity;

      const result = yield* callerId({}).pipe(Effect.provide(Layer.empty));
      expect(result).toBeDefined();
      expect(result.Account).toBeDefined();
    }),
  );
});

describe("Paginated OperationMethod yieldable", () => {
  test(
    "direct call - yield* paginatedOp(input) returns single page",
    Effect.gen(function* () {
      const result = yield* listQueues({});
      expect(result).toBeDefined();
      expect(result).toHaveProperty("QueueUrls");
    }),
  );

  test(
    "yield first - yield* paginatedOp captures services and returns requirement-free function",
    Effect.gen(function* () {
      const list = yield* listQueues;

      const result = yield* list({});
      expect(result).toBeDefined();
      expect(result).toHaveProperty("QueueUrls");
    }),
  );

  test(
    "yield first function works without service context",
    Effect.gen(function* () {
      const list = yield* listQueues;

      const result = yield* list({}).pipe(Effect.provide(Layer.empty));
      expect(result).toBeDefined();
      expect(result).toHaveProperty("QueueUrls");
    }),
  );

  test(
    "pages - streams full response pages",
    Effect.gen(function* () {
      const pages = yield* listQueues
        .pages({})
        .pipe(Stream.take(1), Stream.runCollect);
      expect(pages.length).toBeGreaterThanOrEqual(0);
      for (const page of pages) {
        expect(page).toHaveProperty("QueueUrls");
      }
    }),
  );

  test(
    "items - streams individual queue URLs",
    Effect.gen(function* () {
      const items = yield* listQueues
        .items({})
        .pipe(Stream.take(5), Stream.runCollect);
      for (const item of items) {
        expect(typeof item).toBe("string");
      }
    }),
  );
});
