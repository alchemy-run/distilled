import { fromNodeProviderChain } from "@aws-sdk/credential-providers";
import { writeFileSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

export const CREDS_PATH = join(tmpdir(), "distilled-aws-test-creds.json");

/**
 * Vitest global setup — runs once before all test files.
 *
 * Resolves AWS credentials a single time and writes them to a temp file.
 * The setup file (test/setup.ts) reads this file in each worker thread
 * and sets process.env so fromChain() picks them up via the env provider
 * without hitting the SSO portal again.
 */
export async function setup() {
  if (process.env.LOCAL) return;

  const creds = await fromNodeProviderChain()();

  writeFileSync(
    CREDS_PATH,
    JSON.stringify({
      accessKeyId: creds.accessKeyId,
      secretAccessKey: creds.secretAccessKey,
      sessionToken: creds.sessionToken,
    }),
  );
}

export async function teardown() {
  try {
    const { unlinkSync } = await import("node:fs");
    unlinkSync(CREDS_PATH);
  } catch {}
}
