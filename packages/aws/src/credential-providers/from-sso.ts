/**
 * Credentials for an IAM Identity Center (SSO) profile.
 */
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import { Auth } from "../auth.ts";
import {
  createCachedCredentialsEffect,
  Credentials,
} from "../credentials-service.ts";

/**
 * Create a lazy, cached SSO credentials provider.
 * SSO credential resolution is deferred until the Effect is run,
 * and credentials are cached until they expire.
 */
export const fromSSO = (profileName: string = "default") =>
  Layer.effect(
    Credentials,
    Auth.use((auth) =>
      Effect.succeed(
        createCachedCredentialsEffect(
          // The resolved credentials carry the profile's own region — see
          // `loadProfileCredentials` in auth.ts.
          auth.loadProfileCredentials(profileName),
        ),
      ),
    ),
  );
