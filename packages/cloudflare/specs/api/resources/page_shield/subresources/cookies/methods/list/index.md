---
title: List detected cookies
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Page Shield](https://developers.cloudflare.com/api/resources/page_shield)

[Cookies](https://developers.cloudflare.com/api/resources/page_shield/subresources/cookies)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List detected cookies

GET/zones/{zone\_id}/page\_shield/cookies

Lists cookies detected on the zone.

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

[Link to this property](#)%20page_shield.cookies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

<details>

<summary>

direction: optional "asc"or "desc"

The direction used to sort returned cookies.’

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_shield.cookies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

domain: optional string

Filters the returned cookies that match the specified domain attribute

maxLength1024

[Link to this property](#)%20page_shield.cookies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20domain%20%3E%20(schema)>)

export: optional "csv"

Export the list of cookies as a file, limited to 50000 entries.

[Link to this property](#)%20page_shield.cookies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20export%20%3E%20(schema)>)

hosts: optional string

Includes cookies that match one or more URL-encoded hostnames separated by commas.

Wildcards are supported at the start and end of each hostname to support starts with, ends with and contains. If no wildcards are used, results will be filtered by exact match

[Link to this property](#)%20page_shield.cookies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20hosts%20%3E%20(schema)>)

http\_only: optional boolean

Filters the returned cookies that are set with HttpOnly

[Link to this property](#)%20page_shield.cookies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20http_only%20%3E%20(schema)>)

name: optional string

Filters the returned cookies that match the specified name. Wildcards are supported at the start and end to support starts with, ends with and contains. e.g. session\*

maxLength1024

[Link to this property](#)%20page_shield.cookies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

<details>

<summary>

order\_by: optional "first\_seen\_at"or "last\_seen\_at"

The field used to sort returned cookies.

</summary>

One of the following:

"first\_seen\_at"

<a href="#">Link to this property</a>

"last\_seen\_at"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_shield.cookies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order_by%20%3E%20(schema)>)

page: optional string

The current page number of the paginated results.

We additionally support a special value “all”. When “all” is used, the API will return all the cookies with the applied filters in a single page. This feature is best-effort and it may only work for zones with a low number of cookies

[Link to this property](#)%20page_shield.cookies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

page\_url: optional string

Includes connections that match one or more page URLs (separated by commas) where they were last seen

Wildcards are supported at the start and end of each page URL to support starts with, ends with and contains. If no wildcards are used, results will be filtered by exact match

[Link to this property](#)%20page_shield.cookies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page_url%20%3E%20(schema)>)

path: optional string

Filters the returned cookies that match the specified path attribute

maxLength1024

[Link to this property](#)%20page_shield.cookies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20path%20%3E%20(schema)>)

per\_page: optional number

The number of results per page.

maximum100

minimum1

[Link to this property](#)%20page_shield.cookies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

<details>

<summary>

same\_site: optional "lax"or "strict"or "none"

Filters the returned cookies that match the specified same\_site attribute

</summary>

One of the following:

"lax"

<a href="#">Link to this property</a>

"strict"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_shield.cookies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20same_site%20%3E%20(schema)>)

secure: optional boolean

Filters the returned cookies that are set with Secure

[Link to this property](#)%20page_shield.cookies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20secure%20%3E%20(schema)>)

<details>

<summary>

type: optional "first\_party"or "unknown"

Filters the returned cookies that match the specified type attribute

</summary>

One of the following:

"first\_party"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_shield.cookies%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20type%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: array of object {id, first\_seen\_at, host, 11 more }

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

[Link to this property](#)%20page_shield.cookies%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: object {count, page, per\_page, 2 more }

</summary>

count: number

Total number of results for the requested service

<a href="#">Link to this property</a>

page: number

Current page within paginated list of results

<a href="#">Link to this property</a>

per\_page: number

Number of results per page of results

<a href="#">Link to this property</a>

total\_count: number

Total results available without any search parameters

<a href="#">Link to this property</a>

total\_pages: number

Total number of pages

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20page_shield.cookies%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

success: true

Whether the API call was successful

[Link to this property](#)%20page_shield.cookies%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20page_shield.cookies%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20page_shield.cookies%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

### List detected cookies

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/page_shield/cookies \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

200 example

```
{
  "result": [
    {
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
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
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
  "result": [
    {
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
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
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