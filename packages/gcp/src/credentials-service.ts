/**
 * The `Credentials` service every GCP operation authenticates with. It holds
 * an effect that resolves an OAuth2 bearer access token on every request,
 * so a provider can refresh or rotate the token. Each provider under
 * `credential-providers/` builds its layer from this module.
 */
import * as Context from "effect/Context";
import type * as Effect from "effect/Effect";
import type * as Redacted from "effect/Redacted";
import type { GCPCredentialsError } from "./errors.ts";

export interface Config {
  readonly accessToken: Redacted.Redacted<string>;
  readonly project?: string;
  /**
   * Default region that comes with the credentials (e.g. a profile's
   * region). `Region` overrides it; see `./region.ts`.
   */
  readonly region?: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config, GCPCredentialsError>
>()("GCPCredentials") {}
