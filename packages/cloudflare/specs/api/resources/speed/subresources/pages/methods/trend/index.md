---
title: List core web vital metrics trend
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Speed](https://developers.cloudflare.com/api/resources/speed)

[Pages](https://developers.cloudflare.com/api/resources/speed/subresources/pages)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List core web vital metrics trend

GET/zones/{zone\_id}/speed\_api/pages/{url}/trend

Lists the core web vital metrics trend over time for a specific page.

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

`Zone Settings Write``Zone Settings Read`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20speed.pages%20%3E%20(method)%20trend%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

url: string

A URL.

[Link to this property](#)%20speed.pages%20%3E%20(method)%20trend%20%3E%20(params)%20default%20%3E%20(param)%20url%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

<details>

<summary>

deviceType: "DESKTOP"or "MOBILE"

The type of device.

</summary>

One of the following:

"DESKTOP"

<a href="#">Link to this property</a>

"MOBILE"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20speed.pages%20%3E%20(method)%20trend%20%3E%20(params)%20default%20%3E%20(param)%20deviceType%20%3E%20(schema)>)

metrics: string

A comma-separated list of metrics to include in the results.

[Link to this property](#)%20speed.pages%20%3E%20(method)%20trend%20%3E%20(params)%20default%20%3E%20(param)%20metrics%20%3E%20(schema)>)

<details>

<summary>

region: "asia-east1"or "asia-northeast1"or "asia-northeast2"or 18 more

A test region.

</summary>

One of the following:

"asia-east1"

<a href="#">Link to this property</a>

"asia-northeast1"

<a href="#">Link to this property</a>

"asia-northeast2"

<a href="#">Link to this property</a>

"asia-south1"

<a href="#">Link to this property</a>

"asia-southeast1"

<a href="#">Link to this property</a>

"australia-southeast1"

<a href="#">Link to this property</a>

"europe-north1"

<a href="#">Link to this property</a>

"europe-southwest1"

<a href="#">Link to this property</a>

"europe-west1"

<a href="#">Link to this property</a>

"europe-west2"

<a href="#">Link to this property</a>

"europe-west3"

<a href="#">Link to this property</a>

"europe-west4"

<a href="#">Link to this property</a>

"europe-west8"

<a href="#">Link to this property</a>

"europe-west9"

<a href="#">Link to this property</a>

"me-west1"

<a href="#">Link to this property</a>

"southamerica-east1"

<a href="#">Link to this property</a>

"us-central1"

<a href="#">Link to this property</a>

"us-east1"

<a href="#">Link to this property</a>

"us-east4"

<a href="#">Link to this property</a>

"us-south1"

<a href="#">Link to this property</a>

"us-west1"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20speed.pages%20%3E%20(method)%20trend%20%3E%20(params)%20default%20%3E%20(param)%20region%20%3E%20(schema)>)

start: string

formatdate-time

[Link to this property](#)%20speed.pages%20%3E%20(method)%20trend%20%3E%20(params)%20default%20%3E%20(param)%20start%20%3E%20(schema)>)

tz: string

The timezone of the start and end timestamps.

[Link to this property](#)%20speed.pages%20%3E%20(method)%20trend%20%3E%20(params)%20default%20%3E%20(param)%20tz%20%3E%20(schema)>)

end: optional string

formatdate-time

[Link to this property](#)%20speed.pages%20%3E%20(method)%20trend%20%3E%20(params)%20default%20%3E%20(param)%20end%20%3E%20(schema)>)

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

[Link to this property](#)%20speed.pages%20%3E%20(method)%20trend%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20speed.pages%20%3E%20(method)%20trend%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20speed.pages%20%3E%20(method)%20trend%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/speed#(resource)%20speed%20%3E%20(model)%20trend%20%3E%20(schema)">Trend</a> { cls, fcp, lcp, 5 more }

</summary>

cls: optional array of number

Cumulative Layout Shift trend.

<a href="#">Link to this property</a>

fcp: optional array of number

First Contentful Paint trend.

<a href="#">Link to this property</a>

lcp: optional array of number

Largest Contentful Paint trend.

<a href="#">Link to this property</a>

performanceScore: optional array of number

The Lighthouse score trend.

<a href="#">Link to this property</a>

si: optional array of number

Speed Index trend.

<a href="#">Link to this property</a>

tbt: optional array of number

Total Blocking Time trend.

<a href="#">Link to this property</a>

ttfb: optional array of number

Time To First Byte trend.

<a href="#">Link to this property</a>

tti: optional array of number

Time To Interactive trend.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20speed.pages%20%3E%20(method)%20trend%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### List core web vital metrics trend

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/speed_api/pages/$URL/trend \
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
    "cls": [
      0
    ],
    "fcp": [
      0
    ],
    "lcp": [
      0
    ],
    "performanceScore": [
      0
    ],
    "si": [
      0
    ],
    "tbt": [
      0
    ],
    "ttfb": [
      0
    ],
    "tti": [
      0
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
    "cls": [
      0
    ],
    "fcp": [
      0
    ],
    "lcp": [
      0
    ],
    "performanceScore": [
      0
    ],
    "si": [
      0
    ],
    "tbt": [
      0
    ],
    "ttfb": [
      0
    ],
    "tti": [
      0
    ]
  }
}
```