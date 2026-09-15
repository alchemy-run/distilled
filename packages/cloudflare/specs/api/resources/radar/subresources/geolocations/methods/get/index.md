---
title: Get Geolocation details
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[Geolocations](https://developers.cloudflare.com/api/resources/radar/subresources/geolocations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Geolocation details

GET/radar/geolocations/{geo\_id}

Retrieves the requested Geolocation information. Geolocation names can be localized by sending an `Accept-Language` HTTP header with a BCP 47 language tag (e.g., `Accept-Language: pt-PT`). The full quality-value chain is supported (e.g., `pt-PT,pt;q=0.9,en;q=0.8`).

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

geo\_id: string

Geolocation ID. Refer to [GeoNames](https://download.geonames.org/export/dump/readme.txt)

maxLength100

[Link to this property](#)%20radar.geolocations%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20geo_id%20%3E%20(schema)>)

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

[Link to this property](#)%20radar.geolocations%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {geolocation }

</summary>

<details>

<summary>

geolocation: object {geoId, latitude, longitude, 5 more }

</summary>

geoId: string

<a href="#">Link to this property</a>

latitude: string

A numeric string.

<a href="#">Link to this property</a>

longitude: string

A numeric string.

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

parent: object {geoId, latitude, longitude, 5 more }

</summary>

geoId: string

<a href="#">Link to this property</a>

latitude: string

A numeric string.

<a href="#">Link to this property</a>

longitude: string

A numeric string.

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

parent: object {geoId, latitude, longitude, 4 more }

</summary>

geoId: string

<a href="#">Link to this property</a>

latitude: string

A numeric string.

<a href="#">Link to this property</a>

longitude: string

A numeric string.

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

type: "CONTINENT"or "COUNTRY"or "ADM1"

The type of the geolocation.

</summary>

One of the following:

"CONTINENT"

<a href="#">Link to this property</a>

"COUNTRY"

<a href="#">Link to this property</a>

"ADM1"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

code: optional string

<a href="#">Link to this property</a>

locale: optional string

BCP 47 locale code used for the geolocation name translation

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "CONTINENT"or "COUNTRY"or "ADM1"

The type of the geolocation.

</summary>

One of the following:

"CONTINENT"

<a href="#">Link to this property</a>

"COUNTRY"

<a href="#">Link to this property</a>

"ADM1"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

code: optional string

<a href="#">Link to this property</a>

locale: optional string

BCP 47 locale code used for the geolocation name translation

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "CONTINENT"or "COUNTRY"or "ADM1"

The type of the geolocation.

</summary>

One of the following:

"CONTINENT"

<a href="#">Link to this property</a>

"COUNTRY"

<a href="#">Link to this property</a>

"ADM1"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

code: optional string

<a href="#">Link to this property</a>

locale: optional string

BCP 47 locale code used for the geolocation name translation

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.geolocations%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.geolocations%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get Geolocation details

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/geolocations/$GEO_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "geolocation": {
      "geoId": "2267056",
      "latitude": "10",
      "longitude": "10",
      "name": "Lisbon",
      "parent": {
        "geoId": "2267056",
        "latitude": "10",
        "longitude": "10",
        "name": "Lisbon",
        "parent": {
          "geoId": "2267056",
          "latitude": "10",
          "longitude": "10",
          "name": "Lisbon",
          "type": "CONTINENT",
          "code": "PT-11",
          "locale": "pt-PT"
        },
        "type": "CONTINENT",
        "code": "PT-11",
        "locale": "pt-PT"
      },
      "type": "CONTINENT",
      "code": "PT-11",
      "locale": "pt-PT"
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
    "geolocation": {
      "geoId": "2267056",
      "latitude": "10",
      "longitude": "10",
      "name": "Lisbon",
      "parent": {
        "geoId": "2267056",
        "latitude": "10",
        "longitude": "10",
        "name": "Lisbon",
        "parent": {
          "geoId": "2267056",
          "latitude": "10",
          "longitude": "10",
          "name": "Lisbon",
          "type": "CONTINENT",
          "code": "PT-11",
          "locale": "pt-PT"
        },
        "type": "CONTINENT",
        "code": "PT-11",
        "locale": "pt-PT"
      },
      "type": "CONTINENT",
      "code": "PT-11",
      "locale": "pt-PT"
    }
  },
  "success": true
}
```