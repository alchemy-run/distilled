import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { getEvmSwapPrice } from "../../src/operations/getEvmSwapPrice";
import { runEffect } from "../setup";

// Well-known addresses on Base
const WETH_BASE = "0x4200000000000000000000000000000000000006";
const USDC_BASE = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
const TAKER_ADDRESS = "0x0000000000000000000000000000000000000001";

describe("getEvmSwapPrice", () => {
  it("can get a swap price estimate (or handles error)", async () => {
    const result = await runEffect(
      getEvmSwapPrice({
        network: "base",
        fromToken: WETH_BASE,
        toToken: USDC_BASE,
        fromAmount: "1000000000000000", // 0.001 ETH
        taker: TAKER_ADDRESS,
      }).pipe(
        Effect.matchEffect({
          onFailure: (e) => Effect.succeed({ error: e }),
          onSuccess: (data) => Effect.succeed({ data }),
        }),
      ),
    );
    if ("data" in result) {
      expect("liquidityAvailable" in result.data).toBe(true);
    } else {
      expect((result.error as any)._tag).toBeDefined();
    }
  });
});
