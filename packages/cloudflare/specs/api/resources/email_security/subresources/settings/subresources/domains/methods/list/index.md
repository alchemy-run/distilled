---
title: List protected email domains
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Security](https://developers.cloudflare.com/api/resources/email_security)

[Settings](https://developers.cloudflare.com/api/resources/email_security/subresources/settings)

[Domains](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/domains)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List protected email domains

GET/accounts/{account\_id}/email-security/settings/domains

Returns a paginated list of email domains protected by Email Security. Includes domain configuration, delivery modes, and authorization status. Supports filtering by delivery mode and integration ID.

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

##### Accepted Permissions (at least one required)

`Cloud Email Security: Write``Cloud Email Security: Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20email_security.settings.domains%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

<details>

<summary>

active\_delivery\_mode: optional "DIRECT"or "BCC"or "JOURNAL"or 2 more

Currently active delivery mode to filter by.

</summary>

One of the following:

"DIRECT"

<a href="#">Link to this property</a>

"BCC"

<a href="#">Link to this property</a>

"JOURNAL"

<a href="#">Link to this property</a>

"API"

<a href="#">Link to this property</a>

"RETRO\_SCAN"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.domains%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20active_delivery_mode%20%3E%20(schema)>)

<details>

<summary>

allowed\_delivery\_mode: optional "DIRECT"or "BCC"or "JOURNAL"or 2 more

Delivery mode to filter by.

</summary>

One of the following:

"DIRECT"

<a href="#">Link to this property</a>

"BCC"

<a href="#">Link to this property</a>

"JOURNAL"

<a href="#">Link to this property</a>

"API"

<a href="#">Link to this property</a>

"RETRO\_SCAN"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.domains%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20allowed_delivery_mode%20%3E%20(schema)>)

<details>

<summary>

direction: optional "asc"or "desc"

The sorting direction.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.domains%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

domain: optional array of string

Domain names to filter by.

[Link to this property](#)%20email_security.settings.domains%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20domain%20%3E%20(schema)>)

integration\_id: optional string

Integration ID to filter by.

formatuuid

[Link to this property](#)%20email_security.settings.domains%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20integration_id%20%3E%20(schema)>)

<details>

<summary>

order: optional "domain"or "created\_at"

Field to sort by.

</summary>

One of the following:

"domain"

<a href="#">Link to this property</a>

"created\_at"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.domains%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order%20%3E%20(schema)>)

page: optional number

Current page within paginated list of results.

minimum1

[Link to this property](#)%20email_security.settings.domains%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

The number of results per page. Maximum value is 1000.

maximum1000

minimum1

[Link to this property](#)%20email_security.settings.domains%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

search: optional string

Search term for filtering records. Behavior may change.

[Link to this property](#)%20email_security.settings.domains%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

<details>

<summary>

status: optional "PENDING"or "ACTIVE"or "FAILED"or "TIMEOUT"

Filters response to domains with the provided status.

</summary>

One of the following:

"PENDING"

<a href="#">Link to this property</a>

"ACTIVE"

<a href="#">Link to this property</a>

"FAILED"

<a href="#">Link to this property</a>

"TIMEOUT"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.domains%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20status%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.domains%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.domains%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20email_security.settings.domains%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {id, allowed\_delivery\_modes, authorization, 19 more }

</summary>

id: optional string

Domain identifier.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

allowed\_delivery\_modes: optional array of "DIRECT"or "BCC"or "JOURNAL"or 2 more

</summary>

One of the following:

"DIRECT"

<a href="#">Link to this property</a>

"BCC"

<a href="#">Link to this property</a>

"JOURNAL"

<a href="#">Link to this property</a>

"API"

<a href="#">Link to this property</a>

"RETRO\_SCAN"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

authorization: optional object {authorized, timestamp, status\_message }

</summary>

authorized: boolean

<a href="#">Link to this property</a>

timestamp: string

formatdate-time

<a href="#">Link to this property</a>

status\_message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

dmarc\_status: optional "none"or "good"or "invalid"

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"good"

<a href="#">Link to this property</a>

"invalid"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

domain: optional string

<a href="#">Link to this property</a>

<details>

<summary>

drop\_dispositions: optional array of "MALICIOUS"or "MALICIOUS-BEC"or "SUSPICIOUS"or 7 more

</summary>

One of the following:

"MALICIOUS"

<a href="#">Link to this property</a>

"MALICIOUS-BEC"

<a href="#">Link to this property</a>

"SUSPICIOUS"

<a href="#">Link to this property</a>

"SPOOF"

<a href="#">Link to this property</a>

"SPAM"

<a href="#">Link to this property</a>

"BULK"

<a href="#">Link to this property</a>

"ENCRYPTED"

<a href="#">Link to this property</a>

"EXTERNAL"

<a href="#">Link to this property</a>

"UNKNOWN"

<a href="#">Link to this property</a>

"NONE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

emails\_processed: optional object {timestamp, total\_emails\_processed, total\_emails\_processed\_previous }

</summary>

timestamp: string

formatdate-time

<a href="#">Link to this property</a>

total\_emails\_processed: number

minimum0

<a href="#">Link to this property</a>

total\_emails\_processed\_previous: number

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

folder: optional "AllItems"or "Inbox"

</summary>

One of the following:

"AllItems"

<a href="#">Link to this property</a>

"Inbox"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

inbox\_provider: optional "Microsoft"or "Google"

</summary>

One of the following:

"Microsoft"

<a href="#">Link to this property</a>

"Google"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

integration\_id: optional string

formatuuid

<a href="#">Link to this property</a>

ip\_restrictions: optional array of string

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

lookback\_hops: optional number

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

o365\_tenant\_id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

regions: optional array of "GLOBAL"or "AU"or "DE"or 2 more

</summary>

One of the following:

"GLOBAL"

<a href="#">Link to this property</a>

"AU"

<a href="#">Link to this property</a>

"DE"

<a href="#">Link to this property</a>

"IN"

<a href="#">Link to this property</a>

"US"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

require\_tls\_inbound: optional boolean

<a href="#">Link to this property</a>

require\_tls\_outbound: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

spf\_status: optional "none"or "good"or "neutral"or 2 more

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"good"

<a href="#">Link to this property</a>

"neutral"

<a href="#">Link to this property</a>

"open"

<a href="#">Link to this property</a>

"invalid"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "PENDING"or "ACTIVE"or "FAILED"or "TIMEOUT"

</summary>

One of the following:

"PENDING"

<a href="#">Link to this property</a>

"ACTIVE"

<a href="#">Link to this property</a>

"FAILED"

<a href="#">Link to this property</a>

"TIMEOUT"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

transport: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.domains%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

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

[Link to this property](#)%20email_security.settings.domains%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List protected email domains

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/domains \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": [
    {
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "allowed_delivery_modes": [
        "DIRECT"
      ],
      "authorization": {
        "authorized": true,
        "timestamp": "2019-12-27T18:11:19.117Z",
        "status_message": "status_message"
      },
      "created_at": "2014-01-01T05:20:00.12345Z",
      "dmarc_status": "none",
      "domain": "example.com",
      "drop_dispositions": [
        "MALICIOUS"
      ],
      "emails_processed": {
        "timestamp": "2019-12-27T18:11:19.117Z",
        "total_emails_processed": 0,
        "total_emails_processed_previous": 0
      },
      "folder": "AllItems",
      "inbox_provider": "Microsoft",
      "integration_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "ip_restrictions": [
        "192.0.2.0/24",
        "2001:db8::/32"
      ],
      "last_modified": "2014-01-01T05:20:00.12345Z",
      "lookback_hops": 0,
      "modified_at": "2014-01-01T05:20:00.12345Z",
      "o365_tenant_id": "o365_tenant_id",
      "regions": [
        "GLOBAL"
      ],
      "require_tls_inbound": true,
      "require_tls_outbound": true,
      "spf_status": "none",
      "status": "PENDING",
      "transport": "transport"
    }
  ],
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
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": [
    {
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "allowed_delivery_modes": [
        "DIRECT"
      ],
      "authorization": {
        "authorized": true,
        "timestamp": "2019-12-27T18:11:19.117Z",
        "status_message": "status_message"
      },
      "created_at": "2014-01-01T05:20:00.12345Z",
      "dmarc_status": "none",
      "domain": "example.com",
      "drop_dispositions": [
        "MALICIOUS"
      ],
      "emails_processed": {
        "timestamp": "2019-12-27T18:11:19.117Z",
        "total_emails_processed": 0,
        "total_emails_processed_previous": 0
      },
      "folder": "AllItems",
      "inbox_provider": "Microsoft",
      "integration_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "ip_restrictions": [
        "192.0.2.0/24",
        "2001:db8::/32"
      ],
      "last_modified": "2014-01-01T05:20:00.12345Z",
      "lookback_hops": 0,
      "modified_at": "2014-01-01T05:20:00.12345Z",
      "o365_tenant_id": "o365_tenant_id",
      "regions": [
        "GLOBAL"
      ],
      "require_tls_inbound": true,
      "require_tls_outbound": true,
      "spf_status": "none",
      "status": "PENDING",
      "transport": "transport"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```