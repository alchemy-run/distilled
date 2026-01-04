import { Effect, Schedule } from "effect";
import { beforeAll } from "vitest";
import {
  cancelKeyDeletion,
  createAlias,
  createKey,
  decrypt,
  deleteAlias,
  describeKey,
  encrypt,
  listAliases,
  listKeys,
  scheduleKeyDeletion,
} from "../../src/services/kms.ts";
import { run, test } from "../test.ts";

const TEST_ALIAS = "alias/itty-aws-test";

// Clean up all keys before running tests
beforeAll(async () => {
  await run(
    Effect.gen(function* () {
      // Collect all keys first
      const allKeys: string[] = [];
      let marker: string | undefined;
      do {
        const result = yield* listKeys({ Marker: marker });
        for (const key of result.Keys ?? []) {
          if (key.KeyId) {
            allKeys.push(key.KeyId);
          }
        }
        marker = result.Truncated ? result.NextMarker : undefined;
      } while (marker);

      // Schedule deletion for keys not already pending (in parallel)
      yield* Effect.all(
        allKeys.map((keyId) =>
          Effect.gen(function* () {
            const keyInfo = yield* describeKey({ KeyId: keyId }).pipe(
              Effect.retry({
                while: (err) => err._tag === "ThrottlingException",
                schedule: Schedule.exponential("1 second"),
              }),
              Effect.catchAll(() => Effect.succeed(null)),
            );
            if (
              keyInfo?.KeyMetadata?.KeyState === "Enabled" ||
              keyInfo?.KeyMetadata?.KeyState === "Disabled"
            ) {
              yield* scheduleKeyDeletion({
                KeyId: keyId,
                PendingWindowInDays: 7,
              }).pipe(Effect.ignore);
            }
          }),
        ),
        { concurrency: "unbounded" },
      );
    }),
  );
}, 300_000);

// ============================================================================
// Key Management Tests
// ============================================================================

test(
  "create key, describe key, list keys, and schedule deletion",
  { timeout: 300_000 },
  Effect.gen(function* () {
    // Create a symmetric encryption key
    const createResult = yield* createKey({
      Description: "Test key for itty-aws",
      KeyUsage: "ENCRYPT_DECRYPT",
      KeySpec: "SYMMETRIC_DEFAULT",
    });

    const keyId = createResult.KeyMetadata?.KeyId;
    if (!keyId) {
      return yield* Effect.fail(new Error("No KeyId in create result"));
    }

    try {
      // Describe the key
      const describeResult = yield* describeKey({ KeyId: keyId });
      if (describeResult.KeyMetadata?.KeyId !== keyId) {
        return yield* Effect.fail(new Error("KeyId mismatch in describe"));
      }
      if (describeResult.KeyMetadata?.KeyState !== "Enabled") {
        return yield* Effect.fail(
          new Error(
            `Expected KeyState=Enabled, got ${describeResult.KeyMetadata?.KeyState}`,
          ),
        );
      }

      // List keys and verify our key is in the list (paginate through all)
      let foundKey = false;
      let marker: string | undefined;
      do {
        const listResult = yield* listKeys({ Marker: marker });
        if (listResult.Keys?.some((k) => k.KeyId === keyId)) {
          foundKey = true;
          break;
        }
        marker = listResult.Truncated ? listResult.NextMarker : undefined;
      } while (marker);

      if (!foundKey) {
        return yield* Effect.fail(new Error("Key not found in list"));
      }
    } finally {
      // Schedule key deletion (minimum 7 days in AWS, but LocalStack may allow less)
      yield* scheduleKeyDeletion({
        KeyId: keyId,
        PendingWindowInDays: 7,
      }).pipe(Effect.ignore);
    }
  }),
);

