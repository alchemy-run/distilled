/**
 * `@distilled.cloud/aws/Credentials` for the browser: the `Credentials`
 * service and the providers that need neither a file system nor a child
 * process. Each layer is defined in its provider's own file.
 */
export * from "./credentials-service.ts";
export type { Secret } from "./credential-providers/credential-source.ts";
export {
  createCredentialChain,
  propertyProviderChain,
} from "./credential-providers/create-credential-chain.ts";
export { fromCognitoIdentityPool } from "./credential-providers/from-cognito-identity-pool.ts";
export { fromCognitoIdentity } from "./credential-providers/from-cognito-identity.ts";
export { fromContainerMetadata } from "./credential-providers/from-container-metadata.ts";
export {
  fromCredentials,
  type StaticCredentials,
} from "./credential-providers/from-credentials.ts";
export { fromEnv } from "./credential-providers/from-env.ts";
export { fromHttp } from "./credential-providers/from-http.ts";
export { fromInstanceMetadata } from "./credential-providers/from-instance-metadata.ts";
export { fromTemporaryCredentials } from "./credential-providers/from-temporary-credentials.ts";
export { fromWebToken } from "./credential-providers/from-web-token.ts";
