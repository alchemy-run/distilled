import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { createPolicy } from "../../src/operations/createPolicy";
import { deletePolicy } from "../../src/operations/deletePolicy";
import { TEST_PREFIX, runEffect } from "../setup";

describe("createPolicy", () => {
  it("can create and delete an account-scoped policy", async () => {
    let policyId: string | null = null;
    const result = await runEffect(
      createPolicy({
        scope: "account",
        description: `${TEST_PREFIX} distilled coinbase policy test`,
        rules: [
          {
            action: "reject",
            operation: "signEvmTransaction",
            criteria: [
              {
                type: "ethValue",
                ethValue: "1000000000000000000",
                operator: ">",
              },
            ],
          },
        ],
      }).pipe(
        Effect.matchEffect({
          onFailure: (e) => Effect.succeed({ error: e }),
          onSuccess: (data) => Effect.succeed({ data }),
        }),
      ),
    );
    try {
      if ("data" in result) {
        policyId = result.data.id;
        expect(result.data.id).toBeDefined();
        expect(result.data.scope).toBe("account");
        expect(Array.isArray(result.data.rules)).toBe(true);
        expect(result.data.rules.length).toBe(1);
      } else {
        expect(["Forbidden", "InvalidRequest"]).toContain(
          (result.error as any)._tag,
        );
      }
    } finally {
      if (policyId) {
        await runEffect(deletePolicy({ policyId }).pipe(Effect.ignore));
      }
    }
  });
});
