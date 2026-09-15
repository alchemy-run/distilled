---
title: Routes
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers](https://developers.cloudflare.com/api/resources/workers)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Routes

##### [List Routes](https://developers.cloudflare.com/api/resources/workers/subresources/routes/methods/list)

GET/zones/{zone\_id}/workers/routes

##### [Get Route](https://developers.cloudflare.com/api/resources/workers/subresources/routes/methods/get)

GET/zones/{zone\_id}/workers/routes/{route\_id}

##### [Create Route](https://developers.cloudflare.com/api/resources/workers/subresources/routes/methods/create)

POST/zones/{zone\_id}/workers/routes

##### [Update Route](https://developers.cloudflare.com/api/resources/workers/subresources/routes/methods/update)

PUT/zones/{zone\_id}/workers/routes/{route\_id}

##### [Delete Route](https://developers.cloudflare.com/api/resources/workers/subresources/routes/methods/delete)

DELETE/zones/{zone\_id}/workers/routes/{route\_id}

##### ModelsExpand Collapse

<details>

<summary>

RouteListResponse object {id, pattern, script }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

pattern: string

Pattern to match incoming requests against. <a href="https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-behavior">Learn more</a>.

<a href="#">Link to this property</a>

script: optional string

Name of the script to run if the route matches.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.routes%20%3E%20(model)%20route_list_response%20%3E%20(schema)>)

<details>

<summary>

RouteGetResponse object {id, pattern, script }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

pattern: string

Pattern to match incoming requests against. <a href="https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-behavior">Learn more</a>.

<a href="#">Link to this property</a>

script: optional string

Name of the script to run if the route matches.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.routes%20%3E%20(model)%20route_get_response%20%3E%20(schema)>)

<details>

<summary>

RouteCreateResponse object {id, pattern, script }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

pattern: string

Pattern to match incoming requests against. <a href="https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-behavior">Learn more</a>.

<a href="#">Link to this property</a>

script: optional string

Name of the script to run if the route matches.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.routes%20%3E%20(model)%20route_create_response%20%3E%20(schema)>)

<details>

<summary>

RouteUpdateResponse object {id, pattern, script }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

pattern: string

Pattern to match incoming requests against. <a href="https://developers.cloudflare.com/workers/configuration/routing/routes/#matching-behavior">Learn more</a>.

<a href="#">Link to this property</a>

script: optional string

Name of the script to run if the route matches.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.routes%20%3E%20(model)%20route_update_response%20%3E%20(schema)>)

<details>

<summary>

RouteDeleteResponse object {id }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.routes%20%3E%20(model)%20route_delete_response%20%3E%20(schema)>)