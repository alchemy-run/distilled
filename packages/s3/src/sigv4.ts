/**
 * SigV4 request signing. The signer lives in `@distilled.cloud/aws4signer`
 * so S3-compatible clients (Cloudflare R2, ...) can sign without this SDK;
 * this module re-exports it as `@distilled.cloud/s3/SigV4` (and
 * `@distilled.cloud/aws/SigV4`).
 *
 * Named re-exports: `scripts/bundle-lib.ts` cannot list the names behind an
 * `export *` from another package, so the built facade would export nothing.
 */
export {
  CryptoError,
  guessScope,
  guessServiceRegion,
  InvalidSigningHeaders,
  InvalidSigningUrl,
  presign,
  SigningKeyCache,
  sign,
  signSync,
  signV4a,
  signingPublicKeyV4a,
} from "@distilled.cloud/aws4signer";
export type {
  PresignOptions,
  SignableBody,
  SignedRequest,
  SigningError,
  SigningKey,
  SigningKeyScope,
  SigningKeyStore,
  SignOptions,
  SignV4aOptions,
  WithoutScope,
} from "@distilled.cloud/aws4signer";
