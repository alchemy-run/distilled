---
title: Registrar
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Registrar

Registrar API for searching, checking, registering, and managing domains through Cloudflare Registrar.

## Prerequisites

Before using this API, ensure:

1. **Cloudflare account** — the caller must have a valid Cloudflare account.
2. **Billing profile** — the account must have a billing profile with a valid, current default payment method (credit card or other accepted method). This cannot be set up via API — the account owner must configure billing at `https://dash.cloudflare.com/{account_id}/billing/payment-info` before calling `POST /registrations`.
3. **API authentication** — use an API token or API key with the appropriate Registrar permissions for the operations you are calling.

## Terminology: domain extension

Throughout this API, “extension” refers to the domain extension part of a fully qualified domain name — the portion after the registrable label. For example, in `example.co.uk`, the extension is `co.uk` (not just `uk`). This covers both top-level domains like `com` and multi-level extensions like `co.uk`. This is distinct from other uses of the word “extension” (e.g., EPP extensions).

## Supported extensions

This API supports programmatic registration for all extensions supported by the dashboard experience, with the following exceptions:

`giving`, `mom`, `inc`, `lol`, `sh`, `link`, `cc`, `new`

Cloudflare Registrar supports 400+ extensions in the dashboard. Extensions listed above can be registered at `https://dash.cloudflare.com/{account_id}/domains/registrations`.

## Typical workflow

1. **Search** — call `GET /domain-search?q={keyword}` to discover available domains.
2. **Check** — call `POST /domain-check` with candidate domains to verify real-time availability and pricing.
3. **Review the response** — if `registrable: false`, inspect `reason` to understand whether the domain is unavailable, the extension is not supported by this API, the extension is not supported by Cloudflare Registrar at all, or the extension’s registry has frozen new registrations.
4. **Handle premium domains** — if `tier: premium`, premium registration is not currently supported by this API. Surface the premium pricing to the user, but do not proceed to `POST /registrations` for that domain.
5. **Observe the registration schema** — call `GET /extensions/:extension_name` to discover the required values for registering this extension.
6. **Register** — call `POST /registrations` with the chosen domain name for supported non-premium registrations.
7. **Confirm completion** — if the response is `201 Created`, registration completed within the default timeout and no polling is needed.
8. **Poll when needed** — if the response is `202 Accepted`, poll `links.self` from the workflow response.
9. **Stop for user action** — if `state: action_required`, stop polling and surface `context.action` to the user. The workflow will not resolve on its own.
10. **Continue when blocked** — if `state: blocked`, continue polling and inform the user that a third party, such as the extension registry or losing registrar, is delaying progress.
11. **Review failures before retrying** — if `state: failed`, review `error.code` and `error.message`, then decide whether user action or a new Check call is needed.

**All successful domain registrations are non-refundable.** Once the registration workflow completes with `state: succeeded`, the charge cannot be reversed. Confirm pricing and domain choice with the user before calling `POST /registrations`.

## Default behavior for mutating operations

By default, mutating operations such as create and update hold the connection for a bounded, server-defined amount of time while the operation completes. In most cases, the response contains a completed workflow status and no polling is required.

- **Completed within the synchronous wait window:** Returns `201` (create) or `200` (update) with a `workflow_status` where `state: succeeded` and `completed: true`.
- **Still processing after the synchronous wait window:** Returns `202 Accepted` with a `workflow_status` where `completed: false`. Use the `links.self` URL to poll for completion.

## Non-blocking mode

To receive an immediate `202 Accepted` response without waiting, send the `Prefer: respond-async` request header (RFC 7240). The server will acknowledge it with a `Preference-Applied: respond-async` response header.

## Polling

When the response is `202`, poll the workflow status endpoint indicated by `links.self` in the response body until the workflow reaches a terminal state or requires user action.

##### [Search for available domains](https://developers.cloudflare.com/api/resources/registrar/methods/search)

GET/accounts/{account\_id}/registrar/domain-search

##### [Check domain availability](https://developers.cloudflare.com/api/resources/registrar/methods/check)

