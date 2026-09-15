---
title: Updates
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

[Logs](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/logs)

[SCIM](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/logs/subresources/scim)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Updates

##### [List Access SCIM update logs](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/logs/subresources/scim/subresources/updates/methods/list)

GET/accounts/{account\_id}/access/logs/scim/updates

##### ModelsExpand Collapse

<details>

<summary>

UpdateListResponse object {cf\_resource\_id, error\_description, idp\_id, 8 more }

</summary>

cf\_resource\_id: optional string

The unique Cloudflare-generated Id of the SCIM resource.

<a href="#">Link to this property</a>

error\_description: optional string

The error message which is generated when the status of the SCIM request is ‘FAILURE’.

<a href="#">Link to this property</a>

idp\_id: optional string

The unique Id of the IdP that has SCIM enabled.

<a href="#">Link to this property</a>

idp\_resource\_id: optional string

The IdP-generated Id of the SCIM resource.

<a href="#">Link to this property</a>

logged\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

request\_body: optional string

The JSON-encoded string body of the SCIM request.

<a href="#">Link to this property</a>

request\_method: optional string

The request method of the SCIM request.

<a href="#">Link to this property</a>

resource\_group\_name: optional string

The display name of the SCIM Group resource if it exists.

<a href="#">Link to this property</a>

resource\_type: optional string

The resource type of the SCIM request.

<a href="#">Link to this property</a>

resource\_user\_email: optional string

The email address of the SCIM User resource if it exists.

formatemail

<a href="#">Link to this property</a>

status: optional string

The status of the SCIM request.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.logs.scim.updates%20%3E%20(model)%20update_list_response%20%3E%20(schema)>)