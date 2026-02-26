import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { createWebhookSubscription } from "../../src/operations/createWebhookSubscription";
import { updateWebhookSubscription } from "../../src/operations/updateWebhookSubscription";
import { deleteWebhookSubscription } from "../../src/operations/deleteWebhookSubscription";
import { TEST_PREFIX, runEffect } from "../setup";

const NON_EXISTENT_ID = "00000000-0000-0000-0000-000000000000";

describe("updateWebhookSubscription", () => {
  it("can create, update, and delete a webhook subscription", async () => {
    const result = await runEffect(
      Effect.gen(function* () {
        const created = yield* createWebhookSubscription({
          description: `${TEST_PREFIX} distilled coinbase webhook update`,
          eventTypes: ["onramp.transaction.created"],
          isEnabled: false,
          target: { url: "https://example.com/webhook-original" },
        });
        const updated = yield* updateWebhookSubscription({
          subscriptionId: created.subscriptionId,
          description: `${TEST_PREFIX} distilled coinbase webhook updated`,
          eventTypes: [
            "onramp.transaction.created",
            "onramp.transaction.success",
          ],
          isEnabled: false,
          target: { url: "https://example.com/webhook-updated" },
        });
        yield* deleteWebhookSubscription({
          subscriptionId: created.subscriptionId,
        }).pipe(Effect.ignore);
        return { created, updated };
      }).pipe(
        Effect.matchEffect({
          onFailure: (e) => Effect.succeed({ error: e }),
          onSuccess: (data) => Effect.succeed({ data }),
        }),
      ),
    );
    if ("data" in result) {
      expect(result.data.updated.subscriptionId).toBe(
        result.data.created.subscriptionId,
      );
      expect(result.data.updated.target.url).toBe(
        "https://example.com/webhook-updated",
      );
      expect(result.data.updated.eventTypes).toContain(
        "onramp.transaction.success",
      );
    } else {
      expect(typeof (result.error as any)._tag).toBe("string");
    }
  });

  it("returns NotFound for non-existent subscription", async () => {
    await runEffect(
      updateWebhookSubscription({
        subscriptionId: NON_EXISTENT_ID,
        eventTypes: ["onramp.transaction.created"],
        isEnabled: false,
        target: { url: "https://example.com/webhook" },
      }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["NotFound", "RateLimitExceeded"]).toContain(e._tag),
        ),
      ),
    );
  });
});
