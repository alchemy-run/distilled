# @distilled.cloud/technitium

Effect-native SDK for the [Technitium DNS Server](https://technitium.com/dns/) HTTP API, generated
from the structure of Technitium's API documentation
([`APIDOCS.md`](https://github.com/TechnitiumSoftware/DnsServer/blob/v15.5.0/APIDOCS.md)) and its
server's request handlers at release v15.5.0: 127 operations in 13 modules.

## Installation

```bash
npm install @distilled.cloud/technitium effect
```

## Quick start

This program prints every record of a zone:

```ts
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Technitium from "@distilled.cloud/technitium";

const program = Effect.gen(function* () {
  const { records = [] } = yield* Technitium.zones.getRecords({
    zone: "homelab.example.com",
    domain: "homelab.example.com",
    listZone: true,
  });
  for (const record of records) console.log(record.name, record.type, record.ttl);
});

const Live = Layer.mergeAll(
  FetchHttpClient.layer,
  Technitium.CredentialsFromEnv,
  Technitium.TechnitiumProtocol,
);

program.pipe(Effect.provide(Live), Effect.runPromise);
```

Operations are grouped by the first path segment after `/api`: `zones`, `settings`, `admin`,
`dhcp`, `user`, `apps`, `allowed`, `blocked`, `cache`, `dashboard`, `dnsClient`, `logs` and
`status`. Their names come from the section headings of `APIDOCS.md`: `Add Record` becomes
`zones.addRecord`. Each operation's doc comment names its path and the permissions it needs.

## Auth

Required: `TECHNITIUM_API_TOKEN` and `TECHNITIUM_API_URL`. The token is sent as
`Authorization: Bearer <token>`, never as a query or form parameter. There is no default host,
since every server is self-hosted.

`TECHNITIUM_API_URL` is the origin of the web service, such as `https://dns.example.com:53443`. It
must use HTTPS and have no path, query or credentials. Plain HTTP is accepted only for
`127.0.0.1`, `localhost` and `[::1]`, for a local server or an SSH tunnel. Anything else fails
with `ConfigError`.

To pass the values in code, use
`Technitium.fromApiToken({ apiToken: Redacted.make(token), apiUrl })`.

A token has the permissions of its user. Create API tokens with `user.createApiToken` or, for
another user, `admin.createApiToken`, for a user that has only the permissions it needs.

## Requests, responses and errors

Every call is a `POST` with a form-encoded body, so parameters such as passwords stay out of URLs
and access logs. Parameter types come from the server's request handlers, and enum values from
the documentation. Passwords, tokens, TSIG and SSO secrets, private keys and the 2FA secret are
sensitive: inputs accept strings or `Redacted` values, and outputs are `Redacted`.

Response types come from the documentation's example responses. Their members are optional unless
a patch marks them required. The patches add the members of records, of their record data
(`rData`) for every record type and of zone summaries that the examples lack, for `zones` and for
the record lists of `allowed`, `blocked` and `cache`. In record data, `flags` and `protocol` are a
string or a number, depending on the record type.

Technitium answers HTTP 200 for failed calls and reports the outcome in its envelope's `status`:

| Technitium response                      | Error                    |
| ---------------------------------------- | ------------------------ |
| `status: "error"`                        | `TechnitiumError`        |
| `status: "error"`, `Access was denied.`  | `Forbidden`              |
| `status: "invalid-token"`                | `Unauthorized`           |
| `status: "2fa-required"`                 | `TwoFactorAuthRequired`  |
| Not JSON, or an unknown `status`         | `UnknownTechnitiumError` |

HTTP client errors keep only the method and URL of the failed request: the `Authorization` header
and the form body are removed, so neither the token nor a password reaches a log. Operations are
not retried, because replaying a write could apply it twice.

## Limits

- 12 documented calls transfer files and are not generated: `zones/import`, `zones/export`,
  `allowed/export`, `blocked/export`, `apps/install`, `apps/update`, `settings/backup`,
  `settings/restore`, `dashboard/metrics/text`, `admin/cluster/primary/transferConfig`,
  `logs/download` and `logs/export`.
- 6 routes of the server are not documented and not generated: `admin/ldap/get`,
  `admin/ldap/set`, `admin/ldap/test`, `sso/status`,
  `zones/dnssec/properties/generatePrivateKey` and `zones/dnssec/properties/activateKskDnsKey`.

## Specs

Technitium's documentation and source are GPL-3.0. The spec mirror
([`spec-mirror-technitium`](https://github.com/distilled-mirror/spec-mirror-technitium)) holds
only the structure of the API, which its fetch script extracts at a pinned release: paths,
permission names, parameter and member names, types, enum values and section headings. It holds
no Technitium text and no example values.
