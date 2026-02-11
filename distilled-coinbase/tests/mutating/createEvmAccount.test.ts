import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { InvalidRequest } from "../../src/errors";
import { createEvmAccount } from "../../src/operations/createEvmAccount";
import { runEffect } from "../setup";

describe("createEvmAccount", () => {
  it("can create a new EVM account", async () => {
    const result = await runEffect(
      createEvmAccount({ name: "distilled coinbase evm test" }).pipe(
        Effect.matchEffect({
          onFailure: (e) => Effect.succeed({ error: e }),
          onSuccess: (data) => Effect.succeed({ data }),
        }),
      ),
    );
    if ("data" in result) {
      expect(result.data.address).toBeDefined();
      expect(result.data.address.startsWith("0x")).toBe(true);
    } else {
      expect(result.error).toBeInstanceOf(InvalidRequest);
    }
  });

  it("can create an EVM account without a name", async () => {
    const result = await runEffect(
      createEvmAccount({}).pipe(
        Effect.matchEffect({
          onFailure: (e) => Effect.succeed({ error: e }),
          onSuccess: (data) => Effect.succeed({ data }),
        }),
      ),
    );
    if ("data" in result) {
      expect(result.data.address).toBeDefined();
      expect(result.data.address.startsWith("0x")).toBe(true);
    } else {
      expect(result.error).toBeInstanceOf(InvalidRequest);
    }
  });
});
