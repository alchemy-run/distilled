---
title: Create trusted email domain
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Security](https://developers.cloudflare.com/api/resources/email_security)

[Settings](https://developers.cloudflare.com/api/resources/email_security/subresources/settings)

[Trusted Domains](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/trusted_domains)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create trusted email domain

POST/accounts/{account\_id}/email-security/settings/trusted\_domains

Creates a new trusted domain pattern. Use for partner domains or approved senders that should bypass recent domain registration and similarity checks. Configure whether it prevents recent domain or spoof dispositions.

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

`Cloud Email Security: Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20email_security.settings.trusted_domains%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

is\_recent: boolean

Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.

[Link to this property](#)%20email_security.settings.trusted_domains%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20is_recent%20%3E%20(schema)>)

is\_regex: boolean

[Link to this property](#)%20email_security.settings.trusted_domains%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20is_regex%20%3E%20(schema)>)

is\_similarity: boolean

Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a Spoof disposition.

[Link to this property](#)%20email_security.settings.trusted_domains%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20is_similarity%20%3E%20(schema)>)

pattern: string

maxLength1024

minLength1

[Link to this property](#)%20email_security.settings.trusted_domains%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20pattern%20%3E%20(schema)>)

comments: optional string

maxLength1024

[Link to this property](#)%20email_security.settings.trusted_domains%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20comments%20%3E%20(schema)>)

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

[Link to this property](#)%20email_security.settings.trusted_domains%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20email_security.settings.trusted_domains%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20email_security.settings.trusted_domains%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, comments, created\_at, 6 more }

A trusted email domain.

</summary>

id: optional string

Trusted domain identifier.

formatuuid

<a href="#">Link to this property</a>

comments: optional string

maxLength1024

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

is\_recent: optional boolean

Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.

<a href="#">Link to this property</a>

is\_regex: optional boolean

<a href="#">Link to this property</a>

is\_similarity: optional boolean

Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a Spoof disposition.

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

maxLength1024

minLength1

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.trusted_domains%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create trusted email domain

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/trusted_domains \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "is_recent": true,
          "is_regex": false,
          "is_similarity": false,
          "pattern": "example.com",
          "comments": "Trusted partner domain"
        }'
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
    "comments": "Trusted partner domain",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "is_recent": true,
    "is_regex": false,
    "is_similarity": false,
    "last_modified": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "pattern": "example.com"
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
    "comments": "Trusted partner domain",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "is_recent": true,
    "is_regex": false,
    "is_similarity": false,
    "last_modified": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "pattern": "example.com"
  }
}
```