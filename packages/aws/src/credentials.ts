import * as BrowserCredentials from "./credentials.browser.ts";
export * from "./credentials.browser.ts";

import { loadSharedConfigFiles } from "@smithy/shared-ini-file-loader";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import { Auth } from "./auth.ts";
import * as Providers from "./credential-providers/node.ts";
import type * as Region from "./region.ts";

/**
 * The region a node credentials provider authenticated against: the
 * environment first, then the active profile's `region` in `~/.aws/config`
 * — the same order, and the same files, the AWS CLI reads.
 *
 * The profile is only consulted when the environment is silent, so
 * `AWS_REGION` still wins for a one-off override without editing config.
 */
const regionFromEnvOrProfile = BrowserCredentials.regionFromEnv.pipe(
  Effect.catchTag("Alchemy::AWS::MissingRegion", (missing) =>
    Effect.flatMap(
      Effect.tryPromise({
        try: () => loadSharedConfigFiles(),
        catch: () => missing,
      }),
      (files) => {
        const profileName =
          process.env.AWS_PROFILE ??
          process.env.AWS_DEFAULT_PROFILE ??
          "default";
        const region = files.configFile?.[profileName]?.region;
        return region === undefined
          ? Effect.fail(
              new BrowserCredentials.MissingRegion({
                message: missing.message,
                hints: [
                  ...(missing.hints ?? []),
                  `Or set \`region\` on the [profile ${profileName}] section of ~/.aws/config.`,
                ],
              }),
            )
          : Effect.succeed(region as Region.RegionName);
      },
    ),
  ),
);

export const fromEnv = () =>
  BrowserCredentials.createLazyProvider(Providers.fromEnv, "env");

export const fromChain = () =>
  BrowserCredentials.createLazyProvider(
    Providers.fromNodeProviderChain(),
    "chain",
    regionFromEnvOrProfile,
  );

export const fromIni = () =>
  BrowserCredentials.createLazyProvider(
    Providers.fromIni(),
    "ini",
    regionFromEnvOrProfile,
  );

export const fromContainerMetadata = () =>
  BrowserCredentials.createLazyProvider(
    Providers.fromContainerMetadata(),
    "container",
  );

export const fromProcess = () =>
  BrowserCredentials.createLazyProvider(
    Providers.fromProcess(),
    "process",
    regionFromEnvOrProfile,
  );

export const fromTokenFile = () =>
  BrowserCredentials.createLazyProvider(
    Providers.fromTokenFile(),
    "token-file",
  );

/**
 * Create a lazy, cached SSO credentials provider.
 * SSO credential resolution is deferred until the Effect is run,
 * and credentials are cached until they expire.
 */
export const fromSSO = (profileName: string = "default") =>
  Layer.effect(
    BrowserCredentials.Credentials,
    Auth.use((auth) =>
      Effect.succeed(
        BrowserCredentials.createCachedCredentialsEffect(
          // The resolved credentials carry the profile's own region — see
          // `loadProfileCredentials` in auth.ts.
          auth.loadProfileCredentials(profileName),
        ),
      ),
    ),
  );
