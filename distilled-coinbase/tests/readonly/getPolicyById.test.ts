import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { listPolicies } from "../../src/operations/listPolicies";
import { getPolicyById } from "../../src/operations/getPolicyById";
import { runEffect } from "../setup";

const NON_EXISTENT_ID = "00000000-0000-0000-0000-000000000000";

describe("getPolicyById", () => {
  it("can get a policy by id (if any exist)", async () => {
    const result = await runEffect(
      Effect.gen(function* () {
        const policies = yield* listPolicies({});
        if (policies.policies.length === 0) return null;
        const policyId = policies.policies[0]!.id;
        return yield* getPolicyById({ policyId });
      }),
    );
    if (result !== null) {
      expect(result.id).toBeDefined();
      expect(result.scope).toBeDefined();
      expect(Array.isArray(result.rules)).toBe(true);
    }
  });

  it("returns NotFound for non-existent policy", async () => {
    await runEffect(
      getPolicyById({ policyId: NON_EXISTENT_ID }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NotFound")),
      ),
    );
  });
});
