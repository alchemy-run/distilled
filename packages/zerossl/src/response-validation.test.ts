import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { DEFAULT_API_BASE_URL, layer } from "./credentials.ts";
import { ZeroSslParseError } from "./errors.ts";
import type { ZeroSslOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { generateEabCredentials } from "./services/zerossl.ts";

// generateEabCredentials declares `{ success: boolean; eab_kid: string; eab_hmac_key: Redacted<string> }`.
const run = (body: string) =>
  runValidationModes(
    generateEabCredentials({}).pipe(
      Retry.none,
      Effect.provide(
        layer({
          accessKey: Redacted.make("test"),
          apiBaseUrl: DEFAULT_API_BASE_URL,
        }),
      ),
    ),
    { body },
  );

describe("ZeroSSL response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = { success: true, eab_kid: "kid", eab_hmac_key: "hmac" };
    const { lenient, strict } = await run(JSON.stringify(body));
    for (const result of [lenient, strict]) {
      expect(result).toMatchObject({
        _tag: "Success",
        success: { success: true, eab_kid: "kid" },
      });
      if (result._tag !== "Success") throw new Error("expected success");
      expect(Redacted.value(result.success.eab_hmac_key)).toBe("hmac");
    }
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = { success: true, eab_kid: "kid" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(ZeroSslParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(ZeroSslParseError);
  });
});

// ZeroSslParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [ZeroSslParseError] extends [ZeroSslOpError] ? true : false =
  true;
