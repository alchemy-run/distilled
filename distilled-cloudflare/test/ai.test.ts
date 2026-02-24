import { describe, expect } from "vitest";
import * as Effect from "effect/Effect";
import { test, getAccountId } from "./test.ts";
import * as AI from "~/services/ai.ts";

const accountId = () => getAccountId();

// ============================================================================
// Helpers
// ============================================================================

/**
 * Deterministic finetune name for tests.
 * Follows the convention: distilled-cf-ai-{testname}
 */
const finetuneName = (name: string) => `distilled-cf-ai-${name}`;

// ============================================================================
// AI Tests
// ============================================================================

describe("AI", () => {
  // --------------------------------------------------------------------------
  // runAi
  // --------------------------------------------------------------------------
  describe("runAi", () => {
    test("error - ModelNotFound for text generation model", () =>
      AI.runAi({
        modelName: "@cf/meta/llama-2-7b-chat-int8",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ModelNotFound")),
      ));

    test("error - ModelNotFound for non-existent model name", () =>
      AI.runAi({
        modelName: "non-existent-model-that-does-not-exist-xyz",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ModelNotFound")),
      ));

    test("error - ModelNotFound for model name with special characters", () =>
      AI.runAi({
        modelName: "@invalid/model/!@#$%^&*()",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ModelNotFound")),
      ));

    test("error - validation error for empty model name", () =>
      AI.runAi({
        modelName: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ModelNotFound")),
      ));
  });

  // --------------------------------------------------------------------------
  // listFinetunes
  // --------------------------------------------------------------------------
  describe("listFinetunes", () => {
    test("happy path - lists finetunes for account", () =>
      Effect.gen(function* () {
        const result = yield* AI.listFinetunes({
          accountId: accountId(),
        });
        expect(Array.isArray(result)).toBe(true);
      }));

    test("error - AccountNotFound for invalid accountId", () =>
      AI.listFinetunes({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("AccountNotFound")),
      ));

    test("error - validation error for empty accountId", () =>
      AI.listFinetunes({
        accountId: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("AccountNotFound")),
      ));
  });

  // --------------------------------------------------------------------------
  // createFinetune
  // --------------------------------------------------------------------------
  describe("createFinetune", () => {
    test("error - ModelNotSupported for unsupported model", () =>
      AI.createFinetune({
        accountId: accountId(),
        model: "@cf/meta/llama-2-7b-chat-int8",
        name: finetuneName("create-happy"),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ModelNotSupported")),
      ));

    test("error - ModelNotSupported when creating with description", () =>
      AI.createFinetune({
        accountId: accountId(),
        model: "@cf/meta/llama-2-7b-chat-int8",
        name: finetuneName("create-desc"),
        description: "Test finetune with description",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ModelNotSupported")),
      ));

    test("error - ModelNotSupported when creating public finetune", () =>
      AI.createFinetune({
        accountId: accountId(),
        model: "@cf/meta/llama-2-7b-chat-int8",
        name: finetuneName("create-public"),
        public: true,
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ModelNotSupported")),
      ));

    test("error - AccountNotFound for invalid accountId", () =>
      AI.createFinetune({
        accountId: "invalid-account-id-000",
        model: "@cf/meta/llama-2-7b-chat-int8",
        name: finetuneName("create-bad-account"),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("AccountNotFound")),
      ));

    test("error - validation error for empty accountId", () =>
      AI.createFinetune({
        accountId: "",
        model: "@cf/meta/llama-2-7b-chat-int8",
        name: finetuneName("create-empty-account"),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("AccountNotFound")),
      ));

    test("error - validation error for empty model string", () =>
      AI.createFinetune({
        accountId: accountId(),
        model: "",
        name: finetuneName("create-empty-model"),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ModelNotSupported")),
      ));

    test("error - validation error for empty name string", () =>
      AI.createFinetune({
        accountId: accountId(),
        model: "@cf/meta/llama-2-7b-chat-int8",
        name: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ModelNotSupported")),
      ));

    test("error - ModelNotSupported for invalid model name", () =>
      AI.createFinetune({
        accountId: accountId(),
        model: "not-a-real-model-xyz-123",
        name: finetuneName("create-bad-model"),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ModelNotSupported")),
      ));
  });

  // --------------------------------------------------------------------------
  // createFinetuneAsset
  // --------------------------------------------------------------------------
  describe("createFinetuneAsset", () => {
    // Note: Cannot test happy path since model is not supported for finetuning
    // Testing error case with placeholder finetuneId
    test("error - ModelNotSupported when uploading to finetune", () =>
      AI.createFinetuneAsset({
        finetuneId: "00000000-0000-0000-0000-000000000001",
        accountId: accountId(),
        file: new Blob(
          [JSON.stringify({ prompt: "Hello", completion: "World" })],
          {
            type: "application/jsonl",
          },
        ),
        fileName: "training-data.jsonl",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ModelNotSupported")),
      ));

    test("error - ModelNotSupported for non-existent finetuneId", () =>
      AI.createFinetuneAsset({
        finetuneId: "00000000-0000-0000-0000-000000000000",
        accountId: accountId(),
        fileName: "test.jsonl",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ModelNotSupported")),
      ));

    test("error - AccountNotFound for invalid accountId", () =>
      AI.createFinetuneAsset({
        finetuneId: "00000000-0000-0000-0000-000000000000",
        accountId: "invalid-account-id-000",
        fileName: "test.jsonl",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("AccountNotFound")),
      ));

    test("error - validation error for empty accountId", () =>
      AI.createFinetuneAsset({
        finetuneId: "00000000-0000-0000-0000-000000000000",
        accountId: "",
        fileName: "test.jsonl",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("AccountNotFound")),
      ));

    test("error - validation error for empty finetuneId", () =>
      AI.createFinetuneAsset({
        finetuneId: "",
        accountId: accountId(),
        fileName: "test.jsonl",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("UnknownCloudflareError")),
      ));
  });

  // --------------------------------------------------------------------------
  // getModelSchema
  // --------------------------------------------------------------------------
  describe("getModelSchema", () => {
    test("happy path - retrieves schema for a known model", () =>
      Effect.gen(function* () {
        const result = yield* AI.getModelSchema({
          accountId: accountId(),
          model: "@cf/meta/llama-2-7b-chat-int8",
        });

        expect(result).toBeDefined();
      }));

    test("happy path - retrieves schema for a text classification model", () =>
      Effect.gen(function* () {
        const result = yield* AI.getModelSchema({
          accountId: accountId(),
          model: "@cf/huggingface/distilbert-sst-2-int8",
        });

        expect(result).toBeDefined();
      }));

    test("error - ModelSchemaNotFound for non-existent model", () =>
      AI.getModelSchema({
        accountId: accountId(),
        model: "non-existent-model-xyz-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ModelSchemaNotFound")),
      ));

    test("error - AccountNotFound for invalid accountId", () =>
      AI.getModelSchema({
        accountId: "invalid-account-id-000",
        model: "@cf/meta/llama-2-7b-chat-int8",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("AccountNotFound")),
      ));

    test("error - validation error for empty accountId", () =>
      AI.getModelSchema({
        accountId: "",
        model: "@cf/meta/llama-2-7b-chat-int8",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("AccountNotFound")),
      ));

    test("error - validation error for empty model string", () =>
      AI.getModelSchema({
        accountId: accountId(),
        model: "",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("UnknownCloudflareError")),
      ));

    test("error - ModelSchemaNotFound for model name with special characters", () =>
      AI.getModelSchema({
        accountId: accountId(),
        model: "!@#$%^&*()",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("ModelSchemaNotFound")),
      ));
  });
});
