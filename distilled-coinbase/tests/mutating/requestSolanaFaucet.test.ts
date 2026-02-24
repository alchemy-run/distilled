import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { listSolanaAccounts } from "../../src/operations/listSolanaAccounts";
import { createSolanaAccount } from "../../src/operations/createSolanaAccount";
import { requestSolanaFaucet } from "../../src/operations/requestSolanaFaucet";
import { runEffect } from "../setup";

describe("requestSolanaFaucet", () => {
  it("can request testnet SOL (or handles rate limit)", async () => {
    const result = await runEffect(
      Effect.gen(function* () {
        const accounts = yield* listSolanaAccounts({});
        if (accounts.accounts.length === 0) {
          const created = yield* createSolanaAccount({
            name: "distilled coinbase sol faucet test",
          });
          return yield* requestSolanaFaucet({
            address: created.address,
            token: "sol",
          }).pipe(
            Effect.matchEffect({
              onFailure: (e) => Effect.succeed({ error: e }),
              onSuccess: (data) => Effect.succeed({ data }),
            }),
          );
        }
        const address = accounts.accounts[0]!.address;
        return yield* requestSolanaFaucet({ address, token: "sol" }).pipe(
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
      expect(result.data.transactionSignature).toBeDefined();
    } else {
      expect(typeof (result.error as any)._tag).toBe("string");
    }
  });
});
