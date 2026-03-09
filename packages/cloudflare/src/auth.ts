/**
 * Backwards-compatible auth module.
 *
 * The test harness imports `~/auth.ts` expecting `ApiToken` and `fromEnv()`.
 * This module re-exports the credentials under the old names.
 */
import { Credentials, CredentialsFromEnv } from "./credentials.ts";

/** ApiToken is an alias for Credentials (used by the test harness) */
export const ApiToken = Credentials;
export type ApiToken = Credentials;

/** Create an ApiToken layer from environment variables. */
export const fromEnv = () => CredentialsFromEnv;