POST/accounts/{account\_id}/registrar/domain-check

##### ModelsExpand Collapse

<details>

<summary>

Registration object {auto\_renew, created\_at, domain\_name, 4 more }

A domain registration resource representing the current state of a registered domain.

</summary>

auto\_renew: boolean

Whether automatic renewal occurs before expiration.

<a href="#">Link to this property</a>

created\_at: string

When the domain was registered. Present when the registration resource exists.

formatdate-time

<a href="#">Link to this property</a>

domain\_name: string

Provides a fully qualified domain name (FQDN), including the extension (e.g., <code>example.com</code>, <code>mybrand.app</code>). The domain name uniquely identifies a registration. Cloudflare permits only one registration per domain, making the domain name a natural idempotency key for registration requests.

<a href="#">Link to this property</a>

expires\_at: string

When the domain registration expires. Ready registrations include this value; only <code>registration_pending</code> may return null.

formatdate-time

<a href="#">Link to this property</a>

locked: boolean

Whether the domain is locked for transfer.

<a href="#">Link to this property</a>

<details>

<summary>

privacy\_mode: "off"or "redaction"

Current WHOIS privacy mode for the registration.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"redaction"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: "active"or "registration\_pending"or "expired"or 3 more

Current registration status.

- <code>active</code>: The domain operates with an active registration.
- <code>registration_pending</code>: Registration remains in progress.
- <code>expired</code>: The domain registration expired.
- <code>suspended</code>: The registry suspended the domain.
- <code>redemption_period</code>: The domain entered the redemption grace period.
- <code>pending_delete</code>: The registry scheduled the domain for deletion.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"registration\_pending"

<a href="#">Link to this property</a>

"expired"

<a href="#">Link to this property</a>

"suspended"

<a href="#">Link to this property</a>

"redemption\_period"

<a href="#">Link to this property</a>

"pending\_delete"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar%20%3E%20(model)%20registration%20%3E%20(schema)>)

<details>

<summary>

WorkflowStatus object {completed, created\_at, links, 4 more }

Status of an async registration workflow.

</summary>

completed: boolean

Indicates whether the workflow reached a terminal state. A <code>succeeded</code> or <code>failed</code> state returns <code>true</code>; <code>pending</code>, <code>in_progress</code>, <code>action_required</code>, and <code>blocked</code> return <code>false</code>.

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

links: object {self, resource }

</summary>

self: string

URL to this status resource.

<a href="#">Link to this property</a>

resource: optional string

URL to the domain resource.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

state: "pending"or "in\_progress"or "action\_required"or 3 more

Describes the workflow lifecycle state.

- <code>pending</code>: The workflow awaits processing.
- <code>in_progress</code>: Processing started. Continue polling <code>links.self</code>. An internal deadline limits the duration of this state.
- <code>action_required</code>: The workflow pauses for user action. See <code>context.action</code> for details. Stop automated polling until the user completes the required action.
- <code>blocked</code>: A third party, such as the domain extension’s registry or a losing registrar, prevents progress. Continue polling because the block may resolve when the third party responds.
- <code>succeeded</code>: Terminal state. The operation completed successfully. <code>completed</code> equals <code>true</code>. For registrations, <code>context.registration</code> contains the resulting registration resource.
- <code>failed</code>: Terminal state. The operation failed. <code>completed</code> equals <code>true</code>. See <code>error.code</code> and <code>error.message</code> for the reason. Require user review before retrying.

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"in\_progress"

<a href="#">Link to this property</a>

"action\_required"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"succeeded"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

context: optional map\[unknown]

Provides workflow-specific data.

For domain-centric workflows, <code>context.domain_name</code> identifies the workflow subject.

<a href="#">Link to this property</a>

<details>

<summary>

error: optional object {code, message }

Provides error details when a workflow reaches the <code>failed</code> state. The workflow type (registration, update, etc.) and underlying registry response determine the specific codes and messages. Workflow error codes differ from immediate HTTP error <code>errors[].code</code> values in non-2xx responses. Surface <code>error.message</code> to the user for context.

