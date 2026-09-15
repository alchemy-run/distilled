---
title: Fallback Origin
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Custom Hostnames](https://developers.cloudflare.com/api/resources/custom_hostnames)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Fallback Origin

##### [Get Fallback Origin for Custom Hostnames](https://developers.cloudflare.com/api/resources/custom_hostnames/subresources/fallback_origin/methods/get)

GET/zones/{zone\_id}/custom\_hostnames/fallback\_origin

##### [Update Fallback Origin for Custom Hostnames](https://developers.cloudflare.com/api/resources/custom_hostnames/subresources/fallback_origin/methods/update)

PUT/zones/{zone\_id}/custom\_hostnames/fallback\_origin

##### [Delete Fallback Origin for Custom Hostnames](https://developers.cloudflare.com/api/resources/custom_hostnames/subresources/fallback_origin/methods/delete)

DELETE/zones/{zone\_id}/custom\_hostnames/fallback\_origin

##### ModelsExpand Collapse

<details>

<summary>

FallbackOriginGetResponse object {created\_at, errors, origin, 2 more }

</summary>

created\_at: optional string

This is the time the fallback origin was created.

formatdate-time

<a href="#">Link to this property</a>

errors: optional array of string

These are errors that were encountered while trying to activate a fallback origin.

<a href="#">Link to this property</a>

origin: optional string

Your origin hostname that requests to your custom hostnames will be sent to.

maxLength255

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "initializing"or "pending\_deployment"or "pending\_deletion"or 3 more

Status of the fallback origin’s activation.

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending\_deployment"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deployment\_timed\_out"

<a href="#">Link to this property</a>

"deletion\_timed\_out"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

This is the time the fallback origin was updated.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_hostnames.fallback_origin%20%3E%20(model)%20fallback_origin_get_response%20%3E%20(schema)>)

<details>

<summary>

FallbackOriginUpdateResponse object {created\_at, errors, origin, 2 more }

</summary>

created\_at: optional string

This is the time the fallback origin was created.

formatdate-time

<a href="#">Link to this property</a>

errors: optional array of string

These are errors that were encountered while trying to activate a fallback origin.

<a href="#">Link to this property</a>

origin: optional string

Your origin hostname that requests to your custom hostnames will be sent to.

maxLength255

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "initializing"or "pending\_deployment"or "pending\_deletion"or 3 more

Status of the fallback origin’s activation.

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending\_deployment"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deployment\_timed\_out"

<a href="#">Link to this property</a>

"deletion\_timed\_out"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

This is the time the fallback origin was updated.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_hostnames.fallback_origin%20%3E%20(model)%20fallback_origin_update_response%20%3E%20(schema)>)

<details>

<summary>

FallbackOriginDeleteResponse object {created\_at, errors, origin, 2 more }

</summary>

created\_at: optional string

This is the time the fallback origin was created.

formatdate-time

<a href="#">Link to this property</a>

errors: optional array of string

These are errors that were encountered while trying to activate a fallback origin.

<a href="#">Link to this property</a>

origin: optional string

Your origin hostname that requests to your custom hostnames will be sent to.

maxLength255

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "initializing"or "pending\_deployment"or "pending\_deletion"or 3 more

Status of the fallback origin’s activation.

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending\_deployment"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deployment\_timed\_out"

<a href="#">Link to this property</a>

"deletion\_timed\_out"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

This is the time the fallback origin was updated.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_hostnames.fallback_origin%20%3E%20(model)%20fallback_origin_delete_response%20%3E%20(schema)>)