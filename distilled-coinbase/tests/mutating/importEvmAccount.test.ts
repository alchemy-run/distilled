import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { importEvmAccount } from "../../src/operations/importEvmAccount";
import { runEffect } from "../setup";

describe("importEvmAccount", () => {
  it("returns error for invalid encrypted private key", async () => {
    await runEffect(
      importEvmAccount({ encryptedPrivateKey: "invalid-key" }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRequest")),
      ),
    );
  });
});
