# Railway GraphQL error contracts

The native GraphQL generator reads the complete mirrored introspection schema,
normalizes it to `.generated-graphql/railway.json`, and applies the RFC 6902
files in this directory in filename order. The compatibility RPC generator
continues to use `patches/railway` and `.generated-specs/railway.json`.

Patch schema coordinates, not generated TypeScript or baked query documents:

```json
{
  "description": "Record the exact live response and why this tag applies to this field",
  "patches": [
    {
      "op": "add",
      "path": "/errors/ServiceUnavailable",
      "value": {
        "description": "The service resolver is temporarily unavailable.",
        "category": "server",
        "retryable": true,
        "matchers": [{ "code": "SERVICE_UNAVAILABLE" }]
      }
    },
    {
      "op": "add",
      "path": "/types/Project/fields/services/errors/-",
      "value": "ServiceUnavailable"
    }
  ]
}
```

The example tag/code above is illustrative. An actual patch must record the
observed code/message and coordinate. Matchers support exact `code`, exact
`message`, and case-sensitive `messageIncludes`. Combine code and message when
Railway reuses `INTERNAL_SERVER_ERROR`. Use `globalErrors` only for errors that
apply throughout the graph, such as token rejection or API throttling. The
same model produces both selected-field error unions and runtime matchers.

Run from the package directory after editing a patch:

```sh
bun scripts/convert-graphql.ts
bun scripts/generate-graphql.ts
pnpm exec oxfmt src/graphql.ts .generated-graphql/railway.json patches/graphql
```

Conversion fails on stale JSON pointers, dangling type references, or unknown
error tags. Generation consumes the committed patched model and requires no
mirror checkout. The initial `00-errors` and `10-field-errors` patches seed
contracts from the previous SDK's documented codes, live-tested message
matchers, and provider lifecycle handling; they are not upstream GraphQL
schema declarations.

## Flywheel evidence

The following contracts were promoted from observed Alchemy lifecycle failures
or read-only probes. Dates refer to the 2026-09-12 UTC verification run unless
noted. A message-only matcher deliberately avoids inventing a code that the
captured log did not contain.

| Patch / generated tag | Schema coordinate | Exact wire matcher or observed value | Interpretation and retry choice |
| --- | --- | --- | --- |
| [20-lifecycle-errors.json](20-lifecycle-errors.json): `RailwayOperationInProgress` | `Mutation.tcpProxyDelete` | Code `INTERNAL_SERVER_ERROR` **and** message contains `operation is already in progress`. Previously observed full message: `Cannot delete TCP proxy: an operation is already in progress`. | Promoted from the existing TCP proxy lifecycle check. An earlier operation blocks deletion; marked retryable conflict. Re-observe the proxy and bound any deletion retry. |
| [20-lifecycle-errors.json](20-lifecycle-errors.json): `RailwayServiceInstanceNotFound` | `Mutation.serviceDomainCreate` | Code `INTERNAL_SERVER_ERROR` **and** exact message `ServiceInstance not found`. | Promoted from the existing service-domain lifecycle check. The service instance may not yet be visible; marked retryable not-found. Observe instance/domain state before another create attempt. |
| [30-custom-domain-create.json](30-custom-domain-create.json): `RailwayCustomDomainCreateFailed` | `Mutation.customDomainCreate` | Exact message `Failed to create custom domain, please try again`; no code required. | The custom-domain lifecycle failed during creation. The aggregate log preserved the message but not the raw envelope. Marked retryable server error; first check whether the domain was created, then bound any retry. The response does not establish a domain restriction or entitlement failure. |
| [40-bigint-wire.json](40-bigint-wire.json): `BigInt` scalar | Scalar `BigInt`, observed at `PrivateNetwork.networkId` | JSON numbers `1538483960` and `3234591130`. | Replaces the legacy string-only mapping with `string \| number`. Numeric serialization is observed; string allowance preserves compatibility with larger integer encodings and is not evidence that Railway returned strings in this probe. Values remain uncoerced. Runtime rejects unsafe/fractional numbers, non-integer strings, and unrelated primitive types. |
| [50-bucket-credentials.json](50-bucket-credentials.json): `RailwayBucketCredentialsNotReady` | `Query.bucketS3Credentials` | Exact message `BucketInstanceCredential not found`; no code required. | Observed immediately after bucket creation. Marked retryable not-found: bounded retries of the read-only credentials query can wait for credentials to appear. This contract is not attached to bucket mutations and does not authorize repeating bucket creation. |
| [60-request-processing.json](60-request-processing.json): `RailwayRequestProcessingError` | Global; the response supplied no field path | Exact message `Problem processing request`. Raw response: HTTP 200, `data: null`, no code/extensions/path, trace ID `5527782523421805956`. | Observed while invoking `enableServiceCdn`, but absence of a path prevents attribution to that field. Nonretryable because the underlying cause remains unknown; preserve the trace and surface the failure. It does not identify entitlement, domain readiness, or an input-validation cause. |

`retryable: true` supplies classification metadata. The native client retries
eligible queries with a bounded policy; it never automatically retries
mutations. Mutation reconcilers must observe cloud state before deciding to
retry, since an error in return-field resolution can follow a successful side
effect.

The pathless processing error has a global **exact-message** contract rather
than a guessed field contract. Its tag names the observed failure while leaving
the underlying cause unknown. Other unmatched pathless responses remain
`UnknownGraphQLError`; selecting a single root does not make a missing path
reliable evidence of where the error originated.

Credential-free fixtures in [`test/graphql.test.ts`](../../test/graphql.test.ts)
preserve the captured response shapes and verify classification scope, trace
retention, scalar representations, and the absence of automatic mutation
retries. The numeric-string BigInt fixture is a compatibility case, explicitly
separate from the observed numeric IDs.
