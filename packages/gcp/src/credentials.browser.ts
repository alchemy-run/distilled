/**
 * `@distilled.cloud/gcp/Credentials` for the browser: the `Credentials`
 * service and the providers that need no file system. Each layer is defined
 * in its provider's own file under `credential-providers/`.
 */
export * from "./credentials-service.ts";
export { fromAccessToken } from "./credential-providers/from-access-token.ts";
export {
  type AuthorizedUserConfig,
  fromAuthorizedUser,
} from "./credential-providers/from-authorized-user.ts";
export { CredentialsFromEnv } from "./credential-providers/from-env.ts";
export {
  fromMetadataServer,
  type MetadataServerConfig,
} from "./credential-providers/from-metadata-server.ts";
export {
  fromServiceAccountKey,
  type ServiceAccountKeyConfig,
} from "./credential-providers/from-service-account-key.ts";
export {
  fromWorkloadIdentity,
  type WorkloadIdentityConfig,
} from "./credential-providers/from-workload-identity.ts";
