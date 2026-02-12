import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { createEndUser } from "../../src/operations/createEndUser";
import { runEffect } from "../setup";

describe("createEndUser", () => {
  it("can create an end user with email auth", async () => {
    const result = await runEffect(
      createEndUser({
        authenticationMethods: [{
          type: "email" as const,
          email: `distilled-test-${Date.now()}@example.com`,
        }],
      }).pipe(
        Effect.matchEffect({
          onFailure: (e) => Effect.succeed({ error: e }),
          onSuccess: (data) => Effect.succeed({ data }),
        }),
      ),
    );
    if ("data" in result) {
      expect(result.data.userId).toBeDefined();
      expect(result.data.authenticationMethods.length).toBeGreaterThanOrEqual(1);
      expect(result.data.createdAt).toBeDefined();
    } else {
      expect(typeof (result.error as any)._tag).toBe("string");
    }
  });
});