</summary>

code: string

Machine-readable error code identifying the failure reason.

<a href="#">Link to this property</a>

message: string

Human-readable explanation of the failure. May include registry-specific details.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar%20%3E%20(model)%20workflow_status%20%3E%20(schema)>)

<details>

<summary>

RegistrarSearchResponse object {domains }

Contains the search results.

</summary>

<details>

<summary>

domains: array of object {name, registrable, pricing, 2 more }

Lists domain suggestions in relevance order. An empty array indicates that the search criteria matched zero domains.

</summary>

name: string

The fully qualified domain name (FQDN) in punycode format for internationalized domain names (IDNs).

<a href="#">Link to this property</a>

registrable: boolean

Indicates domain availability according to potentially stale, non-authoritative search data.

- <code>true</code>: The domain appears available. Use POST /domain-check to confirm before registration.
- <code>false</code>: Search results mark the domain ineligible for registration through this API. See <code>reason</code> for details.

<a href="#">Link to this property</a>

<details>

<summary>

pricing: optional object {currency, registration\_cost, renewal\_cost }

Provides annual pricing information for a registrable domain. This object appears only when <code>registrable</code> is <code>true</code>. The API returns all per-year prices as strings to preserve decimal precision.

<code>registration_cost</code> and <code>renewal_cost</code> frequently have the same value, but may differ, especially when registries set different premium rates for initial registration and renewal. For a multi-year registration (e.g., 4 years), <code>registration_cost</code> applies to the first year and <code>renewal_cost</code> applies to each subsequent year. The values reflect the current registry rate, which may change over time. Search and Check may surface premium pricing, but this API currently supports standard registrations only.

</summary>

currency: string

ISO-4217 currency code for the prices (e.g., “USD”, “EUR”, “GBP”).

<a href="#">Link to this property</a>

registration\_cost: string

The first-year cost to register this domain. For premium domains (<code>tier: premium</code>), the registry sets this price, which may significantly exceed standard pricing. For multi-year registrations, this cost applies to the first year only; <code>renewal_cost</code> applies to subsequent years.

<a href="#">Link to this property</a>

renewal\_cost: string

Per-year renewal cost for this domain. Applied to each year beyond the first year of a multi-year registration, and to each annual auto-renewal thereafter. May differ from <code>registration_cost</code>, especially for premium domains where initial registration often costs more than renewals.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

reason: optional "extension\_not\_supported\_via\_api"or "extension\_not\_supported"or "extension\_disallows\_registration"or 2 more

Appears only when <code>registrable</code> is <code>false</code> and explains the advisory search result. Use POST /domain-check for authoritative status.

- <code>extension_not_supported_via_api</code>: Cloudflare Registrar supports this extension in the dashboard but currently excludes it from programmatic registration through this API.
- <code>extension_not_supported</code>: Cloudflare Registrar excludes this extension entirely.
- <code>extension_disallows_registration</code>: The extension’s registry temporarily or permanently freezes new registrations.
- <code>domain_premium</code>: The domain carries premium pricing. This API currently supports standard registrations only.
- <code>domain_unavailable</code>: The domain appears unavailable.

</summary>

One of the following:

"extension\_not\_supported\_via\_api"

<a href="#">Link to this property</a>

"extension\_not\_supported"

<a href="#">Link to this property</a>

"extension\_disallows\_registration"

<a href="#">Link to this property</a>

"domain\_premium"

<a href="#">Link to this property</a>

"domain\_unavailable"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tier: optional "standard"or "premium"

The pricing tier for this domain. A <code>registrable</code> value of <code>true</code> always includes this field, which defaults to <code>standard</code> for most domains. A <code>registrable</code> value of <code>false</code> may omit it.

- <code>standard</code>: Standard registry pricing.
- <code>premium</code>: Premium domain with higher pricing from the registry.

</summary>

One of the following:

"standard"

<a href="#">Link to this property</a>

"premium"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar%20%3E%20(model)%20registrar_search_response%20%3E%20(schema)>)

