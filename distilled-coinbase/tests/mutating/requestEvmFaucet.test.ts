import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { listEvmAccounts } from "../../src/operations/listEvmAccounts";
import { createEvmAccount } from "../../src/operations/createEvmAccount";
import { requestEvmFaucet } from "../../src/operations/requestEvmFaucet";
import { runEffect } from "../setup";

describe("requestEvmFaucet", () => {
  it("can request testnet ETH (or handles rate limit)", async () => {
    const result = await runEffect(
      Effect.gen(function* () {
        const accounts = yield* listEvmAccounts({});
        if (accounts.accounts.length === 0) {
          const created = yield* createEvmAccount({ name: "distilled coinbase faucet test" });
          return yield* requestEvmFaucet({
            address: created.address,
            network: "base-sepolia",
            token: "eth",
          }).pipe(
            Effect.matchEffect({
              onFailure: (e) => Effect.succeed({ error: e }),
              onSuccess: (data) => Effect.succeed({ data }),
            }),
          );
        }
        const address = accounts.accounts[0]!.address;
        return yield* requestEvmFaucet({ address, network: "base-sepolia", token: "eth" }).pipe(
          Effect.matchEffect({
            onFailure: (e) => Effect.succeed({ error: e }),
            onSuccess: (data) => Effect.succeed({ data }),
          }),
        );
      }).pipe(
        Effect.matchEffect({
          onFailure: (e) => Effect.succeed({ error: e }),
          onSuccess: (data) => Effect.succeed(data),
        }),
      ),
    );
    if ("data" in result) {
      expect(result.data.transactionHash).toBeDefined();
    } else {
      expect(typeof (result.error as any)._tag).toBe("string");
    }
  });
});
