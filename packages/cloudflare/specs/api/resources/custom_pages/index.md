---
title: Custom Pages
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Custom Pages

##### [List custom pages](https://developers.cloudflare.com/api/resources/custom_pages/methods/list)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/custom\_pages

##### [Get a custom page](https://developers.cloudflare.com/api/resources/custom_pages/methods/get)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/custom\_pages/{identifier}

##### [Update a custom page](https://developers.cloudflare.com/api/resources/custom_pages/methods/update)

PUT/{accounts\_or\_zones}/{account\_or\_zone\_id}/custom\_pages/{identifier}

##### ModelsExpand Collapse

<details>

<summary>

CustomPageListResponse object {id, created\_on, description, 5 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

preview\_target: optional string

<a href="#">Link to this property</a>

required\_tokens: optional array of string

<a href="#">Link to this property</a>

<details>

<summary>

state: optional "default"or "customized"

The custom page state.

</summary>

One of the following:

"default"

<a href="#">Link to this property</a>

"customized"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url: optional string

The URL associated with the custom page.

formaturi

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_pages%20%3E%20(model)%20custom_page_list_response%20%3E%20(schema)>)

<details>

<summary>

CustomPageGetResponse object {id, created\_on, description, 5 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

preview\_target: optional string

<a href="#">Link to this property</a>

required\_tokens: optional array of string

<a href="#">Link to this property</a>

<details>

<summary>

state: optional "default"or "customized"

The custom page state.

</summary>

One of the following:

"default"

<a href="#">Link to this property</a>

"customized"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url: optional string

The URL associated with the custom page.

formaturi

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_pages%20%3E%20(model)%20custom_page_get_response%20%3E%20(schema)>)

<details>

<summary>

CustomPageUpdateResponse object {id, created\_on, description, 5 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

preview\_target: optional string

<a href="#">Link to this property</a>

required\_tokens: optional array of string

<a href="#">Link to this property</a>

<details>

<summary>

state: optional "default"or "customized"

The custom page state.

</summary>

One of the following:

"default"

<a href="#">Link to this property</a>

"customized"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url: optional string

The URL associated with the custom page.

formaturi

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_pages%20%3E%20(model)%20custom_page_update_response%20%3E%20(schema)>)

#### Custom PagesAssets

##### [List custom assets](https://developers.cloudflare.com/api/resources/custom_pages/subresources/assets/methods/list)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/custom\_pages/assets

##### [Get a custom asset](https://developers.cloudflare.com/api/resources/custom_pages/subresources/assets/methods/get)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/custom\_pages/assets/{asset\_name}

##### [Create a custom asset](https://developers.cloudflare.com/api/resources/custom_pages/subresources/assets/methods/create)

POST/{accounts\_or\_zones}/{account\_or\_zone\_id}/custom\_pages/assets

##### [Update a custom asset](https://developers.cloudflare.com/api/resources/custom_pages/subresources/assets/methods/update)

PUT/{accounts\_or\_zones}/{account\_or\_zone\_id}/custom\_pages/assets/{asset\_name}

##### [Delete a custom asset](https://developers.cloudflare.com/api/resources/custom_pages/subresources/assets/methods/delete)

DELETE/{accounts\_or\_zones}/{account\_or\_zone\_id}/custom\_pages/assets/{asset\_name}

##### ModelsExpand Collapse

<details>

<summary>

AssetListResponse object {description, last\_updated, name, 2 more }

</summary>

description: optional string

A short description of the custom asset.

<a href="#">Link to this property</a>

last\_updated: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

The unique name of the custom asset. Can only contain letters (A-Z, a-z), numbers (0-9), and underscores (\_).

minLength1

<a href="#">Link to this property</a>

size\_bytes: optional number

The size of the asset content in bytes.

<a href="#">Link to this property</a>

url: optional string

The URL where the asset content is fetched from.

formaturi

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_pages.assets%20%3E%20(model)%20asset_list_response%20%3E%20(schema)>)

<details>

<summary>

AssetGetResponse object {description, last\_updated, name, 2 more }

</summary>

description: optional string

A short description of the custom asset.

<a href="#">Link to this property</a>

last\_updated: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

The unique name of the custom asset. Can only contain letters (A-Z, a-z), numbers (0-9), and underscores (\_).

minLength1

<a href="#">Link to this property</a>

size\_bytes: optional number

The size of the asset content in bytes.

<a href="#">Link to this property</a>

url: optional string

The URL where the asset content is fetched from.

formaturi

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_pages.assets%20%3E%20(model)%20asset_get_response%20%3E%20(schema)>)

<details>

<summary>

AssetCreateResponse object {description, last\_updated, name, 2 more }

</summary>

description: optional string

A short description of the custom asset.

<a href="#">Link to this property</a>

last\_updated: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

The unique name of the custom asset. Can only contain letters (A-Z, a-z), numbers (0-9), and underscores (\_).

minLength1

<a href="#">Link to this property</a>

size\_bytes: optional number

The size of the asset content in bytes.

<a href="#">Link to this property</a>

url: optional string

The URL where the asset content is fetched from.

formaturi

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_pages.assets%20%3E%20(model)%20asset_create_response%20%3E%20(schema)>)

<details>

<summary>

AssetUpdateResponse object {description, last\_updated, name, 2 more }

</summary>

description: optional string

A short description of the custom asset.

<a href="#">Link to this property</a>

last\_updated: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

The unique name of the custom asset. Can only contain letters (A-Z, a-z), numbers (0-9), and underscores (\_).

minLength1

<a href="#">Link to this property</a>

size\_bytes: optional number

The size of the asset content in bytes.

<a href="#">Link to this property</a>

url: optional string

The URL where the asset content is fetched from.

formaturi

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_pages.assets%20%3E%20(model)%20asset_update_response%20%3E%20(schema)>)