<details>

<summary>

RegistrarCheckResponse object {domains }

Contains the availability check results.

</summary>

<details>

<summary>

domains: array of object {name, registrable, pricing, 2 more }

Array of domain availability results. Results for unsupported extensions contain <code>registrable: false</code> and a <code>reason</code> field. The response may omit malformed domain names.

</summary>

name: string

The fully qualified domain name (FQDN) in punycode format for internationalized domain names (IDNs).

<a href="#">Link to this property</a>

registrable: boolean

Indicates programmatic registration eligibility according to a real-time registry check.

- <code>true</code>: The domain is available for registration. The response includes the <code>pricing</code> object.
- <code>false</code>: A restriction prevents registration. See the <code>reason</code> field for details. Some results, such as premium domains, may still include <code>tier</code>.

<a href="#">Link to this property</a>

<details>

<summary>

pricing: optional object {currency, registration\_cost, renewal\_cost }

Provides annual pricing information for a registrable domain. This object appears only when <code>registrable</code> is <code>true</code>. The API returns all per-year prices as strings to preserve decimal precision.

<code>registration_cost</code> and <code>renewal_cost</code> frequently have the same value, but may differ, especially when registries set different premium rates for initial registration and renewal. For a multi-year registration (e.g., 4 years), <code>registration_cost</code> applies to the first year and <code>renewal_cost</code> applies to each subsequent year. The values reflect the current registry rate, which may change over time. Search and Check may surface premium pricing, but this API currently supports standard registrations only.

</summary>

currency: string

ISO-4217 currency code for the prices (e.g., “USD”, “EUR”, “GBP”).

<a href="#">Link to this property</a>

registration\_cost: string

The first-year cost to register this domain. For premium domains (<code>tier: premium</code>), the registry sets this price, which may significantly exceed standard pricing. For multi-year registrations, this cost applies to the first year only; <code>renewal_cost</code> applies to subsequent years.

<a href="#">Link to this property</a>

renewal\_cost: string

Per-year renewal cost for this domain. Applied to each year beyond the first year of a multi-year registration, and to each annual auto-renewal thereafter. May differ from <code>registration_cost</code>, especially for premium domains where initial registration often costs more than renewals.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

reason: optional "extension\_not\_supported\_via\_api"or "extension\_not\_supported"or "extension\_disallows\_registration"or 2 more

Appears only when <code>registrable</code> is <code>false</code> and explains the result.

- <code>extension_not_supported_via_api</code>: Cloudflare Registrar supports this extension in the dashboard but currently excludes it from programmatic registration through this API. The user can register via <code>https://dash.cloudflare.com/{account_id}/domains/registrations</code>.
- <code>extension_not_supported</code>: Cloudflare Registrar excludes this extension entirely.
- <code>extension_disallows_registration</code>: The extension’s registry temporarily or permanently freezes new registrations. Registrars currently cannot register domains on this extension.
- <code>domain_premium</code>: The domain carries premium pricing. This API currently supports standard registrations only.
- <code>domain_unavailable</code>: An existing registration, reservation, or other registry restriction makes the domain unavailable on a supported extension.

</summary>

One of the following:

"extension\_not\_supported\_via\_api"

<a href="#">Link to this property</a>

"extension\_not\_supported"

<a href="#">Link to this property</a>

"extension\_disallows\_registration"

<a href="#">Link to this property</a>

"domain\_premium"

<a href="#">Link to this property</a>

"domain\_unavailable"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tier: optional "standard"or "premium"

The pricing tier for this domain. A <code>registrable</code> value of <code>true</code> always includes this field, which defaults to <code>standard</code> for most domains. A <code>registrable</code> value of <code>false</code> may omit it.

- <code>standard</code>: Standard registry pricing.
- <code>premium</code>: Premium domain with higher pricing from the registry.

</summary>

One of the following:

"standard"

<a href="#">Link to this property</a>

"premium"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar%20%3E%20(model)%20registrar_check_response%20%3E%20(schema)>)

#### RegistrarDomains

