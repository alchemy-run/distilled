import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { fromApiKey } from "./credentials.ts";
import type { MetabaseParseError } from "./errors.ts";
import type { MetabaseOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getAction } from "./services/metabase.ts";

// Metabase's OpenAPI declares no response bodies, so every generated output
// schema is `S.Struct({})`. That schema accepts any non-nullish value (a JSON
// `null` body is read as `{}`), so strict mode has nothing to reject: these
// tests pin that both modes return every 2xx body unchanged.
const run = (body: string) =>
  runValidationModes(
    getAction({}).pipe(Retry.none, Effect.provide(fromApiKey({ apiKey: Redacted.make("test") }))),
    { body },
  );

describe("Metabase response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { id: 1, name: "action" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a non-object JSON body passes the empty output schema in both modes", async () => {
    const body = [{ id: 1, name: "action" }];
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a non-JSON body: both modes return the text", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect(strict).toMatchObject({ _tag: "Success", success: "not json" });
  });
});

// MetabaseParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [MetabaseParseError] extends [MetabaseOpError] ? true : false =
  true;
