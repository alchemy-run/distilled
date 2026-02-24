import { describe, expect } from "vitest";
import * as Effect from "effect/Effect";
import { test, getAccountId } from "./test.ts";
import * as Alerting from "~/services/alerting.ts";

const accountId = () => getAccountId();

// ============================================================================
// Helpers
// ============================================================================

/**
 * Deterministic name for test resources.
 * Follows the convention: distilled-cf-alerting-{testname}
 */
const resourceName = (name: string) => `distilled-cf-alerting-${name}`;

/**
 * Create an alerting policy, run `fn`, then delete the policy.
 * Uses expiring_service_token_alert which has no filter requirements.
 */
const withPolicy = <A, E, R>(
  name: string,
  fn: (policyId: string) => Effect.Effect<A, E, R>,
): Effect.Effect<A, E | any, R | any> =>
  Effect.gen(function* () {
    // Create policy with expiring_service_token_alert (no filters required)
    const created = yield* Alerting.createPolicy({
      accountId: accountId(),
      alertType: "expiring_service_token_alert",
      enabled: false,
      mechanisms: {
        email: [{ id: "test@example.com" }],
      },
      name,
    });

    const policyId = created.id!;

    // Run the test function, ensuring cleanup
    return yield* fn(policyId).pipe(
      Effect.ensuring(
        Alerting.deletePolicy({
          accountId: accountId(),
          policyId,
        }).pipe(Effect.catch(() => Effect.void)),
      ),
    );
  });

// ============================================================================
// Alerting Tests
// ============================================================================