##### [List domains](https://developers.cloudflare.com/api/resources/registrar/subresources/domains/methods/list)

Deprecated

GET/accounts/{account\_id}/registrar/domains

##### [Get domain](https://developers.cloudflare.com/api/resources/registrar/subresources/domains/methods/get)

Deprecated

GET/accounts/{account\_id}/registrar/domains/{domain\_name}

##### [Update domain](https://developers.cloudflare.com/api/resources/registrar/subresources/domains/methods/update)

Deprecated

PUT/accounts/{account\_id}/registrar/domains/{domain\_name}

##### ModelsExpand Collapse

<details>

<summary>

Domain object {id, available, can\_register, 9 more }

</summary>

id: optional string

Domain identifier.

maxLength32

<a href="#">Link to this property</a>

available: optional boolean

Shows if a domain is available for transferring into Cloudflare Registrar.

<a href="#">Link to this property</a>

can\_register: optional boolean

Indicates eligibility to register the domain as a new domain.

<a href="#">Link to this property</a>

created\_at: optional string

Shows time of creation.

formatdate-time

<a href="#">Link to this property</a>

current\_registrar: optional string

Shows name of current registrar.

<a href="#">Link to this property</a>

expires\_at: optional string

Shows when domain name registration expires.

formatdate-time

<a href="#">Link to this property</a>

locked: optional boolean

Shows whether a registrar lock is in place for a domain.

<a href="#">Link to this property</a>

<details>

<summary>

registrant\_contact: optional object {address, city, country, 10 more }

Shows contact information for domain registrant.

</summary>

address: string

Address.

<a href="#">Link to this property</a>

city: string

City.

<a href="#">Link to this property</a>

country: string

The country in which the user lives.

maxLength30

<a href="#">Link to this property</a>

first\_name: string

User’s first name.

maxLength60

<a href="#">Link to this property</a>

last\_name: string

User’s last name.

maxLength60

<a href="#">Link to this property</a>

organization: string

Name of organization.

<a href="#">Link to this property</a>

phone: string

User’s telephone number.

maxLength20

<a href="#">Link to this property</a>

state: string

State.

<a href="#">Link to this property</a>

zip: string

The zipcode or postal code where the user lives.

maxLength20

<a href="#">Link to this property</a>

id: optional string

Contact Identifier.

maxLength32

<a href="#">Link to this property</a>

address2: optional string

Optional address line for unit, floor, suite, etc.

<a href="#">Link to this property</a>

email: optional string

The contact email address of the user.

maxLength90

<a href="#">Link to this property</a>

fax: optional string

Contact fax number.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

registry\_statuses: optional string

A comma-separated list of registry status codes. Refer to <a href="https://www.icann.org/resources/pages/epp-status-codes-2014-06-16-en">EPP Status Codes</a> for the full list.

<a href="#">Link to this property</a>

supported\_tld: optional boolean

Indicates whether Cloudflare Registrar currently supports a particular TLD. Refer to <a href="https://www.cloudflare.com/tld-policies/">TLD Policies</a> for a list of supported TLDs.

<a href="#">Link to this property</a>

<details>

<summary>

transfer\_in: optional object {accept\_foa, approve\_transfer, can\_cancel\_transfer, 3 more }

Statuses for domain transfers into Cloudflare Registrar.

</summary>

<details>

<summary>

accept\_foa: optional "needed"or "ok"

Status of the registrant authorization step.

</summary>

One of the following:

"needed"

<a href="#">Link to this property</a>

"ok"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

approve\_transfer: optional "needed"or "ok"or "pending"or 3 more

Status of the registry transfer-approval step.

</summary>

One of the following:

"needed"

<a href="#">Link to this property</a>

"ok"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"trying"

<a href="#">Link to this property</a>

"rejected"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

can\_cancel\_transfer: optional boolean

Indicates if cancellation is still possible.

<a href="#">Link to this property</a>

<details>

<summary>

disable\_privacy: optional "needed"or "ok"or "unknown"

