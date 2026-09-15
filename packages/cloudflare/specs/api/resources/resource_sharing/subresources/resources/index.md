---
title: Resources
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Resource Sharing](https://developers.cloudflare.com/api/resources/resource_sharing)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Resources

##### [List share resources by share ID](https://developers.cloudflare.com/api/resources/resource_sharing/subresources/resources/methods/list)

GET/accounts/{account\_id}/shares/{share\_id}/resources

##### [Get share resource by ID](https://developers.cloudflare.com/api/resources/resource_sharing/subresources/resources/methods/get)

GET/accounts/{account\_id}/shares/{share\_id}/resources/{share\_resource\_id}

##### [Create a new share resource](https://developers.cloudflare.com/api/resources/resource_sharing/subresources/resources/methods/create)

POST/accounts/{account\_id}/shares/{share\_id}/resources

##### [Update a share resource](https://developers.cloudflare.com/api/resources/resource_sharing/subresources/resources/methods/update)

PUT/accounts/{account\_id}/shares/{share\_id}/resources/{share\_resource\_id}

##### [Delete a share resource](https://developers.cloudflare.com/api/resources/resource_sharing/subresources/resources/methods/delete)

DELETE/accounts/{account\_id}/shares/{share\_id}/resources/{share\_resource\_id}

##### ModelsExpand Collapse

<details>

<summary>

ResourceListResponse object {id, created, meta, 6 more }

</summary>

id: string

Share Resource identifier.

maxLength32

<a href="#">Link to this property</a>

created: string

When the share was created.

formatdate-time

<a href="#">Link to this property</a>

meta: unknown

Resource Metadata.

<a href="#">Link to this property</a>

modified: string

When the share was modified.

formatdate-time

<a href="#">Link to this property</a>

resource\_account\_id: string

Account identifier.

maxLength32

<a href="#">Link to this property</a>

resource\_id: string

Share Resource identifier.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

resource\_type: "custom-ruleset"or "gateway-policy"or "gateway-destination-ip"or 4 more

Resource Type.

</summary>

One of the following:

"custom-ruleset"

<a href="#">Link to this property</a>

"gateway-policy"

<a href="#">Link to this property</a>

"gateway-destination-ip"

<a href="#">Link to this property</a>

"gateway-block-page-settings"

<a href="#">Link to this property</a>

"gateway-extended-email-matching"

<a href="#">Link to this property</a>

"idp-federation-grant"

<a href="#">Link to this property</a>

"trust-grant"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

resource\_version: number

Resource Version.

<a href="#">Link to this property</a>

<details>

<summary>

status: "active"or "deleting"or "deleted"

Resource Status.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"deleting"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20resource_sharing.resources%20%3E%20(model)%20resource_list_response%20%3E%20(schema)>)

<details>

<summary>

ResourceGetResponse object {id, created, meta, 6 more }

</summary>

id: string

Share Resource identifier.

maxLength32

<a href="#">Link to this property</a>

created: string

When the share was created.

formatdate-time

<a href="#">Link to this property</a>

meta: unknown

Resource Metadata.

<a href="#">Link to this property</a>

modified: string

When the share was modified.

formatdate-time

<a href="#">Link to this property</a>

resource\_account\_id: string

Account identifier.

maxLength32

<a href="#">Link to this property</a>

resource\_id: string

Share Resource identifier.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

resource\_type: "custom-ruleset"or "gateway-policy"or "gateway-destination-ip"or 4 more

Resource Type.

</summary>

One of the following:

"custom-ruleset"

<a href="#">Link to this property</a>

"gateway-policy"

<a href="#">Link to this property</a>

"gateway-destination-ip"

<a href="#">Link to this property</a>

"gateway-block-page-settings"

<a href="#">Link to this property</a>

"gateway-extended-email-matching"

<a href="#">Link to this property</a>

"idp-federation-grant"

<a href="#">Link to this property</a>

"trust-grant"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

resource\_version: number

Resource Version.

<a href="#">Link to this property</a>

<details>

<summary>

status: "active"or "deleting"or "deleted"

Resource Status.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"deleting"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20resource_sharing.resources%20%3E%20(model)%20resource_get_response%20%3E%20(schema)>)

<details>

<summary>

ResourceCreateResponse object {id, created, meta, 6 more }

