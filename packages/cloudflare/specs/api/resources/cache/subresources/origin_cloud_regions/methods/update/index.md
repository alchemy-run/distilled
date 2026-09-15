---
title: Create or replace an origin cloud region mapping
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cache](https://developers.cloudflare.com/api/resources/cache)

[Origin Cloud Regions](https://developers.cloudflare.com/api/resources/cache/subresources/origin_cloud_regions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create or replace an origin cloud region mapping

PUT/zones/{zone\_id}/origin/cloud\_regions/{origin\_ip}

Creates a new IP-to-cloud-region mapping or replaces the existing mapping for the specified IP. PUT is idempotent — calling it repeatedly with the same body produces the same result. The IP path parameter is normalized to canonical form (RFC 5952 for IPv6) before storage. The vendor and region are validated against the list from `GET /zones/{zone_id}/origin/cloud_regions/supported_regions`. Returns 400 if the `origin_ip` in the body does not match the URL path parameter. Returns 403 (code 1164) when the zone has reached the limit of 3,500 IP mappings.

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

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

origin\_ip: string

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20origin_ip%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

origin\_ip: string

Origin IP address (IPv4 or IPv6). For the single PUT endpoint (`PUT /origin/cloud_regions/{origin_ip}`), this field must match the path parameter or the request will be rejected with a 400 error. For the batch PUT endpoint, this field identifies which mapping to upsert.

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20origin_ip%20%3E%20(schema)>)

region: string

Cloud vendor region identifier. Must be a valid region for the specified vendor as returned by the supported\_regions endpoint.

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20region%20%3E%20(schema)>)

<details>

<summary>

vendor: "aws"or "azure"or "gcp"or "oci"

Cloud vendor hosting the origin. Must be one of the supported vendors.

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

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20vendor%20%3E%20(schema)>)

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

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/cache#(resource)%20cache.origin_cloud_regions%20%3E%20(model)%20origin_cloud_region%20%3E%20(schema)">OriginCloudRegion</a> { origin\_ip, region, vendor, modified\_on }

A single origin IP-to-cloud-region mapping.

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

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create or replace an origin cloud region mapping

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/origin/cloud_regions/$ORIGIN_IP \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "origin_ip": "192.0.2.1",
          "region": "us-east-1",
          "vendor": "aws"
        }'
```

200 example

4XX example

4XX example

4XX example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "modified_on": "2026-03-01T12:00:00Z",
    "origin_ip": "192.0.2.1",
    "region": "us-east-1",
    "vendor": "aws"
  },
  "success": true
}
```

```
{
  "errors": [
    {
      "code": 1157,
      "message": "The vendor provided doesn't exist or the region provided does not exist for the specified cloud vendor"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 1146,
      "message": "body origin_ip does not match URL"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 1164,
      "message": "Maximum number of IP mappings configured for zone."
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

##### Returns Examples

200 example

4XX example

4XX example

4XX example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "modified_on": "2026-03-01T12:00:00Z",
    "origin_ip": "192.0.2.1",
    "region": "us-east-1",
    "vendor": "aws"
  },
  "success": true
}
```

```
{
  "errors": [
    {
      "code": 1157,
      "message": "The vendor provided doesn't exist or the region provided does not exist for the specified cloud vendor"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 1146,
      "message": "body origin_ip does not match URL"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 1164,
      "message": "Maximum number of IP mappings configured for zone."
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```