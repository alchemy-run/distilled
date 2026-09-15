---
title: Get an origin cloud region mapping
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cache](https://developers.cloudflare.com/api/resources/cache)

[Origin Cloud Regions](https://developers.cloudflare.com/api/resources/cache/subresources/origin_cloud_regions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get an origin cloud region mapping

Deprecated: Use get instead. Old path /cache/origin\_cloud\_regions will be removed in the future.

GET/zones/{zone\_id}/cache/origin\_cloud\_regions/{origin\_ip}

Returns the cloud region mapping for a single origin IP address. The IP path parameter is normalized before lookup (RFC 5952 for IPv6). Returns 404 (code 1142) if the zone has no mappings or if the specified IP has no mapping.

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

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20get_v1%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

origin\_ip: string

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20get_v1%20%3E%20(params)%20default%20%3E%20(param)%20origin_ip%20%3E%20(schema)>)

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

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20get_v1%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20get_v1%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20get_v1%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, editable, value, modified\_on }

Response result for a single origin cloud region mapping.

</summary>

id: "origin\_public\_cloud\_region"

<a href="#">Link to this property</a>

editable: boolean

Whether the setting can be modified by the current user.

<a href="#">Link to this property</a>

<details>

<summary>

value: object {"origin-ip", region, vendor, modified\_on }

A single origin IP-to-cloud-region mapping.

</summary>

"origin-ip": string

The origin IP address (IPv4 or IPv6, canonicalized).

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

<a href="#">Link to this property</a>

modified\_on: optional string

Time the mapping was last modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20get_v1%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get an origin cloud region mapping

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/origin_cloud_regions/$ORIGIN_IP \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

4XX example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "editable": true,
    "id": "origin_public_cloud_region",
    "modified_on": "2026-03-01T12:00:00Z",
    "value": {
      "modified_on": "2026-03-01T12:00:00Z",
      "origin-ip": "192.0.2.1",
      "region": "us-east-1",
      "vendor": "aws"
    }
  },
  "success": true
}
```

```
{
  "errors": [
    {
      "code": 1142,
      "message": "Unable to retrieve origin_public_cloud_region setting value. The zone setting does not exist."
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

```
{
  "errors": [],
  "messages": [],
  "result": {
    "editable": true,
    "id": "origin_public_cloud_region",
    "modified_on": "2026-03-01T12:00:00Z",
    "value": {
      "modified_on": "2026-03-01T12:00:00Z",
      "origin-ip": "192.0.2.1",
      "region": "us-east-1",
      "vendor": "aws"
    }
  },
  "success": true
}
```

```
{
  "errors": [
    {
      "code": 1142,
      "message": "Unable to retrieve origin_public_cloud_region setting value. The zone setting does not exist."
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```