import { runValidationModes } from "@distilled.cloud/core/testing";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import { beforeEach, describe, expect, test } from "vitest";
import { layer } from "./credentials.ts";
import { AcmeParseError } from "./errors.ts";
import { resetProtocolCaches } from "./protocol.ts";
import type { AcmeOpError } from "./protocol.ts";
import * as Retry from "./retry.ts";
import { getDirectory } from "./services/acme.ts";

const DIRECTORY_URL = "https://acme.test/directory";

// getDirectory is a plain GET of the directory URL: no nonce, no signing.
const TestCredentials = layer({
  directoryUrl: DIRECTORY_URL,
  accountKey: Redacted.make("{}"),
});

// getDirectory declares `{ newNonce: string; newAccount: string; newOrder: string; revokeCert: string; … }`.
const run = (body: string) =>
  runValidationModes(
    getDirectory({}).pipe(Retry.none, Effect.provide(TestCredentials)),
    (request) => {
      if (request.url !== DIRECTORY_URL) {
        throw new Error(`unexpected request to ${request.url}`);
      }
      return { body };
    },
  );

beforeEach(() => resetProtocolCaches());

describe("ACME response validation", () => {
  test("a matching body succeeds unchanged in both modes", async () => {
    const body = {
      newNonce: "https://acme.test/new-nonce",
      newAccount: "https://acme.test/new-account",
      newOrder: "https://acme.test/new-order",
      revokeCert: "https://acme.test/revoke-cert",
    };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict).toMatchObject({ _tag: "Success", success: body });
  });

  test("a body missing required members: lenient returns it, strict fails", async () => {
    const body = { newNonce: "https://acme.test/new-nonce" };
    const { lenient, strict } = await run(JSON.stringify(body));
    expect(lenient).toMatchObject({ _tag: "Success", success: body });
    expect(strict._tag).toBe("Failure");
    expect((strict as any).failure).toBeInstanceOf(AcmeParseError);
  });

  test("a non-JSON body: lenient returns the text, strict fails", async () => {
    const { lenient, strict } = await run("not json");
    expect(lenient).toMatchObject({ _tag: "Success", success: "not json" });
    expect((strict as any).failure).toBeInstanceOf(AcmeParseError);
  });
});

// AcmeParseError is part of every operation's declared error type.
export const parseErrorIsDeclared: [AcmeParseError] extends [AcmeOpError] ? true : false = true;
