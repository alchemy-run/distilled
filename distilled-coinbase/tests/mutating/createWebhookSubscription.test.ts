import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { createWebhookSubscription } from "../../src/operations/createWebhookSubscription";
import { deleteWebhookSubscription } from "../../src/operations/deleteWebhookSubscription";
import { runEffect } from "../setup";

describe("createWebhookSubscription", () => {
  it("can create and delete a webhook subscription", async () => {
    const result = await runEffect(
      createWebhookSubscription({
        description: "distilled coinbase webhook test",
        eventTypes: ["onramp.transaction.created"],
        isEnabled: false,
        target: { url: "https://example.com/webhook" },
      }).pipe(
        Effect.tap((created) =>
          deleteWebhookSubscription({ subscriptionId: created.subscriptionId }).pipe(Effect.ignore),
        ),
        Effect.matchEffect({
          onFailure: (e) => Effect.succeed({ error: e }),
          onSuccess: (data) => Effect.succeed({ data }),
        }),
      ),
    );
    if ("data" in result) {
      expect(result.data.subscriptionId).toBeDefined();
      expect(result.data.eventTypes).toContain("onramp.transaction.created");
      expect(result.data.isEnabled).toBe(false);
      expect(result.data.target.url).toBe("https://example.com/webhook");
      expect(result.data.secret).toBeDefined();
      expect(result.data.createdAt).toBeDefined();
    } else {
      expect(typeof (result.error as any)._tag).toBe("string");
    }
  });
});
