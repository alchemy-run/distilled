import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import * as Result from "effect/Result";
import { describe, expect, test } from "vitest";
import { fromApiKey } from "./credentials.ts";
import * as Retry from "./retry.ts";
import { getUser, NotFound } from "./services/clerk.ts";

describe("Clerk typed error codes", () => {
  test("a typed error carries the envelope's string code in both modes", async () => {
    const { lenient, strict } = await runValidationModes(
      getUser({ user_id: "user_missing" }).pipe(
        Retry.none,
        Effect.provide(fromApiKey({ apiKey: Redacted.make("test") })),
      ),
      {
        status: 404,
        body: JSON.stringify({
          errors: [
            {
              message: "not found",
              long_message: "Resource not found",
              code: "resource_not_found",
            },
          ],
        }),
      },
    );
    for (const result of [lenient, strict]) {
      if (!Result.isFailure(result)) throw new Error("Expected a typed error");
      expect(result.failure).toBeInstanceOf(NotFound);
      if (!(result.failure instanceof NotFound)) throw new Error("Expected NotFound");
      expect(result.failure.code).toBe("resource_not_found");
    }
  });
});
