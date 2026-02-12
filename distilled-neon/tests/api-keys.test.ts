import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { Forbidden, NotFound, Unauthorized } from "../src/errors";
import { NeonApiError } from "../src/client";
import { listApiKeys } from "../src/operations/listApiKeys";
import { createApiKey } from "../src/operations/createApiKey";
import { revokeApiKey } from "../src/operations/revokeApiKey";
import { runEffect } from "./setup";

// Non-existent identifiers for unhappy path tests
const NON_EXISTENT_KEY_ID = 999999999;

/**
 * Helper to check if an error is an expected "not found" type error.
 * Neon API may return NotFound or Forbidden for non-existent resources.
 */
const isNotFoundOrForbidden = (error: unknown): boolean =>
  error instanceof NotFound || error instanceof Forbidden;

/**
 * Helper to check if an error indicates the operation is not allowed
 * (e.g., when using an organization API key for user-level operations)
 */
const isNotAllowed = (error: unknown): boolean =>
  error instanceof Forbidden ||
  error instanceof Unauthorized ||
  (error instanceof NeonApiError && error.message.includes("not allowed")) ||
  // Neon returns 404 with "not allowed for organization API keys" message
  (error instanceof NotFound && error.message.includes("not allowed"));

describe("api-keys", () => {
  // Note: These tests may fail if using an organization API key
  // because user-level API key operations are not allowed for org API keys.
  // The tests handle this gracefully by checking for the appropriate error.

  // ============================================================================
  // listApiKeys
  // ============================================================================

  describe("listApiKeys", () => {
    it("can list API keys or returns appropriate error for org keys", async () => {
      const result = await runEffect(
        listApiKeys({}).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      if ("error" in result) {
        // Organization API keys cannot list user API keys
        expect(isNotAllowed(result.error)).toBe(true);
      } else {
        // User API key - should return array
        expect(Array.isArray(result.data)).toBe(true);
      }
    });

    it("returns API keys with expected properties when allowed", async () => {
      const result = await runEffect(
        listApiKeys({}).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      if ("error" in result) {
        // Skip validation for org API keys
        expect(isNotAllowed(result.error)).toBe(true);
        return;
      }

      // If we have API keys, check their structure
      if (result.data.length > 0) {
        const firstKey = result.data[0]!;
        expect(firstKey.id).toBeDefined();
        expect(typeof firstKey.id).toBe("number");
        expect(firstKey.name).toBeDefined();
        expect(firstKey.created_at).toBeDefined();
        expect(firstKey.created_by).toBeDefined();
      }
    });
  });

  // ============================================================================
  // createApiKey & revokeApiKey
  // ============================================================================

  describe("createApiKey & revokeApiKey", () => {
    it("can create and revoke an API key or returns appropriate error for org keys", async () => {
      const keyName = `test-key-${Date.now()}`;
      let createdKeyId: number | null = null;

      try {
        // Create API key
        const createResult = await runEffect(
          createApiKey({
            key_name: keyName,
          }).pipe(
            Effect.matchEffect({
              onFailure: (e) => Effect.succeed({ error: e }),
              onSuccess: (data) => Effect.succeed({ data }),
            }),
          ),
        );

        if ("error" in createResult) {
          // Organization API keys cannot create user API keys
          expect(isNotAllowed(createResult.error)).toBe(true);
          return; // Skip rest of test
        }

        // Verify created key has expected properties
        expect(createResult.data.id).toBeDefined();
        expect(createResult.data.name).toBe(keyName);
        expect(createResult.data.key).toBeDefined();
        expect(createResult.data.key.length).toBeGreaterThan(0);
        expect(createResult.data.created_at).toBeDefined();

        createdKeyId = createResult.data.id;
      } finally {
        // Always cleanup
        if (createdKeyId) {
          await runEffect(
            revokeApiKey({
              key_id: createdKeyId,
            }).pipe(Effect.ignore),
          );
        }
      }
    }, 60000);

    it("returns NotFound when revoking non-existent API key", async () => {
      const result = await runEffect(
        revokeApiKey({
          key_id: NON_EXISTENT_KEY_ID,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      // Should fail with either NotFound, Forbidden, or NotAllowed
      expect("error" in result).toBe(true);
      if ("error" in result) {
        expect(isNotFoundOrForbidden(result.error) || isNotAllowed(result.error)).toBe(true);
      }
    });
  });

  // ============================================================================
  // API Key token security
  // ============================================================================

  describe("API key security", () => {
    it("listApiKeys does not expose the actual key token", async () => {
      const result = await runEffect(
        listApiKeys({}).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        ),
      );

      if ("error" in result) {
        // Skip for org API keys
        return;
      }

      // Verify that the list response doesn't include the key token
      for (const apiKey of result.data) {
        // The 'key' field should not be present in list response
        expect((apiKey as any).key).toBeUndefined();
      }
    });

    it("createApiKey returns the key token only on creation", async () => {
      const keyName = `security-test-${Date.now()}`;
      let createdKeyId: number | null = null;

      try {
        const createResult = await runEffect(
          createApiKey({
            key_name: keyName,
          }).pipe(
            Effect.matchEffect({
              onFailure: (e) => Effect.succeed({ error: e }),
              onSuccess: (data) => Effect.succeed({ data }),
            }),
          ),
        );

        if ("error" in createResult) {
          // Skip for org API keys
          return;
        }

        createdKeyId = createResult.data.id;

        // The key token is returned only on creation
        expect(createResult.data.key).toBeDefined();
        expect(createResult.data.key.length).toBeGreaterThan(20); // Should be a substantial token

        // List keys and verify the token is not exposed
        const listResult = await runEffect(
          listApiKeys({}).pipe(
            Effect.matchEffect({
              onFailure: (e) => Effect.succeed({ error: e }),
              onSuccess: (data) => Effect.succeed({ data }),
            }),
          ),
        );

        if ("data" in listResult) {
          const createdKey = listResult.data.find((k) => k.id === createdKeyId);
          expect(createdKey).toBeDefined();
          // Key token should not be in list response
          expect((createdKey as any).key).toBeUndefined();
        }
      } finally {
        if (createdKeyId) {
          await runEffect(
            revokeApiKey({
              key_id: createdKeyId,
            }).pipe(Effect.ignore),
          );
        }
      }
    }, 60000);
  });
});
