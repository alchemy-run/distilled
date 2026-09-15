---
title: Get email trace
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Security](https://developers.cloudflare.com/api/resources/email_security)

[Investigate](https://developers.cloudflare.com/api/resources/email_security/subresources/investigate)

[Trace](https://developers.cloudflare.com/api/resources/email_security/subresources/investigate/subresources/trace)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get email trace

GET/accounts/{account\_id}/email-security/investigate/{investigate\_id}/trace

Retrieves delivery and processing trace information for an email message. Shows the delivery path, retraction history, and move operations performed on the message. Useful for debugging delivery issues.

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

[Link to this property](#)%20email_security.investigate.trace%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

investigate\_id: string

Unique identifier for a message retrieved from investigation.

[Link to this property](#)%20email_security.investigate.trace%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20investigate_id%20%3E%20(schema)>)

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

[Link to this property](#)%20email_security.investigate.trace%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20email_security.investigate.trace%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {inbound, outbound }

</summary>

<details>

<summary>

inbound: object {lines, pending }

</summary>

<details>

<summary>

lines: optional array of object {lineno, logged\_at, message, ts }

</summary>

lineno: optional number

Line number in the trace log.

<a href="#">Link to this property</a>

logged\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

Deprecatedts: optional string

Use <code>logged_at</code> instead.

Deprecated, use <code>logged_at</code> instead. End of life: November 1, 2026.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

pending: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

outbound: object {lines, pending }

</summary>

<details>

<summary>

lines: optional array of object {lineno, logged\_at, message, ts }

</summary>

lineno: optional number

Line number in the trace log.

<a href="#">Link to this property</a>

logged\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

Deprecatedts: optional string

Use <code>logged_at</code> instead.

Deprecated, use <code>logged_at</code> instead. End of life: November 1, 2026.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

pending: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.investigate.trace%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20email_security.investigate.trace%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get email trace

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/investigate/$INVESTIGATE_ID/trace \
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
  "result": {
    "inbound": {
      "lines": [
        {
          "lineno": 0,
          "logged_at": "2019-12-27T18:11:19.117Z",
          "message": "message",
          "ts": "ts"
        }
      ],
      "pending": true
    },
    "outbound": {
      "lines": [
        {
          "lineno": 0,
          "logged_at": "2019-12-27T18:11:19.117Z",
          "message": "message",
          "ts": "ts"
        }
      ],
      "pending": true
    }
  },
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
  "result": {
    "inbound": {
      "lines": [
        {
          "lineno": 0,
          "logged_at": "2019-12-27T18:11:19.117Z",
          "message": "message",
          "ts": "ts"
        }
      ],
      "pending": true
    },
    "outbound": {
      "lines": [
        {
          "lineno": 0,
          "logged_at": "2019-12-27T18:11:19.117Z",
          "message": "message",
          "ts": "ts"
        }
      ],
      "pending": true
    }
  },
  "success": true
}
```