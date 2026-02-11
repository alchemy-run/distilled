import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { getSolanaAccountByName } from "../../src/operations/getSolanaAccountByName";
import { runEffect } from "../setup";

const NON_EXISTENT_NAME = "this-name-definitely-does-not-exist-12345";

describe("getSolanaAccountByName", () => {
  it("returns NotFound for non-existent name", async () => {
    await runEffect(
      getSolanaAccountByName({ name: NON_EXISTENT_NAME }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NotFound")),
      ),
    );
  });
});
