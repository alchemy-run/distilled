/**
 * `@distilled.cloud/gcp/Credentials` for Node, Bun and workers: everything
 * the browser entry exports, plus Application Default Credentials, which
 * read gcloud's credentials file. Each layer is defined in its provider's
 * own file under `credential-providers/`.
 */
export * from "./credentials.browser.ts";
export {
  type ApplicationDefaultConfig,
  fromApplicationDefault,
} from "./credential-providers/from-application-default.ts";
