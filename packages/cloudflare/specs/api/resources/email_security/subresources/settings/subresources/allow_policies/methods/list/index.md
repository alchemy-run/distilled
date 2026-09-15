---
title: List email allow policies
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Security](https://developers.cloudflare.com/api/resources/email_security)

[Settings](https://developers.cloudflare.com/api/resources/email_security/subresources/settings)

[Allow Policies](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/allow_policies)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List email allow policies

GET/accounts/{account\_id}/email-security/settings/allow\_policies

Returns a paginated list of email allow policies. These policies exempt matching emails from security detection, allowing them to bypass disposition actions. Supports filtering by pattern type and policy attributes.

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

[Link to this property](#)%20email_security.settings.allow_policies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

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

[Link to this property](#)%20email_security.settings.allow_policies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

is\_acceptable\_sender: optional boolean

Filter to show only policies where messages from the sender are exempted from Spam, Spoof, and Bulk dispositions (not Malicious or Suspicious).

[Link to this property](#)%20email_security.settings.allow_policies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20is_acceptable_sender%20%3E%20(schema)>)

is\_exempt\_recipient: optional boolean

Filter to show only policies where messages to the recipient bypass all detections.

[Link to this property](#)%20email_security.settings.allow_policies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20is_exempt_recipient%20%3E%20(schema)>)

is\_trusted\_sender: optional boolean

Filter to show only policies where messages from the sender bypass all detections and link following.

[Link to this property](#)%20email_security.settings.allow_policies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20is_trusted_sender%20%3E%20(schema)>)

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

[Link to this property](#)%20email_security.settings.allow_policies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order%20%3E%20(schema)>)

page: optional number

Current page within paginated list of results.

minimum1

[Link to this property](#)%20email_security.settings.allow_policies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

pattern: optional string

[Link to this property](#)%20email_security.settings.allow_policies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20pattern%20%3E%20(schema)>)

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

[Link to this property](#)%20email_security.settings.allow_policies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20pattern_type%20%3E%20(schema)>)

per\_page: optional number

The number of results per page. Maximum value is 1000.

maximum1000

minimum1

[Link to this property](#)%20email_security.settings.allow_policies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

search: optional string

Search term for filtering records. Behavior may change.

[Link to this property](#)%20email_security.settings.allow_policies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

verify\_sender: optional boolean

Filter to show only policies that enforce DMARC, SPF, or DKIM authentication.

[Link to this property](#)%20email_security.settings.allow_policies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20verify_sender%20%3E%20(schema)>)

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

[Link to this property](#)%20email_security.settings.allow_policies%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20email_security.settings.allow_policies%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20email_security.settings.allow_policies%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {id, created\_at, last\_modified, 12 more }

</summary>

id: string

Allow policy identifier.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

Deprecatedlast\_modified: string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

comments: optional string

maxLength1024

<a href="#">Link to this property</a>

is\_acceptable\_sender: optional boolean

Exempts messages from this sender from Spam, Spoof and Bulk dispositions only; Malicious and Suspicious dispositions still apply.

<a href="#">Link to this property</a>

is\_exempt\_recipient: optional boolean

Bypasses all detections for messages to this recipient.

<a href="#">Link to this property</a>

Deprecatedis\_recipient: optional boolean

Use <code>is_exempt_recipient</code> instead.

Deprecated as of July 1, 2025. Use <code>is_exempt_recipient</code> instead. End of life: July 1, 2026.

<a href="#">Link to this property</a>

is\_regex: optional boolean

<a href="#">Link to this property</a>

Deprecatedis\_sender: optional boolean

Use <code>is_trusted_sender</code> instead.

Deprecated as of July 1, 2025. Use <code>is_trusted_sender</code> instead. End of life: July 1, 2026.

<a href="#">Link to this property</a>

Deprecatedis\_spoof: optional boolean

Use <code>is_acceptable_sender</code> instead.

Deprecated as of July 1, 2025. Use <code>is_acceptable_sender</code> instead. End of life: July 1, 2026.

<a href="#">Link to this property</a>

is\_trusted\_sender: optional boolean

Bypasses all detections and link following for messages from this sender.

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

verify\_sender: optional boolean

Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.allow_policies%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

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

[Link to this property](#)%20email_security.settings.allow_policies%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List email allow policies

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/allow_policies \
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
      "created_at": "2014-01-01T05:20:00.12345Z",
      "last_modified": "2014-01-01T05:20:00.12345Z",
      "comments": "Trust all messages send from test@example.com",
      "is_acceptable_sender": false,
      "is_exempt_recipient": false,
      "is_recipient": false,
      "is_regex": false,
      "is_sender": true,
      "is_spoof": false,
      "is_trusted_sender": true,
      "modified_at": "2014-01-01T05:20:00.12345Z",
      "pattern": "test@example.com",
      "pattern_type": "EMAIL",
      "verify_sender": true
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
      "created_at": "2014-01-01T05:20:00.12345Z",
      "last_modified": "2014-01-01T05:20:00.12345Z",
      "comments": "Trust all messages send from test@example.com",
      "is_acceptable_sender": false,
      "is_exempt_recipient": false,
      "is_recipient": false,
      "is_regex": false,
      "is_sender": true,
      "is_spoof": false,
      "is_trusted_sender": true,
      "modified_at": "2014-01-01T05:20:00.12345Z",
      "pattern": "test@example.com",
      "pattern_type": "EMAIL",
      "verify_sender": true
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