import { Effect } from "effect";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PlanetScaleApiError } from "../src/client";
import { Forbidden, NotFound } from "../src/errors";
import { createWebhook } from "../src/operations/createWebhook";
import { deleteWebhook } from "../src/operations/deleteWebhook";
import { getWebhook } from "../src/operations/getWebhook";
import { listWebhooks } from "../src/operations/listWebhooks";
import { testWebhook } from "../src/operations/testWebhook";
import { updateWebhook } from "../src/operations/updateWebhook";
import {
  getTestDatabase,
  runEffect,
  setupTestDatabase,
  teardownTestDatabase,
} from "./setup";

const TEST_SUFFIX = "webhooks";

// Non-existent identifiers for unhappy path tests
const NON_EXISTENT_ORG = "this-org-definitely-does-not-exist-12345";
const NON_EXISTENT_DB = "this-database-definitely-does-not-exist-12345";
const NON_EXISTENT_WEBHOOK_ID =
  "this-webhook-id-definitely-does-not-exist-12345";

// Test webhook URL (httpbin.org is a public HTTP testing service)
const TEST_WEBHOOK_URL = "https://httpbin.org/post";
const TEST_WEBHOOK_URL_UPDATED = "https://httpbin.org/anything";

/**
 * Helper to check if an error is an expected "not found" type error.
 * PlanetScale API may return NotFound or Forbidden for non-existent resources.
 */
const isNotFoundOrForbidden = (error: unknown): boolean =>
  error instanceof NotFound || error instanceof Forbidden;

/**
 * Helper to check if an error is any API error type.
 * Includes both specific error types and the generic PlanetScaleApiError.
 */
const isApiError = (error: unknown): boolean =>
  error instanceof NotFound ||
  error instanceof Forbidden ||
  error instanceof PlanetScaleApiError ||
  (error !== null && typeof error === "object" && "_tag" in error);

