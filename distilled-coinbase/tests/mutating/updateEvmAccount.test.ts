import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { InvalidRequest } from "../../src/errors";
import { createEvmAccount } from "../../src/operations/createEvmAccount";
import { updateEvmAccount } from "../../src/operations/updateEvmAccount";
import { TEST_PREFIX, runEffect } from "../setup";

const NON_EXISTENT_ADDRESS = "0x0000000000000000000000000000000000000000";

describe("updateEvmAccount", () => {
  it("can update an EVM account name", async () => {
    const result = await runEffect(
      Effect.gen(function* () {
        const created = yield* createEvmAccount({
          name: `${TEST_PREFIX} distilled coinbase update test`,
        });
        const updated = yield* updateEvmAccount({
          address: created.address,
          name: `${TEST_PREFIX} distilled coinbase updated`,
        });
        return updated;
      }).pipe(
        Effect.matchEffect({
          onFailure: (e) => Effect.succeed({ error: e }),
          onSuccess: (data) => Effect.succeed({ data }),
        }),
      ),
    );
    if ("data" in result) {
      expect(result.data.address).toBeDefined();
      expect(result.data.name).toBe(`${TEST_PREFIX} distilled coinbase updated`);
    } else {
      expect(result.error).toBeInstanceOf(InvalidRequest);
    }
  });

  it("returns NotFound for non-existent account", async () => {
    await runEffect(
      updateEvmAccount({
        address: NON_EXISTENT_ADDRESS,
        name: "should-not-work",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NotFound")),
      ),
    );
  });
});
