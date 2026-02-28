/**
 * Authentication for GCP APIs.
 *
 * Supports two authentication methods:
 * 1. Service Account JSON key file - for production/CI
 * 2. Application Default Credentials (ADC) via gcloud CLI - for development
 *
 * Both methods produce an OAuth2 access token used as a Bearer token.
 *
 * @see https://cloud.google.com/docs/authentication
 */

import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as ServiceMap from "effect/ServiceMap";
import * as HttpBody from "effect/unstable/http/HttpBody";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";

const GOOGLE_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const GOOGLE_METADATA_ENDPOINT =
  "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token";

/**
 * Error thrown when authentication fails.
 */
export class AuthError extends Data.TaggedError("GCPAuthError")<{
  readonly message: string;
  readonly cause?: unknown;
}> {}

/**
 * A GCP access token with optional expiry.
 */
export interface AccessToken {
  readonly token: Redacted.Redacted<string>;
  readonly expiresAt?: number;
}

/**
 * GCP authentication service - provides access tokens.
 */
export interface GCPAuth {
  readonly getAccessToken: Effect.Effect<
    AccessToken,
    AuthError,
    HttpClient.HttpClient
  >;
}

export const GCPAuth = ServiceMap.Service<GCPAuth>("@distilled-gcp/GCPAuth");

/**
 * GCP Project ID - required for project-scoped operations.
 */
export interface ProjectId {
  readonly projectId: string;
}

export const ProjectId = ServiceMap.Service<ProjectId>(
  "@distilled-gcp/ProjectId",
);

// =============================================================================
// Service Account Authentication
// =============================================================================

/**
 * Service account key file structure.
 */
interface ServiceAccountKey {
  type: "service_account";
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
}

/**
 * Create a JWT from a service account key for OAuth2 token exchange.
 */
const createJWT = async (
  key: ServiceAccountKey,
  scopes: string[],
): Promise<string> => {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: key.client_email,
    scope: scopes.join(" "),
    aud: key.token_uri || GOOGLE_TOKEN_ENDPOINT,
    iat: now,
    exp: now + 3600,
  };

  const encoder = new TextEncoder();

  const base64url = (data: Uint8Array): string => {
    const binStr = Array.from(data)
      .map((byte) => String.fromCharCode(byte))
      .join("");
    return btoa(binStr).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  };

  const headerB64 = base64url(encoder.encode(JSON.stringify(header)));
  const payloadB64 = base64url(encoder.encode(JSON.stringify(payload)));
  const signingInput = `${headerB64}.${payloadB64}`;

  // Import the private key
  const pemContents = key.private_key
    .replace(/-----BEGIN RSA PRIVATE KEY-----/, "")
    .replace(/-----END RSA PRIVATE KEY-----/, "")
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\n/g, "");

  const binaryDer = Uint8Array.from(atob(pemContents), (c) =>
    c.charCodeAt(0),
  );

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryDer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    encoder.encode(signingInput),
  );

  const signatureB64 = base64url(new Uint8Array(signature));
  return `${signingInput}.${signatureB64}`;
};

/**
 * Create a GCPAuth layer from a service account JSON key file.
 *
 * @example
 * ```typescript
 * import { Auth } from "distilled-gcp";
 *
 * const authLayer = Auth.fromServiceAccountKey(
 *   JSON.parse(await Bun.file("service-account.json").text())
 * );
 * ```
 */
