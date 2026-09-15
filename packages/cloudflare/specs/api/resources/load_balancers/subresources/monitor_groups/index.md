---
title: Monitor Groups
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Load Balancers](https://developers.cloudflare.com/api/resources/load_balancers)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Monitor Groups

##### [List Monitor Groups](https://developers.cloudflare.com/api/resources/load_balancers/subresources/monitor_groups/methods/list)

GET/accounts/{account\_id}/load\_balancers/monitor\_groups

##### [Monitor Group Details](https://developers.cloudflare.com/api/resources/load_balancers/subresources/monitor_groups/methods/get)

GET/accounts/{account\_id}/load\_balancers/monitor\_groups/{monitor\_group\_id}

##### [Create Monitor Group](https://developers.cloudflare.com/api/resources/load_balancers/subresources/monitor_groups/methods/create)

POST/accounts/{account\_id}/load\_balancers/monitor\_groups

##### [Update Monitor Group](https://developers.cloudflare.com/api/resources/load_balancers/subresources/monitor_groups/methods/update)

PUT/accounts/{account\_id}/load\_balancers/monitor\_groups/{monitor\_group\_id}

##### [Patch Monitor Group](https://developers.cloudflare.com/api/resources/load_balancers/subresources/monitor_groups/methods/edit)

PATCH/accounts/{account\_id}/load\_balancers/monitor\_groups/{monitor\_group\_id}

##### [Delete Monitor Group](https://developers.cloudflare.com/api/resources/load_balancers/subresources/monitor_groups/methods/delete)

DELETE/accounts/{account\_id}/load\_balancers/monitor\_groups/{monitor\_group\_id}

##### ModelsExpand Collapse

<details>

<summary>

MonitorGroup object {id, description, members, 2 more }

</summary>

id: string

The ID of the Monitor Group to use for checking the health of origins within this pool.

<a href="#">Link to this property</a>

description: string

A short description of the monitor group

<a href="#">Link to this property</a>

<details>

<summary>

members: array of object {enabled, monitor\_id, monitoring\_only, 3 more }

List of monitors in this group

</summary>

enabled: boolean

Whether this monitor is enabled in the group

<a href="#">Link to this property</a>

monitor\_id: string

The ID of the Monitor to use for checking the health of origins within this pool.

<a href="#">Link to this property</a>

monitoring\_only: boolean

Whether this monitor is used for monitoring only (does not affect pool health)

<a href="#">Link to this property</a>

must\_be\_healthy: boolean

Whether this monitor must be healthy for the pool to be considered healthy

<a href="#">Link to this property</a>

created\_at: optional string

The timestamp of when the monitor was added to the group

formatdate-time

<a href="#">Link to this property</a>

updated\_at: optional string

The timestamp of when the monitor group member was last updated

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: optional string

The timestamp of when the monitor group was created

formatdate-time

<a href="#">Link to this property</a>

modified\_on: optional string

The timestamp of when the monitor group was last updated

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.monitor_groups%20%3E%20(model)%20monitor_group%20%3E%20(schema)>)

#### Monitor GroupsReferences

##### [List Monitor Group References](https://developers.cloudflare.com/api/resources/load_balancers/subresources/monitor_groups/subresources/references/methods/get)

GET/accounts/{account\_id}/load\_balancers/monitor\_groups/{monitor\_group\_id}/references

##### ModelsExpand Collapse

<details>

<summary>

ReferenceGetResponse object {reference\_type, resource\_id, resource\_name, resource\_type }

</summary>

<details>

<summary>

reference\_type: optional "\*"or "referral"or "referrer"

</summary>

One of the following:

"\*"

<a href="#">Link to this property</a>

"referral"

<a href="#">Link to this property</a>

"referrer"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

resource\_id: optional string

<a href="#">Link to this property</a>

resource\_name: optional string

<a href="#">Link to this property</a>

resource\_type: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.monitor_groups.references%20%3E%20(model)%20reference_get_response%20%3E%20(schema)>)