# @distilled.cloud/microsoft-graph

Effect-native Microsoft Graph SDK, generated from Microsoft's v1.0 OpenAPI description
([`microsoftgraph/msgraph-metadata` `openapi/v1.0/openapi.yaml`](https://github.com/microsoftgraph/msgraph-metadata/blob/master/openapi/v1.0/openapi.yaml)).

One module per top-level Graph segment: `applications`, `servicePrincipals`, `groups`, `users`,
`directoryRoles`, `roleManagement`, `directory`, and 62 more.

## Installation

```bash
npm install @distilled.cloud/microsoft-graph effect
```

## Quick start

Create an Entra application, its service principal and a client secret, then clean up:

```ts
import { Effect, Layer, Redacted } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Graph from "@distilled.cloud/microsoft-graph";

const program = Effect.gen(function* () {
  const app = yield* Graph.applications.createApplication({ displayName: "my-app" });

  // A new application takes a few seconds to replicate.
  const sp = yield* Graph.servicePrincipals.createServicePrincipal({ appId: app.appId! }).pipe(
    Effect.retry({ while: (e) => e._tag === "NoBackingApplicationObject", times: 10 }),
  );

  const secret = yield* Graph.applications.addPassword({
    applicationId: app.id!,
    passwordCredential: { displayName: "ci" },
  });
  console.log(sp.id, secret.keyId, Redacted.isRedacted(secret.secretText)); // ... true

  const found = yield* Graph.applications.listApplication({ filter: `appId eq '${app.appId}'` });
  console.log(found.value.length); // 1

  yield* Graph.applications.deleteApplication({ applicationId: app.id! });
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Graph.CredentialsFromEnv,
  Graph.MicrosoftGraphProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

## Auth

`Authorization: Bearer <token>` against `https://graph.microsoft.com/v1.0`, with a token for the
scope `https://graph.microsoft.com/.default`. `CredentialsFromEnv` reads:

- `MICROSOFT_GRAPH_BEARER_TOKEN` — a token you already hold; or
- `AZURE_TENANT_ID` + `AZURE_CLIENT_ID` + `AZURE_CLIENT_SECRET` — a service principal. Tokens are
  minted with the OAuth2 client-credentials grant, cached, and refreshed 5 minutes before they
  expire. `AZURE_AUTHORITY_HOST` overrides `https://login.microsoftonline.com`.
- `MICROSOFT_GRAPH_API_BASE_URL` — optional base URL override.

Or build the layer in code:

```ts
Graph.fromClientSecret({ tenantId, clientId, clientSecret: Redacted.make(secret) });
Graph.fromBearerToken({ bearerToken: Redacted.make(token) });
```

## Pagination

List operations follow `@odata.nextLink`:

```ts
const ids = yield* Graph.servicePrincipals.listServicePrincipal
  .items({ top: 100, select: ["id", "appId"] })
  .pipe(Stream.runCollect);
```

A page's `odataNextLink` can also be passed back by hand as `nextLink`; the request then goes to
that URL as-is.

## Errors

Every failure carries Graph's OData error envelope. The SDK types the codes callers handle:

| Tag | Graph code |
| --- | --- |
| `ResourceNotFound` | `Request_ResourceNotFound`, `ResourceNotFound`, `itemNotFound` |
| `AuthorizationRequestDenied` | `Authorization_RequestDenied`, `accessDenied` |
| `InvalidAuthenticationToken` | `InvalidAuthenticationToken` |
| `InvalidRequest` | `Request_BadRequest`, `BadRequest`, `invalidRequest` |
| `UnsupportedQuery` | `Request_UnsupportedQuery` |
| `NoBackingApplicationObject` | detail code under `Request_BadRequest` |
| `MultipleObjectsWithSameKeyValue` | `Request_MultipleObjectsWithSameKeyValue` |
| `ObjectReferenceAlreadyExists` | `Request_BadRequest` "added object references already exist" |
| `DuplicatePropertyValue` | `Request_BadRequest` "property with duplicate values" |
| `ObjectReferenceNotFound` | `Request_BadRequest` "removed object references do not exist" |
| `PasswordCredentialNotFound` | `Request_BadRequest` "No password credential found with keyId" |
| `DirectoryConcurrencyViolation` | `Directory_ConcurrencyViolation` (retried by default) |
| `TokenAcquisitionFailed` | the token endpoint refused the client credentials |

Anything else falls back to the HTTP status classes (`NotFound`, `TooManyRequests`, …) and then
`UnknownMicrosoftGraphError`.

Directory writes replicate asynchronously: right after a create, reads and writes on the new
object can fail with `ResourceNotFound` for a few seconds.

## Spec notes

- Navigation properties (`application.owners`, `user.drive`, …) and discriminator subtype
  mappings are not modeled on entity types; read them through their own operations
  (`applications.listOwners`) or via `expand`, whose results pass through undecoded.
- `$count` and `$search` on directory objects need `consistencyLevel: "eventual"`. Service
  principal members of a group are only listed under it too.
