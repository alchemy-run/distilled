---
title: List blocked email senders
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Security](https://developers.cloudflare.com/api/resources/email_security)

[Settings](https://developers.cloudflare.com/api/resources/email_security/subresources/settings)

[Block Senders](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/block_senders)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List blocked email senders

GET/accounts/{account\_id}/email-security/settings/block\_senders

Returns a paginated list of blocked email sender patterns. These patterns prevent emails from matching senders from being delivered. Supports filtering by pattern type and searching across patterns.

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

[Link to this property](#)%20email_security.settings.block_senders%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

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

[Link to this property](#)%20email_security.settings.block_senders%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

<details>

<summary>

order: optional "pattern"or "created\_at"

Field to sort by.

</summary>

One of the following:

"pattern"

<a href="#">Link to this property</a>

"created\_at"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.block_senders%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order%20%3E%20(schema)>)

page: optional number

Current page within paginated list of results.

minimum1

[Link to this property](#)%20email_security.settings.block_senders%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

pattern: optional string

Filter by pattern value.

[Link to this property](#)%20email_security.settings.block_senders%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20pattern%20%3E%20(schema)>)

<details>

<summary>

pattern\_type: optional "EMAIL"or "DOMAIN"or "IP"or "UNKNOWN"

Filter by pattern type.

</summary>

One of the following:

"EMAIL"

<a href="#">Link to this property</a>

"DOMAIN"

<a href="#">Link to this property</a>

"IP"

<a href="#">Link to this property</a>

"UNKNOWN"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.block_senders%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20pattern_type%20%3E%20(schema)>)

per\_page: optional number

The number of results per page. Maximum value is 1000.

maximum1000

minimum1

[Link to this property](#)%20email_security.settings.block_senders%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

search: optional string

Search term for filtering records. Behavior may change.

[Link to this property](#)%20email_security.settings.block_senders%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

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

[Link to this property](#)%20email_security.settings.block_senders%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20email_security.settings.block_senders%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20email_security.settings.block_senders%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {id, comments, created\_at, 5 more }

</summary>

id: optional string

Blocked sender pattern identifier.

formatuuid

<a href="#">Link to this property</a>

comments: optional string

maxLength1024

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

is\_regex: optional boolean

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

pattern: optional string

The pattern value to match. The format depends on <code>pattern_type</code>: a valid email address for EMAIL (e.g. <code>user@example.com</code>), a valid domain name for DOMAIN (e.g. <code>example.com</code>), or a plain IPv4 or IPv6 address or CIDR block for IP (e.g. <code>1.2.3.4</code>, <code>1.2.3.0/24</code>, <code>2606:4700:4700::1111</code>, or <code>2606:4700:4700::/48</code>); the API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.

maxLength1024

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

pattern\_type: optional "EMAIL"or "DOMAIN"or "IP"or "UNKNOWN"

Type of pattern matching.

- EMAIL: matches a full email address (e.g. <code>user@example.com</code>)
- DOMAIN: matches a domain name (e.g. <code>example.com</code>)
- IP: matches a plain IPv4 or IPv6 address (e.g. <code>1.2.3.4</code> or <code>2606:4700:4700::1111</code>) or CIDR block (e.g. <code>1.2.3.0/24</code> or <code>2606:4700:4700::/48</code>). The API rejects private or unique-local, loopback, link-local, unspecified, and IPv4 broadcast addresses, including their IPv4-mapped IPv6 equivalents.
- UNKNOWN: deprecated; you cannot use this when creating or updating policies, but it may appear on existing entries.

</summary>

One of the following:

"EMAIL"

<a href="#">Link to this property</a>

"DOMAIN"

<a href="#">Link to this property</a>

"IP"

<a href="#">Link to this property</a>

"UNKNOWN"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.block_senders%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

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

[Link to this property](#)%20email_security.settings.block_senders%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List blocked email senders

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/block_senders \
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
      "comments": "Block sender with email test@example.com",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "is_regex": false,
      "last_modified": "2014-01-01T05:20:00.12345Z",
      "modified_at": "2014-01-01T05:20:00.12345Z",
      "pattern": "test@example.com",
      "pattern_type": "EMAIL"
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
      "comments": "Block sender with email test@example.com",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "is_regex": false,
      "last_modified": "2014-01-01T05:20:00.12345Z",
      "modified_at": "2014-01-01T05:20:00.12345Z",
      "pattern": "test@example.com",
      "pattern_type": "EMAIL"
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