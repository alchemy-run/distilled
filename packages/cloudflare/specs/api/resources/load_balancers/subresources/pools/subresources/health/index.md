---
title: Health
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Load Balancers](https://developers.cloudflare.com/api/resources/load_balancers)

[Pools](https://developers.cloudflare.com/api/resources/load_balancers/subresources/pools)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Health

##### [Pool Health Details](https://developers.cloudflare.com/api/resources/load_balancers/subresources/pools/subresources/health/methods/get)

GET/accounts/{account\_id}/load\_balancers/pools/{pool\_id}/health

##### [Preview Pool](https://developers.cloudflare.com/api/resources/load_balancers/subresources/pools/subresources/health/methods/create)

POST/accounts/{account\_id}/load\_balancers/pools/{pool\_id}/preview

##### ModelsExpand Collapse

<details>

<summary>

HealthGetResponse object {pool\_id, pop\_health }

A list of regions from which to run health checks. Null means every Cloudflare data center.

</summary>

pool\_id: optional string

Pool ID.

<a href="#">Link to this property</a>

<details>

<summary>

pop\_health: optional object {healthy, origins }

List of regions and associated health status.

</summary>

healthy: optional boolean

Whether health check in region is healthy.

<a href="#">Link to this property</a>

<details>

<summary>

origins: optional array of object {ip }

</summary>

<details>

<summary>

ip: optional object {failure\_reason, healthy, response\_code, rtt }

</summary>

failure\_reason: optional string

Failure reason.

<a href="#">Link to this property</a>

healthy: optional boolean

Origin health status.

<a href="#">Link to this property</a>

response\_code: optional number

Response code from origin health check.

<a href="#">Link to this property</a>

rtt: optional string

Origin RTT (Round Trip Time) response.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.pools.health%20%3E%20(model)%20health_get_response%20%3E%20(schema)>)

<details>

<summary>

HealthCreateResponse object {pools, preview\_id }

</summary>

pools: optional map\[string]

Monitored pool IDs mapped to their respective names.

<a href="#">Link to this property</a>

preview\_id: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.pools.health%20%3E%20(model)%20health_create_response%20%3E%20(schema)>)