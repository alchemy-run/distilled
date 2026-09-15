---
title: List domains
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Registrar](https://developers.cloudflare.com/api/resources/registrar)

[Domains](https://developers.cloudflare.com/api/resources/registrar/subresources/domains)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List domains

Deprecated: This operation is deprecated and will reach end of life on September 27, 2026. Use the new Registrar API endpoints (domain-search, domain-check, registrations) instead. Refer to https://developers.cloudflare.com/fundamentals/api/reference/deprecations/ for details.

GET/accounts/{account\_id}/registrar/domains

Lists domains handled by Registrar.

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

[Link to this property](#)%20registrar.domains%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

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

[Link to this property](#)%20registrar.domains%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20registrar.domains%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of <a href="https://developers.cloudflare.com/api/resources/registrar#(resource)%20registrar.domains%20%3E%20(model)%20domain%20%3E%20(schema)">Domain</a> { id, available, can\_register, 9 more }

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

[Link to this property](#)%20registrar.domains%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20registrar.domains%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, total\_count }

</summary>

count: optional number

Total number of results for the requested service.

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results.

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar.domains%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List domains

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/registrar/domains \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": [
    {
      "id": "ea95132c15732412d22c1476fa83f27a",
      "available": false,
      "can_register": false,
      "created_at": "2018-08-28T17:26:26Z",
      "current_registrar": "Cloudflare",
      "expires_at": "2019-08-28T23:59:59Z",
      "locked": false,
      "registrant_contact": {
        "address": "123 Sesame St.",
        "city": "Austin",
        "country": "US",
        "first_name": "John",
        "last_name": "Appleseed",
        "organization": "Cloudflare, Inc.",
        "phone": "+1 123-123-1234",
        "state": "TX",
        "zip": "12345",
        "id": "ea95132c15732412d22c1476fa83f27a",
        "address2": "Suite 430",
        "email": "user@example.com",
        "fax": "123-867-5309"
      },
      "registry_statuses": "ok,serverTransferProhibited",
      "supported_tld": true,
      "transfer_in": {
        "accept_foa": "needed",
        "approve_transfer": "unknown",
        "can_cancel_transfer": true,
        "disable_privacy": "ok",
        "enter_auth_code": "needed",
        "unlock_domain": "ok"
      },
      "updated_at": "2018-08-28T17:26:26Z"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": [
    {
      "id": "ea95132c15732412d22c1476fa83f27a",
      "available": false,
      "can_register": false,
      "created_at": "2018-08-28T17:26:26Z",
      "current_registrar": "Cloudflare",
      "expires_at": "2019-08-28T23:59:59Z",
      "locked": false,
      "registrant_contact": {
        "address": "123 Sesame St.",
        "city": "Austin",
        "country": "US",
        "first_name": "John",
        "last_name": "Appleseed",
        "organization": "Cloudflare, Inc.",
        "phone": "+1 123-123-1234",
        "state": "TX",
        "zip": "12345",
        "id": "ea95132c15732412d22c1476fa83f27a",
        "address2": "Suite 430",
        "email": "user@example.com",
        "fax": "123-867-5309"
      },
      "registry_statuses": "ok,serverTransferProhibited",
      "supported_tld": true,
      "transfer_in": {
        "accept_foa": "needed",
        "approve_transfer": "unknown",
        "can_cancel_transfer": true,
        "disable_privacy": "ok",
        "enter_auth_code": "needed",
        "unlock_domain": "ok"
      },
      "updated_at": "2018-08-28T17:26:26Z"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```