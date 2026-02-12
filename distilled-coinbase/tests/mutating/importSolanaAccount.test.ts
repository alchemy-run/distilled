import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { importSolanaAccount } from "../../src/operations/importSolanaAccount";
import { runEffect } from "../setup";

describe("importSolanaAccount", () => {
  it("returns error for invalid encrypted private key", async () => {
    await runEffect(
      importSolanaAccount({ encryptedPrivateKey: "invalid-key" }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRequest")),
      ),
    );
  });
});
