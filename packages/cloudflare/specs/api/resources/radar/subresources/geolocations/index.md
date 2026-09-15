---
title: Geolocations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Geolocations

##### [List Geolocations](https://developers.cloudflare.com/api/resources/radar/subresources/geolocations/methods/list)

GET/radar/geolocations

##### [Get Geolocation details](https://developers.cloudflare.com/api/resources/radar/subresources/geolocations/methods/get)

GET/radar/geolocations/{geo\_id}

##### ModelsExpand Collapse

<details>

<summary>

GeolocationListResponse object {geolocations }

</summary>

<details>

<summary>

geolocations: array of object {geoId, latitude, longitude, 5 more }

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

[Link to this property](#)%20radar.geolocations%20%3E%20(model)%20geolocation_list_response%20%3E%20(schema)>)

<details>

<summary>

GeolocationGetResponse object {geolocation }

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

[Link to this property](#)%20radar.geolocations%20%3E%20(model)%20geolocation_get_response%20%3E%20(schema)>)