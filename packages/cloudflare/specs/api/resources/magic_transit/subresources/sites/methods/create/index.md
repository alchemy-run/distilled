---
title: Create a new Site
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Transit](https://developers.cloudflare.com/api/resources/magic_transit)

[Sites](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create a new Site

POST/accounts/{account\_id}/magic/sites

Creates a new Site

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

`Magic WAN Write``Magic Transit Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier

maxLength32

[Link to this property](#)%20magic_transit.sites%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

name: string

The name of the site.

[Link to this property](#)%20magic_transit.sites%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

connector\_id: optional string

Magic Connector identifier tag.

[Link to this property](#)%20magic_transit.sites%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20connector_id%20%3E%20(schema)>)

description: optional string

[Link to this property](#)%20magic_transit.sites%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20description%20%3E%20(schema)>)

ha\_mode: optional boolean

Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode.

[Link to this property](#)%20magic_transit.sites%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20ha_mode%20%3E%20(schema)>)

<details>

<summary>

location: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites%20%3E%20(model)%20site_location%20%3E%20(schema)">SiteLocation</a> { lat, lon }

Location of site in latitude and longitude.

</summary>

lat: optional string

Latitude

<a href="#">Link to this property</a>

lon: optional string

Longitude

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20location%20%3E%20(schema)>)

secondary\_connector\_id: optional string

Magic Connector identifier tag. Used when high availability mode is on.

[Link to this property](#)%20magic_transit.sites%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20secondary_connector_id%20%3E%20(schema)>)

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

[Link to this property](#)%20magic_transit.sites%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20magic_transit.sites%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites%20%3E%20(model)%20site%20%3E%20(schema)">Site</a> { id, connector\_id, description, 4 more }

</summary>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

connector\_id: optional string

Magic Connector identifier tag.

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

ha\_mode: optional boolean

Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode.

<a href="#">Link to this property</a>

<details>

<summary>

location: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites%20%3E%20(model)%20site_location%20%3E%20(schema)">SiteLocation</a> { lat, lon }

Location of site in latitude and longitude.

</summary>

lat: optional string

Latitude

<a href="#">Link to this property</a>

lon: optional string

Longitude

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

The name of the site.

<a href="#">Link to this property</a>

secondary\_connector\_id: optional string

Magic Connector identifier tag. Used when high availability mode is on.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20magic_transit.sites%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Create a new Site

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "site_1",
          "connector_id": "ac60d3d0435248289d446cedd870bcf4",
          "ha_mode": true,
          "secondary_connector_id": "8d67040d3835dbcf46ce29da440dc482"
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
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "connector_id": "ac60d3d0435248289d446cedd870bcf4",
    "description": "description",
    "ha_mode": true,
    "location": {
      "lat": "37.6192",
      "lon": "122.3816"
    },
    "name": "site_1",
    "secondary_connector_id": "8d67040d3835dbcf46ce29da440dc482"
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
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "connector_id": "ac60d3d0435248289d446cedd870bcf4",
    "description": "description",
    "ha_mode": true,
    "location": {
      "lat": "37.6192",
      "lon": "122.3816"
    },
    "name": "site_1",
    "secondary_connector_id": "8d67040d3835dbcf46ce29da440dc482"
  },
  "success": true
}
```