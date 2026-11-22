/**
 * @distilled.cloud/unifi -- UniFi SDK for Effect.
 *
 * One service per API published at https://developer.ui.com, each generated
 * by `scripts/generate.ts` from the Smithy model that `scripts/convert.ts`
 * converts from Ubiquiti's OpenAPI spec (mirrored at
 * `specs/spec-mirror-unifi/specs/<api>.json`). Everything else in this folder
 * is hand-written.
 *
 * Console-hosted apps run on the console, locally or behind the cloud
 * connector, and take an {@link ApiKey} and a {@link Console}:
 *
 *   - Network (the package root, `Unifi.getSiteOverviewPage`)
 *   - `@distilled.cloud/unifi/protect`
 *   - `@distilled.cloud/unifi/innerspace`
 *
 * Cloud-only APIs are served by `api.ui.com` and take an {@link ApiKey} only:
 *
 *   - `@distilled.cloud/unifi/site_manager`
 *   - `@distilled.cloud/unifi/mobility`
 *   - `@distilled.cloud/unifi/carrier_fabric`
 *
 * @example
 * ```ts
 * import * as Effect from "effect/Effect";
 * import * as Layer from "effect/Layer";
 * import * as FetchHttpClient from "effect/http/FetchHttpClient";
 * import * as Unifi from "@distilled.cloud/unifi";
 *
 * const program = Unifi.getSiteOverviewPage({});
 *
 * program.pipe(
 *   Effect.provide(
 *     Layer.mergeAll(FetchHttpClient.layer, Unifi.CredentialsFromEnv, Unifi.UniFiNetworkProtocol),
 *   ),
 *   Effect.runPromise,
 * );
 * ```
 */
export * from "./credentials.ts";
export * from "./errors.ts";
export * as T from "./traits.ts";
export {
  UniFiNetworkProtocol,
  UniFiProtectProtocol,
  UniFiInnerSpaceProtocol,
  UniFiCloudProtocol,
  type UniFiOpError,
  type UniFiConsoleOpContext,
  type UniFiCloudOpContext,
} from "./protocol.ts";
export { paginateOffset } from "./pagination.ts";
export * as Retry from "./retry.ts";
// The Network service's operations, request/response types and typed errors
// are importable straight off the package root.
export * from "./services/network.ts";
