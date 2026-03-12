/**
 * Backwards-compatible auth module.
 *
 * The test harness imports `~/auth.ts` expecting `ApiToken` and `fromEnv()`.
 * This module keeps that surface while delegating to the new credentials
 * providers and default env fallback.
 */
import { Credentials, fromEnv as credentialsFromEnv } from "./credentials.ts";

/** ApiToken is an alias for Credentials (used by the test harness) */
export const ApiToken = Credentials;
export type ApiToken = Credentials;

/** Create an ApiToken layer from environment variables. */
export const fromEnv = () => credentialsFromEnv();
