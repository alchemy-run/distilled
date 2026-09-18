import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { fromApiKey } from "./credentials.ts";
import { GrafanaParseError } from "./errors.ts";
import type { GrafanaOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getTeam } from "./services/grafana.ts";

// getTeam declares TeamDTO: `{ id, isProvisioned, memberCount, name, orgId, uid, … }`.
const run = (body: string) =>
  runValidationModes(
    getTeam({ team_id: "1" }).pipe(Retry.none, Effect.provide(fromApiKey({ apiKey: "test" }))),
    { body },
  );

describe("Grafana response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      id: 1,
      isProvisioned: false,
      memberCount: 0,
      name: "team",
      orgId: 1,
      uid: "abc",
    };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = {};
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(GrafanaParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(GrafanaParseError);
  });
});

// GrafanaParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [GrafanaParseError] extends [GrafanaOpError] ? true : false =
  true;
