import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import { describe, expect, test } from "vitest";
import * as Category from "../src/category.ts";
import * as ErrorCategory from "../src/error-category.ts";

class Missing extends Data.TaggedError("Missing")<{}> {}
const NotFound = Category.withCategory(Category.NotFoundError)(Missing);

class Gone extends Data.TaggedError("Gone")<{}> {}
const GoneError = ErrorCategory.withCategory("Gone")(Gone);

// The same catcher applied three times. Each use must catch the error.
const reuse = async (
  catcher: (effect: Effect.Effect<never, unknown>) => Effect.Effect<unknown, unknown>,
  error: () => unknown,
) => {
  for (let i = 0; i < 3; i++) {
    const exit = await Effect.runPromiseExit(catcher(Effect.fail(error())));
    expect(exit._tag).toBe("Success");
  }
};

describe("category catchers can be reused", () => {
  test("Category.catchErrors", async () => {
    const catcher = Category.catchErrors(Category.NotFoundError, () => Effect.succeed("handled"));
    await reuse(catcher, () => new NotFound());
  });

  test("Category.catchCategory", async () => {
    const catcher = Category.catchCategory<
      InstanceType<typeof NotFound>,
      ["NotFoundError"],
      string,
      never,
      never
    >(Category.NotFoundError, () => Effect.succeed("handled"));
    await reuse(catcher as any, () => new NotFound());
  });

  test("ErrorCategory.catchCategory", async () => {
    const catcher = ErrorCategory.catchCategory<
      InstanceType<typeof GoneError>,
      ["Gone"],
      string,
      never,
      never
    >("Gone", () => Effect.succeed("handled"));
    await reuse(catcher as any, () => new GoneError());
  });
});
