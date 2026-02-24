import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { importEndUser } from "../../src/operations/importEndUser";
import { runEffect } from "../setup";

describe("importEndUser", () => {
  it("returns error for invalid encrypted private key", async () => {
    await runEffect(
      importEndUser({
        userId: "test-user-id",
        authenticationMethods: [
          {
            type: "email" as const,
            email: "test@example.com",
          },
        ],
        encryptedPrivateKey: "invalid-key",
        keyType: "evm",
      }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRequest")),
      ),
    );
  });
});
