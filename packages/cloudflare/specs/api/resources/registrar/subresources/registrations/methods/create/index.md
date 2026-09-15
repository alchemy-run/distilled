---
title: Create Registration
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Registrar](https://developers.cloudflare.com/api/resources/registrar)

[Registrations](https://developers.cloudflare.com/api/resources/registrar/subresources/registrations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create Registration

POST/accounts/{account\_id}/registrar/registrations

Starts a domain registration workflow. This is a billable operation — successful registration charges the account’s default payment method. All successful domain registrations are non-refundable — once the workflow completes with `state: succeeded`, the charge cannot be reversed.

### Prerequisites

- The account must have a billing profile with a valid default payment method. Set this up at `https://dash.cloudflare.com/{account_id}/billing/payment-info`.
- The account must not already be at the maximum supported domain limit. A single account may own up to 500 domains in total across registrations created through either the dashboard or this API.
- The domain must be on a supported extension for programmatic registration.
- Use `POST /domain-check` immediately before calling this endpoint to confirm real-time availability and pricing.

### Supported extensions

This API supports programmatic registration for all extensions supported by the dashboard experience, with the following exceptions:

`giving`, `mom`, `inc`, `lol`, `sh`, `link`, `cc`, `new`

Cloudflare Registrar supports 400+ extensions in the dashboard. Extensions listed above can be registered at `https://dash.cloudflare.com/{account_id}/domains/registrations`.

### Express mode

The only required field is `domain_name`. If `contacts` is omitted, the system uses the account’s default address book entry as the registrant. If no default exists and no contact is provided, the request fails. Set up a default address book entry and accept the required agreement at `https://dash.cloudflare.com/{account_id}/domains/registrations`.

### Defaults

- `years`: defaults to the extension’s minimum registration period (1 year for most extensions, but varies — for example, `.ai` (if supported) requires a minimum of 2 years).
- `auto_renew`: defaults to `false`. Setting it to `true` is an explicit opt-in authorizing Cloudflare to charge the account’s default payment method up to 30 days before domain expiry to renew the registration. Renewal pricing may change over time based on registry pricing.
- `privacy_mode`: defaults to `redaction`.

### Premium domains

Premium domain registration is not currently supported by this API. If `POST /domain-check` returns `tier: premium`, do not call this endpoint for that domain.

### Response behavior

By default, the server holds the connection for a bounded, server-defined amount of time while the registration completes. Most registrations finish within this window and return `201 Created` with a completed workflow status.

If the registration is still processing after this synchronous wait window, the server returns `202 Accepted`. Poll the URL in `links.self` to track progress.

To skip the wait and receive an immediate `202`, send `Prefer: respond-async`.

##### Security

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary>API Email + API Key</summary>



The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**<code>X-Auth-Email: user@example.com</code>

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**<code>X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194</code>

</details>

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20registrar.registrations%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### H eader ParametersExpand Collapse

Prefer: optional string

[Link to this property](#)%20registrar.registrations%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20Prefer%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

domain\_name: string

Provides a fully qualified domain name (FQDN), including the extension (e.g., `example.com`, `mybrand.app`). The domain name uniquely identifies a registration. Cloudflare permits only one registration per domain, making the domain name a natural idempotency key for registration requests.

[Link to this property](#)%20registrar.registrations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20domain_name%20%3E%20(schema)>)

acknowledgements: optional map\[unknown]

Provides user acknowledgements for a specific extension or premium registration flow. The extension registration schema from the extension discovery endpoint identifies the required keys.

[Link to this property](#)%20registrar.registrations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20acknowledgements%20%3E%20(schema)>)

auto\_renew: optional boolean

Enable or disable automatic renewal. Defaults to `false` if omitted. Setting this field to `true` is an explicit opt-in authorizing Cloudflare to charge the account’s default payment method up to 30 days before domain expiry to renew the domain automatically. Renewal pricing may change over time based on registry pricing.

[Link to this property](#)%20registrar.registrations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20auto_renew%20%3E%20(schema)>)

contact\_extensions: optional map\[unknown]

Provides registry-specific contact extension values for the registrant. `GET /accounts/{account_id}/registrar/extensions/{extension}` identifies the required keys and allowed values for each extension in the `registration_schema.properties.contact_extensions` object.

Examples include `.us` nexus fields, `.uk` registrant type fields, and `.ca` legal type fields. Omit this object when the extension’s registration schema excludes `contact_extensions`.

[Link to this property](#)%20registrar.registrations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20contact_extensions%20%3E%20(schema)>)

<details>

<summary>

contacts: optional object {administrator, billing, registrant, technical }

Provides contact data for the registration request.

The per-extension schema from <code>GET /accounts/{account_id}/registrar/extensions/{extension}</code> defines the accepted contact roles. Every currently supported extension requires only <code>contacts.registrant</code> from API callers. Callers may provide additional roles such as <code>technical</code>, <code>administrator</code>, and <code>billing</code> when the extension schema includes them. When a registry requires an omitted role, Cloudflare may derive that contact from <code>contacts.registrant</code>.

When the request omits either the entire <code>contacts</code> object or <code>contacts.registrant</code>, the system uses the account’s default address book entry as the registrant contact. The account owner must configure this default at <code>https://dash.cloudflare.com/{account_id}/domains/registrations</code>, where they can create or update the address book entry and accept the required agreement. Dashboard settings currently provide the only way to manage address book entries.

Without either a default address book entry or a registrant contact, the registration request fails validation.

</summary>

<details>

<summary>

administrator: optional object {email, phone, postal\_info, fax }

Optional administrator contact. Accepted only when the extension schema includes this role. When the registry requires an omitted contact, Cloudflare may derive it from <code>contacts.registrant</code>.

</summary>

email: string

Email address for the registrant. Used for domain-related communications from the registry, including ownership verification and renewal notices.

formatemail

<a href="#">Link to this property</a>

phone: string

Phone number in E.164 format: <code>+{country_code}.{number}</code> without spaces or dashes. Examples: <code>+1.5555555555</code> (US), <code>+44.2071234567</code> (UK), <code>+81.312345678</code> (Japan).

<a href="#">Link to this property</a>

<details>

<summary>

postal\_info: object {address, name, organization }

Postal/mailing information for the contact. The <code>name</code> field is the complete contact name in one string. Some registries require a complete personal name, including a family or last name where applicable, but this API does not accept separate first-name and last-name fields for registration contacts.

</summary>

<details>

<summary>

address: object {city, country\_code, postal\_code, 2 more }

Physical mailing address for the registrant contact.

</summary>

city: string

City or locality name.

<a href="#">Link to this property</a>

country\_code: string

Two-letter country code per ISO 3166-1 alpha-2 (e.g., <code>US</code>, <code>GB</code>, <code>CA</code>, <code>DE</code>).

<a href="#">Link to this property</a>

postal\_code: string

Postal or ZIP code.

<a href="#">Link to this property</a>

state: string

State, province, or region. Use the standard abbreviation where applicable (e.g., <code>TX</code> for Texas, <code>ON</code> for Ontario).

<a href="#">Link to this property</a>

street: string

Street address including building/suite number.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

Full legal name of the contact, including all required name components for an individual or authorized representative. Some registries require a complete personal name that includes a family or last name where applicable. Provide the complete name in this single field, for example <code>Ada Lovelace</code>; do not send separate first-name or last-name fields.

<a href="#">Link to this property</a>

organization: optional string

Organization or company name. Optional for individual registrants.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

fax: optional string

Fax number in E.164 format (e.g., <code>+1.5555555555</code>). Optional. Most registrations do not require a fax number.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

billing: optional object {email, phone, postal\_info, fax }

Optional billing contact. Accepted only when the extension schema includes this role. When the registry requires an omitted contact, Cloudflare may derive it from <code>contacts.registrant</code>.

</summary>

email: string

Email address for the registrant. Used for domain-related communications from the registry, including ownership verification and renewal notices.

formatemail

<a href="#">Link to this property</a>

phone: string

Phone number in E.164 format: <code>+{country_code}.{number}</code> without spaces or dashes. Examples: <code>+1.5555555555</code> (US), <code>+44.2071234567</code> (UK), <code>+81.312345678</code> (Japan).

<a href="#">Link to this property</a>

<details>

<summary>

postal\_info: object {address, name, organization }

Postal/mailing information for the contact. The <code>name</code> field is the complete contact name in one string. Some registries require a complete personal name, including a family or last name where applicable, but this API does not accept separate first-name and last-name fields for registration contacts.

</summary>

<details>

<summary>

address: object {city, country\_code, postal\_code, 2 more }

Physical mailing address for the registrant contact.

</summary>

city: string

City or locality name.

<a href="#">Link to this property</a>

country\_code: string

Two-letter country code per ISO 3166-1 alpha-2 (e.g., <code>US</code>, <code>GB</code>, <code>CA</code>, <code>DE</code>).

<a href="#">Link to this property</a>

postal\_code: string

Postal or ZIP code.

<a href="#">Link to this property</a>

state: string

State, province, or region. Use the standard abbreviation where applicable (e.g., <code>TX</code> for Texas, <code>ON</code> for Ontario).

<a href="#">Link to this property</a>

street: string

Street address including building/suite number.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

Full legal name of the contact, including all required name components for an individual or authorized representative. Some registries require a complete personal name that includes a family or last name where applicable. Provide the complete name in this single field, for example <code>Ada Lovelace</code>; do not send separate first-name or last-name fields.

<a href="#">Link to this property</a>

organization: optional string

Organization or company name. Optional for individual registrants.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

fax: optional string

Fax number in E.164 format (e.g., <code>+1.5555555555</code>). Optional. Most registrations do not require a fax number.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

registrant: optional object {email, phone, postal\_info, fax }

Optional registrant contact. If omitted, the account’s default address book entry is used instead.

</summary>

email: string

Email address for the registrant. Used for domain-related communications from the registry, including ownership verification and renewal notices.

formatemail

<a href="#">Link to this property</a>

phone: string

Phone number in E.164 format: <code>+{country_code}.{number}</code> without spaces or dashes. Examples: <code>+1.5555555555</code> (US), <code>+44.2071234567</code> (UK), <code>+81.312345678</code> (Japan).

<a href="#">Link to this property</a>

<details>

<summary>

postal\_info: object {address, name, organization }

Postal/mailing information for the contact. The <code>name</code> field is the complete contact name in one string. Some registries require a complete personal name, including a family or last name where applicable, but this API does not accept separate first-name and last-name fields for registration contacts.

</summary>

<details>

<summary>

address: object {city, country\_code, postal\_code, 2 more }

Physical mailing address for the registrant contact.

</summary>

city: string

City or locality name.

<a href="#">Link to this property</a>

country\_code: string

Two-letter country code per ISO 3166-1 alpha-2 (e.g., <code>US</code>, <code>GB</code>, <code>CA</code>, <code>DE</code>).

<a href="#">Link to this property</a>

postal\_code: string

Postal or ZIP code.

<a href="#">Link to this property</a>

state: string

State, province, or region. Use the standard abbreviation where applicable (e.g., <code>TX</code> for Texas, <code>ON</code> for Ontario).

<a href="#">Link to this property</a>

street: string

Street address including building/suite number.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

Full legal name of the contact, including all required name components for an individual or authorized representative. Some registries require a complete personal name that includes a family or last name where applicable. Provide the complete name in this single field, for example <code>Ada Lovelace</code>; do not send separate first-name or last-name fields.

<a href="#">Link to this property</a>

organization: optional string

Organization or company name. Optional for individual registrants.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

fax: optional string

Fax number in E.164 format (e.g., <code>+1.5555555555</code>). Optional. Most registrations do not require a fax number.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

technical: optional object {email, phone, postal\_info, fax }

Optional technical contact. Accepted only when the extension schema includes this role. When the registry requires an omitted contact, Cloudflare may derive it from <code>contacts.registrant</code>.

</summary>

email: string

Email address for the registrant. Used for domain-related communications from the registry, including ownership verification and renewal notices.

formatemail

<a href="#">Link to this property</a>

phone: string

Phone number in E.164 format: <code>+{country_code}.{number}</code> without spaces or dashes. Examples: <code>+1.5555555555</code> (US), <code>+44.2071234567</code> (UK), <code>+81.312345678</code> (Japan).

<a href="#">Link to this property</a>

<details>

<summary>

postal\_info: object {address, name, organization }

Postal/mailing information for the contact. The <code>name</code> field is the complete contact name in one string. Some registries require a complete personal name, including a family or last name where applicable, but this API does not accept separate first-name and last-name fields for registration contacts.

</summary>

<details>

<summary>

address: object {city, country\_code, postal\_code, 2 more }

Physical mailing address for the registrant contact.

</summary>

city: string

City or locality name.

<a href="#">Link to this property</a>

country\_code: string

Two-letter country code per ISO 3166-1 alpha-2 (e.g., <code>US</code>, <code>GB</code>, <code>CA</code>, <code>DE</code>).

<a href="#">Link to this property</a>

postal\_code: string

Postal or ZIP code.

<a href="#">Link to this property</a>

state: string

State, province, or region. Use the standard abbreviation where applicable (e.g., <code>TX</code> for Texas, <code>ON</code> for Ontario).

<a href="#">Link to this property</a>

street: string

Street address including building/suite number.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

Full legal name of the contact, including all required name components for an individual or authorized representative. Some registries require a complete personal name that includes a family or last name where applicable. Provide the complete name in this single field, for example <code>Ada Lovelace</code>; do not send separate first-name or last-name fields.

<a href="#">Link to this property</a>

organization: optional string

Organization or company name. Optional for individual registrants.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

fax: optional string

Fax number in E.164 format (e.g., <code>+1.5555555555</code>). Optional. Most registrations do not require a fax number.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar.registrations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20contacts%20%3E%20(schema)>)

<details>

<summary>

privacy\_mode: optional "off"or "redaction"

Sets the WHOIS privacy mode for the registration. Defaults to <code>redaction</code>.

- <code>off</code>: Disables WHOIS privacy.
- <code>redaction</code>: Requests WHOIS redaction where the extension supports it. Some extensions exclude privacy and redaction.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"redaction"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar.registrations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20privacy_mode%20%3E%20(schema)>)

years: optional number

Sets the registration term from 1 to 10 years. When omitted, this field defaults to the registry’s minimum registration period for the extension. Most extensions require 1 year, while some require longer minimum terms (e.g., `.ai` requires 2 years).

Each registry may also enforce its own maximum registration term. A request above that maximum fails. When uncertain, omit this field to use the default.

maximum10

minimum1

[Link to this property](#)%20registrar.registrations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20years%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

Location of the invalid value that caused the error.

</summary>

pointer: string

JSON Pointer to the invalid or missing request value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar.registrations%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

Location of the invalid value that caused the error.

</summary>

pointer: string

JSON Pointer to the invalid or missing request value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar.registrations%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/registrar#(resource)%20registrar%20%3E%20(model)%20workflow_status%20%3E%20(schema)">WorkflowStatus</a> { completed, created\_at, links, 4 more }

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

[Link to this property](#)%20registrar.registrations%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20registrar.registrations%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Create Registration

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/registrar/registrations \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "domain_name": "my-brand-example.io",
          "acknowledgements": {
            "fees": "bar"
          },
          "contact_extensions": {
            "application_purpose": "bar",
            "nexus_category": "bar"
          },
          "privacy_mode": "redaction",
          "years": 1
        }'
```

201 example

202 example

4XX example

4XX example

4XX example

4XX example

4XX example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "completed": true,
    "context": {
      "domain_name": "example.com",
      "registration": {
        "auto_renew": true,
        "created_at": "2025-10-27T10:00:00Z",
        "domain_name": "example.com",
        "expires_at": "2026-10-27T10:00:00Z",
        "locked": true,
        "privacy_mode": "redaction",
        "status": "active"
      }
    },
    "created_at": "2025-10-27T10:00:00Z",
    "links": {
      "resource": "/accounts/abc/registrar/registrations/example.com",
      "self": "/accounts/abc/registrar/registrations/example.com/registration-status"
    },
    "state": "succeeded",
    "updated_at": "2025-10-27T10:00:03Z"
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "completed": false,
    "context": {
      "domain_name": "example.com"
    },
    "created_at": "2025-10-27T10:00:00Z",
    "links": {
      "resource": "/accounts/abc/registrar/registrations/example.com",
      "self": "/accounts/abc/registrar/registrations/example.com/registration-status"
    },
    "state": "in_progress",
    "updated_at": "2025-10-27T10:00:10Z"
  },
  "success": true
}
```

```
{
  "errors": [
    {
      "code": 10000,
      "message": "Domain limit reached: you cannot register more than 500 domains.",
      "source": {
        "pointer": "/domain_name"
      }
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 10000,
      "message": "domain_name is required",
      "source": {
        "pointer": "/domain_name"
      }
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 10000,
      "message": "Must be a boolean",
      "source": {
        "pointer": "/auto_renew"
      }
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 10000,
      "message": "No registrant contact provided and no default address book entry found for this account."
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 10000,
      "message": "Registration is not supported for this extension"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

##### Returns Examples

201 example

202 example

4XX example

4XX example

4XX example

4XX example

4XX example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "completed": true,
    "context": {
      "domain_name": "example.com",
      "registration": {
        "auto_renew": true,
        "created_at": "2025-10-27T10:00:00Z",
        "domain_name": "example.com",
        "expires_at": "2026-10-27T10:00:00Z",
        "locked": true,
        "privacy_mode": "redaction",
        "status": "active"
      }
    },
    "created_at": "2025-10-27T10:00:00Z",
    "links": {
      "resource": "/accounts/abc/registrar/registrations/example.com",
      "self": "/accounts/abc/registrar/registrations/example.com/registration-status"
    },
    "state": "succeeded",
    "updated_at": "2025-10-27T10:00:03Z"
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "completed": false,
    "context": {
      "domain_name": "example.com"
    },
    "created_at": "2025-10-27T10:00:00Z",
    "links": {
      "resource": "/accounts/abc/registrar/registrations/example.com",
      "self": "/accounts/abc/registrar/registrations/example.com/registration-status"
    },
    "state": "in_progress",
    "updated_at": "2025-10-27T10:00:10Z"
  },
  "success": true
}
```

```
{
  "errors": [
    {
      "code": 10000,
      "message": "Domain limit reached: you cannot register more than 500 domains.",
      "source": {
        "pointer": "/domain_name"
      }
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 10000,
      "message": "domain_name is required",
      "source": {
        "pointer": "/domain_name"
      }
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 10000,
      "message": "Must be a boolean",
      "source": {
        "pointer": "/auto_renew"
      }
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 10000,
      "message": "No registrant contact provided and no default address book entry found for this account."
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 10000,
      "message": "Registration is not supported for this extension"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```