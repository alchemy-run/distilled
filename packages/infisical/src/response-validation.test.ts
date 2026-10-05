import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { fromApiKey } from "./credentials.ts";
import { InfisicalParseError } from "./errors.ts";
import type { InfisicalOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getPkiDiscoveryConfig } from "./services/infisical.ts";

// getPkiDiscoveryConfig declares required `defaultPorts`, `maxPorts`,
// `maxIps`, `maxDomains`, and `minCidrPrefix`.
const run = (body: string) =>
  runValidationModes(
    getPkiDiscoveryConfig({}).pipe(
      Retry.none,
      Effect.provide(fromApiKey({ apiKey: Redacted.make("test") })),
    ),
    { body },
  );

describe("Infisical response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      defaultPorts: "443",
      maxPorts: 10,
      maxIps: 256,
      maxDomains: 100,
      minCidrPrefix: 24,
    };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = { defaultPorts: "443" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(InfisicalParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(InfisicalParseError);
  });
});

// InfisicalParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [InfisicalParseError] extends [InfisicalOpError] ? true : false =
  true;
