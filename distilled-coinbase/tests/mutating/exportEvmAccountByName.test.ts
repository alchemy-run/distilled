import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { exportEvmAccountByName } from "../../src/operations/exportEvmAccountByName";
import { runEffect } from "../setup";

const NON_EXISTENT_NAME = "this-name-definitely-does-not-exist-12345";

describe("exportEvmAccountByName", () => {
  it("returns error for non-existent name", async () => {
    await runEffect(
      exportEvmAccountByName({ name: NON_EXISTENT_NAME, exportEncryptionKey: "test-key" }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRequest")),
      ),
    );
  });
});
