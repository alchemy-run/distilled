---
title: List origin cloud region mappings
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cache](https://developers.cloudflare.com/api/resources/cache)

[Origin Cloud Regions](https://developers.cloudflare.com/api/resources/cache/subresources/origin_cloud_regions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List origin cloud region mappings

GET/zones/{zone\_id}/origin/cloud\_regions

Returns all IP-to-cloud-region mappings configured for the zone with pagination support. Each mapping tells Cloudflare which cloud vendor and region hosts the origin at that IP, enabling the edge to route via the nearest Tiered Cache upper-tier co-located with that cloud provider. Returns an empty array when no mappings exist.

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

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

page: optional number

Page number of paginated results.

minimum1

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of items per page.

maximum100

minimum1

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

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

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of <a href="https://developers.cloudflare.com/api/resources/cache#(resource)%20cache.origin_cloud_regions%20%3E%20(model)%20origin_cloud_region%20%3E%20(schema)">OriginCloudRegion</a> { origin\_ip, region, vendor, modified\_on }

</summary>

origin\_ip: string

The origin IP address (IPv4 or IPv6). Normalized to canonical form (RFC 5952 for IPv6).

<a href="#">Link to this property</a>

region: string

Cloud vendor region identifier.

<a href="#">Link to this property</a>

<details>

<summary>

vendor: "aws"or "azure"or "gcp"or "oci"

Cloud vendor hosting the origin.

</summary>

One of the following:

"aws"

<a href="#">Link to this property</a>

"azure"

<a href="#">Link to this property</a>

"gcp"

<a href="#">Link to this property</a>

"oci"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

Time this mapping was last modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: object {count, page, per\_page, 2 more }

Pagination metadata for list responses.

</summary>

count: number

Number of items returned in this response.

<a href="#">Link to this property</a>

page: number

Current page number.

<a href="#">Link to this property</a>

per\_page: number

Number of items per page.

<a href="#">Link to this property</a>

total\_count: number

Total number of mappings configured for the zone.

<a href="#">Link to this property</a>

total\_pages: number

Total number of pages.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

success: true

Whether the API call was successful.

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List origin cloud region mappings

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/origin/cloud_regions \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

200 example

4XX example

```
{
  "errors": [],
  "messages": [],
  "result": [],
  "result_info": {
    "count": 0,
    "page": 1,
    "per_page": 20,
    "total_count": 0,
    "total_pages": 0
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": [
    {
      "modified_on": "2026-03-01T12:00:00Z",
      "origin_ip": "192.0.2.1",
      "region": "us-east-1",
      "vendor": "aws"
    },
    {
      "modified_on": "2026-03-01T12:30:00Z",
      "origin_ip": "2001:db8::1",
      "region": "us-central1",
      "vendor": "gcp"
    }
  ],
  "result_info": {
    "count": 2,
    "page": 1,
    "per_page": 20,
    "total_count": 2,
    "total_pages": 1
  },
  "success": true
}
```

```
{
  "errors": [
    {
      "code": 1146,
      "message": "invalid per_page parameter, must be between 1 and 100"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

##### Returns Examples

200 example

200 example

4XX example

```
{
  "errors": [],
  "messages": [],
  "result": [],
  "result_info": {
    "count": 0,
    "page": 1,
    "per_page": 20,
    "total_count": 0,
    "total_pages": 0
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": [
    {
      "modified_on": "2026-03-01T12:00:00Z",
      "origin_ip": "192.0.2.1",
      "region": "us-east-1",
      "vendor": "aws"
    },
    {
      "modified_on": "2026-03-01T12:30:00Z",
      "origin_ip": "2001:db8::1",
      "region": "us-central1",
      "vendor": "gcp"
    }
  ],
  "result_info": {
    "count": 2,
    "page": 1,
    "per_page": 20,
    "total_count": 2,
    "total_pages": 1
  },
  "success": true
}
```

```
{
  "errors": [
    {
      "code": 1146,
      "message": "invalid per_page parameter, must be between 1 and 100"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```