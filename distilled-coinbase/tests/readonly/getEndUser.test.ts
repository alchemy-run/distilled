import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { listEndUsers } from "../../src/operations/listEndUsers";
import { getEndUser } from "../../src/operations/getEndUser";
import { runEffect } from "../setup";

const NON_EXISTENT_ID = "00000000-0000-0000-0000-000000000000";

describe("getEndUser", () => {
  it("can get an end user by id (if any exist)", async () => {
    const result = await runEffect(
      Effect.gen(function* () {
        const users = yield* listEndUsers({});
        if (users.endUsers.length === 0) return null;
        const userId = users.endUsers[0]!.userId;
        return yield* getEndUser({ userId });
      }),
    );
    if (result !== null) {
      expect(result.userId).toBeDefined();
      expect(Array.isArray(result.authenticationMethods)).toBe(true);
      expect(result.createdAt).toBeDefined();
    }
  });

  it("returns NotFound for non-existent user", async () => {
    await runEffect(
      getEndUser({ userId: NON_EXISTENT_ID }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("NotFound")),
      ),
    );
  });
});
