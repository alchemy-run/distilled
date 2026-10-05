import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { fromApiKey } from "./credentials.ts";
import { GustoParseError } from "./errors.ts";
import type { GustoOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getCompanies } from "./services/gusto.ts";

// getCompanies declares a Company with a required `uuid: string`.
const run = (body: string) =>
  runValidationModes(
    getCompanies({ company_id: "c-1" }).pipe(
      Retry.none,
      Effect.provide(fromApiKey({ apiKey: Redacted.make("test") })),
    ),
    { body },
  );

describe("Gusto response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { uuid: "c-1", name: "Acme" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const { lenient, strict } = await run("{}");
    expect(lenient).toMatchObject({ _tag: "Success", success: {} });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(GustoParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(GustoParseError);
  });
});

// GustoParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [GustoParseError] extends [GustoOpError] ? true : false = true;
