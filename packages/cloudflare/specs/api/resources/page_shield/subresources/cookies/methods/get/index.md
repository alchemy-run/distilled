---
title: Get a detected cookie
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Page Shield](https://developers.cloudflare.com/api/resources/page_shield)

[Cookies](https://developers.cloudflare.com/api/resources/page_shield/subresources/cookies)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get a detected cookie

GET/zones/{zone\_id}/page\_shield/cookies/{cookie\_id}

Returns a cookie detected on the zone by cookie ID.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Page Shield``Domain Page Shield Read``Domain Page Shield``Page Shield Read``Zone Settings Write``Zone Settings Read`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier

maxLength32

[Link to this property](#)%20page_shield.cookies%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

cookie\_id: string

Identifier

maxLength32

[Link to this property](#)%20page_shield.cookies%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20cookie_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {id, first\_seen\_at, host, 11 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

first\_seen\_at: string

formatdate-time

<a href="#">Link to this property</a>

host: string

<a href="#">Link to this property</a>

last\_seen\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

type: "first\_party"or "unknown"

</summary>

One of the following:

"first\_party"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

domain\_attribute: optional string

<a href="#">Link to this property</a>

expires\_attribute: optional string

formatdate-time

<a href="#">Link to this property</a>

http\_only\_attribute: optional boolean

<a href="#">Link to this property</a>

max\_age\_attribute: optional number

<a href="#">Link to this property</a>

page\_urls: optional array of string

<a href="#">Link to this property</a>

path\_attribute: optional string

<a href="#">Link to this property</a>

<details>

<summary>

same\_site\_attribute: optional "lax"or "strict"or "none"

</summary>

One of the following:

"lax"

<a href="#">Link to this property</a>

"strict"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

secure\_attribute: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_shield.cookies%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20page_shield.cookies%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

errors: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20page_shield.cookies%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20page_shield.cookies%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

### Get a detected cookie

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/page_shield/cookies/$COOKIE_ID \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

200 example

```
{
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "first_seen_at": "2021-08-18T10:51:08Z",
    "host": "blog.cloudflare.com",
    "last_seen_at": "2021-09-02T09:57:54Z",
    "name": "session_id",
    "type": "first_party",
    "domain_attribute": "cloudflare.com",
    "expires_attribute": "2021-10-02T09:57:54Z",
    "http_only_attribute": true,
    "max_age_attribute": 3600,
    "page_urls": [
      "blog.cloudflare.com/page1",
      "blog.cloudflare.com/page2"
    ],
    "path_attribute": "/",
    "same_site_attribute": "strict",
    "secure_attribute": true
  },
  "success": true,
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
  ]
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "first_seen_at": "2021-08-18T10:51:08Z",
    "host": "blog.cloudflare.com",
    "last_seen_at": "2021-09-02T09:57:54Z",
    "name": "session_id",
    "type": "first_party",
    "domain_attribute": "cloudflare.com",
    "expires_attribute": "2021-10-02T09:57:54Z",
    "http_only_attribute": true,
    "max_age_attribute": 3600,
    "page_urls": [
      "blog.cloudflare.com/page1",
      "blog.cloudflare.com/page2"
    ],
    "path_attribute": "/",
    "same_site_attribute": "strict",
    "secure_attribute": true
  },
  "success": true,
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
  ]
}
```