---
title: Get Bucket CORS Policy
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[R2](https://developers.cloudflare.com/api/resources/r2)

[Buckets](https://developers.cloudflare.com/api/resources/r2/subresources/buckets)

[CORS](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/cors)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Bucket CORS Policy

GET/accounts/{account\_id}/r2/buckets/{bucket\_name}/cors

Get the CORS policy for a bucket.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

maxLength32

[Link to this property](#)%20r2.buckets.cors%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

bucket\_name: string

Name of the bucket.

maxLength64

minLength3

[Link to this property](#)%20r2.buckets.cors%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20bucket_name%20%3E%20(schema)>)

##### H eader ParametersExpand Collapse

<details>

<summary>

"cf-r2-jurisdiction": optional "default"or "eu"or "us"or 2 more

Jurisdiction where objects in this bucket are guaranteed to be stored.

</summary>

One of the following:

"default"

<a href="#">Link to this property</a>

"eu"

<a href="#">Link to this property</a>

"us"

<a href="#">Link to this property</a>

"fedramp"

<a href="#">Link to this property</a>

"fedramp-high"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.cors%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20jurisdiction%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20r2.buckets.cors%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of string

[Link to this property](#)%20r2.buckets.cors%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {rules }

</summary>

<details>

<summary>

rules: optional array of object {allowed, id, exposeHeaders, maxAgeSeconds }

</summary>

<details>

<summary>

allowed: object {methods, origins, headers }

Object specifying allowed origins, methods and headers for this CORS rule.

</summary>

<details>

<summary>

methods: array of "GET"or "PUT"or "POST"or 2 more

Specifies the value for the Access-Control-Allow-Methods header R2 sets when requesting objects in a bucket from a browser.

</summary>

One of the following:

"GET"

<a href="#">Link to this property</a>

"PUT"

<a href="#">Link to this property</a>

"POST"

<a href="#">Link to this property</a>

"DELETE"

<a href="#">Link to this property</a>

"HEAD"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

origins: array of string

Specifies the value for the Access-Control-Allow-Origin header R2 sets when requesting objects in a bucket from a browser.

<a href="#">Link to this property</a>

headers: optional array of string

Specifies the value for the Access-Control-Allow-Headers header R2 sets when requesting objects in this bucket from a browser. Cross-origin requests that include custom headers (e.g. x-user-id) should specify these headers as AllowedHeaders.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

id: optional string

Identifier for this rule.

<a href="#">Link to this property</a>

exposeHeaders: optional array of string

Specifies the headers that can be exposed back, and accessed by, the JavaScript making the cross-origin request. If you need to access headers beyond the safelisted response headers, such as Content-Encoding or cf-cache-status, you must specify it here.

<a href="#">Link to this property</a>

maxAgeSeconds: optional number

Specifies the amount of time (in seconds) browsers are allowed to cache CORS preflight responses. Browsers may limit this to 2 hours or less, even if the maximum value (86400) is specified.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.cors%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20r2.buckets.cors%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get Bucket CORS Policy

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/cors \
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
    "string"
  ],
  "result": {
    "rules": [
      {
        "allowed": {
          "methods": [
            "GET"
          ],
          "origins": [
            "http://localhost:3000"
          ],
          "headers": [
            "x-requested-by"
          ]
        },
        "id": "Allow Local Development",
        "exposeHeaders": [
          "Content-Encoding"
        ],
        "maxAgeSeconds": 3600
      }
    ]
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
    "string"
  ],
  "result": {
    "rules": [
      {
        "allowed": {
          "methods": [
            "GET"
          ],
          "origins": [
            "http://localhost:3000"
          ],
          "headers": [
            "x-requested-by"
          ]
        },
        "id": "Allow Local Development",
        "exposeHeaders": [
          "Content-Encoding"
        ],
        "maxAgeSeconds": 3600
      }
    ]
  },
  "success": true
}
```