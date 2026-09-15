---
title: Batch trusted domains operations
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

# Batch trusted domains operations

POST/accounts/{account\_id}/email-security/settings/trusted\_domains/batch

Executes multiple operations atomically. All four operation arrays (deletes, patches, puts, posts) are required and executed in order. Send empty arrays for unused operations.

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

[Link to this property](#)%20email_security.settings.trusted_domains%20%3E%20(method)%20batch%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

deletes: array of object {id }

</summary>

id: string

Trusted domain identifier.

formatuuid

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.trusted_domains%20%3E%20(method)%20batch%20%3E%20(params)%200%20%3E%20(param)%20deletes%20%3E%20(schema)>)

<details>

<summary>

patches: array of object {id, comments, created\_at, 6 more }

</summary>

id: string

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

[Link to this property](#)%20email_security.settings.trusted_domains%20%3E%20(method)%20batch%20%3E%20(params)%200%20%3E%20(param)%20patches%20%3E%20(schema)>)

<details>

<summary>

posts: array of object {is\_recent, is\_regex, is\_similarity, 6 more }

</summary>

is\_recent: boolean

Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.

<a href="#">Link to this property</a>

is\_regex: boolean

<a href="#">Link to this property</a>

is\_similarity: boolean

Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a Spoof disposition.

<a href="#">Link to this property</a>

pattern: string

maxLength1024

minLength1

<a href="#">Link to this property</a>

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

Deprecatedlast\_modified: optional string

Use <code>modified_at</code> instead.

Deprecated, use <code>modified_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.trusted_domains%20%3E%20(method)%20batch%20%3E%20(params)%200%20%3E%20(param)%20posts%20%3E%20(schema)>)

<details>

<summary>

puts: array of object {id, is\_recent, is\_regex, 6 more }

</summary>

id: string

Trusted domain identifier.

formatuuid

<a href="#">Link to this property</a>

is\_recent: boolean

Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.

<a href="#">Link to this property</a>

is\_regex: boolean

<a href="#">Link to this property</a>

is\_similarity: boolean

Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a Spoof disposition.

<a href="#">Link to this property</a>

pattern: string

maxLength1024

minLength1

<a href="#">Link to this property</a>

comments: optional string

maxLength1024

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

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

[Link to this property](#)%20email_security.settings.trusted_domains%20%3E%20(method)%20batch%20%3E%20(params)%200%20%3E%20(param)%20puts%20%3E%20(schema)>)

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

[Link to this property](#)%20email_security.settings.trusted_domains%20%3E%20(method)%20batch%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20email_security.settings.trusted_domains%20%3E%20(method)%20batch%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20email_security.settings.trusted_domains%20%3E%20(method)%20batch%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {deletes, patches, posts, puts }

</summary>

<details>

<summary>

deletes: optional array of object {id }

</summary>

id: string

Trusted domain identifier.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

patches: optional array of object {id, comments, created\_at, 6 more }

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

<a href="#">Link to this property</a>

<details>

<summary>

posts: optional array of object {id, comments, created\_at, 6 more }

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

<a href="#">Link to this property</a>

<details>

<summary>

puts: optional array of object {id, comments, created\_at, 6 more }

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

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.trusted_domains%20%3E%20(method)%20batch%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Batch trusted domains operations

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/trusted_domains/batch \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "deletes": [
            {
              "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
            }
          ],
          "patches": [
            {}
          ],
          "posts": [
            {
              "is_recent": true,
              "is_regex": false,
              "is_similarity": false,
              "pattern": "example.com"
            }
          ],
          "puts": [
            {
              "is_recent": true,
              "is_regex": false,
              "is_similarity": false,
              "pattern": "example.com"
            }
          ]
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
    "deletes": [
      {
        "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
      }
    ],
    "patches": [
      {
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
    ],
    "posts": [
      {
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
    ],
    "puts": [
      {
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
    ]
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
    "deletes": [
      {
        "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
      }
    ],
    "patches": [
      {
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
    ],
    "posts": [
      {
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
    ],
    "puts": [
      {
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
    ]
  }
}
```