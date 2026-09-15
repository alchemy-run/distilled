---
title: Permissions
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Intel](https://developers.cloudflare.com/api/resources/intel)

[Indicator Feeds](https://developers.cloudflare.com/api/resources/intel/subresources/indicator_feeds)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Permissions

##### [List indicator feed permissions](https://developers.cloudflare.com/api/resources/intel/subresources/indicator_feeds/subresources/permissions/methods/list)

GET/accounts/{account\_id}/intel/indicator-feeds/permissions/view

##### [Grant permission to indicator feed](https://developers.cloudflare.com/api/resources/intel/subresources/indicator_feeds/subresources/permissions/methods/create)

PUT/accounts/{account\_id}/intel/indicator-feeds/permissions/add

##### [Revoke permission to indicator feed](https://developers.cloudflare.com/api/resources/intel/subresources/indicator_feeds/subresources/permissions/methods/delete)

PUT/accounts/{account\_id}/intel/indicator-feeds/permissions/remove

##### ModelsExpand Collapse

<details>

<summary>

PermissionListResponse = array of object {id, description, is\_attributable, 3 more }

</summary>

id: optional number

The unique identifier for the indicator feed

<a href="#">Link to this property</a>

description: optional string

The description of the example test

<a href="#">Link to this property</a>

is\_attributable: optional boolean

Whether the indicator feed can be attributed to a provider

<a href="#">Link to this property</a>

is\_downloadable: optional boolean

Whether the indicator feed can be downloaded

<a href="#">Link to this property</a>

is\_public: optional boolean

Whether the indicator feed is exposed to customers

<a href="#">Link to this property</a>

name: optional string

The name of the indicator feed

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.indicator_feeds.permissions%20%3E%20(model)%20permission_list_response%20%3E%20(schema)>)

<details>

<summary>

PermissionCreateResponse object {success }

</summary>

success: optional boolean

Whether the update succeeded or not

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.indicator_feeds.permissions%20%3E%20(model)%20permission_create_response%20%3E%20(schema)>)

<details>

<summary>

PermissionDeleteResponse object {success }

</summary>

success: optional boolean

Whether the update succeeded or not

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.indicator_feeds.permissions%20%3E%20(model)%20permission_delete_response%20%3E%20(schema)>)