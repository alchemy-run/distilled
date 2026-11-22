/**
 * Tencent Cloud credentials -- hand-written.
 *
 * The `Credentials` service resolves a {@link Config} per request; the
 * protocol signs every call with it (TC3-HMAC-SHA256, see signer.ts). A key
 * pair is a SecretId and a SecretKey from the CAM API key console
 * (https://console.tencentcloud.com/cam/capi). Temporary credentials from
 * STS add a session token, sent as `X-TC-Token`.
 *
 * {@link CredentialsFromEnv} reads the variables Tencent's own CLI and SDKs
 * read: `TENCENTCLOUD_SECRET_ID`, `TENCENTCLOUD_SECRET_KEY`, and optionally
 * `TENCENTCLOUD_SESSION_TOKEN` and `TENCENTCLOUD_REGION`.
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";

/** API hosts are `<service>.<rootDomain>`, e.g. `cvm.tencentcloudapi.com`. */
export const DEFAULT_ROOT_DOMAIN = "tencentcloudapi.com";

export interface Config {
  /** The SecretId of the API key (it identifies the key; it is not a secret). */
  readonly secretId: string;
  readonly secretKey: Redacted.Redacted<string>;
  /** Session token of temporary (STS) credentials, sent as `X-TC-Token`. */
  readonly sessionToken?: Redacted.Redacted<string>;
  /**
   * Default region (`X-TC-Region`) for calls that set none and run without
   * a `Region` layer. Products that are not regional ignore it.
   */
  readonly region?: string;
  /** Domain the API hosts live under. Default {@link DEFAULT_ROOT_DOMAIN}. */
  readonly rootDomain: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "TencentCloudCredentials",
  ) {}

const envConfig = /*@__PURE__*/ EffectConfig.all({
  secretId: /*@__PURE__*/ EffectConfig.String("TENCENTCLOUD_SECRET_ID"),
  secretKey: /*@__PURE__*/ EffectConfig.Redacted("TENCENTCLOUD_SECRET_KEY"),
  sessionToken: /*@__PURE__*/ EffectConfig.Redacted("TENCENTCLOUD_SESSION_TOKEN").pipe(
    EffectConfig.option,
  ),
  region: /*@__PURE__*/ EffectConfig.String("TENCENTCLOUD_REGION").pipe(EffectConfig.option),
});

/** Credentials from `TENCENTCLOUD_SECRET_ID` / `TENCENTCLOUD_SECRET_KEY` (+ token, region). */
export const CredentialsFromEnv = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ envConfig.pipe(
    /*@__PURE__*/ Effect.mapError(
      () =>
        new ConfigError({
          message:
            "TENCENTCLOUD_SECRET_ID and TENCENTCLOUD_SECRET_KEY environment variables are required",
        }),
    ),
    /*@__PURE__*/ Effect.map(({ secretId, secretKey, sessionToken, region }): Config => ({
      secretId,
      secretKey,
      sessionToken: Option.getOrUndefined(sessionToken),
      region: Option.getOrUndefined(region),
      rootDomain: DEFAULT_ROOT_DOMAIN,
    })),
  ),
);

/** Credentials from a key pair (and optional session token, region and root domain). */
export const credentials = (config: {
  readonly secretId: string;
  readonly secretKey: Redacted.Redacted<string>;
  readonly sessionToken?: Redacted.Redacted<string>;
  readonly region?: string;
  readonly rootDomain?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      secretId: config.secretId,
      secretKey: config.secretKey,
      sessionToken: config.sessionToken,
      region: config.region,
      rootDomain: config.rootDomain ?? DEFAULT_ROOT_DOMAIN,
    }),
  );
