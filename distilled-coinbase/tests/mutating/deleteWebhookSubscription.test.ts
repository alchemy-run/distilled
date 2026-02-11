import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { deleteWebhookSubscription } from "../../src/operations/deleteWebhookSubscription";
import { runEffect } from "../setup";

const NON_EXISTENT_ID = "00000000-0000-0000-0000-000000000000";

describe("deleteWebhookSubscription", () => {
  it("returns NotFound for non-existent subscription", async () => {
    await runEffect(
      deleteWebhookSubscription({ subscriptionId: NON_EXISTENT_ID }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NotFound")),
      ),
    );
  });
});
