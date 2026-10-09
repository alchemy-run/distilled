# ZeroSSL for Effect

`@distilled.cloud/zerossl` provides ZeroSSL's External Account Binding (EAB)
credential endpoint. Install it alongside `effect`, set `ZEROSSL_ACCESS_KEY`,
save this as `example.ts`, and run `node example.ts`:

```ts
import * as ZeroSsl from "@distilled.cloud/zerossl";
import * as Effect from "effect/Effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";

const eab = await Effect.runPromise(
  ZeroSsl.zerossl.generateEabCredentials({}).pipe(
    Effect.provide(ZeroSsl.CredentialsFromEnv),
    Effect.provide(FetchHttpClient.layer),
  ),
);
console.log({ success: eab.success });
// Store eab.eab_kid and the redacted eab.eab_hmac_key securely.
```

This makes a real credential-generation request. EAB credentials are reusable
and subject to daily limits; generate once and retain the pair rather than
running the example for every certificate.

## Authentication and outputs

`CredentialsFromEnv` reads `ZEROSSL_ACCESS_KEY`, falling back to `ZERO_SSL_KEY`.
`ZeroSsl.layer({ accessKey, apiBaseUrl })` accepts explicit credentials with a
redacted access key. Requests use `Authorization: ApiKey <key>`, not a query
parameter, following the [current REST authentication guidance](https://zerossl.com/documentation/api/).
Header-only authentication is supported by `POST /acme/eab-credentials`.

The service remains `ZeroSsl.zerossl.generateEabCredentials` (also available
from `@distilled.cloud/zerossl/zerossl`). Its HMAC output is
`Redacted<string>`, matching the runtime value. `success` remains boolean;
the protocol also normalizes the EAB documentation's numeric `1`/`0` form.
JSON outputs are schema-validated before sensitive values are wrapped.
`ZeroSslParseError` omits raw bodies and potentially secret-bearing parser
errors. Typed rate-limit errors retain `Retry-After` as an optional Effect
`Duration`, including when ZeroSSL sends an error envelope with HTTP 200.

## Source and limitations

`scripts/convert.ts` builds the Smithy model from the ZeroSSL API reference,
which ZeroSSL publishes as Markdown in
[zerossl/documentation](https://github.com/zerossl/documentation) and the spec
mirror `specs/spec-mirror-zerossl` snapshots daily: one page per endpoint
(method, URL, parameter table, example response) plus the error-code tables.
What the reference does not state lives in `patches/`. Edit the converter,
patches and handwritten protocol, not generated service files; regenerate with
`pnpm generate zerossl` from the workspace root.

Only EAB credential generation is modeled, not ZeroSSL's certificate-management
REST API. Certificate issuance uses `@distilled.cloud/acme` with the ZeroSSL
directory and `externalAccountBinding: { keyId: eab.eab_kid, hmacKey: eab.eab_hmac_key }`.
Callers own challenge solving, renewal, and secure credential storage. Retry
behavior uses the shared SDK policy and can be configured via `ZeroSsl.Retry`.
