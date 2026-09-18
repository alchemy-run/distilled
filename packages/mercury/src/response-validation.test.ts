import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import { fromApiKey } from "./credentials.ts";
import { MercuryParseError } from "./errors.ts";
import type { MercuryOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getOrganization } from "./services/mercury.ts";

// getOrganization declares `{ organization: { dbas: OrganizationDBA[]; legalBusinessName: string; … } }`.
const run = (body: string) =>
  runValidationModes(
    getOrganization({}).pipe(Retry.none, Effect.provide(fromApiKey({ apiKey: "test" }))),
    { body },
  );

describe("Mercury response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      organization: {
        billingCadence: "monthly",
        dbas: [{ dbaIsDefault: true, dbaName: "Acme" }],
        id: "org_1",
        kind: "business",
        legalBusinessName: "Acme Inc.",
        subscriptionTier: "free",
      },
    };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = { organization: { id: "org_1", dbas: [] } };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(MercuryParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(MercuryParseError);
  });
});

// MercuryParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [MercuryParseError] extends [MercuryOpError] ? true : false =
  true;
