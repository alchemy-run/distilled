---
title: Update a URL ignore pattern
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Security](https://developers.cloudflare.com/api/resources/email_security)

[Settings](https://developers.cloudflare.com/api/resources/email_security/subresources/settings)

[URL Ignore Patterns](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/url_ignore_patterns)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update a URL ignore pattern

PATCH/accounts/{account\_id}/email-security/settings/url\_ignore\_patterns/{pattern\_id}

Updates an existing URL rewrite ignore pattern. Only provided fields will be modified.

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

[Link to this property](#)%20email_security.settings.url_ignore_patterns%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

pattern\_id: string

URL ignore pattern identifier.

formatuuid

[Link to this property](#)%20email_security.settings.url_ignore_patterns%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20pattern_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

comments: optional string

Optional note describing the reason for the ignore pattern.

maxLength1024

[Link to this property](#)%20email_security.settings.url_ignore_patterns%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20comments%20%3E%20(schema)>)

pattern: optional string

Regular expression identifying URLs to exempt from rewriting.

maxLength1024

minLength1

[Link to this property](#)%20email_security.settings.url_ignore_patterns%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20pattern%20%3E%20(schema)>)

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

[Link to this property](#)%20email_security.settings.url_ignore_patterns%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20email_security.settings.url_ignore_patterns%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20email_security.settings.url_ignore_patterns%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, created\_at, pattern, 3 more }

A URL ignore pattern that exempts matching URLs from Email Security’s URL rewriting.

</summary>

id: string

URL ignore pattern identifier.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

pattern: string

Regular expression identifying URLs to exempt from rewriting.

maxLength1024

minLength1

<a href="#">Link to this property</a>

comments: optional string

Optional note describing the reason for the ignore pattern.

maxLength1024

<a href="#">Link to this property</a>

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.url_ignore_patterns%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Update a URL ignore pattern

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/url_ignore_patterns/$PATTERN_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "comments": "Trusted internal redirect service",
          "pattern": "https://example\\\\.com/.*"
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
    "created_at": "2019-12-27T18:11:19.117Z",
    "pattern": "https://example\\.com/.*",
    "comments": "Trusted internal redirect service",
    "last_modified": "2019-12-27T18:11:19.117Z",
    "modified_at": "2019-12-27T18:11:19.117Z"
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
    "created_at": "2019-12-27T18:11:19.117Z",
    "pattern": "https://example\\.com/.*",
    "comments": "Trusted internal redirect service",
    "last_modified": "2019-12-27T18:11:19.117Z",
    "modified_at": "2019-12-27T18:11:19.117Z"
  }
}
```