/**
 * The `com.distilled.telemetry#service` trait's `hosts`: facts for requests
 * to S3-compatible hosts such as Cloudflare R2. Generated code imports this
 * only where a trait has one (S3). See
 * `packages/dev/src/codegen/telemetry-traits.md`.
 */
import type { RequestHook } from "./telemetry.ts";

/** Facts for requests to a host ending in `suffix`. */
export interface HostRule {
  /** Host suffix, with its leading dot (`.r2.cloudflarestorage.com`). */
  readonly suffix: string;
  readonly attributes?: Readonly<Record<string, string | number | boolean>>;
  /** Attribute that gets the host label just before the suffix (the account id). */
  readonly hostLabel?: string;
  /** Attribute values copied under a second name: `{ "aws.s3.bucket": "cloudflare.r2.bucket" }`. */
  readonly copy?: Readonly<Record<string, string>>;
}

/**
 * Facts recorded when a request goes to a matching host: an S3-compatible
 * service such as Cloudflare R2 reached through the S3 SDK.
 */
export const hostRules =
  (rules: ReadonlyArray<HostRule>): RequestHook =>
  (host, span, set) => {
    for (const rule of rules) {
      if (!host.endsWith(rule.suffix)) continue;
      for (const key in rule.attributes) set(key, rule.attributes[key]);
      if (rule.hostLabel !== undefined) {
        const prefix = host.slice(0, host.length - rule.suffix.length);
        if (prefix.length > 0) set(rule.hostLabel, prefix.slice(prefix.lastIndexOf(".") + 1));
      }
      for (const from in rule.copy) {
        const value = span.attributes.get(from);
        if (value !== undefined) set(rule.copy[from]!, value);
      }
    }
  };
