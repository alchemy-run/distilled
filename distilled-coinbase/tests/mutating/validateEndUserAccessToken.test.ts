import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { validateEndUserAccessToken } from "../../src/operations/validateEndUserAccessToken";
import { runEffect } from "../setup";

describe("validateEndUserAccessToken", () => {
  it("returns error for invalid access token", async () => {
    await runEffect(
      validateEndUserAccessToken({ accessToken: "invalid-token" }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("Unauthorized")),
      ),
    );
  });
});
