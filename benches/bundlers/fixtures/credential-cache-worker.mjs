// A Worker whose credential caches live at module scope, so every request in
// the isolate shares them, as a layer built once at module scope does.
// `/<cache>/<name>` resolves the named cache's credentials with the global
// `fetch` (routed to the token Worker), then makes a request of its own, as
// an operation does. The token Worker answers `/slow` after a second, `/hang` never, and
// `/fast` at once. The first fetch of a cache whose name ends in `hang`
// goes to `/hang`. The Azure and Microsoft Graph caches use their public
// client-secret layers against the token Worker's Entra endpoint
// (`/<tenant>/oauth2/v2.0/token`, the same timing), which counts the token
// requests per tenant. Bundled from source: workerd/credential-cache.test.ts.
import * as Effect from "effect/Effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Redacted from "effect/Redacted";
import { createCachedCredentialsEffect } from "../../../packages/aws/src/credentials-service.ts";
import { Credentials as AzureCredentials } from "../../../packages/azure/src/credentials-service.ts";
import { fromClientSecret as azureClientSecret } from "../../../packages/azure/src/credentials.ts";
import { refreshing } from "../../../packages/core/src/token-cache.ts";
import {
  Credentials as GcpCredentials,
  createRefreshingProvider,
} from "../../../packages/gcp/src/credentials-service.ts";
import {
  Credentials as GraphCredentials,
  fromClientSecret as graphClientSecret,
} from "../../../packages/microsoft-graph/src/credentials.ts";

const fetches = {};
const caches = {};

const fetchToken = (key) =>
  Effect.tryPromise({
    try: async () => {
      fetches[key] = (fetches[key] ?? 0) + 1;
      const path = key.endsWith("hang") && fetches[key] === 1 ? "/hang" : "/slow";
      return (await fetch(`http://token${path}`)).text();
    },
    catch: (cause) => new Error(`token fetch failed: ${cause}`),
  });

const makers = {
  core: (key) =>
    refreshing(fetchToken(key), () => Date.now() + 3_600_000, {
      onTimeout: () => new Error("token fetch timed out"),
    }),
  aws: (key) =>
    createCachedCredentialsEffect(
      Effect.map(fetchToken(key), (token) => ({
        accessKeyId: Redacted.make(token),
        secretAccessKey: Redacted.make("secret"),
        region: "us-east-1",
        expiration: Date.now() + 3_600_000,
      })),
    ).pipe(Effect.map((creds) => Redacted.value(creds.accessKeyId))),
  gcp: (key) => {
    const layer = createRefreshingProvider(
      Effect.map(fetchToken(key), (token) => ({
        accessToken: Redacted.make(token),
        expiresAt: Date.now() + 3_600_000,
      })),
    );
    return Effect.gen(function* () {
      return yield* yield* GcpCredentials;
    }).pipe(
      Effect.provide(layer),
      Effect.map((config) => Redacted.value(config.accessToken)),
    );
  },
  azure: (key) => {
    const layer = azureClientSecret({ ...entra(key), subscriptionId: "sub" });
    return Effect.gen(function* () {
      const config = yield* yield* AzureCredentials;
      return yield* config.token("https://management.azure.com/.default");
    }).pipe(
      Effect.provide(layer),
      Effect.map(Redacted.value),
      Effect.tap(() => countEntra(key)),
    );
  },
  graph: (key) => {
    const layer = graphClientSecret(entra(key));
    return Effect.gen(function* () {
      return yield* yield* GraphCredentials;
    }).pipe(
      Effect.provide(layer),
      Effect.provide(FetchHttpClient.layer),
      Effect.map((config) => Redacted.value(config.bearerToken)),
      Effect.tap(() => countEntra(key)),
    );
  },
};

/** Client-secret options whose tenant names the cache, at the token Worker. */
function entra(key) {
  return {
    tenantId: key.replace("/", "-"),
    clientId: "client",
    clientSecret: Redacted.make("secret"),
    authorityHost: "http://token",
  };
}

/** Reads the token Worker's request count for the cache's tenant. */
function countEntra(key) {
  return Effect.tryPromise({
    try: async () => {
      const count = await (await fetch(`http://token/count/${key.replace("/", "-")}`)).text();
      fetches[key] = Number(count);
    },
    catch: (cause) => new Error(`count failed: ${cause}`),
  });
}

export default {
  async fetch(request) {
    const [, cache, name] = new URL(request.url).pathname.split("/");
    const key = `${cache}/${name}`;
    caches[key] ??= makers[cache](key);
    const line = await Effect.runPromise(
      Effect.gen(function* () {
        const token = yield* caches[key];
        const own = yield* Effect.tryPromise({
          try: async () => (await fetch("http://token/fast")).text(),
          catch: (cause) => new Error(`own request failed: ${cause}`),
        });
        return `token=${token} own=${own}`;
      }).pipe(Effect.catchCause((cause) => Effect.succeed(`failed: ${cause}`))),
    );
    return new Response(`${line} fetches=${fetches[key]}`);
  },
};
