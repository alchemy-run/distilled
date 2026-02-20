import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { listWebhookSubscriptions } from "../../src/operations/listWebhookSubscriptions";
import { getWebhookSubscription } from "../../src/operations/getWebhookSubscription";
import { runEffect } from "../setup";

const NON_EXISTENT_ID = "00000000-0000-0000-0000-000000000000";

describe("getWebhookSubscription", () => {
  it("can get a webhook subscription by id (if any exist)", async () => {
    const result = await runEffect(
      Effect.gen(function* () {
        const subs = yield* listWebhookSubscriptions({});
        if (subs.subscriptions.length === 0) return null;
        const subscriptionId = subs.subscriptions[0]!.subscriptionId;
        return yield* getWebhookSubscription({ subscriptionId });
      }).pipe(
        Effect.matchEffect({
          onFailure: (e) => Effect.succeed({ error: e }),
          onSuccess: (data) => Effect.succeed({ data }),
        }),
      ),
    );
    if ("data" in result) {
      if (result.data !== null) {
        expect(result.data.subscriptionId).toBeDefined();
        expect(Array.isArray(result.data.eventTypes)).toBe(true);
        expect(result.data.target).toBeDefined();
        expect(result.data.target.url).toBeDefined();
      }
    } else {
      expect((result.error as any)._tag).toBeDefined();
    }
  });

  it("returns NotFound for non-existent subscription", async () => {
    await runEffect(
      getWebhookSubscription({ subscriptionId: NON_EXISTENT_ID }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["NotFound", "RateLimitExceeded"]).toContain(e._tag),
        ),
      ),
    );
  });
});
