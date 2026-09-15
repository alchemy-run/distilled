---
title: Get PhishGuard reports
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Security](https://developers.cloudflare.com/api/resources/email_security)

[Phishguard](https://developers.cloudflare.com/api/resources/email_security/subresources/phishguard)

[Reports](https://developers.cloudflare.com/api/resources/email_security/subresources/phishguard/subresources/reports)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get PhishGuard reports

GET/accounts/{account\_id}/email-security/phishguard/reports

Retrieves PhishGuard security alert reports for a specified date range. Reports include detected threats, dispositions, and contextual information. Use for security monitoring and threat analysis.

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

[Link to this property](#)%20email_security.phishguard.reports%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

end: optional string

End of the time range (RFC3339). Takes precedence over to\_date.

formatdate-time

[Link to this property](#)%20email_security.phishguard.reports%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20end%20%3E%20(schema)>)

from\_date: optional string

Deprecated, use `start` instead. Start date in YYYY-MM-DD format.

formatdate

[Link to this property](#)%20email_security.phishguard.reports%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20from_date%20%3E%20(schema)>)

start: optional string

Start of the time range (RFC3339). Takes precedence over from\_date.

formatdate-time

[Link to this property](#)%20email_security.phishguard.reports%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20start%20%3E%20(schema)>)

to\_date: optional string

Deprecated, use `end` instead. End date in YYYY-MM-DD format.

formatdate

[Link to this property](#)%20email_security.phishguard.reports%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20to_date%20%3E%20(schema)>)

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

[Link to this property](#)%20email_security.phishguard.reports%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20email_security.phishguard.reports%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {id, content, disposition, 7 more }

</summary>

id: number

<a href="#">Link to this property</a>

content: string

<a href="#">Link to this property</a>

<details>

<summary>

disposition: "MALICIOUS"or "MALICIOUS-BEC"or "SUSPICIOUS"or 7 more

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

fields: object {to, from, occurred\_at, 2 more }

</summary>

to: array of string

<a href="#">Link to this property</a>

from: optional string

<a href="#">Link to this property</a>

occurred\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

postfix\_id: optional string

<a href="#">Link to this property</a>

Deprecatedts: optional string

Use <code>occurred_at</code> instead.

Deprecated, use <code>occurred_at</code> instead.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

priority: string

<a href="#">Link to this property</a>

title: string

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

tags: optional array of object {category, value }

</summary>

category: string

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

Deprecatedts: optional string

Use <code>created_at</code> instead.

Deprecated, use <code>created_at</code> instead.

formatdate-time

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.phishguard.reports%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20email_security.phishguard.reports%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get PhishGuard reports

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/phishguard/reports \
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
  "result": [
    {
      "id": 0,
      "content": "content",
      "disposition": "MALICIOUS",
      "fields": {
        "to": [
          "string"
        ],
        "from": "from",
        "occurred_at": "2019-12-27T18:11:19.117Z",
        "postfix_id": "postfix_id",
        "ts": "2019-12-27T18:11:19.117Z"
      },
      "priority": "priority",
      "title": "title",
      "created_at": "2019-12-27T18:11:19.117Z",
      "tags": [
        {
          "category": "category",
          "value": "value"
        }
      ],
      "ts": "2019-12-27T18:11:19.117Z",
      "updated_at": "2019-12-27T18:11:19.117Z"
    }
  ],
  "success": true
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
  "result": [
    {
      "id": 0,
      "content": "content",
      "disposition": "MALICIOUS",
      "fields": {
        "to": [
          "string"
        ],
        "from": "from",
        "occurred_at": "2019-12-27T18:11:19.117Z",
        "postfix_id": "postfix_id",
        "ts": "2019-12-27T18:11:19.117Z"
      },
      "priority": "priority",
      "title": "title",
      "created_at": "2019-12-27T18:11:19.117Z",
      "tags": [
        {
          "category": "category",
          "value": "value"
        }
      ],
      "ts": "2019-12-27T18:11:19.117Z",
      "updated_at": "2019-12-27T18:11:19.117Z"
    }
  ],
  "success": true
}
```