</summary>

id: string

Share Resource identifier.

maxLength32

<a href="#">Link to this property</a>

created: string

When the share was created.

formatdate-time

<a href="#">Link to this property</a>

meta: unknown

Resource Metadata.

<a href="#">Link to this property</a>

modified: string

When the share was modified.

formatdate-time

<a href="#">Link to this property</a>

resource\_account\_id: string

Account identifier.

maxLength32

<a href="#">Link to this property</a>

resource\_id: string

Share Resource identifier.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

resource\_type: "custom-ruleset"or "gateway-policy"or "gateway-destination-ip"or 4 more

Resource Type.

</summary>

One of the following:

"custom-ruleset"

<a href="#">Link to this property</a>

"gateway-policy"

<a href="#">Link to this property</a>

"gateway-destination-ip"

<a href="#">Link to this property</a>

"gateway-block-page-settings"

<a href="#">Link to this property</a>

"gateway-extended-email-matching"

<a href="#">Link to this property</a>

"idp-federation-grant"

<a href="#">Link to this property</a>

"trust-grant"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

resource\_version: number

Resource Version.

<a href="#">Link to this property</a>

<details>

<summary>

status: "active"or "deleting"or "deleted"

Resource Status.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"deleting"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20resource_sharing.resources%20%3E%20(model)%20resource_create_response%20%3E%20(schema)>)

<details>

<summary>

ResourceUpdateResponse object {id, created, meta, 6 more }

</summary>

id: string

Share Resource identifier.

maxLength32

<a href="#">Link to this property</a>

created: string

When the share was created.

formatdate-time

<a href="#">Link to this property</a>

meta: unknown

Resource Metadata.

<a href="#">Link to this property</a>

modified: string

When the share was modified.

formatdate-time

<a href="#">Link to this property</a>

resource\_account\_id: string

Account identifier.

maxLength32

<a href="#">Link to this property</a>

resource\_id: string

Share Resource identifier.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

resource\_type: "custom-ruleset"or "gateway-policy"or "gateway-destination-ip"or 4 more

Resource Type.

</summary>

One of the following:

"custom-ruleset"

<a href="#">Link to this property</a>

"gateway-policy"

<a href="#">Link to this property</a>

"gateway-destination-ip"

<a href="#">Link to this property</a>

"gateway-block-page-settings"

<a href="#">Link to this property</a>

"gateway-extended-email-matching"

<a href="#">Link to this property</a>

"idp-federation-grant"

<a href="#">Link to this property</a>

"trust-grant"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

resource\_version: number

Resource Version.

<a href="#">Link to this property</a>

<details>

<summary>

status: "active"or "deleting"or "deleted"

Resource Status.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"deleting"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20resource_sharing.resources%20%3E%20(model)%20resource_update_response%20%3E%20(schema)>)

<details>

<summary>

ResourceDeleteResponse object {id, created, meta, 6 more }

</summary>

id: string

Share Resource identifier.

maxLength32

<a href="#">Link to this property</a>

created: string

When the share was created.

formatdate-time

<a href="#">Link to this property</a>

meta: unknown

Resource Metadata.

<a href="#">Link to this property</a>

modified: string

When the share was modified.

formatdate-time

<a href="#">Link to this property</a>

resource\_account\_id: string

Account identifier.

maxLength32

<a href="#">Link to this property</a>

resource\_id: string

Share Resource identifier.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

resource\_type: "custom-ruleset"or "gateway-policy"or "gateway-destination-ip"or 4 more

Resource Type.

</summary>

One of the following:

"custom-ruleset"

<a href="#">Link to this property</a>

"gateway-policy"

<a href="#">Link to this property</a>

"gateway-destination-ip"

<a href="#">Link to this property</a>

"gateway-block-page-settings"

<a href="#">Link to this property</a>

"gateway-extended-email-matching"

<a href="#">Link to this property</a>

"idp-federation-grant"

<a href="#">Link to this property</a>

"trust-grant"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

resource\_version: number

Resource Version.

<a href="#">Link to this property</a>

<details>

<summary>

status: "active"or "deleting"or "deleted"

Resource Status.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"deleting"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20resource_sharing.resources%20%3E%20(model)%20resource_delete_response%20%3E%20(schema)>)