Status of the privacy-guard disabling step at the foreign registrar.

</summary>

One of the following:

"needed"

<a href="#">Link to this property</a>

"ok"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

enter\_auth\_code: optional "needed"or "ok"or "pending"or 2 more

Status of the auth-code entry and verification step.

</summary>

One of the following:

"needed"

<a href="#">Link to this property</a>

"ok"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"trying"

<a href="#">Link to this property</a>

"rejected"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

unlock\_domain: optional "needed"or "ok"or "pending"or 2 more

Status of the domain-unlock step at the foreign registrar.

</summary>

One of the following:

"needed"

<a href="#">Link to this property</a>

"ok"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"trying"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

Last updated.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar.domains%20%3E%20(model)%20domain%20%3E%20(schema)>)

DomainGetResponse = unknown

[Link to this property](#)%20registrar.domains%20%3E%20(model)%20domain_get_response%20%3E%20(schema)>)

DomainUpdateResponse = unknown

[Link to this property](#)%20registrar.domains%20%3E%20(model)%20domain_update_response%20%3E%20(schema)>)

#### RegistrarRegistrations

##### [Create Registration](https://developers.cloudflare.com/api/resources/registrar/subresources/registrations/methods/create)

POST/accounts/{account\_id}/registrar/registrations

##### [List Registrations](https://developers.cloudflare.com/api/resources/registrar/subresources/registrations/methods/list)

GET/accounts/{account\_id}/registrar/registrations

##### [Get Registration](https://developers.cloudflare.com/api/resources/registrar/subresources/registrations/methods/get)

GET/accounts/{account\_id}/registrar/registrations/{domain\_name}

##### [Update Registration](https://developers.cloudflare.com/api/resources/registrar/subresources/registrations/methods/edit)

PATCH/accounts/{account\_id}/registrar/registrations/{domain\_name}

#### RegistrarRegistration Status

##### [Get Registration Status](https://developers.cloudflare.com/api/resources/registrar/subresources/registration_status/methods/get)

GET/accounts/{account\_id}/registrar/registrations/{domain\_name}/registration-status

#### RegistrarUpdate Status

##### [Get Update Status](https://developers.cloudflare.com/api/resources/registrar/subresources/update_status/methods/get)

GET/accounts/{account\_id}/registrar/registrations/{domain\_name}/update-status

#### RegistrarExtensions

##### [List extensions](https://developers.cloudflare.com/api/resources/registrar/subresources/extensions/methods/list)

GET/accounts/{account\_id}/registrar/extensions

##### [Get extension](https://developers.cloudflare.com/api/resources/registrar/subresources/extensions/methods/get)

GET/accounts/{account\_id}/registrar/extensions/{extension}

##### ModelsExpand Collapse

<details>

<summary>

ExtensionListResponse object {metadata, registration\_schema }

Extension entry with metadata and JSON Schema documents for the registration operation.

</summary>

<details>

<summary>

metadata: object {name, tld }

Extension metadata.

</summary>

name: string

The full name of the extension. For example, “co.uk”, or “uk”.

<a href="#">Link to this property</a>

tld: string

The TLD of the extension. For example, for “co.uk”, it is “uk”. For “uk”, it is “uk”.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

registration\_schema: unknown

JSON Schema describing the expected input structure for registration operations on this extension.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar.extensions%20%3E%20(model)%20extension_list_response%20%3E%20(schema)>)

<details>

<summary>

ExtensionGetResponse object {metadata, registration\_schema }

Extension entry with metadata and JSON Schema documents for the registration operation.

</summary>

<details>

<summary>

metadata: object {name, tld }

Extension metadata.

</summary>

name: string

The full name of the extension. For example, “co.uk”, or “uk”.

<a href="#">Link to this property</a>

tld: string

The TLD of the extension. For example, for “co.uk”, it is “uk”. For “uk”, it is “uk”.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

registration\_schema: unknown

JSON Schema describing the expected input structure for registration operations on this extension.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar.extensions%20%3E%20(model)%20extension_get_response%20%3E%20(schema)>)