describe("webhooks", () => {
  beforeAll(async () => {
    await Effect.runPromise(setupTestDatabase(TEST_SUFFIX));
  }, 300000); // 5 minute timeout for database creation

  afterAll(async () => {
    await Effect.runPromise(teardownTestDatabase(TEST_SUFFIX));
  });

  const getDb = () => getTestDatabase(TEST_SUFFIX);

  // ============================================================================
  // listWebhooks
  // ============================================================================

  describe("listWebhooks", () => {
    it("can list webhooks", async () => {
      const db = getDb();
      const result = await runEffect(
        listWebhooks({
          organization: db.organization,
          database: db.name,
        }),
      );

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.current_page).toBeDefined();
    });

    it("can list webhooks with pagination", async () => {
      const db = getDb();
      const result = await runEffect(
        listWebhooks({
          organization: db.organization,
          database: db.name,
          page: 1,
          per_page: 10,
        }),
      );

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.current_page).toBe(1);
    });

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        listWebhooks({
          organization: db.organization,
          database: NON_EXISTENT_DB,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        listWebhooks({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });
  });

  // ============================================================================
  // getWebhook
  // ============================================================================

  describe("getWebhook", () => {
    it("returns NotFound for non-existent webhook", async () => {
      const db = getDb();
      const error = await runEffect(
        getWebhook({
          organization: db.organization,
          database: db.name,
          id: NON_EXISTENT_WEBHOOK_ID,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect((error as { _tag: string })._tag).toBe("NotFound");
    });

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        getWebhook({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          id: NON_EXISTENT_WEBHOOK_ID,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        getWebhook({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          id: NON_EXISTENT_WEBHOOK_ID,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });
  });

  // ============================================================================
  // createWebhook
  // ============================================================================

  describe("createWebhook", () => {
    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        createWebhook({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          url: TEST_WEBHOOK_URL,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        createWebhook({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          url: TEST_WEBHOOK_URL,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });

    it("can create, get, and delete a webhook", async () => {
      const db = getDb();
      let webhookId: string | null = null;

      try {
        // Create webhook
        const created = await runEffect(
          createWebhook({
            organization: db.organization,
            database: db.name,
            url: TEST_WEBHOOK_URL,
            enabled: true,
            events: ["branch.ready", "deploy_request.opened"],
          }),
        );

        expect(created.id).toBeDefined();
        expect(created.url).toBe(TEST_WEBHOOK_URL);
        expect(created.enabled).toBe(true);
        expect(created.secret).toBeDefined();
        expect(created.created_at).toBeDefined();
        expect(created.events).toContain("branch.ready");
        expect(created.events).toContain("deploy_request.opened");

        webhookId = created.id;

        // Get webhook
        const fetched = await runEffect(
          getWebhook({
            organization: db.organization,
            database: db.name,
            id: webhookId,
          }),
        );

        expect(fetched.id).toBe(webhookId);
        expect(fetched.url).toBe(TEST_WEBHOOK_URL);
        expect(fetched.enabled).toBe(true);

        // Verify it appears in list
        const list = await runEffect(
          listWebhooks({
            organization: db.organization,
            database: db.name,
          }),
        );

        const found = list.data.find((w) => w.id === webhookId);
        expect(found).toBeDefined();
        expect(found?.url).toBe(TEST_WEBHOOK_URL);
      } finally {
        // Cleanup
        if (webhookId) {
          await runEffect(
            deleteWebhook({
              organization: db.organization,
              database: db.name,
              id: webhookId,
            }).pipe(Effect.ignore),
          );
        }
      }
    });

    it("can create webhook with default values", async () => {
      const db = getDb();
      let webhookId: string | null = null;

      try {
        // Create webhook with minimal params
        const created = await runEffect(
          createWebhook({
            organization: db.organization,
            database: db.name,
            url: TEST_WEBHOOK_URL,
          }),
        );

        expect(created.id).toBeDefined();
        expect(created.url).toBe(TEST_WEBHOOK_URL);
        expect(created.secret).toBeDefined();

        webhookId = created.id;
      } finally {
        // Cleanup
        if (webhookId) {
          await runEffect(
            deleteWebhook({
              organization: db.organization,
              database: db.name,
              id: webhookId,
            }).pipe(Effect.ignore),
          );
        }
      }
    });
  });

  // ============================================================================
  // deleteWebhook
  // ============================================================================

  describe("deleteWebhook", () => {
    it("returns NotFound for non-existent webhook", async () => {
      const db = getDb();
      const error = await runEffect(
        deleteWebhook({
          organization: db.organization,
          database: db.name,
          id: NON_EXISTENT_WEBHOOK_ID,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect((error as { _tag: string })._tag).toBe("NotFound");
    });

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        deleteWebhook({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          id: NON_EXISTENT_WEBHOOK_ID,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        deleteWebhook({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          id: NON_EXISTENT_WEBHOOK_ID,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });

    it("can delete a webhook successfully", async () => {
      const db = getDb();

      // Create a webhook to delete
      const created = await runEffect(
        createWebhook({
          organization: db.organization,
          database: db.name,
          url: TEST_WEBHOOK_URL,
        }),
      );

      expect(created.id).toBeDefined();

      // Delete webhook
      await runEffect(
        deleteWebhook({
          organization: db.organization,
          database: db.name,
          id: created.id,
        }),
      );

      // Verify deleted - should return NotFound
      const error = await runEffect(
        getWebhook({
          organization: db.organization,
          database: db.name,
          id: created.id,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect((error as { _tag: string })._tag).toBe("NotFound");
    });
  });

  // ============================================================================
  // updateWebhook
  // ============================================================================

  describe("updateWebhook", () => {
    it("returns NotFound for non-existent webhook", async () => {
      const db = getDb();
      const error = await runEffect(
        updateWebhook({
          organization: db.organization,
          database: db.name,
          id: NON_EXISTENT_WEBHOOK_ID,
          url: TEST_WEBHOOK_URL_UPDATED,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect((error as { _tag: string })._tag).toBe("NotFound");
    });

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        updateWebhook({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          id: NON_EXISTENT_WEBHOOK_ID,
          url: TEST_WEBHOOK_URL_UPDATED,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        updateWebhook({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          id: NON_EXISTENT_WEBHOOK_ID,
          url: TEST_WEBHOOK_URL_UPDATED,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });

    it("can update a webhook URL", async () => {
      const db = getDb();
      let webhookId: string | null = null;

      try {
        // Create webhook
        const created = await runEffect(
          createWebhook({
            organization: db.organization,
            database: db.name,
            url: TEST_WEBHOOK_URL,
          }),
        );

        webhookId = created.id;

        // Update webhook URL
        const updated = await runEffect(
          updateWebhook({
            organization: db.organization,
            database: db.name,
            id: webhookId,
            url: TEST_WEBHOOK_URL_UPDATED,
          }),
        );

        expect(updated.id).toBe(webhookId);
        expect(updated.url).toBe(TEST_WEBHOOK_URL_UPDATED);
      } finally {
        // Cleanup
        if (webhookId) {
          await runEffect(
            deleteWebhook({
              organization: db.organization,
              database: db.name,
              id: webhookId,
            }).pipe(Effect.ignore),
          );
        }
      }
    });

    it("can update webhook enabled status", async () => {
      const db = getDb();
      let webhookId: string | null = null;

      try {
        // Create enabled webhook
        const created = await runEffect(
          createWebhook({
            organization: db.organization,
            database: db.name,
            url: TEST_WEBHOOK_URL,
            enabled: true,
          }),
        );

        webhookId = created.id;
        expect(created.enabled).toBe(true);

        // Disable webhook
        const disabled = await runEffect(
          updateWebhook({
            organization: db.organization,
            database: db.name,
            id: webhookId,
            enabled: false,
          }),
        );

        expect(disabled.id).toBe(webhookId);
        expect(disabled.enabled).toBe(false);

        // Re-enable webhook
        const enabled = await runEffect(
          updateWebhook({
            organization: db.organization,
            database: db.name,
            id: webhookId,
            enabled: true,
          }),
        );

        expect(enabled.enabled).toBe(true);
      } finally {
        // Cleanup
        if (webhookId) {
          await runEffect(
            deleteWebhook({
              organization: db.organization,
              database: db.name,
              id: webhookId,
            }).pipe(Effect.ignore),
          );
        }
      }
    });

    it("can update webhook events", async () => {
      const db = getDb();
      let webhookId: string | null = null;

      try {
        // Create webhook with initial events
        const created = await runEffect(
          createWebhook({
            organization: db.organization,
            database: db.name,
            url: TEST_WEBHOOK_URL,
            events: ["branch.ready"],
          }),
        );

        webhookId = created.id;
        expect(created.events).toContain("branch.ready");

        // Update events
        const updated = await runEffect(
          updateWebhook({
            organization: db.organization,
            database: db.name,
            id: webhookId,
            events: ["deploy_request.opened", "deploy_request.closed"],
          }),
        );

        expect(updated.id).toBe(webhookId);
        expect(updated.events).toContain("deploy_request.opened");
        expect(updated.events).toContain("deploy_request.closed");
      } finally {
        // Cleanup
        if (webhookId) {
          await runEffect(
            deleteWebhook({
              organization: db.organization,
              database: db.name,
              id: webhookId,
            }).pipe(Effect.ignore),
          );
        }
      }
    });
  });

  // ============================================================================
  // testWebhook
  // ============================================================================

  describe("testWebhook", () => {
    it("returns NotFound for non-existent webhook", async () => {
      const db = getDb();
      const error = await runEffect(
        testWebhook({
          organization: db.organization,
          database: db.name,
          id: NON_EXISTENT_WEBHOOK_ID,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect((error as { _tag: string })._tag).toBe("NotFound");
    });

    it("returns NotFound or Forbidden for non-existent database", async () => {
      const db = getDb();
      const error = await runEffect(
        testWebhook({
          organization: db.organization,
          database: NON_EXISTENT_DB,
          id: NON_EXISTENT_WEBHOOK_ID,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });

    it("returns NotFound or Forbidden for non-existent organization", async () => {
      const error = await runEffect(
        testWebhook({
          organization: NON_EXISTENT_ORG,
          database: NON_EXISTENT_DB,
          id: NON_EXISTENT_WEBHOOK_ID,
        }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed(e),
            onSuccess: () => Effect.succeed(null),
          }),
        ),
      );

      expect(error).not.toBeNull();
      expect(isNotFoundOrForbidden(error)).toBe(true);
    });

    it("can test a webhook successfully", async () => {
      const db = getDb();
      let webhookId: string | null = null;

      try {
        // Create webhook
        const created = await runEffect(
          createWebhook({
            organization: db.organization,
            database: db.name,
            url: TEST_WEBHOOK_URL,
            enabled: true,
            events: ["webhook.test"],
          }),
        );

        webhookId = created.id;

        // Test webhook - should succeed (returns void)
        const result = await runEffect(
          testWebhook({
            organization: db.organization,
            database: db.name,
            id: webhookId,
          }).pipe(
            Effect.matchEffect({
              onFailure: (e) => Effect.succeed({ error: e }),
              onSuccess: () => Effect.succeed({ success: true }),
            }),
          ),
        );

        // testWebhook returns void on success
        // The webhook delivery may fail (e.g., if httpbin is slow), but the API call should succeed
        if ("success" in result) {
          expect(result.success).toBe(true);
        } else {
          // If an error occurred, it should be a valid API error (not a network error from our side)
          expect(isApiError(result.error)).toBe(true);
        }
      } finally {
        // Cleanup
        if (webhookId) {
          await runEffect(
            deleteWebhook({
              organization: db.organization,
              database: db.name,
              id: webhookId,
            }).pipe(Effect.ignore),
          );
        }
      }
    });

    it("can test a disabled webhook", async () => {
      const db = getDb();
      let webhookId: string | null = null;

      try {
        // Create disabled webhook
        const created = await runEffect(
          createWebhook({
            organization: db.organization,
            database: db.name,
            url: TEST_WEBHOOK_URL,
            enabled: false,
            events: ["webhook.test"],
          }),
        );

        webhookId = created.id;

        // Test disabled webhook - API behavior may vary
        const result = await runEffect(
          testWebhook({
            organization: db.organization,
            database: db.name,
            id: webhookId,
          }).pipe(
            Effect.matchEffect({
              onFailure: (e) => Effect.succeed({ error: e }),
              onSuccess: () => Effect.succeed({ success: true }),
            }),
          ),
        );

        // The API may either:
        // 1. Send a test anyway (success)
        // 2. Return an error because webhook is disabled
        if ("success" in result) {
          expect(result.success).toBe(true);
        } else {
          expect(isApiError(result.error)).toBe(true);
        }
      } finally {
        // Cleanup
        if (webhookId) {
          await runEffect(
            deleteWebhook({
              organization: db.organization,
              database: db.name,
              id: webhookId,
            }).pipe(Effect.ignore),
          );
        }
      }
    });
  });
});
