import { describe, expect, it } from "vitest";
import { listWebhookSubscriptions } from "../../src/operations/listWebhookSubscriptions";
import { runEffect } from "../setup";

describe("listWebhookSubscriptions", () => {
  it("can list webhook subscriptions", async () => {
    const result = await runEffect(listWebhookSubscriptions({}));
    expect(Array.isArray(result.subscriptions)).toBe(true);
  });

  it("can list webhook subscriptions with pagination", async () => {
    const result = await runEffect(listWebhookSubscriptions({ pageSize: 5 }));
    expect(Array.isArray(result.subscriptions)).toBe(true);
  });

  it("returns subscriptions with expected properties", async () => {
    const result = await runEffect(listWebhookSubscriptions({}));
    if (result.subscriptions.length > 0) {
      const sub = result.subscriptions[0]!;
      expect(sub.subscriptionId).toBeDefined();
      expect(Array.isArray(sub.eventTypes)).toBe(true);
      expect(typeof sub.isEnabled).toBe("boolean");
      expect(sub.target).toBeDefined();
      expect(sub.target.url).toBeDefined();
      expect(sub.secret).toBeDefined();
      expect(sub.createdAt).toBeDefined();
    }
  });
});
