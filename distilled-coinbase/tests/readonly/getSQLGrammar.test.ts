import { describe, expect, it } from "vitest";
import { getSQLGrammar } from "../../src/operations/getSQLGrammar";
import { runEffect } from "../setup";

describe("getSQLGrammar", () => {
  it("can get the SQL grammar", async () => {
    const result = await runEffect(getSQLGrammar({}));
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });
});
