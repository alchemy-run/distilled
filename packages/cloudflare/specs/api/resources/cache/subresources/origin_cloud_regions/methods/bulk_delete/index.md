---
title: Batch delete origin cloud region mappings
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cache](https://developers.cloudflare.com/api/resources/cache)

[Origin Cloud Regions](https://developers.cloudflare.com/api/resources/cache/subresources/origin_cloud_regions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Batch delete origin cloud region mappings

DELETE/zones/{zone\_id}/origin/cloud\_regions/batch

Removes up to 100 IP-to-cloud-region mappings in a single request. Each IP is validated independently — successfully deleted items are returned in the `succeeded` array and IPs that could not be found or are invalid are returned in the `failed` array.

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

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20bulk_delete%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

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

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20bulk_delete%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20bulk_delete%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20bulk_delete%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {failed, succeeded }

Response result for a batch origin cloud region operation.

</summary>

<details>

<summary>

failed: array of object {origin\_ip, error, region, vendor }

Items that could not be applied, with error details.

</summary>

origin\_ip: string

The origin IP address for this item.

<a href="#">Link to this property</a>

error: optional string

Error message explaining why the item failed. Present only on failed items.

<a href="#">Link to this property</a>

region: optional string

Cloud vendor region identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

<a href="#">Link to this property</a>

vendor: optional string

Cloud vendor identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

succeeded: array of object {origin\_ip, error, region, vendor }

Items that were successfully applied.

</summary>

origin\_ip: string

The origin IP address for this item.

<a href="#">Link to this property</a>

error: optional string

Error message explaining why the item failed. Present only on failed items.

<a href="#">Link to this property</a>

region: optional string

Cloud vendor region identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

<a href="#">Link to this property</a>

vendor: optional string

Cloud vendor identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.origin_cloud_regions%20%3E%20(method)%20bulk_delete%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Batch delete origin cloud region mappings

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/origin/cloud_regions/batch \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "failed": [],
    "succeeded": [
      {
        "origin_ip": "192.0.2.1",
        "region": "us-east-1",
        "vendor": "aws"
      },
      {
        "origin_ip": "2001:db8::1",
        "region": "us-central1",
        "vendor": "gcp"
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
  "errors": [],
  "messages": [],
  "result": {
    "failed": [],
    "succeeded": [
      {
        "origin_ip": "192.0.2.1",
        "region": "us-east-1",
        "vendor": "aws"
      },
      {
        "origin_ip": "2001:db8::1",
        "region": "us-central1",
        "vendor": "gcp"
      }
    ]
  },
  "success": true
}
```