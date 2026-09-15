---
title: List locations
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

# List locations

GET/radar/entities/locations

Retrieves a list of locations.

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

##### Q uery ParametersExpand Collapse

<details>

<summary>

continent: optional "AF"or "AS"or "EU"or 3 more

Filters results by continent code.

</summary>

One of the following:

"AF"

<a href="#">Link to this property</a>

"AS"

<a href="#">Link to this property</a>

"EU"

<a href="#">Link to this property</a>

"NA"

<a href="#">Link to this property</a>

"OC"

<a href="#">Link to this property</a>

"SA"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.entities.locations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20continent%20%3E%20(schema)>)

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

[Link to this property](#)%20radar.entities.locations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

limit: optional number

Limits the number of objects returned in the response.

exclusiveMinimum

minimum0

[Link to this property](#)%20radar.entities.locations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

location: optional string

Filters results by location. Specify a comma-separated list of alpha-2 location codes.

[Link to this property](#)%20radar.entities.locations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20location%20%3E%20(schema)>)

offset: optional number

Skips the specified number of objects before fetching the results.

minimum0

[Link to this property](#)%20radar.entities.locations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20offset%20%3E%20(schema)>)

region: optional string

Filters results by region.

maxLength100

[Link to this property](#)%20radar.entities.locations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20region%20%3E%20(schema)>)

subregion: optional string

Filters results by subregion.

maxLength100

[Link to this property](#)%20radar.entities.locations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20subregion%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {locations }

</summary>

<details>

<summary>

locations: array of object {alpha2, continent, latitude, 4 more }

</summary>

alpha2: string

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

[Link to this property](#)%20radar.entities.locations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.entities.locations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List locations

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/entities/locations \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "locations": [
      {
        "alpha2": "AF",
        "continent": "AS",
        "latitude": "10",
        "longitude": "10",
        "name": "Afghanistan",
        "region": "Middle East",
        "subregion": "Southern Asia"
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
  "result": {
    "locations": [
      {
        "alpha2": "AF",
        "continent": "AS",
        "latitude": "10",
        "longitude": "10",
        "name": "Afghanistan",
        "region": "Middle East",
        "subregion": "Southern Asia"
      }
    ]
  },
  "success": true
}
```