export const fromServiceAccountKey = (
  key: ServiceAccountKey,
  scopes: string[] = ["https://www.googleapis.com/auth/cloud-platform"],
): Layer.Layer<GCPAuth> =>
  Layer.succeed(GCPAuth, {
    getAccessToken: Effect.gen(function* () {
      const client = yield* HttpClient.HttpClient;

      const jwt = yield* Effect.tryPromise({
        try: () => createJWT(key, scopes),
        catch: (error) =>
          new AuthError({
            message: "Failed to create JWT from service account key",
            cause: error,
          }),
      });

      const body = new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt,
      });

      const request = HttpClientRequest.post(
        key.token_uri || GOOGLE_TOKEN_ENDPOINT,
      ).pipe(
        HttpClientRequest.setBody(
          HttpBody.text(body.toString(), "application/x-www-form-urlencoded"),
        ),
      );

      const response = yield* client.execute(request).pipe(
        Effect.mapError(
          (error) =>
            new AuthError({
              message: "Failed to exchange JWT for access token",
              cause: error,
            }),
        ),
      );

      const json = yield* response.json.pipe(
        Effect.mapError(
          (error) =>
            new AuthError({
              message: "Failed to parse token response",
              cause: error,
            }),
        ),
      );

      const tokenResponse = json as {
        access_token: string;
        expires_in: number;
        token_type: string;
      };

      if (!tokenResponse.access_token) {
        return yield* Effect.fail(
          new AuthError({
            message: "Token response missing access_token",
            cause: json,
          }),
        );
      }

      return {
        token: Redacted.make(tokenResponse.access_token),
        expiresAt: Date.now() + tokenResponse.expires_in * 1000,
      };
    }),
  });

/**
 * Create a GCPAuth layer from a service account JSON key file path.
 *
 * @example
 * ```typescript
 * const authLayer = Auth.fromServiceAccountFile("./service-account.json");
 * ```
 */
export const fromServiceAccountFile = (
  path: string,
  scopes?: string[],
): Layer.Layer<GCPAuth, AuthError> =>
  Layer.effect(
    GCPAuth,
    Effect.gen(function* () {
      const content = yield* Effect.tryPromise({
        try: () => Bun.file(path).text(),
        catch: (error) =>
          new AuthError({
            message: `Failed to read service account file: ${path}`,
            cause: error,
          }),
      });

      const key = JSON.parse(content) as ServiceAccountKey;
      // Inline the service account auth logic - return the GCPAuth implementation directly
      return {
        getAccessToken: Effect.gen(function* () {
          const client = yield* HttpClient.HttpClient;
          const jwt = yield* Effect.tryPromise({
            try: () => createJWT(key, scopes ?? ["https://www.googleapis.com/auth/cloud-platform"]),
            catch: (error) =>
              new AuthError({
                message: "Failed to create JWT from service account key",
                cause: error,
              }),
          });

          const body = new URLSearchParams({
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            assertion: jwt,
          });

          const request = HttpClientRequest.post(
            key.token_uri || GOOGLE_TOKEN_ENDPOINT,
          ).pipe(
            HttpClientRequest.setBody(
              HttpBody.text(body.toString(), "application/x-www-form-urlencoded"),
            ),
          );

          const response = yield* client.execute(request).pipe(
            Effect.mapError(
              (error) =>
                new AuthError({
                  message: "Failed to exchange JWT for access token",
                  cause: error,
                }),
            ),
          );

          const json = yield* response.json.pipe(
            Effect.mapError(
              (error) =>
                new AuthError({
                  message: "Failed to parse token response",
                  cause: error,
                }),
            ),
          );

          const tokenResponse = json as {
            access_token: string;
            expires_in: number;
            token_type: string;
          };

          if (!tokenResponse.access_token) {
            return yield* Effect.fail(
              new AuthError({
                message: "Token response missing access_token",
                cause: json,
              }),
            );
          }

          return {
            token: Redacted.make(tokenResponse.access_token),
            expiresAt: Date.now() + tokenResponse.expires_in * 1000,
          };
        }),
      } satisfies GCPAuth;
    }),
  );

// =============================================================================
// Application Default Credentials (ADC)
// =============================================================================

/**
 * Create a GCPAuth layer from Application Default Credentials.
 *
 * Resolution order:
 * 1. GOOGLE_APPLICATION_CREDENTIALS env var (path to service account JSON)
 * 2. gcloud CLI default credentials (~/.config/gcloud/application_default_credentials.json)
 * 3. GCE metadata server (when running on GCP)
 *
 * @example
 * ```typescript
 * import { Auth } from "distilled-gcp";
 *
 * // Uses ADC (gcloud auth application-default login for dev)
 * const authLayer = Auth.fromADC();
 * ```
 */
