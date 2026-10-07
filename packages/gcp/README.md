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

### Application Default Credentials

`fromApplicationDefault` finds credentials the way Google's own libraries
do ([AIP-4110](https://google.aip.dev/auth/4110)), so local deploys need no
service account key:

1. the file `GOOGLE_APPLICATION_CREDENTIALS` names;
2. the login from `gcloud auth application-default login`
   (`~/.config/gcloud/application_default_credentials.json`, or
   `$CLOUDSDK_CONFIG`);
3. the attached service account, when running on Google Cloud.

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import { fromApplicationDefault, GcpProtocol } from "@distilled.cloud/gcp";
import * as Storage from "@distilled.cloud/gcp/storage_v1";

const Live = Layer.mergeAll(FetchHttpClient.layer, fromApplicationDefault(), GcpProtocol);

Storage.listBuckets({ project: "acme" }).pipe(Effect.provide(Live), Effect.runPromise);
```

- **Files it reads:** user logins (`authorized_user`), service account keys
  (`service_account`), workload identity configs (`external_account`, with a
  `file` or `url` token source), and
  `gcloud auth application-default login --impersonate-service-account`
  (`impersonated_service_account`). An `external_account` with an AWS or
  executable token source fails with a message; use `fromWorkloadIdentity`
  for those.
- **Project:** the `project` option, else `GOOGLE_CLOUD_PROJECT`, else the
  file's `project_id` or `quota_project_id`, else the metadata server.
- **Quota project:** the `quotaProject` option, else
  `GOOGLE_CLOUD_QUOTA_PROJECT`, else the file's `quota_project_id`. It is
  sent as `X-Goog-User-Project`; many APIs require it with user credentials.
  Set it with `gcloud auth application-default set-quota-project <project>`.
- Tokens are cached and refreshed five minutes before they expire. A failed
  refresh fails the operation with `GCPCredentialsError`.
- Node, Bun and workers only, since it reads files. The browser entry leaves
  it out.

Each source is also available on its own: `fromAuthorizedUser`
(client id, secret and refresh token), `fromServiceAccountKey` (email and
PEM private key), and `fromMetadataServer`.

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
