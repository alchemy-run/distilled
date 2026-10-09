/**
 * The metadata server (AIP-4115): on Compute Engine, GKE, Cloud Run, Cloud
 * Functions and App Engine, the attached service account's access token
 * and the project id come from `http://metadata.google.internal`.
 */
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import {
  type Credentials,
  createRefreshingProvider,
  type ProviderOverrides,
  type TokenSource,
} from "../credentials-service.ts";
import { oauthToken, requestJson, requestText } from "./oauth.ts";

export interface MetadataServerConfig extends ProviderOverrides {
  /** Scopes to request; by default the token has the instance's scopes. */
  readonly scopes?: ReadonlyArray<string>;
  /** Service account email or alias; defaults to `default`. */
  readonly serviceAccount?: string;
}

/** `GCE_METADATA_HOST` overrides the host, as in Google's own libraries. */
const metadataUrl = (path: string) => {
  const host =
    (typeof process !== "undefined" ? process.env?.GCE_METADATA_HOST : undefined) ??
    "metadata.google.internal";
  return `http://${host}/computeMetadata/v1/${path}`;
};

const metadataRequest = (path: string) =>
  HttpClientRequest.get(metadataUrl(path)).pipe(
    HttpClientRequest.setHeader("Metadata-Flavor", "Google"),
  );

/**
 * Whether a metadata server answers within `timeout`. It must send
 * `Metadata-Flavor: Google`, so another server at that address does not
 * count.
 */
export const isOnGcp = (
  timeout: Duration.Input = Duration.seconds(3),
): Effect.Effect<boolean, never, HttpClient.HttpClient> =>
  requestText("Probing the metadata server", metadataRequest("")).pipe(
    Effect.map(({ headers }) => headers["metadata-flavor"] === "Google"),
    Effect.timeoutOption(timeout),
    Effect.map(Option.getOrElse(() => false)),
    Effect.orElseSucceed(() => false),
  );

/** The token source behind {@link fromMetadataServer}. */
export const metadataServerSource = (config: MetadataServerConfig = {}): TokenSource =>
  Effect.gen(function* () {
    const step = "Fetching an access token from the metadata server";
    const account = encodeURIComponent(config.serviceAccount ?? "default");
    const scopes = config.scopes?.length
      ? `?scopes=${encodeURIComponent(config.scopes.join(","))}`
      : "";
    const issuedAt = Date.now();
    const body = yield* requestJson(
      step,
      metadataRequest(`instance/service-accounts/${account}/token${scopes}`),
    );
    const token = yield* oauthToken(step, body, issuedAt);
    if (config.project !== undefined) return token;
    const project = yield* requestText(
      "Reading the project id from the metadata server",
      metadataRequest("project/project-id"),
    ).pipe(
      Effect.map(({ text }) => text.trim() || undefined),
      Effect.orElseSucceed(() => undefined),
    );
    return { ...token, project };
  });

/**
 * Credentials of the service account attached to the Google Cloud
 * resource the code runs on, refreshed five minutes before each token
 * expires.
 */
export const fromMetadataServer = (config: MetadataServerConfig = {}): Layer.Layer<Credentials> =>
  createRefreshingProvider(metadataServerSource(config), config);
