---
title: List supported cloud vendors and regions
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cache](https://developers.cloudflare.com/api/resources/cache)

[Origin Cloud Regions](https://developers.cloudflare.com/api/resources/cache/subresources/origin_cloud_regions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List supported cloud vendors and regions

Deprecated: Use supported\_regions instead. Old path /cache/origin\_cloud\_regions will be removed in the future.

GET/zones/{zone\_id}/cache/origin\_cloud\_regions/supported\_regions

Returns the cloud vendors and regions that are valid values for origin cloud region mappings. Each region includes the Tiered Cache upper-tier colocation codes that will be used for cache routing when a mapping targeting that region is active. Requires the zone to have Tiered Cache enabled.

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

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20supported_regions_v1%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

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

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20supported_regions_v1%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20supported_regions_v1%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20supported_regions_v1%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {obtained\_codes, vendors }

Cloud vendors and their supported regions for origin cloud region mappings.

</summary>

obtained\_codes: boolean

Whether Cloudflare airport codes (IATA colo identifiers) were successfully resolved for the <code>upper_tier_colos</code> field on each region. When <code>false</code>, the <code>upper_tier_colos</code> arrays may be empty or incomplete.

<a href="#">Link to this property</a>

<details>

<summary>

vendors: map\[array of object {name, upper\_tier\_colos } ]

Map of vendor name to list of supported regions.

</summary>

name: string

Cloud vendor region identifier.

<a href="#">Link to this property</a>

upper\_tier\_colos: array of string

Cloudflare Tiered Cache upper-tier colocation codes co-located with this cloud region. Requests from zones with a matching origin mapping will be routed through these colos.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20supported_regions_v1%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### List supported cloud vendors and regions

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/origin_cloud_regions/supported_regions \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "obtained_codes": true,
    "vendors": {
      "aws": [
        {
          "name": "us-east-1",
          "upper_tier_colos": [
            "IAD",
            "EWR"
          ]
        },
        {
          "name": "us-west-2",
          "upper_tier_colos": [
            "SEA"
          ]
        }
      ],
      "gcp": [
        {
          "name": "us-central1",
          "upper_tier_colos": [
            "ORD"
          ]
        }
      ]
    }
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "obtained_codes": true,
    "vendors": {
      "aws": [
        {
          "name": "us-east-1",
          "upper_tier_colos": [
            "IAD",
            "EWR"
          ]
        },
        {
          "name": "us-west-2",
          "upper_tier_colos": [
            "SEA"
          ]
        }
      ],
      "gcp": [
        {
          "name": "us-central1",
          "upper_tier_colos": [
            "ORD"
          ]
        }
      ]
    }
  },
  "success": true
}
```