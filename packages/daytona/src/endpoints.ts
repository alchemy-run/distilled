/**
 * First path segments of the Toolbox API.
 *
 * Daytona speaks from THREE hosts, and the route picks between them (see
 * protocol.ts). Toolbox paths have no sandbox id in the OpenAPI document —
 * the sandbox is a prefix on the base URL — so the protocol recognises a
 * toolbox call by this set of roots. Convert asserts the live spec still
 * matches (the list is duplicated in `scripts/convert.ts` so convert
 * does not import across the scripts/src tsconfig rootDir boundary); a
 * new root fails convert rather than silently hitting the platform host.
 */
export const TOOLBOX_ROOTS = [
  "computeruse",
  "env",
  "files",
  "git",
  "init",
  "lsp",
  "port",
  "process",
  "system",
  "user-home-dir",
  "version",
  "work-dir",
] as const;

/** Analytics paths are `/organization/{organizationId}/…` (singular). */
export const ANALYTICS_PREFIX = "/organization/";
