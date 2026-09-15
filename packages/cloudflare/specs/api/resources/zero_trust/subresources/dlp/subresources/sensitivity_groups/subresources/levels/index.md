---
title: Levels
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DLP](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp)

[Sensitivity Groups](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/sensitivity_groups)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Levels

##### [Retrieve all sensitivity levels in a sensitivity group](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/sensitivity_groups/subresources/levels/methods/list)

GET/accounts/{account\_id}/dlp/sensitivity\_groups/{sensitivity\_group\_id}/levels

##### [Retrieve a specific sensitivity level.](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/sensitivity_groups/subresources/levels/methods/get)

GET/accounts/{account\_id}/dlp/sensitivity\_groups/{sensitivity\_group\_id}/levels/{sensitivity\_level\_id}

##### [Creates a new sensitivity level.](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/sensitivity_groups/subresources/levels/methods/create)

POST/accounts/{account\_id}/dlp/sensitivity\_groups/{sensitivity\_group\_id}/levels

##### [Update the attributes of a single sensitivity level.](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/sensitivity_groups/subresources/levels/methods/update)

PUT/accounts/{account\_id}/dlp/sensitivity\_groups/{sensitivity\_group\_id}/levels/{sensitivity\_level\_id}

##### [Delete a single sensitivity level.](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/sensitivity_groups/subresources/levels/methods/delete)

DELETE/accounts/{account\_id}/dlp/sensitivity\_groups/{sensitivity\_group\_id}/levels/{sensitivity\_level\_id}

##### ModelsExpand Collapse

<details>

<summary>

LevelListResponse object {id, created\_at, name, 2 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.sensitivity_groups.levels%20%3E%20(model)%20level_list_response%20%3E%20(schema)>)

<details>

<summary>

LevelGetResponse object {id, created\_at, name, 2 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.sensitivity_groups.levels%20%3E%20(model)%20level_get_response%20%3E%20(schema)>)

<details>

<summary>

LevelCreateResponse object {id, created\_at, name, 2 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.sensitivity_groups.levels%20%3E%20(model)%20level_create_response%20%3E%20(schema)>)

<details>

<summary>

LevelUpdateResponse object {id, created\_at, name, 2 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.sensitivity_groups.levels%20%3E%20(model)%20level_update_response%20%3E%20(schema)>)

LevelDeleteResponse = unknown

[Link to this property](#)%20zero_trust.dlp.sensitivity_groups.levels%20%3E%20(model)%20level_delete_response%20%3E%20(schema)>)

#### LevelsOrder

##### [Retrieve the ordered list of level IDs for a sensitivity group.](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/sensitivity_groups/subresources/levels/subresources/order/methods/get)

GET/accounts/{account\_id}/dlp/sensitivity\_groups/{sensitivity\_group\_id}/level\_order

##### [Set the ordering of levels within a sensitivity group.](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/sensitivity_groups/subresources/levels/subresources/order/methods/update)

PUT/accounts/{account\_id}/dlp/sensitivity\_groups/{sensitivity\_group\_id}/level\_order

##### ModelsExpand Collapse

<details>

<summary>

OrderGetResponse object {level\_ids }

The ordered list of level IDs for a sensitivity group. Used to get and set the ordering of levels independently of level attributes.

</summary>

level\_ids: array of string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.sensitivity_groups.levels.order%20%3E%20(model)%20order_get_response%20%3E%20(schema)>)

<details>

<summary>

OrderUpdateResponse object {level\_ids }

The ordered list of level IDs for a sensitivity group. Used to get and set the ordering of levels independently of level attributes.

</summary>

level\_ids: array of string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.sensitivity_groups.levels.order%20%3E%20(model)%20order_update_response%20%3E%20(schema)>)