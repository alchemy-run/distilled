import { readFileSync, existsSync } from "node:fs";
import { CREDS_PATH } from "./global-setup.ts";

/**
 * Vitest setup file — runs in each worker thread before tests.
 *
 * Reads the credentials resolved once by global-setup.ts and sets them
 * on process.env so the AWS SDK env provider finds them immediately.
 */
if (!process.env.LOCAL && existsSync(CREDS_PATH)) {
  const creds = JSON.parse(readFileSync(CREDS_PATH, "utf-8"));
  process.env.AWS_ACCESS_KEY_ID = creds.accessKeyId;
  process.env.AWS_SECRET_ACCESS_KEY = creds.secretAccessKey;
  if (creds.sessionToken) {
    process.env.AWS_SESSION_TOKEN = creds.sessionToken;
  }
  // Clear AWS_PROFILE so fromNodeProviderChain uses the env vars above
  // instead of hitting the SSO portal again.
  delete process.env.AWS_PROFILE;
}
