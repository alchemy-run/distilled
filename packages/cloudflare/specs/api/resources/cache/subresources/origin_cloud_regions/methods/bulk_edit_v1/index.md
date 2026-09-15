---
title: Batch create or update origin cloud region mappings
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cache](https://developers.cloudflare.com/api/resources/cache)

[Origin Cloud Regions](https://developers.cloudflare.com/api/resources/cache/subresources/origin_cloud_regions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Batch create or update origin cloud region mappings

Deprecated: Use bulk\_update instead (PUT /origin/cloud\_regions/batch). Old path /cache/origin\_cloud\_regions will be removed in the future.

PATCH/zones/{zone\_id}/cache/origin\_cloud\_regions/batch

Adds or updates up to 100 IP-to-cloud-region mappings in a single request. Each item is validated independently — valid items are applied and invalid items are returned in the `failed` array. The vendor and region for every item are validated against the list from `GET /zones/{zone_id}/cache/origin_cloud_regions/supported_regions`.

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

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20bulk_edit_v1%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

body: array of object {ip, region, vendor }

</summary>

ip: string

Origin IP address (IPv4 or IPv6). Normalized to canonical form before storage (RFC 5952 for IPv6).

<a href="#">Link to this property</a>

region: string

Cloud vendor region identifier. Must be a valid region for the specified vendor as returned by the supported\_regions endpoint.

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20bulk_edit_v1%20%3E%20(params)%200%20%3E%20(param)%20body%20%3E%20(schema)>)

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

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20bulk_edit_v1%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20bulk_edit_v1%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20bulk_edit_v1%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, editable, value, modified\_on }

Response result for a batch origin cloud region operation.

</summary>

id: "origin\_public\_cloud\_region"

<a href="#">Link to this property</a>

editable: boolean

Whether the setting can be modified by the current user.

<a href="#">Link to this property</a>

<details>

<summary>

value: object {failed, succeeded }

</summary>

<details>

<summary>

failed: array of object {"origin-ip", error, region, vendor }

Items that could not be applied, with error details.

</summary>

"origin-ip": string

The origin IP address for this item.

<a href="#">Link to this property</a>

error: optional string

Error message explaining why the item failed. Present only on failed items.

<a href="#">Link to this property</a>

region: optional string

Cloud vendor region identifier. Present on succeeded items for patch operations.

<a href="#">Link to this property</a>

vendor: optional string

Cloud vendor identifier. Present on succeeded items for patch operations.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

succeeded: array of object {"origin-ip", error, region, vendor }

Items that were successfully applied.

</summary>

"origin-ip": string

The origin IP address for this item.

<a href="#">Link to this property</a>

error: optional string

Error message explaining why the item failed. Present only on failed items.

<a href="#">Link to this property</a>

region: optional string

Cloud vendor region identifier. Present on succeeded items for patch operations.

<a href="#">Link to this property</a>

vendor: optional string

Cloud vendor identifier. Present on succeeded items for patch operations.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

Time the mapping set was last modified. Null when no items were successfully applied.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20bulk_edit_v1%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Batch create or update origin cloud region mappings

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/origin_cloud_regions/batch \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "ip": "192.0.2.1",
            "region": "us-east-1",
            "vendor": "aws"
          },
          {
            "ip": "2001:db8::1",
            "region": "us-central1",
            "vendor": "gcp"
          }
        ]'
```

200 example

4XX example

5XX example

5XX example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "editable": true,
    "id": "origin_public_cloud_region",
    "modified_on": "2026-03-01T12:00:00Z",
    "value": {
      "failed": [],
      "succeeded": [
        {
          "origin-ip": "192.0.2.1",
          "region": "us-east-1",
          "vendor": "aws"
        },
        {
          "origin-ip": "2001:db8::1",
          "region": "us-central1",
          "vendor": "gcp"
        }
      ]
    }
  },
  "success": true
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

```
{
  "errors": [
    {
      "code": 1140,
      "message": "Unable to update origin_public_cloud_region setting value. Internal error."
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
      "code": 1156,
      "message": "Failed to validate region against cloud vendor"
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

5XX example

5XX example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "editable": true,
    "id": "origin_public_cloud_region",
    "modified_on": "2026-03-01T12:00:00Z",
    "value": {
      "failed": [],
      "succeeded": [
        {
          "origin-ip": "192.0.2.1",
          "region": "us-east-1",
          "vendor": "aws"
        },
        {
          "origin-ip": "2001:db8::1",
          "region": "us-central1",
          "vendor": "gcp"
        }
      ]
    }
  },
  "success": true
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

```
{
  "errors": [
    {
      "code": 1140,
      "message": "Unable to update origin_public_cloud_region setting value. Internal error."
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
      "code": 1156,
      "message": "Failed to validate region against cloud vendor"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```