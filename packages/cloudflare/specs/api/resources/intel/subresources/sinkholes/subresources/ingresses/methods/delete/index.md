---
title: Delete an ingress rule
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Intel](https://developers.cloudflare.com/api/resources/intel)

[Sinkholes](https://developers.cloudflare.com/api/resources/intel/subresources/sinkholes)

[Ingresses](https://developers.cloudflare.com/api/resources/intel/subresources/sinkholes/subresources/ingresses)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete an ingress rule

DELETE/zones/{zone\_id}/intel/sinkholes/{sinkhole\_id}/ingresses/{ingress\_id}

Delete the specified ingress rule. The sinkhole must belong to the same account as the zone.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Intel Write`

##### P ath ParametersExpand Collapse

zone\_id: string

An identifier for the resource.

maxLength32

[Link to this property](#)%20intel.sinkholes.ingresses%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

sinkhole\_id: string

[Link to this property](#)%20intel.sinkholes.ingresses%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20sinkhole_id%20%3E%20(schema)>)

ingress\_id: string

[Link to this property](#)%20intel.sinkholes.ingresses%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20ingress_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

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

[Link to this property](#)%20intel.sinkholes.ingresses%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

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

[Link to this property](#)%20intel.sinkholes.ingresses%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20intel.sinkholes.ingresses%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

result: optional unknown

[Link to this property](#)%20intel.sinkholes.ingresses%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Delete an ingress rule

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/intel/sinkholes/$SINKHOLE_ID/ingresses/$INGRESS_ID \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "result": {}
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
  "result": {}
}
```