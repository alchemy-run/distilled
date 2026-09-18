import { describe, expect, test } from "bun:test";
import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { Credentials, DEFAULT_API_BASE_URL } from "./credentials.ts";
import { CoinbaseParseError } from "./errors.ts";
import type { CoinbaseOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { listEvmAccounts } from "./services/cdp.ts";

// A dummy Ed25519 key (32-byte seed + 32 bytes) — only used to sign the JWT.
const TestCredentials = Layer.succeed(
  Credentials,
  Effect.succeed({
    apiKeyId: "test",
    apiKeySecret: Redacted.make(Buffer.alloc(64, 1).toString("base64")),
    apiBaseUrl: DEFAULT_API_BASE_URL,
  }),
);

// listEvmAccounts declares `{ accounts: { address: string; … }[]; nextPageToken?: string }`.
const run = (body: string) =>
  runValidationModes(listEvmAccounts({}).pipe(Retry.none, Effect.provide(TestCredentials)), {
    body,
  });

describe("Coinbase response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      accounts: [{ address: "0x0000000000000000000000000000000000000001" }],
    };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = { accounts: [{ name: "main" }] };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(CoinbaseParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(CoinbaseParseError);
  });
});

// CoinbaseParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [CoinbaseParseError] extends [CoinbaseOpError] ? true : false =
  true;
