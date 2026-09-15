---
title: Locations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[Entities](https://developers.cloudflare.com/api/resources/radar/subresources/entities)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Locations

##### [List locations](https://developers.cloudflare.com/api/resources/radar/subresources/entities/subresources/locations/methods/list)

GET/radar/entities/locations

##### [Get location details](https://developers.cloudflare.com/api/resources/radar/subresources/entities/subresources/locations/methods/get)

GET/radar/entities/locations/{location}

##### ModelsExpand Collapse

<details>

<summary>

LocationListResponse object {locations }

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

[Link to this property](#)%20radar.entities.locations%20%3E%20(model)%20location_list_response%20%3E%20(schema)>)

<details>

<summary>

LocationGetResponse object {location }

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

[Link to this property](#)%20radar.entities.locations%20%3E%20(model)%20location_get_response%20%3E%20(schema)>)