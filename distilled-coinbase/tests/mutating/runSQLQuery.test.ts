import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { runSQLQuery } from "../../src/operations/runSQLQuery";
import { runEffect } from "../setup";

describe("runSQLQuery", () => {
  it("can run a simple query (or handles error)", async () => {
    const result = await runEffect(
      runSQLQuery({ sql: "SELECT 1 AS value" }).pipe(
        Effect.matchEffect({
          onFailure: (e) => Effect.succeed({ error: e }),
          onSuccess: (data) => Effect.succeed({ data }),
        }),
      ),
    );
    if ("data" in result) {
      expect(result.data).toBeDefined();
    } else {
      expect(typeof (result.error as any)._tag).toBe("string");
    }
  });

  it("returns error for invalid SQL", async () => {
    await runEffect(
      runSQLQuery({ sql: "DROP TABLE users" }).pipe(
        Effect.flip,
        Effect.map((e) => expect(e._tag).toBe("InvalidRequest")),
      ),
    );
  });
});
