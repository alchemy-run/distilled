import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { getEvmSmartAccountByName } from "../../src/operations/getEvmSmartAccountByName";
import { runEffect } from "../setup";

const NON_EXISTENT_NAME = "this-name-definitely-does-not-exist-12345";

describe("getEvmSmartAccountByName", () => {
  it("returns NotFound for non-existent name", async () => {
    await runEffect(
      getEvmSmartAccountByName({ name: NON_EXISTENT_NAME }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NotFound")),
      ),
    );
  });
});
