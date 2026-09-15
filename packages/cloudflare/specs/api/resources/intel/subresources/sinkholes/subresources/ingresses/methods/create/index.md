---
title: Create an ingress rule
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

# Create an ingress rule

POST/zones/{zone\_id}/intel/sinkholes/{sinkhole\_id}/ingresses

Create a new ingress rule for the specified sinkhole. The CIDR block must be a Cloudflare BYOIP associated with your account. The zone\_id must be a zone with the ability to create Spectrum Apps. The sinkhole must belong to the same account as the zone.

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

[Link to this property](#)%20intel.sinkholes.ingresses%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

sinkhole\_id: string

[Link to this property](#)%20intel.sinkholes.ingresses%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20sinkhole_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

cidr: string

The CIDR block for the ingress rule in IPv4 or IPv6 notation (e.g., 192.0.2.0/24). Provide a Cloudflare BYOIP CIDR that your account owns.

[Link to this property](#)%20intel.sinkholes.ingresses%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20cidr%20%3E%20(schema)>)

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

[Link to this property](#)%20intel.sinkholes.ingresses%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20intel.sinkholes.ingresses%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20intel.sinkholes.ingresses%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, cidr, created\_on, 3 more }

</summary>

id: optional string

The unique identifier for the ingress rule.

<a href="#">Link to this property</a>

cidr: optional string

The CIDR block for the ingress rule.

<a href="#">Link to this property</a>

created\_on: optional string

The date and time when the ingress rule was created.

formatdate-time

<a href="#">Link to this property</a>

modified\_on: optional string

The date and time when the ingress rule was last modified.

formatdate-time

<a href="#">Link to this property</a>

sinkhole\_id: optional string

The sinkhole this ingress rule belongs to.

<a href="#">Link to this property</a>

zone\_tag: optional string

The zone tag associated with this ingress rule.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.sinkholes.ingresses%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create an ingress rule

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/intel/sinkholes/$SINKHOLE_ID/ingresses \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "cidr": "cidr"
        }'
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
    "id": "de32ae5203724ed08dcc26e971a4d22f",
    "cidr": "192.0.2.0/24",
    "created_on": "2023-06-01T10:00:00Z",
    "modified_on": "2023-06-15T14:30:00Z",
    "sinkhole_id": "93defa6e909e464e8c89a85859f36d3c",
    "zone_tag": "4c961e9d94f40aa922775483b9ee18cf"
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
    "id": "de32ae5203724ed08dcc26e971a4d22f",
    "cidr": "192.0.2.0/24",
    "created_on": "2023-06-01T10:00:00Z",
    "modified_on": "2023-06-15T14:30:00Z",
    "sinkhole_id": "93defa6e909e464e8c89a85859f36d3c",
    "zone_tag": "4c961e9d94f40aa922775483b9ee18cf"
  }
}
```