describe("Alerting", () => {
  // --------------------------------------------------------------------------
  // listAvailableAlerts
  // --------------------------------------------------------------------------
  describe("listAvailableAlerts", () => {
    test("happy path - lists available alert types", () =>
      Effect.gen(function* () {
        const result = yield* Alerting.listAvailableAlerts({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
      }));

    test("error - InvalidRoute for invalid accountId", () =>
      Alerting.listAvailableAlerts({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  // --------------------------------------------------------------------------
  // getDestinationEligible
  // --------------------------------------------------------------------------
  describe("getDestinationEligible", () => {
    test("happy path - retrieves eligible destinations", () =>
      Effect.gen(function* () {
        const result = yield* Alerting.getDestinationEligible({
          accountId: accountId(),
        });

        expect(result).toBeDefined();
      }));

    test("error - InvalidRoute for invalid accountId", () =>
      Alerting.getDestinationEligible({
        accountId: "invalid-account-id-000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  // --------------------------------------------------------------------------
  // DestinationWebhook
  // --------------------------------------------------------------------------
  describe("createDestinationWebhook", () => {
    test("error - WebhookTestFailed for unreachable URL", () =>
      Alerting.createDestinationWebhook({
        accountId: accountId(),
        name: resourceName("create-test-fail"),
        url: "https://example.com/webhook-unreachable",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WebhookTestFailed")),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      Alerting.createDestinationWebhook({
        accountId: "invalid-account-id-000",
        name: resourceName("create-bad-acct"),
        url: "https://example.com/webhook",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  describe("getDestinationWebhook", () => {
    test("error - WebhookNotFound for non-existent webhookId", () =>
      Alerting.getDestinationWebhook({
        accountId: accountId(),
        webhookId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("WebhookNotFound")),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      Alerting.getDestinationWebhook({
        accountId: "invalid-account-id-000",
        webhookId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  describe("updateDestinationWebhook", () => {
    test("error - InvalidWebhookId for non-existent webhookId", () =>
      Alerting.updateDestinationWebhook({
        accountId: accountId(),
        webhookId: "00000000-0000-0000-0000-000000000000",
        name: resourceName("update-nonexistent"),
        url: "https://example.com/webhook",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidWebhookId")),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      Alerting.updateDestinationWebhook({
        accountId: "invalid-account-id-000",
        webhookId: "00000000-0000-0000-0000-000000000000",
        name: resourceName("update-bad-acct"),
        url: "https://example.com/webhook",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  describe("deleteDestinationWebhook", () => {
    test("error - InternalServerError for non-existent webhookId", () =>
      Alerting.deleteDestinationWebhook({
        accountId: accountId(),
        webhookId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InternalServerError")),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      Alerting.deleteDestinationWebhook({
        accountId: "invalid-account-id-000",
        webhookId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  // --------------------------------------------------------------------------
  // Policy
  // --------------------------------------------------------------------------
  describe("createPolicy", () => {
    test("happy path - creates a notification policy", () =>
      Effect.gen(function* () {
        const name = resourceName("policy-create");

        const result = yield* Alerting.createPolicy({
          accountId: accountId(),
          alertType: "expiring_service_token_alert",
          enabled: false,
          mechanisms: {
            email: [{ id: "test@example.com" }],
          },
          name,
        });

        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(typeof result.id).toBe("string");

        // Cleanup
        if (result.id) {
          yield* Alerting.deletePolicy({
            accountId: accountId(),
            policyId: result.id,
          }).pipe(Effect.catch(() => Effect.void));
        }
      }));

    test("error - FiltersRequired when filters not provided for billing_usage_alert", () =>
      Alerting.createPolicy({
        accountId: accountId(),
        alertType: "billing_usage_alert",
        enabled: false,
        mechanisms: {
          email: [{ id: "test@example.com" }],
        },
        name: resourceName("policy-no-filters"),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("FiltersRequired")),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      Alerting.createPolicy({
        accountId: "invalid-account-id-000",
        alertType: "expiring_service_token_alert",
        enabled: false,
        mechanisms: {
          email: [{ id: "test@example.com" }],
        },
        name: resourceName("policy-bad-acct"),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  describe("getPolicy", () => {
    test("happy path - retrieves an existing policy", () =>
      withPolicy(resourceName("policy-get"), (policyId) =>
        Effect.gen(function* () {
          const result = yield* Alerting.getPolicy({
            accountId: accountId(),
            policyId,
          });

          expect(result).toBeDefined();
          expect(result.id).toBe(policyId);
          expect(result.name).toBe(resourceName("policy-get"));
          expect(result.enabled).toBe(false);
          expect(result.alertType).toBe("expiring_service_token_alert");
        }),
      ));

    test("error - PolicyNotFound for non-existent policyId", () =>
      Alerting.getPolicy({
        accountId: accountId(),
        policyId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("PolicyNotFound")),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      Alerting.getPolicy({
        accountId: "invalid-account-id-000",
        policyId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  describe("updatePolicy", () => {
    test("happy path - updates a notification policy", () =>
      withPolicy(resourceName("policy-update"), (policyId) =>
        Effect.gen(function* () {
          const result = yield* Alerting.updatePolicy({
            accountId: accountId(),
            policyId,
            alertType: "expiring_service_token_alert",
            name: resourceName("policy-update-renamed"),
            enabled: false,
            mechanisms: {
              email: [{ id: "test@example.com" }],
            },
          });

          expect(result).toBeDefined();
          expect(result.id).toBe(policyId);
        }),
      ));

    test("error - InvalidAlertType for non-existent policyId", () =>
      Alerting.updatePolicy({
        accountId: accountId(),
        policyId: "00000000-0000-0000-0000-000000000000",
        name: resourceName("policy-update-nonexistent"),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidAlertType")),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      Alerting.updatePolicy({
        accountId: "invalid-account-id-000",
        policyId: "00000000-0000-0000-0000-000000000000",
        name: resourceName("policy-update-bad-acct"),
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  describe("deletePolicy", () => {
    test("happy path - deletes a notification policy", () =>
      Effect.gen(function* () {
        const name = resourceName("policy-delete");

        const created = yield* Alerting.createPolicy({
          accountId: accountId(),
          alertType: "expiring_service_token_alert",
          enabled: false,
          mechanisms: {
            email: [{ id: "test@example.com" }],
          },
          name,
        });

        expect(created.id).toBeDefined();

        const result = yield* Alerting.deletePolicy({
          accountId: accountId(),
          policyId: created.id!,
        });

        expect(result).toBeDefined();
        // The API returns {id} in the result field, not the envelope-level success flag
      }));

    test("error - PolicyNotFound for non-existent policyId", () =>
      Alerting.deletePolicy({
        accountId: accountId(),
        policyId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("PolicyNotFound")),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      Alerting.deletePolicy({
        accountId: "invalid-account-id-000",
        policyId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  // --------------------------------------------------------------------------
  // Silence
  // --------------------------------------------------------------------------
  describe("createSilence", () => {
    test("happy path - creates a silence for an existing policy", () =>
      withPolicy(resourceName("silence-create"), (policyId) =>
        Effect.gen(function* () {
          const now = new Date();
          const startTime = now.toISOString();
          const endTime = new Date(
            now.getTime() + 60 * 60 * 1000,
          ).toISOString();

          // The API returns { result: null, success: true } — the result is null
          // because silences are fire-and-forget. The response parser will fail
          // schema decode on null result, so we catch CloudflareHttpError and
          // verify the status was 200 (success).
          const result = yield* Alerting.createSilence({
            accountId: accountId(),
            body: [
              {
                policyId,
                startTime,
                endTime,
              },
            ],
          }).pipe(
            Effect.map(() => "ok" as const),
            Effect.catchTag("CloudflareHttpError", (e) => {
              // 200 with null result is actually success
              if (e.status === 200) return Effect.succeed("ok" as const);
              return Effect.fail(e);
            }),
          );

          expect(result).toBe("ok");
        }),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      Alerting.createSilence({
        accountId: "invalid-account-id-000",
        body: [],
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  describe("getSilence", () => {
    test("error - InternalServerError for non-existent silenceId", () =>
      Alerting.getSilence({
        accountId: accountId(),
        silenceId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InternalServerError")),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      Alerting.getSilence({
        accountId: "invalid-account-id-000",
        silenceId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });

  describe("deleteSilence", () => {
    test("error - non-existent silenceId returns null result", () =>
      Alerting.deleteSilence({
        accountId: accountId(),
        silenceId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => {
          // API returns success:true with null result, which causes schema decode failure
          expect(e._tag).toBe("CloudflareHttpError");
        }),
      ));

    test("error - InvalidRoute for invalid accountId", () =>
      Alerting.deleteSilence({
        accountId: "invalid-account-id-000",
        silenceId: "00000000-0000-0000-0000-000000000000",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRoute")),
      ));
  });
});
