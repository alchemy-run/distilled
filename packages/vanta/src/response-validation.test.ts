import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { fromApiKey } from "./credentials.ts";
import { VantaParseError } from "./errors.ts";
import type { VantaOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { listConnectedIntegrations } from "./services/manage_vanta.ts";

// listConnectedIntegrations declares `{ results: { data: Integration[]; pageInfo: PageInfo } }`.
const run = (body: string) =>
  runValidationModes(
    listConnectedIntegrations({}).pipe(Retry.none, Effect.provide(fromApiKey({ apiKey: "test" }))),
    { body },
  );

describe("Vanta response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      results: {
        data: [],
        pageInfo: {
          endCursor: null,
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: null,
        },
      },
    };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = { results: { data: [] } };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(VantaParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(VantaParseError);
  });
});

// VantaParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [VantaParseError] extends [VantaOpError] ? true : false = true;