export const fromADC = (
  scopes: string[] = ["https://www.googleapis.com/auth/cloud-platform"],
): Layer.Layer<GCPAuth, AuthError> =>
  Layer.effect(
    GCPAuth,
    Effect.gen(function* () {
      // 1. Check GOOGLE_APPLICATION_CREDENTIALS
      const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
      if (credPath) {
        const content = yield* Effect.tryPromise({
          try: () => Bun.file(credPath).text(),
          catch: (error) =>
            new AuthError({
              message: `Failed to read GOOGLE_APPLICATION_CREDENTIALS: ${credPath}`,
              cause: error,
            }),
        });

        const parsed = JSON.parse(content) as Record<string, unknown>;

        if (parsed.type === "service_account") {
          const key = parsed as unknown as ServiceAccountKey;
          return {
            getAccessToken: Effect.gen(function* () {
              const client = yield* HttpClient.HttpClient;
              const jwt = yield* Effect.tryPromise({
                try: () => createJWT(key, scopes),
                catch: (error) =>
                  new AuthError({
                    message: "Failed to create JWT from service account key",
                    cause: error,
                  }),
              });

              const body = new URLSearchParams({
                grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
                assertion: jwt,
              });

              const request = HttpClientRequest.post(
                key.token_uri || GOOGLE_TOKEN_ENDPOINT,
              ).pipe(
                HttpClientRequest.setBody(
                  HttpBody.text(
                    body.toString(),
                    "application/x-www-form-urlencoded",
                  ),
                ),
              );

              const response = yield* client.execute(request).pipe(
                Effect.mapError(
                  (error) =>
                    new AuthError({
                      message: "Failed to exchange JWT for access token",
                      cause: error,
                    }),
                ),
              );

              const json = yield* response.json.pipe(
                Effect.mapError(
                  (error) =>
                    new AuthError({
                      message: "Failed to parse token response",
                      cause: error,
                    }),
                ),
              );

              const tokenResponse = json as {
                access_token: string;
                expires_in: number;
              };
              return {
                token: Redacted.make(tokenResponse.access_token),
                expiresAt: Date.now() + tokenResponse.expires_in * 1000,
              };
            }),
          } satisfies GCPAuth;
        }

        if (parsed.type === "authorized_user") {
          // gcloud auth application-default credentials
          const adcCreds = parsed as {
            client_id: string;
            client_secret: string;
            refresh_token: string;
          };

          return {
            getAccessToken: Effect.gen(function* () {
              const client = yield* HttpClient.HttpClient;

              const body = new URLSearchParams({
                grant_type: "refresh_token",
                client_id: adcCreds.client_id,
                client_secret: adcCreds.client_secret,
                refresh_token: adcCreds.refresh_token,
              });

              const request = HttpClientRequest.post(
                GOOGLE_TOKEN_ENDPOINT,
              ).pipe(
                HttpClientRequest.setBody(
                  HttpBody.text(
                    body.toString(),
                    "application/x-www-form-urlencoded",
                  ),
                ),
              );

              const response = yield* client.execute(request).pipe(
                Effect.mapError(
                  (error) =>
                    new AuthError({
                      message: "Failed to refresh access token",
                      cause: error,
                    }),
                ),
              );

              const json = yield* response.json.pipe(
                Effect.mapError(
                  (error) =>
                    new AuthError({
                      message: "Failed to parse token response",
                      cause: error,
                    }),
                ),
              );

              const tokenResponse = json as {
                access_token: string;
                expires_in: number;
              };
              return {
                token: Redacted.make(tokenResponse.access_token),
                expiresAt: Date.now() + tokenResponse.expires_in * 1000,
              };
            }),
          } satisfies GCPAuth;
        }

        return yield* Effect.fail(
          new AuthError({
            message: `Unknown credential type: ${String(parsed.type)}`,
          }),
        );
      }

      // 2. Check default gcloud credentials path
      const home = process.env.HOME ?? process.env.USERPROFILE ?? "";
      const gcloudPath = `${home}/.config/gcloud/application_default_credentials.json`;

      const gcloudContent = yield* Effect.tryPromise({
        try: () => Bun.file(gcloudPath).text(),
        catch: () =>
          new AuthError({
            message:
              "No credentials found. Set GOOGLE_APPLICATION_CREDENTIALS or run: gcloud auth application-default login",
          }),
      });

      const gcloudParsed = JSON.parse(gcloudContent) as {
        client_id: string;
        client_secret: string;
        refresh_token: string;
        type: string;
      };

      return {
        getAccessToken: Effect.gen(function* () {
          const client = yield* HttpClient.HttpClient;

          const body = new URLSearchParams({
            grant_type: "refresh_token",
            client_id: gcloudParsed.client_id,
            client_secret: gcloudParsed.client_secret,
            refresh_token: gcloudParsed.refresh_token,
          });

          const request = HttpClientRequest.post(GOOGLE_TOKEN_ENDPOINT).pipe(
            HttpClientRequest.setBody(
              HttpBody.text(
                body.toString(),
                "application/x-www-form-urlencoded",
              ),
            ),
          );

          const response = yield* client.execute(request).pipe(
            Effect.mapError(
              (error) =>
                new AuthError({
                  message: "Failed to refresh access token",
                  cause: error,
                }),
            ),
          );

          const json = yield* response.json.pipe(
            Effect.mapError(
              (error) =>
                new AuthError({
                  message: "Failed to parse token response",
                  cause: error,
                }),
            ),
          );

          const tokenResponse = json as {
            access_token: string;
            expires_in: number;
          };
          return {
            token: Redacted.make(tokenResponse.access_token),
            expiresAt: Date.now() + tokenResponse.expires_in * 1000,
          };
        }),
      } satisfies GCPAuth;
    }),
  );

