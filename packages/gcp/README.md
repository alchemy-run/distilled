# @distilled.cloud/gcp

Effect-native GCP SDK, generated from Google's Discovery documents. Import a
service module by name and version — the root package is credentials, protocol,
and retry only.

## Installation

```bash
npm install @distilled.cloud/gcp effect
```

## Quick start

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Storage from "@distilled.cloud/gcp/storage_v1";
import { CredentialsFromEnv, GcpProtocol } from "@distilled.cloud/gcp";

const program = Effect.gen(function* () {
  const result = yield* Storage.listBuckets({ project: "acme" });
  return result;
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  CredentialsFromEnv,
  GcpProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

`CredentialsFromEnv` reads `GOOGLE_ACCESS_TOKEN` (required) and
`GOOGLE_PROJECT_ID` (optional). `fromAccessToken` takes the same values
directly.

### Workload identity federation

`fromWorkloadIdentity` authenticates a workload that runs outside Google
Cloud (Vercel, GitHub Actions, AWS, Azure, any OIDC or SAML provider) with no
service account key. It exchanges the platform's token at Google's Security
Token Service, then impersonates a service account if you name one. The
access token is cached and exchanged again five minutes before it expires.

```ts
import { Effect, Layer, Redacted } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import { getVercelOidcToken } from "@vercel/oidc";
import { fromWorkloadIdentity, GcpProtocol } from "@distilled.cloud/gcp";

const Credentials = fromWorkloadIdentity({
  audience:
    "//iam.googleapis.com/projects/123456789/locations/global/workloadIdentityPools/vercel/providers/vercel",
  serviceAccountEmail: "deployer@acme.iam.gserviceaccount.com",
  // An Effect runs again on every exchange, so a short-lived token stays fresh.
  subjectToken: Effect.promise(() => getVercelOidcToken()).pipe(Effect.map(Redacted.make)),
});

const Live = Layer.mergeAll(FetchHttpClient.layer, Credentials, GcpProtocol);
```

- `audience` is the pool provider's resource name, prefixed with
  `//iam.googleapis.com/`. It is the `audience` field of the file that
  `gcloud iam workload-identity-pools create-cred-config` writes.
- Leave out `serviceAccountEmail` to use the federated token directly; the
  pool's principals then need the IAM roles themselves.
- `subjectTokenType` defaults to `urn:ietf:params:oauth:token-type:jwt`.
  Pass `urn:ietf:params:oauth:token-type:saml2` for SAML.
- `scopes` default to `cloud-platform`, and `tokenLifetimeSeconds` to 3600.
- A failed exchange fails the operation with `GCPCredentialsError`.
