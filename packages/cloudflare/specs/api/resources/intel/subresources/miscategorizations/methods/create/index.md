---
title: Create Miscategorization
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Intel](https://developers.cloudflare.com/api/resources/intel)

[Miscategorizations](https://developers.cloudflare.com/api/resources/intel/subresources/miscategorizations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create Miscategorization

POST/accounts/{account\_id}/intel/miscategorization

Allows you to submit requests to change a domain’s category.

Requests that include category `169` (New Domains) or category `177` (Newly Seen) in any of `content_adds`, `content_removes`, `security_adds`, or `security_removes` will be rejected with a `400 Bad Request`. These categories are automatically managed and fall off 30 days after they are applied.

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

[Link to this property](#)%20intel.miscategorizations%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

content\_adds: optional array of number

Content category IDs to add.

[Link to this property](#)%20intel.miscategorizations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20content_adds%20%3E%20(schema)>)

content\_removes: optional array of number

Content category IDs to remove.

[Link to this property](#)%20intel.miscategorizations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20content_removes%20%3E%20(schema)>)

<details>

<summary>

indicator\_type: optional "domain"or "ipv4"or "ipv6"or "url"

</summary>

One of the following:

"domain"

<a href="#">Link to this property</a>

"ipv4"

<a href="#">Link to this property</a>

"ipv6"

<a href="#">Link to this property</a>

"url"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.miscategorizations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20indicator_type%20%3E%20(schema)>)

ip: optional string

Provide only if indicator\_type is `ipv4` or `ipv6`.

[Link to this property](#)%20intel.miscategorizations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20ip%20%3E%20(schema)>)

security\_adds: optional array of number

Security category IDs to add.

[Link to this property](#)%20intel.miscategorizations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20security_adds%20%3E%20(schema)>)

security\_removes: optional array of number

Security category IDs to remove.

[Link to this property](#)%20intel.miscategorizations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20security_removes%20%3E%20(schema)>)

url: optional string

Provide only if indicator\_type is `domain` or `url`. Example if indicator\_type is `domain`: `example.com`. Example if indicator\_type is `url`: `https://example.com/news/`.

[Link to this property](#)%20intel.miscategorizations%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20url%20%3E%20(schema)>)

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

[Link to this property](#)%20intel.miscategorizations%20%3E%20(model)%20miscategorization_create_response%20%3E%20(schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20intel.miscategorizations%20%3E%20(model)%20miscategorization_create_response%20%3E%20(schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20intel.miscategorizations%20%3E%20(model)%20miscategorization_create_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Create Miscategorization

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/miscategorization \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "content_adds": [
            82
          ],
          "content_removes": [
            155
          ],
          "indicator_type": "domain",
          "security_adds": [
            117,
            131
          ],
          "security_removes": [
            83
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
  "success": true
}
```