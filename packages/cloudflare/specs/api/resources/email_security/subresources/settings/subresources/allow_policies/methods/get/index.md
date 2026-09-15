---
title: Get an email allow policy
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

# Get an email allow policy

GET/accounts/{account\_id}/email-security/settings/allow\_policies/{policy\_id}

Retrieves details for a specific allow policy including its pattern, dispositions that are exempted, and whether it applies to all detections.

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

[Link to this property](#)%20email_security.settings.allow_policies%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

policy\_id: string

Allow policy identifier.

formatuuid

[Link to this property](#)%20email_security.settings.allow_policies%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20policy_id%20%3E%20(schema)>)

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

[Link to this property](#)%20email_security.settings.allow_policies%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20email_security.settings.allow_policies%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20email_security.settings.allow_policies%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, created\_at, last\_modified, 12 more }

An email allow policy.

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

[Link to this property](#)%20email_security.settings.allow_policies%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get an email allow policy

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/allow_policies/$POLICY_ID \
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
  "result": {
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
  "result": {
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
}
```