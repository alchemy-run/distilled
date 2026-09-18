# ACME for Effect

`@distilled.cloud/acme` implements the ACME account and certificate lifecycle
with Effect and WebCrypto. Install it alongside `effect`, save this as
`example.ts`, and run `bun example.ts` to read Let's Encrypt's staging directory:

```ts
import * as Acme from "@distilled.cloud/acme";
import * as Effect from "effect/Effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";

const program = Effect.gen(function* () {
  const accountKey = yield* Acme.Jose.generateAccountKey();
  return yield* Acme.acme.getDirectory({}).pipe(
    Effect.provide(Acme.layer({
      directoryUrl: Acme.Directories.LetsEncryptStaging,
      accountKey,
    })),
  );
});

const directory = await Effect.runPromise(
  program.pipe(Effect.provide(FetchHttpClient.layer)),
);
console.log(directory.newOrder);
```

## Authentication

Signed requests use a private JWK (`Redacted<string>`), supporting ES256/P-256
and RS256. Persist your account key securely; do not generate a new key per
issuance. After `acme.newAccount`, supply its `location` as `accountUrl` to
`Acme.layer`. CAs requiring External Account Binding also need
`externalAccountBinding: { keyId, hmacKey }`; `hmacKey` is redacted.

`CredentialsFromEnv` reads `ACME_ACCOUNT_KEY`, `ACME_ACCOUNT_URL`,
`ACME_DIRECTORY_URL`, and the optional `ACME_EAB_KID` / `ACME_EAB_HMAC_KEY` pair.
The default directory is Let's Encrypt **production**; explicitly choose staging
when testing. A staging certificate is not publicly trusted.

## Responses and retries

Operations remain under `Acme.acme` (or the `@distilled.cloud/acme/acme`
subpath). JSON outputs are schema-validated; HEAD nonce, PEM chain, and empty
revocation responses retain their respective output shapes. Parse errors omit
raw bodies and parser diagnostics that could contain secrets.

The protocol retries `badNonce` at most twice, re-signing with the nonce on that
request's rejection. These nonces never enter the shared cache; ordinary nonces
are cached by the full directory URL. Exhausted recovery surfaces
`AcmeBadNonce`, not an indefinitely retryable server fault. Typed rate-limit
errors expose `retryAfter` as an optional Effect `Duration`. Other retries use
the shared SDK policy, configurable through `Acme.Retry`.

Unrecognized problem URNs surface as `UnknownAcmeError` with `type`, `status`,
`detail`, and `subproblems`, plus a redacted body; they are not classified as
server errors merely because their URN is unknown.

## Source and limitations

[`manual-specs/acme.json`](./manual-specs/acme.json) is authored from
[RFC 8555](https://www.rfc-editor.org/rfc/rfc8555), not downloaded or mirrored.
Edit that model and the handwritten protocol, never generated service files.
From this package directory, regenerate with `bun scripts/generate.ts`; format
changed paths with `pnpm exec oxfmt <paths>` from the workspace root.

The SDK covers directory discovery, nonces, accounts, orders, authorizations,
challenge responses, certificate downloads, and revocation. It does not deploy
DNS/HTTP challenges, generate CSRs, schedule renewal, implement account-key
rollover, or implement ACME Renewal Information. Callers own those workflows,
CA terms acceptance, polling limits, and certificate/key storage. Directory
metadata is cached in-process; `resetProtocolCaches` from the `Protocol` subpath
clears directory and nonce caches.
