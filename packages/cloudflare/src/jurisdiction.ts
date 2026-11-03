/**
 * The R2 jurisdiction calls go to, as a layer (like AWS's `Region`).
 *
 * An optional service: no operation lists it in its requirements. The
 * protocol reads it and sends it as the `cf-r2-jurisdiction` header of every
 * operation that takes one, unless the call sets its own `jurisdiction`.
 * `R2.layerS3()` reads it to pick the S3 endpoint. Without it, calls use
 * Cloudflare's default jurisdiction.
 *
 * @example
 * ```ts
 * R2.listBuckets({ accountId }).pipe(Effect.provide(Jurisdiction.of("eu")));
 * ```
 */
import * as Context from "effect/Context";
import * as Layer from "effect/Layer";

export type JurisdictionName = "default" | "eu" | "fedramp" | (string & {});

export class Jurisdiction
  extends /*@__PURE__*/ Context.Service<Jurisdiction, JurisdictionName>()(
    "Cloudflare::Jurisdiction",
  ) {}

/** Send calls in a scope to one jurisdiction, e.g. `Jurisdiction.of("eu")`. */
export const of = (jurisdiction: JurisdictionName) => Layer.succeed(Jurisdiction, jurisdiction);
