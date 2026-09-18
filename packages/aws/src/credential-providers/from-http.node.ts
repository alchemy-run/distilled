/**
 * The HTTP credential endpoint provider with file-system access, so
 * `AWS_CONTAINER_AUTHORIZATION_TOKEN_FILE` can be read.
 */
import { createLazyProvider } from "../credentials-service.ts";
import type { CredentialSource } from "./credential-source.ts";
import { httpSource as browserHttpSource } from "./from-http.ts";
import { readFileString } from "./node-file-system.ts";

export const httpSource = (
  options: { timeout?: number; maxRetries?: number } = {},
): CredentialSource => browserHttpSource({ ...options, readFile: readFileString });

const hints = ["Ensure the configured credential endpoint is reachable."];

/**
 * The endpoint named by `AWS_CONTAINER_CREDENTIALS_RELATIVE_URI` or
 * `AWS_CONTAINER_CREDENTIALS_FULL_URI`, plus the token file on disk.
 */
export const fromHttp = (options: { timeout?: number; maxRetries?: number } = {}) =>
  createLazyProvider(httpSource(options), "http", hints);
