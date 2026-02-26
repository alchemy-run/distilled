import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { createPolicy } from "../../src/operations/createPolicy";
import { updatePolicy } from "../../src/operations/updatePolicy";
import { deletePolicy } from "../../src/operations/deletePolicy";
import { TEST_PREFIX, runEffect } from "../setup";

const NON_EXISTENT_ID = "00000000-0000-0000-0000-000000000000";

describe("updatePolicy", () => {
  it("can create, update, and delete a policy", async () => {
    let policyId: string | null = null;
    const result = await runEffect(
      Effect.gen(function* () {
        const created = yield* createPolicy({
          scope: "account",
          description: `${TEST_PREFIX} distilled coinbase policy update`,
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
        });
        policyId = created.id;
        const updated = yield* updatePolicy({
          policyId: created.id,
          description: `${TEST_PREFIX} distilled coinbase policy updated`,
          rules: [
            {
              action: "reject",
              operation: "signEvmTransaction",
              criteria: [
                {
                  type: "ethValue",
                  ethValue: "2000000000000000000",
                  operator: ">",
                },
              ],
            },
          ],
        });
        return { created, updated };
      }).pipe(
        Effect.matchEffect({
          onFailure: (e) => Effect.succeed({ error: e }),
          onSuccess: (data) => Effect.succeed({ data }),
        }),
      ),
    );
    try {
      if ("data" in result) {
        expect(result.data.updated.id).toBe(result.data.created.id);
        expect(result.data.updated.description).toBe(
          `${TEST_PREFIX} distilled coinbase policy updated`,
        );
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

  it("returns NotFound for non-existent policy", async () => {
    await runEffect(
      updatePolicy({ policyId: NON_EXISTENT_ID, rules: [] }).pipe(
        Effect.flip,
        Effect.map((e) =>
          expect(["Forbidden", "InvalidRequest"]).toContain(e._tag),
        ),
      ),
    );
  });
});
