/**
 * The HTTP credential endpoint provider with file-system access, so
 * `AWS_CONTAINER_AUTHORIZATION_TOKEN_FILE` can be read.
 */
import type { CredentialSource } from "./credential-source.ts";
import { fromHttp as fromHttpBrowser } from "./from-http.ts";
import { readFileString } from "./node-file-system.ts";

export const fromHttp = (
  options: { timeout?: number; maxRetries?: number } = {},
): CredentialSource =>
  fromHttpBrowser({ ...options, readFile: readFileString });