test(
  "create key and cancel key deletion",
  { timeout: 300_000 },
  Effect.gen(function* () {
    // Create a key
    const createResult = yield* createKey({
      Description: "Test key for cancellation",
      KeyUsage: "ENCRYPT_DECRYPT",
    });

    const keyId = createResult.KeyMetadata?.KeyId;
    if (!keyId) {
      return yield* Effect.fail(new Error("No KeyId in create result"));
    }

    try {
      // Schedule deletion
      yield* scheduleKeyDeletion({
        KeyId: keyId,
        PendingWindowInDays: 7,
      });

      // Verify key is pending deletion
      const describePending = yield* describeKey({ KeyId: keyId });
      if (describePending.KeyMetadata?.KeyState !== "PendingDeletion") {
        return yield* Effect.fail(
          new Error(
            `Expected KeyState=PendingDeletion, got ${describePending.KeyMetadata?.KeyState}`,
          ),
        );
      }

      // Cancel deletion
      yield* cancelKeyDeletion({ KeyId: keyId });

      // Wait for key state to transition from PendingDeletion to Disabled/Enabled
      // AWS may take a moment to update the state after cancellation
      yield* describeKey({ KeyId: keyId }).pipe(
        Effect.flatMap((result) => {
          const state = result.KeyMetadata?.KeyState;
          if (state === "Disabled" || state === "Enabled") {
            return Effect.succeed(result);
          }
          return Effect.fail(
            new Error(
              `Key still in state ${state}, waiting for Disabled/Enabled`,
            ),
          );
        }),
        Effect.retry({
          schedule: Schedule.spaced("1 second").pipe(
            Schedule.intersect(Schedule.recurs(30)),
          ),
        }),
      );
    } finally {
      // Clean up - schedule deletion again
      yield* scheduleKeyDeletion({
        KeyId: keyId,
        PendingWindowInDays: 7,
      }).pipe(Effect.ignore);
    }
  }),
);

// ============================================================================
// Alias Tests
// ============================================================================

test(
  "create alias, list aliases, and delete alias",
  { timeout: 300_000 },
  Effect.gen(function* () {
    // First create a key to alias
    const createKeyResult = yield* createKey({
      Description: "Test key for alias test",
      KeyUsage: "ENCRYPT_DECRYPT",
    });

    const keyId = createKeyResult.KeyMetadata?.KeyId;
    if (!keyId) {
      return yield* Effect.fail(new Error("No KeyId in create result"));
    }

    const aliasName = TEST_ALIAS;

    try {
      // Create alias
      yield* createAlias({
        AliasName: aliasName,
        TargetKeyId: keyId,
      });

      // List aliases and verify our alias is there
      const listResult = yield* listAliases({ KeyId: keyId });
      const foundAlias = listResult.Aliases?.find(
        (a) => a.AliasName === aliasName,
      );
      if (!foundAlias) {
        return yield* Effect.fail(new Error("Alias not found in list"));
      }
      if (foundAlias.TargetKeyId !== keyId) {
        return yield* Effect.fail(new Error("Alias TargetKeyId mismatch"));
      }

      // Can describe key by alias
      const describeByAlias = yield* describeKey({ KeyId: aliasName });
      if (describeByAlias.KeyMetadata?.KeyId !== keyId) {
        return yield* Effect.fail(
          new Error("Could not describe key by alias name"),
        );
      }

      // Delete alias
      yield* deleteAlias({ AliasName: aliasName });

      // Verify alias is gone
      const listAfterDelete = yield* listAliases({ KeyId: keyId });
      const aliasAfterDelete = listAfterDelete.Aliases?.find(
        (a) => a.AliasName === aliasName,
      );
      if (aliasAfterDelete) {
        return yield* Effect.fail(
          new Error("Alias should not exist after deletion"),
        );
      }
    } finally {
      // Clean up alias if it still exists
      yield* deleteAlias({ AliasName: aliasName }).pipe(Effect.ignore);
      // Clean up key
      yield* scheduleKeyDeletion({
        KeyId: keyId,
        PendingWindowInDays: 7,
      }).pipe(Effect.ignore);
    }
  }),
);

// ============================================================================
// Encrypt/Decrypt Tests
// ============================================================================

