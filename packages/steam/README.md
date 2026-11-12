# @distilled.cloud/steam

Effect-native Steam website sign-in using OpenID 2.0. No Steam API key is
required. Returns a verified `SteamId` string and its canonical claimed ID.
Your application owns local accounts, linking policy, and sessions.

## Package scope and upstream sources

This initial package implements [issue #1080](https://github.com/alchemy-run/distilled/issues/1080)
as a handwritten protocol helper, outside `src/services/`. OpenID is a browser
protocol, not a generated Web API operation. There is no fabricated OpenAPI
document, spec mirror, or generation stamp for this handwritten code. Package
placement is an explicit review decision for this PR.

Valve's official [GetSupportedAPIList](https://partner.steamgames.com/doc/webapi/ISteamWebAPIUtil)
is a useful future generation source. A keyless fetch on 2026-11-12 returned
27 interfaces / 63 methods, with HTTP verbs, versions, and request parameters,
but no response schemas. A broader generated Web API SDK needs a pinned mirror
and authoritative response definitions; it is separate from sign-in.

Protocol references:

- [Valve OpenID documentation](https://steamcommunity.com/dev#openid)
- [Steamworks website authentication](https://partner.steamgames.com/doc/features/auth#website)
- [OpenID Authentication 2.0, sections 9–11](https://openid.net/specs/openid-authentication-2_0.html)

## Quick start

```ts
import { Effect, Layer, Redacted } from "effect";
import { AuthenticationStore, SteamOpenId, layer } from "@distilled.cloud/steam";

// Implement the atomic storage contract below using your shared database.
declare const productionStore: typeof AuthenticationStore.Service;

const SteamLive = layer({
  returnTo: "https://app.example/auth/steam/callback",
  realm: "https://app.example/",
}).pipe(Layer.provide(Layer.succeed(AuthenticationStore, productionStore)));

const startLogin = Effect.gen(function* () {
  const steam = yield* SteamOpenId;
  return yield* steam.begin();
});

const login = await Effect.runPromise(startLogin.pipe(Effect.provide(SteamLive)));
// Set browserState in an HttpOnly, Secure, SameSite=Lax cookie, with a 10-minute
// lifetime and a path covering the callback. Redirect to authenticationUrl.
// Unwrap only when writing the cookie / Location header; never log these values.
const location = Redacted.value(login.authenticationUrl);
```

For complete start-login and callback routes, layer wiring, and a runnable Node
HTTP integration, see [examples/server.ts](./examples/server.ts):

```sh
node --experimental-strip-types packages/steam/examples/server.ts
```

Open `http://localhost:3000/auth/steam`. The example uses process-local atomic
storage for demonstration only. It returns verified identity as JSON so it can
be tried without introducing a session framework. Replace the marked application
boundary with local account lookup/creation and session issuance.

In production use an explicitly configured public HTTPS origin, set `Secure`
on the cookie (prefer a `__Host-` cookie with `Path=/`), and disable
`allowLocalHttp`. HTTP is accepted only with that opt-in and a literal localhost,
127.0.0.1, or [::1] hostname. Realm wildcards are unsupported. Realm and callback
must have the same origin; callback paths must begin with the realm path.
Query parameters on the configured callback are preserved and checked.

Behind a reverse proxy, configure the public origin in deployment configuration.
Do not derive it from arbitrary Host / X-Forwarded-* headers. Configure your
HTTP server's trusted proxy allowlist and canonical URL handling independently.
The API accepts GET callbacks only; never merge query and POST assertion fields.

## Verification sequence

1. `begin` generates 256 bits of cryptographic state and registers its expiry.
2. Your route sets the browser cookie and redirects to Steam's fixed endpoint.
3. Steam authenticates the browser and redirects with an assertion.
4. Your callback supplies the actual public callback URL and cookie as Redacted
   values to `SteamOpenId.verify`.
5. Verification rejects duplicate parameters, wrong state/return URL, unsupported
   namespaces/modes, mismatched identities, missing signed fields, and stale or
   future nonces. Only canonical HTTPS Steam identity URLs are accepted.
6. The verifier fetches that identity's XRDS and requires the OpenID 2.0 signon
   service to point to Steam's pinned login endpoint. This deliberately supports
   Steam's current single-service XRDS format, not generic OpenID discovery,
   delegation, aliases, redirects, HTML discovery, or arbitrary providers.
7. It POSTs the received OpenID fields unchanged except `mode=check_authentication`
   to Steam, parses the key-value response strictly, and requires `is_valid:true`.
8. It checks freshness again, then atomically consumes transaction and nonce.
   Only then does it return identity. SteamID never passes through a JS number.
9. Your application issues its own session and clears the login cookie.

HTTP requests use the Effect Fetch client with redirects forbidden, a 64 KiB
body cap, and a per-request timeout (default 10 seconds). Client tracing is
disabled for these requests. There are no automatic retries. You can inject
`FetchHttpClient.Fetch` for a platform fetch adapter; it must honor redirect,
abort, and response-size semantics. No HttpClient layer is needed from callers.

## Production storage contract

`AuthenticationStore` has no default layer. `register` must insert-if-absent
and expire the transaction. `consume` must be a single serializable database
transaction or equivalent atomic operation across **all** application instances:

- Confirm that the transaction exists and its expiry is greater than `now`.
- Confirm that the nonce has not already been consumed for this Steam provider.
- Delete the transaction and insert the nonce with `nonceExpiresAt` together.
- On either rejection, return `transaction` or `replay` without changing storage.
- Use a global unique nonce constraint; do not scope uniqueness to the browser.
- Retain nonce records through `nonceExpiresAt`; expire transactions on their
  registered deadline. Avoid early TTL rounding. Keep server clocks synchronized.
- Return `StoreError` for unavailable/failed storage. Do not pretend it is a
  missing transaction. Store hashed keys if storage access is less trusted.

Nonce replay protection and browser binding solve different problems. The nonce
blocks reuse of a signed assertion. The state cookie binds the login initiation
to the browser and is required even for an otherwise valid assertion.

Default assertion age is five minutes, allowed future skew 30 seconds, and
transaction lifetime ten minutes. All are configurable, with bounded values.
Cancellation, malformed callbacks, and provider rejection leave persisted
transactions to expire; clear the browser cookie and begin a new login.
Transport/timeouts before consumption leave state intact and can be retried
while fresh. An interrupted/failed store call can have an ambiguous commit:
start a new login rather than retrying a possibly consumed transaction. A
successful verification consumes state even if your subsequent session creation
fails. Do not retry session issuance by replaying this callback.

## Failures and application responsibilities

`AuthenticationError.reason` distinguishes configuration, cancellation, provider
errors, malformed assertions, callback mismatch, identity/discovery failures,
rejection, expiry, transaction mismatch, replay, transport, timeout, and entropy
failure. `StoreError` stays separate. Errors contain no raw assertion, signature,
state, transport error object, or provider message. Treat infrastructure failures
as temporary service failures rather than invalid-user responses.

Redact callback query strings in reverse-proxy/access logs, APM, analytics,
exception reporting, and HTTP middleware. Use `Cache-Control: no-store` and
`Referrer-Policy: no-referrer` on authentication routes. Do not log cookies or
Location headers. The library cannot control logging outside its boundary.

Steam sign-in proves control of a Steam identity. It supplies no email, game
ownership, profile, OAuth token, or application session. Profile enrichment is a
separate Web API call with separate redacted credentials and privacy handling;
its failure must not change the verified identity. Linking requires an existing
authenticated local session and explicit linking intent. Do not automatically
link based on display names or other profile fields.

## Validation

Deterministic fixtures use an injected fetch implementation, controllable Effect
clock, and atomic Ref-backed store. Ordinary CI needs no Steam account or key.

```sh
pnpm vitest run packages/steam/test/openid.test.ts packages/core/test/sdks.test.ts
pnpm exec tsrs -b packages/steam/tsconfig.json packages/steam/tsconfig.test.json --noCheck false
pnpm specs:check
```

Optional manual smoke test: run the example, sign in with a personal test
account, confirm the returned SteamID, and try reloading the callback (must
fail). Also cancel at Steam and confirm no local session is created. Never put
account credentials or captured assertions in fixtures or PR evidence.
