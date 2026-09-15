---
title: Get location details
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[Entities](https://developers.cloudflare.com/api/resources/radar/subresources/entities)

[Locations](https://developers.cloudflare.com/api/resources/radar/subresources/entities/subresources/locations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get location details

GET/radar/entities/locations/{location}

Retrieves the requested location information. (A confidence level below `5` indicates a low level of confidence in the traffic data - normally this happens because Cloudflare has a small amount of traffic from/to this location).

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

`User Details Write``User Details Read`

##### P ath ParametersExpand Collapse

location: string

Location alpha-2 code.

maxLength2

minLength2

[Link to this property](#)%20radar.entities.locations%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20location%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

<details>

<summary>

format: optional "JSON"or "CSV"

Format in which results will be returned.

</summary>

One of the following:

"JSON"

<a href="#">Link to this property</a>

"CSV"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.entities.locations%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {location }

</summary>

<details>

<summary>

location: object {alpha2, confidenceLevel, continent, 5 more }

</summary>

alpha2: string

<a href="#">Link to this property</a>

confidenceLevel: number

<a href="#">Link to this property</a>

continent: string

<a href="#">Link to this property</a>

latitude: string

A numeric string.

<a href="#">Link to this property</a>

longitude: string

A numeric string.

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

region: string

<a href="#">Link to this property</a>

subregion: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.entities.locations%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.entities.locations%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get location details

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/entities/locations/$LOCATION \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "location": {
      "alpha2": "AF",
      "confidenceLevel": 5,
      "continent": "AS",
      "latitude": "10",
      "longitude": "10",
      "name": "Afghanistan",
      "region": "Middle East",
      "subregion": "Southern Asia"
    }
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "location": {
      "alpha2": "AF",
      "confidenceLevel": 5,
      "continent": "AS",
      "latitude": "10",
      "longitude": "10",
      "name": "Afghanistan",
      "region": "Middle East",
      "subregion": "Southern Asia"
    }
  },
  "success": true
}
```