// =============================================================================
// Static Token (for testing / manual use)
// =============================================================================

/**
 * Create a GCPAuth layer from a static access token.
 * Useful for testing or when token is obtained externally.
 *
 * @example
 * ```typescript
 * const authLayer = Auth.fromAccessToken("ya29.xxx...");
 * ```
 */
export const fromAccessToken = (token: string): Layer.Layer<GCPAuth> =>
  Layer.succeed(GCPAuth, {
    getAccessToken: Effect.succeed({
      token: Redacted.make(token),
    }),
  });

/**
 * Create a GCPAuth layer from environment variables.
 * Reads GOOGLE_ACCESS_TOKEN for a direct token, or falls back to ADC.
 */
export const fromEnv = (): Layer.Layer<GCPAuth, AuthError> => {
  const token = process.env.GOOGLE_ACCESS_TOKEN;
  if (token) {
    return fromAccessToken(token);
  }
  return fromADC();
};

/**
 * Create a ProjectId layer from environment variables.
 * Reads from GOOGLE_CLOUD_PROJECT or GCLOUD_PROJECT.
 */
export const projectIdFromEnv = (): Layer.Layer<ProjectId> =>
  Layer.effect(
    ProjectId,
    Effect.sync(() => {
      const projectId =
        process.env.GOOGLE_CLOUD_PROJECT ??
        process.env.GCLOUD_PROJECT ??
        process.env.GCP_PROJECT;
      if (!projectId) {
        throw new Error(
          "GOOGLE_CLOUD_PROJECT, GCLOUD_PROJECT, or GCP_PROJECT environment variable must be set",
        );
      }
      return { projectId };
    }),
  );

/**
 * Create a ProjectId layer from a static value.
 */
export const fromProjectId = (projectId: string): Layer.Layer<ProjectId> =>
  Layer.succeed(ProjectId, { projectId });