test(
  "encrypt and decrypt data with symmetric key",
  { timeout: 300_000 },
  Effect.gen(function* () {
    // Create a symmetric encryption key
    const createResult = yield* createKey({
      Description: "Test key for encrypt/decrypt",
      KeyUsage: "ENCRYPT_DECRYPT",
      KeySpec: "SYMMETRIC_DEFAULT",
    });

    const keyId = createResult.KeyMetadata?.KeyId;
    if (!keyId) {
      return yield* Effect.fail(new Error("No KeyId in create result"));
    }

    try {
      // Test data
      const plaintext = new TextEncoder().encode("Hello, KMS encryption test!");

      // Encrypt
      const encryptResult = yield* encrypt({
        KeyId: keyId,
        Plaintext: plaintext,
      });

      if (!encryptResult.CiphertextBlob) {
        return yield* Effect.fail(
          new Error("No CiphertextBlob in encrypt result"),
        );
      }

      // Verify ciphertext is different from plaintext
      const ciphertextStr = new TextDecoder().decode(
        encryptResult.CiphertextBlob,
      );
      const plaintextStr = new TextDecoder().decode(plaintext);
      if (ciphertextStr === plaintextStr) {
        return yield* Effect.fail(
          new Error("Ciphertext should be different from plaintext"),
        );
      }

      // Decrypt
      const decryptResult = yield* decrypt({
        KeyId: keyId,
        CiphertextBlob: encryptResult.CiphertextBlob,
      });

      if (!decryptResult.Plaintext) {
        return yield* Effect.fail(new Error("No Plaintext in decrypt result"));
      }

      // Verify decrypted data matches original
      const decryptedStr = new TextDecoder().decode(decryptResult.Plaintext);
      if (decryptedStr !== plaintextStr) {
        return yield* Effect.fail(
          new Error(
            `Decrypted text mismatch: expected "${plaintextStr}", got "${decryptedStr}"`,
          ),
        );
      }
    } finally {
      // Clean up key
      yield* scheduleKeyDeletion({
        KeyId: keyId,
        PendingWindowInDays: 7,
      }).pipe(Effect.ignore);
    }
  }),
);

test(
  "encrypt with encryption context",
  { timeout: 300_000 },
  Effect.gen(function* () {
    // Create a key
    const createResult = yield* createKey({
      Description: "Test key for encryption context",
      KeyUsage: "ENCRYPT_DECRYPT",
    });

    const keyId = createResult.KeyMetadata?.KeyId;
    if (!keyId) {
      return yield* Effect.fail(new Error("No KeyId in create result"));
    }

    try {
      const plaintext = new TextEncoder().encode("Secret data");
      const encryptionContext = {
        purpose: "testing",
        environment: "local",
      };

      // Encrypt with context
      const encryptResult = yield* encrypt({
        KeyId: keyId,
        Plaintext: plaintext,
        EncryptionContext: encryptionContext,
      });

      if (!encryptResult.CiphertextBlob) {
        return yield* Effect.fail(new Error("No CiphertextBlob"));
      }

      // Decrypt with same context should succeed
      const decryptResult = yield* decrypt({
        KeyId: keyId,
        CiphertextBlob: encryptResult.CiphertextBlob,
        EncryptionContext: encryptionContext,
      });

      if (!decryptResult.Plaintext) {
        return yield* Effect.fail(new Error("Decrypt with context failed"));
      }

      // Verify content
      const decryptedStr = new TextDecoder().decode(decryptResult.Plaintext);
      const originalStr = new TextDecoder().decode(plaintext);
      if (decryptedStr !== originalStr) {
        return yield* Effect.fail(new Error("Decrypted content mismatch"));
      }

      // Decrypt with wrong context should fail
      const wrongContextResult = yield* decrypt({
        KeyId: keyId,
        CiphertextBlob: encryptResult.CiphertextBlob,
        EncryptionContext: {
          purpose: "wrong",
          environment: "wrong",
        },
      }).pipe(
        Effect.map(() => "success" as const),
        Effect.catchAll(() => Effect.succeed("error" as const)),
      );

      if (wrongContextResult !== "error") {
        return yield* Effect.fail(
          new Error("Decrypt with wrong context should have failed"),
        );
      }
    } finally {
      yield* scheduleKeyDeletion({
        KeyId: keyId,
        PendingWindowInDays: 7,
      }).pipe(Effect.ignore);
    }
  }),
);
